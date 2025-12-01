"use client";

import React from "react";
import { MediaItem } from "@/types/promote";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

interface ProductMediaCarouselProps {
    media: MediaItem[];
}

export function ProductMediaCarousel({ media }: ProductMediaCarouselProps) {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const handleNext = React.useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % media.length);
    }, [media.length]);

    // Handle image autoplay
    React.useEffect(() => {
        if (!media || !media[activeIndex]) return;

        if (media[activeIndex].type === 'video') return;

        const interval = setInterval(handleNext, 5000); // 5s for images
        return () => clearInterval(interval);
    }, [activeIndex, media, handleNext]);

    const handleVideoEnded = () => {
        setIsPlaying(false);
        // Wait 2 seconds before sliding to next
        timeoutRef.current = setTimeout(() => {
            handleNext();
        }, 2000);
    };

    const handleVideoPlay = () => {
        setIsPlaying(true);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    if (!media || media.length === 0) return null;
    const activeItem = media[activeIndex];
    if (!activeItem) return null;

    return (
        <div className="space-y-4">
            {/* Main View */}
            <div className="aspect-video w-full bg-black rounded-xl overflow-hidden relative group">
                {activeItem.type === "video" ? (
                    <video
                        ref={videoRef}
                        src={activeItem.url}
                        controls
                        autoPlay
                        className="w-full h-full object-contain"
                        poster={activeItem.thumbnailUrl}
                        onEnded={handleVideoEnded}
                        onPlay={handleVideoPlay}
                        onPause={() => setIsPlaying(false)}
                    />
                ) : (
                    <img
                        src={activeItem.url}
                        alt={activeItem.alt || "Product screenshot"}
                        className="w-full h-full object-contain"
                    />
                )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {media.map((item, index) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveIndex(index)}
                        className={cn(
                            "relative w-24 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all",
                            activeIndex === index
                                ? "border-primary ring-2 ring-primary/20"
                                : "border-transparent opacity-70 hover:opacity-100"
                        )}
                    >
                        <img
                            src={item.type === "video" ? item.thumbnailUrl : item.url}
                            alt="Thumbnail"
                            className="w-full h-full object-cover"
                        />
                        {item.type === "video" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <Play className="w-4 h-4 text-white fill-white" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
