"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMaybeWorkspace } from "@/contexts/workspace-context";
import { useGetWorkspaces } from "@/services/workspace";
import { CreateWorkspaceDialog } from "@/components/workspace/CreateWorkspaceDialog";

export function WorkspaceSwitcher() {
  const router = useRouter();
  const workspaceCtx = useMaybeWorkspace();
  const { data: workspaces = [] } = useGetWorkspaces();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  if (!workspaceCtx) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span className="truncate">{workspaceCtx.workspaceName}</span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {workspaces.map((ws) => (
            <DropdownMenuItem
              key={ws.workspaceId}
              onClick={() => router.push(`/${ws.workspaceId}/chatbot`)}
            >
              <span className="flex-1 truncate">{ws.workspaceName}</span>
              {ws.workspaceId === workspaceCtx.workspaceId && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            <span>Create new workspace</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateWorkspaceDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </>
  );
}

