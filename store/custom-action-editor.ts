"use client";

import { create } from "zustand";
import type {
  CustomAction,
  TestResult,
  ToolParameter,
} from "@/types/customActions";
import {
  type ActionFormErrors,
  type ActionFormTab,
  validateActionForDraft,
  validateActionForSave,
} from "@/utils/customActionValidation";

export type CustomActionEditorMode = "create" | "edit";

interface CustomActionEditorState {
  chatbotId: string;
  mode: CustomActionEditorMode;
  formData: CustomAction;
  initialSnapshot?: CustomAction;
  lastSavedAction?: CustomAction;
  activeTab: ActionFormTab;
  errors: ActionFormErrors;
  testValues: Record<string, string>;
  testResult: TestResult | null;
  testing: boolean;
  saving: boolean;

  initializeForCreate: (chatbotId: string) => void;
  initializeForEdit: (chatbotId: string, action: CustomAction) => void;
  resetEditor: () => void;
  setActiveTab: (tab: ActionFormTab) => void;
  updateField: (path: string, value: any) => void;
  replaceParameters: (parameters: ToolParameter[]) => void;
  setErrors: (errors: ActionFormErrors) => void;
  clearErrorsForPath: (path: string) => void;
  setTestValue: (name: string, value: string) => void;
  setTestResult: (result: TestResult | null) => void;
  setTesting: (testing: boolean) => void;
  setSaving: (saving: boolean) => void;
  markSaved: (savedAction: CustomAction) => void;
}

export const buildDefaultAction = (chatbotId: string): CustomAction => ({
  id: "",
  chatbotId,
  name: "",
  displayName: "",
  description: "",
  status: "DRAFT",
  isEnabled: true,
  accessLevel: "anonymous",
  requiredContactFields: [],
  apiConfig: {
    method: "GET",
    baseUrl: "",
    endpoint: "",
    staticHeaders: {},
    staticBody: undefined,
    responseMapping: "",
    successCodes: [200],
    timeoutSeconds: 30,
    retryCount: 0,
    authType: "none",
    authValue: "",
    followRedirects: true,
    verifySsl: true,
  },
  parameters: [],
  triggerExamples: [],
  version: 1,
  createdAt: null,
  updatedAt: null,
  lastTestedAt: null,
  testStatus: null,
});

export const buildInitialAction = (
  chatbotId: string,
  existingAction?: CustomAction,
): CustomAction => {
  const base = buildDefaultAction(chatbotId);
  if (!existingAction) return base;

  return {
    ...base,
    ...existingAction,
    chatbotId,
    apiConfig: {
      ...base.apiConfig,
      ...(existingAction.apiConfig || {}),
    },
    parameters: existingAction.parameters || [],
    triggerExamples: existingAction.triggerExamples || [],
  };
};

export function toComparableAction(action?: CustomAction | null) {
  if (!action) return null;

  return {
    name: action.name,
    displayName: action.displayName,
    description: action.description,
    status: action.status,
    accessLevel: action.accessLevel ?? "anonymous",
    requiredContactFields: action.requiredContactFields ?? [],
    triggerExamples: action.triggerExamples ?? [],
    apiConfig: action.apiConfig,
    parameters: action.parameters ?? [],
  };
}

