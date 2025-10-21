/**
 * Validation utilities
 * Single Responsibility: Input validation helpers
 */

/**
 * Validate LinkedIn post URL format
 */
export function isValidLinkedInUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return (
      urlObj.hostname.includes('linkedin.com') &&
      (urlObj.pathname.includes('/posts/') || 
       urlObj.pathname.includes('/feed/update/'))
    )
  } catch {
    return false
  }
}

/**
 * Extract post ID from LinkedIn URL
 */
export function extractLinkedInPostId(url: string): string | null {
  try {
    const urlObj = new URL(url)
    const match = urlObj.pathname.match(/\/posts\/([^\/]+)/) || 
                  urlObj.pathname.match(/\/feed\/update\/([^\/]+)/)
    return match ? match[1] : null
  } catch {
    return null
  }
}

/**
 * Sanitize hashtag (remove # if present, lowercase)
 */
export function sanitizeHashtag(tag: string): string {
  return tag.replace(/^#/, '').trim().toLowerCase()
}

/**
 * Format hashtag for display (ensure it starts with #)
 */
export function formatHashtag(tag: string): string {
  const sanitized = sanitizeHashtag(tag)
  return `#${sanitized}`
}

