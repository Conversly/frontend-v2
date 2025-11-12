"use client";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isChatbotBotIdRoute = pathname?.match(/^\/chatbot\/[^/]+/);
  
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        {!isChatbotBotIdRoute && <DashboardSidebar />}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
