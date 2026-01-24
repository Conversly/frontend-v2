"use client";

import { useMemo, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { BellRing, MessageSquareWarning } from "lucide-react";

import { useWebSocketRoom } from "@/hooks/use-websocket-room";
import { cn } from "@/lib/utils";
import {
  WebSocketEventType,
  type WebSocketInboundMessage,
  type WebSocketBroadcastEvent,
} from "@/types/websocket";

function isBroadcastEvent(msg: WebSocketInboundMessage): msg is WebSocketBroadcastEvent {
  return Boolean((msg as any)?.roomId && (msg as any)?.eventType);
}

function safeString(v: unknown) {
  return typeof v === "string" ? v : "";
}

export function EscalationNotifier() {
  const routeParams = useParams<{ workspaceId: string; botId: string }>();
  const router = useRouter();

  const workspaceId = Array.isArray(routeParams.workspaceId)
    ? routeParams.workspaceId[0]
    : routeParams.workspaceId;
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;

  const roomId = useMemo(() => {
    if (!workspaceId || !botId) return "";
    return `agents:notifications:${workspaceId}:${botId}`;
  }, [workspaceId, botId]);

  // Simple in-memory dedupe per page lifetime: avoids reconnect spam.
  const seenRef = useRef<Set<string>>(new Set());

  useWebSocketRoom<WebSocketInboundMessage>({
    roomId,
    enabled: Boolean(roomId),
    onMessage: (msg) => {
      if (!isBroadcastEvent(msg)) return;
      if (msg.eventType !== WebSocketEventType.NEW_ESCALATION) return;

      const data = (msg as any).data ?? {};
      const escalationId = safeString(data.escalationId || data.id);
      const conversationId = safeString(data.conversationId);
      const reason = safeString(data.reason);

      const dedupeKey =
        escalationId ? `escalation:${escalationId}` : conversationId ? `conversation:${conversationId}` : "";
      if (dedupeKey) {
        if (seenRef.current.has(dedupeKey)) return;
        seenRef.current.add(dedupeKey);
      }

      const id = `new-escalation:${dedupeKey || Date.now()}`;
      const inboxUrl = `/${workspaceId}/chatbot/${botId}/activity/inbox`;

      toast.custom(
        (t) => (
          <div
            role="status"
            onClick={() => {
              toast.dismiss(t);
              router.push(inboxUrl);
            }}
            className={cn(
              "group pointer-events-auto w-full max-w-[520px]",
              "animate-in fade-in slide-in-from-top-2 duration-200",
            )}
          >
            <div
              className={cn(
                "rounded-xl border shadow-lg",
                "bg-[#FEF9C3] text-amber-950 border-amber-300/70",
                "dark:bg-[#2A240E] dark:text-amber-100 dark:border-amber-700/50",
                "px-4 py-3",
                "cursor-pointer select-none",
              )}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">
                  <MessageSquareWarning className="h-5 w-5 text-amber-700 dark:text-amber-300" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold">New escalated chat</div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-200/70 text-amber-950 px-2 py-0.5 text-[11px] font-medium dark:bg-amber-900/40 dark:text-amber-100">
                      <BellRing className="h-3.5 w-3.5" />
                      Attention
                    </span>
                  </div>

                  <div className="mt-1 text-xs text-amber-900/90 dark:text-amber-100/90">
                    {reason ? (
                      <span className="line-clamp-2">{reason}</span>
                    ) : conversationId ? (
                      <span className="truncate">
                        Conversation <code className="text-[11px]">{conversationId}</code>
                      </span>
                    ) : (
                      <span>Open Inbox to claim it.</span>
                    )}
                  </div>

                  <div className="mt-2 text-[11px] font-medium text-amber-950/90 dark:text-amber-100/90">
                    Click to open Inbox
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        {
          id,
          duration: 12_000,
          toasterId: "escalation",
        } as any,
      );
    },
  });

  return null;
}

