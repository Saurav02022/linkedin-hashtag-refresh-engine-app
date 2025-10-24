/**
 * Reusable AdSense Ad Unit Component
 * Single Responsibility: Display Google AdSense ads
 */

'use client'

import { useEffect } from 'react'

interface AdUnitProps {
  /**
   * Ad slot ID from Google AdSense
   */
  slot: string
  
  /**
   * Ad format: auto, rectangle, vertical, horizontal
   */
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal'
  
  /**
   * Whether the ad should be responsive
   */
  responsive?: boolean
  
  /**
   * Additional CSS classes
   */
  className?: string
}

export function AdUnit({ 
  slot, 
  format = 'auto', 
  responsive = true,
  className = '' 
}: AdUnitProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

  useEffect(() => {
    // Push ad to AdSense queue
    try {
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
      }
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [])

  // Don't render if client ID is not configured
  if (!clientId) {
    return null
  }

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  )
}

