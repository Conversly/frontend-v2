"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    quote: "We replaced our legacy IVR with Verly's Voice Agents in less than a week. The latency is practically non-existent—customers don't even realize they're talking to an AI.",
    name: "Sarah Mitchell",
    title: "VP of Engineering, FinanceFlow",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    company: "FinanceFlow"
  },
  {
    id: 2,
    quote: "Finally, a support platform built for developers. The SDKs are type-safe, the docs are clear, and we verified our entire WhatsApp automation flow locally before deploying.",
    name: "David Chen",
    title: "CTO, DevScale",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop",
    company: "DevScale"
  },
  {
    id: 3,
    quote: "We needed an agent that could handle complex order modifications on both web and phone. Verly's function calling capability made connecting to our backend API trivial.",
    name: "Elena Rodriguez",
    title: "Product Lead, ShopEase",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=600&fit=crop",
    company: "ShopEase"
  }
];

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="py-10 lg:py-14">
      <div
        className="relative bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-slate-100 dark:border-slate-800"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex flex-col lg:flex-row min-h-[400px] lg:min-h-[360px]">
          {/* Image - Left side */}
          <div className="relative w-full lg:w-[40%] aspect-[4/3] lg:aspect-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[currentIndex].id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Content - Right side */}
          <div className="flex-1 p-6 md:p-10 lg:p-12 flex flex-col justify-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[currentIndex].id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col"
              >
                {/* Company logos */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                    Verly
                  </span>
                  <span className="text-muted-foreground/60 text-xl font-light">×</span>
                  <span className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                    {testimonials[currentIndex].company}
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="text-sm md:text-lg text-foreground font-medium leading-relaxed mb-6">
                  &ldquo;{testimonials[currentIndex].quote}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div>
                  <p className="text-base md:text-lg">
                    <span className="font-semibold text-foreground">{testimonials[currentIndex].name}</span>
                    <br />
                    <span className="text-muted-foreground">{testimonials[currentIndex].title}</span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="flex gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600"
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
