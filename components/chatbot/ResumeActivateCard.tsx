"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Ellipsis, Bot, ArrowRight, Globe2, Loader2, MessageSquareText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { GetChatbotsResponse } from "@/types/chatbot";
import { useRouter } from "next/navigation";
import {
  getChatbotCardBrandStyles,
  getChatbotStatusClass,
  getWebsiteHostnameLabel,
} from "@/components/chatbot/chatbot-card-utils";

interface ResumeActivateCardProps {
  chatbot: GetChatbotsResponse;
  onDelete: (chatbotId: string) => void;
}

export function ResumeActivateCard({ chatbot, onDelete }: ResumeActivateCardProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const workspacePrefix = `/${chatbot.workspaceId}`;
  const resumeHref = `${workspacePrefix}/chatbot/create/setup?resume=${chatbot.id}`;
  const websiteLabel = getWebsiteHostnameLabel(chatbot.websiteUrl);
  const { baseColor, glowStyle, heroStyle, logoShellStyle } = getChatbotCardBrandStyles(chatbot.primaryColor);

  const handleActivate = () => {
    setIsNavigating(true);
    router.push(resumeHref);
  };

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-[var(--panel-radius-lg)] border border-[var(--panel-border-soft)] bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg">
      {isNavigating && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-card/60 backdrop-blur-[2px]">
          <div className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs text-muted-foreground shadow-md">
            <Loader2 className="h-4 w-4 animate-spin" />
            Opening…
          </div>
        </div>
      )}

      <div className="relative flex h-52 items-center justify-center overflow-hidden border-b border-border/60 px-6 py-8" style={heroStyle}>
        <div className="absolute -left-6 bottom-4 h-28 w-28 rounded-full blur-3xl" style={glowStyle} />
        <div className="absolute -right-4 top-4 h-24 w-24 rounded-full blur-3xl" style={glowStyle} />
        <div
          className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-[40px] border bg-card/90 p-5 shadow-xl backdrop-blur"
          style={logoShellStyle}
        >
          {chatbot.logoUrl ? (
            <img
              src={chatbot.logoUrl}
              alt={chatbot.name}
              className="h-full w-full object-contain"
            />
          ) : (
            <Bot className="h-16 w-16" style={{ color: baseColor }} />
          )}
        </div>
      </div>

      <div className="relative flex flex-1 flex-col px-5 pb-5 pt-4">
        <div className="space-y-4">
          <h3 className="line-clamp-2 text-lg font-semibold leading-tight tracking-[-0.01em] text-foreground transition-colors group-hover:text-primary">
            {chatbot.name}
          </h3>

          <div className="space-y-3 border-t border-border/60 pt-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className={getChatbotStatusClass(chatbot.status)}>{chatbot.status}</span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageSquareText className="h-4 w-4" />
                Conversations
              </span>
              <span className="text-sm font-semibold text-foreground">
                {(chatbot.conversationCount ?? 0).toLocaleString()}
              </span>
            </div>

            {websiteLabel && (
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe2 className="h-4 w-4" />
                  Company URL
                </span>
                <span className="max-w-[58%] truncate text-sm font-medium text-foreground">
                  {websiteLabel}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-auto flex items-center gap-2 border-t border-border/60 pt-4">
          <Button
            className="flex-1 justify-between gap-2 text-sm"
            disabled={isNavigating}
            onClick={handleActivate}
          >
            Resume setup
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
