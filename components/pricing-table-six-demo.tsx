"use client";

import {
  Plan,
} from "@/lib/billingsdk-config";
import { PricingTableSix } from "@/components/billingsdk/pricing-table-six";

export function PricingTableSixDemo() {
  const plans: Plan[] = [
    {
      id: "free",
      title: "Free",
      description: "Best for individuals and small teams",
      monthlyPrice: "0",
      yearlyPrice: "0",
      buttonText: "Get Started",
      features: [
        { name: "Core tools with modest usage allowances", icon: "check" },
        { name: "Getting-started guides to launch quickly", icon: "check" },
        { name: "Fundamental analytics and reports", icon: "check" },
        { name: "Standard email assistance", icon: "check" },
      ],
    },
    {
      id: "hobby",
      title: "Hobby",
      description: "Built for expanding teams",
      monthlyPrice: "40",
      yearlyPrice: "400",
      buttonText: "Get Started",
      highlight: true,
      features: [
        { name: "Advanced tools with priority updates", icon: "check" },
        { name: "Onboarding guides to ramp fast", icon: "check" },
        { name: "Live chat support access", icon: "check" },
        { name: "Automation to streamline workflows", icon: "check" },
        { name: "Premium tutorials and webinars access", icon: "check" },
      ],
    },
    {
      id: "standard",
      title: "Standard",
      description: "Tailored for specialized requirements",
      monthlyPrice: "120",
      yearlyPrice: "1440",
      buttonText: "Get Started",
      features: [
        { name: "Unlimited users, projects, and data", icon: "check" },
        { name: "Resources that scale with your needs", icon: "check" },
        { name: "24/7 priority support", icon: "check" },
        { name: "White-label reports, dashboards, and UIs", icon: "check" },
        { name: "Support for custom API integrations", icon: "check" },
        { name: "Works with advanced or proprietary systems", icon: "check" },
      ],
    },
  ];

  return (
    <PricingTableSix
      plans={plans}
      onPlanSelect={(planId: string) => console.log("Selected plan:", planId)}
    />
  );
}
