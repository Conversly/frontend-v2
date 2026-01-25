"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
// MessageList component missing

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useChatlogsQuery, useMessagesQuery } from "@/services/activity";
import type { ConversationMessageItem } from "@/types/activity";
import { ChatLogsFilterDialog, type ChatLogsFilters } from "@/components/chatbot/activity/ChatLogsFilterDialog";
import { downloadJsonFile } from "@/lib/utils";
import {
  ACTIVITY_CHAT_LIST_SIDEBAR_CLASSNAME,
  ACTIVITY_PAGE_ROOT_CLASSNAME,
} from "@/components/chatbot/activity/layout-constants";
import { Download, Filter, Search, MessageCircle, MessageSquare, Mail, Globe, Hash } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function ChatLogsPage() {
  const routeParams = useParams<{ botId: string }>();
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;

  if (!botId) {
    return null;
  }

  const { data: chatlogs, isLoading: isLoadingChatlogs } = useChatlogsQuery(botId);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);

  // Select first conversation by default once chatlogs load
  useEffect(() => {
    if (!selectedConvId && chatlogs && chatlogs.length > 0) {
      setSelectedConvId(chatlogs[0].conversationId);
    }
  }, [chatlogs, selectedConvId]);

  const {
    data: messages,
    isLoading: isLoadingMessages,
  } = useMessagesQuery(botId, selectedConvId || "");

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<ChatLogsFilters>({
    fromDate: null,
    toDate: null,
    confidence: null,
    source: null,
    feedback: null,
  });

  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChatlogs = useMemo(() => {
    if (!chatlogs) return [];

    return chatlogs.filter((log) => {
      // 1. Filter by Channel
      if (activeTab !== "all") {
        const logChannel = (log.channel || "WIDGET").toUpperCase();
        if (activeTab === "whatsapp" && logChannel !== "WHATSAPP") return false;
        if (activeTab === "widget" && logChannel !== "WIDGET") return false;
        // 'other' could catch everything else
        if (activeTab === "other" && (logChannel === "WHATSAPP" || logChannel === "WIDGET")) return false;
      }

      // 2. Filter by Search Query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return log.conversationId.toLowerCase().includes(query);
      }

      return true;
    });
  }, [chatlogs, activeTab, searchQuery]);

  const statusDot = (status?: string) => {
    const s = String(status || "").toUpperCase();
    if (!s) return "bg-muted-foreground/30";
    if (s.includes("WAIT") || s.includes("PENDING")) return "bg-blue-500";
    if (s.includes("ACTIVE") || s.includes("OPEN") || s.includes("IN_PROGRESS")) return "bg-green-500";
    if (s.includes("RESOLVED") || s.includes("CLOSED") || s.includes("DONE")) return "bg-muted-foreground/50";
    return "bg-muted-foreground/40";
  };

  // Helper to get channel icon
  const getChannelIcon = (channel?: string) => {
    const c = (channel || "").toUpperCase();
    switch (c) {
      case "WHATSAPP": return <MessageSquare className="h-3.5 w-3.5 text-green-600" />;
      case "WIDGET": return <MessageCircle className="h-3.5 w-3.5 text-blue-600" />;
      case "SMS": return <Hash className="h-3.5 w-3.5 text-purple-600" />;
      case "EMAIL": return <Mail className="h-3.5 w-3.5 text-orange-600" />;
      default: return <Globe className="h-3.5 w-3.5 text-muted-foreground" />;
    }
  };

  const renderedMessages = useMemo(() => {
    if (!messages) return [];
    // Map API message shape to widget Message shape
    return messages.map((m: ConversationMessageItem) => ({
      id: m.id,
      role: m.type === "user" ? "user" : "assistant",
      content: m.content,
      createdAt: m.createdAt ? new Date(m.createdAt) : undefined,
      citations: m.citations,
    }));
  }, [messages]);

  return (
    <div className={ACTIVITY_PAGE_ROOT_CLASSNAME}>
      {/* Sidebar */}
      <div className={ACTIVITY_CHAT_LIST_SIDEBAR_CLASSNAME}>
        <div className="px-4 py-3 border-b space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="type-subtitle font-semibold text-foreground">Chat logs</h2>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {filteredChatlogs.length}
            </span>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search ID or message..."
              className="pl-8 h-8 text-xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-7 p-0.5">
              <TabsTrigger value="all" className="text-xs h-6 px-1">All</TabsTrigger>
              <TabsTrigger value="widget" className="text-xs h-6 px-1">Widget</TabsTrigger>
              <TabsTrigger value="whatsapp" className="text-xs h-6 px-1">WA</TabsTrigger>
              <TabsTrigger value="other" className="text-xs h-6 px-1">Other</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scroll-smooth">
          <div className="min-w-0 divide-y">
            {isLoadingChatlogs ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-4">
                  <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-14" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                </div>
              ))
            ) : filteredChatlogs.length > 0 ? (
              filteredChatlogs.map((c) => {
                const isActive = selectedConvId === c.conversationId;
                const ts = c.lastMessageAt ?? c.updatedAt ?? c.createdAt;
                const channelLabel = String(c.channel || "WIDGET").toUpperCase();
                const preview = `Status: ${String(c.status || "—")}`;
                return (
                  <button
                    key={c.conversationId}
                    onClick={() => setSelectedConvId(c.conversationId)}
                    className={cn(
                      "group/item relative flex w-full min-w-0 cursor-pointer items-center gap-3 px-4 py-4 text-left transition-colors",
                      "hover:bg-muted",
                      isActive ? "bg-muted" : "bg-transparent",
                    )}
                  >
                    {/* Avatar (channel) + status dot */}
                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted/60">
                      <span className="scale-[1.05]" title={channelLabel}>
                        {getChannelIcon(c.channel)}
                      </span>
                      <span
                        className={cn(
                          "absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-background",
                          statusDot(c.status),
                        )}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Main content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex min-w-0 items-center justify-between gap-3">
                        <div className="min-w-0 flex items-center gap-2">
                          <span className="truncate text-sm font-medium">
                            <span className="text-muted-foreground">#</span>
                            {c.conversationId}
                          </span>
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                              isActive ? "bg-background text-foreground" : "bg-muted text-muted-foreground group-hover/item:bg-background",
                            )}
                          >
                            {channelLabel}
                          </span>
                        </div>

                        <span className="text-muted-foreground flex-none text-xs tabular-nums">
                          {formatShortDateTime(ts)}
                        </span>
                      </div>

                      <div className="mt-0.5 flex min-w-0 items-center gap-2">
                        <span className="min-w-0 truncate text-sm text-muted-foreground">{preview}</span>
                      </div>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center px-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mb-3">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium">No results found</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Try adjusting your filters or search query
                </p>
                <Button
                  variant="link"
                  size="sm"
                  className="mt-2 h-auto p-0 text-xs"
                  onClick={() => {
                    setActiveTab("all");
                    setSearchQuery("");
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat panel */}
      <div className="flex-1 flex flex-col">
        <div className="border-b bg-background px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="type-section-title tracking-tight">Conversation</h1>
              <p className="type-body-muted mt-0.5">
                {selectedConvId ? `Conversation • ${selectedConvId}` : "Select a conversation"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFilterOpen(true)}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                disabled={!selectedConvId || renderedMessages.length === 0}
                onClick={() => {
                  if (!selectedConvId) return;
                  const payload = {
                    conversationId: selectedConvId,
                    chatbotId: botId,
                    exportedAt: new Date().toISOString(),
                    filtersApplied: filters,
                    messages: renderedMessages,
                  };
                  downloadJsonFile(`chat-${botId}-${selectedConvId}.json`, payload);
                }}
              >
                <Download className="h-4 w-4" />
                Download JSON
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 chat-logs-container">
          {isLoadingMessages ? (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={cn("flex", i % 2 ? "justify-end" : "justify-start")}>
                  <Skeleton className="h-6 w-64 rounded-2xl" />
                </div>
              ))}
            </div>
          ) : selectedConvId && renderedMessages.length > 0 ? (
            <div className="p-4 text-center text-muted-foreground">Message History Unavailable</div>
          ) : selectedConvId ? (
            <p className="type-body-muted">No messages in this conversation yet.</p>
          ) : (
            <p className="type-body-muted">Choose a conversation from the left.</p>
          )}
        </div>
      </div>

      <ChatLogsFilterDialog
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        value={filters}
        onChange={setFilters}
        onClear={() =>
          setFilters({
            fromDate: null,
            toDate: null,
            confidence: null,
            source: null,
            feedback: null,
          })
        }
      />
    </div>
  );
}

function formatShortDateTime(dateLike: Date | string) {
  const d = typeof dateLike === "string" ? new Date(dateLike) : dateLike;
  try {
    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}
