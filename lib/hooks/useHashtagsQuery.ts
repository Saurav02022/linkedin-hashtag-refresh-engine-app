/**
 * Hashtags Query Hook
 * Single Responsibility: TanStack Query hook for hashtag generation
 */

import { useMutation } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@/lib/api-routes'
import type { HashtagGenerationResponse } from '@/types'

interface GenerateHashtagsRequest {
  content: string
  url?: string
}

interface GenerateHashtagsResponse {
  success: boolean
  data: HashtagGenerationResponse[]
  message?: string
  error?: {
    code: string
    message: string
  }
}

async function generateHashtags(
  request: GenerateHashtagsRequest
): Promise<HashtagGenerationResponse[]> {
  const response = await fetch(API_ENDPOINTS.HASHTAGS_GENERATE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error?.message || 'Failed to generate hashtags')
  }

  const data: GenerateHashtagsResponse = await response.json()

  if (!data.success) {
    throw new Error(data.error?.message || 'Failed to generate hashtags')
  }

  return data.data
}

export function useGenerateHashtags() {
  return useMutation({
    mutationFn: generateHashtags,
    onSuccess: (data) => {
      console.log(`Generated hashtags for ${data.length} posts`)
    },
    onError: (error) => {
      console.error('Hashtag generation failed:', error)
    },
  })
}

