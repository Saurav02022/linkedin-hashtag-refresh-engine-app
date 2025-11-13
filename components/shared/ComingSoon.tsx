/**
 * Coming Soon Component
 * Single Responsibility: Display coming soon message for unimplemented pages
 * 
 * AdSense Policy Compliance:
 * - NO ADS should be placed on "Coming Soon" pages
 * - These are considered "under construction" pages with low-value content
 * - Only add ads after implementing substantial, valuable content
 * 
 * Before adding ads to any page, ensure it has:
 * 1. Original, substantial content (500+ words recommended)
 * 2. Clear value proposition for users
 * 3. Proper navigation and structure
 * 4. Not under construction or placeholder content
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock } from 'lucide-react'

interface ComingSoonProps {
  title: string
  description?: string
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Icon */}
      <div className="rounded-full bg-primary/10 p-6 mb-6">
        <Clock className="w-12 h-12 text-primary" />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        {title}
      </h1>

      {/* Description */}
      <p className="text-lg text-muted-foreground max-w-md mb-8">
        {description || "We're working hard to bring you this feature. Stay tuned for updates!"}
      </p>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            Go to Dashboard
          </Link>
        </Button>
      </div>

      {/* Additional Info */}
      <p className="text-sm text-muted-foreground mt-8">
        Have questions? Reach out on{' '}
        <a 
          href="https://www.linkedin.com/in/saurav02022/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          LinkedIn
        </a>
      </p>

      {/* 
        AdSense Compliance: NO ADS on Coming Soon pages
        Ads removed to comply with Google Publisher Policies
        Only add ads back after implementing real, substantial content
      */}
    </div>
  )
}

