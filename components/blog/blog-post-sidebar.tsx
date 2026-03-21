"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Database, FileText, Globe } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import type { BlogTocItem } from "@/lib/sanity/extract-blog-toc";
import { cn } from "@/lib/utils";

/**
 * Must stay aligned with `scroll-mt-28` on in-article headings / `#article-top`
 * (Tailwind `mt-28` = 7rem ≈ 112px at default root font size).
 */
const READING_LINE_OFFSET_PX = 112;

const MAIN_SCROLL_ID = "main-scroll-container";

function getMainScroller(): HTMLElement | null {
  return document.getElementById(MAIN_SCROLL_ID);
}

/**
 * Scrolls so the target’s top aligns with the “reading line” below the sticky nav,
 * using the real scrollport (`#main-scroll-container`), not `window`.
 */
function scrollToHeading(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) {
    return false;
  }

  const scroller = getMainScroller();

  if (scroller) {
    const scrollerRect = scroller.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const lineY = scrollerRect.top + READING_LINE_OFFSET_PX;
    const delta = elRect.top - lineY;
    scroller.scrollTo({
      top: scroller.scrollTop + delta,
      behavior: "smooth",
    });
  } else {
    const elRect = el.getBoundingClientRect();
    const delta = elRect.top - READING_LINE_OFFSET_PX;
    window.scrollBy({ top: delta, behavior: "smooth" });
  }

  try {
    history.replaceState(null, "", `#${encodeURIComponent(id)}`);
  } catch {
    history.replaceState(null, "", `#${id}`);
  }

  return true;
}

export function BlogPostSidebar({ tocItems }: { tocItems: BlogTocItem[] }) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState(tocItems[0]?.id ?? "");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setActiveId(tocItems[0]?.id ?? "");
  }, [tocItems]);

  useEffect(() => {
    if (!tocItems.length) {
      return;
    }

    const computeActive = () => {
      const scroller = getMainScroller();
      const lineY = scroller
        ? scroller.getBoundingClientRect().top + READING_LINE_OFFSET_PX
        : READING_LINE_OFFSET_PX;

      let current = tocItems[0]!.id;
      for (const item of tocItems) {
        const el = document.getElementById(item.id);
        if (!el) {
          continue;
        }
        const top = el.getBoundingClientRect().top;
        if (top <= lineY) {
          current = item.id;
        }
      }
      setActiveId((prev) => (prev === current ? prev : current));
    };

    const schedule = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        computeActive();
      });
    };

    schedule();

    const scroller = getMainScroller();
    const scrollTarget: EventTarget = scroller ?? window;
    scrollTarget.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(schedule)
        : null;
    if (ro && scroller) {
      ro.observe(scroller);
    }

    return () => {
      scrollTarget.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      ro?.disconnect();
    };
  }, [tocItems]);

  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, "");
    if (!raw) {
      return;
    }
    let cancelled = false;
    const id = decodeURIComponent(raw);
    const run = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) {
            scrollToHeading(id);
          }
        });
      });
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const onTocClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      if (scrollToHeading(id)) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [],
  );

  const paddingForLevel = (level: BlogTocItem["level"]) => {
    if (level === 3) {
      return "pl-7";
    }
    if (level === 2) {
      return "pl-4";
    }
    return "pl-3";
  };

  return (
    <aside className="relative z-10 min-w-0 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
      <div className="space-y-10">
        {tocItems.length > 0 ? (
          <nav aria-label="Table of contents">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Table of contents
            </p>
            <ul className="space-y-0.5">
              {tocItems.map((item) => {
                const active = activeId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${encodeURIComponent(item.id)}`}
                      onClick={(e) => onTocClick(e, item.id)}
                      className={cn(
                        "relative block rounded-md py-2 pr-2 text-sm leading-snug transition-colors",
                        paddingForLevel(item.level),
                        active
                          ? "font-semibold text-foreground"
                          : "font-medium text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {active ? (
                        <span
                          className="pointer-events-none absolute left-0 top-1/2 h-[70%] w-[3px] -translate-y-1/2 rounded-full bg-primary"
                          aria-hidden
                        />
                      ) : null}
                      <span className={active ? "pl-1.5" : undefined}>
                        {item.text}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}

        <div className="rounded-2xl border border-border/60 bg-card/40 p-6 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)]">
          <div className="relative mx-auto mb-5 flex h-28 max-w-[200px] items-center justify-center">
            <span
              className="absolute inset-x-4 top-2 flex justify-between text-muted-foreground/50"
              aria-hidden
            >
              <Globe className="h-4 w-4" />
              <Database className="h-4 w-4" />
            </span>
            <span
              className="absolute inset-x-2 bottom-6 flex justify-between text-muted-foreground/50"
              aria-hidden
            >
              <FileText className="h-4 w-4" />
            </span>
            <div className="relative flex h-16 w-28 items-center justify-center rounded-full bg-primary shadow-lg">
              <span className="text-xl font-bold text-white">V</span>
            </div>
          </div>
          <h2 className="mb-3 text-center text-lg font-bold tracking-tight text-foreground">
            AI support built in minutes
          </h2>
          <ul className="mb-6 space-y-2.5 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                strokeWidth={2.5}
              />
              <span>Connect voice, chat, and WhatsApp in one place</span>
            </li>
            <li className="flex gap-2">
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                strokeWidth={2.5}
              />
              <span>Train agents on your content with a few clicks</span>
            </li>
          </ul>
          <Link
            href="/"
            className="relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-foreground px-4 py-3 text-center text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            <span
              className="pointer-events-none absolute inset-x-3 bottom-0 h-px bg-primary/60"
              aria-hidden
            />
            Start free with VerlyAI
          </Link>
        </div>
      </div>
    </aside>
  );
}
