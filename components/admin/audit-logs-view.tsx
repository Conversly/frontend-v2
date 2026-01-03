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
  Loader2,
  Download,
  Search,
  Calendar,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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

const formatDetails = (details: Record<string, unknown> | null): React.ReactNode => {
  if (!details || Object.keys(details).length === 0) return null;
  
  const detailItems: Array<{ label: string; value: string | number | React.ReactNode }> = [];
  
  // Format common fields
  if (details.email) detailItems.push({ label: "Email", value: String(details.email) });
  if (details.role) detailItems.push({ label: "Role", value: String(details.role) });
  if (details.amount) detailItems.push({ label: "Amount", value: `₹${Number(details.amount).toLocaleString()}` });
  if (details.chatbotId) detailItems.push({ label: "Chatbot ID", value: String(details.chatbotId) });
  if (details.addedUserId) detailItems.push({ label: "Added User ID", value: String(details.addedUserId) });
  if (details.removedUserId) detailItems.push({ label: "Removed User ID", value: String(details.removedUserId) });
  if (details.inviteType) detailItems.push({ label: "Invite Type", value: String(details.inviteType) });
  if (details.requestedBy) detailItems.push({ label: "Requested By", value: String(details.requestedBy) });
  if (details.approvedBy) detailItems.push({ label: "Approved By", value: String(details.approvedBy) });
  if (details.rejectionReason) detailItems.push({ label: "Rejection Reason", value: String(details.rejectionReason) });
  
  // Add any other fields
  Object.entries(details).forEach(([key, value]) => {
    if (!['email', 'role', 'amount', 'chatbotId', 'addedUserId', 'removedUserId', 'inviteType', 'requestedBy', 'approvedBy', 'rejectionReason'].includes(key)) {
      detailItems.push({ label: key.replace(/([A-Z])/g, ' $1').trim(), value: String(value) });
    }
  });
  
  return (
    <div className="mt-2 space-y-1">
      {detailItems.map((item, idx) => (
        <div key={idx} className="text-xs text-muted-foreground">
          <span className="font-medium">{item.label}:</span> {item.value}
        </div>
      ))}
    </div>
  );
};

const exportToCSV = (logs: AuditLog[]) => {
  const headers = ['Timestamp', 'Action', 'User', 'Email', 'Resource Type', 'Resource ID', 'Details'];
  const rows = logs.map(log => [
    new Date(log.createdAt).toISOString(),
    formatAction(log.action),
    log.userDisplayName || '',
    log.userEmail || '',
    log.resourceType || '',
    log.resourceId || '',
    JSON.stringify(log.details || {})
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `audit-logs-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const AuditLogsView = () => {
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [resourceTypeFilter, setResourceTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());

  const { data: logs, isLoading, error } = useQuery({
    queryKey: ["audit-logs", actionFilter, resourceTypeFilter],
    queryFn: () =>
      getAuditLogs({
        limit: 200,
        action: actionFilter !== "all" ? actionFilter : undefined,
        resourceType: resourceTypeFilter !== "all" ? resourceTypeFilter : undefined,
      }),
  });

  // Filter logs by search query
  const filteredLogs = logs?.filter(log => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      log.action.toLowerCase().includes(query) ||
      log.userDisplayName?.toLowerCase().includes(query) ||
      log.userEmail?.toLowerCase().includes(query) ||
      log.resourceType?.toLowerCase().includes(query) ||
      log.resourceId?.toLowerCase().includes(query) ||
      JSON.stringify(log.details || {}).toLowerCase().includes(query)
    );
  }) || [];

  const toggleLogExpansion = (logId: string) => {
    const newExpanded = new Set(expandedLogs);
    if (newExpanded.has(logId)) {
      newExpanded.delete(logId);
    } else {
      newExpanded.add(logId);
    }
    setExpandedLogs(newExpanded);
  };

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
      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Filters & Search</CardTitle>
              <CardDescription>Filter and search audit logs by various criteria</CardDescription>
            </div>
            {filteredLogs.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportToCSV(filteredLogs)}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by action, user, email, resource..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
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
                    <SelectItem value="CREDITS_ADDED">Credits Added</SelectItem>
                    <SelectItem value="CREDITS_DEDUCTED">Credits Deducted</SelectItem>
                    <SelectItem value="CREDIT_REQUEST_CREATED">Credit Request Created</SelectItem>
                    <SelectItem value="CREDIT_REQUEST_APPROVED">Credit Request Approved</SelectItem>
                    <SelectItem value="CREDIT_REQUEST_REJECTED">Credit Request Rejected</SelectItem>
                    <SelectItem value="CHATBOT_CREATED">Chatbot Created</SelectItem>
                    <SelectItem value="CHATBOT_ADMIN_ADDED">Chatbot Admin Added</SelectItem>
                    <SelectItem value="CHATBOT_ADMIN_REMOVED">Chatbot Admin Removed</SelectItem>
                    <SelectItem value="WORKSPACE_CREATED">Workspace Created</SelectItem>
                    <SelectItem value="CHATBOT_CREDIT_ALLOCATION">Chatbot Credit Allocation</SelectItem>
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
                    <SelectItem value="INVITE">Invite</SelectItem>
                    <SelectItem value="MEMBER">Member</SelectItem>
                    <SelectItem value="CREDIT_REQUEST">Credit Request</SelectItem>
                    <SelectItem value="WALLET">Wallet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
            {filteredLogs.length} {filteredLogs.length === 1 ? "event" : "events"} found
            {searchQuery && ` (filtered from ${logs?.length || 0} total)`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => {
                const isExpanded = expandedLogs.has(log.id);
                const hasDetails = log.details && Object.keys(log.details).length > 0;
                
                return (
                  <Collapsible key={log.id} open={isExpanded} onOpenChange={() => toggleLogExpansion(log.id)}>
                    <div className="border rounded-lg hover:bg-muted/50 transition-colors">
                      <CollapsibleTrigger className="w-full">
                        <div className="flex items-start gap-4 p-4">
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
                                  {log.resourceId && (
                                    <Badge variant="outline" className="text-xs font-mono">
                                      {log.resourceId.slice(0, 8)}...
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  <span className="font-medium">{log.userDisplayName}</span>
                                  {log.userEmail && (
                                    <span className="text-muted-foreground"> ({log.userEmail})</span>
                                  )}
                                </p>
                                {hasDetails && !isExpanded && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Click to view details
                                  </p>
                                )}
                              </div>
                              <div className="text-right flex items-start gap-2">
                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {new Date(log.createdAt).toLocaleString()}
                                  </p>
                                </div>
                                {hasDetails && (
                                  <div className="pt-1">
                                    {isExpanded ? (
                                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                                    ) : (
                                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      {hasDetails && (
                        <CollapsibleContent>
                          <div className="px-4 pb-4 pt-0 border-t bg-muted/30">
                            <div className="pt-3">
                              <p className="text-xs font-medium text-muted-foreground mb-2">Details:</p>
                              {formatDetails(log.details)}
                            </div>
                          </div>
                        </CollapsibleContent>
                      )}
                    </div>
                  </Collapsible>
                );
              })
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No audit logs found</p>
                {searchQuery && (
                  <p className="text-sm mt-2">Try adjusting your search or filters</p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

