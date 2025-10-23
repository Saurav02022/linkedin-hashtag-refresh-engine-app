/**
 * LinkedIn Comment API Route
 * Uses LinkedIn REST API v2 with OAuth token
 * Automatically deletes existing hashtag comments before posting new ones
 * 
 * POST /api/linkedin/comment - Post hashtag comment to LinkedIn
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { postCommentViaInternalAPI } from '@/lib/api/linkedin-internal-api'
import type { APIResponse } from '@/types'
import { z } from 'zod'

// Validation schema
const commentRequestSchema = z.object({
  postUrl: z.string().url(),
  hashtags: z.array(z.string().min(1)).min(1).max(15),
})

export async function POST(request: NextRequest) {
  try {
    // Get session
    const session = await getServerSession(authOptions)

    if (!session) {
      const response: APIResponse = {
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to perform this action',
        },
      }
      return NextResponse.json(response, { status: 401 })
    }

    // Parse and validate request body
    const body = await request.json()
    const validation = commentRequestSchema.safeParse(body)

    if (!validation.success) {
      const response: APIResponse = {
        success: false,
        error: {
          code: 'INVALID_REQUEST',
          message: `Invalid request data: ${validation.error.issues.map(i => i.message).join(', ')}`,
        },
      }
      return NextResponse.json(response, { status: 400 })
    }

    const { postUrl, hashtags } = validation.data

    console.log(`🎯 Posting comment to: ${postUrl}`)
    console.log(`📝 Hashtags: ${hashtags.length} tags`)

    // Format hashtags (one per line with # prefix)
    const hashtagText = hashtags.map(tag => `#${tag}`).join('\n')

    // Post comment using LinkedIn REST API
    const result = await postCommentViaInternalAPI(
      session.accessToken as string,
      postUrl,
      hashtagText
    )

    if (result.success) {
      console.log('✅ Successfully posted to LinkedIn')
      const response: APIResponse<typeof result> = {
        success: true,
        data: result,
        message: result.message,
      }
      return NextResponse.json(response, { status: 200 })
    }

    // API failed - return error with helpful message
    console.error('❌ Failed to post comment:', result.message)
    const response: APIResponse = {
      success: false,
      error: {
        code: 'API_FAILED',
        message: result.message,
      },
    }
    return NextResponse.json(response, { status: 500 })
  } catch (error) {
    console.error('Failed to post LinkedIn comment:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    const response: APIResponse = {
      success: false,
      error: {
        code: 'COMMENT_POST_ERROR',
        message: 'Failed to post comment. Please try again.',
        details: { error: errorMessage },
      },
    }
    return NextResponse.json(response, { status: 500 })
  }
}
