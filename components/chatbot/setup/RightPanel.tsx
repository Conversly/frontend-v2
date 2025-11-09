'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type Stage = 'idle' | 'crawl' | 'logo' | 'topics' | 'tuning';

interface RightPanelProps {
  url: string;
  stage: Stage;
}

const stageLabel: Record<Stage, string> = {
  idle: 'Ready',
  crawl: 'Crawling website',
  logo: 'Analyzing logo',
  topics: 'Inferring topics',
  tuning: 'Tuning instructions',
};

export function RightPanel({ url, stage }: RightPanelProps) {
  return (
    <div className="hidden h-full w-full overflow-hidden bg-dot-wide px-10 pt-20 lg:flex lg:flex-col lg:items-center lg:justify-center">
      <div className="relative mx-auto flex w-full max-w-md flex-col items-center">
        {/* Mock browser window */}
        <div className="w-full rounded-2xl border bg-background/70 p-4 shadow-sm backdrop-blur">
          <div className="mb-3 flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span className="h-2 w-2 rounded-full bg-yellow-400" />
            <span className="h-2 w-2 rounded-full bg-green-400" />
          </div>
          <div className="rounded-md border bg-muted/40 p-3 text-sm text-muted-foreground">
            {url || 'https://'}
          </div>
          <div className="mt-4 h-32 rounded-md border bg-gradient-to-br from-muted/40 to-muted/10" />
        </div>

        {/* Connector */}
        <div className="my-6 h-16 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />

        {/* Chatbase badge */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-fuchsia-500/30 via-pink-500/30 to-orange-400/30 blur-lg" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border bg-background shadow-inner">
            <span className="text-sm font-semibold">AI</span>
          </div>
        </div>

        {/* Stage indicator */}
        <div className="mt-6 w-full rounded-lg border bg-background/70 p-3 text-center text-xs text-muted-foreground">
          <div className="mb-2 font-medium text-foreground">{stageLabel[stage]}</div>
          <div className="mx-auto h-1 w-40 overflow-hidden rounded bg-muted">
            <div
              className={cn(
                'h-full w-1/4 bg-gradient-to-r from-primary/60 to-primary',
                stage === 'idle' && 'translate-x-0',
                stage === 'crawl' && 'animate-[slide_2s_ease-in-out_infinite]',
                stage === 'logo' && 'animate-[slide_2s_ease-in-out_infinite]',
                stage === 'topics' && 'animate-[slide_2s_ease-in-out_infinite]',
                stage === 'tuning' && 'animate-[slide_1.2s_linear_infinite]'
              )}
              style={{ transform: stage === 'idle' ? 'translateX(0%)' : undefined }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
