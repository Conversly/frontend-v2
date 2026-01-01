// app/hero.tsx
"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Bot,
  Clock,
  Play,
  PhoneCall,
  MoveRight,
  Linkedin,
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

// X (formerly Twitter) Icon
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
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
    </div >
  );
}





export default function Hero() {
  const router = useRouter();

  return (
    <section className="pt-28 pb-20 lg:pt-36 lg:pb-32 relative overflow-hidden">
      {/* Background Orb */}
      <div className="absolute inset-0 h-full w-full pointer-events-none">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex gap-6 flex-col lg:items-start text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                We&apos;re live!
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-6xl font-normal text-foreground leading-[1.1] tracking-tight max-w-2xl"
            >
              AI agents that handle{" "}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-primary"
              >
                customer support
              </motion.span>{" "}
              so you don&apos;t have to
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl text-muted-foreground max-w-lg leading-relaxed tracking-tight"
            >
              Deploy on WhatsApp, voice, or your website. Answers questions, resolves issues, hands off to humans when needed.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col gap-8 pt-2"
            >

              <div className="flex flex-row gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 h-12 px-6 text-base transition-all duration-300 hover:shadow-lg hover:border-primary/50"
                    onClick={() => router.push("/")}
                  >
                    Jump on a call
                    <PhoneCall className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
                {/* TODO: Re-enable when launching properly
                <Button
                  size="lg"
                  className="gap-2 h-12 px-6 text-base"
                  onClick={() => router.push("/login")}
                >
                  Sign up here
                  <MoveRight className="w-4 h-4" />
                </Button>
                */}
              </div>


              {/* Social / follow */}
              <div className="flex flex-wrap items-center gap-3 text-muted-foreground mt-4">
                <div className="flex items-center gap-2 rounded-full border border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl px-3 py-1 shadow-[0_12px_35px_-18px_rgba(0,0,0,0.45)]">
                  <span className="text-xs font-semibold tracking-[0.16em] text-foreground/80 uppercase">
                    Follow us
                  </span>
                  <span className="h-1 w-8 rounded-full bg-gradient-to-r from-primary/70 via-primary/40 to-transparent" />
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://x.com/VerlyAI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center w-11 h-11 rounded-xl border border-white/50 dark:border-white/15 bg-gradient-to-br from-white/90 via-white/40 to-white/20 dark:from-white/10 dark:via-white/5 dark:to-white/0 shadow-lg shadow-primary/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-primary/30 before:absolute before:inset-0 before:rounded-xl before:bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.55),transparent_55%)] before:opacity-80 before:transition-opacity before:duration-300 group-hover:before:opacity-100"
                  >
                    <XIcon className="w-5 h-5 text-foreground transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:text-black" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/verlyai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center w-11 h-11 rounded-xl border border-white/50 dark:border-white/15 bg-gradient-to-br from-white/90 via-white/40 to-white/20 dark:from-white/10 dark:via-white/5 dark:to-white/0 shadow-lg shadow-primary/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-primary/30 before:absolute before:inset-0 before:rounded-xl before:bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.55),transparent_55%)] before:opacity-80 before:transition-opacity before:duration-300 group-hover:before:opacity-100"
                  >
                    <Linkedin className="w-5 h-5 text-foreground transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:text-[#0a66c2]" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="relative lg:ml-auto w-full max-w-md mx-auto lg:max-w-none flex justify-center lg:justify-end"
          >
            {/* Main Chat UI */}
            <motion.div
              className="relative w-full max-w-md"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ChatUI />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section >
  );
}
