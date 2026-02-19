import { Check, Zap, Star } from "lucide-react";

export interface Plan {
  id: string;
  monthlyProductId?: string;
  yearlyProductId?: string;
  title: string;
  description: string;
  highlight?: boolean;
  type?: "monthly" | "yearly";
  currency?: string;
  monthlyPrice: string;
  yearlyPrice: string;
  buttonText: string;
  badge?: string;
  features: {
    name: string;
    icon: string;
    iconColor?: string;
  }[];
  benefits?: string[];
}

export interface CurrentPlan {
  plan: Plan;
  type: "monthly" | "yearly" | "custom";
  price?: string;
  nextBillingDate: string;
  paymentMethod: string;
  status: "active" | "inactive" | "past_due" | "cancelled";
}

export const plans: Plan[] = [
  {
    id: "free",
    title: "Free",
    description: "Unlock powerful features",
    currency: "$",
    monthlyPrice: "0",
    yearlyPrice: "0",
    buttonText: "Get Started",
    features: [
      { name: "0 Credits per cycle", icon: "check", iconColor: "text-primary" }
    ],
  },
  {
    id: "hobby",
    title: "Hobby",
    description: "Everything in Free +",
    currency: "$",
    monthlyPrice: "40",
    yearlyPrice: "400",
    buttonText: "Upgrade",
    features: [
      { name: "5,000 message credits/month", icon: "check", iconColor: "text-primary" },
      { name: "2 enabled AI Actions per AI agent", icon: "check", iconColor: "text-primary" },
    ],
  },
  {
    id: "standard",
    title: "Standard",
    description: "Everything in Free +",
    currency: "$",
    monthlyPrice: "120", // Placeholder, will be overridden by backend
    yearlyPrice: "1440", // Placeholder
    buttonText: "Upgrade",
    features: [
      { name: "Access to advanced models", icon: "check", iconColor: "text-primary" },
      { name: "1,500 message credits/month", icon: "check", iconColor: "text-primary" },
      { name: "5 enabled AI Actions per AI agent", icon: "check", iconColor: "text-primary" },
      { name: "20 MB per AI agent", icon: "check", iconColor: "text-primary" },
      { name: "Integrations (Zendesk, WhatsApp, and more)", icon: "check", iconColor: "text-primary" },
      { name: "API access", icon: "check", iconColor: "text-primary" },
      { name: "Basic analytics", icon: "check", iconColor: "text-primary" },
    ],
  },
  {
    id: "pro",
    title: "Pro",
    description: "Everything in Hobby +",
    currency: "$",
    monthlyPrice: "400", // Placeholder
    yearlyPrice: "4800", // Placeholder
    buttonText: "Upgrade",
    badge: "Most popular",
    highlight: true,
    features: [
      { name: "10,000 message credits/month", icon: "check", iconColor: "text-primary" },
      { name: "10 enabled AI Actions per AI agent", icon: "check", iconColor: "text-primary" },
      { name: "40 MB per AI agent", icon: "check", iconColor: "text-primary" },
      { name: "Auto retrain agents", icon: "check", iconColor: "text-primary" },
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise",
    description: "Everything in Standard +",
    currency: "$",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    buttonText: "Contact Sales",
    features: [
      { name: "40,000 message credits/month", icon: "check", iconColor: "text-primary" },
      { name: "15 enabled AI Actions per AI agent", icon: "check", iconColor: "text-primary" },
      { name: "60 MB per AI agent", icon: "check", iconColor: "text-primary" },
      { name: "Advanced analytics", icon: "check", iconColor: "text-primary" },
      { name: "Sources suggestions", icon: "check", iconColor: "text-primary" },
      { name: "Tickets as a source", icon: "check", iconColor: "text-primary" },
    ],
  },
];
