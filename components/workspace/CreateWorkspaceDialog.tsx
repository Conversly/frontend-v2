"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateWorkspace } from "@/services/workspace";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CreateWorkspaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateWorkspaceDialog({ open, onOpenChange }: CreateWorkspaceDialogProps) {
  const router = useRouter();
  const createWorkspace = useCreateWorkspace();
  const [name, setName] = useState("");

  const handleCreate = async () => {
    if (!name || name.trim().length === 0) {
      toast.error("Please enter a workspace name");
      return;
    }

    if (name.length > 255) {
      toast.error("Workspace name must be 255 characters or less");
      return;
    }

    try {
      const result = await createWorkspace.mutateAsync({ name: name.trim() });
      toast.success("Workspace created successfully");
      setName("");
      onOpenChange(false);
      
      // Navigate to the new workspace
      router.push(`/${result.workspaceId}/chatbot`);
    } catch (error: any) {
      console.error("Failed to create workspace:", error);
      toast.error(error.message || "Failed to create workspace");
    }
  };

  const handleCancel = () => {
    setName("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Workspace</DialogTitle>
          <DialogDescription>
            Create a new workspace to organize your chatbots and team members. You can switch between workspaces anytime.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="workspace-name">Workspace Name</Label>
            <Input
              id="workspace-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Marketing Team, Product Development"
              onKeyDown={(e) => {
                if (e.key === "Enter" && name.trim()) {
                  handleCreate();
                }
              }}
              disabled={createWorkspace.isPending}
              maxLength={255}
            />
            <p className="text-xs text-muted-foreground">
              {name.length}/255 characters
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={createWorkspace.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={createWorkspace.isPending || !name.trim()}
          >
            {createWorkspace.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Workspace
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
