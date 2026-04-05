'use client';

import { useState, useMemo, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Globe,
  MessageSquare,
  AlignLeft,
  Search,
  Trash2,
  Edit3,
  Calendar,
  Database,
  AlertTriangle,
  MoreVertical,
  Plus,
  Lock
} from 'lucide-react';
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
import { useSuspenseDataSources, useDeleteKnowledge, useAddCitation } from '@/services/datasource';
import { toast } from 'sonner';
import type { DataSourceItem } from '@/types/datasource';
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
      className="group relative flex flex-col justify-between rounded-[var(--panel-radius-md)] border border-[var(--panel-border-soft)] bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
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
              <p className="text-xs text-muted-foreground truncate" title={dataSource.citation}>
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
  onNavigateToSource: (source: DataSourceItem) => void;
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
  onNavigateToSource,
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
            onViewChunks={() => onNavigateToSource(source)}
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

  const router = useRouter();

  const [viewMode, setViewMode] = useState<'browse' | 'add-knowledge'>('browse');
  const [activeSourceTab, setActiveSourceTab] = useState<AddKnowledgeSourceTab>('files');
  const [selectedCategory, setSelectedCategory] = useState<SourceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingSource, setEditingSource] = useState<DataSourceItem | null>(null);
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
              onNavigateToSource={(source) => router.push(`/${workspaceId}/chatbot/${botId}/sources/${source.id}`)}
              isLiveMode={isLiveMode}
            />
          </AsyncBoundary>
        </div>
      </div>

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
