import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useRef } from "react";

type SocialType = "twitter" | "linkedin" | "quote";

interface Testimonial {
  image: string;
  name: string;
  handle?: string;
  role?: string;
  company?: string;
  text: string;
  size?: "sm" | "md" | "lg";
  social: SocialType;
  link?: string;
}

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={cn("w-4 h-4", className)} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={cn("w-4 h-4", className)} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const testimonials: Testimonial[] = [
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    name: "Walker Ward",
    role: "Principal Software Engineer",
    company: "Podium",
    text: "Reliability and accelerating time to production often seem at odds, but with VerlyAI's Agent Platform, we achieved both! Its ease of use and production-ready infrastructure allowed us to deploy our voice agents with confidence.",
    size: "lg",
    social: "linkedin",
  },
  {
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    name: "Alex Cohen",
    handle: "@anothercohen",
    text: "LFG. VerlyAI is goated 🔥",
    size: "sm",
    social: "twitter",
    link: "https://twitter.com/anothercohen",
  },
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    name: "Mojibola Olalekan",
    handle: "@Ola_dev01",
    text: "VerlyAI has a lot to offer. One of the best platforms out there for real-time AI integrations and communication systems.",
    size: "md",
    social: "twitter",
    link: "https://twitter.com/Ola_dev01",
  },
  {
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
    name: "Zexia Zhang",
    role: "CTO",
    company: "Retell AI",
    text: "We recently moved from a homegrown WebSocket stack to VerlyAI Cloud, allowing us to flexibly integrate with telephony systems. This upgrade lets us deliver low latency calls to a global end-user base.",
    size: "lg",
    social: "linkedin",
  },
  {
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
    name: "Guillermo Rauch",
    handle: "@rauchg",
    text: "Infrastructure for realtime voice assistants. The demo is 🔥",
    size: "sm",
    social: "twitter",
    link: "https://twitter.com/rauchg",
  },
  {
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    name: "Ivan Leo",
    handle: "@ivanleomk",
    text: "damn @verlyai python sdk for tts and stt was so smooth",
    size: "sm",
    social: "twitter",
    link: "https://twitter.com/ivanleomk",
  },
  {
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face",
    name: "Ari Borensztein",
    role: "Co-founder & CTO",
    company: "Playback",
    text: "Not having to worry about our ability to scale has been massive. We just have VerlyAI worry about that scaling for us and have a predictable cost.",
    size: "md",
    social: "linkedin",
  },
  {
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    name: "Lily Clifford",
    handle: "@lilyjclifford",
    text: "In the midst of our huge launch, the @verlyai team jumped in, shipped new code, and shaved meaningful latency off our live chat demo. This team is cracked. 🚀",
    size: "md",
    social: "twitter",
    link: "https://twitter.com/lilyjclifford",
  },
  {
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    name: "Jeffery Liu",
    role: "Founder & Co-CEO",
    company: "Assort Health",
    text: "VerlyAI enables us to very granularly fine-tune our agent code for every workflow and use any model provider. No other platform gives us this level of control.",
    size: "lg",
    social: "linkedin",
  },
  {
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    name: "Amir Ranjbar",
    handle: "@arro_sh",
    text: "I'm making my first voice AI agent with @verlyai - makes it 10x easier. I've tried a few no-code tools, but they don't have the flexibility and reliability of code.",
    size: "md",
    social: "twitter",
    link: "https://twitter.com/arro_sh",
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    name: "Andrew Ng",
    handle: "@AndrewYNg",
    text: "Learn to build conversational AI voice agents in 'Building AI Voice Agents for Production', created in collaboration with @verlyai 🎓",
    size: "lg",
    social: "twitter",
    link: "https://twitter.com/AndrewYNg",
  },
  {
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    name: "Alex Looney",
    role: "Staff ML Engineer",
    company: "Spara",
    text: "Voice AI is at the heart of Spara's platform. Agents on VerlyAI Cloud gives us effortless deployments and rock-solid hosting, enabling us to launch rapidly and iterate quickly.",
    size: "lg",
    social: "linkedin",
  },
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    name: "jtgi",
    handle: "@jtgi",
    text: "This is great 'end of turn' detection by @verlyai. Going to see if I can get this running client-side in a browser today.",
    size: "sm",
    social: "twitter",
    link: "https://twitter.com/jtgi",
  },
  {
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
    name: "Ilia Baranov",
    role: "Co-Founder & CTO",
    company: "Polymath",
    text: "Low-latency video streaming is existential for any robotics company. We just couldn't have continued to build our platform if we didn't have VerlyAI.",
    size: "md",
    social: "linkedin",
  },
];

