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
import Image from "next/image";

import ChatWidget from "./cards/ChatWidget";
import VoiceAgentModal from "./cards/VoiceAgentModal";
import { VoiceAgentVisual, WhatsAppVisual, WebsiteWidgetVisual } from "./cards/FeatureVisuals";

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
  const [isChatWidgetOpen, setIsChatWidgetOpen] = useState(false);

  const cards: Card[] = [
    // Row 1: Offerings (channels)
    {
      title: "Voice Agents",
      tagline: "Automate calls and deflect 80% of volume",
      icon: <Mic size={18} />,
      visual: <VoiceAgentVisual />,
      accent: "text-blue-600",
      bgAccent: "bg-blue-500/10 border-blue-500/20",
      colSpan: "md:col-span-2",
    },
    {
      title: "WhatsApp",
      tagline: "Engage 2B+ users on their favorite app",
      icon: <MessageCircle size={18} />,
      visual: <WhatsAppVisual />,
      accent: "text-emerald-600",
      bgAccent: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Web Widget",
      tagline: "Embed a chatbot on any website instantly",
      icon: <MessageSquare size={18} />,
      visual: <WebsiteWidgetVisual />,
      accent: "text-purple-600",
      bgAccent: "bg-purple-500/10 border-purple-500/20",
      action: () => setIsChatWidgetOpen(true),
    },
    // Row 2: Features
    {
      title: "Custom Actions",
      tagline: "Trigger workflows in your existing systems",
      icon: <Settings size={18} />,
      image: "/take_action.png",
      accent: "text-orange-600",
      bgAccent: "bg-orange-500/10 border-orange-500/20",
    },
    {
      title: "Model Comparison",
      tagline: "Test GPT, Claude, Llama side by side",
      icon: <GitCompare size={18} />,
      image: "/compare_model.png",
      accent: "text-sky-600",
      bgAccent: "bg-sky-500/10 border-sky-500/20",
    },
    {
      title: "Smart Escalation",
      tagline: "Hand off to humans when it matters",
      icon: <ArrowUpRight size={18} />,
      image: "/escalation.png",
      accent: "text-rose-600",
      bgAccent: "bg-rose-500/10 border-rose-500/20",
    },
    {
      title: "Analytics",
      tagline: "Track performance and optimize over time",
      icon: <BarChart3 size={18} />,
      image: "/reporting.png",
      accent: "text-amber-600",
      bgAccent: "bg-amber-500/10 border-amber-500/20",
    },
    {
      title: "AI Training",
      tagline: "Train on your docs, FAQs, and data",
      icon: <Sparkles size={18} />,
      image: "/data_sources.png",
      accent: "text-violet-600",
      bgAccent: "bg-violet-500/10 border-violet-500/20",
    },
  ];

  return (
    <section className="py-20 lg:py-28">
      <div className="w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
            Everything you need
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Deploy across channels. Connect to your stack.
          </h2>
        </motion.div>

        {/* 8-card bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -2 }}
              onClick={card.action}
              className={`group relative rounded-xl border bg-card overflow-hidden transition-all hover:shadow-md ${
                card.colSpan || ""
              } ${card.action ? "cursor-pointer" : ""}`}
            >
              {/* Visual or Image */}
              {card.visual && (
                <div className="h-52 w-full overflow-hidden">{card.visual}</div>
              )}
              {card.image && !card.visual && (
                <div className="relative h-44 w-full overflow-hidden bg-muted/30">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Content */}
              <div className={`px-5 py-4 ${!card.image && !card.visual ? "py-8" : ""}`}>
                <div className="flex items-start gap-3">
                  <div
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium border shrink-0 ${card.bgAccent} ${card.accent}`}
                  >
                    {card.icon}
                    {card.title}
                  </div>
                  <p className="text-foreground/80 text-sm font-medium leading-snug">{card.tagline}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <VoiceAgentModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />
      <ChatWidget
        isOpen={isChatWidgetOpen}
        onClose={() => setIsChatWidgetOpen(false)}
      />
    </section>
  );
}

