'use client';

import { useState, useMemo, Suspense } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Description,
  Public,
  Message,
  FormatAlignLeft,
  Search,
  Delete,
  Edit,
  ContentCopy,
  Check,
  CalendarMonth,
  Storage,
  Warning,
  ReportProblem,
  Visibility,
  MoreVert,
  Add,
  Lock
} from '@mui/icons-material';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
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
import { UpgradeDialog } from "@/components/billingsdk/UpgradeDialog";
import {
  SourcesCategorySidebar,
  AddKnowledgeDialog,
  PendingSourcesPanel,
  type SourceCategory,
} from '@/components/chatbot/sources';
import { FeatureGuard } from '@/components/shared/FeatureGuard';

const DATA_SOURCE_ICONS = {
  URL: Public,
  WEBSITE: Public,
  DOCUMENT: Description,
  PDF: Description,
  QNA: Message,
  TXT: FormatAlignLeft,
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

const USAGE_STATUS_BADGE_COLORS = {
  DRAFT: 'bg-muted text-muted-foreground border-border',
  TRAINING: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  ACTIVE: 'bg-green-500/10 text-green-600 border-green-500/20',
  INACTIVE: 'bg-muted text-muted-foreground border-border',
} as const;

function getStatusBadgeClass(status: string | null | undefined, map: Record<string, string>) {
  if (!status) return map.DRAFT;
  const normalizedKey = status.toUpperCase();
  return map[normalizedKey] || map.DRAFT;
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
            <Check sx={{ fontSize: 12, color: "rgb(74 222 128)" }} />
          ) : (
            <ContentCopy sx={{ fontSize: 12 }} />
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

function ViewChunksDialog({ dataSource, onClose }: { dataSource: DataSourceItem; onClose: () => void }) {
  const Icon = DATA_SOURCE_ICONS[dataSource.type as keyof typeof DATA_SOURCE_ICONS] || Description;

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              <Icon sx={{ fontSize: 20, color: "var(--primary)" }} />
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
              <DialogTitle className="type-section-title truncate">{dataSource.name}</DialogTitle>
              {dataSource.citation && (
                <a
                  href={dataSource.citation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:text-primary/80 truncate block mt-1"
                >
                  {dataSource.citation}
                </a>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center gap-2 mb-4">
            <Storage sx={{ fontSize: 16, color: "var(--primary)" }} />
            <h4 className="type-micro-heading">
              Embedding Chunks
            </h4>
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

  if (!embeddings || embeddings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Warning sx={{ fontSize: 32, color: "var(--muted-foreground)", mb: 1.5 }} />
        <p className="text-sm text-muted-foreground">
          No embeddings found. They may still be processing.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-muted-foreground font-normal">({embeddings.length})</span>
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
  const Icon = DATA_SOURCE_ICONS[normalizedType] || Description;
  const badgeColor = DATA_SOURCE_BADGE_COLORS[normalizedType as keyof typeof DATA_SOURCE_BADGE_COLORS] || DATA_SOURCE_BADGE_COLORS.DOCUMENT;
  const colorClass = DATA_SOURCE_COLORS[normalizedType as keyof typeof DATA_SOURCE_COLORS] || DATA_SOURCE_COLORS.DOCUMENT;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative flex flex-col justify-between rounded-lg border border-border bg-card p-4 shadow-card transition-all hover:border-primary/20 shadow-card-hover"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-gradient-to-br',
            colorClass
          )}>
            <Icon sx={{ fontSize: 20 }} />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-foreground truncate" title={dataSource.name}>
              {dataSource.name}
            </h3>
            {dataSource.citation && (
              <p className="text-xs text-muted-foreground truncate" title={dataSource.citation}>
                {dataSource.citation}
              </p>
            )}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-muted-foreground hover:text-foreground">
              <MoreVert sx={{ fontSize: 16 }} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onViewChunks}>
              <Visibility sx={{ fontSize: 16, mr: 1 }} />
              View chunks
            </DropdownMenuItem>
            <FeatureGuard feature="datasources">
              <DropdownMenuItem
                onClick={onEditCitation}
                disabled={isLiveMode}
              >
                <Edit sx={{ fontSize: 16, mr: 1 }} />
                Edit citation
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onDelete}
                disabled={isLiveMode}
                className="text-destructive focus:text-destructive"
              >
                <Delete sx={{ fontSize: 16, mr: 1 }} />
                Delete
              </DropdownMenuItem>
            </FeatureGuard>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Footer / Status */}
      <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarMonth sx={{ fontSize: 14 }} />
          <span>{dataSource.createdAt ? new Date(dataSource.createdAt).toLocaleDateString() : 'N/A'}</span>
        </div>
        <div className="flex gap-2">
          <Badge
            variant="outline"
            className={cn(
              'text-[10px] px-1.5 py-0 h-5 font-medium',
              getStatusBadgeClass(dataSource.ingestionStatus, TRAINING_STATUS_BADGE_COLORS)
            )}
          >
            {dataSource.ingestionStatus ?? 'Draft'}
          </Badge>
          {/* Optional: Show Usage Status if different from Training? Usually Ingestion is key. */}
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
                icon={<Storage />}
                primaryAction={accessControl.datasources.canManage ? {
                  label: "Add Knowledge",
                  onClick: () => {},
                  icon: isLocked ? <Lock /> : <Add />,
                } : undefined}
                className="border-dashed bg-card/30"
              />
            )}
          </FeatureGuard>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
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

  const [selectedCategory, setSelectedCategory] = useState<SourceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingSource, setEditingSource] = useState<DataSourceItem | null>(null);
  const [viewingSource, setViewingSource] = useState<DataSourceItem | null>(null);
  const [sourceToDelete, setSourceToDelete] = useState<DataSourceItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

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

  return (
    <div className="h-[calc(100vh-48px)] flex bg-background overflow-hidden">
      {/* Left Sidebar - Categories (Fixed) - Note: sourceCounts comes from hook inside sidebar */}
      <div className="flex-shrink-0 h-full">
        <SourcesCategorySidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onAddKnowledge={() => setIsAddDialogOpen(true)}
          chatbotId={botId}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header (Fixed) */}
        <div className="flex-shrink-0 border-b border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    {/* Optimistically show 0 until data loads */}
                    <FeatureGuard feature="datasources" currentUsage={0}>
                      {({ isLocked }) => (
                        <Button
                          onClick={() => setIsAddDialogOpen(true)}
                          variant={!isLocked ? "default" : "outline"}
                          className={isLocked ? "border-amber-400 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20" : ""}
                        >
                          {isLocked ? <Lock sx={{ fontSize: 16, mr: 1 }} /> : <Add sx={{ fontSize: 16, mr: 1 }} />}
                          Add Knowledge
                        </Button>
                      )}
                    </FeatureGuard>
                  </span>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search sx={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "var(--muted-foreground)" }} />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or citation..."
              className="pl-9"
            />
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
              onSourceToDelete={handleDelete}
              onEditingSource={setEditingSource}
              onViewingSource={setViewingSource}
              isLiveMode={isLiveMode}
            />
          </AsyncBoundary>
        </div>
      </div>

      {/* Add Knowledge Dialog */}
      <AddKnowledgeDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        chatbotId={botId}
      />

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
              <ReportProblem sx={{ fontSize: 20, color: "var(--destructive)" }} />
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

      {/* Pending Sources Panel is now in the sidebar */}
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
