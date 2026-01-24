'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Globe, 
  FileText, 
  MessageSquare, 
  AlignLeft,
  ArrowLeft,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FileUploadContent } from './FileUploadContent';
import { WebsiteContent } from './WebsiteContent';
import { QAContent } from './QAContent';
import { TextContent } from './TextContent';

type SourceType = 'files' | 'website' | 'qa' | 'text' | null;

interface AddKnowledgeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chatbotId: string;
}

const sourceOptions = [
  {
    id: 'files' as const,
    label: 'Files',
    description: 'Upload PDFs, Word docs, and text files',
    icon: FileText,
    color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  },
  {
    id: 'website' as const,
    label: 'Website',
    description: 'Crawl web pages or add individual URLs',
    icon: Globe,
    color: 'bg-green-500/10 text-green-500 border-green-500/20',
  },
  {
    id: 'qa' as const,
    label: 'Q&A',
    description: 'Add question and answer pairs',
    icon: MessageSquare,
    color: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  },
  {
    id: 'text' as const,
    label: 'Text',
    description: 'Add plain text content directly',
    icon: AlignLeft,
    color: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  },
];

export function AddKnowledgeDialog({ open, onOpenChange, chatbotId }: AddKnowledgeDialogProps) {
  const [selectedSource, setSelectedSource] = useState<SourceType>(null);

  const handleClose = () => {
    setSelectedSource(null);
    onOpenChange(false);
  };

  const handleBack = () => {
    setSelectedSource(null);
  };

  const getDialogTitle = () => {
    if (!selectedSource) return 'Add Knowledge';
    const option = sourceOptions.find(o => o.id === selectedSource);
    return `Add ${option?.label}`;
  };

  const renderContent = () => {
    switch (selectedSource) {
      case 'files':
        return <FileUploadContent />;
      case 'website':
        return <WebsiteContent chatbotId={chatbotId} />;
      case 'qa':
        return <QAContent />;
      case 'text':
        return <TextContent />;
      default:
        return (
          <div className="grid grid-cols-2 gap-4">
            {sourceOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedSource(option.id)}
                  className={cn(
                    'flex flex-col items-start gap-3 p-5 rounded-xl border-2 transition-all',
                    'hover:border-primary hover:bg-primary/5',
                    'border-border bg-card'
                  )}
                >
                  <div className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center border',
                    option.color
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground">{option.label}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {option.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent 
        className={cn(
          'p-0 gap-0',
          selectedSource ? 'max-w-4xl w-[90vw]' : 'max-w-2xl'
        )}
        showCloseButton={false}
      >
        <DialogHeader className="p-6 pb-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-3">
            {selectedSource && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="h-8 w-8"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <DialogTitle className="flex-1">{getDialogTitle()}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className={cn(
          "p-6 overflow-y-auto",
          selectedSource ? "min-h-[50vh] max-h-[75vh]" : "max-h-[70vh]"
        )}>
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
