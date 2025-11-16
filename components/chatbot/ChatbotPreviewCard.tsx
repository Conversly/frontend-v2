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
  onDelete: (chatbotId: string) => void;
}

// Generate gradient colors based on chatbot name for visual variety
const getGradientFromName = (name: string): { gradient: string; baseColor: string } => {
  const gradients = [
    {
      gradient: 'linear-gradient(135deg, rgb(0, 217, 217) 0%, rgb(0, 180, 216) 50%, rgb(0, 150, 199) 100%)',
      baseColor: 'rgb(0, 217, 217)'
    }, // Cyan gradient
    {
      gradient: 'linear-gradient(135deg, rgb(139, 92, 246) 0%, rgb(124, 58, 237) 50%, rgb(109, 40, 217) 100%)',
      baseColor: 'rgb(139, 92, 246)'
    }, // Purple gradient
    {
      gradient: 'linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(37, 99, 235) 50%, rgb(29, 78, 216) 100%)',
      baseColor: 'rgb(59, 130, 246)'
    }, // Blue gradient
    {
      gradient: 'linear-gradient(135deg, rgb(236, 72, 153) 0%, rgb(219, 39, 119) 50%, rgb(190, 24, 93) 100%)',
      baseColor: 'rgb(236, 72, 153)'
    }, // Pink gradient
    {
      gradient: 'linear-gradient(135deg, rgb(34, 197, 94) 0%, rgb(22, 163, 74) 50%, rgb(20, 83, 45) 100%)',
      baseColor: 'rgb(34, 197, 94)'
    }, // Green gradient
    {
      gradient: 'linear-gradient(135deg, rgb(251, 146, 60) 0%, rgb(249, 115, 22) 50%, rgb(234, 88, 12) 100%)',
      baseColor: 'rgb(251, 146, 60)'
    }, // Orange gradient
    {
      gradient: 'linear-gradient(135deg, rgb(168, 85, 247) 0%, rgb(147, 51, 234) 50%, rgb(126, 34, 206) 100%)',
      baseColor: 'rgb(168, 85, 247)'
    }, // Violet gradient
    {
      gradient: 'linear-gradient(135deg, rgb(14, 165, 233) 0%, rgb(2, 132, 199) 50%, rgb(3, 105, 161) 100%)',
      baseColor: 'rgb(14, 165, 233)'
    }, // Sky gradient
  ];
  
  const hash = name.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  return gradients[Math.abs(hash) % gradients.length];
};

export function ChatbotPreviewCard({ chatbot, onDelete }: ChatbotPreviewCardProps) {
  const { gradient, baseColor } = getGradientFromName(chatbot.name);
  
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
          style={{ background: gradient }}
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
                style={{ background: gradient }}
              />
            </div>
          </div>
          
          {/* Blurred Background Effect */}
          <div 
            className="absolute inset-0 h-full w-full scale-110"
            style={{ 
              filter: 'brightness(0.95)',
              background: gradient
            }}
          >
            {/* Placeholder gradient overlay for visual effect */}
            <div 
              className="h-full w-full"
              style={{
                background: `linear-gradient(135deg, ${baseColor}dd 0%, ${baseColor}88 50%, ${baseColor}dd 100%)`,
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