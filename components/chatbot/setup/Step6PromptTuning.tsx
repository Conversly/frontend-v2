'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSystemPromptStore } from "@/store/chatbot/system-prompt";

interface Step6PromptTuningProps {
  onConfirm: () => void;
}

export function Step6PromptTuning({ onConfirm }: Step6PromptTuningProps) {
  const draftPrompt = useSystemPromptStore((s) => s.draftPrompt);
  const setDraftPrompt = useSystemPromptStore((s) => s.setDraftPrompt);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-[28px] font-semibold leading-[130%] tracking-[-1.12px]">Agent&apos;s personality</h1>
        <p className="text-sm leading-[140%] tracking-[-0.28px] text-muted-foreground">
          Select a prompt, customize the instructions, and choose your model.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label className="pl-0.5 text-sm font-medium">Model</Label>
          <select className="h-10 w-full rounded-md border bg-transparent px-3 py-1 text-sm">
            <option>GPT-4o</option>
            <option>GPT-4</option>
            <option>GPT-3.5 Turbo</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <Label className="pl-0.5 text-sm font-medium">Instructions</Label>
          <select className="h-10 w-full rounded-md border bg-transparent px-3 py-1 text-sm">
            <option>General AI agent</option>
            <option>Customer support agent</option>
            <option>Sales agent</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <Textarea
            value={draftPrompt}
            onChange={(e) => setDraftPrompt(e.target.value)}
            rows={8}
            className="font-mono text-xs"
          />
        </div>
      </div>

      <Button className="w-full" onClick={onConfirm}>
        Confirm settings
      </Button>
    </div>
  );
}


