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
        <header className="dashboard-topbar sticky top-0 z-20 flex h-16 shrink-0 items-center border-b border-[var(--toolbar-border)] bg-[var(--header-background)] px-5 backdrop-blur">
          <DashboardHeader />
        </header>
        <div className="page-container flex flex-1 flex-col overflow-y-auto">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
