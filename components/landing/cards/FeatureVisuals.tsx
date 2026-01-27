import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Phone, MessageCircle, Bot, User, Mic } from "lucide-react";

export const VoiceAgentVisual = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const loop = async () => {
      while (true) {
        setStep(1); // Agent: Hi! How can I help?
        await new Promise((r) => setTimeout(r, 2000));
        setStep(2); // Caller: I need help with my order
        await new Promise((r) => setTimeout(r, 2000));
        setStep(3); // Agent: Let me check that for you...
        await new Promise((r) => setTimeout(r, 2000));
        setStep(4); // Caller: Order #12345
        await new Promise((r) => setTimeout(r, 3000));
        setStep(0); // Clear
        await new Promise((r) => setTimeout(r, 500));
      }
    };
    loop();
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>

      {/* Chat bubbles container */}
      <div className="w-full max-w-[300px] flex justify-between mb-3 px-2 z-10 min-h-[80px]">
        {/* AI Agent bubbles (left side) */}
        <div className="flex flex-col gap-1.5 items-start max-w-[100px]">
          <AnimatePresence>
            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className="bg-white px-2.5 py-1.5 rounded-xl rounded-bl-sm shadow-sm border border-blue-100 text-2xs text-gray-700"
              >
                Hi! How can <br /> I help?
              </motion.div>
            )}
            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className="bg-white px-2.5 py-1.5 rounded-xl rounded-bl-sm shadow-sm border border-blue-100 text-2xs text-gray-700"
              >
                Let me check <br /> that for you...
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Caller bubbles (right side) */}
        <div className="flex flex-col gap-1.5 items-end max-w-[100px]">
          <AnimatePresence>
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className="bg-indigo-500 px-2.5 py-1.5 rounded-xl rounded-br-sm shadow-sm text-2xs text-white text-right"
              >
                I need help with <br /> my order
              </motion.div>
            )}
            {step >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className="bg-indigo-500 px-2.5 py-1.5 rounded-xl rounded-br-sm shadow-sm text-2xs text-white text-right"
              >
                Order #12345
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center gap-3 z-10 w-full max-w-[280px] justify-between">
        {/* Agent Avatar */}
        <div className="relative">
          <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center relative z-10">
            <div className="bg-blue-100 p-2 rounded-full">
              <User size={24} className="text-blue-600" />
            </div>
            {/* Headset indicator */}
            <div className="absolute -right-1 -top-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
              <Mic size={10} className="text-blue-500" />
            </div>
          </div>
          <span className="text-2xs text-gray-500 text-center block mt-1">AI Agent</span>
        </div>

        {/* Audio Waveform */}
        <div className="flex-1 flex justify-center gap-1 h-8 items-center">
          {[0.4, 0.7, 1, 0.6, 0.8, 0.5, 0.9, 0.4].map((h, i) => (
            <div
              key={i}
              className="w-1.5 bg-indigo-400 rounded-full animate-pulse"
              style={{
                height: `${h * 100}%`,
                animationDelay: `${i * 0.1}s`
              }}
            ></div>
          ))}
        </div>

        {/* User Phone */}
        <div className="relative">
          <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center relative z-10">
            <div className="bg-gray-100 p-2 rounded-full">
              <Phone size={24} className="text-gray-600" />
            </div>
          </div>
          <span className="text-2xs text-gray-500 text-center block mt-1">Caller</span>
        </div>
      </div>

      {/* Connection line */}
      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-10 pointer-events-none" style={{ zIndex: 0 }}>
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#E0E7FF" strokeWidth="2" strokeDasharray="6 4" />
      </svg>
    </div>
  );
};