const TestimonialCard = ({ testimonial, className }: { testimonial: Testimonial; className?: string }) => {
  const sizeClasses = {
    sm: "w-[220px] p-4",
    md: "w-[280px] p-5",
    lg: "w-[340px] p-6",
  };

  const isTwitter = testimonial.social === "twitter";
  const isLinkedIn = testimonial.social === "linkedin";


  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => { setIsFocused(true); };
  const handleBlur = () => { setIsFocused(false); };
  const handleMouseEnter = () => { setIsFocused(true); };
  const handleMouseLeave = () => { setIsFocused(false); };

  return (
    <Card
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "flex-shrink-0 bg-card border border-border/50 transition-all duration-300 relative group overflow-hidden",
        "hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 hover:shadow-primary/5",
        sizeClasses[testimonial.size || "md"],
        className
      )}
    >
      {/* Spotlight Overlay */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, color-mix(in srgb, var(--foreground), transparent 90%), transparent 40%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header: Author & Social Icon */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className={cn(
                "rounded-full object-cover ring-2 ring-border/30",
                testimonial.size === "sm" ? "w-8 h-8" : testimonial.size === "lg" ? "w-11 h-11" : "w-9 h-9"
              )}
            />
            <div className="min-w-0">
              <p className={cn(
                "font-semibold text-foreground truncate",
                testimonial.size === "sm" ? "text-xs" : "text-sm"
              )}>
                {testimonial.name}
              </p>
              {isTwitter && testimonial.handle && (
                <p className="text-xs text-muted-foreground truncate">
                  {testimonial.handle}
                </p>
              )}
              {isLinkedIn && (
                <p className="text-xs text-muted-foreground truncate">
                  {testimonial.role}{testimonial.company && `, ${testimonial.company}`}
                </p>
              )}
            </div>
          </div>

          <div className="shrink-0 text-muted-foreground/60 mt-1">
            {isTwitter && <TwitterIcon className="w-4 h-4" />}
            {isLinkedIn && <LinkedInIcon className="w-4 h-4" />}
          </div>
        </div>

        {/* Content */}
        <p className={cn(
          "text-foreground leading-relaxed",
          testimonial.size === "sm" ? "text-xs" : testimonial.size === "lg" ? "text-sm" : "text-[13px]"
        )}>
          {testimonial.text}
        </p>
      </div>   {/* Click overlay for social links */}
      {testimonial.link && (
        <a
          href={testimonial.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 cursor-pointer"
          aria-label={`View ${testimonial.name}'s post`}
        />
      )}

    </Card >
  );
};

const TestimonialsSection = () => {
  // Split into two rows with staggered positions
  const row1 = testimonials.filter((_, i) => i % 2 === 0);
  const row2 = testimonials.filter((_, i) => i % 2 === 1);

  // Duplicate exactly once for seamless 50% loop
  const duplicatedRow1 = [...row1, ...row1];
  const duplicatedRow2 = [...row2, ...row2];

  return (
    <section className="py-16 md:py-20 bg-background overflow-hidden">
      <div className="container max-w-5xl mx-auto px-4 mb-10">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            What people are saying
          </h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            See what developers and teams have to say about us.
          </p>
        </div>
      </div>

      {/* Marquee Rows */}
      <div className="space-y-4 relative">
        {/* Row 1 - flows left */}
        <div className="relative">
          <div className="flex gap-4 animate-marquee-left hover:[animation-play-state:paused]">
            {duplicatedRow1.map((testimonial, index) => (
              <TestimonialCard
                key={`row1-${index}`}
                testimonial={testimonial}
                className={cn(
                  index % 4 === 0 && "mt-4",
                  index % 4 === 1 && "-mt-2",
                  index % 4 === 2 && "mt-8",
                  index % 4 === 3 && "mt-1"
                )}
              />
            ))}
          </div>
        </div>

        {/* Row 2 - flows left slower */}
        <div className="relative">
          <div className="flex gap-4 animate-marquee-left-slow hover:[animation-play-state:paused]">
            {duplicatedRow2.map((testimonial, index) => (
              <TestimonialCard
                key={`row2-${index}`}
                testimonial={testimonial}
                className={cn(
                  index % 4 === 0 && "-mt-3",
                  index % 4 === 1 && "mt-6",
                  index % 4 === 2 && "mt-2",
                  index % 4 === 3 && "-mt-1"
                )}
              />
            ))}
          </div>
        </div>

        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      </div>
    </section>
  );
};

export default TestimonialsSection;
