/**
 * Dashboard Page - Redirects to Posts
 * Single Responsibility: Redirect to main generation page
 */

import { redirect } from 'next/navigation'
import { ROUTES } from '@/lib/routes'

export default function DashboardPage() {
  redirect(ROUTES.POSTS)
}

