/**
 * Root Layout
 * Single Responsibility: Application shell with global styles and providers
 */

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { QueryProvider } from "@/lib/providers/QueryProvider"
import { AuthProvider } from "@/lib/providers/AuthProvider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "LinkedIn Hashtag Refresh Engine - AI-Powered Hashtag Generator",
  description: "AI-powered hashtag generation for LinkedIn posts. Generate relevant, trending hashtags in seconds. Save 20+ minutes per post and boost your content reach.",
  metadataBase: new URL('https://ai-linkedin-hashtag-refresh-engine-app.vercel.app'),
  keywords: ['LinkedIn', 'hashtags', 'AI', 'content creation', 'social media', 'marketing'],
  authors: [{ name: 'Saurav Kumar', url: 'https://github.com/saurav02022' }],
  icons: {
    icon: '/icon',
    apple: '/apple-icon',
  },
  openGraph: {
    title: 'LinkedIn Hashtag Refresh Engine',
    description: 'Generate AI-powered hashtags for LinkedIn posts in seconds',
    url: 'https://ai-linkedin-hashtag-refresh-engine-app.vercel.app',
    siteName: 'LinkedIn Hashtag Refresh Engine',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkedIn Hashtag Refresh Engine',
    description: 'Generate AI-powered hashtags for LinkedIn posts in seconds',
    creator: '@sk729584',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased min-h-screen bg-background">
        <AuthProvider>
          <QueryProvider>
            {children}
            <Toaster position="top-right" />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
