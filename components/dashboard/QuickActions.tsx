/**
 * Quick Actions Component
 * Single Responsibility: Dashboard action buttons
 */

'use client'

import { useRouter } from 'next/navigation'
import { Hash, Plus, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ROUTES } from '@/lib/routes'

export function QuickActions() {
  const router = useRouter()

  return (
    <Card className="border-primary/20 bg-linear-to-br from-primary/5 to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hash className="w-5 h-5 text-primary" />
          Ready to Generate?
        </CardTitle>
        <CardDescription>
          Create AI-powered hashtags in seconds
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          size="lg"
          className="w-full justify-center"
          onClick={() => router.push(ROUTES.POSTS)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Generate Hashtags Now
        </Button>
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => router.push(ROUTES.POSTS)}
          >
            <Hash className="w-4 h-4 mr-2" />
            View Posts
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => router.push(ROUTES.SETTINGS)}
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

