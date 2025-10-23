/**
 * Post URL Form Component
 * Single Responsibility: Handle post URL input
 */

'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Info, AlertCircle } from 'lucide-react'
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { postFormSchema, type PostFormInput } from '@/lib/validations'

interface PostUrlFormProps {
  onSubmit: (url: string) => void
  isLoading?: boolean
}

export function PostUrlForm({ onSubmit, isLoading }: PostUrlFormProps) {
  const form = useForm<PostFormInput>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      url: '',
    },
  })

  function handleSubmit(data: PostFormInput) {
    onSubmit(data.url)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Important Notice */}
        <Alert className="border-primary/50 bg-primary/5">
          <Info className="h-4 w-4 text-primary" />
          <AlertTitle className="text-primary">Important: Use Your Own Posts</AlertTitle>
          <AlertDescription>
            Only paste URLs of posts <strong>you created</strong> or <strong>reposted</strong>. 
            You can only add hashtag comments to your own content. LinkedIn will reject attempts 
            to comment on other people's posts.
          </AlertDescription>
        </Alert>

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn Post URL</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://www.linkedin.com/posts/your-username-123456789"
                  className="font-mono text-sm"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Paste the URL of a LinkedIn post you created or reposted
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

