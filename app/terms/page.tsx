/**
 * Terms of Service Page
 * Single Responsibility: Terms of service agreement
 */

import { ComingSoon } from '@/components/shared'
import { AppHeader, AppFooter } from '@/components/shared'

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader variant="public" />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ComingSoon
          title="Terms of Service"
          description="Review the terms and conditions governing your use of our service."
        />
      </main>
      <AppFooter />
    </div>
  )
}

