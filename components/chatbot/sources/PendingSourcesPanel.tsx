'use client';

import { Globe, FileText, MessageSquare, X, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePendingSources, useDataSourcesStore, useIsLoading } from '@/store/chatbot/data-sources';
import { useProcessDataSource } from '@/services/datasource';
import { ProcessRequest, DocumentData } from '@/types/datasource';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import posthog from 'posthog-js';

interface PendingSourcesPanelProps {
  chatbotId: string;
}

const getSourceIcon = (type: string) => {
  switch (type) {
    case 'Website':
      return Globe;
    case 'Document':
      return FileText;
    case 'QandA':
      return MessageSquare;
    default:
      return FileText;
  }
};

const getSourceTypeLabel = (type: string) => {
  switch (type) {
    case 'Website':
      return 'Link';
    case 'Document':
      return 'File';
    case 'QandA':
      return 'Q&A';
    case 'CSV':
      return 'CSV';
    default:
      return 'Source';
  }
};

export function PendingSourcesPanel({ chatbotId }: PendingSourcesPanelProps) {
  const pendingSources = usePendingSources();
  const isLoading = useIsLoading();
  const { removePendingSource, clearPendingSources, setIsLoading } = useDataSourcesStore();
  const { mutateAsync: processAllSources } = useProcessDataSource(chatbotId);

  const totalSize = pendingSources.length * 4;
  const maxSize = 400;

  const handleProcessSources = async () => {
    if (pendingSources.length === 0) {
      toast.error('No sources to process');
      return;
    }

    setIsLoading(true);
    try {
      const websiteUrls = pendingSources
        .filter(source => source.type === 'Website')
        .map(source => source.name);

      const documents: DocumentData[] = pendingSources
        .filter(source => source.type === 'Document' && source.blobData)
        .map(source => source.blobData as DocumentData);

      const textContent = pendingSources
        .filter(source => source.type === 'Document' && !source.blobData && typeof source.content === 'string')
        .map(source => source.content as string);

      const qandaData = pendingSources
        .filter(source => source.type === 'QandA')
        .map(source => ({
          question: source.name,
          answer: source.content as string,
          citations: source.citation
        }));

      const request: ProcessRequest = {
        chatbotId: chatbotId,
        websiteUrls: websiteUrls.length > 0 ? websiteUrls : undefined,
        documents: documents.length > 0 ? documents : undefined,
        textContent: textContent.length > 0 ? textContent : undefined,
        qandaData: qandaData.length > 0 ? qandaData : undefined,
      };

      const result = await processAllSources(request);
      if (result.success) {
        pendingSources.forEach(source => {
          posthog.capture("data_source_added", {
            chatbot_id: chatbotId,
            source_type: source.type,
          });
        });
        toast.success('Data sources processing started', {
          description: 'Data sources will be available shortly',
        });
        clearPendingSources();
      } else {
        toast.error('Failed to process data sources', {
          description: result.message || 'Unknown error',
        });
      }
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error && error.message.includes('maximum number of data sources')) {
        toast.error('Maximum sources reached', {
          description: 'You have reached the maximum number of data sources allowed for this chatbot in the free tier.',
        });
      } else {
        toast.error('Failed to process data sources', {
          description: error instanceof Error ? error.message : 'Unknown error',
        });
      }
      setIsLoading(false);
    }
  };

  if (pendingSources.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-6 right-6 z-50 w-[360px] bg-card border border-border rounded-xl shadow-float p-4 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="type-section-title">
            Pending Sources ({pendingSources.length})
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearPendingSources}
            className="text-muted-foreground hover:text-foreground text-xs"
          >
            Clear all
          </Button>
        </div>

        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {pendingSources.map((source) => {
            const Icon = getSourceIcon(source.type);
            return (
              <motion.div
                key={source.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-3 p-3 bg-[--surface-secondary] rounded-lg group hover:bg-muted/70 transition-colors border border-border"
              >
                <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground mb-1">
                    {getSourceTypeLabel(source.type)}
                  </div>
                  <div className="text-sm text-foreground truncate">
                    {source.name}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removePendingSource(source.id)}
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                >
                  <X className="w-3 h-3" />
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Size Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="type-body-muted">Total size</span>
            <span className="text-foreground font-semibold">{totalSize} KB / {maxSize} KB</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${Math.min((totalSize / maxSize) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Process Button */}
        <Button
          onClick={handleProcessSources}
          disabled={isLoading || pendingSources.length === 0}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg group"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Process All Sources
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </motion.div>
    </AnimatePresence>
  );
}
