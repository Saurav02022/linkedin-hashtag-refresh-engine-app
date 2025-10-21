/**
 * Billing Settings Page
 * Single Responsibility: Subscription and billing management
 */

import { BillingScreen } from '@/components/settings/billing'

export const metadata = {
  title: 'Billing - Settings',
  description: 'Manage your subscription and billing information',
}

export default function BillingPage() {
  return <BillingScreen />
}

