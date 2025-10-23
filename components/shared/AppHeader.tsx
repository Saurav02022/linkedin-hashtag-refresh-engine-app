/**
 * Unified App Header Component
 * Single Responsibility: Consistent navigation header across all pages
 */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Hash, Settings, Home, Menu, X, CreditCard, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useAuth } from '@/lib/contexts/AuthContext'
import { ROUTES } from '@/lib/routes'

interface AppHeaderProps {
  variant?: 'public' | 'authenticated'
}

/**
 * Get user initials from name
 * Example: "John Doe" -> "JD"
 */
function getUserInitials(name?: string): string {
  if (!name) return 'U'
  
  const parts = name.trim().split(' ')
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

export function AppHeader({ variant = 'public' }: AppHeaderProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Nav */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href={ROUTES.HOME} className="flex items-center gap-2 font-semibold text-lg">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Hash className="w-5 h-5 text-primary" />
              </div>
              <span className="hidden sm:inline-block">Hashtag Engine</span>
            </Link>

            {/* Navigation - Authenticated */}
            {variant === 'authenticated' && (
              <nav className="hidden md:flex items-center gap-1">
                <NavLink href={ROUTES.DASHBOARD} icon={Home} active={pathname === ROUTES.DASHBOARD}>
                  Dashboard
                </NavLink>
                <NavLink href={ROUTES.POSTS} icon={Hash} active={pathname === ROUTES.POSTS}>
                  Generate
                </NavLink>
              </nav>
            )}

            {/* Navigation - Public */}
            {variant === 'public' && (
              <nav className="hidden md:flex items-center gap-6">
                <Link 
                  href="#features" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </Link>
                <Link 
                  href="#how-it-works" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  How It Works
                </Link>
                <Link 
                  href={ROUTES.PRICING} 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
              </nav>
            )}
          </div>

          {/* Right Side Actions */}
          {variant === 'authenticated' ? (
            <div className="flex items-center gap-4">
              {/* Settings (Desktop) */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex"
                asChild
              >
                <Link href={ROUTES.SETTINGS}>
                  <Settings className="w-5 h-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </Button>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage 
                        src={user?.avatar} 
                        alt={user?.name || 'User'} 
                      />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getUserInitials(user?.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-xs text-muted-foreground leading-none">
                        {user?.email || 'Free Plan'}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={ROUTES.SETTINGS} className="cursor-pointer">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={ROUTES.SETTINGS_BILLING} className="cursor-pointer">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Billing
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-destructive cursor-pointer"
                    onClick={logout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild className="hidden sm:flex">
                <Link href={ROUTES.LOGIN}>Sign In</Link>
              </Button>
              <Button asChild>
                <Link href={ROUTES.LOGIN}>Get Started</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu - Authenticated */}
        {variant === 'authenticated' && mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-1">
              <MobileNavLink href={ROUTES.DASHBOARD} active={pathname === ROUTES.DASHBOARD}>
                Dashboard
              </MobileNavLink>
              <MobileNavLink href={ROUTES.POSTS} active={pathname === ROUTES.POSTS}>
                Generate
              </MobileNavLink>
              <MobileNavLink href={ROUTES.SETTINGS} active={pathname === ROUTES.SETTINGS}>
                Settings
              </MobileNavLink>
              <MobileNavLink href={ROUTES.SETTINGS_BILLING} active={pathname === ROUTES.SETTINGS_BILLING}>
                Billing
              </MobileNavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

interface NavLinkProps {
  href: string
  icon: React.ElementType
  active?: boolean
  children: React.ReactNode
}

function NavLink({ href, icon: Icon, active, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
        active
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      )}
    >
      <Icon className="w-4 h-4" />
      {children}
    </Link>
  )
}

interface MobileNavLinkProps {
  href: string
  active?: boolean
  children: React.ReactNode
}

function MobileNavLink({ href, active, children }: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'px-4 py-2 rounded-md text-sm font-medium transition-colors',
        active
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      )}
    >
      {children}
    </Link>
  )
}

