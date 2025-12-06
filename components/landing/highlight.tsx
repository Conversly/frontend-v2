"use client";

import { useState } from "react";
import { Clock, MessageCircle, MessageSquare, Mic, Users, Zap } from "lucide-react";

import ChatWidget from "./cards/ChatWidget";
import FeatureCard from "./cards/FeatureCard";
import { VoiceAgentVisual, WhatsAppVisual, WebsiteWidgetVisual } from "./cards/FeatureVisuals";
import VoiceAgentModal from "./cards/VoiceAgentModal";

export default function HighlightsSection() {
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isChatWidgetOpen, setIsChatWidgetOpen] = useState(false);

  const featureCards = [
    {
      title: "AI Voice Agents",
      description:
        "Next-gen voice AI that understands context, sentiment, and nuance. Create natural-sounding agents in minutes without coding. Deflect up to 80% of calls and provide instant answers.",
      icon: <Mic size={24} />,
      visual: <VoiceAgentVisual />,
      primaryButtonText: "Try Voice Demo",
      primaryDisabled: true,
      secondaryButtonText: "",
      tagLabel: "Easy Creation",
      tagIcon: <Zap size={14} />,
      accentColor: "blue" as const,
    },
    {
      title: "WhatsApp Chatbots",
      description:
        "Engage customers on their preferred messaging app. Build automated flows for FAQs, order tracking, and bookings. Rich media support for images, videos, and documents.",
      icon: <MessageCircle size={24} />,
      visual: <WhatsAppVisual />,
      primaryButtonText: "See Examples",
      secondaryButtonText: "",
      tagLabel: "24/7 Availability",
      tagIcon: <Clock size={14} />,
      accentColor: "green" as const,
    },
    {
      title: "Website Widget Chatbots",
      description:
        "Turn website visitors into leads with intelligent, proactive chat. Highly customizable widget to match your brand. Capture lead information, schedule appointments, and offer instant help.",
      icon: <MessageSquare size={24} />,
      visual: <WebsiteWidgetVisual />,
      primaryButtonText: "Live Preview",
      primaryButtonAction: () => setIsChatWidgetOpen(true),
      secondaryButtonText: "",
      tagLabel: "Lead Generation",
      tagIcon: <Users size={14} />,
      accentColor: "purple" as const,
    },
  ];

  return (
    <section className="bg-background py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="space-y-3">
          <span className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold border border-border bg-card text-foreground">
            Highlights
          </span>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3 max-w-3xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Launch AI on voice, WhatsApp, and web chat
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Three ready-to-ship experiences powered by the same builder. Try the demos and see how customers can reach you anywhere.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureCards.map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>
      </div>

      <VoiceAgentModal isOpen={isVoiceModalOpen} onClose={() => setIsVoiceModalOpen(false)} />
      <ChatWidget isOpen={isChatWidgetOpen} onClose={() => setIsChatWidgetOpen(false)} />
    </section>
  );
}