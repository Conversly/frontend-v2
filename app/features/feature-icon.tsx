import * as LucideIcons from "lucide-react";

function toPascalCase(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export function getFeatureIconComponent(iconName?: string) {
  if (!iconName) {
    return LucideIcons.Sparkles;
  }

  const componentName = toPascalCase(iconName);
  const icon = (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[componentName];
  return icon ?? LucideIcons.Sparkles;
}
