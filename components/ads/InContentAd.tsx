/**
 * In-Content Ad Component
 * Single Responsibility: Display horizontal ad between content sections
 */

'use client'

import { AdUnit } from './AdUnit'

interface InContentAdProps {
  /**
   * Ad slot ID from Google AdSense
   */
  slot: string
  
  /**
   * Additional CSS classes
   */
  className?: string
}

export function InContentAd({ slot, className = '' }: InContentAdProps) {
  return (
    <div className={`w-full my-8 ${className}`}>
      <p className="text-xs text-muted-foreground text-center mb-2">
        Advertisement
      </p>
      <AdUnit 
        slot={slot} 
        format="auto" 
        responsive={true}
        className="min-h-[250px] flex items-center justify-center"
      />
    </div>
  )
}

