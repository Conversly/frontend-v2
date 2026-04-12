"use client";

import { useRef } from "react";

type FullscreenVideoProps = {
  as?: "div" | "section";
  embedded?: boolean;
  className?: string;
  videoClassName?: string;
};

export default function FullscreenVideo({
  as: Component = "section",
  embedded = false,
  className = "",
  videoClassName = "",
}: FullscreenVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleLoadedMetadata() {
    if (videoRef.current) {
      videoRef.current.currentTime = 2;
    }
  }

  function handleEnded() {
    if (videoRef.current) {
      videoRef.current.currentTime = 2;
      videoRef.current.play();
    }
  }

  return (
    <Component
      className={`relative w-full overflow-hidden bg-[#0f172a] ${
        embedded ? "h-full rounded-[24px]" : "min-h-screen"
      } ${className}`.trim()}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        className={`h-full w-full object-cover object-center ${
          embedded ? "" : "min-h-screen"
        } ${videoClassName}`.trim()}
      >
        <source src="/landing-hero.webm" type="video/webm" />
      </video>
    </Component>
  );
}
