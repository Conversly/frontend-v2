'use client';

import * as React from 'react';
import { ConnectionState } from 'livekit-client';
import { AnimatePresence, motion } from 'framer-motion';
import { useConnectionState, useRoomContext } from '@livekit/components-react';
import type { AppConfig } from '@/components/voice/livekit/app-config';
import { SessionView } from '@/components/voice/livekit/app/session-view';
import { WelcomeView } from '@/components/voice/livekit/app/welcome-view';

// Use forwardRef wrapper for motion components to avoid deprecation
const MotionWelcomeView = React.forwardRef<any, React.ComponentProps<typeof WelcomeView>>((props, ref) => {
  const MotionComponent = motion(WelcomeView);
  return <MotionComponent {...props} ref={ref} />;
});
MotionWelcomeView.displayName = 'MotionWelcomeView';

const MotionSessionView = React.forwardRef<any, React.ComponentProps<typeof SessionView>>((props, ref) => {
  const MotionComponent = motion(SessionView);
  return <MotionComponent {...props} ref={ref} />;
});
MotionSessionView.displayName = 'MotionSessionView';

const VIEW_MOTION_PROPS = {
  variants: {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  transition: {
    duration: 0.5,
    ease: 'linear',
  },
};

interface ViewControllerProps {
  appConfig: AppConfig;
  onStart: () => void;
}

export function ViewController({ appConfig, onStart }: ViewControllerProps) {
  const room = useRoomContext();
  const connectionState = useConnectionState(room);
  const isConnected = connectionState === ConnectionState.Connected;

  return (
    <div className="h-full w-full">
      <AnimatePresence mode="wait">
        {/* Welcome view */}
        {!isConnected && (
          <MotionWelcomeView
            key="welcome"
            {...VIEW_MOTION_PROPS}
            startButtonText={appConfig.startButtonText}
            onStartCall={onStart}
            className="h-full flex items-center justify-center"
          />
        )}
        {/* Session view */}
        {isConnected && (
          <MotionSessionView key="session-view" {...VIEW_MOTION_PROPS} appConfig={appConfig} />
        )}
      </AnimatePresence>
    </div>
  );
}

