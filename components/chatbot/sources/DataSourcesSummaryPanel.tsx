'use client';

import { useMemo, Suspense } from 'react';
import { Globe, FileText, MessageSquare, AlignLeft, ArrowRight, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePendingSources, useDataSourcesStore, useIsLoading } from '@/store/chatbot/data-sources';
import { useProcessDataSource, useSuspenseDataSources } from '@/services/datasource';
import { ProcessRequest, DocumentData } from '@/types/datasource';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface DataSourcesSummaryPanelProps {
  chatbotId: string;
  onProcessSuccess?: () => void;
}

function ExistingSourceCounts({ chatbotId }: { chatbotId: string }) {
  const { data: dataSources } = useSuspenseDataSources(chatbotId);

  const counts = useMemo(() => {
    if (!dataSources) return { files: 0, links: 0, qa: 0, text: 0 };
    return {
      files: dataSources.filter(s => s.type === 'DOCUMENT').length,
      links: dataSources.filter(s => s.type === 'URL').length,
      qa: dataSources.filter(s => s.type === 'QNA').length,
      text: dataSources.filter(s => s.type === 'TXT').length,
    };
  }, [dataSources]);

  const rows = [
    { icon: FileText, label: 'File', count: counts.files, color: 'text-blue-500' },
    { icon: Globe, label: 'Link', count: counts.links, color: 'text-green-500' },
    { icon: MessageSquare, label: 'Q&A', count: counts.qa, color: 'text-purple-500' },
    { icon: AlignLeft, label: 'Text', count: counts.text, color: 'text-orange-500' },
  ];

  const visibleRows = rows.filter(r => r.count > 0);

  if (visibleRows.length === 0) return null;

  return (
    <div className="space-y-1">
      {visibleRows.map((row) => {
        const Icon = row.icon;
        return (
          <div
            key={row.label}
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-muted/40 border border-border"
          >
            <div className="flex items-center gap-2.5">
              <Icon className={cn('w-4 h-4', row.color)} />
              <span className="text-sm text-foreground">
                {row.count} {row.count === 1 ? row.label : `${row.label}s`}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ExistingCountsFallback() {
  return (
    <div className="space-y-1">
      {[1, 2].map((i) => (
        <div key={i} className="h-10 rounded-lg bg-muted/50 animate-pulse" />
      ))}
    </div>
  );
}

export function DataSourcesSummaryPanel({ chatbotId, onProcessSuccess }: DataSourcesSummaryPanelProps) {
  const pendingSources = usePendingSources();
  const isLoading = useIsLoading();
  const { clearPendingSources, setIsLoading } = useDataSourcesStore();
  const { mutateAsync: processAllSources } = useProcessDataSource(chatbotId);

  const pendingCounts = useMemo(() => {
    const files = pendingSources.filter(s => s.type === 'Document' && s.blobData);
    const links = pendingSources.filter(s => s.type === 'Website');
    const qa = pendingSources.filter(s => s.type === 'QandA');
    const text = pendingSources.filter(s => s.type === 'Document' && !s.blobData && typeof s.content === 'string');

    return {
      files: files.length,
      links: links.length,
      qa: qa.length,
      text: text.length,
    };
  }, [pendingSources]);

  const totalPending = pendingSources.length;
  const totalSize = pendingSources.length * 4; // KB estimate
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
        toast.success('Data sources processing started', {
          description: 'Data sources will be available shortly',
        });
        clearPendingSources();
        setIsLoading(false);
        onProcessSuccess?.();
      } else {
        toast.error('Failed to process data sources', {
          description: result.message || 'Unknown error',
        });
        setIsLoading(false);
      }
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

  const pendingRows = [
    { icon: FileText, label: 'File', count: pendingCounts.files, color: 'text-blue-500' },
    { icon: Globe, label: 'Link', count: pendingCounts.links, color: 'text-green-500' },
    { icon: MessageSquare, label: 'Q&A', count: pendingCounts.qa, color: 'text-purple-500' },
    { icon: AlignLeft, label: 'Text', count: pendingCounts.text, color: 'text-orange-500' },
  ];

  const visiblePendingRows = pendingRows.filter(r => r.count > 0);

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-base font-semibold text-foreground mb-4">Data sources</h3>

      {/* Existing sources */}
      <Suspense fallback={<ExistingCountsFallback />}>
        <ExistingSourceCounts chatbotId={chatbotId} />
      </Suspense>

      {/* Pending sources */}
      {visiblePendingRows.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
            Pending ({totalPending})
          </p>
          <div className="space-y-1">
            {visiblePendingRows.map((row) => {
              const Icon = row.icon;
              return (
                <div
                  key={row.label}
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-amber-500/5 border border-amber-500/20"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={cn('w-4 h-4', row.color)} />
                    <span className="text-sm text-foreground">
                      {row.count} {row.count === 1 ? row.label : `${row.label}s`}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">new</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Size + Process */}
      <div className="mt-auto pt-6 space-y-4">
        {/* Size Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total size</span>
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
          className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-lg group h-11"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Retrain agent
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>

        {/* Retraining warning */}
        {totalPending > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <RefreshCw className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <p className="text-xs text-amber-600 font-medium">
              Retraining is required for changes to apply
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
