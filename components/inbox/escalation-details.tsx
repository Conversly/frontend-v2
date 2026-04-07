"use client";

import { useAgentInboxStore } from "@/store/agent-inbox";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Globe, MessageCircle, MessageSquare, Zap, History, ChevronRight, Loader2, IterationCcw, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { listTickets } from "@/lib/api/tickets";
import { listContactConversations } from "@/lib/api/activity";

function getCountryName(code?: string | null): string {
    if (!code || code === "NaN") return "Unknown";
    try {
        const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
        return regionNames.of(code.toUpperCase()) ?? code;
    } catch {
        return code;
    }
}

function getChannelIcon(channel?: string) {
    const c = (channel || "").toUpperCase();
    switch (c) {
        case "WHATSAPP":
            return <MessageSquare className="size-4 text-green-600" />;
        case "WIDGET":
            return <MessageCircle className="size-4 text-primary" />;
        default:
            return <Globe className="size-4 text-muted-foreground" />;
    }
}

export function EscalationDetails() {
    const activeConversationId = useAgentInboxStore((s) => s.activeConversationId);
    const escalationsById = useAgentInboxStore((s) => s.escalationsById);
    const conversationsById = useAgentInboxStore((s) => s.conversationsById);
    const escalationIdByConversationId = useAgentInboxStore((s) => s.escalationIdByConversationId);
    const stateByConversationId = useAgentInboxStore((s) => s.stateByConversationId);

    const activeEscalationId = activeConversationId ? escalationIdByConversationId[activeConversationId] : undefined;
    const activeEscalation = activeEscalationId ? escalationsById[activeEscalationId] : undefined;
    const activeState = activeConversationId ? stateByConversationId[activeConversationId] : undefined;
    const activeConversation = activeConversationId ? conversationsById[activeConversationId] : undefined;

    const workspaceId = activeConversation?.workspaceId;
    const contactId = activeEscalation?.contactId;

    const { data: ticketsResponse, isLoading: isTicketsLoading } = useQuery({
        queryKey: ["tickets", workspaceId, contactId],
        queryFn: () => listTickets({ workspaceId: workspaceId!, contactId: contactId! }),
        enabled: !!workspaceId && !!contactId,
    });

    const { data: pastConversations, isLoading: isConversationsLoading } = useQuery({
        queryKey: ["contact-conversations", contactId],
        queryFn: () => listContactConversations(contactId!, 5),
        enabled: !!contactId,
    });

    const previousTickets = ticketsResponse?.data?.data || [];
    // Filter out the active conversation from the list
    const previousConversations = (pastConversations || []).filter(c => c.conversationId !== activeConversationId);

    if (!activeConversationId) {
        return (
            <aside className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                <Globe className="size-10 text-muted opacity-50 mb-3" />
                <p className="text-sm">Context will appear here</p>
            </aside>
        );
    }

    const userName = activeEscalation?.contactName || "Unknown Visitor";
    const userEmail = activeEscalation?.contactEmail || "—";
    const countryCode = activeEscalation?.contactCountryCode;
    const countryName = getCountryName(countryCode);

    const isAiEscalated = (activeEscalation?.reason || "").toLowerCase().includes("human") || true;

    return (
        <aside className="w-full h-full flex flex-col bg-card overflow-hidden text-sm">

            <div className="flex-1 overflow-y-auto w-full custom-scrollbar">
                {/* Visitor Info Section */}
                <section className="p-6 border-b border-border w-full">
                    <div className="flex items-center gap-4 mb-6">
                        <Avatar className="size-16 rounded-2xl shadow-sm border border-border">
                            <AvatarFallback className="rounded-2xl bg-[--surface-secondary] text-muted-foreground">
                                <User className="size-7" />
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-lg font-bold truncate pr-3">{userName}</h2>
                            <p className="text-xs text-muted-foreground">{countryName}</p>
                        </div>
                    </div>

                    <div className="dashboard-panel-muted space-y-4 rounded-[var(--panel-radius-sm)] p-4">
                        <div className="flex items-center gap-3">
                            <Mail className="size-5 text-muted-foreground" />
                            <div className="flex-1 overflow-hidden">
                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wide">Email</p>
                                <p className="text-sm font-medium truncate" title={userEmail}>{userEmail}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Globe className="size-5 text-muted-foreground" />
                            <div className="flex-1">
                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wide">Country</p>
                                <p className="text-sm font-medium">{countryName}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Conversation Info Section */}
                <section className="p-6 border-b border-border">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Conversation Details</h3>
                    <div className="dashboard-panel-muted space-y-3 rounded-[var(--panel-radius-sm)] p-4">
                        <div className="flex justify-between items-center py-2 border-b border-[--surface-secondary]">
                            <span className="text-sm text-muted-foreground">Channel</span>
                            <span className="text-sm font-medium flex items-center gap-1.5">
                                {getChannelIcon(activeEscalation?.channel)}
                                {String(activeEscalation?.channel || "WIDGET").charAt(0).toUpperCase() + String(activeEscalation?.channel || "WIDGET").slice(1).toLowerCase()}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-[--surface-secondary]">
                            <span className="text-sm text-muted-foreground">Started</span>
                            <span className="text-sm font-medium">
                                {activeEscalation?.requestedAt ? new Date(activeEscalation.requestedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "—"}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-sm text-muted-foreground">Escalated</span>
                            {isAiEscalated ? (
                                <span className="dashboard-status-chip dashboard-status-chip--info">Yes (AI)</span>
                            ) : (
                                <span className="dashboard-status-chip dashboard-status-chip--neutral">Manual</span>
                            )}
                        </div>
                    </div>
                </section>

                {/* AI Summary Section */}
                <section className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Zap className="size-4 text-primary" />
                        <h3 className="text-xs font-bold text-primary uppercase tracking-widest">AI Summary</h3>
                    </div>
                    <div className="bg-[--surface-secondary]/50 p-4 rounded-xl border border-border">
                        <p className="text-xs leading-relaxed text-foreground">
                            {activeEscalation?.reason || "User requested to speak with a human agent."}
                        </p>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5"><History className="size-3" /> Previous Conversations</h3>
                        <div className="space-y-2">
                            {isConversationsLoading ? (
                                <div className="flex items-center justify-center p-4">
                                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                                </div>
                            ) : previousConversations.length > 0 ? (
                                previousConversations.map((conv) => (
                                    <div key={conv.conversationId} className="dashboard-list-row cursor-pointer group p-3">
                                        <div className="flex justify-between items-center mb-1">
                                            <p className="text-xs font-bold group-hover:text-primary transition-colors truncate capitalize">
                                                {(conv.state || "OPEN").toLowerCase().replace('_', ' ')}
                                            </p>
                                            <span className="text-[10px] text-muted-foreground">
                                                {conv.createdAt ? new Date(conv.createdAt).toLocaleDateString() : "—"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] text-muted-foreground truncate w-4/5">
                                                {conv.lastUserMessage || "No messages"}
                                            </span>
                                            <ChevronRight className="size-3.5 text-muted-foreground group-hover:text-primary shrink-0" />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-muted-foreground text-center py-4 bg-[--surface-secondary]/30 rounded-lg border border-border border-dashed">No past conversations</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5"><IterationCcw className="size-3" /> Previous Tickets</h3>
                        <div className="space-y-2">
                            {isTicketsLoading ? (
                                <div className="flex items-center justify-center p-4">
                                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                                </div>
                            ) : previousTickets.length > 0 ? (
                                previousTickets.map((ticket) => (
                                    <div key={ticket.id} className="dashboard-list-row cursor-pointer group p-3">
                                        <p className="text-xs font-bold mb-1 group-hover:text-primary transition-colors truncate">
                                            #{ticket.id.slice(0, 8).toUpperCase()}: {ticket.subject || "General Support"}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] text-muted-foreground capitalize">
                                                {ticket.status.toLowerCase().replace('_', ' ')} • {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : "—"}
                                            </span>
                                            <ChevronRight className="size-4 text-muted-foreground group-hover:text-primary" />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-muted-foreground text-center py-4 bg-[--surface-secondary]/30 rounded-lg border border-border border-dashed">No previous tickets</p>
                            )}
                        </div>
                    </div>
                </section>
            </div>

            <div className="mt-auto p-6 bg-[--surface-secondary]/30 border-t border-border w-full shrink-0">
                <Button variant="outline" className="w-full h-10 text-sm font-bold flex items-center justify-center gap-2 shadow-sm rounded-lg" onClick={() => console.log('View Activity Log')}>
                    <History className="size-4" /> View Activity Log
                </Button>
            </div>

        </aside>
    );
}
