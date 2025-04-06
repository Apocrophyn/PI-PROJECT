import { Resend } from 'resend';

// Initialize Resend with API key from environment variable
export const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
export const emailConfig = {
  from: process.env.NEXT_PUBLIC_EMAIL_FROM || 'onboarding@resend.dev',
  to: process.env.NEXT_PUBLIC_EMAIL_TO || 'info@pitutors.com',
  replyTo: process.env.NEXT_PUBLIC_EMAIL_REPLY_TO,
  // Add test email as a default recipient
  testEmail: 'ahsana123456@gmail.com',
};

// Helper function to send emails
export async function sendEmail({
  subject,
  react,
  to = [emailConfig.to, emailConfig.testEmail], // Include test email by default
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
    const data = await resend.emails.send({
      from,
      to,
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