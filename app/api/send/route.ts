import { NextResponse } from 'next/server';
import ContactFormEmail from '@/emails/contact-form-email';
import { sendEmail } from '@/lib/email';

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

    const result = await sendEmail({
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

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again.' },
      { status: 500 }
    );
  }
} 