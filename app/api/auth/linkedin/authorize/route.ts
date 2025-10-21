/**
 * LinkedIn OAuth Authorization Route
 * Single Responsibility: Initiate LinkedIn OAuth flow
 */

import { NextRequest, NextResponse } from 'next/server'
import { config } from '@/lib/config'
import type { APIResponse } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const { clientId, redirectUri } = config.linkedin

    if (!clientId || !redirectUri) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'CONFIG_ERROR',
            message: 'LinkedIn OAuth not configured',
          },
        } as APIResponse,
        { status: 500 }
      )
    }

    // Generate random state for CSRF protection
    const state = generateState()

    // Build LinkedIn OAuth URL
    const scopes = ['openid', 'profile', 'email', 'w_member_social']
    const authUrl = new URL('https://www.linkedin.com/oauth/v2/authorization')
    authUrl.searchParams.set('response_type', 'code')
    authUrl.searchParams.set('client_id', clientId)
    authUrl.searchParams.set('redirect_uri', redirectUri)
    authUrl.searchParams.set('state', state)
    authUrl.searchParams.set('scope', scopes.join(' '))

    // Store state in cookie for validation (TODO: implement secure cookie)
    // For MVP, return the auth URL
    const response: APIResponse<{ authUrl: string; state: string }> = {
      success: true,
      data: {
        authUrl: authUrl.toString(),
        state,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('LinkedIn OAuth authorization error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to initiate LinkedIn OAuth',
        },
      } as APIResponse,
      { status: 500 }
    )
  }
}

function generateState(): string {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15)
}

