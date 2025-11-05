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
  Code
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
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
      href: '/dashboard',
    },
  ];

  // Chatbot navigation items
  const chatbotItems: SidebarItem[] = [
    {
      id: 'playground',
      label: 'Playground',
      icon: Play,
      href: `/chatbot/${activeChatbotId}/playground`,
    },
    {
      id: 'data-sources',
      label: 'Data Sources',
      icon: Database,
      href: `/chatbot/${activeChatbotId}/data-sources`,
      children: [
        {
          id: 'data-sources-productivity',
          label: 'Productivity',
          icon: FileText,
          href: `/chatbot/${activeChatbotId}/data-sources/productivity`,
        },
        {
          id: 'data-sources-web',
          label: 'Web',
          icon: Globe,
          href: `/chatbot/${activeChatbotId}/data-sources/web`,
        },
        {
          id: 'data-sources-cloud',
          label: 'Cloud',
          icon: Cloud,
          href: `/chatbot/${activeChatbotId}/data-sources/cloud`,
        },
        {
          id: 'data-sources-business',
          label: 'Business',
          icon: Briefcase,
          href: `/chatbot/${activeChatbotId}/data-sources/business`,
        },
      ],
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      href: `/chatbot/${activeChatbotId}/analytics`,
    },
    {
      id: 'actions',
      label: 'Actions',
      icon: Zap,
      href: `/chatbot/${activeChatbotId}/actions`,
    },
    {
      id: 'deploy',
      label: 'Deploy',
      icon: Rocket,
      href: `/chatbot/${activeChatbotId}/deploy`,
      children: [
        {
          id: 'deploy-widget',
          label: 'Widget',
          icon: LinkIcon,
          href: `/chatbot/${activeChatbotId}/deploy/widget`,
        },
      ],
    },
    {
      id: 'integration',
      label: 'Integration',
      icon: LinkIcon,
      href: `/chatbot/${activeChatbotId}/integration`,
    },
    {
      id: 'customize',
      label: 'Customize',
      icon: Palette,
      href: `/chatbot/${activeChatbotId}/customize`,
    },
  ];

  const navigationItems = isChatbotPage ? chatbotItems : dashboardItems;

  return (
    <aside className="w-64 bg-gray-900/60 backdrop-blur-sm border-r border-gray-800/60 h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        {isChatbotPage && chatbotName && (
          <div className="mb-6 pb-6 border-b border-gray-800/60">
            <h2 className="font-heading text-lg font-semibold text-white mb-1">
              {chatbotName}
            </h2>
            <p className="text-xs text-gray-400">AI Assistant</p>
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
  // Normalize pathnames for comparison (handles both /data-sources and /datasource)
  const normalizePath = (path: string) => path.replace(/\/$/, '').toLowerCase();
  const normalizedPathname = normalizePath(pathname || '');
  const normalizedItemHref = normalizePath(item.href);
  
  // Check if pathname matches the item href exactly or contains the last segment
  const isActive = normalizedPathname === normalizedItemHref || 
    normalizedPathname.endsWith(normalizedItemHref.split('/').pop() || '');
  
  const hasActiveChild = item.children?.some(child => {
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
        href={item.href}
        onClick={handleClick}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
          isActive || hasActiveChild
            ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-white border border-pink-500/30"
            : "text-gray-400 hover:text-white hover:bg-gray-800/50"
        )}
      >
        <item.icon className={cn(
          "w-5 h-5",
          isActive || hasActiveChild ? "text-pink-500" : "text-gray-500"
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
            <div className="ml-8 mt-1 space-y-1 border-l border-gray-800/60 pl-4">
              {item.children?.map((child) => {
                const normalizePath = (path: string) => path.replace(/\/$/, '').toLowerCase();
                const normalizedPathname = normalizePath(pathname || '');
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
                        ? "text-white bg-gray-800/50"
                        : "text-gray-500 hover:text-white hover:bg-gray-800/30"
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

