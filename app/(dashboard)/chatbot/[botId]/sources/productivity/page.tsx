'use client';

import { useParams } from 'next/navigation';
import { ProductivityDataSources, PendingSources } from '@/components/chatbot/data-sources';
import { QADialog } from '@/components/chatbot/QADialog';
import { useDataSourcesStore, useShowQADialog } from '@/store/chatbot/data-sources';
import { toast } from 'sonner';

export default function ProductivityPage() {
  const params = useParams();
  const botId = params.botId as string;
  
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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6">
          <h2 className="font-heading text-xl text-foreground mb-2">Productivity Sources</h2>
          <p className="font-sans text-base text-muted-foreground">
            Upload documents, Q&A pairs, CSV files, and connect productivity tools.
          </p>
        </div>

        <ProductivityDataSources chatbotId={botId?.toString() ?? ''} />
        
        <PendingSources chatbotId={botId?.toString() ?? ''} />

        <QADialog
          isOpen={showQADialog}
          onClose={() => setShowQADialog(false)}
          onSubmit={handleAddQA}
        />
      </div>
    </div>
  );
}

