import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Settings, Plus, Edit, Trash2, MessageSquare, AlertTriangle } from "lucide-react";

interface Topic {
  id: string;
  name: string;
  color?: string | null;
  createdAt?: string | Date | null;
}

interface TopicManagementProps {
  topics?: Topic[];
  isLoading: boolean;
  error?: any;
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: (open: boolean) => void;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  newTopicName: string;
  setNewTopicName: (name: string) => void;
  editingTopic: { id: string; name: string } | null;
  setEditingTopic: (topic: { id: string; name: string } | null) => void;
  deletingTopicId: string | null;
  setDeletingTopicId: (id: string | null) => void;
  onCreateTopic: () => void;
  onUpdateTopic: () => void;
  onDeleteTopic: () => void;
  createPending: boolean;
  updatePending: boolean;
  deletePending: boolean;
}

export function TopicManagement({
  topics,
  isLoading,
  error,
  isCreateDialogOpen,
  setIsCreateDialogOpen,
  isEditDialogOpen,
  setIsEditDialogOpen,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  newTopicName,
  setNewTopicName,
  editingTopic,
  setEditingTopic,
  deletingTopicId,
  setDeletingTopicId,
  onCreateTopic,
  onUpdateTopic,
  onDeleteTopic,
  createPending,
  updatePending,
  deletePending,
}: TopicManagementProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Settings className="h-4 w-4" />
          <h3 className="text-base font-semibold">Topic Management</h3>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              Add Topic
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg">Create New Topic</DialogTitle>
              <DialogDescription className="text-sm">
                Add a new topic to track and analyze conversations.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-3">
              <div className="space-y-1.5">
                <Label htmlFor="topicName" className="text-sm">Topic Name</Label>
                <Input
                  id="topicName"
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  placeholder="Enter topic name..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onCreateTopic();
                    }
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" size="sm" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={onCreateTopic}
                disabled={createPending}
              >
                {createPending ? "Creating..." : "Create Topic"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-2.5 border rounded-lg">
              <Skeleton className="h-3.5 w-40" />
              <div className="flex space-x-1.5">
                <Skeleton className="h-7 w-14" />
                <Skeleton className="h-7 w-14" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-sm text-destructive text-center py-3">Error loading topics. Please try again.</p>
      ) : topics && topics.length > 0 ? (
        <ScrollArea className="h-[350px] pr-4">
          <div className="space-y-2">
            {topics.map((topic) => (
              <div key={topic.id} className="flex items-center justify-between p-2.5 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: topic.color || '#8884d8' }}
                  />
                  <div>
                    <span className="text-sm font-medium">{topic.name}</span>
                    <p className="text-xs text-muted-foreground">
                      Created {new Date(topic.createdAt || '').toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingTopic({ id: topic.id, name: topic.name })}
                    className="h-7 text-xs"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeletingTopicId(topic.id)}
                    className="h-7 text-xs text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="text-center py-6">
          <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <h4 className="text-sm font-medium mb-1.5">No topics yet</h4>
          <p className="text-xs text-muted-foreground mb-3">
            Create your first topic to start tracking conversation themes.
          </p>
          <Button size="sm" onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Add Your First Topic
          </Button>
        </div>
      )}

      {/* Edit Topic Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg">Edit Topic</DialogTitle>
            <DialogDescription className="text-sm">
              Update the topic name.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-3">
            <div className="space-y-1.5">
              <Label htmlFor="editTopicName" className="text-sm">Topic Name</Label>
              <Input
                id="editTopicName"
                value={editingTopic?.name || ""}
                onChange={(e) => setEditingTopic(editingTopic ? { ...editingTopic, name: e.target.value } : null)}
                placeholder="Enter topic name..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onUpdateTopic();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={onUpdateTopic}
              disabled={updatePending}
            >
              {updatePending ? "Updating..." : "Update Topic"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Delete Topic
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              Are you sure you want to delete this topic? This action cannot be undone and will affect your analytics data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)} disabled={deletePending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={(e) => {
                e.preventDefault();
                onDeleteTopic();
              }}
              disabled={deletePending}
            >
              {deletePending ? "Deleting..." : "Delete Topic"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

