'use client';

import { useParams } from 'next/navigation';
import { CloudDataSources } from '@/components/chatbot/data-sources';
import { SourcesSidebar } from '@/components/chatbot/SourcesSidebar';

export default function CloudPage() {
  const params = useParams();
  const botId = params.botId as string;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-6">
            <div className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6">
              <h2 className="font-heading text-xl text-foreground mb-2">Cloud Storage Sources</h2>
              <p className="font-sans text-base text-muted-foreground">
                Connect cloud storage services like Google Drive and Dropbox to train your chatbot.
              </p>
            </div>

            <CloudDataSources chatbotId={botId?.toString() ?? ''} />
          </div>

          <div className="lg:sticky lg:top-6 lg:self-start">
            <SourcesSidebar chatbotId={botId} />
          </div>
        </div>
      </div>
    </div>
  );
}

