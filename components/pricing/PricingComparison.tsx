/**
 * Pricing Comparison Component
 * Single Responsibility: Display detailed feature comparison table
 */

'use client'

import { Check, X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { ROUTES } from '@/lib/routes'

interface Feature {
  category: string
  items: {
    name: string
    free: boolean | string
    pro: boolean | string
  }[]
}

const features: Feature[] = [
  {
    category: 'Hashtag Generation',
    items: [
      {
        name: 'Monthly generations',
        free: '10',
        pro: 'Unlimited',
      },
      {
        name: 'AI model quality',
        free: 'Basic',
        pro: 'Advanced',
      },
      {
        name: 'Generation speed',
        free: 'Standard',
        pro: 'Priority',
      },
      {
        name: 'Bulk processing',
        free: false,
        pro: 'Unlimited',
      },
    ],
  },
  {
    category: 'Features',
    items: [
      {
        name: 'Copy to clipboard',
        free: true,
        pro: true,
      },
      {
        name: 'Hashtag analytics',
        free: false,
        pro: true,
      },
      {
        name: 'Custom templates',
        free: false,
        pro: true,
      },
      {
        name: 'LinkedIn auto-posting',
        free: false,
        pro: 'Coming soon',
      },
      {
        name: 'API access',
        free: false,
        pro: 'Coming soon',
      },
    ],
  },
  {
    category: 'Collaboration',
    items: [
      {
        name: 'Team members',
        free: '1',
        pro: '3',
      },
      {
        name: 'Shared workspaces',
        free: false,
        pro: true,
      },
    ],
  },
  {
    category: 'Support',
    items: [
      {
        name: 'Email support',
        free: true,
        pro: true,
      },
      {
        name: 'Priority support',
        free: false,
        pro: true,
      },
      {
        name: 'Live chat support',
        free: false,
        pro: true,
      },
    ],
  },
]

export function PricingComparison() {
  return (
    <div className="container mx-auto max-w-6xl" id="comparison">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Detailed Feature Comparison
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Compare all features across plans to find the perfect fit for your needs
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left py-4 px-6 font-semibold min-w-[250px]">
                  Features
                </th>
                <th className="text-center py-4 px-6 font-semibold min-w-[150px]">
                  Free
                </th>
                <th className="text-center py-4 px-6 font-semibold min-w-[150px] bg-primary/5">
                  <div className="flex flex-col items-center gap-1">
                    <span>Pro</span>
                    <span className="text-xs font-normal text-muted-foreground">$9/mo</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((category) => (
                <>
                  <tr key={category.category} className="border-b bg-muted/30">
                    <td colSpan={3} className="py-3 px-6 font-semibold text-sm">
                      {category.category}
                    </td>
                  </tr>
                  {category.items.map((item, idx) => (
                    <tr
                      key={item.name}
                      className={idx % 2 === 0 ? 'bg-background' : 'bg-muted/20'}
                    >
                      <td className="py-4 px-6 text-sm">{item.name}</td>
                      <td className="py-4 px-6 text-center">
                        <FeatureCell value={item.free} />
                      </td>
                      <td className="py-4 px-6 text-center bg-primary/5">
                        <FeatureCell value={item.pro} />
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Need a custom plan for your organization?{' '}
          <a href={ROUTES.CONTACT} className="text-primary hover:underline font-medium">  
            Contact sales
          </a>
        </p>
      </div>
    </div>
  )
}

function FeatureCell({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="w-5 h-5 text-primary mx-auto" />
    ) : (
      <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
    )
  }

  return <span className="text-sm font-medium">{value}</span>
}

