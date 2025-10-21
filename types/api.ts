/**
 * API-related type definitions
 * Single Responsibility: API request/response types only
 */

export interface APIResponse<T = unknown> {
  success: boolean
  data?: T
  error?: APIError
  message?: string
}

export interface APIError {
  code: string
  message: string
  details?: Record<string, unknown>
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: unknown
  params?: Record<string, string | number>
}

