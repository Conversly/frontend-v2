"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const testimonials = [
  {
    quote: "VerlyAI transformed how we handle customer support. We reduced response times by 75% and our customers love the instant AI responses.",
    author: "Sarah Chen",
    role: "VP of Customer Success",
    company: "TechFlow",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=1"
  },
  {
    quote: "The AI agents are incredibly smart. They handle 80% of conversations automatically, freeing our team to focus on complex issues. Setup took less than an hour.",
    author: "Mark Rodriguez",
    role: "Head of Support",
    company: "CloudBase",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=11"
  },
  {
    quote: "We switched from Zendesk to VerlyAI and haven't looked back. The AI is miles ahead and the pricing is much more transparent.",
    author: "Emily Watson",
    role: "COO",
    company: "DataSync",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=5"
  },
  {
    quote: "Best customer support software on the market, period. The omnichannel inbox has saved us so much time.",
    author: "David Kim",
    role: "Founder",
    company: "NextGen",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=8"
  },
];

export default function CrispStats() {
  return (
    <section className="bg-white py-24 border-t border-gray-100">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-[44px] md:text-[56px] font-extrabold text-[#111827] leading-[1.05] tracking-tight mb-6">
            We love our customers.
            <br />
            <span className="text-[#3E80F1]">And they love us.</span>
          </h2>
          <p className="text-[17px] text-[#6B7280] font-medium mt-4">
            See what companies say about VerlyAI on G2 and Capterra.
          </p>
        </motion.div>

        {/* Testimonials Masonry / Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 px-4">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 p-8 flex flex-col justify-between hover:-translate-y-1 transition-transform cursor-default ${
                idx === 1 || idx === 3 ? "md:mt-12" : ""
              }`}
            >
              <div>
                 {/* 5 Stars Crisp Style */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#F59E0B]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-[#111827] text-[16px] font-semibold leading-[1.6] mb-8">"{t.quote}"</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 border-2 border-white shadow-sm">
                  <img src={t.avatar} alt={t.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-[15px] font-extrabold text-[#111827]">{t.author}</div>
                  <div className="text-[13px] text-[#6B7280] font-medium">{t.role} @ {t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* G2 Exact Style Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <a
            href="#"
            className="group flex flex-col md:flex-row items-center gap-6 bg-[#3E80F1]/5 hover:bg-[#3E80F1]/10 rounded-[28px] p-6 md:pr-10 border border-[#3E80F1]/20 transition-all cursor-pointer"
          >
             <div className="flex -space-x-3 mb-2 md:mb-0">
                  <div className="w-12 h-12 rounded-full border-[3px] border-white overflow-hidden shadow-sm"><img src="https://i.pravatar.cc/100?img=1" alt="agent" /></div>
                  <div className="w-12 h-12 rounded-full border-[3px] border-white overflow-hidden shadow-sm"><img src="https://i.pravatar.cc/100?img=2" alt="agent" /></div>
                  <div className="w-12 h-12 rounded-full border-[3px] border-white overflow-hidden shadow-sm"><img src="https://i.pravatar.cc/100?img=3" alt="agent" /></div>
             </div>
             <div>
                <div className="text-[18px] font-extrabold text-[#111827] mb-1 group-hover:text-[#3E80F1] transition-colors">See what they say about VerlyAI</div>
                <div className="text-[14px] text-[#6B7280] font-medium flex items-center gap-2">
                   Rated 4.8/5 on G2 Crowd
                   <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
             </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
