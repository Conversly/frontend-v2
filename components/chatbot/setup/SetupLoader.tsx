"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, MessageSquare, Sparkles, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// TYPES
// =============================================================================

interface CrawlLog {
  id: string;
  message: string;
  timestamp: Date;
  type: "success" | "info" | "processing";
}

interface ActivityLogsProps {
  logs: CrawlLog[];
  maxHeight?: number;
}

interface ProgressIndicatorProps {
  processedPages: number;
  totalPages: number;
  stage: string;
}

interface SetupLoaderProps {
  url: string;
  onLeavePage?: () => void;
  // Optional: Real backend events
  realTimeEvents?: {
    logs?: CrawlLog[];
    progress?: { processed: number; total: number };
    stage?: string;
  };
}

const MAX_VISIBLE_LOGS = 8;

// =============================================================================
// DYNAMIC LOG GENERATOR
// =============================================================================

// Human-friendly activity messages — no technical jargon (crawling, embeddings, chunking, etc.)
function generateMockLogs(url: string): Array<{ message: string; delay: number; type: "info" | "success" | "processing" }> {
  let hostname = "your-website.com";
  try {
    hostname = url ? new URL(url.startsWith("http") ? url : `https://${url}`).hostname : hostname;
  } catch { /* ignore */ }

  const pageLabels = [
    "Home page",
    "Pricing",
    "About us",
    "Contact",
    "Features",
    "Getting started",
    "Blog",
    "Help & FAQ",
    "Integrations",
    "Testimonials",
  ];

  const pageCount = 30;
  // Cycle through labels so we have exactly pageCount "Reading:" entries — progress can reach total
  const readingLabels = Array.from({ length: pageCount }, (_, i) => pageLabels[i % pageLabels.length]);
  const readingInterval = 800;
  const readingStartDelay = 4000;
  const postReadingStart = readingStartDelay + pageCount * readingInterval + 1000;

  return [
    { message: `Connecting to ${hostname}…`, delay: 0, type: "info" },
    { message: "Checking which pages we can read…", delay: 1200, type: "info" },
    { message: `We found ${pageCount} pages. Reading them now…`, delay: 2800, type: "success" },
    ...readingLabels.map((label, i) => ({
      message: label.toLowerCase().includes("page") ? `Reading the ${label}` : `Reading the ${label} page`,
      delay: readingStartDelay + i * readingInterval,
      type: "processing" as const,
    })),
    { message: "Understanding your content…", delay: postReadingStart, type: "processing" },
    { message: "Identified key topics and FAQs", delay: postReadingStart + 4000, type: "success" },
    { message: "Organizing content for your assistant…", delay: postReadingStart + 8000, type: "processing" },
    { message: "Making it easy for your assistant to find answers…", delay: postReadingStart + 14000, type: "processing" },
    { message: "Teaching your assistant how to respond…", delay: postReadingStart + 23000, type: "processing" },
    { message: "Fine-tuning responses…", delay: postReadingStart + 35000, type: "processing" },
    { message: "Your AI assistant is ready", delay: postReadingStart + 45000, type: "success" },
  ];
}

// =============================================================================
// ACTIVITY LOGS COMPONENT
// =============================================================================

function ActivityLogs({ logs, maxHeight = 200 }: ActivityLogsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const prevLogsLength = useRef(logs.length);

  // Auto-scroll to bottom when new logs arrive (smooth)
  useEffect(() => {
    if (!scrollRef.current) return;
    if (logs.length > prevLogsLength.current && autoScroll) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
    prevLogsLength.current = logs.length;
  }, [logs, autoScroll]);

  // Detect manual scroll to disable auto-scroll
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 20;
    setAutoScroll(isNearBottom);
  }, []);

  const getIcon = (type: CrawlLog["type"]) => {
    switch (type) {
      case "success":
        return <Check className="h-3 w-3 text-green-500" />;
      case "processing":
        return <Loader2 className="h-3 w-3 animate-spin text-blue-500" />;
      default:
        return <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />;
    }
  };

  return (
    <div className="relative">
      <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        <MessageSquare className="h-3 w-3" />
        Live updates
      </div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="rounded-lg border border-border bg-muted/30 backdrop-blur-sm overflow-hidden"
        style={{ maxHeight }}
      >
        <div className="p-3 space-y-2">
          {logs.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin mr-2 shrink-0" />
              Getting started…
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {logs.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index === logs.length - 1 ? 0 : 0 }}
                  className={cn(
                    "flex items-center gap-2.5 text-xs",
                    index === logs.length - 1 ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  <span className="flex-shrink-0">{getIcon(log.type)}</span>
                  <span className="truncate">{log.message}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
      {!autoScroll && logs.length > 0 && (
        <button
          onClick={() => setAutoScroll(true)}
          className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-primary px-2 py-1 text-[10px] font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
        >
          <Bell className="h-3 w-3" />
          Show latest
        </button>
      )}
    </div>
  );
}

// =============================================================================
// PROGRESS INDICATOR COMPONENT
// =============================================================================

interface SmoothProgressIndicatorProps {
  // 0-100 continuous progress value
  progress: number;
  stage: string;
  // Optional detail text (e.g., "12 / 41 pages")
  detail?: string;
}

function SmoothProgressIndicator({ progress, stage, detail }: SmoothProgressIndicatorProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const isComplete = clampedProgress >= 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{stage}</span>
        {detail && <span className="text-muted-foreground">{detail}</span>}
      </div>

      <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
        {/* Background shimmer for active state */}
        {clampedProgress < 100 && clampedProgress > 0 && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        {/* Main progress bar */}
        <motion.div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full",
            isComplete
              ? "bg-green-500"
              : "bg-gradient-to-r from-primary to-primary/80"
          )}
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {/* Animated shimmer on the bar */}
          {clampedProgress < 100 && clampedProgress > 0 && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          )}
        </motion.div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {isComplete ? "Your assistant is ready. You can customize it in the next steps." : `${Math.round(clampedProgress)}% complete`}
      </p>
    </div>
  );
}

