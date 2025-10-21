/**
 * Quick Actions Component
 * Single Responsibility: Dashboard action buttons
 */

'use client'

import { useRouter } from 'next/navigation'
import { Hash, Plus, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function QuickActions() {
  const router = useRouter()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Get started with hashtag generation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          size="lg"
          className="w-full justify-start"
          onClick={() => router.push('/posts')}
        >
          <Hash className="w-5 h-5 mr-2" />
          Generate Hashtags
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full justify-start"
          onClick={() => router.push('/posts')}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Post
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full justify-start"
          onClick={() => router.push('/settings')}
        >
          <Settings className="w-5 h-5 mr-2" />
          Configure Settings
        </Button>
      </CardContent>
    </Card>
  )
}

