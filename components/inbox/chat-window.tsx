"use client";

import { useState, useRef, useEffect } from "react";
import { useAgentInboxStore } from "@/store/agent-inbox";
import { useSocketStore } from "@/store/websocket";
import { cn } from "@/lib/utils";
import { ConnectionState } from "@/types/websocket";
import { Button } from "@/components/ui/button";
import { MarkdownRenderer } from "@/components/shared/markdown-renderer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
    MessageCircle,
    PlusCircle,
    Smile,
    Send,
    Bot,
    Sparkles,
    Eye,
    BookmarkPlus,
} from "lucide-react";
import { AiToolsPopover } from "./ai-tools-popover";
import { SaveToKBSheet } from "./save-to-kb-sheet";
import type { TicketPriority } from "@/types/escalate";

interface ChatWindowProps {
    agentUserId: string;
    botId: string;
    onSend: (text: string) => void;
    onClaim: () => void;
    /** Mark as RESOLVED — the issue was actually solved */
    onResolve: () => Promise<void>;
    /** Mark as CLOSED — support decided to dismiss the conversation */
    onClose: () => Promise<void>;
    /** Transfer to another agent  */
    onTransfer: (targetAgentUserId: string) => Promise<void>;
    /** Convert escalation to a support ticket */
    onTicket: (payload: { title: string; description?: string; priority?: TicketPriority }) => Promise<void>;
    isLoadingHistory: boolean;
}

