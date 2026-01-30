"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
    MessageCircle,
    MessageSquare,
    Users,
    Zap,
    Megaphone,
    Search,
    Sparkles,
    Smartphone,
} from "lucide-react";

// Tool types with colors and icons for WhatsApp context
const nodes = [
    {
        id: "messages",
        name: "2-Way Chat",
        icon: MessageSquare,
        color: "from-green-500 to-emerald-500",
        bgColor: "bg-green-50 dark:bg-green-900/20",
        borderColor: "border-green-200 dark:border-green-800",
        textColor: "text-green-600 dark:text-green-400",
        position: { top: "15%", left: "15%" },
    },
    {
        id: "automation",
        name: "Auto-Reply",
        icon: Zap,
        color: "from-amber-500 to-yellow-500",
        bgColor: "bg-amber-50 dark:bg-amber-900/20",
        borderColor: "border-amber-200 dark:border-amber-800",
        textColor: "text-amber-600 dark:text-amber-400",
        position: { top: "15%", right: "15%" },
    },
    {
        id: "broadcasts",
        name: "Broadcasts",
        icon: Megaphone,
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        borderColor: "border-blue-200 dark:border-blue-800",
        textColor: "text-blue-600 dark:text-blue-400",
        position: { bottom: "20%", left: "5%" },
    },
    {
        id: "contacts",
        name: "User Data",
        icon: Users,
        color: "from-purple-500 to-violet-500",
        bgColor: "bg-purple-50 dark:bg-purple-900/20",
        borderColor: "border-purple-200 dark:border-purple-800",
        textColor: "text-purple-600 dark:text-purple-400",
        position: { bottom: "20%", right: "5%" },
    },
];

// Animated connection line component
const ConnectionLine = ({ active, delay }: { active: boolean; delay: number }) => (
    <motion.div
        className="absolute w-[2px] bg-gradient-to-b from-slate-200 via-green-500/50 to-slate-200 dark:from-slate-800 dark:via-green-500/50 dark:to-slate-800 opacity-0 transform-origin-center"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: [0, 0.8, 0.8, 0] } : { opacity: 0 }}
        transition={{
            duration: 1.5,
            delay,
            ease: "easeInOut",
        }}
    />
);

// Node component
const NodeItem = ({
    node,
    isActive,
    animationDelay
}: {
    node: typeof nodes[0];
    isActive: boolean;
    animationDelay: number;
}) => {
    const Icon = node.icon;

    return (
        <motion.div
            className={`absolute flex flex-col items-center gap-1.5`}
            style={node.position}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: animationDelay * 0.1, duration: 0.4 }}
        >
            <motion.div
                className={`
                    w-12 h-12 rounded-xl ${node.bgColor} ${node.borderColor} border-2
                    flex items-center justify-center shadow-lg
                    transition-all duration-300
                `}
                animate={isActive ? {
                    scale: [1, 1.15, 1],
                    boxShadow: [
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        "0 10px 25px -5px rgba(34, 197, 94, 0.3)", // Green shadow
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    ],
                } : {
                    scale: 1,
                }}
                transition={{ duration: 0.6 }}
            >
                <Icon className={`w-5 h-5 ${node.textColor}`} />
            </motion.div>
            <span className="text-2xs font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap bg-white/80 dark:bg-slate-900/80 px-2 py-0.5 rounded-full backdrop-blur-sm border border-slate-100 dark:border-slate-800">
                {node.name}
            </span>
        </motion.div>
    );
};

// Central WhatsApp Node
const WhatsAppNode = ({ activeNodeIndex }: { activeNodeIndex: number }) => {
    return (
        <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
        >
            {/* Outer pulsating rings */}
            {[1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full border border-green-500/20 dark:border-green-400/10"
                    style={{ width: `${6 + i * 4}rem`, height: `${6 + i * 4}rem` }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        delay: i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Main node circle */}
            <motion.div
                className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#25D366] via-green-600 to-green-700 shadow-2xl flex items-center justify-center border-4 border-white dark:border-slate-900"
                animate={{
                    boxShadow: [
                        "0 20px 40px -12px rgba(0, 0, 0, 0.25)",
                        "0 20px 40px -12px rgba(37, 211, 102, 0.4)", // WhatsApp Green Glow
                        "0 20px 40px -12px rgba(0, 0, 0, 0.25)",
                    ],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <MessageCircle className="w-12 h-12 text-white fill-white/20" />

                {/* Orbiting Sparkle */}
                <motion.div
                    className="absolute -top-1 -right-1 bg-white dark:bg-slate-800 rounded-full p-1 shadow-md"
                    animate={{
                        y: [-5, 5, -5],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <Smartphone className="w-4 h-4 text-green-600 dark:text-green-400" />
                </motion.div>
            </motion.div>

            <span className="text-sm font-bold text-slate-700 dark:text-slate-200 mt-2 bg-white/90 dark:bg-slate-900/90 px-3 py-1 rounded-full shadow-sm border border-slate-100 dark:border-slate-800">
                WhatsApp Agent
            </span>
        </motion.div>
    );
};

// SVG Connection lines
const WhatsAppConnectionLines = ({ activeIndex }: { activeIndex: number }) => {
    // Curved paths pointing towards center (approx 200, 170 in 400x340 viewbox)
    const lines = [
        { id: 0, d: "M 100 80 Q 150 120 200 170" },   // Top-left
        { id: 1, d: "M 300 80 Q 250 120 200 170" },   // Top-right
        { id: 2, d: "M 60 260 Q 130 220 200 170" },   // Bottom-left
        { id: 3, d: "M 340 260 Q 270 220 200 170" },  // Bottom-right
    ];

    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 340">
            {lines.map((line, idx) => (
                <g key={line.id}>
                    {/* Base line */}
                    <motion.path
                        d={line.d}
                        fill="none"
                        className="stroke-slate-200 dark:stroke-slate-800"
                        strokeWidth="2"
                        strokeDasharray="6 4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.5 }}
                        transition={{ delay: idx * 0.1, duration: 0.8 }}
                    />

                    {/* Active line overlay */}
                    {activeIndex === idx && (
                        <motion.path
                            d={line.d}
                            fill="none"
                            className="stroke-green-400 dark:stroke-green-500"
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

// Main visual component
export const WhatsAppVisual = () => {
    const [activeNodeIndex, setActiveNodeIndex] = useState(-1);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveNodeIndex((prev) => (prev + 1) % nodes.length);
        }, 2500);

        const timeout = setTimeout(() => {
            setActiveNodeIndex(0);
        }, 500);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center p-4">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#22c55e_1px,transparent_1px)]" />
            </div>

            {/* Glowing orb background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/5 rounded-full blur-3xl" />

            {/* Main visualization container */}
            <div className="relative w-full max-w-[400px] h-[340px] z-10">
                <WhatsAppConnectionLines activeIndex={activeNodeIndex} />

                {/* Nodes */}
                {nodes.map((node, idx) => (
                    <NodeItem
                        key={node.id}
                        node={node}
                        isActive={activeNodeIndex === idx}
                        animationDelay={idx}
                    />
                ))}

                {/* Central Chatbot */}
                <WhatsAppNode activeNodeIndex={activeNodeIndex} />
            </div>
        </div>
    );
};

export default WhatsAppVisual;
