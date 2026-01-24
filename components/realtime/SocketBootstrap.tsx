"use client";

import { useEffect } from "react";
import { useSocketStore } from "@/store/websocket";
import { ConnectionState } from "@/types/websocket";

/**
 * Ensures the dashboard has a live WS connection.
 * This component is intentionally side-effect-only.
 */
export function SocketBootstrap() {
  const connect = useSocketStore((s) => s.connect);
  const connectionState = useSocketStore((s) => s.connectionState);

  useEffect(() => {
    // Only attempt connect when not already connected/connecting.
    if (
      connectionState === ConnectionState.CONNECTED ||
      connectionState === ConnectionState.CONNECTING ||
      connectionState === ConnectionState.RECONNECTING ||
      connectionState === ConnectionState.ERROR
    ) {
      return;
    }

    connect({ clientType: "agent" });
  }, [connect, connectionState]);

  return null;
}

