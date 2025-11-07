'use client';

import { useParams } from 'next/navigation';
import { WebDataSources, PendingSources } from '@/components/chatbot/data-sources';

export default function WebPage() {
  const params = useParams();
  const botId = params.botId as string;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6">
          <h2 className="font-heading text-xl text-foreground mb-2">Web Sources</h2>
          <p className="font-sans text-base text-muted-foreground">
            Connect websites, sitemaps, and web content to your chatbot knowledge base.
          </p>
        </div>

        <WebDataSources chatbotId={botId?.toString() ?? ''} />
        
        <PendingSources chatbotId={botId?.toString() ?? ''} />
      </div>
    </div>
  );
}

