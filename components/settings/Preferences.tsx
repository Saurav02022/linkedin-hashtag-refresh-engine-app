/**
 * Preferences Component
 * Single Responsibility: User preferences and settings
 */

'use client'

import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/contexts/AuthContext'

export function Preferences() {
  const { user } = useAuth()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription className="leading-relaxed">
          Customize your hashtag generation settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Hashtag Count */}
        <div className="space-y-2">
          <Label htmlFor="hashtag-count">Default Hashtag Count</Label>
          <Input
            id="hashtag-count"
            type="number"
            min="5"
            max="15"
            defaultValue="12"
            className="w-32"
          />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Number of hashtags to generate (5-15)
          </p>
        </div>

        <Separator />

        {/* API Usage */}
        <div className="space-y-2">
          <h4 className="font-medium">API Usage</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Requests this month</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div>
              <p className="text-muted-foreground">Estimated cost</p>
              <p className="text-2xl font-bold">$0.00</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Account Info */}
        <div className="space-y-2">
          <h4 className="font-medium">Account</h4>
          <div className="space-y-1 text-sm">
            <p className="text-muted-foreground">
              Email: {user?.email || 'Not available'}
            </p>
            <p className="text-muted-foreground">Plan: Free</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

