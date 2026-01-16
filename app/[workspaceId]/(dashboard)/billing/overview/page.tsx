"use client";

import { useEffect, useState } from "react";
import { useWorkspace } from "@/contexts/workspace-context";
import { AccessGuard } from "@/components/auth/access-guard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  getWorkspaceBilling,
  getWorkspaceInvoices,
  BillingInfo,
  UserInvoice
} from "@/lib/api/workspaces";
import { toast } from "sonner";
import { Loader2, CreditCard, History, DollarSign, Download, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BillingPage() {
  const { workspaceName, workspaceId } = useWorkspace();
  const [billingInfo, setBillingInfo] = useState<BillingInfo | null>(null);
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
      const [billingData, invoicesData] = await Promise.all([
        getWorkspaceBilling(workspaceId),
        getWorkspaceInvoices(workspaceId),
      ]);
      setBillingInfo(billingData);
      setInvoices(invoicesData);
    } catch (error: any) {
      toast.error("Failed to load billing data");
    } finally {
      setIsLoading(false);
    }
  };

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
    return `${Number(amount).toFixed(2)} Credits`;
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
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Current Plan
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{billingInfo?.subscription?.planName || "Free Tier"}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {billingInfo?.subscription ? (
                      <>
                        <Badge variant={billingInfo.subscription.status === 'ACTIVE' ? 'default' : 'secondary'} className="mr-2">
                          {billingInfo.subscription.status}
                        </Badge>
                        Renews on {formatDate(billingInfo.subscription.periodEnd)}
                      </>
                    ) : (
                      "No active subscription"
                    )}
                  </p>
                </CardContent>
                {billingInfo?.subscription && (
                  <CardFooter>
                    <Button variant="outline" className="w-full">Manage Subscription</Button>
                  </CardFooter>
                )}
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Wallet Balance
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(billingInfo?.balance || 0, billingInfo?.currency || 'CREDITS')}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Available for usage
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Add Funds</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Usage
                  </CardTitle>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {/* Placeholder for usage stats */}
                    --
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Usage billing this period
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Transaction History
                </CardTitle>
                <CardDescription>
                  Recent transactions and invoices.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {invoices.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No transactions found.
                  </div>
                ) : (
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-left">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Date</th>
                          <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Type</th>
                          <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Reference</th>
                          <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Amount</th>
                          <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Balance After</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {invoices.map((invoice) => (
                          <tr key={invoice.id} className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle">{formatDate(invoice.createdAt)}</td>
                            <td className="p-4 align-middle">
                              <Badge variant={invoice.type === 'CREDIT' ? 'default' : 'destructive'} className="uppercase text-[10px]">
                                {invoice.type === 'CREDIT' ? <ArrowDownLeft className="h-3 w-3 mr-1" /> : <ArrowUpRight className="h-3 w-3 mr-1" />}
                                {invoice.type}
                              </Badge>
                            </td>
                            <td className="p-4 align-middle capitalize">{invoice.referenceType || 'Manual'}</td>
                            <td className={`p-4 align-middle text-right font-medium ${invoice.type === 'CREDIT' ? 'text-green-600' : 'text-red-600'}`}>
                              {invoice.type === 'CREDIT' ? '+' : '-'}{invoice.amount}
                            </td>
                            <td className="p-4 align-middle text-right text-muted-foreground">
                              {invoice.balanceAfter}
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
