/**
 * Billing Screen Component
 * Single Responsibility: Display and manage subscription billing
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  CreditCard, 
  Calendar, 
  TrendingUp, 
  Check, 
  ExternalLink,
  Download,
  AlertCircle,
  Sparkles,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ROUTES } from '@/lib/routes'

export function BillingScreen() {
  const [currentPlan] = useState<'free' | 'pro'>('free') // Would come from user state

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>
        <p className="text-muted-foreground mt-2">
          Manage your subscription, payment methods, and billing history
        </p>
      </div>

      {/* Current Plan Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {currentPlan === 'free' ? (
                  <>
                    <Zap className="w-5 h-5 text-muted-foreground" />
                    Free Plan
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-primary" />
                    Pro Plan
                  </>
                )}
              </CardTitle>
              <CardDescription className="mt-1">
                {currentPlan === 'free' 
                  ? 'You are currently on the free plan'
                  : 'You are subscribed to the Pro plan'}
              </CardDescription>
            </div>
            <Badge variant={currentPlan === 'free' ? 'secondary' : 'default'}>
              {currentPlan === 'free' ? 'Free' : 'Active'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Usage Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border bg-muted/30">
              <p className="text-sm text-muted-foreground mb-1">Current Period</p>
              <p className="text-2xl font-bold">
                {currentPlan === 'free' ? '3' : '127'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                of {currentPlan === 'free' ? '10' : '∞'} generations used
              </p>
            </div>
            
            <div className="p-4 rounded-lg border bg-muted/30">
              <p className="text-sm text-muted-foreground mb-1">Billing Cycle</p>
              <p className="text-2xl font-bold">
                {currentPlan === 'free' ? '—' : 'Monthly'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {currentPlan === 'free' ? 'No billing' : 'Next billing Dec 1, 2025'}
              </p>
            </div>
            
            <div className="p-4 rounded-lg border bg-muted/30">
              <p className="text-sm text-muted-foreground mb-1">Amount</p>
              <p className="text-2xl font-bold">
                ${currentPlan === 'free' ? '0' : '9'}/mo
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {currentPlan === 'free' ? 'Forever free' : 'Billed monthly'}
              </p>
            </div>
          </div>

          {/* Plan Features */}
          <div>
            <h4 className="font-semibold mb-3">Your Plan Includes</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentPlan === 'free' && (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    <span>10 generations per month</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Basic AI suggestions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Copy to clipboard</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Email support</span>
                  </div>
                </>
              )}
              {currentPlan === 'pro' && (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Unlimited generations</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Advanced AI suggestions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Priority generation speed</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Hashtag analytics & insights</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Unlimited bulk processing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Team collaboration (3 users)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Custom templates</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Priority email support</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          {currentPlan === 'free' && (
            <Button asChild className="w-full sm:w-auto">
              <Link href={ROUTES.PRICING}>Upgrade to Pro</Link>
            </Button>
          )}
          {currentPlan === 'pro' && (
            <Button variant="outline" className="w-full sm:w-auto text-destructive hover:text-destructive">
              Cancel Subscription
            </Button>
          )}
          <Button variant="ghost" asChild className="w-full sm:w-auto ml-auto">
            <Link href={ROUTES.PRICING}>
              View All Plans
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Upgrade CTA (for free users) */}
      {currentPlan === 'free' && (
        <Alert>
          <Sparkles className="h-4 w-4" />
          <AlertTitle>Unlock more power with Pro</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-3">
              Upgrade to Pro and get 500 generations per month, advanced AI suggestions, 
              priority speed, analytics, and more. Only $9/month.
            </p>
            <Button size="sm" asChild>
              <Link href={ROUTES.PRICING}>Upgrade Now</Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Payment Method (for paid users) */}
      {currentPlan !== 'free' && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>
              Manage your payment methods and billing information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 rounded border flex items-center justify-center bg-muted">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                </div>
              </div>
              <Badge variant="secondary">Default</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Update Payment Method</Button>
          </CardFooter>
        </Card>
      )}

      {/* Billing History */}
      {currentPlan !== 'free' && (
        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>
              Download your past invoices and receipts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { date: 'Nov 1, 2025', amount: '$9.00', status: 'Paid' },
                { date: 'Oct 1, 2025', amount: '$9.00', status: 'Paid' },
                { date: 'Sep 1, 2025', amount: '$9.00', status: 'Paid' },
              ].map((invoice, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{invoice.date}</p>
                      <p className="text-sm text-muted-foreground">{invoice.amount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{invoice.status}</Badge>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>
            Have questions about billing or subscriptions?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">Contact Support</p>
              <p className="text-sm text-muted-foreground">
                Our team is here to help with any billing questions
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild>
            <Link href={ROUTES.HELP}>Visit Help Center</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

