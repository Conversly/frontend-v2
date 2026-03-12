"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, FileText, MessageSquare, Sparkles, Settings, Zap, Bell, ExternalLink } from "lucide-react";
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

interface TipItem {
  icon: React.ReactNode;
  text: string;
}

interface TipsCarouselProps {
  tips?: readonly TipItem[];
  interval?: number;
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

// =============================================================================
// ROTATING TIPS COMPONENT
// =============================================================================

const TIPS = [
  {
    icon: <FileText className="h-5 w-5" />,
    text: "Train Verly using PDFs, docs, or knowledge base content.",
  },
  {
    icon: <ExternalLink className="h-5 w-5" />,
    text: "Connect integrations like Slack, Zendesk, or Intercom.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    text: "Customize your chatbot tone and personality.",
  },
  {
    icon: <Settings className="h-5 w-5" />,
    text: "Upload internal documentation for better answers.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    text: "Use Verly to automate customer support.",
  },
] as const;

function TipsCarousel({ tips = TIPS, interval = 5500 }: TipsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tips.length);
    }, interval);

    return () => clearInterval(timer);
  }, [tips.length, interval, isPaused]);

  return (
    <div
      className="relative h-24 w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 text-primary"
          >
            {tips[currentIndex].icon}
          </motion.div>
          <p className="text-center text-sm text-muted-foreground max-w-xs">
            {tips[currentIndex].text}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1.5">
        {tips.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === currentIndex
                ? "w-6 bg-primary"
                : "w-1.5 bg-primary/20 hover:bg-primary/40"
            )}
            aria-label={`Go to tip ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// DYNAMIC LOG GENERATOR
// =============================================================================

// Dynamic log generator based on URL for realistic simulation
function generateMockLogs(url: string): Array<{ message: string; delay: number; type: "info" | "success" | "processing" }> {
  let hostname = "your-website.com";
  try {
    hostname = url ? new URL(url.startsWith("http") ? url : `https://${url}`).hostname : hostname;
  } catch { /* ignore */ }

  const paths = [
    "/",
    "/pricing",
    "/about",
    "/contact",
    "/features",
    "/docs/getting-started",
    "/blog/announcing-new-release",
    "/help/faq",
    "/integrations",
    "/testimonials",
  ];

  const shuffled = [...paths].sort(() => Math.random() - 0.5);
  const pageCount = 12 + Math.floor(Math.random() * 15);
  const selectedPaths = shuffled.slice(0, Math.min(6, shuffled.length));

  return [
    { message: `Connecting to ${hostname}...`, delay: 0, type: "info" },
    { message: "Analyzing robots.txt & sitemap", delay: 1200, type: "info" },
    { message: `Found ${pageCount} pages to crawl`, delay: 2800, type: "success" },
    ...selectedPaths.map((path, i) => ({
      message: `Crawling ${path}`,
      delay: 4000 + i * 1800,
      type: "processing" as const,
    })),
    { message: "Extracting content & structure...", delay: 14000, type: "processing" },
    { message: "Found 23 FAQs and key pages", delay: 18000, type: "success" },
    { message: "Chunking documents for AI training...", delay: 22000, type: "processing" },
    { message: "Building searchable knowledge base...", delay: 32000, type: "processing" },
    { message: "Generating embeddings (this may take a moment)", delay: 45000, type: "processing" },
    { message: "Optimizing response patterns...", delay: 65000, type: "processing" },
    { message: "Finalizing your AI agent", delay: 85000, type: "success" },
  ];
}

// =============================================================================
// ACTIVITY LOGS COMPONENT
// =============================================================================

