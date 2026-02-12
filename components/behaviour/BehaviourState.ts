import { ChannelType } from "@/types/prompt";
import { LeadForm } from "@/types/lead-forms";

export type RoleType =
    | "Customer Support Agent"
    | "Sales Assistant"
    | "Product Expert"
    | "Consultant"
    | "Custom";

export type ToneType =
    | "Friendly"
    | "Professional"
    | "Technical"
    | "Sales-focused"
    | "Casual startup";

export type ResponseLengthType = "Concise" | "Balanced" | "Detailed";

export interface IdentityState {
    aiName: string;
    role: RoleType;
    purpose: string;
    constraints: string;
    // Main system prompt (WIDGET channel)
    topP?: number;
    temperature?: number;
}

export interface StyleState {
    tone: ToneType;
    responseLength: ResponseLengthType;
    useEmojis: boolean;
    askFollowUp: boolean;
    bePersuasive: boolean;
    beFactual: boolean;
    advancedInstructions: string;
}

export interface HandoffState {
    enabled: boolean;
    supportMode: "AI only" | "When visitor asks" | "When AI is unsure" | "Always show 'Talk to human'";
    escalationTriggers: {
        frustration: boolean;
        billing: boolean;
        repeated: boolean;
        legal: boolean;
    };
    fallbackAction: "Collect email" | "Create ticket" | "Notify business owner";
    additionalInstructions: string;
    // The actual prompt for ESCALATION channel
    systemPrompt: string;
}

// ----------------------------------------------------------------------------
// Lead Generation Configuration (UI State for Prompt Engineering)
// ----------------------------------------------------------------------------



export type LeadSensitivity = "Conservative" | "Balanced" | "Aggressive";

export interface LeadGenConfig {
    signals: {
        pricing: boolean;
        demo: boolean;
        human: boolean;
        started: boolean;
        plans: boolean;
        intent: boolean;
        repeated: boolean;
        custom: boolean;
    };
    customSignal: string;
    sensitivity: LeadSensitivity;
    keywords: string; // Comma separated
    pageTriggers: string; // Comma separated paths
}

export interface LeadGenState {
    // We now use the full LeadForm object from API
    form: LeadForm | null;
    // The actual prompt for LEAD_GENERATION channel
    systemPrompt: string;
    // UI Configuration for generating the prompt
    leadConfig: LeadGenConfig;
}

export interface BehaviourState {
    identity: IdentityState;
    style: StyleState;
    handoff: HandoffState;
    leadGen: LeadGenState;
    // We store the main prompt here or in identity?
    // Identity + Style = Main Prompt (WIDGET)
    mainSystemPrompt: string;
}

export const DEFAULT_BEHAVIOUR_STATE: BehaviourState = {
    identity: {
        aiName: "",
        role: "Customer Support Agent",
        purpose: "",
        constraints: "",
    },
    style: {
        tone: "Friendly",
        responseLength: "Balanced",
        useEmojis: true,
        askFollowUp: false,
        bePersuasive: false,
        beFactual: false,
        advancedInstructions: "",
    },
    handoff: {
        enabled: true,
        supportMode: "When AI is unsure",
        escalationTriggers: {
            frustration: true,
            billing: false,
            repeated: false,
            legal: false,
        },
        fallbackAction: "Collect email",
        additionalInstructions: "",
        systemPrompt: "",
    },
    leadGen: {
        form: null,
        systemPrompt: "",
        leadConfig: {
            signals: {
                pricing: true,
                demo: true,
                human: true,
                started: false,
                plans: false,
                intent: false,
                repeated: false,
                custom: false,
            },
            customSignal: "",
            sensitivity: "Balanced",
            keywords: "",
            pageTriggers: "/pricing, /contact",
        }
    },
    mainSystemPrompt: "",
};

