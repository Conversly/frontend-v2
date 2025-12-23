import {
    MessageSquare,
    Settings,
    Activity,
    BarChart3,
    Database,
    Zap,
    LogOut,
    User,
    Bot,
    Play,
    LineChart,
    Plug,
    Share2,
    MessageCircle,
    UserPlus,
    Paintbrush,
    Hash,
    Upload,
    Link as LinkIcon,
    HelpCircle,
    FileText,
    Bell,
    Palette,
    Rocket,
    Building2,
    Megaphone,
    CreditCard,
    ShieldCheck,
} from "lucide-react";

export type NavItem = {
    title: string;
    url: string;
    icon: React.ComponentType<{ className?: string }>;
    items?: NavItem[]; // For nested items
};

// Main Dashboard Navigation
export const dashboardNavItems: NavItem[] = [
    {
        title: "Chatbots",
        url: "/chatbot",
        icon: Bot,
    },
    {
        title: "Promote",
        url: "/promote-manager",
        icon: Megaphone,
    },
    {
        title: "Billing",
        url: "/billing",
        icon: CreditCard,
    },
    {
        title: "Analytics",
        url: "/analytics",
        icon: BarChart3,
    },
    {
        title: "Audit Logs",
        url: "/audit-logs",
        icon: ShieldCheck,
    },
    {
        title: "Manage",
        url: "/manage",
        icon: User,
    },
    {
        title: "profile",
        url: "/profile",
        icon: User,
    },
];

// Chatbot-specific Navigation (requires botId to be injected)
export const getChatbotNavItems = (botId: string): NavItem[] => [
    {
        title: "Playground",
        url: `/chatbot/${botId}/playground`,
        icon: MessageSquare,
    },
    {
        title: "Activity",
        url: `/chatbot/${botId}/activity`, // Parent URL (optional if only using children)
        icon: Activity,
        items: [
            {
                title: "Chat Logs",
                url: `/chatbot/${botId}/activity/chat-logs`,
                icon: MessageCircle,
            },
            {
                title: "Leads",
                url: `/chatbot/${botId}/activity/leads`,
                icon: UserPlus,
            },
        ],
    },
    {
        title: "Analytics",
        url: `/chatbot/${botId}/analytics`,
        icon: BarChart3,
        items: [
            {
                title: "Statistics",
                url: `/chatbot/${botId}/analytics/statistic`,
                icon: Paintbrush,
            },
            {
                title: "Topics",
                url: `/chatbot/${botId}/analytics/topics`,
                icon: Hash,
            },
        ],
    },
    {
        title: "Sources",
        url: `/chatbot/${botId}/sources`,
        icon: Database,
        items: [
            {
                title: "Files",
                url: `/chatbot/${botId}/sources/files`,
                icon: Upload,
            },
            {
                title: "Website",
                url: `/chatbot/${botId}/sources/website`,
                icon: LinkIcon,
            },
            {
                title: "Q&A",
                url: `/chatbot/${botId}/sources/qa`,
                icon: HelpCircle,
            },
            {
                title: "Text",
                url: `/chatbot/${botId}/sources/text`,
                icon: FileText,
            },
            {
                title: "Notion",
                url: `/chatbot/${botId}/sources/notion`,
                icon: Bell,
            },
        ],
    },
    {
        title: "Customize",
        url: `/chatbot/${botId}/customize`,
        icon: Palette,
    },
    {
        title: "WhatsApp",
        url: `/chatbot/${botId}/whatsapp`,
        icon: MessageCircle,
    },
    {
        title: "Actions",
        url: `/chatbot/${botId}/actions`,
        icon: Zap,
    },
    {
        title: "Voice",
        url: `/chatbot/${botId}/voice`,
        icon: Play,
    },
    {
        title: "Integration",
        url: `/chatbot/${botId}/integration`,
        icon: Plug,
    },
    {
        title: "Deploy",
        url: `/chatbot/${botId}/deploy`,
        icon: Rocket,
    },
];
