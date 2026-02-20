"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Save, Sparkles, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// API
import { getChatbot, updateChatbot } from "@/lib/api/chatbot";
import { getWidgetConfig } from "@/lib/api/deploy";
import { getLeadFormConfig, upsertLeadFormConfig } from "@/lib/api/lead-forms";
import { IdentityCard } from "@/components/behaviour/IdentityCard";
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
    const [activeTab, setActiveTab] = useState("identity");

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
                // Also load Lead Form
                const [chatbotData, widgetData, widgetPrompt, leadPrompt, handoffPrompt, leadForm] = await Promise.all([
                    getChatbot(workspaceId, botId),
                    getWidgetConfig(botId),
                    getChannelPrompt(botId, "WIDGET").catch(() => ({ systemPrompt: "" })),
                    getChannelPrompt(botId, "LEAD_GENERATION").catch(() => ({ systemPrompt: "" })),
                    getChannelPrompt(botId, "ESCALATION").catch(() => ({ systemPrompt: "" })),
                    getLeadFormConfig(botId).catch(() => null),
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
                        form: leadForm?.data?.data || {
                            id: "", // Will be assigned on create if empty, or ignored
                            chatbotId: botId,
                            title: "Contact Us",
                            subtitle: "We'll get back to you shortly",
                            ctaText: "Send Message",
                            successMessage: "Thanks! We received your message.",
                            isEnabled: chatbotData.leadGenerationEnabled ?? false,
                            fields: [
                                {
                                    id: "default_name",
                                    label: "Name",
                                    type: "text",
                                    required: true,
                                    position: 0,
                                    systemField: "name",
                                    formId: ""
                                },
                                {
                                    id: "default_email",
                                    label: "Email",
                                    type: "email",
                                    required: true,
                                    position: 1,
                                    systemField: "email",
                                    formId: ""
                                }
                            ],
                            triggers: [],
                            createdAt: new Date(),
                            updatedAt: new Date()
                        },
                        systemPrompt: leadPrompt?.systemPrompt || "",
                        leadConfig: {
                            ...prev.leadGen.leadConfig,
                            pageTriggers: leadForm?.data?.data?.pageTriggers?.join(", ") ?? prev.leadGen.leadConfig.pageTriggers,
                            keywords: leadForm?.data?.data?.keywordTriggers?.join(", ") ?? prev.leadGen.leadConfig.keywords,
                        }
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
            const promises: Promise<any>[] = [];

            // 1. IDENTITY TAB
            if (activeTab === "identity") {
                // Save Main Widget Prompt
                promises.push(
                    upsertChannelPrompt({
                        chatbotId: botId,
                        channel: "WIDGET",
                        systemPrompt: behaviour.mainSystemPrompt,
                    })
                );
                // Note: Chatbot name update (behaviour.identity.aiName) would happen here if API supported it
                // Currently only name is loaded, not saved back to chatbot object in this flow
            }

            // 2. LEAD GEN TAB
            if (activeTab === "lead-gen") {
                // Update Chatbot Flag
                promises.push(
                    updateChatbot({
                        id: botId,
                        workspaceId,
                        leadGenerationEnabled: behaviour.leadGen.form?.isEnabled ?? false,
                    })
                );

                // Save Lead Prompt
                promises.push(
                    upsertChannelPrompt({
                        chatbotId: botId,
                        channel: "LEAD_GENERATION",
                        systemPrompt: behaviour.leadGen.systemPrompt,
                    })
                );

                // Save Lead Form
                if (behaviour.leadGen.form) {
                    promises.push(upsertLeadFormConfig({
                        chatbotId: botId,
                        form: {
                            id: behaviour.leadGen.form.id || undefined,
                            title: behaviour.leadGen.form.title,
                            subtitle: behaviour.leadGen.form.subtitle || undefined,
                            ctaText: behaviour.leadGen.form.ctaText || undefined,
                            successMessage: behaviour.leadGen.form.successMessage || undefined,
                            isEnabled: behaviour.leadGen.form.isEnabled,
                            pageTriggers: behaviour.leadGen.leadConfig.pageTriggers.split(",").map(s => s.trim()).filter(Boolean),
                            keywordTriggers: behaviour.leadGen.leadConfig.keywords.split(",").map(s => s.trim()).filter(Boolean)
                        },
                        fields: behaviour.leadGen.form.fields.map((f, i) => ({
                            ...f,
                            position: i,
                            id: f.id.startsWith("temp_") ? undefined : f.id,
                            placeholder: f.placeholder || undefined,
                            options: f.options || undefined,
                            systemField: f.systemField || undefined
                        })),
                        triggers: behaviour.leadGen.form.triggers.map(t => ({
                            ...t,
                            id: t.id.startsWith("temp_") ? undefined : t.id
                        }))
                    }));
                }
            }

            // 3. HANDOFF TAB
            if (activeTab === "handoff") {
                // Update Chatbot Flag
                promises.push(
                    updateChatbot({
                        id: botId,
                        workspaceId,
                        escalationEnabled: behaviour.handoff.enabled,
                    })
                );

                // Save Handoff Prompt
                promises.push(
                    upsertChannelPrompt({
                        chatbotId: botId,
                        channel: "ESCALATION",
                        systemPrompt: behaviour.handoff.systemPrompt,
                    })
                );
            }

            await Promise.all(promises);

            toast.success("Changes saved successfully!");
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
                    <div className="flex flex-col mb-4">
                        <h1 className="text-3xl font-bold tracking-tight mb-2">Behaviour</h1>
                        <p className="text-lg text-muted-foreground mb-4">
                            Train how your AI interacts with visitors.
                        </p>
                        <div className="inline-flex items-start md:items-center gap-3 px-4 py-3 bg-primary/10 border border-primary/20 rounded-lg self-start">
                            <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5 md:mt-0" />
                            <span className="text-sm font-medium text-primary">
                                Write in your own broken language and we will create a world-class prompt for your bot!
                            </span>
                        </div>
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
                                {behaviour.leadGen.form?.isEnabled ? (
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
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="identity">Identity</TabsTrigger>
                            <TabsTrigger value="lead-gen">Lead generation</TabsTrigger>
                            <TabsTrigger value="handoff">Human Handoff</TabsTrigger>
                        </TabsList>

                        {/* 1. Identity & Style (The Master Prompt) */}
                        <TabsContent value="identity" className="mt-6">
                            <IdentityCard
                                identity={behaviour.identity}
                                onIdentityChange={(s) => setBehaviour(prev => ({ ...prev, identity: s }))}
                                style={behaviour.style}
                                onStyleChange={(s) => setBehaviour(prev => ({ ...prev, style: s }))}
                                systemPrompt={behaviour.mainSystemPrompt}
                                onSystemPromptChange={(p) => setBehaviour(prev => ({ ...prev, mainSystemPrompt: p }))}
                                onGenerate={() => generatePrompt("WIDGET", setIsGeneratingMain, (p) => setBehaviour(prev => ({ ...prev, mainSystemPrompt: p })))}
                                isGenerating={isGeneratingMain}
                            />
                        </TabsContent>

                        {/* 4. Lead Capture */}
                        <TabsContent value="lead-gen" className="mt-6">
                            <LeadGenCard
                                state={behaviour.leadGen}
                                onChange={(s) => setBehaviour(prev => ({ ...prev, leadGen: s }))}
                                onGenerate={() => generatePrompt("LEAD_GENERATION", setIsGeneratingLead, (p) => setBehaviour(prev => ({
                                    ...prev,
                                    leadGen: { ...prev.leadGen, systemPrompt: p }
                                })))}
                                isGenerating={isGeneratingLead}
                            />
                        </TabsContent>

                        {/* 3. Human Handoff */}
                        <TabsContent value="handoff" className="mt-6">
                            <HandoffCard
                                state={behaviour.handoff}
                                onChange={(s) => setBehaviour(prev => ({ ...prev, handoff: s }))}
                                onGenerate={() => generatePrompt("ESCALATION", setIsGeneratingHandoff, (p) => setBehaviour(prev => ({
                                    ...prev,
                                    handoff: { ...prev.handoff, systemPrompt: p }
                                })))}
                                isGenerating={isGeneratingHandoff}
                            />
                        </TabsContent>
                    </Tabs>

                    <div className="flex justify-end pt-8 pb-10 border-t mt-8">
                        <Button size="lg" onClick={handleSave} disabled={isSaving} className="px-8">
                            {isSaving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
