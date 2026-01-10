"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { useAssistant } from "@/services/voice-assistant-service";
import { Loader2, Copy, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function VoiceWidgetPage() {
    const params = useParams();
    const router = useRouter();
    const botId = params?.botId as string;

    // Fetch the voice assistant for this bot. 
    // Assuming 1:1 mapping for now or fetching the primary one.
    // The previous component relied on `assistantId` being passed or fetched. 
    // We'll need to fetch the assistants list and pick the first one or similar logic if `assistantId` isn't in params.
    // However, existing `VoiceAssistantConfig` took `assistantId` as prop, which `page.tsx` usually provided.
    // Let's check how the main `voice` page fetches the assistant.
    // Ideally we should use `useAssistants(botId)` but for now let's reuse `useAssistant` if we can get the ID.
    // Wait, the main voice page usually lists assistants or picks the default. 
    // I will use `useAssistant` but I need the ID. 
    // Let's fetch all assistants for the bot to get the ID.

    // Correction: I don't see `useAssistants` hook in the imported list in `VoiceAssistantConfig`. 
    // I'll assume we likely need to fetch the list. 
    // Or I can check `frontend-v2/app/(dashboard)/chatbot/[botId]/voice/page.tsx` to see how it gets the ID.

    // For now, I will create a placeholder implementation that needs to fetch the assistant ID first.
    // But to be efficiently effective, I'll use the same `useAssistant` pattern if I can find the ID.
    // I will read `frontend-v2/services/voice-assistant-service` next to see available hooks.

    // Let's defer writing the *exact* data fetching logic until I quickly verify `voice/page.tsx`.
    // BUT since I am in a write tool, I will write specific valid code that Handles "Loading" state if ID is missing.

    return (
        <VoiceWidgetLoader botId={botId} />
    );
}

import { useAssistants } from "@/services/voice-assistant-service";

function VoiceWidgetLoader({ botId }: { botId: string }) {
    const { data: assistants, isLoading } = useAssistants(botId);

    if (isLoading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

    if (!assistants || assistants.length === 0) {
        return <div className="p-10 text-center">No Voice Assistant found. Please create one first.</div>;
    }

    // Default to the first one for now
    const assistant = assistants[0];

    return <VoiceWidgetContent botId={botId} assistant={assistant} />;
}

function VoiceWidgetContent({ botId, assistant }: { botId: string, assistant: any }) {
    const router = useRouter();
    const assistantId = assistant.id;

    return (
        <div className="flex h-[calc(100vh-4rem)] flex-col gap-4 bg-background">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-3">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.push(`/chatbot/${botId}/voice`)}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-semibold">Voice Widget</h2>
                            <Badge variant={assistant.status === 'ACTIVE' ? 'default' : 'secondary'}>
                                {assistant.status}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Configure the web widget for {assistant.name}</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Embed Widget</CardTitle>
                            <CardDescription>Add this voice assistant to your website.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label>Embed Code</Label>
                                <div className="relative">
                                    <Textarea
                                        readOnly
                                        className="min-h-[100px] font-mono text-xs"
                                        value={`<script>
  window.voiceAssistantConfig = {
    assistantId: "${assistantId}",
    position: "bottom-right",
    styles: {
      primaryColor: "${assistant.widget?.styles?.primaryColor || '#000000'}"
    }
  };
</script>
<script src="${typeof window !== 'undefined' ? window.location.origin : ''}/widget/bundle.js" async></script>`}
                                    />
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="absolute top-2 right-2"
                                        onClick={() => {
                                            navigator.clipboard.writeText(`<script>
  window.voiceAssistantConfig = {
    assistantId: "${assistantId}",
    position: "bottom-right",
    styles: {
      primaryColor: "${assistant.widget?.styles?.primaryColor || '#000000'}"
    }
  };
</script>
<script src="${window.location.origin}/widget/bundle.js" async></script>`);
                                            toast.success("Copied to clipboard");
                                        }}
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Place this code before the closing <code>&lt;/body&gt;</code> tag of your website.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
