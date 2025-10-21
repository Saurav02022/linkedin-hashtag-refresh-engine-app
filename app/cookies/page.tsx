/**
 * Cookie Policy Page
 * Single Responsibility: Cookie usage policy
 */

import { ComingSoon } from '@/components/shared'
import { AppHeader, AppFooter } from '@/components/shared'

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader variant="public" />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ComingSoon
          title="Cookie Policy"
          description="Learn about how we use cookies to improve your experience and protect your privacy."
        />
      </main>
      <AppFooter />
    </div>
  )
}

