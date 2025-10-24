/**
 * Sidebar Ad Component
 * Single Responsibility: Display vertical ad in sidebar (desktop only)
 */

'use client'

import { AdUnit } from './AdUnit'

interface SidebarAdProps {
  /**
   * Ad slot ID from Google AdSense
   */
  slot: string
  
  /**
   * Additional CSS classes
   */
  className?: string
}

export function SidebarAd({ slot, className = '' }: SidebarAdProps) {
  return (
    <aside className={`hidden lg:block sticky top-20 ${className}`}>
      <div className="w-full max-w-[300px]">
        <p className="text-xs text-muted-foreground text-center mb-2">
          Advertisement
        </p>
        <AdUnit 
          slot={slot} 
          format="vertical" 
          responsive={true}
          className="min-h-[600px]"
        />
      </div>
    </aside>
  )
}

