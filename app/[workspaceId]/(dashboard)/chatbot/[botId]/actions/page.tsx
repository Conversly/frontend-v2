"use client";

import React, { useState } from 'react';
import { CustomAction } from '@/types/customActions';
import { ActionList } from '@/components/custom-actions/ActionList';
import { SkillWizard } from '@/components/custom-actions/SkillWizard';
import { useParams } from 'next/navigation';
import {
  useCustomActions,
  useCreateCustomAction,
  useUpdateCustomAction,
  useDeleteCustomAction,
} from '@/services/actions';
import { Separator } from "@/components/ui/separator";
import { Loader2 } from 'lucide-react';

export default function ActionsPage() {
  const params = useParams();
  const chatbotId = params.botId as string;

  const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedAction, setSelectedAction] = useState<CustomAction | undefined>(undefined);

  const { data: actions, isLoading } = useCustomActions({ chatbotId });
  const createAction = useCreateCustomAction();
  const updateAction = useUpdateCustomAction();
  const deleteAction = useDeleteCustomAction();

  const handleCreate = () => {
    setSelectedAction(undefined);
    setView('create');
  };

  const handleEdit = (action: CustomAction) => {
    setSelectedAction(action);
    setView('edit');
  };

  const handleDelete = (actionId: string) => {
    if (confirm('Are you sure you want to delete this action?')) {
      deleteAction.mutate({ chatbotId, actionId });
    }
  };

  const handleSave = async (action: CustomAction) => {
    try {
      if (view === 'create') {
        await createAction.mutateAsync({
          chatbotId,
          name: action.name,
          displayName: action.displayName,
          description: action.description,
          apiConfig: action.apiConfig,
          parameters: action.parameters,
          triggerExamples: action.triggerExamples,
        });
      } else {
        if (!action.id) return;
        await updateAction.mutateAsync({
          chatbotId,
          actionId: action.id,
          name: action.name,
          displayName: action.displayName,
          description: action.description,
          apiConfig: action.apiConfig,
          parameters: action.parameters,
          triggerExamples: action.triggerExamples,
        });
      }
      setView('list');
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-background overflow-hidden flex flex-col">

      {view === 'list' ? (
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-6 py-6 max-w-[1920px]">

            <ActionList
              actions={actions || []}
              onCreate={handleCreate}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      ) : (
        <SkillWizard
          chatbotId={chatbotId}
          existingAction={selectedAction}
          onSave={handleSave}
          onCancel={() => setView('list')}
        />
      )}
    </div>
  );
}