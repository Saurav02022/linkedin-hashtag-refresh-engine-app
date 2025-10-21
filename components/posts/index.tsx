/**
 * Posts Screen Component
 * Single Responsibility: Main posts screen with hashtag generation
 */

'use client'

import { FileText, Hash } from 'lucide-react'
import { PostUrlForm } from './PostUrlForm'
import { PostsList } from './PostsList'
import { EmptyState, ErrorMessage } from '@/components/shared'
import { useGenerateHashtags } from '@/lib/hooks'

export function PostsScreen() {
  const { mutate: generateHashtags, data: posts = [], isPending, error, reset } = useGenerateHashtags()

  function handleGenerateHashtags(urls: string[]) {
    // Reset previous error
    reset()
    // Generate hashtags using TanStack Query
    generateHashtags({ urls })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Hash className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">
            Generate Hashtags
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          AI-powered hashtag generation for your LinkedIn posts
        </p>
      </div>

      {/* Form */}
      <PostUrlForm onSubmit={handleGenerateHashtags} isLoading={isPending} />

      {/* Error */}
      {error && <ErrorMessage message={error.message} retry={reset} />}

      {/* Results */}
      {posts.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Your Hashtags</h2>
          <PostsList posts={posts} isLoading={isPending} />
        </div>
      ) : !isPending && !error ? (
        <EmptyState
          icon={FileText}
          title="No hashtags generated yet"
          description="Enter LinkedIn post URLs above to generate AI-powered hashtags that boost your content reach."
        />
      ) : null}
    </div>
  )
}

