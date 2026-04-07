import { LucideIcon } from "lucide-react";

export interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
}

export function SectionHeader({ title, description, icon: Icon }: SectionHeaderProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-primary shrink-0" />}
        <h3 className="type-card-title">{title}</h3>
      </div>
      {description && <p className="type-body-muted mt-0.5">{description}</p>}
    </div>
  );
}
