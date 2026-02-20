"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, Lock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMaybeWorkspace } from "@/contexts/workspace-context";
import { useGetWorkspaces, useGetWorkspaceEntitlements } from "@/services/workspace";
import { CreateWorkspaceDialog } from "@/components/workspace/CreateWorkspaceDialog";
import { UpgradeDialog } from "@/components/billingsdk/UpgradeDialog";

export function WorkspaceSwitcher() {
  const router = useRouter();
  const workspaceCtx = useMaybeWorkspace();
  const { data: workspaces = [] } = useGetWorkspaces();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);

  // Fetch entitlements for the current workspace to know the workspace quota
  const { data: entitlements } = useGetWorkspaceEntitlements(
    workspaceCtx?.workspaceId
  );

  const workspaceLimit = (entitlements?.limits?.workspaces as number) ?? 1;
  const workspacesUsed = entitlements?.usage?.workspaces ?? workspaces.length;
  const isAtLimit = workspacesUsed >= workspaceLimit;

  if (!workspaceCtx) return null;

  const handleCreateClick = () => {
    if (isAtLimit) {
      setIsUpgradeDialogOpen(true);
    } else {
      setIsCreateDialogOpen(true);
    }
  };

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
          <DropdownMenuItem
            onClick={handleCreateClick}
            className={isAtLimit ? "text-muted-foreground" : undefined}
          >
            {isAtLimit ? (
              <Lock className="mr-2 h-4 w-4 text-amber-500" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            <span>Create new workspace</span>
            {isAtLimit && (
              <span className="ml-auto text-[10px] font-medium text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 rounded-full">
                Upgrade
              </span>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreateWorkspaceDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />

      <UpgradeDialog
        open={isUpgradeDialogOpen}
        onOpenChange={setIsUpgradeDialogOpen}
        title="Upgrade to create more workspaces"
        description={`Your current plan allows up to ${workspaceLimit} workspace${workspaceLimit === 1 ? "" : "s"}. Upgrade to unlock more.`}
      />
    </>
  );
}
