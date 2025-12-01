"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnnouncementBannerProps {
    text: string;
    link?: string;
    emoji?: string;
    enabled?: boolean;
    backgroundColor?: string;
    textColor?: string;
    countdownTarget?: string;
    className?: string;
}

export function AnnouncementBanner({
    text,
    link,
    emoji,
    enabled,
    backgroundColor,
    textColor,
    countdownTarget,
    className
}: AnnouncementBannerProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        if (!countdownTarget) return;

        const calculateTime = () => {
            const diff = +new Date(countdownTarget) - +new Date();
            if (diff > 0) {
                const d = Math.floor(diff / (1000 * 60 * 60 * 24));
                const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const m = Math.floor((diff / 1000 / 60) % 60);
                const s = Math.floor((diff / 1000) % 60);
                setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
            } else {
                setTimeLeft("Expired");
            }
        };

        calculateTime();
        const timer = setInterval(calculateTime, 1000);
        return () => clearInterval(timer);
    }, [countdownTarget]);

    if (!enabled || !isVisible || !text) return null;

    return (
        <div
            className={cn(
                "relative w-full px-4 py-2.5 text-sm font-medium flex flex-wrap items-center justify-center gap-3 transition-all animate-in slide-in-from-top z-50 overflow-hidden",
                className
            )}
            style={{
                backgroundColor: backgroundColor || '#0A0A0A',
                color: textColor || '#ffffff'
            }}
        >
            {/* Top Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

            {/* Subtle Glow Effect */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-1/2 h-20 bg-primary/20 blur-[50px] pointer-events-none" />

            <div className="relative flex items-center gap-2 z-10">
                {emoji && <span className="text-base">{emoji}</span>}
                <span className="tracking-wide">{text}</span>
            </div>

            {countdownTarget && timeLeft && (
                <div className="relative z-10 flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full font-mono text-xs font-bold tracking-wide border border-white/10 shadow-sm">
                    <Timer className="w-3.5 h-3.5 opacity-80" />
                    {timeLeft}
                </div>
            )}

            {link && (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 inline-flex items-center group text-primary-foreground/90 hover:text-white transition-colors"
                >
                    <span className="underline decoration-white/30 underline-offset-4 group-hover:decoration-white/80 transition-all">
                        Check it out
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5" />
                </a>
            )}

            <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 hover:bg-white/10 rounded-full transition-colors"
                style={{ color: textColor || '#ffffff' }}
                onClick={() => setIsVisible(false)}
            >
                <X className="w-3.5 h-3.5" />
            </Button>
        </div>
    );
}
