/**
 * Help Center Page
 * Single Responsibility: Help and support resources
 */

import { ComingSoon } from '@/components/shared'
import { AppHeader, AppFooter } from '@/components/shared'

export default function HelpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader variant="public" />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ComingSoon
          title="Help Center"
          description="Find answers to common questions, tutorials, and troubleshooting guides."
        />
      </main>
      <AppFooter />
    </div>
  )
}

