"use client";

import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard";
import { usePermissions } from "@/hooks/use-permissions";

export default function AnalyticsPage() {
  const { permissions } = usePermissions();
  const isOwner = permissions?.isOwner || false;

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Analytics & Insights</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive analytics and business insights for your workspace
        </p>
      </div>
      <AnalyticsDashboard isOwner={isOwner} />
    </div>
  );
}

