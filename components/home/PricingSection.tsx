/**
 * Home Pricing Section Component
 * Single Responsibility: Display pricing preview on home page
 */

'use client'

import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ROUTES } from '@/lib/routes'

export function PricingSection() {
  return (
    <section id="pricing" className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-success/10 text-success border-success">100% Free</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Free Forever. No Catch.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            All features included. No paywalls, no limits, no credit card required.
          </p>
        </div>

        {/* Single Free Plan Card */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="flex flex-col border-2 border-success shadow-lg">
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <Badge className="bg-success text-success-foreground">Supported by Ads</Badge>
            </div>
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-3xl">Free Forever</CardTitle>
              <CardDescription className="text-lg">All features. Unlimited use.</CardDescription>
              <div className="mt-6">
                <span className="text-6xl font-bold">$0</span>
                <span className="text-muted-foreground text-xl">/forever</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-success shrink-0 mt-0.5" />
                  <div>
                    <span className="text-base font-medium">Unlimited Generations</span>
                    <p className="text-sm text-muted-foreground">Generate as many hashtags as you need</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-success shrink-0 mt-0.5" />
                  <div>
                    <span className="text-base font-medium">AI-Powered Analysis</span>
                    <p className="text-sm text-muted-foreground">Google Gemini 2.5 Flash for best results</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-success shrink-0 mt-0.5" />
                  <div>
                    <span className="text-base font-medium">3 Strategic Batches</span>
                    <p className="text-sm text-muted-foreground">Maximum Reach, Viral Potential, Niche Engagement</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-success shrink-0 mt-0.5" />
                  <div>
                    <span className="text-base font-medium">One-Click Posting</span>
                    <p className="text-sm text-muted-foreground">Post directly to LinkedIn as comments</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-success shrink-0 mt-0.5" />
                  <div>
                    <span className="text-base font-medium">Fully Customizable</span>
                    <p className="text-sm text-muted-foreground">Add, remove, or mix hashtags before posting</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-success shrink-0 mt-0.5" />
                  <div>
                    <span className="text-base font-medium">Lightning Fast</span>
                    <p className="text-sm text-muted-foreground">2-3 second generation time</p>
                  </div>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full" asChild>
                <Link href={ROUTES.LOGIN}>
                  Start Generating Hashtags
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Why is it free?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-success" />
              <span>Supported by non-intrusive ads</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-success" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-success" />
              <span>All features included</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

