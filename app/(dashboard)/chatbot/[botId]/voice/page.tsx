"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useVoiceConfig, useUpdateVoiceConfig } from "@/services/voice";
import { Loader2, Save, Play, Mic, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
    TTS_PROVIDERS,
    VOICE_OPTIONS,
    LLM_MODELS,
    STT_PROVIDERS,
} from "@/lib/constants/voice-options";

// Simple Switch component since @radix-ui/react-switch is not installed
function Switch({ checked, onCheckedChange, id }: { checked: boolean; onCheckedChange: (checked: boolean) => void; id?: string }) {
    return (
        <button
            type="button"
            role="switch"
            id={id}
            aria-checked={checked}
            onClick={() => onCheckedChange(!checked)}
            className={`
        peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50
        ${checked ? "bg-primary" : "bg-input"}
      `}
        >
            <span
                className={`
          pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform
          ${checked ? "translate-x-4" : "translate-x-0"}
        `}
            />
        </button>
    );
}

export default function VoiceConfigPage() {
    const params = useParams();
    const botId = params.botId as string;

    const { data: config, isLoading } = useVoiceConfig(botId);
    const updateConfig = useUpdateVoiceConfig();

    const [localConfig, setLocalConfig] = React.useState<any>(null);
    const [isDirty, setIsDirty] = React.useState(false);
    const [activeSection, setActiveSection] = React.useState("instructions");
    const observerRefs = React.useRef<{ [key: string]: IntersectionObserverEntry | null }>({});

    React.useEffect(() => {
        if (config) {
            setLocalConfig(config);
        }
    }, [config]);

    React.useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -80% 0px", // Trigger when section is near the top
            threshold: 0,
        };

        const observerCallback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                observerRefs.current[entry.target.id] = entry;
            });

            const visibleSections = Object.values(observerRefs.current)
                .filter((entry) => entry && entry.isIntersecting)
                .map((entry) => entry!.target.id);

            if (visibleSections.length > 0) {
                setActiveSection(visibleSections[0]);
            }
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const sections = ["instructions", "models", "actions", "advanced"];

        sections.forEach((sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const handleChange = (field: string, value: any) => {
        setLocalConfig((prev: any) => ({ ...prev, [field]: value }));
        setIsDirty(true);
    };

    const handleSave = () => {
        if (!localConfig) return;
        updateConfig.mutate(
            { chatbotId: botId, data: localConfig },
            {
                onSuccess: () => {
                    setIsDirty(false);
                    toast.success("Configuration saved");
                },
                onError: (error) => {
                    toast.error("Failed to save configuration");
                    console.error(error);
                },
            }
        );
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            // activeSection will be updated by the observer
        }
    };

    if (isLoading || !localConfig) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    const navItems = [
        { id: "instructions", label: "Instructions" },
        { id: "models", label: "Models & Voice" },
        { id: "actions", label: "Actions" },
        { id: "advanced", label: "Advanced" },
    ];

    return (
        <div className="flex h-[calc(100vh-5rem)] flex-col overflow-hidden bg-background">
            {/* Header */}
            <header className="flex h-14 items-center justify-between border-b px-4">
                <div className="flex items-center gap-2">
                    <h1 className="text-sm font-semibold">Voice Configuration</h1>
                </div>
                <div className="flex items-center gap-2">
                    {isDirty && (
                        <span className="text-xs text-muted-foreground">Unsaved changes</span>
                    )}
                    <Button
                        size="sm"
                        onClick={handleSave}
                        disabled={!isDirty || updateConfig.isPending}
                    >
                        {updateConfig.isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="mr-2 h-4 w-4" />
                        )}
                        Save Changes
                    </Button>
                    <Button size="sm" variant="default" className="bg-blue-600 hover:bg-blue-700">
                        Deploy Agent
                    </Button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Pane: Configuration */}
                <div className="flex w-2/3 flex-col border-r h-full overflow-hidden">
                    <ScrollArea className="flex-1">
                        {/* Navigation Header */}
                        <div className="sticky top-0 z-10 border-b bg-background px-4">
                            <div className="flex h-12 items-center gap-4">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`
                                        h-full border-b-2 px-2 text-sm font-medium transition-colors hover:text-primary
                                        ${activeSection === item.id
                                                ? "border-primary text-primary"
                                                : "border-transparent text-muted-foreground"
                                            }
                                    `}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-8 p-6">
                            {/* Instructions Section */}
                            <div id="instructions" className="space-y-8 scroll-mt-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="agentName">Name</Label>
                                    <p className="text-xs text-muted-foreground">
                                        Reference name for dispatch rules and frontends.
                                    </p>
                                    <Input
                                        id="agentName"
                                        value={localConfig.name || "Casey_6"}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                        className="max-w-md"
                                    />
                                </div>

                                {/* Instructions */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="instructions">Instructions</Label>
                                            <p className="text-xs text-muted-foreground">
                                                Define your agent's personality, tone, and behavior guidelines.
                                            </p>
                                        </div>
                                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                                            <Plus className="mr-1 h-3 w-3" /> Insert variable
                                        </Button>
                                    </div>
                                    <Textarea
                                        id="instructions"
                                        value={localConfig.systemPrompt || ""}
                                        onChange={(e) => handleChange("systemPrompt", e.target.value)}
                                        className="min-h-[300px] font-mono text-sm"
                                        placeholder="You are a friendly, reliable voice assistant..."
                                    />
                                </div>

                                {/* Welcome Message */}
                                <div className="space-y-4 rounded-lg border p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="welcomeMessage" className="text-base">Welcome message</Label>
                                            <p className="text-xs text-muted-foreground">
                                                The first message your agent says when a call begins.
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                id="welcomeMessage"
                                                checked={!!localConfig.initialGreeting}
                                                onCheckedChange={(checked) => {
                                                    if (!checked) {
                                                        handleChange("initialGreeting", "");
                                                    } else {
                                                        handleChange("initialGreeting", "Hello! How can I help you today?");
                                                    }
                                                }}
                                            />
                                            <Label htmlFor="welcomeMessage" className="text-xs uppercase text-muted-foreground">
                                                {localConfig.initialGreeting ? "On" : "Off"}
                                            </Label>
                                        </div>
                                    </div>

                                    {localConfig.initialGreeting !== undefined && localConfig.initialGreeting !== "" && (
                                        <div className="space-y-4 pt-2">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="allowInterrupt" />
                                                <Label htmlFor="allowInterrupt" className="text-sm font-normal">
                                                    Allow users to interrupt the greeting.
                                                </Label>
                                            </div>
                                            <div className="relative">
                                                <div className="absolute right-2 top-2">
                                                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                                        <Plus className="mr-1 h-3 w-3" /> Insert variable
                                                    </Button>
                                                </div>
                                                <Textarea
                                                    value={localConfig.initialGreeting}
                                                    onChange={(e) => handleChange("initialGreeting", e.target.value)}
                                                    className="min-h-[100px] font-mono text-sm"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {(!localConfig.initialGreeting) && (
                                        <div className="text-sm text-muted-foreground">
                                            Your agent will wait for the user to start speaking.
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Separator />

                            {/* Models & Voice Section */}
                            <div id="models" className="space-y-6 scroll-mt-6">
                                <h2 className="text-lg font-semibold">Models & Voice</h2>
                                {/* TTS Model */}
                                <div className="space-y-2">
                                    <Label>TTS model</Label>
                                    <p className="text-xs text-muted-foreground">
                                        Choose a model and a specific voice for your agent.
                                    </p>
                                    <Select
                                        value={localConfig.ttsModel || "elevenlabs"}
                                        onValueChange={(value) => handleChange("ttsModel", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select TTS model" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {TTS_PROVIDERS.map((provider) => (
                                                <SelectItem key={provider.value} value={provider.value}>
                                                    {provider.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Voice */}
                                <div className="space-y-2">
                                    <Label>Voice</Label>
                                    <p className="text-xs text-muted-foreground">
                                        Use the live preview mode to try out your selection.
                                    </p>
                                    <Select
                                        value={localConfig.voiceId || "alice"}
                                        onValueChange={(value) => handleChange("voiceId", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select voice" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {VOICE_OPTIONS.map((voice) => (
                                                <SelectItem key={voice.value} value={voice.value}>
                                                    {voice.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* LLM Model */}
                                <div className="space-y-2">
                                    <Label>LLM model</Label>
                                    <p className="text-xs text-muted-foreground">
                                        Your agent's brain, responsible for generating responses.
                                    </p>
                                    <Select
                                        value={localConfig.llmModel || "gemini-2.5-flash-lite"}
                                        onValueChange={(value) => handleChange("llmModel", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select LLM model" />
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

                                {/* STT Model */}
                                <div className="space-y-2">
                                    <Label>STT model</Label>
                                    <p className="text-xs text-muted-foreground">
                                        Transcribes the user's speech into text.
                                    </p>
                                    <Select
                                        value={localConfig.sttModel || "assemblyai"}
                                        onValueChange={(value) => handleChange("sttModel", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select STT model" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {STT_PROVIDERS.map((provider) => (
                                                <SelectItem key={provider.value} value={provider.value}>
                                                    {provider.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Separator />

                            {/* Actions Section */}
                            <div id="actions" className="scroll-mt-6">
                                <h2 className="mb-4 text-lg font-semibold">Actions</h2>
                                <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
                                    <div className="rounded-full bg-muted p-4">
                                        <Plus className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold">HTTP Tools</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Define web requests to enable your agent to interact with web-based APIs.
                                        </p>
                                    </div>
                                    <Button variant="outline">Add HTTP Tool</Button>
                                </div>
                            </div>

                            <Separator />

                            {/* Advanced Section */}
                            <div id="advanced" className="scroll-mt-6">
                                <h2 className="mb-4 text-lg font-semibold">Advanced</h2>
                                <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold">Advanced Settings</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Configure custom metadata, secrets, and telephony settings.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </div>

                {/* Right Pane: Preview */}
                <div className="flex w-1/3 flex-col border-l bg-muted/10">
                    <div className="flex h-12 items-center border-b px-4">
                        <span className="text-sm font-medium">Preview</span>
                    </div>
                    <div className="flex flex-1 flex-col items-center justify-center p-6">
                        <div className="flex flex-col items-center space-y-8 text-center">
                            {/* Visualizer Placeholder */}
                            <div className="flex h-48 w-full items-center justify-center rounded-lg border bg-black/90 p-8">
                                <div className="flex items-center gap-1">
                                    <div className="h-3 w-1 animate-pulse bg-white/50" style={{ animationDelay: "0ms" }} />
                                    <div className="h-5 w-1 animate-pulse bg-white/50" style={{ animationDelay: "100ms" }} />
                                    <div className="h-8 w-1 animate-pulse bg-white" style={{ animationDelay: "200ms" }} />
                                    <div className="h-5 w-1 animate-pulse bg-white/50" style={{ animationDelay: "300ms" }} />
                                    <div className="h-3 w-1 animate-pulse bg-white/50" style={{ animationDelay: "400ms" }} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold">Preview your agent</h3>
                                <p className="text-sm text-muted-foreground">
                                    Start a live test call to speak to your agent as you configure and iterate.
                                </p>
                            </div>

                            <Button className="w-full max-w-xs" size="lg">
                                <Mic className="mr-2 h-4 w-4" />
                                Start Call
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
