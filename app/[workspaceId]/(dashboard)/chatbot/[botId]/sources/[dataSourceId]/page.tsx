'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  FileText,
  Globe,
  MessageSquare,
  AlignLeft,
  ChevronLeft,
  Copy,
  Check,
  AlertCircle,
  Ellipsis,
  Trash2,
  Edit3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  useSuspenseDataSources,
  useSuspenseEmbeddings,
  useSuspenseSourceContent,
  useDeleteKnowledge,
  useAddCitation,
} from '@/services/datasource';
import { toast } from 'sonner';
import type {
  DataSourceItem,
  EmbeddingItem,
  SourceContentItem,
  WebContent,
  FileContent,
  QASourceContent,
  TextSourceContent,
} from '@/types/datasource';
import { AsyncBoundary } from '@/components/shared/AsyncBoundary';
import { useEditGuard } from '@/store/branch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { FeatureGuard } from '@/components/shared/FeatureGuard';

// =============================================================================
// Constants
// =============================================================================

const DATA_SOURCE_ICONS = {
  URL: Globe,
  WEBSITE: Globe,
  DOCUMENT: FileText,
  PDF: FileText,
  QNA: MessageSquare,
  TXT: AlignLeft,
} as const;

const TRAINING_STATUS_BADGE_COLORS = {
  DRAFT: 'border-muted-foreground/30 bg-muted text-muted-foreground',
  QUEUEING: 'border-amber-300 bg-amber-50 text-amber-700',
  PROCESSING: 'border-blue-300 bg-blue-50 text-blue-700',
  COMPLETED: 'border-green-300 bg-green-50 text-green-700',
  FAILED: 'border-red-300 bg-red-50 text-red-700',
} as const;

function getStatusBadgeClass(status: string | null | undefined, map: Record<string, string>) {
  if (!status) return map.DRAFT;
  return map[status.toUpperCase()] || map.DRAFT;
}

// Pill-style tab trigger — matches CustomizationTab standard
const PILL_TAB_CLASS =
  'text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground';

// =============================================================================
// Content Viewer Components
// =============================================================================

