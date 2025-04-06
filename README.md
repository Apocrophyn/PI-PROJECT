# Project PI - Math & Physics Tutoring Platform

A modern web application built with Next.js for providing expert math and physics tutoring services.

## Features

- 🎓 Expert Math & Physics Tutoring
- 📚 Blog System with Pagination
- 📅 Session Booking System
- 💬 Contact Form with Email Integration
- 🎨 Modern UI with Animations
- 🌓 Dark/Light Mode Support
- 📱 Fully Responsive Design

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase
- Resend Email
- Framer Motion
- Lottie Animations

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Start the development server:
   ```bash
   pnpm dev
   ```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RESEND_API_KEY=your_resend_api_key
```

## Deployment

This project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel and it will handle the rest.

## License

MIT License 