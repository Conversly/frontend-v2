'use client';

import { useState } from 'react';
import { Plus, Bold, Italic, Strikethrough, List, ListOrdered, Link as LinkIcon, Smile, X } from 'lucide-react';
import { toast } from 'sonner';
import { useDataSourcesStore } from '@/store/chatbot/data-sources';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface QAContentProps {
  onSuccess?: () => void;
}

export function QAContent({ onSuccess }: QAContentProps) {
  const { addPendingSource } = useDataSourcesStore();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAddQuestion = () => {
    if (!currentQuestion.trim()) {
      toast.error('Please enter a question');
      return;
    }
    setQuestions([...questions, currentQuestion.trim()]);
    setCurrentQuestion('');
  };

  const handleRemoveQuestion = (index: number) => {
    const filteredQuestions = questions.filter((_, i) => i !== index);
    if (filteredQuestions.length === 0 && !currentQuestion.trim()) {
      toast.error('At least one question is required');
      return;
    }
    setQuestions(filteredQuestions);
  };

  const handleAddQA = () => {
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    const allQuestions = currentQuestion.trim()
      ? [...questions, currentQuestion.trim()].filter(q => q.trim())
      : questions.filter(q => q.trim());

    if (allQuestions.length === 0) {
      toast.error('Please enter at least one question');
      return;
    }
    if (!answer.trim()) {
      toast.error('Please enter an answer');
      return;
    }

    const questionsString = allQuestions.join(' | ');

    addPendingSource({
      type: 'QandA',
      name: questionsString,
      content: answer.trim(),
      citation: title.trim()
    });

    toast.success('Q&A pair added successfully');
    setTitle('');
    setQuestions([]);
    setCurrentQuestion('');
    setAnswer('');
    onSuccess?.();
  };

  const getByteSize = (str: string) => {
    return new Blob([str]).size;
  };

  return (
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
        <Label htmlFor="question" className="text-foreground">Questions</Label>

        {/* Display existing questions */}
        {questions.map((q, index) => (
          q.trim() && (
            <div key={index} className="flex items-center gap-2">
              <Input
                type="text"
                value={q}
                disabled
                className="bg-muted/50 border-input text-foreground flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveQuestion(index)}
                className="h-9 w-9 text-muted-foreground hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )
        ))}

        {/* Current question input */}
        <div className="flex items-center gap-2">
          <Input
            id="question"
            type="text"
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && currentQuestion.trim()) {
                e.preventDefault();
                handleAddQuestion();
              }
            }}
            placeholder="Ex: How do I request a refund?"
            className="bg-background border-input text-foreground flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleAddQuestion}
            className="text-muted-foreground hover:text-foreground whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add question
          </Button>
        </div>

        {questions.filter(q => q.trim()).length > 0 && (
          <p className="text-xs text-muted-foreground">
            {questions.filter(q => q.trim()).length} {questions.filter(q => q.trim()).length === 1 ? 'question' : 'questions'} added
          </p>
        )}
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
        disabled={
          !title.trim() ||
          (questions.filter(q => q.trim()).length === 0 && !currentQuestion.trim()) ||
          !answer.trim()
        }
        className="bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Add Q&A
      </Button>
    </div>
  );
}
