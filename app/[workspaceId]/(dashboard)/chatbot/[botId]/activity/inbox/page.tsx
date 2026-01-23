"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { useAuth } from "@/store/auth";
import { useSocketStore } from "@/store/websocket";
import { useWebSocketRoom } from "@/hooks/use-websocket-room";

import {
  WebSocketEventType,
  WebSocketMessageType,
  type WebSocketInboundMessage,
  type WebSocketBroadcastEvent,
  type WebSocketCommandResponse,
  type WsChatMessagePayload,
  type WsStateUpdatePayload,
  ConnectionState,
} from "@/types/websocket";

import {
  useConversationsQuery,
  useEscalationsQuery,
  useMessagesQuery,
} from "@/services/activity";
import { closeConversation } from "@/lib/api/activity";
import type { ConversationItem, EscalationItem } from "@/types/activity";
import { useAgentInboxStore, type ChatMessage, type SenderType } from "@/store/agent-inbox";

import {
  Search,
  MessageCircle,
  MessageSquare,
  Mail,
  Globe,
  Hash,
  X,
  Send,
} from "lucide-react";
import { toast } from "sonner";

function shortId(id: string) {
  return id.length <= 10 ? id : `${id.slice(0, 6)}…${id.slice(-4)}`;
}

function formatRelative(ts: string) {
  const d = new Date(ts);
  const diff = Date.now() - d.getTime();
  const s = Math.max(0, Math.floor(diff / 1000));
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const days = Math.floor(h / 24);
  return `${days}d`;
}

function getChannelIcon(channel?: string) {
  const c = (channel || "").toUpperCase();
  switch (c) {
    case "WHATSAPP":
      return <MessageSquare className="h-3.5 w-3.5 text-green-600" />;
    case "WIDGET":
      return <MessageCircle className="h-3.5 w-3.5 text-blue-600" />;
    case "SMS":
      return <Hash className="h-3.5 w-3.5 text-purple-600" />;
    case "EMAIL":
      return <Mail className="h-3.5 w-3.5 text-orange-600" />;
    default:
      return <Globe className="h-3.5 w-3.5 text-muted-foreground" />;
  }
}

function statusBadgeVariant(status: string): "secondary" | "default" | "destructive" | "outline" {
  const s = (status || "").toUpperCase();
  if (s === "WAITING_FOR_AGENT" || s === "REQUESTED") return "secondary";
  if (s === "ASSIGNED" || s === "HUMAN_ACTIVE") return "default";
  if (s === "CANCELLED" || s === "TIMED_OUT") return "destructive";
  return "outline";
}

function conversationRoomId(conversationId: string) {
  return `conversation:${conversationId}`;
}

function isBroadcastEvent(msg: WebSocketInboundMessage): msg is WebSocketBroadcastEvent {
  return Boolean((msg as any)?.roomId && (msg as any)?.eventType);
}

function isCommandResponse(msg: WebSocketInboundMessage): msg is WebSocketCommandResponse {
  return Boolean((msg as any)?.status);
}

function normalizeSenderType(s: string): SenderType {
  const u = (s || "").toUpperCase();
  if (u === "USER") return "USER";
  if (u === "AGENT") return "AGENT";
  if (u === "ASSISTANT") return "ASSISTANT";
  return "SYSTEM";
}

function ConversationRoomSubscriber({ conversationId }: { conversationId: string }) {
  const roomId = conversationRoomId(conversationId);
  const upsertStateUpdate = useAgentInboxStore((s) => s.upsertStateUpdate);
  const appendLiveMessage = useAgentInboxStore((s) => s.appendLiveMessage);
  const handleClaimResponse = useAgentInboxStore((s) => s.handleClaimResponse);
  const upsertEscalationDelta = useAgentInboxStore((s) => s.upsertEscalationDelta);

  useWebSocketRoom<WebSocketInboundMessage>({
    roomId,
    enabled: Boolean(conversationId),
    onMessage: (msg) => {
      if (isCommandResponse(msg)) {
        handleClaimResponse(conversationId, msg);
        return;
      }

      if (!isBroadcastEvent(msg)) return;

      if (msg.eventType === WebSocketEventType.STATE_UPDATE) {
        const data = msg.data as WsStateUpdatePayload;
        if (!data?.conversationId) return;
        upsertStateUpdate({
          conversationId: data.conversationId,
          escalationId: data.escalationId,
          status: data.status,
          requestedAt: data.requestedAt,
          reason: data.reason ?? null,
          assignedAgentUserId: data.assignedAgentUserId ?? null,
        });

        if (data.escalationId) {
          upsertEscalationDelta({
            escalationId: data.escalationId,
            conversationId: data.conversationId,
            status: data.status as any,
            agentUserId: data.assignedAgentUserId ?? null,
          } as any);
        }
        return;
      }

      if (msg.eventType === WebSocketEventType.CHAT_MESSAGE) {
        const data = msg.data as WsChatMessagePayload;
        if (!data?.conversationId) return;
        const sentAt =
          typeof data.sentAtUnix === "number" ? new Date(data.sentAtUnix * 1000) : new Date();

        const m: ChatMessage = {
          id: data.messageId || "",
          conversationId: data.conversationId,
          senderType: normalizeSenderType(data.senderType),
          text: data.text || "",
          sentAt,
        };
        appendLiveMessage(m);
        return;
      }
    },
  });

  return null;
}

