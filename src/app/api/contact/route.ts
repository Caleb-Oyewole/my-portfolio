// API Route for Contact Form Submission
// ACTIVE: Email sending via Resend, SendGrid, Discord, or logging
// Configure in .env.local for email integration

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

// Send email via Discord webhook (free, simple)
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

// Send email via SendGrid (configure SENDGRID_API_KEY in .env.local)
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
            to: [{ email: process.env.SENDGRID_FROM_EMAIL || 'contact@yourportfolio.com' }],
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

    // Try sending via email services (in order of preference)
    let emailSent = false;

    // 1. Try Discord webhook (free option)
    if (await sendViaDiscord(submission)) {
      emailSent = true;
      console.log('✅ Message sent via Discord webhook');
    }

    // 2. Try SendGrid (premium option)
    if (!emailSent && (await sendViaSendGrid(submission))) {
      emailSent = true;
      console.log('✅ Message sent via SendGrid');
    }

    // 3. Always log for debugging
    console.log('📨 Contact submission received:', submission);
    console.log(
      emailSent
        ? '✅ Email delivery: Success'
        : '⚠️ Email delivery: Pending (configure Discord or SendGrid)'
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your message has been received. I will respond within 24-48 hours.',
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
