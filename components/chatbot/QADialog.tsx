'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface QADialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (question: string, answer: string, citation: string) => void;
}

export function QADialog({ isOpen, onClose, onSubmit }: QADialogProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [citation, setCitation] = useState('');

  const handleSubmit = () => {
    if (question.trim() && answer.trim()) {
      onSubmit(question.trim(), answer.trim(), citation.trim());
      setQuestion('');
      setAnswer('');
      setCitation('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white">Add Q&A Pair</DialogTitle>
          <DialogDescription className="text-gray-400">
            Create a question-answer pair to enhance your chatbot's knowledge base.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="question" className="text-white">Question</Label>
            <Input
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What is your return policy?"
              className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="answer" className="text-white">Answer</Label>
            <Textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="We offer a 30-day return policy..."
              rows={4}
              className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="citation" className="text-white">Citation (Optional)</Label>
            <Input
              id="citation"
              value={citation}
              onChange={(e) => setCitation(e.target.value)}
              placeholder="https://example.com/return-policy"
              className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-700 text-white hover:bg-gray-700/50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!question.trim() || !answer.trim()}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Add Q&A Pair
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

