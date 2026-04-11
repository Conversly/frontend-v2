import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { FeatureGuard } from "@/components/shared/FeatureGuard";
import { McpConnectionSummary } from "@/types/mcp";
import { Bot, Cable, Clock3, Globe, Plus, ShieldCheck, Trash2 } from "lucide-react";

interface Props {
  connections: McpConnectionSummary[];
  onCreate: () => void;
  onEdit: (connection: McpConnectionSummary) => void;
  onDelete: (connectionId: string) => void;
  onToggle: (connection: McpConnectionSummary, isEnabled: boolean) => void;
}

function formatLastSeen(value: string | null) {
  if (!value) return "Not verified yet";
  return formatDistanceToNow(new Date(value), { addSuffix: true });
}

function getStatusBadgeVariant(status: McpConnectionSummary["connectionStatus"]) {
  if (status === "verified") return "default";
  if (status === "failed") return "destructive";
  return "outline";
}

export function McpConnectionList({
  connections,
  onCreate,
  onEdit,
  onDelete,
  onToggle,
}: Props) {
  if (connections.length === 0) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="grid w-full max-w-5xl gap-0 overflow-hidden rounded-2xl border-2 border-dashed bg-card shadow-card lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6 p-8 lg:p-12">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/20">
              <Cable className="h-7 w-7" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-foreground">Connect an MCP server</h3>
              <p className="max-w-xl text-muted-foreground">
                Verify an MCP endpoint in DEV, choose which discovered tools should be enabled, and push them live alongside your built-in tools and custom actions.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="gap-1.5 px-3 py-1.5">
                <Globe className="h-3.5 w-3.5" />
                HTTP JSON-RPC
              </Badge>
              <Badge variant="outline" className="gap-1.5 px-3 py-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                DEV now, LIVE after deploy
              </Badge>
              <Badge variant="outline" className="gap-1.5 px-3 py-1.5">
                <Bot className="h-3.5 w-3.5" />
                Shared action slots
              </Badge>
            </div>

            <FeatureGuard feature="actions">
              <Button size="lg" onClick={onCreate}>
                <Plus className="mr-2 h-4 w-4" />
                Integrate MCP Server
              </Button>
            </FeatureGuard>
          </div>

          <div className="border-t bg-gradient-to-br from-muted/30 via-background to-cyan-50/50 p-8 lg:border-l lg:border-t-0">
            <div className="space-y-4 rounded-2xl border border-border/70 bg-background/90 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Server status</span>
                <Badge>Verified</Badge>
              </div>
              <div className="rounded-xl border border-border/70 bg-muted/20 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium">mintlify-docs</span>
                  <span className="text-xs text-muted-foreground">2 tools</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Search docs and retrieve full pages with contact-safe bindings.
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Once deployed, response will load the enabled LIVE tool snapshot without changing the registry interface.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">MCP Servers ({connections.length})</h2>
          <p className="text-sm text-muted-foreground">
            Verified in DEV now, usable by the live chatbot after deploy.
          </p>
        </div>

        <FeatureGuard feature="actions">
          <Button onClick={onCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Integrate MCP
          </Button>
        </FeatureGuard>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {connections.map((connection) => (
          <Card key={connection.id} className="border-border/70">
            <CardHeader className="gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <CardTitle className="text-base">{connection.name}</CardTitle>
                  <CardDescription className="font-mono text-xs">
                    {connection.serverUrl}
                  </CardDescription>
                </div>
                <Badge variant={getStatusBadgeVariant(connection.connectionStatus)}>
                  {connection.connectionStatus === "verified"
                    ? "Online"
                    : connection.connectionStatus === "failed"
                      ? "Failed"
                      : "Unverified"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
                  <div className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                    Discovered
                  </div>
                  <div className="mt-1 text-lg font-semibold">{connection.discoveredToolCount}</div>
                </div>
                <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
                  <div className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                    Enabled
                  </div>
                  <div className="mt-1 text-lg font-semibold">{connection.enabledToolCount}</div>
                </div>
                <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
                  <div className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                    Auth
                  </div>
                  <div className="mt-1 text-sm font-semibold uppercase">{connection.authType}</div>
                </div>
                <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
                  <div className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                    Last check
                  </div>
                  <div className="mt-1 text-sm font-semibold">{formatLastSeen(connection.lastVerifiedAt)}</div>
                </div>
              </div>

              {connection.lastError ? (
                <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                  {connection.lastError}
                </div>
              ) : null}

              <div className="flex flex-col gap-3 border-t border-border/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock3 className="h-4 w-4" />
                  {formatLastSeen(connection.lastVerifiedAt)}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="mr-1 flex items-center gap-2 rounded-full border border-border/70 px-3 py-1.5">
                    <span className="text-sm">Enabled</span>
                    <Switch
                      checked={connection.isEnabled}
                      onCheckedChange={(checked) => onToggle(connection, checked)}
                    />
                  </div>
                  <Button variant="outline" onClick={() => onEdit(connection)}>
                    Manage
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(connection.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
