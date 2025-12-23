"use client";

import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot, Loader2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { getChatbots } from "@/lib/api/chatbot";

export const ChatbotSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Extract current botId from pathname if we're on a chatbot page
  const botIdMatch = pathname.match(/\/chatbot\/([^/]+)/);
  const currentBotId = botIdMatch ? botIdMatch[1] : null;

  const { data: chatbots, isLoading } = useQuery({
    queryKey: ["chatbots"],
    queryFn: getChatbots,
    staleTime: 60_000,
  });

  const handleChatbotChange = (newBotId: string) => {
    // If we're already on a chatbot page, preserve the current sub-route
    if (currentBotId && pathname.includes(`/chatbot/${currentBotId}/`)) {
      // Extract the sub-route after the botId (e.g., /playground, /sources, etc.)
      const subRoute = pathname.split(`/chatbot/${currentBotId}`)[1] || "";
      router.push(`/chatbot/${newBotId}${subRoute}`);
    } else {
      // Default to playground if no specific route
      router.push(`/chatbot/${newBotId}/playground`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    );
  }

  if (!chatbots || chatbots.length === 0) {
    return (
      <div className="flex items-center gap-2">
        <Bot className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">No chatbots</span>
      </div>
    );
  }

  const currentChatbot = currentBotId ? chatbots.find(cb => cb.id === currentBotId) : null;

  return (
    <div className="flex items-center gap-2">
      <Bot className="w-4 h-4 text-muted-foreground" />
      <Select
        value={currentBotId ?? undefined}
        onValueChange={handleChatbotChange}
      >
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Select chatbot">
            {currentChatbot?.name || "Select chatbot"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {chatbots.map((chatbot) => (
            <SelectItem key={chatbot.id} value={chatbot.id}>
              {chatbot.name || "Unnamed Chatbot"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

