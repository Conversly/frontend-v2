"use client";

import { Separator } from '@/components/ui/separator';
import { useParams } from "next/navigation";
import { useChatbotInWorkspace } from "@/services/chatbot";
import { CustomizationTab } from "@/components/chatbot/customization/CustomizationTab";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import posthog from "posthog-js";

export default function CustomizePage() {
  const routeParams = useParams<{ workspaceId: string; botId: string }>();
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;
  const workspaceId = Array.isArray(routeParams.workspaceId) ? routeParams.workspaceId[0] : routeParams.workspaceId;

  useEffect(() => {
    if (botId) {
      posthog.capture("customize_page_viewed", {
        chatbot_id: botId
      });
    }
  }, [botId]);

  if (!botId) {
    return null;
  }

  const { data: chatbot, isLoading } = useChatbotInWorkspace(workspaceId, botId);

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
    <div className="w-full h-full overflow-hidden">
      <div className="container mx-auto px-6 py-6 max-w-[1920px] h-full">
        <CustomizationTab
          chatbotId={botId}
          systemPrompt={chatbot.systemPrompt || ""}
        />
      </div>
    </div>
  );
}

