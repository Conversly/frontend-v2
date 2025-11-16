"use client";

import { ChatbotSidebar } from "@/components/dashboard/chatbot-sidebar";
import { useParams } from "next/navigation";
import { SidebarProvider } from "@/contexts/SidebarContext";

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
      <div className="flex h-screen overflow-hidden">
        <ChatbotSidebar botId={botId} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
