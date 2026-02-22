"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Ellipsis, Loader2, Bot, MessageSquare, ArrowRight } from "lucide-react";
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
    gradient: `linear-gradient(135deg, ${color}cc 0%, ${color}88 100%)`,
    baseColor: color,
  };
};

// Deploy status badge config
const getDeployBadge = (status: string | null) => {
  switch (status) {
    case 'SYNCED':
      return { label: 'Live', dotClass: 'bg-green-500', textClass: 'text-green-700', ringClass: 'border-green-200 bg-green-50' };
    case 'DEV_DIRTY':
      return { label: 'Undeployed Changes', dotClass: 'bg-amber-500', textClass: 'text-amber-700', ringClass: 'border-amber-200 bg-amber-50' };
    case 'DEPLOYING':
      return { label: 'Deploying', dotClass: 'bg-primary animate-pulse', textClass: 'text-primary', ringClass: 'border-primary/20 bg-primary/5' };
    case 'NOT_DEPLOYED':
    default:
      return { label: 'Not Deployed', dotClass: 'bg-muted-foreground/50', textClass: 'text-muted-foreground', ringClass: 'border-border bg-muted' };
  }
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
  const { gradient, baseColor } = getPrimaryGradient(chatbot.primaryColor);
  const workspacePrefix = `/${chatbot.workspaceId}`;
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const playgroundHref = `${workspacePrefix}/chatbot/${chatbot.id}/playground`;
  const badge = getDeployBadge(chatbot.deployStatusField);

  return (
    <Card className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-lg">
      {isNavigating && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-card/60 backdrop-blur-[2px]">
          <div className="flex items-center gap-2 rounded-md bg-card px-3 py-2 text-xs text-muted-foreground shadow-md border border-border">
            <Loader2 className="h-4 w-4 animate-spin" />
            Opening…
          </div>
        </div>
      )}

      {/* Gradient Header */}
      <Link
        href={playgroundHref}
        className="relative block h-[120px] w-full overflow-hidden"
        onClick={() => setIsNavigating(true)}
        aria-disabled={isNavigating}
      >
        <div
          className="absolute inset-0 opacity-50"
          style={{ background: gradient }}
        />
        {/* White frosted layer to desaturate the gradient */}
        <div className="absolute inset-0 bg-card/30" />
        {/* Tall soft fade to card — fills bottom 60% to avoid a hard edge */}
        <div className="absolute inset-x-0 bottom-0 h-[72px] bg-gradient-to-t from-card via-card/80 to-transparent" />

        {/* Status Badge */}
        <div className={`absolute right-3 top-3 flex items-center gap-1.5 rounded-full border px-2 py-0.5 backdrop-blur-sm ${badge.ringClass}`}>
          <div className={`h-1.5 w-1.5 rounded-full ${badge.dotClass}`} />
          <span className={`font-mono text-[10px] font-medium tracking-wider ${badge.textClass}`}>
            {badge.label}
          </span>
        </div>
      </Link>

      {/* Card Body */}
      <div className="relative flex flex-1 flex-col px-5 pb-5 pt-0">
        {/* Avatar Icon (straddles header/body) */}
        <div
          className="-mt-7 mb-3 flex h-14 w-14 overflow-hidden items-center justify-center rounded-lg border border-border shadow-md ring-[3px] ring-card z-10"
          style={{ background: chatbot.logoUrl ? undefined : `linear-gradient(135deg, ${baseColor}22, ${baseColor}11)` }}
        >
          {chatbot.logoUrl ? (
            <img
              src={chatbot.logoUrl}
              alt={chatbot.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <Bot className="h-6 w-6" style={{ color: baseColor }} />
          )}
        </div>

        {/* Title + Subtitle */}
        <div className="mb-4">
          <Link
            href={playgroundHref}
            onClick={() => setIsNavigating(true)}
            className="block"
          >
            <h3 className="text-base font-semibold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-1">
              {chatbot.name}
            </h3>
          </Link>
          <p className="text-xs text-muted-foreground mt-0.5">
            Created {getTimeSince(chatbot.createdAt)}
          </p>
        </div>

        {/* Metrics Row */}
        <div className="mb-5 flex items-center gap-5 border-t border-border pt-3">
          <div>
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
              Conversations
            </p>
            <div className="flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="font-mono text-sm font-medium text-foreground">
                {chatbot.conversationCount ?? 0}
              </p>
            </div>
          </div>
          <div>
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
              Version
            </p>
            <p className="font-mono text-sm font-medium text-foreground">
              v{chatbot.devVersion}
              {chatbot.liveVersion > 0 && chatbot.devVersion !== chatbot.liveVersion && (
                <span className="text-amber-500 ml-1 text-[10px]">
                  (live: v{chatbot.liveVersion})
                </span>
              )}
            </p>
          </div>
          {chatbot.lastDeployedAt && (
            <div className="ml-auto text-right">
              <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                Deployed
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                {getTimeSince(chatbot.lastDeployedAt)}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-2">
          <Button
            variant="outline"
            className="flex-1 gap-1.5 text-sm"
            onClick={() => {
              setIsNavigating(true);
              router.push(`${workspacePrefix}/chatbot/${chatbot.id}/playground`);
            }}
          >
            Manage
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
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