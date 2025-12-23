"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2, UserPlus, Shield, Loader2, AlertCircle, Clock, X, Mail, Building2, Plus, Users, Bot, DollarSign, Crown, Shield as ShieldIcon, User, ArrowRight, Calendar } from "lucide-react";
import { useAuth } from "@/store/auth";
import { RoleGuard } from "@/components/auth/role-guard";
import {
    getAccountMembers,
    inviteAccountMember,
    deleteAccountMember,
    getPendingInvites,
    cancelInvite,
    AccountMember,
    PendingInvite,
    getWorkspacesWithDetails,
    createWorkspace,
    WorkspaceDetails,
} from "@/lib/api/admin";
import { QUERY_KEY } from "@/utils/query-key";
import { useWorkspaces } from "@/hooks/use-workspaces";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Helper to format relative time
const formatExpiresAt = (expiresAt: string) => {
    const diff = new Date(expiresAt).getTime() - Date.now();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days > 1) return `Expires in ${days} days`;
    if (days === 1) return `Expires tomorrow`;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours > 0) return `Expires in ${hours} hours`;
    return "Expires soon";
};

const ROLE_BADGE_COLORS: Record<string, string> = {
    OWNER: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    BILLING_ADMIN: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    MEMBER: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
};

const ROLE_ICONS: Record<string, React.ReactNode> = {
    OWNER: <Crown className="w-3 h-3" />,
    BILLING_ADMIN: <ShieldIcon className="w-3 h-3" />,
    MEMBER: <User className="w-3 h-3" />,
};

