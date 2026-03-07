"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

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
  useEscalationsQuery,
  useMessagesQuery,
} from "@/services/activity";
import {
  useResolveEscalation,
  useCloseEscalation,
  useTransferEscalation,
  useConvertToTicket,
} from "@/services/escalate";
import { closeConversation, markEscalationRead } from "@/lib/api/activity";
import type { EscalationItem } from "@/types/activity";
import type { TicketPriority } from "@/types/escalate";
import { useAgentInboxStore, type ChatMessage, type SenderType } from "@/store/agent-inbox";

import { toast } from "sonner";

// New specialized components
import { SupportSidebar } from "../../../../../../../components/inbox/support-sidebar";
import { EscalationsList } from "../../../../../../../components/inbox/escalations-list";
import { ChatWindow } from "../../../../../../../components/inbox/chat-window";
import { EscalationDetails } from "../../../../../../../components/inbox/escalation-details";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";

function normalizeSenderType(s: string): SenderType {
  const u = (s || "").toUpperCase();
  if (u === "USER") return "USER";
  if (u === "AGENT") return "AGENT";
  if (u === "ASSISTANT") return "ASSISTANT";
  return "SYSTEM";
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
        const assignedAgentUserId =
          data.assignedAgentUserId ?? ((data as any).agentUserId as string | null | undefined) ?? null;
        const assignedAgentDisplayName =
          data.assignedAgentDisplayName ??
          ((data as any).assignedAgentDisplayName as string | null | undefined) ??
          ((data as any).agentDisplayName as string | null | undefined) ??
          null;
        const assignedAgentAvatarUrl =
          data.assignedAgentAvatarUrl ??
          ((data as any).assignedAgentAvatarUrl as string | null | undefined) ??
          ((data as any).agentAvatarUrl as string | null | undefined) ??
          null;
        upsertStateUpdate({
          conversationId: data.conversationId,
          escalationId: data.escalationId,
          status: data.status,
          requestedAt: data.requestedAt,
          reason: data.reason ?? null,
          assignedAgentUserId,
          assignedAgentDisplayName,
          assignedAgentAvatarUrl,
        });

        if (data.escalationId) {
          upsertEscalationDelta({
            escalationId: data.escalationId,
            conversationId: data.conversationId,
            status: data.status as any,
            agentUserId: assignedAgentUserId,
            agentDisplayName: assignedAgentDisplayName,
            agentAvatarUrl: assignedAgentAvatarUrl,
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
          id: (data as any).messageId || "",
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
  const setUnreadCountsFromInbox = useAgentInboxStore((s) => s.setUnreadCountsFromInbox);
  const incrementUnread = useAgentInboxStore((s) => s.incrementUnread);
  const upsertEscalationDelta = useAgentInboxStore((s) => s.upsertEscalationDelta);
  const upsertStateUpdate = useAgentInboxStore((s) => s.upsertStateUpdate);

  const activeQueue = useAgentInboxStore((s) => s.activeQueue);
  const activeConversationId = useAgentInboxStore((s) => s.activeConversationId);
  const escalationsById = useAgentInboxStore((s) => s.escalationsById);
  const escalationIdByConversationId = useAgentInboxStore((s) => s.escalationIdByConversationId);
  const setHistoryFromApi = useAgentInboxStore((s) => s.setHistoryFromApi);
  const appendLiveMessage = useAgentInboxStore((s) => s.appendLiveMessage);

  const [searchQuery, setSearchQuery] = useState("");

  // Escalate mutation hooks
  const resolveEscalationMutation = useResolveEscalation();
  const closeEscalationMutation = useCloseEscalation();
  const transferEscalationMutation = useTransferEscalation();
  const convertToTicketMutation = useConvertToTicket();

  // Data fetching
  const { data: escalationsAll, isLoading: isLoadingEscalationsAll } = useEscalationsQuery(botId, {
    mine: false,
    limit: 200,
  });
  const {
    data: myEscalations,
    refetch: refetchMyEscalations,
    isLoading: isLoadingMyEscalations,
  } = useEscalationsQuery(botId, { mine: true, limit: 200 });

  useEffect(() => {
    if (escalationsAll) hydrateSnapshots({ escalations: escalationsAll });
  }, [escalationsAll, hydrateSnapshots]);

  useEffect(() => {
    if (!myEscalations) return;
    hydrateSnapshots({ escalations: myEscalations });
    setUnreadCountsFromInbox(
      myEscalations.map((e) => ({
        conversationId: e.conversationId,
        unreadCount: e.unreadCount ?? 0,
      })),
    );
  }, [hydrateSnapshots, myEscalations, setUnreadCountsFromInbox]);

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

      if (eventType === "USER_MESSAGE" || eventType === "UNREAD_INCREMENT") {
        const conversationId = data.conversationId;
        const escalationId = data.escalationId;
        const isMine =
          Boolean(agentUserId) &&
          ((typeof escalationId === "string" && escalationId && escalationsById[escalationId]?.agentUserId === agentUserId) ||
            (typeof conversationId === "string" &&
              conversationId &&
              escalationIdByConversationId[conversationId] &&
              escalationsById[escalationIdByConversationId[conversationId]]?.agentUserId === agentUserId));

        if (conversationId && conversationId !== activeConversationId && isMine) {
          incrementUnread(conversationId);
        }
        return;
      }

      if (eventType === "UNREAD_RESET") {
        const conversationId = data.conversationId;
        if (conversationId) clearUnread(conversationId);
        return;
      }

      if (
        eventType === WebSocketEventType.NEW_ESCALATION ||
        eventType === WebSocketEventType.CHAT_CLAIMED ||
        eventType === WebSocketEventType.ESCALATION_UPDATED
      ) {
        const escalationId = data.escalationId || data.id;
        const conversationId = data.conversationId;
        if (escalationId) {
          upsertEscalationDelta({
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
            agentDisplayName: data.assignedAgentDisplayName ?? data.agentDisplayName ?? null,
            agentAvatarUrl: data.assignedAgentAvatarUrl ?? data.agentAvatarUrl ?? null,
            assignedAt: data.assignedAt,
          } as any);
        }
        return;
      }
    },
  });

  const lastConnRef = useRef(connectionState);
  useEffect(() => {
    const prev = lastConnRef.current;
    lastConnRef.current = connectionState;
    if (connectionState === ConnectionState.CONNECTED && prev !== ConnectionState.CONNECTED) {
      refetchMyEscalations();
    }
  }, [connectionState, refetchMyEscalations]);

  const markConversationRead = useCallback(
    async (conversationId: string) => {
      const escalationId = escalationIdByConversationId[conversationId];
      if (!escalationId) return;
      try {
        await markEscalationRead(escalationId);
      } catch {
        await refetchMyEscalations();
      }
    },
    [escalationIdByConversationId, refetchMyEscalations],
  );

  // Compute stats for Sidebars
  const counts = useMemo(() => {
    let unassigned = 0;
    let mine = 0;
    let userWaiting = 0;
    let waitingForUser = 0;
    let resolved = 0;
    let allCount = 0;

    Object.values(escalationsById).forEach((e) => {
      allCount++;
      const status = (e.status || "").toUpperCase();

      if (status === "WAITING_FOR_AGENT" || status === "REQUESTED") {
        userWaiting++;
        if (!e.agentUserId) unassigned++;
      }
      if (status === "ASSIGNED" || status === "HUMAN_ACTIVE") {
        if (agentUserId && e.agentUserId === agentUserId) mine++;
        // Mocking waiting for user state logic until fully supported in schema
        if (e.reason?.includes("waiting for user")) waitingForUser++;
      }
      if (status === "RESOLVED") resolved++;
    });

    return { userWaiting, unassigned, mine, waitingForUser, resolved, all: allCount };
  }, [escalationsById, agentUserId]);

  const inboxItems = useMemo(() => {
    // Source list is server-driven + local merged
    const list = Object.values(escalationsById);
    const filtered = list.filter((e) => {
      const status = (e.status || "").toUpperCase();
      const isWaiting = status === "WAITING_FOR_AGENT" || status === "REQUESTED";
      const isClosed = status === "CANCELLED" || status === "TIMED_OUT" || status === "RESOLVED";
      const isMine = e.agentUserId === agentUserId;

      if (activeQueue === "unassigned") {
        if (!isWaiting || e.agentUserId) return false;
      } else if (activeQueue === "mine") {
        if (!isMine || isClosed) return false;
      } else if (activeQueue === "user-waiting") {
        if (!isWaiting) return false;
      } else if (activeQueue === "resolved") {
        if (status !== "RESOLVED") return false;
      } else if (activeQueue === "all") {
        // Show all
      } else {
        // Fallback default hide closed unless in specific queue
        if (isClosed) return false;
      }

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const msg = String(e.lastUserMessage || "").toLowerCase();
        if (
          !msg.includes(q) &&
          !e.conversationId.toLowerCase().includes(q) &&
          !(e.reason || "").toLowerCase().includes(q)
        ) {
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
  }, [activeQueue, agentUserId, escalationsById, searchQuery]);

  const { data: activeHistory, isLoading: isLoadingHistory } = useMessagesQuery(
    botId,
    activeConversationId || "",
  );

  useEffect(() => {
    if (!activeConversationId) return;
    if (!activeHistory) return;
    setHistoryFromApi(activeConversationId, activeHistory);
  }, [activeConversationId, activeHistory, setHistoryFromApi]);

  const onSelectRow = useCallback(
    (conversationId: string) => {
      openConversation(conversationId);
      setActiveConversation(conversationId);
      clearUnread(conversationId);
      void markConversationRead(conversationId);
    },
    [openConversation, setActiveConversation, clearUnread, markConversationRead],
  );

  const onClaim = useCallback(
    (e?: EscalationItem) => {
      if (!agentUserId) return toast.error("Missing agent user id");
      const targetConversationId = e ? e.conversationId : activeConversationId;
      if (!targetConversationId) return;

      const escalationId = e ? e.escalationId : escalationIdByConversationId[targetConversationId];
      if (!escalationId) return toast.error("Missing escalation id");

      const room = conversationRoomId(targetConversationId);
      openConversation(targetConversationId);
      setActiveConversation(targetConversationId);
      void markConversationRead(targetConversationId);

      sendMessage({
        action: WebSocketMessageType.CLAIM,
        room,
        data: {
          conversationId: targetConversationId,
          escalationId,
          agentUserId,
        },
      });
      toast.success("Claiming chat...");
    },
    [activeConversationId, agentUserId, escalationIdByConversationId, markConversationRead, openConversation, sendMessage, setActiveConversation],
  );

  const onSend = useCallback((text: string) => {
    if (!activeConversationId || !text.trim()) return;
    const room = conversationRoomId(activeConversationId);

    appendLiveMessage({
      id: "",
      conversationId: activeConversationId,
      senderType: "AGENT",
      text: text.trim(),
      sentAt: new Date(),
    }, { bumpUnread: false });

    sendMessage({
      action: WebSocketMessageType.MESSAGE,
      room,
      data: {
        conversationId: activeConversationId,
        senderType: "AGENT",
        text: text.trim(),
      },
    });
  }, [activeConversationId, appendLiveMessage, sendMessage]);

  const onResolve = useCallback(async () => {
    if (!activeConversationId) return;
    const escalationId = escalationIdByConversationId[activeConversationId];
    if (!escalationId) {
      toast.error("Missing escalation id");
      return;
    }
    try {
      await resolveEscalationMutation.mutateAsync({ escalationId });
      upsertEscalationDelta({
        escalationId,
        conversationId: activeConversationId,
        status: "RESOLVED" as any,
        resolvedAt: new Date().toISOString(),
      } as any);
      upsertStateUpdate({
        conversationId: activeConversationId,
        escalationId,
        status: "RESOLVED",
      });
      toast.success("Conversation resolved");
      queryClient.invalidateQueries();
      closeConversationTab(activeConversationId);
    } catch (err: any) {
      toast.error(err?.message || "Failed to resolve conversation");
    }
  }, [activeConversationId, closeConversationTab, escalationIdByConversationId, queryClient, resolveEscalationMutation, upsertEscalationDelta, upsertStateUpdate]);

  const onClose = useCallback(async () => {
    if (!activeConversationId) return;
    try {
      // Use the activity close endpoint to mark conversation as CLOSED
      await closeConversation(activeConversationId);
      const escalationId = escalationIdByConversationId[activeConversationId] || "";
      if (escalationId) {
        upsertEscalationDelta({
          escalationId,
          conversationId: activeConversationId,
          status: "CLOSED" as any,
        } as any);
        upsertStateUpdate({
          conversationId: activeConversationId,
          escalationId,
          status: "CLOSED",
        });
      }
      toast.success("Conversation closed");
      queryClient.invalidateQueries();
      closeConversationTab(activeConversationId);
    } catch (err: any) {
      toast.error(err?.message || "Failed to close conversation");
    }
  }, [activeConversationId, closeConversationTab, escalationIdByConversationId, queryClient, upsertEscalationDelta, upsertStateUpdate]);

  const onTransfer = useCallback(async (targetAgentUserId: string) => {
    if (!activeConversationId) return;
    const escalationId = escalationIdByConversationId[activeConversationId];
    if (!escalationId) {
      toast.error("Missing escalation id");
      return;
    }
    try {
      await transferEscalationMutation.mutateAsync({ escalationId, targetAgentUserId });
      toast.success("Conversation transferred");
      queryClient.invalidateQueries();
      closeConversationTab(activeConversationId);
    } catch (err: any) {
      toast.error(err?.message || "Failed to transfer conversation");
    }
  }, [activeConversationId, closeConversationTab, escalationIdByConversationId, queryClient, transferEscalationMutation]);

  const onTicket = useCallback(async (payload: { title: string; description?: string; priority?: TicketPriority }) => {
    if (!activeConversationId) return;
    const escalationId = escalationIdByConversationId[activeConversationId];
    if (!escalationId) {
      toast.error("Missing escalation id");
      return;
    }
    try {
      await convertToTicketMutation.mutateAsync({
        escalationId,
        title: payload.title,
        subject: payload.title,
        description: payload.description,
        priority: payload.priority,
      });
      toast.success("Ticket created successfully");
    } catch (err: any) {
      toast.error(err?.message || "Failed to create ticket");
    }
  }, [activeConversationId, convertToTicketMutation, escalationIdByConversationId]);

  const isLoadingInbox = activeQueue === "mine" ? isLoadingMyEscalations : isLoadingEscalationsAll;

  // New Live Chat Layout Container
  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden text-foreground bg-background font-sans">
      <OpenConversationSubscribers />

      {/* 1. Far Left: Unified Queues */}
      <SupportSidebar className="w-64" counts={counts} />

      {/* Middle Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* 2. Middle-Left: Conversation List Snippets */}
        <EscalationsList
          inboxItems={inboxItems}
          isLoading={isLoadingInbox}
          agentUserId={agentUserId}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSelectRow={onSelectRow}
          onClaim={onClaim}
        />

        {/* 3. Middle-Right: Active Chat Window */}
        <ChatWindow
          agentUserId={agentUserId}
          onSend={onSend}
          onClaim={() => onClaim()}
          onResolve={onResolve}
          onClose={onClose}
          onTransfer={onTransfer}
          onTicket={onTicket}
          isLoadingHistory={isLoadingHistory}
        />
      </div>

      {/* 4. Far Right: Contact / Escalation Context (Sheet) */}
      <Sheet
        open={useAgentInboxStore((s) => s.isDetailsOpen)}
        onOpenChange={(open) => useAgentInboxStore.getState().setDetailsOpen(open)}
      >
        <SheetContent className="w-96 sm:w-[400px] p-0 border-l border-border [&>button]:hidden flex flex-col h-full bg-card">
          <SheetTitle className="sr-only">Escalation Details</SheetTitle>
          <SheetDescription className="sr-only">Details about the active escalation</SheetDescription>
          <div className="h-full w-full overflow-hidden flex flex-col">
            <EscalationDetails />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
