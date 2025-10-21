/**
 * Social Media & Profile Constants
 * Single Responsibility: Centralized social links and profile information
 */

/**
 * Application URLs
 */
export const APP_URL = {
  production: 'https://ai-linkedin-hashtag-refresh-engine-app.vercel.app',
  development: 'http://localhost:3000',
} as const

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/saurav02022/',
  github: 'https://github.com/saurav02022',
  twitter: 'https://x.com/sk729584',
} as const

export const AUTHOR = {
  name: 'Saurav Kumar',
  email: 'contact@saurav02022.dev', // Update with your actual email if needed
  social: SOCIAL_LINKS,
} as const

/**
 * Repository Information
 */
export const REPOSITORY = {
  url: 'https://github.com/saurav02022/linkedin-hashtag-refresh-engine-app',
  owner: 'saurav02022',
  name: 'linkedin-hashtag-refresh-engine-app',
} as const

