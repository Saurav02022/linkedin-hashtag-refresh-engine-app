/**
 * Auth Query Hook
 * Single Responsibility: TanStack Query hook for authentication
 */

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@/lib/api-routes'
import { useUserStore } from '@/lib/stores/userStore'

interface User {
  id: string
  name: string
  email: string
  linkedInId?: string
  avatar?: string
  plan: 'free' | 'pro'
  usageCount: number
  usageLimit: number
}

interface AuthResponse {
  success: boolean
  data: {
    user: User | null
  }
}

// Query Keys
export const authKeys = {
  me: ['auth', 'me'] as const,
}

// Fetch current user
async function fetchCurrentUser(): Promise<User | null> {
  const response = await fetch(API_ENDPOINTS.AUTH_ME)

  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }

  const data: AuthResponse = await response.json()
  return data.data.user
}

// Hook to get current user
export function useCurrentUser() {
  const setUser = useUserStore((state) => state.setUser)

  const query = useQuery({
    queryKey: authKeys.me,
    queryFn: fetchCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Update Zustand store when data changes
  React.useEffect(() => {
    if (query.data !== undefined) {
      setUser(query.data)
    }
  }, [query.data, setUser])

  return query
}

// Note: Logout is handled by NextAuth's signOut() function
// See: lib/contexts/AuthContext.tsx - useAuth().logout()
// No need for TanStack Query here as signOut() is a redirect, not an API call

