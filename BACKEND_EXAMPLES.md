/**
 * Contact Form Implementation Example
 * This file shows how to implement email sending in the contact API
 * 
 * Choose one of the implementations below based on your email service
 */

// ========================================
// OPTION 1: SendGrid Implementation
// ========================================
// npm install @sendgrid/mail

import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendViasendGrid(
  name: string,
  email: string,
  message: string
) {
  const mailOptions = {
    to: process.env.SENDGRID_FROM_EMAIL!,
    from: process.env.SENDGRID_FROM_EMAIL!,
    replyTo: email,
    subject: `New Portfolio Message from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  return sgMail.send(mailOptions);
}

// ========================================
// OPTION 2: Mailgun Implementation
// ========================================
// npm install mailgun.js

import FormData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({ key: process.env.MAILGUN_API_KEY! });

export async function sendViaMailgun(
  name: string,
  email: string,
  message: string
) {
  const mailOptions = {
    from: `Portfolio <noreply@${process.env.MAILGUN_DOMAIN}>`,
    to: process.env.MAILGUN_TO_EMAIL!,
    replyTo: email,
    subject: `New Portfolio Message from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  return mg.messages.create(process.env.MAILGUN_DOMAIN!, mailOptions);
}

// ========================================
// OPTION 3: Database Storage with Prisma
// ========================================
// npm install @prisma/client
// npx prisma init

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function saveToDatabase(
  name: string,
  email: string,
  message: string
) {
  return prisma.contactMessage.create({
    data: {
      name,
      email,
      message,
      createdAt: new Date(),
    },
  });
}

// ========================================
// OPTION 4: MongoDB with Mongoose
// ========================================
// npm install mongoose

import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ContactMessage =
  mongoose.models.ContactMessage ||
  mongoose.model('ContactMessage', contactMessageSchema);

export async function saveToMongoDB(
  name: string,
  email: string,
  message: string
) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL not set');
  }

  await mongoose.connect(process.env.DATABASE_URL);
  const msg = new ContactMessage({ name, email, message });
  return msg.save();
}

// ========================================
// OPTION 5: Firebase Firestore
// ========================================
// npm install firebase-admin

import admin from 'firebase-admin';

export async function saveToFirestore(
  name: string,
  email: string,
  message: string
) {
  const db = admin.firestore();

  return db.collection('contact_messages').add({
    name,
    email,
    message,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
}

// ========================================
// Updated API Route Implementation
// ========================================
// Use in src/app/api/contact/route.ts

/*
import { NextRequest, NextResponse } from 'next/server';
import { sendViaserndGrid } from '@/lib/email'; // Choose your function

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Choose one of these based on your setup:
    // await sendViaSendGrid(name, email, message);
    // await sendViaMailgun(name, email, message);
    // await saveToDatabase(name, email, message);
    // await saveToMongoDB(name, email, message);
    // await saveToFirestore(name, email, message);

    return NextResponse.json({
      success: true,
      message: 'Your message has been received!',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process your message' },
      { status: 500 }
    );
  }
}
*/
