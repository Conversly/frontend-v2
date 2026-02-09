"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Save, Sparkles, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// API
import { getChatbot, updateChatbot } from "@/lib/api/chatbot";
import { getWidgetConfig } from "@/lib/api/deploy";
import { IdentityCard } from "@/components/behaviour/IdentityCard";
import { StyleCard } from "@/components/behaviour/StyleCard";
import { HandoffCard } from "@/components/behaviour/HandoffCard";
import { LeadGenCard } from "@/components/behaviour/LeadGenCard";
import { GuardrailsCard } from "@/components/behaviour/GuardrailsCard";
import { ActionsCard } from "@/components/behaviour/ActionsCard";
import {
    BehaviourState,
    DEFAULT_BEHAVIOUR_STATE,
    generateSystemPromptFromState,
    serializeStateForPromptGen
} from "@/components/behaviour/BehaviourState";
import { generateChannelPrompt, getChannelPrompt, upsertChannelPrompt } from "@/lib/api/prompt"; // Import generation API

export default function BehaviourPage() {
    const router = useRouter();
    const params = useParams<{ workspaceId: string; botId: string }>();
    const botId = Array.isArray(params.botId) ? params.botId[0] : params.botId;
    const workspaceId = Array.isArray(params.workspaceId) ? params.workspaceId[0] : params.workspaceId;

    // Local UI State
    const [behaviour, setBehaviour] = useState<BehaviourState>(DEFAULT_BEHAVIOUR_STATE);

    // Data State
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Generation States
    const [isGeneratingMain, setIsGeneratingMain] = useState(false);
    const [isGeneratingLead, setIsGeneratingLead] = useState(false);
    const [isGeneratingHandoff, setIsGeneratingHandoff] = useState(false);

    useEffect(() => {
        async function loadData() {
            if (!botId || !workspaceId) return;

            setIsLoading(true);
            try {
                // Load chatbot, widget config, and ALL prompts
                const [chatbotData, widgetData, widgetPrompt, leadPrompt, handoffPrompt] = await Promise.all([
                    getChatbot(workspaceId, botId),
                    getWidgetConfig(botId),
                    getChannelPrompt(botId, "WIDGET").catch(() => ({ systemPrompt: "" })),
                    getChannelPrompt(botId, "LEAD_GENERATION").catch(() => ({ systemPrompt: "" })),
                    getChannelPrompt(botId, "ESCALATION").catch(() => ({ systemPrompt: "" })),
                ]);

                // Initialize State
                setBehaviour(prev => ({
                    ...prev,
                    identity: {
                        ...prev.identity,
                        aiName: chatbotData.name,
                    },
                    handoff: {
                        ...prev.handoff,
                        enabled: chatbotData.escalationEnabled ?? false, // Sync with backend flag
                        supportMode: chatbotData.escalationEnabled ? "When AI is unsure" : "AI only",
                        systemPrompt: handoffPrompt?.systemPrompt || "",
                    },
                    leadGen: {
                        ...prev.leadGen,
                        enabled: chatbotData.leadGenerationEnabled ?? false, // Sync with backend flag
                        strategy: "Passive (intent-based)",
                        systemPrompt: leadPrompt?.systemPrompt || "",
                    },
                    mainSystemPrompt: widgetPrompt?.systemPrompt || "",
                }));

            } catch (error) {
                console.error("Failed to load behaviour data:", error);
                toast.error("Failed to load chatbot configuration");
            } finally {
                setIsLoading(false);
            }
        }

        loadData();
    }, [botId, workspaceId]);

    const handleSave = async () => {
        if (!botId || !workspaceId) return;

        setIsSaving(true);
        try {
            // 1. Update Chatbot Settings (Flags)
            await updateChatbot({
                id: botId,
                workspaceId,
                leadGenerationEnabled: behaviour.leadGen.enabled,
                escalationEnabled: behaviour.handoff.enabled,
            });

            // 2. Save System Prompts (All 3 channels)
            await Promise.all([
                upsertChannelPrompt({
                    chatbotId: botId,
                    channel: "WIDGET",
                    systemPrompt: behaviour.mainSystemPrompt,
                }),
                upsertChannelPrompt({
                    chatbotId: botId,
                    channel: "LEAD_GENERATION",
                    systemPrompt: behaviour.leadGen.systemPrompt,
                }),
                upsertChannelPrompt({
                    chatbotId: botId,
                    channel: "ESCALATION",
                    systemPrompt: behaviour.handoff.systemPrompt,
                })
            ]);

            toast.success("Behaviour saved successfully!");
        } catch (error) {
            console.error("Failed to save behaviour:", error);
            toast.error("Failed to save changes");
        } finally {
            setIsSaving(false);
        }
    };

    // Generic Generator Helper
    const generatePrompt = async (
        type: "WIDGET" | "LEAD_GENERATION" | "ESCALATION",
        setLoading: (l: boolean) => void,
        setPrompt: (p: string) => void
    ) => {
        if (!botId) return;
        setLoading(true);
        try {
            // Serialize state to get description
            let description = "";
            if (type === "WIDGET") {
                description = serializeStateForPromptGen(behaviour, "IDENTITY");
            } else if (type === "LEAD_GENERATION") {
                description = serializeStateForPromptGen(behaviour, "LEAD_GEN");
            } else if (type === "ESCALATION") {
                description = serializeStateForPromptGen(behaviour, "HANDOFF");
            }

            const res = await generateChannelPrompt({
                chatbotId: botId,
                channel: type,
                userDescription: description,
            });

            setPrompt(res.systemPrompt);
            toast.success(`${type} prompt generated!`);
        } catch (error) {
            console.error(error);
            toast.error("Failed to generate prompt");
        } finally {
            setLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-gray-50/50">
            {/* LEFT PANEL - Controls (Scrollable) */}
            <div className="flex-1 overflow-y-auto px-8 py-8 min-w-[500px] max-w-4xl mx-auto w-full scrollbar-thin">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight mb-2">Behaviour</h1>
                            <p className="text-lg text-muted-foreground">
                                Train how your AI interacts with visitors.
                            </p>
                        </div>
                        <Button onClick={handleSave} disabled={isSaving}>
                            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Save Changes
                        </Button>
                    </div>

                    {/* Live Summary Card */}
                    <div className="mt-6 p-4 bg-white rounded-lg border shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="font-medium text-sm">Your AI currently will:</span>
                        </div>
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-green-500">✔</span> Answer customer questions
                            </div>
                            <div className="flex items-center gap-2">
                                {behaviour.handoff.enabled ? (
                                    <>
                                        <span className="text-green-500">✔</span> Escalate to a human
                                    </>
                                ) : (
                                    <>
                                        <span className="text-muted-foreground">✖</span> Escalate to a human
                                    </>
                                )}
                            </div>
                            {/* ... other summary items ... */}
                            <div className="flex items-center gap-2">
                                {behaviour.leadGen.enabled ? (
                                    <span className="text-green-500">✔</span>
                                ) : <span className="text-muted-foreground">✖</span>} Capture leads
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-green-500">✔</span> Stay {behaviour.style.tone.toLowerCase()}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 pb-20">
                    {/* 1. Identity */}
                    <IdentityCard
                        state={behaviour.identity}
                        onChange={(s) => setBehaviour(prev => ({ ...prev, identity: s }))}
                        systemPrompt={behaviour.mainSystemPrompt}
                        onSystemPromptChange={(p) => setBehaviour(prev => ({ ...prev, mainSystemPrompt: p }))}
                        onGenerate={() => generatePrompt("WIDGET", setIsGeneratingMain, (p) => setBehaviour(prev => ({ ...prev, mainSystemPrompt: p })))}
                        isGenerating={isGeneratingMain}
                    />

                    {/* 2. Conversation Style */}
                    <StyleCard
                        state={behaviour.style}
                        onChange={(s) => setBehaviour(prev => ({ ...prev, style: s }))}
                    />

                    {/* 3. Human Handoff */}
                    <HandoffCard
                        state={behaviour.handoff}
                        onChange={(s) => setBehaviour(prev => ({ ...prev, handoff: s }))}
                        onGenerate={() => generatePrompt("ESCALATION", setIsGeneratingHandoff, (p) => setBehaviour(prev => ({
                            ...prev,
                            handoff: { ...prev.handoff, systemPrompt: p }
                        })))}
                        isGenerating={isGeneratingHandoff}
                    />

                    {/* 4. Lead Capture */}
                    <LeadGenCard
                        state={behaviour.leadGen}
                        onChange={(s) => setBehaviour(prev => ({ ...prev, leadGen: s }))}
                        onGenerate={() => generatePrompt("LEAD_GENERATION", setIsGeneratingLead, (p) => setBehaviour(prev => ({
                            ...prev,
                            leadGen: { ...prev.leadGen, systemPrompt: p }
                        })))}
                        isGenerating={isGeneratingLead}
                    />

                    {/* 5. Coming Soon */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <GuardrailsCard />
                        <ActionsCard />
                    </div>

                    <div className="h-10"></div>
                </div>
            </div>
        </div>
    );
}
