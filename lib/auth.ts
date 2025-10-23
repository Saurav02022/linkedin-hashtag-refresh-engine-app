/**
 * NextAuth.js Configuration
 * Single Responsibility: Authentication configuration with LinkedIn OAuth
 * 
 * References:
 * - https://next-auth.js.org/configuration/options
 * - https://next-auth.js.org/providers/linkedin
 * - https://next-auth.js.org/configuration/callbacks
 * - https://learn.microsoft.com/en-us/linkedin/shared/authentication/token-introspection
 */

import { NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import LinkedInProvider from 'next-auth/providers/linkedin'
import { ROUTES } from './routes'

/**
 * Refresh LinkedIn Access Token
 * 
 * LinkedIn tokens expire after 60 days. This function refreshes the token
 * before it expires to maintain seamless user experience.
 * 
 * Reference: https://learn.microsoft.com/en-us/linkedin/shared/authentication/authentication
 * 
 * @param token - The JWT token containing the expired access token
 * @returns Updated token with new access token
 */
async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    // LinkedIn OAuth 2.0 token endpoint
    const url = 'https://www.linkedin.com/oauth/v2/accessToken'
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken as string,
        client_id: process.env.LINKEDIN_CLIENT_ID || '',
        client_secret: process.env.LINKEDIN_CLIENT_SECRET || '',
      }),
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${refreshedTokens.error}`)
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      // LinkedIn may return a new refresh token
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    console.error('Error refreshing access token:', error)
    
    // Return token with error flag
    // This will trigger a re-authentication on next session check
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID || '',
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
      
      // LinkedIn OpenID Connect discovery endpoint
      wellKnown: 'https://www.linkedin.com/oauth/.well-known/openid-configuration',
      
      // Authorization configuration
      authorization: {
        params: {
          scope: 'openid profile email w_member_social',
          // Scopes explained:
          // - openid: Required for OpenID Connect authentication
          // - profile: Access to user's basic profile (name, picture)
          // - email: Access to user's email address
          // - w_member_social: Permission to post content on user's behalf
        },
      },
      
      // OpenID Connect userinfo endpoint
      userinfo: {
        url: 'https://api.linkedin.com/v2/userinfo',
      },
      
      // Security: Only validate state parameter (CSRF protection)
      // ID token validation disabled due to LinkedIn's JWKS configuration
      checks: ['state'],
      
      // Profile mapping: LinkedIn OpenID Connect → NextAuth User
      // LinkedIn returns: sub, name, email, picture, given_name, family_name, etc.
      // Reference: https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin-v2
      profile(profile: any) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
    }),
  ],
  
  pages: {
    signIn: ROUTES.LOGIN,
    error: ROUTES.LOGIN, // Error code passed in query string as ?error=
  },

  callbacks: {
    /**
     * JWT Callback
     * Called whenever a JWT is created or updated (user signs in, session is accessed)
     * 
     * Purpose: Persist data to the JWT token
     * - Store LinkedIn access token for API calls
     * - Store LinkedIn user ID for database queries
     * - Store token expiry and refresh logic
     * - Auto-refresh tokens before expiry
     * 
     * Security: JWT is encrypted and stored in HTTP-only cookie
     * 
     * Reference: https://next-auth.js.org/configuration/callbacks#jwt-callback
     */
    async jwt({ token, account, profile }) {
      // Initial sign in: Add LinkedIn data to JWT
      if (account && profile) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          linkedInId: (profile as any).sub,
          // LinkedIn tokens expire in 60 days
          accessTokenExpires: account.expires_at
            ? account.expires_at * 1000
            : Date.now() + 60 * 24 * 60 * 60 * 1000,
        }
      }

      // Token is still valid: Return existing token
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token
      }

      // Token has expired: Refresh it
      return await refreshAccessToken(token)
    },

    /**
     * Session Callback
     * Called whenever session is checked (client calls getSession, useSession)
     * 
     * Purpose: Expose data to the client
     * - Add user ID to session.user
     * - Add LinkedIn ID for database queries
     * - Add access token for LinkedIn API calls
     * - Handle token refresh errors
     * 
     * Security: Only expose what's needed by client
     * 
     * Reference: https://next-auth.js.org/configuration/callbacks#session-callback
     */
    async session({ session, token }) {
      // Check if token refresh failed
      if (token.error) {
        // Force re-authentication by returning session with error
        return {
          ...session,
          error: token.error as string,
        }
      }

      // Add custom properties from JWT to session
      if (session.user) {
        session.user.id = token.sub as string
        session.user.linkedInId = token.linkedInId as string
      }
      
      // Add LinkedIn access token (needed for API calls)
      session.accessToken = token.accessToken as string

      return session
    },
  },

  // Session strategy: JWT (stateless, no database required)
  // Alternative: 'database' - requires adapter and database
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Update session every 24 hours
  },

  // Security: Enable debug only in development
  // Logs detailed information about authentication flow
  debug: process.env.NODE_ENV === 'development',

  // Security: Use secure cookies in production
  useSecureCookies: process.env.NODE_ENV === 'production',
}