function WebContentView({ content }: { content: WebContent }) {
  return (
    <div className="space-y-6">
      {(content.title || content.url) && (
        <div className="pb-5 border-b border-border">
          {content.title && (
            <h3 className="text-base font-semibold text-foreground leading-snug">{content.title}</h3>
          )}
          {content.url && (
            <a
              href={content.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:text-primary/80 break-all mt-1.5 block"
            >
              {content.url}
            </a>
          )}
        </div>
      )}
      <div className="space-y-6">
        {content.sections?.map((section, i) => (
          <div key={i}>
            {section.heading && (
              <h4 className="text-sm font-semibold text-foreground mb-2">{section.heading}</h4>
            )}
            <p className="text-sm text-foreground/80 leading-[1.75] whitespace-pre-wrap">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FileContentView({ content }: { content: FileContent }) {
  return (
    <div className="space-y-6">
      {content.pages?.map((page, i) => (
        <div key={page.page}>
          <p className="text-sm text-foreground/80 leading-[1.75] whitespace-pre-wrap">{page.content}</p>
          {i < (content.pages?.length ?? 0) - 1 && (
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 border-t border-border" />
              <span className="text-xs text-muted-foreground font-medium">Page {page.page + 1}</span>
              <div className="flex-1 border-t border-border" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function QAContentView({ content }: { content: QASourceContent }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Question</p>
        <p className="text-sm text-foreground leading-[1.75]">{content.question}</p>
      </div>
      <div className="border-t border-border pt-6">
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Answer</p>
        <p className="text-sm text-foreground/80 leading-[1.75] whitespace-pre-wrap">{content.answer}</p>
      </div>
    </div>
  );
}

function TextContentView({ content }: { content: TextSourceContent }) {
  return (
    <p className="text-sm text-foreground/80 leading-[1.75] whitespace-pre-wrap">{content.content}</p>
  );
}

function SourceContentRenderer({ content }: { content: SourceContentItem }) {
  switch (content.contentType) {
    case 'web':
      return <WebContentView content={content.structuredContent as WebContent} />;
    case 'file':
      return <FileContentView content={content.structuredContent as FileContent} />;
    case 'qa':
      return <QAContentView content={content.structuredContent as QASourceContent} />;
    case 'text':
      return <TextContentView content={content.structuredContent as TextSourceContent} />;
    default:
      return (
        <p className="text-sm text-foreground/80 leading-[1.75] whitespace-pre-wrap">
          {content.plainText || 'No content available'}
        </p>
      );
  }
}

// =============================================================================
// Suspense Content Loaders
// =============================================================================

function SourceContentTabBody({ dataSourceId }: { dataSourceId: string }) {
  const { data: content } = useSuspenseSourceContent(dataSourceId);

  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertCircle className="w-7 h-7 text-muted-foreground/40 mb-3" />
        <p className="text-sm text-muted-foreground">Content preview not available.</p>
        <p className="text-xs text-muted-foreground/60 mt-1">Switch to the Chunks tab to view raw data.</p>
      </div>
    );
  }

  return <SourceContentRenderer content={content} />;
}

function EmbeddingChunk({ embedding, index }: { embedding: EmbeddingItem; index: number }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(embedding.text);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const shouldTruncate = embedding.text.length > 300;
  const displayText = expanded ? embedding.text : embedding.text.slice(0, 300);

  return (
    <div className="group py-5">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-xs font-mono text-muted-foreground">Chunk #{index + 1}</span>
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
        </Button>
      </div>
      <p className="text-sm text-foreground/80 leading-[1.75] whitespace-pre-wrap">
        {displayText}
        {shouldTruncate && !expanded && '...'}
      </p>
      {shouldTruncate && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-primary hover:text-primary/80 mt-2 font-medium"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
}

function EmbeddingChunksContent({ dataSourceId }: { dataSourceId: string }) {
  const { data: embeddings } = useSuspenseEmbeddings(dataSourceId);

  if (!embeddings || embeddings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertCircle className="w-7 h-7 text-muted-foreground/40 mb-3" />
        <p className="text-sm text-muted-foreground">No embeddings found. They may still be processing.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1">{embeddings.length} chunks</p>
      <div className="divide-y divide-border">
        {embeddings.map((embedding, index) => (
          <EmbeddingChunk key={embedding.id} embedding={embedding} index={index} />
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// Details Sidebar Rows
// =============================================================================

function DetailsSidebarRows({ dataSource, wordCount }: { dataSource: DataSourceItem; wordCount?: number }) {
  const formatDate = (date: string | Date | null) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return (
      d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: '2-digit' }) +
      ', ' +
      d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    );
  };

  return (
    <div className="divide-y divide-border">
      <div className="flex items-baseline justify-between py-3">
        <span className="text-sm text-muted-foreground">Created:</span>
        <span className="text-sm font-medium text-foreground">{formatDate(dataSource.createdAt)}</span>
      </div>
      <div className="flex items-baseline justify-between py-3">
        <span className="text-sm text-muted-foreground">Last updated:</span>
        <span className="text-sm font-medium text-foreground">{formatDate(dataSource.createdAt)}</span>
      </div>
      {wordCount != null && wordCount > 0 && (
        <div className="flex items-baseline justify-between py-3">
          <span className="text-sm text-muted-foreground">Words:</span>
          <span className="text-sm font-medium text-foreground">{wordCount.toLocaleString()}</span>
        </div>
      )}
      <div className="flex items-baseline justify-between py-3">
        <span className="text-sm text-muted-foreground">Type:</span>
        <span className="text-sm font-medium text-foreground capitalize">{(dataSource.type || 'Document').toLowerCase()}</span>
      </div>
      <div className="flex items-baseline justify-between py-3">
        <span className="text-sm text-muted-foreground">Status:</span>
        <span className="text-sm font-medium text-foreground capitalize">{(dataSource.ingestionStatus || 'Draft').toLowerCase()}</span>
      </div>
      {dataSource.citation && (
        <div className="flex items-baseline justify-between gap-4 py-3">
          <span className="text-sm text-muted-foreground shrink-0">Citation:</span>
          <a
            href={dataSource.citation}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:text-primary/80 break-all text-right"
          >
            {dataSource.citation}
          </a>
        </div>
      )}
    </div>
  );
}

function DetailsSidebarRowsWithContent({ dataSource }: { dataSource: DataSourceItem }) {
  const { data: content } = useSuspenseSourceContent(dataSource.id);
  return <DetailsSidebarRows dataSource={dataSource} wordCount={content?.wordCount} />;
}

// =============================================================================
// Edit Citation Dialog
// =============================================================================

function EditCitationDialog({
  dataSource,
  onClose,
  onSave,
}: {
  dataSource: DataSourceItem;
  onClose: () => void;
  onSave: (citation: string) => void;
}) {
  const [citation, setCitation] = useState(dataSource.citation || '');

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="type-section-title">Edit Citation</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            value={citation}
            onChange={(e) => setCitation(e.target.value)}
            placeholder="Enter citation URL..."
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
          <Button onClick={() => onSave(citation)} className="flex-1">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// =============================================================================
// Main Detail Page
// =============================================================================

export default function DataSourceDetailPage() {
  const routeParams = useParams<{ botId: string; workspaceId: string; dataSourceId: string }>();
  const router = useRouter();
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;
  const workspaceId = Array.isArray(routeParams.workspaceId) ? routeParams.workspaceId[0] : routeParams.workspaceId;
  const dataSourceId = Array.isArray(routeParams.dataSourceId) ? routeParams.dataSourceId[0] : routeParams.dataSourceId;

  const [editingCitation, setEditingCitation] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const deleteMutation = useDeleteKnowledge(botId);
  const addCitationMutation = useAddCitation(botId);
  const { guardEdit, isLiveMode } = useEditGuard();

  const backUrl = `/${workspaceId}/chatbot/${botId}/sources`;

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync({ chatbotId: botId, datasourceId: dataSourceId });
      toast.success('Data source deleted successfully');
      router.push(backUrl);
    } catch (error) {
      toast.error('Failed to delete data source');
      setShowDeleteConfirm(false);
    }
  };

  const handleSaveCitation = async (citation: string) => {
    if (!guardEdit(() => true)) return;
    try {
      await addCitationMutation.mutateAsync({
        chatbotId: botId,
        dataSourceId: dataSourceId,
        citation: citation.trim(),
      });
      toast.success('Citation updated successfully');
      setEditingCitation(false);
    } catch (error) {
      toast.error('Failed to update citation');
    }
  };

  return (
    <div className="h-[calc(100vh-48px)] flex flex-col bg-background overflow-hidden">
      <AsyncBoundary
        loadingFallback={
          <div className="flex items-center justify-center h-full">
            <div className="text-sm text-muted-foreground">Loading...</div>
          </div>
        }
      >
        <DataSourceDetailContent
          botId={botId}
          dataSourceId={dataSourceId}
          backUrl={backUrl}
          isLiveMode={isLiveMode}
          onEditCitation={() => {
            if (!guardEdit(() => true)) return;
            setEditingCitation(true);
          }}
          onDelete={() => {
            if (!guardEdit(() => true)) return;
            setShowDeleteConfirm(true);
          }}
          editingCitation={editingCitation}
          onSaveCitation={handleSaveCitation}
          onCloseCitationEditor={() => setEditingCitation(false)}
        />
      </AsyncBoundary>

      <AlertDialog open={showDeleteConfirm} onOpenChange={(open) => !open && setShowDeleteConfirm(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="type-section-title flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-destructive" />
              Delete Data Source
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this source? This action cannot be undone and will permanently remove all associated embeddings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => { e.preventDefault(); handleDelete(); }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// =============================================================================
// Suspense-wrapped detail content
// =============================================================================

function DataSourceDetailContent({
  botId,
  dataSourceId,
  backUrl,
  isLiveMode,
  onEditCitation,
  onDelete,
  editingCitation,
  onSaveCitation,
  onCloseCitationEditor,
}: {
  botId: string;
  dataSourceId: string;
  backUrl: string;
  isLiveMode: boolean;
  onEditCitation: () => void;
  onDelete: () => void;
  editingCitation: boolean;
  onSaveCitation: (citation: string) => void;
  onCloseCitationEditor: () => void;
}) {
  const router = useRouter();
  const { data: dataSources } = useSuspenseDataSources(botId);

  const dataSource = useMemo(
    () => dataSources?.find((ds) => ds.id === dataSourceId),
    [dataSources, dataSourceId]
  );

  if (!dataSource) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <AlertCircle className="w-8 h-8 text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground">Data source not found</p>
        <Button variant="ghost" className="mt-4" onClick={() => router.push(backUrl)}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to sources
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-full overflow-hidden">
      {/* ─── Main Content Area ─────────────────────────────────────────── */}
      <section className="flex-1 flex flex-col overflow-hidden min-w-0 bg-background">

        {/* Header */}
        <div className="px-6 pt-5 pb-0 lg:px-10 lg:pt-6 border-b border-border">
          <button
            onClick={() => router.push(backUrl)}
            className="flex items-center gap-0.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
          >
            <ChevronLeft className="size-4" />
            Back to sources
          </button>

          <div className="flex items-start justify-between pb-4 gap-4">
            <div className="min-w-0">
              <h1 className="text-xl font-semibold text-foreground leading-tight break-words">
                {dataSource.name}
              </h1>
              <Badge
                variant="outline"
                className={cn(
                  'mt-2 text-xs px-2 py-0.5 font-medium',
                  getStatusBadgeClass(dataSource.ingestionStatus, TRAINING_STATUS_BADGE_COLORS)
                )}
              >
                {dataSource.ingestionStatus ?? 'Draft'}
              </Badge>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
                >
                  <Ellipsis className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <FeatureGuard feature="datasources">
                  <DropdownMenuItem onClick={onEditCitation} disabled={isLiveMode}>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit citation
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={onDelete}
                    disabled={isLiveMode}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </FeatureGuard>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Outer tabs — mobile toggles Overview / Details */}
        <Tabs defaultValue="overview" className="flex flex-1 flex-col gap-0 overflow-hidden">
          {/* Mobile-only tab triggers */}
          <div className="px-6 pt-4 lg:hidden">
            <TabsList className="w-full">
              <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
              <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
            </TabsList>
          </div>

          {/* Overview — always visible on desktop */}
          <TabsContent value="overview" className="flex-1 flex flex-col mt-0 overflow-hidden">
            {/* Inner Content / Chunks tabs */}
            <Tabs defaultValue="content" className="flex-1 flex flex-col gap-0 overflow-hidden">
              {/* Pill-style tab triggers — matches app standard */}
              <div className="px-6 lg:px-10 pt-5">
                <TabsList className="bg-muted p-1 rounded-lg">
                  <TabsTrigger value="content" className={PILL_TAB_CLASS}>
                    Content
                  </TabsTrigger>
                  <TabsTrigger value="chunks" className={PILL_TAB_CLASS}>
                    Chunks
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="content" className="flex-1 overflow-y-auto mt-0">
                <div className="px-6 py-6 lg:px-10">
                  <div className="border border-border rounded-lg p-6">
                    <AsyncBoundary
                      loadingFallback={
                        <div className="flex items-center justify-center py-16">
                          <div className="text-sm text-muted-foreground">Loading content...</div>
                        </div>
                      }
                    >
                      <SourceContentTabBody dataSourceId={dataSourceId} />
                    </AsyncBoundary>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="chunks" className="flex-1 overflow-y-auto mt-0">
                <div className="px-6 py-6 lg:px-10">
                  <div className="border border-border rounded-lg p-6">
                    <AsyncBoundary
                      loadingFallback={
                        <div className="flex items-center justify-center py-16">
                          <div className="text-sm text-muted-foreground">Loading embeddings...</div>
                        </div>
                      }
                    >
                      <EmbeddingChunksContent dataSourceId={dataSourceId} />
                    </AsyncBoundary>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Details — mobile only (desktop uses the sidebar) */}
          <TabsContent value="details" className="flex-1 overflow-y-auto px-6 py-6 mt-0">
            <div className="flex flex-col gap-2">
              <h2 className="text-base font-semibold text-foreground">Details</h2>
              <AsyncBoundary loadingFallback={<DetailsSidebarRows dataSource={dataSource} />}>
                <DetailsSidebarRowsWithContent dataSource={dataSource} />
              </AsyncBoundary>
            </div>
          </TabsContent>
        </Tabs>

        {/* Mobile sticky bottom action bar */}
        <div className="sticky bottom-0 flex w-full gap-4 border-t bg-background p-5 lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-1 h-9">
                <Ellipsis className="size-4 text-muted-foreground" />
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <FeatureGuard feature="datasources">
                <DropdownMenuItem onClick={onEditCitation} disabled={isLiveMode}>
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit citation
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={onDelete}
                  disabled={isLiveMode}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </FeatureGuard>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      {/* ─── Desktop Details Sidebar ───────────────────────────────────── */}
      <aside className="hidden h-full w-72 flex-shrink-0 border-l border-border bg-background lg:flex flex-col">
        <div className="flex flex-col gap-2 p-6 overflow-y-auto flex-1">
          <h2 className="text-base font-semibold text-foreground">Details</h2>
          <AsyncBoundary loadingFallback={<DetailsSidebarRows dataSource={dataSource} />}>
            <DetailsSidebarRowsWithContent dataSource={dataSource} />
          </AsyncBoundary>
        </div>
      </aside>

      {editingCitation && (
        <EditCitationDialog
          dataSource={dataSource}
          onClose={onCloseCitationEditor}
          onSave={onSaveCitation}
        />
      )}
    </div>
  );
}
