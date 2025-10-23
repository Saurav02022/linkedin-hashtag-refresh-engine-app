/**
 * Authentication Context
 * Single Responsibility: Provide auth state using NextAuth.js
 * 
 * This is a wrapper around NextAuth's useSession hook to maintain
 * compatibility with existing code while using NextAuth under the hood.
 * 
 * References:
 * - https://next-auth.js.org/getting-started/client#usesession
 */

'use client'

import { useSession, signOut } from 'next-auth/react'

interface User {
  id: string
  name: string
  email: string
  linkedInId?: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  logout: () => void
}

/**
 * useAuth Hook
 * Wraps NextAuth's useSession for consistent API
 * Handles automatic logout on token refresh failures
 */
export function useAuth(): AuthContextType {
  const { data: session, status } = useSession()

  // Handle token refresh errors
  // If token refresh fails, automatically sign out user
  if (session?.error === 'RefreshAccessTokenError') {
    signOut({ callbackUrl: '/login?error=SessionExpired' })
  }

  const user: User | null = session?.user
    ? {
        id: session.user.id,
        name: session.user.name || '',
        email: session.user.email || '',
        linkedInId: session.user.linkedInId,
        avatar: session.user.image || undefined,
      }
    : null

  return {
    user,
    isAuthenticated: !!session && !session.error,
    isLoading: status === 'loading',
    logout: () => signOut({ callbackUrl: '/' }),
  }
}

