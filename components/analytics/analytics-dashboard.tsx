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

  // Calculate statistics from audit logs
  const stats = auditLogs
    ? {
        totalEvents: auditLogs.length,
        invitesSent: auditLogs.filter((log) => log.action === "INVITE_SENT").length,
        membersAdded: auditLogs.filter((log) => log.action === "MEMBER_ADDED").length,
        membersRemoved: auditLogs.filter((log) => log.action === "MEMBER_REMOVED").length,
        creditsAdded: auditLogs.filter((log) => log.action === "CREDITS_ADDED").length,
        creditsDeducted: auditLogs.filter((log) => log.action === "CREDITS_DEDUCTED").length,
        chatbotsCreated: auditLogs.filter((log) => log.action === "CHATBOT_CREATED").length,
        recentActivity: auditLogs.slice(0, 10),
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
              <CardTitle className="text-sm font-medium">Invites Sent</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.invitesSent}</div>
              <p className="text-xs text-muted-foreground">Total invitations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chatbots</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.chatbotsCreated}</div>
              <p className="text-xs text-muted-foreground">Created chatbots</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {isOwner && <TabsTrigger value="audit">Audit Logs</TabsTrigger>}
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workspace Overview</CardTitle>
              <CardDescription>
                Key metrics and insights for your workspace
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isOwner && stats ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Team Activity
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Members Added</span>
                        <span className="font-medium">{stats.membersAdded}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Members Removed</span>
                        <span className="font-medium">{stats.membersRemoved}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Invites Sent</span>
                        <span className="font-medium">{stats.invitesSent}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Bot className="w-4 h-4" />
                      Chatbot Activity
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Chatbots Created</span>
                        <span className="font-medium">{stats.chatbotsCreated}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Credits Added</span>
                        <span className="font-medium">{stats.creditsAdded}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Credits Deducted</span>
                        <span className="font-medium">{stats.creditsDeducted}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Analytics overview available for workspace owners only.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

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

