"use client";

import { cn } from "@/lib/utils";
import { MarkdownRenderer } from "@/components/shared/markdown-renderer";
import { Skeleton } from "@/components/ui/skeleton";

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
}

export function ConversationViewer({
    messages,
    isLoading,
    className,
    emptyMessage = "No messages to display.",
}: ConversationViewerProps) {
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
            {messages.map((m) => {
                const isUser = m.role === "user";
                const ts = m.createdAt ? formatShortDateTime(m.createdAt) : "";
                return (
                    <div
                        key={m.id}
                        className={cn("flex", isUser ? "justify-end" : "justify-start")}
                    >
                        <div
                            className={cn(
                                "max-w-[85%] space-y-1",
                                isUser ? "items-end" : "items-start"
                            )}
                        >
                            <div
                                className={cn(
                                    "rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm",
                                    isUser
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-foreground"
                                )}
                            >
                                <MarkdownRenderer>{m.content}</MarkdownRenderer>
                            </div>
                            <div
                                className={cn(
                                    "flex items-center gap-2 text-[11px] text-muted-foreground",
                                    isUser && "justify-end"
                                )}
                            >
                                {ts ? <span className="tabular-nums">{ts}</span> : null}
                                {Array.isArray(m.citations) && m.citations.length > 0 ? (
                                    <span className="tabular-nums">
                                        • {m.citations.length} citation
                                        {m.citations.length === 1 ? "" : "s"}
                                    </span>
                                ) : null}
                            </div>
                        </div>
                    </div>
                );
            })}
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
