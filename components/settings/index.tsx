/**
 * Settings Screen Component
 * Single Responsibility: Settings and preferences page
 */

import { ConnectionStatus } from './ConnectionStatus'
import { Preferences } from './Preferences'

export function SettingsScreen() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Settings</h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Manage your account and preferences
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConnectionStatus />
        <Preferences />
      </div>
    </div>
  )
}

