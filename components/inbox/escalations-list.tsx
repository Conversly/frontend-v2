"use client";

import { useAgentInboxStore } from "@/store/agent-inbox";
import { type EscalationItem } from "@/types/activity";
import { cn } from "@/lib/utils";
import { Search, Timer, Check, MessageCircle, MessageSquare, Hash, Mail, Globe, Copy } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

function getChannelIcon(channel?: string) {
    const c = (channel || "").toUpperCase();
    switch (c) {
        case "WHATSAPP":
            return <MessageSquare className="size-4 text-green-600" />;
        case "WIDGET":
            return <MessageCircle className="size-4 text-primary" />;
        case "SMS":
            return <Hash className="size-4 text-primary" />;
        case "EMAIL":
            return <Mail className="size-4 text-primary" />;
        default:
            return <Globe className="size-4 text-muted-foreground" />;
    }
}

function formatWaitTimer(ts: string) {
    const d = new Date(ts);
    const diff = Date.now() - d.getTime();
    const m = Math.max(0, Math.floor(diff / 1000 / 60));
    if (m < 60) return `${m}m`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h`;
    const days = Math.floor(h / 24);
    return `${days}d`;
}

interface EscalationsListProps {
    inboxItems: EscalationItem[];
    isLoading: boolean;
    agentUserId: string;
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    onSelectRow: (conversationId: string) => void;
    onClaim: (e: EscalationItem) => void;
}

export function EscalationsList({
    inboxItems,
    isLoading,
    agentUserId,
    searchQuery,
    setSearchQuery,
    onSelectRow,
    onClaim,
}: EscalationsListProps) {
    const activeConversationId = useAgentInboxStore((s) => s.activeConversationId);
    const unreadCountByConversationId = useAgentInboxStore((s) => s.unreadCountByConversationId);
    const messagesByConversationId = useAgentInboxStore((s) => s.messagesByConversationId);
    const lastClaimErrorByConversationId = useAgentInboxStore((s) => s.lastClaimErrorByConversationId);

    return (
        <div className="w-80 border-r border-border flex flex-col overflow-y-auto bg-[--surface-secondary] shrink-0">
            <div className="p-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                    <input
                        className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none transition-shadow"
                        placeholder="Search chats..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex-1 min-h-0 divide-y divide-border">
                {isLoading ? (
                    Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3 px-4 py-4">
                            <div className="min-w-0 flex-1 space-y-2">
                                <div className="flex items-center justify-between gap-3">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-10" />
                                </div>
                                <Skeleton className="h-3 w-full" />
                            </div>
                        </div>
                    ))
                ) : inboxItems.length > 0 ? (
                    inboxItems.map((e) => {
                        const isActive = activeConversationId === e.conversationId;
                        const isMine = Boolean(agentUserId) && e.agentUserId === agentUserId;
                        const isAssigned = Boolean(e.agentUserId);

                        const waitingForAgent =
                            (e.conversationState || "").toUpperCase() === "ESCALATED_UNASSIGNED";

                        const canClaim = waitingForAgent && !isAssigned;
                        const unread = unreadCountByConversationId[e.conversationId] ?? 0;
                        const lastMsgList = messagesByConversationId[e.conversationId] ?? [];
                        const lastMsg = lastMsgList.length ? lastMsgList[lastMsgList.length - 1] : undefined;
                        const primaryReason = (e.reason || "").trim();
                        const lastMsgText = (lastMsg?.text || "").trim();

                        const title = String(e.lastUserMessage || "").trim() || lastMsgText || primaryReason || e.conversationId;
                        const previewText =
                            lastMsgText && (!primaryReason || lastMsgText.toLowerCase() !== primaryReason.toLowerCase())
                                ? lastMsgText
                                : primaryReason || "Open chat";

                        const claimErr = lastClaimErrorByConversationId[e.conversationId];
                        const channelName = String(e.channel || "WIDGET").toUpperCase();

                        return (
                            <div
                                key={e.escalationId}
                                onClick={() => onSelectRow(e.conversationId)}
                                className={cn(
                                    "p-4 border-l-4 shadow-sm cursor-pointer group transition-colors flex flex-col gap-2 relative",
                                    isActive
                                        ? "border-primary bg-card"
                                        : "border-transparent hover:bg-card/50"
                                )}
                            >
                                <div className="flex justify-between items-start mb-0.5">
                                    <h3 className="text-sm font-semibold truncate flex-1 pr-2">{title}</h3>
                                    {waitingForAgent && !isAssigned ? (
                                        <span className="text-[10px] font-bold text-destructive flex items-center gap-1 shrink-0 bg-destructive/10 px-1.5 py-0.5 rounded">
                                            <Timer className="size-3" /> {formatWaitTimer(e.requestedAt)}
                                        </span>
                                    ) : (
                                        <span className="text-[10px] text-muted-foreground shrink-0">
                                            {formatWaitTimer(e.requestedAt)}
                                        </span>
                                    )}
                                </div>

                                <p className="text-xs text-muted-foreground line-clamp-1">
                                    {claimErr ? <span className="text-destructive font-medium">Claim failed: {claimErr}</span> : previewText}
                                </p>

                                <div className="flex items-center justify-between mt-0.5 relative z-10">
                                    <div className="flex items-center gap-1.5">
                                        {getChannelIcon(e.channel)}
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                                            {channelName}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {isMine && !isActive && <Check className="size-3 text-green-600" />}
                                        {unread > 0 && <span className="size-2 rounded-full bg-primary" title={`${unread} unread`}></span>}
                                    </div>
                                </div>

                                {/* Hover actions inside */}
                                {canClaim && (
                                    <div
                                        className={cn(
                                            "absolute inset-0 bg-card/90 items-center justify-center gap-2 transition-opacity z-20 flex",
                                            "opacity-0 group-hover:opacity-100"
                                        )}
                                    >
                                        <Button
                                            variant="default"
                                            size="sm"
                                            className="h-8 shadow-sm"
                                            onClick={(evt) => {
                                                evt.preventDefault();
                                                evt.stopPropagation();
                                                onClaim(e);
                                            }}
                                        >
                                            Claim Chat
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={(evt) => {
                                                evt.preventDefault();
                                                evt.stopPropagation();
                                                navigator.clipboard.writeText(e.conversationId);
                                                toast.success("Copied ID");
                                            }}
                                        >
                                            <Copy className="size-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-center px-4">
                        <p className="text-sm font-medium">No escalations</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Chats assigned to this queue will appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
