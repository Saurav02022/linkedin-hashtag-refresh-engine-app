/**
 * LinkedIn REST API Client
 * Uses official LinkedIn REST API v2 with OAuth access token
 */

/**
 * Extract activity ID from LinkedIn post URL
 * Example: https://linkedin.com/posts/username-activity-1234567890-abc → 1234567890
 */
function extractActivityId(url: string): string | null {
  const match = url.match(/activity[:-](\d+)/)
  return match ? match[1] : null
}

/**
 * Post a comment on LinkedIn post using official REST API
 * Note: w_member_social permission allows WRITE only (no read/delete of existing comments)
 * 
 * @param accessToken - OAuth access token from NextAuth
 * @param postUrl - LinkedIn post URL
 * @param commentText - Comment text (hashtags)
 * @returns Comment ID if successful
 */
export async function postCommentViaInternalAPI(
  accessToken: string,
  postUrl: string,
  commentText: string
): Promise<{ success: boolean; commentId?: string; message: string }> {
  try {
    const activityId = extractActivityId(postUrl)
    if (!activityId) {
      return {
        success: false,
        message: 'Could not extract activity ID from URL',
      }
    }

    console.log('📝 Posting comment via LinkedIn REST API...')
    console.log('🆔 Activity ID:', activityId)

    // Get the user's person URN
    const personId = await getLinkedInPersonId(accessToken)
    if (!personId) {
      return {
        success: false,
        message: 'Could not get LinkedIn person ID',
      }
    }

    console.log('👤 Person ID:', personId)

    // Post comment directly using activity URN
    // (This is what works based on terminal testing)
    const activityUrn = `urn:li:activity:${activityId}`
    
    const apiUrl = `https://api.linkedin.com/v2/socialActions/${encodeURIComponent(activityUrn)}/comments`

    const payload = {
      actor: `urn:li:person:${personId}`,
      message: {
        text: commentText,
      },
    }

    console.log('📤 Posting to:', apiUrl)
    console.log('📦 Payload:', JSON.stringify(payload, null, 2))

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
        'LinkedIn-Version': '202405',
      },
      body: JSON.stringify(payload),
    })

    console.log(`📡 Response status:`, response.status)

    if (response.ok || response.status === 201) {
      const data = await response.json()
      console.log('✅ Comment posted successfully')
      return {
        success: true,
        commentId: data.id || data.entityUrn,
        message: 'Comment posted successfully',
      }
    }

    // Error
    const errorText = await response.text()
    console.error(`❌ Error:`, errorText)
    return {
      success: false,
      message: `Failed to post comment (${response.status})`,
    }
  } catch (error) {
    console.error('❌ Failed to post comment:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}


/**
 * Get user's LinkedIn person ID from access token
 */
export async function getLinkedInPersonId(accessToken: string): Promise<string | null> {
  try {
    const response = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.sub // This is the person ID
  } catch (error) {
    console.error('Failed to get person ID:', error)
    return null
  }
}

