"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { usePermissions } from "@/hooks/use-permissions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, AlertCircle } from "lucide-react";

interface RoleGuardProps {
  children: ReactNode;
  requireOwner?: boolean;
  requireBillingAdmin?: boolean;
  requireChatbotAdmin?: boolean;
  fallback?: ReactNode;
}

export function RoleGuard({ children, requireOwner, requireBillingAdmin, requireChatbotAdmin, fallback }: RoleGuardProps) {
  const router = useRouter();
  const { isOwner, isBillingAdmin, isChatbotAdmin, isLoading } = usePermissions();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-muted-foreground">Loading permissions...</div>
      </div>
    );
  }

  // Check permissions
  if (requireOwner && !isOwner) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen p-6">
          <Card className="max-w-md">
            <CardHeader>
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="w-5 h-5" />
                <CardTitle>Access Denied</CardTitle>
              </div>
              <CardDescription>
                This page requires Owner permissions. Only account owners can access this page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <button
                onClick={() => router.back()}
                className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Go Back
              </button>
            </CardContent>
          </Card>
        </div>
      )
    );
  }

  if (requireBillingAdmin && !isBillingAdmin && !isOwner) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen p-6">
          <Card className="max-w-md">
            <CardHeader>
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="w-5 h-5" />
                <CardTitle>Access Denied</CardTitle>
              </div>
              <CardDescription>
                This page requires Billing Admin or Owner permissions. Please contact your account owner for access.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <button
                onClick={() => router.back()}
                className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Go Back
              </button>
            </CardContent>
          </Card>
        </div>
      )
    );
  }

  if (requireChatbotAdmin && !isChatbotAdmin && !isOwner) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen p-6">
          <Card className="max-w-md">
            <CardHeader>
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="w-5 h-5" />
                <CardTitle>Access Denied</CardTitle>
              </div>
              <CardDescription>
                This page requires Chatbot Admin permissions. Please contact your account owner for access.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <button
                onClick={() => router.back()}
                className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Go Back
              </button>
            </CardContent>
          </Card>
        </div>
      )
    );
  }

  return <>{children}</>;
}


