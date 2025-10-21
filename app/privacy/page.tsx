/**
 * Privacy Policy Page
 * Single Responsibility: Privacy policy information
 */

import { ComingSoon } from '@/components/shared'
import { AppHeader, AppFooter } from '@/components/shared'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader variant="public" />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ComingSoon
          title="Privacy Policy"
          description="Your privacy matters. Learn how we collect, use, and protect your personal data."
        />
      </main>
      <AppFooter />
    </div>
  )
}

