"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Headphones, MessageSquareText, PhoneCall } from "lucide-react";
import { WHY_VERLY_PAGE } from "./why-verly-content";

const iconMap = {
  "omnichannel-loop": MessageSquareText,
  "shared-inbox": Headphones,
  "ai-resolution": Bot,
} as const;

const workspaceImageClassMap = {
  "customer-support": "object-contain object-center scale-[1.02] md:scale-[1.05]",
  "always-on-voice": "object-contain object-center scale-[1.04] md:scale-[1.08]",
  "knowledge-control": "object-contain object-center scale-[1.01] md:scale-[1.04]",
} as const;

export default function WhyVerlyShowcase() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveTab((current) => (current + 1) % WHY_VERLY_PAGE.showcase.workspaceTabs.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  const currentTab = WHY_VERLY_PAGE.showcase.workspaceTabs[activeTab];

  return (
    <>

      <section className="relative overflow-hidden bg-[#fbfbfd] py-16 text-[#17191f] md:py-22">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(80,118,255,0.08),transparent_22%),linear-gradient(180deg,#ffffff_0%,#f7f8fc_100%)]" />
      <div className="relative mx-auto w-[95%] max-w-[1240px] md:w-[88%] lg:w-[82%]">
        <div className="mx-auto max-w-[920px] text-center">
          <h2 className="text-balance text-[38px] font-semibold leading-[1.04] tracking-[-0.05em] text-[#101828] md:text-[58px]">
            {WHY_VERLY_PAGE.showcase.title}{" "}
            <span className="text-[#4b78ff]">{WHY_VERLY_PAGE.showcase.accent}</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-[1.06fr_0.94fr]">
          {WHY_VERLY_PAGE.showcase.cards.map((card) => {
            const Icon = iconMap[card.id as keyof typeof iconMap] ?? MessageSquareText;
            const featured = Boolean(card.featured);

            return (
              <article
                key={card.id}
                className={`group overflow-hidden rounded-[30px] border border-[#e5e8f0] bg-white shadow-[0_22px_55px_rgba(15,23,42,0.06)] ${
                  featured ? "md:col-span-2 xl:col-span-2" : ""
                }`}
              >
                {featured ? (
                  <div className="grid h-full gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="flex flex-col justify-between p-7 md:p-8">
                      <div>
                        <div className="inline-flex items-center gap-2 text-[15px] font-medium text-[#4b78ff]">
                          <Icon className="h-4 w-4" />
                          {card.eyebrow}
                        </div>
                        <h3 className="mt-4 max-w-[18ch] text-[28px] font-semibold leading-[1.08] tracking-[-0.04em] text-[#101828] md:text-[36px]">
                          {card.title}
                        </h3>
                        <p className="mt-5 max-w-[56ch] text-[16px] leading-8 text-[#667085]">
                          {card.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        className="mt-8 inline-flex w-max items-center gap-2 rounded-full bg-[linear-gradient(180deg,#6ea0ff_0%,#4b78ff_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(75,120,255,0.28)] transition-transform duration-300 hover:-translate-y-0.5"
                      >
                        {card.cta}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="relative min-h-[280px] border-t border-[#edf0f5] lg:min-h-full lg:border-l lg:border-t-0">
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(240,244,255,0.76)_0%,rgba(248,250,255,0.98)_100%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(75,120,255,0.12),transparent_28%)]" />
                      <div className="relative flex h-full items-end justify-end pl-6 pt-6 md:pl-10 md:pt-10">
                        <div className="relative h-[240px] w-full max-w-[560px] overflow-hidden rounded-tl-[24px] border border-b-0 border-r-0 border-white/80 bg-white shadow-[0_-10px_40px_rgba(15,23,42,0.06)] md:h-[320px]">
                          <Image
                            src={card.image}
                            alt={card.imageAlt}
                            fill
                            sizes="(max-width: 1280px) 100vw, 560px"
                            className="object-cover object-[left_top] transition-transform duration-700 group-hover:scale-[1.02]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full flex-col">
                    <div className="flex-none p-7 pb-6 md:p-8 md:pb-7">
                      <div className="inline-flex items-center gap-2 text-[15px] font-medium text-[#4b78ff]">
                        <Icon className="h-4 w-4" />
                        {card.eyebrow}
                      </div>
                      <h3 className="mt-4 max-w-[18ch] text-[26px] font-semibold leading-[1.1] tracking-[-0.04em] text-[#101828] md:text-[30px]">
                        {card.title}
                      </h3>
                    </div>

                    <div className="relative flex-1 w-full border-y border-[#edf0f5] bg-[linear-gradient(180deg,rgba(240,244,255,0.76)_0%,rgba(248,250,255,0.98)_100%)]">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(75,120,255,0.12),transparent_28%)]" />
                      <div className="relative w-full aspect-[16/10]">
                        <Image
                          src={card.image}
                          alt={card.imageAlt}
                          fill
                          sizes="(max-width: 1280px) 100vw, 600px"
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                      </div>
                    </div>

                    <div className="flex-none p-7 pt-5 md:p-8 md:pt-6">
                      <p className="text-[15.5px] leading-relaxed text-[#667085]">
                        {card.description}
                      </p>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-14">
          <div className="mx-auto max-w-[920px] text-center">
            <h3 className="text-balance text-[34px] font-semibold leading-[1.08] tracking-[-0.05em] text-[#101828] md:text-[56px]">
              {WHY_VERLY_PAGE.showcase.workspaceTitle}{" "}
              <span className="text-[#4b78ff]">{WHY_VERLY_PAGE.showcase.workspaceAccent}</span>
            </h3>
          </div>

          <div className="mt-10 rounded-[32px] border border-[#e5e8f0] bg-white p-3 shadow-[0_28px_60px_rgba(15,23,42,0.08)] md:p-5">
            <div className="grid gap-3 md:grid-cols-3">
              {WHY_VERLY_PAGE.showcase.workspaceTabs.map((tab, index) => {
                const isActive = index === activeTab;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(index)}
                    className={`rounded-[20px] border px-5 py-5 text-left transition-all ${
                      isActive
                        ? "border-[#7da2ff] bg-[#f5f8ff] shadow-[inset_0_0_0_1px_rgba(75,120,255,0.16)]"
                        : "border-[#edf0f5] bg-[#fbfcff] hover:border-[#dfe5f2] hover:bg-white"
                    }`}
                  >
                    <div className="text-[18px] font-semibold tracking-[-0.03em] text-[#101828]">
                      {tab.title}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[#667085]">{tab.summary}</p>
                    <div className="mt-4 h-[3px] rounded-full bg-[#dce6ff]">
                      <div
                        className={`h-full rounded-full bg-[#4b78ff] transition-all duration-300 ${
                          isActive ? "w-[55%]" : "w-0"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 overflow-hidden rounded-[28px] border border-[#e7eaf2] bg-[linear-gradient(180deg,#f8fafe_0%,#eef4ff_100%)]">
              <div className="border-b border-[#e8edf6] bg-white/70 px-5 py-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a8599]">
                      Live workspace
                    </div>
                    <div className="mt-1 text-[18px] font-semibold tracking-[-0.03em] text-[#101828]">
                      {currentTab.title}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-[#dbe4ff] bg-[#eef4ff] px-3 py-1.5 text-xs font-semibold text-[#4b78ff]">
                    <PhoneCall className="h-3.5 w-3.5" />
                    Omnichannel preview
                  </div>
                </div>
              </div>

              <div className="relative aspect-[16/8.7] w-full overflow-hidden bg-[radial-gradient(circle_at_top,rgba(88,128,255,0.12),transparent_26%),linear-gradient(180deg,#f8fbff_0%,#eff4ff_100%)]">
                <div className="absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(255,255,255,0))]" />
                {WHY_VERLY_PAGE.showcase.workspaceTabs.map((tab, index) => {
                  const isActive = index === activeTab;
                  const imageClass =
                    workspaceImageClassMap[tab.id as keyof typeof workspaceImageClassMap] ??
                    "object-contain object-center";

                  return (
                    <motion.div
                      key={tab.id}
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : 16,
                        scale: isActive ? 1 : 0.985,
                      }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className={`absolute inset-0 p-4 md:p-6 ${isActive ? "pointer-events-auto" : "pointer-events-none"}`}
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-[22px] border border-white/80 bg-white shadow-[0_20px_46px_rgba(73,92,148,0.14)]">
                        <Image
                          src={tab.image}
                          alt={tab.imageAlt}
                          fill
                          sizes="(max-width: 1280px) 100vw, 1200px"
                          className={`${imageClass} transition-transform duration-500`}
                          priority
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
