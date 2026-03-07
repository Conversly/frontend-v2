"use client";

/**
 * Conversation State Icons
 *
 * Outlined, minimalist Material Symbols icons for the support agent dashboard.
 * Designed for clarity and quick recognition of conversation statuses.
 *
 * Usage:
 *   import { AiActiveIcon, EscalatedUnassignedIcon, ... } from "@/components/icons/conversation-state-icons";
 *   <AiActiveIcon className="size-5" />
 */

import { cn } from "@/lib/utils";
import React from "react";

// ---------------------------------------------------------------------------
// Base wrapper – renders a Material Symbols Outlined glyph
// ---------------------------------------------------------------------------

interface MaterialIconProps {
    name: string;
    className?: string;
    style?: React.CSSProperties;
}

const MaterialIcon = ({ name, className, style }: MaterialIconProps) => (
    <span
        className={cn("material-symbols-outlined select-none leading-none", className)}
        style={{
            fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
            ...style,
        }}
    >
        {name}
    </span>
);

// ---------------------------------------------------------------------------
// Icon components — one per conversation state
// ---------------------------------------------------------------------------

/** AI_ACTIVE — bot is handling the conversation */
export const AiActiveIcon = ({ className }: { className?: string }) => (
    <MaterialIcon name="smart_toy" className={className} />
);

/** ESCALATED_UNASSIGNED — escalated but no agent claimed it yet */
export const EscalatedUnassignedIcon = ({ className }: { className?: string }) => (
    <MaterialIcon name="warning" className={className} />
);

/** ASSIGNED — conversation claimed by an agent */
export const AssignedIcon = ({ className }: { className?: string }) => (
    <MaterialIcon name="person" className={className} />
);

/** HUMAN_WAITING_USER — agent replied, waiting on user */
export const HumanWaitingUserIcon = ({ className }: { className?: string }) => (
    <MaterialIcon name="reply" className={className} />
);

/** USER_WAITING_HUMAN — user sent a message, waiting on agent */
export const UserWaitingHumanIcon = ({ className }: { className?: string }) => (
    <MaterialIcon name="schedule" className={className} />
);

/** RESOLVED — conversation marked resolved */
export const ResolvedIcon = ({ className }: { className?: string }) => (
    <MaterialIcon name="check_circle" className={className} />
);

/** CLOSED — conversation permanently closed */
export const ClosedIcon = ({ className }: { className?: string }) => (
    <MaterialIcon name="lock" className={className} />
);

/** HOME — home / overview */
export const HomeIcon = ({ className }: { className?: string }) => (
    <MaterialIcon name="home" className={className} />
);

/** INBOX — all conversations inbox */
export const InboxIcon = ({ className }: { className?: string }) => (
    <MaterialIcon name="inbox" className={className} />
);

/** SETTINGS */
export const SettingsIcon = ({ className }: { className?: string }) => (
    <MaterialIcon name="settings" className={className} />
);

/** HEADSET / live support indicator */
export const HeadsetIcon = ({ className }: { className?: string }) => (
    <MaterialIcon name="headset_mic" className={className} />
);
