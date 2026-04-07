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
  AlertCircle,
  Ellipsis,
  Trash2,
  Edit3,
  Sparkles,
  Tag,
  HelpCircle,
  ChevronsUpDown,
  Link2,
  ListTree,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MarkdownRenderer } from '@/components/shared/markdown-renderer';
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
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { FeatureGuard } from '@/components/shared/FeatureGuard';

// =============================================================================
// Constants
// =============================================================================

const DATA_SOURCE_META = {
  URL: { icon: Globe, label: 'URL' },
  WEBSITE: { icon: Globe, label: 'Website' },
  DOCUMENT: { icon: FileText, label: 'Document' },
  PDF: { icon: FileText, label: 'PDF' },
  QNA: { icon: MessageSquare, label: 'Q&A' },
  TXT: { icon: AlignLeft, label: 'Text' },
} as const;

const STATUS_CHIP_CLASSES = {
  DRAFT: 'dashboard-status-chip dashboard-status-chip--neutral',
  QUEUEING: 'dashboard-status-chip dashboard-status-chip--warning',
  PROCESSING: 'dashboard-status-chip dashboard-status-chip--info',
  COMPLETED: 'dashboard-status-chip dashboard-status-chip--success',
  FAILED: 'dashboard-status-chip dashboard-status-chip--danger',
} as const;

