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
    .min(1, 'LinkedIn post URL is required')
    .url('Please enter a valid URL')
    .refine(isValidLinkedInUrl, {
      message: 'Must be a valid LinkedIn post URL (e.g., https://linkedin.com/posts/...)',
    }),
})

export type PostFormInput = z.infer<typeof postFormSchema>

