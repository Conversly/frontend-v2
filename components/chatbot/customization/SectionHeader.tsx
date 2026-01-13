import { LucideIcon } from "lucide-react";

export interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
}

export function SectionHeader({ title, description, icon: Icon }: SectionHeaderProps) {
  return (
    <div>
      {Icon && <Icon className="w-5 h-5 mb-2 text-primary" />}
      <h3 className="type-section-title mb-1">{title}</h3>
      {description && <p className="type-body-muted">{description}</p>}
    </div>
  );
}

