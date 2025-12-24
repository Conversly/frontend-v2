"use client";

import { RoleGuard } from "@/components/auth/role-guard";
import { AuditLogsView } from "@/components/admin/audit-logs-view";

export default function AuditLogsPage() {
  return (
    <RoleGuard requireOwner>
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Audit Logs</h1>
          <p className="text-muted-foreground mt-2">
            Track all workspace activities, member changes, and system events
          </p>
        </div>
        <AuditLogsView />
      </div>
    </RoleGuard>
  );
}



