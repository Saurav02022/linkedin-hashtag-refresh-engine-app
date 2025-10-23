/**
 * Auth Provider Component
 * Single Responsibility: Wrap NextAuth SessionProvider for client components
 * 
 * This is necessary because SessionProvider is a client component
 * and cannot be directly used in the root layout (server component).
 * 
 * References:
 * - https://next-auth.js.org/getting-started/example
 */

'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>
}

