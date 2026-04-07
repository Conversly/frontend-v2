import type { CSSProperties } from "react";
import { getChatbotBrandColor } from "@/lib/chatbot-brand-color";
import type { ChatbotStatus } from "@/types/chatbot";

const STATUS_CLASS_MAP: Record<ChatbotStatus, string> = {
  DRAFT: "dashboard-status-chip dashboard-status-chip--warning",
  TRAINING: "dashboard-status-chip dashboard-status-chip--info",
  ACTIVE: "dashboard-status-chip dashboard-status-chip--success",
  INACTIVE: "dashboard-status-chip dashboard-status-chip--neutral",
};

export function getChatbotStatusClass(status: ChatbotStatus): string {
  return STATUS_CLASS_MAP[status];
}

export function getWebsiteHostnameLabel(websiteUrl?: string | null): string | null {
  const value = websiteUrl?.trim();

  if (!value) {
    return null;
  }

  const normalizedUrl = /^https?:\/\//i.test(value) ? value : `https://${value}`;

  try {
    const hostname = new URL(normalizedUrl).hostname.replace(/^www\./i, "");
    return hostname || null;
  } catch {
    return null;
  }
}

export function getChatbotCardBrandStyles(primaryColor?: string | null): {
  baseColor: string;
  heroStyle: CSSProperties;
  logoShellStyle: CSSProperties;
  glowStyle: CSSProperties;
} {
  const baseColor = getChatbotBrandColor(primaryColor);

  return {
    baseColor,
    heroStyle: {
      background: [
        `radial-gradient(circle at top, color-mix(in srgb, ${baseColor} 24%, white) 0%, transparent 62%)`,
        `linear-gradient(160deg, color-mix(in srgb, ${baseColor} 12%, white) 0%, var(--surface-secondary) 54%, var(--card) 100%)`,
      ].join(", "),
    },
    logoShellStyle: {
      background: `linear-gradient(145deg, color-mix(in srgb, ${baseColor} 12%, white) 0%, color-mix(in srgb, ${baseColor} 4%, var(--card)) 100%)`,
      borderColor: `color-mix(in srgb, ${baseColor} 22%, var(--border))`,
      boxShadow: `0 18px 40px color-mix(in srgb, ${baseColor} 16%, transparent)`,
    },
    glowStyle: {
      background: `color-mix(in srgb, ${baseColor} 18%, transparent)`,
    },
  };
}
