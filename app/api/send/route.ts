import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import ContactFormEmail from '@/emails/contact-form-email';

// Initialize Resend with API key from environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
      service,
      contactPreference,
    } = await req.json();

    const data = await resend.emails.send({
      from: process.env.NEXT_PUBLIC_EMAIL_FROM || 'onboarding@resend.dev',
      to: ['info@pitutors.com'],
      subject: `New Contact Form Submission: ${subject}`,
      replyTo: email,
      react: ContactFormEmail({
        name,
        email,
        phone,
        subject,
        message,
        service,
        contactPreference,
      }),
    });

    if (data.error) {
      throw new Error(data.error.message);
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again.' },
      { status: 500 }
    );
  }
} 