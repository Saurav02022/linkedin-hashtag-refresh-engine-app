/**
 * Post-related type definitions
 * Single Responsibility: LinkedIn Post domain types only
 */

export interface LinkedInPost {
  id: string
  userId: string
  linkedinPostUrl: string
  postContent?: string
  postAuthor?: string
  postDate?: Date
  createdAt: Date
  updatedAt: Date
}

export interface PostInput {
  url: string
}

export interface PostFormData {
  urls: string
}

