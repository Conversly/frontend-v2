"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { MessageList } from "@/components/widget/helpers/message-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useChatlogsQuery, useMessagesQuery } from "@/services/activity";
import type { MessageItem } from "@/types/activity";
import { ChatLogsFilterDialog, type ChatLogsFilters } from "@/components/chatbot/activity/ChatLogsFilterDialog";
import { downloadJsonFile } from "@/lib/utils";
import { Download, Filter } from "lucide-react";

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
      setSelectedConvId(chatlogs[0].uniqueConvId);
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

  const renderedMessages = useMemo(() => {
    if (!messages) return [];
    // Map API message shape to widget Message shape
    return messages.map((m: MessageItem) => ({
      id: m.id,
      role: m.type === "user" ? "user" : "assistant",
      content: m.content,
      createdAt: m.createdAt ? new Date(m.createdAt) : undefined,
      citations: m.citations,
    }));
  }, [messages]);

  return (
    <div className="flex h-full bg-background">
      {/* Sidebar */}
      <div className="w-72 shrink-0 border-r">
        <div className="px-4 py-3 border-b">
          <h2 className="text-sm font-semibold">Chat logs</h2>
          <p className="text-xs text-muted-foreground">All conversations</p>
        </div>
        <ScrollArea className="h-[calc(100vh-60px)] px-2">
          <div className="py-2 space-y-1">
            {isLoadingChatlogs ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="px-2 py-2 rounded-md">
                  <Skeleton className="h-4 w-44 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
              ))
            ) : chatlogs && chatlogs.length > 0 ? (
              chatlogs.map((c) => {
                const isActive = selectedConvId === c.uniqueConvId;
                return (
                  <button
                    key={c.uniqueConvId}
                    onClick={() => setSelectedConvId(c.uniqueConvId)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md transition-colors",
                      "hover:bg-muted",
                      isActive && "bg-muted"
                    )}
                  >
                    <div className="line-clamp-1 text-[13px] font-medium">
                      {c.firstUserMessage || "New conversation"}
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">
                      {formatShortDateTime(c.lastActivity)}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="px-3 py-4 text-xs text-muted-foreground">
                No conversations yet.
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Chat panel */}
      <div className="flex-1 flex flex-col">
        <div className="border-b bg-background px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold">Playground</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
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

        <div className="flex-1 overflow-y-auto p-6">
          {isLoadingMessages ? (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={cn("flex", i % 2 ? "justify-end" : "justify-start")}>
                  <Skeleton className="h-6 w-64 rounded-2xl" />
                </div>
              ))}
            </div>
          ) : selectedConvId && renderedMessages.length > 0 ? (
            <MessageList messages={renderedMessages} showTimeStamps />
          ) : selectedConvId ? (
            <p className="text-sm text-muted-foreground">No messages in this conversation yet.</p>
          ) : (
            <p className="text-sm text-muted-foreground">Choose a conversation from the left.</p>
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
