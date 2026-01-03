"use client";

import { useQuery } from "@tanstack/react-query";
import { getWorkspacesWithDetails, WorkspaceDetails, createWorkspace } from "@/lib/api/admin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useWorkspaces } from "@/hooks/use-workspaces";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import {
  Building2,
  Plus,
  Users,
  Bot,
  DollarSign,
  Crown,
  Shield,
  User,
  Loader2,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

const ROLE_BADGE_COLORS: Record<string, string> = {
  OWNER: "bg-purple-100 text-purple-800",
  ADMIN: "bg-blue-100 text-blue-800",
};

const ROLE_ICONS: Record<string, React.ReactNode> = {
  OWNER: <Crown className="w-3 h-3" />,
  ADMIN: <Shield className="w-3 h-3" />,
};

export const WorkspacesView = () => {
  const { data: workspaces, isLoading, error } = useQuery({
    queryKey: ["workspaces-details"],
    queryFn: getWorkspacesWithDetails,
  });

  const { setActiveWorkspace, activeWorkspaceId } = useWorkspaces();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  // Auto-select workspace if user has exactly one workspace
  useEffect(() => {
    if (workspaces && workspaces.length === 1 && !activeWorkspaceId) {
      const singleWorkspace = workspaces[0];
      setActiveWorkspace(singleWorkspace.id);
    }
  }, [workspaces, activeWorkspaceId, setActiveWorkspace]);

  const handleCreateWorkspace = async () => {
    if (!workspaceName.trim()) {
      toast.error("Workspace name is required");
      return;
    }

    setIsCreating(true);
    try {
      const newWorkspace = await createWorkspace(workspaceName.trim());
      toast.success("Workspace created successfully");
      setWorkspaceName("");
      setIsDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["workspaces-details"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      setActiveWorkspace(newWorkspace.id);
    } catch (error: any) {
      toast.error(error.message || "Failed to create workspace");
    } finally {
      setIsCreating(false);
    }
  };

  const handleSelectWorkspace = (workspaceId: string) => {
    setActiveWorkspace(workspaceId);
    router.push("/chatbot");
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-12">
          <p className="text-center text-destructive">
            Failed to load workspaces. Please try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">All Workspaces</h2>
          <p className="text-muted-foreground mt-1">
            {workspaces?.length || 0} {workspaces?.length === 1 ? "workspace" : "workspaces"}
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
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

      {/* Workspaces Grid */}
      {workspaces && workspaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map((workspace) => (
            <Card
              key={workspace.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleSelectWorkspace(workspace.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{workspace.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        {workspace.createdAt
                          ? `Created ${formatDistanceToNow(new Date(workspace.createdAt), { addSuffix: true })}`
                          : "Recently"}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={ROLE_BADGE_COLORS[workspace.role] || ""}>
                    <span className="flex items-center gap-1">
                      {ROLE_ICONS[workspace.role]}
                      {workspace.role}
                    </span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-muted">
                      <Users className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Members</p>
                      <p className="text-lg font-semibold">{workspace.memberCount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-muted">
                      <Bot className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Chatbots</p>
                      <p className="text-lg font-semibold">{workspace.chatbotCount}</p>
                    </div>
                  </div>
                </div>
                {workspace.role === "OWNER" && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Wallet Balance</span>
                      </div>
                      <span className="text-lg font-semibold">
                        ${parseFloat(workspace.walletBalance || "0").toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectWorkspace(workspace.id);
                  }}
                >
                  Open Workspace
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="p-4 rounded-full bg-muted mb-4">
              <Building2 className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No workspaces yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Get started by creating your first workspace to organize your chatbots and team.
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
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
          </CardContent>
        </Card>
      )}
    </div>
  );
};

