"use client";

import React, { useCallback, useState } from "react";
import { useParams } from "next/navigation";
import { BrainCircuit, Cable, Loader2, Play, Sparkles } from "lucide-react";
import { FeatureGuard } from "@/components/shared/FeatureGuard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActionList } from "@/components/custom-actions/ActionList";
import {
  CustomActionForm,
  useCustomActionForm,
} from "@/components/custom-actions/CustomActionForm";
import { ActionPlaygroundPanel } from "@/components/custom-actions/ActionPlaygroundPanel";
import {
  useCreateCustomAction,
  useCustomActions,
  useDeleteCustomAction,
  useUpdateCustomAction,
} from "@/services/actions";
import type { CustomAction, CustomActionStatus } from "@/types/customActions";
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
import type { ActionFormTab } from "@/utils/customActionValidation";

type EditorView = "list" | "create" | "edit";

interface ActionEditorViewProps {
  workspaceId: string;
  chatbotId: string;
  existingAction?: CustomAction;
  playgroundVersion: number;
  onSave: (
    action: CustomAction,
    saveMode: "draft" | "publish",
  ) => Promise<CustomAction>;
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
        <div className="text-center py-12 text-muted-foreground">
          You do not have permission to manage actions.
        </div>
      }
    >
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as ActionFormTab)}
        className="flex h-full flex-col"
      >
        <div className="customization-tabs__bar flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          <TabsList
            variant="mindtickle"
            className="customization-tabs__list flex-1 max-w-full lg:max-w-[840px]"
          >
            <TabsTrigger
              value="behavior"
              variant="mindtickle"
              className="customization-tabs__trigger font-sans"
            >
              <Sparkles className="customization-tabs__icon w-4 h-4" />
              Behavior
            </TabsTrigger>
            <TabsTrigger
              value="inputs"
              variant="mindtickle"
              className="customization-tabs__trigger font-sans"
            >
              <BrainCircuit className="customization-tabs__icon w-4 h-4" />
              Inputs
            </TabsTrigger>
            <TabsTrigger
              value="connection"
              variant="mindtickle"
              className="customization-tabs__trigger font-sans"
            >
              <Cable className="customization-tabs__icon w-4 h-4" />
              Connection
            </TabsTrigger>
            <TabsTrigger
              value="test-output"
              variant="mindtickle"
              className="customization-tabs__trigger font-sans"
            >
              <Play className="customization-tabs__icon w-4 h-4" />
              Test &amp; Output
            </TabsTrigger>
          </TabsList>

          <div className="customization-tabs__actions flex flex-wrap items-center gap-3 shrink-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onBackToActions}
            >
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

        <div className="flex-1 grid min-h-0 gap-6 lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_460px] overflow-hidden">
          <div className="min-w-0 min-h-0 overflow-y-auto pr-2">
            <CustomActionForm controller={controller} />
          </div>

          <div className="hidden lg:block min-h-0 overflow-y-auto no-scrollbar">
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

  const [view, setView] = useState<EditorView>("list");
  const [editingAction, setEditingAction] = useState<CustomAction | undefined>(
    undefined,
  );
  const [playgroundVersion, setPlaygroundVersion] = useState(0);

  const { data: actions, isLoading } = useCustomActions({ chatbotId });
  const createAction = useCreateCustomAction();
  const updateAction = useUpdateCustomAction();
  const deleteAction = useDeleteCustomAction();

  const handleCreate = useCallback(() => {
    setEditingAction(undefined);
    setView("create");
  }, []);

  const handleEdit = useCallback((action: CustomAction) => {
    setEditingAction(action);
    setView("edit");
  }, []);

  const handleBackToActions = useCallback(() => {
    setView("list");
    setEditingAction(undefined);
  }, []);

  const handleDelete = useCallback(
    (actionId: string) => {
      if (confirm("Are you sure you want to delete this action?")) {
        deleteAction.mutate({ chatbotId, actionId });
      }
    },
    [chatbotId, deleteAction],
  );

  const handleSave = useCallback(
    async (action: CustomAction, saveMode: "draft" | "publish") => {
      try {
        const status: CustomActionStatus =
          saveMode === "draft" ? "DRAFT" : "PUBLISHED";
        let savedAction: CustomAction;

        if (view === "create") {
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
            status:
              action.status === "DRAFT" || saveMode === "draft"
                ? status
                : undefined,
            accessLevel: action.accessLevel,
            requiredContactFields: action.requiredContactFields,
            triggerExamples: action.triggerExamples,
            apiConfig: action.apiConfig,
            parameters: action.parameters,
          });
        }

        setEditingAction(savedAction);
        setPlaygroundVersion((prev) => prev + 1);
        setView("edit");

        return savedAction;
      } catch (error) {
        throw error;
      }
    },
    [chatbotId, createAction, updateAction, view],
  );

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-background overflow-hidden flex flex-col">
      {view === "list" ? (
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-6 py-6 max-w-[1280px]">
            <ActionList
              actions={actions || []}
              onCreate={handleCreate}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-hidden">
          <div className="container mx-auto px-6 py-6 max-w-[1920px] h-full">
            <ActionEditorView
              workspaceId={workspaceId}
              chatbotId={chatbotId}
              existingAction={editingAction}
              playgroundVersion={playgroundVersion}
              onSave={handleSave}
              onBackToActions={handleBackToActions}
            />
          </div>
        </div>
      )}
    </div>
  );
}
