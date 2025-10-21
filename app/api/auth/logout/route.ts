/**
 * Logout Route
 * Single Responsibility: Handle user logout
 */

import { NextResponse } from 'next/server'
import type { APIResponse } from '@/types'

export async function POST() {
  try {
    // TODO: Destroy session
    // TODO: Clear cookies

    const response: APIResponse = {
      success: true,
      message: 'Successfully logged out',
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to logout',
        },
      } as APIResponse,
      { status: 500 }
    )
  }
}

