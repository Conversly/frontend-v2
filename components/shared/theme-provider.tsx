"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes"

/**
 * ThemeProvider Component
 * 
 * Wraps the application with theme context and persistence.
 * Theme values are centralized in lib/theme/index.ts
 * 
 * Features:
 * - Light/Dark mode support
 * - localStorage persistence
 * - System preference detection
 * - Smooth theme transitions
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={true}
      storageKey="conversly-theme"
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
