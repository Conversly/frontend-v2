'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Plus, Info, ChevronUp, Bold, Italic, Strikethrough, List, ListOrdered, Link as LinkIcon, Smile } from 'lucide-react';
import { toast } from 'sonner';
import { useDataSourcesStore } from '@/store/chatbot/data-sources';
import { SourcesSidebar } from '@/components/chatbot/SourcesSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export default function QASourcePage() {
  const routeParams = useParams<{ botId: string }>();
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;
  
  if (!botId) {
    return null;
  }

  const { addPendingSource } = useDataSourcesStore();
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAddQA = () => {
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    if (!question.trim()) {
      toast.error('Please enter a question');
      return;
    }
    if (!answer.trim()) {
      toast.error('Please enter an answer');
      return;
    }

    addPendingSource({
      type: 'QandA',
      name: question.trim(),
      content: answer.trim(),
      citation: title.trim()
    });
    
    toast.success('Q&A pair added successfully');
    setTitle('');
    setQuestion('');
    setAnswer('');
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
                  <h1 className="text-2xl font-heading font-semibold text-foreground">Q&A</h1>
                  <p className="text-muted-foreground mt-1">
                    Craft responses for key questions, ensuring your AI shares relevant info.
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Info className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6">
              <Collapsible open={true}>
                <CollapsibleTrigger className="flex items-center justify-between w-full mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Add Q&A</h3>
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                </CollapsibleTrigger>
                
                <CollapsibleContent className="space-y-4">
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
                    <Label htmlFor="question" className="text-foreground">Question</Label>
                    <Input
                      id="question"
                      type="text"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Ex: How do I request a refund?"
                      className="bg-background border-input text-foreground"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground"
                      disabled
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add question
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="answer" className="text-foreground">Answer</Label>
                      <span className="text-xs text-muted-foreground">
                        {getByteSize(answer)} B
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
                      id="answer"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Enter your answer..."
                      rows={8}
                      className="bg-background border-input text-foreground placeholder:text-muted-foreground resize-none"
                    />
                  </div>

                  <Button
                    onClick={handleAddQA}
                    disabled={!title.trim() || !question.trim() || !answer.trim()}
                    className="bg-muted text-foreground hover:bg-muted/80"
                  >
                    Add Q&A
                  </Button>
                </CollapsibleContent>
              </Collapsible>
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