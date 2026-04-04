"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Mic, MicOff, PhoneOff, MessageSquare, X } from "lucide-react";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  StartAudio,
  useVoiceAssistant,
  useConnectionState,
  useRoomContext,
  useTranscriptions,
  type TextStreamData,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useGenerateAssistantToken } from "@/services/voice-assistant-service";

const FALLBACK_DEMO_ASSISTANT_ID = "v0ohaa5b2f1xo52csb1hw6pr";

const DEMO_ASSISTANT_ID =
  process.env.NEXT_PUBLIC_VOICE_DEMO_ASSISTANT_ID || FALLBACK_DEMO_ASSISTANT_ID;

const MAX_CALL_MS = 5 * 60 * 1000;

// ─── Original hero waveform bar data ─────────────────────────────────────────
const BAR_HEIGHTS = [
  18, 36, 54, 84, 60, 34, 50, 72, 108, 74, 48, 32, 58, 98, 126, 84, 52, 30,
  44, 70, 102, 80, 48, 34, 64, 106, 78, 56, 38, 68, 112, 76, 54, 34,
];
const ACCENT_CYCLE = [
  "#f7f3e9",
  "#8ddcff",
  "#8af0be",
  "#f3de62",
  "#c28cff",
  "#f28a49",
];

// ─── Waveform — matches original hero exactly ───────────────────────────────
function WaveformBars({ active }: { active: boolean }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative flex h-[240px] w-full items-end justify-center gap-2 overflow-hidden">
      {/* Fade mask so bars dissolve into the glow — same as original hero */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-[linear-gradient(to_top,rgba(4,7,16,0.60),transparent)]" />
      {BAR_HEIGHTS.map((height, index) => (
        <motion.div
          key={`bar-${index}`}
          animate={
            shouldReduceMotion
              ? undefined
              : active
                ? {
                    height: [
                      Math.max(16, height * 0.4),
                      height * 1.1,
                      Math.max(16, height * 0.6),
                    ],
                  }
                : {
                    height: [
                      Math.max(16, height - 10),
                      height,
                      Math.max(16, height - 4),
                    ],
                  }
          }
          transition={{
            duration: active ? 1.0 : 2.2,
            repeat: Infinity,
            repeatType: "mirror",
            delay: index * 0.05,
            ease: "easeInOut",
          }}
          className="flex w-4 flex-col justify-end gap-3"
        >
          {Array.from({
            length: Math.max(2, Math.floor(height / 24)),
          }).map((_, unitIndex) => (
            <span
              key={unitIndex}
              className="block h-3 rounded-full"
              style={{
                backgroundColor:
                  index % 5 === 0 || index % 7 === 0
                    ? ACCENT_CYCLE[
                        (index + unitIndex) % ACCENT_CYCLE.length
                      ]
                    : "#f7f3e9",
                boxShadow:
                  index % 5 === 0 || index % 7 === 0
                    ? `0 0 8px ${ACCENT_CYCLE[(index + unitIndex) % ACCENT_CYCLE.length]}88`
                    : "none",
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Transcript overlay ──────────────────────────────────────────────────────
function TranscriptPanel({ onClose }: { onClose: () => void }) {
  const room = useRoomContext();
  const transcriptions: TextStreamData[] = useTranscriptions();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcriptions]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute inset-x-6 bottom-24 top-6 z-30 flex flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#080d1c]/95 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:inset-x-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
        <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#8af0be]">
          Transcript
        </span>
        <button
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded-full text-[#6b7a96] transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 py-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
      >
        {transcriptions.length === 0 ? (
          <p className="mt-12 text-center text-sm leading-6 text-[#4d5d7a]">
            Start speaking — the conversation will appear here.
          </p>
        ) : (
          <div className="space-y-3">
            {transcriptions.map((t, i) => {
              const isUser =
                t.participantInfo?.identity ===
                room.localParticipant?.identity;
              return (
                <div
                  key={t.streamInfo?.id || i}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-[13px] leading-6 ${
                      isUser
                        ? "bg-[#8af0be]/12 text-[#c8f0d8]"
                        : "bg-white/[0.05] text-[#b8c6e0]"
                    }`}
                  >
                    <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.15em] opacity-40">
                      {isUser ? "You" : "Verly"}
                    </span>
                    {t.text}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Active session (inside LiveKitRoom context) ─────────────────────────────
function ActiveSession({ onDisconnect }: { onDisconnect: () => void }) {
  const room = useRoomContext();
  const connectionState = useConnectionState(room);
  const voiceAssistant = useVoiceAssistant();
  const [isMuted, setIsMuted] = React.useState(false);
  const [showTranscript, setShowTranscript] = React.useState(false);
  const isConnected = connectionState === ConnectionState.Connected;
  const isAgentSpeaking = voiceAssistant.state === "speaking";

  const toggleMute = React.useCallback(() => {
    room.localParticipant.setMicrophoneEnabled(isMuted);
    setIsMuted(!isMuted);
  }, [room, isMuted]);

  return (
    <div className="relative mx-auto flex h-full max-w-[980px] flex-col items-center">
      {/* Status pill — replaces the "TALK TO VERLY" pill position */}
      <div className="relative z-10 mb-4">
        <div className="absolute -inset-[2px] rounded-[999px] bg-gradient-to-r from-[#8af0be]/20 via-[#8ddcff]/15 to-[#8af0be]/20 blur-[6px]" />
        <div className="relative flex items-center gap-4 rounded-[999px] border border-white/[0.10] bg-[#111827]/80 px-6 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.3)] backdrop-blur-sm">
          {/* Live indicator */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8af0be] opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#8af0be]" />
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={
                !isConnected
                  ? "connecting"
                  : isAgentSpeaking
                    ? "speaking"
                    : isMuted
                      ? "muted"
                      : "listening"
              }
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="text-sm font-medium tracking-wide text-[#c8d6f0]"
            >
              {!isConnected
                ? "Connecting..."
                : isAgentSpeaking
                  ? "Verly is speaking"
                  : isMuted
                    ? "Microphone muted"
                    : "Listening..."}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Waveform — fills middle area, same as hero */}
      <div className="relative flex flex-1 w-full items-end">
        <WaveformBars active={isConnected && (isAgentSpeaking || !isMuted)} />
      </div>

      {/* Transcript overlay */}
      <AnimatePresence>
        {showTranscript && (
          <TranscriptPanel onClose={() => setShowTranscript(false)} />
        )}
      </AnimatePresence>

      {/* Control bar — floats above the bottom glow */}
      <div className="relative z-20 flex items-center justify-center gap-4 pb-8 pt-4">
        {/* Transcript toggle */}
        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-200 ${
            showTranscript
              ? "border-[#8af0be]/30 bg-[#8af0be]/15 text-[#8af0be]"
              : "border-white/[0.10] bg-white/[0.04] text-[#8e9fbf] hover:bg-white/[0.08] hover:text-white"
          }`}
        >
          <MessageSquare className="h-[18px] w-[18px]" />
        </button>

        {/* Mute / unmute — larger, central */}
        <button
          onClick={toggleMute}
          className={`flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-200 ${
            isMuted
              ? "border-red-500/40 bg-red-500/20 text-red-400 hover:bg-red-500/30"
              : "border-white/[0.14] bg-white/[0.06] text-[#faf4ea] hover:bg-white/[0.10]"
          }`}
        >
          {isMuted ? (
            <MicOff className="h-5 w-5" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </button>

        {/* End call */}
        <button
          onClick={() => {
            room.disconnect();
            onDisconnect();
          }}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-red-500/30 bg-red-500/20 text-red-400 transition-all duration-200 hover:bg-red-500/35"
        >
          <PhoneOff className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
export function PublicVoiceDemo() {
  const generateToken = useGenerateAssistantToken();
  const [connectionDetails, setConnectionDetails] = React.useState<{
    serverUrl: string;
    participantToken: string;
  } | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Auto-disconnect after 5 min
  React.useEffect(() => {
    if (!connectionDetails) return;
    const t = window.setTimeout(() => {
      setConnectionDetails(null);
      setError("Demo session ended (5 min limit). Click to start again.");
    }, MAX_CALL_MS);
    return () => window.clearTimeout(t);
  }, [connectionDetails]);

  const handleStart = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await generateToken.mutateAsync(DEMO_ASSISTANT_ID);
      setConnectionDetails({
        serverUrl: res.url,
        participantToken: res.accessToken,
      });
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Unable to start demo right now."
      );
    } finally {
      setIsLoading(false);
    }
  }, [generateToken]);

  const handleDisconnect = React.useCallback(() => {
    setConnectionDetails(null);
  }, []);

  // ── Idle state — matches original HeroWaveStage exactly ──
  if (!connectionDetails) {
    return (
      <div className="relative mx-auto flex max-w-[980px] flex-col items-center">
        {/* Eyebrow label */}
        <div className="mb-6 text-[11px] uppercase tracking-[0.34em] text-[#8af0be]">
          Support-first voice workflows
        </div>

        {/* "Talk to Verly" pill — now a clickable button */}
        <button
          onClick={handleStart}
          disabled={isLoading}
          className="group relative z-10 mb-8 cursor-pointer disabled:cursor-wait"
        >
          <div className="absolute -inset-[2px] rounded-[999px] bg-gradient-to-r from-[#8af0be]/30 via-[#8ddcff]/20 to-[#8af0be]/30 blur-[6px] transition-all duration-300 group-hover:from-[#8af0be]/50 group-hover:via-[#8ddcff]/40 group-hover:to-[#8af0be]/50" />
          <div className="relative rounded-[999px] border border-white/[0.14] bg-[#f1ecde] px-7 py-5 shadow-[0_22px_70px_rgba(0,0,0,0.32)] transition-transform duration-200 group-hover:scale-[1.03] group-active:scale-[0.97]">
            <div className="flex items-center gap-6 sm:gap-8">
              <span className="text-[clamp(1rem,2.1vw,1.55rem)] font-medium tracking-[0.18em] text-[#111827]">
                {isLoading ? "CONNECTING..." : "TALK TO VERLY"}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#111827]/12 bg-white/70 text-[#111827] shadow-[0_0_16px_rgba(138,240,190,0.2)]">
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="h-4 w-4 rounded-full border-2 border-[#111827]/20 border-t-[#111827]"
                  />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </span>
            </div>
          </div>
        </button>

        <p className="relative z-10 mb-10 max-w-[560px] text-center text-[0.98rem] leading-7 text-[#b8c6e0] sm:text-[1.02rem]">
          Natural voice experiences for inbound support, fast escalation, and
          customer conversations that stay grounded in your knowledge and
          actions.
        </p>

        {error && (
          <div className="relative z-10 -mt-4 mb-6 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-2 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Animated waveform bars — identical to original hero */}
        <WaveformBars active={false} />
      </div>
    );
  }

  // ── Connected state ──
  return (
    <div className="relative mx-auto flex h-[480px] max-w-[980px] flex-col items-center pt-8">
      <LiveKitRoom
        token={connectionDetails.participantToken}
        serverUrl={connectionDetails.serverUrl}
        connect={true}
        video={false}
        audio={true}
        onDisconnected={handleDisconnect}
        className="flex h-full w-full flex-col"
      >
        <ActiveSession onDisconnect={handleDisconnect} />
        <RoomAudioRenderer />
        <StartAudio label="Start Audio" />
      </LiveKitRoom>
    </div>
  );
}
