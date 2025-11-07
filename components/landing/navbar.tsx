'use client';
import { useState, useEffect } from "react";
import { useAuth } from "@/store/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getLoggedInUser } from "@/lib/api/user";
import { QUERY_KEY } from "@/utils/query-key";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, setUser } = useAuth();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { theme, setTheme } = useTheme();

  console.log("Navbar user:", user);

  const { data: fetchedUser } = useQuery({
    queryKey: [QUERY_KEY.LOGGED_IN_USER],
    queryFn: async () => {
      return await getLoggedInUser();
    },
    enabled: mounted,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (fetchedUser) {
      console.log("Setting user in store:", fetchedUser);
      setUser(fetchedUser);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN, "true");
      } catch {}
    }
  }, [fetchedUser, setUser]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {mounted && (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 font-sans"
        >
          <div className="container px-4 sm:px-6 lg:px-8 py-4">
            <div
              className={`
                rounded-2xl backdrop-blur-sm border border-border dark:border-gray-800/60
                ${
                  scrolled
                    ? "bg-background/80 dark:bg-gray-900/60 shadow-lg shadow-black/20"
                    : "bg-background/50 dark:bg-gray-900/30"
                }
                transition-all duration-300
              `}
            >
              <div className="flex items-center justify-between px-6 py-3">
                {/* Logo and Business Name */}
                <Link href="/" className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-500">
                    <span className="text-xl font-bold text-white">C</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-foreground dark:text-white font-display">
                      ConverslyAI
                    </span>
                    <span className="text-xs text-muted-foreground dark:text-gray-400">
                      AI-Powered Knowledge Base
                    </span>
                  </div>
                </Link>

                {/* Navigation Links */}
                <nav className="flex items-center gap-8">
                  <Link
                    href="#features"
                    className="text-muted-foreground dark:text-gray-300 hover:text-foreground dark:hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                  <Link
                    href="#pricing"
                    className="text-muted-foreground dark:text-gray-300 hover:text-foreground dark:hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="#faq"
                    className="text-muted-foreground dark:text-gray-300 hover:text-foreground dark:hover:text-white transition-colors"
                  >
                    FaQs
                  </Link>
                  <Link
                    href="#blog"
                    className="text-muted-foreground dark:text-gray-300 hover:text-foreground dark:hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                  <Button
                        asChild
                        className="bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:opacity-90 px-5 py-2 rounded-xl shadow-md transition-all duration-300"
                      >
                        <Link href="/demo/intentjs">
                          Try Our Product on IntentJS Docs
                        </Link>
                      </Button>
                </nav>

                {/* Auth Buttons */}
                <div className="flex items-center gap-4">
                  {/* Theme Switcher */}
                  {mounted && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                      className="text-foreground dark:text-gray-300 hover:text-foreground dark:hover:text-white hover:bg-muted dark:hover:bg-gray-800/50"
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
                        <button className="w-10 h-10 rounded-full border-2 border-pink-500/50 overflow-hidden hover:border-pink-500 transition-colors cursor-pointer">
                          <Image
                            src={user.avatarUrl || "/default-avatar.png"}
                            alt={user.name || user.displayName || user.username || "User avatar"}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-900 border border-gray-800" align="end">
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none text-white">
                              {user.name || user.displayName || user.username || "User"}
                            </p>
                            {user.username && (
                              <p className="text-xs leading-none text-gray-400">
                                @{user.username}
                              </p>
                            )}
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-gray-800" />
                        <DropdownMenuItem asChild>
                          <Link
                            href="/chatbot"
                            className="w-full text-gray-300 hover:text-white cursor-pointer"
                          >
                            Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/profile"
                            className="w-full text-gray-300 hover:text-white cursor-pointer"
                          >
                            Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/settings"
                            className="w-full text-gray-300 hover:text-white cursor-pointer"
                          >
                            Settings
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-800" />
                        <DropdownMenuItem
                          onClick={() => logout(queryClient)}
                          className="w-full text-gray-300 hover:text-white cursor-pointer text-red-400 hover:text-red-300"
                        >
                          Sign Out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        className="text-gray-300 hover:text-white hover:bg-gray-800/50"
                        onClick={() => router.push("/login")}
                      >
                        Sign In
                      </Button>

                      {/* Get Started Button */}
                      <Button
                        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90"
                        onClick={() => router.push("/login")}
                      >
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.header>
      )}
    </>
  );
}
