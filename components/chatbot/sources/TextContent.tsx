'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Bold, Italic, Strikethrough, List, ListOrdered, Link as LinkIcon, Smile } from 'lucide-react';
import { toast } from 'sonner';
import { useDataSourcesStore } from '@/store/chatbot/data-sources';

interface TextContentProps {
  onSuccess?: () => void;
}

export function TextContent({ onSuccess }: TextContentProps) {
  const [textContent, setTextContent] = useState('');
  const [title, setTitle] = useState('');
  const { addPendingSource } = useDataSourcesStore();

  const handleAddText = () => {
    if (!textContent.trim()) {
      toast.error('Please enter some text content');
      return;
    }

    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    addPendingSource({
      type: 'Document',
      name: title.trim(),
      content: textContent.trim(),
    });

    toast.success('Text source added successfully');
    setTextContent('');
    setTitle('');
    onSuccess?.();
  };

  const getByteSize = (str: string) => {
    return new Blob([str]).size;
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title" className="type-micro-heading">Title</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Company policies"
          className="border-input text-foreground"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="text-content" className="type-micro-heading">Content</Label>
          <span className="type-caption">
            {getByteSize(textContent)} B
          </span>
        </div>

        {/* Rich Text Toolbar */}
        <div className="flex items-center gap-1 p-2 bg-[--surface-secondary] rounded-lg border border-border">
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
            <Bold className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
            <Italic className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
            <Strikethrough className="w-4 h-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
            <List className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
            <ListOrdered className="w-4 h-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
            <LinkIcon className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
            <Smile className="w-4 h-4" />
          </Button>
        </div>

        <Textarea
          id="text-content"
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          placeholder="Enter your text"
          rows={12}
          className="border-input text-foreground placeholder:text-muted-foreground resize-none"
        />
      </div>

      <Button
        onClick={handleAddText}
        disabled={!textContent.trim() || !title.trim()}
        className="bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Add text snippet
      </Button>
    </div>
  );
}
