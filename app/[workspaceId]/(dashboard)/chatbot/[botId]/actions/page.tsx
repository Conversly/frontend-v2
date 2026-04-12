"use client";

import React, { useCallback, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Cable, Loader2, Play, Search, Sparkles, Zap, BrainCircuit } from "lucide-react";
import { FeatureGuard } from "@/components/shared/FeatureGuard";
import { ActionList } from "@/components/custom-actions/ActionList";
import { ActionPlaygroundPanel } from "@/components/custom-actions/ActionPlaygroundPanel";
import { CustomActionForm, useCustomActionForm } from "@/components/custom-actions/CustomActionForm";
import { McpConnectionForm } from "@/components/mcp/McpConnectionForm";
import { McpConnectionList } from "@/components/mcp/McpConnectionList";
import { OneClickIntegrationCard } from "@/components/chatbot/integration/OneClickIntegrationCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAccessControl } from "@/hooks/useAccessControl";
import {
  useCreateCustomAction,
  useCustomActions,
  useDeleteCustomAction,
  useToggleCustomAction,
  useUpdateCustomAction,
} from "@/services/actions";
import {
  useDeleteMcpConnection,
  useMcpConnection,
  useMcpConnections,
  useToggleMcpConnection,
} from "@/services/mcp";
import {
  useEditorActiveTab,
  useEditorCanSaveDraft,
  useEditorHasUnsavedChanges,
  useEditorLastSavedAction,
  useEditorPlaygroundEnabled,
  useEditorSaveActionLabel,
  useEditorSaving,
  useEditorSetActiveTab,
} from "@/store/custom-action-editor";
import { INTEGRATION_PLATFORMS } from "@/lib/constants/integrations";
import type { CustomAction, CustomActionStatus } from "@/types/customActions";
import type { McpConnectionSummary } from "@/types/mcp";
import type { ActionFormTab } from "@/utils/customActionValidation";

const ONE_CLICK_PLATFORMS = ["stripe", "shopify", "zendesk"] as const;

