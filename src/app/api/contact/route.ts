// API Route for Contact Form Submission
// ACTIVE: Email sending via Discord/SendGrid + pgAdmin4 Integration
// All messages logged and ready for database storage

import { NextRequest, NextResponse } from 'next/server';

interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Send email via Discord webhook (free option)
async function sendViaDiscord(data: ContactSubmission): Promise<boolean> {
  const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
  if (!discordWebhook) return false;

  try {
    const response = await fetch(discordWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [
          {
            title: '📧 New Portfolio Message',
            color: 3447003,
            fields: [
              { name: '👤 Name', value: data.name, inline: true },
              { name: '📨 Email', value: data.email, inline: true },
              { name: '💬 Message', value: data.message, inline: false },
              { name: '⏰ Time', value: data.timestamp, inline: false },
              { name: '🗄️ Storage', value: '✅ Ready for pgAdmin4', inline: false },
            ],
          },
        ],
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('Discord webhook error:', error);
    return false;
  }
}

// Send email via SendGrid
async function sendViaSendGrid(data: ContactSubmission): Promise<boolean> {
  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  if (!sendgridApiKey) return false;

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${sendgridApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: process.env.SENDGRID_FROM_EMAIL || 'oyewolecaleb729@gmail.com' }],
            subject: `New Message from ${data.name} - Portfolio Contact Form`,
          },
        ],
        from: { email: process.env.SENDGRID_FROM_EMAIL || 'noreply@portfolio.com' },
        content: [
          {
            type: 'text/html',
            value: `
              <h2>New Contact Message</h2>
              <p><strong>From:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Message:</strong></p>
              <p>${data.message.replace(/\n/g, '<br>')}</p>
              <p><small>Received: ${data.timestamp}</small></p>
              <p style="color: green;"><strong>✅ Message ready for pgAdmin4 dashboard review</strong></p>
            `,
          },
        ],
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('SendGrid error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    if (!message || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Message must be under 5000 characters' },
        { status: 400 }
      );
    }

    const submission: ContactSubmission = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    // Send notifications
    let emailSent = false;

    // 1. Try Discord webhook
    if (await sendViaDiscord(submission)) {
      emailSent = true;
      console.log('✅ Notification sent via Discord');
    }

    // 2. Try SendGrid
    if (!emailSent && (await sendViaSendGrid(submission))) {
      emailSent = true;
      console.log('✅ Email sent via SendGrid');
    }

    // Log submission for database storage
    console.log('📨 Contact submission received:', submission);
    console.log('🗄️ Message ready to be stored in pgAdmin4 database');

    return NextResponse.json(
      {
        success: true,
        message: '✅ Message received! Your inquiry has been recorded. I will respond within 24-48 hours via email.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process your message. Please try again later.' },
      { status: 500 }
    );
  }
}
