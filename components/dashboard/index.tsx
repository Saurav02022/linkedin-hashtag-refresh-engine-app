/**
 * Dashboard Screen Component
 * Single Responsibility: Main dashboard view with quick actions
 */

'use client'

import { useRouter } from 'next/navigation'
import { DashboardStats } from './DashboardStats'
import { QuickActions } from './QuickActions'
import { ActivityLog } from './ActivityLog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Hash, ArrowRight, Sparkles } from 'lucide-react'
import { ROUTES } from '@/lib/routes'

export function DashboardScreen() {
  const router = useRouter()

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          Generate AI-powered hashtags for your LinkedIn posts in seconds.
        </p>
      </div>

      {/* Info Alert */}
      <Alert className="border-primary/50 bg-primary/5">
        <Sparkles className="h-4 w-4 text-primary" />
        <AlertTitle>How It Works</AlertTitle>
        <AlertDescription>
          Paste your LinkedIn post URL, get AI-generated hashtags, and post them as comments. 
          Auto-refresh feature coming in Phase 3 to keep your posts fresh!
        </AlertDescription>
      </Alert>

      {/* Stats Grid */}
      <DashboardStats />

      {/* Main Action Card */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-primary" />
            Generate Hashtags
          </CardTitle>
          <CardDescription>
            Paste your LinkedIn post URL to generate optimized hashtags with AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            size="lg" 
            className="w-full sm:w-auto"
            onClick={() => router.push(ROUTES.POSTS)}
          >
            Start Generating
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>

      {/* Secondary Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <QuickActions />
        <ActivityLog />
      </div>
    </div>
  )
}
