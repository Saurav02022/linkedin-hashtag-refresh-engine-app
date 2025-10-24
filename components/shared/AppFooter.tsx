/**
 * Unified App Footer Component
 * Single Responsibility: Consistent footer across all pages
 */

import Link from 'next/link'
import { Hash, Linkedin, Twitter, Github } from 'lucide-react'
import { SOCIAL_LINKS } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'

export function AppFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand & Description */}
          <div className="space-y-3 max-w-sm">
            <Link href={ROUTES.HOME} className="flex items-center gap-2 font-semibold">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Hash className="w-5 h-5 text-primary" />
              </div>
              <span>Hashtag Engine</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              100% Free AI-powered hashtag generation for LinkedIn creators.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <Link href={`${ROUTES.HOME}#features`} className="hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href={ROUTES.POSTS} className="hover:text-foreground transition-colors">
              Generate Hashtags
            </Link>
            <Link href={ROUTES.PRIVACY} className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href={ROUTES.TERMS} className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <a 
              href="https://optout.aboutads.info" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-foreground transition-colors"
            >
              Ad Choices
            </a>
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-md border bg-background hover:bg-muted transition-colors flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-md border bg-background hover:bg-muted transition-colors flex items-center justify-center"
              aria-label="X (Twitter)"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-md border bg-background hover:bg-muted transition-colors flex items-center justify-center"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t">
          <p className="text-xs text-center text-muted-foreground">
            © {currentYear} Hashtag Engine. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

