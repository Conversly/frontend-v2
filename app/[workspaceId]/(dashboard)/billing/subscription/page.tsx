"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Check, Crown, Zap, Building2, Sparkles, CreditCard } from "lucide-react";
import { RoleGuard } from "@/components/auth/role-guard";
import {
  getSubscriptionPlans,
  getCurrentSubscription,
  SubscriptionPlan,
  CurrentSubscription,
} from "@/lib/api/subscription";
import { QUERY_KEY } from "@/utils/query-key";
import { UpgradeModal } from "@/components/subscription/upgrade-modal";

const TIER_COLORS: Record<string, string> = {
  FREE: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  PERSONAL: "bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  PRO: "bg-purple-100 text-purple-800 dark:bg-purple-500/10 dark:text-purple-400 border-purple-200 dark:border-purple-800",
  ENTERPRISE: "bg-orange-100 text-orange-800 dark:bg-orange-500/10 dark:text-orange-400 border-orange-200 dark:border-orange-800",
};

const TIER_ICONS: Record<string, React.ReactNode> = {
  FREE: <Sparkles className="w-4 h-4" />,
  PERSONAL: <Zap className="w-4 h-4" />,
  PRO: <Crown className="w-4 h-4" />,
  ENTERPRISE: <Building2 className="w-4 h-4" />,
};

export default function PlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const { data: plans, isLoading: plansLoading } = useQuery<SubscriptionPlan[]>({
    queryKey: [QUERY_KEY.SUBSCRIPTION_PLANS],
    queryFn: getSubscriptionPlans,
    retry: false,
  });

  const { data: currentSubscription, isLoading: subscriptionLoading } = useQuery<CurrentSubscription | null>({
    queryKey: [QUERY_KEY.CURRENT_SUBSCRIPTION],
    queryFn: getCurrentSubscription,
    retry: false,
  });

  const handleUpgradeClick = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setIsUpgradeModalOpen(true);
  };

  const isCurrentPlan = (planId: string) => {
    return currentSubscription?.planId === planId;
  };

  const formatPrice = (price: string, currency: string = "usd") => {
    if (price === "Custom") return "Custom";
    const numPrice = parseFloat(price);
    if (isNaN(numPrice)) return price;
    const symbol = currency === "usd" ? "$" : currency.toUpperCase();
    return `${symbol}${numPrice.toFixed(0)}`;
  };

  const getEntitlementDisplay = (entitlements: SubscriptionPlan["entitlements"]) => {
    if (!entitlements) return [];
    const features: string[] = [];

    if (entitlements.maxChatbots !== undefined) {
      features.push(
        entitlements.maxChatbots === -1
          ? "Unlimited chatbots"
          : `${entitlements.maxChatbots} chatbot${entitlements.maxChatbots > 1 ? "s" : ""}`
      );
    }
    if (entitlements.maxUsers !== undefined) {
      features.push(
        entitlements.maxUsers === -1 ? "Unlimited users" : `${entitlements.maxUsers} team member${entitlements.maxUsers > 1 ? "s" : ""}`
      );
    }
    if (entitlements.allowWhatsApp) {
      features.push("WhatsApp integration");
    }
    if (entitlements.allowVoice) {
      features.push("Voice integration");
    }
    if (entitlements.allowAPI) {
      features.push("API access");
    }
    if (entitlements.allowWebhooks) {
      features.push("Webhooks");
    }
    if (entitlements.allowCustomBranding) {
      features.push("Custom branding");
    }
    if (entitlements.prioritySupport) {
      features.push("Priority support");
    }
    if (entitlements.sla && entitlements.sla !== "NONE") {
      features.push(`${entitlements.sla} SLA`);
    }

    return features;
  };

  if (plansLoading || subscriptionLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-3 text-lg text-muted-foreground">Loading plans...</p>
      </div>
    );
  }

  return (
    <RoleGuard requireOwner>
      <div className="flex-1 space-y-6 pt-6 min-h-screen bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Subscription Plans</h1>
            <p className="text-muted-foreground mt-2">Choose the plan that best fits your needs</p>
          </div>

          {currentSubscription && (
            <Card className="mb-6 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Current Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold">{currentSubscription.planName}</p>
                    <p className="text-sm text-muted-foreground">
                      Status: <Badge variant={currentSubscription.status === "active" ? "default" : "secondary"}>{currentSubscription.status}</Badge>
                    </p>
                    {currentSubscription.currentPeriodEnd && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Renews: {new Date(currentSubscription.currentPeriodEnd).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Usage</p>
                    <p className="text-sm">
                      {currentSubscription.usage.chatbots} /{" "}
                      {currentSubscription.entitlements?.maxChatbots === -1
                        ? "∞"
                        : currentSubscription.entitlements?.maxChatbots || 0}{" "}
                      chatbots
                    </p>
                    <p className="text-sm">
                      {currentSubscription.usage.users} /{" "}
                      {currentSubscription.entitlements?.maxUsers === -1
                        ? "∞"
                        : currentSubscription.entitlements?.maxUsers || 0}{" "}
                      users
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans?.map((plan) => {
              const isCurrent = isCurrentPlan(plan.planId);
              const tierType = plan.tierType || "FREE";
              const features = getEntitlementDisplay(plan.entitlements);

              return (
                <Card
                  key={plan.planId}
                  className={`relative border ${isCurrent ? "ring-2 ring-primary border-primary" : "border-border"} ${tierType === "PRO" ? "border-purple-500/50 shadow-lg shadow-purple-500/5" : ""
                    }`}
                >
                  {tierType === "PRO" && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-purple-600 hover:bg-purple-700 text-white border-0">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl">{plan.planName}</CardTitle>
                      <Badge className={TIER_COLORS[tierType] || TIER_COLORS.FREE}>
                        {TIER_ICONS[tierType]}
                        <span className="ml-1">{tierType}</span>
                      </Badge>
                    </div>
                    <CardDescription>{plan.description || "No description available"}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">
                        {billingPeriod === "monthly"
                          ? formatPrice(plan.priceMonthly, plan.currency)
                          : formatPrice(plan.priceAnnually, plan.currency)}
                      </span>
                      <span className="text-muted-foreground">
                        /{billingPeriod === "monthly" ? "month" : "year"}
                      </span>
                    </div>

                    {plan.priceAnnually && plan.priceAnnually !== "Custom" && parseFloat(plan.priceAnnually) > 0 && (
                      <div className="flex items-center gap-2 text-sm">
                        <button
                          onClick={() => setBillingPeriod("monthly")}
                          className={`px-2 py-1 rounded ${billingPeriod === "monthly" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                        >
                          Monthly
                        </button>
                        <button
                          onClick={() => setBillingPeriod("annual")}
                          className={`px-2 py-1 rounded ${billingPeriod === "annual" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                        >
                          Annual
                        </button>
                      </div>
                    )}

                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Features</h4>
                      <ul className="space-y-1 text-sm">
                        {features.length > 0 ? (
                          features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-primary" />
                              {feature}
                            </li>
                          ))
                        ) : (
                          <li className="text-muted-foreground">Basic features included</li>
                        )}
                      </ul>
                    </div>

                    <Button
                      className="w-full"
                      variant={isCurrent ? "outline" : "default"}
                      disabled={isCurrent}
                      onClick={() => handleUpgradeClick(plan)}
                    >
                      {isCurrent ? "Current Plan" : "Upgrade"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <UpgradeModal
          open={isUpgradeModalOpen}
          onOpenChange={setIsUpgradeModalOpen}
          plan={selectedPlan}
          billingPeriod={billingPeriod}
        />
      </div>
    </RoleGuard>
  );
}
