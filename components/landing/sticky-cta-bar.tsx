"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";

const HIDDEN_PATHS = ["/login", "/signup", "/onboarding", "/dashboard"];

export default function StickyCTABar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ctaInView, setCtaInView] = useState(false);

  useEffect(() => {
    try {
      setIsAuthenticated(localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN) === "true");
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    const container = document.getElementById("main-scroll-container") || window;
    const onScroll = () => {
      const scrollY =
        container === window
          ? window.scrollY
          : (container as HTMLElement).scrollTop;
      setVisible(scrollY > 400);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-cta-region]");
    if (targets.length === 0) return;
    const observer = new IntersectionObserver(
      () => {
        const stillIn = Array.from(targets).some((t) => {
          const r = t.getBoundingClientRect();
          return r.top < window.innerHeight * 0.95 && r.bottom > 0;
        });
        setCtaInView(stillIn);
      },
      { threshold: [0, 0.15, 0.5] },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [pathname]);

  if (dismissed) return null;
  if (isAuthenticated) return null;
  if (ctaInView) return null;
  if (HIDDEN_PATHS.some((p) => pathname.startsWith(p))) return null;
  if (/^\/[a-f0-9-]{20,}/.test(pathname)) return null;

  return (
    <div
      className={`fixed bottom-5 left-1/2 z-50 hidden -translate-x-1/2 transition-all duration-500 ease-out md:block ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0 pointer-events-none"
      }`}
    >
      {/* Outer shell for the floating CTA */}
      <div className="rounded-[22px] border border-[#d0d5dd]/60 bg-[#eef0f4]/80 p-[5px] shadow-[0_10px_40px_rgba(0,0,0,0.13),0_2px_6px_rgba(0,0,0,0.06)] backdrop-blur-2xl">
        {/* Inner pill */}
        <div className="flex items-center gap-2 rounded-[18px] bg-white px-2 py-1.5">
          <Link
            href="/login"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#315EEA] px-7 text-[14px] font-semibold text-white shadow-[0_2px_8px_rgba(49,94,234,0.3)] transition-all hover:bg-[#2850d0]"
          >
            Get started for free
          </Link>
          <Link
            href="https://calendly.com/rdhakad2002/30min"
            target="_blank"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-[#e0dbd3] bg-white px-7 text-[14px] font-semibold text-[#221f1b] transition-all hover:bg-[#f8f6f3]"
          >
            Book a demo
          </Link>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#b0a898] transition-colors hover:bg-[#f4f1ec] hover:text-[#6d665d]"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
