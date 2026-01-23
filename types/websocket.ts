// NOTE:
// This file models the WS wire protocol used by the dashboard + widget.
// The backend sends two inbound frame shapes:
// 1) command responses: { status, room, ... } (direct replies to join/leave/claim/stats/message)
// 2) broadcast events:  { roomId, eventType, data } (fanout per room)

export enum RoomCategory {}

export enum RoomSubCategory {}

export enum ConnectionState {
  DISCONNECTED = "disconnected",
  CONNECTING = "connecting",
  CONNECTED = "connected",
  RECONNECTING = "reconnecting",
  ERROR = "error",
}

export type RoomConfig = {
  category: RoomCategory;
  subCategory?: RoomSubCategory;
  identifier?: string;
};

export enum WebSocketMessageType {
  JOIN = "join",
  LEAVE = "leave",
  MESSAGE = "message",
  CLAIM = "claim",
  STATS = "stats",
}

export enum WebSocketEventType {
  NEW_ESCALATION = "NEW_ESCALATION",
  CHAT_CLAIMED = "CHAT_CLAIMED",
  ESCALATION_UPDATED = "ESCALATION_UPDATED",
  STATE_UPDATE = "STATE_UPDATE",
  CHAT_MESSAGE = "CHAT_MESSAGE",
  ERROR = "ERROR",
}

// Payloads (MVP). Keep fields optional: backend may evolve without breaking UI.
export type WsStateUpdatePayload = {
  conversationId: string;
  escalationId: string;
  status: string;
  requestedAt?: string;
  reason?: string | null;
  assignedAgentUserId?: string | null;
};

export type WsChatMessagePayload = {
  conversationId: string;
  senderType: "USER" | "AGENT" | "ASSISTANT" | "SYSTEM" | (string & {});
  text: string;
  messageId?: string;
  sentAtUnix?: number;
};

// Outbound command envelope (what we send with ws.send()).
export type WebSocketOutboundMessage<T = unknown> = {
  action: WebSocketMessageType;
  room: string;
  data?: T;
};

// Inbound command response (what server replies with after a command).
export type WebSocketCommandResponse = {
  status: string;
  room?: string;
  code?: string;
  message?: string;
  escalationId?: string;
  agentUserId?: string;
  existingAgentUserId?: string;
  [key: string]: unknown;
};

// Inbound broadcast event (room-based fanout).
export type WebSocketBroadcastEvent<T = unknown> = {
  roomId: string;
  eventType: WebSocketEventType | string;
  data: T;
};

// Inbound frames (union).
export type WebSocketInboundMessage =
  | WebSocketCommandResponse
  | WebSocketBroadcastEvent
  | { error?: string; roomId?: string; room?: string; [key: string]: unknown };

// Backwards-compat alias used by the existing socket store.
export type WebSocketMessage<T = unknown> = WebSocketInboundMessage & {
  data?: T;
};

export type WsClientType = "widget" | "agent";

export interface WebSocketStore {
  socket: WebSocket | null;
  connectionState: ConnectionState;
  activeRooms: Set<string>;
  roomSubscribers: Map<string, Set<(data: any) => void>>;
  connect: (opts?: { clientType?: WsClientType }) => void;
  disconnect: () => void;
  subscribeToRoom: <T>(
    roomId: string,
    onMessage: (data: T) => void,
  ) => () => void;
  unsubscribeFromRoom: (roomId: string, callback: (data: any) => void) => void;
  sendMessage: (message: WebSocketOutboundMessage) => void;
}
