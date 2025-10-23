/**
 * Application configuration
 * Single Responsibility: Environment variables and config
 */

export const config = {
  app: {
    name: 'LinkedIn Hashtag Refresh Engine',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  api: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY || '',
      model: 'gemini-2.5-flash',
    },
  },
  linkedin: {
    clientId: process.env.LINKEDIN_CLIENT_ID || '',
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
    redirectUri: process.env.LINKEDIN_REDIRECT_URI || '',
  },
  features: {
    maxPostsPerRequest: 10,
    maxHashtagsPerPost: 12,
    minHashtagsPerPost: 10,
  },
} as const

export function validateConfig() {
  const requiredEnvVars = [
    'GEMINI_API_KEY',
  ] as const

  const missing = requiredEnvVars.filter(
    (key) => !process.env[key]
  )

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    )
  }
}

