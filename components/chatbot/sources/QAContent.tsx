'use client';

import { useState } from 'react';
import { Add, FormatBold, FormatItalic, FormatStrikethrough, FormatListBulleted, FormatListNumbered, Link as LinkIcon, InsertEmoticon, Close } from '@mui/icons-material';
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
        <Label htmlFor="title" className="type-micro-heading">Title</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Refund requests"
          className="border-input text-foreground"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="question" className="type-micro-heading">Questions</Label>

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
                <Close sx={{ fontSize: 16 }} />
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
            className="border-input text-foreground flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleAddQuestion}
            className="text-muted-foreground hover:text-foreground whitespace-nowrap cursor-pointer"
          >
            <Add sx={{ fontSize: 16, mr: 0.5 }} />
            Add question
          </Button>
        </div>

        {questions.filter(q => q.trim()).length > 0 && (
          <p className="type-caption">
            {questions.filter(q => q.trim()).length} {questions.filter(q => q.trim()).length === 1 ? 'question' : 'questions'} added
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="answer" className="type-micro-heading">Answer</Label>
          <span className="type-caption">
            {getByteSize(answer)} B
          </span>
        </div>

        {/* Rich Text Toolbar */}
        <div className="flex items-center gap-1 p-2 bg-[--surface-secondary] rounded-lg border border-border">
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
            <FormatBold sx={{ fontSize: 16 }} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
            <FormatItalic sx={{ fontSize: 16 }} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
            <FormatStrikethrough sx={{ fontSize: 16 }} />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
            <FormatListBulleted sx={{ fontSize: 16 }} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
            <FormatListNumbered sx={{ fontSize: 16 }} />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
            <LinkIcon className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
            <InsertEmoticon sx={{ fontSize: 16 }} />
          </Button>
        </div>

        <Textarea
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your answer..."
          rows={8}
          className="border-input text-foreground placeholder:text-muted-foreground resize-none"
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
