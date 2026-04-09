"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { CustomAction } from '@/types/customActions';
import { McpConnectionSummary } from '@/types/mcp';
import { ActionList } from '@/components/custom-actions/ActionList';
import { CustomActionForm } from '@/components/custom-actions/CustomActionForm';
import {
  useCustomActions,
  useCreateCustomAction,
  useUpdateCustomAction,
  useDeleteCustomAction,
} from '@/services/actions';
import {
  useDeleteMcpConnection,
  useMcpConnection,
  useMcpConnections,
  useToggleMcpConnection,
} from '@/services/mcp';
import { FeatureGuard } from '@/components/shared/FeatureGuard';
import { useAccessControl } from '@/hooks/useAccessControl';
import { McpConnectionList } from '@/components/mcp/McpConnectionList';
import { McpConnectionForm } from '@/components/mcp/McpConnectionForm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, Cable, Loader2, Plus, Sparkles } from 'lucide-react';

export default function ActionsPage() {
  const params = useParams();
  const chatbotId = params.botId as string;
  const workspaceId = params.workspaceId as string;

  const accessControl = useAccessControl(workspaceId);

  const [activeTab, setActiveTab] = useState<'custom-actions' | 'mcp-servers'>('custom-actions');
  const [actionView, setActionView] = useState<'list' | 'create' | 'edit'>('list');
  const [mcpView, setMcpView] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedAction, setSelectedAction] = useState<CustomAction | undefined>(undefined);
  const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);

  const { data: actions, isLoading } = useCustomActions({ chatbotId });
  const { data: mcpConnections, isLoading: isMcpLoading } = useMcpConnections({ chatbotId });
  const {
    data: selectedMcpConnection,
    isLoading: isMcpConnectionLoading,
  } = useMcpConnection(
    { chatbotId, connectionId: selectedConnectionId || '' },
    activeTab === 'mcp-servers' && mcpView === 'edit' && !!selectedConnectionId
  );

  const createAction = useCreateCustomAction();
  const updateAction = useUpdateCustomAction();
  const deleteAction = useDeleteCustomAction();
  const deleteMcpConnection = useDeleteMcpConnection();
  const toggleMcpConnection = useToggleMcpConnection();

  const enabledCustomActions = (actions || []).filter((action) => action.isEnabled).length;
  const enabledMcpTools = (mcpConnections || []).reduce((sum, connection) => {
    return sum + (connection.isEnabled ? connection.enabledToolCount : 0);
  }, 0);
  const totalActionSlotsUsed = enabledCustomActions + enabledMcpTools;
  const actionLimit = typeof accessControl.actions.limit === 'number' ? accessControl.actions.limit : -1;

  const handleCreate = () => {
    setSelectedAction(undefined);
    setActionView('create');
    setActiveTab('custom-actions');
  };

  const handleEdit = (action: CustomAction) => {
    setSelectedAction(action);
    setActionView('edit');
    setActiveTab('custom-actions');
  };

  const handleDelete = (actionId: string) => {
    if (confirm('Are you sure you want to delete this action?')) {
      deleteAction.mutate({ chatbotId, actionId });
    }
  };

  const handleSave = async (action: CustomAction) => {
    try {
      if (actionView === 'create') {
        await createAction.mutateAsync({
          chatbotId,
          name: action.name,
          description: action.description,
          accessLevel: action.accessLevel,
          requiredContactFields: action.requiredContactFields,
          apiConfig: action.apiConfig,
          parameters: action.parameters,
        });
      } else {
        if (!action.id) return;
        await updateAction.mutateAsync({
          chatbotId,
          actionId: action.id,
          name: action.name,
          description: action.description,
          accessLevel: action.accessLevel,
          requiredContactFields: action.requiredContactFields,
          apiConfig: action.apiConfig,
          parameters: action.parameters,
        });
      }
      setActionView('list');
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const handleCreateMcp = () => {
    setSelectedConnectionId(null);
    setMcpView('create');
    setActiveTab('mcp-servers');
  };

  const handleEditMcp = (connection: McpConnectionSummary) => {
    setSelectedConnectionId(connection.id);
    setMcpView('edit');
    setActiveTab('mcp-servers');
  };

  const handleDeleteMcp = (connectionId: string) => {
    if (confirm('Are you sure you want to delete this MCP server?')) {
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
                Add new capabilities to this chatbot either by building custom actions or by connecting an MCP server. Enabled custom actions and enabled MCP tools share the same action slot quota.
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
                        {actionLimit === -1 ? 'Unlimited plan' : `of ${actionLimit}`}
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

            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'custom-actions' | 'mcp-servers')}>
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
                {actionView === 'list' ? (
                  <ActionList
                    actions={actions || []}
                    enabledActionsCount={enabledCustomActions}
                    currentUsage={totalActionSlotsUsed}
                    onCreate={handleCreate}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ) : (
                  <FeatureGuard feature="actions" fallback={<div className="py-12 text-center text-muted-foreground">You do not have permission to manage actions.</div>}>
                    <CustomActionForm
                      chatbotId={chatbotId}
                      existingAction={selectedAction}
                      onSave={handleSave}
                      onCancel={() => setActionView('list')}
                    />
                  </FeatureGuard>
                )}
              </TabsContent>

              <TabsContent value="mcp-servers" className="mt-6">
                {mcpView === 'list' ? (
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
                  <FeatureGuard feature="actions" fallback={<div className="py-12 text-center text-muted-foreground">You do not have permission to manage MCP servers.</div>}>
                    <McpConnectionForm
                      chatbotId={chatbotId}
                      existingConnection={mcpView === 'edit' ? selectedMcpConnection || null : null}
                      onSaved={() => {
                        setMcpView('list');
                        setSelectedConnectionId(null);
                      }}
                      onCancel={() => {
                        setMcpView('list');
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
