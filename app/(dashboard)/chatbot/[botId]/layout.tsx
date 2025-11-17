"use client";

import { ChatbotSidebar } from "@/components/dashboard/chatbot-sidebar";
import { useParams, usePathname } from "next/navigation";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";
import { useEffect, useRef } from "react";

function ChatbotLayoutContent({ children, botId }: { children: React.ReactNode; botId: string }) {
  const pathname = usePathname();
  const { collapseSidebar, userToggled, setUserToggled } = useSidebar();
  const previousPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    // Only auto-collapse if:
    // 1. We're on an integration route
    // 2. The pathname changed (not just a re-render)
    // 3. User hasn't manually toggled the sidebar
    const isIntegrationRoute = pathname?.includes('/integration');
    const pathnameChanged = previousPathnameRef.current !== pathname;
    
    if (isIntegrationRoute && pathnameChanged && !userToggled) {
      collapseSidebar();
    }
    
    previousPathnameRef.current = pathname;
    
    // Reset user toggle flag when leaving integration routes
    if (!isIntegrationRoute) {
      setUserToggled(false);
    }
  }, [pathname, collapseSidebar, userToggled, setUserToggled]);

  // Track manual sidebar toggles via custom event
  useEffect(() => {
    const handleSidebarChange = (e: CustomEvent) => {
      if (e.detail.userToggled && pathname?.includes('/integration')) {
        // User manually toggled, don't auto-collapse anymore
        setUserToggled(true);
      }
    };
    
    window.addEventListener('sidebar-state-changed', handleSidebarChange as EventListener);
    return () => window.removeEventListener('sidebar-state-changed', handleSidebarChange as EventListener);
  }, [pathname, setUserToggled]);

  return (
    <div className="flex h-screen overflow-hidden">
      <ChatbotSidebar botId={botId} />
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const routeParams = useParams<{ botId: string }>();
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;

  if (!botId) {
    return null;
  }

  return (
    <SidebarProvider>
      <ChatbotLayoutContent botId={botId}>
        {children}
      </ChatbotLayoutContent>
    </SidebarProvider>
  );
}
