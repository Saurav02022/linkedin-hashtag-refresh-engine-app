/**
 * Dashboard Stats Component
 * Single Responsibility: Display overview statistics
 */

import { Hash, TrendingUp, Clock, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function DashboardStats() {
  const stats = [
    {
      title: 'Total Hashtags',
      value: '0',
      icon: Hash,
      description: 'Generated this week',
      trend: null,
    },
    {
      title: 'Posts Refreshed',
      value: '0',
      icon: Zap,
      description: 'Last 30 days',
      trend: null,
    },
    {
      title: 'Time Saved',
      value: '0 min',
      icon: Clock,
      description: 'Estimated savings',
      trend: null,
    },
    {
      title: 'Success Rate',
      value: '0%',
      icon: TrendingUp,
      description: 'Generation success',
      trend: null,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  icon: React.ElementType
  description: string
  trend: string | null
}

function StatCard({ title, value, icon: Icon, description }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}

