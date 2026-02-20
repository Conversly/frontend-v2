"use client";

// Thin workspace-specific wrapper around the generic UpgradeDialog.
// Kept for backwards-compat if other files already import this path.
export { UpgradeDialog as WorkspaceUpgradeDialog } from "@/components/billingsdk/UpgradeDialog";
export type { UpgradeDialogProps as WorkspaceUpgradeDialogProps } from "@/components/billingsdk/UpgradeDialog";
