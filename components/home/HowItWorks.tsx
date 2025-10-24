/**
 * How It Works Section Component
 * Single Responsibility: Explain the process
 */

import { LinkIcon, FileText, Sparkles, Send } from 'lucide-react'

const steps = [
  {
    number: 1,
    icon: LinkIcon,
    title: 'Paste URL & Content',
    description: 'Add your LinkedIn post URL, then paste your post content (takes 2 seconds). Simple and fast.',
  },
  {
    number: 2,
    icon: Sparkles,
    title: 'AI Generates 3 Strategies',
    description: 'Get 3 strategic hashtag batches in 2-3 seconds: Maximum Reach, Viral Potential, and Niche Engagement.',
  },
  {
    number: 3,
    icon: Send,
    title: 'Post to LinkedIn',
    description: 'Select your preferred strategy, customize if needed, then click "Post to LinkedIn". One-click done!',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Three simple steps to better LinkedIn hashtags
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <StepCard {...step} />
                {/* Connector Line (hidden on mobile, last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/4 left-full w-full h-0.5 bg-linear-to-r from-primary/50 to-transparent -z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface StepCardProps {
  number: number
  icon: React.ElementType
  title: string
  description: string
}

function StepCard({ number, icon: Icon, title, description }: StepCardProps) {
  return (
    <div className="text-center space-y-4">
      {/* Step Number */}
      <div className="relative inline-flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl flex items-center justify-center relative z-10">
          {number}
        </div>
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" aria-hidden="true" />
      </div>

      {/* Icon */}
      <div className="flex justify-center">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}

