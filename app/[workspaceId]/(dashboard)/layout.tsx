"use client";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SocketBootstrap } from "@/components/realtime/SocketBootstrap";

export default function WorkspaceDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="fixed inset-0 h-svh w-full overflow-hidden bg-background">
      <SocketBootstrap />
      <AppSidebar />
      <SidebarInset className="app-shell h-full overflow-hidden">
        <header className="flex h-12 shrink-0 items-center gap-2 border-b bg-sidebar px-4 sticky top-0 z-10">
          <DashboardHeader />
        </header>
        <div className="page-container flex flex-1 flex-col overflow-y-auto">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
