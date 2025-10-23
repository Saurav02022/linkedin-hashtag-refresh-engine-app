/**
 * Home Hero Section Component
 * Single Responsibility: Main hero section for landing page
 */

'use client'

import Link from 'next/link'
import { Hash, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/routes'

export function HeroSection() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Hash className="w-4 h-4" />
            AI-Powered Auto-Refresh Engine
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
            Keep Your LinkedIn Posts
            <span className="block text-primary mt-2">
              Fresh & Visible
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Generate AI-powered hashtags in seconds AND auto-refresh them every 48 hours. 
            Maintain peak engagement on your evergreen content effortlessly.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="w-full sm:w-auto text-base" asChild>
              <Link href={ROUTES.LOGIN}>
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base" asChild>
              <Link href="#how-it-works">
                See How It Works
              </Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span>100% Free to Start</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span>Auto-Refresh Every 48h</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span>2-3 Second Generation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

