/**
 * NextAuth.js Route Handler
 * Single Responsibility: Handle all NextAuth.js API routes
 * 
 * Handles requests to:
 * - /api/auth/signin
 * - /api/auth/signout
 * - /api/auth/callback/:provider
 * - /api/auth/session
 * - /api/auth/csrf
 * - /api/auth/providers
 * 
 * References:
 * - https://next-auth.js.org/configuration/initialization
 * - https://next-auth.js.org/configuration/nextjs
 */

import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)

// Export GET and POST handlers for Route Handler
export { handler as GET, handler as POST }

