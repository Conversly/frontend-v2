import {
  MessageSquare,
  Activity,
  BarChart3,
  Database,
  Zap,
  Users,
  Rocket,
  Settings,
  FileText,
  Upload,
  Globe,
  HelpCircle,
  Bell,
  MessageCircle,
  UserPlus,
  TrendingUp,
  Hash,
  Smile,
  Palette,
  Paintbrush,
  MessageSquare as MessageSquareIcon,
  BrainCircuit,
  Code,
  Link as LinkIcon,
  type LucideIcon,
  Link,
  LayoutDashboard,
} from "lucide-react";

export interface NavItem {
  title: string;
  href?: string;
  icon: LucideIcon;
  children?: NavItem[];
  description?: string;
}

/**
 * Navigation items for the chatbot sidebar
 * Follows the structure defined in the requirements and API documentation
 */
export const getChatbotNavItems = (botId: string): NavItem[] => [
  {
    title: "Workspace",
    href: `/chatbot`,
    icon: LayoutDashboard,
    description: "View all your chatbots",
  },
  {
    title: "Playground",
    href: `/chatbot/${botId}/playground`,
    icon: MessageSquare,
    description: "Test and interact with your chatbot in real-time",
  },
  {
    title: "Activity",
    icon: Activity,
    description: "View activity logs and leads",
    children: [
      {
        title: "Chat Logs",
        href: `/chatbot/${botId}/activity/chat-logs`,
        icon: MessageCircle,
        description: "View and analyze all chat conversations",
      },
      {
        title: "Leads",
        href: `/chatbot/${botId}/activity/leads`,
        icon: UserPlus,
        description: "Manage and track leads generated from conversations",
      },
    ],
  },
  {
    title: "Analytics",
    icon: BarChart3,
    description: "Monitor performance and insights",
    children: [
      // {
      //   title: "Chats",
      //   href: `/chatbot/${botId}/analytics/chats`,
      //   icon: TrendingUp,
      //   description: "Monitor chat volume, response times, and engagement metrics",
      // },
            {
        title: "Statistics",
        href: `/chatbot/${botId}/analytics/statistic`,
        icon: Paintbrush,
        description: "View detailed statistics and data visualizations",
      },
      {
        title: "Topics",
        href: `/chatbot/${botId}/analytics/topics`,
        icon: Hash,
        description: "Analyze conversation topics and trending themes",
      },
      // {
      //   title: "Sentiment",
      //   href: `/chatbot/${botId}/analytics/sentiment`,
      //   icon: Smile,
      //   description: "Track user sentiment and satisfaction levels",
      // },

    ],
  },
  {
    title: "Sources",
    icon: Database,
    description: "Manage knowledge base sources",
    children: [
      {
        title: "Files",
        href: `/chatbot/${botId}/sources/files`,
        icon: Upload,
        description: "Upload documents to enhance your chatbot's knowledge base",
      },
      {
        title: "Web",
        href: `/chatbot/${botId}/sources/web`,
        icon: Globe,
        description: "Connect web sources and URLs",
      },
      {
        title: "Website",
        href: `/chatbot/${botId}/sources/website`,
        icon: LinkIcon,
        description: "Crawl and index your website content automatically",
      },
      {
        title: "Q&A",
        href: `/chatbot/${botId}/sources/qa`,
        icon: HelpCircle,
        description: "Create custom question-answer pairs for your chatbot",
      },
      {
        title: "Text",
        href: `/chatbot/${botId}/sources/text`,
        icon: FileText,
        description: "Add custom text content to train your chatbot",
      },
      {
        title: "Notion",
        href: `/chatbot/${botId}/sources/notion`,
        icon: Bell,
        description: "Connect your Notion workspace to sync content",
      },
    ],
  },
  {
    title: "Customize",
    href: `/chatbot/${botId}/customize`,
    icon: Palette,
    description: "Customize appearance, content, and AI settings",
  },
  {
    title: "Actions",
    href: `/chatbot/${botId}/actions`,
    icon: Zap,
    description: "Configure automated actions and integrations",
  },
  {
    title: "Integration",
    href: `/chatbot/${botId}/integration`,
    icon: Link,
    description: "Connect your chatbot to external services",
  },
  {
    title: "Contacts",
    href: `/chatbot/${botId}/contacts`,
    icon: Users,
    description: "Manage and organize your contact list",
  },
  {
    title: "Deploy",
    href: `/chatbot/${botId}/deploy`,
    icon: Rocket,
    description: "Deploy your chatbot to various platforms and channels",
  },
  {
    title: "Settings",
    href: `/chatbot/${botId}/settings`,
    icon: Settings,
    description: "Configure your chatbot settings and preferences",
  },
];

/**
 * Route groups for better organization
 */
export const ROUTE_GROUPS = {
  ACTIVITY: ["chat-logs", "leads"],
  ANALYTICS: ["chats", "topics", "sentiment"],
  SOURCES: ["files", "qa", "text", "notion"],
} as const;

/**
 * Breadcrumb labels for better UX
 */
export const BREADCRUMB_LABELS: Record<string, string> = {
  playground: "Playground",
  activity: "Activity",
  "chat-logs": "Chat Logs",
  leads: "Leads",
  analytics: "Analytics",
  chats: "Chats",
  topics: "Topics",
  sentiment: "Sentiment",
  sources: "Sources",
  files: "Files",
  website: "Website",
  qa: "Q&A",
  text: "Text",
  notion: "Notion",
  customize: "Customize",
  actions: "Actions",
  integration: "Integration",
  contacts: "Contacts",
  deploy: "Deploy",
  settings: "Settings",
};
