/**
 * Design Tokens
 * Single source of truth for spacing, typography, and design patterns
 * Follow Tailwind CSS conventions
 */

/**
 * Spacing Scale (Tailwind CSS scale)
 * Use these for consistent spacing across the app
 */
export const SPACING = {
  section: {
    sm: 'py-12',      // 48px
    md: 'py-16',      // 64px
    lg: 'py-20',      // 80px
    xl: 'py-24',      // 96px
    responsive: 'py-16 sm:py-20 lg:py-24',  // Progressive spacing
  },
  container: {
    padding: 'px-4 sm:px-6 lg:px-8',
    maxWidth: 'max-w-7xl mx-auto',
  },
  card: {
    padding: 'p-6',
    paddingLg: 'p-8',
  },
  gap: {
    xs: 'gap-2',      // 8px
    sm: 'gap-4',      // 16px
    md: 'gap-6',      // 24px
    lg: 'gap-8',      // 32px
    xl: 'gap-12',     // 48px
  },
} as const

/**
 * Typography Scale
 * Consistent heading and text sizes
 */
export const TYPOGRAPHY = {
  heading: {
    // Hero/Display heading
    hero: 'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight',
    
    // Section headings
    h1: 'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight',
    h2: 'text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight',
    h3: 'text-xl sm:text-2xl font-semibold',
    h4: 'text-lg sm:text-xl font-semibold',
  },
  body: {
    lg: 'text-lg leading-relaxed',
    base: 'text-base leading-relaxed',
    sm: 'text-sm',
    xs: 'text-xs',
  },
  muted: {
    lg: 'text-lg text-muted-foreground leading-relaxed',
    base: 'text-base text-muted-foreground',
    sm: 'text-sm text-muted-foreground',
  },
} as const

/**
 * Component Patterns
 * Reusable component styling patterns
 */
export const COMPONENTS = {
  card: {
    base: 'rounded-lg border bg-card',
    elevated: 'rounded-lg border-2 bg-card shadow-lg',
    hover: 'hover:shadow-lg hover:border-primary/50 transition-all duration-300',
    interactive: 'rounded-lg border-2 bg-card hover:shadow-lg hover:border-primary/50 transition-all duration-300',
  },
  button: {
    sizes: {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-base',
      xl: 'h-14 px-8 text-lg',
    },
  },
  badge: {
    primary: 'inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium',
    success: 'inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium',
  },
  section: {
    base: 'py-20',
    withBg: 'py-20 bg-muted/30',
    responsive: 'py-16 sm:py-20 lg:py-24',
  },
} as const

/**
 * Color Semantics
 * When to use which color variant
 */
export const COLOR_USAGE = {
  // Primary: Brand color, main CTAs, key UI elements
  primary: {
    text: 'text-primary',
    bg: 'bg-primary',
    bgLight: 'bg-primary/10',
    border: 'border-primary',
    borderLight: 'border-primary/20',
  },
  
  // Success: Free features, positive actions, checkmarks
  success: {
    text: 'text-success',
    bg: 'bg-success',
    bgLight: 'bg-success/10',
    border: 'border-success',
  },
  
  // Muted: Background sections, less important text
  muted: {
    text: 'text-muted-foreground',
    bg: 'bg-muted/30',
  },
} as const

/**
 * Animation Patterns
 */
export const ANIMATIONS = {
  transition: 'transition-all duration-300',
  transitionFast: 'transition-all duration-150',
  hover: 'hover:scale-105 transition-transform duration-300',
  pulse: 'animate-pulse',
} as const

/**
 * Grid Patterns
 */
export const GRIDS = {
  features: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  twoCol: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  threeCol: 'grid grid-cols-1 md:grid-cols-3 gap-6',
} as const

/**
 * Accessibility
 */
export const A11Y = {
  focusRing: 'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
  srOnly: 'sr-only',
} as const

/**
 * Helper function to build section classes
 */
export function sectionClass(variant: 'base' | 'withBg' | 'responsive' = 'base') {
  return `${COMPONENTS.section[variant]} ${SPACING.container.padding}`
}

/**
 * Helper function to build heading classes
 */
export function headingClass(level: keyof typeof TYPOGRAPHY.heading, className?: string) {
  return `${TYPOGRAPHY.heading[level]} ${className || ''}`
}

/**
 * Helper function to build card classes
 */
export function cardClass(variant: keyof typeof COMPONENTS.card, className?: string) {
  return `${COMPONENTS.card[variant]} ${className || ''}`
}

