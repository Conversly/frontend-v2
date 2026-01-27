'use client';
import React from 'react';
import {
  Calendar,
  MapPin,
  DollarSign,
  Star,
  Search,
  MessageSquare,
  Clock,
  FileText,
  Globe,
  File,
  Zap
} from 'lucide-react';

// Custom Actions Visual - workflow connections
export const CustomActionsVisual = () => (
  <div className="w-full h-full bg-gradient-to-br from-orange-50 via-rose-50 to-pink-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
    {/* Sparkle effects */}
    <div className="absolute top-4 right-8 w-1 h-1 bg-orange-300 rounded-full animate-ping" />
    <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-pink-300 rounded-full animate-pulse" />
    <div className="absolute top-1/3 left-4 w-1 h-1 bg-orange-200 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />

    {/* Main flow container */}
    <div className="flex items-center justify-center gap-2 w-full max-w-[280px]">
      {/* Left icons */}
      <div className="flex flex-col gap-3">
        <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-orange-100 flex items-center justify-center animate-[float_3s_ease-in-out_infinite]">
          <Calendar size={18} className="text-orange-500" />
        </div>
        <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-green-100 flex items-center justify-center animate-[float_3s_ease-in-out_infinite_0.5s]">
          <DollarSign size={18} className="text-green-500" />
        </div>
      </div>

      {/* Arrows left */}
      <svg className="w-8 h-20 flex-shrink-0" viewBox="0 0 32 80">
        <path d="M0 20 Q16 20 24 40" stroke="#fdba74" strokeWidth="2" fill="none" strokeDasharray="4 2" className="animate-[dash_2s_linear_infinite]" />
        <path d="M0 60 Q16 60 24 40" stroke="#fdba74" strokeWidth="2" fill="none" strokeDasharray="4 2" className="animate-[dash_2s_linear_infinite_0.5s]" />
        <polygon points="24,40 28,36 28,44" fill="#fdba74" />
      </svg>

      {/* Configure button */}
      <button className="px-4 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-semibold rounded-full shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 transition-all hover:scale-105 whitespace-nowrap">
        Configure
      </button>

      {/* Arrows right */}
      <svg className="w-8 h-20 flex-shrink-0" viewBox="0 0 32 80">
        <path d="M8 40 Q16 20 32 20" stroke="#fdba74" strokeWidth="2" fill="none" strokeDasharray="4 2" className="animate-[dash_2s_linear_infinite_0.3s]" />
        <path d="M8 40 Q16 60 32 60" stroke="#fdba74" strokeWidth="2" fill="none" strokeDasharray="4 2" className="animate-[dash_2s_linear_infinite_0.8s]" />
        <polygon points="8,40 4,36 4,44" fill="#fdba74" />
      </svg>

      {/* Right icons */}
      <div className="flex flex-col gap-3">
        <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-blue-100 flex items-center justify-center animate-[float_3s_ease-in-out_infinite_0.3s]">
          <MapPin size={18} className="text-red-500" />
        </div>
        <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl shadow-sm flex items-center justify-center animate-[float_3s_ease-in-out_infinite_0.7s] text-white text-[10px] font-bold">
          API
        </div>
      </div>
    </div>

    <style jsx>{`
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
      }
      @keyframes dash {
        to { stroke-dashoffset: -12; }
      }
    `}</style>
  </div>
);

