/**
 * Current User Route
 * Single Responsibility: Get current authenticated user using NextAuth
 * 
 * References:
 * - https://next-auth.js.org/configuration/nextjs#getserversession
 */

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import type { APIResponse } from '@/types'

export async function GET() {
  try {
    // Get session using NextAuth
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      // Not authenticated
      const response: APIResponse<{ user: null }> = {
        success: true,
        data: {
          user: null,
        },
      }
      return NextResponse.json(response)
    }

    // Return user data (excluding access token for security)
    const response: APIResponse<{
      user: {
        id: string
        name?: string | null
        email?: string | null
        image?: string | null
        linkedInId?: string
      }
    }> = {
      success: true,
      data: {
        user: {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
          linkedInId: session.user.linkedInId,
        },
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Get current user error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to get current user',
        },
      } as APIResponse,
      { status: 500 }
    )
  }
}

