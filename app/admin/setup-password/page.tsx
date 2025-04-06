'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LockIcon } from 'lucide-react';

// Separate component for handling search params
function SearchParamsHandler({ onTokenReceived }: { onTokenReceived: (token: string | null) => void }) {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const token = searchParams?.get('token');
    onTokenReceived(token);
  }, [searchParams, onTokenReceived]);
  
  return null;
}

// Wrapper component for SearchParamsHandler
function SearchParamsWrapper({ onTokenReceived }: { onTokenReceived: (token: string | null) => void }) {
  return (
    <Suspense fallback={<div className="hidden">Loading...</div>}>
      <SearchParamsHandler onTokenReceived={onTokenReceived} />
    </Suspense>
  );
}

// Main setup password form without search params
function SetupPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        setError('Invalid or missing setup token');
        return;
      }

      try {
        // Verify the token is valid
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'signup'
        });

        if (error) {
          setError('Invalid or expired token. Please request a new invitation.');
          return;
        }
      } catch (err: any) {
        setError(err.message || 'Error verifying token');
      }
    };

    checkToken();
  }, [token]);

  const handleSetupPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      if (!token) throw new Error('Invalid setup token');

      // First verify and sign up with the token
      const { data: signUpData, error: signUpError } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'signup',
      });

      if (signUpError) throw signUpError;

      // Then update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });

      if (updateError) throw updateError;
      
      // Redirect to admin dashboard on successful setup
      router.push('/admin/dashboard');
      router.refresh();
    } catch (error: any) {
      setError(error.message || 'An error occurred during password setup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Setup Admin Password</CardTitle>
          <CardDescription className="text-center">
            Create your admin password to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSetupPassword} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <LockIcon className="h-5 w-5" />
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  minLength={8}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <LockIcon className="h-5 w-5" />
                </div>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  required
                  minLength={8}
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Setting up...' : 'Set Password'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Make sure to use a strong password
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

// Export the wrapped component
export default function SetupPasswordPage() {
  const [token, setToken] = useState<string | null>(null);
  
  return (
    <>
      <SearchParamsWrapper onTokenReceived={setToken} />
      <SetupPasswordForm />
    </>
  );
} 