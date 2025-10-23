/**
 * Application Routes
 * Single source of truth for all route paths
 */

// Public routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PRICING: '/pricing',
  
  // Dashboard routes
  DASHBOARD: '/dashboard',
  POSTS: '/posts',
  SETTINGS: '/settings',
  SETTINGS_BILLING: '/settings/billing',
  
  // Public pages
  ABOUT: '/about',
  CONTACT: '/contact',
  HELP: '/help',
  DOCS: '/docs',
  CHANGELOG: '/changelog',
  STATUS: '/status',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  COOKIES: '/cookies',
} as const