// Legacy component kept for backward compatibility
function ProgressIndicator({
  processedPages,
  totalPages,
  stage,
}: ProgressIndicatorProps) {
  const progress = totalPages > 0 ? (processedPages / totalPages) * 100 : 0;
  const detail = totalPages > 0 ? `${processedPages} / ${totalPages} pages` : undefined;
  return <SmoothProgressIndicator progress={progress} stage={stage} detail={detail} />;
}

// =============================================================================
// ANIMATED ILLUSTRATION COMPONENT
// =============================================================================

function AnimatedIllustration() {
  return (
    <div className="relative flex items-center justify-center h-28 w-full overflow-hidden">
      {/* Outer glow ring — kept inside bounds */}
      <motion.div
        className="absolute h-24 w-24 rounded-full bg-primary/10"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Middle ring */}
      <motion.div
        className="absolute h-20 w-20 rounded-full bg-primary/20"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ borderStyle: "dashed", borderWidth: 2, borderColor: "hsl(var(--primary) / 0.3)" }}
      />

      {/* Inner spinning elements */}
      <motion.div
        className="absolute h-14 w-14"
        animate={{ rotate: -360 }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[0, 90, 180, 270].map((deg) => (
          <div
            key={deg}
            className="absolute h-2 w-2 rounded-full bg-primary/60"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${deg}deg) translate(24px) translate(-50%, -50%)`,
            }}
          />
        ))}
      </motion.div>

      {/* Center icon */}
      <motion.div
        className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkles className="h-5 w-5 text-primary-foreground" />
        
        {/* Pulse dot — inside bounds */}
        <span className="absolute top-0 right-0 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
        </span>
      </motion.div>

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-primary/40"
          animate={{
            y: [0, -20, 0],
            x: [0, (i % 2 === 0 ? 10 : -10), 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
          style={{
            top: `${40 + (i % 3) * 15}%`,
            left: `${20 + (i % 4) * 20}%`,
          }}
        />
      ))}
    </div>
  );
}

// =============================================================================
// MAIN SETUP LOADER COMPONENT
// =============================================================================

export function SetupLoader({
  url,
  onLeavePage,
  realTimeEvents,
}: SetupLoaderProps) {
  const [logs, setLogs] = useState<CrawlLog[]>([]);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [stage, setStage] = useState("Connecting to your website…");
  const [showLeaveMessage, setShowLeaveMessage] = useState(false);
  const [pageStats, setPageStats] = useState<{ processed: number; total: number } | null>(null);

  // Use real-time events when provided; otherwise show mock logs so user sees activity, not a spinner
  useEffect(() => {
    if (realTimeEvents?.logs) {
      setLogs(realTimeEvents.logs);
    }
    if (realTimeEvents?.progress) {
      const { processed, total } = realTimeEvents.progress;
      setPageStats({ processed, total });
      setSmoothProgress(total > 0 ? (processed / total) * 100 : 0);
    }
    if (realTimeEvents?.stage) {
      setStage(realTimeEvents.stage);
    }

    if (!realTimeEvents) {
      const timeouts: NodeJS.Timeout[] = [];
      const mockLogs = generateMockLogs(url);
      let totalPages = 0;
      let processedPages = 0;

      const stageLabels = {
        reading: "Reading your website pages…",
        understanding: "Understanding your content…",
        preparing: "Preparing your AI assistant…",
        finalizing: "Almost there…",
      };

      mockLogs.forEach((log, index) => {
        const timeout = setTimeout(() => {
          setLogs((prev) => [
            ...prev,
            {
              id: `log-${index}-${Date.now()}`,
              message: log.message,
              timestamp: new Date(),
              type: log.type,
            },
          ]);

          if (log.message.includes("We found") && log.message.includes("pages")) {
            const match = log.message.match(/(\d+) pages/);
            if (match) {
              totalPages = parseInt(match[1]);
              setPageStats({ processed: 0, total: totalPages });
              setSmoothProgress(0);
              setStage(stageLabels.reading);
            }
          } else if (log.message.startsWith("Reading the ")) {
            processedPages += 1;
            const processed = processedPages;
            const total = totalPages;
            setPageStats({ processed, total });
            setSmoothProgress(total > 0 ? (processed / total) * 100 : 0);
          } else if (log.message.includes("Understanding your content") || log.message.includes("Organizing content") || log.message.includes("Making it easy")) {
            setStage(stageLabels.understanding);
          } else if (log.message.includes("Teaching your assistant") || log.message.includes("Fine-tuning")) {
            setStage(stageLabels.preparing);
          } else if (log.message.includes("Your AI assistant is ready")) {
            setStage(stageLabels.finalizing);
            setSmoothProgress(100);
            setPageStats((prev) => prev ? { processed: prev.total, total: prev.total } : null);
          }
        }, log.delay);
        timeouts.push(timeout);
      });

      return () => {
        timeouts.forEach(clearTimeout);
      };
    }
  }, [realTimeEvents, url]);

  // Show leave message after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLeaveMessage(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // Human-friendly progress detail (e.g. "12 of 41 pages read")
  const progressDetail = pageStats && pageStats.total > 0
    ? `${Math.round(pageStats.processed)} of ${pageStats.total} pages read`
    : undefined;

  // Stage stepper: what's done / what's next (0–4)
  const STAGE_STEPS = ["Connecting", "Reading pages", "Understanding", "Preparing", "Done"] as const;
  const getStageIndex = (): number => {
    if (smoothProgress >= 100) return 4;
    if (stage.includes("Almost") || stage.includes("Finaliz")) return 4;
    if (stage.includes("Preparing") || stage.includes("Teaching") || stage.includes("Fine-tuning")) return 3;
    if (stage.includes("Understanding") || stage.includes("Organizing") || stage.includes("Making it easy")) return 2;
    if (stage.includes("Reading")) return 1;
    return 0;
  };
  const currentStageIndex = getStageIndex();

  return (
    <div className="flex h-full w-full flex-col items-center overflow-hidden px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col h-full min-h-0 w-full max-w-md"
      >
        {/* TOP SECTION */}
        <div className="flex flex-col items-center gap-6 flex-shrink-0">
          {/* Animated Illustration */}
          <AnimatedIllustration />

          {/* Title & Subtitle */}
          <div className="text-center space-y-2">
            <h1 className="text-xl font-semibold text-foreground">
              We&apos;re reading your website
            </h1>
            <p className="text-sm text-muted-foreground">
              We&apos;re reading your pages and learning your content. Your assistant will be ready in about 1–2 minutes.
            </p>
          </div>
        </div>

        {/* BOTTOM SECTION: Live updates + progress */}
        <div className="flex-1 min-h-0 overflow-y-auto space-y-6">
          <ActivityLogs logs={logs.slice(-MAX_VISIBLE_LOGS)} maxHeight={180} />
          {/* Stage stepper: what's done / what's next */}
          <div className="flex items-center justify-between gap-1">
            {STAGE_STEPS.map((label, i) => {
              const isDone = i < currentStageIndex;
              const isCurrent = i === currentStageIndex;
              return (
                <div key={label} className="flex flex-1 items-center">
                  <div
                    className={cn(
                      "flex h-2 w-2 shrink-0 rounded-full transition-colors",
                      isDone && "bg-green-500",
                      isCurrent && "bg-primary ring-2 ring-primary/30 ring-offset-2 ring-offset-background",
                      !isDone && !isCurrent && "bg-muted"
                    )}
                    title={label}
                  />
                  {i < STAGE_STEPS.length - 1 && (
                    <div
                      className={cn(
                        "mx-0.5 h-px flex-1 min-w-2",
                        isDone ? "bg-green-500/50" : "bg-muted"
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <SmoothProgressIndicator
            progress={smoothProgress}
            stage={stage}
            detail={progressDetail}
          />
        </div>

        {/* Leave Page Message */}
        <AnimatePresence>
          {showLeaveMessage && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center text-xs text-muted-foreground"
            >
              Feel free to leave this page. We&apos;ll have your assistant ready when you return.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// Export sub-components for individual use
export { ActivityLogs, ProgressIndicator, AnimatedIllustration };
export type { CrawlLog, ActivityLogsProps, ProgressIndicatorProps, SetupLoaderProps };
