import type { WorkspaceCapabilities } from "@/types/permissions";
import type { SvgIconComponent } from "@mui/icons-material";

// Material Icons imports
import SmartToy from "@mui/icons-material/SmartToy";
import Campaign from "@mui/icons-material/Campaign";
import CreditCard from "@mui/icons-material/CreditCard";
import Bolt from "@mui/icons-material/Bolt";
import Person from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
import RocketLaunch from "@mui/icons-material/RocketLaunch";
import Palette from "@mui/icons-material/Palette";
import Storage from "@mui/icons-material/Storage";
import BarChart from "@mui/icons-material/BarChart";
import Article from "@mui/icons-material/Article";
import Forum from "@mui/icons-material/Forum";
import People from "@mui/icons-material/People";
import Inbox from "@mui/icons-material/Inbox";
import Insights from "@mui/icons-material/Insights";
import Chat from "@mui/icons-material/Chat";
import HeadsetMic from "@mui/icons-material/HeadsetMic";
import Extension from "@mui/icons-material/Extension";

export type NavItem = {
    title: string;
    url: string;
    icon: SvgIconComponent;
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
                icon: SmartToy,
                requiredCapability: "canViewChatbots",
                colorClass: "text-blue-600 bg-blue-100/80 dark:text-blue-500 dark:bg-blue-500/15",
            },
            {
                title: "Promote",
                url: `/${workspaceId}/promote-manager`,
                icon: Campaign,
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
                icon: Bolt,
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
                icon: Person,
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
                icon: RocketLaunch,
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
                icon: RocketLaunch,
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
                icon: Storage,
                colorClass: "text-teal-600 bg-teal-100/80 dark:text-teal-500 dark:bg-teal-500/15",
            },
            {
                title: "Actions",
                url: `/${workspaceId}/chatbot/${botId}/actions`,
                icon: Bolt,
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
                icon: BarChart,
                colorClass: "text-cyan-600 bg-cyan-100/80 dark:text-cyan-500 dark:bg-cyan-500/15",
            },
            {
                title: "Topics",
                url: `/${workspaceId}/chatbot/${botId}/analytics/topics`,
                icon: Article,
                colorClass: "text-rose-600 bg-rose-100/80 dark:text-rose-500 dark:bg-rose-500/15",
            },
            {
                title: "Chats",
                url: `/${workspaceId}/chatbot/${botId}/activity/chat-logs`,
                icon: Forum,
                colorClass: "text-rose-600 bg-rose-100/80 dark:text-rose-500 dark:bg-rose-500/15",
            },
            {
                title: "Leads",
                url: `/${workspaceId}/chatbot/${botId}/activity/leads`,
                icon: People,
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
                icon: Insights,
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
                icon: Chat,
                colorClass: "text-emerald-600 bg-emerald-100/80 dark:text-emerald-500 dark:bg-emerald-500/15",
            },
            {
                title: "Voice Agent",
                url: `/${workspaceId}/chatbot/${botId}/voice`,
                icon: HeadsetMic,
                colorClass: "text-blue-600 bg-blue-100/80 dark:text-blue-500 dark:bg-blue-500/15",
            },
            {
                title: "Integrations",
                url: `/${workspaceId}/chatbot/${botId}/integration`,
                icon: Extension,
                colorClass: "text-violet-600 bg-violet-100/80 dark:text-violet-500 dark:bg-violet-500/15",
            },
        ],
    }
];
