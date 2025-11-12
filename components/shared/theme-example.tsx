/**
 * Theme System Example Component
 * 
 * This component demonstrates how to use the centralized theme system.
 * You can use this as a reference when building new components.
 */

"use client"

import { useTheme } from "@/hooks/use-theme"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ThemeToggle } from "./theme-toggle"

export function ThemeExample() {
  const { accentColor, primaryColor, isDark, theme } = useTheme()

  return (
    <div className="space-y-6 p-6">
      {/* Header with theme toggle */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">
          Theme System Example
        </h1>
        <ThemeToggle />
      </div>

      {/* Current theme info */}
      <Card className="p-4 bg-card border-border">
        <p className="text-sm text-muted-foreground">
          Current theme: <span className="font-semibold text-foreground">{theme}</span>
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Accent color: <span className="font-mono">{accentColor}</span>
        </p>
      </Card>

      {/* Buttons using theme */}
      <div className="flex gap-4 flex-wrap">
        <Button className="bg-primary text-primary-foreground">
          Primary Button
        </Button>
        <Button variant="outline" className="border-border">
          Outline Button
        </Button>
        <Button 
          variant="secondary"
          className="bg-secondary text-secondary-foreground"
        >
          Secondary Button
        </Button>
      </div>

      {/* Cards with different backgrounds */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            Card with Theme
          </h3>
          <p className="text-sm text-muted-foreground">
            This card uses theme tokens for background, border, and text colors.
          </p>
        </Card>

        <Card className="p-6 bg-muted border-border">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Muted Card
          </h3>
          <p className="text-sm text-muted-foreground">
            This card uses the muted background color from the theme.
          </p>
        </Card>
      </div>

      {/* Inline style example */}
      <Card className="p-6" style={{ backgroundColor: accentColor }}>
        <h3 className="text-lg font-semibold text-white mb-2">
          Using Theme Hook
        </h3>
        <p className="text-sm text-white/90">
          This card uses the accent color from the theme hook via inline styles.
        </p>
      </Card>

      {/* Border radius example */}
      <div className="flex gap-4">
        <div className="w-16 h-16 bg-primary rounded-sm" />
        <div className="w-16 h-16 bg-primary rounded-md" />
        <div className="w-16 h-16 bg-primary rounded-lg" />
        <div className="w-16 h-16 bg-primary rounded-full" />
      </div>
    </div>
  )
}

