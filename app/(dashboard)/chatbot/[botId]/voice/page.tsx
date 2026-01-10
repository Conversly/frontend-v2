"use client";

import { useParams } from "next/navigation";
import { VoiceAssistantsList } from "@/components/voice/VoiceAssistantsList";

export default function VoicePage() {
    const params = useParams();
    const botId = params.botId as string;

    return (
        <div className="container py-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Voice Configuration</h2>
                <p className="text-muted-foreground">
                    Create and manage voice assistants for your chatbot.
                    Each assistant can have its own personality, voice, and behavior.
                </p>
            </div>

            <VoiceAssistantsList botId={botId} />
        </div>
    );
}