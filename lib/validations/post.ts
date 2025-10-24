/**
 * Post validation schemas
 * Single Responsibility: Post-related validation only
 */

import { z } from 'zod'
import { isValidLinkedInUrl } from '@/lib/utils/validation'

export const postUrlSchema = z
  .string()
  .min(1, 'URL is required')
  .url('Invalid URL format')
  .refine(isValidLinkedInUrl, {
    message: 'Must be a valid LinkedIn post URL',
  })

export const postFormSchema = z.object({
  url: z
    .string()
    .optional()
    .refine(
      (val) => !val || (val.length > 0 && isValidLinkedInUrl(val)),
      {
        message: 'Please enter a valid LinkedIn post URL (e.g., https://linkedin.com/posts/...)',
      }
    ),
  content: z
    .string()
    .min(10, 'Post content must be at least 10 characters')
    .max(3000, 'Post content must be less than 3000 characters'),
})

export type PostFormInput = z.infer<typeof postFormSchema>

