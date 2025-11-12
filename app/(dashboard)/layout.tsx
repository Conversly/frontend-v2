"use client";

import { WorkspaceHeader } from "@/components/dashboard/workspace-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      {/* <WorkspaceHeader /> */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
