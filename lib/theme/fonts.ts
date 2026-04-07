/**
 * Font Configuration
 *
 * Inter is a variable font (supports all weights 100-900 continuously).
 * This means font-medium (500) and font-semibold (600) render correctly —
 * unlike Lato which only had 100/300/400/700/900, causing weight fallbacks.
 *
 * NOTE: Next.js font loaders require literal values in app/layout.tsx.
 * This file is the single source of truth for documentation.
 */

export const FONTS = {
  // Primary UI font — matches Mindtickle's Inter/system-ui stack
  sans: {
    name: "Inter",
    variable: "--font-inter",
    // Variable font — no weight array needed; all weights 100-900 available
  },

  // Monospace (code, system prompts, technical content)
  mono: {
    fallback:
      'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
} as const;

export type FontConfig = typeof FONTS;
