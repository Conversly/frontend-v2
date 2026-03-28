"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const features = [
  {
    id: "helpdesk",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    label: "AI Helpdesk",
    desc: "Give superpowers to your teams and customers.",
    color: "#3E80F1",
    content: {
      title: "Give superpowers to your team",
      subtitle: "AI Helpdesk",
      description: "Resolve customer issues faster with AI-powered suggestions, automated responses, and smart routing. Your agents get real-time suggestions while your customers get instant answers.",
      bullets: ["AI-powered reply suggestions", "Smart ticket routing", "Automated responses", "Real-time analytics"],
    },
  },
  {
    id: "widget",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    label: "Chat Widget",
    desc: "Support from your website & mobile apps.",
    color: "#F59E0B",
    content: {
      title: "Engage visitors in real-time",
      subtitle: "Chat Widget",
      description: "Embed a beautiful, customizable chat widget on your website. Engage visitors proactively with targeted messages and convert them into customers.",
      bullets: ["Customizable appearance", "Proactive messaging", "File sharing", "Typing indicators"],
    },
  },
  {
    id: "inbox",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: "Shared Inbox",
    desc: "Centralize your inbound communications.",
    color: "#3E80F1",
    content: {
      title: "Centralize all your inbound messages",
      subtitle: "Shared Inbox",
      description: "All your inbound conversations from all channels go into one collaborative inbox. Your team can access, manage, and respond to messages efficiently.",
      bullets: ["Chat Widget", "Email", "WhatsApp", "Messenger"],
    },
  },
  {
    id: "kb",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    label: "Knowledge Base",
    desc: "Make your customers more autonomous.",
    color: "#10B981",
    content: {
      title: "Build a self-service knowledge base",
      subtitle: "Knowledge Base",
      description: "Create a comprehensive help center that empowers customers to find answers on their own. Reduce support volume by up to 50% with well-organized documentation.",
      bullets: ["AI-powered search", "Multi-language support", "Rich text editor", "Analytics & feedback"],
    },
  },
  {
    id: "crm",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    label: "Support CRM",
    desc: "Organize your customer data in a CRM.",
    color: "#EF4444",
    content: {
      title: "Know every customer by name",
      subtitle: "Support CRM",
      description: "Organize your customer data with a built-in CRM. Track interactions, segment contacts, and personalize every conversation with customer context.",
      bullets: ["Contact management", "Custom segments", "Interaction history", "Data enrichment"],
    },
  },
  {
    id: "analytics",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    label: "Support Analytics",
    desc: "Monitor and track your teams' performances.",
    color: "#EC4899",
    content: {
      title: "Data-driven support decisions",
      subtitle: "Support Analytics",
      description: "Monitor and track your team's performance with real-time analytics dashboards. Identify trends, measure satisfaction, and optimize your support operations.",
      bullets: ["Response time tracking", "CSAT scores", "Team performance", "Custom reports"],
    },
  },
];

