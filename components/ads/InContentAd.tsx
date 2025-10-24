/**
 * In-Content Ad Component
 * Single Responsibility: Display Google AdSense in-content ads
 */

'use client'

import { useEffect } from 'react'

interface InContentAdProps {
  slot: string
}

export function InContentAd({ slot }: InContentAdProps) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

  useEffect(() => {
    // Only push ad if not already done
    if (typeof window !== 'undefined' && window.adsbygoogle && adsenseId) {
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (error) {
        console.error('AdSense error:', error)
      }
    }
  }, [adsenseId])

  // Don't render if AdSense is not configured
  if (!adsenseId) {
    return null
  }

  return (
    <div className="my-8 w-full flex justify-center">
      <div className="w-full max-w-7xl">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minHeight: '280px' }}
          data-ad-client={adsenseId}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  )
}

// Declare window.adsbygoogle type
declare global {
  interface Window {
    adsbygoogle: any[]
  }
}
