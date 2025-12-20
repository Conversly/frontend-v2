import * as React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LLM_MODELS } from "@/lib/constants/voice-options";
import { CollapsibleSection } from "./CollapsibleSection";
import { InfoTooltip } from "./InfoTooltip";
import { PromptAIHelper } from "@/components/shared/PromptAIHelper";

interface ModelConfigProps {
    config: any;
    onChange: (field: string, value: any) => void;
    chatbotId?: string;
}

export function ModelConfig({ config, onChange, chatbotId }: ModelConfigProps) {
    return (
        <div className="space-y-4">


            <CollapsibleSection
                id="model-config"
                title="Model"
                description="Configure the behavior of the assistant."
                defaultOpen={true}
            >
                {/* Provider + Model Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="flex items-center gap-1.5">
                            Provider
                        </Label>
                        <Select
                            value={config.llmProvider || "openai"}
                            onValueChange={(value) =>
                                onChange("llmProvider", value)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select provider" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="openai">
                                    <div className="flex items-center gap-2">
                                        <span>🤖</span> OpenAI
                                    </div>
                                </SelectItem>
                                <SelectItem value="anthropic">
                                    <div className="flex items-center gap-2">
                                        <span>🧠</span> Anthropic
                                    </div>
                                </SelectItem>
                                <SelectItem value="google">
                                    <div className="flex items-center gap-2">
                                        <span>🔮</span> Google
                                    </div>
                                </SelectItem>
                                <SelectItem value="groq">
                                    <div className="flex items-center gap-2">
                                        <span>⚡</span> Groq
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className="flex items-center gap-1.5">
                            Model
                            <InfoTooltip content="The LLM model that powers your assistant's responses" />
                        </Label>
                        <Select
                            value={config.llmModel || "gpt-4o"}
                            onValueChange={(value) =>
                                onChange("llmModel", value)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select model" />
                            </SelectTrigger>
                            <SelectContent>
                                {LLM_MODELS.map((model) => (
                                    <SelectItem key={model.value} value={model.value}>
                                        {model.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* First Message Mode */}
                <div className="space-y-2">
                    <Label className="flex items-center gap-1.5">
                        First Message Mode
                        <InfoTooltip content="Choose whether the assistant or user speaks first" />
                    </Label>
                    <Select
                        value={config.firstMessageMode || "assistant"}
                        onValueChange={(value) =>
                            onChange("firstMessageMode", value)
                        }
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="assistant">
                                Assistant speaks first
                            </SelectItem>
                            <SelectItem value="user">
                                User speaks first
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* First Message */}
                {config.firstMessageMode !== "user" && (
                    <div className="space-y-2">
                        <Label className="flex items-center gap-1.5">
                            First Message
                            <InfoTooltip content="The greeting your assistant will say when a call begins" />
                        </Label>
                        <Textarea
                            value={
                                config.initialGreeting ||
                                "Hello! How can I help you today?"
                            }
                            onChange={(e) =>
                                onChange("initialGreeting", e.target.value)
                            }
                            className="min-h-[80px]"
                            placeholder="Thank you for calling..."
                        />
                    </div>
                )}

                {/* System Prompt */}
                <div className="space-y-3">
                    <Label className="flex items-center gap-1.5">
                        System Prompt
                        <InfoTooltip content="Define your agent's personality, tone, and behavior guidelines" />
                    </Label>
                    <Textarea
                        value={config.systemPrompt || ""}
                        onChange={(e) =>
                            onChange("systemPrompt", e.target.value)
                        }
                        className="min-h-[200px] font-mono text-sm"
                        placeholder="# Assistant Instructions&#10;&#10;You are a friendly, professional assistant..."
                    />
                    
                    {/* AI Prompt Helper - Compact Mode */}
                    {chatbotId && (
                        <PromptAIHelper
                            chatbotId={chatbotId}
                            channel="VOICE"
                            onPromptGenerated={(prompt) => onChange("systemPrompt", prompt)}
                            compact
                        />
                    )}
                </div>
            </CollapsibleSection>
        </div>
    );
}
