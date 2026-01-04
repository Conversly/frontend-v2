'use client';
import React from 'react';
import { Phone, MessageCircle, Bot, User, Mic } from 'lucide-react';

export const VoiceAgentVisual = () => (
  <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
    {/* Abstract background elements */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>

    {/* Chat bubbles container */}
    <div className="w-full max-w-[300px] flex justify-between mb-3 px-2 z-10">
      {/* AI Agent bubbles (left side) */}
      <div className="flex flex-col gap-1.5 items-start max-w-[100px]">
        <div 
          className="bg-white px-2.5 py-1.5 rounded-xl rounded-bl-sm shadow-sm border border-blue-100 text-[9px] text-gray-700 opacity-0 animate-[fadeSlideIn_0.4s_ease-out_0.5s_forwards]"
        >
          Hi! How can I help?
        </div>
        <div 
          className="bg-white px-2.5 py-1.5 rounded-xl rounded-bl-sm shadow-sm border border-blue-100 text-[9px] text-gray-700 opacity-0 animate-[fadeSlideIn_0.4s_ease-out_2.5s_forwards]"
        >
          Let me check that for you...
        </div>
      </div>

      {/* Caller bubbles (right side) */}
      <div className="flex flex-col gap-1.5 items-end max-w-[100px]">
        <div 
          className="bg-indigo-500 px-2.5 py-1.5 rounded-xl rounded-br-sm shadow-sm text-[9px] text-white opacity-0 animate-[fadeSlideIn_0.4s_ease-out_1.5s_forwards]"
        >
          I need help with my order
        </div>
        <div 
          className="bg-indigo-500 px-2.5 py-1.5 rounded-xl rounded-br-sm shadow-sm text-[9px] text-white opacity-0 animate-[fadeSlideIn_0.4s_ease-out_3.5s_forwards]"
        >
          Order #12345
        </div>
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
        <span className="text-[8px] text-gray-500 text-center block mt-1">AI Agent</span>
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
        <span className="text-[8px] text-gray-500 text-center block mt-1">Caller</span>
      </div>
    </div>
    
    {/* Connection line */}
    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-10 pointer-events-none" style={{ zIndex: 0 }}>
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#E0E7FF" strokeWidth="2" strokeDasharray="6 4" />
    </svg>

    {/* Keyframe animation */}
    <style jsx>{`
      @keyframes fadeSlideIn {
        0% {
          opacity: 0;
          transform: translateY(8px) scale(0.95);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
    `}</style>
  </div>
);

export const WhatsAppVisual = () => (
  <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4 relative overflow-hidden">
     {/* Phone Mockup */}
     <div className="w-48 bg-white rounded-[2rem] shadow-sm border border-gray-200 relative overflow-hidden h-full max-h-[220px] flex flex-col">
        {/* Status Bar */}
        <div className="h-6 bg-gray-100 flex items-center justify-center gap-1 border-b border-gray-100 flex-shrink-0">
             <div className="w-16 h-3 bg-black rounded-full opacity-10"></div>
        </div>

        {/* Chat Area */}
        <div className="p-3 space-y-3 bg-[#E5DDD5]/20 flex-grow overflow-hidden">
            {/* Bot Message */}
            <div className="flex justify-start">
                <div className="bg-white p-2 rounded-lg rounded-tl-none shadow-sm max-w-[85%] text-[10px] text-gray-800 border border-gray-100">
                    <p className="font-semibold text-green-600 mb-0.5 text-[9px]">Support Bot</p>
                    Help you order your order? 📦
                    <p className="text-[8px] text-gray-400 text-right mt-1">10:42 AM</p>
                </div>
            </div>

            {/* User Message */}
            <div className="flex justify-end">
                <div className="bg-[#DCF8C6] p-2 rounded-lg rounded-tr-none shadow-sm max-w-[85%] text-[10px] text-gray-800 border border-green-100">
                    Yes, track #1234
                    <p className="text-[8px] text-gray-500 text-right mt-1">10:43 AM</p>
                </div>
            </div>
            
             {/* Bot Reply with Button */}
             <div className="flex justify-start animate-in slide-in-from-bottom-2 fade-in duration-500">
                <div className="bg-white p-2 rounded-lg rounded-tl-none shadow-sm max-w-[85%] text-[10px] text-gray-800 border border-gray-100">
                    It's out for delivery! 🚚
                    <div className="mt-2 pt-2 border-t border-gray-100 text-center text-blue-500 font-medium">
                        View Map
                    </div>
                </div>
            </div>
        </div>
     </div>
  </div>
);

export const WebsiteWidgetVisual = () => (
  <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-6 relative">
     {/* Browser Window Mockup */}
     <div className="w-full max-w-[280px] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative h-[180px]">
        {/* Browser Header */}
        <div className="h-6 bg-gray-50 border-b border-gray-100 flex items-center px-3 gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-300"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-300"></div>
            <div className="w-2 h-2 rounded-full bg-green-300"></div>
        </div>
        
        {/* Website Content Skeleton */}
        <div className="p-4 space-y-3 opacity-30">
             <div className="h-4 bg-gray-200 rounded w-1/3"></div>
             <div className="h-2 bg-gray-200 rounded w-full"></div>
             <div className="h-2 bg-gray-200 rounded w-5/6"></div>
             <div className="flex gap-2 mt-4">
                 <div className="w-1/2 h-20 bg-gray-100 rounded"></div>
                 <div className="w-1/2 h-20 bg-gray-100 rounded"></div>
             </div>
        </div>

        {/* Widget Overlay */}
        <div className="absolute bottom-3 right-3 flex flex-col items-end gap-2 z-10">
             {/* Chat Bubble */}
             <div className="bg-white p-2.5 rounded-xl rounded-br-none shadow-sm border border-gray-200 mb-1 animate-bounce">
                <div className="flex items-center gap-2">
                     <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                        <Bot size={14} className="text-purple-600"/>
                     </div>
                     <div className="space-y-1">
                        <div className="h-1.5 w-20 bg-gray-200 rounded-full"></div>
                        <div className="h-1.5 w-14 bg-gray-100 rounded-full"></div>
                     </div>
                </div>
             </div>
             {/* Widget Toggle */}
             <div className="w-10 h-10 bg-purple-600 rounded-full shadow-sm flex items-center justify-center text-white">
                <MessageCircle size={20} />
             </div>
        </div>
     </div>
  </div>
);