'use client';

import { useState, useMemo } from 'react';
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
  ChevronRight,
  Copy,
  Check,
  Loader2,
  Filter,
  Calendar,
  Database,
  AlertCircle,
  Plus,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useDataSourcesQuery, useEmbeddingsQuery, useDeleteKnowledge, useAddCitation } from '@/services/datasource';
import { toast } from 'sonner';
import type { DataSourceItem, EmbeddingItem } from '@/types/datasource';
import { EmptyState } from '@/components/shared';
import { useEditGuard } from '@/store/branch';
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

const DATA_SOURCE_ICONS = {
  URL: Globe,
  DOCUMENT: FileText,
  QNA: MessageSquare,
  TXT: AlignLeft,
} as const;

const DATA_SOURCE_COLORS = {
  URL: 'from-primary/10 via-primary/5 to-transparent border-primary/20 text-primary',
  DOCUMENT: 'from-primary/10 via-primary/5 to-transparent border-primary/20 text-primary',
  QNA: 'from-primary/10 via-primary/5 to-transparent border-primary/20 text-primary',
  TXT: 'from-primary/10 via-primary/5 to-transparent border-primary/20 text-primary',
} as const;

const DATA_SOURCE_BADGE_COLORS = {
  URL: 'bg-primary/10 text-primary border-primary/20',
  DOCUMENT: 'bg-primary/10 text-primary border-primary/20',
  QNA: 'bg-primary/10 text-primary border-primary/20',
  TXT: 'bg-primary/10 text-primary border-primary/20',
} as const;

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
      className="group bg-muted/50 border border-border rounded-lg p-4 hover:border-primary/20 transition-all"
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

