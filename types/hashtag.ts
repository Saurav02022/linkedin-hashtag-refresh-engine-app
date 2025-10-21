/**
 * Hashtag-related type definitions
 * Single Responsibility: Hashtag domain types only
 */

export interface Hashtag {
  id: string
  tag: string
  relevanceScore: number
  category?: string
}

export interface GeneratedHashtags {
  postId: string
  hashtags: Hashtag[]
  generatedAt: Date
}

export interface HashtagGenerationRequest {
  postUrl: string
  postContent?: string
  count?: number
}

export interface HashtagGenerationResponse {
  postUrl: string
  hashtags: string[]
  metadata: {
    model: string
    tokensUsed: number
    generatedAt: string
  }
}

