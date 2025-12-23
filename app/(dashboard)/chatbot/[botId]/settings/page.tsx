"use client";

import { useParams } from "next/navigation";
import { useChatbot } from "@/services/chatbot";
import { ChatbotAdmins } from "@/components/admin/chatbot-admins";
import { RoleGuard } from "@/components/auth/role-guard";
import { Loader2 } from "lucide-react";

export default function SettingsPage() {
  const routeParams = useParams<{ botId: string }>();
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;

  const { data: chatbot, isLoading } = useChatbot(botId);

  if (!botId) return null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!chatbot) {
    return (
      <div className="container py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Chatbot not found</h1>
          <p className="text-muted-foreground">The chatbot you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="border-b bg-background px-6 py-4">
        <h1 className="text-xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Configure your chatbot settings and preferences
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <RoleGuard requireOwner fallback={null}>
          <ChatbotAdmins chatbotId={botId} chatbotName={chatbot.name} />
        </RoleGuard>

        {/* Placeholder for other settings */}
        {/* <Card>...</Card> */}
      </div>
    </div>
  );
}
