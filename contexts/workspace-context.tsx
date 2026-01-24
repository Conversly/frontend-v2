"use client";

import React, { createContext, useContext } from "react";
import type { WorkspaceContext as WorkspaceContextType } from "@/types/permissions";

const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

export function WorkspaceProvider({
  value,
  children,
}: {
  value: WorkspaceContextType;
  children: React.ReactNode;
}) {
  if (!value) {
    throw new Error("WorkspaceContext value is required");
  }

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) {
    throw new Error("useWorkspace must be used within WorkspaceProvider");
  }
  return ctx;
}

export function useMaybeWorkspace() {
  return useContext(WorkspaceContext);
}

