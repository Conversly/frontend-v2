"use client";

import { useState } from "react";
import { useWorkspaces } from "@/hooks/use-workspaces";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Plus } from "lucide-react";
import { createWorkspace } from "@/lib/api/admin";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const WorkspaceSwitcher = () => {
  const { workspaces, activeWorkspaceId, isLoading, setActiveWorkspace } = useWorkspaces();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const queryClient = useQueryClient();

  const handleCreateWorkspace = async () => {
    if (!workspaceName.trim()) {
      alert("Workspace name is required");
      return;
    }

    setIsCreating(true);
    try {
      const newWorkspace = await createWorkspace(workspaceName.trim());
      alert("Workspace created successfully");
      setWorkspaceName("");
      setIsDialogOpen(false);
      // Invalidate and refetch workspaces
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      // Set the new workspace as active
      setActiveWorkspace(newWorkspace.id);
    } catch (error: any) {
      alert(error.message || "Failed to create workspace");
    } finally {
      setIsCreating(false);
    }
  };

  if (isLoading) return null;

  // Get the active workspace name for display
  const activeWorkspace = workspaces.find((ws) => ws.id === activeWorkspaceId);
  const displayValue = activeWorkspace?.name || (activeWorkspaceId ? "Workspace" : undefined);

  return (
    <div className="flex items-center gap-2">
      <Building2 className="w-4 h-4 text-muted-foreground" />
      <Select
        value={activeWorkspaceId ?? undefined}
        onValueChange={(val) => setActiveWorkspace(val)}
      >
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder={workspaces.length === 0 ? "No workspaces" : "Select workspace"}>
            {displayValue}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {workspaces.map((ws) => (
            <SelectItem key={ws.id} value={ws.id}>
              {ws.name || "Workspace"}
            </SelectItem>
          ))}
          <div className="px-2 py-1.5">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Workspace
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Workspace</DialogTitle>
                  <DialogDescription>
                    Create a new workspace to organize your chatbots and team members.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="workspace-name">Workspace Name</Label>
                    <Input
                      id="workspace-name"
                      placeholder="My Workspace"
                      value={workspaceName}
                      onChange={(e) => setWorkspaceName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !isCreating) {
                          handleCreateWorkspace();
                        }
                      }}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false);
                      setWorkspaceName("");
                    }}
                    disabled={isCreating}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateWorkspace} disabled={isCreating || !workspaceName.trim()}>
                    {isCreating ? "Creating..." : "Create"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

