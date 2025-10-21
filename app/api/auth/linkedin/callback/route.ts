/**
 * LinkedIn OAuth Callback Route
 * Single Responsibility: Handle LinkedIn OAuth callback
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { config } from '@/lib/config'
import type { APIResponse } from '@/types'

const callbackSchema = z.object({
  code: z.string(),
  state: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, state } = callbackSchema.parse(body)

    // TODO: Validate state matches stored value

    // Exchange code for access token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: config.linkedin.clientId,
        client_secret: config.linkedin.clientSecret,
        redirect_uri: config.linkedin.redirectUri,
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token')
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // Fetch user profile
    const profileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!profileResponse.ok) {
      throw new Error('Failed to fetch user profile')
    }

    const profile = await profileResponse.json()

    // TODO: Store user and tokens in database (encrypted)
    // TODO: Create session

    const response: APIResponse<{ user: typeof profile }> = {
      success: true,
      data: {
        user: profile,
      },
      message: 'Successfully authenticated with LinkedIn',
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('LinkedIn OAuth callback error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid callback parameters',
            details: { issues: error.issues },
          },
        } as APIResponse,
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'AUTH_ERROR',
          message: error instanceof Error ? error.message : 'Authentication failed',
        },
      } as APIResponse,
      { status: 500 }
    )
  }
}