function DetailPanel({ dataSource }: { dataSource: DataSourceItem | null }) {
  const { data: embeddings, isLoading } = useEmbeddingsQuery(dataSource?.id || '');

  if (!dataSource) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mb-4">
          <ChevronRight className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">
          Select a data source to view its details
        </p>
      </div>
    );
  }

  const Icon = DATA_SOURCE_ICONS[dataSource.type as keyof typeof DATA_SOURCE_ICONS] || FileText;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge className={cn('text-xs', DATA_SOURCE_BADGE_COLORS[dataSource.type as keyof typeof DATA_SOURCE_BADGE_COLORS])}>
                {dataSource.type}
              </Badge>
              {dataSource.createdAt && (
                <span className="text-xs text-muted-foreground">
                  {new Date(dataSource.createdAt).toLocaleDateString()}
                </span>
              )}
            </div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-1 truncate">
              {dataSource.name}
            </h3>
            {dataSource.citation && (
              <a
                href={dataSource.citation}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:text-primary/80 truncate block"
              >
                {dataSource.citation}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Embeddings */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Database className="w-4 h-4 text-primary" />
            Embedding Chunks
            {embeddings && (
              <span className="text-muted-foreground font-normal">({embeddings.length})</span>
            )}
          </h4>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : !embeddings || embeddings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="w-8 h-8 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">
              No embeddings found. They may still be processing.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {embeddings.map((embedding, index) => (
              <EmbeddingChunk key={embedding.id} embedding={embedding} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DataSourceCard({
  dataSource,
  isSelected,
  onClick,
  onDelete,
  onEditCitation,
  isLiveMode
}: {
  dataSource: DataSourceItem;
  isSelected: boolean;
  onClick: () => void;
  onDelete: () => void;
  onEditCitation: () => void;
  isLiveMode: boolean;
}) {
  const Icon = DATA_SOURCE_ICONS[dataSource.type as keyof typeof DATA_SOURCE_ICONS] || FileText;
  const colors = DATA_SOURCE_COLORS[dataSource.type as keyof typeof DATA_SOURCE_COLORS];
  const badgeColor = DATA_SOURCE_BADGE_COLORS[dataSource.type as keyof typeof DATA_SOURCE_BADGE_COLORS];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className={cn(
        'group relative cursor-pointer rounded-xl border transition-all',
        isSelected
          ? 'bg-muted border-primary'
          : 'bg-card border-border hover:border-primary/20'
      )}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn('w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center flex-shrink-0 border', colors)}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge className={cn('text-xs', badgeColor)}>
                {dataSource.type}
              </Badge>
            </div>
            <h4 className="text-sm font-semibold text-foreground truncate mb-1">
              {dataSource.name}
            </h4>
            {dataSource.citation && (
              <p className="text-xs text-muted-foreground truncate">
                {dataSource.citation}
              </p>
            )}
            {dataSource.createdAt && (
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {new Date(dataSource.createdAt).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={cn(
          'flex items-center gap-1 mt-3 pt-3 border-t border-border',
          isLiveMode ? 'opacity-50' : 'opacity-0 group-hover:opacity-100',
          'transition-opacity'
        )}>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onEditCitation();
            }}
            disabled={isLiveMode}
            className="flex-1 h-7 text-xs disabled:cursor-not-allowed"
          >
            <Edit3 className="w-3 h-3 mr-1" />
            Edit Citation
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            disabled={isLiveMode}
            className="flex-1 h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </motion.div>
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
          <DialogTitle>Edit Citation</DialogTitle>
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

export default function DataSourcesPage() {
  const routeParams = useParams<{ botId: string }>();
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;

  const [selectedSource, setSelectedSource] = useState<DataSourceItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [editingSource, setEditingSource] = useState<DataSourceItem | null>(null);
  const [sourceToDelete, setSourceToDelete] = useState<DataSourceItem | null>(null);

  const { data: dataSources, isLoading } = useDataSourcesQuery(botId);
  const deleteMutation = useDeleteKnowledge(botId);
  const addCitationMutation = useAddCitation(botId);
  const { guardEdit, isLiveMode } = useEditGuard();

  // Filter and search
  const filteredSources = useMemo(() => {
    if (!dataSources) return [];

    return dataSources.filter((source) => {
      const matchesSearch = source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        source.citation?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === 'all' || source.type === filterType;
      return matchesSearch && matchesFilter;
    });
  }, [dataSources, searchQuery, filterType]);

  const confirmDelete = async () => {
    if (!sourceToDelete) return;

    try {
      await deleteMutation.mutateAsync({
        chatbotId: botId,
        datasourceId: sourceToDelete.id,
      });
      toast.success('Data source deleted successfully');
      if (selectedSource?.id === sourceToDelete.id) {
        setSelectedSource(null);
      }
      setSourceToDelete(null);
    } catch (error) {
      toast.error('Failed to delete data source');
      setSourceToDelete(null);
    }
  };

  const handleDelete = (dataSource: DataSourceItem) => {
    // Guard edit in LIVE mode
    if (!guardEdit(() => true)) return;
    setSourceToDelete(dataSource);
  };

  const handleSaveCitation = async (citation: string) => {
    if (!editingSource) return;

    // Guard edit in LIVE mode
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

  const handleEditCitation = (source: DataSourceItem) => {
    if (!guardEdit(() => true)) return;
    setEditingSource(source);
  };

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'URL', label: 'URLs' },
    { value: 'DOCUMENT', label: 'Documents' },
    { value: 'QNA', label: 'Q&A' },
    { value: 'TXT', label: 'Text' },
  ];

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="type-page-title mb-1">
                Knowledge Base
              </h1>
              <p className="type-body-muted">
                Manage your data sources and embeddings
              </p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or citation..."
                className="pl-9"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-muted border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
            >
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Data Sources List */}
        <div className="w-[400px] border-r border-border overflow-y-auto">
          <div className="p-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : filteredSources.length === 0 ? (
              dataSources?.length === 0 ? (
                <EmptyState
                  title="No data sources yet"
                  description="Add URLs, documents, Q&A pairs, or text to train your chatbot."
                  icon={<Database />}
                  primaryAction={{
                    label: "Add Data Source",
                    href: "./sources/productivity",
                    icon: <Plus />,
                  }}
                  className="border-dashed bg-card/30"
                />
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No data sources match your filters
                </div>
              )
            ) : (
              <div className="space-y-3">
                {filteredSources.map((source) => (
                  <DataSourceCard
                    key={source.id}
                    dataSource={source}
                    isSelected={selectedSource?.id === source.id}
                    onClick={() => setSelectedSource(source)}
                    onDelete={() => handleDelete(source)}
                    onEditCitation={() => handleEditCitation(source)}
                    isLiveMode={isLiveMode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Detail Panel */}
        <div className="flex-1 bg-background overflow-hidden">
          <DetailPanel dataSource={selectedSource} />
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
            <AlertDialogTitle className="flex items-center gap-2">
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

