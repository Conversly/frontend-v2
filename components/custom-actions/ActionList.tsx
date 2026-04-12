import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FeatureGuard } from "@/components/shared/FeatureGuard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CustomAction } from "@/types/customActions";
import { Edit, MoreVertical, PlusCircle, Trash2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  actions: CustomAction[];
  enabledActionsCount: number;
  currentUsage: number;
  onCreate: () => void;
  onEdit: (action: CustomAction) => void;
  onDelete: (actionId: string) => void;
  onToggle?: (action: CustomAction, isEnabled: boolean) => void;
}

export const ActionList: React.FC<Props> = ({
  actions,
  enabledActionsCount,
  currentUsage,
  onCreate,
  onEdit,
  onDelete,
  onToggle,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* Add card */}
      <FeatureGuard feature="actions" currentUsage={currentUsage}>
        <button
          type="button"
          onClick={onCreate}
          className="flex min-h-[160px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 text-primary transition-colors hover:bg-primary/10 dark:border-primary/30 dark:bg-primary/10 dark:hover:bg-primary/20"
        >
          <PlusCircle className="h-6 w-6" />
          <span className="text-sm font-medium">Add custom action</span>
        </button>
      </FeatureGuard>

      {actions.map((action) => (
        <ActionCard
          key={action.id}
          action={action}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

function ActionCard({
  action,
  onEdit,
  onDelete,
  onToggle,
}: {
  action: CustomAction;
  onEdit: (a: CustomAction) => void;
  onDelete: (id: string) => void;
  onToggle?: (a: CustomAction, enabled: boolean) => void;
}) {
  const isDraft = action.status === "DRAFT";

  return (
    <div className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm">
      {/* Header: icon + name + status badge */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted/40">
          <Zap className="h-5 w-5 text-muted-foreground" />
        </div>
        <span className="flex-1 truncate text-sm font-semibold">
          {action.displayName || action.name}
        </span>
        <Badge
          variant="outline"
          className={cn(
            "shrink-0 text-[11px]",
            isDraft
              ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-400"
              : "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-400",
          )}
        >
          {isDraft ? "Draft" : "Published"}
        </Badge>
      </div>

      {/* Edit button */}
      <div className="px-4 pb-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => onEdit(action)}
        >
          Edit
        </Button>
      </div>

      {/* Footer: toggle + label + 3-dot */}
      <div className="flex items-center gap-2 border-t border-border/60 bg-muted/30 px-4 py-2.5">
        <Switch
          checked={action.isEnabled}
          onCheckedChange={(checked) => onToggle?.(action, checked)}
          disabled={!onToggle}
        />
        <span className="flex-1 text-xs text-muted-foreground">
          {action.isEnabled ? "Enabled" : "Disabled"}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
              <MoreVertical className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(action)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <FeatureGuard feature="actions">
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => action.id && onDelete(action.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </FeatureGuard>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
