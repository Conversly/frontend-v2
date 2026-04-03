'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Globe,
  MessageSquare,
  AlignLeft,
  ChevronLeft,
  Copy,
  Check,
  Database,
  AlertCircle,
  Ellipsis,
  Trash2,
  Edit3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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

// =============================================================================
// Content Viewer Components
// =============================================================================

function WebContentView({ content }: { content: WebContent }) {
  return (
    <div className="space-y-5">
      {(content.title || content.url) && (
        <div className="pb-4 border-b border-border">
          {content.title && (
            <h3 className="text-base font-semibold text-foreground">{content.title}</h3>
          )}
          {content.url && (
            <a
              href={content.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:text-primary/80 break-all mt-1 block"
            >
              {content.url}
            </a>
          )}
        </div>
      )}
      <div className="text-sm text-foreground/80 leading-relaxed space-y-5">
        {content.sections?.map((section, i) => (
          <div key={i}>
            {section.heading && (
              <h4 className="text-sm font-semibold text-foreground mb-1.5">{section.heading}</h4>
            )}
            <p className="whitespace-pre-wrap">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FileContentView({ content }: { content: FileContent }) {
  return (
    <div className="text-sm text-foreground/80 leading-relaxed">
      {content.pages?.map((page, i) => (
        <div key={page.page}>
          <p className="whitespace-pre-wrap">{page.content}</p>
          {i < (content.pages?.length ?? 0) - 1 && (
            <p className="text-muted-foreground text-xs font-medium my-5">--- Page {page.page + 1} ---</p>
          )}
        </div>
      ))}
    </div>
  );
}

function QAContentView({ content }: { content: QASourceContent }) {
  return (
    <div className="space-y-5">
      <div>
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Question</span>
        <p className="text-sm text-foreground leading-relaxed mt-1.5">{content.question}</p>
      </div>
      <div className="border-t border-border pt-5">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Answer</span>
        <p className="text-sm text-foreground/80 leading-relaxed mt-1.5 whitespace-pre-wrap">{content.answer}</p>
      </div>
    </div>
  );
}

function TextContentView({ content }: { content: TextSourceContent }) {
  return (
    <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">{content.content}</p>
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
        <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
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
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <AlertCircle className="w-8 h-8 text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground">
          Content preview not available for this source.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Switch to the Chunks tab to view the raw data.
        </p>
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

  const shouldTruncate = embedding.text.length > 200;
  const displayText = expanded ? embedding.text : embedding.text.slice(0, 200);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
      className="group bg-[--surface-secondary] border border-border rounded-lg p-4 hover:border-primary/20 transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="text-xs font-mono text-muted-foreground">Chunk #{index + 1}</span>
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? (
            <Check className="w-3 h-3 text-green-400" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
        </Button>
      </div>
      <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
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
    </motion.div>
  );
}

function EmbeddingChunksContent({ dataSourceId }: { dataSourceId: string }) {
  const { data: embeddings } = useSuspenseEmbeddings(dataSourceId);

  if (!embeddings || embeddings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <AlertCircle className="w-8 h-8 text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground">
          No embeddings found. They may still be processing.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-muted-foreground font-normal text-sm">{embeddings.length} chunks</span>
      </div>
      <div className="space-y-3">
        <AnimatePresence>
          {embeddings.map((embedding, index) => (
            <EmbeddingChunk key={embedding.id} embedding={embedding} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}

// =============================================================================
// Details Sidebar Rows
// =============================================================================

function DetailsSidebarRows({ dataSource, wordCount }: { dataSource: DataSourceItem; wordCount?: number }) {
  const formatDate = (date: string | Date | null) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: '2-digit',
    }) + ', ' + d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between text-sm">
        <p className="text-muted-foreground">Created:</p>
        <p className="font-medium text-foreground">{formatDate(dataSource.createdAt)}</p>
      </div>
      <div className="flex flex-row justify-between text-sm">
        <p className="text-muted-foreground">Last updated:</p>
        <p className="font-medium text-foreground">{formatDate(dataSource.createdAt)}</p>
      </div>
      {wordCount != null && wordCount > 0 && (
        <div className="flex flex-row justify-between text-sm">
          <p className="text-muted-foreground">Words:</p>
          <p className="font-medium text-foreground">{wordCount.toLocaleString()}</p>
        </div>
      )}
      <div className="flex flex-row justify-between text-sm">
        <p className="text-muted-foreground">Type:</p>
        <p className="font-medium text-foreground capitalize">{(dataSource.type || 'Document').toLowerCase()}</p>
      </div>
      <div className="flex flex-row justify-between text-sm">
        <p className="text-muted-foreground">Status:</p>
        <p className="font-medium text-foreground capitalize">{(dataSource.ingestionStatus || 'Draft').toLowerCase()}</p>
      </div>
      {dataSource.citation && (
        <div className="flex flex-row justify-between gap-4 text-sm">
          <p className="text-muted-foreground shrink-0">Citation:</p>
          <a
            href={dataSource.citation}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:text-primary/80 break-all text-right"
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
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={() => onSave(citation)} className="flex-1">
            Save
          </Button>
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
      await deleteMutation.mutateAsync({
        chatbotId: botId,
        datasourceId: dataSourceId,
      });
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

      {/* Delete Confirmation Dialog */}
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
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
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
      <section className="flex-1 flex flex-col overflow-y-auto min-w-0">
        {/* Header */}
        <div className="flex w-full flex-col items-start gap-1 px-5 pt-6 pb-4 lg:px-8 lg:pt-8 border-b border-border">
          <button
            onClick={() => router.push(backUrl)}
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="size-5" />
            Back to sources
          </button>

          <h4 className="font-semibold text-2xl w-full mt-1">
            <div className="flex justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 break-all">
                {dataSource.name}
                <Badge
                  variant="outline"
                  className={cn(
                    'shrink-0 text-xs px-2 py-0.5 font-medium',
                    getStatusBadgeClass(dataSource.ingestionStatus, TRAINING_STATUS_BADGE_COLORS)
                  )}
                >
                  <span className="truncate text-center">
                    {dataSource.ingestionStatus ?? 'Draft'}
                  </span>
                </Badge>
              </div>

              {/* Desktop actions */}
              <div className="hidden items-center gap-3 lg:flex">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
                      <Ellipsis className="size-5 text-muted-foreground" />
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
          </h4>
        </div>

        {/* Outer tabs — mobile switches between Overview / Details */}
        <Tabs defaultValue="overview" className="flex flex-1 flex-col gap-0">
          {/* Mobile-only tab triggers */}
          <div className="px-5 pt-4 lg:hidden">
            <TabsList className="w-full">
              <TabsTrigger value="overview" className="flex-1">
                Overview
              </TabsTrigger>
              <TabsTrigger value="details" className="flex-1">
                Details
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview — always visible on desktop */}
          <TabsContent value="overview" className="flex-1 flex flex-col mt-0">
            {/* Inner Content / Chunks tabs */}
            <Tabs defaultValue="content" className="flex-1 flex flex-col gap-0">
              <div className="px-5 lg:px-8 pt-4 lg:pt-5">
                <TabsList>
                  <TabsTrigger value="content">
                    Content
                  </TabsTrigger>
                  <TabsTrigger value="chunks">
                    Chunks
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="content" className="flex-1 px-5 py-6 lg:px-8 lg:pb-8 mt-0">
                <Card className="overflow-auto break-words">
                  <CardContent className="p-6">
                    <div className="w-full max-w-none text-sm">
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
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="chunks" className="flex-1 px-5 py-6 lg:px-8 lg:pb-8 mt-0">
                <div className="flex items-center gap-2 mb-4">
                  <Database className="w-4 h-4 text-muted-foreground" />
                  <h4 className="text-sm font-medium text-muted-foreground">Embedding Chunks</h4>
                </div>
                <AsyncBoundary
                  loadingFallback={
                    <div className="flex items-center justify-center py-16">
                      <div className="text-sm text-muted-foreground">Loading embeddings...</div>
                    </div>
                  }
                >
                  <EmbeddingChunksContent dataSourceId={dataSourceId} />
                </AsyncBoundary>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Details — mobile only (desktop uses the sidebar) */}
          <TabsContent value="details" className="flex-1 px-5 py-6 mt-0">
            <div className="flex flex-col gap-6">
              <h2 className="font-semibold text-lg tracking-tight">Details</h2>
              <AsyncBoundary loadingFallback={<DetailsSidebarRows dataSource={dataSource} />}>
                <DetailsSidebarRowsWithContent dataSource={dataSource} />
              </AsyncBoundary>
            </div>
          </TabsContent>
        </Tabs>

        {/* Mobile sticky bottom action bar */}
        <div className="sticky bottom-0 flex w-full justify-between gap-4 border-t bg-card p-5 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-1 h-9">
                <span>Actions</span>
                <Ellipsis className="size-5 text-muted-foreground hidden lg:block" />
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
      <aside className="hidden h-full w-[35%] flex-shrink-0 bg-muted lg:flex">
        <Separator orientation="vertical" />
        <div className="flex flex-1 flex-col gap-6 p-8 overflow-y-auto">
          <h2 className="font-semibold text-lg tracking-tight">Details</h2>
          <AsyncBoundary loadingFallback={<DetailsSidebarRows dataSource={dataSource} />}>
            <DetailsSidebarRowsWithContent dataSource={dataSource} />
          </AsyncBoundary>
        </div>
      </aside>

      {/* Edit Citation Dialog */}
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