// Model Comparison Visual - side by side cards
export const ModelComparisonVisual = () => (
  <div className="w-full h-full bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 flex flex-col items-center justify-center p-3 relative overflow-hidden">
    {/* Sparkles */}
    <div className="absolute top-3 right-6 w-1 h-1 bg-sky-300 rounded-full animate-ping" />
    <div className="absolute bottom-6 left-4 w-1 h-1 bg-indigo-300 rounded-full animate-pulse" />

    {/* Model cards */}
    <div className="flex gap-2 w-full max-w-[240px]">
      {/* GPT Card */}
      <div className="flex-1 bg-white rounded-xl p-2.5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center">
            <span className="text-[8px] font-bold text-sky-600">◇</span>
          </div>
          <span className="text-xs font-semibold text-gray-800">GPT</span>
        </div>
        <div className="flex gap-0.5 mb-2">
          {[1, 2, 3, 4].map(i => <Star key={i} size={10} className="text-yellow-400 fill-yellow-400" />)}
          <Star size={10} className="text-gray-200 fill-gray-200" />
        </div>
        <div className="space-y-1.5">
          <div className="h-1.5 bg-sky-200 rounded-full w-full" />
          <div className="h-1.5 bg-sky-100 rounded-full w-4/5" />
          <div className="h-1.5 bg-sky-50 rounded-full w-3/5" />
        </div>
      </div>

      {/* Llama Card */}
      <div className="flex-1 bg-white rounded-xl p-2.5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center">
            <span className="text-[8px] font-bold text-violet-600">◆</span>
          </div>
          <span className="text-xs font-semibold text-gray-800">Llama</span>
        </div>
        <div className="flex gap-0.5 mb-2">
          {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} className="text-yellow-400 fill-yellow-400" />)}
        </div>
        <div className="space-y-1.5">
          <div className="h-1.5 bg-emerald-200 rounded-full w-full" />
          <div className="h-1.5 bg-emerald-100 rounded-full w-11/12" />
          <div className="h-1.5 bg-red-100 rounded-full w-2/5" />
        </div>
      </div>
    </div>

    {/* Experiment button */}
    <button className="mt-3 px-4 py-1.5 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-[10px] font-semibold rounded-full shadow-md shadow-orange-200 hover:shadow-lg hover:scale-105 transition-all">
      Experiment
    </button>

    {/* Search icon */}
    <div className="absolute bottom-3 right-3 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center shadow-sm">
      <Search size={12} className="text-gray-400" />
    </div>
  </div>
);

