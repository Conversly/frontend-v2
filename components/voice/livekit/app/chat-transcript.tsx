'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { type ReceivedMessage } from '@livekit/components-react';
import { ChatEntry } from '@/components/voice/livekit/chat-entry';
import { cn } from '@/lib/utils';

const MotionContainer = motion.div;

const CONTAINER_MOTION_PROPS = {
  variants: {
    hidden: {
      opacity: 0,
      transition: {
        ease: [0.4, 0, 0.2, 1] as const,
        duration: 0.3,
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        ease: [0.4, 0, 0.2, 1] as const,
        duration: 0.3,
        stagerDelay: 0.2,
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
};

const MESSAGE_MOTION_PROPS = {
  variants: {
    hidden: {
      opacity: 0,
      translateY: 10,
    },
    visible: {
      opacity: 1,
      translateY: 0,
    },
  },
};

interface ChatTranscriptProps {
  hidden?: boolean;
  messages?: ReceivedMessage[];
}

export function ChatTranscript({
  hidden = false,
  messages = [],
  ...props
}: ChatTranscriptProps & React.HTMLAttributes<HTMLDivElement>) {
  // Debug logging
  React.useEffect(() => {
    console.log('[ChatTranscript] Rendering with messages:', {
      hidden,
      messageCount: messages.length,
      messages: messages.map(m => ({
        id: m.id,
        message: m.message,
        from: m.from,
        timestamp: m.timestamp,
      })),
    });
  }, [hidden, messages]);

  if (hidden) {
    return null;
  }

  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        <p>No messages yet. Start speaking to see the transcript here.</p>
      </div>
    );
  }

  return (
    <div {...props} className={cn('space-y-2', props.className)}>
      {messages.map((receivedMessage) => {
        const { id, timestamp, from, message } = receivedMessage;
        
        // Skip empty messages
        if (!message || message.trim() === '') {
          console.warn('[ChatTranscript] Skipping empty message:', id);
          return null;
        }

        const locale = navigator?.language ?? 'en-US';
        const messageOrigin = from?.isLocal ? 'local' : 'remote';
        const hasBeenEdited =
          receivedMessage.type === 'chatMessage' && !!receivedMessage.editTimestamp;

        console.log('[ChatTranscript] Rendering message:', {
          id,
          message,
          from: from ? { identity: from.identity, isLocal: from.isLocal } : 'no from',
          messageOrigin,
          timestamp,
        });

        return (
          <ChatEntry
            key={id}
            locale={locale}
            timestamp={timestamp}
            message={message}
            messageOrigin={messageOrigin}
            hasBeenEdited={hasBeenEdited}
            name={from?.name || from?.identity}
          />
        );
      })}
    </div>
  );
}

