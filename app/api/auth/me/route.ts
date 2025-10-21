/**
 * Current User Route
 * Single Responsibility: Get current authenticated user
 */

import { NextResponse } from 'next/server'
import type { APIResponse } from '@/types'

export async function GET() {
  try {
    // TODO: Get user from session
    // TODO: Fetch user data from database

    // For now, return null (not authenticated)
    const response: APIResponse<{ user: null }> = {
      success: true,
      data: {
        user: null,
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

