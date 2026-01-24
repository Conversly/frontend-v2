"use client";

import { useWorkspace } from "@/contexts/workspace-context";
import { AccessGuard } from "@/components/auth/access-guard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus } from "lucide-react";

export default function PaymentMethodsPage() {
  const { workspaceName } = useWorkspace();

  return (
    <AccessGuard capability="canViewBilling">
      <div className="container max-w-7xl px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payment Methods</h1>
          <p className="text-muted-foreground mt-1">
            Manage payment details for <span className="font-semibold text-foreground">{workspaceName}</span>
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Credit Cards</CardTitle>
            <CardDescription>Manage your credit cards for billing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Visa ending in 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/2028</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">Remove</Button>
            </div>

            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </CardContent>
        </Card>
      </div>
    </AccessGuard>
  );
}
