"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/store/auth";
import { useSocketStore } from "@/store/websocket";
import { useWebSocketRoom } from "@/hooks/use-websocket-room";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  WebSocketEventType,
  WebSocketMessageType,
  type WebSocketInboundMessage,
  type WebSocketBroadcastEvent,
  type WebSocketCommandResponse,
  type WsChatMessagePayload,
  type WsStateUpdatePayload,
  type WsPresenceUpdatePayload,
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
import { closeConversation } from "@/lib/api/activity";
import { markEscalationRead } from "@/lib/api/escalate";
import type { EscalationItem } from "@/types/activity";
import type { TicketPriority } from "@/types/escalate";
import { useAgentInboxStore, type ChatMessage, type SenderType } from "@/store/agent-inbox";

import { toast } from "sonner";

// New specialized components
import { EscalationsList } from "../../../../../../../components/inbox/escalations-list";
import { ChatWindow } from "../../../../../../../components/inbox/chat-window";
import { EscalationDetails } from "../../../../../../../components/inbox/escalation-details";
import { EscalationHeadbar } from "../../../../../../../components/inbox/escalation-headbar";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRightLeft, Ticket, Loader2 } from "lucide-react";

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
  const updatePresence = useAgentInboxStore((s) => s.updatePresence);

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

      if (msg.eventType === WebSocketEventType.PRESENCE_UPDATE) {
        const data = msg.data as WsPresenceUpdatePayload;
        if (!data?.conversationId) return;
        updatePresence(data.conversationId, data.isUserOnline, data.activeAgents || []);
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

  const isMobile = useIsMobile();
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
  const setActiveQueue = useAgentInboxStore((s) => s.setActiveQueue);
  const activeConversationId = useAgentInboxStore((s) => s.activeConversationId);
  const escalationsById = useAgentInboxStore((s) => s.escalationsById);
  const escalationIdByConversationId = useAgentInboxStore((s) => s.escalationIdByConversationId);
  const setHistoryFromApi = useAgentInboxStore((s) => s.setHistoryFromApi);
  const appendLiveMessage = useAgentInboxStore((s) => s.appendLiveMessage);

  const [searchQuery, setSearchQuery] = useState("");

  // Dialog states for headbar actions
  const [transferOpen, setTransferOpen] = useState(false);
  const [ticketOpen, setTicketOpen] = useState(false);
  const [isResolving, setIsResolving] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Transfer dialog state
  const [transferAgentId, setTransferAgentId] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);

  // Ticket dialog state
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketDesc, setTicketDesc] = useState("");
  const [ticketPriority, setTicketPriority] = useState<TicketPriority>("MEDIUM");
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);

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

      const escalation = escalationsById[escalationId];
      if (!escalation || escalation.agentUserId !== agentUserId) return;

      try {
        await markEscalationRead(escalationId);
      } catch {
        await refetchMyEscalations();
      }
    },
    [escalationIdByConversationId, escalationsById, agentUserId, refetchMyEscalations],
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
      const state = (e.conversationState || "").toUpperCase();

      if (state === "ESCALATED_UNASSIGNED") {
        userWaiting++;
        if (!e.agentUserId) unassigned++;
      }
      if (state === "ASSIGNED" || state === "HUMAN_WAITING_USER" || state === "USER_WAITING_HUMAN") {
        if (agentUserId && e.agentUserId === agentUserId) mine++;
        if (state === "HUMAN_WAITING_USER") waitingForUser++;
      }
      if (state === "RESOLVED" || state === "CLOSED") resolved++;
    });

    return { userWaiting, unassigned, mine, waitingForUser, resolved, all: allCount };
  }, [escalationsById, agentUserId]);

  const inboxItems = useMemo(() => {
    // Source list is server-driven + local merged
    const list = Object.values(escalationsById);
    const filtered = list.filter((e) => {
      const state = (e.conversationState || "").toUpperCase();
      const isWaiting = state === "ESCALATED_UNASSIGNED";
      const isClosed = state === "RESOLVED" || state === "CLOSED";
      const isMine = e.agentUserId === agentUserId;

      if (activeQueue === "unassigned") {
        if (!isWaiting || e.agentUserId) return false;
      } else if (activeQueue === "mine") {
        if (!isMine || isClosed) return false;
      } else if (activeQueue === "user-waiting") {
        if (state !== "USER_WAITING_HUMAN") return false;
      } else if (activeQueue === "resolved") {
        if (state !== "RESOLVED" && state !== "CLOSED") return false;
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
      const aWaiting = (a.conversationState || "").toUpperCase() === "ESCALATED_UNASSIGNED" ? 0 : 1;
      const bWaiting = (b.conversationState || "").toUpperCase() === "ESCALATED_UNASSIGNED" ? 0 : 1;
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
    [activeConversationId, agentUserId, escalationIdByConversationId, openConversation, sendMessage, setActiveConversation],
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
    setIsResolving(true);
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
    } finally {
      setIsResolving(false);
    }
  }, [activeConversationId, closeConversationTab, escalationIdByConversationId, queryClient, resolveEscalationMutation, upsertEscalationDelta, upsertStateUpdate]);

  const onClose = useCallback(async () => {
    if (!activeConversationId) return;
    setIsClosing(true);
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
    } finally {
      setIsClosing(false);
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
    <div className="flex flex-col h-[calc(100vh-64px)] w-full overflow-hidden text-foreground bg-background font-sans">
      <OpenConversationSubscribers />

      {/* Unified Header - Full Width */}
      <EscalationHeadbar
        agentUserId={agentUserId}
        onClaim={() => onClaim()}
        onResolve={onResolve}
        onClose={onClose}
        onTransferClick={() => setTransferOpen(true)}
        onTicketClick={() => setTicketOpen(true)}
        isResolving={isResolving}
        isClosing={isClosing}
      />

      {/* Content Area - Side by Side */}
      <div className="flex flex-1 overflow-hidden">
        {/* 1. Left: Conversation List with Integrated Queue Tabs */}
        <EscalationsList
          inboxItems={inboxItems}
          isLoading={isLoadingInbox}
          agentUserId={agentUserId}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSelectRow={onSelectRow}
          onClaim={onClaim}
          counts={counts}
          activeQueue={activeQueue}
          onQueueChange={setActiveQueue}
        />

        {/* 2. Right: Active Chat Window */}
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

        {/* 3. Far Right: Contact / Escalation Context (Desktop) */}
        {!isMobile && useAgentInboxStore((s) => s.isDetailsOpen) && (
          <div className="w-[300px] shrink-0 border-l border-border flex flex-col h-full bg-card animate-in slide-in-from-right-8 duration-300">
            <EscalationDetails />
          </div>
        )}
      </div>

      {/* 4. Far Right: Contact / Escalation Context (Mobile Sheet) */}
      {isMobile && (
        <Sheet
          open={useAgentInboxStore((s) => s.isDetailsOpen)}
          onOpenChange={(open) => useAgentInboxStore.getState().setDetailsOpen(open)}
        >
          <SheetContent className="w-11/12 max-w-sm sm:w-[400px] p-0 border-l border-border [&>button]:hidden flex flex-col h-full bg-card">
            <SheetTitle className="sr-only">Escalation Details</SheetTitle>
            <SheetDescription className="sr-only">Details about the active escalation</SheetDescription>
            <div className="h-full w-full overflow-hidden flex flex-col">
              <EscalationDetails />
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Transfer Dialog */}
      <Dialog open={transferOpen} onOpenChange={setTransferOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ArrowRightLeft className="size-4" /> Transfer Conversation
            </DialogTitle>
            <DialogDescription>
              Enter the Agent User ID you want to transfer this conversation to.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="transfer-agent-id">Target Agent ID</Label>
              <Input
                id="transfer-agent-id"
                placeholder="e.g. agent_abc123"
                value={transferAgentId}
                onChange={(e) => setTransferAgentId(e.target.value)}
                disabled={isTransferring}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setTransferOpen(false)} disabled={isTransferring}>
              Cancel
            </Button>
            <Button
              onClick={async () => {
                if (!transferAgentId.trim()) return;
                setIsTransferring(true);
                try {
                  await onTransfer(transferAgentId.trim());
                  setTransferOpen(false);
                  setTransferAgentId("");
                } finally {
                  setIsTransferring(false);
                }
              }}
              disabled={!transferAgentId.trim() || isTransferring}
            >
              {isTransferring ? <Loader2 className="size-4 animate-spin mr-2" /> : <ArrowRightLeft className="size-4 mr-2" />}
              Transfer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Ticket Dialog */}
      <Dialog open={ticketOpen} onOpenChange={setTicketOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Ticket className="size-4" /> Convert to Support Ticket
            </DialogTitle>
            <DialogDescription>
              Create a support ticket from this conversation so it can be tracked and resolved outside the live chat flow.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="ticket-title">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="ticket-title"
                placeholder="Brief summary of the issue"
                value={ticketTitle}
                onChange={(e) => setTicketTitle(e.target.value)}
                disabled={isCreatingTicket}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ticket-description">Description</Label>
              <Textarea
                id="ticket-description"
                placeholder="Detailed description of the issue (optional)"
                value={ticketDesc}
                onChange={(e) => setTicketDesc(e.target.value)}
                disabled={isCreatingTicket}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ticket-priority">Priority</Label>
              <Select
                value={ticketPriority}
                onValueChange={(v) => setTicketPriority(v as TicketPriority)}
                disabled={isCreatingTicket}
              >
                <SelectTrigger id="ticket-priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOW">Low</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="URGENT">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setTicketOpen(false)} disabled={isCreatingTicket}>
              Cancel
            </Button>
            <Button
              onClick={async () => {
                if (!ticketTitle.trim()) return;
                setIsCreatingTicket(true);
                try {
                  await onTicket({ title: ticketTitle.trim(), description: ticketDesc.trim() || undefined, priority: ticketPriority });
                  setTicketOpen(false);
                  setTicketTitle("");
                  setTicketDesc("");
                  setTicketPriority("MEDIUM");
                } finally {
                  setIsCreatingTicket(false);
                }
              }}
              disabled={!ticketTitle.trim() || isCreatingTicket}
            >
              {isCreatingTicket ? <Loader2 className="size-4 animate-spin mr-2" /> : <Ticket className="size-4 mr-2" />}
              Create Ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
