'use client';

import { useMemo, useState } from 'react';
import { Globe, FileText, MessageSquare, AlignLeft, X, Search, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePendingSources, useDataSourcesStore } from '@/store/chatbot/data-sources';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FileUploadContent } from './FileUploadContent';
import { WebsiteContent } from './WebsiteContent';
import { QAContent } from './QAContent';
import { TextContent } from './TextContent';
import type { AddKnowledgeSourceTab } from './AddKnowledgeSidebar';

interface AddKnowledgeCenterContentProps {
  chatbotId: string;
  activeTab: AddKnowledgeSourceTab;
}

const tabConfig = {
  files: {
    title: 'Files',
    description: 'Upload documents to train your AI. Extract text from PDFs, DOCX, and TXT files.',
    icon: FileText,
    sourcesLabel: 'File sources',
    filterFn: (s: any) => s.type === 'Document' && s.blobData,
  },
  website: {
    title: 'Website',
    description: 'Crawl web pages or submit sitemaps to update your AI with the latest content.',
    icon: Globe,
    sourcesLabel: 'Link sources',
    filterFn: (s: any) => s.type === 'Website',
  },
  qa: {
    title: 'Q&A',
    description: 'Predefined answers for key topics. Your Agent checks this data first.',
    icon: MessageSquare,
    sourcesLabel: 'Q&A sources',
    filterFn: (s: any) => s.type === 'QandA',
  },
  text: {
    title: 'Text',
    description: 'Add plain text content directly to train your AI chatbot.',
    icon: AlignLeft,
    sourcesLabel: 'Text sources',
    filterFn: (s: any) => s.type === 'Document' && !s.blobData && typeof s.content === 'string',
  },
};

const getSourceIcon = (type: string) => {
  switch (type) {
    case 'Website': return Globe;
    case 'Document': return FileText;
    case 'QandA': return MessageSquare;
    default: return FileText;
  }
};

export function AddKnowledgeCenterContent({ chatbotId, activeTab }: AddKnowledgeCenterContentProps) {
  const pendingSources = usePendingSources();
  const { removePendingSource } = useDataSourcesStore();
  const [searchQuery, setSearchQuery] = useState('');

  const config = tabConfig[activeTab];

  const filteredPending = useMemo(() => {
    const typeFiltered = pendingSources.filter(config.filterFn);
    if (!searchQuery.trim()) return typeFiltered;
    return typeFiltered.filter(s =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [pendingSources, activeTab, searchQuery, config.filterFn]);

  const allPendingOfType = useMemo(() => {
    return pendingSources.filter(config.filterFn);
  }, [pendingSources, activeTab, config.filterFn]);

  const renderForm = () => {
    switch (activeTab) {
      case 'files':
        return <FileUploadContent />;
      case 'website':
        return <WebsiteContent chatbotId={chatbotId} />;
      case 'qa':
        return <QAContent />;
      case 'text':
        return <TextContent />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-8 py-10 lg:px-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="type-page-title text-2xl">{config.title}</h1>
          <p className="type-body-muted mt-2 text-base">{config.description}</p>
        </div>

        {/* Form Section */}
        <div className="mb-10">
          {renderForm()}
        </div>

        {/* Pending Sources List */}
        {allPendingOfType.length > 0 && (
          <div className="border-t border-border pt-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-foreground">
                {config.sourcesLabel}
              </h3>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="pl-10 h-10"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                {filteredPending.length} {filteredPending.length === 1 ? 'item' : 'items'}
              </p>
              <span className="text-sm text-muted-foreground">
                Sort by: Default
              </span>
            </div>

            <div className="space-y-2.5">
              <AnimatePresence mode="popLayout">
                {filteredPending.map((source) => {
                  const Icon = getSourceIcon(source.type);
                  return (
                    <motion.div
                      layout
                      key={source.id}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card shadow-card hover:bg-muted/30 transition-colors group"
                    >
                      <Icon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">{source.name}</p>
                        {source.citation && (
                          <p className="text-xs text-muted-foreground truncate mt-0.5">{source.citation}</p>
                        )}
                      </div>
                      <span className="text-[10px] font-medium text-green-600 bg-green-500/10 border border-green-500/20 rounded px-2 py-0.5">
                        New
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removePendingSource(source.id)}
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
