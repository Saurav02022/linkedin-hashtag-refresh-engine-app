/**
 * Next.js Middleware with NextAuth
 * Single Responsibility: Protect authenticated routes
 */

import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { ROUTES } from '@/lib/routes'

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: ROUTES.LOGIN,
    },
  }
)

// Protected routes - using centralized routes
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/posts/:path*',
    '/settings/:path*',
  ],
}

