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
import { McpConnectionSummary } from "@/types/mcp";
import { MoreVertical, Paperclip, PlusCircle, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  connections: McpConnectionSummary[];
  onCreate: () => void;
  onEdit: (connection: McpConnectionSummary) => void;
  onDelete: (connectionId: string) => void;
  onToggle: (connection: McpConnectionSummary, isEnabled: boolean) => void;
}

export function McpConnectionList({
  connections,
  onCreate,
  onEdit,
  onDelete,
  onToggle,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* Add card */}
      <FeatureGuard feature="actions">
        <button
          type="button"
          onClick={onCreate}
          className="flex min-h-[160px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 text-primary transition-colors hover:bg-primary/10 dark:border-primary/30 dark:bg-primary/10 dark:hover:bg-primary/20"
        >
          <PlusCircle className="h-6 w-6" />
          <span className="text-sm font-medium">Add MCP server</span>
        </button>
      </FeatureGuard>

      {connections.map((connection) => (
        <McpCard
          key={connection.id}
          connection={connection}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

function McpCard({
  connection,
  onEdit,
  onDelete,
  onToggle,
}: {
  connection: McpConnectionSummary;
  onEdit: (c: McpConnectionSummary) => void;
  onDelete: (id: string) => void;
  onToggle: (c: McpConnectionSummary, enabled: boolean) => void;
}) {
  const isOnline = connection.connectionStatus === "verified";
  const isFailed = connection.connectionStatus === "failed";

  return (
    <div className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm">
      {/* Header: icon + name + status badge */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted/40">
          <Paperclip className="h-5 w-5 text-muted-foreground" />
        </div>
        <span className="flex-1 truncate text-sm font-semibold">{connection.name}</span>
        <Badge
          variant="outline"
          className={cn(
            "shrink-0 text-[11px]",
            isOnline &&
              "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-400",
            isFailed &&
              "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400",
          )}
        >
          {isOnline ? "Online" : isFailed ? "Failed" : "Unverified"}
        </Badge>
      </div>

      {/* Manage button */}
      <div className="px-4 pb-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => onEdit(connection)}
        >
          Manage
        </Button>
      </div>

      {/* Footer: toggle + label + 3-dot */}
      <div className="flex items-center gap-2 border-t border-border/60 bg-muted/30 px-4 py-2.5">
        <Switch
          checked={connection.isEnabled}
          onCheckedChange={(checked) => onToggle(connection, checked)}
        />
        <span className="flex-1 text-xs text-muted-foreground">
          {connection.isEnabled ? "Enabled" : "Disabled"}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
              <MoreVertical className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => onDelete(connection.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