function stringifyDefaultValue(value: any): string {
  if (value === undefined) return "";
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

export function buildInitialTestValues(
  parameters?: ToolParameter[],
): Record<string, string> {
  const initial: Record<string, string> = {};

  (parameters || []).forEach((param) => {
    initial[param.name] = stringifyDefaultValue(param.default);
  });

  return initial;
}

function syncTestValues(
  parameters: ToolParameter[],
  previous: Record<string, string>,
): Record<string, string> {
  const next: Record<string, string> = {};

  for (const param of parameters) {
    if (Object.prototype.hasOwnProperty.call(previous, param.name)) {
      next[param.name] = previous[param.name] ?? "";
      continue;
    }

    next[param.name] = stringifyDefaultValue(param.default);
  }

  return next;
}

function clearErrorsForPath(
  errors: ActionFormErrors,
  path: string,
): ActionFormErrors {
  if (!errors || Object.keys(errors).length === 0) return errors;

  const next: ActionFormErrors = {};
  const prefix = `${path}.`;

  for (const [key, value] of Object.entries(errors)) {
    if (key === path) continue;
    if (key.startsWith(prefix)) continue;
    next[key] = value;
  }

  return next;
}

const initialFormData = buildDefaultAction("");

export const useCustomActionEditorStore = create<CustomActionEditorState>(
  (set, get) => ({
    chatbotId: "",
    mode: "create",
    formData: initialFormData,
    initialSnapshot: undefined,
    lastSavedAction: undefined,
    activeTab: "behavior",
    errors: {},
    testValues: {},
    testResult: null,
    testing: false,
    saving: false,

    initializeForCreate: (chatbotId) => {
      const formData = buildInitialAction(chatbotId);
      set({
        chatbotId,
        mode: "create",
        formData,
        initialSnapshot: formData,
        lastSavedAction: undefined,
        activeTab: "behavior",
        errors: {},
        testValues: buildInitialTestValues(formData.parameters),
        testResult: null,
        testing: false,
        saving: false,
      });
    },

    initializeForEdit: (chatbotId, action) => {
      const formData = buildInitialAction(chatbotId, action);
      set({
        chatbotId,
        mode: "edit",
        formData,
        initialSnapshot: formData,
        lastSavedAction: formData,
        activeTab: "behavior",
        errors: {},
        testValues: buildInitialTestValues(formData.parameters),
        testResult: null,
        testing: false,
        saving: false,
      });
    },

    resetEditor: () => {
      set({
        chatbotId: "",
        mode: "create",
        formData: buildDefaultAction(""),
        initialSnapshot: undefined,
        lastSavedAction: undefined,
        activeTab: "behavior",
        errors: {},
        testValues: {},
        testResult: null,
        testing: false,
        saving: false,
      });
    },

    setActiveTab: (activeTab) => set({ activeTab }),

    updateField: (path, value) => {
      set((state) => {
        const keys = path.split(".");
        let nextFormData: CustomAction;

        if (keys.length === 1) {
          nextFormData = { ...state.formData, [keys[0]]: value };
        } else {
          nextFormData = { ...state.formData };
          let current: any = nextFormData;

          for (let i = 0; i < keys.length - 1; i += 1) {
            current[keys[i]] = { ...current[keys[i]] };
            current = current[keys[i]];
          }

          current[keys[keys.length - 1]] = value;
        }

        const nextTestValues =
          keys[0] === "parameters"
            ? syncTestValues(nextFormData.parameters, state.testValues)
            : state.testValues;

        return {
          formData: nextFormData,
          errors: clearErrorsForPath(state.errors, path),
          testValues: nextTestValues,
        };
      });
    },

    replaceParameters: (parameters) => {
      set((state) => ({
        formData: {
          ...state.formData,
          parameters,
        },
        errors: clearErrorsForPath(state.errors, "parameters"),
        testValues: syncTestValues(parameters, state.testValues),
      }));
    },

    setErrors: (errors) => set({ errors }),
    clearErrorsForPath: (path) =>
      set((state) => ({ errors: clearErrorsForPath(state.errors, path) })),
    setTestValue: (name, value) =>
      set((state) => ({
        testValues: { ...state.testValues, [name]: value },
      })),
    setTestResult: (testResult) => set({ testResult }),
    setTesting: (testing) => set({ testing }),
    setSaving: (saving) => set({ saving }),

    markSaved: (savedAction) => {
      const chatbotId = get().chatbotId || savedAction.chatbotId;
      const formData = buildInitialAction(chatbotId, savedAction);

      set((state) => ({
        chatbotId,
        mode: "edit",
        formData,
        initialSnapshot: formData,
        lastSavedAction: formData,
        testValues: syncTestValues(formData.parameters, state.testValues),
      }));
    },
  }),
);

export const useEditorMode = () =>
  useCustomActionEditorStore((state) => state.mode);
export const useEditorFormData = () =>
  useCustomActionEditorStore((state) => state.formData);
export const useEditorApiConfig = () =>
  useCustomActionEditorStore((state) => state.formData.apiConfig);
export const useEditorParameters = () =>
  useCustomActionEditorStore((state) => state.formData.parameters);
export const useEditorTestResult = () =>
  useCustomActionEditorStore((state) => state.testResult);
export const useEditorTesting = () =>
  useCustomActionEditorStore((state) => state.testing);
export const useEditorSaving = () =>
  useCustomActionEditorStore((state) => state.saving);
export const useEditorErrors = () =>
  useCustomActionEditorStore((state) => state.errors);
export const useEditorTestValues = () =>
  useCustomActionEditorStore((state) => state.testValues);
export const useEditorActiveTab = () =>
  useCustomActionEditorStore((state) => state.activeTab);
export const useEditorLastSavedAction = () =>
  useCustomActionEditorStore((state) => state.lastSavedAction);

export const useInitializeEditorForCreate = () =>
  useCustomActionEditorStore((state) => state.initializeForCreate);
export const useInitializeEditorForEdit = () =>
  useCustomActionEditorStore((state) => state.initializeForEdit);
export const useResetCustomActionEditor = () =>
  useCustomActionEditorStore((state) => state.resetEditor);
export const useEditorSetActiveTab = () =>
  useCustomActionEditorStore((state) => state.setActiveTab);
export const useEditorUpdateField = () =>
  useCustomActionEditorStore((state) => state.updateField);
export const useEditorReplaceParameters = () =>
  useCustomActionEditorStore((state) => state.replaceParameters);
export const useEditorSetErrors = () =>
  useCustomActionEditorStore((state) => state.setErrors);
export const useEditorSetTestValue = () =>
  useCustomActionEditorStore((state) => state.setTestValue);
export const useEditorSetTestResult = () =>
  useCustomActionEditorStore((state) => state.setTestResult);
export const useEditorSetTesting = () =>
  useCustomActionEditorStore((state) => state.setTesting);
export const useEditorSetSaving = () =>
  useCustomActionEditorStore((state) => state.setSaving);
export const useEditorMarkSaved = () =>
  useCustomActionEditorStore((state) => state.markSaved);

export const useEditorHasUnsavedChanges = () =>
  useCustomActionEditorStore((state) => {
    if (!state.lastSavedAction?.id) return false;

    return (
      JSON.stringify(toComparableAction(state.formData)) !==
      JSON.stringify(toComparableAction(state.lastSavedAction))
    );
  });

export const useEditorIsDraftValid = () =>
  useCustomActionEditorStore(
    (state) => validateActionForDraft(state.formData).ok,
  );

export const useEditorIsFullSaveValid = () =>
  useCustomActionEditorStore(
    (state) => validateActionForSave(state.formData).ok,
  );

export const useEditorCanSaveDraft = () =>
  useCustomActionEditorStore(
    (state) =>
      !state.lastSavedAction || state.lastSavedAction.status === "DRAFT",
  );

export const useEditorSaveActionLabel = () =>
  useCustomActionEditorStore((state) =>
    state.lastSavedAction?.status === "DRAFT"
      ? "Publish Action"
      : "Save Action",
  );

export const useEditorPlaygroundEnabled = () =>
  useCustomActionEditorStore(
    (state) =>
      Boolean(state.lastSavedAction?.id) &&
      validateActionForSave(state.formData).ok,
  );