export const WhatsAppVisual = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        setStep(0);
        await new Promise((r) => setTimeout(r, 1000));
        setStep(1);
        await new Promise((r) => setTimeout(r, 1500));
        setStep(2);
        await new Promise((r) => setTimeout(r, 1500));
        setStep(3);
        await new Promise((r) => setTimeout(r, 4000));
      }
    };
    sequence();
  }, []);

  return (
    <div className="w-full h-full bg-[#E5DDD5] flex items-center justify-center relative overflow-hidden text-sm">
      {/* Background Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="w-52 bg-white rounded-[2rem] shadow-xl border border-gray-200 relative overflow-hidden h-full max-h-full flex flex-col z-10">
        {/* Status Bar */}
        <div className="h-7 bg-[#075E54] flex items-center px-3 gap-2 flex-shrink-0">
          <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
            <Bot size={10} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="h-1.5 w-12 bg-white/40 rounded-full mb-0.5"></div>
          </div>
          <div className="w-8 h-1.5 bg-white/20 rounded-full"></div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-3 space-y-3 bg-[#E5DDD5] relative overflow-hidden flex flex-col justify-end pb-4 font-sans">
          {/* Background Pattern inside phone */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <AnimatePresence>
            {/* User Message */}
            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                className="self-end max-w-[85%] relative z-10"
              >
                <div className="bg-[#DCF8C6] p-2 rounded-lg rounded-tr-none shadow-sm text-2xs text-gray-800 leading-tight">
                  I need to reschedule my appointment 📅
                  <p className="text-2xs text-gray-500 text-right mt-1">10:42 AM</p>
                </div>
              </motion.div>
            )}

            {/* Typing Indicator */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="self-start max-w-[85%] relative z-10"
              >
                <div className="bg-white p-2 rounded-lg rounded-tl-none shadow-sm flex gap-1 items-center">
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                </div>
              </motion.div>
            )}

            {/* Bot Reply */}
            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                className="self-start max-w-[85%] relative z-10"
              >
                <div className="bg-white p-2 rounded-lg rounded-tl-none shadow-sm text-2xs text-gray-800 leading-tight">
                  <div>Confirming Saturday at 2 PM? ✅</div>
                  <div className="mt-2 bg-[#F0F2F5] rounded p-1.5 text-center text-blue-500 font-medium border border-gray-100">
                    Confirm
                  </div>
                  <p className="text-2xs text-gray-400 text-right mt-1">10:42 AM</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export const WebsiteWidgetVisual = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loop = async () => {
      while (true) {
        await new Promise((r) => setTimeout(r, 1000));
        setIsOpen(true);
        await new Promise((r) => setTimeout(r, 4000));
        setIsOpen(false);
        await new Promise((r) => setTimeout(r, 1000));
      }
    };
    loop();
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-indigo-50/50 to-purple-50/50 flex items-center justify-center p-6 relative overflow-hidden group">
      {/* Pattern */}
      <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>

      {/* Browser Window Mockup */}
      <div className="w-full max-w-[280px] bg-white rounded-lg shadow-xl border border-gray-200/60 overflow-hidden relative h-full z-10 transition-transform duration-500 group-hover:scale-[1.02]">
        {/* Browser Header */}
        <div className="h-6 bg-gray-50/80 backdrop-blur-sm border-b border-gray-100 flex items-center px-3 gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#ff5f56]"></div>
          <div className="w-2 h-2 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-2 h-2 rounded-full bg-[#27c93f]"></div>
        </div>

        {/* Website Content Skeleton */}
        <div className="p-4 space-y-3 opacity-40">
          <div className="h-4 bg-slate-200 rounded w-1/3 animate-pulse"></div>
          <div className="h-2 bg-slate-100 rounded w-full animate-pulse delay-75"></div>
          <div className="h-2 bg-slate-100 rounded w-5/6 animate-pulse delay-100"></div>
          <div className="flex gap-2 mt-4">
            <div className="w-1/2 h-20 bg-slate-50 rounded border border-slate-100 animate-pulse delay-150"></div>
            <div className="w-1/2 h-20 bg-slate-50 rounded border border-slate-100 animate-pulse delay-200"></div>
          </div>
        </div>

        {/* Widget Overlay */}
        <div className="absolute bottom-3 right-3 flex flex-col items-end gap-2 z-20">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9, transformOrigin: "bottom right" }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="bg-white p-3 rounded-lg rounded-br-none shadow-xl border border-purple-100 mb-1 w-48 font-sans"
              >
                {/* Chat Header */}
                <div className="flex items-center gap-2 border-b border-gray-50 pb-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                    <Bot size={12} className="text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xs font-semibold text-gray-800">Support Agent</div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                      <div className="text-2xs text-gray-400">Online</div>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="space-y-2">
                  <div className="bg-gray-50 p-2 rounded-lg rounded-tl-none text-2xs text-gray-600 leading-snug">
                    Hi there! How can I help? 👋
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-purple-600 text-white p-2 rounded-lg rounded-tr-none text-2xs ml-auto w-max max-w-[80%] leading-snug shadow-sm"
                  >
                    Pricing for teams?
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="bg-gray-50 p-2 rounded-lg rounded-tl-none text-2xs text-gray-600 leading-snug"
                  >
                    Starts at $29/mo per seat! 🚀
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Widget Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 bg-purple-600 rounded-full shadow-lg flex items-center justify-center text-white relative hover:bg-purple-700 transition-colors z-30"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageCircle size={20} />
                </motion.div>
              )}
            </AnimatePresence>
            {/* Notification Dot */}
            {!isOpen && (
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};