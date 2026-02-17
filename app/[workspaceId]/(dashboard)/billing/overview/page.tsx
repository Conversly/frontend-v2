"use client";

import { useEffect, useState, useMemo } from "react";
import { useWorkspace } from "@/contexts/workspace-context";
import { AccessGuard } from "@/components/auth/access-guard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  getWorkspaceBilling,
  getWorkspaceInvoices,
  BillingInfo,
  UserInvoice
} from "@/lib/api/workspaces";
import { getSubscriptionPlans, SubscriptionPlan, downloadInvoice } from "@/lib/api/subscription";
import { toast } from "sonner";
import {
  Loader2,
  CreditCard,
  History,
  DollarSign,
  Check,
  X,
  Zap,
  ArrowUpRight,
  ArrowDownLeft,
  AlertCircle,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BillingPage() {
  const { workspaceName, workspaceId } = useWorkspace();
  const [billingInfo, setBillingInfo] = useState<BillingInfo | null>(null);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [invoices, setInvoices] = useState<UserInvoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (workspaceId) {
      fetchData();
    }
  }, [workspaceId]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [billingData, invoicesData, plansData] = await Promise.all([
        getWorkspaceBilling(workspaceId),
        getWorkspaceInvoices(workspaceId),
        getSubscriptionPlans(),
      ]);
      setBillingInfo(billingData);
      setInvoices(invoicesData);
      setPlans(plansData);
    } catch (error: any) {
      console.error("Failed to load billing data:", error);
      toast.error("Failed to load billing data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const currentPlan = useMemo(() => {
    if (!billingInfo?.subscription?.planId) return null;
    return plans.find(p => p.planId === billingInfo.subscription?.planId) || null;
  }, [billingInfo, plans]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: string | number, currency: string) => {
    if (currency === "USD") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(Number(amount));
    }
    return `${Number(amount).toLocaleString()} Credits`;
  };

  const calculateUsagePercentage = (used: number, limit: number) => {
    if (!limit) return 0;
    return Math.min(Math.round((used / limit) * 100), 100);
  };

  return (
    <AccessGuard capability="canManageBilling">
      <div className="container max-w-7xl px-4 py-8 md:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>
          <p className="text-muted-foreground mt-1">
            Manage your subscription plan and view payment history for <span className="font-semibold text-foreground">{workspaceName}</span>
          </p>
        </div>

        {isLoading ? (
          <div className="flex h-60 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            {/* Top Grid: Plan, Wallet, Usage */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Current Plan Card */}
              <Card className="flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Current Plan
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl font-bold">{billingInfo?.subscription?.planName || "Free Plan"}</div>
                    {billingInfo?.subscription?.status && (
                      <Badge variant={billingInfo.subscription.status === 'ACTIVE' ? 'default' : 'secondary'}>
                        {billingInfo.subscription.status}
                      </Badge>
                    )}
                  </div>
                  <div className="mt-4 space-y-1">
                    <p className="text-sm text-muted-foreground">
                      {billingInfo?.subscription?.periodEnd
                        ? `Renews on ${formatDate(billingInfo.subscription.periodEnd)}`
                        : 'No active subscription renewal'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ({billingInfo?.subscription?.price || "$0.00"} / period)
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Manage Subscription</Button>
                </CardFooter>
              </Card>

              {/* Wallet Balance Card */}
              <Card className="flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Wallet Balance
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="text-2xl font-bold">
                    {formatCurrency(billingInfo?.balance || 0, billingInfo?.currency || 'CREDITS')}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Available credits for usage
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span>Auto-recharge disabled</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Add Funds</Button>
                </CardFooter>
              </Card>

              {/* Usage Card */}
              <Card className="flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Usage
                  </CardTitle>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Messages Sent</span>
                      <span className="font-medium">
                        {billingInfo?.usage?.messagesSent ?? 0} / {billingInfo?.subscription?.limits?.messages ?? "∞"}
                      </span>
                    </div>
                    <Progress value={calculateUsagePercentage(
                      billingInfo?.usage?.messagesSent ?? 0,
                      billingInfo?.subscription?.limits?.messages ?? 0
                    )} className="h-2" />
                  </div>
                  {/* Placeholder for other usage metrics if needed */}
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground">Usage resets on {billingInfo?.subscription?.periodEnd ? formatDate(billingInfo.subscription.periodEnd) : 'next billing cycle'}.</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Plan Features Section */}
            {currentPlan && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold tracking-tight">Plan Features</h2>
                <Card>
                  <CardContent className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Core Features</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          {currentPlan.entitlements.maxChatbots > 1 ? <Check className="h-4 w-4 text-green-500" /> : <Check className="h-4 w-4 text-green-500" />}
                          Up to {currentPlan.entitlements.maxChatbots} Chatbots
                        </li>
                        <li className="flex items-center gap-2">
                          {currentPlan.entitlements.maxUsers > 1 ? <Check className="h-4 w-4 text-green-500" /> : <Check className="h-4 w-4 text-green-500" />}
                          Up to {currentPlan.entitlements.maxUsers} Users
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Integrations</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          {currentPlan.entitlements.allowWhatsApp ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-muted-foreground" />}
                          WhatsApp Integration
                        </li>
                        <li className="flex items-center gap-2">
                          {currentPlan.entitlements.allowWebhooks ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-muted-foreground" />}
                          Webhooks
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Advanced</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          {currentPlan.entitlements.allowAPI ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-muted-foreground" />}
                          API Access
                        </li>
                        <li className="flex items-center gap-2">
                          {currentPlan.entitlements.allowCustomBranding ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-muted-foreground" />}
                          Custom Branding
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Support</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          {currentPlan.entitlements.prioritySupport ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-muted-foreground" />}
                          Priority Support
                        </li>
                        {currentPlan.entitlements.sla && (
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            SLA: {currentPlan.entitlements.sla}
                          </li>
                        )}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Transaction History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Transaction History
                </CardTitle>
                <CardDescription>
                  View your recent transactions, invoices, and credit usage.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {invoices.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <AlertCircle className="h-10 w-10 mb-4 opacity-20" />
                    <p>No transactions found for this workspace.</p>
                  </div>
                ) : (
                  <div className="relative w-full overflow-auto rounded-md border">
                    <table className="w-full caption-bottom text-sm text-left">
                      <thead className="bg-muted/50 [&_tr]:border-b">
                        <tr className="border-b transition-colors">
                          <th className="h-10 px-4 align-middle font-medium text-muted-foreground">Date</th>
                          <th className="h-10 px-4 align-middle font-medium text-muted-foreground">Type</th>
                          <th className="h-10 px-4 align-middle font-medium text-muted-foreground">Description</th>
                          <th className="h-10 px-4 align-middle font-medium text-muted-foreground text-right">Amount</th>
                          <th className="h-10 px-4 align-middle font-medium text-muted-foreground text-right">Balance</th>
                          <th className="h-10 px-4 align-middle font-medium text-muted-foreground text-right">Invoice</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0 bg-card">
                        {invoices.map((invoice) => (
                          <tr key={invoice.id} className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle">{formatDate(invoice.createdAt)}</td>
                            <td className="p-4 align-middle">
                              <Badge
                                variant={invoice.type === 'CREDIT' ? 'default' : 'outline'}
                                className={cn(
                                  "uppercase text-[10px] items-center gap-1",
                                  invoice.type === 'DEBIT' && "border-destructive text-destructive"
                                )}
                              >
                                {invoice.type === 'CREDIT' ? <ArrowDownLeft className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
                                {invoice.type}
                              </Badge>
                            </td>
                            <td className="p-4 align-middle text-muted-foreground capitalize">
                              {invoice.referenceType?.toLowerCase() || 'Manual Transaction'}
                            </td>
                            <td className={cn(
                              "p-4 align-middle text-right font-medium",
                              invoice.type === 'CREDIT' ? "text-green-600" : "text-destructive"
                            )}>
                              {invoice.type === 'CREDIT' ? '+' : '-'}{invoice.amount}
                            </td>
                            <td className="p-4 align-middle text-right text-muted-foreground font-mono">
                              {invoice.balanceAfter}
                            </td>
                            <td className="p-4 align-middle text-right">
                              {invoice.dodoPaymentId && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => downloadInvoice(invoice.dodoPaymentId!)}
                                  title="Download Invoice"
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AccessGuard>
  );
}
