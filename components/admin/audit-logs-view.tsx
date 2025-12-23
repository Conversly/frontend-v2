"use client";

import { useQuery } from "@tanstack/react-query";
import { getAuditLogs, AuditLog } from "@/lib/api/admin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { 
  UserPlus, 
  UserMinus, 
  Mail, 
  XCircle, 
  CheckCircle, 
  DollarSign, 
  Bot, 
  Shield,
  Activity,
  Loader2
} from "lucide-react";

const ACTION_ICONS: Record<string, React.ReactNode> = {
  INVITE_SENT: <Mail className="w-4 h-4" />,
  INVITE_ACCEPTED: <CheckCircle className="w-4 h-4" />,
  INVITE_CANCELLED: <XCircle className="w-4 h-4" />,
  MEMBER_ADDED: <UserPlus className="w-4 h-4" />,
  MEMBER_REMOVED: <UserMinus className="w-4 h-4" />,
  ROLE_CHANGED: <Shield className="w-4 h-4" />,
  BUDGET_ALLOCATED: <DollarSign className="w-4 h-4" />,
  BUDGET_UPDATED: <DollarSign className="w-4 h-4" />,
  CREDITS_ADDED: <DollarSign className="w-4 h-4" />,
  CREDITS_DEDUCTED: <DollarSign className="w-4 h-4" />,
  CREDIT_REQUEST_CREATED: <DollarSign className="w-4 h-4" />,
  CREDIT_REQUEST_APPROVED: <CheckCircle className="w-4 h-4" />,
  CREDIT_REQUEST_REJECTED: <XCircle className="w-4 h-4" />,
  CHATBOT_CREATED: <Bot className="w-4 h-4" />,
  CHATBOT_ADMIN_ADDED: <UserPlus className="w-4 h-4" />,
  CHATBOT_ADMIN_REMOVED: <UserMinus className="w-4 h-4" />,
  WORKSPACE_CREATED: <Shield className="w-4 h-4" />,
};

const ACTION_COLORS: Record<string, string> = {
  INVITE_SENT: "bg-blue-100 text-blue-800",
  INVITE_ACCEPTED: "bg-green-100 text-green-800",
  INVITE_CANCELLED: "bg-red-100 text-red-800",
  MEMBER_ADDED: "bg-green-100 text-green-800",
  MEMBER_REMOVED: "bg-red-100 text-red-800",
  ROLE_CHANGED: "bg-purple-100 text-purple-800",
  BUDGET_ALLOCATED: "bg-yellow-100 text-yellow-800",
  BUDGET_UPDATED: "bg-yellow-100 text-yellow-800",
  CREDITS_ADDED: "bg-green-100 text-green-800",
  CREDITS_DEDUCTED: "bg-orange-100 text-orange-800",
  CREDIT_REQUEST_CREATED: "bg-blue-100 text-blue-800",
  CREDIT_REQUEST_APPROVED: "bg-green-100 text-green-800",
  CREDIT_REQUEST_REJECTED: "bg-red-100 text-red-800",
  CHATBOT_CREATED: "bg-indigo-100 text-indigo-800",
  CHATBOT_ADMIN_ADDED: "bg-green-100 text-green-800",
  CHATBOT_ADMIN_REMOVED: "bg-red-100 text-red-800",
  WORKSPACE_CREATED: "bg-blue-100 text-blue-800",
};

const formatAction = (action: string): string => {
  return action
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
};

const formatDetails = (details: Record<string, unknown> | null): string => {
  if (!details) return "";
  
  const parts: string[] = [];
  if (details.email) parts.push(`Email: ${details.email}`);
  if (details.role) parts.push(`Role: ${details.role}`);
  if (details.addedUserId) parts.push(`Added User: ${details.addedUserId}`);
  if (details.removedUserId) parts.push(`Removed User: ${details.removedUserId}`);
  if (details.inviteType) parts.push(`Type: ${details.inviteType}`);
  
  return parts.join(" • ");
};

export const AuditLogsView = () => {
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [resourceTypeFilter, setResourceTypeFilter] = useState<string>("all");

  const { data: logs, isLoading, error } = useQuery({
    queryKey: ["audit-logs", actionFilter, resourceTypeFilter],
    queryFn: () =>
      getAuditLogs({
        limit: 100,
        action: actionFilter !== "all" ? actionFilter : undefined,
        resourceType: resourceTypeFilter !== "all" ? resourceTypeFilter : undefined,
      }),
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-12">
          <p className="text-center text-destructive">
            Failed to load audit logs. Please try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter audit logs by action or resource type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Action</label>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="INVITE_SENT">Invite Sent</SelectItem>
                  <SelectItem value="INVITE_ACCEPTED">Invite Accepted</SelectItem>
                  <SelectItem value="INVITE_CANCELLED">Invite Cancelled</SelectItem>
                  <SelectItem value="MEMBER_ADDED">Member Added</SelectItem>
                  <SelectItem value="MEMBER_REMOVED">Member Removed</SelectItem>
                  <SelectItem value="ROLE_CHANGED">Role Changed</SelectItem>
                  <SelectItem value="BUDGET_ALLOCATED">Budget Allocated</SelectItem>
                  <SelectItem value="CREDITS_ADDED">Credits Added</SelectItem>
                  <SelectItem value="CREDITS_DEDUCTED">Credits Deducted</SelectItem>
                  <SelectItem value="CHATBOT_CREATED">Chatbot Created</SelectItem>
                  <SelectItem value="CHATBOT_ADMIN_ADDED">Chatbot Admin Added</SelectItem>
                  <SelectItem value="CHATBOT_ADMIN_REMOVED">Chatbot Admin Removed</SelectItem>
                  <SelectItem value="WORKSPACE_CREATED">Workspace Created</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Resource Type</label>
              <Select value={resourceTypeFilter} onValueChange={setResourceTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="ACCOUNT">Account</SelectItem>
                  <SelectItem value="CHATBOT">Chatbot</SelectItem>
                  <SelectItem value="BUDGET">Budget</SelectItem>
                  <SelectItem value="INVITE">Invite</SelectItem>
                  <SelectItem value="MEMBER">Member</SelectItem>
                  <SelectItem value="CREDIT_REQUEST">Credit Request</SelectItem>
                  <SelectItem value="WALLET">Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Activity Log
          </CardTitle>
          <CardDescription>
            {logs?.length || 0} {logs?.length === 1 ? "event" : "events"} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logs && logs.length > 0 ? (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className={`p-2 rounded-full ${ACTION_COLORS[log.action] || "bg-gray-100 text-gray-800"}`}>
                    {ACTION_ICONS[log.action] || <Activity className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className={ACTION_COLORS[log.action] || ""}>
                            {formatAction(log.action)}
                          </Badge>
                          {log.resourceType && (
                            <Badge variant="secondary">{log.resourceType}</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">{log.userDisplayName}</span>
                          {log.userEmail && (
                            <span className="text-muted-foreground"> ({log.userEmail})</span>
                          )}
                        </p>
                        {log.details && Object.keys(log.details).length > 0 && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {formatDetails(log.details)}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(log.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No audit logs found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

