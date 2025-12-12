/**
 * Centralized Theme Configuration
 * 
 * This file contains all theme definitions using shadcn OKLCH color format.
 * To change the theme across the entire application, modify the values in this file.
 * 
 * Color Format: OKLCH (OK Lightness Chroma Hue)
 * - Better perceptual uniformity than HSL
 * - More accurate color representation
 * - Format: oklch(lightness chroma hue)
 */

import { FONTS } from "./fonts";

/**
 * Light Theme Configuration
 * Using shadcn OKLCH color format
 */
export const lightTheme = {
  // Base colors
  background: 'oklch(1 0 0)',
  foreground: 'oklch(0.141 0.005 285.823)',
  
  // Card/Surface colors
  card: 'oklch(1 0 0)',
  cardForeground: 'oklch(0.141 0.005 285.823)',
  
  // Popover/Dropdown colors
  popover: 'oklch(1 0 0)',
  popoverForeground: 'oklch(0.141 0.005 285.823)',
  
  // Primary/Accent colors
  primary: 'oklch(0.541 0.281 293.009)',
  primaryForeground: 'oklch(0.969 0.016 293.756)',
  
  // Secondary colors
  secondary: 'oklch(0.967 0.001 286.375)',
  secondaryForeground: 'oklch(0.21 0.006 285.885)',
  
  // Accent colors
  accent: 'oklch(0.967 0.001 286.375)',
  accentForeground: 'oklch(0.21 0.006 285.885)',
  
  // Muted colors
  muted: 'oklch(0.967 0.001 286.375)',
  mutedForeground: 'oklch(0.552 0.016 285.938)',
  
  // Destructive colors
  destructive: 'oklch(0.577 0.245 27.325)',
  destructiveForeground: 'oklch(0.969 0.016 293.756)',
  
  // Border and input colors
  border: 'oklch(0.92 0.004 286.32)',
  input: 'oklch(0.92 0.004 286.32)',
  ring: 'oklch(0.702 0.183 293.541)',
  
  // Border radius
  radius: '0.65rem',
  
  // Chart colors
  chart1: 'oklch(0.811 0.111 293.571)',
  chart2: 'oklch(0.606 0.25 292.717)',
  chart3: 'oklch(0.541 0.281 293.009)',
  chart4: 'oklch(0.491 0.27 292.581)',
  chart5: 'oklch(0.432 0.232 292.759)',
  
  // Sidebar colors
  sidebar: 'oklch(0.985 0 0)',
  sidebarForeground: 'oklch(0.141 0.005 285.823)',
  sidebarPrimary: 'oklch(0.541 0.281 293.009)',
  sidebarPrimaryForeground: 'oklch(0.969 0.016 293.756)',
  sidebarAccent: 'oklch(0.967 0.001 286.375)',
  sidebarAccentForeground: 'oklch(0.21 0.006 285.885)',
  sidebarBorder: 'oklch(0.92 0.004 286.32)',
  sidebarRing: 'oklch(0.702 0.183 293.541)',
} as const;

/**
 * Dark Theme Configuration
 * Using shadcn OKLCH color format
 */
