"use client";

import React, { useCallback, useMemo, useState } from "react";
import { CustomAction, CustomActionStatus } from "@/types/customActions";
import { ActionList } from "@/components/custom-actions/ActionList";
import { CustomActionForm } from "@/components/custom-actions/CustomActionForm";
import { ActionPlaygroundPanel } from "@/components/custom-actions/ActionPlaygroundPanel";
import { useParams } from "next/navigation";
import {
  useCustomActions,
  useCreateCustomAction,
  useUpdateCustomAction,
  useDeleteCustomAction,
} from "@/services/actions";
import { Loader2, ArrowLeft } from "lucide-react";
import { FeatureGuard } from "@/components/shared/FeatureGuard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { validateActionForSave } from "@/utils/customActionValidation";

type EditorView = "list" | "create" | "edit";

function toComparableAction(action?: CustomAction | null) {
  if (!action) return null;

  return {
    name: action.name,
    description: action.description,
    status: action.status,
    accessLevel: action.accessLevel ?? "anonymous",
    requiredContactFields: action.requiredContactFields ?? [],
    triggerExamples: action.triggerExamples ?? [],
    apiConfig: action.apiConfig,
    parameters: action.parameters ?? [],
  };
}

export default function ActionsPage() {
  const params = useParams<{ workspaceId: string; botId: string }>();
  const workspaceId = params.workspaceId as string;
  const chatbotId = params.botId as string;

  const [view, setView] = useState<EditorView>("list");
  const [initialAction, setInitialAction] = useState<CustomAction | undefined>(
    undefined,
  );
  const [draftAction, setDraftAction] = useState<CustomAction | undefined>(
    undefined,
  );
  const [lastSavedAction, setLastSavedAction] = useState<
    CustomAction | undefined
  >(undefined);
  const [isFullSaveValid, setIsFullSaveValid] = useState(false);
  const [playgroundVersion, setPlaygroundVersion] = useState(0);

  const { data: actions, isLoading } = useCustomActions({ chatbotId });
  const createAction = useCreateCustomAction();
  const updateAction = useUpdateCustomAction();
  const deleteAction = useDeleteCustomAction();

  const handleCreate = useCallback(() => {
    setInitialAction(undefined);
    setDraftAction(undefined);
    setLastSavedAction(undefined);
    setIsFullSaveValid(false);
    setView("create");
  }, []);

  const handleEdit = useCallback((action: CustomAction) => {
    setInitialAction(action);
    setDraftAction(action);
    setLastSavedAction(action);
    setIsFullSaveValid(validateActionForSave(action).ok);
    setView("edit");
  }, []);

  const handleBackToActions = useCallback(() => {
    setView("list");
    setInitialAction(undefined);
    setDraftAction(undefined);
    setLastSavedAction(undefined);
    setIsFullSaveValid(false);
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

        setInitialAction(savedAction);
        setDraftAction(savedAction);
        setLastSavedAction(savedAction);
        setIsFullSaveValid(validateActionForSave(savedAction).ok);
        setPlaygroundVersion((prev) => prev + 1);
        setView("edit");

        return savedAction;
      } catch (error) {
        // Error handling is done in the hook
        throw error;
      }
    },
    [chatbotId, createAction, updateAction, view],
  );

  const hasUnsavedChanges = useMemo(() => {
    if (!draftAction || !lastSavedAction?.id) return false;
    return (
      JSON.stringify(toComparableAction(draftAction)) !==
      JSON.stringify(toComparableAction(lastSavedAction))
    );
  }, [draftAction, lastSavedAction]);

  const playgroundEnabled = Boolean(lastSavedAction?.id) && isFullSaveValid;

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
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-6 py-6 max-w-[1280px]">
            <FeatureGuard
              feature="actions"
              fallback={
                <div className="text-center py-12 text-muted-foreground">
                  You do not have permission to manage actions.
                </div>
              }
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-fit px-0 text-muted-foreground hover:text-foreground"
                    onClick={handleBackToActions}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to actions
                  </Button>
                  {hasUnsavedChanges ? (
                    <Badge variant="warning" className="shrink-0">
                      Unsaved changes
                    </Badge>
                  ) : null}
                </div>

                <div className="grid min-h-0 gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
                  <div className="min-w-0">
                    <CustomActionForm
                      chatbotId={chatbotId}
                      existingAction={initialAction}
                      onSave={handleSave}
                      onChange={setDraftAction}
                      onValidityChange={setIsFullSaveValid}
                      onCancel={handleBackToActions}
                    />
                  </div>

                  <div className="hidden lg:block min-h-0">
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
            </FeatureGuard>
          </div>
        </div>
      )}
    </div>
  );
}
