import {
    Activity,
    BarChart3,
    Zap,
    User,
    Bot,
    Sparkles,
    LayoutDashboard,
    PieChart,
    Hash,
    BrainCircuit,
    MessageCircle,
    MessageSquare,
    MessageSquareText,
    MessagesSquare,
    Database,
    Inbox,
    Upload,
    HelpCircle,
    FileText,
    Palette,
    Rocket,
    Home,
    Megaphone,
    Phone,
    Settings,
    Code,
    Globe,
    Headset,
    Book,
    Users,
    Plug,
    CreditCard,
    Shield,
    FileCheck,
    Building2,
} from "lucide-react";
import type { WorkspaceCapabilities } from "@/types/permissions";

export type NavItem = {
    title: string;
    url: string;
    icon: React.ComponentType<{ className?: string }>;
    requiredCapability?: keyof WorkspaceCapabilities;
    colorClass?: string;
};

export type NavSection = {
    label: string;
    items: NavItem[];
    requiredCapability?: keyof WorkspaceCapabilities;
};

// Workspace-scoped Dashboard Navigation (sections with headings)
export const getWorkspaceNavSections = (workspaceId: string): NavSection[] => [
    {
        label: "Workspace",
        items: [
            {
                title: "Chatbots",
                url: `/${workspaceId}/chatbot`,
                icon: Bot,
                requiredCapability: "canViewChatbots",
                colorClass: "text-blue-600 bg-blue-100/80 dark:text-blue-500 dark:bg-blue-500/15",
            },
            {
                title: "Promote",
                url: `/${workspaceId}/promote-manager`,
                icon: Megaphone,
                requiredCapability: "canManageCampaigns",
                colorClass: "text-orange-600 bg-orange-100/80 dark:text-orange-500 dark:bg-orange-500/15",
            },
        ],
    },
    {
        label: "Billing",
        requiredCapability: "canViewBilling",
        items: [
            {
                title: "Overview",
                url: `/${workspaceId}/billing`,
                icon: CreditCard,
                requiredCapability: "canViewBilling",
                colorClass: "text-emerald-600 bg-emerald-100/80 dark:text-emerald-500 dark:bg-emerald-500/15",
            },
            {
                title: "Plans",
                url: `/${workspaceId}/billing/Plans`,
                icon: Zap, // Using Zap icon for Plans/Upgrades
                requiredCapability: "canViewBilling",
                colorClass: "text-amber-600 bg-amber-100/80 dark:text-amber-500 dark:bg-amber-500/15",
            },
        ],
    },
    {
        label: "Settings",
        items: [
            {
                title: "Manage",
                url: `/${workspaceId}/manage`,
                icon: Settings,
                requiredCapability: "canManageMembers",
                colorClass: "text-slate-600 bg-slate-100/80 dark:text-slate-400 dark:bg-slate-500/15",
            },
            {
                title: "Profile",
                url: `/${workspaceId}/profile`,
                icon: User,
                colorClass: "text-indigo-600 bg-indigo-100/80 dark:text-indigo-500 dark:bg-indigo-500/15",
            },
        ],
    },
];

// Workspace + Chatbot-specific Navigation (sections with headings)
export const getWorkspaceChatbotNavSections = (workspaceId: string, botId: string): NavSection[] => [
    {
        label: "Main Navigation",
        items: [
            {
                title: "Playground",
                url: `/${workspaceId}/chatbot/${botId}/playground`,
                icon: Rocket, // or Terminal
                colorClass: "text-purple-600 bg-purple-100/80 dark:text-purple-500 dark:bg-purple-500/15",
            },
            {
                title: "Customize",
                url: `/${workspaceId}/chatbot/${botId}/customize`,
                icon: Palette,
                colorClass: "text-pink-600 bg-pink-100/80 dark:text-pink-500 dark:bg-pink-500/15",
            },
            {
                title: "Behavior",
                url: `/${workspaceId}/chatbot/${botId}/behavior`,
                icon: Settings,
                colorClass: "text-slate-600 bg-slate-100/80 dark:text-slate-400 dark:bg-slate-500/15",
            },
            {
                title: "Deploy",
                url: `/${workspaceId}/chatbot/${botId}/deploy-live`,
                icon: Rocket,
                colorClass: "text-purple-600 bg-purple-100/80 dark:text-purple-500 dark:bg-purple-500/15",
            },
        ],
    },
    {
        label: "Knowledge & Training",
        items: [
            {
                title: "Data Sources",
                url: `/${workspaceId}/chatbot/${botId}/sources`,
                icon: Database,
                colorClass: "text-teal-600 bg-teal-100/80 dark:text-teal-500 dark:bg-teal-500/15",
            },
            {
                title: "Actions",
                url: `/${workspaceId}/chatbot/${botId}/actions`,
                icon: Zap,
                colorClass: "text-amber-600 bg-amber-100/80 dark:text-amber-500 dark:bg-amber-500/15",
            },
        ],
    },
    {
        label: "Analytics",
        items: [
            {
                title: "Statistic",
                url: `/${workspaceId}/chatbot/${botId}/analytics/statistic`,
                icon: BarChart3,
                colorClass: "text-cyan-600 bg-cyan-100/80 dark:text-cyan-500 dark:bg-cyan-500/15",
            },
            {
                title: "Topics",
                url: `/${workspaceId}/chatbot/${botId}/analytics/topics`,
                icon: MessageSquareText,
                colorClass: "text-rose-600 bg-rose-100/80 dark:text-rose-500 dark:bg-rose-500/15",
            },
            {
                title: "Chats",
                url: `/${workspaceId}/chatbot/${botId}/activity/chat-logs`,
                icon: MessagesSquare,
                colorClass: "text-rose-600 bg-rose-100/80 dark:text-rose-500 dark:bg-rose-500/15",
            },
            {
                title: "Leads",
                url: `/${workspaceId}/chatbot/${botId}/activity/leads`,
                icon: Users,
                colorClass: "text-fuchsia-600 bg-fuchsia-100/80 dark:text-fuchsia-500 dark:bg-fuchsia-500/15",
            },
        ]
    },
    {
        label: "Human Escalations",
        items: [
            {
                title: "Escalation Analytics",
                url: `/${workspaceId}/chatbot/${botId}/escalation-analytics`,
                icon: BarChart3,
                colorClass: "text-cyan-600 bg-cyan-100/80 dark:text-cyan-500 dark:bg-cyan-500/15",
            },
            {
                title: "Live Inbox",
                url: `/${workspaceId}/chatbot/${botId}/activity/inbox`,
                icon: Inbox,
                colorClass: "text-sky-600 bg-sky-100/80 dark:text-sky-500 dark:bg-sky-500/15",
            },
        ],
    },
    {
        label: "Channels",
        items: [
            {
                title: "WhatsApp",
                url: `/${workspaceId}/chatbot/${botId}/whatsapp`,
                icon: MessageCircle,
                colorClass: "text-emerald-600 bg-emerald-100/80 dark:text-emerald-500 dark:bg-emerald-500/15", // Changed to emerald (WhatsApp color)
            },
            {
                title: "Voice Agent",
                url: `/${workspaceId}/chatbot/${botId}/voice`,
                icon: Headset,
                colorClass: "text-blue-600 bg-blue-100/80 dark:text-blue-500 dark:bg-blue-500/15",
            },
            {
                title: "Integrations",
                url: `/${workspaceId}/chatbot/${botId}/integration`,
                icon: Plug,
                colorClass: "text-violet-600 bg-violet-100/80 dark:text-violet-500 dark:bg-violet-500/15",
            },
        ],
    }
];
