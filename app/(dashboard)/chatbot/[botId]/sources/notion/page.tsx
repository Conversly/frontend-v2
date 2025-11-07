'use client';

import { useParams } from 'next/navigation';
import { Database, Lock } from 'lucide-react';

export default function NotionSourcePage() {
  const params = useParams();
  const botId = params.botId as string;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6">
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">Notion Integration</h1>
          <p className="text-muted-foreground">
            Connect your Notion workspace to sync content
          </p>
        </div>

        <div className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6">
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10">
              <Database className="w-8 h-8 text-pink-500" />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-foreground">Notion Integration</h3>
              <Lock className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-center max-w-md">
              Answer questions from the content of Notion pages. This feature is coming soon.
            </p>
            <button
              disabled
              className="px-6 py-2 rounded-xl bg-muted text-muted-foreground cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
