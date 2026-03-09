"use client";

import { useAgentInboxStore, type InboxQueue } from "@/store/agent-inbox";
import { type EscalationItem } from "@/types/activity";
import { cn } from "@/lib/utils";
import { Search, Check, Copy, MessageSquare, Filter, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Counts {
    userWaiting: number;
    unassigned: number;
    mine: number;
    waitingForUser: number;
    resolved: number;
    all: number;
}

interface EscalationsListProps {
    inboxItems: EscalationItem[];
    isLoading: boolean;
    agentUserId: string;
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    onSelectRow: (conversationId: string) => void;
    onClaim: (e: EscalationItem) => void;
    counts: Counts;
    activeQueue: InboxQueue;
    onQueueChange: (queue: InboxQueue) => void;
}

interface QueueTab {
    id: InboxQueue;
    label: string;
    count: number;
}

function getWaitStats(ts: string) {
    const d = new Date(ts);
    const diff = Date.now() - d.getTime();
    const m = Math.max(0, Math.floor(diff / 1000 / 60));
    const h = m / 60;

    // SLA thresholds
    const isWarning = m >= 15 && h < 1; // 15 mins to 1 hr
    const isBreached = h >= 1; // >= 1 hr

    let timeText = "";
    if (m < 60) timeText = `${m}m`;
    else if (Math.floor(h) < 24) timeText = `${Math.floor(h)}h`;
    else timeText = `${Math.floor(h / 24)}d`;

    return { timeText, isWarning, isBreached };
}


export function EscalationsList({
    inboxItems,
    isLoading,
    agentUserId,
    searchQuery,
    setSearchQuery,
    onSelectRow,
    onClaim,
    counts,
    activeQueue,
    onQueueChange,
}: EscalationsListProps) {
    const activeConversationId = useAgentInboxStore((s) => s.activeConversationId);
    const unreadCountByConversationId = useAgentInboxStore((s) => s.unreadCountByConversationId);
    const messagesByConversationId = useAgentInboxStore((s) => s.messagesByConversationId);
    const lastClaimErrorByConversationId = useAgentInboxStore((s) => s.lastClaimErrorByConversationId);

    const tabs: QueueTab[] = [
        { id: "all", label: "Active", count: counts.all - counts.resolved },
        { id: "unassigned", label: "Unassigned", count: counts.unassigned },
        { id: "mine", label: "Mine", count: counts.mine },
        { id: "resolved", label: "Resolved", count: counts.resolved },
    ];

    const isDetailsOpen = useAgentInboxStore((s) => s.isDetailsOpen);

    return (
        <div
            className={cn(
                "flex flex-col bg-[--surface-secondary] shrink-0 border-r border-border transition-all duration-300",
                isDetailsOpen
                    ? "w-[280px] lg:w-[330px]"
                    : "w-[clamp(260px,28vw,400px)]"
            )}
        >
            <div className="p-3 space-y-3">
                <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                        <input
                            className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none transition-shadow"
                            placeholder="Search chats..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Queue Filter Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onQueueChange(tab.id)}
                            className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all shrink-0 border",
                                activeQueue === tab.id
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-white text-foreground border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                            )}
                        >
                            {tab.label}
                            {tab.count > 0 && (
                                <span className={cn(
                                    "text-[10px] px-1.5 py-0.5 rounded-full font-semibold",
                                    activeQueue === tab.id
                                        ? "bg-primary-foreground/20 text-primary-foreground"
                                        : "bg-gray-100 text-foreground"
                                )}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 min-h-0 divide-y divide-border overflow-y-auto">
                {isLoading ? (
                    Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="flex flex-col px-3 py-2 gap-1.5 bg-card border-l-[3px] border-transparent">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="size-6 rounded-full" />
                                    <Skeleton className="h-3.0 w-24" />
                                </div>
                                <Skeleton className="h-3.0 w-16 rounded-full" />
                            </div>
                            <Skeleton className="h-3.0 w-3/4" />
                            <div className="flex items-center justify-between mt-0.5">
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="size-4 rounded-full" />
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
                        const unread = Math.max(0, (unreadCountByConversationId[e.conversationId] ?? 0) + (e.unreadCount ?? 0));
                        const lastMsgList = messagesByConversationId[e.conversationId] ?? [];
                        const lastMsg = lastMsgList.length ? lastMsgList[lastMsgList.length - 1] : undefined;
                        const primaryReason = (e.reason || "").trim();
                        const lastMsgText = (lastMsg?.text || "").trim();

                        const messagePreview =
                            lastMsgText && (!primaryReason || lastMsgText.toLowerCase() !== primaryReason.toLowerCase())
                                ? lastMsgText
                                : e.lastUserMessage?.trim() || primaryReason || "Open chat";

                        const { timeText, isWarning, isBreached } = e.lastMessageAt ? getWaitStats(e.lastMessageAt) : getWaitStats(e.requestedAt);

                        const claimErr = lastClaimErrorByConversationId[e.conversationId];
                        const contactName = e.contactName || "Visitor";

                        // State color for time pill dot and SLA
                        let stateColor = "text-yellow-600 bg-yellow-50 border border-yellow-200";

                        if (e.resolvedAt) {
                            stateColor = "text-gray-500 bg-gray-50 border border-gray-200";
                        } else if (e.acceptedAt) {
                            stateColor = "text-green-600 bg-green-50 border border-green-200";
                        } else if (e.assignedAt) {
                            stateColor = "text-orange-600 bg-orange-50 border border-orange-200";
                        } else if (isBreached) {
                            stateColor = "text-red-600 bg-red-50 border border-red-200 font-bold shadow-sm";
                        } else if (isWarning) {
                            stateColor = "text-orange-600 bg-orange-50 border border-orange-200 font-semibold";
                        }

                        return (
                            <div
                                key={e.escalationId}
                                onClick={() => onSelectRow(e.conversationId)}
                                className={cn(
                                    "px-3 py-2 border-l-[3px] cursor-pointer group transition-all flex flex-col relative bg-card",
                                    isActive
                                        ? "border-primary bg-primary/5"
                                        : "border-transparent hover:bg-muted/50"
                                )}
                            >
                                {/* Top Row - Identity, Reason Pill & Wait Time */}
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2 min-w-0 pr-2">
                                        <div className="size-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <span className="text-xs font-semibold text-primary">
                                                {contactName.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="text-sm font-semibold truncate text-foreground">{contactName}</span>
                                        {primaryReason && (
                                            <span className="bg-primary/5 text-primary border border-primary/20 text-[10px] px-1.5 py-0.5 rounded-md truncate max-w-[100px]" title={primaryReason}>
                                                {primaryReason}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <div className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1.5", stateColor)}>
                                            {isBreached && <AlertTriangle className="size-2.5" />}
                                            {!isBreached && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
                                            {timeText}
                                        </div>
                                        {unread > 0 && (
                                            <span className="text-[10px] font-bold bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                                                {unread}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Last Message */}
                                <p className="text-sm text-muted-foreground line-clamp-1 pr-12 min-h-0">
                                    {claimErr ? <span className="text-destructive font-medium">Claim failed: {claimErr}</span> : messagePreview}
                                </p>

                                {/* Bottom Row - Assigned */}
                                <div className="flex items-center justify-between mt-1 min-h-[16px]">
                                    <div className="text-[11px] text-muted-foreground mr-2 truncate">
                                        Assigned: <span className="font-medium text-foreground ml-1">{e.agentDisplayName || "None"}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        {isMine && !isActive && <Check className="size-3.5 text-green-600" />}
                                        {isAssigned && (
                                            <div
                                                className="size-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 overflow-hidden"
                                                title={`Working on it: ${e.agentDisplayName}`}
                                            >
                                                {e.agentAvatarUrl ? (
                                                    <img src={e.agentAvatarUrl} alt={e.agentDisplayName!} className="size-full object-cover" />
                                                ) : (
                                                    <span className="text-[10px] font-semibold text-primary">
                                                        {(e.agentDisplayName || "A").charAt(0).toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Hover actions right-aligned */}
                                {canClaim && (
                                    <div
                                        className={cn(
                                            "absolute right-3 top-1/2 -translate-y-1/2 items-center gap-1.5 bg-card/80 backdrop-blur-sm p-1 rounded-lg border border-border shadow-sm transition-opacity z-20 flex",
                                            "opacity-0 group-hover:opacity-100"
                                        )}
                                    >
                                        <Button
                                            variant="default"
                                            size="sm"
                                            className="h-7 text-xs px-2.5"
                                            onClick={(evt) => {
                                                evt.preventDefault();
                                                evt.stopPropagation();
                                                onClaim(e);
                                            }}
                                        >
                                            Claim
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="h-7 w-7"
                                            onClick={(evt) => {
                                                evt.preventDefault();
                                                evt.stopPropagation();
                                                navigator.clipboard.writeText(e.conversationId);
                                                toast.success("Copied ID");
                                            }}
                                        >
                                            <Copy className="size-3.5" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    // Empty state (no items)
                    <div className="flex flex-col items-center justify-center p-8 text-center bg-card">
                        <MessageSquare className="size-8 text-muted-foreground/30 mb-3" />
                        <h3 className="text-sm font-medium text-foreground">No escalations found</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                            Everything is caught up. Have a coffee! ☕️
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
