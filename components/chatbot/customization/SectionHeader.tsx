import type { ComponentType } from "react";

export interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: ComponentType<{ sx?: any; className?: string }>;
}

export function SectionHeader({ title, description, icon: Icon }: SectionHeaderProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">
        {Icon && <Icon sx={{ fontSize: 16, color: "var(--primary)", flexShrink: 0 }} />}
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
    </div>
  );
}

