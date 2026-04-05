"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Bot,
  CheckCircle2,
  Headphones,
  ThumbsDown,
} from "lucide-react";

const messages = [
  {
    id: 1,
    role: "user",
    text: "I'm having trouble with my recent order #8291. It hasn't arrived yet.",
    delay: 0.5,
    satisfactionImpact: 0,
  },
  {
    id: 2,
    role: "bot",
    text: "Let me check that for you... It seems there's a delay with the courier.",
    delay: 2.0,
    satisfactionImpact: -5,
  },
  {
    id: 3,
    role: "user",
    text: "This is frustrating. Can I speak to a real person?",
    delay: 4.0,
    satisfactionImpact: -20,
  },
  {
    id: 4,
    role: "system",
    text: "Connecting you to a human agent...",
    delay: 5.5,
    satisfactionImpact: 0,
  },
  {
    id: 5,
    role: "agent",
    text: "Hi there! I'm Sarah. I see the issue with the courier. I've expedited it for you now.",
    delay: 7.5,
    satisfactionImpact: 15,
  },
  {
    id: 6,
    role: "user",
    text: "Oh, that's great! Thank you so much, Sarah.",
    delay: 9.5,
    satisfactionImpact: 10,
  },
] as const;

export default function HumanEscalationVisual() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [isEscalating, setIsEscalating] = useState(false);
  const [isResolved, setIsResolved] = useState(false);
  const [satisfactionScore, setSatisfactionScore] = useState(100);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left) / width - 0.5);
    y.set((clientY - top) / height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);
  const shineOpacity = useTransform(mouseX, [-0.5, 0.5], [0, 0.5]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [visibleMessages, isEscalating]);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    setVisibleMessages([]);
    setIsEscalating(false);
    setIsResolved(false);
    setSatisfactionScore(100);

    const sequence = () => {
      let currentScore = 100;

      for (const msg of messages) {
        const timeout = setTimeout(() => {
          setVisibleMessages((prev) => [...prev, msg.id]);

          if (msg.role === "system") {
            setIsEscalating(true);
          }
          if (msg.role === "agent") {
            setIsEscalating(false);
          }
          if (msg.id === 6) {
            setIsResolved(true);
          }

          if (msg.satisfactionImpact !== 0) {
            currentScore = Math.min(
              100,
              Math.max(0, currentScore + msg.satisfactionImpact),
            );
            setSatisfactionScore(currentScore);
          }
        }, msg.delay * 1000);

        timeouts.push(timeout);
      }

      const resetTimeout = setTimeout(() => {
        setVisibleMessages([]);
        setIsEscalating(false);
        setIsResolved(false);
        setSatisfactionScore(100);
        sequence();
      }, 13000);
      timeouts.push(resetTimeout);
    };

    sequence();

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="perspective-1000 relative">
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
        whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative mx-auto flex h-[550px] w-full max-w-[420px] flex-col overflow-hidden rounded-[2.5rem] border border-slate-100/50 bg-white shadow-[0_50px_100px_-20px_rgba(50,50,93,0.25),0_30px_60px_-30px_rgba(0,0,0,0.3)] backdrop-blur-xl group z-20"
      >
        <motion.div
          style={{ opacity: shineOpacity }}
          className="absolute inset-0 z-50 pointer-events-none bg-gradient-to-tr from-transparent via-white/20 to-transparent"
        />

        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-100 bg-white/90 p-5 backdrop-blur-md transform-gpu">
          <div className="flex items-center gap-4">
            <div className="relative">
              <motion.div
                animate={{
                  backgroundColor: isEscalating
                    ? "#fef3c7"
                    : isResolved
                      ? "#dcfce7"
                      : "#eff6ff",
                }}
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl shadow-inner transition-colors duration-500"
              >
                <AnimatePresence mode="wait">
                  {isEscalating ? (
                    <motion.div
                      key="alert"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                    >
                      <AlertCircle size={20} className="text-amber-600" />
                    </motion.div>
                  ) : isResolved ? (
                    <motion.img
                      key="human-img"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Sarah"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <motion.div
                      key="bot"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                    >
                      <Bot size={20} className="text-blue-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              {isEscalating && (
                <span className="absolute -right-1 -top-1 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-500 ring-2 ring-white" />
                </span>
              )}
              {isResolved && (
                <span className="absolute -right-1 -top-1 flex h-3 w-3">
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
                </span>
              )}
            </div>
            <div>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={isResolved ? "Sarah" : "Support Bot"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-base font-bold text-slate-900"
                >
                  {isResolved || visibleMessages.includes(5)
                    ? "Sarah (Premium Support)"
                    : "Verly Assistant"}
                </motion.h3>
              </AnimatePresence>
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${isEscalating ? "bg-amber-500 animate-pulse" : "bg-green-500"} shadow-[0_0_8px_rgba(34,197,94,0.6)]`}
                />
                {isEscalating ? "Escalating..." : "Active Now"}
              </div>
            </div>
          </div>
        </div>

        <div
          ref={chatContainerRef}
          className="relative flex-1 space-y-5 overflow-y-auto bg-slate-50/50 p-5 scroll-smooth no-scrollbar"
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

          <AnimatePresence initial={false} mode="sync">
            {messages.map(
              (msg) =>
                visibleMessages.includes(msg.id) && (
                  <motion.div
                    key={msg.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                      scale: 0.9,
                      filter: "blurAttribute(10px)",
                    }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className={`relative z-10 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "system" ? (
                      <div className="flex w-full justify-center py-4">
                        <motion.div
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: "auto", opacity: 1 }}
                          className="flex items-center gap-3 rounded-full border border-white/20 bg-slate-900/5 px-4 py-2 shadow-sm backdrop-blur-md"
                        >
                          <div className="flex h-3 items-center gap-1">
                            <motion.div
                              animate={{ height: [4, 12, 4] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                              className="w-1 rounded-full bg-amber-500"
                            />
                            <motion.div
                              animate={{ height: [4, 12, 4] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.1 }}
                              className="w-1 rounded-full bg-amber-500"
                            />
                            <motion.div
                              animate={{ height: [4, 12, 4] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                              className="w-1 rounded-full bg-amber-500"
                            />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                            Escalating to Human Agent
                          </span>
                        </motion.div>
                      </div>
                    ) : (
                      <div
                        className={`
                          relative max-w-[85%] rounded-2xl p-4 text-[14px] leading-relaxed shadow-sm transition-all duration-300 group
                          ${
                            msg.role === "user"
                              ? "rounded-br-sm bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-blue-500/20"
                              : msg.role === "agent"
                                ? "rounded-bl-sm border-2 border-green-100 bg-white text-slate-800 shadow-xl shadow-green-500/10"
                                : "rounded-bl-sm border border-slate-200/60 bg-white text-slate-700 shadow-sm"
                          }
                        `}
                      >
                        {msg.text}
                        {msg.role === "agent" && (
                          <div className="absolute -left-2 -top-2 scale-0 rounded-full bg-green-500 p-1 text-white shadow-lg transition-transform duration-300 group-hover:scale-100">
                            <CheckCircle2 size={10} />
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                ),
            )}
          </AnimatePresence>

          {isEscalating && !visibleMessages.includes(5) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1 pl-4"
            >
              <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.3s]" />
              <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.15s]" />
              <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300" />
            </motion.div>
          )}
          <div className="h-2" />
        </div>

        <div className="z-20 border-t border-slate-100/80 bg-white p-4">
          <div className="group flex h-12 items-center justify-between rounded-full border border-slate-200 bg-slate-50 px-4 transition-all focus-within:ring-2 focus-within:ring-blue-500/20">
            <span className="text-sm font-medium text-slate-400">Message...</span>
            <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-600 shadow-lg shadow-blue-500/30 transition-transform group-hover:scale-110">
              <ArrowRight size={16} className="text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-5 grid grid-cols-2 gap-3 lg:hidden">
        <div className="rounded-2xl border border-white/40 bg-white/80 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                background:
                  satisfactionScore < 85
                    ? "linear-gradient(to top right, #ef4444, #f87171)"
                    : "linear-gradient(to top right, #10b981, #34d399)",
              }}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-lg transition-colors duration-500"
            >
              {satisfactionScore < 85 ? (
                <ThumbsDown size={16} />
              ) : (
                <CheckCircle2 size={18} />
              )}
            </motion.div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Satisfaction
              </div>
              <div
                className={`text-xl font-black leading-none ${satisfactionScore < 85 ? "text-red-500" : "text-slate-800"}`}
              >
                {satisfactionScore}%
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/40 bg-white/80 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                backgroundColor: isEscalating
                  ? "#fff7ed"
                  : isResolved
                    ? "#f0fdf4"
                    : "#eff6ff",
                borderColor: isEscalating
                  ? "#ffedd5"
                  : isResolved
                    ? "#dcfce7"
                    : "#dbeafe",
              }}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow-sm transition-colors duration-500"
            >
              {isEscalating ? (
                <Activity size={16} className="text-amber-500" />
              ) : isResolved ? (
                <Headphones size={16} className="text-green-600" />
              ) : (
                <Bot size={16} className="text-blue-600" />
              )}
            </motion.div>
            <div>
              <div className="text-sm font-bold text-slate-800">
                {isEscalating
                  ? "Escalating"
                  : isResolved
                    ? "Connected"
                    : "AI Active"}
              </div>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${isEscalating ? "bg-amber-500 animate-pulse" : "bg-green-500"}`}
                />
                <span className="text-[10px] font-medium text-slate-500">
                  {isEscalating ? "Routing..." : "Active Now"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        style={{
          y: useTransform(mouseY, [0, 1], [-15, 15]),
          x: useTransform(mouseX, [0, 1], [-15, 15]),
          z: 40,
        }}
        className="absolute -right-4 top-[15%] z-30 hidden min-w-[180px] rounded-2xl border border-white/40 bg-white/80 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md lg:block"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <motion.div
              animate={{
                background:
                  satisfactionScore < 85
                    ? "linear-gradient(to top right, #ef4444, #f87171)"
                    : "linear-gradient(to top right, #10b981, #34d399)",
              }}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-lg transition-colors duration-500"
            >
              <AnimatePresence mode="wait">
                {satisfactionScore < 85 ? (
                  <motion.div
                    key="sad"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <ThumbsDown size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="happy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <CheckCircle2 size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <div className="absolute -bottom-1 -right-1 rounded-full bg-white p-0.5 shadow-sm">
              <motion.div
                animate={{
                  backgroundColor: satisfactionScore < 85 ? "#ef4444" : "#22c55e",
                }}
                className="h-4 w-4 rounded-full border-2 border-white transition-colors duration-500"
              />
            </div>
          </div>
          <div>
            <div className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Satisfaction Score
            </div>
            <motion.div
              key={satisfactionScore}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-2xl font-black leading-none ${satisfactionScore < 85 ? "text-red-500" : "text-slate-800"}`}
            >
              {satisfactionScore}%
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{
          y: useTransform(mouseY, [0, 1], [15, -15]),
          x: useTransform(mouseX, [0, 1], [15, -15]),
          z: 30,
        }}
        className="absolute -left-8 bottom-[15%] z-30 hidden min-w-[170px] rounded-2xl border border-white/40 bg-white/80 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md lg:block"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{
              backgroundColor: isEscalating
                ? "#fff7ed"
                : isResolved
                  ? "#f0fdf4"
                  : "#eff6ff",
              borderColor: isEscalating
                ? "#ffedd5"
                : isResolved
                  ? "#dcfce7"
                  : "#dbeafe",
            }}
            className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border text-blue-600 shadow-sm transition-colors duration-500"
          >
            <AnimatePresence mode="wait">
              {isEscalating ? (
                <motion.div
                  key="activity"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Activity size={20} className="text-amber-500" />
                </motion.div>
              ) : isResolved ? (
                <motion.img
                  key="human-img"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Agent"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="h-full w-full object-cover"
                />
              ) : (
                <motion.div
                  key="bot"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Headphones size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <div className="flex flex-col">
            <span className="whitespace-nowrap text-sm font-bold text-slate-800">
              {isEscalating
                ? "System Alert"
                : isResolved
                  ? "Agent Connected"
                  : "AI Assistant"}
            </span>
            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span
                  className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${isEscalating ? "bg-amber-400" : "bg-green-400"}`}
                />
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${isEscalating ? "bg-amber-500" : "bg-green-500"}`}
                />
              </span>
              <motion.span
                key={isEscalating ? "escalating" : "active"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] font-medium text-slate-500"
              >
                {isEscalating ? "Escalating..." : "Active Now"}
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
