"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
    Bot,
    Database,
    Globe,
    FileText,
    CreditCard,
    Mail,
    Calendar,
    ShoppingCart,
    Zap,
    ArrowRight,
    Sparkles,
} from "lucide-react";

// Tool types with colors and icons
const tools = [
    {
        id: "api",
        name: "REST APIs",
        icon: Globe,
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        textColor: "text-blue-600",
        position: { top: "8%", left: "10%" },
    },
    {
        id: "database",
        name: "Database",
        icon: Database,
        color: "from-emerald-500 to-green-500",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-200",
        textColor: "text-emerald-600",
        position: { top: "8%", right: "10%" },
    },
    {
        id: "payment",
        name: "Payments",
        icon: CreditCard,
        color: "from-purple-500 to-pink-500",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        textColor: "text-purple-600",
        position: { top: "35%", left: "0%" },
    },
    {
        id: "email",
        name: "Email",
        icon: Mail,
        color: "from-orange-500 to-red-500",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        textColor: "text-orange-600",
        position: { top: "35%", right: "0%" },
    },
    {
        id: "calendar",
        name: "Calendar",
        icon: Calendar,
        color: "from-teal-500 to-cyan-500",
        bgColor: "bg-teal-50",
        borderColor: "border-teal-200",
        textColor: "text-teal-600",
        position: { bottom: "12%", left: "10%" },
    },
    {
        id: "commerce",
        name: "E-commerce",
        icon: ShoppingCart,
        color: "from-amber-500 to-yellow-500",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
        textColor: "text-amber-600",
        position: { bottom: "12%", right: "10%" },
    },
];

// Animated connection line component
const ConnectionLine = ({ active, delay }: { active: boolean; delay: number }) => (
    <motion.div
        className="absolute w-[2px] bg-gradient-to-b from-slate-200 via-blue-400 to-slate-200 opacity-0"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: [0, 1, 1, 0] } : { opacity: 0 }}
        transition={{
            duration: 1.5,
            delay,
            ease: "easeInOut",
        }}
    />
);

// Data pulse component that travels along the connection
const DataPulse = ({ active, delay, startPos, endPos }: {
    active: boolean;
    delay: number;
    startPos: { x: number; y: number };
    endPos: { x: number; y: number };
}) => (
    <motion.div
        className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg shadow-blue-400/50"
        initial={{
            x: startPos.x,
            y: startPos.y,
            opacity: 0,
            scale: 0
        }}
        animate={active ? {
            x: [startPos.x, endPos.x],
            y: [startPos.y, endPos.y],
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
        } : {
            opacity: 0,
            scale: 0,
        }}
        transition={{
            duration: 1.2,
            delay,
            ease: "easeInOut",
        }}
    />
);

// Tool node component
const ToolNode = ({
    tool,
    isActive,
    animationDelay
}: {
    tool: typeof tools[0];
    isActive: boolean;
    animationDelay: number;
}) => {
    const Icon = tool.icon;

    return (
        <motion.div
            className={`absolute flex flex-col items-center gap-1.5`}
            style={tool.position}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: animationDelay * 0.1, duration: 0.4 }}
        >
            <motion.div
                className={`
                    w-12 h-12 rounded-xl ${tool.bgColor} ${tool.borderColor} border-2
                    flex items-center justify-center shadow-lg
                    transition-all duration-300
                `}
                animate={isActive ? {
                    scale: [1, 1.15, 1],
                    boxShadow: [
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    ],
                } : {
                    scale: 1,
                }}
                transition={{ duration: 0.6 }}
            >
                <Icon className={`w-5 h-5 ${tool.textColor}`} />
            </motion.div>
            <span className="text-[10px] font-medium text-slate-600 whitespace-nowrap">
                {tool.name}
            </span>

            {/* Active indicator */}
            {isActive && (
                <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.3 }}
                />
            )}
        </motion.div>
    );
};

