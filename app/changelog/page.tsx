/**
 * Changelog Page
 * Single Responsibility: Product updates and version history
 */

import { ComingSoon } from '@/components/shared'
import { AppHeader, AppFooter } from '@/components/shared'

export default function ChangelogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader variant="public" />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ComingSoon
          title="Changelog"
          description="See what's new! Track our latest features, improvements, and bug fixes."
        />
      </main>
      <AppFooter />
    </div>
  )
}

