"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Save, Sparkles, User, Magnet, UserPlus, CheckCircle2, XCircle, AlertCircle, Wand2, FileSearch } from "lucide-react";

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
import { PageContextCard } from "@/components/behaviour/PageContextCard";
import {
    BehaviourState,
    DEFAULT_BEHAVIOUR_STATE,
    serializeStateForPromptGen
} from "@/components/behaviour/BehaviourState";
import { generateChannelPrompt, getChannelPrompt, upsertChannelPrompt } from "@/lib/api/prompt";
import { getBehaviourConfigs, upsertBehaviourConfig } from "@/lib/api/behaviour-config";

type TabId = "identity" | "lead-gen" | "handoff" | "page-context";

const TABS: { id: TabId; label: string; icon: React.ElementType; description: string }[] = [
    { id: "identity", label: "Identity", icon: User, description: "Personality & tone" },
    { id: "lead-gen", label: "Lead Generation", icon: Magnet, description: "Capture leads" },
    { id: "handoff", label: "Human Handoff", icon: UserPlus, description: "Escalation rules" },
    { id: "page-context", label: "Page Context", icon: FileSearch, description: "Read the current page" },
];

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

    const [promptGeneratedFlags, setPromptGeneratedFlags] = useState({
        identity: false,
        leadGen: false,
        handoff: false,
    });

    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [pendingSectionsToGenerate, setPendingSectionsToGenerate] = useState<TabId[]>([]);

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
        pageContext: originalBehaviour
            ? originalBehaviour.pageContextEnabled !== behaviour.pageContextEnabled
            : false,
    }), [originalBehaviour, behaviour]);

    const anyChanges = hasChanges.identity || hasChanges.leadGen || hasChanges.handoff || hasChanges.pageContext;

    const updateBehaviour = (updater: (prev: BehaviourState) => BehaviourState) => {
        setBehaviour(prev => {
            const newState = updater(prev);
            setPromptGeneratedFlags({ identity: false, leadGen: false, handoff: false });
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

                const savedConfigs: Record<string, any> = {};
                behaviourConfigs.forEach((cfg: any) => { savedConfigs[cfg.section] = cfg.config; });

                const loadedBehaviour: BehaviourState = {
                    ...DEFAULT_BEHAVIOUR_STATE,
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
                        escalationTriggers: savedConfigs.HANDOFF?.escalationTriggers
                            ? { ...DEFAULT_BEHAVIOUR_STATE.handoff.escalationTriggers, ...savedConfigs.HANDOFF.escalationTriggers }
                            : DEFAULT_BEHAVIOUR_STATE.handoff.escalationTriggers,
                        fallbackAction: savedConfigs.HANDOFF?.fallbackAction ?? DEFAULT_BEHAVIOUR_STATE.handoff.fallbackAction,
                        additionalInstructions: savedConfigs.HANDOFF?.additionalInstructions ?? DEFAULT_BEHAVIOUR_STATE.handoff.additionalInstructions,
                        supportMode: savedConfigs.HANDOFF?.supportMode ?? (chatbotData.escalationEnabled ? "When AI is unsure" : "AI only"),
                        systemPrompt: handoffPrompt?.systemPrompt || "",
                    },
                    leadGen: {
                        ...DEFAULT_BEHAVIOUR_STATE.leadGen,
                        form: leadFormData ? {
                            ...leadFormData,
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
                    pageContextEnabled: chatbotData.pageContextEnabled ?? false,
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

            if (hasChanges.identity) {
                promises.push(upsertChannelPrompt({ chatbotId: botId, channel: "WIDGET", systemPrompt: behaviour.mainSystemPrompt }));
                promises.push(upsertBehaviourConfig(botId, "IDENTITY", { identity: behaviour.identity, style: behaviour.style }));
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
                            label: f.label, type: f.type, required: f.required, position: i,
                            id: f.id.startsWith("temp_") ? undefined : f.id,
                            placeholder: f.placeholder || undefined, options: f.options || undefined,
                            systemField: f.systemField === 'none' || f.systemField === null ? undefined : f.systemField,
                        })),
                        triggers: (behaviour.leadGen.form.triggers ?? []).map(t => ({ ...t, id: t.id.startsWith("temp_") ? undefined : t.id })),
                    }));
                }
                promises.push(upsertBehaviourConfig(botId, "LEAD_GENERATION", behaviour.leadGen.leadConfig));
            }

            if (activeTab === "handoff") {
                promises.push(updateChatbot({ id: botId, workspaceId, escalationEnabled: behaviour.handoff.enabled }));
                promises.push(upsertChannelPrompt({ chatbotId: botId, channel: "ESCALATION", systemPrompt: behaviour.handoff.systemPrompt }));
                promises.push(upsertBehaviourConfig(botId, "HANDOFF", {
                    supportMode: behaviour.handoff.supportMode,
                    escalationTriggers: behaviour.handoff.escalationTriggers,
                    fallbackAction: behaviour.handoff.fallbackAction,
                    additionalInstructions: behaviour.handoff.additionalInstructions,
                }));
            }
            if (hasChanges.pageContext) {
                promises.push(updateChatbot({ id: botId, workspaceId, pageContextEnabled: behaviour.pageContextEnabled }));
            }
            await Promise.all(promises);

            setOriginalBehaviour(behaviour);
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
        const sectionsNeedingPrompt: TabId[] = [];
        if (hasChanges.identity && !promptGeneratedFlags.identity) sectionsNeedingPrompt.push("identity");
        if (hasChanges.leadGen && !promptGeneratedFlags.leadGen) sectionsNeedingPrompt.push("lead-gen");
        if (hasChanges.handoff && !promptGeneratedFlags.handoff) sectionsNeedingPrompt.push("handoff");

        if (sectionsNeedingPrompt.length > 0) {
            setPendingSectionsToGenerate(sectionsNeedingPrompt);
            setShowSaveDialog(true);
            return;
        }
        await performSave();
    };

    const generateAllNeededPrompts = async () => {
        setShowSaveDialog(false);
        for (const section of pendingSectionsToGenerate) {
            if (section === "identity") {
                await generatePrompt("WIDGET", setIsGeneratingMain, (p) => setBehaviour(prev => ({ ...prev, mainSystemPrompt: p })));
            } else if (section === "lead-gen") {
                await generatePrompt("LEAD_GENERATION", setIsGeneratingLead, (p) => setBehaviour(prev => ({ ...prev, leadGen: { ...prev.leadGen, systemPrompt: p } })));
            } else if (section === "handoff") {
                await generatePrompt("ESCALATION", setIsGeneratingHandoff, (p) => setBehaviour(prev => ({ ...prev, handoff: { ...prev.handoff, systemPrompt: p } })));
            }
        }
        await performSave();
    };

    const saveOnly = async () => { setShowSaveDialog(false); await performSave(); };
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
        <div className="h-[calc(100vh-48px)] flex bg-[var(--surface-secondary)] overflow-hidden">

            {/* ── LEFT SIDEBAR ── */}
            <div className="flex w-[272px] flex-shrink-0 flex-col overflow-hidden border-r border-sidebar-border/80 bg-sidebar">

                {/* Sidebar Header */}
                <div className="flex-shrink-0 border-b border-sidebar-border/70 px-4 pt-5 pb-3">
                    <h1 className="text-sm font-semibold text-foreground">Behaviour</h1>
                    <p className="text-xs text-foreground/65 mt-0.5">Train how your AI interacts.</p>
                </div>

                {/* Nav */}
                <nav className="flex flex-shrink-0 flex-col gap-1.5 p-3">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        const tabHasChanges =
                            (tab.id === "identity" && hasChanges.identity) ||
                            (tab.id === "lead-gen" && hasChanges.leadGen) ||
                            (tab.id === "handoff" && hasChanges.handoff) ||
                            (tab.id === "page-context" && hasChanges.pageContext);
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                data-active={isActive}
                                className={cn(
                                    "group flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-all",
                                    isActive
                                        ? "border-sidebar-border/70 bg-sidebar-accent/60 text-sidebar-primary shadow-xs"
                                        : "border-transparent text-muted-foreground hover:border-sidebar-border/60 hover:bg-sidebar-accent/60 hover:text-foreground"
                                )}
                            >
                                <div
                                    className={cn(
                                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-sidebar-border/70 bg-background shadow-xs transition-colors",
                                        isActive ? "text-sidebar-primary" : "text-muted-foreground group-hover:text-foreground"
                                    )}
                                >
                                    <Icon className="size-4 shrink-0" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="truncate text-sm font-medium">{tab.label}</span>
                                        {tabHasChanges && (
                                            <span className="size-1.5 shrink-0 rounded-full bg-[var(--status-warning-fg)]" />
                                        )}
                                    </div>
                                    <p className={cn(
                                        "mt-0.5 truncate text-xs",
                                        isActive ? "text-sidebar-primary/80" : "text-muted-foreground"
                                    )}>
                                        {tab.description}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </nav>

                {/* AI Summary */}
                <div className="mx-3 mt-2 flex-shrink-0 rounded-2xl border border-sidebar-border/70 bg-background p-3 shadow-xs">
                    <div className="flex items-center gap-1.5 mb-2">
                        <Sparkles className="size-3 text-primary shrink-0" />
                        <span className="text-xs font-semibold text-foreground">Your AI will:</span>
                    </div>
                    <ul className="space-y-1.5">
                        {[
                            { label: "Answer questions", enabled: true },
                            { label: "Escalate to human", enabled: behaviour.handoff.enabled },
                            { label: "Capture leads", enabled: behaviour.leadGen.form?.isEnabled ?? false },
                            { label: "Use page context", enabled: behaviour.pageContextEnabled },
                            { label: `Stay ${behaviour.style.tone.toLowerCase()}`, enabled: true },
                        ].map((item) => (
                            <li key={item.label} className="flex items-center gap-1.5 text-xs">
                                {item.enabled
                                    ? <CheckCircle2 className="size-3 text-[var(--status-success-fg)] shrink-0" />
                                    : <XCircle className="size-3 text-muted-foreground/40 shrink-0" />
                                }
                                <span className={item.enabled ? "text-foreground" : "text-muted-foreground"}>{item.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex-1 min-h-4" />

                {/* Footer */}
                <div className="flex-shrink-0 space-y-2 border-t border-sidebar-border/60 p-3">
                    <div className="flex items-start gap-1.5 rounded-2xl border border-[var(--status-info-border)] bg-[var(--status-info-bg)] px-3 py-2">
                        <Sparkles className="size-3 text-[var(--status-info-fg)] shrink-0 mt-0.5" />
                        <span className="text-[10px] text-[var(--status-info-fg)] leading-tight">Write in plain language — we'll craft the perfect prompt!</span>
                    </div>
                    <Button
                        onClick={handleSave}
                        disabled={!anyChanges || isSaving}
                        className="w-full"
                        size="sm"
                    >
                        {isSaving
                            ? <Loader2 className="size-3.5 animate-spin" />
                            : <Save className="size-3.5" />
                        }
                        Save Changes
                    </Button>
                </div>
            </div>

            {/* ── RIGHT CONTENT ── */}
            <div className="flex-1 overflow-y-auto">
                <div className="w-full px-6 py-6">

                    {/* Page Header */}
                    <div className="mb-4">
                        <h2 className="type-card-title">
                            {TABS.find(t => t.id === activeTab)?.label}
                        </h2>
                        <p className="text-xs text-foreground/65 mt-1">
                            {activeTab === "identity" && "Configure your AI's name, role, tone, and core instructions."}
                            {activeTab === "lead-gen" && "Set up lead capture triggers, form fields, and detection strategy."}
                            {activeTab === "handoff" && "Define when and how conversations escalate to a human agent."}
                            {activeTab === "page-context" && "Control whether the AI can use the current page's visible content to answer contextually."}
                        </p>
                    </div>

                    {/* Card */}
                    <div className="dashboard-panel overflow-hidden">
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
                        {activeTab === "page-context" && (
                            <PageContextCard
                                enabled={behaviour.pageContextEnabled}
                                onChange={(enabled) => updateBehaviour(prev => ({ ...prev, pageContextEnabled: enabled }))}
                            />
                        )}
                    </div>

                </div>
            </div>

            {/* Save Confirmation Dialog */}
            <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
                <DialogContent className="sm:max-w-[440px] p-0">
                    <DialogHeader className="px-5 py-4 border-b border-[var(--border-secondary)]">
                        <DialogTitle className="flex items-center gap-2 text-base">
                            <AlertCircle className="size-4 text-[var(--status-warning-fg)]" />
                            Generate Optimized Prompt{pendingSectionsToGenerate.length > 1 ? "s" : ""}?
                        </DialogTitle>
                        <DialogDescription className="text-xs text-muted-foreground mt-1">
                            {pendingSectionsToGenerate.length === 1 ? (
                                <>Config changes in <strong className="text-foreground">{getSectionLabel(pendingSectionsToGenerate[0])}</strong> detected. Generate an optimized prompt?</>
                            ) : (
                                <>Config changes detected in: {pendingSectionsToGenerate.map(s => getSectionLabel(s)).join(", ")}. Generate optimized prompts for all?</>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="px-5 py-4 flex flex-row items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setShowSaveDialog(false)} disabled={isSaving}>
                            Cancel
                        </Button>
                        <Button variant="outline" size="sm" onClick={saveOnly} disabled={isSaving}>
                            Save Only
                        </Button>
                        <Button size="sm" onClick={generateAllNeededPrompts} disabled={isSaving}>
                            {isSaving ? <Loader2 className="size-3.5 animate-spin" /> : <Wand2 className="size-3.5" />}
                            Generate & Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
