"use client";

import { useAgentInboxStore, type InboxQueue } from "@/store/agent-inbox";
import { type EscalationItem, type MessageChannel } from "@/types/activity";
import { cn } from "@/lib/utils";
import { Search, Check, Copy, MessageSquare, Filter, AlertTriangle, UserPlus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { conversationStateIconMap } from "@/components/icons/conversation-icons";

interface Counts {
    userWaiting: number;
    unassigned: number;
    mine: number;
    waitingForUser: number;
    resolved: number;
    closed: number;
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
    onLoadMore?: () => void;
    isFetchingMore?: boolean;
    hasMore?: boolean;
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

    const isWarning = m >= 15 && h < 1;
    const isBreached = h >= 1;

    let timeText = "";
    if (m < 60) timeText = `${m}m`;
    else if (Math.floor(h) < 24) timeText = `${Math.floor(h)}h`;
    else timeText = `${Math.floor(h / 24)}d`;

    return { timeText, isWarning, isBreached };
}

function getChannelLabel(channel?: MessageChannel | null) {
    const normalized = (channel || "WIDGET").toUpperCase();

    switch (normalized) {
        case "WIDGET":
            return "Web chat";
        case "WHATSAPP":
            return "WhatsApp";
        case "SMS":
            return "SMS";
        case "EMAIL":
            return "Email";
        case "VOICE":
            return "Voice";
        default:
            return normalized.toLowerCase().replace(/_/g, " ");
    }
}

function getWaitChipVariant(input: {
    isWarning: boolean;
    isBreached: boolean;
    resolvedAt: string | null;
    acceptedAt: string | null;
    assignedAt: string | null;
}) {
    if (input.resolvedAt) return "dashboard-status-chip--neutral";
    if (input.acceptedAt) return "dashboard-status-chip--success";
    if (input.assignedAt) return "dashboard-status-chip--warning";
    if (input.isBreached) return "dashboard-status-chip--danger";
    if (input.isWarning) return "dashboard-status-chip--warning";
    return "dashboard-status-chip--info";
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
    onLoadMore,
    isFetchingMore,
    hasMore,
}: EscalationsListProps) {
    const activeConversationId = useAgentInboxStore((s) => s.activeConversationId);
    const unreadCountByConversationId = useAgentInboxStore((s) => s.unreadCountByConversationId);
    const messagesByConversationId = useAgentInboxStore((s) => s.messagesByConversationId);
    const lastClaimErrorByConversationId = useAgentInboxStore((s) => s.lastClaimErrorByConversationId);
    const isDetailsOpen = useAgentInboxStore((s) => s.isDetailsOpen);

    const tabs: QueueTab[] = [
        { id: "all", label: "Active", count: counts.all - counts.resolved - counts.closed },
        { id: "unassigned", label: "Unassigned", count: counts.unassigned },
        { id: "mine", label: "Mine", count: counts.mine },
        { id: "resolved", label: "Resolved", count: counts.resolved },
        { id: "closed", label: "Closed", count: counts.closed },
    ];

    const activeTab = tabs.find((tab) => tab.id === activeQueue) ?? tabs[0];

    return (
        <div
            className={cn(
                "flex shrink-0 flex-col border-r border-border/70 bg-card transition-[width] duration-300",
                isDetailsOpen
                    ? "w-[clamp(252px,25vw,360px)] xl:w-[clamp(272px,26vw,380px)]"
                    : "w-[clamp(272px,31vw,420px)]"
            )}
        >
            <div className="border-b border-border/60 bg-card px-3 py-3 sm:px-4">
                <div className="rounded-[var(--panel-radius-md)] border border-border/70 bg-[var(--surface-secondary)] p-3 shadow-[var(--shadow-1)]">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                Inbox Queue
                            </p>
                            <p className="mt-1 truncate text-sm font-semibold text-foreground">
                                Escalations
                            </p>
                        </div>
                        <span className="dashboard-status-chip dashboard-status-chip--neutral shrink-0">
                            <Filter className="size-3" />
                            <span>{activeTab.count}</span>
                            <span className="hidden sm:inline">{activeTab.label}</span>
                        </span>
                    </div>

                    <div className="mt-3 dashboard-search-shell bg-card">
                        <div className="relative flex-1">
                            <Search className="absolute left-0 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                className="w-full bg-transparent py-1.5 pl-7 pr-1 text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground"
                                placeholder="Search by ID or exact email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="-mx-1 mt-3 overflow-x-auto px-1 pb-1">
                        <div className="flex min-w-max items-center gap-1.5">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => onQueueChange(tab.id)}
                                    className={cn(
                                        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-[12px] font-semibold whitespace-nowrap transition-all",
                                        activeQueue === tab.id
                                            ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-1)]"
                                            : "border-border/70 bg-card text-muted-foreground hover:border-primary/20 hover:bg-background hover:text-foreground"
                                    )}
                                >
                                    {tab.label}
                                    {tab.count > 0 && (
                                        <span
                                            className={cn(
                                                "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                                                activeQueue === tab.id
                                                    ? "bg-primary-foreground/20 text-primary-foreground"
                                                    : "bg-[var(--surface-secondary)] text-foreground"
                                            )}
                                        >
                                            {tab.count}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto bg-[var(--surface-secondary)] px-3 py-3 sm:px-4">
                {isLoading ? (
                    <div className="space-y-3">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className="rounded-[var(--panel-radius-md)] border border-border/70 bg-card px-3 py-3 shadow-[var(--shadow-1)] sm:px-4"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex min-w-0 items-start gap-3">
                                        <Skeleton className="size-7 rounded-full" />
                                        <div className="min-w-0 space-y-2">
                                            <Skeleton className="h-4 w-24" />
                                            <Skeleton className="h-5 w-32 rounded-full" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Skeleton className="h-5 w-14 rounded-full" />
                                        <Skeleton className="ml-auto h-5 w-6 rounded-full" />
                                    </div>
                                </div>
                                <div className="mt-3 rounded-[var(--panel-radius-sm)] border border-border/60 bg-[var(--surface-secondary)] px-3 py-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="mt-2 h-4 w-4/5" />
                                </div>
                                <div className="mt-3 flex items-center justify-between gap-3 border-t border-border/60 pt-3">
                                    <div className="space-y-2">
                                        <Skeleton className="h-3 w-28" />
                                        <Skeleton className="h-3 w-20" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-8 w-16 rounded-[var(--radius-input)]" />
                                        <Skeleton className="size-8 rounded-[var(--radius-input)]" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : inboxItems.length > 0 ? (
                    <div className="space-y-3">
                        {inboxItems.map((e) => {
                            const isActive = activeConversationId === e.conversationId;
                            const isMine = Boolean(agentUserId) && e.agentUserId === agentUserId;
                            const isAssigned = Boolean(e.agentUserId);
                            const waitingForAgent =
                                (e.conversationState || "").toUpperCase() === "ESCALATED_UNASSIGNED";
                            const canClaim = waitingForAgent && !isAssigned;
                            const unread = Math.max(
                                0,
                                (unreadCountByConversationId[e.conversationId] ?? 0) + (e.unreadCount ?? 0)
                            );
                            const lastMsgList = messagesByConversationId[e.conversationId] ?? [];
                            const lastUserMsg = [...lastMsgList].reverse().find((m) => m.senderType === "USER");
                            const primaryReason = (e.reason || "").trim();
                            const lastMsgText = (lastUserMsg?.text || "").trim();
                            const messagePreview =
                                lastMsgText && (!primaryReason || lastMsgText.toLowerCase() !== primaryReason.toLowerCase())
                                    ? lastMsgText
                                    : e.lastUserMessage?.trim() || primaryReason || "Open chat";
                            const { timeText, isWarning, isBreached } = e.lastMessageAt
                                ? getWaitStats(e.lastMessageAt)
                                : getWaitStats(e.requestedAt);
                            const waitChipVariant = getWaitChipVariant({
                                isWarning,
                                isBreached,
                                resolvedAt: e.resolvedAt,
                                acceptedAt: e.acceptedAt,
                                assignedAt: e.assignedAt,
                            });
                            const claimErr = lastClaimErrorByConversationId[e.conversationId];
                            const contactName = e.contactName || "Visitor";
                            const channelLabel = getChannelLabel(e.channel);
                            const assigneeLabel = e.agentDisplayName || "None";
                            const stateConfig =
                                conversationStateIconMap[e.conversationState || ""] || conversationStateIconMap.CLOSED;

                            return (
                                <div
                                    key={e.escalationId}
                                    onClick={() => onSelectRow(e.conversationId)}
                                    className={cn(
                                        "group relative cursor-pointer overflow-hidden rounded-[var(--panel-radius-md)] border bg-card px-3 py-3 shadow-[var(--shadow-1)] transition-all sm:px-4",
                                        isActive
                                            ? "border-primary/30 bg-[var(--bg-accent-selected)] shadow-[var(--shadow-2)]"
                                            : "border-border/70 hover:border-primary/15 hover:bg-card"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "absolute inset-y-3 left-1 w-1 rounded-full bg-primary transition-opacity",
                                            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                                        )}
                                    />

                                    <div className="flex items-start justify-between gap-3 pl-2">
                                        <div className="flex min-w-0 items-start gap-3">
                                            <div className={stateConfig.wrapperClass} title={e.conversationState || "CLOSED"}>
                                                <div
                                                    className="size-4 bg-current"
                                                    style={{
                                                        WebkitMaskImage: `url(/icons/${stateConfig.icon}.svg)`,
                                                        WebkitMaskSize: "contain",
                                                        WebkitMaskRepeat: "no-repeat",
                                                        WebkitMaskPosition: "center",
                                                        maskImage: `url(/icons/${stateConfig.icon}.svg)`,
                                                        maskSize: "contain",
                                                        maskRepeat: "no-repeat",
                                                        maskPosition: "center",
                                                    }}
                                                />
                                            </div>

                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="truncate text-sm font-semibold text-foreground sm:text-[15px]">
                                                        {contactName}
                                                    </span>
                                                    {isMine && (
                                                        <span className="dashboard-status-chip dashboard-status-chip--success hidden shrink-0 sm:inline-flex">
                                                            <Check className="size-3" />
                                                            Mine
                                                        </span>
                                                    )}
                                                </div>

                                                {primaryReason && (
                                                    <div className="mt-1 flex items-center gap-1.5">
                                                        <span
                                                            className="dashboard-status-chip dashboard-status-chip--info max-w-[150px] truncate sm:max-w-[220px]"
                                                            title={primaryReason}
                                                        >
                                                            {primaryReason}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex shrink-0 flex-col items-end gap-1">
                                            <span className={cn("dashboard-status-chip", waitChipVariant)}>
                                                {isBreached ? <AlertTriangle className="size-3" /> : <span className="size-1.5 rounded-full bg-current" />}
                                                {timeText}
                                            </span>
                                            {unread > 0 && (
                                                <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground shadow-[var(--shadow-1)]">
                                                    {unread}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-3 rounded-[var(--panel-radius-sm)] border border-border/60 bg-[var(--surface-secondary)] px-3 py-2.5">
                                        <p
                                            className={cn(
                                                "min-h-0 text-sm leading-5 text-muted-foreground line-clamp-1 sm:line-clamp-2",
                                                claimErr && "font-medium text-[var(--status-danger-fg)]"
                                            )}
                                            title={claimErr ? `Claim failed: ${claimErr}` : messagePreview}
                                        >
                                            {claimErr ? `Claim failed: ${claimErr}` : messagePreview}
                                        </p>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between gap-3 border-t border-border/60 pt-3 pl-2">
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                                <span className="shrink-0 font-medium uppercase tracking-[0.14em]">
                                                    Assigned
                                                </span>
                                                <span className="truncate text-foreground">{assigneeLabel}</span>
                                            </div>
                                            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                                <span className="shrink-0 font-medium uppercase tracking-[0.14em]">
                                                    Channel
                                                </span>
                                                <span className="truncate text-foreground/80">{channelLabel}</span>
                                            </div>
                                        </div>

                                        <div className="flex shrink-0 items-center gap-1.5">
                                            {isAssigned && (
                                                <div
                                                    className="flex size-7 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-[var(--surface-secondary)]"
                                                    title={`Working on it: ${assigneeLabel}`}
                                                >
                                                    {e.agentAvatarUrl ? (
                                                        <img
                                                            src={e.agentAvatarUrl}
                                                            alt={assigneeLabel}
                                                            className="size-full object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-[10px] font-semibold text-foreground">
                                                            {assigneeLabel.charAt(0).toUpperCase()}
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            {canClaim && (
                                                <Button
                                                    variant="default"
                                                    size="sm"
                                                    className="h-8 px-3 text-xs shadow-[var(--shadow-1)]"
                                                    onClick={(evt) => {
                                                        evt.preventDefault();
                                                        evt.stopPropagation();
                                                        onClaim(e);
                                                    }}
                                                >
                                                    <UserPlus className="size-3.5" />
                                                    Claim
                                                </Button>
                                            )}

                                            {canClaim && (
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="hidden h-8 w-8 sm:inline-flex"
                                                    onClick={(evt) => {
                                                        evt.preventDefault();
                                                        evt.stopPropagation();
                                                        navigator.clipboard.writeText(e.conversationId);
                                                        toast.success("Copied ID");
                                                    }}
                                                >
                                                    <Copy className="size-3.5" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <div className="w-full rounded-[var(--panel-radius-md)] border border-dashed border-border/70 bg-card p-8 text-center shadow-[var(--shadow-1)]">
                            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full border border-border/70 bg-[var(--surface-secondary)]">
                                <MessageSquare className="size-5 text-muted-foreground" />
                            </div>
                            <h3 className="text-sm font-semibold text-foreground">
                                No {activeTab.label.toLowerCase()} escalations
                            </h3>
                            <p className="mt-2 text-xs leading-5 text-muted-foreground">
                                New conversations will appear here as soon as they need attention.
                            </p>
                        </div>
                    </div>
                )}

                {inboxItems.length > 0 && hasMore && (
                    <div className="pt-3">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={onLoadMore}
                            disabled={isFetchingMore}
                            className="w-full bg-card text-muted-foreground hover:bg-background"
                        >
                            {isFetchingMore ? (
                                <span className="flex items-center gap-2">
                                    <span className="size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                    Loading...
                                </span>
                            ) : "Load More"}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
