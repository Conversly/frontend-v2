import { ImageResponse } from "next/og";

// Next.js reads these and serves this file as the default site-wide OG image.
// Per-page OG images can still be supplied by placing an opengraph-image.tsx
// in any route segment, which overrides this one.
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Verly — AI customer support for voice, WhatsApp, and web chat";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "Georgia, Times, serif",
          color: "#f6f1e6",
          background: "#04060d",
          backgroundImage: [
            "radial-gradient(circle at 15% 20%, rgba(83,104,255,0.35), transparent 38%)",
            "radial-gradient(circle at 85% 90%, rgba(138,240,190,0.22), transparent 42%)",
            "radial-gradient(circle at 70% 10%, rgba(149,92,244,0.18), transparent 40%)",
            "linear-gradient(180deg, #04060d 0%, #0a0f1d 100%)",
          ].join(","),
        }}
      >
        {/* Subtle grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            opacity: 0.25,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top row — wordmark + channel pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 52,
                height: 52,
                borderRadius: 14,
                background:
                  "linear-gradient(180deg, #7f95ff 0%, #637cff 100%)",
                boxShadow: "0 14px 34px rgba(106,129,255,0.35)",
                fontSize: 26,
                color: "#ffffff",
              }}
            >
              V
            </div>
            Verly
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 20px",
              borderRadius: 999,
              border: "1px solid rgba(138,240,190,0.3)",
              background: "rgba(138,240,190,0.08)",
              color: "#9bf4c8",
              fontFamily: "sans-serif",
              fontSize: 15,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Voice · WhatsApp · Web chat
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            position: "relative",
            maxWidth: 960,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 78,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              color: "#ffffff",
              fontWeight: 400,
            }}
          >
            <span>The AI support platform</span>
            <span style={{ color: "#8ea4ff" }}>
              that actually reduces your queue.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "sans-serif",
              fontSize: 24,
              lineHeight: 1.45,
              color: "rgba(255,255,255,0.62)",
              maxWidth: 820,
              fontWeight: 400,
            }}
          >
            One AI agent across voice, WhatsApp, and web chat — with human
            handoff built in, not bolted on.
          </div>
        </div>

        {/* Bottom row — URL + signal pills */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "sans-serif",
              fontSize: 20,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.02em",
            }}
          >
            verlyai.xyz
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {["Live in 10 minutes", "Voice + WhatsApp + Chat", "SOC 2"].map((pill) => (
              <div
                key={pill}
                style={{
                  display: "flex",
                  padding: "9px 16px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.04)",
                  fontFamily: "sans-serif",
                  fontSize: 15,
                  color: "rgba(255,255,255,0.72)",
                  fontWeight: 500,
                }}
              >
                {pill}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
