/**
 * Coming Soon Component
 * Single Responsibility: Display coming soon message for unimplemented pages
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { InContentAd } from '@/components/ads'
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

      {/* Ad placement: Below content */}
      <div className="w-full max-w-3xl mt-12">
        <InContentAd slot="7890123456" />
      </div>
    </div>
  )
}

