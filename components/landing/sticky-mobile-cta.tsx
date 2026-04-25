"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarClock } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Mobile-only sticky CTA bar.
 *
 * Appears after the user has scrolled ~600px on screens <= md.
 * On desktop, returns null. The widget embed ("Ask the AI") sits
 * on the right so the bar lives at the bottom without overlapping.
 */
export default function StickyMobileCta() {
  const [visible, setVisible] = useState(false);
  const [ctaInView, setCtaInView] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const scroller =
      document.getElementById("main-scroll-container") ?? window;

    const onScroll = () => {
      const y =
        scroller === window
          ? window.scrollY
          : (scroller as HTMLElement).scrollTop;
      setVisible(y > 600);
    };

    onScroll();

    if (scroller === window) {
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
    (scroller as HTMLElement).addEventListener("scroll", onScroll, {
      passive: true,
    });
    return () =>
      (scroller as HTMLElement).removeEventListener("scroll", onScroll);
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
  }, []);

  const shouldShow = visible && !ctaInView;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          key="sticky-mobile-cta"
          initial={prefersReducedMotion ? false : { y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { y: 90, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          role="region"
          aria-label="Primary call to action"
          className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(env(safe-area-inset-bottom),12px)] pt-2 md:hidden"
        >
          <div className="pointer-events-auto mx-auto flex w-full max-w-[480px] items-center gap-2 rounded-full border border-white/70 bg-white/90 p-1.5 shadow-[0_18px_42px_rgba(15,23,42,0.16),0_2px_6px_rgba(15,23,42,0.08)] backdrop-blur-md">
            <Link
              href="/login"
              className="group flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-[#141923] px-4 text-[14px] font-semibold text-white transition-colors hover:bg-[#1d2432]"
            >
              Start free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="https://calendly.com/rdhakad2002/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center justify-center gap-1.5 rounded-full border border-[#e4e9f4] bg-white px-4 text-[13px] font-semibold text-[#0f172a] transition-colors hover:bg-[#f8fafc]"
              aria-label="Book a 20-minute demo"
            >
              <CalendarClock className="h-4 w-4" />
              <span>Book demo</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
