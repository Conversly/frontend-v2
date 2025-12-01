"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
    targetDate: string;
    title?: string;
    enabled?: boolean;
    className?: string;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export function CountdownTimer({ targetDate, title, enabled, className }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        if (!enabled || !targetDate) return;

        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
                setIsExpired(false);
            } else {
                setIsExpired(true);
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [targetDate, enabled]);

    if (!enabled || isExpired) return null;

    return (
        <div className={cn("flex flex-col items-center justify-center gap-4 py-6", className)}>
            {title && <h3 className="text-lg font-semibold uppercase tracking-widest text-muted-foreground">{title}</h3>}

            <div className="flex items-start gap-4 text-center">
                <TimeBox value={timeLeft.days} label="Days" />
                <Separator />
                <TimeBox value={timeLeft.hours} label="Hours" />
                <Separator />
                <TimeBox value={timeLeft.minutes} label="Mins" />
                <Separator />
                <TimeBox value={timeLeft.seconds} label="Secs" />
            </div>
        </div>
    );
}

function TimeBox({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center">
            <div className="bg-card border shadow-sm rounded-xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-2">
                <span className="text-2xl sm:text-3xl font-bold tabular-nums">
                    {value.toString().padStart(2, '0')}
                </span>
            </div>
            <span className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wide">
                {label}
            </span>
        </div>
    );
}

function Separator() {
    return <div className="text-2xl sm:text-3xl font-bold text-muted-foreground/30 mt-4">:</div>;
}
