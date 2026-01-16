'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Bold, Italic, Strikethrough, List, ListOrdered, Link as LinkIcon, Smile, Info } from 'lucide-react';
import { toast } from 'sonner';
import { useDataSourcesStore } from '@/store/chatbot/data-sources';
import { SourcesSidebar } from '@/components/chatbot/SourcesSidebar';

export default function TextSourcePage() {
  const routeParams = useParams<{ botId: string }>();
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;
  
  if (!botId) {
    return null;
  }

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
  };

  const getByteSize = (str: string) => {
    return new Blob([str]).size;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          {/* Main Content */}
          <div className="space-y-6">
            <div className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-2xl font-heading font-semibold text-foreground">Text</h1>
                  <p className="text-muted-foreground mt-1">
                    Add plain text-based sources to train your AI Agent with precise information.
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Info className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Add text snippet</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-foreground">Title</Label>
                  <Input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Refund requests"
                    className="bg-background border-input text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="text-content" className="text-foreground">Content</Label>
                    <span className="text-xs text-muted-foreground">
                      {getByteSize(textContent)} B
                    </span>
                  </div>
                  
                  {/* Rich Text Toolbar */}
                  <div className="flex items-center gap-1 p-2 bg-muted/50 rounded-lg border border-border">
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
                    className="bg-background border-input text-foreground placeholder:text-muted-foreground resize-none"
                  />
                </div>

                <Button
                  onClick={handleAddText}
                  disabled={!textContent.trim() || !title.trim()}
                  className="bg-muted text-foreground hover:bg-muted/80"
                >
                  Add text snippet
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <SourcesSidebar chatbotId={botId} />
          </div>
        </div>
      </div>
    </div>
  );
}