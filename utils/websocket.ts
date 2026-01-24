import {
  RoomCategory,
  RoomConfig,
  RoomSubCategory,
  WebSocketMessageType,
} from "@/types/websocket";

export const formatRoomId = (config: RoomConfig): string => {
  const parts: (RoomCategory | RoomSubCategory | string)[] = [config.category];
  if (config.subCategory) parts.push(config.subCategory);
  if (config.identifier) parts.push(config.identifier);
  return parts.join(":");
};

export const createSubscribeMessage = (roomId: string) => {
  return JSON.stringify({
    action: WebSocketMessageType.JOIN,
    room: roomId,
  });
};

export const createUnsubscribeMessage = (roomId: string) => {
  return JSON.stringify({
    action: WebSocketMessageType.LEAVE,
    room: roomId,
  });
};

export class WebSocketError extends Error {
  constructor(
    message: string,
    public roomId: string,
  ) {
    super(message);
    this.name = "WebSocketError";
  }
}
