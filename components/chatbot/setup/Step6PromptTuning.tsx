'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
        <h1 className="text-[28px] font-semibold leading-[130%] tracking-[-1.12px]">Agent&apos;s personality</h1>
        <p className="text-sm leading-[140%] tracking-[-0.28px] text-muted-foreground">
          Select a prompt, customize the instructions, and choose your model.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 shrink-0">
          <Label className="pl-0.5 text-sm font-medium">Model</Label>
          <select className="h-10 w-full rounded-md border bg-transparent px-3 py-1 text-sm">
            <option>GPT-4o</option>
            <option>GPT-4</option>
            <option>GPT-3.5 Turbo</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 shrink-0">
          <Label className="pl-0.5 text-sm font-medium">Instructions</Label>
          <select className="h-10 w-full rounded-md border bg-transparent px-3 py-1 text-sm">
            <option>General AI agent</option>
            <option>Customer support agent</option>
            <option>Sales agent</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 relative">
          <TextareaAutosize
            value={draftPrompt}
            onChange={(e) => setDraftPrompt(e.target.value)}
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 font-mono text-xs resize-none overflow-y-auto minimal-scrollbar"
            placeholder={isLoading ? "Generating..." : "Enter your instructions here..."}
            disabled={isLoading}
            minRows={5}
            maxRows={12}
          />
        </div>
      </div>

      <Button className="w-full shrink-0" onClick={onConfirm} disabled={isLoading}>
        {isLoading ? (
          <>
            <span className="mr-2 animate-spin">⟳</span>
            Processing...
          </>
        ) : (
          "Confirm settings"
        )}
      </Button>
    </div>
  );
}
