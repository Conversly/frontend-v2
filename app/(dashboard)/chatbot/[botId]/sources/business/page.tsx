'use client';

import { useParams } from 'next/navigation';
import { BusinessDataSources } from '@/components/chatbot/data-sources';
import { SourcesSidebar } from '@/components/chatbot/SourcesSidebar';

export default function BusinessPage() {
  const params = useParams();
  const botId = params.botId as string;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-6">
            <div className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6">
              <h2 className="font-heading text-xl text-foreground mb-2">Business Tools</h2>
              <p className="font-sans text-base text-muted-foreground">
                Connect your business tools like Zendesk, Slack, and other enterprise platforms.
              </p>
            </div>

            <BusinessDataSources chatbotId={botId?.toString() ?? ''} />

          </div>

          <div className="lg:sticky lg:top-6 lg:self-start">
            <SourcesSidebar chatbotId={botId} />
          </div>
        </div>
      </div>
    </div>
  );
}

