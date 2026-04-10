"use client";

import React, { useCallback, useState } from "react";
import { useParams } from "next/navigation";
import { Bot, BrainCircuit, Cable, Loader2, Play, Plus, Sparkles } from "lucide-react";
import { FeatureGuard } from "@/components/shared/FeatureGuard";
import { ActionList } from "@/components/custom-actions/ActionList";
import { ActionPlaygroundPanel } from "@/components/custom-actions/ActionPlaygroundPanel";
import { CustomActionForm, useCustomActionForm } from "@/components/custom-actions/CustomActionForm";
import { McpConnectionForm } from "@/components/mcp/McpConnectionForm";
import { McpConnectionList } from "@/components/mcp/McpConnectionList";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAccessControl } from "@/hooks/useAccessControl";
import {
  useCreateCustomAction,
  useCustomActions,
  useDeleteCustomAction,
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
import type { CustomAction, CustomActionStatus } from "@/types/customActions";
import type { McpConnectionSummary } from "@/types/mcp";
import type { ActionFormTab } from "@/utils/customActionValidation";

interface ActionEditorViewProps {
  workspaceId: string;
  chatbotId: string;
  existingAction?: CustomAction;
  playgroundVersion: number;
  onSave: (action: CustomAction, saveMode: "draft" | "publish") => Promise<CustomAction>;
  onBackToActions: () => void;
}

function ActionEditorView({
  workspaceId,
  chatbotId,
  existingAction,
  playgroundVersion,
  onSave,
  onBackToActions,
}: ActionEditorViewProps) {
  const controller = useCustomActionForm({
    chatbotId,
    existingAction,
    onSave,
  });

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
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as ActionFormTab)}
        className="flex h-full flex-col"
      >
        <div className="customization-tabs__bar mb-6 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
          <TabsList
            variant="mindtickle"
            className="customization-tabs__list flex-1 max-w-full lg:max-w-[840px]"
          >
            <TabsTrigger value="behavior" variant="mindtickle" className="customization-tabs__trigger font-sans">
              <Sparkles className="customization-tabs__icon h-4 w-4" />
              Behavior
            </TabsTrigger>
            <TabsTrigger value="inputs" variant="mindtickle" className="customization-tabs__trigger font-sans">
              <BrainCircuit className="customization-tabs__icon h-4 w-4" />
              Inputs
            </TabsTrigger>
            <TabsTrigger value="connection" variant="mindtickle" className="customization-tabs__trigger font-sans">
              <Cable className="customization-tabs__icon h-4 w-4" />
              Connection
            </TabsTrigger>
            <TabsTrigger value="test-output" variant="mindtickle" className="customization-tabs__trigger font-sans">
              <Play className="customization-tabs__icon h-4 w-4" />
              Test &amp; Output
            </TabsTrigger>
          </TabsList>

          <div className="customization-tabs__actions flex shrink-0 flex-wrap items-center gap-3">
            <Button type="button" variant="outline" size="sm" onClick={onBackToActions}>
              Back to actions
            </Button>
            {hasUnsavedChanges ? (
              <Badge variant="warning" className="shrink-0">
                Unsaved changes
              </Badge>
            ) : null}
            {canSaveDraft ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => void controller.handleSave("draft")}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save as Draft"}
              </Button>
            ) : null}
            <Button
              type="button"
              size="sm"
              onClick={() => void controller.handleSave("publish")}
              disabled={saving}
              className="min-w-[110px]"
            >
              {saving ? "Saving..." : saveActionLabel}
            </Button>
          </div>
        </div>

        <div className="flex-1 grid min-h-0 gap-6 overflow-hidden lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_460px]">
          <div className="min-w-0 min-h-0 overflow-y-auto pr-2">
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
      </Tabs>
    </FeatureGuard>
  );
}