function formatLabel(value: string | null | undefined, fallback: string) {
  const normalized = value?.trim();

  if (!normalized) return fallback;

  return normalized
    .toLowerCase()
    .split(/[_\s]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getStatusChipClass(status: string | null | undefined) {
  if (!status) return STATUS_CHIP_CLASSES.DRAFT;
  return STATUS_CHIP_CLASSES[status.toUpperCase() as keyof typeof STATUS_CHIP_CLASSES] || STATUS_CHIP_CLASSES.DRAFT;
}

function getSourceTypeMeta(type: string | null | undefined) {
  const normalized = type?.toUpperCase() as keyof typeof DATA_SOURCE_META | undefined;
  return normalized ? DATA_SOURCE_META[normalized] || DATA_SOURCE_META.DOCUMENT : DATA_SOURCE_META.DOCUMENT;
}

// =============================================================================
// Content Viewer Components
// =============================================================================

function WebContentView({ content }: { content: WebContent }) {
  return (
    <div className="space-y-6">
      {(content.title || content.url) && (
        <div className="pb-5 border-b border-border">
          {content.title && (
            <h3 className="type-card-title leading-snug">{content.title}</h3>
          )}
          {content.url && (
            <a
              href={content.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 block break-all text-sm text-primary hover:text-primary/80"
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
              <h4 className="type-heading-small mb-2">{section.heading}</h4>
            )}
            <p className="type-body whitespace-pre-wrap leading-7">{section.content}</p>
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
          <p className="type-body whitespace-pre-wrap leading-7">{page.content}</p>
          {i < (content.pages?.length ?? 0) - 1 && (
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 border-t border-border" />
              <span className="type-caption">Page {page.page + 1}</span>
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
        <p className="type-caption mb-2">Question</p>
        <p className="type-body leading-7">{content.question}</p>
      </div>
      <div className="border-t border-border pt-6">
        <p className="type-caption mb-2">Answer</p>
        <p className="type-body whitespace-pre-wrap leading-7">{content.answer}</p>
      </div>
    </div>
  );
}

function TextContentView({ content }: { content: TextSourceContent }) {
  return <p className="type-body whitespace-pre-wrap leading-7">{content.content}</p>;
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
        <p className="type-body whitespace-pre-wrap leading-7">
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

function formatChunkType(chunkType?: string) {
  if (!chunkType) return 'Chunk';
  return chunkType.charAt(0).toUpperCase() + chunkType.slice(1);
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

  const sectionTitle = embedding.sectionPath || embedding.metadata?.sectionPath || 'General';
  const position = typeof embedding.chunkIndex === 'number'
    ? embedding.chunkIndex + 1
    : index + 1;
  const totalChunks = embedding.totalChunks || embedding.metadata?.totalChunks;
  const headingContext = embedding.metadata?.headingContext?.filter(Boolean) ?? [];
  const keywords = embedding.keywords?.filter(Boolean) ?? [];
  const questions = embedding.questions?.filter(Boolean) ?? [];
  const hasQuestions = questions.length > 0;
  const hasKeywords = keywords.length > 0;
  const sourceLink = embedding.citation || embedding.metadata?.source || embedding.metadata?.url;
  const shouldTruncate = embedding.text.length > 500;
  const displayText = expanded ? embedding.text : embedding.text.slice(0, 500);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
      className="dashboard-panel group rounded-[var(--panel-radius-md)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="info">
              {sectionTitle}
            </Badge>
            <Badge variant="neutral">
              {formatChunkType(embedding.chunkType)}
            </Badge>
            <span className="type-label">
              Chunk {position}{totalChunks ? ` of ${totalChunks}` : ''}
            </span>
          </div>

          {embedding.summary && (
            <div className="flex items-start gap-2 rounded-[var(--panel-radius-sm)] border border-[var(--status-info-border)] bg-[var(--status-info-bg)] px-3 py-2.5">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p className="type-body leading-6">{embedding.summary}</p>
            </div>
          )}

          {headingContext.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <ListTree className="h-3.5 w-3.5" />
              {headingContext.map((heading) => (
                <span
                  key={heading}
                  className="rounded-full border border-[var(--border-secondary)] bg-[var(--surface-secondary)] px-2.5 py-1"
                >
                  {heading}
                </span>
              ))}
            </div>
          )}
        </div>

        <Button
          size="icon-sm"
          variant="ghost"
          onClick={handleCopy}
          className="shrink-0 text-muted-foreground hover:text-foreground"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-[var(--status-success-fg)]" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>

      <div className="dashboard-panel-muted mt-4 rounded-[var(--panel-radius-sm)] p-4">
        <div className="type-body leading-6">
          <MarkdownRenderer>
            {shouldTruncate && !expanded ? displayText + '...' : displayText}
          </MarkdownRenderer>
        </div>

        {shouldTruncate && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-primary/80"
          >
            <ChevronsUpDown className="h-3.5 w-3.5" />
            {expanded ? 'Collapse details' : 'Expand full chunk'}
          </button>
        )}
      </div>

      <div className="mt-4 space-y-3">
        {hasKeywords && (
          <div className="space-y-2">
            <div className="type-caption flex items-center gap-2">
              <Tag className="h-3.5 w-3.5" />
              Keywords
            </div>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword) => (
                <span
                  key={`${embedding.id}-${keyword}`}
                  className="rounded-full border border-[var(--border-secondary)] bg-background px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {hasQuestions && (
          <div className="space-y-2">
            <div className="type-caption flex items-center gap-2">
              <HelpCircle className="h-3.5 w-3.5" />
              Suggested prompts
            </div>
            <div className="flex flex-wrap gap-2">
              {questions.map((question, questionIndex) => (
                <span
                  key={`${embedding.id}-question-${questionIndex}`}
                  className="rounded-full border border-[var(--status-info-border)] bg-[var(--status-info-bg)] px-2.5 py-1 text-xs text-[var(--status-info-fg)]"
                >
                  {question}
                </span>
              ))}
            </div>
          </div>
        )}

        {sourceLink && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link2 className="h-3.5 w-3.5" />
            <span className="truncate">{sourceLink}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function EmbeddingChunksContent({ dataSourceId }: { dataSourceId: string }) {
  const { data: embeddings } = useSuspenseEmbeddings(dataSourceId);

  const groupedEmbeddings = useMemo(() => {
    if (!embeddings) return [];

    const groups = embeddings.reduce((map, embedding) => {
      const key = embedding.sectionPath || embedding.metadata?.sectionPath || 'General';
      const existing = map.get(key) ?? [];
      existing.push(embedding);
      map.set(key, existing);
      return map;
    }, new Map<string, EmbeddingItem[]>());

    return Array.from(groups.entries());
  }, [embeddings]);

  if (!embeddings || embeddings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertCircle className="w-7 h-7 text-muted-foreground/40 mb-3" />
        <p className="text-sm text-muted-foreground">No embeddings found. They may still be processing.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 grid gap-3 md:grid-cols-3">
        <Card className="dashboard-kpi-card">
          <CardContent className="pt-5">
            <div className="type-caption">Total chunks</div>
            <div className="mt-2 text-2xl font-semibold text-foreground">{embeddings.length}</div>
          </CardContent>
        </Card>
        <Card className="dashboard-kpi-card">
          <CardContent className="pt-5">
            <div className="type-caption">Sections</div>
            <div className="mt-2 text-2xl font-semibold text-foreground">{groupedEmbeddings.length}</div>
          </CardContent>
        </Card>
        <Card className="dashboard-kpi-card">
          <CardContent className="pt-5">
            <div className="type-caption">View style</div>
            <div className="mt-2 text-sm leading-6 text-muted-foreground">
              Summaries, chunk type, keywords, prompts, and readable chunk bodies.
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {groupedEmbeddings.map(([sectionName, sectionEmbeddings]) => (
          <section key={sectionName} className="dashboard-panel-muted rounded-[var(--panel-radius-md)] p-5">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-[var(--border-secondary)] pb-4">
              <div>
                <div className="type-caption">Section</div>
                <h5 className="mt-1 type-card-title">{sectionName}</h5>
              </div>
              <Badge variant="info">
                {sectionEmbeddings.length} {sectionEmbeddings.length === 1 ? 'chunk' : 'chunks'}
              </Badge>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {sectionEmbeddings.map((embedding, index) => (
                  <EmbeddingChunk key={embedding.id} embedding={embedding} index={index} />
                ))}
              </AnimatePresence>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

// =============================================================================
// Details Sidebar Rows
// =============================================================================

function DetailsSidebarRows({ dataSource, wordCount }: { dataSource: DataSourceItem; wordCount?: number }) {
  const typeMeta = getSourceTypeMeta(dataSource.type);

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
    <div className="divide-y divide-[var(--border-secondary)]">
      <div className="flex items-start justify-between gap-4 px-5 py-4">
        <span className="type-label">Created</span>
        <span className="text-right text-sm font-medium text-foreground">{formatDate(dataSource.createdAt)}</span>
      </div>
      <div className="flex items-start justify-between gap-4 px-5 py-4">
        <span className="type-label">Last updated</span>
        <span className="text-right text-sm font-medium text-foreground">{formatDate(dataSource.createdAt)}</span>
      </div>
      {wordCount != null && wordCount > 0 && (
        <div className="flex items-start justify-between gap-4 px-5 py-4">
          <span className="type-label">Words</span>
          <span className="text-right text-sm font-medium text-foreground">{wordCount.toLocaleString()}</span>
        </div>
      )}
      <div className="flex items-start justify-between gap-4 px-5 py-4">
        <span className="type-label">Type</span>
        <span className="dashboard-status-chip dashboard-status-chip--neutral">{typeMeta.label}</span>
      </div>
      <div className="flex items-start justify-between gap-4 px-5 py-4">
        <span className="type-label">Status</span>
        <span className={getStatusChipClass(dataSource.ingestionStatus)}>
          {formatLabel(dataSource.ingestionStatus, 'Draft')}
        </span>
      </div>
      {dataSource.citation && (
        <div className="flex items-start justify-between gap-4 px-5 py-4">
          <span className="type-label shrink-0">Citation</span>
          <a
            href={dataSource.citation}
            target="_blank"
            rel="noopener noreferrer"
            className="text-right text-sm font-medium text-primary hover:text-primary/80 break-all"
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
  const typeMeta = getSourceTypeMeta(dataSource?.type);
  const TypeIcon = typeMeta.icon;

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
        <div className="border-b border-[var(--border-secondary)] bg-background px-6 py-5 lg:px-8 lg:py-6">
          <button
            onClick={() => router.push(backUrl)}
            className="mb-3 flex items-center gap-0.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
            Back to sources
          </button>

          <div className="page-header mb-0 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className={getStatusChipClass(dataSource.ingestionStatus)}>
                  {formatLabel(dataSource.ingestionStatus, 'Draft')}
                </span>
                <span className="dashboard-status-chip dashboard-status-chip--neutral">
                  <TypeIcon className="size-3" />
                  {typeMeta.label}
                </span>
              </div>
              <h1 className="type-page-title break-words">{dataSource.name}</h1>
              <p className="type-body-muted max-w-3xl">
                Review the source metadata, preview the extracted content, and inspect the stored chunks.
              </p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-1 h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
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
            <TabsList variant="segmented" className="w-full">
              <TabsTrigger value="overview" variant="segmented" className="flex-1 justify-center data-[state=active]:text-primary">
                Overview
              </TabsTrigger>
              <TabsTrigger value="details" variant="segmented" className="flex-1 justify-center data-[state=active]:text-primary">
                Details
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview — always visible on desktop */}
          <TabsContent value="overview" className="flex-1 flex flex-col mt-0 overflow-hidden">
            {/* Inner Content / Chunks tabs */}
            <Tabs defaultValue="content" className="flex-1 flex flex-col gap-0 overflow-hidden">
              <div className="px-6 pt-5 lg:px-8">
                <TabsList variant="segmented" className="w-full sm:w-auto">
                  <TabsTrigger
                    value="content"
                    variant="segmented"
                    className="flex-1 justify-center data-[state=active]:text-primary sm:flex-none"
                  >
                    Content
                  </TabsTrigger>
                  <TabsTrigger
                    value="chunks"
                    variant="segmented"
                    className="flex-1 justify-center data-[state=active]:text-primary sm:flex-none"
                  >
                    Chunks
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="content" className="flex-1 overflow-y-auto mt-0">
                <div className="px-6 py-6 lg:px-8">
                  <Card className="overflow-hidden">
                    <CardContent className="px-5 py-5">
                      <AsyncBoundary
                        loadingFallback={
                          <div className="flex items-center justify-center py-16">
                            <div className="text-sm text-muted-foreground">Loading content...</div>
                          </div>
                        }
                      >
                        <SourceContentTabBody dataSourceId={dataSourceId} />
                      </AsyncBoundary>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="chunks" className="flex-1 overflow-y-auto mt-0">
                <div className="px-6 py-6 lg:px-8">
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
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Details — mobile only (desktop uses the sidebar) */}
          <TabsContent value="details" className="flex-1 overflow-y-auto px-6 py-6 mt-0">
            <div className="space-y-4">
              <div>
                <h2 className="type-card-title">Details</h2>
                <p className="type-body-muted mt-1">Source metadata and citation settings.</p>
              </div>
              <div className="dashboard-panel overflow-hidden">
                <AsyncBoundary loadingFallback={<DetailsSidebarRows dataSource={dataSource} />}>
                  <DetailsSidebarRowsWithContent dataSource={dataSource} />
                </AsyncBoundary>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Mobile sticky bottom action bar */}
        <div className="sticky bottom-0 flex w-full gap-4 border-t border-[var(--border-secondary)] bg-background p-5 shadow-[var(--shadow-reverse)] lg:hidden">
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
      <aside className="hidden h-full w-80 flex-shrink-0 border-l border-sidebar-border bg-sidebar lg:flex lg:flex-col">
        <div className="flex flex-1 flex-col overflow-y-auto p-6">
          <div className="mb-4">
            <h2 className="type-card-title">Details</h2>
            <p className="type-body-muted mt-1">Source metadata and citation settings.</p>
          </div>
          <div className="dashboard-panel overflow-hidden">
            <AsyncBoundary loadingFallback={<DetailsSidebarRows dataSource={dataSource} />}>
              <DetailsSidebarRowsWithContent dataSource={dataSource} />
            </AsyncBoundary>
          </div>
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
