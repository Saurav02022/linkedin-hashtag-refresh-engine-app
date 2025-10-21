/**
 * Pricing Cards Component
 * Single Responsibility: Display pricing plan cards
 */

'use client'

import { Check, Zap, Sparkles, Building2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface PricingPlan {
  name: string
  description: string
  price: number
  period: string
  popular?: boolean
  icon: React.ElementType
  iconColor: string
  features: string[]
  limitations?: string[]
  cta: string
  href: string
}

const plans: PricingPlan[] = [
  {
    name: 'Free',
    description: 'Perfect for trying out the platform',
    price: 0,
    period: 'forever',
    icon: Zap,
    iconColor: 'text-muted-foreground',
    features: [
      '10 hashtag generations per month',
      'Basic AI-powered suggestions',
      'Copy to clipboard',
      'Email support',
    ],
    limitations: [
      'Limited to 10 posts/month',
      'Standard generation speed',
    ],
    cta: 'Start Free',
    href: '/login',
  },
  {
    name: 'Pro',
    description: 'Everything you need to grow on LinkedIn',
    price: 9,
    period: 'month',
    popular: true,
    icon: Sparkles,
    iconColor: 'text-primary',
    features: [
      'Unlimited hashtag generations',
      'Advanced AI-powered suggestions',
      'Priority generation speed',
      'Hashtag analytics & insights',
      'Unlimited bulk processing',
      'Team collaboration (up to 3 users)',
      'Custom hashtag templates',
      'LinkedIn auto-posting (coming soon)',
      'API access (coming soon)',
      'Priority email support',
      'No watermarks',
    ],
    cta: 'Start Pro Trial',
    href: '/login?plan=pro',
  },
]

export function PricingCards() {
  return (
    <div className="container mx-auto max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              'relative flex flex-col',
              plan.popular && 'border-primary shadow-lg scale-105 md:scale-110'
            )}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-0 right-0 flex justify-center">
                <Badge className="bg-primary text-primary-foreground px-4 py-1">
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader className="pb-8">
              <div className={cn('w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4', plan.popular && 'bg-primary/20')}>
                <plan.icon className={cn('w-6 h-6', plan.iconColor)} />
              </div>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription className="text-base">
                {plan.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 space-y-6">
              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tight">
                    ${plan.price}
                  </span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                {plan.price > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Billed monthly, cancel anytime
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Limitations */}
              {plan.limitations && plan.limitations.length > 0 && (
                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground mb-2">Limitations:</p>
                  <div className="space-y-2">
                    {plan.limitations.map((limitation) => (
                      <div key={limitation} className="flex items-start gap-2">
                        <span className="text-xs text-muted-foreground">• {limitation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter>
              <Button
                asChild
                className="w-full"
                size="lg"
                variant={plan.popular ? 'default' : 'outline'}
              >
                <a href={plan.href}>{plan.cta}</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="mt-16 text-center">
        <p className="text-sm text-muted-foreground mb-4">Trusted by LinkedIn creators worldwide</p>
        <div className="flex flex-wrap items-center justify-center gap-6 opacity-60">
          <div className="text-xs font-semibold">💳 Secure Payments</div>
          <div className="text-xs font-semibold">🔒 SSL Encrypted</div>
          <div className="text-xs font-semibold">✓ GDPR Compliant</div>
          <div className="text-xs font-semibold">⚡ Instant Access</div>
        </div>
      </div>
    </div>
  )
}

