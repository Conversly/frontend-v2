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
import { usePrefetchChatbots, usePrefetchChatbot } from "@/services/chatbot";
import { usePrefetchDataSources } from "@/services/datasource";
import { usePrefetchEntitlements } from "@/hooks/useEntitlements";
import { usePrefetchSubscription } from "@/contexts/subscription-context";




export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();
    const queryClient = useQueryClient();
    const { isMobile, toggleSidebar, state } = useSidebar();
    const { setTheme, theme } = useTheme();
    const workspaceCtx = useMaybeWorkspace();

    // Prefetch hooks for navigation optimization
    const { prefetchChatbots } = usePrefetchChatbots();
    const { prefetchChatbot } = usePrefetchChatbot();
    const { prefetchDataSources } = usePrefetchDataSources();
    const { prefetchEntitlements } = usePrefetchEntitlements();
    const { prefetchSubscription } = usePrefetchSubscription();

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
    const workspaceId = workspaceCtx?.workspaceId;



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

    /**
     * Handle navigation item hover with intelligent prefetching.
     * Prefetches relevant data based on the target URL pattern.
     */
    const handleNavItemHover = React.useCallback((url: string) => {
        if (!workspaceId) return;

        // Prefetch subscription and entitlements (used across many pages)
        prefetchSubscription();
        prefetchEntitlements(workspaceId);

        // Parse URL to determine what data to prefetch
        const urlSegments = url.split("/").filter(Boolean);

        // Workspace-level chatbot list page
        if (urlSegments.length === 2 && urlSegments[1] === "chatbot") {
            prefetchChatbots(workspaceId);
            return;
        }

        // Chatbot-specific routes
        const urlBotId = urlSegments[2];
        if (urlBotId && urlBotId !== "create") {
            // Prefetch chatbot details
            prefetchChatbot(workspaceId, urlBotId);

            // Prefetch data sources for sources page
            if (urlSegments[3] === "sources") {
                prefetchDataSources(urlBotId);
            }
        }
    }, [workspaceId, prefetchChatbots, prefetchChatbot, prefetchDataSources, prefetchEntitlements, prefetchSubscription]);



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
            className="border-r border-sidebar-border/80 bg-sidebar"
            {...props}
        >
            <SidebarHeader className="px-3 pt-5 pb-3">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            className="h-14 rounded-2xl border border-transparent bg-transparent px-2.5 data-[state=open]:bg-sidebar-accent/60 data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/60 group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:!justify-center"
                        >
                            <div className="flex aspect-square size-10 items-center justify-center rounded-2xl border border-sidebar-border/70 bg-background shadow-xs group-data-[state=collapsed]:size-9">
                                <Image
                                    src="/verly_logo.png"
                                    alt="Verly"
                                    width={40}
                                    height={40}
                                    className="object-contain drop-shadow-sm group-data-[state=collapsed]:h-7 group-data-[state=collapsed]:w-7"
                                />
                            </div>
                            <div className="ml-1 grid flex-1 text-left leading-tight">
                                <span className="truncate text-[15px] font-bold tracking-[-0.01em] text-foreground">Verly</span>
                                <span className="truncate text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">AI Operations</span>
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
                                                className="group/menu-link hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground data-[active=true]:bg-background data-[active=true]:text-sidebar-primary data-[active=true]:font-semibold group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:!justify-center"
                                            >
                                                <Link
                                                    href={item.url}
                                                    onMouseEnter={() => handleNavItemHover(item.url)}
                                                    prefetch={true}
                                                >
                                                    <div className={`flex size-8 items-center justify-center rounded-xl border border-transparent transition-colors shrink-0 ${isActive ? "bg-primary/10 text-primary" : item.colorClass || "text-muted-foreground bg-transparent"}`}>
                                                        <item.icon className="h-4 w-4" /> {/* Standardize icon size */}
                                                    </div>
                                                    <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                                                        <span>{item.title}</span>
                                                        {isActive && <PanelLeft className="h-3.5 w-3.5 opacity-55" />}
                                                    </div>
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
            <SidebarFooter className="px-3 pb-4 pt-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="h-12 rounded-2xl border border-sidebar-border/70 bg-background data-[state=open]:bg-sidebar-accent/60 data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={user?.avatarUrl || undefined} alt={getUserDisplayName()} />
                                        <AvatarFallback className="rounded-lg bg-primary/10 text-primary">{getUserInitials()}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{getUserDisplayName()}</span>
                                        <span className="truncate text-xs text-muted-foreground">{getUserEmail()}</span>
                                    </div>
                                    <MoreVertical className="ml-auto size-4 text-muted-foreground" />
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
