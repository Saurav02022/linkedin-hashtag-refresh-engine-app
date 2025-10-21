/**
 * Post URL Form Component
 * Single Responsibility: Handle post URL input
 */

'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
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
import { Textarea } from '@/components/ui/textarea'
import { postFormSchema, type PostFormInput } from '@/lib/validations'

interface PostUrlFormProps {
  onSubmit: (urls: string[]) => void
  isLoading?: boolean
}

export function PostUrlForm({ onSubmit, isLoading }: PostUrlFormProps) {
  const form = useForm<PostFormInput>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      urls: '',
    },
  })

  function handleSubmit(data: PostFormInput) {
    // Split and clean URLs after validation
    const urls = data.urls
      .split('\n')
      .filter((url) => url.trim())
      .map((url) => url.trim())
    
    onSubmit(urls)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="urls"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn Post URLs</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="https://linkedin.com/posts/..."
                  className="min-h-[150px] font-mono text-sm resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter 1-10 LinkedIn post URLs, one per line
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          size="lg"
          className="w-full sm:w-auto"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {isLoading ? 'Generating...' : 'Generate Hashtags'}
        </Button>
      </form>
    </Form>
  )
}

