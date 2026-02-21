"use client"

import { useTheme as useNextTheme } from "next-themes"
import { getThemeVar, type ThemeMode } from "@/lib/theme"

/**
 * Custom hook for theme management.
 *
 * Colors are now CSS-variable driven — getThemeVar() returns CSS var() strings
 * suitable for inline styles. The actual rendered values come from globals.css.
 */
export function useTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme()

  const currentTheme: ThemeMode =
    ((theme === "system" ? systemTheme : theme) as ThemeMode) || "light"

  return {
    theme: currentTheme,
    setTheme,
    systemTheme,
    // Returns CSS variable reference, e.g. "var(--accent)"
    accentColor: getThemeVar("accent"),
    primaryColor: getThemeVar("primary"),
    isDark: currentTheme === "dark",
    isLight: currentTheme === "light",
  }
}
