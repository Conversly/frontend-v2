'use client';

import { useState } from 'react';
import Link from 'next/link';
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
  ChevronLeft,
  ChevronRight,
  Plus,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface IntegrationSidebarProps {
  platform: IntegrationPlatform;
  items: IntegrationSidebarItem[];
  basePath: string;
  onClose?: () => void;
}

// Icon mapping
const iconMap: Record<string, React.ComponentType<any>> = {
  MessageSquare,
  BarChart3,
  FileText,
  Zap,
  Settings,
};

export function IntegrationSidebar({ 
  platform, 
  items, 
  basePath,
  onClose 
}: IntegrationSidebarProps) {
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(false);

  const getPlatformColor = (platform: IntegrationPlatform) => {
    switch (platform) {
      case 'whatsapp':
        return 'text-green-500 bg-green-500/10';
      case 'slack':
        return 'text-purple-500 bg-purple-500/10';
      case 'stripe':
        return 'text-blue-500 bg-blue-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div 
      className={cn(
        "h-full border-l bg-background/95 backdrop-blur-sm transition-all duration-300 flex flex-col",
        isMinimized ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="h-14 border-b px-4 flex items-center justify-between">
        {!isMinimized && (
          <h3 className="font-semibold capitalize truncate">
            {platform}
          </h3>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMinimized(!isMinimized)}
          className="flex-shrink-0"
        >
          {isMinimized ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation Items */}
      <ScrollArea className="flex-1">
        <div className={cn("space-y-1 p-3", isMinimized && "flex flex-col items-center p-2")}>
          {items.map((item) => {
            const IconComponent = iconMap[item.icon] || MessageSquare;
            const fullPath = `${basePath}${item.path}`;
            const isActive = pathname === fullPath;

            return isMinimized ? (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <Link href={fullPath}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="icon"
                      className={cn(
                        "w-10 h-10 relative",
                        isActive && "bg-primary text-primary-foreground"
                      )}
                    >
                      <IconComponent className="w-5 h-5" />
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link key={item.id} href={fullPath}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    isActive && "bg-primary text-primary-foreground"
                  )}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Button>
              </Link>
            );
          })}

          {/* Add Template/Action Button (Example for WhatsApp) */}
          {platform === 'whatsapp' && !isMinimized && (
            <div className="pt-4 mt-4 border-t">
              <Button 
                className="w-full justify-start gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90"
                size="sm"
              >
                <Plus className="w-4 h-4" />
                New Template
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      {!isMinimized && (
        <div className="p-3 border-t">
          <div className={cn(
            "p-3 rounded-lg",
            getPlatformColor(platform)
          )}>
            <p className="text-xs font-medium mb-1">Integration Active</p>
            <p className="text-xs text-muted-foreground">
              Managing {platform} features
            </p>
          </div>
          {onClose && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="w-full mt-2"
            >
              Back to Integrations
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
