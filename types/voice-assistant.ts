export type VoiceBotStatus = 'ACTIVE' | 'INACTIVE' | 'TESTING';
export type TurnDetectionMode = 'stt' | 'vad' | 'realtime_llm' | 'manual';
export type CapabilityType = 'STT' | 'TTS' | 'LLM';

export interface VoiceAssistant {
    id: string;
    chatbotId: string;
    name: string;
    description: string | null;
    status: VoiceBotStatus;
    defaultLanguage: string;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface VoiceAssistantBehavior {
    id: string;
    voiceAssistantId: string;
    systemPrompt: string;
    firstMessage: string;
    closingMessage: string | null;
    fallbackMessage: string | null;
    turnDetectionMode: TurnDetectionMode;
    allowInterruptions: boolean;
    minInterruptionDuration: number;
    minInterruptionWords: number;
    minEndpointingDelay: number;
    maxEndpointingDelay: number;
    preemptiveGeneration: boolean;
    maxToolSteps: number;
    userAwayTimeout: number | null;
    maxCallDurationSec: number;
    recordingConsentMessage: string | null;
    requireConsent: boolean;
    maxRepetitionCount: number;
    initiator: 'AGENT' | 'USER';
}

export interface VoiceAssistantProvider {
    id: string;
    voiceAssistantId: string;
    capabilityType: CapabilityType;
    provider: string;
    model: string;
    config: Record<string, any>;
    isDefault: boolean;
    isActive: boolean;
}

export interface VoiceWidgetStyles {
    position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    widgetStyle: 'floating-button' | 'embedded' | 'full-screen-overlay';
    primaryColor: string;
    backgroundColor: string;
    activeCallColor: string;
    mutedColor: string;
    callButtonIcon: string;
    endCallIcon: string;
    muteIcon: string;
    buttonSize: string;
    expandedWidth: string;
    expandedHeight: string;
    showButtonText: boolean;
    buttonText: string;
    showWaveform: boolean;
    showCallTimer: boolean;
    showTranscription: boolean;
    showPoweredBy: boolean;
    avatarUrl?: string;
    displayName: string;
}

export interface VoiceAssistantWidget {
    id: string;
    voiceAssistantId: string;
    styles: VoiceWidgetStyles;
    onlyAllowOnAddedDomains: boolean;
    allowedDomains: string[];
    tokenTtl: number;
}

export interface VoiceAssistantFullDetails extends VoiceAssistant {
    behavior?: VoiceAssistantBehavior;
    providers?: VoiceAssistantProvider[];
    widget?: VoiceAssistantWidget;
}

export interface CreateVoiceAssistantInput {
    name: string;
    description?: string;
    defaultLanguage?: string;
    chatbotId: string;

    // Behavior
    systemPrompt?: string;
    firstMessage?: string;

    // Default Provider Configs
    sttModel?: string;
    llmModel?: string;
    ttsModel?: string;
    voiceId?: string;
    voiceSettings?: Record<string, any>;
}

export interface UpdateVoiceAssistantInput {
    name?: string;
    description?: string;
    status?: VoiceBotStatus;
    defaultLanguage?: string;
}

export interface UpdateVoiceAssistantBehaviorInput {
    systemPrompt?: string;
    firstMessage?: string;
    closingMessage?: string;
    fallbackMessage?: string;
    turnDetectionMode?: TurnDetectionMode;
    allowInterruptions?: boolean;
    minInterruptionDuration?: number;
    minInterruptionWords?: number;
    userAwayTimeout?: number;
    maxCallDurationSec?: number;
    recordingConsentMessage?: string;
    requireConsent?: boolean;
    maxRepetitionCount?: number;
    initiator?: 'AGENT' | 'USER';
}

export interface UpdateVoiceAssistantProviderInput {
    capabilityType: CapabilityType;
    provider: string;
    model: string;
    config?: Record<string, any>;
    isActive?: boolean;
    isDefault?: boolean;
}
