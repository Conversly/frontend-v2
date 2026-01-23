 "use client";

import { buildWsUrl, WS_URL } from "@/lib/api/config";
import {
  ConnectionState,
  WebSocketInboundMessage,
  WebSocketOutboundMessage,
  WebSocketStore,
} from "@/types/websocket";
import {
  createSubscribeMessage,
  createUnsubscribeMessage,
} from "@/utils/websocket";
import { create } from "zustand";
import { toast } from "sonner";

const MAX_RECONNECT_ATTEMPTS = 3;
const BASE_RECONNECT_DELAY_MS = 1000; // 1s, then 2s, then 4s
const MAX_RECONNECT_DELAY_MS = 8000;
const JITTER_MS = 250;

let reconnectAttempts = 0;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
let gaveUp = false;
let lastClientType: "agent" | "widget" = "agent";
let stickyToastId: string | number | undefined;

function clearReconnectTimer() {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
}

function dismissStickyToast() {
  if (stickyToastId !== undefined) {
    toast.dismiss(stickyToastId);
    stickyToastId = undefined;
  }
}

function showStickyRefreshToast() {
  if (stickyToastId !== undefined) return;
  stickyToastId = toast.error("Connection lost. Please refresh the page.", {
    duration: Infinity,
    action: {
      label: "Refresh",
      onClick: () => window.location.reload(),
    },
  });
}

function computeBackoffMs(attempt: number) {
  const exp = BASE_RECONNECT_DELAY_MS * Math.pow(2, Math.max(0, attempt - 1));
  const capped = Math.min(exp, MAX_RECONNECT_DELAY_MS);
  const jitter = Math.floor(Math.random() * JITTER_MS);
  return capped + jitter;
}

export const useSocketStore = create<WebSocketStore>((set, get) => ({
  socket: null,
  connectionState: ConnectionState.DISCONNECTED,
  activeRooms: new Set<string>(),
  roomSubscribers: new Map<string, Set<(data: any) => void>>(),

  connect: (opts) => {
    const state = get();
    if (gaveUp) return;
    if (
      state.socket?.readyState === WebSocket.OPEN ||
      state.connectionState === ConnectionState.CONNECTING
    ) {
      return;
    }

    const clientType = opts?.clientType ?? lastClientType ?? "agent";
    lastClientType = clientType;

    // If we have a pending reconnect timer, cancel it: we're actively trying now.
    clearReconnectTimer();

    // Mark CONNECTING and store socket immediately so we can gate duplicate connects
    // even before `onopen` fires.
    set({ connectionState: ConnectionState.CONNECTING });
    const url = buildWsUrl(clientType) || WS_URL;
    const socket = new WebSocket(url);
    set({ socket });

    socket.onopen = () => {
      // console.log("WebSocket connected");
      set({
        socket,
        connectionState: ConnectionState.CONNECTED,
      });

      // Reset reconnect budget on successful connect.
      reconnectAttempts = 0;
      gaveUp = false;
      dismissStickyToast();

      get().activeRooms.forEach((roomId) => {
        socket.send(createSubscribeMessage(roomId));
      });
    };

    socket.onclose = (event) => {
      // console.log("WebSocket disconnected", event.code, event.reason);
      set({
        socket: null,
        connectionState: ConnectionState.DISCONNECTED,
      });

      if (event.wasClean) return;
      if (gaveUp) return;

      // Single-flight reconnect scheduler with exponential backoff and a hard cap.
      if (reconnectTimer) return;

      if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
        gaveUp = true;
        reconnectAttempts = 0;
        set({ connectionState: ConnectionState.DISCONNECTED });
        showStickyRefreshToast();
        return;
      }

      reconnectAttempts += 1;
      const delay = computeBackoffMs(reconnectAttempts);
      set({ connectionState: ConnectionState.RECONNECTING });
      reconnectTimer = setTimeout(() => {
        reconnectTimer = null;
        get().connect({ clientType: lastClientType });
      }, delay);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      // Many browsers will fire `error` followed by `close`. Don't reconnect here;
      // let `onclose` own the retry budget.
      set({ connectionState: ConnectionState.ERROR });
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data) as WebSocketInboundMessage;
        if ("error" in message && message.error) {
          console.error("WebSocket message error:", message.error);
          return;
        }

        // Backend sends both:
        // - broadcast events: { roomId, eventType, data }
        // - command responses: { status, room, ... }
        // Route both through the same subscriber map.
        const routeRoomId =
          (message as any).roomId ?? (message as any).room ?? undefined;

        if (routeRoomId) {
          const subscribers = get().roomSubscribers.get(routeRoomId);

          subscribers?.forEach((callback) => {
            try {
              callback(message);
            } catch (err) {
              console.error("Error in subscriber callback:", err);
            }
          });
        }
      } catch (err) {
        console.error("Failed to parse WebSocket message:", err);
      }
    };
  },

  disconnect: () => {
    const { socket, activeRooms } = get();
    clearReconnectTimer();
    reconnectAttempts = 0;
    gaveUp = false;
    dismissStickyToast();

    if (socket?.readyState === WebSocket.OPEN) {
      activeRooms.forEach((roomId) => {
        socket.send(createUnsubscribeMessage(roomId));
      });
      socket.close(1000, "Normal closure");
    }
    set({
      socket: null,
      connectionState: ConnectionState.DISCONNECTED,
      activeRooms: new Set(),
      roomSubscribers: new Map(),
    });
  },

  subscribeToRoom: <T>(roomId: string, onMessage: (data: T) => void) => {
    // console.log("Subscribing to room:", roomId);
    const state = get();

    const newActiveRooms = new Set(state.activeRooms);
    newActiveRooms.add(roomId);

    const subscribers = state.roomSubscribers.get(roomId) || new Set();
    subscribers.add(onMessage);
    const newSubscribers = new Map(state.roomSubscribers);
    newSubscribers.set(roomId, subscribers);

    set({
      activeRooms: newActiveRooms,
      roomSubscribers: newSubscribers,
    });

    if (state.socket?.readyState === WebSocket.OPEN) {
      state.socket.send(createSubscribeMessage(roomId));
    }

    return () => {
      get().unsubscribeFromRoom(roomId, onMessage);
    };
  },

  unsubscribeFromRoom: (roomId: string, callback: (data: any) => void) => {
    // console.log("Unsubscribing from room:", roomId);
    const state = get();
    const subscribers = state.roomSubscribers.get(roomId);

    if (subscribers) {
      subscribers.delete(callback);
      const newSubscribers = new Map(state.roomSubscribers);

      if (subscribers.size === 0) {
        newSubscribers.delete(roomId);
        const newActiveRooms = new Set(state.activeRooms);
        newActiveRooms.delete(roomId);

        if (state.socket?.readyState === WebSocket.OPEN) {
          state.socket.send(createUnsubscribeMessage(roomId));
        }

        set({
          activeRooms: newActiveRooms,
          roomSubscribers: newSubscribers,
        });
      } else {
        newSubscribers.set(roomId, subscribers);
        set({ roomSubscribers: newSubscribers });
      }
    }
  },

  sendMessage: (message: WebSocketOutboundMessage) => {
    const { socket } = get();
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.warn("Cannot send message: WebSocket is not connected");
    }
  },
}));
