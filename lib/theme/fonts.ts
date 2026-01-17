/**
 * Font Configuration
 * 
 * Centralized font configuration reference for the application.
 * 
 * NOTE: Next.js font loaders require literal values, so if you change fonts here,
 * you MUST also update the corresponding font loader in app/layout.tsx with the same values.
 * 
 * This file serves as the single source of truth for documentation and CSS references.
 */

export const FONTS = {
  // Hero & Titles
  display: {
    name: "Lato",
    variable: "--font-lato",
    weights: ["100", "300", "400", "700", "900"],
  },

  // Dashboard & Body Text
  body: {
    name: "Lato",
    variable: "--font-lato",
    weights: ["100", "300", "400", "700", "900"],
  },

  // Monospace (code, technical content)
  mono: {
    fallback:
      'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
} as const;

export type FontConfig = typeof FONTS;

