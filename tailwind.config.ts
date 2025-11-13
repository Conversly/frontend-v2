import type { Config } from "tailwindcss";

/**
 * Tailwind v4 Configuration
 * 
 * Most theme configuration has been moved to @theme inline in globals.css.
 * This file is kept minimal for compatibility with plugins and custom settings.
 */
export default {
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	// Theme configuration moved to @theme inline in globals.css
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

