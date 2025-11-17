'use client';

import { useParams } from 'next/navigation';
import { ProductivityDataSources } from '@/components/chatbot/data-sources';
import { QADialog } from '@/components/chatbot/QADialog';
import { useDataSourcesStore, useShowQADialog } from '@/store/chatbot/data-sources';
import { SourcesSidebar } from '@/components/chatbot/SourcesSidebar';
import { toast } from 'sonner';

export default function ProductivityPage() {
  const routeParams = useParams<{ botId: string }>();
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;
  
  const { setShowQADialog, addPendingSource } = useDataSourcesStore();
  const showQADialog = useShowQADialog();

  const handleAddQA = (question: string, answer: string, citation: string) => {
    addPendingSource({
      type: 'QandA',
      name: question,
      content: answer,
      citation: citation
    });
    toast.success('Q&A pair added successfully');
  };

  if (!botId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-6">
            <div className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6">
              <h2 className="font-heading text-xl text-foreground mb-2">Productivity Sources</h2>
              <p className="font-sans text-base text-muted-foreground">
                Upload documents, Q&A pairs, CSV files, and connect productivity tools.
              </p>
            </div>

            <ProductivityDataSources chatbotId={botId} />

            <QADialog
              isOpen={showQADialog}
              onClose={() => setShowQADialog(false)}
              onSubmit={handleAddQA}
            />
          </div>

          <div className="lg:sticky lg:top-6 lg:self-start">
            <SourcesSidebar chatbotId={botId} />
          </div>
        </div>
      </div>
    </div>
  );
}

