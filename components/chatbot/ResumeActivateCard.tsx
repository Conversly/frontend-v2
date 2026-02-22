"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Ellipsis, Bot, ArrowRight } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { GetChatbotsResponse, StepStatuses } from "@/types/chatbot";
import { useRouter } from "next/navigation";

interface ResumeActivateCardProps {
    chatbot: GetChatbotsResponse;
    onDelete: (chatbotId: string) => void;
}

// Step names for showing "Missing: X"
const STEP_NAMES: Record<number, string> = {
    1: 'Website URL',
    2: 'AI Processing',
    3: 'Data Sources',
    4: 'Widget Config',
    5: 'Topics',
    6: 'Prompt Review',
    7: 'Activation',
};

const TOTAL_STEPS = 7;

// Find the first incomplete step name
function getMissingStepLabel(currentStep: number, statuses?: StepStatuses): string {
    // If we have step statuses, find the first non-completed step
    if (statuses && Object.keys(statuses).length > 0) {
        for (let i = 1; i <= TOTAL_STEPS; i++) {
            const s = statuses[String(i)];
            if (!s || s === 'not_started' || s === 'in_progress' || s === 'failed') {
                return STEP_NAMES[i] || `Step ${i}`;
            }
        }
    }
    // Fallback: use setupCurrentStep
    return STEP_NAMES[currentStep] || `Step ${currentStep}`;
}

// Time since helper
function getTimeSince(date: Date | null): string {
    if (!date) return "recently";
    const now = new Date();
    const d = new Date(date);
    const diffMs = now.getTime() - d.getTime();
    const mins = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMs / 3600000);
    const days = Math.floor(diffMs / 86400000);
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
}

export function ResumeActivateCard({ chatbot, onDelete }: ResumeActivateCardProps) {
    const router = useRouter();
    const [isNavigating, setIsNavigating] = useState(false);
    const workspacePrefix = `/${chatbot.workspaceId}`;

    const progress = Math.round(((chatbot.setupCurrentStep - 1) / TOTAL_STEPS) * 100);
    const missingLabel = getMissingStepLabel(chatbot.setupCurrentStep, chatbot.setupStepStatuses);

    const handleActivate = () => {
        setIsNavigating(true);
        router.push(`${workspacePrefix}/chatbot/create/setup?resume=${chatbot.id}`);
    };

    return (
        <Card className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-lg">
            {/* Stripe Pattern Header */}
            <div className="relative h-[120px] w-full overflow-hidden">
                {/* Diagonal stripes using CSS */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'repeating-linear-gradient(45deg, var(--background) 0, var(--background) 10px, var(--card) 10px, var(--card) 20px)',
                    }}
                />
                {/* Gradient overlay that fades to card */}
                <div className="absolute inset-0 bg-gradient-to-b from-amber-100/40 to-card" />

                {/* DRAFT Badge */}
                <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 backdrop-blur-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span className="font-mono text-[10px] font-medium tracking-wider text-amber-700">
                        DRAFT
                    </span>
                </div>
            </div>

            {/* Card Body */}
            <div className="relative flex flex-1 flex-col px-5 pb-5 pt-0">
                {/* Avatar Icon (straddles header/body) — dashed border */}
                <div className="-mt-7 mb-3 flex h-14 w-14 items-center justify-center rounded-lg border-2 border-dashed border-amber-300 bg-amber-50 shadow-md ring-[3px] ring-card z-10">
                    <Bot className="h-6 w-6 text-amber-500" />
                </div>

                {/* Title + Subtitle */}
                <div className="mb-4 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                        <h3 className="text-base font-semibold text-foreground leading-tight line-clamp-1">
                            {chatbot.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Edited {getTimeSince(chatbot.createdAt)}
                        </p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground"
                            >
                                <Ellipsis className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => onDelete(chatbot.id)}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Progress Section */}
                <div className="mb-5 border-t border-border pt-3">
                    <div className="flex items-end justify-between mb-1.5">
                        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                            Setup Progress
                        </p>
                        <p className="font-mono text-xs font-medium text-amber-600">
                            {progress}%
                        </p>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div
                            className="h-full rounded-full bg-amber-500 transition-all duration-500 relative"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute inset-0 bg-amber-400/30 animate-pulse rounded-full" />
                        </div>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                        Next: <span className="text-foreground font-medium">{missingLabel}</span>
                    </p>
                </div>

                {/* CTA */}
                <div className="mt-auto">
                    <Button
                        className="w-full gap-1.5 bg-amber-500 text-white hover:bg-amber-600 shadow-sm"
                        disabled={isNavigating}
                        onClick={handleActivate}
                    >
                        {isNavigating ? "Opening…" : "Resume Setup"}
                        {!isNavigating && <ArrowRight className="h-3.5 w-3.5" />}
                    </Button>
                </div>
            </div>
        </Card>
    );
}
