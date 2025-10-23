/**
 * Hashtag Post Modal Component
 * Single Responsibility: Review and post generated hashtags to LinkedIn
 */

'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Loader2, 
  Check, 
  ExternalLink, 
  X,
  AlertCircle,
  Copy,
  Sparkles,
} from 'lucide-react'
import { usePostHashtagsMutation } from '@/lib/hooks/usePostsQuery'
import { toast } from 'sonner'
import type { LinkedInPost } from '@/types/post'

interface HashtagPostModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: LinkedInPost | null
  hashtags: string[]
  onSuccess?: () => void
}

export function HashtagPostModal({
  open,
  onOpenChange,
  post,
  hashtags: initialHashtags,
  onSuccess,
}: HashtagPostModalProps) {
  const [hashtags, setHashtags] = useState<string[]>(initialHashtags)
  const [editMode, setEditMode] = useState(false)
  const [editText, setEditText] = useState('')

  const { mutate: postHashtags, isPending, isSuccess } = usePostHashtagsMutation()

  // Update when new hashtags are provided
  useState(() => {
    setHashtags(initialHashtags)
    setEditText(initialHashtags.map(t => `#${t}`).join('\n'))
  })

  if (!post) return null

  const handlePost = () => {
    if (hashtags.length === 0) {
      toast.error('No hashtags to post')
      return
    }

    postHashtags(
      {
        postId: post.id,
        hashtags,
      },
      {
        onSuccess: (data) => {
          toast.success('Hashtags posted to LinkedIn!', {
            description: 'Your hashtags have been added as a comment.',
            action: {
              label: 'View on LinkedIn',
              onClick: () => window.open(data.commentUrl, '_blank'),
            },
          })
          onSuccess?.()
          onOpenChange(false)
        },
        onError: (error) => {
          // Check if it's a permission error
          const isPermissionError = error.message.includes('permission') || 
                                     error.message.includes('created or reposted')
          
          toast.error(isPermissionError ? 'Permission Denied' : 'Failed to post hashtags', {
            description: error.message,
            duration: isPermissionError ? 7000 : 5000, // Longer duration for permission errors
          })
        },
      }
    )
  }

  const handleCopy = () => {
    const text = hashtags.map(t => `#${t}`).join('\n')
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const handleEditSave = () => {
    // Parse hashtags from textarea
    const parsed = editText
      .split(/\s+/) // Split by whitespace
      .filter(t => t.startsWith('#')) // Only tags with #
      .map(t => t.substring(1).toLowerCase()) // Remove # and lowercase
      .filter((t, i, arr) => arr.indexOf(t) === i) // Remove duplicates

    if (parsed.length === 0) {
      toast.error('Please enter at least one hashtag')
      return
    }

    setHashtags(parsed)
    setEditText(parsed.map(t => `#${t}`).join('\n'))
    setEditMode(false)
    toast.success(`Updated to ${parsed.length} hashtags`)
  }

  const handleRemoveHashtag = (index: number) => {
    const updated = hashtags.filter((_, i) => i !== index)
    setHashtags(updated)
    setEditText(updated.map(t => `#${t}`).join('\n'))
    toast.success('Hashtag removed')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Review Generated Hashtags
          </DialogTitle>
          <DialogDescription>
            Review and edit hashtags before posting to LinkedIn
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Post Preview */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Post Content:</p>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {post.content || 'No content available'}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2"
              asChild
            >
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                View on LinkedIn
              </a>
            </Button>
          </div>

          {/* Success State */}
          {isSuccess && (
            <Alert className="border-success bg-success/10">
              <Check className="h-4 w-4 text-success" />
              <AlertDescription className="text-success">
                Hashtags posted successfully! View your comment on LinkedIn.
              </AlertDescription>
            </Alert>
          )}

          {/* Hashtags Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                {hashtags.length} Hashtags
              </p>
              <div className="flex gap-2">
                {!editMode ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditMode(true)}
                    >
                      Edit
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditMode(false)
                        setEditText(hashtags.map(t => `#${t}`).join('\n'))
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleEditSave}
                    >
                      Save
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Display Mode */}
            {!editMode ? (
              <div className="flex flex-wrap gap-2">
                {hashtags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-sm px-3 py-1.5 gap-2"
                  >
                    #{tag}
                    <button
                      onClick={() => handleRemoveHashtag(index)}
                      className="ml-1 hover:text-destructive transition-colors"
                      aria-label="Remove hashtag"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            ) : (
              // Edit Mode
              <div className="space-y-2">
                <Textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  placeholder="Enter hashtags, one per line or separated by spaces"
                  className="min-h-[200px] font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Tip: Each hashtag should start with # (e.g., #javascript #webdev)
                </p>
              </div>
            )}
          </div>

          {/* Warning if no hashtags */}
          {hashtags.length === 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You need at least one hashtag to post to LinkedIn.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handlePost}
            disabled={isPending || hashtags.length === 0 || isSuccess}
            className="w-full sm:w-auto"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Posting...
              </>
            ) : isSuccess ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Posted
              </>
            ) : (
              <>
                Post to LinkedIn
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

