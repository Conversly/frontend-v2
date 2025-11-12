"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Settings, Trash2, Bot, Ellipsis } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { GetChatbotsResponse } from "@/types/chatbot";

interface ChatbotPreviewCardProps {
  chatbot: GetChatbotsResponse;
  onDelete: (chatbotId: number) => void;
}

// Generate a color based on chatbot name for visual variety
const getColorFromName = (name: string): string => {
  const colors = [
    'rgb(0, 217, 217)',    // Cyan
    'rgb(139, 92, 246)',   // Purple
    'rgb(59, 130, 246)',   // Blue
    'rgb(236, 72, 153)',   // Pink
    'rgb(34, 197, 94)',    // Green
    'rgb(251, 146, 60)',   // Orange
  ];
  
  const hash = name.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  return colors[Math.abs(hash) % colors.length];
};

export function ChatbotPreviewCard({ chatbot, onDelete }: ChatbotPreviewCardProps) {
  const backgroundColor = getColorFromName(chatbot.name);
  
  // Calculate time since last update
  const getTimeSinceUpdate = () => {
    if (!chatbot.createdAt) return "recently";
    
    const now = new Date();
    const created = new Date(chatbot.createdAt);
    const diffMs = now.getTime() - created.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  };

  return (
    <Card className="max-h-[300px] overflow-hidden rounded-xl border transition-all ease-in-out hover:border-primary/20">
      {/* Chatbot Preview Section */}
      <Link 
        href={`/chatbot/${chatbot.id}/playground`}
        className="block h-[200px] w-full overflow-hidden border-b"
      >
        <div 
          className="relative flex h-full w-full select-none items-end justify-center overflow-hidden"
          style={{ backgroundColor }}
        >
          {/* Mini Chat Interface */}
          <div 
            className="z-20 flex h-[90%] w-[min(230px,90%)] flex-col items-center justify-start overflow-hidden rounded-t-[14px]"
            style={{ maxWidth: 'min(230px, 90%)' }}
          >
            {/* Chat Header */}
            <div 
              className="flex h-10 w-full flex-row items-center justify-start gap-1 rounded-[15px] rounded-b-none px-3 py-2"
              style={{ 
                background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.02) 0.44%, rgba(0, 0, 0, 0) 49.5%), rgb(255, 255, 255)'
              }}
            >
              <p className="line-clamp-1 w-full origin-left font-medium text-[7.85px] leading-normal tracking-tight text-black">
                {chatbot.name}
              </p>
            </div>
            
            {/* Chat Messages Area */}
            <div className="relative flex w-full flex-grow flex-col gap-2 overflow-clip border-x-[0.25px] bg-white p-2">
              {/* Bot Message Bubble */}
              <div className="z-10 w-1/2 max-w-full flex-col gap-2 rounded-xl px-4 py-3.5 bg-zinc-200/50" />
              
              {/* User Message Bubble */}
              <div 
                className="z-10 ml-auto w-1/2 max-w-full rounded-xl px-4 py-3.5 font-sans"
                style={{ backgroundColor }}
              />
            </div>
          </div>
          
          {/* Blurred Background Effect */}
          <div 
            className="absolute inset-0 h-full w-full scale-110"
            style={{ 
              filter: 'brightness(0.95)',
              backgroundColor 
            }}
          >
            {/* Placeholder gradient overlay for visual effect */}
            <div 
              className="h-full w-full"
              style={{
                background: `linear-gradient(135deg, ${backgroundColor}dd 0%, ${backgroundColor}88 50%, ${backgroundColor}dd 100%)`,
                opacity: 0.3
              }}
            />
          </div>
        </div>
      </Link>

      {/* Card Footer */}
      <Link 
        href={`/chatbot/${chatbot.id}`}
        className="flex flex-row justify-between gap-4 p-6"
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <span className="line-clamp-1 break-all font-medium text-primary leading-tight transition-colors hover:text-primary/80">
              {chatbot.name}
            </span>
          </div>
          <span className="line-clamp-1 font-medium text-muted-foreground text-xs">
            Last trained <span>{getTimeSinceUpdate()}</span>
          </span>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
            <Button 
              variant="outline" 
              size="icon"
              className="h-9 w-9 shrink-0"
            >
              <Ellipsis className="h-6 w-6 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/chatbot/${chatbot.id}/settings`}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={(e) => {
                e.preventDefault();
                onDelete(chatbot.id);
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Link>
    </Card>
  );
}