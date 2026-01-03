"use client";

import { useRouter } from "next/navigation";
import { BillingDashboard } from "@/components/billing/billing-dashboard";
import { RoleGuard } from "@/components/auth/role-guard";
import { useQuery } from "@tanstack/react-query";
import { getCurrentSubscription } from "@/lib/api/subscription";
import { QUERY_KEY } from "@/utils/query-key";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rocket, CreditCard } from "lucide-react";
import Link from "next/link";

export default function BillingPage() {
  const router = useRouter();

  const { data: currentSubscription } = useQuery({
    queryKey: [QUERY_KEY.CURRENT_SUBSCRIPTION],
    queryFn: getCurrentSubscription,
    retry: false,
  });

  const handleNavigateToChatbot = (chatbotId: string) => {
    router.push(`/billing/${chatbotId}`);
  };

  return (
    <RoleGuard requireOwner>
      <div className="container mx-auto py-6 max-w-7xl space-y-6">
        {currentSubscription && (
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  <CardTitle>Current Subscription</CardTitle>
                </div>
                <Link href="/plans">
                  <Button variant="outline" size="sm">
                    <Rocket className="w-4 h-4 mr-2" />
                    Upgrade Plan
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">{currentSubscription.planName}</p>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    Status: <Badge variant={currentSubscription.status === "active" ? "default" : "secondary"}>{currentSubscription.status}</Badge>
                  </div>
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
        <BillingDashboard onNavigateToChatbot={handleNavigateToChatbot} />
      </div>
    </RoleGuard>
  );
}
