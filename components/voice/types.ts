import * as React from "react";

export interface CollapsibleSectionProps {
    id: string;
    title: string;
    description?: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export interface ProviderIndicator {
    name: string;
    color: string;
}
