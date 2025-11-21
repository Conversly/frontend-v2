"use client";

import React, { useState } from 'react';
import { CustomAction } from '@/types/customActions';
import { ActionList } from '@/components/custom-actions/ActionList';
import { CustomActionForm } from '@/components/custom-actions/CustomActionForm';
import { useParams } from 'next/navigation';
import {
  useCustomActions,
  useCreateCustomAction,
  useUpdateCustomAction,
  useDeleteCustomAction,
} from '@/services/actions';
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
    <div className="h-full w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 px-4">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Custom Actions</h1>
        <p className="text-muted-foreground">
          Connect your chatbot to external APIs and services. Define actions that the AI can call during conversations.
        </p>
      </div>

      {view === 'list' ? (
        <ActionList
          actions={actions || []}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <CustomActionForm
          chatbotId={chatbotId}
          existingAction={selectedAction}
          onSave={handleSave}
          onCancel={() => setView('list')}
        />
      )}
    </div>
  );
}
