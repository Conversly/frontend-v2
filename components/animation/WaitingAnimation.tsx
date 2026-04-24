"use client";

import { useEffect, useRef, useState } from "react";

type Speaker = "bot" | "usr";

type ScriptMessage = {
  s: Speaker;
  m: string;
};

const BASE_CONVO: ScriptMessage[] = [
  { s: "usr", m: "Hey, what are your business hours?" },
  { s: "bot", m: "We are open Monday to Saturday, 9 AM to 8 PM." },
  { s: "usr", m: "Nice. Do you also support WhatsApp?" },
  { s: "bot", m: "Yes, we support website chat and WhatsApp both." },
  { s: "usr", m: "Can I get help with pricing plans?" },
  { s: "bot", m: "Of course. I can explain every plan in simple terms." },
  { s: "usr", m: "How fast do you usually reply?" },
  { s: "bot", m: "Usually in under a second for common questions." },
  { s: "usr", m: "Can you connect me to a human if needed?" },
  { s: "bot", m: "Absolutely. I can hand over to your team anytime." },
] as const;

// Repeat the same scripted chat to keep animation running ~2-3 minutes.
const CHAT_SCRIPT: ScriptMessage[] = Array.from({ length: 7 }).flatMap(() => BASE_CONVO);

const HINTS = [
  "Answering your customers 24 hours a day",
  "Never misses a single question",
  "Works while you sleep",
  "Replies in under one second",
  "Your best team member - always on",
] as const;

const MAX_BUBBLES = 120;
const HINT_ROTATION_MS = 6000;
const CONVO_START_DELAY_MS = 1000;
const BOT_TYPING_MS = 950;
const POST_TYPING_PAUSE_MS = 0;
const CONVO_LOOP_PAUSE_MS = 1500;
const MIN_MESSAGE_GAP_MS = 1000;
const MAX_MESSAGE_GAP_MS = 2000;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  color: string;
};

type Bubble = {
  id: number;
  s: "bot" | "usr";
  m: string;
};

