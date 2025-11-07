'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText } from 'lucide-react';
import { toast } from 'sonner';
import { useDataSourcesStore } from '@/store/chatbot/data-sources';
import { PendingSources } from '@/components/chatbot/data-sources';

export default function TextSourcePage() {
  const params = useParams();
  const botId = params.botId as string;
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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6">
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">Text Source</h1>
          <p className="text-muted-foreground">
            Add custom text content to train your chatbot
          </p>
        </div>

        <div className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-foreground">Title</Label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title for this text source"
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="text-content" className="text-foreground">Text Content</Label>
              <Textarea
                id="text-content"
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Enter your text content here..."
                rows={10}
                className="bg-background border-input text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <Button
              onClick={handleAddText}
              disabled={!textContent.trim() || !title.trim()}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 rounded-xl"
            >
              <FileText className="w-4 h-4 mr-2" />
              Add Text Source
            </Button>
          </div>
        </div>

        <PendingSources chatbotId={botId} />
      </div>
    </div>
  );
}
