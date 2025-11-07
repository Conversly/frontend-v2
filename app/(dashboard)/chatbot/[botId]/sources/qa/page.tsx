'use client';

import { useParams } from 'next/navigation';
import { MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { useDataSourcesStore, useShowQADialog } from '@/store/chatbot/data-sources';
import { PendingSources } from '@/components/chatbot/data-sources';
import { QADialog } from '@/components/chatbot/QADialog';

export default function QASourcePage() {
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
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6">
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">Q&A</h1>
          <p className="text-muted-foreground">
            Create custom question-answer pairs for your chatbot
          </p>
        </div>

        <div className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Add Q&A Pairs</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Finetune your bot by providing common questions and answers
              </p>
              <button
                onClick={() => setShowQADialog(true)}
                className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Add Q&A Pair
              </button>
            </div>
          </div>
        </div>

        <PendingSources chatbotId={botId} />

        <QADialog
          isOpen={showQADialog}
          onClose={() => setShowQADialog(false)}
          onSubmit={handleAddQA}
        />
      </div>
    </div>
  );
}
