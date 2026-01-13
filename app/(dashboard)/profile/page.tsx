"use client";

import { useAuth } from "@/store/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { Laptop, Moon, Sun, User, Mail, Shield } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export default function ProfilePage() {
    const { user } = useAuth();
    const { theme, setTheme } = useTheme();
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
        <div className="page-container flex-1 p-6">
            <div className="page-header">
                <h1 className="page-title">Profile & Settings</h1>
                <p className="page-subtitle">
                    Manage your account settings and preferences
                </p>
                <Separator className="mt-2" />
            </div>

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
