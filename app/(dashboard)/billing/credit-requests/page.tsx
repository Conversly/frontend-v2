"use client";

import { useEffect, useState } from "react";
import { listCreditRequests, approveCreditRequest, rejectCreditRequest, CreditRequest } from "@/lib/api/billing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, XCircle, Clock, DollarSign, MessageSquare, User, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RoleGuard } from "@/components/auth/role-guard";
import { useGetChatbots } from "@/services/chatbot";
import { useWorkspaces } from "@/hooks/use-workspaces";
import { usePermissions } from "@/hooks/use-permissions";
import { useAuth } from "@/store/auth";

const StatusBadge = ({ status }: { status: CreditRequest["status"] }) => {
    const configs = {
        PENDING: { bg: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-500", icon: Clock },
        APPROVED: { bg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-500", icon: CheckCircle2 },
        REJECTED: { bg: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-500", icon: XCircle },
    };
    const config = configs[status];
    const Icon = config.icon;
    return (
        <Badge className={`${config.bg} gap-1.5 px-2.5 py-1`}>
            <Icon className="w-3 h-3" />
            {status}
        </Badge>
    );
};

export default function CreditRequestsPage() {
    const { activeWorkspaceId } = useWorkspaces();
    const { data: chatbots } = useGetChatbots(activeWorkspaceId || undefined);
    const { isOwner, isAdmin } = usePermissions();
    const { user } = useAuth();
    const [rejectDialog, setRejectDialog] = useState<{ open: boolean; requestId: string | null }>({
        open: false,
        requestId: null,
    });
    const [rejectReason, setRejectReason] = useState("");
    const queryClient = useQueryClient();

    const { data: requests, isLoading, error } = useQuery({
        queryKey: ["CREDIT_REQUESTS", activeWorkspaceId],
        queryFn: () => listCreditRequests(),
        enabled: !!activeWorkspaceId,
    });

    const approveMutation = useMutation({
        mutationFn: approveCreditRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["CREDIT_REQUESTS"] });
            queryClient.invalidateQueries({ queryKey: ["BILLING_DASHBOARD"] });
            queryClient.invalidateQueries({ queryKey: ["BILLING_OVERVIEW"] });
            toast.success("Credit request approved and credits added to workspace");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to approve request");
        },
    });

    const rejectMutation = useMutation({
        mutationFn: ({ requestId, reason }: { requestId: string; reason: string }) =>
            rejectCreditRequest(requestId, reason),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["CREDIT_REQUESTS"] });
            toast.success("Credit request rejected");
            setRejectDialog({ open: false, requestId: null });
            setRejectReason("");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to reject request");
        },
    });

    const getChatbotName = (chatbotId: string) => {
        return chatbots?.find((c) => c.id === chatbotId)?.name || chatbotId;
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const handleReject = (requestId: string) => {
        setRejectDialog({ open: true, requestId });
    };

    const handleRejectSubmit = () => {
        if (!rejectDialog.requestId) return;
        if (!rejectReason.trim()) {
            toast.error("Please provide a rejection reason");
            return;
        }
        rejectMutation.mutate({ requestId: rejectDialog.requestId, reason: rejectReason });
    };

    const pendingRequests = requests?.filter((r) => r.status === "PENDING") || [];
    const approvedRequests = requests?.filter((r) => r.status === "APPROVED") || [];
    const rejectedRequests = requests?.filter((r) => r.status === "REJECTED") || [];

    // For admins, only show their own requests
    const isMyRequest = (request: CreditRequest) => {
        return request.requestedByUserId === user?.id;
    };

    const canApproveReject = isOwner;
    const pageTitle = isOwner ? "Credit Requests" : "My Credit Requests";
    const pageDescription = isOwner
        ? "Review and manage credit requests from your team members"
        : "View and track your credit requests";

    return (
        <RoleGuard>
            <div className="space-y-8 animate-in fade-in duration-700">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                            {pageTitle}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
                            {pageDescription}
                        </p>
                    </div>
                </div>

                {isLoading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <Card key={i}>
                                <CardContent className="p-6">
                                    <Skeleton className="h-20 w-full" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : error ? (
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-center text-red-600 dark:text-red-400">
                                Failed to load credit requests. Please try again.
                            </div>
                        </CardContent>
                    </Card>
                ) : requests && requests.length === 0 ? (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <DollarSign className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No Credit Requests</h3>
                            <p className="text-sm text-muted-foreground">
                                {isOwner
                                    ? "There are no credit requests to review at this time."
                                    : "You haven't created any credit requests yet. Use the 'Request Credits' button in chatbot analytics to create one."}
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-8">
                        {/* Pending Requests */}
                        {pendingRequests.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-amber-500" />
                                    Pending Requests ({pendingRequests.length})
                                </h2>
                                <div className="space-y-4">
                                    {pendingRequests.map((request) => (
                                        <Card key={request.id} className="border-amber-200 dark:border-amber-800">
                                            <CardContent className="p-6">
                                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                                    <div className="flex-1 space-y-3">
                                                        <div className="flex items-start justify-between">
                                                            <div>
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                                                                    <span className="font-semibold">
                                                                        {getChatbotName(request.chatbotId)}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                                    <div className="flex items-center gap-1">
                                                                        <DollarSign className="w-3.5 h-3.5" />
                                                                        ₹{parseFloat(request.amount).toLocaleString()}
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <Calendar className="w-3.5 h-3.5" />
                                                                        {formatDate(request.createdAt)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <StatusBadge status={request.status} />
                                                        </div>
                                                        {request.reason && (
                                                            <div className="bg-secondary/50 p-3 rounded-lg">
                                                                <p className="text-sm text-muted-foreground mb-1">Reason:</p>
                                                                <p className="text-sm">{request.reason}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {canApproveReject && (
                                                        <div className="flex gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => handleReject(request.id)}
                                                                disabled={approveMutation.isPending || rejectMutation.isPending}
                                                            >
                                                                <XCircle className="w-4 h-4 mr-1.5" />
                                                                Reject
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                onClick={() => approveMutation.mutate(request.id)}
                                                                disabled={approveMutation.isPending || rejectMutation.isPending}
                                                            >
                                                                {approveMutation.isPending ? (
                                                                    <>
                                                                        <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                                                                        Approving...
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <CheckCircle2 className="w-4 h-4 mr-1.5" />
                                                                        Approve
                                                                    </>
                                                                )}
                                                            </Button>
                                                        </div>
                                                    )}
                                                    {!canApproveReject && request.status === "PENDING" && (
                                                        <Badge variant="outline" className="text-amber-600 border-amber-300">
                                                            Waiting for owner approval
                                                        </Badge>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Approved Requests */}
                        {approvedRequests.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                    Approved ({approvedRequests.length})
                                </h2>
                                <div className="space-y-4">
                                    {approvedRequests.map((request) => (
                                        <Card key={request.id} className="border-emerald-200 dark:border-emerald-800">
                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <MessageSquare className="w-4 h-4 text-muted-foreground" />
                                                            <span className="font-semibold">
                                                                {getChatbotName(request.chatbotId)}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                            <div className="flex items-center gap-1">
                                                                <DollarSign className="w-3.5 h-3.5" />
                                                                ₹{parseFloat(request.amount).toLocaleString()}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Calendar className="w-3.5 h-3.5" />
                                                                {formatDate(request.updatedAt)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <StatusBadge status={request.status} />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Rejected Requests */}
                        {rejectedRequests.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <XCircle className="w-5 h-5 text-red-500" />
                                    Rejected ({rejectedRequests.length})
                                </h2>
                                <div className="space-y-4">
                                    {rejectedRequests.map((request) => (
                                        <Card key={request.id} className="border-red-200 dark:border-red-800">
                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <MessageSquare className="w-4 h-4 text-muted-foreground" />
                                                            <span className="font-semibold">
                                                                {getChatbotName(request.chatbotId)}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                                            <div className="flex items-center gap-1">
                                                                <DollarSign className="w-3.5 h-3.5" />
                                                                ₹{parseFloat(request.amount).toLocaleString()}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Calendar className="w-3.5 h-3.5" />
                                                                {formatDate(request.updatedAt)}
                                                            </div>
                                                        </div>
                                                        {request.reason && (
                                                            <div className="bg-secondary/50 p-3 rounded-lg mt-2">
                                                                <p className="text-sm text-muted-foreground mb-1">Rejection Reason:</p>
                                                                <p className="text-sm">{request.reason}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <StatusBadge status={request.status} />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Reject Dialog */}
                <Dialog open={rejectDialog.open} onOpenChange={(open) => setRejectDialog({ open, requestId: null })}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Reject Credit Request</DialogTitle>
                            <DialogDescription>
                                Please provide a reason for rejecting this credit request. This will be visible to the requester.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="rejectReason">Rejection Reason *</Label>
                                <Textarea
                                    id="rejectReason"
                                    placeholder="Explain why this request is being rejected..."
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    rows={4}
                                    required
                                    disabled={rejectMutation.isPending}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setRejectDialog({ open: false, requestId: null });
                                    setRejectReason("");
                                }}
                                disabled={rejectMutation.isPending}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleRejectSubmit}
                                disabled={rejectMutation.isPending || !rejectReason.trim()}
                            >
                                {rejectMutation.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Rejecting...
                                    </>
                                ) : (
                                    "Reject Request"
                                )}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </RoleGuard>
    );
}

