import { useSocketStore } from "@/store/websocket";
import { ConnectionState } from "@/types/websocket";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface UseWebSocketRoomOptions<T> {
  roomId: string;
  enabled?: boolean;
  onMessage?: (data: T) => void;
  onError?: (error: Error) => void;
  onConnectionStateChange?: (state: ConnectionState) => void;
}

interface UseWebSocketRoomResult {
  connectionState: ConnectionState;
  error: Error | null;
  disconnect: () => void;
  reconnect: () => void;
}

/**
 * Minimal, ergonomic room subscription hook for dashboards.
 *
 * - Subscribes only when global socket is CONNECTED.
 * - Uses stable handler refs to avoid resubscribe churn on re-renders.
 * - `enabled=false` deterministically unsubscribes.
 */
export function useWebSocketRoom<T>({
  roomId,
  enabled = true,
  onMessage,
  onError,
  onConnectionStateChange,
}: UseWebSocketRoomOptions<T>): UseWebSocketRoomResult {
  const globalConnectionState = useSocketStore((s) => s.connectionState);
  const subscribeToRoom = useSocketStore((s) => s.subscribeToRoom);
  const unsubscribeFromRoom = useSocketStore((s) => s.unsubscribeFromRoom);

  const [connectionState, setConnectionState] = useState<ConnectionState>(
    ConnectionState.DISCONNECTED,
  );
  const [error, setError] = useState<Error | null>(null);

  const onMessageRef = useRef<typeof onMessage>(onMessage);
  const onErrorRef = useRef<typeof onError>(onError);
  const onConnectionStateChangeRef = useRef<typeof onConnectionStateChange>(
    onConnectionStateChange,
  );

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);
  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);
  useEffect(() => {
    onConnectionStateChangeRef.current = onConnectionStateChange;
  }, [onConnectionStateChange]);

  const updateConnectionState = useCallback((newState: ConnectionState) => {
    setConnectionState(newState);
    onConnectionStateChangeRef.current?.(newState);
  }, []);

  const stableRoomId = useMemo(() => roomId, [roomId]);

  const handleMessage = useCallback((data: T) => {
    try {
      onMessageRef.current?.(data);
      setError(null);
    } catch (err) {
      const e = err instanceof Error ? err : new Error("Failed to process message");
      setError(e);
      onErrorRef.current?.(e);
      updateConnectionState(ConnectionState.ERROR);
    }
  }, [updateConnectionState]);

  useEffect(() => {
    // If disabled, ensure we leave the room.
    if (!enabled) {
      unsubscribeFromRoom(stableRoomId, handleMessage as any);
      updateConnectionState(ConnectionState.DISCONNECTED);
      return;
    }

    if (globalConnectionState !== ConnectionState.CONNECTED) return;

    updateConnectionState(ConnectionState.CONNECTING);
    const cleanup = subscribeToRoom<T>(stableRoomId, handleMessage);

    return () => {
      cleanup();
      updateConnectionState(ConnectionState.DISCONNECTED);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, stableRoomId, globalConnectionState, subscribeToRoom, unsubscribeFromRoom]);

  useEffect(() => {
    if (!enabled) return;
    if (globalConnectionState === ConnectionState.ERROR) {
      updateConnectionState(ConnectionState.ERROR);
    }
  }, [enabled, globalConnectionState, updateConnectionState]);

  const disconnect = useCallback(() => {
    unsubscribeFromRoom(stableRoomId, handleMessage as any);
    updateConnectionState(ConnectionState.DISCONNECTED);
  }, [stableRoomId, unsubscribeFromRoom, handleMessage, updateConnectionState]);

  const reconnect = useCallback(() => {
    if (!enabled) return;
    if (globalConnectionState !== ConnectionState.CONNECTED) return;

    updateConnectionState(ConnectionState.CONNECTING);
    subscribeToRoom<T>(stableRoomId, handleMessage);
  }, [enabled, globalConnectionState, stableRoomId, subscribeToRoom, handleMessage, updateConnectionState]);

  return { connectionState, error, disconnect, reconnect };
}

