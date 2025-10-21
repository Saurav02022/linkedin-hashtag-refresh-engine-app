/**
 * Features Section Component
 * Single Responsibility: Display product features
 */

import { Sparkles, Zap, TrendingUp, Shield, Clock, Copy } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Generation',
    description: 'Google Gemini analyzes your content and generates relevant, trending hashtags tailored to your niche.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get 10-12 professionally selected hashtags in just 2-3 seconds. No more manual research.',
  },
  {
    icon: TrendingUp,
    title: 'Boost Your Reach',
    description: 'Strategic mix of broad and niche hashtags to maximize your post visibility and engagement.',
  },
  {
    icon: Copy,
    title: 'One-Click Copy',
    description: 'Copy all hashtags to clipboard instantly and paste them as a comment on your LinkedIn post.',
  },
  {
    icon: Clock,
    title: 'Save 20+ Minutes',
    description: 'Stop researching hashtags manually. Focus on creating great content instead.',
  },
  {
    icon: Shield,
    title: 'Spam-Free Guarantee',
    description: 'Advanced filtering removes spammy hashtags. Only professional, relevant tags.',
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features designed to save time and boost your LinkedIn presence
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  icon: React.ElementType
  title: string
  description: string
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}

