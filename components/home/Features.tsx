/**
 * Features Section Component
 * Single Responsibility: Display product features
 */

import { Sparkles, Zap, Target, Send, Edit3, Shield } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Analysis',
    description: 'Google Gemini 2.5 Flash analyzes your content and generates 10-12 relevant, trending hashtags instantly.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get professional hashtag recommendations in 2-3 seconds. No more 20-minute research sessions.',
  },
  {
    icon: Target,
    title: '3 Strategic Batches',
    description: 'Choose from Maximum Reach, Viral Potential, or Niche Engagement strategies—each optimized for different goals.',
  },
  {
    icon: Send,
    title: 'One-Click Posting',
    description: 'Post hashtags directly to LinkedIn as comments with a single click. No copy-paste needed.',
  },
  {
    icon: Edit3,
    title: 'Fully Customizable',
    description: 'Add, remove, or mix hashtags from different batches. Complete control before posting.',
  },
  {
    icon: Shield,
    title: 'Simple & Reliable',
    description: 'Manual content input ensures 100% reliability. No scraping failures or complex setup required.',
  },
]

export function Features() {
  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
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

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="h-full border-2 hover:shadow-lg hover:border-primary/50 transition-all duration-300">
      <CardHeader>
        <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-primary/10">
          <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
        </div>
        <CardTitle className="text-xl">
          {title}
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

