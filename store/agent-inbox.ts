import { create } from "zustand";
import type { ConversationItem, ConversationMessageItem, EscalationItem } from "@/types/activity";
import type { WebSocketBroadcastEvent, WebSocketCommandResponse } from "@/types/websocket";

export type SenderType = "USER" | "AGENT" | "ASSISTANT" | "SYSTEM";

export type ChatMessage = {
  id: string;
  conversationId: string;
  senderType: SenderType;
  text: string;
  sentAt: Date;
  citations?: unknown[];
};

export type ConversationStateSnapshot = {
  conversationId: string;
  escalationId: string;
  status: string;
  requestedAt?: string;
  reason?: string | null;
  assignedAgentUserId?: string | null;
};

export type AgentInboxNotificationEvent =
  | WebSocketBroadcastEvent<{
      conversationId: string;
      escalationId: string;
      status?: string;
      reason?: string | null;
      requestedAt?: string;
      assignedAgentUserId?: string | null;
      agentUserId?: string | null;
    }>
  | WebSocketCommandResponse;

type AgentInboxState = {
  // Snapshots (from REST)
  conversationsById: Record<string, ConversationItem>;
  escalationsById: Record<string, EscalationItem>;
  escalationIdByConversationId: Record<string, string>;

  // UI state
  openConversationIds: string[];
  activeConversationId: string | null;
  unreadCountByConversationId: Record<string, number>;

  // Chat state
  messagesByConversationId: Record<string, ChatMessage[]>;
  stateByConversationId: Record<string, ConversationStateSnapshot>;

  // Optimistic local flags / errors
  lastClaimErrorByConversationId: Record<string, string | null>;

  // Actions
  hydrateSnapshots: (input: {
    conversations?: ConversationItem[];
    escalations?: EscalationItem[];
  }) => void;

  openConversation: (conversationId: string) => void;
  closeConversationTab: (conversationId: string) => void;
  setActiveConversation: (conversationId: string | null) => void;
  clearUnread: (conversationId: string) => void;

  setHistoryFromApi: (conversationId: string, items: ConversationMessageItem[]) => void;
  appendLiveMessage: (message: ChatMessage, opts?: { bumpUnread?: boolean }) => void;
  upsertStateUpdate: (snapshot: ConversationStateSnapshot) => void;
  handleClaimResponse: (conversationId: string, res: WebSocketCommandResponse) => void;

  // Notification deltas
  upsertEscalationDelta: (delta: Partial<EscalationItem> & { escalationId: string }) => void;
};

function stableMessageId(input: {
  conversationId: string;
  senderType: SenderType;
  text: string;
  sentAt: Date;
}) {
  return `${input.conversationId}:${input.senderType}:${input.sentAt.getTime()}:${input.text.slice(0, 48)}`;
}

