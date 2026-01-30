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
        label: "Build",
        items: [
            {
                title: "Playground",
                url: `/${workspaceId}/chatbot/${botId}/playground`,
                icon: Sparkles,
            },
            {
                title: "Customize",
                url: `/${workspaceId}/chatbot/${botId}/customize`,
                icon: Palette,
            },
            {
                title: "Actions",
                url: `/${workspaceId}/chatbot/${botId}/actions`,
                icon: Zap,
            },
        ],
    },
    {
        label: "Knowledge Base",
        items: [
            {
                title: "Current Data",
                url: `/${workspaceId}/chatbot/${botId}/sources`,
                icon: BrainCircuit,
            }
        ],
    },
    {
        label: "Analytics",
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
            {
                title: "Chat Logs",
                url: `/${workspaceId}/chatbot/${botId}/activity/chat-logs`,
                icon: MessageCircle,
            },
            // {
            //     title: "Escalations Inbox",
            //     url: `/${workspaceId}/chatbot/${botId}/activity/inbox`,
            //     icon: Inbox,
            // },
            // {
            //     title: "Leads",
            //     url: `/${workspaceId}/chatbot/${botId}/activity/leads`,
            //     icon: Users,
            // },
        ],
    },
    {
        label: "Escalation",
        items: [
            {
                title: "Inbox",
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
                title: "Integration",
                url: `/${workspaceId}/chatbot/${botId}/integration`,
                icon: Plug,
            },
        ],
    },
    {
        label: "Voice Agent",
        items: [
            {
                title: "Assistant",
                url: `/${workspaceId}/chatbot/${botId}/voice`,
                icon: Headset,
            },
            // {
            //     title: "Campaigns",
            //     url: `/${workspaceId}/chatbot/${botId}/voice/campaigns`,
            //     icon: Megaphone,
            // },
            // {
            //     title: "Analytics",
            //     url: `/${workspaceId}/chatbot/${botId}/voice/analytics`,
            //     icon: BarChart3,
            // },
            // {
            //     title: "Phone Numbers",
            //     url: `/${workspaceId}/chatbot/${botId}/voice/phone-numbers`,
            //     icon: Phone,
            // },
            // {
            //     title: "Widget",
            //     url: `/${workspaceId}/chatbot/${botId}/voice/widget`,
            //     icon: Code,
            // },
        ],
    },
    {
        label: "Deploy",
        items: [
            // {
            //     title: "Deploy",
            //     url: `/${workspaceId}/chatbot/${botId}/deploy`,
            //     icon: Rocket,
            // },
            {
                title: "Deploy",
                url: `/${workspaceId}/chatbot/${botId}/deploy-live`,
                icon: Rocket,
            },
        ],
    },
];
