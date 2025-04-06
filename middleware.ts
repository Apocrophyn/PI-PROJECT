import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Get the current URL
  const requestUrl = new URL(req.url);

  // Check if the request is for an admin route
  const isAdminRoute = requestUrl.pathname.startsWith('/admin');
  const isLoginRoute = requestUrl.pathname === '/admin/login';
  const isSetupRoute = requestUrl.pathname === '/admin/setup-password';
  const hasSetupToken = requestUrl.searchParams.has('token');

  // If we have a setup token, always redirect to the setup page
  if (hasSetupToken && !isSetupRoute) {
    const token = requestUrl.searchParams.get('token');
    const setupUrl = new URL('/admin/setup-password', req.url);
    setupUrl.searchParams.set('token', token!);
    return NextResponse.redirect(setupUrl);
  }

  // Allow access to setup-password route if it has a token
  if (isSetupRoute && hasSetupToken) {
    return res;
  }

  // If we have a session but we're on the login page, redirect to dashboard
  if (session && isLoginRoute) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  }

  // If we don't have a session and we're trying to access admin routes (except login)
  if (!session && isAdminRoute && !isLoginRoute) {
    // Store the original URL to redirect back after login
    const redirectUrl = new URL('/admin/login', req.url);
    redirectUrl.searchParams.set('redirectTo', requestUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

// Specify which routes this middleware should run on
export const config = {
  matcher: ['/admin/:path*'],
};