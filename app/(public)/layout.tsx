/**
 * Public Pages Layout
 * Single Responsibility: Shared layout for public-facing pages
 */

import { AppHeader, AppFooter } from '@/components/shared'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader variant="public" />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <AppFooter />
    </div>
  )
}

