"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Shield, Award, Zap } from "lucide-react";

const trustSignals = [
  { icon: Shield, label: "SOC 2 Compliant", detail: "Enterprise-grade security" },
  { icon: Star, label: "4.8/5 Rating", detail: "Across customer reviews" },
  { icon: Award, label: "Top Rated", detail: "AI support platform" },
  { icon: Zap, label: "99.9% Uptime", detail: "Reliable infrastructure" },
];

const Certificate = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f8f9ff_50%,#ffffff_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(49,94,234,0.04),transparent_62%)]" />

      <div className="relative mx-auto max-w-[1240px] px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left: Copy */}
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[34px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#221f1b] md:text-[48px]">
              The best AI support platform,{" "}
              <span className="text-[#315EEA]">
                at an (almost) unbelievable value
              </span>
            </h2>

            <p className="max-w-[540px] text-[16px] leading-[1.7] text-[#6d665d] md:text-[17px]">
              You don&apos;t need to spend a fortune to deliver stellar service.
              Replace Zendesk, Freshdesk, Intercom, and other point solutions
              with Verly to cut costs and get better results.
            </p>

            {/* Trust signals grid */}
            <div className="grid grid-cols-2 gap-3">
              {trustSignals.map((signal, i) => (
                <motion.div
                  key={signal.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-center gap-3 rounded-2xl border border-[#e4e8f3] bg-[#f8f9fd] px-4 py-3.5 shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#315EEA]/10 text-[#315EEA]">
                    <signal.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[0.9rem] font-semibold text-[#1e1c19]">{signal.label}</div>
                    <div className="text-[0.75rem] text-[#8b93ab]">{signal.detail}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#315EEA] px-8 py-4 text-[17px] font-bold text-white shadow-[0_12px_30px_rgba(49,94,234,0.22)] transition-all duration-300 hover:bg-[#2850d0] hover:shadow-[0_16px_36px_rgba(49,94,234,0.30)] hover:-translate-y-0.5"
              >
                Start free trial
              </Link>
              <Link
                href="https://calendly.com/rdhakad2002/30min"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-4 text-[17px] font-medium text-[#111827] transition-colors hover:bg-gray-50"
              >
                Book a demo
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Love Wall Visual */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src="/love_wall.png"
              alt="Customer love wall with reviews, ratings, and trust signals"
              width={520}
              height={520}
              className="w-full max-w-[520px] h-auto rounded-3xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Certificate;
