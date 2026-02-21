"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Save, Sparkles, User, Magnet, UserPlus, CheckCircle2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import posthog from "posthog-js";

// API
import { getChatbot, updateChatbot } from "@/lib/api/chatbot";
import { getWidgetConfig } from "@/lib/api/deploy";
import { getLeadFormConfig, upsertLeadFormConfig } from "@/lib/api/lead-forms";
import { IdentityCard } from "@/components/behaviour/IdentityCard";
import { HandoffCard } from "@/components/behaviour/HandoffCard";
import { LeadGenCard } from "@/components/behaviour/LeadGenCard";
import {
    BehaviourState,
    DEFAULT_BEHAVIOUR_STATE,
    serializeStateForPromptGen
} from "@/components/behaviour/BehaviourState";
import { generateChannelPrompt, getChannelPrompt, upsertChannelPrompt } from "@/lib/api/prompt";
import { getBehaviourConfigs, upsertBehaviourConfig } from "@/lib/api/behaviour-config";

type TabId = "identity" | "lead-gen" | "handoff";

const TABS: { id: TabId; label: string; icon: React.ElementType; description: string }[] = [
    { id: "identity", label: "Identity", icon: User, description: "Personality & tone" },
    { id: "lead-gen", label: "Lead Generation", icon: Magnet, description: "Capture leads" },
    { id: "handoff", label: "Human Handoff", icon: UserPlus, description: "Escalation rules" },
];

