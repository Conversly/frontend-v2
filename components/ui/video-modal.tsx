"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, Minimize2, Maximize2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface VideoModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    videoSrc?: string;
}

export function VideoModal({ open, onOpenChange, videoSrc = "https://rle3ob7wdla6y74q.public.blob.vercel-storage.com/landingpage%20images/chatbot-creation-demo.webm" }: VideoModalProps) {
    const [isMinimized, setIsMinimized] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const currentTimeRef = useRef(0);
    const isPlayingRef = useRef(false);

    // Reset minimized state when closed completely via props
    useEffect(() => {
        if (!open) {
            setIsMinimized(false);
            currentTimeRef.current = 0;
            isPlayingRef.current = false;
        }
    }, [open]);

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            currentTimeRef.current = videoRef.current.currentTime;
            isPlayingRef.current = !videoRef.current.paused;
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = currentTimeRef.current;
            if (isPlayingRef.current) {
                videoRef.current.play().catch(() => { });
            }
        }
    };

    // If not open, render nothing
    if (!open) return null;

    // Minimized Floating View (PiP)
    if (isMinimized) {
        return (
            <div className="fixed bottom-6 left-6 z-50 w-[24rem] sm:w-[32rem] rounded-xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800 bg-black animate-in slide-in-from-bottom-4 fade-in duration-300 group">
                <div className="relative aspect-video bg-black">
                    {/* Controls Overlay */}
                    <div className="absolute top-2 right-2 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white border-none backdrop-blur-md"
                            onClick={() => setIsMinimized(false)}
                            title="Maximize"
                        >
                            <Maximize2 className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white border-none backdrop-blur-md"
                            onClick={() => onOpenChange(false)}
                            title="Close"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        autoPlay
                        controls={true}
                        playsInline
                        src={videoSrc}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                    />
                </div>
            </div>
        );
    }

    // Maximized Modal View
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-w-[95vw] md:max-w-screen-2xl p-0 overflow-hidden border-none bg-black/90 sm:rounded-2xl"
                aria-describedby={undefined}
                // Intercept interaction outside (clicking backdrop)
                onInteractOutside={(e) => {
                    e.preventDefault(); // Prevent closing
                    setIsMinimized(true); // Minimize instead
                }}
                showCloseButton={false} // Hide default close button to prevent confusion, we add our own custom controls
            >
                <DialogTitle className="sr-only">Demo Video</DialogTitle>
                <div className="relative aspect-video w-full group">
                    {/* Custom Controls Overlay */}
                    <div className="absolute top-4 right-4 z-50 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button
                            variant="secondary"
                            size="icon"
                            className="h-9 w-9 rounded-full bg-black/50 hover:bg-black/70 text-white border-none backdrop-blur-md"
                            onClick={() => setIsMinimized(true)}
                            title="Minimize"
                        >
                            <Minimize2 className="h-4.5 w-4.5" />
                        </Button>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="h-9 w-9 rounded-full bg-black/50 hover:bg-black/70 text-white border-none backdrop-blur-md"
                            onClick={() => onOpenChange(false)}
                            title="Close"
                        >
                            <X className="h-4.5 w-4.5" />
                        </Button>
                    </div>

                    <video
                        ref={videoRef}
                        className="w-full h-full object-contain"
                        controls
                        autoPlay
                        playsInline
                        src={videoSrc}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
