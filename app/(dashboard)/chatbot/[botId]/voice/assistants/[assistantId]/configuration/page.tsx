"use client";

import { useParams } from "next/navigation";
import { VoiceAssistantConfig } from "@/components/voice/VoiceAssistantConfig";

export default function AssistantConfigPage() {
    const params = useParams();
    const botId = params.botId as string;
    const assistantId = params.assistantId as string;

    return <VoiceAssistantConfig botId={botId} assistantId={assistantId} />;
}
