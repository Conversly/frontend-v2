"use client";

import { useParams } from "next/navigation";
import { useChatbot } from "@/services/chatbot";
import { CustomizationTab } from "@/components/chatbot/customization/CustomizationTab";
import { Loader2 } from "lucide-react";

export default function CustomizePage() {
  const routeParams = useParams<{ botId: string }>();
  const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;

  if (!botId) {
    return null;
  }

  const { data: chatbot, isLoading } = useChatbot(botId);

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
    <div className="w-full h-full overflow-y-auto">
      <div className="container mx-auto px-6 py-6 max-w-[1920px]">
        <CustomizationTab 
          chatbotId={botId} 
          systemPrompt={chatbot.systemPrompt || ""} 
        />
      </div>
    </div>
  );
}

