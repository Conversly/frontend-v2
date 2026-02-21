"use client";

import { useEffect, useState, useMemo } from "react";
import { useWorkspace } from "@/contexts/workspace-context";
import { AccessGuard } from "@/components/auth/access-guard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  getWorkspaceInvoices,
  UserInvoice
} from "@/lib/api/workspaces";
import { useSubscription } from "@/contexts/subscription-context";
import {
  getSubscriptionPlans,
  SubscriptionPlan,
  downloadInvoice,
  cancelSubscription,
  resumeSubscription,
  createPortalSession,
} from "@/lib/api/subscription";
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
  AlertCircle,
  Download,
  Gift,
  RefreshCw,
  ShieldCheck,
  WalletCards,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BillingPage() {
  const { workspaceName, workspaceId, accountId } = useWorkspace();
  const { subscription, credits, usage, isLoading: isSubscriptionLoading, refetch } = useSubscription() as any;
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [invoices, setInvoices] = useState<UserInvoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isResuming, setIsResuming] = useState(false);
  const [isOpeningPortal, setIsOpeningPortal] = useState(false);

  useEffect(() => {
    if (workspaceId) {
      fetchData();
    }
  }, [workspaceId]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [invoicesData, plansData] = await Promise.all([
        getWorkspaceInvoices(workspaceId),
        getSubscriptionPlans(),
      ]);
      setInvoices(invoicesData);
      setPlans(plansData);
    } catch (error: any) {
      console.error("Failed to load billing data:", error);
      toast.error("Failed to load billing data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const isPageLoading = isLoading || isSubscriptionLoading;

  const currentPlan = useMemo(() => {
    if (!subscription?.planId) return null;
    return plans.find(p => p.planId === subscription?.planId) || null;
  }, [subscription, plans]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formatUSD = (cents: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);

  const handleDownload = async (paymentId: string) => {
    try {
      setDownloadingId(paymentId);
      await downloadInvoice(paymentId);
      toast.success("Invoice downloaded.");
    } catch {
      toast.error("Failed to download invoice. Please try again.");
    } finally {
      setDownloadingId(null);
    }
  };

  const handleManageSubscription = async () => {
    try {
      setIsOpeningPortal(true);
      const portalUrl = await createPortalSession(accountId);
      window.location.href = portalUrl;
    } catch (error: any) {
      toast.error(error.message || "Failed to open billing portal. Please try again.");
    } finally {
      setIsOpeningPortal(false);
    }
  };

  const handleCancelPlan = async () => {
    try {
      setIsCancelling(true);
      await cancelSubscription();
      toast.success("Your plan has been scheduled for cancellation. You'll keep full access until your billing period ends.");
      // Refetch subscription so cancelAtPeriodEnd updates in UI
      if (typeof refetch === "function") await refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to cancel subscription. Please try again.");
    } finally {
      setIsCancelling(false);
    }
  };

  const handleResumePlan = async () => {
    try {
      setIsResuming(true);
      await resumeSubscription();
      toast.success("Your subscription has been resumed. It will renew as normal.");
      if (typeof refetch === "function") await refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to resume subscription. Please try again.");
    } finally {
      setIsResuming(false);
    }
  };

  const getTransactionIcon = (tx: UserInvoice) => {
    if (tx.paymentStatus === "failed") return <AlertTriangle className="h-4 w-4 text-destructive" />;
    if (tx.type === "payment") return <WalletCards className="h-4 w-4 text-muted-foreground" />;
    if (tx.description?.includes("Renewal")) return <RefreshCw className="h-4 w-4 text-blue-500" />;
    if (tx.description?.includes("Bonus") || tx.description?.includes("Welcome"))
      return <Gift className="h-4 w-4 text-purple-500" />;
    if (tx.description?.includes("Purchase")) return <ShieldCheck className="h-4 w-4 text-green-500" />;
    return <CreditCard className="h-4 w-4 text-muted-foreground" />;
  };

  const getStatusBadge = (tx: UserInvoice) => {
    if (!tx.paymentStatus) return null;
    const styles: Record<string, string> = {
      succeeded: "bg-green-100 text-green-700 border-green-200",
      failed: "bg-red-100 text-red-700 border-red-200",
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      canceled: "bg-muted text-muted-foreground",
    };
    return (
      <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded border capitalize", styles[tx.paymentStatus] ?? "bg-muted text-muted-foreground")}>
        {tx.paymentStatus}
      </span>
    );
  };

  // Flags used to control cancel/resume buttons
  const hasPaidActiveSub = subscription?.status === "ACTIVE" && !!subscription?.validUntil;
  const isCancelledAtPeriodEnd = subscription?.cancelAtPeriodEnd === true;

  return (
    <AccessGuard capability="canManageBilling">
      <div className="container max-w-7xl px-4 py-8 md:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing &amp; Subscription</h1>
          <p className="text-muted-foreground mt-1">
            Manage your subscription plan and view payment history for <span className="font-semibold text-foreground">{workspaceName}</span>
          </p>
        </div>

        {isPageLoading ? (
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
                  <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl font-bold">{subscription?.planName || "Free Plan"}</div>
                    <div className="flex items-center gap-2">
                      {subscription?.status && (
                        <Badge variant={subscription.status === "ACTIVE" ? "default" : "secondary"}>
                          {isCancelledAtPeriodEnd ? "Cancelling" : subscription.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 space-y-1">
                    {isCancelledAtPeriodEnd ? (
                      <p className="text-sm text-amber-600 font-medium">
                        Cancels on {subscription?.validUntil ? formatDate(subscription.validUntil) : "period end"} — access continues until then
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {subscription?.validUntil
                          ? `Renews on ${formatDate(subscription.validUntil)}`
                          : "No active subscription renewal"}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">Manage your plan details below</p>
                  </div>
                </CardContent>

                {/* Manage Subscription Footer */}
                <CardFooter className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={isOpeningPortal}
                    onClick={handleManageSubscription}
                  >
                    {isOpeningPortal
                      ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Opening portal…</>
                      : "Manage Subscription"
                    }
                  </Button>

                  {/* Cancel Plan — shown when active paid sub and NOT already cancelling */}
                  {hasPaidActiveSub && !isCancelledAtPeriodEnd && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                          disabled={isCancelling}
                        >
                          {isCancelling
                            ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Cancelling…</>
                            : "Cancel Plan"
                          }
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Cancel your subscription?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Your <strong>{subscription?.planName}</strong> plan will remain active until{" "}
                            <strong>{subscription?.validUntil ? formatDate(subscription.validUntil) : "the end of your billing period"}</strong>.
                            After that, your account will revert to the free plan and no further charges will be made.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Keep my plan</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={handleCancelPlan}
                          >
                            Yes, cancel plan
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}

                  {/* Resume Plan — shown when cancellation is scheduled */}
                  {hasPaidActiveSub && isCancelledAtPeriodEnd && (
                    <Button
                      variant="outline"
                      className="w-full text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                      disabled={isResuming}
                      onClick={handleResumePlan}
                    >
                      {isResuming
                        ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Resuming…</>
                        : "↩ Resume Plan"
                      }
                    </Button>
                  )}
                </CardFooter>
              </Card>

              {/* Wallet Balance Card */}
              <Card className="flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="text-2xl font-bold">
                    {(credits?.balance || 0).toLocaleString()} Credits
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Available credits for usage</p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span>Auto-recharge disabled</span>
                  </div>
                </CardContent>
              </Card>

              {/* Usage Card */}
              <Card className="flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Usage</CardTitle>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Messages Sent</span>
                      <span className="font-medium">{usage?.messagesSent ?? 0}</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground">
                      Usage resets on {subscription?.validUntil ? formatDate(subscription.validUntil) : "next billing cycle"}.
                    </p>
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
                          <Check className="h-4 w-4 text-green-500" />
                          Up to {currentPlan.entitlements.maxChatbots} Chatbots
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
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
                  Your credit grants and payments — newest first.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {invoices.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <AlertCircle className="h-10 w-10 mb-4 opacity-20" />
                    <p className="font-medium">No transactions yet</p>
                    <p className="text-sm mt-1">Your billing history will appear here once you have activity.</p>
                  </div>
                ) : (
                  <div className="relative w-full overflow-auto rounded-md border">
                    <table className="w-full caption-bottom text-sm text-left">
                      <thead className="bg-muted/50">
                        <tr className="border-b">
                          <th className="h-10 px-4 align-middle font-medium text-muted-foreground">Date</th>
                          <th className="h-10 px-4 align-middle font-medium text-muted-foreground">Description</th>
                          <th className="h-10 px-4 align-middle font-medium text-muted-foreground">Plan</th>
                          <th className="h-10 px-4 align-middle font-medium text-muted-foreground text-right">Amount Charged</th>
                          <th className="h-10 px-4 align-middle font-medium text-muted-foreground text-right">Credits</th>
                          <th className="h-10 px-4 align-middle font-medium text-muted-foreground text-right">Balance</th>
                          <th className="h-10 px-4 align-middle font-medium text-muted-foreground text-center">Status</th>
                          <th className="h-10 px-4 align-middle font-medium text-muted-foreground text-center">Invoice</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0 bg-card">
                        {invoices.map((tx) => (
                          <tr
                            key={tx.id}
                            className={cn(
                              "border-b transition-colors hover:bg-muted/50",
                              tx.paymentStatus === "failed" && "bg-destructive/5"
                            )}
                          >
                            <td className="p-4 align-middle whitespace-nowrap text-muted-foreground text-xs">
                              {formatDate(tx.date)}
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-2">
                                {getTransactionIcon(tx)}
                                <span className="font-medium">{tx.description}</span>
                              </div>
                            </td>
                            <td className="p-4 align-middle text-muted-foreground text-sm">
                              {tx.planName ?? <span className="text-muted-foreground/40">—</span>}
                            </td>
                            <td className="p-4 align-middle text-right font-medium">
                              {tx.paymentAmount != null && tx.paymentAmount > 0
                                ? <span className="text-foreground">{formatUSD(tx.paymentAmount)}</span>
                                : <span className="text-muted-foreground/40">—</span>
                              }
                            </td>
                            <td className="p-4 align-middle text-right font-medium">
                              {tx.creditsAdded > 0
                                ? <span className="text-green-600">+{tx.creditsAdded.toLocaleString()}</span>
                                : <span className="text-muted-foreground/40">—</span>
                              }
                            </td>
                            <td className="p-4 align-middle text-right font-mono text-sm text-muted-foreground">
                              {tx.balanceAfter.toLocaleString()}
                            </td>
                            <td className="p-4 align-middle text-center">
                              {getStatusBadge(tx)}
                            </td>
                            <td className="p-4 align-middle text-center">
                              {tx.dodoPaymentId ? (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  disabled={downloadingId === tx.dodoPaymentId}
                                  onClick={() => handleDownload(tx.dodoPaymentId!)}
                                  title="Download Invoice PDF"
                                >
                                  {downloadingId === tx.dodoPaymentId
                                    ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                    : <Download className="h-3.5 w-3.5" />
                                  }
                                </Button>
                              ) : (
                                <span className="text-muted-foreground/30 text-xs">—</span>
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
