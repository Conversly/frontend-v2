'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import TextareaAutosize from 'react-textarea-autosize';

interface Step6PromptTuningProps {
  onConfirm: () => void;
  draftPrompt: string;
  setDraftPrompt: (value: string) => void;
  isLoading?: boolean;
}

export function Step6PromptTuning({ onConfirm, draftPrompt, setDraftPrompt, isLoading }: Step6PromptTuningProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-2 shrink-0">
        <h1 className="type-section-title">Agent&apos;s personality</h1>
        <p className="type-body-muted">
          Select a prompt, customize the instructions, and choose your model.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 shrink-0">
          <Label className="pl-0.5 type-label">Model</Label>
          <select className="h-10 w-full rounded-md border border-border bg-background px-3 py-1 text-sm focus:ring-2 focus:ring-primary/20 outline-none">
            <option>GPT-4o</option>
            <option>GPT-4</option>
            <option>GPT-3.5 Turbo</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 relative">
          <Label className="pl-0.5 type-label">System Prompt</Label>
          <TextareaAutosize
            value={draftPrompt}
            onChange={(e) => setDraftPrompt(e.target.value)}
            className="flex w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 font-mono text-xs resize-none overflow-y-auto minimal-scrollbar"
            placeholder={isLoading ? "Generating..." : "Enter your instructions here..."}
            disabled={isLoading}
            minRows={5}
            maxRows={12}
          />
        </div>
      </div>

      <Button className="w-full shrink-0 shadow-card" onClick={onConfirm} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Confirm settings"
        )}
      </Button>
    </div>
  );
}
