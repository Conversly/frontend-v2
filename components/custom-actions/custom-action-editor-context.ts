import { createContext, useContext } from "react";

export interface CustomActionEditorController {
  handleTest: () => Promise<void>;
  handleSave: (saveMode: "draft" | "publish") => Promise<void>;
}

export const CustomActionEditorActionsContext =
  createContext<CustomActionEditorController | null>(null);

export const useCustomActionEditorActions = () => {
  const value = useContext(CustomActionEditorActionsContext);

  if (!value) {
    throw new Error(
      "useCustomActionEditorActions must be used within CustomActionForm.",
    );
  }

  return value;
};
