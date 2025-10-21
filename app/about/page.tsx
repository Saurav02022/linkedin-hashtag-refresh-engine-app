/**
 * About Page
 * Single Responsibility: About us information
 */

import { ComingSoon } from '@/components/shared'
import { AppHeader, AppFooter } from '@/components/shared'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader variant="public" />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ComingSoon
          title="About Us"
          description="Learn about our mission to help LinkedIn creators save time and boost their content reach with AI-powered hashtags."
        />
      </main>
      <AppFooter />
    </div>
  )
}

