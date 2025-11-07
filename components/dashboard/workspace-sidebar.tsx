"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Bot, Home, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface WorkspaceSidebarProps {
  chatbots?: Array<{
    id: string;
    name: string;
  }>;
}

export function WorkspaceSidebar({ chatbots = [] }: WorkspaceSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <h2 className="text-lg font-semibold">Workspace</h2>
      </div>
      
      <div className="px-3 py-4">
        <Button className="w-full" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Chatbot
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1">
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
              pathname === "/dashboard" && "bg-accent text-accent-foreground"
            )}
          >
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>

          <div className="py-2">
            <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground">
              Your Chatbots
            </h3>
            <div className="space-y-1">
              {chatbots.map((chatbot) => (
                <Link
                  key={chatbot.id}
                  href={`/chatbot/${chatbot.id}`}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
                    pathname.includes(`/chatbot/${chatbot.id}`) &&
                      "bg-accent text-accent-foreground"
                  )}
                >
                  <Bot className="h-4 w-4" />
                  <span>{chatbot.name}</span>
                </Link>
              ))}
              {chatbots.length === 0 && (
                <p className="px-3 text-sm text-muted-foreground">
                  No chatbots yet
                </p>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
