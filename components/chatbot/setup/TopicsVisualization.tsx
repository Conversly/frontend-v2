"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
    MessageSquare,
    Tag,
    BarChart3,
    PieChart,
    ThumbsUp,
    ThumbsDown,
    Sparkles,
    TrendingUp,
    Zap,
    Bot,
} from "lucide-react";

// Background pattern component matching BroadcastVisuals style
const BackgroundPattern = ({ children }: { children?: React.ReactNode }) => (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center p-6">
        {/* Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-40">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        {/* Soft Gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-tr from-violet-500/5 via-slate-50/50 to-emerald-500/5"></div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[360px] flex flex-col items-center justify-center">
            {children}
        </div>
    </div>
);

// Sample incoming messages
const incomingMessages = [
    { id: 1, text: "What's your pricing?", topic: "Pricing", color: "#8B5CF6" },
    { id: 2, text: "How do I integrate the API?", topic: "Integration", color: "#10B981" },
    { id: 3, text: "Do you have voice agents?", topic: "Voice Agents", color: "#F59E0B" },
    { id: 4, text: "What data sources work?", topic: "Data Sources", color: "#3B82F6" },
];

// Analytics data for the dashboard
const analyticsData = [
    { topic: "Pricing", count: 342, color: "#8B5CF6", percentage: 35 },
    { topic: "Integration", count: 256, color: "#10B981", percentage: 26 },
    { topic: "Voice Agents", count: 189, color: "#F59E0B", percentage: 19 },
    { topic: "Data Sources", count: 198, color: "#3B82F6", percentage: 20 },
];

export const TopicsVisualization = () => {
    const [stage, setStage] = useState(0); // 0: messages, 1: tagging, 2: analytics
    const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
    const [taggedMessages, setTaggedMessages] = useState<number[]>([]);
    const [showAnalytics, setShowAnalytics] = useState(false);

    useEffect(() => {
        const runSequence = async () => {
            while (true) {
                // Reset
                setStage(0);
                setVisibleMessages([]);
                setTaggedMessages([]);
                setShowAnalytics(false);

                // Stage 1: Show messages one by one
                for (let i = 0; i < incomingMessages.length; i++) {
                    await new Promise((r) => setTimeout(r, 600));
                    setVisibleMessages((prev) => [...prev, incomingMessages[i].id]);
                }

                await new Promise((r) => setTimeout(r, 800));

                // Stage 2: Tag messages one by one
                setStage(1);
                for (let i = 0; i < incomingMessages.length; i++) {
                    await new Promise((r) => setTimeout(r, 500));
                    setTaggedMessages((prev) => [...prev, incomingMessages[i].id]);
                }

                await new Promise((r) => setTimeout(r, 1000));

                // Stage 3: Show analytics
                setStage(2);
                setShowAnalytics(true);

                await new Promise((r) => setTimeout(r, 5000));
            }
        };

        runSequence();
    }, []);

    return (
        <BackgroundPattern>
            {/* Floating Decorative Elements */}
            <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 -left-8 text-violet-500/10 z-0"
            >
                <Tag size={72} />
            </motion.div>
            <motion.div
                animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/3 -right-12 text-emerald-500/10 z-0"
            >
                <BarChart3 size={64} />
            </motion.div>
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-12 -left-6 text-blue-500/10 z-0"
            >
                <Sparkles size={48} />
            </motion.div>

            {/* Main Card */}
            <div className="relative w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
                        <Bot size={20} />
                    </div>
                    <div className="flex-1">
                        <div className="text-white text-sm font-semibold">AI Topic Classification</div>
                        <div className="text-white/70 text-xs">Auto-tagging incoming questions</div>
                    </div>
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-emerald-400"
                    />
                </div>

                {/* Content Area */}
                <div className="p-4 min-h-[340px] relative">
                    <AnimatePresence mode="wait">
                        {/* Stage 0 & 1: Messages with Tags */}
                        {stage < 2 && (
                            <motion.div
                                key="messages"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-3"
                            >
                                {/* Stage Label */}
                                <motion.div
                                    className="flex items-center gap-2 mb-4"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
                                        <MessageSquare size={14} className="text-slate-500" />
                                        <span className="text-xs font-medium text-slate-600">
                                            {stage === 0 ? "Incoming Questions" : "Classifying..."}
                                        </span>
                                    </div>
                                    {stage === 1 && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="flex items-center gap-1 px-2 py-1 bg-violet-100 rounded-full"
                                        >
                                            <Zap size={12} className="text-violet-600" />
                                            <span className="text-2xs font-medium text-violet-600">AI</span>
                                        </motion.div>
                                    )}
                                </motion.div>

                                {/* Messages */}
                                {incomingMessages.map((msg, index) => (
                                    <AnimatePresence key={msg.id}>
                                        {visibleMessages.includes(msg.id) && (
                                            <motion.div
                                                initial={{ opacity: 0, x: -30, scale: 0.9 }}
                                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                                className="flex items-center gap-3"
                                            >
                                                {/* Message Bubble */}
                                                <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl rounded-bl-sm p-3 shadow-sm">
                                                    <div className="flex items-start gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-2xs font-medium text-slate-600 shrink-0">
                                                            U
                                                        </div>
                                                        <p className="text-sm text-slate-700 leading-snug">{msg.text}</p>
                                                    </div>
                                                </div>

                                                {/* Topic Tag */}
                                                <AnimatePresence>
                                                    {taggedMessages.includes(msg.id) && (
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0, x: -20 }}
                                                            animate={{ opacity: 1, scale: 1, x: 0 }}
                                                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                                            className="shrink-0"
                                                        >
                                                            <div
                                                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg shadow-sm border"
                                                                style={{
                                                                    backgroundColor: `${msg.color}15`,
                                                                    borderColor: `${msg.color}30`,
                                                                }}
                                                            >
                                                                <Tag size={12} style={{ color: msg.color }} />
                                                                <span
                                                                    className="text-xs font-semibold"
                                                                    style={{ color: msg.color }}
                                                                >
                                                                    {msg.topic}
                                                                </span>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                ))}
                            </motion.div>
                        )}

                        {/* Stage 2: Analytics Dashboard */}
                        {stage === 2 && showAnalytics && (
                            <motion.div
                                key="analytics"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-4"
                            >
                                {/* Analytics Header */}
                                <motion.div
                                    className="flex items-center justify-between"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
                                        <BarChart3 size={14} className="text-emerald-600" />
                                        <span className="text-xs font-medium text-emerald-700">Topic Analytics</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-2xs text-slate-400">
                                        <TrendingUp size={12} className="text-emerald-500" />
                                        <span>Live insights</span>
                                    </div>
                                </motion.div>

                                {/* Stats Cards Row */}
                                <div className="grid grid-cols-2 gap-3">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-3 border border-violet-100"
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <PieChart size={14} className="text-violet-600" />
                                            <span className="text-2xs font-medium text-violet-600">Total Questions</span>
                                        </div>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-2xl font-bold text-violet-700"
                                        >
                                            985
                                        </motion.div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-3 border border-emerald-100"
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <Tag size={14} className="text-emerald-600" />
                                            <span className="text-2xs font-medium text-emerald-600">Topics Tagged</span>
                                        </div>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-2xl font-bold text-emerald-700"
                                        >
                                            4
                                        </motion.div>
                                    </motion.div>
                                </div>

                                {/* Topic Distribution */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="bg-slate-50 rounded-xl p-4 border border-slate-100"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-semibold text-slate-700">Topic Distribution</span>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                <ThumbsUp size={10} className="text-emerald-500" />
                                                <span className="text-2xs text-emerald-600">89%</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <ThumbsDown size={10} className="text-red-400" />
                                                <span className="text-2xs text-red-500">11%</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bar Chart */}
                                    <div className="space-y-2.5">
                                        {analyticsData.map((item, index) => (
                                            <motion.div
                                                key={item.topic}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.5 + index * 0.1 }}
                                                className="flex items-center gap-3"
                                            >
                                                <div className="w-20 text-2xs font-medium text-slate-600 truncate">
                                                    {item.topic}
                                                </div>
                                                <div className="flex-1 h-4 bg-slate-200 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${item.percentage}%` }}
                                                        transition={{ delay: 0.6 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                                                        className="h-full rounded-full"
                                                        style={{ backgroundColor: item.color }}
                                                    />
                                                </div>
                                                <div className="w-8 text-2xs font-semibold text-slate-600 text-right">
                                                    {item.count}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Insight Badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1 }}
                                    className="flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-violet-500/10 to-emerald-500/10 rounded-lg border border-violet-100"
                                >
                                    <Sparkles size={14} className="text-violet-500" />
                                    <span className="text-xs text-slate-600">
                                        <span className="font-semibold text-violet-600">Pricing</span> is your most asked topic
                                    </span>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </BackgroundPattern>
    );
};

export default TopicsVisualization;
