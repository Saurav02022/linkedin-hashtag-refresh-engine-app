/**
 * Call to Action Section Component
 * Single Responsibility: Final conversion section
 */

'use client'

import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ROUTES } from '@/lib/routes'

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-4xl mx-auto p-8 sm:p-12 lg:p-16 text-center border-2 border-primary/20 bg-card/80 backdrop-blur">
          <div className="space-y-8">
            {/* Headline */}
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Ready to Save Hours Every Week?
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Join content creators who are boosting their LinkedIn reach with AI-powered hashtags
              </p>
            </div>

            {/* Benefits */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm">
              <BenefitItem text="100% Free to Start" />
              <BenefitItem text="No Credit Card" />
              <BenefitItem text="Setup in 60 Seconds" />
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button size="lg" className="text-base h-14 px-8" asChild>
                <Link href={ROUTES.LOGIN}>
                  Get Started Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Fine Print */}
            <p className="text-xs text-muted-foreground">
              Start generating hashtags in under 60 seconds • No installation required
            </p>
          </div>
        </Card>
      </div>
    </section>
  )
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center">
        <Check className="w-3 h-3 text-success" />
      </div>
      <span className="font-medium">{text}</span>
    </div>
  )
}

