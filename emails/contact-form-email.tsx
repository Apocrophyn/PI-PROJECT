import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

interface ContactFormEmailProps {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  service: string;
  contactPreference: string;
}

export default function ContactFormEmail({
  name,
  email,
  phone,
  subject,
  message,
  service,
  contactPreference,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New Contact Form Submission from {name}</Preview>
      <Tailwind>
        <Body className="bg-gray-100">
          <Container>
            <Section className="bg-white borderBlack my-10 px-10 py-4 rounded-md">
              <Heading className="leading-tight">New Contact Form Submission</Heading>
              <Text>You have received a new contact form submission:</Text>
              <Hr />
              <Text><strong>Name:</strong> {name}</Text>
              <Text><strong>Email:</strong> {email}</Text>
              <Text><strong>Phone:</strong> {phone || 'Not provided'}</Text>
              <Text><strong>Service Interested In:</strong> {service}</Text>
              <Text><strong>Subject:</strong> {subject}</Text>
              <Text><strong>Preferred Contact Method:</strong> {contactPreference}</Text>
              <Hr />
              <Text><strong>Message:</strong></Text>
              <Text>{message}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
} 