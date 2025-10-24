/**
 * Hashtag Generation API Route
 * Single Responsibility: Handle hashtag generation requests
 * 
 * Features:
 * - AI-powered hashtag generation (Google Gemini)
 * - Manual content input (primary method)
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import type { APIResponse, HashtagGenerationResponse } from '@/types'
import { generateHashtagsWithGemini } from '@/lib/api/gemini'
import { config } from '@/lib/config'

// Request schema: Accept content directly with optional URL
const requestSchema = z.object({
  content: z.string().min(10, 'Post content must be at least 10 characters'),
  url: z.string().url().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsedData = requestSchema.parse(body)

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

    const { content, url } = parsedData

    console.log(`📝 Generating hashtags for content (${content.length} characters)`)
    if (url) {
      console.log(`🔗 Post URL: ${url}`)
    }

    try {
      // Generate hashtags using AI
      const { hashtags, batches } = await generateHashtagsWithGemini(content)

      console.log(`✅ Successfully generated ${hashtags.length} hashtags`)

      const result: HashtagGenerationResponse = {
        postUrl: url || `manual-${Date.now()}`,
        hashtags,
        batches,
        metadata: {
          model: config.api.gemini.model,
          tokensUsed: estimateTokens(content),
          generatedAt: new Date().toISOString(),
        },
      }

      return NextResponse.json(
        {
          success: true,
          data: [result],
          message: 'Hashtags generated successfully',
        } as APIResponse<HashtagGenerationResponse[]>,
        { status: 200 }
      )
    } catch (error) {
      console.error('❌ Failed to generate hashtags:', error)
      
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'GENERATION_FAILED',
            message: error instanceof Error ? error.message : 'Failed to generate hashtags. Please try again.',
          },
        } as APIResponse,
        { status: 400 }
      )
    }
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

    // Provide user-friendly error messages
    let userMessage = 'Failed to generate hashtags. Please try again.'
    
    if (error instanceof Error) {
      // Check for specific error types
      if (error.message.includes('API key not configured')) {
        userMessage = 'AI service is not configured. Please contact support.'
      } else if (error.message.includes('Gemini API error')) {
        userMessage = 'AI service is temporarily unavailable. Please try again in a few moments.'
      } else if (error.message.includes('rate limit') || error.message.includes('429')) {
        userMessage = 'AI service rate limit reached. Please wait a moment and try again.'
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: userMessage,
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
