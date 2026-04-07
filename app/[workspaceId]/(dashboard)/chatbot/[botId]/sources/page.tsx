'use client';

import { useState, useMemo, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  FileText,
  Globe,
  MessageSquare,
  AlignLeft,
  Search,
  Trash2,
  Edit3,
  Database,
  AlertTriangle,
  MoreVertical,
  Plus,
  Lock,
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
import { useSuspenseDataSources, useDeleteKnowledge, useAddCitation } from '@/services/datasource';
import { toast } from 'sonner';
import type { DataSourceItem } from '@/types/datasource';
import { EmptyState } from '@/components/shared';
import { useEditGuard } from '@/store/branch';
import { useAccessControl } from '@/hooks/useAccessControl';
import { AsyncBoundary } from '@/components/shared/AsyncBoundary';
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

const DATA_SOURCE_ICON_COLORS = {
  URL: 'text-green-600 bg-green-500/10',
  WEBSITE: 'text-green-600 bg-green-500/10',
  DOCUMENT: 'text-blue-600 bg-blue-500/10',
  PDF: 'text-blue-600 bg-blue-500/10',
  QNA: 'text-purple-600 bg-purple-500/10',
  TXT: 'text-orange-600 bg-orange-500/10',
} as const;

const DATA_SOURCE_BADGE_COLORS = {
  URL: 'bg-green-500/10 text-green-700 border-green-500/20',
  WEBSITE: 'bg-green-500/10 text-green-700 border-green-500/20',
  DOCUMENT: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
  PDF: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
  QNA: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
  TXT: 'bg-orange-500/10 text-orange-700 border-orange-500/20',
} as const;

const TRAINING_STATUS_BADGE_COLORS = {
  DRAFT: 'bg-muted text-muted-foreground border-border',
  QUEUEING: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
  PROCESSING: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
  COMPLETED: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
  FAILED: 'bg-destructive/10 text-destructive border-destructive/20',
} as const;

function getStatusBadgeClass(status: string | null | undefined, map: Record<string, string>) {
  if (!status) return map.DRAFT;
  return map[status.toUpperCase()] || map.DRAFT;
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

function DataSourceRow({
  dataSource,
  onDelete,
  onEditCitation,
  onViewChunks,
  isLiveMode,
}: {
  dataSource: DataSourceItem;
  onDelete: () => void;
  onEditCitation: () => void;
  onViewChunks: () => void;
  isLiveMode: boolean;
}) {
  const normalizedType = (dataSource.type || 'DOCUMENT').toUpperCase() as keyof typeof DATA_SOURCE_ICONS;
  const Icon = DATA_SOURCE_ICONS[normalizedType] || FileText;
  const iconColor = DATA_SOURCE_ICON_COLORS[normalizedType as keyof typeof DATA_SOURCE_ICON_COLORS] || DATA_SOURCE_ICON_COLORS.DOCUMENT;
  const badgeColor = DATA_SOURCE_BADGE_COLORS[normalizedType as keyof typeof DATA_SOURCE_BADGE_COLORS] || DATA_SOURCE_BADGE_COLORS.DOCUMENT;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onViewChunks}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onViewChunks();
        }
      }}
      className="group flex items-center gap-4 px-6 py-4 border-b border-border/50 hover:bg-muted/40 cursor-pointer transition-colors last:border-b-0"
    >
      {/* Icon */}
      <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg', iconColor)}>
        <Icon className="h-4 w-4" />
      </div>

      {/* Name + Citation */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors" title={dataSource.name}>
          {dataSource.name}
        </p>
        {dataSource.citation && (
          <p className="text-xs text-muted-foreground truncate mt-0.5" title={dataSource.citation}>
            {dataSource.citation}
          </p>
        )}
      </div>

      {/* Type */}
      <div className="w-24 shrink-0 hidden sm:flex justify-center">
        <Badge
          variant="outline"
          className={cn('text-[10px] px-2 py-0.5 h-5 font-semibold tracking-[0.04em]', badgeColor)}
        >
          {normalizedType}
        </Badge>
      </div>

      {/* Status */}
      <div className="w-28 shrink-0 hidden md:flex justify-center">
        <Badge
          variant="outline"
          className={cn(
            'text-[10px] px-2 py-0.5 h-5 font-semibold tracking-[0.04em]',
            getStatusBadgeClass(dataSource.ingestionStatus, TRAINING_STATUS_BADGE_COLORS)
          )}
        >
          {dataSource.ingestionStatus ?? 'Draft'}
        </Badge>
      </div>

      {/* Created date */}
      <div className="w-24 shrink-0 hidden lg:block text-xs text-muted-foreground">
        {dataSource.createdAt ? new Date(dataSource.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: '2-digit' }) : 'N/A'}
      </div>

      {/* Citation status */}
      <div className="w-28 shrink-0 hidden lg:block text-xs text-muted-foreground text-right">
        {dataSource.citation ? 'Citation attached' : 'No citation'}
      </div>

      {/* Actions */}
      <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-foreground transition-opacity"
            >
              <MoreVertical className="h-4 w-4" />
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

  const filteredSources = useMemo(() => {
    if (!dataSources) return [];
    return dataSources.filter((source) => {
      const matchesSearch =
        source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
          <div className="flex min-h-[240px] items-center justify-center text-sm text-muted-foreground">
            No sources match your search
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Table header */}
      <div className="flex items-center gap-4 px-6 py-2.5 border-b border-border/60">
        <div className="w-9 shrink-0" />
        <div className="flex-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Name</div>
        <div className="w-24 shrink-0 hidden sm:block text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground text-center">Type</div>
        <div className="w-28 shrink-0 hidden md:block text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground text-center">Status</div>
        <div className="w-24 shrink-0 hidden lg:block text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Created</div>
        <div className="w-28 shrink-0 hidden lg:block text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground text-right">Citation</div>
        <div className="w-8 shrink-0" />
      </div>

      {/* Rows */}
      {filteredSources.map((source) => (
        <DataSourceRow
          key={source.id}
          dataSource={source}
          onDelete={() => onSourceToDelete(source)}
          onEditCitation={() => onEditingSource(source)}
          onViewChunks={() => onViewingSource(source)}
          isLiveMode={isLiveMode}
        />
      ))}
    </div>
  );
}

// =============================================================================
// List Skeleton for Loading State
// =============================================================================

function DataSourceListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div>
      <div className="flex items-center gap-4 px-6 py-2.5 border-b border-border/60">
        <div className="w-9 shrink-0" />
        <div className="flex-1 h-3 w-12 bg-muted rounded animate-pulse" />
        <div className="w-24 shrink-0 hidden sm:block h-3 w-8 bg-muted rounded animate-pulse" />
        <div className="w-28 shrink-0 hidden md:block h-3 w-10 bg-muted rounded animate-pulse" />
        <div className="w-24 shrink-0 hidden lg:block h-3 w-12 bg-muted rounded animate-pulse" />
        <div className="w-28 shrink-0 hidden lg:block h-3 w-14 bg-muted rounded animate-pulse" />
        <div className="w-8 shrink-0" />
      </div>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-border/50">
          <div className="w-9 h-9 shrink-0 rounded-lg bg-muted animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-3.5 bg-muted rounded animate-pulse w-48" />
            <div className="h-3 bg-muted/60 rounded animate-pulse w-32" />
          </div>
          <div className="w-24 shrink-0 hidden sm:block h-5 w-12 bg-muted rounded-full animate-pulse" />
          <div className="w-28 shrink-0 hidden md:block h-5 w-16 bg-muted rounded-full animate-pulse" />
          <div className="w-24 shrink-0 hidden lg:block h-3 w-16 bg-muted rounded animate-pulse" />
          <div className="w-28 shrink-0 hidden lg:block h-3 w-20 bg-muted rounded animate-pulse" />
          <div className="w-8 shrink-0" />
        </div>
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

  const handleViewSource = (source: DataSourceItem) => {
    router.push(`/${workspaceId}/chatbot/${botId}/sources/${source.id}`);
  };

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
      {/* Left Sidebar */}
      <div className="flex-shrink-0 h-full">
        <SourcesCategorySidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onAddKnowledge={handleOpenAddKnowledge}
          chatbotId={botId}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-card">
        {/* Header */}
        <div className="flex-shrink-0 px-6 pt-6 pb-5 border-b border-border/60">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="type-page-title">{getCategoryTitle()}</h1>
              <p className="type-body-muted mt-1">
                <Suspense fallback="Loading...">
                  <DataSourceCount
                    botId={botId}
                    selectedCategory={selectedCategory}
                    searchQuery={searchQuery}
                  />
                </Suspense>
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="dashboard-search-shell min-w-[240px]">
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

        {/* List (Scrollable) */}
        <div className="flex-1 overflow-auto">
          <AsyncBoundary loadingFallback={<DataSourceListSkeleton count={8} />}>
            <DataSourcesContent
              botId={botId}
              workspaceId={workspaceId}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              onAddKnowledge={handleOpenAddKnowledge}
              onSourceToDelete={handleDelete}
              onEditingSource={setEditingSource}
              onViewingSource={handleViewSource}
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
// Helper component for source count in header
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
      const matchesSearch =
        source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        source.citation?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || source.type === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [dataSources, searchQuery, selectedCategory]);

  return <>{filteredSources.length} {filteredSources.length === 1 ? 'item' : 'items'}</>;
}
