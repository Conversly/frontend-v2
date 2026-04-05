"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { MarkdownRenderer } from "@/components/shared/markdown-renderer";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, PenLine, User } from "lucide-react";

export interface ConversationMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    createdAt?: Date;
    citations?: unknown[];
}

interface ConversationViewerProps {
    messages: ConversationMessage[];
    isLoading?: boolean;
    className?: string;
    emptyMessage?: string;
    onReviseAnswer?: (assistantMessage: ConversationMessage, precedingUserMessage: ConversationMessage | null) => void;
}

export function ConversationViewer({
    messages,
    isLoading,
    className,
    emptyMessage = "No messages to display.",
    onReviseAnswer,
}: ConversationViewerProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (isLoading) {
        return (
            <div className={cn("space-y-3", className)}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className={cn("flex", i % 2 ? "justify-end" : "justify-start")}
                    >
                        <Skeleton className="h-6 w-64 rounded-2xl" />
                    </div>
                ))}
            </div>
        );
    }

    if (!messages.length) {
        return <p className="type-body-muted text-center py-8">{emptyMessage}</p>;
    }

    return (
        <div className={cn("space-y-3", className)}>
            {messages.map((m, index) => {
                const isUser = m.role === "user";
                const isAssistant = m.role === "assistant";
                const ts = m.createdAt ? formatShortDateTime(m.createdAt) : "";
                return (
                    <div
                        key={m.id}
                        className={cn("flex items-start gap-3 max-w-[85%]", isUser ? "flex-row-reverse ml-auto" : "justify-start")}
                    >
                        {/* Avatar */}
                        {isUser && (
                            <Avatar className="size-8 border shadow-sm">
                                <AvatarFallback className="bg-[--surface-secondary] text-muted-foreground text-xs"><User className="size-4" /></AvatarFallback>
                            </Avatar>
                        )}
                        {isAssistant && (
                            <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-sm border border-primary">
                                <Bot className="size-4" />
                            </div>
                        )}

                        <div className={cn("space-y-1 items-start flex flex-col min-w-0", isUser && "items-end")}>
                            <div className={cn(
                                "px-4 py-2.5 rounded-2xl shadow-sm text-sm leading-relaxed",
                                isUser ? "bg-primary text-primary-foreground rounded-tr-sm border border-primary font-medium" : "bg-muted rounded-tl-sm border border-border text-foreground"
                            )}>
                                {isAssistant && (
                                    <div className="flex items-center gap-1 mb-1">
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-tight flex items-center gap-0.5">
                                            <Bot className="size-3" /> AI Assistant
                                        </span>
                                    </div>
                                )}
                                <div className="break-words whitespace-pre-wrap">
                                    <MarkdownRenderer>{m.content}</MarkdownRenderer>
                                </div>
                            </div>
                            <div className={cn("flex items-center gap-2 text-[11px] text-muted-foreground", isUser && "justify-end")}>
                                {ts ? <span className="tabular-nums">{ts} {isUser && "• Sent"}</span> : null}
                                {Array.isArray(m.citations) && m.citations.length > 0 ? (
                                    <span className="tabular-nums font-medium text-primary">
                                        • {m.citations.length} citation{m.citations.length === 1 ? "" : "s"}
                                    </span>
                                ) : null}
                                {isAssistant && onReviseAnswer && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-6 text-[11px] gap-1 px-2 text-muted-foreground hover:text-foreground"
                                        onClick={() => {
                                            const precedingUserMsg = messages.slice(0, index).reverse().find(msg => msg.role === "user") ?? null;
                                            onReviseAnswer(m, precedingUserMsg);
                                        }}
                                    >
                                        <PenLine className="size-3" />
                                        Revise answer
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
            <div ref={scrollRef} className="h-1" />
        </div>
    );
}

function formatShortDateTime(dateLike: Date | string) {
    const d = typeof dateLike === "string" ? new Date(dateLike) : dateLike;
    try {
        return d.toLocaleString(undefined, {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    } catch {
        return "";
    }
}
