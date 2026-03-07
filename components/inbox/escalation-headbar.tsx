"use client";

import { useAgentInboxStore } from "@/store/agent-inbox";
import { useSocketStore } from "@/store/websocket";
import { ConnectionState } from "@/types/websocket";
import { Button } from "@/components/ui/button";
import { MessageCircle, UserPlus, Check, X, ArrowRightLeft, Ticket, Loader2, Info } from "lucide-react";

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

    return (
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card z-10 shrink-0">
            <div className="flex items-center gap-4 min-w-0 pr-4">
                <div className="flex items-center gap-2 truncate">
                    <MessageCircle className="size-5 text-primary shrink-0" />
                    <span className="font-bold truncate" title={headerTitle}>Active Chat: {headerTitle}</span>
                </div>
                <span className="text-xs text-muted-foreground px-2 py-1 bg-[--surface-secondary] rounded uppercase tracking-wider shrink-0 font-medium">
                    ID: {activeConversationId?.slice(-6) || "----"}
                </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
                {waitingForAgent && (
                    <Button onClick={onClaim} className="flex items-center gap-2 h-8 px-3 text-sm rounded-lg shadow-sm">
                        <UserPlus className="size-4" /> Claim
                    </Button>
                )}

                {assigned === agentUserId && (
                    <>
                        <Button
                            onClick={onResolve}
                            disabled={isResolving || isClosing}
                            variant="secondary"
                            className="flex items-center gap-2 h-8 px-3 text-sm rounded-lg"
                        >
                            {isResolving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
                            Resolve
                        </Button>

                        <Button
                            onClick={onClose}
                            disabled={isResolving || isClosing}
                            variant="ghost"
                            className="flex items-center gap-2 h-8 px-3 text-sm rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        >
                            {isClosing ? <Loader2 className="size-4 animate-spin" /> : <X className="size-4" />}
                            Close
                        </Button>

                        <Button
                            onClick={onTransferClick}
                            variant="secondary"
                            className="flex items-center gap-2 h-8 px-3 text-sm rounded-lg"
                        >
                            <ArrowRightLeft className="size-4" /> Transfer
                        </Button>
                    </>
                )}

                <Button
                    onClick={onTicketClick}
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-lg"
                    title="Convert to Ticket"
                >
                    <Ticket className="size-4" />
                </Button>

                <Button
                    onClick={() => setDetailsOpen(!isDetailsOpen)}
                    variant={isDetailsOpen ? "default" : "secondary"}
                    size="icon"
                    className="h-8 w-8 rounded-lg ml-2"
                    title="Toggle Details"
                >
                    <Info className="size-4" />
                </Button>
            </div>
        </header>
    );
}
