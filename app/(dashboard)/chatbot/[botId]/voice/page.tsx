"use client";

import { useParams } from "next/navigation";
import { VoiceAssistantsList } from "@/components/voice/VoiceAssistantsList";

export default function VoicePage() {
    const params = useParams();
    const botId = params.botId as string;

    return (
        <div className="container max-w-7xl px-4 py-8 md:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight">Voice Configuration</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Create and manage voice assistants for your chatbot.
                    Each assistant can have its own personality, voice, and behavior.
                </p>
            </div>

            <VoiceAssistantsList botId={botId} />
        </div>
    );
}