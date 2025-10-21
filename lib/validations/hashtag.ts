/**
 * Hashtag validation schemas
 * Single Responsibility: Hashtag-related validation only
 */

import { z } from 'zod'

export const hashtagGenerationSchema = z.object({
  postUrl: z.string().url('Invalid post URL'),
  postContent: z.string().optional(),
  count: z.number().min(5).max(30).default(15),
})

export const hashtagSchema = z.object({
  tag: z
    .string()
    .min(2, 'Hashtag must be at least 2 characters')
    .max(50, 'Hashtag must be less than 50 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Hashtag can only contain letters, numbers, and underscores'),
})

export type HashtagGenerationInput = z.infer<typeof hashtagGenerationSchema>
export type HashtagInput = z.infer<typeof hashtagSchema>

