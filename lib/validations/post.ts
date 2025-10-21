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
  urls: z
    .string()
    .min(1, 'Please enter at least one URL')
    .refine(
      (val) => {
        const urls = val.split('\n').filter((url) => url.trim())
        return urls.length >= 1 && urls.length <= 10
      },
      {
        message: 'Please enter between 1 and 10 URLs',
      }
    ),
})

export type PostFormInput = z.infer<typeof postFormSchema>

