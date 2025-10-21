/**
 * Hashtag Display Component
 * Single Responsibility: Display generated hashtags with copy functionality
 */

'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { formatHashtag } from '@/lib/utils/validation'

interface HashtagDisplayProps {
  postUrl: string
  hashtags: string[]
}

export function HashtagDisplay({ postUrl, hashtags }: HashtagDisplayProps) {
  const [copied, setCopied] = useState(false)

  async function copyToClipboard() {
    const hashtagText = hashtags.map(formatHashtag).join(' ')
    
    try {
      await navigator.clipboard.writeText(hashtagText)
      setCopied(true)
      toast.success('Hashtags copied to clipboard!')
      
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to copy hashtags')
    }
  }

  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle className="text-lg">Generated Hashtags</CardTitle>
        <CardDescription className="text-xs font-mono truncate">
          {postUrl}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {hashtags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="hashtag-badge"
            >
              {formatHashtag(tag)}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="w-full sm:w-auto"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy All
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

