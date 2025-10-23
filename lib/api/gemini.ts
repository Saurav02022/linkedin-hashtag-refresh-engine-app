/**
 * Google Gemini API Integration
 * Single Responsibility: AI-powered hashtag generation
 */

import { config } from '@/lib/config'
import type { HashtagBatch } from '@/types'

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string
      }>
    }
  }>
}

interface HashtagGenerationResult {
  hashtags: string[]
  batches: HashtagBatch[]
}

/**
 * Generate hashtags using Google Gemini API
 * Returns both legacy format (hashtags array) and new format (batches)
 */
export async function generateHashtagsWithGemini(
  postContent: string
): Promise<HashtagGenerationResult> {
  const apiKey = config.api.gemini.apiKey

  if (!apiKey) {
    throw new Error('Gemini API key not configured')
  }

  const prompt = buildHashtagPrompt(postContent)

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/${config.api.gemini.model}:generateContent?key=${apiKey}`,
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
            maxOutputTokens: 10000,
          },
        }),
      }
    )

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(
        `Gemini API error: ${error.error?.message || response.statusText}`
      )
    }

    const data: GeminiResponse = await response.json()
    
    // Validate response structure
    if (!data.candidates || !Array.isArray(data.candidates) || data.candidates.length === 0) {
      console.error('Invalid Gemini response - no candidates:', JSON.stringify(data, null, 2))
      throw new Error('AI service returned an invalid response. Please try again.')
    }

    const candidate = data.candidates[0]
    if (!candidate?.content?.parts || candidate.content.parts.length === 0) {
      console.error('Invalid Gemini response - no content parts:', JSON.stringify(candidate, null, 2))
      throw new Error('AI service did not generate content. Please try again.')
    }

    const generatedText = candidate.content.parts[0]?.text

    if (!generatedText || generatedText.trim().length === 0) {
      console.error('Invalid Gemini response - empty text:', JSON.stringify(candidate, null, 2))
      throw new Error('AI service generated empty response. Please try again.')
    }

    // Parse batches from response (new format with strategies)
    const batches = parseBatches(generatedText)

    // Get recommended batch's hashtags as default (legacy format)
    const recommendedBatch = batches.find((b: HashtagBatch) => b.recommended) || batches[0]
    const hashtags = recommendedBatch?.hashtags || []

    return {
      hashtags,
      batches,
    }
  } catch (error) {
    console.error('Gemini API error:', error)
    throw new Error(
      error instanceof Error ? error.message : 'Failed to generate hashtags'
    )
  }
}

/**
 * Build optimized prompt for hashtag generation with multiple strategic batches
 * Engineered for maximum LinkedIn reach using proven strategies
 */
function buildHashtagPrompt(postContent: string): string {
  return `You are a LinkedIn Growth Strategist with 10 years of experience optimizing hashtags for viral content. Your hashtags consistently generate 3-5x more impressions than average.

YOUR TASK:
Analyze the post below and generate 3 STRATEGIC BATCHES of hashtags, each with a different approach. Each batch should contain exactly 12 hashtags.

POST CONTENT:
"""
${postContent}
"""

ANALYSIS FRAMEWORK:

1. CONTENT CLASSIFICATION
   - Primary topic, content type, industry
   - Ideal audience and their search behavior
   - Problems solved and value delivered

2. GENERATE 3 STRATEGIC BATCHES:

BATCH 1: "Maximum Reach" (RECOMMENDED)
- Strategy: Balanced mix for optimal visibility
- 4 HIGH-VOLUME tags (500K+ followers): Broad reach
- 5 MEDIUM-VOLUME tags (50K-500K): Targeted audience
- 3 NICHE tags (5K-50K): High engagement
- Goal: Best overall performance

BATCH 2: "Viral Potential"
- Strategy: Focus on trending and high-volume tags
- 8 HIGH-VOLUME tags (500K+): Maximum impressions
- 4 MEDIUM-VOLUME tags (50K-500K): Some targeting
- Goal: Maximize views and impressions

BATCH 3: "Engagement Focus"
- Strategy: Niche community targeting
- 2 HIGH-VOLUME tags (500K+): Minimal broad reach
- 4 MEDIUM-VOLUME tags (50K-500K): Moderate targeting
- 6 NICHE tags (5K-50K): Deep community engagement
- Goal: Quality interactions and conversations

STRICT RULES (Apply to ALL batches):
✅ lowercase only (e.g., "javascript" NOT "JavaScript")
✅ 3-30 characters per hashtag
✅ Directly relevant to post content
✅ Professional/business-focused
✅ NO spam (like4like, follow4follow, followback)
✅ NO special characters (only letters, numbers)
✅ Searchable and commonly used on LinkedIn

❌ NEVER USE:
- Spam/engagement bait tags
- Generic fluff (#post, #content, #share)
- Misspelled variations
- Personal branding (#johndoe)
- Other platform tags (#instadaily)

OUTPUT FORMAT:
Return ONLY a valid JSON object with this exact structure (no extra text, no markdown):

{
  "batches": [
    {
      "strategy": "Maximum Reach",
      "description": "Balanced mix for optimal visibility and engagement",
      "hashtags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8", "tag9", "tag10", "tag11", "tag12"],
      "recommended": true
    },
    {
      "strategy": "Viral Potential",
      "description": "High-volume tags for maximum impressions",
      "hashtags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8", "tag9", "tag10", "tag11", "tag12"],
      "recommended": false
    },
    {
      "strategy": "Engagement Focus",
      "description": "Niche targeting for quality interactions",
      "hashtags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8", "tag9", "tag10", "tag11", "tag12"],
      "recommended": false
    }
  ]
}

NOW ANALYZE THE POST AND GENERATE 3 STRATEGIC BATCHES:`
}

/**
 * Parse batches from Gemini response (new format with strategies)
 */
function parseBatches(text: string): any {
  try {
    // Try to parse as JSON object with batches
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      if (parsed.batches && Array.isArray(parsed.batches)) {
        return parsed.batches.map((batch: any, index: number) => ({
          id: `batch-${index + 1}`,
          strategy: batch.strategy || `Strategy ${index + 1}`,
          description: batch.description || '',
          hashtags: validateHashtags(
            batch.hashtags.map((tag: string) => String(tag).toLowerCase().replace(/^#/, ''))
          ),
          recommended: batch.recommended === true,
        }))
      }
    }

    // Fallback: try to parse as single array (legacy format)
    const arrayMatch = text.match(/\[[\s\S]*\]/)
    if (arrayMatch) {
      const parsed = JSON.parse(arrayMatch[0])
      if (Array.isArray(parsed)) {
        const hashtags = validateHashtags(
          parsed.map((tag) => String(tag).toLowerCase().replace(/^#/, ''))
        )
        return [
          {
            id: 'batch-1',
            strategy: 'Generated Hashtags',
            description: 'AI-generated hashtags for your post',
            hashtags,
            recommended: true,
          },
        ]
      }
    }

    throw new Error('Could not parse batches from response')
  } catch (error) {
    console.error('Batch parsing error:', error)
    throw new Error('Invalid batch format in response')
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
    .slice(0, 12) // Cap at 12 hashtags (optimal for LinkedIn algorithm)
}

/**
 * Extract content from LinkedIn post URL (placeholder)
 * In MVP, we'll ask user to provide content or use a scraper
 */
export async function fetchLinkedInPostContent(
): Promise<string> {
  // TODO: Implement LinkedIn post scraping or API integration
  // For MVP, this returns a placeholder
  throw new Error(
    'Post content extraction not implemented. Please paste post content manually.'
  )
}

