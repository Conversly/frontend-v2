"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { logout as apiLogout } from "@/lib/api/auth";
import { getUserWorkspaces } from "@/lib/api/workspaces";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";

export default function NavbarAuthActions() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dashboardHref, setDashboardHref] = useState("/");

  useEffect(() => {
    let cancelled = false;
    const isLoggedIn = localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN) === "true";

    if (!isLoggedIn) {
      setIsAuthenticated(false);
      return;
    }

    setIsAuthenticated(true);

    getUserWorkspaces()
      .then((workspaces) => {
        if (cancelled) return;
        const first = workspaces[0]?.workspaceId;
        if (first) {
          setDashboardHref(`/${first}/chatbot`);
        }
      })
      .catch(() => {
        if (cancelled) return;
        localStorage.setItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN, "false");
        setIsAuthenticated(false);
        setDashboardHref("/");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN, "false");
      await apiLogout();
    } catch {
      // Best effort: we still want the browser to leave the authenticated shell.
    } finally {
      router.replace("/");
      router.refresh();
    }
  };

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-3">
        <Link href={dashboardHref}>
          <Button variant="outline" className="rounded-full">
            Dashboard
          </Button>
        </Link>
        <Button variant="ghost" className="rounded-full" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Link href="/login">
      <Button className="group relative overflow-hidden rounded-full border border-blue-600/70 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-6 font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.34)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:from-[#1d4ed8] hover:to-[#1e40af] hover:shadow-[0_16px_34px_rgba(37,99,235,0.42)]">
        <span className="relative z-10 flex items-center gap-2">
          Get started
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Button>
    </Link>
  );
}
