"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight, Bot } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { getChatbotNavItems, type NavItem } from "@/lib/constants/navigation";
import { useChatbot } from "@/services/chatbot";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatbotSidebarProps {
  botId: string;
}

export function ChatbotSidebar({ botId }: ChatbotSidebarProps) {
  const pathname = usePathname();
  const { data: chatbot, isLoading } = useChatbot(botId);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    activity: true,
    analytics: true,
    sources: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const navItems = getChatbotNavItems(botId);

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const sectionKey = item.title.toLowerCase();
    const isOpen = openSections[sectionKey] ?? false;
    const isActive = item.href ? pathname === item.href : false;
    
    // Check if any child is active
    const hasActiveChild = item.children?.some(child => {
      if (!child.href) return false;
      return pathname === child.href || pathname?.startsWith(child.href);
    });

    if (hasChildren) {
      return (
        <Collapsible
          key={item.title}
          open={isOpen}
          onOpenChange={() => toggleSection(sectionKey)}
          className="mb-1"
        >
          <CollapsibleTrigger className="w-full">
            <div
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 text-[13px] transition-all hover:bg-muted/50 rounded-md",
                "text-foreground/70 hover:text-foreground",
                (isActive || hasActiveChild) && "bg-muted/70 text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1 text-left font-normal">{item.title}</span>
              <ChevronRight
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200 text-foreground/50",
                  isOpen && "rotate-90"
                )}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-0.5 space-y-0.5 ml-3 pl-3.5 border-l border-border/40">
            {item.children?.map((child) => renderNavItem(child, level + 1))}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <Link
        key={item.title}
        href={item.href || "#"}
        className={cn(
          "flex items-center gap-2.5 px-3 py-2 text-[13px] transition-all rounded-md",
          "text-foreground/60 hover:text-foreground hover:bg-muted/50",
          isActive && "bg-muted text-foreground font-medium",
          level > 0 && "py-1.5"
        )}
      >
        <Icon className={cn("h-4 w-4 shrink-0", level > 0 && "h-3.5 w-3.5")} />
        <span className="font-normal">{item.title}</span>
      </Link>
    );
  };

  return (
    <div className="flex h-full w-[220px] flex-col border-r bg-background">
      <div className="flex h-[60px] items-center px-4 border-b">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <>
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-3 w-16" />
              </>
            ) : (
              <>
                <h2 className="text-sm font-semibold leading-none">
                  {chatbot?.name || "Chatbot"}
                </h2>
                <span className="text-xs text-muted-foreground">Agent</span>
              </>
            )}
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1 px-3 py-3">
        <nav className="space-y-0.5">
          {navItems.map((item) => renderNavItem(item))}
        </nav>
      </ScrollArea>
    </div>
  );
}
