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
    items?: NavItem[]; // For nested items
    requiredCapability?: keyof WorkspaceCapabilities; // Capability required to see this item
};

// Workspace-scoped Dashboard Navigation
// Items are filtered by capabilities in the sidebar component
export const getWorkspaceNavItems = (workspaceId: string): NavItem[] => [
    {
        title: "Chatbots",
        url: `/${workspaceId}/chatbot`,
        icon: Bot,
        requiredCapability: "canViewChatbots",
    },
    {
        title: "Promote",
        url: `/${workspaceId}/promote-manager`,
        icon: Megaphone,
        requiredCapability: "canManageCampaigns",
    },
    {
        title: "Manage",
        url: `/${workspaceId}/manage`,
        icon: Settings,
        requiredCapability: "canManageMembers",
    },
    {
        title: "Billing",
        url: `/${workspaceId}/billing`,
        icon: CreditCard,
        requiredCapability: "canViewBilling",
        items: [
            {
                title: "Overview",
                url: `/${workspaceId}/billing`,
                icon: CreditCard,
            },
            {
                title: "Subscription",
                url: `/${workspaceId}/billing/subscription`,
                icon: FileCheck,
            },
            {
                title: "Usage",
                url: `/${workspaceId}/billing/usage`,
                icon: BarChart3,
            },
            {
                title: "Payment Methods",
                url: `/${workspaceId}/billing/payment-methods`,
                icon: CreditCard,
            },
        ],
    },
    {
        title: "Profile",
        url: `/${workspaceId}/profile`,
        icon: User,
    },
];

// Workspace + Chatbot-specific Navigation (requires workspaceId + botId)
export const getWorkspaceChatbotNavItems = (workspaceId: string, botId: string): NavItem[] => [
    {
        title: "Playground",
        url: `/${workspaceId}/chatbot/${botId}/playground`,
        icon: Sparkles,
    },
    {
        title: "Activity",
        url: `/${workspaceId}/chatbot/${botId}/activity`, // Parent URL (optional if only using children)
        icon: Activity,
        items: [
            {
                title: "Chat Logs",
                url: `/${workspaceId}/chatbot/${botId}/activity/chat-logs`,
                icon: MessageCircle,
            },
            {
                title: "Leads",
                url: `/${workspaceId}/chatbot/${botId}/activity/leads`,
                icon: Users,
            },
        ],
    },
    {
        title: "Analytics",
        url: `/${workspaceId}/chatbot/${botId}/analytics`,
        icon: LayoutDashboard,
        items: [
            {
                title: "Statistics",
                url: `/${workspaceId}/chatbot/${botId}/analytics/statistic`,
                icon: PieChart,
            },
            {
                title: "Topics",
                url: `/${workspaceId}/chatbot/${botId}/analytics/topics`,
                icon: Hash,
            },
        ],
    },
    {
        title: "Knowledge Base",
        url: `/${workspaceId}/chatbot/${botId}/sources`,
        icon: Book,
        items: [
            {
                title: "Current Data",
                url: `/${workspaceId}/chatbot/${botId}/sources`,
                icon: BrainCircuit,
            },
            {
                title: "Files",
                url: `/${workspaceId}/chatbot/${botId}/sources/files`,
                icon: Upload,
            },
            {
                title: "Website",
                url: `/${workspaceId}/chatbot/${botId}/sources/website`,
                icon: Globe,
            },
            {
                title: "Q&A",
                url: `/${workspaceId}/chatbot/${botId}/sources/qa`,
                icon: HelpCircle,
            },
            {
                title: "Text",
                url: `/${workspaceId}/chatbot/${botId}/sources/text`,
                icon: FileText,
            },
        ],
    },
    {
        title: "Customize",
        url: `/${workspaceId}/chatbot/${botId}/customize`,
        icon: Palette,
    },
    {
        title: "WhatsApp",
        url: `/${workspaceId}/chatbot/${botId}/whatsapp`,
        icon: MessageCircle,
    },
    {
        title: "Actions",
        url: `/${workspaceId}/chatbot/${botId}/actions`,
        icon: Zap,
    },
    {
        title: "Voice-Agent",
        url: `/${workspaceId}/chatbot/${botId}/voice`,
        icon: Headset,
        items: [
            {
                title: "Assistant",
                url: `/${workspaceId}/chatbot/${botId}/voice`,
                icon: Settings,
            },
            {
                title: "Campaigns",
                url: `/${workspaceId}/chatbot/${botId}/voice/campaigns`,
                icon: Megaphone,
            },
            {
                title: "Analytics",
                url: `/${workspaceId}/chatbot/${botId}/voice/analytics`,
                icon: BarChart3,
            },
            {
                title: "Phone Numbers",
                url: `/${workspaceId}/chatbot/${botId}/voice/phone-numbers`,
                icon: Phone,
            },
            {
                title: "Widget",
                url: `/${workspaceId}/chatbot/${botId}/voice/widget`,
                icon: Code,
            },
        ]
    },
    {
        title: "Integration",
        url: `/${workspaceId}/chatbot/${botId}/integration`,
        icon: Plug,
    },
    {
        title: "Deploy",
        url: `/${workspaceId}/chatbot/${botId}/deploy`,
        icon: Rocket,
    },
    {
        title: "Deploy Live",
        url: `/${workspaceId}/chatbot/${botId}/deploy-live`,
        icon: Rocket,
    },
];
