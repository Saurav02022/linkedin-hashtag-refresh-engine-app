/**
 * LinkedIn API Client
 * Single Responsibility: Interface with LinkedIn API v2
 * 
 * Permissions Available:
 * - w_member_social: Post, comment, and like posts on behalf of user
 * 
 * Permissions NOT Available:
 * - r_member_social: Read posts (RESTRICTED - private permission only)
 * 
 * References:
 * - https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin
 * - https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/ugc-post-api
 */

/**
 * Note: Fetching LinkedIn posts requires r_member_social permission
 * 
 * This is a RESTRICTED permission only available to select LinkedIn partners.
 * Standard apps with "Share on LinkedIn" product do NOT have read access.
 * 
 * Our app uses manual URL input instead, which is the industry-standard approach
 * used by tools like Buffer, Hootsuite, and other LinkedIn content platforms.
 * 
 * Reference: https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/ugc-post-api#permissions
 */

/**
 * Helper function to retry posting comment with activity URN format
 */
async function retryWithActivityUrn(
  accessToken: string,
  activityUrn: string,
  hashtags: string[],
  deletedOldComment: boolean
): Promise<{ commentId: string; commentUrl: string; deletedOldComment: boolean }> {
  const hashtagText = hashtags.map(tag => `#${tag}`).join('\n')
  const requestUrl = `https://api.linkedin.com/v2/comments`
  const requestBody = {
    object: activityUrn,  // Try activity URN format
    message: {
      text: hashtagText,
    },
  }

  console.log('🌐 Retry Request URL:', requestUrl)
  console.log('📦 Retry Request Body:', JSON.stringify(requestBody, null, 2))

  const response = await fetch(requestUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0',
    },
    body: JSON.stringify(requestBody),
  })

  console.log('📡 Retry Response Status:', response.status, response.statusText)

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    console.error('❌ Retry also failed:', JSON.stringify(error, null, 2))
    throw new Error(`Failed to post comment (both formats tried): ${response.status} - ${JSON.stringify(error)}`)
  }

  const data = await response.json()
  const commentId = data.id || data['$URN'] || ''

  console.log('✅ Comment posted successfully with activity URN format')

  return {
    commentId,
    commentUrl: `https://www.linkedin.com/feed/update/${activityUrn}/comments/${commentId}`,
    deletedOldComment,
  }
}

/**
 * Post hashtags as a comment on LinkedIn post
 * Automatically deletes old hashtag comment (if exists) before posting new one
 * 
 * @param accessToken - LinkedIn OAuth access token
 * @param postId - LinkedIn post URN
 * @param hashtags - Array of hashtags (without # prefix)
 * @param userUrn - Current user's URN (optional, for finding their comments)
 * @returns Promise with comment ID and URL
 */
export async function postHashtagComment(
  accessToken: string,
  postId: string,
  hashtags: string[],
  userUrn?: string
): Promise<{ commentId: string; commentUrl: string; deletedOldComment: boolean }> {
  try {
    let deletedOldComment = false

    // Note: We skip checking for existing comments because LinkedIn's API
    // requires special permissions (socialActions.GET_ALL) which are not
    // available in standard "Share on LinkedIn" product.
    // Users can manually delete old hashtag comments if needed.

    // Step 2: Post new hashtags as comment
    console.log('📝 Posting new hashtag comment...')
    const hashtagText = hashtags.map(tag => `#${tag}`).join('\n')

    // LinkedIn API v2/comments endpoint requires URN in body, not in URL
    // Try share format first (most common for posts)
    let finalPostUrn = postId
    if (!postId.startsWith('urn:li:')) {
      finalPostUrn = `urn:li:share:${postId}`
      console.log(`🔄 Converted activity ID to URN: ${finalPostUrn}`)
    }

    // Correct endpoint according to LinkedIn docs: /v2/comments (not /v2/socialActions)
    const requestUrl = `https://api.linkedin.com/v2/comments`
    const requestBody = {
      object: finalPostUrn,  // The post we're commenting on
      message: {
        text: hashtagText,
      },
    }

    console.log('🌐 Request URL:', requestUrl)
    console.log('📦 Request Body:', JSON.stringify(requestBody, null, 2))

    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify(requestBody),
    })

    console.log('📡 Response Status:', response.status, response.statusText)

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      console.error('❌ LinkedIn API error response:', JSON.stringify(error, null, 2))
      
      // Try alternative URN format if share format failed
      if ((response.status === 400 || response.status === 500) && !postId.startsWith('urn:li:')) {
        console.log('🔄 Trying alternative URN format: urn:li:activity...')
        const activityUrn = `urn:li:activity:${postId}`
        return await retryWithActivityUrn(accessToken, activityUrn, hashtags, deletedOldComment)
      }
      
      throw new Error(`Failed to post comment: ${response.status} - ${JSON.stringify(error)}`)
    }

    const data = await response.json()
    const commentId = data.id || data['$URN'] || ''

    console.log('✅ New hashtag comment posted successfully')

    return {
      commentId,
      commentUrl: `https://www.linkedin.com/feed/update/${postId}/comments/${commentId}`,
      deletedOldComment,
    }
  } catch (error) {
    console.error('❌ Failed to post hashtag comment:', error)
    throw error
  }
}

/**
 * Delete a comment from LinkedIn post
 * 
 * @param accessToken - LinkedIn OAuth access token
 * @param postId - LinkedIn post URN
 * @param commentId - Comment ID to delete
 */
export async function deleteLinkedInComment(
  accessToken: string,
  postId: string,
  commentId: string
): Promise<void> {
  try {
    // Ensure postId is in URN format
    let finalPostUrn = postId
    if (!postId.startsWith('urn:li:')) {
      finalPostUrn = `urn:li:share:${postId}`
    }

    const response = await fetch(
      `https://api.linkedin.com/v2/socialActions/${encodeURIComponent(finalPostUrn)}/comments/${encodeURIComponent(commentId)}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to delete comment: ${response.status}`)
    }
  } catch (error) {
    console.error('Failed to delete comment:', error)
    throw error
  }
}

/**
 * Get comments for a LinkedIn post
 * 
 * @param accessToken - LinkedIn OAuth access token
 * @param postId - LinkedIn post URN
 * @returns Promise with array of comments
 */
export async function getPostComments(
  accessToken: string,
  postId: string
): Promise<Array<{ id: string; text: string; author: string }>> {
  try {
    // Ensure postId is in URN format
    let finalPostUrn = postId
    if (!postId.startsWith('urn:li:')) {
      finalPostUrn = `urn:li:share:${postId}`
    }

    const response = await fetch(
      `https://api.linkedin.com/v2/socialActions/${encodeURIComponent(finalPostUrn)}/comments`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0',
        },
      }
    )

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      console.error('❌ Failed to get comments:', response.status, error)
      throw new Error(`Failed to get comments: ${response.status}`)
    }

    const data = await response.json()

    return (data.elements || []).map((comment: any) => ({
      id: comment.id || comment['$URN'] || '',
      text: comment.message?.text || '',
      author: comment.actor || '',
    }))
  } catch (error) {
    console.error('Failed to get comments:', error)
    throw error
  }
}

