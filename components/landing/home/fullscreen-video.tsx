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
  return (
    <Component
      className={`relative w-full overflow-hidden bg-[#0f172a] ${
        embedded ? "h-full rounded-[24px]" : "min-h-screen"
      } ${className}`.trim()}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        className={`h-full w-full object-cover object-center ${
          embedded ? "" : "min-h-screen"
        } ${videoClassName}`.trim()}
      >
        <source src="/landing-hero.webm" type="video/webm" />
      </video>
    </Component>
  );
}
