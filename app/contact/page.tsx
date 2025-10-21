/**
 * Contact Page
 * Single Responsibility: Contact information
 */

import { ComingSoon } from '@/components/shared'
import { AppHeader, AppFooter } from '@/components/shared'

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader variant="public" />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ComingSoon
          title="Contact Us"
          description="Get in touch with our team for support, feedback, or partnership opportunities."
        />
      </main>
      <AppFooter />
    </div>
  )
}

