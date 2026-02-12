"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    ChevronsUpDown,
    LogOut,
    Settings,
    User,
    Bot,
    Moon,
    Sun,
    Laptop,
    Megaphone,
    MoreVertical,
    PanelLeft,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/store/auth";
import { useQueryClient } from "@tanstack/react-query";
import type { NavItem, NavSection } from "@/config/nav-config";
import { getWorkspaceNavSections, getWorkspaceChatbotNavSections } from "@/config/nav-config";
import { useMaybeWorkspace } from "@/contexts/workspace-context";




export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();
    const queryClient = useQueryClient();
    const { isMobile, toggleSidebar, state } = useSidebar();
    const { setTheme, theme } = useTheme();
    const workspaceCtx = useMaybeWorkspace();

    // Are we inside a specific chatbot route?
    // /:workspaceId/chatbot/:botId/...
    const segs = (pathname || "").split("/").filter(Boolean);
    const isBotRoute =
        !!workspaceCtx &&
        segs[0] === workspaceCtx.workspaceId &&
        segs[1] === "chatbot" &&
        !!segs[2] &&
        segs[2] !== "create";
    const botId = isBotRoute ? segs[2] : null;



    // Get workspace navigation sections and filter by capabilities
    const allWorkspaceNavSections = workspaceCtx
        ? getWorkspaceNavSections(workspaceCtx.workspaceId)
        : [];

    // Filter navigation sections based on user capabilities
    const filterNavSectionsByCapability = (sections: NavSection[]): NavSection[] => {
        if (!workspaceCtx) return [];

        return sections
            .filter((section) => {
                // If section has a required capability, check it
                if (section.requiredCapability) {
                    return workspaceCtx.capabilities[section.requiredCapability];
                }
                return true;
            })
            .map((section) => ({
                ...section,
                items: section.items.filter((item) => {
                    if (!item.requiredCapability) return true;
                    return workspaceCtx.capabilities[item.requiredCapability];
                }),
            }))
            .filter((section) => section.items.length > 0);
    };

    const workspaceNavSections = filterNavSectionsByCapability(allWorkspaceNavSections);

    // Select navigation sections based on context
    const navSections =
        workspaceCtx && botId
            ? getWorkspaceChatbotNavSections(workspaceCtx.workspaceId, botId)
            : workspaceNavSections;



    const handleLogout = () => {
        logout(queryClient);
        // TODO: Change back to "/login" when launching properly
        router.push("/");
        // router.push("/login");
    };

    const getUserInitials = () => {
        if (!user) return "U";
        if (user.name) {
            return user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);
        }
        return (user.displayName || user.username || "U")[0].toUpperCase();
    };

    const getUserDisplayName = () => {
        if (!user) return "User";
        return user.name || user.displayName || user.username || "User";
    };

    const getUserEmail = () => {
        if (!user) return "";
        return user.username ? `@${user.username}` : "";
    };

    return (
        <Sidebar
            collapsible="icon"
            className="border-r border-border bg-sidebar"
            {...props}
        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center">
                                <Image
                                    src="/verly_logo.png"
                                    alt="Verly"
                                    width={32}
                                    height={32}
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">Verly</span>
                                <span className="truncate text-xs">AI Platform</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {navSections.map((section) => (
                    <SidebarGroup key={section.label}>
                        <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {section.items.map((item) => {
                                    const isActive = pathname === item.url || pathname?.startsWith(item.url + "/");
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={isActive}
                                                tooltip={item.title}
                                                className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-medium transition-all duration-200"
                                            >
                                                <Link href={item.url}>
                                                    <item.icon className="h-4 w-4" /> {/* Standardize icon size */}
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={user?.avatarUrl || undefined} alt={getUserDisplayName()} />
                                        <AvatarFallback className="rounded-lg">{getUserInitials()}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{getUserDisplayName()}</span>
                                        <span className="truncate text-xs">{getUserEmail()}</span>
                                    </div>
                                    <MoreVertical className="ml-auto size-4" /> {/* Changed to MoreVertical (ellipsis) as requested */}
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side={isMobile ? "bottom" : "top"}
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage src={user?.avatarUrl || undefined} alt={getUserDisplayName()} />
                                            <AvatarFallback className="rounded-lg">{getUserInitials()}</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">{getUserDisplayName()}</span>
                                            <span className="truncate text-xs">{getUserEmail()}</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href={workspaceCtx ? `/${workspaceCtx.workspaceId}/profile` : "/"}>
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                        <Moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                        <span>Theme</span>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem
                                                onClick={() => setTheme("light")}
                                                className={theme === "light" ? "bg-primary/10 text-primary" : ""}
                                            >
                                                <Sun className="mr-2 h-4 w-4" />
                                                <span>Light</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => setTheme("dark")}
                                                className={theme === "dark" ? "bg-primary/10 text-primary" : ""}
                                            >
                                                <Moon className="mr-2 h-4 w-4" />
                                                <span>Dark</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => setTheme("system")}
                                                className={theme === "system" ? "bg-primary/10 text-primary" : ""}
                                            >
                                                <Laptop className="mr-2 h-4 w-4" />
                                                <span>System</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
