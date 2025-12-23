"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2, UserPlus, Loader2, Users, AlertCircle } from "lucide-react";
import {
    getChatbotAdmins,
    inviteChatbotAdmin,
    deleteChatbotAdmin,
    ChatbotAdmin,
} from "@/lib/api/admin";
import { QUERY_KEY } from "@/utils/query-key";
import { useAuth } from "@/store/auth";

interface ChatbotAdminsProps {
    chatbotId: string;
    chatbotName?: string;
}

export function ChatbotAdmins({ chatbotId, chatbotName }: ChatbotAdminsProps) {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [inviteEmail, setInviteEmail] = useState("");

    // Fetch chatbot admins
    const { data: admins, isLoading, error } = useQuery<ChatbotAdmin[]>({
        queryKey: [QUERY_KEY.CHATBOT_ADMINS, chatbotId],
        queryFn: () => getChatbotAdmins(chatbotId),
        retry: false,
    });

    // Invite admin mutation
    const inviteMutation = useMutation({
        mutationFn: (email: string) => inviteChatbotAdmin(chatbotId, email),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CHATBOT_ADMINS, chatbotId] });
            setInviteEmail("");
            toast.success("Admin invited successfully");
        },
        onError: (err: any) => {
            toast.error(err?.message || "Failed to invite admin");
        },
    });

    // Remove admin mutation
    const removeMutation = useMutation({
        mutationFn: (userId: string) => deleteChatbotAdmin(chatbotId, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CHATBOT_ADMINS, chatbotId] });
            toast.success("Admin removed successfully");
        },
        onError: (err: any) => {
            toast.error(err?.message || "Failed to remove admin");
        },
    });

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inviteEmail.trim()) return;
        inviteMutation.mutate(inviteEmail.trim());
    };

    const handleRemove = (userId: string, email: string | null) => {
        if (confirm(`Are you sure you want to remove ${email || "this admin"} from this chatbot?`)) {
            removeMutation.mutate(userId);
        }
    };

    return (
        <Card className="shadow-sm border-border/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Chatbot Admins
                </CardTitle>
                <CardDescription>
                    Manage who can access and configure {chatbotName || "this chatbot"}.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Error State */}
                {error && (
                    <div className="flex items-center gap-2 text-destructive p-3 bg-destructive/10 rounded-lg">
                        <AlertCircle className="w-4 h-4" />
                        <p className="text-sm">Failed to load admins. Please try again.</p>
                    </div>
                )}

                {/* Invite Form */}
                <form onSubmit={handleInvite} className="flex gap-3 items-end">
                    <div className="flex-1 space-y-1.5">
                        <Label htmlFor="admin-email">Invite Admin by Email</Label>
                        <Input
                            type="email"
                            id="admin-email"
                            placeholder="admin@company.com"
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                            required
                            disabled={inviteMutation.isPending}
                        />
                    </div>
                    <Button type="submit" disabled={inviteMutation.isPending} className="gap-2">
                        {inviteMutation.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <UserPlus className="w-4 h-4" />
                        )}
                        Invite
                    </Button>
                </form>

                {/* Admins List */}
                <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">Current Admins</h4>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-6">
                            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                        </div>
                    ) : admins && admins.length > 0 ? (
                        <div className="space-y-2">
                            {admins.map((admin) => (
                                <div
                                    key={admin.userId}
                                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-9 h-9">
                                            <AvatarImage src={admin.avatarUrl || undefined} />
                                            <AvatarFallback className="text-xs">
                                                {admin.displayName?.charAt(0) || admin.email?.charAt(0) || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-sm">
                                                {admin.displayName || admin.email || "Unknown User"}
                                            </p>
                                            {admin.displayName && admin.email && (
                                                <p className="text-xs text-muted-foreground">{admin.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    {admin.userId !== user?.id && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                            onClick={() => handleRemove(admin.userId, admin.email)}
                                            disabled={removeMutation.isPending}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-6 text-muted-foreground bg-secondary/20 rounded-lg">
                            <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No admins assigned yet.</p>
                            <p className="text-xs">Invite someone to help manage this chatbot.</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
