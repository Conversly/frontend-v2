import { useTheme } from "next-themes";
import { lightTheme, darkTheme } from "./index";
import { useMemo } from "react";

export function useThemeStyles() {
    const { theme, systemTheme } = useTheme();

    return useMemo(() => {
        const currentTheme = theme === "system" ? systemTheme : theme;
        const isDark = currentTheme === "dark";
        const themeConfig = isDark ? darkTheme : lightTheme;

        return Object.entries(themeConfig).reduce((acc, [key, value]) => {
            // Convert camelCase to kebab-case for CSS variables
            const cssVar = `--${key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}`;
            acc[cssVar] = value;
            return acc;
        }, {} as Record<string, string>);
    }, [theme, systemTheme]);
}
