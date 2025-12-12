// app/hero.tsx
"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  MessageSquare,
  Bot,
  Clock,
  Mic,
  Play,
  Phone,
} from "lucide-react";
import { useState, useEffect } from "react";

// Animated typing effect for messages
function useTypingEffect(text: string, speed = 30) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [displayedText, text, speed]);

  return { displayedText, isComplete };
}

// WhatsApp Icon
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// Enhanced Chat UI with animations
function ChatUI() {
  const [showFirstMessage, setShowFirstMessage] = useState(false);
  const [showUserMessage, setShowUserMessage] = useState(false);
  const [showBotReply, setShowBotReply] = useState(false);
  const [showTyping, setShowTyping] = useState(false);

  const botReplyText =
    "Your order #4521 shipped yesterday via Express. Expected delivery: Tomorrow by 6 PM. Here's your tracking link 📦";
  const { displayedText } = useTypingEffect(
    showBotReply ? botReplyText : "",
    18
  );

  useEffect(() => {
    const timer1 = setTimeout(() => setShowFirstMessage(true), 400);
    const timer2 = setTimeout(() => setShowUserMessage(true), 1200);
    const timer3 = setTimeout(() => setShowTyping(true), 2000);
    const timer4 = setTimeout(() => {
      setShowTyping(false);
      setShowBotReply(true);
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="w-full max-w-sm bg-card/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-border shadow-2xl font-sans">
      {/* Chat header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-border bg-card/60">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10 ring-2 ring-primary/20">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full ring-2 ring-card" />
          </div>
          <div>
            <span className="font-semibold text-foreground text-sm">
              Support Agent
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span>Online</span>
            </div>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors p-1.5 hover:bg-accent rounded-lg">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Chat body */}
      <div className="p-4 space-y-3 min-h-[280px] max-h-[280px] overflow-y-auto bg-gradient-to-b from-accent/30 to-transparent">
        {/* Bot welcome message */}
        {showFirstMessage && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-2"
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-primary/10 flex-shrink-0">
              <Bot className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="bg-muted/60 text-foreground rounded-2xl rounded-tl-sm p-3 max-w-[85%]">
              <p className="text-sm leading-relaxed">
                Hey! How can I help you today? 👋
              </p>
            </div>
          </motion.div>
        )}

        {/* User message */}
        {showUserMessage && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start justify-end gap-2"
          >
            <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm p-3 max-w-[85%]">
              <p className="text-sm leading-relaxed">
                Where's my order?
              </p>
            </div>
          </motion.div>
        )}

        {/* Typing indicator */}
        {showTyping && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-start gap-2"
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-primary/10 flex-shrink-0">
              <Bot className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="bg-muted/60 rounded-2xl rounded-tl-sm p-3">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Bot reply with typing effect */}
        {showBotReply && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-2"
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-primary/10 flex-shrink-0">
              <Bot className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="bg-muted/60 text-foreground rounded-2xl rounded-tl-sm p-3 max-w-[85%]">
              <p className="text-sm leading-relaxed">
                {displayedText}
                <span className="inline-block w-0.5 h-3.5 bg-primary ml-0.5 animate-pulse" />
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Chat input */}
      <div className="p-3 border-t border-border bg-card/60">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-muted/40 text-foreground placeholder:text-muted-foreground rounded-xl px-3 py-2 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <button className="bg-primary text-primary-foreground rounded-xl p-2 hover:opacity-90 transition-all">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Feature cards data
const featureCards = [
  {
    icon: Mic,
    title: "Voice Agents",
    desc: "Handle calls 24/7. Reduce wait times to zero.",
  },
  {
    icon: WhatsAppIcon,
    title: "WhatsApp",
    desc: "Meet customers where they already are.",
  },
  {
    icon: MessageSquare,
    title: "Web Chat",
    desc: "Embed on any site in under 2 minutes.",
  },
];

// Fake company logos for social proof
const companies = [
  { name: "TechFlow", icon: "⚡" },
  { name: "Nexus", icon: "◈" },
  { name: "Pulse", icon: "●" },
  { name: "Vertex", icon: "△" },
];

export default function Hero() {
  const router = useRouter();

  return (
    <section className="bg-background pt-20 pb-20 lg:pb-28 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent" />
        
        {/* Network lines pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.015]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="network" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="currentColor" className="text-foreground" />
              <line x1="50" y1="50" x2="100" y2="0" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
              <line x1="50" y1="50" x2="0" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
              <line x1="50" y1="50" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#network)" />
        </svg>

        {/* Floating orbs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-[15%] w-80 h-80 bg-primary/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 left-[10%] w-96 h-96 bg-primary/15 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-sans"
          >
            {/* Heading - Direct, no fluff */}
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground mb-5 leading-[1.1] tracking-tight">
              AI agents that handle{" "}
              <span className="text-primary">customer support</span>{" "}
              so you don't have to
            </h1>

            {/* Description - One clear sentence */}
            <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
              Deploy on WhatsApp, voice, or your website. Answers questions, resolves issues, hands off to humans when needed.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 shadow-lg shadow-primary/20"
                onClick={() => router.push("/login")}
              >
                Start Free
                <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-6 border-border"
                onClick={() => router.push("/login")}
              >
                Get a Demo
              </Button>
              <button
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ml-2"
                onClick={() => {}}
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Play className="w-3 h-3 text-primary fill-primary" />
                </div>
                Watch Video
              </button>
            </div>

            {/* Trust line */}
            <p className="text-sm text-muted-foreground mb-10">
              Free 14-day trial · No credit card required
            </p>

            {/* Feature Cards */}
            <div className="grid sm:grid-cols-3 gap-3 mb-10">
              {featureCards.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                  className="p-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="font-semibold text-foreground text-sm mb-1">{title}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{desc}</div>
                </motion.div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="pt-8 border-t border-border/50">
              <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider font-medium">
                Trusted by teams at
              </p>
              <div className="flex flex-wrap items-center gap-6">
                {companies.map((company, i) => (
                  <motion.div
                    key={company.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-2 text-muted-foreground/70 hover:text-muted-foreground transition-colors"
                  >
                    <span className="text-lg">{company.icon}</span>
                    <span className="text-sm font-medium">{company.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative lg:ml-auto"
          >
            {/* Glow behind chat */}
            <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full scale-125" />

            {/* Decorative rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -top-6 -right-6 w-24 h-24 border border-primary/10 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-4 -left-4 w-16 h-16 border border-primary/10 rounded-full"
            />

            {/* WhatsApp badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="absolute -top-2 right-4 z-10 bg-card border border-border rounded-full px-3 py-1.5 shadow-lg flex items-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4 text-green-500" />
              <span className="text-xs font-medium text-foreground">WhatsApp Ready</span>
            </motion.div>

            {/* Voice badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="absolute top-20 -left-4 z-10 bg-card border border-border rounded-full px-3 py-1.5 shadow-lg flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-foreground">Voice AI</span>
            </motion.div>

            {/* Main Chat UI */}
            <div className="relative">
              <ChatUI />
            </div>

            {/* Response time badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-card border border-border rounded-full px-4 py-2 shadow-lg flex items-center gap-2"
            >
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-foreground">
                Avg. response: 1.2s
              </span>
            </motion.div>

            {/* Floating CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute -right-8 bottom-16 hidden xl:block bg-card border border-border rounded-xl p-4 shadow-xl w-48"
            >
              <p className="text-sm font-semibold text-foreground leading-snug mb-3">
                Ready to automate support?
              </p>
              <Button 
                size="sm" 
                className="w-full rounded-full text-xs"
                onClick={() => router.push("/login")}
              >
                Sign Up Free
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
