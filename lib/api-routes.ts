/**
 * API Endpoints
 * Single source of truth for all API paths
 */

export const API_ENDPOINTS = {
  // Auth
  AUTH_ME: '/api/auth/me',
  
  // Hashtags
  HASHTAGS_GENERATE: '/api/hashtags/generate',
  
  // LinkedIn
  LINKEDIN_POST_COMMENT: '/api/linkedin/posts/:postId/comment',
} as const

