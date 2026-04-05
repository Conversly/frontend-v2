"use client";

import { useAgentInboxStore } from "@/store/agent-inbox";
import { useSocketStore } from "@/store/websocket";
import { ConnectionState } from "@/types/websocket";
import { Button } from "@/components/ui/button";
import { MessageCircle, UserPlus, Check, X, ArrowRightLeft, Ticket, Loader2, Info, Wifi, WifiOff } from "lucide-react";

interface EscalationHeadbarProps {
    agentUserId: string;
    onClaim: () => void;
    onResolve: () => void;
    onClose: () => void;
    onTransferClick: () => void;
    onTicketClick: () => void;
    isResolving: boolean;
    isClosing: boolean;
}

export function EscalationHeadbar({
    agentUserId,
    onClaim,
    onResolve,
    onClose,
    onTransferClick,
    onTicketClick,
    isResolving,
    isClosing,
}: EscalationHeadbarProps) {
    const activeConversationId = useAgentInboxStore((s) => s.activeConversationId);
    const escalationsById = useAgentInboxStore((s) => s.escalationsById);
    const escalationIdByConversationId = useAgentInboxStore((s) => s.escalationIdByConversationId);
    const stateByConversationId = useAgentInboxStore((s) => s.stateByConversationId);
    const connectionState = useSocketStore((s) => s.connectionState);

    const isDetailsOpen = useAgentInboxStore((s) => s.isDetailsOpen);
    const setDetailsOpen = useAgentInboxStore((s) => s.setDetailsOpen);

    const activeEscalationId = activeConversationId ? escalationIdByConversationId[activeConversationId] : undefined;
    const activeEscalation = activeEscalationId ? escalationsById[activeEscalationId] : undefined;
    const activeState = activeConversationId ? stateByConversationId[activeConversationId] : undefined;

    const assigned = activeEscalation?.agentUserId ?? activeState?.assignedAgentUserId ?? null;

    const waitingForAgent =
        (activeEscalation?.conversationState || "").toUpperCase() === "ESCALATED_UNASSIGNED" &&
        !assigned;

    const headerTitle = activeEscalation?.lastUserMessage || activeEscalation?.reason || "Select a chat";
    const connectionLabel = connectionState === ConnectionState.CONNECTED ? "Connected" : "Offline";
    const connectionClass =
        connectionState === ConnectionState.CONNECTED
            ? "dashboard-status-chip dashboard-status-chip--success"
            : "dashboard-status-chip dashboard-status-chip--danger";

    return (
        <header className="flex h-18 shrink-0 items-center justify-between gap-4 border-b border-border/70 bg-card px-6 py-3 z-10">
            <div className="flex min-w-0 items-center gap-4 pr-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-border/70 bg-[var(--surface-secondary)] text-primary shadow-xs">
                    <MessageCircle className="size-5 shrink-0" />
                </div>
                <div className="min-w-0">
                    <div className="mb-1 flex items-center gap-2">
                        <span className={connectionClass}>
                            {connectionState === ConnectionState.CONNECTED ? <Wifi className="size-3" /> : <WifiOff className="size-3" />}
                            {connectionLabel}
                        </span>
                        <span className="dashboard-status-chip dashboard-status-chip--neutral">
                            ID: {activeConversationId?.slice(-6) || "----"}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 truncate">
                        <span className="truncate text-sm font-semibold tracking-[-0.01em]" title={headerTitle}>Active Chat: {headerTitle}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
                {waitingForAgent && (
                    <Button onClick={onClaim} className="h-9 px-4 text-sm shadow-sm">
                        <UserPlus className="size-4" /> Claim
                    </Button>
                )}

                {assigned === agentUserId && (
                    <>
                        <Button
                            onClick={onResolve}
                            disabled={isResolving || isClosing}
                            variant="outline"
                            className="h-9 border-[var(--status-success-border)] bg-[var(--status-success-bg)] text-[var(--status-success-fg)] hover:brightness-95"
                        >
                            {isResolving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
                            Resolve
                        </Button>

                        <Button
                            onClick={onClose}
                            disabled={isResolving || isClosing}
                            variant="outline"
                            className="h-9 border-[var(--status-danger-border)] bg-[var(--status-danger-bg)] text-[var(--status-danger-fg)] hover:brightness-95"
                        >
                            {isClosing ? <Loader2 className="size-4 animate-spin" /> : <X className="size-4" />}
                            Close
                        </Button>

                        <Button
                            onClick={onTransferClick}
                            variant="outline"
                            className="h-9 border-[var(--status-warning-border)] bg-[var(--status-warning-bg)] text-[var(--status-warning-fg)] hover:brightness-95"
                        >
                            <ArrowRightLeft className="size-4" /> Transfer
                        </Button>
                    </>
                )}

                <Button
                    onClick={onTicketClick}
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-xl"
                    title="Convert to Ticket"
                >
                    <Ticket className="size-4" />
                </Button>

                <Button
                    onClick={() => setDetailsOpen(!isDetailsOpen)}
                    variant={isDetailsOpen ? "default" : "outline"}
                    size="icon"
                    className="ml-1 h-9 w-9 rounded-xl"
                    title="Toggle Details"
                >
                    <Info className="size-4" />
                </Button>
            </div>
        </header>
    );
}
