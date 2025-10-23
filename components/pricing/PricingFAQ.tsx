/**
 * Pricing FAQ Component
 * Single Responsibility: Display frequently asked questions about pricing
 */

'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/routes'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'How does the free plan work?',
    answer: 'The free plan gives you 10 hashtag generations per month with basic AI-powered suggestions. It\'s perfect for trying out the platform and seeing if it fits your needs. No credit card required to start.',
  },
  {
    question: 'Can I upgrade or downgrade anytime?',
    answer: 'Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect immediately, and we\'ll prorate any charges or credits to your account.',
  },
  {
    question: 'What happens when I hit my generation limit?',
    answer: 'When you reach your monthly limit, you\'ll be prompted to upgrade to continue generating hashtags. Your existing hashtags and data remain accessible. Limits reset on the first day of each billing cycle.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes! We offer a 14-day money-back guarantee on all paid plans. If you\'re not satisfied for any reason, contact us within 14 days of your purchase for a full refund.',
  },
  {
    question: 'Is my LinkedIn data secure?',
    answer: 'Absolutely. We use industry-standard encryption (SSL/TLS) to protect your data. We only access the information necessary to generate hashtags and never store your LinkedIn credentials. We\'re fully GDPR compliant.',
  },
  {
    question: 'Can I use Hashtag Engine for my team?',
    answer: 'Yes! The Business plan supports up to 5 team members with shared workspaces and role-based access control. Need more users? Contact us for a custom enterprise plan.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover) and debit cards. All payments are processed securely through Stripe.',
  },
  {
    question: 'How does the API access work?',
    answer: 'Business plan subscribers get full API access to integrate hashtag generation into their own tools and workflows. We provide comprehensive documentation, code examples, and dedicated support to help you get started.',
  },
  {
    question: 'Can I get a custom plan for my organization?',
    answer: 'Yes! We offer custom enterprise plans with tailored features, volume pricing, dedicated support, and custom integrations. Contact our sales team to discuss your specific needs.',
  },
  {
    question: 'What if I have more questions?',
    answer: 'We\'re here to help! Reach out to our support team at support@hashtagengine.com or use the chat widget in the bottom-right corner. Pro and Business customers get priority support.',
  },
]

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="container mx-auto max-w-3xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-muted-foreground">
          Everything you need to know about our pricing and plans
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
              aria-expanded={openIndex === index}
            >
              <span className="font-semibold pr-4">{faq.question}</span>
              <ChevronDown
                className={cn(
                  'w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200',
                  openIndex === index && 'transform rotate-180'
                )}
              />
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-200',
                openIndex === index ? 'max-h-96' : 'max-h-0'
              )}
            >
              <div className="px-6 pb-4 text-muted-foreground">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center p-6 rounded-lg bg-muted/50 border">
        <h3 className="font-semibold text-lg mb-2">Still have questions?</h3>
        <p className="text-muted-foreground mb-4">
          Can't find the answer you're looking for? Our friendly team is here to help.
        </p>
        <a
          href={ROUTES.CONTACT}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6"
        >
          Contact Support
        </a>
      </div>
    </div>
  )
}

