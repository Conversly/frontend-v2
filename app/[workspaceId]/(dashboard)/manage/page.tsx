"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWorkspace } from "@/contexts/workspace-context";
import { AccessGuard } from "@/components/auth/access-guard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import { toast } from "sonner";
import {
    Loader2,
    UserPlus,
    Mail,
    Trash2,
    Shield,
    User,
    AlertTriangle,
    Key,
    Copy,
    Save,
    Users,
    Building2,
    Calendar,
    Settings as SettingsIcon,
    Crown,
    Shield as ShieldIcon,
    ArrowRight,
    Lock,
} from "lucide-react";
import {
    getWorkspaceMembers,
    createInvitation,
    listInvitations,
    revokeInvitation,
    updateWorkspace,
    deleteWorkspace,
    removeWorkspaceMember,
    WorkspaceMember,
    WorkspaceInvitation
} from "@/lib/api/workspaces";
import { FeatureGuard } from "@/components/shared/FeatureGuard";
import { useAccessControl } from "@/hooks/useAccessControl";

export default function ManagePage() {
    const { workspaceName, workspaceId } = useWorkspace();
    const router = useRouter();
    const accessControl = useAccessControl(workspaceId);

    // -- Members State --
    const [members, setMembers] = useState<WorkspaceMember[]>([]);
    const membersUsed = members.length;
    const [isMembersLoading, setIsMembersLoading] = useState(false);
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState<"ADMIN" | "MEMBER">("MEMBER");
    const [isInviting, setIsInviting] = useState(false);

    // -- Invitations State --
    const [invitations, setInvitations] = useState<WorkspaceInvitation[]>([]);
    const [isInvitationsLoading, setIsInvitationsLoading] = useState(false);

    // -- Settings State --
    const [name, setName] = useState(workspaceName || "");
    const [isSavingSettings, setIsSavingSettings] = useState(false);
    const [isDeletingWorkspace, setIsDeletingWorkspace] = useState(false);

    const [memberToRemove, setMemberToRemove] = useState<string | null>(null);
    const [inviteToCancel, setInviteToCancel] = useState<string | null>(null);
    const [isRemovingMember, setIsRemovingMember] = useState(false);
    const [isRevokingInvite, setIsRevokingInvite] = useState(false);

    // -- Data Fetching --
    const fetchMembers = async () => {
        try {
            setIsMembersLoading(true);
            const data = await getWorkspaceMembers(workspaceId);
            setMembers(data);
        } catch (error: any) {
            toast.error("Failed to load members");
        } finally {
            setIsMembersLoading(false);
        }
    };

    const fetchInvitations = async () => {
        try {
            setIsInvitationsLoading(true);
            const data = await listInvitations(workspaceId);
            setInvitations(data);
        } catch (error: any) {
            toast.error("Failed to load invitations");
        } finally {
            setIsInvitationsLoading(false);
        }
    };

    // -- Logic: Members --
    const handleInvite = async () => {
        if (!inviteEmail) return;
        try {
            setIsInviting(true);
            await createInvitation(workspaceId, {
                email: inviteEmail,
                role: inviteRole,
            });
            toast.success(`Invitation sent to ${inviteEmail}`);
            setIsInviteOpen(false);
            setInviteEmail("");
            setInviteRole("MEMBER");
            // Refresh invitations list if we are on that tab, or just let user know
            fetchInvitations();
        } catch (error: any) {
            toast.error(error.message || "Failed to send invitation");
        } finally {
            setIsInviting(false);
        }
    };

    const getInitials = (name: string) => {
        return name?.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2) || "??";
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // -- Logic: Invitations --
    const handleRevokeClick = (inviteId: string) => {
        setInviteToCancel(inviteId);
    };

    const handleConfirmRevoke = async () => {
        if (!inviteToCancel) return;
        try {
            setIsRevokingInvite(true);
            await revokeInvitation(workspaceId, inviteToCancel);
            toast.success("Invitation revoked");
            setInvitations((prev) => prev.filter((i) => i.id !== inviteToCancel));
            setInviteToCancel(null);
        } catch (error: any) {
            toast.error("Failed to revoke invitation");
        } finally {
            setIsRevokingInvite(false);
        }
    };

    // -- Logic: Remove Member --
    const handleRemoveClick = (userId: string) => {
        setMemberToRemove(userId);
    };

    const handleConfirmRemove = async () => {
        if (!memberToRemove) return;
        try {
            setIsRemovingMember(true);
            await removeWorkspaceMember(workspaceId, memberToRemove);
            toast.success("Member removed successfully");
            setMembers((prev) => prev.filter((m) => m.userId !== memberToRemove));
            setMemberToRemove(null);
        } catch (error: any) {
            toast.error(error.message || "Failed to remove member");
        } finally {
            setIsRemovingMember(false);
        }
    }

    // -- Logic: Settings --
    const handleSaveSettings = async () => {
        try {
            setIsSavingSettings(true);
            await updateWorkspace(workspaceId, name);
            toast.success("Workspace name updated");
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "Failed to update workspace");
        } finally {
            setIsSavingSettings(false);
        }
    };

    const handleDeleteWorkspace = async () => {
        try {
            setIsDeletingWorkspace(true);
            await deleteWorkspace(workspaceId);
            toast.success("Workspace deleted");
            router.push("/");
        } catch (error: any) {
            toast.error(error.message || "Failed to delete workspace");
            setIsDeletingWorkspace(false);
        }
    };

    // -- Logic: Security --
    const handleCopyKey = () => {
        navigator.clipboard.writeText("sk_live_1234567890abcdef");
        toast.success("API Key copied to clipboard");
    };

    // Load initial data based on active tab? For simplicity, we can load on mount or tab change.
    // We'll use a simple effect for now.
    useEffect(() => {
        if (workspaceId) {
            fetchMembers();
            fetchInvitations();
            setName(workspaceName || "");
        }
    }, [workspaceId, workspaceName]);

    return (
        <AccessGuard capability="canManageMembers">
            <div className="container max-w-7xl px-4 py-8 md:px-6 lg:px-8 space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Manage Workspace</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage members, settings, and security for <span className="font-semibold text-foreground">{workspaceName}</span>
                    </p>
                </div>

                <Tabs defaultValue="members" className="w-full">
                    <TabsList className="mb-4">
                        <TabsTrigger value="members" className="gap-2">
                            <User className="h-4 w-4" />
                            Members
                        </TabsTrigger>
                        <TabsTrigger value="invitations" className="gap-2">
                            <Mail className="h-4 w-4" />
                            Invitations
                            {invitations.length > 0 && (
                                <Badge variant="secondary" className="ml-1 px-1.5 h-5 min-w-5 flex items-center justify-center">
                                    {invitations.length}
                                </Badge>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="gap-2">
                            <SettingsIcon className="h-4 w-4" />
                            Settings
                        </TabsTrigger>
                        <TabsTrigger value="security" className="gap-2">
                            <Shield className="h-4 w-4" />
                            Security
                        </TabsTrigger>
                    </TabsList>

                    {/* -- MEMBERS TAB -- */}
                    <TabsContent value="members" className="space-y-4">
                        <div className="flex justify-end mb-4">
                            <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
                                <div className="inline-block">
                                    <FeatureGuard feature="team_members" currentUsage={membersUsed}>
                                        {({ isLocked }) => (
                                            <Button
                                                className={`gap-2 shadow-sm ${isLocked
                                                    ? "border border-amber-400 text-amber-600 bg-transparent hover:bg-amber-50 dark:hover:bg-amber-900/20"
                                                    : ""
                                                    }`}
                                                variant={!isLocked ? "default" : "outline"}
                                                onClick={() => setIsInviteOpen(true)}
                                            >
                                                {!isLocked ? (
                                                    <UserPlus className="h-4 w-4" />
                                                ) : (
                                                    <Lock className="h-4 w-4" />
                                                )}
                                                Invite Member
                                                {isLocked && (
                                                    <span className="ml-2 text-[10px] font-medium bg-amber-100 dark:bg-amber-900/30 px-1.5 py-0.5 rounded-full">
                                                        Upgrade
                                                    </span>
                                                )}
                                            </Button>
                                        )}
                                    </FeatureGuard>
                                </div>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Invite to Workspace</DialogTitle>
                                        <DialogDescription>
                                            Send an email invitation to join this workspace.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email address</Label>
                                            <Input
                                                id="email"
                                                placeholder="colleague@example.com"
                                                type="email"
                                                value={inviteEmail}
                                                onChange={(e) => setInviteEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="role">Role</Label>
                                            <Select
                                                value={inviteRole}
                                                onValueChange={(v: "ADMIN" | "MEMBER") => setInviteRole(v)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="ADMIN">Admin (Can manage bots & members)</SelectItem>
                                                    <SelectItem value="MEMBER">Member (Can view bots & chats)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setIsInviteOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button onClick={handleInvite} disabled={isInviting || !inviteEmail}>
                                            {isInviting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                "Send Invitation"
                                            )}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Users className="h-5 w-5" />
                                        Workspace Members
                                    </CardTitle>
                                    <CardDescription>People with access to this workspace.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {isMembersLoading ? (
                                        <div className="flex h-40 items-center justify-center">
                                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {members.map((member) => (
                                                <div
                                                    key={member.userId}
                                                    className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-lg bg-card border border-border hover:shadow-sm transition-all"
                                                >
                                                    <div className="flex items-center gap-4 w-full sm:w-auto">
                                                        <Avatar>
                                                            <AvatarImage src={member.avatarUrl || ""} />
                                                            <AvatarFallback>{getInitials(member.displayName)}</AvatarFallback>
                                                        </Avatar>
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2">
                                                                <p className="font-medium leading-none">{member.displayName}</p>
                                                                {member.role === "OWNER" && (
                                                                    <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-200">
                                                                        <Crown className="w-3 h-3 mr-1" />
                                                                        Owner
                                                                    </Badge>
                                                                )}
                                                                {member.role === "ADMIN" && (
                                                                    <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-200">
                                                                        <ShieldIcon className="w-3 h-3 mr-1" />
                                                                        Admin
                                                                    </Badge>
                                                                )}
                                                                {member.role === "MEMBER" && (
                                                                    <Badge variant="outline" className="text-xs">
                                                                        Member
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <p className="text-sm text-muted-foreground">{member.email}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end mt-4 sm:mt-0">
                                                        <div className="text-sm text-muted-foreground whitespace-nowrap flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            Joined {formatDate(member.joinedAt)}
                                                        </div>
                                                        {/* Add Remove Button if applicable (not removing self, maybe checking permission) */}
                                                        {/* Assuming current user can manage members based on page guard, but logic to not remove self is needed. */}
                                                        {/* We don't have current userId easily available here unless context provides it or we parse token. */}
                                                        {/* For now, just render button, backend prevents invalid removes. Better UX to hide for self if possible. */}
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-muted-foreground hover:text-destructive"
                                                            onClick={() => handleRemoveClick(member.userId)}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </Card>
                    </TabsContent>

                    {/* -- INVITATIONS TAB -- */}
                    <TabsContent value="invitations" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Pending Invitations</CardTitle>
                                <CardDescription>Invitations sent but not yet accepted.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isInvitationsLoading ? (
                                    <div className="flex h-40 items-center justify-center">
                                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                    </div>
                                ) : invitations.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                                        <Mail className="h-10 w-10 mb-2 opacity-20" />
                                        <p>No pending invitations</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {invitations.map((invite) => (
                                            <div
                                                key={invite.id}
                                                className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-lg bg-secondary/20 border border-border"
                                            >
                                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                                        <Mail className="w-4 h-4 text-muted-foreground" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{invite.email}</p>
                                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                                            <Badge variant="secondary" className="text-xs">
                                                                {invite.role}
                                                            </Badge>
                                                            <span>•</span>
                                                            <span>Sent by {invite.inviterName}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end mt-3 sm:mt-0">
                                                    <div className="text-sm text-muted-foreground whitespace-nowrap">
                                                        Expires {formatDate(invite.expiresAt)}
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-muted-foreground hover:text-destructive"
                                                        onClick={() => handleRevokeClick(invite.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Revoke
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* -- SETTINGS TAB -- */}
                    <TabsContent value="settings" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>General</CardTitle>
                                <CardDescription>Basic information about your workspace.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="ws-name">Workspace Name</Label>
                                    <Input
                                        id="ws-name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Acme Corp"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="border-t px-6 py-4">
                                <Button onClick={handleSaveSettings} disabled={isSavingSettings || name === workspaceName}>
                                    {isSavingSettings ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="border-red-200">
                            <CardHeader>
                                <CardTitle className="text-red-600 flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5" />
                                    Danger Zone
                                </CardTitle>
                                <CardDescription>Irreversible actions for this workspace.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Deleting this workspace will remove all chatbots, data sources, and member access. This action cannot be undone.
                                </p>
                            </CardContent>
                            <CardFooter className="border-t border-red-100 bg-red-50/50 px-6 py-4 flex justify-between items-center">
                                <div className="text-sm text-red-600 font-medium">Delete this workspace</div>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" disabled={isDeletingWorkspace}>
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete Workspace
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete the workspace
                                                <span className="font-semibold text-foreground mx-1">{workspaceName}</span>
                                                and remove your data from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={handleDeleteWorkspace}
                                                className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                                            >
                                                {isDeletingWorkspace ? "Deleting..." : "Yes, delete workspace"}
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* -- SECURITY TAB -- */}
                    <TabsContent value="security" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Key className="h-5 w-5 text-primary" />
                                    <CardTitle>API Keys</CardTitle>
                                </div>
                                <CardDescription>
                                    Manage API keys for accessing the {workspaceName} API programmatically.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Production Key</Label>
                                    <div className="flex gap-2">
                                        <Input value="sk_live_1234567890abcdef................" readOnly className="font-mono bg-muted" />
                                        <Button variant="outline" size="icon" onClick={handleCopyKey}>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground">Created on Jan 15, 2026 by You</p>
                                </div>
                                <Button variant="outline">Roll Key</Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-primary" />
                                    <CardTitle>Two-Factor Authentication</CardTitle>
                                </div>
                                <CardDescription>
                                    Enforce 2FA for all members of this workspace.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <p className="font-medium">Enforce 2FA</p>
                                        <p className="text-sm text-muted-foreground">Require all workspace members to have 2FA enabled.</p>
                                    </div>
                                    <Button variant="secondary" disabled>Enforce (Coming Soon)</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                </Tabs>

                {/* Alert Dialog for Removing Member */}
                <AlertDialog open={!!memberToRemove} onOpenChange={(open) => !open && setMemberToRemove(null)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Remove Team Member?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to remove this member from the workspace? They will lose access to all chatbots and data.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={isRemovingMember}>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleConfirmRemove();
                                }}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                disabled={isRemovingMember}
                            >
                                {isRemovingMember ? "Removing..." : "Remove Member"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {/* Alert Dialog for Cancelling Invite */}
                <AlertDialog open={!!inviteToCancel} onOpenChange={(open) => !open && setInviteToCancel(null)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Cancel Invitation?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to cancel this invitation? The invite link will become invalid immediately.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={isRevokingInvite}>Keep Invite</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleConfirmRevoke();
                                }}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                disabled={isRevokingInvite}
                            >
                                {isRevokingInvite ? "Cancelling..." : "Yes, Cancel Invite"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

        </AccessGuard>
    );
}
