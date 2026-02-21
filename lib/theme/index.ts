/**
 * Centralized Theme Configuration
 *
 * ─── SINGLE SOURCE OF TRUTH ───────────────────────────────────────────────
 * All color values are defined ONCE in app/globals.css as OKLCH CSS variables.
 * This file references those variables so the JS/TS layer always stays in sync.
 * Never hardcode color values here — update globals.css instead.
 * ──────────────────────────────────────────────────────────────────────────
 */

import { FONTS } from "./fonts";

/**
 * Light Theme — references CSS variables defined in globals.css :root
 */
export const lightTheme = {
  background: "var(--background)",
  foreground: "var(--foreground)",
  card: "var(--card)",
  cardForeground: "var(--card-foreground)",
  popover: "var(--popover)",
  popoverForeground: "var(--popover-foreground)",
  primary: "var(--primary)",
  primaryForeground: "var(--primary-foreground)",
  secondary: "var(--secondary)",
  secondaryForeground: "var(--secondary-foreground)",
  accent: "var(--accent)",
  accentForeground: "var(--accent-foreground)",
  muted: "var(--muted)",
  mutedForeground: "var(--muted-foreground)",
  destructive: "var(--destructive)",
  destructiveForeground: "var(--destructive-foreground)",
  border: "var(--border)",
  input: "var(--input)",
  ring: "var(--ring)",
  radius: "var(--radius)",
  chart1: "var(--chart-1)",
  chart2: "var(--chart-2)",
  chart3: "var(--chart-3)",
  chart4: "var(--chart-4)",
  chart5: "var(--chart-5)",
  sidebar: "var(--sidebar)",
  sidebarForeground: "var(--sidebar-foreground)",
  sidebarPrimary: "var(--sidebar-primary)",
  sidebarPrimaryForeground: "var(--sidebar-primary-foreground)",
  sidebarAccent: "var(--sidebar-accent)",
  sidebarAccentForeground: "var(--sidebar-accent-foreground)",
  sidebarBorder: "var(--sidebar-border)",
  sidebarRing: "var(--sidebar-ring)",
} as const;

/**
 * Dark Theme — references CSS variables defined in globals.css .dark
 * (Same variable names; the .dark selector swaps underlying values in CSS.)
 */
export const darkTheme = lightTheme; // .dark in CSS handles all overrides

/**
 * Theme tokens — typography and spacing scales.
 * Font sizes and weights are documented here for reference;
 * the actual rendering values are driven by CSS variables in globals.css.
 */
export const themeTokens = {
  light: lightTheme,
  dark: darkTheme,

  typography: {
    fontFamily: {
      sans: [
        FONTS.body.variable,
        FONTS.body.name,
        "Helvetica Neue",
        "Arial",
        "sans-serif",
      ],
      mono: [
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "monospace",
      ],
    },
    // Reference only — actual sizes defined as --font-* in globals.css
    fontSize: {
      xsmall: "var(--font-xsmall)", // 12px
      small: "var(--font-small)",  // 13px
      body: "var(--font-body)",   // 14px
      ui: "var(--font-ui)",     // 15px
      h5: "var(--font-h5)",     // 14px
      h4: "var(--font-h4)",     // 16px
      h3: "var(--font-h3)",     // 18px
      h2: "var(--font-h2)",     // 20px
      h1: "var(--font-h1)",     // 24px
    },
    lineHeight: {
      xsmall: "var(--line-xsmall)",
      small: "var(--line-small)",
      body: "var(--line-body)",
      ui: "var(--line-ui)",
      h5: "var(--line-h5)",
      h4: "var(--line-h4)",
      h3: "var(--line-h3)",
      h2: "var(--line-h2)",
      h1: "var(--line-h1)",
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
  },

  spacing: {
    xs: "0.5rem",  // 8px
    sm: "0.75rem", // 12px
    md: "1rem",    // 16px
    lg: "1.5rem",  // 24px
    xl: "2rem",    // 32px
  },

  shadows: {
    sm: "var(--shadow-sm)",
    DEFAULT: "var(--shadow)",
    md: "var(--shadow-md)",
    lg: "var(--shadow-lg)",
    xl: "var(--shadow-xl)",
  },

  borderRadius: {
    sm: "calc(var(--radius) - 4px)",
    DEFAULT: "var(--radius)",
    md: "calc(var(--radius) - 2px)",
    lg: "var(--radius)",
    xl: "calc(var(--radius) + 4px)",
    full: "9999px",
  },
} as const;

/**
 * Helper to get a CSS variable reference string for a theme token.
 * Since both themes now use the same CSS variable names,
 * this simply returns the var() string for use in inline styles.
 */
export function getThemeVar(token: keyof typeof lightTheme): string {
  return lightTheme[token];
}

/** @deprecated — Use getThemeVar() instead. Theme is now CSS-variable driven. */
export function getOKLCHColor(token: keyof typeof lightTheme): string {
  return getThemeVar(token);
}

export type ThemeMode = "light" | "dark";
export type ThemeToken = keyof typeof lightTheme;