function ActivityLogs({ logs, maxHeight = 200 }: ActivityLogsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const prevLogsLength = useRef(logs.length);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (!scrollRef.current) return;
    if (logs.length > prevLogsLength.current && autoScroll) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
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
        Activity Log
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
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Starting crawler...
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
                  <span className="flex-shrink-0 ml-auto text-[10px] opacity-50">
                    {log.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
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
          Resume auto-scroll
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
        {isComplete ? "Complete!" : `${Math.round(clampedProgress)}% complete`}
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
    <div className="relative flex items-center justify-center">
      {/* Outer glow ring */}
      <motion.div
        className="absolute h-32 w-32 rounded-full bg-primary/10"
        animate={{
          scale: [1, 1.2, 1],
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
        className="absolute h-24 w-24 rounded-full bg-primary/20"
        animate={{
          scale: [1, 1.1, 1],
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
        className="absolute h-16 w-16"
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
              transform: `rotate(${deg}deg) translate(28px) translate(-50%, -50%)`,
            }}
          />
        ))}
      </motion.div>

      {/* Center bot icon */}
      <motion.div
        className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkles className="h-6 w-6 text-primary-foreground" />
        
        {/* Pulse dot */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
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
  const [stage, setStage] = useState("Connecting...");
  const [showLeaveMessage, setShowLeaveMessage] = useState(false);
  const [pageStats, setPageStats] = useState<{ processed: number; total: number } | null>(null);

  // Simulate logs and smooth continuous progress
  useEffect(() => {
    // If we have real-time events, use those instead of simulation
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

    // Only simulate if no real events provided
    if (!realTimeEvents) {
      const timeouts: NodeJS.Timeout[] = [];
      const mockLogs = generateMockLogs(url);
      let totalPages = 0;
      let processedPages = 0;

      // Phase-based progress targets for smooth animation
      // Note: training stops at 98% so bar doesn't feel "stuck" at a low number
      const phaseTargets = {
        discovery: { target: 15, stage: "Discovering pages..." },
        crawling: { target: 45, stage: "Crawling website..." },
        extracting: { target: 70, stage: "Extracting content..." },
        training: { target: 98, stage: "Training AI model..." },
        finalizing: { target: 100, stage: "Finalizing..." },
      };

      let currentPhase: keyof typeof phaseTargets = "discovery";

      // Smooth progress animation
      const animateProgress = () => {
        const interval = setInterval(() => {
          setSmoothProgress((prev) => {
            const target = phaseTargets[currentPhase].target;
            // Smooth approach to target
            const diff = target - prev;
            if (Math.abs(diff) < 0.5) return prev;
            return prev + diff * 0.03; // Smooth easing factor
          });
        }, 50); // Update every 50ms for smooth animation
        timeouts.push(interval as unknown as NodeJS.Timeout);
      };

      animateProgress();

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

          // Update phase based on log content for smooth progress transitions
          if (log.message.includes("Found") && log.message.includes("pages")) {
            const match = log.message.match(/(\d+) pages/);
            if (match) {
              totalPages = parseInt(match[1]);
              setPageStats({ processed: 0, total: totalPages });
              currentPhase = "crawling";
              setStage(phaseTargets.crawling.stage);
            }
          } else if (log.message.includes("Crawling")) {
            processedPages += 1;
            setPageStats({ processed: processedPages, total: totalPages });
          } else if (log.message.includes("Extracting") || log.message.includes("Chunking")) {
            currentPhase = "extracting";
            setStage(phaseTargets.extracting.stage);
          } else if (log.message.includes("embeddings") || log.message.includes("Generating")) {
            currentPhase = "training";
            setStage(phaseTargets.training.stage);
          } else if (log.message.includes("Finalizing")) {
            currentPhase = "finalizing";
            setStage(phaseTargets.finalizing.stage);
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

  // Format progress detail
  const progressDetail = pageStats && pageStats.total > 0
    ? `${Math.round(pageStats.processed)} / ${pageStats.total} pages`
    : undefined;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8"
      >
        {/* TOP SECTION */}
        <div className="flex flex-col items-center gap-6">
          {/* Animated Illustration */}
          <AnimatedIllustration />

          {/* Title & Subtitle */}
          <div className="text-center space-y-2">
            <h1 className="text-xl font-semibold text-foreground">
              Your AI agent is learning about your website
            </h1>
            <p className="text-sm text-muted-foreground">
              Usually takes 60–120 seconds
            </p>
          </div>

          {/* Rotating Tips */}
          <div className="w-full rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm">
            <TipsCarousel />
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="space-y-6">
          {/* Activity Logs */}
          <ActivityLogs logs={logs} maxHeight={180} />

          {/* Smooth Progress Indicator */}
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
              You can leave this page. We&apos;ll notify you when your AI agent is ready.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// Export sub-components for individual use
export { TipsCarousel, ActivityLogs, ProgressIndicator, AnimatedIllustration };
export { TIPS };
export type { CrawlLog, TipsCarouselProps, ActivityLogsProps, ProgressIndicatorProps, SetupLoaderProps };
