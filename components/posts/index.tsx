/**
 * Posts Screen Component
 * Single Responsibility: Main posts screen with hashtag generation
 */

'use client'

import { FileText, Hash, Sparkles } from 'lucide-react'
import { PostUrlForm } from './PostUrlForm'
import { PostsList } from './PostsList'
import { EmptyState, ErrorMessage } from '@/components/shared'
import { useGenerateHashtags } from '@/lib/hooks'
import { Card, CardContent } from '@/components/ui/card'
import type { PostFormInput } from '@/lib/validations'

export function PostsScreen() {
  const { mutate: generateHashtags, data: posts = [], isPending, error, reset } = useGenerateHashtags()

  function handleGenerateHashtags(data: PostFormInput) {
    // Reset previous error
    reset()
    // Generate hashtags using manual content
    generateHashtags({ 
      content: data.content,
      url: data.url || `manual-${Date.now()}`
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Hash className="w-8 h-8 text-primary" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Generate AI Hashtags
            </h1>
            <p className="text-base text-muted-foreground mt-1 leading-relaxed">
              Boost your LinkedIn engagement in seconds
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats Card */}
      <Card className="border-primary/20 bg-linear-to-br from-primary/5 to-transparent">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Sparkles className="w-5 h-5 text-primary" aria-hidden="true" />
                <span className="text-2xl font-bold text-primary">2-3s</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Generation Time</p>
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Hash className="w-5 h-5 text-primary" aria-hidden="true" />
                <span className="text-2xl font-bold text-primary">10-12</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Hashtags Generated</p>
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <FileText className="w-5 h-5 text-primary" aria-hidden="true" />
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Strategy Batches</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <PostUrlForm onSubmit={handleGenerateHashtags} isLoading={isPending} />

      {/* Error */}
      {error && <ErrorMessage message={error.message} retry={reset} />}

      {/* Results */}
      {posts.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Hash className="w-6 h-6 text-primary" aria-hidden="true" />
            <h2 className="text-2xl font-semibold">Your Hashtags</h2>
          </div>
          <PostsList posts={posts} isLoading={isPending} />
        </div>
      ) : !isPending && !error ? (
        <EmptyState
          icon={FileText}
          title="Ready to generate hashtags?"
          description="Paste your LinkedIn post content above and let AI create relevant, trending hashtags that maximize your reach."
        />
      ) : null}
    </div>
  )
}

