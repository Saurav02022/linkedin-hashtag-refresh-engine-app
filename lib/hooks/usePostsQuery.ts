/**
 * LinkedIn Posts Mutations Hook
 * Single Responsibility: Post hashtags to LinkedIn using TanStack Query
 * 
 * Note: Fetching posts requires r_member_social (RESTRICTED permission).
 * Our app uses manual URL input instead - this is the industry standard.
 */

'use client'

import { useMutation } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@/lib/api-routes'
import type { APIResponse } from '@/types'

/**
 * Post hashtags as a comment to LinkedIn
 */
async function postHashtagsToLinkedIn(data: {
  postId: string
  hashtags: string[]
}): Promise<{ commentId: string; commentUrl: string }> {
  const response = await fetch(
    API_ENDPOINTS.LINKEDIN_POST_COMMENT.replace(':postId', data.postId),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hashtags: data.hashtags }),
    }
  )

  if (!response.ok) {
    const error: APIResponse = await response.json()
    throw new Error(error.error?.message || 'Failed to post hashtags')
  }

  const result: APIResponse<{ commentId: string; commentUrl: string }> = await response.json()

  if (!result.success || !result.data) {
    throw new Error('Invalid response from server')
  }

  return result.data
}

/**
 * Hook to post hashtags to LinkedIn
 * 
 * @returns Mutation hook with postHashtags function
 * 
 * @example
 * ```tsx
 * const { mutate: postHashtags, isPending } = usePostHashtagsMutation()
 * 
 * function handlePost() {
 *   postHashtags(
 *     { postId: '123', hashtags: ['javascript', 'webdev'] },
 *     {
 *       onSuccess: (data) => {
 *         toast.success('Hashtags posted!')
 *         window.open(data.commentUrl, '_blank')
 *       }
 *     }
 *   )
 * }
 * ```
 */
export function usePostHashtagsMutation() {
  return useMutation({
    mutationFn: postHashtagsToLinkedIn,
  })
}

