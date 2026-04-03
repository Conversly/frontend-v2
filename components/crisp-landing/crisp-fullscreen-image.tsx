"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Link from "next/link";

export default function CrispFullscreenImage() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0f172a]">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="h-full min-h-screen w-full object-cover object-center"
      >
        <source src="/crisp-hero.webm" type="video/webm" />
      </video>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.4)_0%,rgba(15,23,42,0.06)_38%,rgba(15,23,42,0.5)_100%)]" />

      {/* Center content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center"
        >
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-transform duration-300 hover:scale-110">
            <Play className="h-8 w-8 ml-1 text-white" fill="currentColor" />
          </div>
          <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] text-white md:text-[48px]">
            See Verly in action
          </h2>
          <p className="mx-auto mt-4 max-w-[500px] text-[16px] leading-[1.7] text-white/70 md:text-[18px]">
            Watch how teams resolve support conversations 3x faster with AI + human handoff.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-[15px] font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
          >
            Start free trial
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
