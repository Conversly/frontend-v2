'use client';

import { motion } from 'framer-motion';
import { Globe, FileText, MessageSquare, AlignLeft, Shield, Zap, Lock } from 'lucide-react';

const BackgroundPattern = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center p-6">
        <div className="absolute inset-0 z-0 opacity-40">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-tr from-primary/5 via-background/50 to-blue-500/5"></div>
        <div className="relative z-10 w-full flex flex-col items-center justify-center">
            {children}
        </div>
    </div>
);

export function LiveModeOverlay() {
    const icons = [
        { Icon: Globe, color: 'text-primary/20', size: 80, x: -120, y: -100, delay: 0 },
        { Icon: FileText, color: 'text-blue-500/10', size: 60, x: 140, y: -80, delay: 1 },
        { Icon: MessageSquare, color: 'text-emerald-500/10', size: 70, x: -100, y: 120, delay: 0.5 },
        { Icon: AlignLeft, color: 'text-orange-500/10', size: 50, x: 120, y: 140, delay: 1.5 },
        { Icon: Zap, color: 'text-yellow-500/10', size: 40, x: 0, y: -150, delay: 2 },
    ];

    return (
        <div className="absolute inset-0 z-[100] flex items-center justify-center overflow-hidden">
            {/* Blurred Background */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-background/60 backdrop-blur-[8px]"
            />

            {/* Visual Content */}
            <BackgroundPattern>
                <div className="relative flex flex-col items-center text-center max-w-md px-6">
                    {/* Animated Background Icons */}
                    {icons.map(({ Icon, color, size, x, y, delay }, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: [y, y - 15, y],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                opacity: { duration: 1, delay },
                                scale: { duration: 1, delay },
                                y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" },
                                rotate: { duration: 7 + i, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className={`absolute ${color} z-0 pointer-events-none`}
                            style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                        >
                            <Icon size={size} />
                        </motion.div>
                    ))}

                    {/* Main Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", duration: 0.8 }}
                        className="bg-card border border-border rounded-3xl p-8 shadow-2xl relative z-10"
                    >
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                            <Lock className="w-8 h-8 text-primary animate-pulse" />
                        </div>

                        <h2 className="text-2xl font-heading font-semibold text-foreground mb-3">
                            Live Mode Active
                        </h2>
                        <p className="text-muted-foreground mb-8 leading-relaxed">
                            Knowledge base modifications are disabled in LIVE mode to ensure stability.
                            Please switch to <span className="text-primary font-semibold">DEV mode</span> to add or edit data sources.
                        </p>

                        <div className="p-4 bg-muted/50 rounded-xl flex items-center gap-3 text-left">
                            <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border border-border">
                                <Shield className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div>
                                <div className="text-xs font-semibold text-foreground">Protected State</div>
                                <div className="text-[10px] text-muted-foreground">Changes automatically sync to production in DEV mode.</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bottom Badge */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-8 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium flex items-center gap-2"
                    >
                        <Zap size={12} className="fill-primary" />
                        Visualization Mode
                    </motion.div>
                </div>
            </BackgroundPattern>
        </div>
    );
}
