/**
 * Google Gemini API Integration
 * Single Responsibility: AI-powered hashtag generation
 */

import { config } from '@/lib/config'

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string
      }>
    }
  }>
}

/**
 * Generate hashtags using Google Gemini API
 */
export async function generateHashtagsWithGemini(
  postContent: string
): Promise<string[]> {
  const apiKey = config.api.gemini.apiKey

  if (!apiKey) {
    throw new Error('Gemini API key not configured')
  }

  const prompt = buildHashtagPrompt(postContent)

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${config.api.gemini.model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 200,
          },
        }),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(
        `Gemini API error: ${error.error?.message || response.statusText}`
      )
    }

    const data: GeminiResponse = await response.json()
    const generatedText = data.candidates[0]?.content?.parts[0]?.text

    if (!generatedText) {
      throw new Error('No response from Gemini API')
    }

    // Parse hashtags from response
    const hashtags = parseHashtags(generatedText)

    // Validate and filter
    return validateHashtags(hashtags)
  } catch (error) {
    console.error('Gemini API error:', error)
    throw new Error(
      error instanceof Error ? error.message : 'Failed to generate hashtags'
    )
  }
}

/**
 * Build optimized prompt for hashtag generation
 */
function buildHashtagPrompt(postContent: string): string {
  return `You are a LinkedIn hashtag optimization expert.

Analyze this LinkedIn post and generate 10-12 hashtags that will maximize reach.

POST CONTENT:
"""
${postContent}
"""

REQUIREMENTS:
1. Format: lowercase only (e.g., "marketing" not "Marketing")
2. Length: 3-30 characters per hashtag
3. Relevance: Must directly relate to post content
4. Mix: 40% broad reach (business, technology), 60% niche (reactjs, b2bsales)
5. Trending: Prioritize currently popular hashtags
6. Professional: Business/career-focused only
7. No spam: Avoid like4like, followforfollow, etc.

OUTPUT FORMAT:
Return ONLY a JSON array of hashtag strings without the # symbol.
Example: ["marketing", "sales", "business", "linkedin"]

Generate exactly 10-12 hashtags.`
}

/**
 * Parse hashtags from Gemini response
 */
function parseHashtags(text: string): string[] {
  try {
    // Try to parse as JSON first
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      if (Array.isArray(parsed)) {
        return parsed.map((tag) => String(tag).toLowerCase().replace(/^#/, ''))
      }
    }

    // Fallback: extract hashtags from text
    const hashtagMatches = text.match(/#?\w+/g)
    if (hashtagMatches) {
      return hashtagMatches.map((tag) => tag.replace(/^#/, '').toLowerCase())
    }

    throw new Error('Could not parse hashtags from response')
  } catch (error) {
    console.error('Hashtag parsing error:', error)
    throw new Error('Invalid hashtag format in response')
  }
}

/**
 * Validate and filter hashtags
 */
function validateHashtags(hashtags: string[]): string[] {
  const spamKeywords = [
    'like4like',
    'follow4follow',
    'followforfollow',
    'likeforlike',
    'f4f',
    'l4l',
    'followback',
  ]

  return hashtags
    .filter((tag) => {
      // Remove # if present
      const cleanTag = tag.replace(/^#/, '').trim()

      // Length validation (3-30 characters)
      if (cleanTag.length < 3 || cleanTag.length > 30) return false

      // Must contain at least one letter
      if (!/[a-zA-Z]/.test(cleanTag)) return false

      // No spaces or special characters (except underscores)
      if (!/^[a-zA-Z0-9_]+$/.test(cleanTag)) return false

      // Filter out spam
      const lowerTag = cleanTag.toLowerCase()
      if (spamKeywords.some((spam) => lowerTag.includes(spam))) return false

      return true
    })
    .map((tag) => tag.toLowerCase())
    .slice(0, 15) // Cap at 15 hashtags
}

/**
 * Extract content from LinkedIn post URL (placeholder)
 * In MVP, we'll ask user to provide content or use a scraper
 */
export async function fetchLinkedInPostContent(
  postUrl: string
): Promise<string> {
  // TODO: Implement LinkedIn post scraping or API integration
  // For MVP, this returns a placeholder
  throw new Error(
    'Post content extraction not implemented. Please paste post content manually.'
  )
}

