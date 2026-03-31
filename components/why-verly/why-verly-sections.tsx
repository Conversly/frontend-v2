import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, ChevronRight, CircleCheckBig, MessageCircleMore, PhoneCall, ShieldCheck, Sparkles } from "lucide-react";
import { WHY_VERLY_PAGE } from "./why-verly-content";

const CONTENT_WIDTH = "mx-auto w-[95%] max-w-[1240px] md:w-[88%] lg:w-[82%]";

export function WhyHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(57,118,255,0.18),transparent_26%),radial-gradient(circle_at_top_right,rgba(252,220,158,0.28),transparent_28%),linear-gradient(180deg,#f7f4ee_0%,#f4efe8_35%,#eef4ff_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(110,129,168,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(110,129,168,0.08)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className={cn(CONTENT_WIDTH, "relative")}>
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]">
          <div className="max-w-[660px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8cfbf] bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7b7468] backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-[#2563eb]" />
              {WHY_VERLY_PAGE.eyebrow}
            </div>

            <h1 className="mt-6 font-[Georgia,Times,'Times_New_Roman',serif] text-[36px] leading-[0.94] tracking-[-0.05em] text-[#181714] md:text-[54px] lg:text-[64px]">
              {WHY_VERLY_PAGE.title}
            </h1>

            <p className="mt-6 max-w-[600px] text-[18px] leading-8 text-[#5f5a51] md:text-[20px]">
              {WHY_VERLY_PAGE.description}
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-13 rounded-full bg-[#111111] px-7 text-base text-white shadow-[0_20px_50px_rgba(17,17,17,0.2)] hover:bg-[#202020]"
              >
                <a
                  href={WHY_VERLY_PAGE.primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {WHY_VERLY_PAGE.primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 rounded-full border-[#d7d5cf] bg-white/70 px-7 text-base text-[#2c2b27] shadow-[0_18px_36px_rgba(58,47,25,0.08)] hover:bg-white"
              >
                <a
                  href={WHY_VERLY_PAGE.secondaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {WHY_VERLY_PAGE.secondaryCta.label}
                </a>
              </Button>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {WHY_VERLY_PAGE.heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[24px] border border-white/80 bg-white/72 px-5 py-5 shadow-[0_20px_45px_rgba(37,99,235,0.08)] backdrop-blur-sm"
                >
                  <div className="text-[24px] font-semibold tracking-[-0.04em] text-[#171717]">
                    {stat.value}
                  </div>
                  <p className="mt-1 text-sm leading-6 text-[#666057]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[520px]">
            <div className="absolute inset-x-6 top-8 h-[430px] rounded-[36px] bg-[linear-gradient(135deg,rgba(37,99,235,0.18),rgba(255,255,255,0.6),rgba(244,201,118,0.24))] blur-3xl" />

            <div className="relative ml-auto h-full max-w-[720px]">
              <div className="absolute -left-3 top-14 rounded-[22px] border border-white/80 bg-white/80 px-4 py-3 shadow-[0_20px_45px_rgba(17,17,17,0.12)] backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e8f0ff] text-[#2563eb]">
                    <MessageCircleMore className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a746a]">Web chat</p>
                    <p className="text-sm font-medium text-[#1f1d19]">Instant answers</p>
                  </div>
                </div>
              </div>

              <div className="absolute right-0 top-0 rounded-[22px] border border-white/80 bg-[#0f172a] px-4 py-3 text-white shadow-[0_24px_55px_rgba(15,23,42,0.18)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white">
                    <PhoneCall className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">Voice AI</p>
                    <p className="text-sm font-medium text-white">Always on coverage</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[36px] border border-white/85 bg-white/80 p-4 shadow-[0_38px_90px_rgba(17,17,17,0.15)] backdrop-blur-md">
                <div className="rounded-[28px] border border-[#dce6fb] bg-[linear-gradient(180deg,#f7faff_0%,#edf3ff_100%)] p-3">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] border border-[#d8e3fb] bg-[linear-gradient(180deg,#eff4ff_0%,#e6eeff_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      poster="/why-verly/featured-omnichannel.png"
                      className="h-full w-full object-cover object-center [filter:contrast(1.08)_saturate(1.06)_brightness(0.98)]"
                    >
                      <source src="/why-verly/why-verly-promo.webm" type="video/webm" />
                    </video>
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_28%)]" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),transparent)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyReasonsIndex() {
  return (
    <section className="bg-[#f7f4ee] pb-16 pt-12 md:pb-24">
      <div className={cn(CONTENT_WIDTH, "grid gap-12 border-y border-[#d7d0c4] py-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]")}>
        <div className="lg:sticky lg:top-32 lg:h-max">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a7468]">
            Why growing teams switch
          </p>
          <h2 className="mt-4 font-[Georgia,Times,'Times_New_Roman',serif] text-[38px] leading-[1.05] tracking-[-0.04em] text-[#1b1814] md:text-[48px]">
            The six reasons buyers keep coming back to Verly
          </h2>
          <p className="mt-6 max-w-[400px] text-[17px] leading-[1.6] text-[#5b564e]">
            Verly is built for resolution, not just deflection. Discover why fast-growing support teams are moving away from legacy inboxes to an AI-native architecture.
          </p>
        </div>

        <div className="flex flex-col gap-12 pb-[30vh]">
          {WHY_VERLY_PAGE.reasons.map((reason, index) => (
            <div
              key={reason.id}
              className="sticky origin-top transition-all duration-500 will-change-transform"
              style={{
                top: `calc(6rem + ${index * 16}px)`,
                zIndex: index + 10,
              }}
            >
              <div className="group relative flex flex-col overflow-hidden rounded-[32px] border border-[#e8e2d6] bg-white p-7 shadow-[0_-12px_40px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 hover:border-[#d7dae0] hover:shadow-[0_-16px_40px_rgba(37,99,235,0.08),0_24px_54px_rgba(37,99,235,0.08)] md:p-10">
                
                {/* Giant elegant background number for creative depth */}
                <div className="pointer-events-none absolute -bottom-12 -right-6 select-none font-[Georgia,Times,'Times_New_Roman',serif] text-[180px] font-bold leading-none tracking-tighter text-[#f4f7ff] transition-transform duration-700 group-hover:scale-105 group-hover:text-[#eef2fc]">
                  {reason.number}
                </div>

                {/* Glowing hover accent line on top edge */}
                <div className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,transparent_0%,#3b82f6_50%,transparent_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Content wrapper relative to stay above background elements */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="relative flex h-13 w-13 shrink-0 items-center justify-center rounded-[16px] bg-white shadow-[0_8px_24px_rgba(37,99,235,0.12)] transition-transform duration-300 group-hover:scale-110">
                      <div className="absolute inset-0 rounded-[16px] bg-[linear-gradient(135deg,#3b82f6_0%,#1d4ed8_100%)] opacity-10" />
                      <div className="absolute inset-0 rounded-[16px] border border-[#3b82f6]/20" />
                      <span className="relative z-10 text-[16px] font-bold text-[#2563eb]">
                        {reason.number}
                      </span>
                    </div>

                    <div className="flex flex-col items-end pt-1 text-right">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8c8577]">
                        {reason.eyebrow}
                      </span>
                      <span className="mt-2 inline-flex rounded-full border border-[#eadbbf] bg-[linear-gradient(135deg,#fff8eb,#fcf2dd)] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#b38531] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                        {reason.metric}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 max-w-[90%] md:max-w-[85%]">
                    <h3 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[26px] font-medium leading-[1.1] tracking-[-0.03em] text-[#1b1814] transition-colors duration-300 group-hover:text-[#0b1b3d] md:text-[30px]">
                      {reason.title}
                    </h3>
                    <p className="mt-4 text-[15.5px] leading-relaxed text-[#5b564e] md:text-[16px]">
                      {reason.description}
                    </p>
                  </div>

                  {/* Horizontal lower half to fill wide space and drastically reduce vertical height */}
                  <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <div className="flex items-center rounded-[22px] border border-[#eef2fc] bg-[linear-gradient(180deg,#ffffff_0%,#f4f7ff_100%)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 group-hover:border-[#dbe6ff] group-hover:bg-[#f0f5ff]">
                      <p className="text-[14.5px] font-semibold leading-[1.65] text-[#1e3aa6]">
                        {reason.highlight}
                      </p>
                    </div>

                    <div className="flex flex-col justify-center">
                      <ul className="space-y-4">
                        {reason.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-4">
                            <div className="mt-1 flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-[#e8f0ff] text-[#2563eb] transition-colors duration-300 group-hover:bg-[#2563eb] group-hover:text-white">
                              <Check className="h-[10px] w-[10px] stroke-[3.5]" />
                            </div>
                            <span className="text-[14.5px] leading-[1.5] text-[#524d45]">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyReasonsGrid() {
  return (
    <section className="bg-[#fcfdfd] py-16 md:py-24">
      <div className={cn(CONTENT_WIDTH, "space-y-8 md:space-y-12")}>
        {WHY_VERLY_PAGE.reasons.map((reason) => (
          <WhyReasonSection
            key={reason.id}
            reason={reason}
          />
        ))}
      </div>
    </section>
  );
}

export function WhyReasonSection({
  reason,
}: {
  reason: (typeof WHY_VERLY_PAGE.reasons)[number];
}) {
  return (
    <section
      id={reason.id}
      className="scroll-mt-28 overflow-hidden rounded-[24px] border border-[#e8e1d5] bg-white shadow-[0_12px_40px_rgba(31,41,55,0.06)]"
    >
      <div className="grid gap-0 lg:grid-cols-2">
        <div className="flex flex-col justify-between p-8 md:p-12 lg:p-14">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full border border-[#d9d3c9] bg-[#f8f5ef] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5c564d]">
                {reason.eyebrow}
              </span>
              <span className="inline-flex rounded-full bg-[#eef4ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2563eb]">
                {reason.metric}
              </span>
            </div>

            <h3 className="mt-6 text-[32px] font-bold leading-[1.05] tracking-[-0.03em] text-[#171717] md:text-[42px]">
              {reason.title}
            </h3>
            <p className="mt-5 max-w-[560px] text-[16px] leading-[1.7] text-[#52525b] md:text-[18px]">
              {reason.description}
            </p>

            <div className="mt-8 rounded-[16px] bg-[#f0f5ff] p-5">
              <p className="text-[14px] font-semibold leading-[1.6] text-[#2563eb]">
                {reason.highlight}
              </p>
            </div>
          </div>

          <ul className="mt-10 space-y-4">
            {reason.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-4 text-[15px] leading-7 text-[#52525b] md:text-[16px]">
                <Check className="mt-1 h-[18px] w-[18px] shrink-0 text-[#2563eb]" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-h-[400px] overflow-hidden border-t border-[#ebe6de] bg-[linear-gradient(180deg,#f8fafd_0%,#f0f4fa_100%)] lg:border-t-0 lg:border-l">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(244,200,118,0.12),transparent_24%)]" />
          <div className="relative flex h-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-[560px] overflow-hidden rounded-[16px] border border-white/80 bg-white/75 p-3 shadow-[0_24px_50px_rgba(59,64,85,0.1)] backdrop-blur-sm">
              <div className="relative aspect-[1.4/1] overflow-hidden rounded-[12px] border border-[#e8e2d6] bg-[#fdfdfd]">
                <Image
                  src={reason.image}
                  alt={reason.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyProofBand() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7fafe_0%,#eef4ff_52%,#f6f1e7_100%)] py-18 text-[#121826] md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(75,120,255,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(244,201,118,0.22),transparent_28%)]" />
      <div className={cn(CONTENT_WIDTH, "space-y-10")}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6e7a92]">
              What you actually get
            </p>
            <h2 className="mt-4 text-[34px] font-semibold leading-[1] tracking-[-0.05em] text-[#101828] md:text-[52px]">
              Verly should make sense as a product system before it becomes a spreadsheet story
            </h2>
          </div>
          <p className="max-w-[700px] text-[17px] leading-8 text-[#5e6a80]">
            If you are evaluating Verly early, the useful question is whether the platform already
            gives you the right control surfaces to launch, operate, and improve support across
            channels. These are the product layers that matter most.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {WHY_VERLY_PAGE.productBlueprint.map((item) => (
            <div
              key={item.title}
              className="rounded-[28px] border border-white/80 bg-white/78 p-6 shadow-[0_24px_50px_rgba(57,81,138,0.09)] backdrop-blur-sm"
            >
              <div className="inline-flex rounded-full border border-[#dbe5ff] bg-[#f5f8ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#315eea]">
                {item.eyebrow}
              </div>
              <div className="mt-5 text-[22px] font-semibold leading-[1.1] tracking-[-0.04em] text-[#111827]">
                {item.title}
              </div>
              <p className="mt-3 text-[15px] leading-7 text-[#5f6b81]">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="rounded-[30px] border border-white/80 bg-[linear-gradient(180deg,#ffffff_0%,#f7faff_100%)] p-7 shadow-[0_28px_60px_rgba(57,81,138,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6e7a92]">
              Before and after
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#111827]">
              {WHY_VERLY_PAGE.miniStory.title}
            </h3>
            <div className="mt-6 space-y-4">
              <div className="rounded-[22px] border border-[#e5ebf5] bg-[#fbfcff] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7b8699]">Before</p>
                <p className="mt-2 text-sm leading-7 text-[#5f6b81]">{WHY_VERLY_PAGE.miniStory.before}</p>
              </div>
              <div className="rounded-[22px] border border-[#dbe5ff] bg-[linear-gradient(180deg,#edf3ff_0%,#e4edff_100%)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#315eea]">After Verly</p>
                <p className="mt-2 text-sm leading-7 text-[#27407f]">{WHY_VERLY_PAGE.miniStory.after}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="grid gap-4 md:grid-cols-2">
              {WHY_VERLY_PAGE.earlyStageFit.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-white/80 bg-white/76 p-6 shadow-[0_24px_50px_rgba(57,81,138,0.08)] backdrop-blur-sm"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6e7a92]">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-4 text-[24px] font-semibold tracking-[-0.03em] text-[#111827]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-[#5f6b81]">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[28px] border border-white/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-6 shadow-[0_24px_50px_rgba(57,81,138,0.08)]">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6e7a92]">
                Support surfaces already present in Verly
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {WHY_VERLY_PAGE.stackItems.map((logo) => (
                  <span
                    key={logo}
                    className="rounded-full border border-[#dbe4f6] bg-[#f7faff] px-4 py-2 text-sm font-medium text-[#3e4c69]"
                  >
                    {logo}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyComparison() {
  return (
    <section className="bg-[#f8f9fb] py-18 md:py-22">
      <div className={cn(CONTENT_WIDTH, "space-y-8")}>
        <div className="max-w-[720px]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6a7282]">
            Why teams switch
          </p>
          <h2 className="mt-4 text-[34px] font-semibold leading-[1] tracking-[-0.05em] text-[#111827] md:text-[52px]">
            Why teams switch from legacy support stacks
          </h2>
          <p className="mt-5 text-[17px] leading-8 text-[#5b6476]">
            Verly is a better fit for teams optimizing for automated resolution, unified channels,
            and lower support cost, while legacy tools remain stronger when the human inbox is the
            primary operating model.
          </p>
        </div>

        <div className="overflow-hidden rounded-[30px] border border-[#dde3ec] bg-white shadow-[0_28px_60px_rgba(15,23,42,0.08)]">
          <div className="grid grid-cols-[0.85fr_1fr_1fr] border-b border-[#e8edf4] bg-[#f7f9fc] px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#6b7280] md:px-8">
            <div>Dimension</div>
            <div>Legacy tools</div>
            <div className="text-[#315eea]">Verly</div>
          </div>

          {WHY_VERLY_PAGE.comparisonRows.map((row, index) => (
            <div
              key={row.label}
              className={cn(
                "grid grid-cols-1 gap-4 border-b border-[#eef2f6] px-6 py-6 md:grid-cols-[0.85fr_1fr_1fr] md:px-8",
                index === WHY_VERLY_PAGE.comparisonRows.length - 1 && "border-b-0",
              )}
            >
              <div className="text-[15px] font-semibold text-[#111827]">{row.label}</div>
              <div className="text-[15px] leading-7 text-[#6b7280]">{row.legacy}</div>
              <div className="flex gap-3 text-[15px] leading-7 text-[#243b7a]">
                <Check className="mt-1 h-5 w-5 shrink-0 text-[#315eea]" />
                <span>{row.verly}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyUseCases() {
  return (
    <section className="bg-white py-18 md:py-22">
      <div className={cn(CONTENT_WIDTH, "space-y-10")}>
        <div className="max-w-[740px]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#737b89]">
            Where Verly fits best
          </p>
          <h2 className="mt-4 text-[34px] font-semibold leading-[1] tracking-[-0.05em] text-[#141414] md:text-[50px]">
            A stronger value story when speed, volume, and channel coverage matter
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {WHY_VERLY_PAGE.useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="rounded-[28px] border border-[#ece7de] bg-[linear-gradient(180deg,#fffdfa_0%,#f8fbff_100%)] p-6 shadow-[0_22px_48px_rgba(31,41,55,0.05)]"
            >
              <div className="inline-flex rounded-full bg-[#eef4ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#315eea]">
                Use case
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-[#171717]">
                {useCase.title}
              </h3>
              <p className="mt-4 text-[15px] leading-7 text-[#5e5a53]">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyFaq() {
  return (
    <section className="bg-[#f6f8fc] py-18 md:py-22">
      <div className={cn(CONTENT_WIDTH, "grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]")}>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6f7684]">
            Buyer questions
          </p>
          <h2 className="mt-4 text-[34px] font-semibold leading-[1] tracking-[-0.05em] text-[#111827] md:text-[50px]">
            Common questions before teams choose Verly
          </h2>
          <p className="mt-5 text-[17px] leading-8 text-[#5c6473]">
            These are the questions buyers ask when they want to understand deployment speed,
            operational control, and where Verly fits into an existing support stack.
          </p>
        </div>

        <div className="rounded-[30px] border border-[#dde4ee] bg-white px-6 py-3 shadow-[0_24px_54px_rgba(15,23,42,0.06)] md:px-8">
          <Accordion type="single" collapsible className="w-full">
            {WHY_VERLY_PAGE.faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`} className="border-[#edf1f6]">
                <AccordionTrigger className="py-6 text-left text-[17px] font-semibold leading-7 text-[#131a29] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-[15px] leading-7 text-[#5f6778]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export function WhyFinalCta() {
  return (
    <section className="bg-[linear-gradient(180deg,#f6f8fc_0%,#dbe9ff_32%,#7db3ff_68%,#06132b_100%)] pt-12">
      <div className={cn(CONTENT_WIDTH, "pb-16 md:pb-20")}>
        <div className="rounded-[34px] border border-white/60 bg-white/78 px-7 py-10 text-center shadow-[0_32px_70px_rgba(15,23,42,0.12)] backdrop-blur-sm md:px-12 md:py-14">
          <div className="mx-auto max-w-[880px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d8dce6] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6c7484]">
              <ShieldCheck className="h-4 w-4 text-[#315eea]" />
              {WHY_VERLY_PAGE.finalCta.eyebrow}
            </span>
            <h2 className="mt-6 text-[34px] font-semibold leading-[1] tracking-[-0.05em] text-[#111827] md:text-[56px]">
              {WHY_VERLY_PAGE.finalCta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-[700px] text-[17px] leading-8 text-[#5c6473]">
              {WHY_VERLY_PAGE.finalCta.description}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-13 rounded-full bg-[#111111] px-8 text-base text-white hover:bg-[#202020]"
              >
                <a
                  href={WHY_VERLY_PAGE.primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {WHY_VERLY_PAGE.primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 rounded-full border-[#d5dce8] bg-white px-8 text-base text-[#1f2937] hover:bg-[#f8fafc]"
              >
                <a
                  href={WHY_VERLY_PAGE.secondaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {WHY_VERLY_PAGE.secondaryCta.label}
                </a>
              </Button>
            </div>

            <p className="mt-5 text-sm font-medium text-[#697386]">
              Quick walkthrough. Clear answers. A realistic starting plan for your team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyBreadcrumbs() {
  return (
    <div className={cn(CONTENT_WIDTH, "pt-28 pb-2 text-sm text-[#6d7280] md:pt-32")}>
      <div className="flex items-center gap-2">
        <Link href="/" className="transition-colors hover:text-[#111827]">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-[#111827]">Why Verly</span>
      </div>
    </div>
  );
}