// Human Handoff Visual - Enhanced with animations
export const SmartEscalationVisual = () => {
  const [isEscalating, setIsEscalating] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIsEscalating(true);
      setTimeout(() => setIsEscalating(false), 2000);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 flex flex-col items-center justify-center p-3 relative overflow-hidden">
      {/* Sparkles */}
      <div className="absolute top-4 right-4 w-1 h-1 bg-rose-300 rounded-full animate-ping" />
      <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-pink-300 rounded-full animate-pulse" />

      {/* Animated transfer effect */}
      {isEscalating && (
        <>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-rose-300/20 rounded-full animate-ping" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-pink-300/30 rounded-full animate-pulse" />
        </>
      )}

      {/* Rule bubble */}
      <div className="bg-white rounded-2xl rounded-bl-sm px-3 py-1.5 shadow-sm border border-gray-100 text-[9px] text-gray-700 font-medium mb-3 animate-[fadeIn_0.5s_ease-out]">
        Escalate if frustrated &gt;5min
      </div>

      {/* Main content row */}
      <div className="flex items-center gap-3 w-full max-w-[280px]">
        {/* AI Bot */}
        <div className="flex flex-col items-center gap-1">
          <div className={`w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl shadow-sm border border-purple-200 flex items-center justify-center transition-all duration-500 ${isEscalating ? 'scale-95 opacity-70' : 'scale-100'}`}>
            <MessageSquare size={18} className="text-purple-600" />
          </div>
          <span className="text-[8px] text-gray-500 font-medium">AI Bot</span>
        </div>

        {/* Animated Arrow */}
        <div className="flex-1 flex items-center justify-center relative">
          <svg className={`w-12 h-8 transition-all duration-500 ${isEscalating ? 'translate-x-2 opacity-100' : 'translate-x-0 opacity-60'}`} viewBox="0 0 48 32">
            <defs>
              <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <path
              d="M4 16 L36 16 M28 8 L36 16 L28 24"
              stroke="url(#arrowGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isEscalating ? 'animate-[pulse_0.5s_ease-in-out]' : ''}
            />
          </svg>
          {/* Animated data particles */}
          {isEscalating && (
            <>
              <div className="absolute left-1/4 w-1 h-1 bg-rose-400 rounded-full animate-[moveRight_1s_ease-out]" />
              <div className="absolute left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-[moveRight_1s_ease-out_0.2s]" />
            </>
          )}
        </div>

        {/* Human Agent */}
        <div className="flex flex-col items-center gap-1">
          <div className={`w-14 h-16 relative transition-all duration-500 ${isEscalating ? 'scale-110 drop-shadow-lg' : 'scale-100'}`}>
            {/* Human silhouette - Head */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-gradient-to-b from-rose-300 to-rose-400 rounded-full shadow-sm" />
            {/* Body */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-b from-rose-400 to-rose-500 rounded-t-lg rounded-b-sm shadow-md" />
            {/* Earpiece indicator */}
            <div className={`absolute top-1 right-1 w-2 h-3 bg-white rounded-full shadow-sm transition-all duration-300 ${isEscalating ? 'animate-pulse' : ''}`} />
            {/* Active indicator */}
            {isEscalating && (
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            )}
          </div>
          <span className="text-[8px] text-gray-500 font-medium">Human Agent</span>
        </div>
      </div>

      {/* Ticket preview */}
      <div className="mt-3 w-full max-w-[260px]">
        <div className={`bg-white rounded-lg p-2 shadow-sm border border-gray-100 transition-all duration-500 ${isEscalating ? 'border-rose-300 shadow-md' : ''}`}>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
              <FileText size={10} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-[8px] font-medium text-gray-800">Ticket #1234 transferred</p>
              <p className={`text-[7px] transition-colors ${isEscalating ? 'text-rose-500' : 'text-gray-400'}`}>
                {isEscalating ? 'Transferring...' : 'Ready for handoff'}
              </p>
            </div>
            <Clock size={10} className="text-gray-300" />
          </div>
        </div>
      </div>

      {/* Handoff button */}
      <button className={`mt-3 px-5 py-1.5 bg-gradient-to-r from-rose-400 to-pink-500 text-white text-[10px] font-semibold rounded-full shadow-md hover:shadow-lg transition-all ${isEscalating ? 'shadow-rose-300 scale-105' : 'shadow-rose-200'}`}>
        Handoff to Human
      </button>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes moveRight {
          from { left: 25%; opacity: 1; }
          to { left: 75%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// Analytics Visual - charts
export const AnalyticsVisual = () => (
  <div className="w-full h-full bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex flex-col items-center justify-center p-3 relative overflow-hidden">
    {/* Growth arrow */}
    <svg className="absolute top-2 right-4 w-10 h-10" viewBox="0 0 40 40">
      <path d="M8 32 L32 8" stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" />
      <polygon points="32,8 26,10 30,14" fill="#10b981" />
    </svg>

    {/* Chart container */}
    <div className="w-full max-w-[240px] bg-white/60 rounded-xl p-3 backdrop-blur-sm">
      {/* Mini header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-4 h-4 rounded bg-yellow-100 flex items-center justify-center">
          <Zap size={10} className="text-yellow-500" />
        </div>
        <div className="h-1.5 bg-gray-200 rounded w-12" />
        <div className="h-1.5 bg-gray-100 rounded w-8 ml-auto" />
      </div>

      {/* Line chart */}
      <div className="relative h-10 mb-2">
        <svg className="w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
          <path
            d="M0 35 Q20 30 40 28 T80 20 T120 25 T160 15 T200 10"
            stroke="#8b5cf6"
            strokeWidth="2"
            fill="none"
            className="animate-[draw_2s_ease-out_forwards]"
          />
          {/* Dots */}
          {[[40, 28], [80, 20], [120, 25], [160, 15]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="white" stroke="#8b5cf6" strokeWidth="1.5" />
          ))}
        </svg>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-1.5 h-12 px-2">
        {[
          { h: 40, color: 'bg-yellow-300' },
          { h: 55, color: 'bg-orange-300' },
          { h: 45, color: 'bg-pink-300' },
          { h: 70, color: 'bg-purple-300' },
          { h: 85, color: 'bg-violet-400' },
          { h: 75, color: 'bg-indigo-400' },
          { h: 95, color: 'bg-blue-400' },
        ].map((bar, i) => (
          <div
            key={i}
            className={`flex-1 ${bar.color} rounded-t transition-all hover:opacity-80`}
            style={{ height: `${bar.h}%`, animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>

    {/* Search/magnify icon */}
    <div className="absolute bottom-6 right-8 w-8 h-8 bg-white rounded-full shadow-sm border border-sky-100 flex items-center justify-center">
      <div className="w-4 h-4 border-2 border-sky-400 rounded-full relative">
        <div className="absolute -bottom-1 -right-1 w-1.5 h-3 bg-sky-400 rounded-full rotate-45 origin-top" />
      </div>
    </div>

    {/* Optimize button */}
    <button className="mt-3 px-4 py-1.5 bg-gradient-to-r from-emerald-400 to-teal-500 text-white text-[10px] font-semibold rounded-full shadow-md shadow-emerald-200 hover:shadow-lg hover:scale-105 transition-all">
      Optimize Now
    </button>

    <style jsx>{`
      @keyframes draw {
        from { stroke-dasharray: 300; stroke-dashoffset: 300; }
        to { stroke-dasharray: 300; stroke-dashoffset: 0; }
      }
    `}</style>
  </div>
);

// AI Training Visual - data sources hub
export const AITrainingVisual = () => (
  <div className="w-full h-full bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden">
    {/* Center AI hub */}
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-violet-400/20 to-cyan-400/20 blur-xl rounded-full scale-150" />

      {/* AI cube */}
      <div className="relative w-14 h-14 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl shadow-lg flex items-center justify-center z-10">
        <span className="text-white font-bold text-lg">AI</span>
        {/* Data stream effect */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-gradient-to-t from-cyan-400 to-transparent animate-pulse" />
      </div>

      {/* Orbiting data sources */}
      {[
        { icon: <span className="text-[9px] font-bold text-red-600">PDF</span>, bg: 'bg-red-50 border-red-200', angle: 0, dist: 55 },
        { icon: <span className="text-[10px] font-bold text-blue-600">W</span>, bg: 'bg-blue-50 border-blue-200', angle: 60, dist: 60 },
        { icon: <File size={14} className="text-gray-500" />, bg: 'bg-gray-50 border-gray-200', angle: 120, dist: 55 },
        { icon: <Globe size={14} className="text-cyan-600" />, bg: 'bg-cyan-50 border-cyan-200', angle: 180, dist: 60 },
        { icon: <div className="w-3.5 h-3.5 bg-gradient-to-br from-yellow-400 via-green-400 to-blue-400 rounded-sm" />, bg: 'bg-white border-gray-200', angle: 240, dist: 55 },
        { icon: <span className="text-[8px] font-bold text-emerald-600">DOC</span>, bg: 'bg-emerald-50 border-emerald-200', angle: 300, dist: 60 },
      ].map((source, i) => {
        const x = Math.cos((source.angle * Math.PI) / 180) * source.dist;
        const y = Math.sin((source.angle * Math.PI) / 180) * source.dist;
        return (
          <React.Fragment key={i}>
            {/* Connection line */}
            <svg
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <line
                x1="70" y1="70"
                x2={70 + x} y2={70 + y}
                stroke="#a5b4fc"
                strokeWidth="1.5"
                strokeDasharray="3 2"
                className="animate-[dash_1.5s_linear_infinite]"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
              <circle cx={70 + x} cy={70 + y} r="2" fill="#818cf8" />
            </svg>
            {/* Source icon */}
            <div
              className={`absolute w-9 h-9 ${source.bg} rounded-lg border flex items-center justify-center shadow-sm z-10 animate-[float_3s_ease-in-out_infinite]`}
              style={{
                left: `calc(50% + ${x}px - 18px)`,
                top: `calc(50% + ${y}px - 18px)`,
                animationDelay: `${i * 0.3}s`
              }}
            >
              {source.icon}
            </div>
          </React.Fragment>
        );
      })}
    </div>

    <style jsx>{`
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }
      @keyframes dash {
        to { stroke-dashoffset: -10; }
      }
    `}</style>
  </div>
);

