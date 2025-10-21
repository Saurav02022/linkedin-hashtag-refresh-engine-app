/**
 * Dashboard Screen Component
 * Single Responsibility: Main dashboard view
 */

import { DashboardStats } from './DashboardStats'
import { QuickActions } from './QuickActions'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info } from 'lucide-react'

export function DashboardScreen() {
  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          Welcome back! Ready to generate some hashtags?
        </p>
      </div>

      {/* Info Alert */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Getting Started</AlertTitle>
        <AlertDescription>
          Click "Generate Hashtags" to start creating AI-powered hashtags for your LinkedIn posts.
          You can add up to 10 post URLs at once.
        </AlertDescription>
      </Alert>

      {/* Stats Grid */}
      <DashboardStats />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
        <div className="lg:col-span-2">
          {/* Placeholder for recent activity */}
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Recent activity will appear here
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

