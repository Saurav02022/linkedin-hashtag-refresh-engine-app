/**
 * Hashtag Generation API Route
 * Single Responsibility: Handle hashtag generation requests
 * 
 * Features:
 * - Automatic content extraction from LinkedIn URLs (Puppeteer)
 * - AI-powered hashtag generation (Google Gemini)
 * - Fallback to manual content if extraction fails
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import type { APIResponse, HashtagGenerationResponse } from '@/types'
import { generateHashtagsWithGemini } from '@/lib/api/gemini'
import { extractLinkedInPostContent } from '@/lib/api/linkedin-scraper'
import { config } from '@/lib/config'

// Support two modes:
// 1. Legacy: Multiple URLs (for manual URL input)
// 2. New: Single post with ID and content (from dashboard)
const requestSchema = z.union([
  // Legacy mode: Multiple URLs
  z.object({
    urls: z.array(z.string().url()).min(1).max(10),
    content: z.string().optional(),
  }),
  // New mode: Single post with content
  z.object({
    postId: z.string().min(1),
    postUrl: z.string().url(),
    content: z.string().min(1),
  }),
])

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

    const results: HashtagGenerationResponse[] = []

    // Handle two modes: legacy (URLs) or new (single post with content)
    if ('urls' in parsedData) {
      // Legacy mode: URLs with automatic content extraction
      const { urls, content: manualContent } = parsedData

      for (const url of urls) {
        try {
          let postContent: string

          // Try automatic extraction first (if no manual content provided)
          if (!manualContent) {
            console.log(`🔍 Attempting automatic content extraction for: ${url}`)
            try {
              postContent = await extractLinkedInPostContent(url)
              console.log(`✅ Successfully extracted content (${postContent.length} chars)`)
            } catch (extractError) {
              console.error(`❌ Extraction failed:`, extractError)
              // If extraction fails, return error to user
              throw new Error(
                extractError instanceof Error 
                  ? extractError.message 
                  : 'Failed to read the LinkedIn post. Please ensure the post is public and accessible.'
              )
            }
          } else {
            // Use manually provided content
            postContent = manualContent
            console.log(`📝 Using manually provided content (${postContent.length} chars)`)
          }

          // Generate hashtags using extracted/manual content
          const { hashtags, batches } = await generateHashtagsWithGemini(postContent)

          results.push({
            postUrl: url,
            hashtags,
            batches, // Include strategy batches
            metadata: {
              model: config.api.gemini.model,
              tokensUsed: estimateTokens(postContent),
              generatedAt: new Date().toISOString(),
            },
          })
        } catch (error) {
          console.error(`Failed to generate hashtags for ${url}:`, error)
          
          // Return specific error message to user
          return NextResponse.json(
            {
              success: false,
              error: {
                code: 'GENERATION_FAILED',
                message: error instanceof Error ? error.message : 'Failed to generate hashtags',
              },
            } as APIResponse,
            { status: 400 }
          )
        }
      }
    } else {
      // New mode: Single post with ID and content
      const { postId, postUrl, content } = parsedData

      try {
        const { hashtags, batches } = await generateHashtagsWithGemini(content)

        results.push({
          postUrl,
          postId,
          hashtags,
          batches, // Include strategy batches
          metadata: {
            model: config.api.gemini.model,
            tokensUsed: estimateTokens(content),
            generatedAt: new Date().toISOString(),
          },
        })
      } catch (error) {
        console.error(`Failed to generate hashtags for post ${postId}:`, error)
        throw new Error('Failed to generate hashtags')
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
      } else if (error.message.includes('Failed to generate hashtags for all posts')) {
        userMessage = 'Unable to analyze the post content. Please ensure the URL is valid and try again.'
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

