"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { User, Bot, Headphones, CheckCircle2, AlertCircle, ArrowRight, Sparkles, Zap, MessageSquare, ThumbsDown, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
        satisfactionImpact: -20, // Frustrated
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
        satisfactionImpact: +15, // Recovery
    },
    {
        id: 6,
        role: "user",
        text: "Oh, that's great! Thank you so much, Sarah.",
        delay: 9.5,
        satisfactionImpact: +10, // Delighted
    },
];

export default function HumanEscalationSection() {
    const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
    const [isEscalating, setIsEscalating] = useState(false);
    const [isResolved, setIsResolved] = useState(false);
    const [satisfactionScore, setSatisfactionScore] = useState(100);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
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

    // Auto-scroll effect
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [visibleMessages, isEscalating]);

    useEffect(() => {
        let timeouts: NodeJS.Timeout[] = [];

        // Reset state
        setVisibleMessages([]);
        setIsEscalating(false);
        setIsResolved(false);
        setSatisfactionScore(100);

        // Playback sequence
        const sequence = async () => {
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

                    // Update Score
                    if (msg.satisfactionImpact !== 0) {
                        currentScore = Math.min(100, Math.max(0, currentScore + msg.satisfactionImpact));
                        setSatisfactionScore(currentScore);
                    }

                }, msg.delay * 1000);
                timeouts.push(timeout);
            }

            // Reset loop
            const resetTimeout = setTimeout(() => {
                setVisibleMessages([]);
                setIsEscalating(false);
                setIsResolved(false);
                setSatisfactionScore(100);
                sequence(); // Loop
            }, 13000);
            timeouts.push(resetTimeout);
        };

        sequence();

        return () => timeouts.forEach(clearTimeout);
    }, []);

    return (
        <section className="py-20 lg:py-24 bg-slate-50 relative overflow-hidden perspective-1000">
            {/* Dynamic Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent opacity-50" />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[10%] right-[5%] w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[80px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.4, 0.3],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-[80px]"
                />

                {/* Circuit Grid Pattern */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
            </div>

            <div className="container max-w-6xl mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left Content */}
                    <div className="flex flex-col gap-8 order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 rounded-full border border-blue-200/50 bg-blue-50/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-blue-600 w-fit shadow-sm"
                        >
                            <Zap size={16} className="fill-blue-600" />
                            <span>Smart Escalation Handling</span>
                        </motion.div>

                        <div className="space-y-4">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight"
                            >
                                When AI hits a wall, <br />
                                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent relative">
                                    Humans Step In.
                                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-indigo-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                    </svg>
                                </span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-xl text-slate-600 leading-relaxed max-w-lg"
                            >
                                Seamlessly transition from AI to human agents when conversations get complex. Zero context loss, 100% customer satisfaction.
                            </motion.p>
                        </div>

                        <motion.ul
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="space-y-4"
                        >
                            {[
                                { text: "Sentiment-triggered escalation", icon: <Sparkles size={18} /> },
                                { text: "Full conversation history transfer", icon: <ArrowRight size={18} /> },
                                { text: "Zero wait-time handoffs", icon: <CheckCircle2 size={18} /> }
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-slate-700 font-medium group">
                                    <div className="h-10 w-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:border-blue-200 group-hover:shadow-blue-100 transition-all duration-300">
                                        <div className="text-blue-600">
                                            {item.icon}
                                        </div>
                                    </div>
                                    {item.text}
                                </li>
                            ))}
                        </motion.ul>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="pt-4"
                        >
                            <Link href="/login">
                                <Button size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-14 text-lg shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300">
                                    Start Building <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Visual - 3D Tilt Card */}
                    <div className="order-1 lg:order-2 perspective-1000 relative">
                        <motion.div
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: "preserve-3d"
                            }}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className="relative bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(50,50,93,0.25),0_30px_60px_-30px_rgba(0,0,0,0.3)] border border-slate-100/50 h-[550px] w-full max-w-[420px] mx-auto flex flex-col overflow-hidden backdrop-blur-xl group z-20"
                        >
                            {/* Shine Effect */}
                            <motion.div
                                style={{ opacity: shineOpacity }}
                                className="absolute inset-0 z-50 pointer-events-none bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                            />

                            {/* Phone Header */}
                            <div className="bg-white/90 backdrop-blur-md border-b border-slate-100 p-5 sticky top-0 z-20 flex items-center justify-between transform-gpu">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <motion.div
                                            animate={{
                                                backgroundColor: isEscalating ? '#fef3c7' : isResolved ? '#dcfce7' : '#eff6ff'
                                            }}
                                            className="h-10 w-10 rounded-xl flex items-center justify-center transition-colors duration-500 shadow-inner overflow-hidden"
                                        >
                                            <AnimatePresence mode="wait">
                                                {isEscalating ? (
                                                    <motion.div key="alert" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 180 }}>
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
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <motion.div key="bot" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 180 }}>
                                                        <Bot size={20} className="text-blue-600" />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                        {isEscalating && (
                                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500 ring-2 ring-white"></span>
                                            </span>
                                        )}
                                        {isResolved && (
                                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 ring-2 ring-white"></span>
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
                                                {isResolved || visibleMessages.includes(5) ? "Sarah (Premium Support)" : "Verly Assistant"}
                                            </motion.h3>
                                        </AnimatePresence>
                                        <div className="text-[10px] font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-wide">
                                            <span className={`w-1.5 h-1.5 rounded-full ${isEscalating ? 'bg-amber-500 animate-pulse' : 'bg-green-500'} shadow-[0_0_8px_rgba(34,197,94,0.6)]`}></span>
                                            {isEscalating ? "Escalating..." : "Active Now"}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Chat Area */}
                            <div ref={chatContainerRef} className="flex-1 p-5 overflow-y-auto bg-slate-50/50 space-y-5 relative scroll-smooth no-scrollbar">

                                {/* Grid overlay for texture */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                                <AnimatePresence initial={false} mode="sync">
                                    {messages.map((msg) => (
                                        visibleMessages.includes(msg.id) && (
                                            <motion.div
                                                key={msg.id}
                                                initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blurAttribute(10px)" }}
                                                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                                                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} relative z-10`}
                                            >
                                                {msg.role === 'system' ? (
                                                    <div className="w-full flex justify-center py-4">
                                                        <motion.div
                                                            initial={{ width: 0, opacity: 0 }}
                                                            animate={{ width: "auto", opacity: 1 }}
                                                            className="bg-slate-900/5 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-3 border border-white/20 shadow-sm"
                                                        >
                                                            <div className="flex gap-1 h-3 items-center">
                                                                <motion.div animate={{ height: [4, 12, 4] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="w-1 bg-amber-500 rounded-full" />
                                                                <motion.div animate={{ height: [4, 12, 4] }} transition={{ duration: 1, repeat: Infinity, delay: 0.1 }} className="w-1 bg-amber-500 rounded-full" />
                                                                <motion.div animate={{ height: [4, 12, 4] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1 bg-amber-500 rounded-full" />
                                                            </div>
                                                            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Escalating to Human Agent</span>
                                                        </motion.div>
                                                    </div>
                                                ) : (
                                                    <div className={`
                                  max-w-[85%] p-4 rounded-2xl text-[14px] leading-relaxed shadow-sm relative group transition-all duration-300
                                  ${msg.role === 'user'
                                                            ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-br-sm shadow-blue-500/20'
                                                            : msg.role === 'agent'
                                                                ? 'bg-white text-slate-800 border-2 border-green-100 rounded-bl-sm shadow-xl shadow-green-500/10'
                                                                : 'bg-white text-slate-700 border border-slate-200/60 rounded-bl-sm shadow-sm'
                                                        }
                               `}>
                                                        {msg.text}
                                                        {msg.role === 'agent' && (
                                                            <div className="absolute -left-2 -top-2 bg-green-500 text-white p-1 rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform duration-300">
                                                                <CheckCircle2 size={10} />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </motion.div>
                                        )
                                    ))}
                                </AnimatePresence>

                                {isEscalating && !visibleMessages.includes(5) && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex items-center gap-1 pl-4"
                                    >
                                        <div className="h-1.5 w-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <div className="h-1.5 w-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <div className="h-1.5 w-1.5 bg-slate-300 rounded-full animate-bounce" />
                                    </motion.div>
                                )}
                                <div className="h-2" /> {/* Spacer */}
                            </div>

                            {/* Input Area (Mock) */}
                            <div className="p-4 bg-white border-t border-slate-100/80 z-20">
                                <div className="h-12 bg-slate-50 border border-slate-200 rounded-full flex items-center px-4 justify-between group focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                                    <span className="text-slate-400 text-sm font-medium">Message...</span>
                                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform cursor-pointer">
                                        <ArrowRight size={16} className="text-white" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Elements (Parallax) */}
                        <motion.div
                            style={{
                                y: useTransform(mouseY, [0, 1], [-15, 15]),
                                x: useTransform(mouseX, [0, 1], [-15, 15]),
                                z: 40
                            }}
                            className="absolute -right-4 top-[15%] bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 hidden lg:block z-30 min-w-[180px]"
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <motion.div
                                        animate={{
                                            background: satisfactionScore < 85 ? "linear-gradient(to top right, #ef4444, #f87171)" : "linear-gradient(to top right, #10b981, #34d399)"
                                        }}
                                        className="h-12 w-12 rounded-full flex items-center justify-center shadow-lg text-white shrink-0 transition-colors duration-500"
                                    >
                                        <AnimatePresence mode="wait">
                                            {satisfactionScore < 85 ? (
                                                <motion.div key="sad" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                                    <ThumbsDown size={20} />
                                                </motion.div>
                                            ) : (
                                                <motion.div key="happy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                                    <CheckCircle2 size={24} />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                                        <motion.div
                                            animate={{ backgroundColor: satisfactionScore < 85 ? "#ef4444" : "#22c55e" }}
                                            className="w-4 h-4 rounded-full border-2 border-white transition-colors duration-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Satisfaction Score</div>
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
                                z: 30
                            }}
                            className="absolute -left-8 bottom-[15%] bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 hidden lg:block z-30 min-w-[170px]"
                        >
                            <div className="flex items-center gap-3">
                                <motion.div
                                    animate={{
                                        backgroundColor: isEscalating ? "#fff7ed" : isResolved ? "#f0fdf4" : "#eff6ff",
                                        borderColor: isEscalating ? "#ffedd5" : isResolved ? "#dcfce7" : "#dbeafe"
                                    }}
                                    className="h-10 w-10 rounded-full border flex items-center justify-center text-blue-600 shrink-0 shadow-sm transition-colors duration-500 overflow-hidden"
                                >
                                    <AnimatePresence mode="wait">
                                        {isEscalating ? (
                                            <motion.div key="activity" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
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
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <motion.div key="bot" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                                <Headphones size={20} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-slate-800 whitespace-nowrap">
                                        {isEscalating ? "System Alert" : isResolved ? "Agent Connected" : "AI Assistant"}
                                    </span>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <span className="relative flex h-2 w-2">
                                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isEscalating ? 'bg-amber-400' : 'bg-green-400'}`}></span>
                                            <span className={`relative inline-flex rounded-full h-2 w-2 ${isEscalating ? 'bg-amber-500' : 'bg-green-500'}`}></span>
                                        </span>
                                        <motion.span
                                            key={isEscalating ? "escalating" : "active"}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-[10px] text-slate-500 font-medium"
                                        >
                                            {isEscalating ? "Escalating..." : "Active Now"}
                                        </motion.span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>

                </div>
            </div>
        </section>
    );
}