export const darkTheme = {
  // Base colors
  background: 'oklch(0.141 0.005 285.823)',
  foreground: 'oklch(0.985 0 0)',
  
  // Card/Surface colors
  card: 'oklch(0.21 0.006 285.885)',
  cardForeground: 'oklch(0.985 0 0)',
  
  // Popover/Dropdown colors
  popover: 'oklch(0.21 0.006 285.885)',
  popoverForeground: 'oklch(0.985 0 0)',
  
  // Primary/Accent colors
  primary: 'oklch(0.606 0.25 292.717)',
  primaryForeground: 'oklch(0.969 0.016 293.756)',
  
  // Secondary colors
  secondary: 'oklch(0.274 0.006 286.033)',
  secondaryForeground: 'oklch(0.985 0 0)',
  
  // Accent colors
  accent: 'oklch(0.274 0.006 286.033)',
  accentForeground: 'oklch(0.985 0 0)',
  
  // Muted colors
  muted: 'oklch(0.274 0.006 286.033)',
  mutedForeground: 'oklch(0.705 0.015 286.067)',
  
  // Destructive colors
  destructive: 'oklch(0.704 0.191 22.216)',
  destructiveForeground: 'oklch(0.969 0.016 293.756)',
  
  // Border and input colors
  border: 'oklch(1 0 0 / 10%)',
  input: 'oklch(1 0 0 / 15%)',
  ring: 'oklch(0.38 0.189 293.745)',
  
  // Border radius (same as light)
  radius: '0.65rem',
  
  // Chart colors
  chart1: 'oklch(0.811 0.111 293.571)',
  chart2: 'oklch(0.606 0.25 292.717)',
  chart3: 'oklch(0.541 0.281 293.009)',
  chart4: 'oklch(0.491 0.27 292.581)',
  chart5: 'oklch(0.432 0.232 292.759)',
  
  // Sidebar colors
  sidebar: 'oklch(0.21 0.006 285.885)',
  sidebarForeground: 'oklch(0.985 0 0)',
  sidebarPrimary: 'oklch(0.606 0.25 292.717)',
  sidebarPrimaryForeground: 'oklch(0.969 0.016 293.756)',
  sidebarAccent: 'oklch(0.274 0.006 286.033)',
  sidebarAccentForeground: 'oklch(0.985 0 0)',
  sidebarBorder: 'oklch(1 0 0 / 10%)',
  sidebarRing: 'oklch(0.38 0.189 293.745)',
} as const;

/**
 * Theme tokens for easy access
 */
export const themeTokens = {
  light: lightTheme,
  dark: darkTheme,
  // Typography scale - Roboto font hierarchy
  typography: {
    fontFamily: {
      sans: [
        FONTS.body.variable,
        FONTS.body.name,
        "Helvetica Neue",
        "Arial",
        "sans-serif",
      ],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem', // 12px - Subtext/secondary info
      sm: '0.875rem', // 14px - Body text, buttons
      base: '1rem', // 16px - Base body
      lg: '1.125rem', // 18px - h2 Primary title
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
    },
    fontWeight: {
      normal: '400', // Body text, subtext
      medium: '500', // Buttons
      semibold: '600', // Headings (h2)
      bold: '700', // Strong emphasis
    },
    // Typography hierarchy mapping
    hierarchy: {
      h2: {
        size: 'text-lg', // 18px
        weight: 'font-semibold', // 600
        color: 'text-gray-900', // Primary title
      },
      body: {
        size: 'text-sm', // 14px
        weight: 'font-normal', // 400
        color: 'text-gray-700', // Body message
      },
      subtext: {
        size: 'text-xs', // 12px
        weight: 'font-normal', // 400
        color: 'text-gray-600', // Secondary info
      },
      button: {
        size: 'text-sm', // 14px
        weight: 'font-medium', // 500
        color: 'contrast', // Uses theme contrast color
      },
    },
  },
  // Spacing scale
  spacing: {
    xs: '0.5rem', // 8px
    sm: '0.75rem', // 12px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
  },
  // Shadow scale (matching AvailabilityModal)
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', // From AvailabilityModal
  },
  // Border radius scale
  borderRadius: {
    sm: '0.375rem', // 6px - rounded-md
    DEFAULT: '0.5rem', // 8px - rounded-lg
    md: '0.5rem', // 8px
    lg: '0.75rem', // 12px
    xl: '1rem', // 16px
    full: '9999px', // rounded-full
  },
} as const;

/**
 * Helper function to get CSS variable value
 */
export function getThemeVar(token: keyof typeof lightTheme, theme: 'light' | 'dark' = 'light'): string {
  const themeConfig = theme === 'light' ? lightTheme : darkTheme;
  return themeConfig[token];
}

/**
 * Helper function to get OKLCH color string
 */
export function getOKLCHColor(token: keyof typeof lightTheme, theme: 'light' | 'dark' = 'light'): string {
  return getThemeVar(token, theme);
}

/**
 * Type exports for TypeScript
 */
export type ThemeMode = 'light' | 'dark';
export type ThemeToken = keyof typeof lightTheme;

