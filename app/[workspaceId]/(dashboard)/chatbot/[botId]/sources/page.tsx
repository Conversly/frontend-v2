'use client';

import { useState, useMemo, Suspense } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Globe,
  MessageSquare,
  AlignLeft,
  Search,
  Trash2,
  Edit3,
  Copy,
  Check,
  Calendar,
  Database,
  AlertCircle,
  AlertTriangle,
  MoreVertical,
  Plus,
  Lock,
  Sparkles,
  Tag,
  HelpCircle,
  ChevronsUpDown,
  Link2,
  ListTree,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSuspenseDataSources, useSuspenseEmbeddings, useDeleteKnowledge, useAddCitation } from '@/services/datasource';
import { toast } from 'sonner';
import type { DataSourceItem, EmbeddingItem } from '@/types/datasource';
import { EmptyState } from '@/components/shared';
import { useEditGuard } from '@/store/branch';
import { useAccessControl } from '@/hooks/useAccessControl';
import { AsyncBoundary } from '@/components/shared/AsyncBoundary';
import { DataSourceCardSkeleton } from '@/components/skeletons';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SourcesCategorySidebar,
  type SourceCategory,
} from '@/components/chatbot/sources';
import { AddKnowledgeView } from '@/components/chatbot/sources/AddKnowledgeView';
import type { AddKnowledgeSourceTab } from '@/components/chatbot/sources/AddKnowledgeSidebar';
import { FeatureGuard } from '@/components/shared/FeatureGuard';

const DATA_SOURCE_ICONS = {
  URL: Globe,
  WEBSITE: Globe,
  DOCUMENT: FileText,
  PDF: FileText,
  QNA: MessageSquare,
  TXT: AlignLeft,
} as const;

const DATA_SOURCE_COLORS = {
  URL: 'from-green-500/10 via-green-500/5 to-transparent border-green-500/20 text-green-600',
  WEBSITE: 'from-green-500/10 via-green-500/5 to-transparent border-green-500/20 text-green-600',
  DOCUMENT: 'from-blue-500/10 via-blue-500/5 to-transparent border-blue-500/20 text-blue-600',
  PDF: 'from-blue-500/10 via-blue-500/5 to-transparent border-blue-500/20 text-blue-600',
  QNA: 'from-purple-500/10 via-purple-500/5 to-transparent border-purple-500/20 text-purple-600',
  TXT: 'from-orange-500/10 via-orange-500/5 to-transparent border-orange-500/20 text-orange-600',
} as const;

const DATA_SOURCE_BADGE_COLORS = {
  URL: 'bg-green-500/10 text-green-600 border-green-500/20',
  WEBSITE: 'bg-green-500/10 text-green-600 border-green-500/20',
  DOCUMENT: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  PDF: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  QNA: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  TXT: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
} as const;

const TRAINING_STATUS_BADGE_COLORS = {
  DRAFT: 'bg-muted text-muted-foreground border-border',
  QUEUEING: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  PROCESSING: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  COMPLETED: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  FAILED: 'bg-destructive/10 text-destructive border-destructive/20',
} as const;

function getStatusBadgeClass(status: string | null | undefined, map: Record<string, string>) {
  if (!status) return map.DRAFT;
  const normalizedKey = status.toUpperCase();
  return map[normalizedKey] || map.DRAFT;
}

function formatChunkType(chunkType?: string) {
  if (!chunkType) return 'Chunk';
  return chunkType.charAt(0).toUpperCase() + chunkType.slice(1);
}

function parseChunkText(text: string) {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const bulletLines = lines
    .filter((line) => /^[-*]\s+/.test(line))
    .map((line) => line.replace(/^[-*]\s+/, '').trim());

  const isPureBulletList = lines.length > 1 && bulletLines.length === lines.length;

  if (isPureBulletList) {
    return {
      mode: 'list' as const,
      items: bulletLines,
      paragraphs: [],
    };
  }

  const paragraphs = text
    .split('\n\n')
    .map((block) => block.replace(/\n/g, ' ').trim())
    .filter(Boolean);

  return {
    mode: 'paragraphs' as const,
    items: bulletLines,
    paragraphs: paragraphs.length > 0 ? paragraphs : [text.trim()],
  };
}