// ─────────────────────────────────────────────
// Shared sticky sub-header shell
// ─────────────────────────────────────────────
function PageSubHeader({
  onBack,
  title,
  badge,
  actions,
  tabs,
}: {
  onBack: () => void;
  title: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  tabs?: React.ReactNode;
}) {
  return (
    <div className="sticky top-0 z-10 border-b border-border/60 bg-white shadow-sm dark:bg-background">
      <div className="container mx-auto max-w-[1280px] px-6 2xl:max-w-[1440px]">
        <div className="flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="-ml-1 h-8 w-8 shrink-0"
              onClick={onBack}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-base font-semibold leading-none">{title}</h1>
            {badge}
          </div>
          {actions && (
            <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
          )}
        </div>
        {tabs}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Custom-action editor (sticky header + split content)
// ─────────────────────────────────────────────
interface ActionEditorShellProps {
  workspaceId: string;
  chatbotId: string;
  existingAction?: CustomAction;
  playgroundVersion: number;
  onSave: (action: CustomAction, saveMode: "draft" | "publish") => Promise<CustomAction>;
  onBack: () => void;
}

function ActionEditorShell({
  workspaceId,
  chatbotId,
  existingAction,
  playgroundVersion,
  onSave,
  onBack,
}: ActionEditorShellProps) {
  const controller = useCustomActionForm({ chatbotId, existingAction, onSave });

  const activeTab = useEditorActiveTab();
  const setActiveTab = useEditorSetActiveTab();
  const hasUnsavedChanges = useEditorHasUnsavedChanges();
  const canSaveDraft = useEditorCanSaveDraft();
  const saving = useEditorSaving();
  const saveActionLabel = useEditorSaveActionLabel();
  const lastSavedAction = useEditorLastSavedAction();
  const playgroundEnabled = useEditorPlaygroundEnabled();

  return (
    <FeatureGuard
      feature="actions"
      fallback={
        <div className="py-12 text-center text-muted-foreground">
          You do not have permission to manage actions.
        </div>
      }
    >
      {/* Tabs wraps both the sticky header (triggers) and form (TabsContent) */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as ActionFormTab)}
        className="flex flex-col"
      >
        <PageSubHeader
          onBack={onBack}
          title="Actions"
          badge={<Badge variant="outline" className="text-[11px]">DEV managed</Badge>}
          actions={
            <>
              {hasUnsavedChanges && (
                <Badge variant="warning" className="shrink-0">Unsaved changes</Badge>
              )}
              {canSaveDraft && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => void controller.handleSave("draft")}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save as Draft"}
                </Button>
              )}
              <Button
                type="button"
                size="sm"
                onClick={() => void controller.handleSave("publish")}
                disabled={saving}
                className="min-w-[110px]"
              >
                {saving ? "Saving..." : saveActionLabel}
              </Button>
            </>
          }
          tabs={
            <TabsList
              variant="mindtickle"
              className="max-w-full lg:max-w-[840px] xl:max-w-[960px] 2xl:max-w-[1080px]"
            >
              <TabsTrigger value="behavior" variant="mindtickle" className="font-sans">
                <Sparkles className="h-4 w-4" />
                Behavior
              </TabsTrigger>
              <TabsTrigger value="inputs" variant="mindtickle" className="font-sans">
                <BrainCircuit className="h-4 w-4" />
                Inputs
              </TabsTrigger>
              <TabsTrigger value="connection" variant="mindtickle" className="font-sans">
                <Cable className="h-4 w-4" />
                Connection
              </TabsTrigger>
              <TabsTrigger value="test-output" variant="mindtickle" className="font-sans">
                <Play className="h-4 w-4" />
                Test &amp; Output
              </TabsTrigger>
            </TabsList>
          }
        />

        {/* Split-panel content */}
        <div className="container mx-auto max-w-[1280px] px-6 py-6 2xl:max-w-[1440px]">
          <div className="grid h-[calc(100svh-196px)] min-h-[600px] gap-6 lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_460px] 2xl:grid-cols-[minmax(0,1fr)_500px]">
            <div className="min-h-0 min-w-0 overflow-y-auto pr-2">
              <CustomActionForm controller={controller} />
            </div>
            <div className="hidden min-h-0 overflow-y-auto no-scrollbar lg:block">
              <ActionPlaygroundPanel
                workspaceId={workspaceId}
                chatbotId={chatbotId}
                lastSavedAction={lastSavedAction}
                enabled={playgroundEnabled}
                hasUnsavedChanges={hasUnsavedChanges}
                playgroundVersion={playgroundVersion}
              />
            </div>
          </div>
        </div>
      </Tabs>
    </FeatureGuard>
  );
}

// ─────────────────────────────────────────────
// MCP form shell (sticky header + form content)
// ─────────────────────────────────────────────
interface McpFormShellProps {
  chatbotId: string;
  existingConnectionId: string | null;
  onBack: () => void;
}

function McpFormShell({ chatbotId, existingConnectionId, onBack }: McpFormShellProps) {
  const { data: existingConnection, isLoading } = useMcpConnection(
    { chatbotId, connectionId: existingConnectionId || "" },
    !!existingConnectionId,
  );

  return (
    <FeatureGuard
      feature="actions"
      fallback={
        <div className="py-12 text-center text-muted-foreground">
          You do not have permission to manage MCP servers.
        </div>
      }
    >
      <PageSubHeader
        onBack={onBack}
        title="MCP Servers"
        badge={<Badge variant="outline" className="text-[11px]">DEV managed</Badge>}
      />

      <div className="container mx-auto max-w-[1280px] px-6 py-6 2xl:max-w-[1440px]">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <McpConnectionForm
            chatbotId={chatbotId}
            existingConnection={existingConnection ?? null}
            onSaved={onBack}
            onCancel={onBack}
          />
        )}
      </div>
    </FeatureGuard>
  );
}

