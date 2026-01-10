import {
    MessageSquare,

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
    BrainCircuit,
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
    Home,
    Megaphone,
    Phone,
    Settings,
    Code,
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
        title: "Home",
        url: "/",
        icon: Home,
    },
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
        title: "Knowledge Base",
        url: `/chatbot/${botId}/sources`,
        icon: Database,
        items: [
            {
                title: "Current Data",
                url: `/chatbot/${botId}/sources`,
                icon: BrainCircuit,
            },
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
        title: "Voice-Agent",
        url: `/chatbot/${botId}/voice`,
        icon: Phone,
        items: [
            {
                title: "Assistant",
                url: `/chatbot/${botId}/voice`,
                icon: Settings,
            },
            {
                title: "Campaigns",
                url: `/chatbot/${botId}/voice/campaigns`,
                icon: Megaphone,
            },
            {
                title: "Analytics",
                url: `/chatbot/${botId}/voice/analytics`,
                icon: BarChart3,
            },
            {
                title: "Phone Numbers",
                url: `/chatbot/${botId}/voice/phone-numbers`,
                icon: Phone,
            },
            {
                title: "Widget",
                url: `/chatbot/${botId}/voice/widget`,
                icon: Code,
            },
        ]
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
