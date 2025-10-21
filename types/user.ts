/**
 * User-related type definitions
 * Single Responsibility: User domain types only
 */

export interface User {
  id: string
  email: string
  name: string
  linkedinId: string
  linkedinAccessToken?: string
  linkedinRefreshToken?: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface UserSession {
  user: User
  accessToken: string
  expiresAt: Date
}

export interface LinkedInProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  profilePicture?: string
}

