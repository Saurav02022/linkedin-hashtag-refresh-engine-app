/**
 * Home Screen Component
 * Single Responsibility: Public landing/home page
 */

import { AppHeader } from '@/components/shared/AppHeader'
import { AppFooter } from '@/components/shared/AppFooter'
import { HeroSection } from './HeroSection'
import { Features } from './Features'
import { HowItWorks } from './HowItWorks'
import { PricingSection } from './PricingSection'
import { CTA } from './CTA'

export function HomeScreen() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader variant="public" />
      <main className="flex-1">
        <HeroSection />
        <Features />
        <HowItWorks />
        <PricingSection />
        <CTA />
      </main>
      <AppFooter />
    </div>
  )
}

