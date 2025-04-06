import { Suspense } from 'react';
import { LoginFormClient } from './login-form';

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
