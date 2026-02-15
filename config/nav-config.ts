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
    MessageCircle, // This was already there, but MessageSquare was requested.
    MessageSquare,
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
            },
            {
                title: "Promote",
                url: `/${workspaceId}/promote-manager`,
                icon: Megaphone,
                requiredCapability: "canManageCampaigns",
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
            },
            {
                title: "Subscription",
                url: `/${workspaceId}/billing/subscription`,
                icon: FileCheck,
                requiredCapability: "canViewBilling",
            },
            {
                title: "Plans",
                url: `/${workspaceId}/billing/Plans`,
                icon: Zap, // Using Zap icon for Plans/Upgrades
                requiredCapability: "canViewBilling",
            },
            // {
            //     title: "Usage",
            //     url: `/${workspaceId}/billing/usage`,
            //     icon: BarChart3,
            //     requiredCapability: "canViewBilling",
            // },
            // {
            //     title: "Payment Methods",
            //     url: `/${workspaceId}/billing/payment-methods`,
            //     icon: CreditCard,
            //     requiredCapability: "canViewBilling",
            // },
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
            },
            {
                title: "Profile",
                url: `/${workspaceId}/profile`,
                icon: User,
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
            },
            {
                title: "Customize",
                url: `/${workspaceId}/chatbot/${botId}/customize`,
                icon: Palette,
            },
            {
                title: "Behavior",
                url: `/${workspaceId}/chatbot/${botId}/behavior`,
                icon: Settings,
            },
            {
                title: "Deploy",
                url: `/${workspaceId}/chatbot/${botId}/deploy-live`,
                icon: Rocket,
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
            },
            {
                title: "Actions",
                url: `/${workspaceId}/chatbot/${botId}/actions`,
                icon: Zap,
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
            },
            {
                title: "Topics",
                url: `/${workspaceId}/chatbot/${botId}/analytics/topics`,
                icon: MessageSquare,
            },
            {
                title: "Chats",
                url: `/${workspaceId}/chatbot/${botId}/activity/chat-logs`,
                icon: MessageSquare,
            },
            {
                title: "Leads",
                url: `/${workspaceId}/chatbot/${botId}/activity/leads`,
                icon: Users,
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
            },
            {
                title: "Live Inbox",
                url: `/${workspaceId}/chatbot/${botId}/activity/inbox`,
                icon: Inbox,
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
            },
            {
                title: "Voice Agent",
                url: `/${workspaceId}/chatbot/${botId}/voice`,
                icon: Headset,
            },
            {
                title: "Integrations",
                url: `/${workspaceId}/chatbot/${botId}/integration`,
                icon: Plug,
            },
        ],
    }
];