export function ChatWindow({
    agentUserId,
    botId,
    onSend,
    onClaim,
    onResolve,
    onClose,
    onTransfer,
    onTicket,
    isLoadingHistory,
}: ChatWindowProps) {
    const activeConversationId = useAgentInboxStore((s) => s.activeConversationId);
    const escalationsById = useAgentInboxStore((s) => s.escalationsById);
    const escalationIdByConversationId = useAgentInboxStore((s) => s.escalationIdByConversationId);
    const messagesByConversationId = useAgentInboxStore((s) => s.messagesByConversationId);
    const stateByConversationId = useAgentInboxStore((s) => s.stateByConversationId);
    const viewersByConversationId = useAgentInboxStore((s) => s.viewersByConversationId);
    const userOnlineByConversationId = useAgentInboxStore((s) => s.userOnlineByConversationId);
    const connectionState = useSocketStore((s) => s.connectionState);

    const [draft, setDraft] = useState("");
    const scrollEndRef = useRef<HTMLDivElement>(null);
    const [saveTarget, setSaveTarget] = useState<{ userMessage: string; agentAnswer: string } | null>(null);

    // Auto-scroll to bottom when messages change or conversation switches
    useEffect(() => {
        if (scrollEndRef.current) {
            scrollEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [activeConversationId, messagesByConversationId]);

    const activeEscalationId = activeConversationId ? escalationIdByConversationId[activeConversationId] : undefined;
    const activeEscalation = activeEscalationId ? escalationsById[activeEscalationId] : undefined;
    const activeState = activeConversationId ? stateByConversationId[activeConversationId] : undefined;
    const activeMessages = activeConversationId ? (messagesByConversationId[activeConversationId] ?? []) : [];

    const handleSaveToKB = (agentText: string, idx: number) => {
        const preceding = [...activeMessages].slice(0, idx).reverse().find((m) => m.senderType === "USER");
        setSaveTarget({ userMessage: preceding?.text ?? "", agentAnswer: agentText });
    };

    // Live Presence data
    const activeViewers = activeConversationId ? (viewersByConversationId[activeConversationId] ?? []) : [];
    const isUserOnline = activeConversationId ? (userOnlineByConversationId[activeConversationId] ?? false) : false;
    const otherAgentsViewing = activeViewers.filter(v => v.agentUserId !== agentUserId);

    const assigned = activeEscalation?.agentUserId ?? activeState?.assignedAgentUserId ?? null;
    const isClosedOrResolved =
        activeState?.status === "RESOLVED" || activeState?.status === "CLOSED" ||
        (activeEscalation as any)?.status === "RESOLVED" || (activeEscalation as any)?.status === "CLOSED";
    const canSend = Boolean(agentUserId) && assigned === agentUserId && connectionState === ConnectionState.CONNECTED && !isClosedOrResolved;
    const canClaimAndSend = Boolean(agentUserId) && !assigned && connectionState === ConnectionState.CONNECTED && !isClosedOrResolved;
    const isInputActive = canSend || canClaimAndSend;

    if (!activeConversationId) {
        return (
            <main className="flex-1 flex flex-col bg-card shrink-0">
                {/* Empty state content */}
                <div className="flex-1 flex flex-col justify-center items-center bg-card text-muted-foreground">
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex size-16 items-center justify-center rounded-3xl border border-border/70 bg-[var(--surface-secondary)] shadow-xs">
                            <MessageCircle className="size-8 text-muted-foreground/45" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-foreground">No conversation selected</p>
                            <p className="text-xs text-muted-foreground mt-1">Select a chat from the left to view and reply.</p>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <>
        <main className="flex-1 flex flex-col bg-card shrink-0">
            {/* Pinned AI Summary Banner */}
            {activeEscalation?.reason && (
                <div className="shrink-0 border-b border-[var(--status-info-border)] bg-[var(--status-info-bg)] p-4 flex items-start gap-3 relative">
                    <Sparkles className="size-4 text-[var(--status-info-fg)] mt-0.5" />
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                            {isUserOnline && (
                                <div className="dashboard-status-chip dashboard-status-chip--success">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span>User Online</span>
                                </div>
                            )}
                        </div>
                        <div className="text-sm font-medium whitespace-pre-wrap text-[var(--status-info-fg)]">
                            {activeEscalation.reason}
                        </div>
                    </div>
                </div>
            )}

            {/* Agent Collision Banner */}
            {otherAgentsViewing.length > 0 && (
                <div className="flex items-center justify-center gap-2 border-b border-[var(--status-warning-border)] bg-[var(--status-warning-bg)] px-3 py-2 shrink-0 shadow-sm z-10">
                    <Eye className="size-3.5 text-[var(--status-warning-fg)] animate-pulse" />
                    <span className="text-xs font-semibold text-[var(--status-warning-fg)]">
                        {otherAgentsViewing.length === 1
                            ? `Agent ${otherAgentsViewing[0].agentDisplayName || otherAgentsViewing[0].agentUserId.substring(0, 6)} is currently viewing this conversation.`
                            : `${otherAgentsViewing.length} other agents are viewing this conversation.`
                        }
                    </span>
                </div>
            )}

            {/* Chat History Area */}
            <div className="flex-1 overflow-hidden flex flex-col bg-[var(--surface-secondary)]">
                <div className="flex-1 overflow-y-auto p-6 space-y-6">

                    {/* Date Divider */}
                    <div className="flex justify-center">
                        <span className="dashboard-status-chip dashboard-status-chip--neutral">Conversation History</span>
                    </div>

                    {isLoadingHistory ? (
                        <div className="space-y-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                // Skeleton: even indices (0, 2) = AI/Agent on left, odd indices (1, 3) = User on right
                                <div key={i} className={cn("flex items-start gap-3", i % 2 === 0 ? "justify-start" : "flex-row-reverse ml-auto")}>
                                    <Skeleton className="size-8 rounded-full shrink-0" />
                                    <Skeleton className="h-16 w-64 rounded-xl" />
                                </div>
                            ))}
                        </div>
                    ) : activeMessages.length === 0 ? (
                        <p className="text-sm text-center text-muted-foreground mt-10">No messages yet.</p>
                    ) : (
                        activeMessages.map((m, idx) => {
                            const isUser = m.senderType === "USER";
                            const isAgent = m.senderType === "AGENT";
                            const isAssistant = m.senderType === "ASSISTANT";
                            const isSystem = m.senderType === "SYSTEM";
                            const isVerboseEscalationMsg = isAssistant && m.text.includes("I've routed this conversation");

                            if (isSystem || isVerboseEscalationMsg) {
                                return (
                                    <div key={m.id || idx} className="flex justify-center py-2">
                                            <div className="flex items-center gap-2 rounded-full border border-border/50 bg-card px-3 py-1.5 shadow-xs">
                                                {isVerboseEscalationMsg && <Bot className="size-3.5 text-muted-foreground shrink-0" />}
                                                <div className="text-xs text-muted-foreground font-medium text-center">
                                                {isVerboseEscalationMsg ? (
                                                    <span>⚡️ AI escalated the conversation - Reason: {activeEscalation?.reason || "User requested human"}</span>
                                                ) : (
                                                    <MarkdownRenderer>{m.text}</MarkdownRenderer>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            // AI and Agent messages on left, User messages on right
                            const isLeftSide = isAssistant || isAgent;
                            const isRightSide = isUser;

                            return (
                                <div key={m.id || idx} className={cn("group/msg flex items-start gap-3 max-w-[80%]", isRightSide ? "flex-row-reverse ml-auto" : "justify-start")}>
                                    {/* Avatar */}
                                    {isUser && (
                                        <Avatar className="size-8 border shadow-sm">
                                            <AvatarFallback className="bg-[--surface-secondary] text-muted-foreground text-xs">U</AvatarFallback>
                                        </Avatar>
                                    )}
                                    {isAssistant && (
                                        <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-sm border border-primary">
                                            <Bot className="size-4" />
                                        </div>
                                    )}
                                    {isAgent && (
                                        <Avatar className="size-8 border shadow-sm">
                                            <AvatarImage src={activeEscalation?.agentAvatarUrl || activeState?.assignedAgentAvatarUrl || ""} />
                                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                                {assigned === agentUserId ? "Me" : "A"}
                                            </AvatarFallback>
                                        </Avatar>
                                    )}

                                    <div className={cn("space-y-1 items-start flex flex-col min-w-0 max-w-[85%]", isRightSide && "items-end")}>
                                        <div className={cn(
                                            "rounded-2xl px-4 py-2 text-base font-medium leading-relaxed shadow-sm",
                                            isUser && "bg-primary text-primary-foreground",
                                            isAgent && "bg-card border border-border/70 text-foreground",
                                            isAssistant && "bg-white/75 border border-border/60 text-foreground"
                                        )}>
                                            {isAssistant && (
                                                <div className="flex items-center gap-1 mb-1">
                                                    <span className="text-[10px] font-bold text-primary uppercase tracking-tight flex items-center gap-0.5">
                                                        <Bot className="size-3" /> AI Assistant
                                                    </span>
                                                </div>
                                            )}
                                            <div className={cn("break-words whitespace-pre-wrap")}>
                                                <MarkdownRenderer>{m.text}</MarkdownRenderer>
                                            </div>
                                        </div>
                                        <span className="text-[11px] text-muted-foreground px-1 tabular-nums">
                                            {m.sentAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                            {isUser && " • Sent"}
                                        </span>
                                        {isAgent && !isClosedOrResolved && (
                                            <button
                                                onClick={() => handleSaveToKB(m.text, idx)}
                                                className="opacity-0 group-hover/msg:opacity-100 transition-opacity flex items-center gap-1 px-1.5 py-0.5 rounded text-xs text-muted-foreground hover:text-primary hover:bg-muted"
                                                title="Save to knowledge base"
                                            >
                                                <BookmarkPlus className="size-3" />
                                                Save to KB
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                    <div ref={scrollEndRef} className="h-1" />
                </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-card border-t border-border/70 shrink-0">
                <div className={cn(
                    "flex items-center gap-2 rounded-[var(--panel-radius-md)] border bg-[var(--surface-secondary)] p-2 transition-all shadow-xs",
                    isInputActive
                        ? "border-border focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30"
                        : "border-border/50 opacity-60 pointer-events-none"
                )}>
                    <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                        <PlusCircle className="size-5" />
                    </button>
                    <input
                        className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-1 outline-none font-medium"
                        placeholder={canSend ? "Type a message..." : canClaimAndSend ? "Reply to claim this conversation..." : "Conversation closed"}
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        disabled={!isInputActive}
                        onFocus={() => {
                            if (canClaimAndSend) {
                                onClaim();
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                if (draft.trim() && isInputActive) {
                                    if (canClaimAndSend) {
                                        onClaim();
                                    }
                                    onSend(draft);
                                    setDraft("");
                                }
                            }
                        }}
                    />
                    <div className="flex items-center gap-1">
                        <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                            <Smile className="size-5" />
                        </button>
                        <AiToolsPopover
                            draft={draft}
                            onReplace={setDraft}
                            messages={activeMessages}
                            disabled={!isInputActive}
                        />
                        <Button
                            size="icon"
                            disabled={!isInputActive || !draft.trim()}
                            className="size-9 rounded-lg shadow-sm"
                            onClick={() => {
                                if (canClaimAndSend) {
                                    onClaim();
                                }
                                onSend(draft);
                                setDraft("");
                            }}
                        >
                            <Send className="size-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </main>

        <SaveToKBSheet
            open={!!saveTarget}
            onOpenChange={(open) => { if (!open) setSaveTarget(null); }}
            userMessage={saveTarget?.userMessage ?? ""}
            agentAnswer={saveTarget?.agentAnswer ?? ""}
            botId={botId}
        />
        </>
    );
}
