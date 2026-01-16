"use client";

import { useWorkspace } from "@/contexts/workspace-context";
import { AccessGuard } from "@/components/auth/access-guard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function UsagePage() {
  const { workspaceName } = useWorkspace();

  return (
    <AccessGuard capability="canViewBilling">
      <div className="container max-w-7xl px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Usage</h1>
          <p className="text-muted-foreground mt-1">
            Monitor your consumption for <span className="font-semibold text-foreground">{workspaceName}</span>
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Messages</CardTitle>
              <div className="text-2xl font-bold">45 / 100</div>
            </CardHeader>
            <CardContent>
              <Progress value={45} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">Resets on Feb 1, 2026</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Vector Storage</CardTitle>
              <div className="text-2xl font-bold">12 MB / 50 MB</div>
            </CardHeader>
            <CardContent>
              <Progress value={24} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">24% used</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Voice Minutes</CardTitle>
              <div className="text-2xl font-bold">0 / 30</div>
            </CardHeader>
            <CardContent>
              <Progress value={0} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">0% used</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AccessGuard>
  );
}