export default function BehaviourPage() {
    const params = useParams<{ workspaceId: string; botId: string }>();
    const botId = Array.isArray(params.botId) ? params.botId[0] : params.botId;
    const workspaceId = Array.isArray(params.workspaceId) ? params.workspaceId[0] : params.workspaceId;

    const [behaviour, setBehaviour] = useState<BehaviourState>(DEFAULT_BEHAVIOUR_STATE);
    const [activeTab, setActiveTab] = useState<TabId>("identity");

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [isGeneratingMain, setIsGeneratingMain] = useState(false);
    const [isGeneratingLead, setIsGeneratingLead] = useState(false);
    const [isGeneratingHandoff, setIsGeneratingHandoff] = useState(false);

    useEffect(() => {
        if (botId) {
            posthog.capture("behavior_page_viewed", {
                chatbot_id: botId
            });
        }
    }, [botId]);

    useEffect(() => {
        async function loadData() {
            if (!botId || !workspaceId) return;
            setIsLoading(true);
            try {
                const [chatbotData, , widgetPrompt, leadPrompt, handoffPrompt, leadForm, behaviourConfigs] = await Promise.all([
                    getChatbot(workspaceId, botId),
                    getWidgetConfig(botId),
                    getChannelPrompt(botId, "WIDGET").catch(() => ({ systemPrompt: "" })),
                    getChannelPrompt(botId, "LEAD_GENERATION").catch(() => ({ systemPrompt: "" })),
                    getChannelPrompt(botId, "ESCALATION").catch(() => ({ systemPrompt: "" })),
                    getLeadFormConfig(botId).catch(() => null),
                    getBehaviourConfigs(botId).catch(() => []),
                ]);

                // Build a map of saved behaviour configs by section
                const savedConfigs: Record<string, any> = {};
                behaviourConfigs.forEach((cfg: any) => {
                    savedConfigs[cfg.section] = cfg.config;
                });

                setBehaviour(prev => ({
                    ...prev,
                    // Merge saved IDENTITY config (identity + style) if it exists
                    identity: savedConfigs.IDENTITY?.identity
                        ? { ...prev.identity, ...savedConfigs.IDENTITY.identity, aiName: chatbotData.name }
                        : { ...prev.identity, aiName: chatbotData.name },
                    style: savedConfigs.IDENTITY?.style
                        ? { ...prev.style, ...savedConfigs.IDENTITY.style }
                        : prev.style,
                    handoff: {
                        ...prev.handoff,
                        enabled: chatbotData.escalationEnabled ?? false,
                        // Merge saved HANDOFF config if it exists
                        ...(savedConfigs.HANDOFF || {}),
                        // Always use DB-sourced enabled state
                        ...(chatbotData.escalationEnabled !== undefined
                            ? { enabled: chatbotData.escalationEnabled }
                            : {}),
                        supportMode: savedConfigs.HANDOFF?.supportMode
                            ?? (chatbotData.escalationEnabled ? "When AI is unsure" : "AI only"),
                        systemPrompt: handoffPrompt?.systemPrompt || "",
                    },
                    leadGen: {
                        ...prev.leadGen,
                        form: leadForm?.data?.data || {
                            id: "", chatbotId: botId,
                            title: "Contact Us", subtitle: "We'll get back to you shortly",
                            ctaText: "Send Message", successMessage: "Thanks! We received your message.",
                            isEnabled: chatbotData.leadGenerationEnabled ?? false,
                            fields: [
                                { id: "default_name", label: "Name", type: "text", required: true, position: 0, systemField: "name", formId: "" },
                                { id: "default_email", label: "Email", type: "email", required: true, position: 1, systemField: "email", formId: "" },
                            ],
                            triggers: [], createdAt: new Date(), updatedAt: new Date(),
                        },
                        systemPrompt: leadPrompt?.systemPrompt || "",
                        leadConfig: savedConfigs.LEAD_GENERATION
                            ? { ...prev.leadGen.leadConfig, ...savedConfigs.LEAD_GENERATION }
                            : {
                                ...prev.leadGen.leadConfig,
                                pageTriggers: leadForm?.data?.data?.pageTriggers?.join(", ") ?? prev.leadGen.leadConfig.pageTriggers,
                                keywords: leadForm?.data?.data?.keywordTriggers?.join(", ") ?? prev.leadGen.leadConfig.keywords,
                            },
                    },
                    mainSystemPrompt: widgetPrompt?.systemPrompt || "",
                }));
            } catch (error) {
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
            if (activeTab === "identity") {
                promises.push(upsertChannelPrompt({ chatbotId: botId, channel: "WIDGET", systemPrompt: behaviour.mainSystemPrompt }));
                // Persist UI config
                promises.push(upsertBehaviourConfig(botId, "IDENTITY", {
                    identity: behaviour.identity,
                    style: behaviour.style,
                }));
            }
            if (activeTab === "lead-gen") {
                promises.push(updateChatbot({ id: botId, workspaceId, leadGenerationEnabled: behaviour.leadGen.form?.isEnabled ?? false }));
                promises.push(upsertChannelPrompt({ chatbotId: botId, channel: "LEAD_GENERATION", systemPrompt: behaviour.leadGen.systemPrompt }));
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
                            keywordTriggers: behaviour.leadGen.leadConfig.keywords.split(",").map(s => s.trim()).filter(Boolean),
                        },
                        fields: behaviour.leadGen.form.fields.map((f, i) => ({
                            ...f, position: i,
                            id: f.id.startsWith("temp_") ? undefined : f.id,
                            placeholder: f.placeholder || undefined,
                            options: f.options || undefined,
                            systemField: f.systemField || undefined,
                        })),
                        triggers: behaviour.leadGen.form.triggers.map(t => ({ ...t, id: t.id.startsWith("temp_") ? undefined : t.id })),
                    }));
                }
                // Persist UI config
                promises.push(upsertBehaviourConfig(botId, "LEAD_GENERATION", behaviour.leadGen.leadConfig));
            }
            if (activeTab === "handoff") {
                promises.push(updateChatbot({ id: botId, workspaceId, escalationEnabled: behaviour.handoff.enabled }));
                promises.push(upsertChannelPrompt({ chatbotId: botId, channel: "ESCALATION", systemPrompt: behaviour.handoff.systemPrompt }));
                // Persist UI config (exclude systemPrompt — that's in channel_prompts)
                promises.push(upsertBehaviourConfig(botId, "HANDOFF", {
                    supportMode: behaviour.handoff.supportMode,
                    escalationTriggers: behaviour.handoff.escalationTriggers,
                    fallbackAction: behaviour.handoff.fallbackAction,
                    additionalInstructions: behaviour.handoff.additionalInstructions,
                }));
            }
            await Promise.all(promises);
            toast.success("Changes saved successfully!");
        } catch (error) {
            toast.error("Failed to save changes");
        } finally {
            setIsSaving(false);
        }
    };

    const generatePrompt = async (
        type: "WIDGET" | "LEAD_GENERATION" | "ESCALATION",
        setLoading: (l: boolean) => void,
        setPrompt: (p: string) => void
    ) => {
        if (!botId) return;
        setLoading(true);
        try {
            let description = "";
            if (type === "WIDGET") description = serializeStateForPromptGen(behaviour, "IDENTITY");
            else if (type === "LEAD_GENERATION") description = serializeStateForPromptGen(behaviour, "LEAD_GEN");
            else if (type === "ESCALATION") description = serializeStateForPromptGen(behaviour, "HANDOFF");
            const res = await generateChannelPrompt({ chatbotId: botId, channel: type, userDescription: description });
            setPrompt(res.systemPrompt);
            toast.success(`Prompt generated!`);
        } catch {
            toast.error("Failed to generate prompt");
        } finally {
            setLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-48px)] flex bg-background overflow-hidden">

            {/* ── LEFT SIDEBAR ── */}
            <div className="flex-shrink-0 w-72 border-r border-border bg-card flex flex-col overflow-hidden">

                {/* Sidebar Header */}
                <div className="px-5 pt-6 pb-4 border-b border-border flex-shrink-0">
                    <h1 className="text-lg font-heading font-semibold text-foreground">Behaviour</h1>
                    <p className="text-xs text-muted-foreground mt-1">Train how your AI interacts with visitors.</p>
                </div>

                {/* Nav Tabs */}
                <nav className="flex flex-col gap-1 p-3 flex-shrink-0">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    posthog.capture("behavior_tab_clicked", {
                                        chatbot_id: botId,
                                        tab_id: tab.id,
                                        tab_name: tab.label
                                    });
                                }}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4 shrink-0" />
                                <div className="min-w-0">
                                    <p className={cn("text-sm font-medium leading-none", isActive ? "text-primary" : "text-foreground")}>{tab.label}</p>
                                    <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{tab.description}</p>
                                </div>
                            </button>
                        );
                    })}
                </nav>

                {/* AI Summary Card */}
                <div className="mx-3 mt-2 rounded-lg border border-border bg-muted/30 p-3 flex-shrink-0">
                    <div className="flex items-center gap-2 mb-2.5">
                        <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="text-xs font-semibold text-foreground">Your AI will:</span>
                    </div>
                    <ul className="space-y-1.5">
                        {[
                            { label: "Answer questions", enabled: true },
                            { label: "Escalate to human", enabled: behaviour.handoff.enabled },
                            { label: "Capture leads", enabled: behaviour.leadGen.form?.isEnabled ?? false },
                            { label: `Stay ${behaviour.style.tone.toLowerCase()}`, enabled: true },
                        ].map((item) => (
                            <li key={item.label} className="flex items-center gap-1.5 text-xs text-foreground">
                                {item.enabled
                                    ? <CheckCircle2 className="h-3 w-3 text-green-500 shrink-0" />
                                    : <XCircle className="h-3 w-3 text-muted-foreground/50 shrink-0" />
                                }
                                <span className={item.enabled ? "" : "text-muted-foreground"}>{item.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Spacer pushes footer to bottom */}
                <div className="flex-1 min-h-4" />

                {/* Info Banner + Save */}
                <div className="p-3 border-t border-border flex-shrink-0 space-y-2">
                    <div className="flex items-start gap-1.5 px-2 py-1.5 bg-primary/5 border border-primary/20 rounded-md">
                        <Sparkles className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                        <span className="text-[10px] text-primary leading-tight">Write in plain language — we'll craft the perfect prompt!</span>
                    </div>
                    <Button onClick={handleSave} disabled={isSaving} className="w-full h-9" size="sm">
                        {isSaving ? <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" /> : <Save className="mr-2 h-3.5 w-3.5" />}
                        Save Changes
                    </Button>
                </div>
            </div>

            {/* ── RIGHT CONTENT ── */}
            <div className="flex-1 overflow-y-auto bg-muted/20">
                <div className="w-full px-6 py-7">

                    {/* Content Header */}
                    <div className="mb-5">
                        <h2 className="text-xl font-heading font-semibold text-foreground">
                            {TABS.find(t => t.id === activeTab)?.label}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-0.5">
                            {activeTab === "identity" && "Configure your AI's name, role, tone, and core instructions."}
                            {activeTab === "lead-gen" && "Set up lead capture triggers, form fields, and detection strategy."}
                            {activeTab === "handoff" && "Define when and how conversations escalate to a human agent."}
                        </p>
                    </div>

                    {/* Card container */}
                    <div className="bg-card rounded-xl border border-border shadow-sm">
                        <div className="p-6">
                            {activeTab === "identity" && (
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
                            )}

                            {activeTab === "lead-gen" && (
                                <LeadGenCard
                                    state={behaviour.leadGen}
                                    onChange={(s) => setBehaviour(prev => ({ ...prev, leadGen: s }))}
                                    onGenerate={() => generatePrompt("LEAD_GENERATION", setIsGeneratingLead, (p) => setBehaviour(prev => ({
                                        ...prev, leadGen: { ...prev.leadGen, systemPrompt: p },
                                    })))}
                                    isGenerating={isGeneratingLead}
                                />
                            )}

                            {activeTab === "handoff" && (
                                <HandoffCard
                                    state={behaviour.handoff}
                                    onChange={(s) => setBehaviour(prev => ({ ...prev, handoff: s }))}
                                    onGenerate={() => generatePrompt("ESCALATION", setIsGeneratingHandoff, (p) => setBehaviour(prev => ({
                                        ...prev, handoff: { ...prev.handoff, systemPrompt: p },
                                    })))}
                                    isGenerating={isGeneratingHandoff}
                                />
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
