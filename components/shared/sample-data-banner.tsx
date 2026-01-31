"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

interface SampleDataBannerProps {
  storageKey: string;
  className?: string;
  message?: string;
  dismissLabel?: string;
  onDismiss?: () => void;
}

export function SampleDataBanner({
  storageKey,
  className,
  message = "This is sample data. Dismiss for real data.",
  dismissLabel = "Dismiss",
  onDismiss,
}: SampleDataBannerProps) {
  const canUseStorage = useMemo(() => {
    // avoid crashing if storage is unavailable (private mode, disabled, etc)
    try {
      return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
    } catch {
      return false;
    }
  }, []);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!canUseStorage) return setOpen(true);
    try {
      const dismissed = window.localStorage.getItem(storageKey) === "1";
      setOpen(!dismissed);
    } catch {
      setOpen(true);
    }
  }, [canUseStorage, storageKey]);

  const dismiss = () => {
    setOpen(false);
    onDismiss?.();
    if (!canUseStorage) return;
    try {
      window.localStorage.setItem(storageKey, "1");
    } catch {
      // ignore
    }
  };

  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed bottom-4 left-1/2 -translate-x-1/2 z-50",
        "w-[min(92vw,520px)]",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-3",
          "rounded-lg border",
          "bg-indigo-700 text-white",
          "px-4 py-3 shadow-lg"
        )}
      >
        <div className="text-sm leading-snug">{message}</div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={dismiss}
          className="text-white hover:bg-white/10"
        >
          {dismissLabel}
        </Button>
      </div>
    </div>
  );
}

