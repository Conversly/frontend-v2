"use client";

import { useState, useEffect } from "react";
import { MessageSquare, X } from "lucide-react";
import { merge } from "@/utils/ui";

export function DashboardSidePanel({ chatbotId }: { chatbotId?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    // Use a default bot ID or the one passed in, pointing to the new full-page route
    const defaultBotId = "t5eetmzucjp1o75lafl3duk3"; // Fallback for dev
    const targetId = chatbotId || defaultBotId;
    const WIDGET_BASE_URL = process.env.NEXT_PUBLIC_WIDGET_URL || "http://localhost:3001";

    return (
        <>
            {/* Floating Action Button (only visible when panel is closed) */}
            <button
                onClick={() => setIsOpen(true)}
                className={merge(
                    "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white shadow-lg transition-transform hover:scale-105 active:scale-95",
                    isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
                )}
            >
                <MessageSquare className="h-6 w-6" />
            </button>

            {/* The Native Side Panel */}
            <aside
                className={merge(
                    "relative flex h-full shrink-0 flex-col border-l border-zinc-200 bg-white shadow-[-8px_0_30px_rgba(0,0,0,0.05)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] dark:border-zinc-800 dark:bg-zinc-950",
                    isOpen ? "w-[420px] translate-x-0" : "w-0 translate-x-[420px] opacity-0 overflow-hidden"
                )}
            >
                {/* Header toolbar for the panel */}
                <div className="flex h-14 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800">
                    <span className="font-semibold text-sm">Verly Assistant</span>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="rounded-md p-1.5 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* The Chat Widget Iframe (fills the panel perfectly) */}
                <div className="flex-1 overflow-hidden relative">
                    <iframe
                        src={`${WIDGET_BASE_URL}/chat/${targetId}`}
                        className="absolute inset-0 h-full w-full border-none bg-transparent"
                        allow="microphone; camera"
                    />
                </div>
            </aside>
        </>
    );
}
