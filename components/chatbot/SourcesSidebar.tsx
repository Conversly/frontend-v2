'use client';

import { Globe, FileText, MessageSquare, X, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePendingSources, useDataSourcesStore, useIsLoading } from '@/store/chatbot/data-sources';
import { useProcessDataSource } from '@/services/datasource';
import { ProcessRequest, DocumentData } from '@/types/datasource';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface SourcesSidebarProps {
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

export function SourcesSidebar({ chatbotId }: SourcesSidebarProps) {
  const pendingSources = usePendingSources();
  const isLoading = useIsLoading();
  const { removePendingSource, clearPendingSources, setIsLoading } = useDataSourcesStore();
  const { mutateAsync: processAllSources } = useProcessDataSource(chatbotId);

  // Calculate total size (mock for now)
  const totalSize = pendingSources.length * 4; // 4KB per source as mock
  const maxSize = 400; // 400KB max

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
        qandaData: qandaData.length > 0 ? qandaData : undefined,
      };

      const result = await processAllSources(request);
      if (result.success) {
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

  return (
    <div className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6 space-y-6">
      <h2 className="font-heading text-xl text-foreground">Sources</h2>
      
      <div className="space-y-4">
        {/* Sources List */}
        {pendingSources.length > 0 ? (
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground mb-2">
              {pendingSources.length} {pendingSources.length === 1 ? 'source' : 'sources'} added
            </div>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {pendingSources.map((source) => {
                const Icon = getSourceIcon(source.type);
                return (
                  <motion.div
                    key={source.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg group hover:bg-muted/70 transition-colors"
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
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">No sources added</span>
            </div>
          </div>
        )}

        {/* Size Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total size</span>
            <span className="text-foreground font-medium">{totalSize} KB / {maxSize} KB</span>
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
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl group"
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
      </div>
    </div>
  );
}