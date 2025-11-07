"use client";

import { ChatbotSidebar } from "@/components/dashboard/chatbot-sidebar";
import { useParams } from "next/navigation";

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const botId = params.botId as string;

  return (
    <div className="flex h-screen overflow-hidden">
      <ChatbotSidebar botId={botId} />
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
