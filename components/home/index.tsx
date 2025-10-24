/**
 * Home Screen Component
 * Single Responsibility: Public landing/home page
 */

'use client'

import { AppHeader } from '@/components/shared/AppHeader'
import { AppFooter } from '@/components/shared/AppFooter'
import { HeroSection } from './HeroSection'
import { Features } from './Features'
import { HowItWorks } from './HowItWorks'
import { PricingSection } from './PricingSection'
import { CTA } from './CTA'
import { InContentAd } from '@/components/ads'
import { useAuth } from '@/lib/contexts/AuthContext'

export function HomeScreen() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader variant={isAuthenticated ? 'authenticated' : 'public'} />
      <main className="flex-1">
        <HeroSection />
        <Features />
        
        {/* Ad placement 1: After Features section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <InContentAd slot="8795108171" />
        </div>
        
        <HowItWorks />
        
        {/* Ad placement 2: After How It Works section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <InContentAd slot="9613365825" />
        </div>
        
        <PricingSection />
        <CTA />
      </main>
      <AppFooter />
    </div>
  )
}

