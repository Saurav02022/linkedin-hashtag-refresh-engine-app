# Design System

**Product:** Hashtag Engine  
**Version:** 1.0  
**Last Updated:** October 24, 2025  
**Status:** ✅ Active

---

## Table of Contents

1. [Design Principles](#1-design-principles)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Spacing & Layout](#4-spacing--layout)
5. [Components](#5-components)
6. [Iconography](#6-iconography)
7. [Motion & Animation](#7-motion--animation)
8. [Accessibility](#8-accessibility)
9. [Responsive Design](#9-responsive-design)
10. [Usage Guidelines](#10-usage-guidelines)

---

## 1. Design Principles

Our design system follows four core principles:

### 1.1 Simplicity First
**Less is more.** Every element serves a purpose. Remove friction, reduce cognitive load.

**Example:** Two-step hashtag generation (URL → Content → Results) instead of complex multi-step wizard.

### 1.2 Speed & Responsiveness
**Everything feels instant.** No waiting, clear feedback, optimistic updates.

**Example:** Show loading states immediately, complete generation in < 3 seconds.

### 1.3 Transparency & Trust
**Be honest and clear.** Explain why we need information, what we access, what happens next.

**Example:** Clear explanation for manual content input (LinkedIn API restrictions).

### 1.4 Accessibility by Default
**Everyone can use our product.** WCAG AA compliance, keyboard navigation, screen reader support.

**Example:** All decorative icons have `aria-hidden="true"`, interactive elements have proper labels.

---

## 2. Color System

### 2.1 Semantic Colors

Our colors communicate meaning and guide user actions.

#### Primary Colors
```css
--primary: hsl(220, 90%, 56%)        /* #2563EB - LinkedIn blue, primary actions */
--primary-foreground: hsl(0, 0%, 100%)  /* #FFFFFF - Text on primary */
```

**Usage:** Primary CTAs, links, active states, brand elements

**Example:**
```tsx
<Button className="bg-primary text-primary-foreground">Get Started</Button>
```

#### Success Colors
```css
--success: hsl(142, 71%, 45%)        /* #16A34A - Green, positive feedback */
--success-foreground: hsl(0, 0%, 100%)  /* #FFFFFF - Text on success */
```

**Usage:** Success messages, completed states, positive metrics

**Example:**
```tsx
<Badge className="bg-success">100% Free Forever</Badge>
```

#### Destructive Colors
```css
--destructive: hsl(0, 84%, 60%)      /* #EF4444 - Red, errors/warnings */
--destructive-foreground: hsl(0, 0%, 100%)  /* #FFFFFF - Text on destructive */
```

**Usage:** Error messages, delete actions, critical warnings

**Example:**
```tsx
<Alert variant="destructive">Failed to generate hashtags</Alert>
```

#### Warning Colors
```css
--warning: hsl(38, 92%, 50%)         /* #F59E0B - Orange, caution */
--warning-foreground: hsl(0, 0%, 0%)    /* #000000 - Text on warning */
```

**Usage:** Warnings, manual fallbacks, important notices

**Example:**
```tsx
<Alert className="border-warning/50 bg-warning/5">LinkedIn API limitation</Alert>
```

#### Neutral Colors
```css
--background: hsl(0, 0%, 100%)       /* #FFFFFF - Main background */
--foreground: hsl(222, 47%, 11%)     /* #0F172A - Main text */
--muted: hsl(210, 40%, 96%)          /* #F1F5F9 - Subtle backgrounds */
--muted-foreground: hsl(215, 16%, 47%)  /* #64748B - Secondary text */
--border: hsl(214, 32%, 91%)         /* #E2E8F0 - Borders */
```

**Usage:** Text, backgrounds, borders, disabled states

### 2.2 Color Usage Rules

| Element | Color | Example |
|---------|-------|---------|
| **Primary CTA** | `primary` | "Get Started", "Generate Hashtags" |
| **Secondary CTA** | `outline` | "Learn More", "See How It Works" |
| **Success feedback** | `success` | "Posted to LinkedIn!", checkmarks |
| **Error messages** | `destructive` | "Failed to connect", error alerts |
| **Warnings** | `warning` | API limitations, manual fallback |
| **Body text** | `foreground` | Paragraphs, descriptions |
| **Secondary text** | `muted-foreground` | Captions, metadata |
| **Backgrounds** | `background` | Main page background |
| **Subtle backgrounds** | `muted` | Cards, input fields |
| **Borders** | `border` | Card borders, dividers |

### 2.3 Gradients

**Subtle Background Gradients:**
```css
/* Light gradient for sections */
bg-linear-to-b from-background to-muted/20

/* Primary accent gradient */
bg-linear-to-br from-primary/5 to-transparent
```

**Usage:** Hero sections, feature cards, pricing section

---

## 3. Typography

### 3.1 Font Family

```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

**Primary:** Inter (all UI text)  
**Monospace:** JetBrains Mono (code, URLs, technical content)

### 3.2 Type Scale

| Name | Size | Line Height | Weight | Usage |
|------|------|-------------|--------|-------|
| **Hero** | 3.75rem (60px) | 1.1 | 700 | Homepage headline |
| **Display** | 3rem (48px) | 1.2 | 700 | Page titles |
| **H1** | 2.25rem (36px) | 1.3 | 700 | Section headers |
| **H2** | 1.875rem (30px) | 1.4 | 600 | Subsection headers |
| **H3** | 1.5rem (24px) | 1.4 | 600 | Card titles |
| **H4** | 1.25rem (20px) | 1.5 | 600 | Component headers |
| **Body Large** | 1.125rem (18px) | 1.75 | 400 | Hero descriptions |
| **Body** | 1rem (16px) | 1.75 | 400 | Body text |
| **Body Small** | 0.875rem (14px) | 1.6 | 400 | Captions, metadata |
| **Caption** | 0.75rem (12px) | 1.5 | 400 | Fine print |

### 3.3 Tailwind Classes

```tsx
// Hero headline
<h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">

// Page title
<h1 className="text-3xl sm:text-4xl font-bold tracking-tight">

// Section header
<h2 className="text-2xl sm:text-3xl font-semibold">

// Card title
<h3 className="text-xl font-semibold">

// Body text with relaxed line-height
<p className="text-base text-muted-foreground leading-relaxed">

// Caption
<p className="text-sm text-muted-foreground">
```

### 3.4 Typography Rules

1. **Always use `leading-relaxed`** for body text and descriptions (improves readability)
2. **Use `tracking-tight`** for large headlines (prevents awkward spacing)
3. **Use `font-bold`** (700) for headlines, `font-semibold` (600) for subheads
4. **Use `text-muted-foreground`** for secondary text
5. **Use `font-mono`** for URLs, code, technical content

---

## 4. Spacing & Layout

### 4.1 Spacing Scale

Our spacing follows an 8px base unit for consistency.

```tsx
const SPACING = {
  xs: '0.25rem',   // 4px  - Tight gaps
  sm: '0.5rem',    // 8px  - Small gaps
  md: '0.75rem',   // 12px - Medium gaps
  lg: '1rem',      // 16px - Standard gaps
  xl: '1.5rem',    // 24px - Large gaps
  '2xl': '2rem',   // 32px - Extra large
  '3xl': '3rem',   // 48px - Section spacing
  '4xl': '4rem',   // 64px - Page spacing
  '5xl': '6rem',   // 96px - Hero spacing
}
```

### 4.2 Layout Patterns

#### Container
```tsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
  {/* Max width: 1280px, responsive padding */}
</div>
```

#### Section Spacing
```tsx
// Standard section
<section className="py-16 sm:py-20 lg:py-24">

// Hero section
<section className="py-20 sm:py-24 lg:py-32">
```

#### Card Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid with consistent gaps */}
</div>
```

#### Stack (Vertical Spacing)
```tsx
<div className="space-y-8">  {/* Between major sections */}
<div className="space-y-6">  {/* Between cards */}
<div className="space-y-4">  {/* Between form fields */}
<div className="space-y-2">  {/* Within a section */}
```

### 4.3 Responsive Breakpoints

```css
sm:  640px   /* Small tablets */
md:  768px   /* Tablets */
lg:  1024px  /* Laptops */
xl:  1280px  /* Desktops */
2xl: 1536px  /* Large desktops */
```

**Mobile-First Approach:** Design for mobile, progressively enhance for larger screens.

---

## 5. Components

### 5.1 Buttons

#### Primary Button
```tsx
<Button size="lg" className="w-full sm:w-auto">
  Get Started
  <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
</Button>
```

**Usage:** Primary actions, CTAs  
**Style:** `bg-primary text-primary-foreground hover:bg-primary/90`

#### Secondary Button
```tsx
<Button size="lg" variant="outline">
  Learn More
</Button>
```

**Usage:** Secondary actions, cancel  
**Style:** `border border-input bg-background hover:bg-muted`

#### Destructive Button
```tsx
<Button variant="destructive">
  Disconnect Account
</Button>
```

**Usage:** Delete, disconnect, destructive actions  
**Style:** `bg-destructive text-destructive-foreground hover:bg-destructive/90`

#### Button Sizes
- `size="sm"` - 32px height
- `size="md"` - 40px height (default)
- `size="lg"` - 48px height (preferred for CTAs)

### 5.2 Cards

#### Standard Card
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description text</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>
```

**Style:** `border rounded-lg bg-card`

#### Feature Card (with hover)
```tsx
<Card className="border-2 hover:shadow-lg hover:border-primary/50 transition-all duration-300 h-full">
  {/* Content */}
</Card>
```

#### Highlighted Card
```tsx
<Card className="border-primary/20 bg-linear-to-br from-primary/5 to-transparent">
  {/* Content */}
</Card>
```

### 5.3 Forms

#### Input Field
```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input 
    id="email" 
    type="email" 
    placeholder="you@example.com"
  />
  <p className="text-sm text-muted-foreground leading-relaxed">
    We'll never share your email
  </p>
</div>
```

#### Textarea
```tsx
<Textarea 
  placeholder="Paste your post content here..."
  className="min-h-[200px] resize-y"
/>
```

#### Form Group
```tsx
<form className="space-y-6">
  {/* Fields with consistent spacing */}
</form>
```

### 5.4 Alerts

#### Info Alert
```tsx
<Alert className="border-primary/50 bg-primary/5">
  <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
  <AlertTitle className="text-primary">Quick Tip</AlertTitle>
  <AlertDescription className="leading-relaxed">
    Helpful information here
  </AlertDescription>
</Alert>
```

#### Warning Alert
```tsx
<Alert className="border-warning/50 bg-warning/5">
  <AlertCircle className="h-4 w-4 text-warning" aria-hidden="true" />
  <AlertTitle className="text-warning">Important Notice</AlertTitle>
  <AlertDescription className="leading-relaxed">
    Warning message here
  </AlertDescription>
</Alert>
```

#### Error Alert
```tsx
<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" aria-hidden="true" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription className="leading-relaxed">
    Error message here
  </AlertDescription>
</Alert>
```

### 5.5 Badges

```tsx
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge className="bg-success text-success-foreground">Success</Badge>
```

### 5.6 Loading States

#### Spinner
```tsx
<Loader2 className="w-6 h-6 animate-spin text-primary" aria-label="Loading" />
```

#### Button Loading
```tsx
<Button disabled>
  <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
  Loading...
</Button>
```

#### Skeleton
```tsx
<Skeleton className="h-4 w-full" />
<Skeleton className="h-4 w-3/4" />
```

### 5.7 Empty States

```tsx
<EmptyState
  icon={FileText}
  title="No posts yet"
  description="Get started by generating your first hashtags"
  action={{
    label: "Generate Hashtags",
    onClick: handleGenerate
  }}
/>
```

---

## 6. Iconography

### 6.1 Icon Library
**Primary:** Lucide Icons (https://lucide.dev)

### 6.2 Icon Sizes
```tsx
className="w-4 h-4"   // 16px - Small (buttons, badges)
className="w-5 h-5"   // 20px - Medium (navigation, cards)
className="w-6 h-6"   // 24px - Large (section headers)
className="w-8 h-8"   // 32px - XL (features, hero)
className="w-16 h-16" // 64px - XXL (empty states)
```

### 6.3 Icon Colors
```tsx
// Primary action
<Hash className="w-5 h-5 text-primary" />

// Success state
<CheckCircle2 className="w-5 h-5 text-success" />

// Muted/secondary
<Settings className="w-5 h-5 text-muted-foreground" />
```

### 6.4 Accessibility
**Always add `aria-hidden="true"` to decorative icons:**
```tsx
<Sparkles className="w-5 h-5 text-primary" aria-hidden="true" />
```

**For icon-only buttons, add aria-label:**
```tsx
<Button variant="ghost" size="icon" aria-label="Settings">
  <Settings className="w-5 h-5" />
</Button>
```

---

## 7. Motion & Animation

### 7.1 Transitions

**Standard:** 300ms ease-in-out
```tsx
className="transition-all duration-300"
```

**Usage:**
- Hover states on cards/buttons
- Modal/dialog appearances
- Tab switches

### 7.2 Animations

**Spin (Loading):**
```tsx
className="animate-spin"  // Continuous rotation
```

**Bounce (Attention):**
```tsx
className="animate-bounce"  // Gentle bounce (use sparingly)
```

**Pulse (Loading):**
```tsx
className="animate-pulse"  // Subtle fade in/out
```

### 7.3 Animation Principles

1. **Purposeful** - Animate only to provide feedback or guide attention
2. **Subtle** - Prefer ease curves over linear
3. **Fast** - Keep durations under 400ms
4. **Respect preferences** - Honor `prefers-reduced-motion`

---

## 8. Accessibility

### 8.1 WCAG AA Compliance

✅ **Color Contrast:** Minimum 4.5:1 for normal text, 3:1 for large text  
✅ **Focus Indicators:** Visible keyboard focus on all interactive elements  
✅ **ARIA Labels:** Proper labels for icons, buttons, forms  
✅ **Keyboard Navigation:** All features accessible via keyboard  
✅ **Screen Readers:** Semantic HTML, proper heading hierarchy

### 8.2 Accessibility Checklist

**Icons:**
```tsx
// Decorative (no meaning)
<Icon aria-hidden="true" />

// Meaningful (has function)
<Icon aria-label="Search" />
```

**Images:**
```tsx
<img src="..." alt="Descriptive text" />
```

**Forms:**
```tsx
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" aria-describedby="email-help" />
<p id="email-help">We'll never share your email</p>
```

**Buttons:**
```tsx
// Text is descriptive
<Button>Generate Hashtags</Button>

// Icon only
<Button aria-label="Close dialog">
  <X className="w-5 h-5" />
</Button>
```

**Focus States:**
```tsx
// All interactive elements
className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
```

---

## 9. Responsive Design

### 9.1 Mobile-First Approach

Design for mobile first, then scale up.

```tsx
// Base (mobile): Full width button
// sm and up: Auto width
<Button className="w-full sm:w-auto">
  Get Started
</Button>

// Base: Single column
// md and up: Two columns
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
```

### 9.2 Responsive Patterns

**Typography:**
```tsx
<h1 className="text-4xl sm:text-5xl lg:text-6xl">
```

**Spacing:**
```tsx
<section className="py-16 sm:py-20 lg:py-24">
<div className="container px-4 sm:px-6 lg:px-8">
```

**Layout:**
```tsx
// Stack on mobile, side-by-side on desktop
<div className="flex flex-col md:flex-row gap-6">
```

### 9.3 Touch Targets

Minimum 44x44px for touch targets (WCAG guideline):
```tsx
// Button heights
size="sm"  // 32px - avoid on mobile
size="md"  // 40px - minimum
size="lg"  // 48px - preferred
```

---

## 10. Usage Guidelines

### 10.1 Design Tokens Implementation

All design tokens are defined in `lib/design-tokens.ts`:

```typescript
import { SPACING, TYPOGRAPHY, COLORS } from '@/lib/design-tokens'

// Use in components
<div style={{ padding: SPACING.xl }} />
```

### 10.2 Component Development Checklist

When creating/updating components:

- [ ] Uses design system colors (no hardcoded colors)
- [ ] Uses spacing scale (no arbitrary values)
- [ ] Typography follows scale
- [ ] Includes all states (default, hover, focus, disabled, loading, error)
- [ ] Responsive (mobile-first)
- [ ] Accessible (ARIA labels, keyboard navigation)
- [ ] Consistent with existing components
- [ ] Proper TypeScript types
- [ ] Documented props

### 10.3 Common Patterns

**Section Header:**
```tsx
<div className="space-y-3">
  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
    Section Title
  </h2>
  <p className="text-base text-muted-foreground leading-relaxed">
    Section description
  </p>
</div>
```

**Feature Card:**
```tsx
<Card className="border-2 hover:shadow-lg hover:border-primary/50 transition-all duration-300 h-full">
  <CardContent className="pt-6">
    <Icon className="w-8 h-8 text-primary mb-4" aria-hidden="true" />
    <h3 className="text-xl font-semibold mb-2">Feature Title</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">
      Feature description
    </p>
  </CardContent>
</Card>
```

**CTA Section:**
```tsx
<section className="py-16 sm:py-20 lg:py-24 bg-linear-to-br from-primary/5 via-background to-primary/5">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <Card className="max-w-4xl mx-auto p-8 sm:p-12 lg:p-16 text-center">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
        Ready to Get Started?
      </h2>
      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
        Join thousands of creators boosting their LinkedIn reach
      </p>
      <Button size="lg">
        Get Started Now
        <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
      </Button>
    </Card>
  </div>
</section>
```

---

## 11. Resources

### Design System References
- **Shopify Polaris:** https://polaris.shopify.com
- **IBM Carbon:** https://carbondesignsystem.com
- **Atlassian:** https://atlassian.design
- **Vercel Geist:** https://vercel.com/geist

### Tools
- **Tailwind CSS:** https://tailwindcss.com
- **ShadCN UI:** https://ui.shadcn.com
- **Lucide Icons:** https://lucide.dev
- **Color Contrast Checker:** https://webaim.org/resources/contrastchecker

### Accessibility
- **WCAG Guidelines:** https://www.w3.org/WAI/WCAG21/quickref
- **A11y Project:** https://www.a11yproject.com

---

## 12. Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Oct 24, 2025 | Initial design system documentation |

---

**Maintained by:** Product & Design Team  
**Questions?** Open an issue or contact the team

