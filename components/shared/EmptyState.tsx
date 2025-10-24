/**
 * Empty State Component
 * Single Responsibility: Display empty state with icon and message
 */

import { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 sm:py-16 text-center', className)}>
      <div className="rounded-full bg-muted p-8 mb-6">
        <Icon className="w-16 h-16 text-muted-foreground" aria-hidden="true" />
      </div>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-base text-muted-foreground max-w-md mb-8 leading-relaxed">{description}</p>
      {action && (
        <Button size="lg" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}

