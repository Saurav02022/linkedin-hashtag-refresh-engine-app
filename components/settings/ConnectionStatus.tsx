/**
 * Connection Status Component
 * Single Responsibility: Display LinkedIn connection status
 */

'use client'

import { useState } from 'react'
import { CheckCircle2, XCircle, Linkedin, Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { useAuth } from '@/lib/contexts/AuthContext'

export function ConnectionStatus() {
  const { user, isAuthenticated, logout } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  async function handleConnect() {
    setIsLoading(true)
    try {
      // Redirect to LinkedIn OAuth using NextAuth
      await signIn('linkedin', { callbackUrl: '/dashboard' })
    } catch (error) {
      toast.error('Failed to connect LinkedIn account')
      setIsLoading(false)
    }
  }

  async function handleDisconnect() {
    setIsLoading(true)
    try {
      await logout()
      toast.success('LinkedIn account disconnected')
    } catch (error) {
      toast.error('Failed to disconnect account')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>LinkedIn Connection</CardTitle>
        <CardDescription>
          Manage your LinkedIn account connection
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status */}
        <div className="flex items-center justify-between p-4 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isAuthenticated ? 'bg-success/10' : 'bg-muted'}`}>
              <Linkedin className={`w-5 h-5 ${isAuthenticated ? 'text-success' : 'text-muted-foreground'}`} />
            </div>
            <div>
              <p className="font-medium">
                {isAuthenticated ? 'Connected' : 'Not Connected'}
              </p>
              <p className="text-sm text-muted-foreground">
                {isAuthenticated
                  ? `Connected as ${user?.name || user?.email}`
                  : 'Connect to start generating hashtags'}
              </p>
            </div>
          </div>
          {isAuthenticated ? (
            <CheckCircle2 className="w-5 h-5 text-success" />
          ) : (
            <XCircle className="w-5 h-5 text-muted-foreground" />
          )}
        </div>

        {/* Actions */}
        {isAuthenticated ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={isLoading}>
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Disconnect Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Disconnect LinkedIn Account?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove your LinkedIn connection and you'll need to reconnect 
                  to generate hashtags. Your data will be preserved.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDisconnect}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Disconnect
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button onClick={handleConnect} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Linkedin className="w-4 h-4 mr-2" />
                Connect LinkedIn
              </>
            )}
          </Button>
        )}

        {/* Info */}
        <div className="text-sm text-muted-foreground space-y-2">
          <p className="font-medium">What we access:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Basic profile information (name, email)</li>
            <li>Permission to post comments on your posts</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

