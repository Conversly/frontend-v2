"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Settings, Plus, Edit2, Trash2, X, Check, Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import {
    useTopicsQuery,
    useCreateTopicMutation,
    useUpdateTopicMutation,
    useDeleteTopicMutation
} from "@/services/chatbot";

interface ManageTopicsDialogProps {
    botId: string;
}

export function ManageTopicsDialog({ botId }: ManageTopicsDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isCreateMode, setIsCreateMode] = useState(false);
    const [newTopicName, setNewTopicName] = useState("");
    const [editingTopicId, setEditingTopicId] = useState<string | null>(null);
    const [editTopicName, setEditTopicName] = useState("");
    const [deletingTopicId, setDeletingTopicId] = useState<string | null>(null);

    // Queries and Mutations
    const { data: topics, isLoading } = useTopicsQuery(botId);
    const createTopicMutation = useCreateTopicMutation();
    const updateTopicMutation = useUpdateTopicMutation(botId);
    const deleteTopicMutation = useDeleteTopicMutation(botId);

    const handleCreateTopic = async () => {
        if (!newTopicName.trim()) return;

        try {
            await createTopicMutation.mutateAsync({
                chatbotId: botId,
                name: newTopicName.trim()
            });
            toast.success("Topic created");
            setNewTopicName("");
            setIsCreateMode(false);
        } catch (error: any) {
            toast.error(error.message || "Failed to create topic");
        }
    };

    const handleUpdateTopic = async (id: string) => {
        if (!editTopicName.trim()) return;

        try {
            await updateTopicMutation.mutateAsync({
                id,
                name: editTopicName.trim()
            });
            toast.success("Topic updated");
            setEditingTopicId(null);
        } catch (error: any) {
            toast.error(error.message || "Failed to update topic");
        }
    };

    const handleDeleteTopic = async (id: string) => {
        try {
            await deleteTopicMutation.mutateAsync({ id });
            toast.success("Topic deleted");
            setDeletingTopicId(null);
        } catch (error: any) {
            toast.error(error.message || "Failed to delete topic");
        }
    };

    const startEditing = (topic: { id: string; name: string }) => {
        setEditingTopicId(topic.id);
        setEditTopicName(topic.name);
        setDeletingTopicId(null); // Cancel delete if active
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Settings className="h-4 w-4" />
                    Manage Topics
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[600px] max-h-[85vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Topic Management</DialogTitle>
                    <DialogDescription>
                        Create, edit, or delete topics to organize your chatbot analytics.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-hidden flex flex-col gap-4 py-4 min-h-0">
                    <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium text-muted-foreground">
                            {topics?.length || 0} Topics
                        </h4>
                        {!isCreateMode && (
                            <Button size="sm" onClick={() => setIsCreateMode(true)} className="gap-1.5">
                                <Plus className="h-3.5 w-3.5" />
                                Add Topic
                            </Button>
                        )}
                    </div>

                    {isCreateMode && (
                        <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/30 animate-in fade-in slide-in-from-top-2">
                            <Input
                                value={newTopicName}
                                onChange={(e) => setNewTopicName(e.target.value)}
                                placeholder="New topic name..."
                                className="h-8"
                                autoFocus
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleCreateTopic();
                                    if (e.key === 'Escape') setIsCreateMode(false);
                                }}
                            />
                            <Button
                                size="sm"
                                onClick={handleCreateTopic}
                                disabled={createTopicMutation.isPending}
                                className="h-8 px-2"
                            >
                                {createTopicMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setIsCreateMode(false)}
                                className="h-8 px-2"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    )}

                    {isLoading ? (
                        <div className="space-y-2">
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-12 w-full" />
                            ))}
                        </div>
                    ) : (
                        <div className="flex-1 overflow-y-auto px-1 -mr-2 pr-2">
                            <div className="space-y-2 pb-4">
                                {topics?.map((topic) => (
                                    <div
                                        key={topic.id}
                                        className="group flex items-center justify-between p-3 border rounded-lg hover:bg-muted/40 transition-colors"
                                    >
                                        {/* INLINE EDIT MODE */}
                                        {editingTopicId === topic.id ? (
                                            <div className="flex-1 flex items-center gap-2">
                                                <Input
                                                    value={editTopicName}
                                                    onChange={(e) => setEditTopicName(e.target.value)}
                                                    className="h-8"
                                                    autoFocus
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') handleUpdateTopic(topic.id);
                                                        if (e.key === 'Escape') setEditingTopicId(null);
                                                    }}
                                                />
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleUpdateTopic(topic.id)}
                                                    disabled={updateTopicMutation.isPending}
                                                    className="h-8 px-2"
                                                >
                                                    {updateTopicMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => setEditingTopicId(null)}
                                                    className="h-8 px-2"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ) : deletingTopicId === topic.id ? (
                                            /* INLINE DELETE CONFIRMATION */
                                            <div className="flex-1 flex items-center justify-between bg-destructive/10 -m-3 p-3 rounded-lg animate-in fade-in">
                                                <div className="flex items-center gap-2 text-destructive text-sm font-medium">
                                                    <AlertTriangle className="h-4 w-4" />
                                                    Delete "{topic.name}"?
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => setDeletingTopicId(null)}
                                                        className="h-7 text-xs hover:bg-transparent"
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => handleDeleteTopic(topic.id)}
                                                        disabled={deleteTopicMutation.isPending}
                                                        className="h-7 text-xs"
                                                    >
                                                        {deleteTopicMutation.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : "Confirm"}
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            /* VIEW MODE */
                                            <>
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-3 h-3 rounded-full shrink-0"
                                                        style={{ backgroundColor: topic.color || '#94a3b8' }}
                                                    />
                                                    <span className="text-sm font-medium">{topic.name}</span>
                                                </div>
                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0"
                                                        onClick={() => startEditing(topic)}
                                                    >
                                                        <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                                        onClick={() => setDeletingTopicId(topic.id)}
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}

                                {topics?.length === 0 && !isCreateMode && (
                                    <div className="text-center py-8 text-muted-foreground text-sm">
                                        No topics found. Create one to get started!
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
