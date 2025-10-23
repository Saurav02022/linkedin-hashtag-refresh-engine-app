/**
 * LinkedIn Post Comment API Route
 * POST /api/linkedin/posts/:postId/comment - Post hashtags as comment
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { postHashtagComment } from '@/lib/api/linkedin'
import type { APIResponse } from '@/types'
import { z } from 'zod'

// Validation schema
const postCommentSchema = z.object({
  hashtags: z.array(z.string().min(1)).min(1).max(15),
})

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    // Get session with access token
    const session = await getServerSession(authOptions)

    if (!session || !session.accessToken) {
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
    const validation = postCommentSchema.safeParse(body)

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

    const { hashtags } = validation.data
    const { postId } = await params

    // Post hashtags as comment to LinkedIn
    const result = await postHashtagComment(
      session.accessToken,
      postId,
      hashtags
    )

    const response: APIResponse<typeof result> = {
      success: true,
      data: result,
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('Failed to post hashtag comment:', error)

    // Check error type
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    // Rate limit error
    if (errorMessage.includes('429') || errorMessage.includes('rate limit')) {
      const response: APIResponse = {
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'LinkedIn API rate limit reached. Please wait 15 minutes and try again.',
        },
      }
      return NextResponse.json(response, { status: 429 })
    }

    // Permission/Authorization errors (403)
    if (errorMessage.includes('403') || errorMessage.includes('ACCESS_DENIED') || errorMessage.includes('Forbidden')) {
      const response: APIResponse = {
        success: false,
        error: {
          code: 'POST_PERMISSION_DENIED',
          message: 'You don\'t have permission to comment on this post. You can only add hashtags to posts you created or reposted.',
        },
      }
      return NextResponse.json(response, { status: 403 })
    }

    // Authentication errors (401)
    if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
      const response: APIResponse = {
        success: false,
        error: {
          code: 'LINKEDIN_AUTH_FAILED',
          message: 'LinkedIn authentication failed. Please try logging in again.',
        },
      }
      return NextResponse.json(response, { status: 401 })
    }

    // Invalid post ID / post not found
    if (errorMessage.includes('404') || errorMessage.includes('not found')) {
      const response: APIResponse = {
        success: false,
        error: {
          code: 'POST_NOT_FOUND',
          message: 'LinkedIn post not found. Please verify the post URL is correct.',
        },
      }
      return NextResponse.json(response, { status: 404 })
    }

    // Generic error
    const response: APIResponse = {
      success: false,
      error: {
        code: 'COMMENT_POST_FAILED',
        message: 'Failed to post hashtags to LinkedIn. Please try again.',
      },
    }
    return NextResponse.json(response, { status: 500 })
  }
}

