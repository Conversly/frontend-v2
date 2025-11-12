"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { PanelLeftClose, PanelLeftOpen, Settings, LogOut, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { getDashboardNavItems, type NavItem } from "@/lib/constants/navigation";
import { useSidebar } from "@/contexts/SidebarContext";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/store/auth";
import { useQueryClient } from "@tanstack/react-query";

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { user, logout } = useAuth();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout(queryClient);
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
    if (user.displayName) {
      return user.displayName[0].toUpperCase();
    }
    if (user.username) {
      return user.username[0].toUpperCase();
    }
    return "U";
  };

  const getUserDisplayName = () => {
    if (!user) return "User";
    return user.name || user.displayName || user.username || "User";
  };

  const getUserEmail = () => {
    if (!user) return "";
    return user.username ? `@${user.username}` : "";
  };

  const navItems = getDashboardNavItems();

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon;
    const isActive = item.href ? pathname === item.href : false;

    if (isCollapsed) {
      return (
        <Tooltip key={item.title}>
          <TooltipTrigger asChild>
            <Link
              href={item.href || "#"}
              className={cn(
                "flex items-center justify-center w-10 h-10 mx-auto mb-1 rounded-md transition-all",
                "text-foreground/60 hover:text-foreground hover:bg-muted/50",
                isActive && "bg-muted text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{item.title}</p>
          </TooltipContent>
        </Tooltip>
      );
    }

    return (
      <Link
        key={item.title}
        href={item.href || "#"}
        className={cn(
          "flex items-center gap-2.5 px-3 py-2 text-[13px] transition-all rounded-md",
          "text-foreground/60 hover:text-foreground hover:bg-muted/50",
          isActive && "bg-muted text-foreground font-medium"
        )}
      >
        <Icon className="h-4 w-4 shrink-0" />
        <span className="font-normal">{item.title}</span>
      </Link>
    );
  };

  return (
    <div 
      className={cn(
        "flex h-full flex-col border-r bg-background transition-all duration-300",
        isCollapsed ? "w-16" : "w-[220px]"
      )}
    >
      <div className={cn(
        "flex h-[60px] items-center border-b transition-all duration-300",
        isCollapsed ? "px-2 justify-center" : "px-4 justify-between"
      )}>
        {!isCollapsed && (
          <h2 className="text-2xl font-bold leading-tight bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Verly
          </h2>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-8 w-8"
            >
              {isCollapsed ? (
                <PanelLeftOpen className="h-4 w-4" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Toggle Sidebar ({navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}+B)</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <ScrollArea className="flex-1 min-h-0 px-3 py-3">
        <nav className={cn("space-y-0.5", isCollapsed && "flex flex-col items-center")}>
          {navItems.map((item) => renderNavItem(item))}
        </nav>
      </ScrollArea>

      {/* User Profile Section - Sticky to Bottom */}
      <div className={cn(
        "border-t border-border/40 shrink-0",
        isCollapsed ? "px-2 py-1" : "px-3 py-1.5"
      )}>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className={cn(
                  "w-full justify-start h-auto px-2 py-1 hover:bg-muted/50",
                  isCollapsed && "justify-center px-2 py-1"
                )}
              >
                {isCollapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatarUrl || undefined} alt={getUserDisplayName()} />
                        <AvatarFallback className="text-xs font-medium">{getUserInitials()}</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{getUserDisplayName()}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <div className="flex items-center gap-3 w-full">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarImage src={user.avatarUrl || undefined} alt={getUserDisplayName()} />
                      <AvatarFallback className="text-xs font-medium">{getUserInitials()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start min-w-0 flex-1">
                      <p className="text-sm font-medium leading-none truncate w-full">{getUserDisplayName()}</p>
                      {getUserEmail() && (
                        <p className="text-xs leading-none text-muted-foreground truncate w-full">
                          {getUserEmail()}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align={isCollapsed ? "start" : "end"} side={isCollapsed ? "right" : "top"} forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{getUserDisplayName()}</p>
                  {getUserEmail() && (
                    <p className="text-xs leading-none text-muted-foreground">
                      {getUserEmail()}
                    </p>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button 
            variant="ghost" 
            onClick={() => router.push("/login")} 
            className={cn(
              "w-full justify-start h-auto px-2 py-1",
              isCollapsed && "justify-center px-2 py-1"
            )}
          >
            {isCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <User className="h-5 w-5" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Sign In</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <span className="text-sm font-medium">Sign In</span>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}