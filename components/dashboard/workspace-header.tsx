"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, LogOut, User, Bot, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/store/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function WorkspaceHeader() {
  const pathname = usePathname();
  const isOnChatbotsPage = pathname === "/chatbot";
  const { user, logout } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-full items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/chatbot" className="shrink-0">
            <h1 className="text-3xl md:text-4xl font-bold hover:text-primary transition-colors">
              Conversly
            </h1>
          </Link>
          <nav className="flex items-center">
            <Link href="/chatbot">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "gap-2 h-10 px-4 text-sm font-medium",
                  isOnChatbotsPage && "bg-accent text-accent-foreground"
                )}
              >
                <Bot className="h-4 w-4" />
                <span className="hidden sm:inline">Chatbots</span>
              </Button>
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-3 md:gap-4">
          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-10 w-10 shrink-0"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          )}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full shrink-0">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatarUrl || undefined} alt={getUserDisplayName()} />
                    <AvatarFallback className="text-sm font-medium">{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
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
            <Button variant="ghost" onClick={() => router.push("/login")} className="h-10 px-4 text-sm font-medium shrink-0">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
