import { Resend } from 'resend';

// Initialize Resend with API key from environment variable
export const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
export const emailConfig = {
  from: process.env.NEXT_PUBLIC_EMAIL_FROM || 'onboarding@resend.dev',
  to: process.env.NODE_ENV === 'production' 
    ? (process.env.NEXT_PUBLIC_EMAIL_TO || 'info@pitutors.com')
    : 'ahsana123456@gmail.com', // During development, only send to verified email
  replyTo: process.env.NEXT_PUBLIC_EMAIL_REPLY_TO,
};

// Helper function to send emails
export async function sendEmail({
  subject,
  react,
  to = emailConfig.to,
  from = emailConfig.from,
  replyTo,
}: {
  subject: string;
  react: React.ReactElement;
  to?: string | string[];
  from?: string;
  replyTo?: string;
}) {
  try {
    // During development, force send to verified email only
    const recipients = process.env.NODE_ENV === 'production'
      ? (Array.isArray(to) ? to : [to])
      : ['ahsana123456@gmail.com'];

    const data = await resend.emails.send({
      from,
      to: recipients,
      subject,
      react,
      replyTo: replyTo || emailConfig.replyTo,
    });

    if (data.error) {
      throw new Error(data.error.message);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
} 