"use client"

import { useTheme as useNextTheme } from "next-themes"
import { getOKLCHColor, type ThemeMode } from "@/lib/theme"

/**
 * Custom hook for theme management
 * 
 * Provides easy access to theme state and utilities
 * based on the centralized theme system using OKLCH colors.
 * 
 * @example
 * ```tsx
 * const { theme, setTheme, accentColor } = useTheme()
 * 
 * return (
 *   <div style={{ backgroundColor: accentColor }}>
 *     Current theme: {theme}
 *   </div>
 * )
 * ```
 */
export function useTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme()
  
  const currentTheme: ThemeMode = (theme === "system" ? systemTheme : theme) as ThemeMode || "light"
  
  return {
    theme: currentTheme,
    setTheme,
    systemTheme,
    // Helper to get accent color (OKLCH format)
    accentColor: getOKLCHColor("accent", currentTheme),
    // Helper to get primary color (OKLCH format)
    primaryColor: getOKLCHColor("primary", currentTheme),
    // Helper to check if dark mode
    isDark: currentTheme === "dark",
    // Helper to check if light mode
    isLight: currentTheme === "light",
  }
}

