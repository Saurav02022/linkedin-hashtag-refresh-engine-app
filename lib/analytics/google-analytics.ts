/**
 * Google Analytics 4 Tracking Utilities
 * Single Responsibility: Track user events and page views
 */

// Type definitions for GA events
export type GAEventName = 
  | 'user_signed_up'
  | 'hashtags_generated'
  | 'hashtags_posted_to_linkedin'
  | 'generation_failed'
  | 'post_failed'
  | 'batch_selected'

interface GAEventParams {
  [key: string]: string | number | boolean | undefined
}

/**
 * Track custom events in Google Analytics
 * @param eventName - The name of the event to track
 * @param eventParams - Additional parameters for the event
 */
export function trackEvent(eventName: GAEventName, eventParams?: GAEventParams) {
  // Only track in production and if GA is configured
  if (typeof window === 'undefined' || !window.gtag) {
    return
  }

  try {
    window.gtag('event', eventName, eventParams)
    console.log(`[GA] Event tracked: ${eventName}`, eventParams)
  } catch (error) {
    console.error('[GA] Failed to track event:', error)
  }
}

/**
 * Track page views (automatically handled by Next.js GoogleAnalytics component)
 * This is a manual fallback if needed
 */
export function trackPageView(url: string) {
  if (typeof window === 'undefined' || !window.gtag) {
    return
  }

  try {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
      page_path: url,
    })
  } catch (error) {
    console.error('[GA] Failed to track page view:', error)
  }
}

/**
 * Set user properties in Google Analytics
 * @param properties - User properties to set
 */
export function setUserProperties(properties: GAEventParams) {
  if (typeof window === 'undefined' || !window.gtag) {
    return
  }

  try {
    window.gtag('set', 'user_properties', properties)
  } catch (error) {
    console.error('[GA] Failed to set user properties:', error)
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'set',
      targetOrAction: string,
      params?: GAEventParams
    ) => void
  }
}

