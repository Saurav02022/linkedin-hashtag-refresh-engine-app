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

export interface HashtagBatch {
  id: string
  strategy: string
  description: string
  hashtags: string[]
  recommended?: boolean
}

export interface HashtagGenerationResponse {
  postUrl: string
  postId?: string
  hashtags: string[] // Legacy: default selected hashtags
  batches?: HashtagBatch[] // New: multiple strategy batches
  metadata: {
    model: string
    tokensUsed: number
    generatedAt: string
  }
}

