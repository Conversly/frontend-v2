'use client';

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createTopic, deleteTopic } from "@/lib/api/chatbot";
import { getTopic } from "@/lib/api/chatbot";

interface Step5TopicsProps {
  chatbotId: string;
  onContinue: () => void;
}

export function Step5Topics({ chatbotId, onContinue }: Step5TopicsProps) {
  const [topics, setTopics] = useState<Array<{ id: string; name: string }>>([]);
  const [newTopic, setNewTopic] = useState("");
  const [isSavingTopic, setIsSavingTopic] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!chatbotId) return;
      setIsLoading(true);
      try {
        const list = await getTopic(chatbotId);
        if (cancelled) return;
        setTopics(list.map((t) => ({ id: t.id, name: t.name })));
      } catch (err: any) {
        if (!cancelled) toast.error(err?.message || "Failed to load topics");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [chatbotId]);

  const handleAddTopic = async () => {
    if (!chatbotId) {
      toast.error("Missing chatbot ID");
      return;
    }
    const name = newTopic.trim();
    if (!name) return;
    setIsSavingTopic(true);
    try {
      const t = await createTopic({ chatbotId: chatbotId, name });
      // Prepend so the user immediately sees the newly-added topic.
      setTopics((prev) => [{ id: t.id, name: t.name }, ...prev]);
      setNewTopic("");
      toast.success("Topic added");
    } catch (err: any) {
      toast.error(err?.message || "Failed to add topic");
    } finally {
      setIsSavingTopic(false);
    }
  };

  const handleDeleteTopic = async (id: string) => {
    setIsSavingTopic(true);
    try {
      await deleteTopic({ id });
      setTopics((prev) => prev.filter((t) => t.id !== id));
      toast.success("Topic deleted");
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete topic");
    } finally {
      setIsSavingTopic(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Topics</h1>
        <p className="text-sm text-muted-foreground">
          Add topics to organize your agent&apos;s knowledge and analytics.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Input
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          placeholder="e.g., Pricing"
          disabled={isSavingTopic}
        />
        <Button type="button" onClick={handleAddTopic} disabled={!newTopic.trim() || isSavingTopic}>
          Add
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {isLoading && <span className="text-sm text-muted-foreground">Loading topics…</span>}
        {!isLoading && topics.length === 0 && (
          <span className="text-sm text-muted-foreground">No topics yet. Add your first one.</span>
        )}
        {topics.map((t) => (
          <div key={t.id} className="flex items-center gap-2 rounded-md border bg-muted/40 px-3 py-1">
            <span className="text-sm">{t.name}</span>
            <button
              type="button"
              className="rounded p-1 text-muted-foreground hover:bg-accent"
              onClick={() => handleDeleteTopic(t.id)}
              disabled={isSavingTopic}
              aria-label={`Delete ${t.name}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <Button className="w-full" onClick={onContinue}>
        Continue
      </Button>
    </div>
  );
}


