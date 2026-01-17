"use client";

import * as React from "react";
import { useAssistant, useUpdateAssistant, useUpdateBehavior, useUpdateProvider } from "@/services/voice-assistant-service";
import { usePhoneNumbers, useUpdatePhoneNumber } from "@/services/phone-number-service";
import { Loader2, ArrowLeft, Save, Play, Mic, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { VoicePreview } from "@/components/voice/VoicePreview";
import { Badge } from "@/components/ui/badge";

const PROVIDER_MODELS = {
    TTS: {
        elevenlabs: [
            { id: 'eleven_turbo_v2_5', name: 'Eleven Turbo v2.5' },
            { id: 'eleven_multilingual_v2', name: 'Eleven Multilingual v2' },
            { id: 'eleven_flash_v2_5', name: 'Eleven Flash v2.5' } // Faster option
        ],
        openai: [
            { id: 'tts-1', name: 'TTS-1' },
            { id: 'tts-1-hd', name: 'TTS-1 HD' }
        ],
        cartesia: [
            { id: 'sonic-english', name: 'Sonic (English)' }
        ],
        google: [
            { id: 'en-US-Standard-A', name: 'Standard A' },
            { id: 'en-US-Neural2-A', name: 'Neural2 A' }
        ]
    },
    STT: {
        deepgram: [
            { id: 'nova-2', name: 'Nova-2 (Fastest)' },
            { id: 'nova-2-general', name: 'Nova-2 General' },
            { id: 'nova-2-medical', name: 'Nova-2 Medical' }
        ],
        assemblyai: [
            { id: 'best', name: 'Best Available' },
            { id: 'nano', name: 'Nano' }
        ],
        openai: [
            { id: 'whisper-1', name: 'Whisper-1' }
        ],
        google: [
            { id: 'chirp-2', name: 'Chirp 2' },
            { id: 'default', name: 'Default' }
        ]
    },
    LLM: {
        openai: [
            { id: 'gpt-4o', name: 'GPT-4o' },
            { id: 'gpt-4o-mini', name: 'GPT-4o Mini' },
            { id: 'gpt-4-turbo', name: 'GPT-4 Turbo' }
        ],
        google: [
            { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash' },
            { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro' }
        ],
        anthropic: [
            { id: 'claude-3-5-sonnet-20240620', name: 'Claude 3.5 Sonnet' }
        ]
    }
};

const VOICE_OPTIONS = {
    // ... existing options ...
    elevenlabs: [
        { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel', gender: 'Female', description: 'Narrative & Calm' },
        { id: 'AZnzlk1XvdvUeBnXmlld', name: 'Domi', gender: 'Female', description: 'Strong & Assertive' },
        { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella', gender: 'Female', description: 'Soft & Serious' },
        { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni', gender: 'Male', description: 'Balanced & Crisp' },
        { id: 'TxGEqnHWrfWFTfGW9XjX', name: 'Josh', gender: 'Male', description: 'Deep & Resonant' },
        { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie', gender: 'Male', description: 'Conversational' },
        { id: 'jBpfuIE2acCO8z3wKNLl', name: 'Giulia', gender: 'Female', description: 'Professional & Warm' },
    ],
    openai: [
        { id: 'alloy', name: 'Alloy', gender: 'Neutral', description: 'Versatile & Balanced' },
        { id: 'echo', name: 'Echo', gender: 'Male', description: 'Warm & Rounded' },
        { id: 'fable', name: 'Fable', gender: 'Male', description: 'British & Formal' },
        { id: 'onyx', name: 'Onyx', gender: 'Male', description: 'Deep & Authoritative' },
        { id: 'nova', name: 'Nova', gender: 'Female', description: 'Energetic & Bright' },
        { id: 'shimmer', name: 'Shimmer', gender: 'Female', description: 'Clear & Expressive' },
    ],
    cartesia: [
        { id: '248a87b8-670d-4521-931b-426c19f5062a', name: 'Sonic (English)', gender: 'Male', description: 'Fast & Natural' }
    ]
};




interface VoiceAssistantConfigProps {
    botId: string;
    assistantId: string;
}

export function VoiceAssistantConfig({ botId, assistantId }: VoiceAssistantConfigProps) {
    const router = useRouter();
    const params = useParams<{ workspaceId?: string }>();
    const workspaceId = (params as any)?.workspaceId as string | undefined;
    const { data: assistant, isLoading, refetch } = useAssistant(assistantId);

    // Mutations
    const updateAssistant = useUpdateAssistant();
    const updateBehavior = useUpdateBehavior();
    const updateProvider = useUpdateProvider();

    // Phone numbers
    const { data: phoneNumbers } = usePhoneNumbers(botId);
    const updatePhoneNumber = useUpdatePhoneNumber();

    // Local state for debouncing/ui
    const [activeTab, setActiveTab] = React.useState("overview");
    const [isDirty, setIsDirty] = React.useState(false);

    if (isLoading) {
        return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;
    }

    if (!assistant) {
        return <div className="p-10 text-center">Assistant not found</div>;
    }

    const handleBasicUpdate = (field: string, value: any) => {
        updateAssistant.mutate(
            { assistantId, data: { [field]: value } },
            {
                onSuccess: () => toast.success("Updated successfully"),
                onError: () => toast.error("Update failed")
            }
        );
    };

    const handleBehaviorUpdate = (field: string, value: any) => {
        updateBehavior.mutate(
            { assistantId, data: { [field]: value } },
            {
                onSuccess: () => toast.success("Behavior updated"),
                onError: () => toast.error("Update failed")
            }
        );
    };

    // Helper to find specific provider
    const getProvider = (type: 'STT' | 'TTS' | 'LLM') => assistant.providers?.find(p => p.capabilityType === type);

    const handleProviderUpdate = (type: 'STT' | 'TTS' | 'LLM', field: string, value: any) => {
        const current = getProvider(type);
        if (!current) return;

        // If updating nested config
        let payload: any = { capabilityType: type, provider: current.provider, model: current.model };

        if (field === 'provider') {
            payload.provider = value;
            // Auto-select first model for the new provider
            const models = PROVIDER_MODELS[type][value as keyof typeof PROVIDER_MODELS[typeof type]] || [];
            if (models.length > 0) {
                payload.model = models[0].id;
            } else {
                payload.model = ''; // or keep current but it might be invalid
            }
        }
        else if (field === 'model') payload.model = value;
        else if (field.startsWith('config.')) {
            const configKey = field.split('.')[1];
            payload.config = { ...current.config, [configKey]: value };
        } else {
            // direct field
            payload[field] = value;
        }

        updateProvider.mutate(
            { assistantId, data: payload },
            {
                onSuccess: () => toast.success(`${type} settings updated`),
                onError: () => toast.error("Update failed")
            }
        );
    };

    return (
        <div className="flex h-[calc(100vh-4rem)] flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-3">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            if (!workspaceId) return;
                            router.push(`/${workspaceId}/chatbot/${botId}/voice`);
                        }}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-semibold">{assistant.name}</h2>
                            <Badge variant={assistant.status === 'ACTIVE' ? 'default' : 'secondary'}>
                                {assistant.status}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Voice Assistant Configuration</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    {/* Actions like Delete or Clone could go here */}
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Scrollable Config Area */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto space-y-6">
                        <TabsList className="flex w-full h-auto flex-wrap justify-start gap-1 p-1 bg-muted rounded-md border">
                            <TabsTrigger value="overview" className="flex-1 min-w-[100px]">Overview</TabsTrigger>
                            <TabsTrigger value="behavior" className="flex-1 min-w-[100px]">Behavior</TabsTrigger>
                            <TabsTrigger value="voice" className="flex-1 min-w-[100px]">Voice & Language</TabsTrigger>
                            <TabsTrigger value="numbers" className="flex-1 min-w-[100px]">Phone Numbers</TabsTrigger>
                            <TabsTrigger value="advanced" className="flex-1 min-w-[100px]">Advanced</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Basic Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label>Name</Label>
                                        <Input
                                            defaultValue={assistant.name}
                                            onBlur={(e) => handleBasicUpdate('name', e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Description</Label>
                                        <Textarea
                                            defaultValue={assistant.description || ''}
                                            onBlur={(e) => handleBasicUpdate('description', e.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <Label>Active Status</Label>
                                            <p className="text-sm text-muted-foreground">Enable this assistant for incoming calls</p>
                                        </div>
                                        <Switch
                                            checked={assistant.status === 'ACTIVE'}
                                            onCheckedChange={(checked) => handleBasicUpdate('status', checked ? 'ACTIVE' : 'INACTIVE')}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>System Prompt</CardTitle>
                                        <CardDescription>Define the assistant's personality and instructions.</CardDescription>
                                    </div>
                                    <Button
                                        size="sm"
                                        onClick={() => {
                                            toast.success("Instructions saved successfully");
                                        }}
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Save
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Textarea
                                        className="min-h-[200px] font-mono text-sm"
                                        defaultValue={assistant.behavior?.systemPrompt}
                                        onBlur={(e) => handleBehaviorUpdate('systemPrompt', e.target.value)}
                                        placeholder="You are a helpful assistant..."
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="behavior" className="space-y-6">
                            <Card>
                                <CardHeader><CardTitle>Conversation Flow</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label>First Message</Label>
                                        <Input
                                            defaultValue={assistant.behavior?.firstMessage}
                                            onBlur={(e) => handleBehaviorUpdate('firstMessage', e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Who speaks first?</Label>
                                        <RadioGroup
                                            defaultValue={assistant.behavior?.initiator || 'AGENT'}
                                            onValueChange={(val) => handleBehaviorUpdate('initiator', val)}
                                            className="flex gap-4"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="AGENT" id="init-agent" />
                                                <Label htmlFor="init-agent">Agent</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="USER" id="init-user" />
                                                <Label htmlFor="init-user">User</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Closing Message (Optional)</Label>
                                        <Input
                                            defaultValue={assistant.behavior?.closingMessage || ''}
                                            onBlur={(e) => handleBehaviorUpdate('closingMessage', e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Fallback Message</Label>
                                        <Input
                                            defaultValue={assistant.behavior?.fallbackMessage || ''}
                                            onBlur={(e) => handleBehaviorUpdate('fallbackMessage', e.target.value)}
                                            placeholder="Sorry, I didn't catch that."
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader><CardTitle>Interruption Settings</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Allow Interruptions</Label>
                                        <Switch
                                            checked={assistant.behavior?.allowInterruptions}
                                            onCheckedChange={(checked) => handleBehaviorUpdate('allowInterruptions', checked)}
                                        />
                                    </div>
                                    <div className="grid gap-4 pt-4">
                                        <div className="grid gap-2">
                                            <Label>Min Interruption Duration (ms)</Label>
                                            <Slider
                                                defaultValue={[assistant.behavior?.minInterruptionDuration || 500]}
                                                max={2000} step={100}
                                                onValueCommit={(vals) => handleBehaviorUpdate('minInterruptionDuration', vals[0])}
                                            />
                                            <p className="text-xs text-muted-foreground text-right">{assistant.behavior?.minInterruptionDuration}ms</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="voice" className="space-y-6">
                            <Card>
                                <CardHeader><CardTitle>Voice (TTS)</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Provider</Label>
                                            <Select
                                                defaultValue={getProvider('TTS')?.provider || 'elevenlabs'}
                                                onValueChange={(val) => handleProviderUpdate('TTS', 'provider', val)}
                                            >
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="elevenlabs">ElevenLabs</SelectItem>
                                                    <SelectItem value="openai">OpenAI</SelectItem>
                                                    <SelectItem value="cartesia">Cartesia</SelectItem>
                                                    <SelectItem value="google">Google</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Model</Label>
                                            <Select
                                                value={getProvider('TTS')?.model}
                                                onValueChange={(val) => handleProviderUpdate('TTS', 'model', val)}
                                            >
                                                <SelectTrigger><SelectValue placeholder="Select model" /></SelectTrigger>
                                                <SelectContent>
                                                    {(PROVIDER_MODELS.TTS[getProvider('TTS')?.provider as keyof typeof PROVIDER_MODELS.TTS] || []).map((model) => (
                                                        <SelectItem key={model.id} value={model.id}>{model.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Voice Identity</Label>
                                        <Select
                                            value={getProvider('TTS')?.config?.voice_id || ''}
                                            onValueChange={(val) => {
                                                const currentProvider = getProvider('TTS');
                                                const newConfig = { ...currentProvider?.config, voice_id: val };
                                                handleProviderUpdate('TTS', 'config', newConfig);
                                            }}
                                        >
                                            <SelectTrigger className="h-auto py-3">
                                                <SelectValue placeholder="Select a voice..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {(VOICE_OPTIONS[getProvider('TTS')?.provider as keyof typeof VOICE_OPTIONS] || []).map((voice) => (
                                                    <SelectItem key={voice.id} value={voice.id}>
                                                        <div className="flex items-center justify-between w-full min-w-[200px] gap-4">
                                                            <div className="flex flex-col text-left">
                                                                <span className="font-medium">{voice.name}</span>
                                                                <span className="text-xs text-muted-foreground">{voice.description}</span>
                                                            </div>
                                                            <div className="ml-auto px-2 py-0.5 rounded-full bg-secondary text-2xs font-medium text-secondary-foreground">
                                                                {voice.gender}
                                                            </div>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                                {/* Fallback & Default */}
                                                {!VOICE_OPTIONS[getProvider('TTS')?.provider as keyof typeof VOICE_OPTIONS] && (
                                                    <SelectItem value="default" disabled>No preset voices available</SelectItem>
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader><CardTitle>Speech to Text (STT)</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Provider</Label>
                                            <Select
                                                defaultValue={getProvider('STT')?.provider || 'deepgram'}
                                                onValueChange={(val) => handleProviderUpdate('STT', 'provider', val)}
                                            >
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="deepgram">Deepgram</SelectItem>
                                                    <SelectItem value="assemblyai">AssemblyAI</SelectItem>
                                                    <SelectItem value="openai">OpenAI Whisper</SelectItem>
                                                    <SelectItem value="google">Google</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Model</Label>
                                            <Select
                                                defaultValue={getProvider('STT')?.model || 'nova-2'}
                                                onValueChange={(val) => handleProviderUpdate('STT', 'model', val)}
                                            >
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="nova-2">Nova-2 (Fastest)</SelectItem>
                                                    <SelectItem value="nova-2-general">Nova-2 General</SelectItem>
                                                    <SelectItem value="whisper-1">Whisper-1</SelectItem>
                                                    <SelectItem value="default">Default</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Language</Label>
                                        <Input
                                            defaultValue={assistant.defaultLanguage}
                                            onBlur={(e) => handleBasicUpdate('defaultLanguage', e.target.value)}
                                            placeholder="en-US"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>


                        <TabsContent value="numbers" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <CardTitle>Inbound Phone Numbers</CardTitle>
                                            <CardDescription>Phone numbers routed to this assistant.</CardDescription>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                if (!workspaceId) return;
                                                router.push(`/${workspaceId}/chatbot/${botId}/voice/phone-numbers`);
                                            }}
                                        >
                                            Manage Numbers
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="rounded-md border">
                                        <table className="w-full caption-bottom text-sm text-left">
                                            <thead className="[&_tr]:border-b">
                                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Number</th>
                                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Label</th>
                                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="[&_tr:last-child]:border-0">
                                                {phoneNumbers?.filter((n: any) => n.assistantId === assistantId).map((number: any) => (
                                                    <tr key={number.id} className="border-b transition-colors hover:bg-muted/50">
                                                        <td className="p-4 align-middle font-medium">{number.phoneNumber}</td>
                                                        <td className="p-4 align-middle">{number.label || '-'}</td>
                                                        <td className="p-4 align-middle">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="text-destructive h-8"
                                                                onClick={() => {
                                                                    updatePhoneNumber.mutate({
                                                                        botId,
                                                                        numberId: number.id,
                                                                        data: { assistantId: null }
                                                                    }, {
                                                                        onSuccess: () => toast.success("Unlinked number")
                                                                    });
                                                                }}
                                                            >
                                                                Unlink
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {(!phoneNumbers || !phoneNumbers.some((n: any) => n.assistantId === assistantId)) && (
                                                    <tr>
                                                        <td colSpan={3} className="p-4 text-center text-muted-foreground">
                                                            No phone numbers linked to this assistant.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="mt-6 border-t pt-4">
                                        <Label>Link Available Number</Label>
                                        <div className="flex gap-2 mt-2">
                                            <Select onValueChange={(val) => {
                                                if (val) {
                                                    updatePhoneNumber.mutate({
                                                        botId,
                                                        numberId: val,
                                                        data: { assistantId }
                                                    }, {
                                                        onSuccess: () => toast.success("Linked number")
                                                    });
                                                }
                                            }}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a number to link..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {phoneNumbers?.filter((n: any) => !n.assistantId || n.assistantId !== assistantId).map((number: any) => (
                                                        <SelectItem key={number.id} value={number.id}>
                                                            {number.phoneNumber} {number.label ? `(${number.label})` : ''} {number.assistantId ? '(Reassign)' : ''}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="advanced" className="space-y-6">
                            <Card>
                                <CardHeader><CardTitle>LLM Configuration</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Provider</Label>
                                            <Select
                                                defaultValue={getProvider('LLM')?.provider || 'openai'}
                                                onValueChange={(val) => handleProviderUpdate('LLM', 'provider', val)}
                                            >
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="openai">OpenAI</SelectItem>
                                                    <SelectItem value="google">Google Gemini</SelectItem>
                                                    <SelectItem value="anthropic">Anthropic</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Model</Label>
                                            <Select
                                                value={getProvider('LLM')?.model}
                                                onValueChange={(val) => handleProviderUpdate('LLM', 'model', val)}
                                            >
                                                <SelectTrigger><SelectValue placeholder="Select a model" /></SelectTrigger>
                                                <SelectContent>
                                                    {(PROVIDER_MODELS.LLM[getProvider('LLM')?.provider as keyof typeof PROVIDER_MODELS.LLM] || []).map((model) => (
                                                        <SelectItem key={model.id} value={model.id}>{model.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>


                            <Card>
                                <CardHeader><CardTitle>Timing & Limits</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label>Max Call Duration (seconds)</Label>
                                        <Input
                                            type="number"
                                            defaultValue={assistant.behavior?.maxCallDurationSec}
                                            onBlur={(e) => handleBehaviorUpdate('maxCallDurationSec', parseInt(e.target.value))}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>User Away Timeout (seconds)</Label>
                                        <Input
                                            type="number"
                                            defaultValue={assistant.behavior?.userAwayTimeout || 15}
                                            onBlur={(e) => handleBehaviorUpdate('userAwayTimeout', parseFloat(e.target.value))}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Max Repetitions (Hangup)</Label>
                                        <Input
                                            type="number"
                                            defaultValue={assistant.behavior?.maxRepetitionCount || 3}
                                            onBlur={(e) => handleBehaviorUpdate('maxRepetitionCount', parseInt(e.target.value))}
                                        />
                                        <p className="text-xs text-muted-foreground">End call if user repeats themselves this many times.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Live Preview Pane */}
                {/* Live Preview Pane */}
                <div className="w-[400px] border-l bg-muted/10 hidden xl:flex flex-col">
                    <div className="p-4 border-b bg-background/50 backdrop-blur-sm">
                        <h3 className="font-semibold mb-1">Preview & Test</h3>
                        <p className="text-xs text-muted-foreground">Test your assistant configuration in real-time.</p>
                    </div>
                    <div className="flex-1 p-4">
                        <VoicePreview
                            botId={botId}
                            // Adapter to match VoicePreview props
                            agentConfig={{
                                instructions: assistant.behavior?.systemPrompt || "",
                                tts_voice: getProvider('TTS')?.config?.voiceId || "",
                                stt_language: assistant.defaultLanguage,
                                tts_language: assistant.defaultLanguage,
                            }}
                            agentName={assistant.name}
                            assistantId={assistantId}
                        />
                    </div>
                </div>
            </div >
        </div >
    );
}
