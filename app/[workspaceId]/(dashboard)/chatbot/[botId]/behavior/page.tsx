"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Save, Sparkles, User, Magnet, UserPlus, CheckCircle2, XCircle, AlertCircle, Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

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

// Deep equality helper for comparing states
function deepEqual(a: any, b: any): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
}

export default function BehaviourPage() {
    const params = useParams<{ workspaceId: string; botId: string }>();
    const botId = Array.isArray(params.botId) ? params.botId[0] : params.botId;
    const workspaceId = Array.isArray(params.workspaceId) ? params.workspaceId[0] : params.workspaceId;

    const [behaviour, setBehaviour] = useState<BehaviourState>(DEFAULT_BEHAVIOUR_STATE);
    const [originalBehaviour, setOriginalBehaviour] = useState<BehaviourState | null>(null);
    const [activeTab, setActiveTab] = useState<TabId>("identity");

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [isGeneratingMain, setIsGeneratingMain] = useState(false);
    const [isGeneratingLead, setIsGeneratingLead] = useState(false);
    const [isGeneratingHandoff, setIsGeneratingHandoff] = useState(false);

    // Track if prompt was generated since last config change
    const [promptGeneratedFlags, setPromptGeneratedFlags] = useState({
        identity: false,
        leadGen: false,
        handoff: false,
    });

    // Dialog state
    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [pendingSectionsToGenerate, setPendingSectionsToGenerate] = useState<TabId[]>([]);

    // Compute changes per section
    const hasChanges = useMemo(() => ({
        identity: originalBehaviour
            ? !deepEqual(originalBehaviour.identity, behaviour.identity) ||
              !deepEqual(originalBehaviour.style, behaviour.style)
            : false,
        leadGen: originalBehaviour
            ? !deepEqual(originalBehaviour.leadGen, behaviour.leadGen)
            : false,
        handoff: originalBehaviour
            ? !deepEqual(originalBehaviour.handoff, behaviour.handoff)
            : false,
    }), [originalBehaviour, behaviour]);

    const anyChanges = hasChanges.identity || hasChanges.leadGen || hasChanges.handoff;

    // Wrapper to update behaviour and reset prompt flags when config changes
    const updateBehaviour = (updater: (prev: BehaviourState) => BehaviourState) => {
        setBehaviour(prev => {
            const newState = updater(prev);
            // Reset prompt flags since config changed
            setPromptGeneratedFlags({
                identity: false,
                leadGen: false,
                handoff: false,
            });
            return newState;
        });
    };

    useEffect(() => {
        async function loadData() {
            if (!botId || !workspaceId) return;
            setIsLoading(true);
            try {
                const [chatbotData, , widgetPrompt, leadPrompt, handoffPrompt, leadFormData, behaviourConfigs] = await Promise.all([
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

                const loadedBehaviour: BehaviourState = {
                    ...DEFAULT_BEHAVIOUR_STATE,
                    // Merge saved IDENTITY config (identity + style) if it exists
                    // aiName comes from chatbotData.name as source of truth, but other identity fields from saved config
                    identity: {
                        ...DEFAULT_BEHAVIOUR_STATE.identity,
                        ...(savedConfigs.IDENTITY?.identity || {}),
                        aiName: chatbotData.name || DEFAULT_BEHAVIOUR_STATE.identity.aiName,
                    },
                    style: savedConfigs.IDENTITY?.style
                        ? { ...DEFAULT_BEHAVIOUR_STATE.style, ...savedConfigs.IDENTITY.style }
                        : DEFAULT_BEHAVIOUR_STATE.style,
                    handoff: {
                        ...DEFAULT_BEHAVIOUR_STATE.handoff,
                        enabled: chatbotData.escalationEnabled ?? false,
                        // Merge saved HANDOFF config if it exists (preserving escalationTriggers, fallbackAction, additionalInstructions)
                        escalationTriggers: savedConfigs.HANDOFF?.escalationTriggers
                            ? { ...DEFAULT_BEHAVIOUR_STATE.handoff.escalationTriggers, ...savedConfigs.HANDOFF.escalationTriggers }
                            : DEFAULT_BEHAVIOUR_STATE.handoff.escalationTriggers,
                        fallbackAction: savedConfigs.HANDOFF?.fallbackAction
                            ?? DEFAULT_BEHAVIOUR_STATE.handoff.fallbackAction,
                        additionalInstructions: savedConfigs.HANDOFF?.additionalInstructions
                            ?? DEFAULT_BEHAVIOUR_STATE.handoff.additionalInstructions,
                        // Determine supportMode: prefer saved config, then derive from enabled flag, then default
                        supportMode: savedConfigs.HANDOFF?.supportMode
                            ?? (chatbotData.escalationEnabled ? "When AI is unsure" : "AI only"),
                        systemPrompt: handoffPrompt?.systemPrompt || "",
                    },
                    leadGen: {
                        ...DEFAULT_BEHAVIOUR_STATE.leadGen,
                        form: leadFormData ? {
                            ...leadFormData,
                            // Always use chatbot's leadGenerationEnabled as the source of truth
                            isEnabled: chatbotData.leadGenerationEnabled ?? false,
                        } : {
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
                            ? { ...DEFAULT_BEHAVIOUR_STATE.leadGen.leadConfig, ...savedConfigs.LEAD_GENERATION }
                            : {
                                ...DEFAULT_BEHAVIOUR_STATE.leadGen.leadConfig,
                                pageTriggers: leadFormData?.pageTriggers?.join(", ") ?? DEFAULT_BEHAVIOUR_STATE.leadGen.leadConfig.pageTriggers,
                                keywords: leadFormData?.keywordTriggers?.join(", ") ?? DEFAULT_BEHAVIOUR_STATE.leadGen.leadConfig.keywords,
                            },
                    },
                    mainSystemPrompt: widgetPrompt?.systemPrompt || "",
                };

                setBehaviour(loadedBehaviour);
                setOriginalBehaviour(loadedBehaviour);
            } catch (error) {
                toast.error("Failed to load chatbot configuration");
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, [botId, workspaceId]);

    const performSave = async () => {
        if (!botId || !workspaceId) return;
        setIsSaving(true);
        try {
            const promises: Promise<any>[] = [];

            // Save all sections that have changes
            if (hasChanges.identity) {
                promises.push(upsertChannelPrompt({ chatbotId: botId, channel: "WIDGET", systemPrompt: behaviour.mainSystemPrompt }));
                // Persist UI config (aiName is the AI's self-reference during conversations, separate from chatbot name)
                promises.push(upsertBehaviourConfig(botId, "IDENTITY", {
                    identity: behaviour.identity,
                    style: behaviour.style,
                }));
            }
            if (hasChanges.leadGen) {
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
                        fields: (behaviour.leadGen.form.fields ?? []).map((f, i) => ({
                            label: f.label,
                            type: f.type,
                            required: f.required,
                            position: i,
                            id: f.id.startsWith("temp_") ? undefined : f.id,
                            placeholder: f.placeholder || undefined,
                            options: f.options || undefined,
                            systemField: f.systemField === 'none' || f.systemField === null ? undefined : f.systemField,
                        })),
                        triggers: (behaviour.leadGen.form.triggers ?? []).map(t => ({ ...t, id: t.id.startsWith("temp_") ? undefined : t.id })),
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

            // Update original state after successful save
            setOriginalBehaviour(behaviour);
            // Reset flags after save
            setPromptGeneratedFlags({ identity: false, leadGen: false, handoff: false });

            toast.success("Changes saved successfully!");
        } catch (error) {
            console.error("Save error:", error);
            toast.error(error instanceof Error ? error.message : "Failed to save changes");
        } finally {
            setIsSaving(false);
        }
    };

    const handleSave = async () => {
        // Determine which sections have changes AND haven't generated prompt since
        const sectionsNeedingPrompt: TabId[] = [];
        if (hasChanges.identity && !promptGeneratedFlags.identity) sectionsNeedingPrompt.push("identity");
        if (hasChanges.leadGen && !promptGeneratedFlags.leadGen) sectionsNeedingPrompt.push("lead-gen");
        if (hasChanges.handoff && !promptGeneratedFlags.handoff) sectionsNeedingPrompt.push("handoff");

        // If there are sections needing prompt, show dialog
        if (sectionsNeedingPrompt.length > 0) {
            setPendingSectionsToGenerate(sectionsNeedingPrompt);
            setShowSaveDialog(true);
            return;
        }

        // Otherwise just save
        await performSave();
    };

    const generateAllNeededPrompts = async () => {
        setShowSaveDialog(false);

        // Generate prompts for all pending sections
        for (const section of pendingSectionsToGenerate) {
            if (section === "identity") {
                await generatePrompt(
                    "WIDGET",
                    setIsGeneratingMain,
                    (p) => setBehaviour(prev => ({ ...prev, mainSystemPrompt: p }))
                );
            } else if (section === "lead-gen") {
                await generatePrompt(
                    "LEAD_GENERATION",
                    setIsGeneratingLead,
                    (p) => setBehaviour(prev => ({ ...prev, leadGen: { ...prev.leadGen, systemPrompt: p } }))
                );
            } else if (section === "handoff") {
                await generatePrompt(
                    "ESCALATION",
                    setIsGeneratingHandoff,
                    (p) => setBehaviour(prev => ({ ...prev, handoff: { ...prev.handoff, systemPrompt: p } }))
                );
            }
        }

        // After generating all prompts, save
        await performSave();
    };

    const saveOnly = async () => {
        setShowSaveDialog(false);
        await performSave();
    };

    const getSectionLabel = (id: TabId) => TABS.find(t => t.id === id)?.label || id;

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

            // Mark the appropriate flag as generated
            setPromptGeneratedFlags(prev => ({
                ...prev,
                ...(type === "WIDGET" && { identity: true }),
                ...(type === "LEAD_GENERATION" && { leadGen: true }),
                ...(type === "ESCALATION" && { handoff: true }),
            }));

            toast.success(`Prompt generated!`);
        } catch {
            toast.error("Failed to generate prompt");
        } finally {
            setLoading(false);
        }
    };

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
                        const tabHasChanges =
                            (tab.id === "identity" && hasChanges.identity) ||
                            (tab.id === "lead-gen" && hasChanges.leadGen) ||
                            (tab.id === "handoff" && hasChanges.handoff);
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4 shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className={cn("text-sm font-medium leading-none", isActive ? "text-primary" : "text-foreground")}>{tab.label}</p>
                                        {tabHasChanges && (
                                            <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0" title="Unsaved changes" />
                                        )}
                                    </div>
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
                    <Button onClick={handleSave} disabled={!anyChanges || isSaving} className="w-full h-9" size="sm">
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
                    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                        <div>
                            {activeTab === "identity" && (
                                <IdentityCard
                                    identity={behaviour.identity}
                                    onIdentityChange={(s) => updateBehaviour(prev => ({ ...prev, identity: s }))}
                                    style={behaviour.style}
                                    onStyleChange={(s) => updateBehaviour(prev => ({ ...prev, style: s }))}
                                    systemPrompt={behaviour.mainSystemPrompt}
                                    onSystemPromptChange={(p) => updateBehaviour(prev => ({ ...prev, mainSystemPrompt: p }))}
                                    onGenerate={() => generatePrompt("WIDGET", setIsGeneratingMain, (p) => updateBehaviour(prev => ({ ...prev, mainSystemPrompt: p })))}
                                    isGenerating={isGeneratingMain}
                                />
                            )}

                            {activeTab === "lead-gen" && (
                                <LeadGenCard
                                    state={behaviour.leadGen}
                                    onChange={(s) => updateBehaviour(prev => ({ ...prev, leadGen: s }))}
                                    onGenerate={() => generatePrompt("LEAD_GENERATION", setIsGeneratingLead, (p) => updateBehaviour(prev => ({
                                        ...prev, leadGen: { ...prev.leadGen, systemPrompt: p },
                                    })))}
                                    isGenerating={isGeneratingLead}
                                />
                            )}

                            {activeTab === "handoff" && (
                                <HandoffCard
                                    state={behaviour.handoff}
                                    onChange={(s) => updateBehaviour(prev => ({ ...prev, handoff: s }))}
                                    onGenerate={() => generatePrompt("ESCALATION", setIsGeneratingHandoff, (p) => updateBehaviour(prev => ({
                                        ...prev, handoff: { ...prev.handoff, systemPrompt: p },
                                    })))}
                                    isGenerating={isGeneratingHandoff}
                                />
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* Save Confirmation Dialog */}
            <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-amber-500" />
                            Generate Optimized Prompt{pendingSectionsToGenerate.length > 1 ? "s" : ""}?
                        </DialogTitle>
                        <DialogDescription className="pt-2">
                            {pendingSectionsToGenerate.length === 1 ? (
                                <>
                                    You have config changes in <strong>{getSectionLabel(pendingSectionsToGenerate[0])}</strong>.
                                    Generate an optimized prompt to maximize AI performance?"
                                </>
                            ) : (
                                <>
                                    You have config changes in:
                                    <ul className="mt-2 space-y-1">
                                        {pendingSectionsToGenerate.map(section => (
                                            <li key={section} className="flex items-center gap-2 text-foreground">
                                                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                {getSectionLabel(section)}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="mt-3">Generate optimized prompts for these sections to maximize AI performance?</p>
                                </>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
                        <Button variant="outline" onClick={() => setShowSaveDialog(false)} disabled={isSaving}>
                            Cancel
                        </Button>
                        <Button variant="secondary" onClick={saveOnly} disabled={isSaving}>
                            Save Only
                        </Button>
                        <Button onClick={generateAllNeededPrompts} disabled={isSaving} className="gap-2">
                            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                            Generate{pendingSectionsToGenerate.length > 1 ? " All" : ""} & Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
