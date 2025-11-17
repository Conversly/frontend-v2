// app/hero.tsx
"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Code,
  Zap,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Bot,
  CheckCircle2,
  Clock,
  Globe,
} from "lucide-react";
import { useState, useEffect } from "react";

const features = [
  {
    icon: MessageSquare,
    label: "WhatsApp Integration",
    iconColor: "text-primary",
  },
  {
    icon: Code,
    label: "Widget Embed",
    iconColor: "text-primary",
  },
  {
    icon: Zap,
    label: "Instant AI Replies",
    iconColor: "text-primary",
  },
];

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

// Enhanced Chat UI with animations
function ChatUI() {
  const [showFirstMessage, setShowFirstMessage] = useState(false);
  const [showUserMessage, setShowUserMessage] = useState(false);
  const [showBotReply, setShowBotReply] = useState(false);
  const [showTyping, setShowTyping] = useState(false);

  const botReplyText =
    "The search endpoint has a rate limit of 100 requests per minute per API key. You can monitor your usage in the dashboard. 📊";
  const { displayedText } = useTypingEffect(
    showBotReply ? botReplyText : "",
    20
  );

  useEffect(() => {
    const timer1 = setTimeout(() => setShowFirstMessage(true), 500);
    const timer2 = setTimeout(() => setShowUserMessage(true), 1500);
    const timer3 = setTimeout(() => setShowTyping(true), 2500);
    const timer4 = setTimeout(() => {
      setShowTyping(false);
      setShowBotReply(true);
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="w-full max-w-md bg-card/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-border shadow-2xl font-sans">
      {/* Chat header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-border bg-card/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10 ring-2 ring-primary/20">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full ring-2 ring-card" />
          </div>
          <div>
            <span className="font-semibold text-foreground text-sm">
              Support Assistant
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span>Online</span>
            </div>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-accent rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Chat body */}
      <div className="p-4 space-y-4 min-h-[340px] max-h-[340px] overflow-y-auto bg-gradient-to-b from-accent/20 to-transparent">
        {/* Bot welcome message */}
        {showFirstMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10 ring-1 ring-primary/20 flex-shrink-0">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-muted/50 text-foreground rounded-2xl rounded-tl-sm p-3.5 max-w-[85%] shadow-sm">
              <p className="text-sm leading-relaxed">
                Hi there! 👋 How can I help you with our API documentation?
              </p>
            </div>
          </motion.div>
        )}

        {/* User message */}
        {showUserMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start justify-end gap-3"
          >
            <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm p-3.5 max-w-[85%] shadow-sm">
              <p className="text-sm leading-relaxed">
                What's the rate limit for the search endpoint?
              </p>
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10 ring-1 ring-primary/20 flex-shrink-0">
              <span className="text-xs font-semibold text-primary">You</span>
            </div>
          </motion.div>
        )}

        {/* Typing indicator */}
        {showTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10 ring-1 ring-primary/20 flex-shrink-0">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-muted/50 rounded-2xl rounded-tl-sm p-3.5 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Bot reply with typing effect */}
        {showBotReply && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10 ring-1 ring-primary/20 flex-shrink-0">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-muted/50 text-foreground rounded-2xl rounded-tl-sm p-3.5 max-w-[85%] shadow-sm">
              <p className="text-sm leading-relaxed">
                {displayedText}
                <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse" />
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Chat input */}
      <div className="p-4 border-t border-border bg-card/50">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask anything about your docs..."
            className="flex-1 bg-muted/50 text-foreground placeholder:text-muted-foreground rounded-xl px-4 py-2.5 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
          />
          <button className="bg-primary text-primary-foreground rounded-xl p-2.5 hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-sm">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>Typically replies in seconds</span>
        </div>
      </div>
    </div>
  );
}

// Stats component
function Stats() {
  const stats = [
    { value: "24/7", label: "Availability" },
    { value: "<2s", label: "Response Time" },
    { value: "99.9%", label: "Uptime" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="flex gap-6 lg:gap-8 mt-8 pt-8 border-t border-border/50"
    >
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
            {stat.value}
          </div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  );
}

export default function Hero() {
  const router = useRouter();

  const highlights = [
    "Deploy on WhatsApp & Web",
    "Train on Your Knowledge Base",
    "No Coding Required",
  ];

  return (
    <section className="bg-background pt-16 pb-16 lg:pb-24 relative overflow-hidden">
      {/* Background Effects - using theme colors */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary)_0%,_transparent_50%)] opacity-10" />
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(black,transparent_70%)]" />
        
        {/* Floating orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-40 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-sans"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 hover:bg-primary/15 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                AI-Powered Customer Support
              </span>
            </motion.div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
              AI Support Agents for{" "}
              <span className="text-primary relative inline-block">
                Magical
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="8"
                  viewBox="0 0 200 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 5.5C40 2.5 80 1.5 120 2.5C160 3.5 180 5.5 199 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="text-primary/50"
                  />
                </svg>
              </span>{" "}
              Customer Experiences
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-muted-foreground mb-6 max-w-2xl leading-relaxed">
              Build and deploy AI support agents that solve customer problems
              instantly. Deploy on WhatsApp, your website, or integrate via API.
              No coding required.
            </p>

            {/* Highlights with checkmarks */}
            <div className="flex flex-wrap gap-4 mb-8">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">
                    {highlight}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 hover:bg-card transition-all cursor-default"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10 group-hover:bg-primary/15 transition-colors">
                    <feature.icon
                      className={`w-4 h-4 ${feature.iconColor}`}
                    />
                  </div>
                  <span className="text-sm text-foreground font-medium">
                    {feature.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:opacity-90 rounded-xl group shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
                onClick={() => router.push("/create")}
              >
                Start Building Free
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-accent rounded-xl group transition-all hover:border-primary/50"
                onClick={() => router.push("/docs")}
              >
                <Globe className="mr-2 w-4 h-4" />
                View Documentation
              </Button>
            </motion.div>

            {/* Stats */}
            <Stats />
          </motion.div>

          {/* Chat UI Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:ml-auto"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-150" />
            
            {/* Decorative elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-20 h-20 border border-primary/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-4 -left-4 w-16 h-16 border border-primary/20 rounded-full"
            />
            
            <div className="relative">
              <ChatUI />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-card border border-border rounded-full px-4 py-2 shadow-lg flex items-center gap-2 whitespace-nowrap"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-foreground">
                Powered by AI
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}