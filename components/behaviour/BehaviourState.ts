import { ChannelType } from "@/types/prompt";

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

export interface LeadGenState {
    enabled: boolean;
    strategy: "Passive (intent-based)" | "After helpful conversation" | "Early proactive";
    whenToAsk: {
        afterPricing: boolean;
        afterRecommendation: boolean;
        returningVisitor: boolean;
        afterMessages: boolean;
        messageCount: number;
    };
    infoToCollect: {
        name: boolean;
        email: boolean;
        phone: boolean;
        company: boolean;
        custom: boolean;
        customQuestion: string;
    };
    message: string;
    additionalInstructions: string;
    // The actual prompt for LEAD_GENERATION channel
    systemPrompt: string;
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
        enabled: true,
        strategy: "Passive (intent-based)",
        whenToAsk: {
            afterPricing: true,
            afterRecommendation: true,
            returningVisitor: false,
            afterMessages: false,
            messageCount: 5,
        },
        infoToCollect: {
            name: true,
            email: true,
            phone: false,
            company: false,
            custom: false,
            customQuestion: "",
        },
        message: "I can send you the best plan for your needs — where should I send it?",
        additionalInstructions: "",
        systemPrompt: "",
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
    // ... existing generateSystemPromptFromState ...
    if (state.leadGen.strategy === "Passive (intent-based)") {
        parts.push(`\nIf the user seems interested in moving forward or asks about pricing/plans, politely ask for their details using this message: "${state.leadGen.message}"`);
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

    if (section === "LEAD_GEN" && state.leadGen.enabled) {
        parts.push(`Strategy: ${state.leadGen.strategy}`);
        parts.push(`Collect: ${Object.entries(state.leadGen.infoToCollect).filter(([k, v]) => v && k !== 'customQuestion').map(([k]) => k).join(", ")}`);
        if (state.leadGen.message) parts.push(`Ask Message: "${state.leadGen.message}"`);
        if (state.leadGen.additionalInstructions) parts.push(`User Custom Instructions: ${state.leadGen.additionalInstructions}`);
    }

    if (section === "HANDOFF" && state.handoff.enabled) {
        parts.push(`Support Mode: ${state.handoff.supportMode}`);
        parts.push(`Triggers: ${Object.entries(state.handoff.escalationTriggers).filter(([_, v]) => v).map(([k]) => k).join(", ")}`);
        if (state.handoff.additionalInstructions) parts.push(`User Custom Instructions: ${state.handoff.additionalInstructions}`);
    }

    return parts.join("\n");
}