export const useAgentInboxStore = create<AgentInboxState>((set, get) => ({
  conversationsById: {},
  escalationsById: {},
  escalationIdByConversationId: {},

  openConversationIds: [],
  activeConversationId: null,
  unreadCountByConversationId: {},

  messagesByConversationId: {},
  stateByConversationId: {},

  lastClaimErrorByConversationId: {},

  hydrateSnapshots: ({ conversations, escalations }) => {
    set((state) => {
      const conversationsById = { ...state.conversationsById };
      const escalationsById = { ...state.escalationsById };
      const escalationIdByConversationId = { ...state.escalationIdByConversationId };

      if (conversations) {
        for (const c of conversations) {
          conversationsById[c.conversationId] = c;
        }
      }

      if (escalations) {
        for (const e of escalations) {
          escalationsById[e.escalationId] = e;
          escalationIdByConversationId[e.conversationId] = e.escalationId;
        }
      }

      return { conversationsById, escalationsById, escalationIdByConversationId };
    });
  },

  openConversation: (conversationId) => {
    set((state) => {
      const openConversationIds = state.openConversationIds.includes(conversationId)
        ? state.openConversationIds
        : [conversationId, ...state.openConversationIds].slice(0, 20);

      const unreadCountByConversationId = { ...state.unreadCountByConversationId };
      unreadCountByConversationId[conversationId] = 0;

      return {
        openConversationIds,
        activeConversationId: conversationId,
        unreadCountByConversationId,
      };
    });
  },

  closeConversationTab: (conversationId) => {
    set((state) => {
      const openConversationIds = state.openConversationIds.filter((id) => id !== conversationId);
      const unreadCountByConversationId = { ...state.unreadCountByConversationId };
      delete unreadCountByConversationId[conversationId];

      const lastClaimErrorByConversationId = { ...state.lastClaimErrorByConversationId };
      delete lastClaimErrorByConversationId[conversationId];

      const activeConversationId =
        state.activeConversationId === conversationId ? openConversationIds[0] ?? null : state.activeConversationId;

      return { openConversationIds, unreadCountByConversationId, activeConversationId, lastClaimErrorByConversationId };
    });
  },

  setActiveConversation: (conversationId) => {
    set({ activeConversationId: conversationId });
    if (conversationId) get().clearUnread(conversationId);
  },

  clearUnread: (conversationId) => {
    set((state) => ({
      unreadCountByConversationId: { ...state.unreadCountByConversationId, [conversationId]: 0 },
    }));
  },

  setHistoryFromApi: (conversationId, items) => {
    const history: ChatMessage[] = items.map((m) => {
      const sentAt = m.createdAt ? new Date(m.createdAt) : new Date();
      const senderType: SenderType =
        m.type === "user" ? "USER" : m.type === "assistant" ? "ASSISTANT" : m.type === "system" ? "SYSTEM" : "SYSTEM";

      return {
        id: m.id,
        conversationId,
        senderType,
        text: m.content,
        sentAt,
        citations: m.citations,
      };
    });

    set((state) => ({
      messagesByConversationId: { ...state.messagesByConversationId, [conversationId]: history },
    }));
  },

  appendLiveMessage: (message, opts) => {
    set((state) => {
      const existing = state.messagesByConversationId[message.conversationId] ?? [];
      const next = existing.length ? [...existing] : [];

      const msg = { ...message, id: message.id || stableMessageId(message) };
      // Dedup by id.
      if (!next.some((m) => m.id === msg.id)) {
        next.push(msg);
      }

      const messagesByConversationId = { ...state.messagesByConversationId, [message.conversationId]: next };

      const bumpUnread =
        opts?.bumpUnread !== false && state.activeConversationId !== message.conversationId;
      const unreadCountByConversationId = bumpUnread
        ? {
            ...state.unreadCountByConversationId,
            [message.conversationId]: (state.unreadCountByConversationId[message.conversationId] ?? 0) + 1,
          }
        : state.unreadCountByConversationId;

      return { messagesByConversationId, unreadCountByConversationId };
    });
  },

  upsertStateUpdate: (snapshot) => {
    set((state) => ({
      stateByConversationId: {
        ...state.stateByConversationId,
        [snapshot.conversationId]: snapshot,
      },
    }));
  },

  handleClaimResponse: (conversationId, res) => {
    // Expected error example: { status:"error", code:"already_claimed", existingAgentUserId:"agent_9" }
    if (res.status === "error") {
      set((state) => ({
        lastClaimErrorByConversationId: {
          ...state.lastClaimErrorByConversationId,
          [conversationId]: String(res.code || res.message || "claim_failed"),
        },
      }));
      return;
    }

    set((state) => ({
      lastClaimErrorByConversationId: { ...state.lastClaimErrorByConversationId, [conversationId]: null },
    }));
  },

  upsertEscalationDelta: (delta) => {
    set((state) => {
      const current = state.escalationsById[delta.escalationId];
      const merged = { ...(current ?? ({} as EscalationItem)), ...(delta as EscalationItem) };

      const escalationsById = { ...state.escalationsById, [delta.escalationId]: merged };
      const escalationIdByConversationId = {
        ...state.escalationIdByConversationId,
        ...(merged.conversationId ? { [merged.conversationId]: merged.escalationId } : null),
      };

      return { escalationsById, escalationIdByConversationId };
    });
  },
}));

