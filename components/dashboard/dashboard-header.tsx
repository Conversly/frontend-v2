"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { BranchSwitcher } from "@/components/shared/BranchSwitcher";
import { useBranch } from "@/store/branch";
import { toast } from "sonner";
import React from "react";
import { useMaybeWorkspace } from "@/contexts/workspace-context";
import { useChatbotInWorkspace } from "@/services/chatbot";

// Map route segments to readable labels
const routeLabels: Record<string, string> = {
  chatbot: "Chatbots",
  create: "Create",
  setup: "Setup",
  sources: "Data Sources",
  integration: "Integration",
  whatsapp: "WhatsApp",
  profile: "Profile",
  chats: "Chats",
  analytics: "Analytics",
  settings: "Settings",
  activity: "Activity",
  customization: "Customization",
  actions: "Actions",
};

export function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const workspaceCtx = useMaybeWorkspace();

  const workspaceIdParam = (params as any)?.workspaceId as string | string[] | undefined;
  const botIdParam = (params as any)?.botId as string | string[] | undefined;
  const workspaceId = Array.isArray(workspaceIdParam) ? workspaceIdParam[0] : workspaceIdParam;
  const botId = Array.isArray(botIdParam) ? botIdParam[0] : botIdParam;

  const isChatbotDashboard = !!workspaceId && !!botId;
  const { activeBranch, liveVersion } = useBranch();

  // Fetch chatbot data when in a bot route (for name display in breadcrumb)
  const { data: chatbotData } = useChatbotInWorkspace(workspaceId || "", botId || "");

  // Global redirect check: if in LIVE mode but no live version exists, redirect to Deploy Live
  React.useEffect(() => {
    if (isChatbotDashboard && activeBranch === 'LIVE' && liveVersion === 0) {
      if (!pathname.endsWith('/deploy-live')) {
        toast.info("No live version exists", {
          description: "Redirecting you to the deployment page."
        });
        router.push(`/${workspaceId}/chatbot/${botId}/deploy-live`);
      }
    }
  }, [isChatbotDashboard, activeBranch, liveVersion, botId, workspaceId, pathname, router]);


  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = (): Array<{
    label: string;
    path: string | null;
  }> => {
    const pathSegments = (pathname || "").split("/").filter(Boolean);
    const breadcrumbs: Array<{ label: string; path: string | null }> = [];

    pathSegments.forEach((segment, index) => {
      const isLast = index === pathSegments.length - 1;
      const pathUpTo = `/${pathSegments.slice(0, index + 1).join("/")}`;

      // Workspace segment (/:workspaceId/...)
      if (index === 0) {
        breadcrumbs.push({
          label: workspaceCtx?.workspaceName || segment,
          // Workspace "home" in this app is the chatbot list
          path: isLast ? null : `/${segment}/chatbot`,
        });
        return;
      }

      // Handle dynamic routes (UUIDs or bot IDs)
      if (
        segment.match(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        ) ||
        (pathSegments[index - 1] === "chatbot" && index > 0)
      ) {
        // Determine more specific labels based on parent route
        let detailLabel = "Details";
        const parentSegment = pathSegments[index - 1];

        if (parentSegment === "chatbot") {
          detailLabel = chatbotData?.name || "Bot Details";
        } else if (parentSegment === "whatsapp") {
          detailLabel = "WhatsApp Instance";
        }

        breadcrumbs.push({
          label: detailLabel,
          path: isLast ? null : pathUpTo,
        });
      } else {
        // Use routeLabels for known routes
        const label =
          routeLabels[segment] ||
          segment.charAt(0).toUpperCase() + segment.slice(1);

        breadcrumbs.push({
          label,
          path: isLast ? null : pathUpTo,
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Get the current page name (last breadcrumb)
  const currentPageName = breadcrumbs[breadcrumbs.length - 1]?.label || "Dashboard";

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="breadcrumb">
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {crumb.path ? (
                    <BreadcrumbLink
                      onClick={() => router.push(crumb.path!)}
                      className="cursor-pointer"
                    >
                      {crumb.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="breadcrumb-current">
                      {crumb.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {isChatbotDashboard && <BranchSwitcher />}
    </div>
  );
}