// ─────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────
export default function ActionsPage() {
  const params = useParams<{ workspaceId: string; botId: string }>();
  const workspaceId = params.workspaceId as string;
  const chatbotId = params.botId as string;
  const router = useRouter();

  const accessControl = useAccessControl(workspaceId);

  // Custom action view state
  const [actionView, setActionView] = useState<"list" | "create" | "edit">("list");
  const [selectedAction, setSelectedAction] = useState<CustomAction | undefined>(undefined);
  const [playgroundVersion, setPlaygroundVersion] = useState(0);

  // MCP view state
  const [mcpView, setMcpView] = useState<"list" | "create" | "edit">("list");
  const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);

  // Custom actions data
  const { data: actions, isLoading } = useCustomActions({ chatbotId });
  const createAction = useCreateCustomAction();
  const updateAction = useUpdateCustomAction();
  const deleteAction = useDeleteCustomAction();
  const toggleAction = useToggleCustomAction();

  // MCP data
  const { data: mcpConnections, isLoading: isMcpLoading } = useMcpConnections({ chatbotId });
  const deleteMcpConnection = useDeleteMcpConnection();
  const toggleMcpConnection = useToggleMcpConnection();

  const enabledCustomActions = (actions || []).filter((a) => a.isEnabled).length;
  const enabledMcpTools = (mcpConnections || []).reduce(
    (sum, c) => sum + (c.isEnabled ? c.enabledToolCount : 0),
    0,
  );
  const totalSlotsUsed = enabledCustomActions + enabledMcpTools;

  // ── Custom action handlers ──
  const handleCreate = () => { setSelectedAction(undefined); setActionView("create"); };
  const handleEdit = (action: CustomAction) => { setSelectedAction(action); setActionView("edit"); };
  const handleBackToList = useCallback(() => { setActionView("list"); setSelectedAction(undefined); }, []);
  const handleDelete = (actionId: string) => {
    if (confirm("Are you sure you want to delete this action?")) {
      deleteAction.mutate({ chatbotId, actionId });
    }
  };
  const handleToggleAction = (action: CustomAction, isEnabled: boolean) => {
    toggleAction.mutate({ chatbotId, actionId: action.id, isEnabled });
  };

  const handleSave = useCallback(
    async (action: CustomAction, saveMode: "draft" | "publish") => {
      const status: CustomActionStatus = saveMode === "draft" ? "DRAFT" : "PUBLISHED";
      let savedAction: CustomAction;

      if (actionView === "create") {
        savedAction = await createAction.mutateAsync({
          chatbotId,
          name: action.name,
          displayName: action.displayName,
          description: action.description,
          status,
          accessLevel: action.accessLevel,
          requiredContactFields: action.requiredContactFields,
          triggerExamples: action.triggerExamples,
          apiConfig: action.apiConfig,
          parameters: action.parameters,
        });
      } else {
        if (!action.id) throw new Error("Action id is required to update an action.");
        savedAction = await updateAction.mutateAsync({
          chatbotId,
          actionId: action.id,
          name: action.name,
          displayName: action.displayName,
          description: action.description,
          status: action.status === "DRAFT" || saveMode === "draft" ? status : undefined,
          accessLevel: action.accessLevel,
          requiredContactFields: action.requiredContactFields,
          triggerExamples: action.triggerExamples,
          apiConfig: action.apiConfig,
          parameters: action.parameters,
        });
      }

      setSelectedAction(savedAction);
      setPlaygroundVersion((prev) => prev + 1);
      setActionView("edit");
      return savedAction;
    },
    [actionView, chatbotId, createAction, updateAction],
  );

  // ── Integration state (1-click) ──
  const integrations = INTEGRATION_PLATFORMS.filter((p) =>
    ONE_CLICK_PLATFORMS.includes(p.id as any),
  );
  const [search, setSearch] = useState("");

  const handleConnectIntegration = (id: string) => {
    // TODO: wire to real OAuth / setup flow per platform
  };

  const filteredIntegrations = search.trim()
    ? integrations.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase()),
      )
    : integrations;

  // ── MCP handlers ──
  const handleCreateMcp = () => { setSelectedConnectionId(null); setMcpView("create"); };
  const handleEditMcp = (c: McpConnectionSummary) => { setSelectedConnectionId(c.id); setMcpView("edit"); };
  const handleBackToMcpList = useCallback(() => { setMcpView("list"); setSelectedConnectionId(null); }, []);
  const handleDeleteMcp = (connectionId: string) => {
    if (confirm("Are you sure you want to delete this MCP server?")) {
      deleteMcpConnection.mutate({ chatbotId, connectionId });
    }
  };
  const handleToggleMcp = (c: McpConnectionSummary, isEnabled: boolean) => {
    toggleMcpConnection.mutate({ chatbotId, connectionId: c.id, isEnabled });
  };

  // ── Loading ──
  if (isLoading || accessControl.isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // ── Custom action editor (full-page takeover) ──
  if (actionView !== "list") {
    return (
      <ActionEditorShell
        workspaceId={workspaceId}
        chatbotId={chatbotId}
        existingAction={selectedAction}
        playgroundVersion={playgroundVersion}
        onSave={handleSave}
        onBack={handleBackToList}
      />
    );
  }

  // ── MCP form (full-page takeover) ──
  if (mcpView !== "list") {
    return (
      <McpFormShell
        chatbotId={chatbotId}
        existingConnectionId={mcpView === "edit" ? selectedConnectionId : null}
        onBack={handleBackToMcpList}
      />
    );
  }

  // ── List view ──
  return (
    <div className="w-full bg-background">
      {/* Page header */}
      <div className="sticky top-0 z-10 border-b border-border/60 bg-white shadow-sm dark:bg-background">
        <div className="container mx-auto max-w-[1280px] px-6 2xl:max-w-[1440px]">
          <div className="flex h-14 items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="-ml-1 h-8 w-8 shrink-0"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-base font-semibold leading-none">
                Integrate with external tools
              </h1>
            </div>
            <div className="relative w-56 shrink-0">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search integrations or servers..."
                className="h-8 pl-8 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-[1280px] px-6 py-8 2xl:max-w-[1440px]">
        {/* Page description */}
        <p className="mb-8 text-sm text-muted-foreground">
          Your agent can retrieve data and perform actions for you.{" "}
          Connect our built-in integrations, or connect your{" "}
          <span className="font-medium text-foreground">own MCP servers</span> here.
        </p>

        <div className="space-y-10">

          {/* ── 1-Click integrations ── */}
          <section>
            <div className="mb-1 flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              <h2 className="text-sm font-semibold">1-Click integrations</h2>
            </div>
            <p className="mb-4 text-xs text-muted-foreground">Connect your integrations here.</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredIntegrations.map((integration) => (
                <OneClickIntegrationCard
                  key={integration.id}
                  integration={integration}
                  onConnect={handleConnectIntegration}
                />
              ))}
              {filteredIntegrations.length === 0 && (
                <p className="col-span-full text-sm text-muted-foreground">No integrations match your search.</p>
              )}
            </div>
          </section>

          <div className="h-px bg-border/50" />

          {/* ── External MCP servers ── */}
          <section>
            <div className="mb-1 flex items-center gap-2">
              <Cable className="h-4 w-4 text-cyan-500" />
              <h2 className="text-sm font-semibold">External MCP servers</h2>
            </div>
            <p className="mb-4 text-xs text-muted-foreground">Connect your own MCP servers here.</p>
            {isMcpLoading ? (
              <div className="flex h-24 items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <McpConnectionList
                connections={mcpConnections || []}
                onCreate={handleCreateMcp}
                onEdit={handleEditMcp}
                onDelete={handleDeleteMcp}
                onToggle={handleToggleMcp}
              />
            )}
          </section>

          <div className="h-px bg-border/50" />

          {/* ── Custom actions ── */}
          <section>
            <div className="mb-1 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-violet-500" />
              <h2 className="text-sm font-semibold">Custom actions</h2>
            </div>
            <p className="mb-4 text-xs text-muted-foreground">Build and manage your own API-backed skills.</p>
            <ActionList
              actions={actions || []}
              enabledActionsCount={enabledCustomActions}
              currentUsage={totalSlotsUsed}
              onCreate={handleCreate}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggle={handleToggleAction}
            />
          </section>

        </div>
      </div>
    </div>
  );
}
