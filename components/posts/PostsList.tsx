/**
 * Posts List Component
 * Single Responsibility: Display list of posts with hashtags
 */

'use client'

import { HashtagDisplay } from './HashtagDisplay'
import { HashtagBatchSelector } from './HashtagBatchSelector'
import { LoadingSpinner } from '@/components/shared'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { HashtagGenerationResponse } from '@/types'

interface PostsListProps {
  posts: HashtagGenerationResponse[]
  isLoading?: boolean
}

export function PostsList({ posts, isLoading }: PostsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-3 w-3/4" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((j) => (
                  <Skeleton key={j} className="h-6 w-24 rounded-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return null
  }

  return (
    <div className="space-y-8">
      {posts.map((post, index) => (
        <div key={index}>
          {post.batches && post.batches.length > 0 ? (
            // New: Display batch selector with strategies
            <HashtagBatchSelector
              postUrl={post.postUrl}
              batches={post.batches}
            />
          ) : (
            // Legacy: Display simple hashtag list
            <HashtagDisplay
              postUrl={post.postUrl}
              hashtags={post.hashtags}
            />
          )}
        </div>
      ))}
    </div>
  )
}

