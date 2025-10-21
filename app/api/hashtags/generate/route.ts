/**
 * Hashtag Generation API Route
 * Single Responsibility: Handle hashtag generation requests
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import type { APIResponse, HashtagGenerationResponse } from '@/types'
import { generateHashtagsWithGemini } from '@/lib/api/gemini'
import { config } from '@/lib/config'

const requestSchema = z.object({
  urls: z.array(z.string().url()).min(1).max(10),
  content: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { urls, content } = requestSchema.parse(body)

    // Validate API key is configured
    if (!config.api.gemini.apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'CONFIG_ERROR',
            message: 'Gemini API key not configured. Please add GEMINI_API_KEY to your .env.local file.',
          },
        } as APIResponse,
        { status: 500 }
      )
    }

    const results: HashtagGenerationResponse[] = []

    // Generate hashtags for each URL
    for (const url of urls) {
      try {
        // If content is provided, use it directly
        // Otherwise, use a placeholder message
        const postContent = content || `LinkedIn post from ${url}. Generate relevant professional hashtags for this LinkedIn content.`

        const hashtags = await generateHashtagsWithGemini(postContent)

        results.push({
          postUrl: url,
          hashtags,
          metadata: {
            model: config.api.gemini.model,
            tokensUsed: estimateTokens(postContent),
            generatedAt: new Date().toISOString(),
          },
        })
      } catch (error) {
        console.error(`Failed to generate hashtags for ${url}:`, error)
        
        // Add failed result
        results.push({
          postUrl: url,
          hashtags: [],
          metadata: {
            model: config.api.gemini.model,
            tokensUsed: 0,
            generatedAt: new Date().toISOString(),
          },
        })
      }
    }

    // Check if all generations failed
    if (results.every(r => r.hashtags.length === 0)) {
      throw new Error('Failed to generate hashtags for all posts')
    }

    const response: APIResponse<HashtagGenerationResponse[]> = {
      success: true,
      data: results,
      message: 'Hashtags generated successfully',
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Hashtag generation error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid request data',
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
          code: 'INTERNAL_ERROR',
          message: error instanceof Error ? error.message : 'Failed to generate hashtags',
        },
      } as APIResponse,
      { status: 500 }
    )
  }
}

/**
 * Estimate token count for cost tracking
 */
function estimateTokens(text: string): number {
  // Rough estimation: ~4 characters per token
  return Math.ceil(text.length / 4)
}

