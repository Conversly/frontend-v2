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
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useDataSourcesQuery, useEmbeddingsQuery, useDeleteKnowledge, useAddCitation } from '@/services/datasource';
import { toast } from 'sonner';
import type { DataSourceItem, EmbeddingItem } from '@/types/datasource';
import Link from 'next/link';

const DATA_SOURCE_ICONS = {
  URL: Globe,
  DOCUMENT: FileText,
  QNA: MessageSquare,
  TXT: AlignLeft,
} as const;

const DATA_SOURCE_COLORS = {
  URL: 'from-blue-500/10 via-blue-500/5 to-transparent border-blue-500/20 text-blue-400',
  DOCUMENT: 'from-purple-500/10 via-purple-500/5 to-transparent border-purple-500/20 text-purple-400',
  QNA: 'from-pink-500/10 via-pink-500/5 to-transparent border-pink-500/20 text-pink-400',
  TXT: 'from-green-500/10 via-green-500/5 to-transparent border-green-500/20 text-green-400',
} as const;

const DATA_SOURCE_BADGE_COLORS = {
  URL: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  DOCUMENT: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  QNA: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  TXT: 'bg-green-500/10 text-green-400 border-green-500/20',
} as const;

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 flex items-center justify-center mb-6">
        <Database className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-heading font-semibold text-white mb-2">
        No Data Sources Yet
      </h3>
      <p className="text-gray-400 mb-6 max-w-sm">
        Add your first data source to train your chatbot. Start with URLs, documents, Q&A pairs, or text content.
      </p>
      <Link href="./sources/productivity">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Data Source
        </Button>
      </Link>
    </div>
  );
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
      className="group bg-gray-900/40 border border-gray-800/60 rounded-lg p-4 hover:border-pink-500/20 transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="text-xs font-mono text-gray-500">Chunk #{index + 1}</span>
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
      <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
        {displayText}
        {shouldTruncate && !expanded && '...'}
      </p>
      {shouldTruncate && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-pink-400 hover:text-pink-300 mt-2 font-medium"
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
        <div className="w-16 h-16 rounded-xl bg-gray-800/50 flex items-center justify-center mb-4">
          <ChevronRight className="w-8 h-8 text-gray-600" />
        </div>
        <p className="text-gray-400">
          Select a data source to view its details
        </p>
      </div>
    );
  }

  const Icon = DATA_SOURCE_ICONS[dataSource.type as keyof typeof DATA_SOURCE_ICONS] || FileText;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-gray-800/60 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-pink-500" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge className={cn('text-xs', DATA_SOURCE_BADGE_COLORS[dataSource.type as keyof typeof DATA_SOURCE_BADGE_COLORS])}>
                {dataSource.type}
              </Badge>
              {dataSource.createdAt && (
                <span className="text-xs text-gray-500">
                  {new Date(dataSource.createdAt).toLocaleDateString()}
                </span>
              )}
            </div>
            <h3 className="text-lg font-heading font-semibold text-white mb-1 truncate">
              {dataSource.name}
            </h3>
            {dataSource.citation && (
              <a
                href={dataSource.citation}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:text-blue-300 truncate block"
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
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-pink-500" />
            Embedding Chunks
            {embeddings && (
              <span className="text-gray-500 font-normal">({embeddings.length})</span>
            )}
          </h4>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-pink-500" />
          </div>
        ) : !embeddings || embeddings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="w-8 h-8 text-gray-600 mb-3" />
            <p className="text-sm text-gray-400">
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
  onEditCitation
}: { 
  dataSource: DataSourceItem; 
  isSelected: boolean;
  onClick: () => void;
  onDelete: () => void;
  onEditCitation: () => void;
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
          ? 'bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent border-pink-500/40' 
          : 'bg-gray-900/40 border-gray-800/60 hover:border-pink-500/20'
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
            <h4 className="text-sm font-semibold text-white truncate mb-1">
              {dataSource.name}
            </h4>
            {dataSource.citation && (
              <p className="text-xs text-gray-500 truncate">
                {dataSource.citation}
              </p>
            )}
            {dataSource.createdAt && (
              <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                {new Date(dataSource.createdAt).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={cn(
          'flex items-center gap-1 mt-3 pt-3 border-t border-gray-800/60',
          'opacity-0 group-hover:opacity-100 transition-opacity'
        )}>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onEditCitation();
            }}
            className="flex-1 h-7 text-xs"
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
            className="flex-1 h-7 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10"
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-md w-full"
      >
        <h3 className="text-lg font-heading font-semibold text-white mb-4">
          Edit Citation
        </h3>
        <Input
          value={citation}
          onChange={(e) => setCitation(e.target.value)}
          placeholder="Enter citation URL..."
          className="mb-4"
        />
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={() => onSave(citation)}
            className="flex-1"
          >
            Save
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function DataSourcesPage() {
  const routeParams = useParams<{ botId: string }>();
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;

  const [selectedSource, setSelectedSource] = useState<DataSourceItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [editingSource, setEditingSource] = useState<DataSourceItem | null>(null);

  const { data: dataSources, isLoading } = useDataSourcesQuery(botId);
  const deleteMutation = useDeleteKnowledge(botId);
  const addCitationMutation = useAddCitation(botId);

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

  const handleDelete = async (dataSource: DataSourceItem) => {
    if (!confirm(`Delete "${dataSource.name}"? This will remove all associated embeddings.`)) {
      return;
    }

    try {
      await deleteMutation.mutateAsync({
        chatbotId: botId,
        datasourceId: dataSource.id,
      });
      toast.success('Data source deleted successfully');
      if (selectedSource?.id === dataSource.id) {
        setSelectedSource(null);
      }
    } catch (error) {
      toast.error('Failed to delete data source');
    }
  };

  const handleSaveCitation = async (citation: string) => {
    if (!editingSource) return;

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
      <div className="border-b border-gray-800/60 bg-gray-900/40 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-heading font-bold text-white mb-1">
                Knowledge Base
              </h1>
              <p className="text-sm text-gray-400">
                Manage your data sources and embeddings
              </p>
            </div>
            <Link href="./sources/productivity">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Source
              </Button>
            </Link>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
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
              className="px-4 py-2 bg-gray-900/60 border border-gray-800/60 rounded-lg text-sm text-white focus:outline-none focus:border-pink-500/40"
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
        <div className="w-[400px] border-r border-gray-800/60 overflow-y-auto">
          <div className="p-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-pink-500" />
              </div>
            ) : filteredSources.length === 0 ? (
              dataSources?.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="text-center py-12 text-gray-400">
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
                    onEditCitation={() => setEditingSource(source)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Detail Panel */}
        <div className="flex-1 bg-gray-900/20 overflow-hidden">
          <DetailPanel dataSource={selectedSource} />
        </div>
      </div>

      {/* Edit Citation Dialog */}
      <AnimatePresence>
        {editingSource && (
          <EditCitationDialog
            dataSource={editingSource}
            onClose={() => setEditingSource(null)}
            onSave={handleSaveCitation}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

