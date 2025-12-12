import { ReactNode } from "react";

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  imageSrc?: string;
  visual?: ReactNode;
  primaryButtonText: string;
  primaryDisabled?: boolean;
  secondaryButtonText?: string;
  primaryButtonAction?: () => void;
  secondaryButtonIcon?: ReactNode;
  tagLabel: string;
  tagIcon?: ReactNode;
  accentColor: "blue" | "green" | "purple";
}

export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