export function generateSystemPromptFromState(state: BehaviourState): string {
    const parts: string[] = [];

    // 1. Identity
    parts.push(`You are ${state.identity.aiName || "an AI assistant"}, acting as a ${state.identity.role}.`);
    if (state.identity.purpose) {
        parts.push(`Your primary goal is to: ${state.identity.purpose}`);
    }
    if (state.identity.constraints) {
        parts.push(`\nConstraints & Rules:\n${state.identity.constraints}`);
    }

    // 2. Style
    parts.push(`\nTone & Style:`);
    parts.push(`- Maintain a ${state.style.tone} tone.`);
    parts.push(`- Keep responses ${state.style.responseLength.toLowerCase()}.`);
    if (state.style.useEmojis) parts.push(`- Use relevant emojis to be friendly.`);
    if (state.style.askFollowUp) parts.push(`- Ask clarifying follow-up questions when needed.`);
    if (state.style.bePersuasive) parts.push(`- Be persuasive and focus on value proposition.`);
    if (state.style.beFactual) parts.push(`- Be strictly factual and objective.`);

    if (state.style.advancedInstructions) {
        parts.push(`\nAdditional Instructions:\n${state.style.advancedInstructions}`);
    }

    // 3. Handoff context (This acts as instructions for the AI on when to give up)
    if (state.handoff.supportMode === "When AI is unsure") {
        parts.push(`\nIf you are unsure about an answer or cannot help, politely offer to connect the user with a human support agent.`);
    } else if (state.handoff.supportMode === "When visitor asks") {
        parts.push(`\nIf the user explicitly asks to speak to a human, facilitate that request immediately.`);
    }

    // 4. Lead Gen context (Instructions for when to ask for info)
    if (state.leadGen.form?.isEnabled) {
        const fields = state.leadGen.form.fields
            .map(f => f.label)
            .join(", ");

        parts.push(`\nLead Capture Strategy:`);
        parts.push(`- The goal is to capture leads using the form titled "${state.leadGen.form.title}".`);
        if (fields) parts.push(`- Information to collect: ${fields}`);
        if (state.leadGen.form.ctaText) parts.push(`- Call to Action: "${state.leadGen.form.ctaText}"`);

        // We can infer strategy from triggers if needed, but for now just general instruction
        parts.push(`\nIf the user seems interested in moving forward, asks about pricing, or seems like a potential lead, politely ask for their details.`);
    }

    return parts.join("\n");
}

/**
 * Serializes the UI state into a natural language description for the "Magic" prompt generator.
 */
export function serializeStateForPromptGen(
    state: BehaviourState,
    section: "IDENTITY" | "LEAD_GEN" | "HANDOFF"
): string {
    const parts: string[] = [];

    if (section === "IDENTITY") {
        parts.push(`Role: ${state.identity.role}`);
        if (state.identity.aiName) parts.push(`Name: ${state.identity.aiName}`);
        if (state.identity.purpose) parts.push(`Purpose: ${state.identity.purpose}`);
        if (state.identity.constraints) parts.push(`Constraints: ${state.identity.constraints}`);

        parts.push(`Tone: ${state.style.tone}`);
        parts.push(`Length: ${state.style.responseLength}`);
        parts.push(`Emojis: ${state.style.useEmojis ? "Yes" : "No"}`);
        if (state.style.advancedInstructions) parts.push(`Instructions: ${state.style.advancedInstructions}`);
    }

    if (section === "LEAD_GEN" && state.leadGen.form?.isEnabled) {
        const form = state.leadGen.form;
        const config = state.leadGen.leadConfig;

        parts.push(`Lead Form Title: ${form.title}`);
        parts.push(`Fields to Collect: ${form.fields.map(f => `${f.label}`).join(", ")}`);

        // Lead Detection Logic
        parts.push(`\n--- LEAD DETECTION STRATEGY ---`);

        // 1. Signals & Goal
        const signals = [];
        if (config.signals.pricing) signals.push("asks about pricing/cost");
        if (config.signals.demo) signals.push("asks for a demo");
        if (config.signals.human) signals.push("asks for a human");
        if (config.signals.started) signals.push("asks how to get started");
        if (config.signals.plans) signals.push("asks about plans/packages");
        if (config.signals.intent) signals.push("shows purchase intent");
        if (config.signals.repeated) signals.push("asks repeated questions");
        if (config.signals.custom && config.customSignal) signals.push(`Custom trigger: ${config.customSignal}`);

        if (signals.length > 0) parts.push(`High Intent Signals (Trigger Form): ${signals.join(", ")}`);

        // 2. Page Specifics
        if (config.pageTriggers) parts.push(`Target Pages: ${config.pageTriggers}`);


        // 3. Sensitivity
        parts.push(`Aggressiveness: ${config.sensitivity}`);

        // 4. Keywords
        if (config.keywords) parts.push(`Mandatory Keywords: ${config.keywords}`);
    }

    if (section === "HANDOFF" && state.handoff.enabled) {
        parts.push(`Support Mode: ${state.handoff.supportMode}`);
        parts.push(`Triggers: ${Object.entries(state.handoff.escalationTriggers).filter(([_, v]) => v).map(([k]) => k).join(", ")}`);
        if (state.handoff.additionalInstructions) parts.push(`User Custom Instructions: ${state.handoff.additionalInstructions}`);
    }

    return parts.join("\n");
}

