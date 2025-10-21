/**
 * Documentation Page
 * Single Responsibility: Technical documentation
 */

import { ComingSoon } from '@/components/shared'
import { AppHeader, AppFooter } from '@/components/shared'

export default function DocsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader variant="public" />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ComingSoon
          title="Documentation"
          description="Comprehensive guides, API references, and technical documentation for developers."
        />
      </main>
      <AppFooter />
    </div>
  )
}

