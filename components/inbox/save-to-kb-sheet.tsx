"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { BookmarkCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { useProcessDataSource } from "@/services/datasource";

interface SaveToKBSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userMessage: string;
  agentAnswer: string;
  botId: string;
}

export function SaveToKBSheet({
  open,
  onOpenChange,
  userMessage,
  agentAnswer,
  botId,
}: SaveToKBSheetProps) {
  const [questionDraft, setQuestionDraft] = useState(userMessage);
  const [answerDraft, setAnswerDraft] = useState(agentAnswer);
  const { mutateAsync, isPending } = useProcessDataSource(botId);

  useEffect(() => {
    if (open) {
      setQuestionDraft(userMessage);
      setAnswerDraft(agentAnswer);
    }
  }, [open, userMessage, agentAnswer]);

  const handleSubmit = async () => {
    if (!questionDraft.trim() || !answerDraft.trim()) return;
    try {
      await mutateAsync({
        chatbotId: botId,
        qandaData: [{ question: questionDraft.trim(), answer: answerDraft.trim() }],
      });
      toast.success("Saved to knowledge base", {
        description: "This Q&A pair will be used to train the AI.",
      });
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to save", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[480px] sm:max-w-[480px] flex flex-col">
        <SheetHeader>
          <div className="flex items-center gap-2">
            <BookmarkCheck className="size-5 text-primary" />
            <SheetTitle>Save to knowledge base</SheetTitle>
          </div>
          <SheetDescription>
            This Q&amp;A pair will be added as a knowledge source so the AI can use it in future conversations.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-4 px-4">
          <div className="space-y-2">
            <Label>
              User question
              <span className="ml-1.5 text-xs text-muted-foreground font-normal">
                — edit before saving if needed
              </span>
            </Label>
            <Textarea
              value={questionDraft}
              onChange={(e) => setQuestionDraft(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Answer</Label>
            <Textarea
              value={answerDraft}
              onChange={(e) => setAnswerDraft(e.target.value)}
              className="resize-none"
              rows={7}
              placeholder="Enter the answer to save..."
            />
          </div>
        </div>

        <SheetFooter className="flex-row justify-end gap-2 pt-4 border-t px-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!questionDraft.trim() || !answerDraft.trim() || isPending}>
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <BookmarkCheck className="size-4" />
                Save to KB
              </>
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
