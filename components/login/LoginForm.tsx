/**
 * Login Form Component
 * Single Responsibility: Handle LinkedIn OAuth authentication
 */

'use client'

import { useState } from 'react'
import { Linkedin, Loader2, Shield, UserCheck, Lock, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface LoginFormProps {
  onLogin?: () => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLinkedInLogin() {
    setIsLoading(true)
    setError(null)

    try {
      // TODO: Implement LinkedIn OAuth flow
      // For now, simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Placeholder: Will be replaced with actual OAuth
      if (onLogin) {
        onLogin()
      }
    } catch (err) {
      setError('Failed to connect with LinkedIn. Please try again.')
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Linkedin className="w-8 h-8 text-primary" />
        </div>
        <div>
          <CardTitle className="text-2xl">Connect Your LinkedIn Account</CardTitle>
          <CardDescription className="mt-2">
            Secure authentication with LinkedIn to start generating hashtags
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Permissions explanation */}
        <div className="space-y-3">
          <p className="text-sm font-medium">What we'll access:</p>
          <div className="space-y-2">
            <PermissionItem
              icon={UserCheck}
              title="View your basic profile"
              description="Name and email only"
            />
            <PermissionItem
              icon={Shield}
              title="Post comments on your posts"
              description="Hashtags only, with your approval"
            />
          </div>
        </div>

        {/* What we won't do */}
        <div className="space-y-2 p-4 rounded-lg bg-muted">
          <p className="text-sm font-medium">We will NEVER:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li className="flex items-start gap-2">
              <Lock className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Create posts without your permission</span>
            </li>
            <li className="flex items-start gap-2">
              <Lock className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Send messages or connection requests</span>
            </li>
            <li className="flex items-start gap-2">
              <Lock className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Share your data with third parties</span>
            </li>
          </ul>
        </div>

        {/* Error message */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Login button */}
        <Button
          size="lg"
          className="w-full"
          onClick={handleLinkedInLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Linkedin className="w-5 h-5 mr-2" />
              Connect with LinkedIn
            </>
          )}
        </Button>

        {/* Disclaimer */}
        <p className="text-xs text-center text-muted-foreground">
          By connecting, you agree to our Terms of Service and Privacy Policy.
          You can disconnect anytime from Settings.
        </p>
      </CardContent>
    </Card>
  )
}

interface PermissionItemProps {
  icon: React.ElementType
  title: string
  description: string
}

function PermissionItem({ icon: Icon, title, description }: PermissionItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-lg bg-success/10">
        <Icon className="w-4 h-4 text-success" />
      </div>
      <div className="flex-1 space-y-0.5">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <CheckCircle2 className="w-4 h-4 text-success mt-2" />
    </div>
  )
}

