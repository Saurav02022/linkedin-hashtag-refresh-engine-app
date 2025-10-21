/**
 * How It Works Section Component
 * Single Responsibility: Explain the process
 */

import { LinkIcon, Sparkles, Copy } from 'lucide-react'

const steps = [
  {
    number: 1,
    icon: LinkIcon,
    title: 'Paste Your URL',
    description: 'Copy the URL of your LinkedIn post and paste it into our simple form. Support for up to 10 posts at once.',
  },
  {
    number: 2,
    icon: Sparkles,
    title: 'AI Generates Hashtags',
    description: 'Our AI analyzes your content and generates 10-12 relevant, trending hashtags in 2-3 seconds.',
  },
  {
    number: 3,
    icon: Copy,
    title: 'Copy & Paste',
    description: 'Click "Copy All" and paste the hashtags as a comment on your LinkedIn post. Done!',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
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
                  <div className="hidden md:block absolute top-1/4 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -z-10" />
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
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
      </div>

      {/* Icon */}
      <div className="flex justify-center">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}