function OpenConversationSubscribers() {
  const openConversationIds = useAgentInboxStore((s) => s.openConversationIds);
  return (
    <>
      {openConversationIds.map((id) => (
        <ConversationRoomSubscriber key={id} conversationId={id} />
      ))}
    </>
  );
}

export default function InboxPage() {
  const routeParams = useParams<{ workspaceId: string; botId: string }>();
  const workspaceId = Array.isArray(routeParams.workspaceId) ? routeParams.workspaceId[0] : routeParams.workspaceId;
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;

  const { user } = useAuth();
  const agentUserId = user?.id || "";

  const queryClient = useQueryClient();

  const connectionState = useSocketStore((s) => s.connectionState);
  const sendMessage = useSocketStore((s) => s.sendMessage);

  const hydrateSnapshots = useAgentInboxStore((s) => s.hydrateSnapshots);
  const openConversation = useAgentInboxStore((s) => s.openConversation);
  const closeConversationTab = useAgentInboxStore((s) => s.closeConversationTab);
  const setActiveConversation = useAgentInboxStore((s) => s.setActiveConversation);
  const clearUnread = useAgentInboxStore((s) => s.clearUnread);

  const openConversationIds = useAgentInboxStore((s) => s.openConversationIds);
  const activeConversationId = useAgentInboxStore((s) => s.activeConversationId);
  const unreadCountByConversationId = useAgentInboxStore((s) => s.unreadCountByConversationId);
  const messagesByConversationId = useAgentInboxStore((s) => s.messagesByConversationId);
  const stateByConversationId = useAgentInboxStore((s) => s.stateByConversationId);
  const escalationsById = useAgentInboxStore((s) => s.escalationsById);
  const escalationIdByConversationId = useAgentInboxStore((s) => s.escalationIdByConversationId);
  const conversationsById = useAgentInboxStore((s) => s.conversationsById);
  const lastClaimErrorByConversationId = useAgentInboxStore((s) => s.lastClaimErrorByConversationId);
  const setHistoryFromApi = useAgentInboxStore((s) => s.setHistoryFromApi);
  const appendLiveMessage = useAgentInboxStore((s) => s.appendLiveMessage);

  const [activeTab, setActiveTab] = useState<"all" | "waiting" | "mine">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: conversations, isLoading: isLoadingConversations } = useConversationsQuery(botId);
  const { data: escalations, isLoading: isLoadingEscalations } = useEscalationsQuery(botId);

  useEffect(() => {
    if (conversations || escalations) {
      hydrateSnapshots({ conversations, escalations });
    }
  }, [conversations, escalations, hydrateSnapshots]);

  const notificationsRoomId = useMemo(() => {
    if (!workspaceId || !botId) return "";
    return `agents:notifications:${workspaceId}:${botId}`;
  }, [workspaceId, botId]);

  useWebSocketRoom<WebSocketInboundMessage>({
    roomId: notificationsRoomId,
    enabled: Boolean(notificationsRoomId),
    onMessage: (msg) => {
      if (!isBroadcastEvent(msg)) return;

      const eventType = msg.eventType;
      const data = (msg as any).data ?? {};

      // Minimal handling: treat all notifications as escalation deltas where possible.
      if (
        eventType === WebSocketEventType.NEW_ESCALATION ||
        eventType === WebSocketEventType.CHAT_CLAIMED ||
        eventType === WebSocketEventType.ESCALATION_UPDATED
      ) {
        const escalationId = data.escalationId || data.id;
        const conversationId = data.conversationId;
        if (escalationId) {
          useAgentInboxStore.getState().upsertEscalationDelta({
            escalationId,
            conversationId,
            status: data.status,
            requestedAt: data.requestedAt,
            acceptedAt: data.acceptedAt,
            resolvedAt: data.resolvedAt,
            reason: data.reason ?? null,
            firstNotifiedAt: data.firstNotifiedAt,
            lastNotifiedAt: data.lastNotifiedAt,
            agentUserId: data.assignedAgentUserId ?? data.agentUserId ?? null,
            assignedAt: data.assignedAt,
          } as any);
        }
        return;
      }
    },
  });

  const inboxItems = useMemo(() => {
    const list = Object.values(escalationsById) as EscalationItem[];
    const filtered = list.filter((e) => {
      const status = (e.status || "").toUpperCase();
      const isWaiting = status === "WAITING_FOR_AGENT" || status === "REQUESTED";
      const isMine = Boolean(agentUserId) && e.agentUserId === agentUserId;

      if (activeTab === "waiting" && !isWaiting) return false;
      if (activeTab === "mine" && !isMine) return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!e.conversationId.toLowerCase().includes(q) && !(e.reason || "").toLowerCase().includes(q)) {
          return false;
        }
      }

      return true;
    });

    // Sort: waiting first, then by requestedAt desc.
    filtered.sort((a, b) => {
      const aWaiting = (a.status || "").toUpperCase() === "WAITING_FOR_AGENT" ? 0 : 1;
      const bWaiting = (b.status || "").toUpperCase() === "WAITING_FOR_AGENT" ? 0 : 1;
      if (aWaiting !== bWaiting) return aWaiting - bWaiting;
      return new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime();
    });

    return filtered;
  }, [escalationsById, activeTab, searchQuery, agentUserId]);

  const activeEscalationId = activeConversationId ? escalationIdByConversationId[activeConversationId] : undefined;
  const activeEscalation = activeEscalationId ? escalationsById[activeEscalationId] : undefined;
  const activeConversation = activeConversationId ? conversationsById[activeConversationId] : undefined;
  const activeState = activeConversationId ? stateByConversationId[activeConversationId] : undefined;

  const canSendInActiveConversation = useMemo(() => {
    if (!activeConversationId) return false;
    // Allow sending only when the escalation is assigned to me (or state says assigned to me).
    const assigned = activeEscalation?.agentUserId ?? activeState?.assignedAgentUserId ?? null;
    return Boolean(agentUserId) && assigned === agentUserId;
  }, [activeConversationId, activeEscalation?.agentUserId, activeState?.assignedAgentUserId, agentUserId]);

  const { data: activeHistory, isLoading: isLoadingHistory } = useMessagesQuery(
    botId,
    activeConversationId || "",
  );

  useEffect(() => {
    if (!activeConversationId) return;
    if (!activeHistory) return;
    setHistoryFromApi(activeConversationId, activeHistory);
  }, [activeConversationId, activeHistory, setHistoryFromApi]);

  const activeMessages = activeConversationId
    ? messagesByConversationId[activeConversationId] ?? []
    : [];

  const [draft, setDraft] = useState("");

  const onSelectRow = useCallback(
    (conversationId: string) => {
      openConversation(conversationId);
      setActiveConversation(conversationId);
      clearUnread(conversationId);
    },
    [openConversation, setActiveConversation, clearUnread],
  );

  const onClaim = useCallback(
    (e: EscalationItem) => {
      if (!agentUserId) {
        toast.error("Missing agent user id");
        return;
      }
      const room = conversationRoomId(e.conversationId);
      openConversation(e.conversationId);
      setActiveConversation(e.conversationId);

      sendMessage({
        action: WebSocketMessageType.CLAIM,
        room,
        data: {
          conversationId: e.conversationId,
          escalationId: e.escalationId,
          agentUserId,
        },
      });
    },
    [agentUserId, openConversation, sendMessage, setActiveConversation],
  );

  const onSend = useCallback(() => {
    if (!activeConversationId) return;
    if (!draft.trim()) return;

    const room = conversationRoomId(activeConversationId);
    const text = draft.trim();
    setDraft("");

    // Optimistic append for snappy UI; server will broadcast authoritative message too.
    appendLiveMessage({
      id: "",
      conversationId: activeConversationId,
      senderType: "AGENT",
      text,
      sentAt: new Date(),
    }, { bumpUnread: false });

    sendMessage({
      action: WebSocketMessageType.MESSAGE,
      room,
      data: {
        conversationId: activeConversationId,
        senderType: "AGENT",
        text,
      },
    });
  }, [activeConversationId, appendLiveMessage, draft, sendMessage]);

  const onCloseChat = useCallback(async () => {
    if (!activeConversationId) return;
    try {
      await closeConversation(activeConversationId);
      toast.success("Conversation closed");
      queryClient.invalidateQueries();
      closeConversationTab(activeConversationId);
    } catch (err: any) {
      toast.error(err?.message || "Failed to close conversation");
    }
  }, [activeConversationId, closeConversationTab, queryClient]);

  const isLoadingInbox = isLoadingConversations || isLoadingEscalations;

  return (
    <div className="flex h-full bg-background">
      <OpenConversationSubscribers />

      {/* Left: Inbox */}
      <div className="w-96 shrink-0 border-r flex flex-col bg-background/50">
        <div className="px-4 py-3 border-b space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="type-subtitle font-semibold text-foreground">Inbox</h2>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {inboxItems.length}
            </span>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search conversation or reason..."
              className="pl-8 h-8 text-xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-7 p-0.5">
              <TabsTrigger value="all" className="text-xs h-6 px-1">
                All
              </TabsTrigger>
              <TabsTrigger value="waiting" className="text-xs h-6 px-1">
                Waiting
              </TabsTrigger>
              <TabsTrigger value="mine" className="text-xs h-6 px-1">
                Mine
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              WS:{" "}
              <span className={cn(connectionState === ConnectionState.CONNECTED ? "text-green-600" : "text-muted-foreground")}>
                {connectionState}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs"
              onClick={() => queryClient.invalidateQueries()}
            >
              Refresh
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-3 space-y-1">
            {isLoadingInbox ? (
              Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="px-4 py-3 rounded-md space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))
            ) : inboxItems.length > 0 ? (
              inboxItems.map((e) => {
                const conversation = conversationsById[e.conversationId] as ConversationItem | undefined;
                const isActive = activeConversationId === e.conversationId;
                const isMine = Boolean(agentUserId) && e.agentUserId === agentUserId;
                const isAssigned = Boolean(e.agentUserId);
                const waitingForAgent =
                  (e.status || "").toUpperCase() === "WAITING_FOR_AGENT" ||
                  (e.status || "").toUpperCase() === "REQUESTED";
                const canClaim = waitingForAgent && !isAssigned;
                const unread = unreadCountByConversationId[e.conversationId] ?? 0;

                return (
                  <button
                    key={e.escalationId}
                    onClick={() => onSelectRow(e.conversationId)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-lg border border-transparent transition-all group",
                      "hover:bg-muted/50 hover:border-border/50",
                      isActive ? "bg-muted border-border shadow-sm" : "bg-transparent",
                    )}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        {getChannelIcon(conversation?.channel)}
                        <span
                          className={cn(
                            "text-xs font-semibold px-1.5 py-0.5 rounded uppercase tracking-wide",
                            isActive
                              ? "bg-background text-foreground"
                              : "bg-muted text-muted-foreground group-hover:bg-background",
                          )}
                        >
                          {conversation?.channel || "WIDGET"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {unread > 0 && (
                          <span className="text-[10px] bg-primary text-primary-foreground rounded-full px-2 py-0.5 tabular-nums">
                            {unread}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {formatRelative(e.requestedAt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">
                          <span className="text-muted-foreground">Conv:</span> {shortId(e.conversationId)}
                        </div>
                        <div className="text-xs text-muted-foreground line-clamp-1">
                          {e.reason ? e.reason : "—"}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <Badge variant={statusBadgeVariant(String(e.status))} className="text-[10px]">
                          {e.status}
                        </Badge>
                        <Button
                          variant={isMine ? "default" : "outline"}
                          size="sm"
                          className="h-7 text-xs"
                          disabled={!canClaim}
                          onClick={(evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            onClaim(e);
                          }}
                        >
                          {isMine ? "Assigned" : canClaim ? "Claim" : isAssigned ? "Claimed" : "Claim"}
                        </Button>
                      </div>
                    </div>

                    {!isMine && isAssigned && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        Claimed by <code className="text-xs">{shortId(e.agentUserId || "")}</code>
                      </div>
                    )}

                    {lastClaimErrorByConversationId[e.conversationId] && (
                      <div className="mt-2 text-xs text-destructive">
                        Claim failed: {lastClaimErrorByConversationId[e.conversationId]}
                      </div>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center px-4">
                <p className="text-sm font-medium">No escalations</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Waiting chats will appear here in real-time.
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Right: Chat */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="border-b bg-background px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h1 className="type-section-title tracking-tight">Live chat</h1>
              <p className="type-body-muted mt-0.5 truncate">
                {activeConversationId
                  ? `Conversation • ${activeConversationId}`
                  : "Select an escalation from the inbox"}
              </p>
              {activeEscalation && (
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant={statusBadgeVariant(String(activeEscalation.status))}>
                    {activeEscalation.status}
                  </Badge>
                  {activeState?.status && (
                    <Badge variant="outline" className="text-xs">
                      state: {activeState.status}
                    </Badge>
                  )}
                  {activeEscalation.reason && (
                    <span className="text-xs text-muted-foreground truncate">
                      {activeEscalation.reason}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {activeConversationId && (
                <>
                  <Button variant="outline" size="sm" onClick={onCloseChat}>
                    Close chat
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => closeConversationTab(activeConversationId)}
                    aria-label="Close tab"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Tabs for open chats */}
          {openConversationIds.length > 0 && (
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {openConversationIds.map((id) => {
                const unread = unreadCountByConversationId[id] ?? 0;
                const isActive = id === activeConversationId;
                return (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveConversation(id);
                      clearUnread(id);
                    }}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs shrink-0",
                      isActive ? "bg-muted border-border" : "bg-background hover:bg-muted/40 border-border/60",
                    )}
                  >
                    <span className="font-medium">{shortId(id)}</span>
                    {unread > 0 && (
                      <span className="text-[10px] bg-primary text-primary-foreground rounded-full px-2 py-0.5 tabular-nums">
                        {unread}
                      </span>
                    )}
                    <span
                      className="opacity-60 hover:opacity-100"
                      onClick={(evt) => {
                        evt.preventDefault();
                        evt.stopPropagation();
                        closeConversationTab(id);
                      }}
                    >
                      <X className="h-3.5 w-3.5" />
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-4">
              {!activeConversationId ? (
                <p className="type-body-muted">Choose an escalation from the left.</p>
              ) : isLoadingHistory ? (
                <div className="space-y-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className={cn("flex", i % 2 ? "justify-end" : "justify-start")}>
                      <Skeleton className="h-6 w-80 rounded-2xl" />
                    </div>
                  ))}
                </div>
              ) : activeMessages.length === 0 ? (
                <p className="type-body-muted">No messages yet.</p>
              ) : (
                activeMessages.map((m) => {
                  const isUser = m.senderType === "USER";
                  const isAgent = m.senderType === "AGENT";
                  const isAssistant = m.senderType === "ASSISTANT";
                  const isSystem = m.senderType === "SYSTEM";

                  return (
                    <div
                      key={m.id}
                      className={cn(
                        "flex",
                        isUser ? "justify-start" : isAgent ? "justify-end" : "justify-center",
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                          isUser && "bg-card border rounded-tl-sm",
                          isAgent && "bg-primary text-primary-foreground rounded-tr-sm",
                          isAssistant && "bg-muted text-foreground border",
                          isSystem && "bg-background text-muted-foreground border border-dashed",
                        )}
                      >
                        <div className="whitespace-pre-wrap break-words">{m.text}</div>
                        <div
                          className={cn(
                            "mt-1 text-[10px] opacity-70 tabular-nums",
                            isAgent ? "text-primary-foreground/80 text-right" : "text-muted-foreground",
                          )}
                        >
                          {m.senderType} •{" "}
                          {m.sentAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </div>

        <div className="border-t bg-background px-6 py-4">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Input
                placeholder={
                  activeConversationId
                    ? canSendInActiveConversation
                      ? "Type a message…"
                      : "Claim this chat to reply"
                    : "Select a conversation"
                }
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                disabled={!activeConversationId || !canSendInActiveConversation}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSend();
                  }
                }}
              />
            </div>
            <Button
              className="gap-2"
              disabled={
                !activeConversationId ||
                !canSendInActiveConversation ||
                !draft.trim() ||
                connectionState !== ConnectionState.CONNECTED
              }
              onClick={onSend}
            >
              <Send className="h-4 w-4" />
              Send
            </Button>
          </div>
          {activeConversation && (
            <div className="mt-2 text-xs text-muted-foreground">
              Channel: <span className="font-medium">{activeConversation.channel}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

