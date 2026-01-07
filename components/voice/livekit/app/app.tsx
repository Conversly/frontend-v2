'use client';

import * as React from 'react';
import { LiveKitRoom, RoomAudioRenderer, StartAudio } from '@livekit/components-react';
import type { AppConfig } from '@/components/voice/livekit/app-config';
import { type AgentConfigState } from '@/components/voice/livekit/agent-config';
import { ViewController } from '@/components/voice/livekit/app/view-controller';
import { Toaster } from '@/components/voice/livekit/toaster';
import { useAgentErrors } from '@/hooks/useAgentErrors';
import { useDebugMode } from '@/hooks/useDebug';
import { Phone, Mic } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PhoneCallInput } from './phone-call-input';
import { useMakeOutboundCall, useGenerateVoiceToken } from '@/services/voice';
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
  agentConfig: AgentConfigState;
}

// Start screen with tabs for Voice and Phone
function StartCallScreen({
  appConfig,
  onStartCall,
  onMakePhoneCall,
  isLoading,
}: {
  appConfig: AppConfig;
  onStartCall: () => void;
  onMakePhoneCall: (phoneNumber: string) => void;
  isLoading: boolean;
}) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4 overflow-y-auto w-full">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-xl font-bold mb-1">Voice AI Assistant</h2>
          <p className="text-muted-foreground text-xs">Choose how you want to connect</p>
        </div>

        <Tabs defaultValue="voice" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="voice" className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              Browser Call
            </TabsTrigger>
            <TabsTrigger value="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Call
            </TabsTrigger>
          </TabsList>

          <TabsContent value="voice" className="space-y-4">
            <div className="bg-muted/30 p-4 rounded-lg text-center text-sm text-muted-foreground mb-4">
              Test the voice assistant directly in your browser.
            </div>
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
                appConfig.startButtonText || 'Start Browser Call'
              )}
            </button>
          </TabsContent>

          <TabsContent value="phone" className="space-y-4">
            <div className="bg-muted/30 p-4 rounded-lg text-center text-sm text-muted-foreground mb-4">
              Enter your phone number to receive a call from the assistant.
            </div>
            <PhoneCallInput
              onCall={onMakePhoneCall}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
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
    </>
  );
}

export function App({ appConfig, botId, agentConfig }: AppProps) {
  const [connectionDetails, setConnectionDetails] = React.useState<{
    serverUrl: string;
    participantToken: string;
  } | null>(null);
  const [shouldConnect, setShouldConnect] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOutbound, setIsOutbound] = React.useState(false);

  const generateToken = useGenerateVoiceToken();
  const makeOutboundCall = useMakeOutboundCall();

  const handleStartCall = React.useCallback(async () => {
    setIsOutbound(false); // Browser call
    setIsLoading(true);
    console.log('[App] Starting browser call with config:', {
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
        agentName: appConfig.agentName,
      });

      const data: LiveKitTokenResponse = token;
      setConnectionDetails({
        serverUrl: data.serverUrl,
        participantToken: data.participantToken,
      });
      setShouldConnect(true);
    } catch (e) {
      console.error('[App] Failed to fetch token:', e);
    } finally {
      setIsLoading(false);
    }
  }, [agentConfig, botId, generateToken, appConfig.agentName]);

  const handleMakePhoneCall = React.useCallback(async (phoneNumber: string) => {
    setIsOutbound(true); // Phone call
    setIsLoading(true);
    console.log('[App] Starting phone call with config:', {
      botId,
      phoneNumber,
      agentConfig,
      agentName: appConfig.agentName,
    });

    try {
      const token = await makeOutboundCall.mutateAsync({
        chatbotId: botId,
        phoneNumber,
        agentConfig: {
          instructions: agentConfig.instructions,
          tts_voice: agentConfig.tts_voice,
          stt_language: agentConfig.stt_language,
          tts_language: agentConfig.tts_language,
        },
        agentName: appConfig.agentName,
      });

      const data: LiveKitTokenResponse = token;
      setConnectionDetails({
        serverUrl: data.serverUrl,
        participantToken: data.participantToken,
      });
      setShouldConnect(true);

    } catch (e) {
      console.error('[App] Failed to make outbound call:', e);
    } finally {
      setIsLoading(false);
    }

  }, [agentConfig, botId, makeOutboundCall, appConfig.agentName]);

  const handleDisconnect = React.useCallback(() => {
    setShouldConnect(false);
    setConnectionDetails(null);
    setIsLoading(false);
    setIsOutbound(false);
  }, []);

  // Configuration Phase - before connection
  if (!connectionDetails || !shouldConnect) {
    return (
      <>
        <StartCallScreen
          appConfig={appConfig}
          onStartCall={handleStartCall}
          onMakePhoneCall={handleMakePhoneCall}
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
      audio={!isOutbound}  // audio={true} for browser call 
      onDisconnected={handleDisconnect}
    >
      <ConnectedSession appConfig={appConfig} />
      {!isOutbound && <RoomAudioRenderer />}
      <Toaster />
    </LiveKitRoom>
  );
}
