"use client";

import { useAgentInboxStore } from "@/store/agent-inbox";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Globe, MessageCircle, MessageSquare, Zap, History, ChevronRight } from "lucide-react";

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
    const escalationIdByConversationId = useAgentInboxStore((s) => s.escalationIdByConversationId);
    const stateByConversationId = useAgentInboxStore((s) => s.stateByConversationId);

    const activeEscalationId = activeConversationId ? escalationIdByConversationId[activeConversationId] : undefined;
    const activeEscalation = activeEscalationId ? escalationsById[activeEscalationId] : undefined;
    const activeState = activeConversationId ? stateByConversationId[activeConversationId] : undefined;

    if (!activeConversationId) {
        return (
            <aside className="w-80 border-l border-border bg-[--surface-secondary] flex flex-col items-center justify-center text-muted-foreground">
                <Globe className="size-10 text-muted opacity-50 mb-3" />
                <p className="text-sm">Context will appear here</p>
            </aside>
        );
    }

    // Simulated User Data until backend contact mapping is wired up
    const userName = activeEscalation?.lastUserMessage ? "Chat Visitor" : "Unknown Visitor";
    const userLocation = "United States";
    const userEmail = "visitor@example.com";

    const isAiEscalated = (activeEscalation?.reason || "").toLowerCase().includes("human") || true;

    return (
        <aside className="w-80 border-l border-border bg-card flex flex-col overflow-y-auto shrink-0">

            {/* Visitor Info Section */}
            <section className="p-6 border-b border-border">
                <div className="flex items-center gap-4 mb-6">
                    <Avatar className="size-16 rounded-2xl shadow-sm border border-border">
                        <AvatarImage src={"https://i.pravatar.cc/150?u=" + activeConversationId} alt="Profile" />
                        <AvatarFallback className="rounded-2xl text-xl font-bold bg-[--surface-secondary] text-muted-foreground">
                            {userName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-lg font-bold truncate pr-3">{userName}</h2>
                        <p className="text-xs text-muted-foreground">{userLocation}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Mail className="size-5 text-muted-foreground" />
                        <div className="flex-1">
                            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wide">Email</p>
                            <p className="text-sm font-medium">{userEmail}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Globe className="size-5 text-muted-foreground" />
                        <div className="flex-1">
                            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wide">Country</p>
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-medium">{userLocation}</p>
                                <span className="text-xs">🇺🇸</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Conversation Info Section */}
            <section className="p-6 border-b border-border">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Conversation Details</h3>
                <div className="space-y-3">
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
                            <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded uppercase tracking-wider">Yes (AI)</span>
                        ) : (
                            <span className="text-[10px] font-bold bg-muted text-muted-foreground px-2 py-0.5 rounded uppercase">Manual</span>
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
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Previous Tickets</h3>
                    <div className="space-y-2">
                        <div className="p-3 bg-[--surface-secondary] rounded-lg border border-border hover:border-primary transition-colors cursor-pointer group">
                            <p className="text-xs font-bold mb-1 group-hover:text-primary transition-colors">#TIC-4402: General Support</p>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-muted-foreground">Resolved • 2 days ago</span>
                                <ChevronRight className="size-4 text-muted-foreground group-hover:text-primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="mt-auto p-6 bg-[--surface-secondary]">
                <Button variant="outline" className="w-full h-10 text-sm font-bold flex items-center justify-center gap-2 shadow-sm rounded-lg" onClick={() => console.log('View Activity Log')}>
                    <History className="size-4" /> View Activity Log
                </Button>
            </div>

        </aside>
    );
}
