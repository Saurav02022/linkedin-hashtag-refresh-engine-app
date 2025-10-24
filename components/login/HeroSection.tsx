/**
 * Hero Section Component
 * Single Responsibility: Display landing page hero content
 */

import { Hash, Sparkles, Zap, TrendingUp } from 'lucide-react'

export function HeroSection() {
  return (
    <div className="space-y-8 text-center max-w-3xl mx-auto">
      {/* Logo/Icon */}
      <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-primary/10">
        <Hash className="w-12 h-12 text-primary" aria-hidden="true" />
      </div>

      {/* Headline */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          AI-Powered Hashtags for
          <span className="block text-primary mt-2">LinkedIn Posts</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Stop wasting 30 minutes researching hashtags. Let AI generate 
          relevant, trending hashtags for your LinkedIn posts in seconds.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
        <FeatureCard
          icon={Sparkles}
          title="AI-Powered"
          description="Google Gemini analyzes your content"
        />
        <FeatureCard
          icon={Zap}
          title="Lightning Fast"
          description="Get 10-12 hashtags in 3 seconds"
        />
        <FeatureCard
          icon={TrendingUp}
          title="Boost Reach"
          description="Mix of broad and niche hashtags"
        />
      </div>

      {/* Social Proof */}
      <div className="pt-4">
        <p className="text-sm text-muted-foreground">
          Save 20+ minutes per post • 100% Free to start
        </p>
      </div>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ElementType
  title: string
  description: string
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-xl border bg-card hover:shadow-md transition-all duration-300">
      <Icon className="w-8 h-8 text-primary mx-auto mb-3" aria-hidden="true" />
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

