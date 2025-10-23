/**
 * NextAuth Type Extensions
 * Single Responsibility: Extend NextAuth types for custom properties
 * 
 * References:
 * - https://next-auth.js.org/getting-started/typescript
 */

import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  /**
   * Extend the built-in session type
   */
  interface Session {
    accessToken?: string
    error?: string
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      linkedInId?: string
    }
  }

  /**
   * Extend the built-in user type
   */
  interface User {
    id: string
    linkedInId?: string
  }
}

declare module 'next-auth/jwt' {
  /**
   * Extend the built-in JWT type
   */
  interface JWT {
    accessToken?: string
    refreshToken?: string
    accessTokenExpires?: number
    linkedInId?: string
    error?: string
  }
}

