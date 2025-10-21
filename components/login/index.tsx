/**
 * Login Screen Component
 * Single Responsibility: Landing page with authentication
 */

'use client'

import { useRouter } from 'next/navigation'
import { AppHeader } from '@/components/shared/AppHeader'
import { AppFooter } from '@/components/shared/AppFooter'
import { HeroSection } from './HeroSection'
import { LoginForm } from './LoginForm'

export function LoginScreen() {
  const router = useRouter()

  function handleLogin() {
    // After successful login, redirect to dashboard
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-background to-muted/20">
      <AppHeader variant="public" />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="space-y-16">
            {/* Hero Section */}
            <HeroSection />

            {/* Login Form */}
            <div className="flex justify-center">
              <LoginForm onLogin={handleLogin} />
            </div>

            {/* How it works */}
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Step number={1} title="Connect" description="Securely connect your LinkedIn account" />
                <Step number={2} title="Paste URL" description="Add your LinkedIn post URLs" />
                <Step number={3} title="Generate" description="Get AI-powered hashtags instantly" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  )
}

interface StepProps {
  number: number
  title: string
  description: string
}

function Step({ number, title, description }: StepProps) {
  return (
    <div className="text-center space-y-2">
      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
        {number}
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

