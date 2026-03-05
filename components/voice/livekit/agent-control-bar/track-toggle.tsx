'use client';

import * as React from 'react';
import { Track } from 'livekit-client';
import { useTrackToggle } from '@livekit/components-react';
import {
  Mic,
  MicOff,
  Monitor,
  Videocam,
  VideocamOff,
} from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { Toggle } from '@/components/voice/livekit/toggle';
import { cn } from '@/lib/utils';

function getSourceIcon(source: Track.Source, enabled: boolean): React.ComponentType<{ className?: string; sx?: object }> {
  switch (source) {
    case Track.Source.Microphone:
      return enabled ? Mic : MicOff;
    case Track.Source.Camera:
      return enabled ? Videocam : VideocamOff;
    case Track.Source.ScreenShare:
      return Monitor;
    default:
      return React.Fragment as React.ComponentType<{ className?: string; sx?: object }>;
  }
}

export type TrackToggleProps = React.ComponentProps<typeof Toggle> & {
  source: Parameters<typeof useTrackToggle>[0]['source'];
  pending?: boolean;
};

export function TrackToggle({ source, pressed, pending, className, ...props }: TrackToggleProps) {
  const IconComponent = getSourceIcon(source, pressed ?? false);

  return (
    <Toggle pressed={pressed} aria-label={`Toggle ${source}`} className={cn(className)} {...props}>
      {pending ? <CircularProgress size={16} className="animate-spin" /> : <IconComponent sx={{ fontSize: 16 }} />}
      {props.children}
    </Toggle>
  );
}

