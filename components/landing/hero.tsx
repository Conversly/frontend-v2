// app/hero.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
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
  Calendar,
  Mic,
  MicOff,
  Volume2,
  Phone,
  MessageCircle,
  Check,
  CheckCheck,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";

type OfferingType = "chat" | "voice" | "whatsapp";

// Animated typing effect for messages
function useTypingEffect(text: string, speed = 30, startTyping = true) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!startTyping) {
      setDisplayedText("");
      setIsComplete(false);
      return;
    }
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [displayedText, text, speed, startTyping]);

  // Reset when text changes
  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
  }, [text]);

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

// Audio waveform visualization component
function AudioWaveform({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex items-center justify-center gap-[3px] h-8">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-emerald-400 rounded-full"
          animate={isActive ? {
            height: [8, 20 + Math.random() * 12, 8],
          } : { height: 4 }}
          transition={{
            duration: 0.4 + Math.random() * 0.3,
            repeat: isActive ? Infinity : 0,
            repeatType: "reverse",
            delay: i * 0.05,
          }}
        />
      ))}
    </div>
  );
}

// Voice Call UI Component
function VoiceCallUI() {
  const [callState, setCallState] = useState<"ringing" | "connected" | "speaking">("ringing");
  const [callDuration, setCallDuration] = useState(0);
  const [transcriptIndex, setTranscriptIndex] = useState(0);

  const transcripts = [
    { speaker: "ai", text: "Hello! Thanks for calling. How can I help you today?" },
    { speaker: "user", text: "I need to reschedule my appointment" },
    { speaker: "ai", text: "Of course! I can see your appointment for tomorrow at 2 PM. When would you like to reschedule?" },
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCallState("connected"), 1500);
    const timer2 = setTimeout(() => setCallState("speaking"), 2500);
    const timer3 = setTimeout(() => setTranscriptIndex(1), 4500);
    const timer4 = setTimeout(() => setTranscriptIndex(2), 6500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  useEffect(() => {
    if (callState === "connected" || callState === "speaking") {
      const interval = setInterval(() => {
        setCallDuration(d => d + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [callState]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-sm bg-gradient-to-b from-slate-50 to-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl font-sans">
      {/* Call header */}
      <div className="px-4 py-4 flex flex-col items-center gap-3 border-b border-slate-100">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Bot className="w-8 h-8 text-white" />
          </div>
          {callState !== "ringing" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center ring-2 ring-white"
            >
              <Phone className="w-2.5 h-2.5 text-white" />
            </motion.div>
          )}
        </div>
        <div className="text-center">
          <h3 className="text-slate-900 font-semibold text-lg">AI Support Agent</h3>
          <div className="text-slate-500 text-sm font-medium mt-0.5">
            {callState === "ringing" ? (
              <span className="flex items-center gap-2 justify-center">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Connecting...
              </span>
            ) : (
              formatTime(callDuration)
            )}
          </div>
        </div>
      </div>

      {/* Audio visualization area */}
      <div className="px-4 py-6 min-h-[200px] flex flex-col bg-slate-50/50">
        {callState === "ringing" ? (
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              className="relative"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Phone className="w-8 h-8 text-emerald-500 animate-pulse" />
              </div>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-emerald-500/20"
                animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col gap-4">
            {/* Waveform */}
            <div className="flex justify-center py-2 h-12 items-center">
              <AudioWaveform isActive={callState === "speaking"} />
            </div>

            {/* Live transcript */}
            <div className="flex-1 space-y-2 overflow-hidden">
              <p className="text-slate-400 text-2xs uppercase tracking-wider text-center mb-3 font-semibold">Live Transcript</p>
              {transcripts.slice(0, transcriptIndex + 1).map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm px-3.5 py-2.5 rounded-2xl ${t.speaker === "ai"
                    ? "bg-white border border-slate-100 text-slate-700 shadow-sm rounded-tl-sm mr-auto"
                    : "bg-emerald-50 border border-emerald-100 text-emerald-800 shadow-sm rounded-tr-sm ml-auto"
                    } max-w-[90%] w-fit`}
                >
                  <span className={`text-2xs uppercase tracking-wider block mb-1 font-bold ${t.speaker === "ai" ? "text-slate-400" : "text-emerald-600/70"
                    }`}>
                    {t.speaker === "ai" ? "AI Agent" : "Caller"}
                  </span>
                  {t.text}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Call controls */}
      <div className="px-6 py-5 border-t border-slate-100 bg-white">
        <div className="flex items-center justify-center gap-6">
          <button className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all shadow-sm">
            <MicOff className="w-5 h-5" />
          </button>
          <button className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/40 hover:scale-105 active:scale-95">
            <Phone className="w-6 h-6 rotate-[135deg]" />
          </button>
          <button className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all shadow-sm">
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// WhatsApp UI Component
function WhatsAppChatUI() {
  const [showFirstMessage, setShowFirstMessage] = useState(false);
  const [showUserMessage, setShowUserMessage] = useState(false);
  const [showBotReply, setShowBotReply] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [showTyping, setShowTyping] = useState(false);

  const botReplyText = "Hi Sarah! 👋 I found your booking #WA-7823. Your table for 4 is confirmed for Saturday 7PM at our Downtown location. Would you like to modify it?";
  const { displayedText, isComplete } = useTypingEffect(
    showBotReply ? botReplyText : "",
    16,
    showBotReply
  );

  useEffect(() => {
    const timer1 = setTimeout(() => setShowFirstMessage(true), 400);
    const timer2 = setTimeout(() => setShowUserMessage(true), 1400);
    const timer3 = setTimeout(() => setShowTyping(true), 2200);
    const timer4 = setTimeout(() => {
      setShowTyping(false);
      setShowBotReply(true);
    }, 3200);
    const timer5 = setTimeout(() => setShowQuickReplies(true), 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  return (
    <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-xl font-sans border border-[#e9edef]">
      {/* WhatsApp header */}
      <div className="px-3 py-2.5 flex items-center gap-3 bg-[#075e54]">
        <button className="text-white/80 hover:text-white p-1">
          <ArrowRight className="w-5 h-5 rotate-180" />
        </button>
        <div className="flex items-center gap-3 flex-1">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-white text-sm">Restaurant Bot</span>
              <svg className="w-4 h-4 text-[#25d366]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <span className="text-white/70 text-xs">online</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-white/80">
          <Phone className="w-5 h-5" />
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z" />
          </svg>
        </div>
      </div>

      {/* Chat body - WhatsApp style background */}
      <div
        className="p-3 space-y-2 min-h-[280px] max-h-[280px] overflow-y-auto"
        style={{
          backgroundColor: "#E5DDD5",
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {/* Bot welcome message */}
        {showFirstMessage && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-2"
          >
            <div className="bg-white text-gray-800 rounded-lg rounded-tl-none p-2.5 max-w-[85%] shadow-sm">
              <p className="text-sm leading-relaxed">
                Welcome to Bella&apos;s Kitchen! 🍝 I can help with reservations, menu info, or order status.
              </p>
              <p className="text-xs text-gray-400 text-right mt-1">10:42 AM</p>
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
            <div className="bg-[#DCF8C6] text-gray-800 rounded-lg rounded-tr-none p-2.5 max-w-[85%] shadow-sm">
              <p className="text-sm leading-relaxed">
                Check my reservation for Sarah
              </p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-xs text-gray-500">10:43 AM</span>
                <CheckCheck className="w-4 h-4 text-blue-500" />
              </div>
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
            <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
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
            <div className="bg-white text-gray-800 rounded-lg rounded-tl-none p-2.5 max-w-[85%] shadow-sm">
              <p className="text-sm leading-relaxed">
                {displayedText}
                {!isComplete && <span className="inline-block w-0.5 h-3.5 bg-gray-400 ml-0.5 animate-pulse" />}
              </p>
              <p className="text-xs text-gray-400 text-right mt-1">10:43 AM</p>
            </div>
          </motion.div>
        )}

        {/* Quick reply buttons */}
        {showQuickReplies && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap gap-2 pt-2"
          >
            {["Change time", "Add guests", "Cancel booking"].map((text) => (
              <button
                key={text}
                className="px-3 py-1.5 bg-white border border-gray-200 text-[#00a884] rounded-full text-xs font-semibold shadow-sm hover:bg-gray-50 transition-colors"
              >
                {text}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* WhatsApp input */}
      <div className="px-2 py-2 bg-[#f0f2f5] flex items-center gap-2 border-t border-gray-200">
        <button className="text-gray-500 p-2 hover:text-gray-600 transition-colors">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z" />
          </svg>
        </button>
        <div className="flex-1 bg-white rounded-full px-4 py-2 border border-white">
          <input
            type="text"
            placeholder="Type a message"
            className="w-full bg-transparent text-gray-800 placeholder:text-gray-500 text-sm outline-none"
          />
        </div>
        <button className="text-gray-500 p-2 hover:text-gray-600 transition-colors">
          <Mic className="w-6 h-6" />
        </button>
      </div>
    </div>
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
    18,
    showBotReply
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
    <div className="w-full max-w-sm bg-card/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-border shadow-md font-sans">
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

// Offering Switcher Component
function OfferingSwitcher({
  activeOffering,
  onSwitch,
}: {
  activeOffering: OfferingType;
  onSwitch: (offering: OfferingType) => void;
}) {
  const offerings: { type: OfferingType; icon: React.ReactNode; label: string }[] = [
    { type: "chat", icon: <MessageCircle className="w-4 h-4" />, label: "Web Chat" },
    { type: "voice", icon: <Phone className="w-4 h-4" />, label: "Voice" },
    { type: "whatsapp", icon: <WhatsAppIcon className="w-4 h-4" />, label: "WhatsApp" },
  ];

  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      {offerings.map((o) => (
        <button
          key={o.type}
          onClick={() => onSwitch(o.type)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeOffering === o.type
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-muted/50 text-muted-foreground hover:bg-muted"
            }`}
        >
          {o.icon}
          <span className="hidden sm:inline">{o.label}</span>
        </button>
      ))}
    </div>
  );
}





export default function Hero() {
  const router = useRouter();
  const [activeOffering, setActiveOffering] = useState<OfferingType>("chat");
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle through offerings
  useEffect(() => {
    if (isPaused) return;

    const offerings: OfferingType[] = ["chat", "voice", "whatsapp"];
    const interval = setInterval(() => {
      setActiveOffering((current) => {
        const currentIndex = offerings.indexOf(current);
        return offerings[(currentIndex + 1) % offerings.length];
      });
    }, 8000); // 8 seconds per offering to allow animations to complete

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleManualSwitch = (offering: OfferingType) => {
    setActiveOffering(offering);
    setIsPaused(true);
    // Resume auto-cycling after 15 seconds of manual interaction
    setTimeout(() => setIsPaused(false), 15000);
  };

  return (
    <section className="pt-12 pb-12 lg:pt-16 lg:pb-20 relative overflow-hidden">
      {/* Background Orb */}
      <div className="absolute inset-0 h-full w-full pointer-events-none">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
      </div>
      <div className="relative w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex gap-6 flex-col lg:items-start text-left px-4 lg:px-0"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-primary">
                We&apos;re live!
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight max-w-2xl"
            >
              AI agents that handle{" "}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-primary text-4xl md:text-5xl lg:text-6xl leading-[1.1]"
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

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="group gap-2 h-12 px-6 text-base transition-all duration-300 hover:shadow-md"
                  onClick={() => {
                    // @ts-ignore
                    if (window.Calendly) {
                      // @ts-ignore
                      window.Calendly.initPopupWidget({ url: 'https://calendly.com/rdhakad2002/30min' });
                    }
                  }}
                >
                  <Calendar className="w-5 h-5" />
                  Schedule a meet
                </Button>
              </motion.div>


              {/* Social / follow */}
              <div className="flex flex-wrap items-center gap-3 text-muted-foreground mt-4">
                <div className="flex items-center gap-2 rounded-full border border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl px-3 py-1 shadow-sm">
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
                    className="group relative flex items-center justify-center w-11 h-11 rounded-xl border border-border bg-card shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <XIcon className="w-5 h-5 text-foreground transition-transform duration-300 group-hover:scale-110 group-hover:text-black" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/verlyai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center w-11 h-11 rounded-xl border border-border bg-card shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <Linkedin className="w-5 h-5 text-foreground transition-transform duration-300 group-hover:scale-110 group-hover:text-[#0a66c2]" />
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
            className="relative lg:ml-auto w-full max-w-md mx-auto lg:max-w-none flex flex-col items-center lg:items-end"
          >
            {/* Offering Switcher */}
            <OfferingSwitcher
              activeOffering={activeOffering}
              onSwitch={handleManualSwitch}
            />

            {/* Animated Offerings Container */}
            <div className="relative w-full max-w-sm h-[420px]">
              <AnimatePresence mode="wait">
                {activeOffering === "chat" && (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-start justify-center"
                  >
                    <ChatUI key={`chat-${Date.now()}`} />
                  </motion.div>
                )}

                {activeOffering === "voice" && (
                  <motion.div
                    key="voice"
                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-start justify-center"
                  >
                    <VoiceCallUI key={`voice-${Date.now()}`} />
                  </motion.div>
                )}

                {activeOffering === "whatsapp" && (
                  <motion.div
                    key="whatsapp"
                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-start justify-center"
                  >
                    <WhatsAppChatUI key={`whatsapp-${Date.now()}`} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
