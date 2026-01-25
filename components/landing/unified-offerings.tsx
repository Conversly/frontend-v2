"use client";

import { useState } from "react";
import {
  MessageCircle,
  MessageSquare,
  Mic,
  Settings,
  GitCompare,
  ArrowUpRight,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";


import VoiceAgentModal from "./cards/VoiceAgentModal";
import { VoiceAgentVisual, WhatsAppVisual, WebsiteWidgetVisual } from "./cards/FeatureVisuals";
import {
  CustomActionsVisual,
  ModelComparisonVisual,
  SmartEscalationVisual,
  AnalyticsVisual,
  AITrainingVisual
} from "./cards/FeatureVisuals2";

interface Card {
  title: string;
  tagline: string;
  icon: React.ReactNode;
  image?: string;
  visual?: React.ReactNode;
  accent: string;
  bgAccent: string;
  colSpan?: string;
  action?: () => void;
}

export default function UnifiedOfferings() {
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);


  const cards: Card[] = [
    // Row 1: Offerings (channels)
    {
      title: "Voice AI",
      tagline: "Never miss a sales call again — AI answers every call instantly and books appointments 24/7",
      icon: <Mic size={18} />,
      visual: <VoiceAgentVisual />,
      accent: "text-blue-600",
      bgAccent: "bg-blue-500/10 border-blue-500/20",
      colSpan: "md:col-span-2",
    },
    {
      title: "WhatsApp AI",
      tagline: "Turn WhatsApp into your #1 sales channel — reach customers where they spend 3+ hours daily",
      icon: <MessageCircle size={18} />,
      visual: <WhatsAppVisual />,
      accent: "text-emerald-600",
      bgAccent: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Website Chat",
      tagline: "Stop losing visitors who have questions — convert 23% more browsers into buyers",
      icon: <MessageSquare size={18} />,
      visual: <WebsiteWidgetVisual />,
      accent: "text-purple-600",
      bgAccent: "bg-purple-500/10 border-purple-500/20",
      colSpan: "md:col-span-1",
    },
    // Row 2: Features
    // {
    //   title: "Custom Actions",
    //   tagline: "Trigger workflows in your existing systems",
    //   icon: <Settings size={18} />,
    //   visual: <CustomActionsVisual />,
    //   accent: "text-orange-600",
    //   bgAccent: "bg-orange-500/10 border-orange-500/20",
    // },
    {
      title: "Smart AI Switching",
      tagline: "Get the best AI responses at the lowest cost — save up to 90% on AI expenses",
      icon: <GitCompare size={18} />,
      visual: <ModelComparisonVisual />,
      accent: "text-sky-600",
      bgAccent: "bg-sky-500/10 border-sky-500/20",
      colSpan: "md:col-span-1",
    },
    {
      title: "Intelligent Handoff",
      tagline: "VIP treatment for complex issues — AI handles routine, humans handle what matters",
      icon: <ArrowUpRight size={18} />,
      visual: <SmartEscalationVisual />,
      accent: "text-rose-600",
      bgAccent: "bg-rose-500/10 border-rose-500/20",
      colSpan: "md:col-span-2",
    },
    {
      title: "Actionable Insights",
      tagline: "Know exactly what customers want — improve satisfaction by 40% with data-driven decisions",
      icon: <BarChart3 size={18} />,
      visual: <AnalyticsVisual />,
      accent: "text-amber-600",
      bgAccent: "bg-amber-500/10 border-amber-500/20",
      colSpan: "md:col-span-1",
    },
    // {
    //   title: "AI Training",
    //   tagline: "Train on your docs, FAQs, and data",
    //   icon: <Sparkles size={18} />,
    //   image: "/data_sources.png",
    //   accent: "text-violet-600",
    //   bgAccent: "bg-violet-500/10 border-violet-500/20",
    // },
  ];

  return (
    <section className="py-12 lg:py-16">
      <div className="w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
            Meet customers everywhere they are
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            One Platform. Every Channel.{" "}
            <br className="hidden md:block" />
            Unlimited Conversations.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
            Deploy AI agents across chat, voice, and WhatsApp. Handle unlimited conversations simultaneously while your team focuses on complex issues.
          </p>
        </motion.div>

        {/* 6-card bento grid (4 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <OfferingCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>

      <VoiceAgentModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />

    </section>
  );
}

function OfferingCard({ card, index }: { card: Card; index: number }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleMouseEnter = () => {
    setIsFocused(true);
  };

  const handleMouseLeave = () => {
    setIsFocused(false);
  };

  return (
    <motion.div
      ref={divRef}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ y: -2 }}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={card.action}
      className={`group relative rounded-xl border bg-card overflow-hidden transition-all hover:shadow-md flex flex-col h-full ${card.colSpan || ""
        } ${card.action ? "cursor-pointer" : ""}`}
    >
      {/* Spotlight Overlay */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, color-mix(in srgb, var(--foreground), transparent 90%), transparent 40%)`,
        }}
      />

      {/* Visual or Image */}
      {card.visual && (
        <div className="h-56 md:h-60 w-full overflow-hidden shrink-0">
          {card.visual}
        </div>
      )}
      {card.image && !card.visual && (
        <div className="relative h-56 md:h-60 w-full overflow-hidden bg-muted/30 shrink-0">
          <Image
            src={card.image}
            alt={`VerlyAI Feature: ${card.title} - ${card.tagline}`}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      {/* Content */}
      <div
        className={`px-5 py-3 ${!card.image && !card.visual ? "py-8" : ""} relative z-10`}
      >
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <div
              className={`inline-flex items-center justify-center size-7 rounded-lg border ${card.bgAccent} ${card.accent}`}
            >
              {card.icon}
            </div>
            <p className="text-sm font-semibold tracking-tight">
              {card.title}
            </p>
          </div>
          <p className="text-foreground/80 text-sm font-medium leading-relaxed line-clamp-2">
            {card.tagline}
          </p>
        </div>
      </div>

      {/* Border Glow */}
      <div
        className="absolute inset-0 rounded-xl ring-1 ring-inset ring-transparent group-hover:ring-foreground/10 pointer-events-none transition-all duration-300"
      />
    </motion.div>
  );
}
