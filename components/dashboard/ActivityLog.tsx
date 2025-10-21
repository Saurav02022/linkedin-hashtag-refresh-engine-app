/**
 * Activity Log Component
 * Single Responsibility: Display recent hashtag generation history
 */

'use client'

import { formatRelativeTime } from '@/lib/utils/format'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle, RotateCcw, ExternalLink } from 'lucide-react'

interface Activity {
  id: string
  postUrl: string
  hashtagCount: number
  status: 'success' | 'failed' | 'undone'
  createdAt: Date
  canUndo: boolean
}

interface ActivityLogProps {
  activities?: Activity[]
}

export function ActivityLog({ activities = [] }: ActivityLogProps) {
  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your hashtag generation history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-sm text-muted-foreground">
            No activity yet. Generate your first hashtags to get started!
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Last {activities.length} generations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

interface ActivityItemProps {
  activity: Activity
}

function ActivityItem({ activity }: ActivityItemProps) {
  const statusConfig = {
    success: {
      icon: CheckCircle2,
      color: 'text-success',
      badge: 'default' as const,
      label: 'Success',
    },
    failed: {
      icon: XCircle,
      color: 'text-destructive',
      badge: 'destructive' as const,
      label: 'Failed',
    },
    undone: {
      icon: RotateCcw,
      color: 'text-muted-foreground',
      badge: 'secondary' as const,
      label: 'Undone',
    },
  }

  const config = statusConfig[activity.status]
  const Icon = config.icon

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
      <div className="flex items-start gap-3 flex-1">
        <Icon className={`w-5 h-5 mt-0.5 ${config.color}`} />
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium truncate max-w-md">
              {activity.hashtagCount} hashtags generated
            </p>
            <Badge variant={config.badge} className="text-xs">
              {config.label}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{formatRelativeTime(activity.createdAt)}</span>
            <span>•</span>
            <a
              href={activity.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-primary transition-colors"
            >
              View post
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
      {activity.canUndo && activity.status === 'success' && (
        <Button variant="ghost" size="sm">
          <RotateCcw className="w-4 h-4 mr-2" />
          Undo
        </Button>
      )}
    </div>
  )
}

