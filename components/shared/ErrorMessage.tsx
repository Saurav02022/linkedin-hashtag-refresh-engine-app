/**
 * Error Message Component
 * Single Responsibility: Display error messages
 */

import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

interface ErrorMessageProps {
  title?: string
  message: string
  retry?: () => void
}

export function ErrorMessage({ 
  title = 'Error', 
  message, 
  retry 
}: ErrorMessageProps) {
  return (
    <Alert variant="destructive" className="my-4">
      <AlertCircle className="h-4 w-4" aria-hidden="true" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="mt-2 leading-relaxed">
        {message}
        {retry && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={retry}
            className="mt-3"
          >
            Try Again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}