export default function ActionsPage() {
  const params = useParams<{ workspaceId: string; botId: string }>();
  const workspaceId = params.workspaceId as string;
  const chatbotId = params.botId as string;

  const accessControl = useAccessControl(workspaceId);

  const [activeTab, setActiveTab] = useState<"custom-actions" | "mcp-servers">("custom-actions");
  const [actionView, setActionView] = useState<"list" | "create" | "edit">("list");
  const [mcpView, setMcpView] = useState<"list" | "create" | "edit">("list");
  const [selectedAction, setSelectedAction] = useState<CustomAction | undefined>(undefined);
  const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);
  const [playgroundVersion, setPlaygroundVersion] = useState(0);

  const { data: actions, isLoading } = useCustomActions({ chatbotId });
  const { data: mcpConnections, isLoading: isMcpLoading } = useMcpConnections({ chatbotId });
  const { data: selectedMcpConnection, isLoading: isMcpConnectionLoading } = useMcpConnection(
    { chatbotId, connectionId: selectedConnectionId || "" },
    activeTab === "mcp-servers" && mcpView === "edit" && !!selectedConnectionId,
  );

  const createAction = useCreateCustomAction();
  const updateAction = useUpdateCustomAction();
  const deleteAction = useDeleteCustomAction();
  const deleteMcpConnection = useDeleteMcpConnection();
  const toggleMcpConnection = useToggleMcpConnection();

  const enabledCustomActions = (actions || []).filter((action) => action.isEnabled).length;
  const enabledMcpTools = (mcpConnections || []).reduce(
    (sum, connection) => sum + (connection.isEnabled ? connection.enabledToolCount : 0),
    0,
  );
  const totalActionSlotsUsed = enabledCustomActions + enabledMcpTools;
  const actionLimit = accessControl.actions.limit;

  const handleCreate = () => {
    setSelectedAction(undefined);
    setActionView("create");
    setActiveTab("custom-actions");
  };

  const handleEdit = (action: CustomAction) => {
    setSelectedAction(action);
    setActionView("edit");
    setActiveTab("custom-actions");
  };

  const handleBackToActions = useCallback(() => {
    setActionView("list");
    setSelectedAction(undefined);
  }, []);

  const handleDelete = (actionId: string) => {
    if (confirm("Are you sure you want to delete this action?")) {
      deleteAction.mutate({ chatbotId, actionId });
    }
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
        if (!action.id) {
          throw new Error("Action id is required to update an action.");
        }
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

  const handleCreateMcp = () => {
    setSelectedConnectionId(null);
    setMcpView("create");
    setActiveTab("mcp-servers");
  };

  const handleEditMcp = (connection: McpConnectionSummary) => {
    setSelectedConnectionId(connection.id);
    setMcpView("edit");
    setActiveTab("mcp-servers");
  };

  const handleDeleteMcp = (connectionId: string) => {
    if (confirm("Are you sure you want to delete this MCP server?")) {
      deleteMcpConnection.mutate({ chatbotId, connectionId });
    }
  };

  const handleToggleMcp = (connection: McpConnectionSummary, isEnabled: boolean) => {
    toggleMcpConnection.mutate({
      chatbotId,
      connectionId: connection.id,
      isEnabled,
    });
  };

  if (isLoading || isMcpLoading || accessControl.isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-background overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-[1280px] px-6 py-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-semibold tracking-tight">Actions</h1>
                <Badge variant="outline">DEV managed</Badge>
              </div>
              <p className="max-w-3xl text-sm text-muted-foreground">
                Add new capabilities to this chatbot either by building custom actions or by connecting an MCP server.
                Enabled custom actions and enabled MCP tools share the same action slot quota.
              </p>
            </div>

            <Card className="border-border/70 shadow-none">
              <CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="rounded-2xl border border-border/70 bg-muted/20 px-4 py-3">
                    <div className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                      Slots in use
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-2xl font-semibold">{totalActionSlotsUsed}</span>
                      <span className="text-sm text-muted-foreground">
                        {actionLimit === -1 ? "Unlimited plan" : `of ${actionLimit}`}
                      </span>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border/70 bg-muted/20 px-4 py-3">
                    <div className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                      Custom actions
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm">
                      <Bot className="h-4 w-4 text-muted-foreground" />
                      {enabledCustomActions} enabled
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border/70 bg-muted/20 px-4 py-3">
                    <div className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                      MCP tools
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm">
                      <Cable className="h-4 w-4 text-muted-foreground" />
                      {enabledMcpTools} enabled
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <FeatureGuard feature="actions" currentUsage={totalActionSlotsUsed}>
                    <Button onClick={handleCreate}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Custom Action
                    </Button>
                  </FeatureGuard>
                  <FeatureGuard feature="actions">
                    <Button variant="outline" onClick={handleCreateMcp}>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Integrate MCP
                    </Button>
                  </FeatureGuard>
                </div>
              </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "custom-actions" | "mcp-servers")}>
              <TabsList variant="underline">
                <TabsTrigger value="custom-actions" variant="underline">
                  Custom Actions
                  <Badge variant="secondary" className="ml-1">
                    {(actions || []).length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="mcp-servers" variant="underline">
                  MCP Servers
                  <Badge variant="secondary" className="ml-1">
                    {(mcpConnections || []).length}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="custom-actions" className="mt-6">
                {actionView === "list" ? (
                  <ActionList
                    actions={actions || []}
                    enabledActionsCount={enabledCustomActions}
                    currentUsage={totalActionSlotsUsed}
                    onCreate={handleCreate}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ) : (
                  <div className="overflow-hidden">
                    <div className="mx-auto h-[calc(100vh-280px)] min-h-[640px] max-w-[1920px]">
                      <ActionEditorView
                        workspaceId={workspaceId}
                        chatbotId={chatbotId}
                        existingAction={selectedAction}
                        playgroundVersion={playgroundVersion}
                        onSave={handleSave}
                        onBackToActions={handleBackToActions}
                      />
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="mcp-servers" className="mt-6">
                {mcpView === "list" ? (
                  <McpConnectionList
                    connections={mcpConnections || []}
                    onCreate={handleCreateMcp}
                    onEdit={handleEditMcp}
                    onDelete={handleDeleteMcp}
                    onToggle={handleToggleMcp}
                  />
                ) : isMcpConnectionLoading ? (
                  <div className="flex h-64 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <FeatureGuard
                    feature="actions"
                    fallback={
                      <div className="py-12 text-center text-muted-foreground">
                        You do not have permission to manage MCP servers.
                      </div>
                    }
                  >
                    <McpConnectionForm
                      chatbotId={chatbotId}
                      existingConnection={mcpView === "edit" ? selectedMcpConnection || null : null}
                      onSaved={() => {
                        setMcpView("list");
                        setSelectedConnectionId(null);
                      }}
                      onCancel={() => {
                        setMcpView("list");
                        setSelectedConnectionId(null);
                      }}
                    />
                  </FeatureGuard>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
