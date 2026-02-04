'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { IntegrationSidebarItem, IntegrationPlatform } from '@/types/integration';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
  MessageSquare,
  BarChart3,
  FileText,
  Zap,
  Settings,
  LayoutDashboard,
  Megaphone,
  Users,
  CreditCard,
  Workflow,
  Puzzle,
  FolderOpen
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface IntegrationSidebarProps {
  platform: IntegrationPlatform;
  items: IntegrationSidebarItem[];
  basePath: string;
  onClose?: () => void;
}

// Icon mapping
const iconMap: Record<string, React.ComponentType<any>> = {
  MessageSquare,
  BarChart3, // Analytics
  FileText, // Templates (History/FileText)
  Zap, // Automation
  Settings, // Manage
  LayoutDashboard, // Dashboard
  Megaphone, // Campaigns
  Users, // Contacts
  CreditCard, // WA Pay
  Workflow, // Flows
  Puzzle, // Integrations
  FolderOpen, // All Projects
};

export function IntegrationSidebar({
  platform,
  items,
  basePath,
  onClose
}: IntegrationSidebarProps) {
  const pathname = usePathname();

  // Additional static items usually present in this specific sidebar view based on screenshot
  // We can merge passed items with static ones or just rely on what's passed if updated elsewhere.
  // For now, I will trust the passed `items` but enforce the styling.

  return (
    <div className="h-full w-[72px] flex flex-col bg-sidebar border-r border-sidebar-border shrink-0">
      {/* Logo / Header Area */}
      <div className="h-16 flex items-center justify-center border-b border-sidebar-border shrink-0">
        {/* Logo */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          <Image
            src="/whatsapp.png"
            alt="WhatsApp"
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 w-full">
        <div className="flex flex-col items-center py-2 gap-1 px-1">
          {items.map((item) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap] || MessageSquare;
            const fullPath = `${basePath}${item.path}`;
            const isActive = pathname === fullPath || pathname?.startsWith(fullPath + '/');

            return (
              <Link key={item.id} href={fullPath} className="w-full">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full h-auto py-3 !px-0 flex flex-col items-center justify-center gap-1.5 rounded-lg transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  )}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-[length:var(--font-xsmall)] font-medium leading-tight text-center">{item.label}</span>

                  {item.badge && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
                  )}
                </Button>
              </Link>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
