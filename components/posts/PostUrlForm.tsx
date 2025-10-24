/**
 * Post URL Form Component
 * Single Responsibility: Handle post URL input with graceful fallback to manual content
 */

'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, AlertCircle, Sparkles, ArrowDown } from 'lucide-react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { postFormSchema, type PostFormInput } from '@/lib/validations'

interface PostUrlFormProps {
  onSubmit: (data: PostFormInput) => void
  isLoading?: boolean
}

export function PostUrlForm({ onSubmit, isLoading }: PostUrlFormProps) {
  const [showManualInput, setShowManualInput] = useState(false)
  
  const form = useForm<PostFormInput>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      url: '',
      content: '',
    },
  })

  const urlValue = form.watch('url')

  function handleContinue() {
    // Validate URL first
    if (urlValue && urlValue.length > 0) {
      setShowManualInput(true)
    }
  }

  function handleSubmit(data: PostFormInput) {
    onSubmit(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Step 1: LinkedIn Post URL */}
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">
                Step 1: LinkedIn Post URL
              </FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://www.linkedin.com/posts/your-username-123456789"
                  className="font-mono text-sm"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Paste your LinkedIn post URL to get started
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Continue Button - Show after URL is entered */}
        {!showManualInput && urlValue && urlValue.length > 0 && (
          <Button 
            type="button"
            size="lg"
            className="w-full"
            onClick={handleContinue}
          >
            Continue
            <ArrowDown className="w-4 h-4 ml-2" />
          </Button>
        )}

        {/* Show explanation and manual input after URL is entered */}
        {showManualInput && (
          <>
            {/* Explanation Message */}
            <div className="flex items-center justify-center">
              <ArrowDown className="w-5 h-5 text-muted-foreground animate-bounce" />
            </div>

            <Alert className="border-warning/50 bg-warning/5">
              <AlertCircle className="h-4 w-4 text-warning" />
              <AlertTitle className="text-warning">LinkedIn API Doesn't Allow Automatic Extraction</AlertTitle>
              <AlertDescription className="space-y-2">
                <p>
                  Due to LinkedIn's API restrictions, we cannot automatically extract content from post URLs. 
                  This limitation affects all apps (including Buffer, Hootsuite, etc.).
                </p>
                <p className="text-sm font-medium">
                  <strong>No worries!</strong> Simply paste your post content below (takes 2 seconds). 
                  This is actually faster and more reliable than automated extraction.
                </p>
              </AlertDescription>
            </Alert>

            {/* Step 2: Manual Content Input */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Step 2: Paste Your Post Content <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste your LinkedIn post content here...

Example:
🚀 Just launched my new SaaS product!

After months of development, I'm excited to share my solution that helps entrepreneurs save 10+ hours per week on social media management..."
                      className="min-h-[200px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Copy the text from your LinkedIn post and paste it here (minimum 10 characters)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Hashtags...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate AI Hashtags
                </>
              )}
            </Button>
          </>
        )}

        {/* If no URL entered yet, show a tip */}
        {!showManualInput && (
          <Alert className="border-primary/50 bg-primary/5">
            <Sparkles className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary">Quick Tip</AlertTitle>
            <AlertDescription>
              Paste your LinkedIn post URL above, then we'll guide you through the next step to generate AI-powered hashtags in seconds.
            </AlertDescription>
          </Alert>
        )}
      </form>
    </Form>
  )
}

