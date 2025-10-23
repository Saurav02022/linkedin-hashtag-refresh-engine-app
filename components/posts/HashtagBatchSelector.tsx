/**
 * Hashtag Batch Selector Component
 * Single Responsibility: Display strategic batches and allow user selection
 */

'use client'

import { useState } from 'react'
import { Check, Copy, ExternalLink, Loader2, Plus, Send, Sparkles, TrendingUp, Users, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { toast } from 'sonner'
import { formatHashtag } from '@/lib/utils/validation'
import type { HashtagBatch } from '@/types'

interface HashtagBatchSelectorProps {
  postUrl: string
  batches: HashtagBatch[]
}

export function HashtagBatchSelector({ postUrl, batches }: HashtagBatchSelectorProps) {
  const [selectedHashtags, setSelectedHashtags] = useState<Set<string>>(
    new Set(batches.find(b => b.recommended)?.hashtags || [])
  )
  const [activeBatch, setActiveBatch] = useState<string>(
    batches.find(b => b.recommended)?.id || batches[0]?.id || ''
  )
  const [copied, setCopied] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const [newHashtag, setNewHashtag] = useState('')
  const [showManualFallback, setShowManualFallback] = useState(false)

  function removeHashtag(hashtag: string) {
    setSelectedHashtags(prev => {
      const next = new Set(prev)
      next.delete(hashtag)
      return next
    })
  }

  function addHashtag() {
    const cleaned = newHashtag.trim().toLowerCase().replace(/^#/, '')
    
    if (!cleaned) {
      return
    }

    // Validate hashtag
    if (cleaned.length < 3 || cleaned.length > 30) {
      toast.error('Hashtag must be 3-30 characters')
      return
    }

    if (!/^[a-zA-Z0-9_]+$/.test(cleaned)) {
      toast.error('Hashtag can only contain letters, numbers, and underscores')
      return
    }

    if (selectedHashtags.has(cleaned)) {
      toast.error('Hashtag already added')
      return
    }

    if (selectedHashtags.size >= 12) {
      toast.error('Maximum 12 hashtags allowed')
      return
    }

    setSelectedHashtags(prev => new Set([...prev, cleaned]))
    setNewHashtag('')
    toast.success('Hashtag added')
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      addHashtag()
    }
  }

  function selectBatch(batchId: string) {
    const batch = batches.find(b => b.id === batchId)
    if (batch) {
      setSelectedHashtags(new Set(batch.hashtags.slice(0, 12)))
      setActiveBatch(batchId)
      toast.success(`Selected ${batch.strategy}`)
    }
  }

  async function copyToClipboard() {
    const hashtagText = Array.from(selectedHashtags).map(formatHashtag).join(' ')
    
    try {
      await navigator.clipboard.writeText(hashtagText)
      setCopied(true)
      toast.success('Hashtags copied to clipboard!')
      
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to copy hashtags')
    }
  }

  async function postToLinkedIn() {
    if (selectedHashtags.size === 0) {
      toast.error('Please select at least one hashtag')
      return
    }

    setIsPosting(true)
    
    try {
      // Post comment using LinkedIn REST API
      const response = await fetch('/api/linkedin/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postUrl,
          hashtags: Array.from(selectedHashtags),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // API failed - show manual fallback modal
        await copyToClipboard() // Auto-copy hashtags
        setShowManualFallback(true)
        throw new Error(data.error?.message || 'Failed to post comment')
      }
      
      // Success!
      toast.success('Hashtags posted to LinkedIn!', {
        description: 'Your hashtags are now live as a comment on your post',
      })
      
      console.log('Posted comment:', data)
    } catch (error) {
      console.error('Failed to post to LinkedIn:', error)
      // Error toast already shown by manual fallback modal
    } finally {
      setIsPosting(false)
    }
  }

  function getStrategyIcon(strategy: string) {
    if (strategy.toLowerCase().includes('reach')) return Sparkles
    if (strategy.toLowerCase().includes('viral')) return TrendingUp
    if (strategy.toLowerCase().includes('engagement')) return Users
    return Sparkles
  }

  return (
    <>
      <div className="space-y-6">
        {/* Strategic Batches */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Strategic Batches</h3>
            <p className="text-sm text-muted-foreground">
              Choose a strategy or select individual hashtags
            </p>
          </div>
          
          <Alert>
            <AlertDescription className="text-xs">
              <strong>Note:</strong> New hashtags will be posted as a comment. If you have existing hashtag comments, please delete them manually on LinkedIn before posting new ones.
            </AlertDescription>
          </Alert>

          <div className="grid gap-4 md:grid-cols-3">
            {batches.map((batch) => {
              const Icon = getStrategyIcon(batch.strategy)
              const isActive = activeBatch === batch.id

              return (
                <Card
                  key={batch.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isActive ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => selectBatch(batch.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{batch.strategy}</CardTitle>
                          {batch.recommended && (
                            <Badge variant="secondary" className="text-xs mt-1">
                              Recommended
                            </Badge>
                          )}
                        </div>
                      </div>
                      {isActive && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground mb-3">
                      {batch.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {batch.hashtags.slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                      {batch.hashtags.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{batch.hashtags.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <Separator />

        {/* Your Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Your Selection</CardTitle>
            <CardDescription className="text-xs font-mono truncate">
              {postUrl}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Selected hashtags */}
            <div className="min-h-[60px]">
              {selectedHashtags.size === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No hashtags selected. Choose a batch or add custom hashtags.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {Array.from(selectedHashtags).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-sm cursor-pointer hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-colors"
                      onClick={() => removeHashtag(tag)}
                    >
                      #{tag}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Add custom hashtag */}
            <div className="space-y-2">
              <label htmlFor="new-hashtag" className="text-sm font-medium">
                Add Custom Hashtag
              </label>
              <div className="flex gap-2">
                <Input
                  id="new-hashtag"
                  value={newHashtag}
                  onChange={(e) => setNewHashtag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter hashtag (press Enter)"
                  className="flex-1"
                  disabled={selectedHashtags.size >= 12}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={addHashtag}
                  disabled={!newHashtag.trim() || selectedHashtags.size >= 12}
                  aria-label="Add hashtag"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {selectedHashtags.size}/12 hashtags selected
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 flex-wrap">
            <Button
              onClick={copyToClipboard}
              variant="outline"
              disabled={selectedHashtags.size === 0}
              className="flex-1 sm:flex-none"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
            <Button
              onClick={postToLinkedIn}
              disabled={selectedHashtags.size === 0 || isPosting}
              className="flex-1 sm:flex-none"
            >
              {isPosting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Post to LinkedIn
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Manual Fallback Modal */}
      <Dialog open={showManualFallback} onOpenChange={setShowManualFallback}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Manual Post Required</DialogTitle>
            <DialogDescription>
              We couldn't post automatically. Please follow these simple steps to add hashtags manually.
            </DialogDescription>
          </DialogHeader>

          <Alert>
            <Check className="h-4 w-4 text-success" />
            <AlertTitle>Hashtags Copied!</AlertTitle>
            <AlertDescription>
              Your hashtags have been copied to clipboard.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Steps:</h4>
              <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                <li>Click the button below to open your LinkedIn post</li>
                <li>Find the comment section below your post</li>
                <li>Paste the hashtags (they're already copied!)</li>
                <li>Click "Post" to publish your comment</li>
              </ol>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <p className="text-xs font-medium mb-2">Your Hashtags:</p>
              <p className="text-sm font-mono break-all">
                {Array.from(selectedHashtags).map(tag => `#${tag}`).join(' ')}
              </p>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowManualFallback(false)}
              className="w-full sm:w-auto"
            >
              Close
            </Button>
            <Button
              onClick={() => window.open(postUrl, '_blank')}
              className="w-full sm:w-auto"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open LinkedIn Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
