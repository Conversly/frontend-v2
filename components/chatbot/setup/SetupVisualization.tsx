"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Check, Loader2, Globe, Palette, Link as LinkIcon, Wand2 } from "lucide-react";

type Stage = "idle" | "crawl" | "logo" | "topics" | "tuning" | "completed";

interface SetupVisualizationProps {
    url: string;
    stage: Stage;
    children?: React.ReactNode;
}

export function SetupVisualization({ url, stage, children }: SetupVisualizationProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Filter out false/null/undefined from conditional JSX children
    const validChildren = React.Children.toArray(children).filter(Boolean);

    // Canvas background effect (reused/adapted from LeftCanvas)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let rafId = 0;
        const dpr = Math.max(1, window.devicePixelRatio || 1);

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            const width = parent.clientWidth;
            const height = parent.clientHeight;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const ro = new ResizeObserver(resize);
        if (canvas.parentElement) {
            ro.observe(canvas.parentElement);
        }
        resize();

        const draw = (now: number) => {
            const width = canvas.width / dpr;
            const height = canvas.height / dpr;
            ctx.clearRect(0, 0, width, height);

            // Static grid dots
            const spacing = 24;
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Light gray dots
            // In dark mode this might need adjustment, but starting with light mode assumption based on images
            // For better dark mode support we could use CSS variables or check theme

            for (let y = spacing / 2; y < height; y += spacing) {
                for (let x = spacing / 2; x < width; x += spacing) {
                    ctx.beginPath();
                    ctx.arc(x, y, 1, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            rafId = requestAnimationFrame(draw);
        };

        rafId = requestAnimationFrame(draw);
        return () => {
            cancelAnimationFrame(rafId);
            ro.disconnect();
        };
    }, []);

    // Helper to determine step status
    const getStepStatus = (stepStage: Stage, currentStage: Stage) => {
        const stages: Stage[] = ["idle", "crawl", "logo", "topics", "tuning", "completed"];
        const stepIndex = stages.indexOf(stepStage);
        const currentIndex = stages.indexOf(currentStage);

        if (currentIndex > stepIndex) return "completed";
        if (currentIndex === stepIndex) return "active";
        return "pending";
    };

    return (
        <div className="relative h-full w-full overflow-hidden bg-slate-50/50">
            {/* Background Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

            {/* Content Container */}
            <div className="relative flex h-full w-full flex-col items-center justify-center p-8">

                {validChildren.length > 0 ? validChildren : (
                    <>
                        {/* Main Card */}
                        <div className="relative w-full max-w-md">
                            {/* Gradient Border Effect */}
                            <div className={cn(
                                "absolute -inset-[2px] rounded-xl bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 opacity-0 transition-opacity duration-500",
                                stage !== "idle" && "opacity-100"
                            )} />

                            <div className="relative overflow-hidden rounded-xl border bg-white shadow-sm">
                                {/* Header / URL Bar */}
                                {stage === "idle" ? (
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 rounded-lg border bg-slate-50 px-3 py-2">
                                            <Globe className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm text-muted-foreground truncate">
                                                {url || "https://your-website.com"}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-6 space-y-4">
                                        <StatusItem
                                            icon={<Globe className="h-4 w-4" />}
                                            label="Fetching links"
                                            status={getStepStatus("crawl", stage)}
                                        />
                                        <StatusItem
                                            icon={<Palette className="h-4 w-4" />}
                                            label="Fetching brand color"
                                            status={getStepStatus("logo", stage)}
                                        />
                                        <StatusItem
                                            icon={<LinkIcon className="h-4 w-4" />}
                                            label="Fetching logo"
                                            status={getStepStatus("topics", stage)}
                                        />
                                        <StatusItem
                                            icon={<Wand2 className="h-4 w-4" />}
                                            label="Adjusting prompt"
                                            status={getStepStatus("tuning", stage)}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>


                    </>
                )}

            </div>
        </div>
    );
}

function StatusItem({ icon, label, status }: { icon: React.ReactNode, label: string, status: "pending" | "active" | "completed" }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm">
                <span className={cn(
                    "text-muted-foreground transition-colors",
                    (status === "active" || status === "completed") && "text-foreground"
                )}>
                    {icon}
                </span>
                <span className={cn(
                    "text-muted-foreground transition-colors",
                    (status === "active" || status === "completed") && "text-foreground font-medium"
                )}>
                    {label}
                </span>
            </div>
            <div>
                {status === "completed" && <Check className="h-4 w-4 text-green-500" />}
                {status === "active" && <Loader2 className="h-4 w-4 animate-spin text-blue-500" />}
            </div>
        </div>
    )
}
