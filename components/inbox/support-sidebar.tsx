"use client";

import { useAuth } from "@/store/auth";
import { useAgentInboxStore, type InboxQueue } from "@/store/agent-inbox";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HeadsetIcon } from "@/components/icons/conversation-state-icons";
import { getInboxNavSections, type InboxNavItem } from "@/config/inbox-nav-config";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SupportSidebarProps {
    className?: string;
    counts: {
        userWaiting: number;
        unassigned: number;
        mine: number;
        waitingForUser: number;
        resolved: number;
        all: number;
    };
}

/** Maps a queue id to a key in the counts object */
const queueToCountKey: Partial<Record<InboxQueue, keyof SupportSidebarProps["counts"]>> = {
    "user-waiting": "userWaiting",
    "unassigned": "unassigned",
    "mine": "mine",
    "waiting-for-user": "waitingForUser",
    "resolved": "resolved",
    "all": "all",
};

// ---------------------------------------------------------------------------
// Nav item component
// ---------------------------------------------------------------------------

function NavItem({
    item,
    count,
    isActive,
    onClick,
}: {
    item: InboxNavItem;
    count?: number;
    isActive: boolean;
    onClick: () => void;
}) {
    const Icon = item.icon;

    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-colors group",
                isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-[--surface-secondary]"
            )}
        >
            <div className="flex items-center gap-3">
                {/* Coloured dot indicator (live queues) */}
                {item.dotColor && (
                    <span className={cn("size-2 rounded-full shrink-0", item.dotColor)} />
                )}

                {/* Material Symbol icon */}
                <Icon
                    className={cn(
                        "text-[20px] leading-none",
                        isActive
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-primary transition-colors"
                    )}
                />

                <span className="text-sm">{item.label}</span>
            </div>

            {/* Count badge — only for items that opted in */}
            {item.showCount && count !== undefined && (
                <span
                    className={cn(
                        "text-xs px-2 py-0.5 rounded-full font-bold",
                        isActive
                            ? (item.activeBadgeClass ?? "bg-primary/10 text-primary")
                            : "bg-muted text-muted-foreground"
                    )}
                >
                    {count}
                </span>
            )}
        </button>
    );
}

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------

export function SupportSidebar({ className, counts }: SupportSidebarProps) {
    const activeQueue = useAgentInboxStore((s) => s.activeQueue);
    const setActiveQueue = useAgentInboxStore((s) => s.setActiveQueue);
    const { user } = useAuth();

    const sections = getInboxNavSections();

    const resolveCount = (item: InboxNavItem): number | undefined => {
        if (!item.showCount || item.queueId === "home") return undefined;
        const key = queueToCountKey[item.queueId as InboxQueue];
        return key ? counts[key] : undefined;
    };

    return (
        <aside className={cn("border-r border-border bg-sidebar flex flex-col", className)}>
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center gap-3">
                <div className="p-1.5 bg-primary rounded-lg text-primary-foreground">
                    <HeadsetIcon className="text-[20px] leading-none" />
                </div>
                <h1 className="text-lg font-bold tracking-tight">Support</h1>
            </div>

            {/* Navigation sections */}
            <div className="p-4 space-y-6 overflow-y-auto flex-1">
                {sections.map((section) => (
                    <div key={section.label}>
                        {/* Only render a heading for non-Overview sections */}
                        {section.label !== "Overview" && (
                            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
                                {section.label}
                            </h2>
                        )}
                        <nav className="space-y-1">
                            {section.items.map((item) => {
                                const isActive =
                                    item.queueId === "home"
                                        ? false // home is never "active" in queue terms
                                        : activeQueue === item.queueId;

                                return (
                                    <NavItem
                                        key={item.queueId}
                                        item={item}
                                        count={resolveCount(item)}
                                        isActive={isActive}
                                        onClick={() => {
                                            if (item.queueId !== "home") {
                                                setActiveQueue(item.queueId as InboxQueue);
                                            }
                                        }}
                                    />
                                );
                            })}
                        </nav>
                    </div>
                ))}
            </div>
        </aside>
    );
}
