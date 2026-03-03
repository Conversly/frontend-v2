import {
    ShoppingCart,
    Laptop,
    Heart,
    Utensils,
    Building,
    GraduationCap,
    Plane,
    Briefcase,
    LucideIcon
} from "lucide-react";

export interface Solution {
    icon: LucideIcon;
    title: string;
    category: string;
    description: string;
    color: string;
    bg: string;
    features: string[];
}

export const solutions: Solution[] = [
    {
        icon: ShoppingCart,
        title: "E-commerce & Retail",
        category: "Commerce",
        description: "Turn browsers into buyers with instant answers. Stop losing sales to unanswered questions — AI responds in 2 seconds, 24/7.",
        color: "text-blue-600",
        bg: "bg-blue-100 dark:bg-blue-900/30",
        features: [
            "Instant order tracking via chat or WhatsApp",
            "Product recommendations that increase AOV 18%",
            "Automated returns save 15 hrs/week",
            "Support 95+ languages without hiring",
            "Works with Shopify, WooCommerce, Magento"
        ]
    },
    {
        icon: Laptop,
        title: "SaaS Platforms",
        category: "Support",
        description: "Cut support costs by 80% while improving CSAT scores. AI handles Tier 1 tickets, your team focuses on product development.",
        color: "text-purple-600",
        bg: "bg-purple-100 dark:bg-purple-900/30",
        features: [
            "Answer docs questions with 95% accuracy",
            "Reduce onboarding support by 70%",
            "Troubleshoot common errors instantly",
            "Handle billing inquiries automatically",
            "Smart routing to engineers when needed"
        ]
    },
    {
        icon: Heart,
        title: "Healthcare",
        category: "Voice",
        description: "Never miss a patient call again. AI handles appointment scheduling, insurance verification, and routine inquiries — HIPAA compliant.",
        color: "text-red-600",
        bg: "bg-red-100 dark:bg-red-900/30",
        features: [
            "100% HIPAA-compliant & secure",
            "24/7 appointment booking & reminders",
            "Verify insurance in seconds",
            "Automate prescription refills",
            "Communicate in patient's language"
        ]
    },
    {
        icon: Utensils,
        title: "Restaurants & Hospitality",
        category: "Voice",
        description: "Handle reservations, menu inquiries, and customer feedback for restaurants and hotels.",
        color: "text-orange-600",
        bg: "bg-orange-100 dark:bg-orange-900/30",
        features: [
            "Table reservation via voice/WhatsApp",
            "Menu and allergen information",
            "Catering inquiry handling",
            "Real-time availability checking",
            "Integration with OpenTable, Resy"
        ]
    },
    {
        icon: Building,
        title: "Real Estate",
        category: "Sales",
        description: "Capture every lead — even at 2am. AI qualifies prospects, schedules viewings, and answers property questions while you sleep.",
        color: "text-teal-600",
        bg: "bg-teal-100 dark:bg-teal-900/30",
        features: [
            "Qualify 200+ leads/month automatically",
            "Instant answers to property questions",
            "Schedule tours 24/7 via voice or chat",
            "Calculate mortgages in real-time",
            "Auto-sync with your CRM"
        ]
    },
    {
        icon: GraduationCap,
        title: "Education",
        category: "Support",
        description: "Support students and parents with course information, admissions, and campus services.",
        color: "text-indigo-600",
        bg: "bg-indigo-100 dark:bg-indigo-900/30",
        features: [
            "Course catalog information",
            "Admissions process guidance",
            "Financial aid inquiries",
            "Campus tour scheduling",
            "Student portal integration"
        ]
    },
    {
        icon: Plane,
        title: "Travel & Tourism",
        category: "Voice",
        description: "Assist travelers with bookings, itinerary changes, and destination information.",
        color: "text-sky-600",
        bg: "bg-sky-100 dark:bg-sky-900/30",
        features: [
            "Booking modifications via chat",
            "Flight status notifications",
            "Destination recommendations",
            "Travel documentation assistance",
            "Integration with Amadeus, Sabre"
        ]
    },
    {
        icon: Briefcase,
        title: "Professional Services",
        category: "Internal",
        description: "Schedule consultations, answer service inquiries, and manage client communications.",
        color: "text-slate-600",
        bg: "bg-slate-100 dark:bg-slate-900/30",
        features: [
            "Consultation booking with calendar sync",
            "Service package information",
            "Quote generation",
            "Client onboarding automation",
            "Document collection workflows"
        ]
    }
];

export const categories = ["All", "Support", "Voice", "Commerce", "Internal", "Sales"];
