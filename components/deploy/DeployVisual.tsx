"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
    Save,
    Send,
    ArrowForward,
    CheckCircle,
    AccessTime,
    Bolt,
    Chat,
    Settings,
    People,
    Public
} from "@mui/icons-material";

const BackgroundPattern = ({ children, className = "" }: { children?: React.ReactNode; className?: string }) => (
    <div className={`w-full h-full relative overflow-hidden flex items-center justify-center p-6 border-l border-border/50 ${className}`}>
        {/* Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-40">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.border)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        {/* Soft Gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-tr from-blue-500/5 via-background/50 to-emerald-500/5"></div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[400px] flex flex-col items-center justify-center">
            {children}
        </div>
    </div>
);

export const DeployVisual = ({ isDeploying = false }: { isDeploying?: boolean }) => {
    const [elements, setElements] = useState<number[]>([]);

    useEffect(() => {
        if (isDeploying) {
            const interval = setInterval(() => {
                setElements(prev => [...prev.slice(-5), Date.now()]);
            }, 800);
            return () => clearInterval(interval);
        } else {
            setElements([]);
        }
    }, [isDeploying]);

    const configItems = [
        { icon: <Chat sx={{ fontSize: 14 }} />, label: "Prompts" },
        { icon: <Settings sx={{ fontSize: 14 }} />, label: "Config" },
        { icon: <Bolt sx={{ fontSize: 14 }} />, label: "Actions" },
        { icon: <Public sx={{ fontSize: 14 }} />, label: "Domains" },
    ];

    return (
        <BackgroundPattern className="h-full min-h-[400px]">
            {/* Floating Elements during deployment */}
            <AnimatePresence>
                {elements.map((id) => (
                    <motion.div
                        key={id}
                        initial={{ x: -150, opacity: 0, scale: 0.5 }}
                        animate={{ x: 150, opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0.5] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="absolute z-20 pointer-events-none"
                    >
                        <div className="bg-blue-500 text-white p-2 rounded-lg shadow-lg">
                            {configItems[id % configItems.length].icon}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            <div className="flex items-center gap-12 relative w-full justify-between">
                {/* DEV ENVIRONMENT */}
                <motion.div
                    className="flex flex-col items-center gap-3"
                    animate={isDeploying ? { opacity: 0.7 } : { opacity: 1 }}
                >
                    <div className="w-24 h-24 bg-card rounded-2xl border-2 border-dashed border-border flex items-center justify-center relative overflow-hidden group">
                        <motion.div
                            className="text-muted-foreground group-hover:text-blue-500 transition-colors"
                            animate={isDeploying ? { rotate: 360 } : {}}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        >
                            <Save sx={{ fontSize: 40 }} />
                        </motion.div>
                        {isDeploying && (
                            <motion.div
                                className="absolute inset-0 bg-blue-500/10"
                                initial={{ height: "0%" }}
                                animate={{ height: "100%" }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        )}
                    </div>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Draft (DEV)</span>
                </motion.div>

                {/* CONNECTION LINE */}
                <div className="flex-1 h-px bg-border relative">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={isDeploying ? { scaleX: 1 } : { scaleX: 0 }}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2">
                        <ArrowForward sx={{ fontSize: 20, color: isDeploying ? "rgb(59 130 246)" : "var(--muted-foreground)" }} />
                    </div>
                </div>

                {/* LIVE ENVIRONMENT */}
                <motion.div
                    className="flex flex-col items-center gap-3"
                    initial={false}
                    animate={isDeploying ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                    transition={{ duration: 1, repeat: Infinity }}
                >
                    <div className="w-24 h-24 bg-emerald-500/10 rounded-2xl border-2 border-emerald-500/20 flex items-center justify-center relative overflow-hidden">
                        <div className="text-emerald-500 relative z-10">
                            {isDeploying ? <AccessTime sx={{ fontSize: 40 }} /> : <Public sx={{ fontSize: 40 }} />}
                        </div>
                        <AnimatePresence>
                            {!isDeploying && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1"
                                >
                                    <CheckCircle sx={{ fontSize: 24, color: "rgb(16 185 129)" }} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Production (LIVE)</span>
                </motion.div>
            </div>

            {/* Status Footer */}
            <div className="mt-12 text-center">
                <AnimatePresence mode="wait">
                    {isDeploying ? (
                        <motion.div
                            key="deploying"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <div className="flex items-center gap-2 text-blue-600 font-medium">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                                </span>
                                Syncing configurations...
                            </div>
                            <p className="text-xs text-muted-foreground max-w-[250px]">
                                Moving your prompts, actions, and widget settings to the production environment.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="idle"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <div className="text-muted-foreground font-medium flex items-center gap-2">
                                <People sx={{ fontSize: 16 }} /> Ready for deployment
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Your changes are safe in draft mode until you choose to go live.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </BackgroundPattern>
    );
};
