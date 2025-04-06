'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LockIcon, MailIcon, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>('Checking connection...');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check Supabase connection and session on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // First check if we already have a session
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Initial session check:', session ? 'Active session found' : 'No active session');
        
        if (session) {
          console.log('Session found, redirecting to dashboard...');
          router.push('/admin/dashboard');
          return;
        }

        // Then check if we can query the database
        const { data, error } = await supabase.from('posts').select('count');
        if (error) {
          console.error('Supabase connection error:', error);
          setConnectionStatus('Database connection error');
          setError('Unable to connect to the database. Please try again later.');
        } else {
          console.log('Database connection successful');
          setConnectionStatus('Connected to Supabase');
          setError(null);
        }
      } catch (err) {
        console.error('Connection check error:', err);
        setConnectionStatus('Connection check failed');
        setError('Failed to verify database connection');
      }
    };

    checkConnection();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      console.log('Starting login process...');

      // Sign in with email and password
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      console.log('Sign in response:', { 
        success: !signInError, 
        user: data?.user ? 'User exists' : 'No user',
        error: signInError ? signInError.message : null,
        session: data?.session ? 'Session created' : 'No session'
      });

      if (signInError) {
        throw signInError;
      }

      if (data?.user && data?.session) {
        console.log('Login successful, preparing to redirect...');
        setSuccess(true);
        
        // Get the redirect URL from query params or default to dashboard
        const redirectTo = searchParams?.get('redirectTo') || '/admin/dashboard';
        console.log('Redirecting to:', redirectTo);

        // Wait for animation before redirecting
        setTimeout(() => {
          window.location.href = redirectTo;
        }, 1500);
      } else {
        throw new Error('No user data or session received');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setError(
        error.message === 'Invalid login credentials'
          ? 'Invalid email or password. Please check your credentials and try again.'
          : error.message || 'Failed to sign in. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 px-4">
      <Card className="w-full max-w-md relative">
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="text-center text-white"
              >
                <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-400" />
                <h3 className="text-xl font-bold mb-2">Login Successful!</h3>
                <p>Redirecting to dashboard...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the admin dashboard
          </CardDescription>
          {connectionStatus && (
            <CardDescription className="text-center text-sm">
              Status: {connectionStatus}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <MailIcon className="h-5 w-5" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <LockIcon className="h-5 w-5" />
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  minLength={6}
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Protected area for administrators only
          </p>
          {process.env.NODE_ENV === 'development' && (
            <p className="text-xs text-muted-foreground">
              Using Supabase project: {process.env.NEXT_PUBLIC_SUPABASE_URL}
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
