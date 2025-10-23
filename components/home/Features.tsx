/**
 * Features Section Component
 * Single Responsibility: Display product features
 */

import { Sparkles, Zap, TrendingUp, Shield, Clock, Copy, RefreshCw, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: RefreshCw,
    title: 'Auto-Refresh Hashtags',
    description: 'Set it and forget it! Automatically refresh hashtags every 24-168 hours to maintain peak engagement on evergreen content.',
    highlight: true,
  },
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
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Choose your refresh interval: every 24h, 48h (recommended), 72h, weekly, or set a custom schedule.',
  },
  {
    icon: TrendingUp,
    title: 'Maintain Engagement',
    description: 'Keep your old posts visible as hashtags lose 80% effectiveness after 48 hours. Fresh tags = sustained reach.',
  },
  {
    icon: Clock,
    title: 'Save Hours Weekly',
    description: 'Eliminate manual hashtag research and updates. Focus on creating great content instead.',
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
  highlight?: boolean
}

function FeatureCard({ icon: Icon, title, description, highlight }: FeatureCardProps) {
  return (
    <Card className={`border-2 hover:shadow-lg transition-all duration-300 ${
      highlight 
        ? 'border-primary bg-primary/5 hover:border-primary' 
        : 'hover:border-primary/50'
    }`}>
      <CardHeader>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
          highlight ? 'bg-primary text-primary-foreground' : 'bg-primary/10'
        }`}>
          <Icon className={`w-6 h-6 ${highlight ? '' : 'text-primary'}`} />
        </div>
        <CardTitle className="text-xl flex items-center gap-2">
          {title}
          {highlight && (
            <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
              Pro
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}

