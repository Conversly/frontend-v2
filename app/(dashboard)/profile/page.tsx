"use client";

import { useAuth } from "@/store/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { Laptop, Moon, Sun, User, Mail, Shield, CreditCard, Crown, Zap, Building2, Sparkles, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentSubscription, CurrentSubscription } from "@/lib/api/subscription";
import { QUERY_KEY } from "@/utils/query-key";
import { useRouter } from "next/navigation";

const TIER_COLORS: Record<string, string> = {
    FREE: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    PERSONAL: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    PRO: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    ENTERPRISE: "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
};

const TIER_ICONS: Record<string, React.ReactNode> = {
    FREE: <Sparkles className="w-4 h-4" />,
    PERSONAL: <Zap className="w-4 h-4" />,
    PRO: <Crown className="w-4 h-4" />,
    ENTERPRISE: <Building2 className="w-4 h-4" />,
};

export default function ProfilePage() {
    const { user } = useAuth();
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { data: currentSubscription, isLoading: subscriptionLoading } = useQuery<CurrentSubscription | null>({
        queryKey: [QUERY_KEY.CURRENT_SUBSCRIPTION],
        queryFn: getCurrentSubscription,
        retry: false,
    });

    useEffect(() => {
        if (user) {
            setName(user.name || user.displayName || "");
        }
    }, [user]);

    const handleSaveProfile = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success("Profile updated successfully");
        setIsLoading(false);
    };

    const getUserInitials = () => {
        if (!user) return "U";
        const nameToUse = user.name || user.displayName || user.username || "U";
        return nameToUse.slice(0, 2).toUpperCase();
    };

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Profile & Settings</h2>
            </div>
            <Separator />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>
                                Update your personal details and public profile.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={user?.avatarUrl || undefined} />
                                    <AvatarFallback className="text-lg">{getUserInitials()}</AvatarFallback>
                                </Avatar>
                                <Button variant="outline">Change Avatar</Button>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="name">Display Name</Label>
                                <div className="relative">
                                    <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        placeholder="Your name"
                                        className="pl-8"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email / Username</Label>
                                <div className="relative">
                                    <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        value={user?.username || ""}
                                        disabled
                                        className="pl-8 bg-muted"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Your username cannot be changed.
                                </p>
                            </div>

                            <Button onClick={handleSaveProfile} disabled={isLoading}>
                                {isLoading ? "Saving..." : "Save Changes"}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Account Security</CardTitle>
                            <CardDescription>
                                Manage your password and account access.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Password</Label>
                                <Button variant="outline" className="w-full sm:w-auto" onClick={() => toast.info("Password reset email sent")}>
                                    <Shield className="mr-2 h-4 w-4" />
                                    Change Password
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="col-span-1 md:col-span-2 lg:col-span-4 space-y-4">
                    {/* Subscription Plan Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="w-5 h-5" />
                                Subscription Plan
                            </CardTitle>
                            <CardDescription>
                                Your current plan and usage details.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {subscriptionLoading ? (
                                <div className="flex items-center justify-center py-8">
                                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                                    <p className="ml-3 text-muted-foreground">Loading subscription...</p>
                                </div>
                            ) : currentSubscription ? (
                                <>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-lg font-semibold">{currentSubscription.planName}</h3>
                                                <Badge 
                                                    variant={currentSubscription.status === "active" ? "default" : "secondary"}
                                                    className={TIER_COLORS[currentSubscription.planName.toUpperCase().split(' ')[0]] || TIER_COLORS.FREE}
                                                >
                                                    {currentSubscription.status}
                                                </Badge>
                                            </div>
                                            {currentSubscription.currentPeriodEnd && (
                                                <p className="text-sm text-muted-foreground">
                                                    {currentSubscription.status === "active" ? "Renews" : "Expires"}: {new Date(currentSubscription.currentPeriodEnd).toLocaleDateString()}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Usage Stats */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Chatbots</p>
                                            <p className="text-lg font-semibold">
                                                {currentSubscription.usage.chatbots} /{" "}
                                                {currentSubscription.entitlements?.maxChatbots === -1
                                                    ? "∞"
                                                    : currentSubscription.entitlements?.maxChatbots || 0}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-muted-foreground">Team Members</p>
                                            <p className="text-lg font-semibold">
                                                {currentSubscription.usage.users} /{" "}
                                                {currentSubscription.entitlements?.maxUsers === -1
                                                    ? "∞"
                                                    : currentSubscription.entitlements?.maxUsers || 0}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    {currentSubscription.entitlements && (
                                        <>
                                            <Separator />
                                            <div className="space-y-2">
                                                <p className="text-sm font-medium">Plan Features</p>
                                                <div className="grid grid-cols-2 gap-2 text-sm">
                                                    {currentSubscription.entitlements.allowWhatsApp && (
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                            <span>WhatsApp</span>
                                                        </div>
                                                    )}
                                                    {currentSubscription.entitlements.allowVoice && (
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                            <span>Voice</span>
                                                        </div>
                                                    )}
                                                    {currentSubscription.entitlements.allowAPI && (
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                            <span>API Access</span>
                                                        </div>
                                                    )}
                                                    {currentSubscription.entitlements.allowWebhooks && (
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                            <span>Webhooks</span>
                                                        </div>
                                                    )}
                                                    {currentSubscription.entitlements.allowCustomBranding && (
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                            <span>Custom Branding</span>
                                                        </div>
                                                    )}
                                                    {currentSubscription.entitlements.prioritySupport && (
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                            <span>Priority Support</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <Button 
                                        variant="outline" 
                                        className="w-full" 
                                        onClick={() => router.push("/plans")}
                                    >
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        Manage Subscription
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </>
                            ) : (
                                <div className="space-y-4">
                                    <div className="text-center py-4">
                                        <p className="text-muted-foreground mb-2">No active subscription found</p>
                                        <p className="text-sm text-muted-foreground">
                                            You're currently on the free tier.
                                        </p>
                                    </div>
                                    <Button 
                                        className="w-full" 
                                        onClick={() => router.push("/plans")}
                                    >
                                        <Crown className="mr-2 h-4 w-4" />
                                        View Plans & Upgrade
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance</CardTitle>
                            <CardDescription>
                                Customize how Verly looks on your device.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Theme</Label>
                                <div className="grid grid-cols-3 gap-2">
                                    <div
                                        className={`cursor-pointer rounded-lg border-2 p-2 hover:bg-accent ${theme === 'light' ? 'border-primary' : 'border-muted'}`}
                                        onClick={() => setTheme('light')}
                                    >
                                        <div className="space-y-2 rounded-md bg-[#ecedef] p-2">
                                            <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                                <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                            </div>
                                            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                                <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                            </div>
                                        </div>
                                        <div className="flex items-center p-2">
                                            <Sun className="mr-2 h-4 w-4" />
                                            <span className="text-sm font-medium">Light</span>
                                        </div>
                                    </div>

                                    <div
                                        className={`cursor-pointer rounded-lg border-2 p-2 hover:bg-accent ${theme === 'dark' ? 'border-primary' : 'border-muted'}`}
                                        onClick={() => setTheme('dark')}
                                    >
                                        <div className="space-y-2 rounded-md bg-slate-950 p-2">
                                            <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                            </div>
                                            <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                <div className="h-4 w-4 rounded-full bg-slate-400" />
                                                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                            </div>
                                        </div>
                                        <div className="flex items-center p-2">
                                            <Moon className="mr-2 h-4 w-4" />
                                            <span className="text-sm font-medium">Dark</span>
                                        </div>
                                    </div>

                                    <div
                                        className={`cursor-pointer rounded-lg border-2 p-2 hover:bg-accent ${theme === 'system' ? 'border-primary' : 'border-muted'}`}
                                        onClick={() => setTheme('system')}
                                    >
                                        <div className="space-y-2 rounded-md bg-slate-950 p-2">
                                            <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                            </div>
                                            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                                <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                            </div>
                                        </div>
                                        <div className="flex items-center p-2">
                                            <Laptop className="mr-2 h-4 w-4" />
                                            <span className="text-sm font-medium">System</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
