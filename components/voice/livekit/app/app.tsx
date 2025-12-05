'use client';

import * as React from 'react';
import { LiveKitRoom, RoomAudioRenderer, StartAudio } from '@livekit/components-react';
import type { AppConfig } from '@/components/voice/livekit/app-config';
import { AgentConfig, defaultAgentConfig, type AgentConfigState } from '@/components/voice/livekit/agent-config';
import { ViewController } from '@/components/voice/livekit/app/view-controller';
import { Toaster } from '@/components/voice/livekit/toaster';
import { useAgentErrors } from '@/hooks/useAgentErrors';
import { useDebugMode } from '@/hooks/useDebug';
import { useGenerateVoiceToken } from '@/services/voice';
import { LiveKitTokenResponse } from '@/types/voice';

const IN_DEVELOPMENT = process.env.NODE_ENV !== 'production';

function AppSetup() {
  useDebugMode({ enabled: IN_DEVELOPMENT });
  useAgentErrors();

  return null;
}

interface AppProps {
  appConfig: AppConfig;
  botId: string;
  agentConfig?: AgentConfigState;
  onConfigChange?: (config: AgentConfigState) => void;
}

// Configuration Phase Component - shown before connection
function ConfigurationPhase({
  appConfig,
  agentConfig,
  onConfigChange,
  onStartCall,
  isLoading
}: {
  appConfig: AppConfig;
  agentConfig: AgentConfigState;
  onConfigChange: (config: AgentConfigState) => void;
  onStartCall: () => void;
  isLoading: boolean;
}) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-md space-y-4">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-xl font-bold mb-1">Voice AI Assistant</h2>
          <p className="text-muted-foreground text-xs">Configure settings and start the conversation</p>
        </div>

        {/* Configuration Panel */}
        <AgentConfig
          config={agentConfig}
          onConfigChange={onConfigChange}
          isConfigPhase={true}
        />

        {/* Start Button */}
        <button
          onClick={onStartCall}
          disabled={isLoading}
          className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Connecting...
            </span>
          ) : (
            appConfig.startButtonText || 'Start Call'
          )}
        </button>
      </div>
    </div>
  );
}

// Connected Session Component - shown during active session
function ConnectedSession({
  appConfig,
}: {
  appConfig: AppConfig;
}) {
  return (
    <>
      <AppSetup />
      <main className="h-full w-full">
        <ViewController appConfig={appConfig} onStart={() => { }} />
      </main>
      <StartAudio label="Start Audio" />
      <RoomAudioRenderer />
    </>
  );
}

export function App({ appConfig, botId, agentConfig: initialAgentConfig, onConfigChange }: AppProps) {
  // Load saved config from localStorage on mount or use provided config
  const [agentConfig, setAgentConfig] = React.useState<AgentConfigState>(() => {
    if (initialAgentConfig) {
      return initialAgentConfig;
    }
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('agentConfig');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return defaultAgentConfig;
        }
      }
    }
    return defaultAgentConfig;
  });

  const [connectionDetails, setConnectionDetails] = React.useState<{
    serverUrl: string;
    participantToken: string;
  } | null>(null);
  const [shouldConnect, setShouldConnect] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const generateToken = useGenerateVoiceToken();

  const handleStartCall = React.useCallback(async () => {
    setIsLoading(true);
    console.log('[App] Starting call with config:', {
      botId,
      agentConfig,
      agentName: appConfig.agentName,
    });
    try {
      const token = await generateToken.mutateAsync({
        chatbotId: botId,
        agentConfig: {
          instructions: agentConfig.instructions,
          tts_voice: agentConfig.tts_voice,
          stt_language: agentConfig.stt_language,
          tts_language: agentConfig.tts_language,
        },
        agentName: appConfig.agentName, // Pass agent name to API
      });
      
      const data: LiveKitTokenResponse = token;
      console.log('[App] Connection details received:', {
        serverUrl: data.serverUrl,
        roomName: data.roomName,
        hasToken: !!data.participantToken,
      });
      setConnectionDetails({
        serverUrl: data.serverUrl,
        participantToken: data.participantToken,
      });
      setShouldConnect(true);
    } catch (e) {
      console.error('[App] Failed to fetch token:', e);
      setIsLoading(false);
    }
  }, [agentConfig, botId, generateToken, appConfig.agentName]);

  const handleDisconnect = React.useCallback(() => {
    setShouldConnect(false);
    setConnectionDetails(null);
    setIsLoading(false);
  }, []);

  const handleConfigChange = React.useCallback((config: AgentConfigState) => {
    setAgentConfig(config);
    onConfigChange?.(config);
  }, [onConfigChange]);

  // Save config to localStorage when it changes
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('agentConfig', JSON.stringify(agentConfig));
    }
  }, [agentConfig]);

  // Configuration Phase - before connection
  if (!connectionDetails || !shouldConnect) {
    return (
      <>
        <ConfigurationPhase
          appConfig={appConfig}
          agentConfig={agentConfig}
          onConfigChange={handleConfigChange}
          onStartCall={handleStartCall}
          isLoading={isLoading}
        />
        <Toaster />
      </>
    );
  }

  // Connected Session - show the voice interface
  return (
    <LiveKitRoom
      token={connectionDetails.participantToken}
      serverUrl={connectionDetails.serverUrl}
      connect={shouldConnect}
      video={false}
      audio={true}
      onDisconnected={handleDisconnect}
    >
      <ConnectedSession appConfig={appConfig} />
      <Toaster />
    </LiveKitRoom>
  );
}

