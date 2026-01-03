"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { usePermissions } from "@/hooks/use-permissions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Shield, AlertCircle, Crown, Lock, Loader2 } from "lucide-react";

interface RoleGuardProps {
  children: ReactNode;
  requireOwner?: boolean;
  requireAdmin?: boolean;
  requireChatbotAdmin?: boolean;
  fallback?: ReactNode;
}

export function RoleGuard({ children, requireOwner, requireAdmin, requireChatbotAdmin, fallback }: RoleGuardProps) {
  const router = useRouter();
  const { isOwner, isAdmin, isChatbotAdmin, isLoading, permissions, hasLoaded } = usePermissions();

  // CRITICAL: Never show restriction UI until permissions are fully loaded
  // This prevents the flicker where restriction popup shows briefly for authorized users
  if (isLoading || !hasLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="space-y-4 text-center max-w-md">
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Verifying permissions...</p>
            <p className="text-xs text-muted-foreground">Please wait while we check your access</p>
          </div>
          {/* Optional: Show skeleton of the page structure to reduce perceived loading time */}
          <div className="mt-8 space-y-4 opacity-30">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Now we can safely check permissions - they're guaranteed to be loaded
  // Check permissions
  if (requireOwner && !isOwner) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen p-6 bg-muted/30">
          <Card className="max-w-lg w-full shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-destructive/10 p-3">
                  <Crown className="w-8 h-8 text-destructive" />
                </div>
              </div>
              <CardTitle className="text-2xl">Owner Access Required</CardTitle>
              <CardDescription className="text-base mt-2">
                This page requires <strong>Owner</strong> permissions. Only account owners can access billing, team management, and account settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium">What Owners can do:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Manage billing and subscriptions</li>
                  <li>Invite and remove team members</li>
                  <li>Change account settings</li>
                  <li>Delete the account</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex-1"
                >
                  Go Back
                </Button>
                <Button
                  onClick={() => router.push('/manage')}
                  className="flex-1"
                >
                  Contact Owner
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    );
  }

  if (requireAdmin && !isAdmin && !isOwner) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen p-6 bg-muted/30">
          <Card className="max-w-lg w-full shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-orange-100 dark:bg-orange-900/20 p-3">
                  <Shield className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              <CardTitle className="text-2xl">Admin Access Required</CardTitle>
              <CardDescription className="text-base mt-2">
                This page requires <strong>Admin</strong> or <strong>Owner</strong> permissions. Please contact your account owner to grant you Admin access.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium">What Admins can do:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Create and manage chatbots</li>
                  <li>Access analytics and reports</li>
                  <li>Manage integrations</li>
                  <li>View conversations</li>
                </ul>
                <p className="text-sm font-medium mt-3">What only Owners can do:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Manage billing</li>
                  <li>Invite team members</li>
                  <li>Delete account</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex-1"
                >
                  Go Back
                </Button>
                <Button
                  onClick={() => router.push('/manage')}
                  className="flex-1"
                >
                  Contact Owner
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    );
  }

  if (requireChatbotAdmin && !isChatbotAdmin && !isOwner) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen p-6 bg-muted/30">
          <Card className="max-w-lg w-full shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/20 p-3">
                  <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <CardTitle className="text-2xl">Chatbot Access Required</CardTitle>
              <CardDescription className="text-base mt-2">
                You don't have access to this chatbot. Please contact your account owner or Admin to grant you access.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  Account Owners and Admins have access to all chatbots. Other users need to be explicitly assigned to specific chatbots.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex-1"
                >
                  Go Back
                </Button>
                <Button
                  onClick={() => router.push('/chatbot')}
                  className="flex-1"
                >
                  View My Chatbots
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    );
  }

  return <>{children}</>;
}


