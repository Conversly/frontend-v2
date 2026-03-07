"use client";

import { useState } from "react";
import { useAgentInboxStore } from "@/store/agent-inbox";
import { useSocketStore } from "@/store/websocket";
import { cn } from "@/lib/utils";
import { ConnectionState } from "@/types/websocket";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MarkdownRenderer } from "@/components/shared/markdown-renderer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    MessageCircle,
    UserPlus,
    Check,
    X,
    ArrowRightLeft,
    Ticket,
    PlusCircle,
    Smile,
    Send,
    Bot,
    Loader2,
} from "lucide-react";
import type { TicketPriority } from "@/types/escalate";
import { EscalationHeadbar } from "./escalation-headbar";

interface ChatWindowProps {
    agentUserId: string;
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
    const connectionState = useSocketStore((s) => s.connectionState);

    const [draft, setDraft] = useState("");

    // ── Resolve / Close button loading ──────────────────────────────────────
    const [isResolving, setIsResolving] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    // ── Transfer dialog state ────────────────────────────────────────────────
    const [transferOpen, setTransferOpen] = useState(false);
    const [transferAgentId, setTransferAgentId] = useState("");
    const [isTransferring, setIsTransferring] = useState(false);

    // ── Ticket dialog state ──────────────────────────────────────────────────
    const [ticketOpen, setTicketOpen] = useState(false);
    const [ticketTitle, setTicketTitle] = useState("");
    const [ticketDesc, setTicketDesc] = useState("");
    const [ticketPriority, setTicketPriority] = useState<TicketPriority>("MEDIUM");
    const [isCreatingTicket, setIsCreatingTicket] = useState(false);

    const activeEscalationId = activeConversationId ? escalationIdByConversationId[activeConversationId] : undefined;
    const activeEscalation = activeEscalationId ? escalationsById[activeEscalationId] : undefined;
    const activeState = activeConversationId ? stateByConversationId[activeConversationId] : undefined;
    const activeMessages = activeConversationId ? (messagesByConversationId[activeConversationId] ?? []) : [];

    const assigned = activeEscalation?.agentUserId ?? activeState?.assignedAgentUserId ?? null;
    const canSend = Boolean(agentUserId) && assigned === agentUserId && connectionState === ConnectionState.CONNECTED;

    const waitingForAgent =
        (activeEscalation?.conversationState || "").toUpperCase() === "ESCALATED_UNASSIGNED" &&
        !assigned;

    // ── Handlers ─────────────────────────────────────────────────────────────
    async function handleResolve() {
        setIsResolving(true);
        try { await onResolve(); } finally { setIsResolving(false); }
    }

    async function handleClose() {
        setIsClosing(true);
        try { await onClose(); } finally { setIsClosing(false); }
    }

    async function handleTransferSubmit() {
        if (!transferAgentId.trim()) return;
        setIsTransferring(true);
        try {
            await onTransfer(transferAgentId.trim());
            setTransferOpen(false);
            setTransferAgentId("");
        } finally {
            setIsTransferring(false);
        }
    }

    async function handleTicketSubmit() {
        if (!ticketTitle.trim()) return;
        setIsCreatingTicket(true);
        try {
            await onTicket({ title: ticketTitle.trim(), description: ticketDesc.trim() || undefined, priority: ticketPriority });
            setTicketOpen(false);
            setTicketTitle("");
            setTicketDesc("");
            setTicketPriority("MEDIUM");
        } finally {
            setIsCreatingTicket(false);
        }
    }

