"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
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

interface ReviseAnswerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userMessage: string;
  agentResponse: string;
  botId: string;
}

export function ReviseAnswerSheet({
  open,
  onOpenChange,
  userMessage,
  agentResponse,
  botId,
}: ReviseAnswerSheetProps) {
  const [agentResponseDraft, setAgentResponseDraft] = useState(agentResponse);
  const [expectedResponse, setExpectedResponse] = useState("");

  const { mutateAsync, isPending } = useProcessDataSource(botId);

  useEffect(() => {
    if (open) {
      setAgentResponseDraft(agentResponse);
      setExpectedResponse("");
    }
  }, [open, agentResponse]);

  const handleSubmit = async () => {
    if (!expectedResponse.trim()) return;

    try {
      await mutateAsync({
        chatbotId: botId,
        qandaData: [
          {
            question: userMessage,
            answer: expectedResponse.trim(),
          },
        ],
      });
      toast.success("Answer revised", {
        description: "The Q&A pair has been saved to your knowledge base.",
      });
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to save revision", {
        description:
          error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[480px] sm:max-w-[480px] flex flex-col"
      >
        <SheetHeader>
          <SheetTitle>Improve answer</SheetTitle>
          <SheetDescription>
            Provide the expected response to save as a Q&A knowledge source.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-4 px-4">
          <div className="space-y-2">
            <Label>User message</Label>
            <Textarea
              value={userMessage}
              readOnly
              className="bg-muted/50 resize-none cursor-default"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Agent response</Label>
            <Textarea
              value={agentResponseDraft}
              onChange={(e) => setAgentResponseDraft(e.target.value)}
              className="resize-none"
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label>Expected response</Label>
            <Textarea
              value={expectedResponse}
              onChange={(e) => setExpectedResponse(e.target.value)}
              className="resize-none"
              rows={5}
              placeholder="What should the AI say instead?"
            />
          </div>
        </div>

        <SheetFooter className="flex-row justify-end gap-2 pt-4 border-t px-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!expectedResponse.trim() || isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Update Answer"
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
