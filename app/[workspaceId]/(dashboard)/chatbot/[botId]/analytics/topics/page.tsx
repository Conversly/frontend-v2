"use client";

import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Check, Edit2, Loader2, Plus, Trash2, X } from "lucide-react";
import {
  useCreateTopicMutation,
  useDeleteTopicMutation,
  useTopicsQuery,
  useUpdateTopicMutation,
} from "@/services/chatbot";
import type { TopicResponse } from "@/types/chatbot";

export default function TopicsPage() {
  const routeParams = useParams<{ botId: string }>();
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;
  const { data: topics, isLoading, error } = useTopicsQuery(botId);

  const createTopicMutation = useCreateTopicMutation();
  const updateTopicMutation = useUpdateTopicMutation(botId);
  const deleteTopicMutation = useDeleteTopicMutation(botId);

  const [isCreateMode, setIsCreateMode] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [editingTopicId, setEditingTopicId] = useState<string | null>(null);
  const [editTopicName, setEditTopicName] = useState("");
  const [deletingTopicId, setDeletingTopicId] = useState<string | null>(null);

  const formatCreatedAt = (createdAt: TopicResponse["createdAt"]) => {
    if (!createdAt) return "—";
    try {
      const d = typeof createdAt === "string" ? new Date(createdAt) : new Date(createdAt);
      return d.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "—";
    }
  };

  const startEditing = (topic: TopicResponse) => {
    setEditingTopicId(topic.id);
    setEditTopicName(topic.name);
    setDeletingTopicId(null);
  };

  const handleCreateTopic = async () => {
    if (!newTopicName.trim()) return;
    try {
      await createTopicMutation.mutateAsync({
        chatbotId: botId,
        name: newTopicName.trim(),
      });
      toast.success("Topic created");
      setNewTopicName("");
      setIsCreateMode(false);
    } catch (e: any) {
      toast.error(e?.message || "Failed to create topic");
    }
  };

  const handleUpdateTopic = async (id: string) => {
    if (!editTopicName.trim()) return;
    try {
      await updateTopicMutation.mutateAsync({ id, name: editTopicName.trim() });
      toast.success("Topic updated");
      setEditingTopicId(null);
    } catch (e: any) {
      toast.error(e?.message || "Failed to update topic");
    }
  };

  const handleDeleteTopic = async (id: string) => {
    try {
      await deleteTopicMutation.mutateAsync({ id });
      toast.success("Topic deleted");
      setDeletingTopicId(null);
    } catch (e: any) {
      toast.error(e?.message || "Failed to delete topic");
    }
  };

  if (error) {
    return (
      <div className="px-4 md:px-6 py-4 md:py-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold tracking-tight">Topics</h1>
          <p className="text-sm text-muted-foreground">
            Manage your chatbot topics
          </p>
        </div>
        <Card className="p-4">
          <p className="text-sm text-destructive">Error loading topic data. Please try again later.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6 py-4 md:py-6 space-y-4">
      <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="type-page-title">Topics</h1>
          <p className="type-body-muted">Create, edit, and delete topics</p>
        </div>

        {!isCreateMode ? (
          <Button size="sm" onClick={() => setIsCreateMode(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add topic
          </Button>
        ) : null}
      </div>

      {isCreateMode ? (
        <Card className="p-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <Input
              value={newTopicName}
              onChange={(e) => setNewTopicName(e.target.value)}
              placeholder="New topic name..."
              className="h-9"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateTopic();
                if (e.key === "Escape") setIsCreateMode(false);
              }}
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleCreateTopic}
                disabled={createTopicMutation.isPending}
                className="h-9 gap-2"
              >
                {createTopicMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
                Create
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsCreateMode(false);
                  setNewTopicName("");
                }}
                className="h-9 gap-2"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      ) : null}

      <Card className="p-0">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="text-sm text-muted-foreground">
            {topics?.length ?? 0} topics
          </div>
        </div>

        {/* scroll container */}
        <div className="max-h-[70vh] overflow-y-auto">
          {isLoading ? (
            <div className="p-4 space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : topics?.length ? (
            <div className="divide-y">
              {topics.map((topic) => {
                const isEditing = editingTopicId === topic.id;
                const isDeleting = deletingTopicId === topic.id;

                return (
                  <div key={topic.id} className="px-4 py-3 hover:bg-muted/30">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="min-w-0">
                        {isEditing ? (
                          <div className="flex items-center gap-2">
                            <Input
                              value={editTopicName}
                              onChange={(e) => setEditTopicName(e.target.value)}
                              className="h-9"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleUpdateTopic(topic.id);
                                if (e.key === "Escape") setEditingTopicId(null);
                              }}
                            />
                            <Button
                              size="sm"
                              onClick={() => handleUpdateTopic(topic.id)}
                              disabled={updateTopicMutation.isPending}
                              className="h-9 w-10 px-0"
                            >
                              {updateTopicMutation.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Check className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingTopicId(null)}
                              className="h-9 w-10 px-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className="w-3 h-3 rounded-full shrink-0"
                              style={{ backgroundColor: topic.color || "#94a3b8" }}
                            />
                            <div className="min-w-0">
                              <div className="text-sm font-medium truncate">
                                {topic.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Created {formatCreatedAt(topic.createdAt)}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* actions */}
                      {!isEditing ? (
                        <div className="flex items-center gap-2 shrink-0">
                          {isDeleting ? (
                            <>
                              <div className="text-xs text-muted-foreground mr-1">
                                Delete?
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setDeletingTopicId(null)}
                                className="h-9"
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteTopic(topic.id)}
                                disabled={deleteTopicMutation.isPending}
                                className="h-9 gap-2"
                              >
                                {deleteTopicMutation.isPending ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                                Confirm
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => startEditing(topic)}
                                className="h-9 gap-2"
                              >
                                <Edit2 className="h-4 w-4" />
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                  setDeletingTopicId(topic.id);
                                  setEditingTopicId(null);
                                }}
                                className="h-9 gap-2"
                              >
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </Button>
                            </>
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No topics yet. Create one to get started.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
