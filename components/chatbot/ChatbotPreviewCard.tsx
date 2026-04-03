"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Ellipsis, Loader2, Bot, MessageSquare, ArrowRight, GitBranch, Rocket, Activity } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { GetChatbotsResponse } from "@/types/chatbot";
import { useRouter } from "next/navigation";

interface ChatbotPreviewCardProps {
  chatbot: GetChatbotsResponse;
  onDelete: (chatbotId: string) => void;
}

// Build a soft gradient from the chatbot's primaryColor (default brand blue)
const getPrimaryGradient = (primaryColor?: string | null) => {
  const color = primaryColor || '#007bff';
  return {
    gradient: `linear-gradient(135deg, ${color} 0%, ${color}bf 100%)`, // Solid to 75% opacity
    baseColor: color,
  };
};

// Time since helper
const getTimeSince = (date: Date | null) => {
  if (!date) return "recently";
  const now = new Date();
  const d = new Date(date);
  const diffMs = now.getTime() - d.getTime();
  const mins = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

export function ChatbotPreviewCard({ chatbot, onDelete }: ChatbotPreviewCardProps) {
  const { baseColor } = getPrimaryGradient(chatbot.primaryColor);
  const workspacePrefix = `/${chatbot.workspaceId}`;
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const playgroundHref = `${workspacePrefix}/chatbot/${chatbot.id}/playground`;

  const statusClassMap = {
    DRAFT: "dashboard-status-chip dashboard-status-chip--warning",
    TRAINING: "dashboard-status-chip dashboard-status-chip--info",
    ACTIVE: "dashboard-status-chip dashboard-status-chip--success",
    INACTIVE: "dashboard-status-chip dashboard-status-chip--neutral",
  } as const;

  const deploymentLabel =
    chatbot.lastDeployedAt && chatbot.liveVersion > 0
      ? getTimeSince(chatbot.lastDeployedAt)
      : "Not deployed";

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-[var(--panel-radius-lg)] border border-[var(--panel-border-soft)] bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg">
      {isNavigating && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-card/60 backdrop-blur-[2px]">
          <div className="flex items-center gap-2 rounded-md bg-card px-3 py-2 text-xs text-muted-foreground shadow-md border border-border">
            <Loader2 className="h-4 w-4 animate-spin" />
            Opening…
          </div>
        </div>
      )}

      <div className="border-b border-border/60 bg-[var(--surface-secondary)] px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="flex h-12 w-12 shrink-0 overflow-hidden items-center justify-center rounded-2xl border border-border/70 bg-card shadow-sm"
              style={{ background: chatbot.logoUrl ? undefined : `linear-gradient(135deg, ${baseColor}16, ${baseColor}08)` }}
            >
              {chatbot.logoUrl ? (
                <img
                  src={chatbot.logoUrl}
                  alt={chatbot.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Bot className="h-5 w-5" style={{ color: baseColor }} />
              )}
            </div>
            <div className="min-w-0">
              <div className="mb-1 flex items-center gap-2">
                <span className={statusClassMap[chatbot.status]}>{chatbot.status}</span>
              </div>
              <Link
                href={playgroundHref}
                onClick={() => setIsNavigating(true)}
                className="block"
              >
                <h3 className="truncate text-base font-semibold leading-tight tracking-[-0.01em] text-foreground transition-colors group-hover:text-primary">
                  {chatbot.name}
                </h3>
              </Link>
              <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                Created {getTimeSince(chatbot.createdAt)}
              </p>
            </div>
          </div>
          <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary/55 shadow-[0_0_0_6px_rgba(25,118,210,0.08)]" />
        </div>
      </div>

      <div className="relative flex flex-1 flex-col px-5 py-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="dashboard-panel-muted rounded-[var(--panel-radius-sm)] p-3">
            <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              <MessageSquare className="h-3.5 w-3.5" />
              Conversations
            </div>
            <p className="text-lg font-semibold text-foreground">
              {(chatbot.conversationCount ?? 0).toLocaleString()}
            </p>
          </div>
          <div className="dashboard-panel-muted rounded-[var(--panel-radius-sm)] p-3">
            <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              <GitBranch className="h-3.5 w-3.5" />
              Versions
            </div>
            <p className="text-sm font-semibold text-foreground">
              DEV v{chatbot.devVersion}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">LIVE v{chatbot.liveVersion}</p>
          </div>
          <div className="dashboard-panel-muted rounded-[var(--panel-radius-sm)] p-3">
            <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              <Rocket className="h-3.5 w-3.5" />
              Deployment
            </div>
            <p className="text-sm font-semibold text-foreground">{deploymentLabel}</p>
          </div>
          <div className="dashboard-panel-muted rounded-[var(--panel-radius-sm)] p-3">
            <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              <Activity className="h-3.5 w-3.5" />
              Environment
            </div>
            <p className="text-sm font-semibold text-foreground">
              {chatbot.devVersion > chatbot.liveVersion ? "Draft ahead of live" : "Draft synced"}
            </p>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-2 border-t border-border/60 pt-4">
          <Button
            variant="outline"
            className="flex-1 justify-between gap-2 text-sm"
            onClick={() => {
              setIsNavigating(true);
              router.push(`${workspacePrefix}/chatbot/${chatbot.id}/playground`);
            }}
          >
            Open workspace
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 rounded-xl border border-border/70 bg-[var(--surface-secondary)]">
                <Ellipsis className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete(chatbot.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
}
