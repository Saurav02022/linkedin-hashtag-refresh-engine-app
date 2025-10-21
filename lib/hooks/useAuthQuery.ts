/**
 * Auth Query Hook
 * Single Responsibility: TanStack Query hook for authentication
 */

import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
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
  const response = await fetch('/api/auth/me')

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
  // Using React's useEffect since TanStack Query v5 removed onSuccess
  React.useEffect(() => {
    if (query.data !== undefined) {
      setUser(query.data)
    }
  }, [query.data, setUser])

  return query
}

// Hook to logout
export function useLogout() {
  const queryClient = useQueryClient()
  const clearUser = useUserStore((state) => state.clearUser)

  return useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/auth/logout', { method: 'POST' })
      if (!response.ok) {
        throw new Error('Logout failed')
      }
    },
    onSuccess: () => {
      // Clear React Query cache
      queryClient.clear()
      // Clear Zustand store
      clearUser()
    },
  })
}

