/**
 * Pricing Screen Component
 * Single Responsibility: Display pricing plans
 */

'use client'

import { AppHeader } from '@/components/shared/AppHeader'
import { AppFooter } from '@/components/shared/AppFooter'
import { PricingCards } from './PricingCards'
import { PricingFAQ } from './PricingFAQ'
import { PricingComparison } from './PricingComparison'

export function PricingScreen() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader variant="public" />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center bg-linear-to-b from-background to-muted/20">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Choose the perfect plan for your LinkedIn growth. Start free, upgrade anytime.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>✓ No credit card required</span>
              <span>•</span>
              <span>✓ Cancel anytime</span>
              <span>•</span>
              <span>✓ 14-day money-back guarantee</span>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 px-4">
          <PricingCards />
        </section>

        {/* Feature Comparison */}
        <section className="py-16 px-4 bg-muted/30">
          <PricingComparison />
        </section>

        {/* FAQ */}
        <section className="py-16 px-4">
          <PricingFAQ />
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 bg-linear-to-b from-muted/20 to-background">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to boost your LinkedIn reach?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of creators who save 20+ minutes per post with AI-powered hashtags.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/login"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
              >
                Start Free Trial
              </a>
              <a
                href="#comparison"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
              >
                Compare Plans
              </a>
            </div>
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  )
}

