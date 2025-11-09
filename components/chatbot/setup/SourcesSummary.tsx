'use client';

import React, { useMemo } from 'react';
import { useDataSources } from '@/store/chatbot/data-sources';

function formatBytes(bytes: number): string {
  if (bytes <= 0 || Number.isNaN(bytes)) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  let v = bytes;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${Math.round(v * 10) / 10} ${units[i]}`;
}

export function SourcesSummary() {
  const sources = useDataSources();

  const { fileCount, urlCount, textCount, totalBytes } = useMemo(() => {
    const counts = { fileCount: 0, urlCount: 0, textCount: 0, totalBytes: 0 };
    for (const s of sources) {
      if (s.type === 'file') counts.fileCount += 1;
      if (s.type === 'url') counts.urlCount += 1;
      if (s.type === 'text') counts.textCount += 1;
      if (typeof s.size === 'number') counts.totalBytes += s.size;
    }
    return counts;
  }, [sources]);

  const quotaBytes = 400 * 1024; // UI quota display target from mock

  return (
    <div className="w-full max-w-md rounded-2xl border bg-background/70 p-4 shadow-sm">
      <div className="rounded-[14px] p-[2px]">
        <div className="rounded-xl border bg-background p-4">
          <div className="mb-4 text-base font-semibold">Sources</div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border bg-muted/40 px-3 py-2 text-sm">
              <span className="text-muted-foreground">Files</span>
              <span className="font-medium">{fileCount}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border bg-muted/40 px-3 py-2 text-sm">
              <span className="text-muted-foreground">Web pages</span>
              <span className="font-medium">{urlCount}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border bg-muted/40 px-3 py-2 text-sm">
              <span className="text-muted-foreground">Text snippets</span>
              <span className="font-medium">{textCount}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border bg-muted/40 px-3 py-2 text-sm">
              <span className="text-muted-foreground">Total size</span>
              <span className="font-medium">
                {formatBytes(totalBytes)} / {formatBytes(quotaBytes)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


