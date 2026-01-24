"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useWorkspace } from "@/contexts/workspace-context";
import type { WorkspaceCapabilities } from "@/types/permissions";
import { toast } from "sonner";

/**
 * Route capability mapping - maps route patterns to required capabilities
 * Routes are checked in order, so more specific routes should come first
 */
const routeCapabilityMap: Array<{
  pattern: RegExp;
  capability: keyof WorkspaceCapabilities;
  message: string;
}> = [
  // Billing routes (account owner only)
  {
    pattern: /^\/[^/]+\/billing\/payment-methods/,
    capability: "canManageBilling",
    message: "You don't have permission to manage payment methods. Only account owners can manage billing.",
  },
  {
    pattern: /^\/[^/]+\/billing/,
    capability: "canViewBilling",
    message: "You don't have permission to access Billing. Only account owners can view billing information.",
  },
  // Team management routes (workspace owner only)
  {
    pattern: /^\/[^/]+\/team/,
    capability: "canManageMembers",
    message: "You don't have permission to access Team Management. Only workspace owners can manage team members.",
  },
  // Settings routes (workspace owner only)
  {
    pattern: /^\/[^/]+\/settings/,
    capability: "canManageWorkspace",
    message: "You don't have permission to access Settings. Only workspace owners can manage workspace settings.",
  },
  // Audit logs (workspace owner only)
  {
    pattern: /^\/[^/]+\/audit-logs/,
    capability: "canManageWorkspace",
    message: "You don't have permission to access Audit Logs. Only workspace owners can view audit logs.",
  },
  // Promote/Campaigns (workspace admin/owner)
  {
    pattern: /^\/[^/]+\/promote-manager/,
    capability: "canManageCampaigns",
    message: "You don't have permission to access Promote Manager. Only workspace admins and owners can manage campaigns.",
  },
];

/**
 * Hook to protect routes based on user capabilities
 * Redirects unauthorized users and shows a warning toast
 */
export function useRouteProtection() {
  const router = useRouter();
  const pathname = usePathname();
  const workspaceCtx = useWorkspace();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!workspaceCtx || !pathname) {
      setIsAuthorized(null);
      return;
    }

    // Check if current route requires a specific capability
    const routeCheck = routeCapabilityMap.find(({ pattern }) => pattern.test(pathname));

    if (routeCheck) {
      const hasCapability = workspaceCtx.capabilities[routeCheck.capability];

      if (!hasCapability) {
        // Unauthorized access detected
        setIsAuthorized(false);
        toast.error("Access Denied", {
          description: routeCheck.message,
          duration: 5000,
        });

        // Redirect to chatbots page after a short delay
        setTimeout(() => {
          router.replace(`/${workspaceCtx.workspaceId}/chatbot`);
        }, 2000);
      } else {
        setIsAuthorized(true);
      }
    } else {
      // Route doesn't require special capability
      setIsAuthorized(true);
    }
  }, [pathname, workspaceCtx, router]);

  return { isAuthorized };
}
