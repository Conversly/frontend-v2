import React, { useEffect } from "react";
import { toast } from "sonner";
import { TabsContent } from "@/components/ui/tabs";
import { useTestCustomAction } from "@/services/actions";
import type { CustomAction } from "@/types/customActions";
import {
  CustomActionEditorActionsContext,
  type CustomActionEditorController,
} from "@/components/custom-actions/custom-action-editor-context";
import {
  formatValidationErrors,
  validateActionForDraft,
  validateActionForSave,
  validateActionForTest,
} from "@/utils/customActionValidation";
import {
  useCustomActionEditorStore,
  useEditorMarkSaved,
  useEditorSetActiveTab,
  useEditorSetErrors,
  useEditorSetSaving,
  useEditorSetTestResult,
  useEditorSetTesting,
  useInitializeEditorForCreate,
  useInitializeEditorForEdit,
  useResetCustomActionEditor,
} from "@/store/custom-action-editor";
import { BasicInfoStep } from "./steps/BasicInfoStep";
import { APIConfigStep } from "./steps/APIConfigStep";
import { ParametersStep } from "./steps/ParametersStep";
import { TestSection } from "./steps/TestAndSaveStep";
import { DataAccessStep } from "./steps/DataAccessStep";

interface UseCustomActionFormArgs {
  chatbotId: string;
  existingAction?: CustomAction;
  onSave: (
    action: CustomAction,
    saveMode: "draft" | "publish",
  ) => Promise<CustomAction>;
}

interface CustomActionFormProps {
  controller: CustomActionEditorController;
}

export function useCustomActionForm({
  chatbotId,
  existingAction,
  onSave,
}: UseCustomActionFormArgs): CustomActionEditorController {
  const initializeForCreate = useInitializeEditorForCreate();
  const initializeForEdit = useInitializeEditorForEdit();
  const resetEditor = useResetCustomActionEditor();
  const setActiveTab = useEditorSetActiveTab();
  const setErrors = useEditorSetErrors();
  const setTestResult = useEditorSetTestResult();
  const setTesting = useEditorSetTesting();
  const setSaving = useEditorSetSaving();
  const markSaved = useEditorMarkSaved();
  const { mutateAsync: testAction } = useTestCustomAction();

  useEffect(() => {
    if (existingAction) {
      initializeForEdit(chatbotId, existingAction);
      return;
    }

    initializeForCreate(chatbotId);
  }, [chatbotId, existingAction, initializeForCreate, initializeForEdit]);

  useEffect(() => resetEditor, [resetEditor]);

  const handleTest = async () => {
    const { formData, testValues } = useCustomActionEditorStore.getState();
    const validation = validateActionForTest(formData, testValues);

    if (!validation.ok) {
      setErrors(validation.errors);
      toast.error("Fix required fields before testing.", {
        description: formatValidationErrors(validation.errors),
      });
      setActiveTab(validation.tab);
      return;
    }

    setTesting(true);
    setTestResult(null);

    try {
      const result = await testAction({
        chatbotId,
        apiConfig: formData.apiConfig,
        parameters: formData.parameters,
        testArgs: formData.parameters.reduce(
          (acc, param) => {
            const raw = (testValues[param.name] ?? "").toString();

            if (param.source === "fixed") {
              return acc;
            }

            if (raw.length > 0) {
              acc[param.name] = raw;
              return acc;
            }

            if (param.default !== undefined && param.default !== "") {
              acc[param.name] = param.default;
            }

            return acc;
          },
          {} as Record<string, any>,
        ),
      });

      setTestResult({
        success: result.success,
        statusCode: result.statusCode,
        responseBody: result.responseBody,
        responseTime: result.responseTime,
        error: result.error,
        requestUrl: result.requestUrl,
        extractedData: result.extractedData,
      });
    } catch (error: any) {
      setTestResult({ success: false, error: error.message });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = async (saveMode: "draft" | "publish") => {
    const { formData } = useCustomActionEditorStore.getState();

    if (saveMode === "draft") {
      const validation = validateActionForDraft(formData);
      if (!validation.ok) {
        setErrors(validation.errors);
        toast.error(
          "Complete the basic action details before saving a draft.",
          {
            description: formatValidationErrors(validation.errors),
          },
        );
        setActiveTab(validation.tab);
        return;
      }

      setSaving(true);
      try {
        const savedAction = await onSave(formData, "draft");
        markSaved(savedAction);
      } finally {
        setSaving(false);
      }
      return;
    }

    const validation = validateActionForSave(formData);
    if (!validation.ok) {
      setErrors(validation.errors);
      toast.error("Fix required fields before saving.", {
        description: formatValidationErrors(validation.errors),
      });
      setActiveTab(validation.tab);
      return;
    }

    setSaving(true);
    try {
      const savedAction = await onSave(formData, "publish");
      markSaved(savedAction);
    } finally {
      setSaving(false);
    }
  };

  return {
    handleTest,
    handleSave,
  };
}

export const CustomActionForm: React.FC<CustomActionFormProps> = ({
  controller,
}) => {
  return (
    <CustomActionEditorActionsContext.Provider value={controller}>
      <div className="space-y-6 pb-6">
        <TabsContent value="behavior" className="mt-0">
          <BasicInfoStep />
        </TabsContent>

        <TabsContent value="inputs" className="mt-0">
          <ParametersStep />
        </TabsContent>

        <TabsContent value="connection" className="mt-0">
          <APIConfigStep />
        </TabsContent>

        <TabsContent value="test-output" className="mt-0">
          <div className="space-y-6">
            <TestSection />
            <DataAccessStep />
          </div>
        </TabsContent>
      </div>
    </CustomActionEditorActionsContext.Provider>
  );
};