    if (!activeConversationId) {
        return (
            <main className="flex-1 flex flex-col bg-white border-r border-border shrink-0">
                {/* Header */}
                <div className="h-16 px-4 sm:px-6 bg-white border-b border-border flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="size-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                            <MessageCircle className="size-4 text-muted-foreground" />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-base font-bold text-foreground truncate">Active Chat</h2>
                            <p className="text-xs text-muted-foreground truncate">No conversation selected</p>
                        </div>
                    </div>
                </div>

                {/* Empty state content */}
                <div className="flex-1 flex flex-col justify-center items-center bg-white text-muted-foreground">
                    <div className="flex flex-col items-center gap-4">
                        <div className="size-16 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                            <MessageCircle className="size-8 text-gray-300" />
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
            <main className="flex-1 flex flex-col bg-card border-r border-border shrink-0">
                {/* Top Action Bar */}
                <EscalationHeadbar
                    agentUserId={agentUserId}
                    onClaim={onClaim}
                    onResolve={handleResolve}
                    onClose={handleClose}
                    onTransferClick={() => setTransferOpen(true)}
                    onTicketClick={() => setTicketOpen(true)}
                    isResolving={isResolving}
                    isClosing={isClosing}
                />

                {/* Chat History Area */}
                <div className="flex-1 overflow-hidden flex flex-col bg-[--surface-secondary]">
                    <ScrollArea className="flex-1">
                        <div className="p-6 space-y-6">

                            {/* Date Divider */}
                            <div className="flex justify-center">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted px-3 py-1 rounded-full">Conversation History</span>
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

                                    if (isSystem) {
                                        return (
                                            <div key={m.id || idx} className="flex justify-center py-2">
                                                <p className="text-xs text-muted-foreground italic">
                                                    <MarkdownRenderer>{m.text}</MarkdownRenderer>
                                                </p>
                                            </div>
                                        );
                                    }

                                    // AI and Agent messages on left, User messages on right
                                    const isLeftSide = isAssistant || isAgent;
                                    const isRightSide = isUser;

                                    return (
                                        <div key={m.id || idx} className={cn("flex items-start gap-3 max-w-[80%]", isRightSide ? "flex-row-reverse ml-auto" : "justify-start")}>
                                            {/* Avatar */}
                                            {isUser && (
                                                <Avatar className="size-8 border">
                                                    <AvatarFallback className="bg-[--surface-secondary] text-muted-foreground text-xs">U</AvatarFallback>
                                                </Avatar>
                                            )}
                                            {isAssistant && (
                                                <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-sm border border-primary">
                                                    <Bot className="size-4" />
                                                </div>
                                            )}
                                            {isAgent && (
                                                <Avatar className="size-8 border">
                                                    <AvatarImage src={activeEscalation?.agentAvatarUrl || activeState?.assignedAgentAvatarUrl || ""} />
                                                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                                        {assigned === agentUserId ? "Me" : "A"}
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}

                                            <div className={cn("space-y-1 items-start flex flex-col min-w-0", isRightSide && "items-end")}>
                                                <div className={cn(
                                                    "p-3 rounded-xl shadow-sm border",
                                                    isUser && "bg-primary text-primary-foreground rounded-tr-none border-primary",
                                                    isAgent && "bg-white rounded-tl-none border border-border",
                                                    isAssistant && "bg-[--surface-secondary] rounded-tl-none border border-border text-foreground"
                                                )}>
                                                    {isAssistant && (
                                                        <div className="flex items-center gap-1 mb-1">
                                                            <span className="text-[10px] font-bold text-primary uppercase tracking-tight flex items-center gap-0.5">
                                                                <Bot className="size-3" /> AI Assistant
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div className={cn("text-sm break-words whitespace-pre-wrap", isUser && "font-medium")}>
                                                        <MarkdownRenderer>{m.text}</MarkdownRenderer>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] text-muted-foreground px-1">
                                                    {m.sentAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                                    {isUser && " • Sent"}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </ScrollArea>
                </div>

                {/* Chat Input */}
                <div className="p-4 bg-card border-t border-border shrink-0">
                    <div className={cn(
                        "flex items-center gap-2 p-2 rounded-xl border transition-all bg-[--surface-secondary]",
                        canSend
                            ? "border-border focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30"
                            : "border-border/50 opacity-60 pointer-events-none"
                    )}>
                        <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                            <PlusCircle className="size-5" />
                        </button>
                        <input
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-1 outline-none font-medium"
                            placeholder={canSend ? "Type a message..." : "Claim this chat to reply"}
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            disabled={!canSend}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    if (draft.trim() && canSend) {
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
                            <Button
                                size="icon"
                                disabled={!canSend || !draft.trim()}
                                className="size-9 rounded-lg shadow-sm"
                                onClick={() => {
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

            {/* ── Transfer Dialog ──────────────────────────────────────────────────── */}
            <Dialog open={transferOpen} onOpenChange={setTransferOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <ArrowRightLeft className="size-4" /> Transfer Conversation
                        </DialogTitle>
                        <DialogDescription>
                            Enter the Agent User ID you want to transfer this conversation to.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-2">
                        <div className="space-y-2">
                            <Label htmlFor="transfer-agent-id">Target Agent ID</Label>
                            <Input
                                id="transfer-agent-id"
                                placeholder="e.g. agent_abc123"
                                value={transferAgentId}
                                onChange={(e) => setTransferAgentId(e.target.value)}
                                disabled={isTransferring}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setTransferOpen(false)} disabled={isTransferring}>
                            Cancel
                        </Button>
                        <Button onClick={handleTransferSubmit} disabled={!transferAgentId.trim() || isTransferring}>
                            {isTransferring ? <Loader2 className="size-4 animate-spin mr-2" /> : <ArrowRightLeft className="size-4 mr-2" />}
                            Transfer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* ── Create Ticket Dialog ─────────────────────────────────────────────── */}
            <Dialog open={ticketOpen} onOpenChange={setTicketOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Ticket className="size-4" /> Convert to Support Ticket
                        </DialogTitle>
                        <DialogDescription>
                            Create a support ticket from this conversation so it can be tracked and resolved outside the live chat flow.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-2">
                        <div className="space-y-2">
                            <Label htmlFor="ticket-title">
                                Title <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="ticket-title"
                                placeholder="Brief summary of the issue"
                                value={ticketTitle}
                                onChange={(e) => setTicketTitle(e.target.value)}
                                disabled={isCreatingTicket}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ticket-description">Description</Label>
                            <Textarea
                                id="ticket-description"
                                placeholder="Detailed description of the issue (optional)"
                                value={ticketDesc}
                                onChange={(e) => setTicketDesc(e.target.value)}
                                disabled={isCreatingTicket}
                                rows={4}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ticket-priority">Priority</Label>
                            <Select
                                value={ticketPriority}
                                onValueChange={(v) => setTicketPriority(v as TicketPriority)}
                                disabled={isCreatingTicket}
                            >
                                <SelectTrigger id="ticket-priority">
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="LOW">🟢 Low</SelectItem>
                                    <SelectItem value="MEDIUM">🟡 Medium</SelectItem>
                                    <SelectItem value="HIGH">🟠 High</SelectItem>
                                    <SelectItem value="URGENT">🔴 Urgent</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setTicketOpen(false)} disabled={isCreatingTicket}>
                            Cancel
                        </Button>
                        <Button onClick={handleTicketSubmit} disabled={!ticketTitle.trim() || isCreatingTicket}>
                            {isCreatingTicket ? <Loader2 className="size-4 animate-spin mr-2" /> : <Ticket className="size-4 mr-2" />}
                            Create Ticket
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
