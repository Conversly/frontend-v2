"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const showcaseBlocks = [
  {
    badge: "Shared Inbox",
    badgeColor: "#3E80F1",
    title: "Centralize all your inbound messages",
    description: "All your inbound conversations from all channels go into one collaborative inbox. Your team can access, manage, and respond to messages efficiently.",
    channels: [
      { icon: "💬", label: "Chat Widget", color: "#3E80F1" },
      { icon: "📧", label: "Email", color: "#EF4444" },
      { icon: "📱", label: "WhatsApp", color: "#22C55E" },
      { icon: "💬", label: "Messenger", color: "#3B82F6" },
    ],
    extra: "+ 8 other channels",
    cta: "See all messaging channels",
    image: "/images/crisp/omnichannel-hub.png",
    reversed: false,
  },
  {
    badge: "AI Agents",
    badgeColor: "#8B5CF6",
    title: "Build your perfect AI Agent in 4 steps",
    description: "Train your AI, create a workflow, test & deploy, and monitor performance. Deploy your AI Agent workflow to any messaging channel: Web chat, WhatsApp, Messenger, and even email.",
    steps: [
      { num: 1, label: "Train your AI" },
      { num: 2, label: "Create a Workflow" },
      { num: 3, label: "Test & Deploy Workflow" },
      { num: 4, label: "Monitor & Optimize" },
    ],
    cta: "Build your AI Agent",
    image: "/images/crisp/ai-workflow.png",
    reversed: true,
  },
  {
    badge: "Automations",
    badgeColor: "#EF4444",
    title: "Automate your customer journey",
    description: "Build sophisticated automation workflows to guide customers through their journey — from onboarding to retention. Trigger actions based on customer behavior.",
    points: ["Event-driven triggers", "Conditional logic flows", "Multi-channel campaigns", "Personalized sequences"],
    cta: "Explore automations",
    image: "/images/crisp/ai-workflow.png",
    reversed: false,
  },
];

export default function CrispAIShowcase() {
  return (
    <section id="ai-showcase" className="bg-white py-24">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-[44px] md:text-[56px] font-extrabold text-[#111827] leading-[1.05] tracking-tight mb-8">
            The platform built for support <br />
            and sales teams. <span className="text-[#3E80F1]">All together.</span>
          </h2>
          
          {/* Exact Crisp Use Case Tabs */}
          <div className="flex flex-wrap justify-center gap-[10px] mb-4">
            {["Customer Support", "Inbound Sales", "Marketing"].map((tab, idx) => (
              <button
                key={tab}
                className={`px-8 py-3.5 rounded-[12px] font-bold text-[15px] transition-all tracking-wide ${
                  idx === 0
                    ? "bg-[#3E80F1] text-white shadow-[0_4px_16px_rgba(62,128,241,0.4)]"
                    : "bg-gray-100/80 text-gray-500 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <p className="text-[16px] text-[#6B7280] font-medium mt-4">
            Cross-channel customer support experiences using modern messaging.
          </p>
        </motion.div>

        {/* Crisp Shadow Dashboard Drop */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", stiffness: 80, damping: 20 }}
          className="mb-32 max-w-[1100px] mx-auto"
        >
          <div className="bg-white rounded-[24px] shadow-[0_20px_80px_rgba(0,0,0,0.1)] border border-gray-200/60 overflow-hidden transform hover:-translate-y-2 transition-transform duration-500">
            <Image
              src="/images/crisp/dashboard-mockup.png"
              alt="VerlyAI Support Dashboard"
              width={1100}
              height={650}
              className="w-full h-auto"
            />
          </div>
        </motion.div>

        {/* Feature Showcase Blocks (Zig-Zag) EXACT Crisp Styling */}
        <div className="space-y-[120px] max-w-[1100px] mx-auto">
          {showcaseBlocks.map((block, idx) => (
            <motion.div
              key={block.badge}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", stiffness: 80, damping: 20 }}
              className={`flex flex-col ${
                block.reversed ? "md:flex-row-reverse" : "md:flex-row"
              } gap-16 items-center`}
            >
              {/* Text Content */}
              <div className="flex-1">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-bold mb-6 tracking-wide uppercase"
                  style={{
                    backgroundColor: block.badgeColor + "15",
                    color: block.badgeColor,
                  }}
                >
                  {block.badge}
                </div>
                <h3 className="text-[34px] md:text-[44px] font-extrabold text-[#111827] leading-[1.1] mb-6 tracking-tight">
                  {block.title}
                </h3>
                <p className="text-[#6B7280] text-[17px] leading-[1.6] font-medium mb-8">
                  {block.description}
                </p>

                {/* Sub Features grid */}
                {block.channels && (
                  <>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-4 mb-4">
                      {block.channels.map((ch) => (
                        <div key={ch.label} className="flex items-center gap-3 bg-gray-50/50 hover:bg-gray-100 rounded-[14px] p-3 transition-colors border border-transparent hover:border-gray-200">
                          <div
                            className="w-10 h-10 rounded-[10px] flex items-center justify-center text-[18px]"
                            style={{ backgroundColor: ch.color + "1A" }}
                          >
                            {ch.icon}
                          </div>
                          <span className="text-[14px] font-bold text-[#111827]">{ch.label}</span>
                        </div>
                      ))}
                    </div>
                    {block.extra && (
                      <p className="text-[13px] font-semibold text-gray-400 mb-8 ml-2">{block.extra}</p>
                    )}
                  </>
                )}

                {block.steps && (
                  <div className="space-y-3 mb-8">
                    {block.steps.map((step, stepIdx) => (
                      <div
                        key={step.num}
                        className={`flex items-center gap-4 p-4 rounded-[16px] border transition-all ${
                          stepIdx === 2
                            ? "border-[#8B5CF6] shadow-[0_4px_20px_rgba(139,92,246,0.15)] bg-white transform scale-[1.02]"
                            : "border-gray-100 bg-gray-50/50"
                        }`}
                      >
                        <span
                          className={`text-[12px] font-bold px-3 py-1.5 rounded-[8px] tracking-wide ${
                            stepIdx === 2
                              ? "bg-[#8B5CF6] text-white uppercase"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {stepIdx === 2 ? `Step ${step.num}` : step.num}
                        </span>
                        <span className={`text-[15px] ${stepIdx === 2 ? 'font-extrabold text-[#111827]' : 'font-semibold text-gray-600'}`}>{step.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                <Link
                  href="#"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white text-[15px] font-bold transition-all hover:-translate-y-0.5 shadow-md"
                  style={{ backgroundColor: block.badgeColor, boxShadow: `0 4px 14px ${block.badgeColor}40` }}
                >
                  {block.cta}
                  <svg className="w-4 h-4" transform="rotate(-45)" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>

              {/* Exact Crisp Styling Float Image */}
              <div className="flex-1 w-full pl-0 md:pl-10">
                <div className={`relative w-full aspect-square md:aspect-[4/3] rounded-[32px] sm:p-12 flex items-center justify-center transform hover:scale-[1.02] transition-transform duration-500`}
                     style={{ background: `linear-gradient(135deg, ${block.badgeColor}15, ${block.badgeColor}05)` }}>
                  <Image
                    src={block.image}
                    alt={block.badge}
                    width={600}
                    height={600}
                    className="w-full h-auto rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-white/60"
                  />
                  
                  {/* Floating decors */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full blur-3xl opacity-50" style={{ backgroundColor: block.badgeColor }}></div>
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full blur-3xl opacity-50" style={{ backgroundColor: block.badgeColor }}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
