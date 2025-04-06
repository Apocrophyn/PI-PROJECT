import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the client component with no SSR
const LoginFormClient = dynamic(() => import('./login-form'), {
  ssr: false, // This ensures the component only renders on client side
});

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    }>
      <LoginFormClient />
    </Suspense>
  );
}
