"use client";

import { useQuery } from "@tanstack/react-query";
import { getAuditLogs, AuditLog } from "@/lib/api/admin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDistanceToNow } from "date-fns";
import {
  Activity,
  Users,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Bot,
  Mail,
  UserPlus,
  UserMinus,
  Loader2,
  BarChart3,
  Clock,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  CreditCard,
  FileText,
} from "lucide-react";

interface AnalyticsDashboardProps {
  isOwner: boolean;
}

export const AnalyticsDashboard = ({ isOwner }: AnalyticsDashboardProps) => {
  const { data: auditLogs, isLoading } = useQuery({
    queryKey: ["audit-logs"],
    queryFn: () => getAuditLogs({ limit: 50 }),
    enabled: isOwner, // Only fetch if owner
  });

  // Calculate comprehensive statistics from audit logs
  const stats = auditLogs
    ? {
        totalEvents: auditLogs.length,
        invitesSent: auditLogs.filter((log) => log.action === "INVITE_SENT").length,
        invitesAccepted: auditLogs.filter((log) => log.action === "INVITE_ACCEPTED").length,
        invitesCancelled: auditLogs.filter((log) => log.action === "INVITE_CANCELLED").length,
        membersAdded: auditLogs.filter((log) => log.action === "MEMBER_ADDED").length,
        membersRemoved: auditLogs.filter((log) => log.action === "MEMBER_REMOVED").length,
        creditsAdded: auditLogs.filter((log) => log.action === "CREDITS_ADDED").length,
        creditsDeducted: auditLogs.filter((log) => log.action === "CREDITS_DEDUCTED").length,
        creditRequestsCreated: auditLogs.filter((log) => log.action === "CREDIT_REQUEST_CREATED").length,
        creditRequestsApproved: auditLogs.filter((log) => log.action === "CREDIT_REQUEST_APPROVED").length,
        creditRequestsRejected: auditLogs.filter((log) => log.action === "CREDIT_REQUEST_REJECTED").length,
        chatbotsCreated: auditLogs.filter((log) => log.action === "CHATBOT_CREATED").length,
        chatbotAdminsAdded: auditLogs.filter((log) => log.action === "CHATBOT_ADMIN_ADDED").length,
        chatbotAdminsRemoved: auditLogs.filter((log) => log.action === "CHATBOT_ADMIN_REMOVED").length,
        roleChanges: auditLogs.filter((log) => log.action === "ROLE_CHANGED").length,
        recentActivity: auditLogs.slice(0, 10),
        // Calculate totals from details
        totalCreditsAdded: auditLogs
          .filter((log) => log.action === "CREDITS_ADDED" && log.details?.amount)
          .reduce((sum, log) => sum + (Number(log.details?.amount) || 0), 0),
        totalCreditRequestsAmount: auditLogs
          .filter((log) => log.action === "CREDIT_REQUEST_APPROVED" && log.details?.amount)
          .reduce((sum, log) => sum + (Number(log.details?.amount) || 0), 0),
      }
    : null;

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      {isOwner && stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEvents}</div>
              <p className="text-xs text-muted-foreground">All time activity</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.membersAdded - stats.membersRemoved}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.membersAdded} added, {stats.membersRemoved} removed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Invites</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.invitesSent}</div>
              <p className="text-xs text-muted-foreground">
                {stats.invitesAccepted} accepted, {stats.invitesCancelled} cancelled
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chatbots</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.chatbotsCreated}</div>
              <p className="text-xs text-muted-foreground">
                {stats.chatbotAdminsAdded} admins assigned
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credits Added</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.creditsAdded}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalCreditsAdded > 0 ? `₹${stats.totalCreditsAdded.toLocaleString()} total` : "No amount data"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credit Requests</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.creditRequestsCreated}</div>
              <p className="text-xs text-muted-foreground">
                {stats.creditRequestsApproved} approved, {stats.creditRequestsRejected} rejected
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Role Changes</CardTitle>
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.roleChanges}</div>
              <p className="text-xs text-muted-foreground">Permission updates</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credits Deducted</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.creditsDeducted}</div>
              <p className="text-xs text-muted-foreground">Usage transactions</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {isOwner && <TabsTrigger value="business">Business Insights</TabsTrigger>}
          {isOwner && <TabsTrigger value="audit">Audit Logs</TabsTrigger>}
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Team Activity
                </CardTitle>
                <CardDescription>
                  Team member management and invitations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isOwner && stats ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-muted/50">
                      <span className="text-sm text-muted-foreground">Members Added</span>
                      <span className="font-semibold text-lg">{stats.membersAdded}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-muted/50">
                      <span className="text-sm text-muted-foreground">Members Removed</span>
                      <span className="font-semibold text-lg">{stats.membersRemoved}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-muted/50">
                      <span className="text-sm text-muted-foreground">Net Members</span>
                      <span className="font-semibold text-lg text-emerald-600">
                        {stats.membersAdded - stats.membersRemoved}
                      </span>
                    </div>
                    <div className="pt-2 border-t space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Invites Sent</span>
                        <span className="font-medium">{stats.invitesSent}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Invites Accepted</span>
                        <span className="font-medium text-emerald-600">{stats.invitesAccepted}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Invites Cancelled</span>
                        <span className="font-medium text-red-600">{stats.invitesCancelled}</span>
                      </div>
                      {stats.invitesSent > 0 && (
                        <div className="pt-2">
                          <div className="text-xs text-muted-foreground mb-1">Acceptance Rate</div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-emerald-600 h-2 rounded-full"
                              style={{ width: `${(stats.invitesAccepted / stats.invitesSent) * 100}%` }}
                            />
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {Math.round((stats.invitesAccepted / stats.invitesSent) * 100)}%
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    Analytics overview available for workspace owners only.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  Chatbot Activity
                </CardTitle>
                <CardDescription>
                  Chatbot creation and management
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isOwner && stats ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-muted/50">
                      <span className="text-sm text-muted-foreground">Chatbots Created</span>
                      <span className="font-semibold text-lg">{stats.chatbotsCreated}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-muted/50">
                      <span className="text-sm text-muted-foreground">Admins Assigned</span>
                      <span className="font-semibold text-lg">{stats.chatbotAdminsAdded}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-muted/50">
                      <span className="text-sm text-muted-foreground">Admins Removed</span>
                      <span className="font-semibold text-lg">{stats.chatbotAdminsRemoved}</span>
                    </div>
                    <div className="pt-2 border-t space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Credits Added</span>
                        <span className="font-medium text-emerald-600">{stats.creditsAdded}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Credits Deducted</span>
                        <span className="font-medium text-orange-600">{stats.creditsDeducted}</span>
                      </div>
                      {stats.totalCreditsAdded > 0 && (
                        <div className="pt-2">
                          <div className="text-xs text-muted-foreground mb-1">Total Credits Added</div>
                          <div className="text-lg font-bold text-emerald-600">
                            ₹{stats.totalCreditsAdded.toLocaleString()}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    Analytics overview available for workspace owners only.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {isOwner && (
          <TabsContent value="business" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Business Insights
                </CardTitle>
                <CardDescription>
                  Key business metrics and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                {stats ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg border bg-muted/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Credit Requests</span>
                          <CreditCard className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="text-2xl font-bold">{stats.creditRequestsCreated}</div>
                        <div className="flex items-center gap-2 mt-2 text-xs">
                          <span className="text-emerald-600">{stats.creditRequestsApproved} approved</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-red-600">{stats.creditRequestsRejected} rejected</span>
                        </div>
                        {stats.creditRequestsCreated > 0 && (
                          <div className="mt-2 text-xs text-muted-foreground">
                            Approval Rate: {Math.round((stats.creditRequestsApproved / stats.creditRequestsCreated) * 100)}%
                          </div>
                        )}
                      </div>

                      <div className="p-4 rounded-lg border bg-muted/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Total Credits Added</span>
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="text-2xl font-bold">
                          ₹{stats.totalCreditsAdded > 0 ? stats.totalCreditsAdded.toLocaleString() : '0'}
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          {stats.creditsAdded} transactions
                        </div>
                      </div>

                      <div className="p-4 rounded-lg border bg-muted/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Role Changes</span>
                          <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="text-2xl font-bold">{stats.roleChanges}</div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          Permission updates
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="font-semibold mb-4">Activity Summary</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 rounded-lg bg-muted/50">
                          <div className="text-lg font-bold">{stats.totalEvents}</div>
                          <div className="text-xs text-muted-foreground">Total Events</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-muted/50">
                          <div className="text-lg font-bold">{stats.chatbotsCreated}</div>
                          <div className="text-xs text-muted-foreground">Chatbots</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-muted/50">
                          <div className="text-lg font-bold">{stats.membersAdded - stats.membersRemoved}</div>
                          <div className="text-xs text-muted-foreground">Active Members</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-muted/50">
                          <div className="text-lg font-bold">{stats.invitesAccepted}</div>
                          <div className="text-xs text-muted-foreground">Accepted Invites</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    Loading business insights...
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {isOwner && (
          <TabsContent value="audit" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  Audit Trail
                </CardTitle>
                <CardDescription>
                  Complete audit log of all workspace activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                  </div>
                ) : auditLogs && auditLogs.length > 0 ? (
                  <div className="space-y-3">
                    {auditLogs.slice(0, 20).map((log) => (
                      <div
                        key={log.id}
                        className="flex items-start gap-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="p-2 rounded-full bg-muted">
                          <Activity className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline">{log.action.replace(/_/g, " ")}</Badge>
                            {log.resourceType && (
                              <Badge variant="secondary">{log.resourceType}</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">{log.userDisplayName}</span>
                            {log.userEmail && ` (${log.userEmail})`}
                          </p>
                          {log.details && Object.keys(log.details).length > 0 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {JSON.stringify(log.details, null, 2)}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-12">
                    No audit logs found
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest activities in your workspace
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isOwner && stats && stats.recentActivity.length > 0 ? (
                <div className="space-y-3">
                  {stats.recentActivity.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-start gap-3 p-3 border rounded-lg"
                    >
                      <div className="p-1.5 rounded-full bg-muted">
                        <Activity className="w-3 h-3" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{log.userDisplayName}</span>{" "}
                          <span className="text-muted-foreground">
                            {log.action.replace(/_/g, " ").toLowerCase()}
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-12">
                  {isOwner ? "No recent activity" : "Activity logs available for workspace owners only"}
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};



