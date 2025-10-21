/**
 * Connection Status Component
 * Single Responsibility: Display LinkedIn connection status
 */

'use client'

import { useState } from 'react'
import { CheckCircle2, XCircle, Linkedin, Loader2 } from 'lucide-react'
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

export function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleConnect() {
    setIsLoading(true)
    try {
      // TODO: Implement LinkedIn OAuth
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsConnected(true)
      toast.success('LinkedIn account connected successfully!')
    } catch (error) {
      toast.error('Failed to connect LinkedIn account')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDisconnect() {
    setIsLoading(true)
    try {
      // TODO: Implement disconnect logic
      await new Promise(resolve => setTimeout(resolve, 500))
      setIsConnected(false)
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
            <div className={`p-2 rounded-lg ${isConnected ? 'bg-success/10' : 'bg-muted'}`}>
              <Linkedin className={`w-5 h-5 ${isConnected ? 'text-success' : 'text-muted-foreground'}`} />
            </div>
            <div>
              <p className="font-medium">
                {isConnected ? 'Connected' : 'Not Connected'}
              </p>
              <p className="text-sm text-muted-foreground">
                {isConnected
                  ? 'Your LinkedIn account is connected'
                  : 'Connect to start generating hashtags'}
              </p>
            </div>
          </div>
          {isConnected ? (
            <CheckCircle2 className="w-5 h-5 text-success" />
          ) : (
            <XCircle className="w-5 h-5 text-muted-foreground" />
          )}
        </div>

        {/* Actions */}
        {isConnected ? (
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