export default function CrispFeatures() {
  const [active, setActive] = useState(0);

  return (
    <section id="features" className="crisp-section-light">
      <div className="crisp-container">
        
        {/* Exact Crisp Feature Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16 max-w-5xl mx-auto">
          {features.map((feat, idx) => (
            <button
              key={feat.id}
              onClick={() => setActive(idx)}
              className={active === idx ? "crisp-feature-tab-active" : "crisp-feature-tab"}
            >
              <div
                className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: active === idx ? feat.color + "15" : "#F3F4F6",
                  color: active === idx ? feat.color : "#9CA3AF",
                }}
              >
                {feat.icon}
              </div>
              <div className="text-left leading-tight">
                <div className={`text-[14px] ${active === idx ? "text-gray-900 font-extrabold" : "font-bold"}`}>
                  {feat.label}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Active Feature Content Container */}
        <div className="max-w-[1000px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 100, damping: 20 }}
              className="crisp-card p-8"
            >
              <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
                {/* Left Text */}
                <div>
                  <div
                    className="crisp-badge-tag mb-6"
                    style={{
                      backgroundColor: features[active].color + "10",
                      color: features[active].color,
                    }}
                  >
                    {features[active].icon}
                    {features[active].content.subtitle.toUpperCase()}
                  </div>
                  <h2 className="crisp-title mb-6">
                    {features[active].content.title}
                  </h2>
                  <p className="crisp-subtitle mb-8">
                    {features[active].content.description}
                  </p>
                  
                  {/* Bullets with Exact Crisp Icons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 mb-10">
                    {features[active].content.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: features[active].color + "15",
                            color: features[active].color,
                          }}
                        >
                          {/* Green exact Checkmark */}
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                        </div>
                        <span className="text-[14px] font-semibold text-[#111827]">{bullet}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#"
                    className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-white text-[15px] font-bold transition-all hover:-translate-y-0.5 shadow-md"
                    style={{ backgroundColor: features[active].color, boxShadow: `0 4px 14px ${features[active].color}40` }}
                  >
                    Learn more
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>

                {/* Right: Feature Specific Visual Mockups (Exact Replicas) */}
                <div
                  className="rounded-[24px] p-2 flex items-center justify-center h-full min-h-[460px]"
                  style={{ backgroundColor: features[active].color + "0A" }}
                >
                  <div className="w-full max-w-[360px] mx-auto scale-[0.95]">
                    {active === 0 && <HelpdeskMockup />}
                    {active === 1 && <ExactCrispWidgetMockup />}
                    {active === 2 && (
                      <Image
                        src="/images/crisp/omnichannel-hub.png"
                        alt="Omnichannel"
                        width={400}
                        height={400}
                        className="w-full h-auto drop-shadow-xl"
                      />
                    )}
                    {active === 3 && <KnowledgeBaseMockup />}
                    {active === 4 && <CRMMockup />}
                    {active === 5 && <AnalyticsMockup />}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// EXACT Replica of Crisp Chat Widget
function ExactCrispWidgetMockup() {
  return (
    <div className="w-[340px] bg-[#f5f8fa] rounded-[18px] shadow-[0_12px_44px_rgba(0,0,0,0.12)] border border-gray-200/50 flex flex-col overflow-hidden font-sans mx-auto relative transform transition-all hover:scale-105 cursor-default">
      {/* Header */}
      <div className="bg-[#1b75d0] px-5 py-4 flex flex-col justify-center relative">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E] border-2 border-[#1b75d0]"></div>
            <span className="text-white font-bold text-[16px] tracking-tight">VerlyAI</span>
          </div>
          <button className="text-white/80 hover:text-white pb-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="text-white/80 text-[13px] font-medium">We typically reply in a few minutes</div>
      </div>

      {/* Chat Area */}
      <div className="p-4 flex-1 space-y-4 pt-6 bg-white" style={{ backgroundImage: 'radial-gradient(circle at center, #f8fafc 0%, white 100%)' }}>
        {/* Agent message */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1b75d0] bg-opacity-20 flex-shrink-0 flex items-center justify-center overflow-hidden">
             <img src="https://i.pravatar.cc/100?img=5" alt="agent" className="w-full h-full object-cover" />
          </div>
          <div className="bg-[#f2f4f7] text-[#111827] rounded-[18px] rounded-tl-sm px-4 py-2.5 text-[14px]">
            Hi there! 👋 How can I help you today?
          </div>
        </div>
        
        {/* User message */}
        <div className="flex gap-3 justify-end items-end mt-2">
          <div className="bg-[#1b75d0] text-white rounded-[18px] rounded-tr-sm px-4 py-2.5 text-[14px]">
            Pricing for 5 agents?
          </div>
        </div>

        {/* AI Typing Indicator / Next Message */}
        <div className="flex gap-3">
           <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
             <img src="https://i.pravatar.cc/100?img=5" alt="agent" className="w-full h-full object-cover" />
           </div>
          <div className="bg-[#f2f4f7] text-[#111827] rounded-[18px] rounded-tl-sm px-4 py-2.5 text-[14px]">
            For 5 agents, our Pro plan is <strong>$95/mo</strong> flat. Includes all omnichannel features!
          </div>
        </div>
      </div>

      {/* Composer Footer */}
      <div className="bg-white px-3 py-3 border-t border-gray-100 flex items-center gap-2">
         {/* Smiley */}
        <button className="p-2 text-gray-400 hover:text-gray-600">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </button>
        <div className="flex-1 text-[14px] text-gray-400 font-medium">
          Compose your message...
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" transform="rotate(45)" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
        </button>
        <button className="p-2 text-[#1b75d0]">
           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
        </button>
      </div>

      {/* Powered by watermark */}
      <div className="absolute -bottom-7 right-0 left-0 text-center text-[10px] text-gray-400">
        Powered by VerlyAI
      </div>
    </div>
  );
}

// Cleaned up sub-mockups
function HelpdeskMockup() {
  return (
    <div className="space-y-4 transform hover:scale-105 transition-all">
      <div className="bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgba(34,197,94,0.12)] border border-green-100 relative">
        <div className="absolute top-0 right-0 p-3 text-green-500">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        </div>
        <div className="text-[13px] font-bold text-[#111827] mb-3 uppercase tracking-wider">AI Suggestions</div>
        <div className="space-y-2">
          <div className="bg-[#ECFDF5] border border-green-200/50 rounded-xl p-3 text-[13px] font-medium text-green-900 cursor-pointer shadow-sm">
            The exchange has been processed. Replacement is on its way via FedEx.
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-[13px] text-gray-500 cursor-pointer hover:bg-[#ECFDF5] transition-colors">
            Return label sent to customer email for the damaged product.
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 flex items-center gap-3">
        <div className="flex-1 bg-gray-50 rounded-[12px] px-4 py-3 text-[13px] text-gray-400 font-medium">Type a reply...</div>
        <button className="w-11 h-11 bg-[#3E80F1] hover:bg-[#2B6CE0] rounded-[12px] flex items-center justify-center shadow-md transition-colors text-white">
           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
        </button>
      </div>
    </div>
  );
}

function KnowledgeBaseMockup() {
  return (
    <div className="bg-white rounded-[20px] shadow-[0_12px_44px_rgba(16,185,129,0.1)] border border-green-100 p-6 space-y-4">
      <div className="bg-[#f2f4f7] rounded-[14px] px-4 py-3.5 flex items-center gap-3">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="text-[14px] text-gray-400 font-medium">Search knowledge base...</span>
      </div>
      <div className="space-y-1 mt-6">
        {["Getting Started Guide", "Setting Up Your AI Agent", "Customizing Chat Widget"].map((article) => (
          <div key={article} className="flex items-center gap-3 p-3 hover:bg-[#ECFDF5] rounded-xl cursor-pointer transition-colors group">
            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-[#10B981] opacity-70 group-hover:opacity-100" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v7h7v9H6z"/>
              </svg>
            </div>
            <span className="text-[14px] font-bold text-[#111827] group-hover:text-[#10B981] transition-colors">{article}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CRMMockup() {
  return (
    <div className="bg-white rounded-[20px] shadow-[0_12px_44px_rgba(239,68,68,0.1)] border border-red-100 p-6 space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-[18px] flex items-center justify-center text-[22px] font-bold text-white shadow-lg">BJ</div>
        <div>
          <div className="font-extrabold text-[18px] text-[#111827]">Beth Johnson</div>
          <div className="text-[14px] text-gray-500 font-medium">beth@acme.com</div>
        </div>
      </div>
      <div className="space-y-2">
        {[
          { label: "Location", value: "London, UK" },
          { label: "Plan", value: "Enterprise" },
          { label: "Last Active", value: "2 hours ago" },
          { label: "Total Conversations", value: "47" },
        ].map((item) => (
          <div key={item.label} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
            <span className="text-[13px] text-gray-500 font-medium">{item.label}</span>
            <span className="text-[13px] font-bold text-[#111827]">{item.value}</span>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-[13px] py-2.5 rounded-[10px] transition-colors">
        View Full Profile
      </button>
    </div>
  );
}

function AnalyticsMockup() {
  return (
    <div className="bg-white rounded-[20px] shadow-[0_12px_44px_rgba(236,72,153,0.1)] border border-pink-100 p-6 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-extrabold text-[#111827] text-[16px]">Support Analytics</span>
        <span className="text-[11px] uppercase tracking-wider bg-[#FDF2F8] text-[#EC4899] px-3 py-1.5 rounded-full font-bold">This week</span>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: "Avg Response", value: "1.2m", change: "-15%" },
          { label: "CSAT Score", value: "4.8/5", change: "+8%" },
          { label: "Resolved", value: "847", change: "+23%" },
          { label: "Active", value: "12", change: "—" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-100 shadow-sm rounded-[14px] p-4 text-center">
            <div className="text-[12px] text-gray-500 font-semibold mb-1 uppercase tracking-wide">{stat.label}</div>
            <div className="text-[20px] font-extrabold text-[#111827]">{stat.value}</div>
            <div className={`text-[12px] font-bold mt-1 ${stat.change.startsWith("+") ? "text-green-500" : stat.change.startsWith("-") ? "text-red-500" : "text-gray-400"}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>
      {/* Mini bar chart */}
      <div className="flex items-end justify-between gap-1.5 h-16 pt-2">
        {[40, 60, 35, 80, 55, 90, 70].map((h, i) => (
          <div key={i} className="flex-1 rounded-t-[6px] bg-pink-500 opacity-80 hover:opacity-100 transition-opacity" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}
