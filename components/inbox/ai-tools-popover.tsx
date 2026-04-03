"use client";

import { useState } from "react";
import { useImproveMessage } from "@/services/generate";
import type { ImproveAction } from "@/lib/api/generate";
import type { ChatMessage } from "@/store/agent-inbox";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sparkles, Maximize2, RefreshCw, SpellCheck, Smile, Briefcase, Wand2, Bot, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AiAction {
    action: ImproveAction;
    label: string;
    icon: React.ReactNode;
    needsContext: boolean;
    separator?: boolean;
}

const AI_ACTIONS: AiAction[] = [
    { action: "expand", label: "Expand", icon: <Maximize2 className="size-4" />, needsContext: false },
    { action: "rephrase", label: "Rephrase", icon: <RefreshCw className="size-4" />, needsContext: false },
    { action: "fix-grammar", label: "Fix grammar", icon: <SpellCheck className="size-4" />, needsContext: false, separator: true },
    { action: "more-friendly", label: "More friendly", icon: <Smile className="size-4" />, needsContext: false },
    { action: "more-formal", label: "More formal", icon: <Briefcase className="size-4" />, needsContext: false, separator: true },
    { action: "predict", label: "Predict", icon: <Wand2 className="size-4" />, needsContext: true },
    { action: "copilot", label: "Copilot", icon: <Bot className="size-4" />, needsContext: true },
];

interface AiToolsPopoverProps {
    draft: string;
    onReplace: (text: string) => void;
    messages: ChatMessage[];
    disabled?: boolean;
}

function buildConversationContext(messages: ChatMessage[]): string {
    return messages
        .slice(-12)
        .map((m) => `${m.senderType}: ${m.text}`)
        .join("\n");
}

export function AiToolsPopover({ draft, onReplace, messages, disabled }: AiToolsPopoverProps) {
    const [open, setOpen] = useState(false);
    const [activeAction, setActiveAction] = useState<ImproveAction | null>(null);
    const { mutateAsync } = useImproveMessage();

    const handleAction = async (item: AiAction) => {
        if (!draft.trim() && !item.needsContext) {
            toast.error("Type a message first");
            return;
        }

        setActiveAction(item.action);
        setOpen(false);

        try {
            const result = await mutateAsync({
                text: draft,
                action: item.action,
                conversationContext: item.needsContext ? buildConversationContext(messages) : undefined,
            });
            onReplace(result.data.improvedText);
        } catch (err: any) {
            toast.error(err?.message || "AI improvement failed");
        } finally {
            setActiveAction(null);
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    disabled={disabled || activeAction !== null}
                    className={cn(
                        "size-9 rounded-lg transition-colors",
                        activeAction !== null
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary hover:bg-primary/10",
                    )}
                    title="AI Tools"
                >
                    {activeAction !== null ? (
                        <Loader2 className="size-4 animate-spin" />
                    ) : (
                        <Sparkles className="size-4" />
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent
                side="top"
                align="end"
                sideOffset={8}
                className="w-48 p-1.5 shadow-lg"
            >
                <div className="flex flex-col">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2 py-1.5 select-none">
                        AI Tools
                    </p>
                    {AI_ACTIONS.map((item) => (
                        <div key={item.action}>
                            {item.separator && <div className="my-1 border-t border-border" />}
                            <button
                                onClick={() => handleAction(item)}
                                className="flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors text-left"
                            >
                                <span className="text-muted-foreground shrink-0">{item.icon}</span>
                                {item.label}
                            </button>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}
