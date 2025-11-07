'use client';

import { usePathname, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Home, 
  Database, 
  Rocket, 
  BarChart3, 
  Settings, 
  Zap,
  Play,
  Link as LinkIcon,
  ChevronDown,
  ChevronRight,
  Palette,
  FileText,
  Globe,
  Cloud,
  Briefcase,
  Paintbrush,
  MessageSquare,
  BrainCircuit,
  Code,
  Upload,
  HelpCircle,
  Bell,
  Activity,
  MessageCircle,
  UserPlus,
  TrendingUp,
  Hash,
  Smile,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  children?: SidebarItem[];
}

interface DashboardSidebarProps {
  chatbotId?: string;
  chatbotName?: string;
}

export function DashboardSidebar({ chatbotId, chatbotName }: DashboardSidebarProps) {
  const pathname = usePathname();
  const params = useParams();
  const activeChatbotId = chatbotId || params?.id?.toString() || params?.chatbotId?.toString();
  
  // Check if we're on a chatbot page
  const isChatbotPage = pathname?.includes('/chatbot/');
  const isDashboardPage = pathname === '/dashboard';

  // Dashboard navigation items
  const dashboardItems: SidebarItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      href: '/chatbot',
    },
  ];

  // Chatbot navigation items - matching API documentation structure
  const chatbotItems: SidebarItem[] = [
    {
      id: 'playground',
      label: 'Playground',
      icon: Play,
      href: `/chatbot/${activeChatbotId}/playground`,
    },
    {
      id: 'activity',
      label: 'Activity',
      icon: Activity,
      children: [
        {
          id: 'chat-logs',
          label: 'Chat Logs',
          icon: MessageCircle,
          href: `/chatbot/${activeChatbotId}/activity/chat-logs`,
        },
        {
          id: 'leads',
          label: 'Leads',
          icon: UserPlus,
          href: `/chatbot/${activeChatbotId}/activity/leads`,
        },
      ],
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      children: [
        {
          id: 'chats',
          label: 'Chats',
          icon: TrendingUp,
          href: `/chatbot/${activeChatbotId}/analytics/chats`,
        },
        {
          id: 'topics',
          label: 'Topics',
          icon: Hash,
          href: `/chatbot/${activeChatbotId}/analytics/topics`,
        },
        {
          id: 'sentiment',
          label: 'Sentiment',
          icon: Smile,
          href: `/chatbot/${activeChatbotId}/analytics/sentiment`,
        },
      ],
    },
    {
      id: 'sources',
      label: 'Sources',
      icon: Database,
      children: [
        {
          id: 'files',
          label: 'Files',
          icon: Upload,
          href: `/chatbot/${activeChatbotId}/sources/files`,
        },
        {
          id: 'web',
          label: 'Web',
          icon: Globe,
          href: `/chatbot/${activeChatbotId}/sources/web`,
        },
        {
          id: 'website',
          label: 'Website',
          icon: LinkIcon,
          href: `/chatbot/${activeChatbotId}/sources/website`,
        },
        {
          id: 'qa',
          label: 'Q&A',
          icon: HelpCircle,
          href: `/chatbot/${activeChatbotId}/sources/qa`,
        },
        {
          id: 'text',
          label: 'Text',
          icon: FileText,
          href: `/chatbot/${activeChatbotId}/sources/text`,
        },
        {
          id: 'notion',
          label: 'Notion',
          icon: Bell,
          href: `/chatbot/${activeChatbotId}/sources/notion`,
        },
      ],
    },
    {
      id: 'customize',
      label: 'Customize',
      icon: Palette,
      href: `/chatbot/${activeChatbotId}/customize`,
    },
    {
      id: 'actions',
      label: 'Actions',
      icon: Zap,
      href: `/chatbot/${activeChatbotId}/actions`,
    },
    {
      id: 'contacts',
      label: 'Contacts',
      icon: Users,
      href: `/chatbot/${activeChatbotId}/contacts`,
    },
    {
      id: 'deploy',
      label: 'Deploy',
      icon: Rocket,
      href: `/chatbot/${activeChatbotId}/deploy`,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      href: `/chatbot/${activeChatbotId}/settings`,
    },
  ];

  const navigationItems = isChatbotPage ? chatbotItems : dashboardItems;

  return (
    <aside className="w-64 bg-card/60 backdrop-blur-sm border-r border-border dark:bg-gray-900/60 dark:border-gray-800/60 h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        {isChatbotPage && chatbotName && (
          <div className="mb-6 pb-6 border-b border-border dark:border-gray-800/60">
            <h2 className="font-heading text-lg font-semibold text-foreground dark:text-white mb-1">
              {chatbotName}
            </h2>
            <p className="text-xs text-muted-foreground dark:text-gray-400">AI Assistant</p>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <SidebarNavItem
              key={item.id}
              item={item}
              pathname={pathname || ''}
              activeChatbotId={activeChatbotId}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}

interface SidebarNavItemProps {
  item: SidebarItem;
  pathname: string;
  activeChatbotId?: string;
}

function SidebarNavItem({ item, pathname, activeChatbotId }: SidebarNavItemProps) {
  // Normalize pathnames for comparison
  const normalizePath = (path: string) => path.replace(/\/$/, '').toLowerCase();
  const normalizedPathname = normalizePath(pathname || '');
  const normalizedItemHref = item.href ? normalizePath(item.href) : '';
  
  // Check if pathname matches the item href exactly or contains the last segment
  const isActive = item.href && (
    normalizedPathname === normalizedItemHref || 
    normalizedPathname.endsWith(normalizedItemHref.split('/').pop() || '')
  );
  
  const hasActiveChild = item.children?.some(child => {
    if (!child.href) return false;
    const normalizedChildHref = normalizePath(child.href);
    return normalizedPathname === normalizedChildHref || 
      normalizedPathname.endsWith(normalizedChildHref.split('/').pop() || '');
  });
  
  const [isExpanded, setIsExpanded] = useState(hasActiveChild || false);
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div>
      <Link
        href={item.href || '#'}
        onClick={handleClick}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
          isActive || hasActiveChild
            ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-foreground dark:text-white border border-pink-500/30"
            : "text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white hover:bg-muted/50 dark:hover:bg-gray-800/50",
          !item.href && hasChildren && "cursor-pointer"
        )}
      >
        <item.icon className={cn(
          "w-5 h-5",
          isActive || hasActiveChild ? "text-pink-500" : "text-muted-foreground dark:text-gray-500"
        )} />
        <span className="flex-1">{item.label}</span>
        {hasChildren && (
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        )}
      </Link>

      {/* Children */}
      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ml-8 mt-1 space-y-1 border-l border-border dark:border-gray-800/60 pl-4">
              {item.children?.map((child) => {
                if (!child.href) return null;
                const normalizedChildHref = normalizePath(child.href);
                const isChildActive = normalizedPathname === normalizedChildHref || 
                  normalizedPathname.endsWith(normalizedChildHref.split('/').pop() || '');
                return (
                  <Link
                    key={child.id}
                    href={child.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                      isChildActive
                        ? child.id === 'files' 
                          ? "text-white bg-white/20 dark:bg-white/20 border border-white/30 dark:border-white/30 shadow-sm"
                          : "text-foreground dark:text-white bg-muted dark:bg-gray-800/50"
                        : "text-muted-foreground dark:text-gray-500 hover:text-foreground dark:hover:text-white hover:bg-muted/50 dark:hover:bg-gray-800/30"
                    )}
                  >
                    <child.icon className="w-4 h-4" />
                    <span>{child.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

