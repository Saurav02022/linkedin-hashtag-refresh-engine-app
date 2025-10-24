/**
 * Login Screen Component
 * Single Responsibility: Landing page with authentication and error handling
 * 
 * References:
 * - https://next-auth.js.org/configuration/pages#error-codes
 */

'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { AlertCircle } from 'lucide-react'
import { AppHeader } from '@/components/shared/AppHeader'
import { AppFooter } from '@/components/shared/AppFooter'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { InContentAd } from '@/components/ads'
import { HeroSection } from './HeroSection'
import { LoginForm } from './LoginForm'
import { ROUTES } from '@/lib/routes'

// NextAuth error messages
const ERROR_MESSAGES: Record<string, { title: string; description: string }> = {
  Configuration: {
    title: 'Server Configuration Error',
    description: 'There is a problem with the server configuration. Please contact support.',
  },
  AccessDenied: {
    title: 'Access Denied',
    description: 'You cancelled the authentication or do not have permission to sign in.',
  },
  Verification: {
    title: 'Verification Error',
    description: 'The verification token has expired or has already been used.',
  },
  OAuthSignin: {
    title: 'OAuth Sign In Error',
    description: 'Error in constructing an authorization URL. Please try again.',
  },
  OAuthCallback: {
    title: 'OAuth Callback Error',
    description: 'Error in handling the response from LinkedIn. Please try again.',
  },
  OAuthCreateAccount: {
    title: 'Account Creation Error',
    description: 'Could not create user in the database. Please try again.',
  },
  EmailCreateAccount: {
    title: 'Email Account Error',
    description: 'Could not create email user in the database.',
  },
  Callback: {
    title: 'Callback Error',
    description: 'Error in the OAuth callback handler route. Please try again.',
  },
  OAuthAccountNotLinked: {
    title: 'Account Already Exists',
    description: 'An account with this email already exists with a different provider.',
  },
  EmailSignin: {
    title: 'Email Sign In Error',
    description: 'Sending the email with the verification token failed.',
  },
  CredentialsSignin: {
    title: 'Sign In Error',
    description: 'Sign in failed. Check the details you provided are correct.',
  },
  SessionRequired: {
    title: 'Authentication Required',
    description: 'You must be signed in to access this page. Please sign in below.',
  },
  SessionExpired: {
    title: 'Session Expired',
    description: 'Your session has expired. Please sign in again to continue.',
  },
  Default: {
    title: 'Authentication Error',
    description: 'An error occurred during authentication. Please try again.',
  },
}

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<{ title: string; description: string } | null>(null)

  useEffect(() => {
    const errorCode = searchParams.get('error')
    
    if (errorCode) {
      const errorDetail = ERROR_MESSAGES[errorCode] || ERROR_MESSAGES.Default
      setError(errorDetail)
    }
  }, [searchParams])

  function handleLogin() {
    router.push(ROUTES.DASHBOARD)
  }

  return (
    <>
      <HeroSection />

      {/* Error Alert */}
      {error && (
        <div className="flex justify-center">
          <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{error.title}</AlertTitle>
            <AlertDescription>{error.description}</AlertDescription>
          </Alert>
        </div>
      )}

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

      {/* Ad placement: After How It Works */}
      <div className="flex justify-center">
        <div className="w-full max-w-3xl">
          <InContentAd slot="7432450266" />
        </div>
      </div>
    </>
  )
}

export function LoginScreen() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-background to-muted/20">
      <AppHeader variant="public" />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="space-y-12">
            {/* Wrap LoginContent in Suspense for useSearchParams */}
            <Suspense fallback={
              <div className="space-y-16">
                <HeroSection />
                <div className="flex justify-center">
                  <LoginForm onLogin={() => {}} />
                </div>
              </div>
            }>
              <LoginContent />
            </Suspense>
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
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

