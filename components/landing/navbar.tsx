'use client';
import { useState, useEffect } from "react";
import { useAuth } from "@/store/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getLoggedInUser } from "@/lib/api/user";
import { QUERY_KEY } from "@/utils/query-key";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";

export default function Navbar() {
  const { user, logout, setUser } = useAuth();
  const [mounted, setMounted] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setMounted(true);
  }, []);

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
      setUser(fetchedUser);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN, "true");
      } catch {}
    }
  }, [fetchedUser, setUser]);

  return (
    mounted && (
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-xl">VerlyAi</span>
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="w-10 h-10 rounded-full border overflow-hidden">
                    <Image
                      src={user.avatarUrl || "/default-avatar.png"}
                      alt="User avatar"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="w-full cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => logout(queryClient)}
                    className="w-full cursor-pointer"
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Get Started Free
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    )
  );
}