function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function drawBot(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  isBlinking: boolean,
  isTalking: boolean,
  talkPhase: number
) {
  ctx.save();
  ctx.translate(cx, cy);

  ctx.fillStyle = "rgba(55,138,221,0.1)";
  ctx.beginPath();
  ctx.arc(0, 0, 52, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(55,138,221,0.18)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, 64, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#1e2240";
  drawRoundRect(ctx, -34, -32, 68, 64, 14);
  ctx.fill();
  ctx.strokeStyle = "rgba(55,138,221,0.5)";
  ctx.lineWidth = 1.5;
  drawRoundRect(ctx, -34, -32, 68, 64, 14);
  ctx.stroke();

  const eyeHeight = isBlinking ? 1.5 : 9;
  const eyeOffsetY = isBlinking ? (9 - eyeHeight) / 2 : 0;
  const eyePositions: [number, number][] = [
    [-12, -14],
    [12, -14],
  ];

  eyePositions.forEach(([ex, ey]) => {
    ctx.fillStyle = "#378ADD";
    ctx.beginPath();
    ctx.ellipse(ex, ey + eyeOffsetY, 5, eyeHeight / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    if (!isBlinking) {
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(ex + 1.5, ey - 2, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  const mouthH = isTalking ? 3 + Math.max(0, Math.sin(talkPhase)) * 5 : 3;
  ctx.fillStyle = isTalking ? "rgba(55,138,221,0.55)" : "rgba(55,138,221,0.25)";
  ctx.beginPath();
  ctx.ellipse(0, 13, 9, mouthH, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#378ADD";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = "#1a1f3a";
  [-38, 38].forEach((ex) => {
    ctx.beginPath();
    ctx.ellipse(ex, 0, 5, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(55,138,221,0.35)";
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  if (isTalking) {
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = `rgba(55,138,221,${0.4 - i * 0.12})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let x = -40; x <= 40; x += 2) {
        const y = 28 + i * 10 + Math.sin(x * 0.13 + talkPhase + i) * (3 - i);
        if (x === -40) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }
  }

  ctx.restore();
}

function drawParticles(ctx: CanvasRenderingContext2D, particles: Particle[], t: number) {
  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > 720) p.vx *= -1;
    if (p.y < 0 || p.y > 220) p.vy *= -1;
    ctx.globalAlpha = p.alpha * (0.6 + 0.4 * Math.sin(t + p.x * 0.01));
    ctx.fillStyle = `rgb(${p.color})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  });
}

function drawConnectionLines(ctx: CanvasRenderingContext2D, t: number) {
  const pts = [
    { x: 190, y: 35 },
    { x: 230, y: 70 },
    { x: 200, y: 115 },
    { x: 235, y: 152 },
    { x: 188, y: 192 },
  ];

  pts.forEach((p, i) => {
    const nx = pts[(i + 1) % pts.length];
    const progress = Math.sin(t * 0.5 + i) * 0.5 + 0.5;

    ctx.strokeStyle = "rgba(55,138,221,0.13)";
    ctx.lineWidth = 0.8;
    ctx.setLineDash([3, 5]);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(nx.x, nx.y);
    ctx.stroke();
    ctx.setLineDash([]);

    const mx = p.x + (nx.x - p.x) * progress;
    const my = p.y + (nx.y - p.y) * progress;
    ctx.fillStyle = "rgba(55,138,221,0.5)";
    ctx.beginPath();
    ctx.arc(mx, my, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(55,138,221,0.18)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawFloatingWords(ctx: CanvasRenderingContext2D, t: number) {
  const words = [
    { w: "Hello!", x: 555, y: 45, d: 0 },
    { w: "How can I help?", x: 490, y: 80, d: 1.5 },
    { w: "Sure!", x: 560, y: 120, d: 3 },
    { w: "Great!", x: 495, y: 160, d: 4.5 },
    { w: "Anytime!", x: 550, y: 198, d: 6 },
  ];

  words.forEach(({ w, x, y, d }) => {
    ctx.globalAlpha = 0.12 + 0.1 * Math.sin(t * 0.6 + d);
    ctx.fillStyle = "#85B7EB";
    ctx.font = "11px sans-serif";
    ctx.fillText(w, x + Math.sin(t * 0.3 + d) * 2, y + Math.cos(t * 0.4 + d) * 2);
    ctx.globalAlpha = 1;
  });
}

export default function WaitingAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const chatLoopStartedRef = useRef(false);
  const timersRef = useRef<Array<ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>>>([]);

  const [hint, setHint] = useState<string>(HINTS[0]);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rawCtx = canvas.getContext("2d");
    if (!rawCtx) return;
    const ctx: CanvasRenderingContext2D = rawCtx;

    const W = 720;
    const H = 220;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const particles: Particle[] = Array.from({ length: 24 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2 + 1,
      alpha: Math.random() * 0.35 + 0.1,
      color: Math.random() > 0.5 ? "55,138,221" : "127,119,221",
    }));

    let t = 0;
    let talkPhase = 0;
    let blinkTimer = 0;
    let isBlinking = false;
    let talkTimer = 0;
    let isTalking = false;

    function loop() {
      t += 0.025;
      talkTimer++;
      blinkTimer++;

      if (talkTimer > 60) {
        isTalking = !isTalking;
        talkTimer = Math.random() * 30;
      }
      if (!isBlinking && blinkTimer > 90 + Math.random() * 60) {
        isBlinking = true;
        blinkTimer = 0;
      }
      if (isBlinking && blinkTimer > 6) {
        isBlinking = false;
        blinkTimer = 0;
      }
      if (isTalking) {
        talkPhase += 0.18;
      }

      const botY = Math.sin(t * 0.8) * 4;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#0e0e1a";
      ctx.beginPath();
      ctx.rect(0, 0, W, H);
      ctx.fill();

      drawParticles(ctx, particles, t);
      drawConnectionLines(ctx, t);
      drawFloatingWords(ctx, t);
      drawBot(ctx, W / 2, H / 2 + botY, isBlinking, isTalking, talkPhase);

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    let idx = 0;
    const id = setInterval(() => {
      idx = (idx + 1) % HINTS.length;
      setHint(HINTS[idx]);
    }, HINT_ROTATION_MS);
    timersRef.current.push(id);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (chatLoopStartedRef.current) return;
    chatLoopStartedRef.current = true;

    let cancelled = false;
    let bubbleId = 0;
    const script = CHAT_SCRIPT;
    const randomGap = () =>
      MIN_MESSAGE_GAP_MS +
      Math.floor(Math.random() * (MAX_MESSAGE_GAP_MS - MIN_MESSAGE_GAP_MS + 1));

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(resolve, ms);
        timersRef.current.push(id);
      });

    async function runLoop(): Promise<void> {
      while (!cancelled) {
        setShowTyping(false);
        await sleep(CONVO_START_DELAY_MS);

        for (const msg of script) {
          if (cancelled) return;

          if (msg.s === "bot") {
            setShowTyping(true);
            await sleep(BOT_TYPING_MS);
          }

          setBubbles((prev) => {
            const trimmed = prev.length >= MAX_BUBBLES ? prev.slice(1) : prev;
            return [...trimmed, { id: bubbleId++, s: msg.s, m: msg.m }];
          });

          if (msg.s === "bot") {
            if (POST_TYPING_PAUSE_MS > 0) {
              await sleep(POST_TYPING_PAUSE_MS);
            }
            setShowTyping(false);
          }

          await sleep(randomGap());
        }

        if (cancelled) return;
        await sleep(CONVO_LOOP_PAUSE_MS);
      }
    }

    void runLoop();

    return () => {
      cancelled = true;
      chatLoopStartedRef.current = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => {
        clearTimeout(id);
        clearInterval(id);
      });
      timersRef.current = [];
    };
  }, []);

  return (
    <div className="flex h-full flex-col items-center gap-5 rounded-2xl bg-[#0e0e1a] p-6">
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#97C459]" />
        <span className="text-xs text-white/55">Your assistant is being built right now</span>
      </div>

      <div className="w-full max-w-sm">
        <canvas ref={canvasRef} width={720} height={220} className="w-full rounded-xl" />
      </div>

      <div className="flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#13131f]">
        <div className="flex shrink-0 items-center gap-2.5 border-b border-white/[0.07] bg-[#1a1a2e] px-3.5 py-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#378ADD] to-[#7F77DD]">
            <BotIcon />
          </div>
          <div>
            <p className="text-xs font-medium text-white/85">Verly Assistant</p>
            <p className="text-[10px] text-[#97C459]">● Online now</p>
          </div>
        </div>

        <div className="relative flex h-40 flex-col justify-end gap-1.5 overflow-hidden px-3 pb-1.5 pt-3">
          <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-8 bg-gradient-to-b from-[#13131f] to-transparent" />

          {bubbles.map((b) => (
            <div
              key={b.id}
              className={`flex shrink-0 items-end gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                b.s === "usr" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                  b.s === "bot"
                    ? "bg-gradient-to-br from-[#378ADD] to-[#7F77DD]"
                    : "bg-white/10 text-[9px] text-white/60"
                }`}
              >
                {b.s === "bot" ? <BotIcon size={11} /> : "U"}
              </div>
              <div
                className={`max-w-[80%] rounded-xl px-2.5 py-1.5 text-[11px] leading-relaxed text-white ${
                  b.s === "bot" ? "rounded-bl-sm bg-white/[0.09]" : "rounded-br-sm bg-[#378ADD]"
                }`}
              >
                {b.m}
              </div>
            </div>
          ))}

          <div
            className={`flex shrink-0 items-end gap-1.5 transition-opacity duration-200 ${
              showTyping ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={!showTyping}
          >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#378ADD] to-[#7F77DD]">
                <BotIcon size={11} />
              </div>
              <div className="flex items-center gap-1 rounded-xl rounded-bl-sm bg-white/[0.09] px-3 py-2">
                <TypingDot delay={0} />
                <TypingDot delay={180} />
                <TypingDot delay={360} />
              </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 border-t border-white/[0.07] bg-[#0e0e1a] px-3 py-2.5">
          <div className="flex-1 rounded-full border border-white/[0.08] bg-white/5 px-3 py-1.5 text-[11px] text-white/25">
            Ask me anything...
          </div>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#378ADD]">
            <SendIcon />
          </div>
        </div>
      </div>

      <div className="flex w-full max-w-sm items-center justify-between">
        <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#7F77DD]" />
        <p className="text-center text-[11px] text-white/25 transition-all duration-700">{hint}</p>
        <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#378ADD] [animation-delay:1s]" />
      </div>
    </div>
  );
}

function BotIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <circle cx="5" cy="6" r="1.5" fill="white" />
      <circle cx="9" cy="6" r="1.5" fill="white" />
      <path d="M3 9.5C3 9.5 4.5 11 7 11C9.5 11 11 9.5 11 9.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function TypingDot({ delay }: { delay: number }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-white/35"
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}

function SendIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
      <path d="M1 9L9 5L1 1V4.5L6.5 5L1 5.5V9Z" fill="white" />
    </svg>
  );
}
