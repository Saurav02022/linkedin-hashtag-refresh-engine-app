/**
 * Post-related type definitions
 * Single Responsibility: LinkedIn Post domain types only
 */

export interface LinkedInPost {
  id: string
  url: string
  content: string
  createdAt: string
  author: {
    id: string
    name: string
    avatar?: string
  }
  engagement?: {
    likes: number
    comments: number
    shares: number
  }
  hasHashtags: boolean
  existingHashtagComment?: string | null
  autoRefreshSchedule?: {
    id: string
    intervalHours: number
    nextRefreshAt: string
    status: 'active' | 'paused' | 'completed'
  } | null
}

export interface FetchPostsResponse {
  posts: LinkedInPost[]
  pagination: {
    total: number
    hasMore: boolean
    nextOffset: number
  }
}

export interface PostInput {
  url: string
}

export interface PostFormData {
  urls: string
}