export default function ManagePage() {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const router = useRouter();
    const { setActiveWorkspace } = useWorkspaces();
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState<"OWNER" | "BILLING_ADMIN" | "MEMBER">("MEMBER");
    const [isWorkspaceDialogOpen, setIsWorkspaceDialogOpen] = useState(false);
    const [workspaceName, setWorkspaceName] = useState("");
    const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);

    // Fetch account members
    const { data: members, isLoading, error } = useQuery<AccountMember[]>({
        queryKey: [QUERY_KEY.ACCOUNT_MEMBERS],
        queryFn: getAccountMembers,
        retry: false,
    });

    // Fetch pending invites
    const { data: pendingInvites, isLoading: invitesLoading } = useQuery<PendingInvite[]>({
        queryKey: [QUERY_KEY.PENDING_INVITES],
        queryFn: getPendingInvites,
        retry: false,
    });

    // Fetch workspaces
    const { data: workspaces, isLoading: workspacesLoading } = useQuery<WorkspaceDetails[]>({
        queryKey: ["workspaces-details"],
        queryFn: getWorkspacesWithDetails,
        retry: false,
    });

    // Invite mutation
    const inviteMutation = useMutation({
        mutationFn: (data: { email: string; role: "OWNER" | "BILLING_ADMIN" | "MEMBER" }) =>
            inviteAccountMember(data.email, data.role),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ACCOUNT_MEMBERS] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PENDING_INVITES] });
            setInviteEmail("");
            toast.success("Invitation sent successfully");
        },
        onError: (err: any) => {
            toast.error(err?.message || "Failed to send invitation");
        },
    });

    // Remove member mutation
    const removeMutation = useMutation({
        mutationFn: (userId: string) => deleteAccountMember(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ACCOUNT_MEMBERS] });
            toast.success("Member removed successfully");
        },
        onError: (err: any) => {
            toast.error(err?.message || "Failed to remove member");
        },
    });

    // Cancel invite mutation
    const cancelInviteMutation = useMutation({
        mutationFn: (inviteId: string) => cancelInvite(inviteId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PENDING_INVITES] });
            toast.success("Invitation cancelled");
        },
        onError: (err: any) => {
            toast.error(err?.message || "Failed to cancel invitation");
        },
    });

    // Create workspace mutation
    const createWorkspaceMutation = useMutation({
        mutationFn: (name: string) => createWorkspace(name),
        onSuccess: (newWorkspace) => {
            queryClient.invalidateQueries({ queryKey: ["workspaces-details"] });
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
            setWorkspaceName("");
            setIsWorkspaceDialogOpen(false);
            setActiveWorkspace(newWorkspace.id);
            toast.success("Workspace created successfully");
        },
        onError: (err: any) => {
            toast.error(err?.message || "Failed to create workspace");
        },
    });

    const handleCreateWorkspace = async () => {
        if (!workspaceName.trim()) {
            toast.error("Workspace name is required");
            return;
        }
        setIsCreatingWorkspace(true);
        createWorkspaceMutation.mutate(workspaceName.trim());
        setIsCreatingWorkspace(false);
    };

    const handleSelectWorkspace = (workspaceId: string) => {
        setActiveWorkspace(workspaceId);
        router.push("/chatbot");
    };

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inviteEmail.trim()) return;
        inviteMutation.mutate({ email: inviteEmail.trim(), role: inviteRole });
    };

    const handleRemove = (userId: string) => {
        if (confirm("Are you sure you want to remove this member?")) {
            removeMutation.mutate(userId);
        }
    };

    const handleCancelInvite = (inviteId: string) => {
        if (confirm("Are you sure you want to cancel this invitation?")) {
            cancelInviteMutation.mutate(inviteId);
        }
    };

    // Filter only pending account invites
    const accountInvites = pendingInvites?.filter(
        (invite) => invite.inviteType === "ACCOUNT" && invite.status === "PENDING"
    ) || [];

    return (
        <RoleGuard requireOwner>
            <div className="container mx-auto py-6 max-w-7xl">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Manage</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your workspaces, team members, and access control.
                    </p>
                </div>

                {/* Workspaces Section */}
                <div className="mb-8">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2 text-xl">
                                        <Building2 className="w-5 h-5" />
                                        Workspaces
                                    </CardTitle>
                                    <CardDescription className="mt-1">
                                        Manage all your workspaces and switch between them.
                                    </CardDescription>
                                </div>
                                <Dialog open={isWorkspaceDialogOpen} onOpenChange={setIsWorkspaceDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button>
                                            <Plus className="w-4 h-4 mr-2" />
                                            Create Workspace
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Create New Workspace</DialogTitle>
                                            <DialogDescription>
                                                Create a new workspace to organize your chatbots and team members.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4 py-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="workspace-name">Workspace Name</Label>
                                                <Input
                                                    id="workspace-name"
                                                    placeholder="My Workspace"
                                                    value={workspaceName}
                                                    onChange={(e) => setWorkspaceName(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter" && !isCreatingWorkspace) {
                                                            handleCreateWorkspace();
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setIsWorkspaceDialogOpen(false);
                                                    setWorkspaceName("");
                                                }}
                                                disabled={isCreatingWorkspace}
                                            >
                                                Cancel
                                            </Button>
                                            <Button onClick={handleCreateWorkspace} disabled={isCreatingWorkspace || !workspaceName.trim()}>
                                                {isCreatingWorkspace ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                        Creating...
                                                    </>
                                                ) : (
                                                    "Create"
                                                )}
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {workspacesLoading ? (
                                <div className="flex items-center justify-center py-12">
                                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                                </div>
                            ) : workspaces && workspaces.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {workspaces.map((workspace) => (
                                        <div
                                            key={workspace.id}
                                            className="group relative p-4 rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer bg-card"
                                            onClick={() => handleSelectWorkspace(workspace.id)}
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3 flex-1">
                                                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                                        <Building2 className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-semibold text-base truncate">{workspace.name}</h3>
                                                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                                            <Calendar className="w-3 h-3" />
                                                            {workspace.createdAt
                                                                ? formatDistanceToNow(new Date(workspace.createdAt), { addSuffix: true })
                                                                : "Recently"}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Badge className={ROLE_BADGE_COLORS[workspace.role] || ""} variant="secondary">
                                                    <span className="flex items-center gap-1">
                                                        {ROLE_ICONS[workspace.role]}
                                                        {workspace.role.replace(/_/g, " ")}
                                                    </span>
                                                </Badge>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3 mb-3">
                                                <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                                                    <Users className="w-4 h-4 text-muted-foreground" />
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">Members</p>
                                                        <p className="text-sm font-semibold">{workspace.memberCount}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                                                    <Bot className="w-4 h-4 text-muted-foreground" />
                <div>
                                                        <p className="text-xs text-muted-foreground">Chatbots</p>
                                                        <p className="text-sm font-semibold">{workspace.chatbotCount}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {(workspace.role === "OWNER" || workspace.role === "BILLING_ADMIN") && (
                                                <div className="mb-3 pt-3 border-t border-border">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                                                            <span className="text-xs text-muted-foreground">Balance</span>
                                                        </div>
                                                        <span className="text-sm font-semibold">
                                                            ${parseFloat(workspace.walletBalance || "0").toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSelectWorkspace(workspace.id);
                                                }}
                                            >
                                                Open Workspace
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="p-4 rounded-full bg-muted mb-4 inline-block">
                                        <Building2 className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">No workspaces yet</h3>
                                    <p className="text-muted-foreground text-center mb-6 max-w-md mx-auto">
                                        Get started by creating your first workspace to organize your chatbots and team.
                                    </p>
                                    <Dialog open={isWorkspaceDialogOpen} onOpenChange={setIsWorkspaceDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button>
                                                <Plus className="w-4 h-4 mr-2" />
                                                Create Workspace
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Create New Workspace</DialogTitle>
                                                <DialogDescription>
                                                    Create a new workspace to organize your chatbots and team members.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="workspace-name-empty">Workspace Name</Label>
                                                    <Input
                                                        id="workspace-name-empty"
                                                        placeholder="My Workspace"
                                                        value={workspaceName}
                                                        onChange={(e) => setWorkspaceName(e.target.value)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter" && !isCreatingWorkspace) {
                                                                handleCreateWorkspace();
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        setIsWorkspaceDialogOpen(false);
                                                        setWorkspaceName("");
                                                    }}
                                                    disabled={isCreatingWorkspace}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button onClick={handleCreateWorkspace} disabled={isCreatingWorkspace || !workspaceName.trim()}>
                                                    {isCreatingWorkspace ? (
                                                        <>
                                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                            Creating...
                                                        </>
                                                    ) : (
                                                        "Create"
                                                    )}
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Team Management Section */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight mb-1">Team Management</h2>
                        <p className="text-muted-foreground">Invite team members and manage access to your workspace.</p>
                </div>

                {error && (
                    <Card className="border-destructive">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2 text-destructive">
                                <AlertCircle className="w-4 h-4" />
                                <p>Failed to load members. Please try again.</p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Invite Team Member Card */}
                    <Card>
                    <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserPlus className="w-5 h-5" />
                                Invite Team Member
                            </CardTitle>
                        <CardDescription>Add a team member to help manage your chatbots.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleInvite} className="space-y-4">
                                <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="colleague@company.com"
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                    required
                                    disabled={inviteMutation.isPending}
                                />
                            </div>
                                <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                        <select
                                            id="role"
                                            value={inviteRole}
                                            onChange={(e) => setInviteRole(e.target.value as "OWNER" | "BILLING_ADMIN" | "MEMBER")}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            disabled={inviteMutation.isPending}
                                        >
                                            <option value="MEMBER">Member</option>
                                            <option value="BILLING_ADMIN">Billing Admin</option>
                                            <option value="OWNER">Owner</option>
                                        </select>
                            </div>
                                <Button type="submit" disabled={inviteMutation.isPending} className="w-full sm:w-auto">
                                {inviteMutation.isPending ? (
                                    <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                            <UserPlus className="w-4 h-4 mr-2" />
                                        Send Invitation
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Pending Invites Card */}
                {(accountInvites.length > 0 || invitesLoading) && (
                        <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Mail className="w-5 h-5" />
                                Pending Invitations
                            </CardTitle>
                            <CardDescription>Invitations that haven't been accepted yet.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {invitesLoading ? (
                                <div className="flex items-center justify-center py-6">
                                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                                </div>
                            ) : accountInvites.length > 0 ? (
                                <div className="space-y-3">
                                    {accountInvites.map((invite) => (
                                        <div
                                            key={invite.id}
                                                className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                                    <Mail className="w-4 h-4 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{invite.email}</p>
                                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                                            <Badge variant="secondary" className="text-xs">
                                                            {invite.role === "OWNER" ? "Owner" : "Admin"}
                                                            </Badge>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {formatExpiresAt(invite.expiresAt)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-muted-foreground hover:text-destructive"
                                                onClick={() => handleCancelInvite(invite.id)}
                                                disabled={cancelInviteMutation.isPending}
                                            >
                                                <X className="w-4 h-4 mr-1" />
                                                Cancel
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                        </CardContent>
                    </Card>
                )}

                {/* Team Members Card */}
                    <Card>
                    <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                Team Members
                            </CardTitle>
                            <CardDescription>Users with access to this workspace.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                            </div>
                        ) : members && members.length > 0 ? (
                                <div className="space-y-3">
                                {members.map((member) => (
                                    <div
                                        key={member.userId}
                                            className="flex items-center justify-between p-4 rounded-lg hover:bg-secondary/50 transition-colors border border-border"
                                    >
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={member.avatarUrl || undefined} />
                                                <AvatarFallback>
                                                    {member.displayName?.charAt(0) || member.email?.charAt(0) || "U"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium flex items-center gap-2">
                                                    {member.displayName || member.email || "Unknown User"}
                                                    {member.role === "OWNER" && (
                                                            <Badge variant="secondary" className="text-xs">
                                                                <Shield className="w-3 h-3 mr-1" />
                                                                Owner
                                                            </Badge>
                                                    )}
                                                    {member.role === "BILLING_ADMIN" && (
                                                            <Badge variant="outline" className="text-xs">
                                                                <ShieldIcon className="w-3 h-3 mr-1" />
                                                                Billing Admin
                                                            </Badge>
                                                    )}
                                                    {member.role === "MEMBER" && (
                                                            <Badge variant="outline" className="text-xs">
                                                                Member
                                                            </Badge>
                                                    )}
                                                </p>
                                                <p className="text-sm text-muted-foreground">{member.email}</p>
                                            </div>
                                        </div>

                                        {member.role !== "OWNER" && member.userId !== user?.id && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-muted-foreground hover:text-destructive"
                                                onClick={() => handleRemove(member.userId)}
                                                disabled={removeMutation.isPending}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                    <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                <p>No team members yet. Invite someone to get started!</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
                </div>
            </div>
        </RoleGuard>
    );
}
