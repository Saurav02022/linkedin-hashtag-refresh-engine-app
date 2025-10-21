/**
 * System Status Page
 * Single Responsibility: Service status and uptime information
 */

import { ComingSoon } from '@/components/shared'
import { AppHeader, AppFooter } from '@/components/shared'

export default function StatusPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader variant="public" />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ComingSoon
          title="System Status"
          description="Check the current status of our services, scheduled maintenance, and incident reports."
        />
      </main>
      <AppFooter />
    </div>
  )
}