// Central chatbot node
const ChatbotNode = ({ activeToolIndex }: { activeToolIndex: number }) => {
    return (
        <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
        >
            {/* Outer glow ring */}
            <motion.div
                className="absolute w-28 h-28 rounded-full bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-cyan-400/20"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Main chatbot circle */}
            <motion.div
                className="relative w-20 h-20 rounded-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 shadow-2xl flex items-center justify-center border-4 border-white"
                animate={{
                    boxShadow: [
                        "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                        "0 25px 50px -12px rgba(59, 130, 246, 0.35)",
                        "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    ],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <Bot className="w-9 h-9 text-white" />

                {/* Sparkle animation */}
                <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{
                        rotate: [0, 180, 360],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                </motion.div>
            </motion.div>

            <span className="text-xs font-semibold text-slate-700 mt-1">AI Chatbot</span>
        </motion.div>
    );
};

// SVG Connection lines
const ConnectionLines = ({ activeIndex }: { activeIndex: number }) => {
    const lines = [
        { id: 0, d: "M 150 70 Q 120 120 150 150" },  // Top-left to center
        { id: 1, d: "M 250 70 Q 280 120 250 150" },  // Top-right to center
        { id: 2, d: "M 80 150 Q 110 150 150 170" },   // Left to center
        { id: 3, d: "M 320 150 Q 290 150 250 170" },  // Right to center
        { id: 4, d: "M 150 280 Q 120 230 150 200" },  // Bottom-left to center
        { id: 5, d: "M 250 280 Q 280 230 250 200" },  // Bottom-right to center
    ];

    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 340">
            <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e2e8f0" />
                    <stop offset="50%" stopColor="#94a3b8" />
                    <stop offset="100%" stopColor="#e2e8f0" />
                </linearGradient>
                <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
            </defs>

            {lines.map((line, idx) => (
                <g key={line.id}>
                    {/* Base line */}
                    <motion.path
                        d={line.d}
                        fill="none"
                        stroke="url(#lineGradient)"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.6 }}
                        transition={{ delay: idx * 0.1, duration: 0.8 }}
                    />

                    {/* Active line overlay */}
                    {activeIndex === idx && (
                        <motion.path
                            d={line.d}
                            fill="none"
                            stroke="url(#activeGradient)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: [0, 1] }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                    )}
                </g>
            ))}
        </svg>
    );
};

// Floating data packets animation
const FloatingPackets = ({ activeIndex }: { activeIndex: number }) => {
    const packets = [
        { startX: 65, startY: 55, endX: 170, endY: 145 },   // Top-left
        { startX: 290, startY: 55, endX: 215, endY: 145 },   // Top-right
        { startX: 45, startY: 145, endX: 165, endY: 165 },   // Left
        { startX: 340, startY: 145, endX: 220, endY: 165 },  // Right
        { startX: 65, startY: 265, endX: 170, endY: 195 },   // Bottom-left
        { startX: 290, startY: 265, endX: 215, endY: 195 },  // Bottom-right
    ];

    return (
        <div className="absolute inset-0 pointer-events-none">
            {packets.map((packet, idx) => (
                <motion.div
                    key={idx}
                    className={`absolute w-2.5 h-2.5 rounded-full ${activeIndex === idx
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50"
                            : "bg-transparent"
                        }`}
                    initial={{ x: packet.startX, y: packet.startY, opacity: 0, scale: 0 }}
                    animate={activeIndex === idx ? {
                        x: [packet.startX, packet.endX],
                        y: [packet.startY, packet.endY],
                        opacity: [0, 1, 1, 0],
                        scale: [0.5, 1, 1, 0.5],
                    } : {
                        opacity: 0,
                        scale: 0,
                    }}
                    transition={{
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};

// Action info popup
const ActionPopup = ({ tool, visible }: { tool: typeof tools[0]; visible: boolean }) => {
    const Icon = tool.icon;

    return (
        <motion.div
            className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-2xl border border-slate-200 p-3 z-20"
            initial={{ y: 20, opacity: 0 }}
            animate={visible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-md`}>
                    <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-800">Calling {tool.name}</span>
                        <motion.div
                            className="flex gap-0.5"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <div className="w-1 h-1 rounded-full bg-blue-500" />
                            <div className="w-1 h-1 rounded-full bg-blue-500" />
                            <div className="w-1 h-1 rounded-full bg-blue-500" />
                        </motion.div>
                    </div>
                    <span className="text-xs text-slate-500">Fetching data for your conversation</span>
                </div>
                <Zap className="w-4 h-4 text-amber-500" />
            </div>
        </motion.div>
    );
};

// Main visual component
export const ActionsVisual = () => {
    const [activeToolIndex, setActiveToolIndex] = useState(-1);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveToolIndex((prev) => (prev + 1) % tools.length);
        }, 2000);

        // Start first animation after a short delay
        const timeout = setTimeout(() => {
            setActiveToolIndex(0);
        }, 500);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
            {/* Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]" />
            </div>

            {/* Soft radial gradient */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent" />

            {/* Floating decorative elements */}
            <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 right-8 text-blue-500/10 z-0"
            >
                <Globe size={60} />
            </motion.div>
            <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-8 left-4 text-emerald-500/10 z-0"
            >
                <Database size={50} />
            </motion.div>

            {/* Main visualization container */}
            <div className="relative w-full max-w-[400px] h-[340px] z-10">
                {/* Connection lines SVG */}
                <ConnectionLines activeIndex={activeToolIndex} />

                {/* Floating data packets */}
                <FloatingPackets activeIndex={activeToolIndex} />

                {/* Tool nodes */}
                {tools.map((tool, idx) => (
                    <ToolNode
                        key={tool.id}
                        tool={tool}
                        isActive={activeToolIndex === idx}
                        animationDelay={idx}
                    />
                ))}

                {/* Central chatbot */}
                <ChatbotNode activeToolIndex={activeToolIndex} />

                {/* Action popup */}
                {activeToolIndex >= 0 && (
                    <ActionPopup
                        tool={tools[activeToolIndex]}
                        visible={true}
                    />
                )}
            </div>
        </div>
    );
};

export default ActionsVisual;
