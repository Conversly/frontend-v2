import type { InboxQueue } from "@/store/agent-inbox";
import type { ComponentType } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A special queue id that maps to a non-queue "home" action */
export type InboxNavQueueId = InboxQueue | "home";

export type InboxNavItem = {
    /** Display label */
    label: string;
    /** The queue this item maps to, or 'home' */
    queueId: InboxNavQueueId;
    /**
     * Icon component. Should accept a `className` prop.
     * Use the Material Symbol icons from `@/components/icons/conversation-state-icons`.
     */
    icon: ComponentType<{ className?: string }>;
    /**
     * Optional dot indicator colour (Tailwind bg-* class).
     * When provided a small coloured dot is rendered instead of (or alongside) the icon.
     */
    dotColor?: string;
    /**
     * Tailwind classes applied to the badge when the item is active.
     * e.g. "bg-destructive/10 text-destructive"
     */
    activeBadgeClass?: string;
    /**
     * Whether to show the live count badge. The parent component resolves
     * the actual count via `counts[queueId]`.
     */
    showCount?: boolean;
};

export type InboxNavSection = {
    /** Section heading (rendered as an uppercase label) */
    label: string;
    items: InboxNavItem[];
};

// ---------------------------------------------------------------------------
// Config factory (mirrors nav-config.ts pattern)
// ---------------------------------------------------------------------------

import {
    HomeIcon,
    UserWaitingHumanIcon,
    EscalatedUnassignedIcon,
    AssignedIcon,
    HumanWaitingUserIcon,
    ResolvedIcon,
    InboxIcon,
} from "@/components/icons/conversation-state-icons";

/**
 * Returns the full inbox sidebar navigation configuration.
 * Sections are rendered top-to-bottom; items within each section are
 * rendered in order.
 */
export const getInboxNavSections = (): InboxNavSection[] => [
    {
        label: "Live Queues",
        items: [
            {
                label: "User Waiting",
                queueId: "user-waiting",
                icon: UserWaitingHumanIcon,
                activeBadgeClass: "bg-destructive/10 text-destructive",
                showCount: true,
            },
            {
                label: "Unassigned",
                queueId: "unassigned",
                icon: EscalatedUnassignedIcon,
                activeBadgeClass: "bg-yellow-500/10 text-yellow-600",
                showCount: true,
            },
            {
                label: "Mine",
                queueId: "mine",
                icon: AssignedIcon,
                activeBadgeClass: "bg-green-600/10 text-green-600",
                showCount: true,
            },
        ],
    },
    {
        label: "Status",
        items: [
            {
                label: "Waiting for User",
                queueId: "waiting-for-user",
                icon: HumanWaitingUserIcon,
            },
            {
                label: "Resolved",
                queueId: "resolved",
                icon: ResolvedIcon,
            },
            {
                label: "All Conversations",
                queueId: "all",
                icon: InboxIcon,
            },
        ],
    },
];
