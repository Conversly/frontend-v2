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
  trialPeriodDays?: number;
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
    description: "Start exploring basics",
    currency: "$",
    monthlyPrice: "0",
    yearlyPrice: "0",
    buttonText: "Get Started",
    features: [
      { name: "100 messages/month", icon: "check", iconColor: "text-primary" },
      { name: "1 chatbot", icon: "check", iconColor: "text-primary" },
      { name: "10 data sources", icon: "check", iconColor: "text-primary" },
      { name: "1 team member", icon: "check", iconColor: "text-primary" },
    ],
  },
  {
    id: "hobby",
    title: "Hobby",
    description: "Great for small projects",
    currency: "$",
    monthlyPrice: "29.99",
    yearlyPrice: "359.88",
    buttonText: "Upgrade",
    features: [
      { name: "3,000 messages/month", icon: "check", iconColor: "text-primary" },
      { name: "3 chatbots", icon: "check", iconColor: "text-primary" },
      { name: "50 data sources per chatbot", icon: "check", iconColor: "text-primary" },
      { name: "2 team members", icon: "check", iconColor: "text-primary" },
      { name: "AI Actions (3 per bot)", icon: "check", iconColor: "text-primary" },
    ],
  },
  {
    id: "standard",
    title: "Standard",
    description: "Everything in Hobby +",
    currency: "$",
    monthlyPrice: "79.99",
    yearlyPrice: "959.88",
    buttonText: "Upgrade",
    badge: "Most Popular",
    highlight: true,
    features: [
      { name: "12,000 messages/month", icon: "check", iconColor: "text-primary" },
      { name: "10 chatbots", icon: "check", iconColor: "text-primary" },
      { name: "200 data sources per chatbot", icon: "check", iconColor: "text-primary" },
      { name: "5 team members", icon: "check", iconColor: "text-primary" },
      { name: "AI Actions (5 per bot)", icon: "check", iconColor: "text-primary" },
      { name: "Remove Branding", icon: "check", iconColor: "text-primary" },
    ],
  },
  {
    id: "pro",
    title: "Pro",
    description: "Everything in Standard +",
    currency: "$",
    monthlyPrice: "249.99",
    yearlyPrice: "2999.99",
    buttonText: "Upgrade",
    features: [
      { name: "60,000 messages/month", icon: "check", iconColor: "text-primary" },
      { name: "50 chatbots", icon: "check", iconColor: "text-primary" },
      { name: "400 data sources per chatbot", icon: "check", iconColor: "text-primary" },
      { name: "10 team members", icon: "check", iconColor: "text-primary" },
      { name: "AI Actions (10 per bot)", icon: "check", iconColor: "text-primary" },
      { name: "Remove Branding", icon: "check", iconColor: "text-primary" },
    ],
  },
];
