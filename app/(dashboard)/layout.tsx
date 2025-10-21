/**
 * Dashboard Layout
 * Single Responsibility: Layout for authenticated pages
 */

import { AppHeader } from '@/components/shared/AppHeader'
import { AppFooter } from '@/components/shared/AppFooter'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader variant="authenticated" />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <AppFooter />
    </div>
  )
}