function getFormattedSourceDetails(value?: string | null) {
  if (!value) return null;

  try {
    const parsed = new URL(value);
    const path = parsed.pathname === '/' ? '' : parsed.pathname;

    return {
      hostname: parsed.hostname.replace(/^www\./, ''),
      path,
      full: parsed.toString(),
    };
  } catch {
    return {
      hostname: value,
      path: '',
      full: value,
    };
  }
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

  const parsedContent = useMemo(() => parseChunkText(embedding.text), [embedding.text]);
  const items = parsedContent.items;
  const hasExpandableList = items.length > 5;
  const visibleItems = expanded ? items : items.slice(0, 5);
  const visibleParagraphs = expanded ? parsedContent.paragraphs : parsedContent.paragraphs.slice(0, 2);
  const shouldTruncateParagraphs = parsedContent.mode === 'paragraphs' && parsedContent.paragraphs.length > 2;
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
  const showExpandButton = hasExpandableList || shouldTruncateParagraphs;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
      className="group rounded-2xl border border-border/70 bg-card/90 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-card"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-primary/15 bg-primary/5 text-primary">
              {sectionTitle}
            </Badge>
            <Badge variant="outline" className="border-border bg-background text-muted-foreground">
              {formatChunkType(embedding.chunkType)}
            </Badge>
            <span className="text-xs font-medium text-muted-foreground">
              Chunk {position}{totalChunks ? ` of ${totalChunks}` : ''}
            </span>
          </div>

          {embedding.summary && (
            <div className="flex items-start gap-2 rounded-xl border border-primary/10 bg-primary/[0.04] px-3 py-2.5">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p className="text-sm leading-6 text-foreground/90">{embedding.summary}</p>
            </div>
          )}

          {headingContext.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <ListTree className="h-3.5 w-3.5" />
              {headingContext.map((heading) => (
                <span key={heading} className="rounded-full bg-muted px-2.5 py-1">
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
            <Check className="w-3.5 h-3.5 text-green-500" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </Button>
      </div>

      <div className="mt-4 rounded-xl border border-border/70 bg-[--surface-secondary]/60 p-4">
        {parsedContent.mode === 'list' ? (
          <ul className="space-y-2.5">
            {visibleItems.map((item, itemIndex) => (
              <li key={`${embedding.id}-item-${itemIndex}`} className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="space-y-3">
            {visibleParagraphs.map((paragraph, paragraphIndex) => (
              <p key={`${embedding.id}-paragraph-${paragraphIndex}`} className="text-sm leading-6 text-foreground/90">
                {paragraph}
              </p>
            ))}
            {items.length > 0 && (
              <div className="space-y-2 pt-1">
                {visibleItems.map((item, itemIndex) => (
                  <div key={`${embedding.id}-subitem-${itemIndex}`} className="flex items-start gap-3 text-sm leading-6 text-foreground/85">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {showExpandButton && (
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
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
              <Tag className="h-3.5 w-3.5" />
              Keywords
            </div>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword) => (
                <span
                  key={`${embedding.id}-${keyword}`}
                  className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-foreground/75"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {hasQuestions && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
              <HelpCircle className="h-3.5 w-3.5" />
              Suggested prompts
            </div>
            <div className="flex flex-wrap gap-2">
              {questions.map((question, questionIndex) => (
                <span
                  key={`${embedding.id}-question-${questionIndex}`}
                  className="rounded-full border border-primary/15 bg-primary/[0.04] px-2.5 py-1 text-xs text-foreground/80"
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

function ViewChunksDialog({ dataSource, onClose }: { dataSource: DataSourceItem; onClose: () => void }) {
  const Icon = DATA_SOURCE_ICONS[dataSource.type as keyof typeof DATA_SOURCE_ICONS] || FileText;
  const sourceDetails = getFormattedSourceDetails(dataSource.citation || dataSource.name);
  const titleText = sourceDetails?.hostname || dataSource.name;
  const subtitleText = sourceDetails?.path || (!sourceDetails ? dataSource.citation : '');

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[86vh] flex flex-col overflow-hidden p-0">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge
                  variant="outline"
                  className={cn('text-2xs font-medium', DATA_SOURCE_BADGE_COLORS[dataSource.type as keyof typeof DATA_SOURCE_BADGE_COLORS])}
                >
                  {dataSource.type}
                </Badge>
                {dataSource.createdAt && (
                  <span className="text-xs text-muted-foreground">
                    {new Date(dataSource.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
              <DialogTitle className="text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] text-foreground">
                {titleText}
              </DialogTitle>
              {subtitleText && (
                <p className="mt-1 text-sm text-muted-foreground break-all">
                  {subtitleText}
                </p>
              )}
              {sourceDetails && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    <Link2 className="h-3.5 w-3.5" />
                    Source URL
                  </div>
                  <a
                    href={sourceDetails.full}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex max-w-full items-center gap-2 rounded-full bg-primary/[0.06] px-3 py-1.5 text-sm text-primary transition-colors hover:bg-primary/[0.1]"
                  >
                    <span className="truncate max-w-[42rem] font-mono text-[12px] leading-none">
                      {sourceDetails.full}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.06),transparent_32%),linear-gradient(180deg,rgba(248,250,252,0.7),rgba(255,255,255,0))] p-6">
          <div className="mb-5 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/10 bg-primary/[0.04]">
              <Database className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="type-micro-heading">
                Embedding Chunks
              </h4>
              <p className="text-sm text-muted-foreground">
                Structured view of how this source was chunked for retrieval.
              </p>
            </div>
          </div>

          <AsyncBoundary loadingFallback={
            <div className="flex items-center justify-center py-12">
              <div className="text-sm text-muted-foreground">Loading embeddings...</div>
            </div>
          }>
            <EmbeddingChunksContent dataSourceId={dataSource.id} />
          </AsyncBoundary>
        </div>
      </DialogContent>
    </Dialog>
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
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="w-8 h-8 text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground">
          No embeddings found. They may still be processing.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-border/70 bg-card/90 p-4">
          <div className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">Total chunks</div>
          <div className="mt-2 text-2xl font-semibold text-foreground">{embeddings.length}</div>
        </div>
        <div className="rounded-2xl border border-border/70 bg-card/90 p-4">
          <div className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">Sections</div>
          <div className="mt-2 text-2xl font-semibold text-foreground">{groupedEmbeddings.length}</div>
        </div>
        <div className="rounded-2xl border border-border/70 bg-card/90 p-4">
          <div className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">View style</div>
          <div className="mt-2 text-sm leading-6 text-muted-foreground">
            Summaries, chunk type, keywords, prompts, and readable chunk bodies.
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {groupedEmbeddings.map(([sectionName, sectionEmbeddings]) => (
          <section key={sectionName} className="rounded-[28px] border border-border/60 bg-background/50 p-4 md:p-5">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-border/50 pb-4">
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Section</div>
                <h5 className="mt-1 text-lg font-semibold text-foreground">{sectionName}</h5>
              </div>
              <Badge variant="outline" className="border-primary/15 bg-primary/[0.04] text-primary">
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

function EditCitationDialog({
  dataSource,
  onClose,
  onSave
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

function DataSourceCard({
  dataSource,
  onDelete,
  onEditCitation,
  onViewChunks,
  isLiveMode
}: {
  dataSource: DataSourceItem;
  onDelete: () => void;
  onEditCitation: () => void;
  onViewChunks: () => void;
  isLiveMode: boolean;
}) {
  const normalizedType = (dataSource.type || 'DOCUMENT').toUpperCase() as keyof typeof DATA_SOURCE_ICONS;
  const Icon = DATA_SOURCE_ICONS[normalizedType] || FileText;
  const badgeColor = DATA_SOURCE_BADGE_COLORS[normalizedType as keyof typeof DATA_SOURCE_BADGE_COLORS] || DATA_SOURCE_BADGE_COLORS.DOCUMENT;
  const colorClass = DATA_SOURCE_COLORS[normalizedType as keyof typeof DATA_SOURCE_COLORS] || DATA_SOURCE_COLORS.DOCUMENT;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      role="button"
      tabIndex={0}
      onClick={onViewChunks}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onViewChunks();
        }
      }}
      className="group relative flex cursor-pointer flex-col justify-between rounded-[var(--panel-radius-md)] border border-[var(--panel-border-soft)] bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border bg-card shadow-xs',
            normalizedType === 'URL' || normalizedType === 'DOCUMENT' ? 'border-border/70' : 'border-border/60'
          )}>
            <Icon className={cn('h-5 w-5', colorClass.split(" ").at(-1))} />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-foreground truncate" title={dataSource.name}>
              {dataSource.name}
            </h3>
            {dataSource.citation && (
              <p className="text-xs text-muted-foreground truncate transition-colors group-hover:text-primary/80" title={dataSource.citation}>
                {dataSource.citation}
              </p>
            )}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 -mr-2 text-muted-foreground hover:text-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            <FeatureGuard feature="datasources">
              <DropdownMenuItem
                onClick={onEditCitation}
                disabled={isLiveMode}
              >
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

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge
          variant="outline"
          className={cn(
            'text-[10px] px-2 py-0.5 h-6 font-semibold tracking-[0.04em]',
            badgeColor
          )}
        >
          {normalizedType}
        </Badge>
        <Badge
          variant="outline"
          className={cn(
            'text-[10px] px-2 py-0.5 h-6 font-semibold tracking-[0.04em]',
            getStatusBadgeClass(dataSource.ingestionStatus, TRAINING_STATUS_BADGE_COLORS)
          )}
        >
          {dataSource.ingestionStatus ?? 'Draft'}
        </Badge>
      </div>

      {/* Footer / Status */}
      <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>{dataSource.createdAt ? new Date(dataSource.createdAt).toLocaleDateString() : 'N/A'}</span>
        </div>
        <div className="text-[11px] font-medium text-muted-foreground">
          {dataSource.citation ? "Citation attached" : "No citation"}
        </div>
      </div>
    </motion.div>
  );
}

// =============================================================================
// Dynamic Content Component - Uses Suspense
// =============================================================================

interface DataSourcesContentProps {
  botId: string;
  workspaceId: string;
  selectedCategory: SourceCategory;
  searchQuery: string;
  onAddKnowledge: () => void;
  onSourceToDelete: (source: DataSourceItem) => void;
  onEditingSource: (source: DataSourceItem) => void;
  onViewingSource: (source: DataSourceItem) => void;
  isLiveMode: boolean;
}

function DataSourcesContent({
  botId,
  workspaceId,
  selectedCategory,
  searchQuery,
  onAddKnowledge,
  onSourceToDelete,
  onEditingSource,
  onViewingSource,
  isLiveMode,
}: DataSourcesContentProps) {
  const { data: dataSources } = useSuspenseDataSources(botId);
  const accessControl = useAccessControl(workspaceId);

  // Calculate source counts by type
  const sourceCounts = useMemo(() => {
    if (!dataSources) return { all: 0, URL: 0, DOCUMENT: 0, QNA: 0, TXT: 0 };

    return {
      all: dataSources.length,
      URL: dataSources.filter(s => s.type === 'URL').length,
      DOCUMENT: dataSources.filter(s => s.type === 'DOCUMENT').length,
      QNA: dataSources.filter(s => s.type === 'QNA').length,
      TXT: dataSources.filter(s => s.type === 'TXT').length,
    };
  }, [dataSources]);

  // Filter sources by category and search
  const filteredSources = useMemo(() => {
    if (!dataSources) return [];

    return dataSources.filter((source) => {
      const matchesSearch = source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        source.citation?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || source.type === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [dataSources, searchQuery, selectedCategory]);

  if (filteredSources.length === 0) {
    return (
      <div className="p-6">
        {dataSources?.length === 0 ? (
          <FeatureGuard feature="datasources" currentUsage={dataSources?.length ?? 0}>
            {({ isLocked }) => (
              <EmptyState
                title="No knowledge sources yet"
                description="Add websites, documents, Q&A pairs, or text to train your AI chatbot."
                icon={<Database />}
                primaryAction={accessControl.datasources.canManage ? {
                  label: "Add Knowledge",
                  onClick: onAddKnowledge,
                  icon: isLocked ? <Lock /> : <Plus />,
                } : undefined}
                className="border-dashed bg-card/30"
              />
            )}
          </FeatureGuard>
        ) : (
          <div className="dashboard-panel flex min-h-[240px] items-center justify-center text-center text-muted-foreground">
            No sources match your search
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 pb-20">
      <AnimatePresence mode="popLayout">
        {filteredSources.map((source) => (
          <DataSourceCard
            key={source.id}
            dataSource={source}
            onDelete={() => onSourceToDelete(source)}
            onEditCitation={() => onEditingSource(source)}
            onViewChunks={() => onViewingSource(source)}
            isLiveMode={isLiveMode}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// =============================================================================
// Grid Skeleton for Loading State
// =============================================================================

function DataSourceGridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 pb-20">
      {Array.from({ length: count }).map((_, i) => (
        <DataSourceCardSkeleton key={i} />
      ))}
    </div>
  );
}

// =============================================================================
// Main Page Component
// =============================================================================

export default function DataSourcesPage() {
  const routeParams = useParams<{ botId: string; workspaceId: string }>();
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;
  const workspaceId = Array.isArray(routeParams.workspaceId) ? routeParams.workspaceId[0] : routeParams.workspaceId;

  const [viewMode, setViewMode] = useState<'browse' | 'add-knowledge'>('browse');
  const [activeSourceTab, setActiveSourceTab] = useState<AddKnowledgeSourceTab>('files');
  const [selectedCategory, setSelectedCategory] = useState<SourceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingSource, setEditingSource] = useState<DataSourceItem | null>(null);
  const [viewingSource, setViewingSource] = useState<DataSourceItem | null>(null);
  const [sourceToDelete, setSourceToDelete] = useState<DataSourceItem | null>(null);

  const deleteMutation = useDeleteKnowledge(botId);
  const addCitationMutation = useAddCitation(botId);
  const { guardEdit, isLiveMode } = useEditGuard();

  const confirmDelete = async () => {
    if (!sourceToDelete) return;

    try {
      await deleteMutation.mutateAsync({
        chatbotId: botId,
        datasourceId: sourceToDelete.id,
      });
      toast.success('Data source deleted successfully');
      setSourceToDelete(null);
    } catch (error) {
      toast.error('Failed to delete data source');
      setSourceToDelete(null);
    }
  };

  const handleDelete = (dataSource: DataSourceItem) => {
    if (!guardEdit(() => true)) return;
    setSourceToDelete(dataSource);
  };

  const handleSaveCitation = async (citation: string) => {
    if (!editingSource) return;
    if (!guardEdit(() => true)) return;

    try {
      await addCitationMutation.mutateAsync({
        chatbotId: botId,
        dataSourceId: editingSource.id,
        citation: citation.trim(),
      });
      toast.success('Citation updated successfully');
      setEditingSource(null);
    } catch (error) {
      toast.error('Failed to update citation');
    }
  };

  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'URL': return 'Websites';
      case 'DOCUMENT': return 'Documents';
      case 'QNA': return 'Q&A';
      case 'TXT': return 'Text';
      default: return 'All Sources';
    }
  };

  const handleOpenAddKnowledge = () => {
    setViewMode('add-knowledge');
    setActiveSourceTab('files');
  };

  const handleBackToBrowse = () => {
    setViewMode('browse');
  };

  if (viewMode === 'add-knowledge') {
    return (
      <AddKnowledgeView
        chatbotId={botId}
        activeTab={activeSourceTab}
        onTabChange={setActiveSourceTab}
        onBack={handleBackToBrowse}
      />
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] flex bg-background overflow-hidden rounded-[var(--panel-radius-lg)] border border-[var(--panel-border-soft)] shadow-sm">
      {/* Left Sidebar - Categories (Fixed) - Note: sourceCounts comes from hook inside sidebar */}
      <div className="flex-shrink-0 h-full">
        <SourcesCategorySidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onAddKnowledge={handleOpenAddKnowledge}
          chatbotId={botId}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[var(--surface-secondary)]">
        {/* Header (Fixed) */}
        <div className="flex-shrink-0 border-b border-border/60 bg-card p-6">
          <div className="dashboard-toolbar">
            <div>
              <h1 className="type-page-title">
                {getCategoryTitle()}
              </h1>
              <p className="type-body-muted mt-1">
                {/* Show loading state for count */}
                <Suspense fallback="Loading...">
                  <DataSourceCount
                    botId={botId}
                    selectedCategory={selectedCategory}
                    searchQuery={searchQuery}
                  />
                </Suspense>
              </p>
            </div>
            <div className="dashboard-toolbar__group">
              <div className="dashboard-search-shell min-w-[280px] max-w-md">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or citation..."
                  className="border-0 bg-transparent pl-2 shadow-none focus-visible:ring-0"
                />
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <FeatureGuard feature="datasources" currentUsage={0}>
                        {({ isLocked }) => (
                          <Button
                            onClick={handleOpenAddKnowledge}
                            variant={!isLocked ? "default" : "outline"}
                            className={isLocked ? "border-[var(--status-warning-border)] bg-[var(--status-warning-bg)] text-[var(--status-warning-fg)]" : ""}
                          >
                            {isLocked ? <Lock className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                            Add Knowledge
                          </Button>
                        )}
                      </FeatureGuard>
                    </span>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Table (Scrollable) - Wrapped in AsyncBoundary for streaming */}
        <div className="flex-1 overflow-auto">
          <AsyncBoundary
            loadingFallback={<DataSourceGridSkeleton count={9} />}
          >
            <DataSourcesContent
              botId={botId}
              workspaceId={workspaceId}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              onAddKnowledge={handleOpenAddKnowledge}
              onSourceToDelete={handleDelete}
              onEditingSource={setEditingSource}
              onViewingSource={setViewingSource}
              isLiveMode={isLiveMode}
            />
          </AsyncBoundary>
        </div>
      </div>

      {/* View Chunks Dialog */}
      {viewingSource && (
        <ViewChunksDialog
          dataSource={viewingSource}
          onClose={() => setViewingSource(null)}
        />
      )}

      {/* Edit Citation Dialog */}
      {editingSource && (
        <EditCitationDialog
          dataSource={editingSource}
          onClose={() => setEditingSource(null)}
          onSave={handleSaveCitation}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!sourceToDelete} onOpenChange={(open) => !open && setSourceToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="type-section-title flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Delete Data Source
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{sourceToDelete?.name}"? This action cannot be undone and will permanently remove all associated embeddings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                confirmDelete();
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
// Helper component for rendering source count in header
// =============================================================================

function DataSourceCount({
  botId,
  selectedCategory,
  searchQuery,
}: {
  botId: string;
  selectedCategory: SourceCategory;
  searchQuery: string;
}) {
  const { data: dataSources } = useSuspenseDataSources(botId);

  const filteredSources = useMemo(() => {
    if (!dataSources) return [];
    return dataSources.filter((source) => {
      const matchesSearch = source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        source.citation?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || source.type === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [dataSources, searchQuery, selectedCategory]);

  return (
    <>{filteredSources.length} {filteredSources.length === 1 ? 'item' : 'items'}</>
  );
}
