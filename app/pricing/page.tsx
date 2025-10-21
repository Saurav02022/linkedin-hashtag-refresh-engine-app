/**
 * Pricing Page
 * Single Responsibility: Display pricing tiers and plans
 */

import { PricingScreen } from '@/components/pricing'

export const metadata = {
  title: 'Pricing - LinkedIn Hashtag Refresh Engine',
  description: 'Affordable pricing plans for LinkedIn creators. Start free and scale as you grow.',
}

export default function PricingPage() {
  return <PricingScreen />
}

