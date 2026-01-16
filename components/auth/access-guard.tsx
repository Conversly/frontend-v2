"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "@/contexts/workspace-context";
import type { WorkspaceCapabilities } from "@/types/permissions";

export function AccessGuard({
  capability,
  children,
  fallback,
}: {
  capability: keyof WorkspaceCapabilities;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { capabilities, workspaceId } = useWorkspace();

  if (!capabilities[capability]) {
    return (
      fallback ?? (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
          <ShieldAlert className="w-12 h-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Access denied</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-md">
            You don&apos;t have permission to view this page. Contact your workspace owner to request access.
          </p>
          <Link href={`/${workspaceId}/chatbot`}>
            <Button>Back to Chatbots</Button>
          </Link>
        </div>
      )
    );
  }

  return <>{children}</>;
}

