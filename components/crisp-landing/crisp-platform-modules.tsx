"use client";

import { ArrowRight, Inbox, MessageCircleMore } from "lucide-react";

const channelCards = [
  { name: "Email", color: "bg-[#4e7ff5]" },
  { name: "WhatsApp", color: "bg-[#42b97a]" },
  { name: "Instagram", color: "bg-[#dc4a95]" },
  { name: "Messenger", color: "bg-[#615ff4]" },
] as const;

const queueItems = [
  { name: "Refund follow-up", priority: "High" },
  { name: "Billing question", priority: "Medium" },
  { name: "VIP handoff", priority: "Urgent" },
] as const;

const statCards = [
  { value: "50%", label: "faster resolution" },
  { value: "387 hrs", label: "saved/month" },
  { value: "<2hrs", label: "to onboard" },
] as const;

export default function CrispPlatformModules() {
  return (
    <section className="relative overflow-hidden bg-[#04060d] py-16 text-white md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(83,104,255,0.16),transparent_28%),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:auto,48px_48px,48px_48px]" />

      <div className="relative mx-auto max-w-[1380px] px-4 md:px-6">
        <div className="mb-10 grid gap-8 lg:grid-cols-[minmax(0,740px)_minmax(0,300px)] lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/72">
              Platform Modules
            </span>
            <h2 className="mt-5 max-w-[680px] font-[Georgia,Times,'Times_New_Roman',serif] text-[42px] leading-[0.98] tracking-[-0.04em] text-white md:text-[64px]">
              Here&apos;s why teams love
              <span className="block">one AI platform.</span>
            </h2>
          </div>

          <p className="max-w-[300px] text-[15px] leading-8 text-white/52 lg:justify-self-end">
            One module is shown at a time in a sliding format, with a larger product preview for
            each part of the support stack.
          </p>
        </div>

        <div className="overflow-hidden rounded-[34px] border border-white/8 bg-[linear-gradient(180deg,rgba(9,11,20,0.98),rgba(4,6,13,0.98))] p-4 shadow-[0_32px_80px_rgba(0,0,0,0.3)] md:p-6">
          <div className="mx-auto max-w-[950px] overflow-hidden rounded-[30px] border border-[#d8d9e6] bg-[#dbdde9] shadow-[0_20px_60px_rgba(14,19,43,0.18)]">
            <div className="border-b border-[#c9ccdb] bg-[#dcdeea] px-6 py-6 md:px-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#6e83ff] text-white shadow-[0_12px_24px_rgba(110,131,255,0.32)]">
                  <Inbox className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#8b8ea4]">
                    Omnichannel Queue
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[30px] font-semibold tracking-[-0.04em] text-[#2b3245]">
                    <span>Shared Inbox</span>
                    <ArrowRight className="h-5 w-5 text-[#767e97]" />
                  </div>
                  <p className="mt-2 max-w-[600px] text-[15px] leading-7 text-[#6f768d]">
                    Manage every incoming conversation from one place with priorities and
                    ownership.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-5">
              <div className="rounded-[28px] bg-[#edeef6] p-4 md:p-5">
                <div className="flex items-center justify-between rounded-[18px] bg-[#e5e7f0] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#f19074]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#f0c95a]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#7bc97f]" />
                    </div>
                    <span className="text-[14px] font-medium text-[#666d86]">
                      verly.app/modules/inbox
                    </span>
                  </div>
                  <span className="rounded-full bg-[#eef1ff] px-3 py-1 text-[12px] font-semibold text-[#7691ff]">
                    Preview
                  </span>
                </div>

                <div className="mt-4 rounded-[22px] bg-[#e5e7f0] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-[18px] font-semibold text-[#353d53]">Unified Queue</h3>
                      <p className="mt-1 text-[14px] text-[#8790ab]">
                        All conversations, one workflow
                      </p>
                    </div>
                    <span className="rounded-full bg-[#f1f2f8] px-3 py-1.5 text-[12px] font-semibold text-[#7280ad]">
                      24 open
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-4">
                    {channelCards.map((channel) => (
                      <div
                        key={channel.name}
                        className="rounded-[18px] bg-[#f1f2f6] px-4 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]"
                      >
                        <div
                          className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full ${channel.color}`}
                        >
                          <MessageCircleMore className="h-4 w-4 text-white" />
                        </div>
                        <div className="mt-3 text-[13px] font-semibold text-[#69728c]">
                          {channel.name}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-2.5">
                    {queueItems.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between rounded-full bg-[#f1f2f6] px-4 py-3 text-[14px]"
                      >
                        <span className="font-medium text-[#6c7490]">{item.name}</span>
                        <span className="font-semibold text-[#9da4bc]">{item.priority}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-px bg-[#7086ff] md:grid-cols-3">
                {statCards.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-[linear-gradient(180deg,#7f95ff_0%,#637cff_100%)] px-6 py-5 text-center text-white"
                  >
                    <div className="text-[18px] font-semibold md:text-[22px]">{stat.value}</div>
                    <div className="mt-1 text-[12px] font-medium tracking-[0.04em] text-white/80">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
