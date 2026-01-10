'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { ConnectionState } from 'livekit-client';
import { motion } from 'framer-motion';
import {
  useChat,
  useConnectionState,
  useRoomContext,
  useRemoteParticipants,
  useTranscriptions,
  type ReceivedChatMessage,
  type TextStreamData,
} from '@livekit/components-react';
import type { AppConfig } from '@/components/voice/livekit/app-config';
import { ChatTranscript } from '@/components/voice/livekit/app/chat-transcript';
import { PreConnectMessage } from '@/components/voice/livekit/app/preconnect-message';
import { TileLayout } from '@/components/voice/livekit/app/tile-layout';
import {
  AgentControlBar,
  type ControlBarControls,
} from '@/components/voice/livekit/agent-control-bar/agent-control-bar';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const MotionBottom = motion.div;

const BOTTOM_VIEW_MOTION_PROPS = {
  variants: {
    visible: {
      opacity: 1,
      translateY: '0%',
    },
    hidden: {
      opacity: 0,
      translateY: '100%',
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  transition: {
    duration: 0.3,
    delay: 0.5,
    ease: [0.4, 0, 0.2, 1] as const,
  },
};

interface FadeProps {
  top?: boolean;
  bottom?: boolean;
  className?: string;
}

export function Fade({ top = false, bottom = false, className }: FadeProps) {
  return (
    <div
      className={cn(
        'from-background pointer-events-none h-4 bg-linear-to-b to-transparent',
        top && 'bg-linear-to-b',
        bottom && 'bg-linear-to-t',
        className
      )}
    />
  );
}

interface SessionViewProps {
  appConfig: AppConfig;
}

// Helper function to convert transcript to chat message format
function transcriptionToChatMessage(
  textStream: TextStreamData,
  room: ReturnType<typeof useRoomContext>
): ReceivedChatMessage {
  // TextStreamData structure: { streamInfo: { id, timestamp }, text, participantInfo: { identity } }
  const participantIdentity = textStream.participantInfo?.identity || '';
  const isLocal = participantIdentity === room.localParticipant?.identity;

  const from = isLocal
    ? room.localParticipant
    : Array.from(room.remoteParticipants.values()).find(
      (p) => p.identity === participantIdentity
    ) || {
      identity: participantIdentity,
      name: participantIdentity || 'Unknown',
      isLocal: false,
    };

  return {
    id: textStream.streamInfo?.id || `transcript-${Date.now()}-${Math.random()}`,
    timestamp: textStream.streamInfo?.timestamp || Date.now(),
    message: textStream.text || '',
    from: from as any, // LiveKit participant type
    type: 'chatMessage' as const,
  };
}

export const SessionView = ({
  appConfig,
  ...props
}: React.ComponentProps<'section'> & SessionViewProps) => {
  const room = useRoomContext();
  const connectionState = useConnectionState(room);
  const { chatMessages } = useChat();
  const transcriptions: TextStreamData[] = useTranscriptions();
  const remoteParticipants = useRemoteParticipants();
  const [chatOpen, setChatOpen] = useState(true); // Changed to true to show transcript by default
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Check if agent participant has joined
  const hasAgent = remoteParticipants.some((p) => p.isAgent || p.metadata?.includes('"agent":true'));

  // Merge transcriptions and chat messages
  const messages = useMemo(() => {
    console.log('[SessionView] Merging messages:', {
      transcriptions: transcriptions.length,
      chatMessages: chatMessages.length,
      rawTranscriptions: transcriptions,
    });

    const transcriptMessages: ReceivedChatMessage[] = transcriptions.map((transcription) => {
      const converted = transcriptionToChatMessage(transcription, room);
      console.log('[SessionView] Converted transcript:', {
        original: transcription,
        converted,
      });
      return converted;
    });

    const merged: ReceivedChatMessage[] = [
      ...transcriptMessages,
      ...chatMessages,
    ];

    // Sort by timestamp
    const sorted = merged.sort((a, b) => a.timestamp - b.timestamp);
    console.log('[SessionView] Final merged messages:', sorted);
    return sorted;
  }, [transcriptions, chatMessages, room]);

  // Debug: Log messages to see if they're being received
  React.useEffect(() => {
    console.log('[SessionView] Debug state:', {
      transcriptionsCount: transcriptions.length,
      chatMessagesCount: chatMessages.length,
      mergedMessagesCount: messages.length,
      transcriptions: transcriptions.length > 0 ? transcriptions : 'none',
      chatMessages: chatMessages.length > 0 ? chatMessages : 'none',
      mergedMessages: messages.length > 0 ? messages : 'none',
      roomConnected: connectionState === ConnectionState.Connected,
      hasAgent,
    });
  }, [transcriptions, chatMessages, messages, connectionState, hasAgent]);

  const controls: ControlBarControls = {
    leave: true,
    microphone: true,
    chat: appConfig.supportsChatInput,
    camera: appConfig.supportsVideoInput,
    screenShare: appConfig.supportsVideoInput,
  };

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current && messages.length > 0) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section className="bg-background relative z-10 h-full w-full overflow-hidden flex flex-col" {...props}>
      {/* Chat Transcript - Now visible and properly positioned */}
      <div
        className={cn(
          'flex-1 min-h-0 relative transition-opacity duration-300 overflow-hidden z-20',
          !chatOpen && 'pointer-events-none opacity-0'
        )}
      >
        <Fade top className="absolute inset-x-0 top-0 h-8 z-10" />
        <div ref={scrollAreaRef} className="h-full overflow-y-auto px-4 pt-2 pb-20 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
          {/* Debug info */}
          {process.env.NODE_ENV === 'development' && (
            <div className="text-xs text-muted-foreground mb-2 p-2 bg-muted rounded">
              Debug: Transcriptions: {transcriptions.length}, Chat: {chatMessages.length}, Total: {messages.length}, Connected: {connectionState === ConnectionState.Connected ? 'Yes' : 'No'}
            </div>
          )}
          <ChatTranscript
            hidden={false}
            messages={messages}
            className="space-y-2"
          />
        </div>
        <Fade bottom className="absolute inset-x-0 bottom-0 h-8 z-10" />
      </div>

      {/* Tile Layout - Only render when agent has joined (simplified for preview) */}
      {hasAgent && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <TileLayout chatOpen={chatOpen} />
        </div>
      )}

      {/* Bottom Control Bar - Positioned relative to container */}
      <MotionBottom
        {...BOTTOM_VIEW_MOTION_PROPS}
        className="relative z-50 px-3 pb-3"
      >
        {appConfig.isPreConnectBufferEnabled && (
          <PreConnectMessage messages={messages} className="pb-2" />
        )}
        <div className="bg-background relative">
          <AgentControlBar
            controls={controls}
            isConnected={connectionState === ConnectionState.Connected}
            onDisconnect={() => room.disconnect()}
            onChatOpenChange={setChatOpen}
          />
        </div>
      </MotionBottom>
    </section>
  );
};

