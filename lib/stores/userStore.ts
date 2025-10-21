/**
 * User Store (Zustand)
 * Single Responsibility: Manage global user state
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

interface UserStore {
  // State
  user: User | null
  isAuthenticated: boolean

  // Actions
  setUser: (user: User | null) => void
  updateUsage: (count: number) => void
  clearUser: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,

      // Actions
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      updateUsage: (count) =>
        set((state) => ({
          user: state.user ? { ...state.user, usageCount: count } : null,
        })),

      clearUser: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'user-storage', // LocalStorage key
      partialize: (state) => ({
        // Only persist user data, not derived state
        user: state.user,
      }),
    }
  )
)

