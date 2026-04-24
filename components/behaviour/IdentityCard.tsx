"use client";

import { PromptEditor, PaletteGroup } from "./PromptEditor";
import {
    IdentityState,
    RoleType,
    StyleState,
    ToneType,
    ResponseLengthType,
} from "./BehaviourState";

interface IdentityCardProps {
    identity: IdentityState;
    onIdentityChange: (newState: IdentityState) => void;
    style: StyleState;
    onStyleChange: (newState: StyleState) => void;
    systemPrompt: string;
    onSystemPromptChange: (newPrompt: string) => void;
    onGenerate: () => void;
    isGenerating: boolean;
}

const ROLE_OPTIONS: { label: string; value: RoleType }[] = [
    { label: "Customer Support Agent", value: "Customer Support Agent" },
    { label: "Sales Assistant", value: "Sales Assistant" },
    { label: "Product Expert", value: "Product Expert" },
    { label: "Consultant", value: "Consultant" },
    { label: "Custom", value: "Custom" },
];

const TONE_OPTIONS: { label: string; value: ToneType }[] = [
    { label: "Friendly", value: "Friendly" },
    { label: "Professional", value: "Professional" },
    { label: "Technical", value: "Technical" },
    { label: "Sales-focused", value: "Sales-focused" },
    { label: "Casual startup", value: "Casual startup" },
];

const LENGTH_OPTIONS: { label: string; value: ResponseLengthType }[] = [
    { label: "Concise", value: "Concise" },
    { label: "Balanced", value: "Balanced" },
    { label: "Detailed", value: "Detailed" },
];

export function IdentityCard({
    identity,
    onIdentityChange,
    style,
    onStyleChange,
    systemPrompt,
    onSystemPromptChange,
    onGenerate,
    isGenerating,
}: IdentityCardProps) {
    const updateIdentity = <K extends keyof IdentityState>(field: K, value: IdentityState[K]) => {
        onIdentityChange({ ...identity, [field]: value });
    };
    const updateStyle = (updates: Partial<StyleState>) => {
        onStyleChange({ ...style, ...updates });
    };

    const palette: PaletteGroup[] = [
        {
            label: "Identity",
            controls: [
                {
                    kind: "input",
                    label: "AI Agent Name",
                    value: identity.aiName,
                    placeholder: "e.g. Alice",
                    onChange: (v) => updateIdentity("aiName", v),
                },
                {
                    kind: "select",
                    label: "Role",
                    value: identity.role,
                    options: ROLE_OPTIONS,
                    onChange: (v) => updateIdentity("role", v as RoleType),
                },
            ],
        },
        {
            label: "Conversation Style",
            controls: [
                {
                    kind: "select",
                    label: "Tone of Voice",
                    value: style.tone,
                    options: TONE_OPTIONS,
                    onChange: (v) => updateStyle({ tone: v as ToneType }),
                },
                {
                    kind: "select",
                    label: "Response Depth",
                    value: style.responseLength,
                    options: LENGTH_OPTIONS,
                    onChange: (v) => updateStyle({ responseLength: v as ResponseLengthType }),
                },
                {
                    kind: "toggle",
                    label: "Use emojis",
                    description: "Include emojis in AI responses",
                    checked: style.useEmojis,
                    onChange: (v) => updateStyle({ useEmojis: v }),
                },
                {
                    kind: "toggle",
                    label: "Ask follow-up questions",
                    description: "Proactively ask clarifying questions",
                    checked: style.askFollowUp,
                    onChange: (v) => updateStyle({ askFollowUp: v }),
                },
            ],
        },
        {
            label: "Insert Section",
            controls: [
                {
                    kind: "insert",
                    label: "Primary Goal",
                    snippet: "## Primary Goal\n- ",
                },
                {
                    kind: "insert",
                    label: "Boundaries & Guardrails",
                    snippet: "## Boundaries\n- Never: ",
                },
                {
                    kind: "insert",
                    label: "Example Response",
                    snippet: "## Example\nUser: \nAssistant: ",
                },
                {
                    kind: "insert",
                    label: "Tone Guidance",
                    snippet: "## Tone\n- ",
                },
            ],
        },
    ];

    return (
        <PromptEditor
            value={systemPrompt}
            onChange={onSystemPromptChange}
            onRegenerateFromControls={onGenerate}
            isRegenerating={isGenerating}
            palette={palette}
            placeholder="Describe how your AI should behave. You can write freely, or use the palette on the right to insert common sections and regenerate from structured controls."
        />
    );
}
