"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function CrispCTA() {
  return (
    <section className="bg-[#0B1536] py-32 relative overflow-hidden">
      
      {/* Background Floating Elements (crisp & hugo) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* 'crisp' big text background element */}
        <div className="absolute -left-[5%] top-[10%] w-[60%] h-[120%] bg-[#3E80F1] opacity-90 rounded-[80px] rotate-[-5deg] blur-[2px] shadow-[0_0_100px_rgba(62,128,241,0.5)] flex items-center justify-center overflow-hidden">
           <span className="text-[250px] font-extrabold text-white/20 tracking-tighter mix-blend-overlay">crisp</span>
        </div>
        
        {/* 'hugo' big text background element */}
        <div className="absolute -right-[5%] top-[20%] w-[50%] h-[120%] bg-[#131E46] opacity-90 rounded-[80px] rotate-[5deg] blur-[2px] border border-white/5 flex items-center justify-center overflow-hidden">
           {/* Center Glowing Hub */}
           <div className="absolute w-[300px] h-[300px] bg-[#3E80F1] rounded-full blur-[80px] opacity-40"></div>
           <span className="text-[200px] font-extrabold text-white/10 tracking-tighter mix-blend-overlay">hugo</span>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Logo Badge */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-[#3E80F1] rounded-[20px] flex items-center justify-center shadow-[0_10px_40px_rgba(62,128,241,0.4)]">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 32 32">
                <path d="M26.2 3.8C24.4 2.1 21.8 1 18.9 1c-4.6 0-8.8 2.5-11 6.3C5.5 8.7 3 11.8 3 15.6c0 1.9.6 3.8 1.6 5.3L2 28l7.6-2c1.7 1.1 3.7 1.7 5.9 1.7 2.1 0 4.1-.6 5.8-1.5 2.5-1.5 4.5-3.8 5.6-6.6a11.97 11.97 0 0 0 3.1-8 c0-3.1-1.3-5.9-3.8-7.8z"/>
              </svg>
            </div>
          </div>

          <h2 className="text-[48px] md:text-[64px] font-extrabold text-white leading-[1.05] tracking-tight mb-8 drop-shadow-2xl">
            The AI Customer Support platform.
            <br />
            <span className="italic text-white/90">Built for every company.</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-10">
            <Link
              href="/signup"
              className="inline-flex items-center gap-3 bg-[#3e80f1] text-white text-[17px] font-bold px-8 py-4.5 rounded-full hover:bg-[#2b6ce0] transition-colors shadow-[0_4px_14px_rgba(62,128,241,0.4)] hover:shadow-[0_6px_20px_rgba(62,128,241,0.5)] transform hover:-translate-y-0.5"
            >
              Start Free Trial
              <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>

          <p className="text-[14px] text-white/60 font-medium flex items-center justify-center gap-2">
            <span className="font-bold text-white/90">14 days free trial</span>
            <span className="w-1 h-1 bg-white/30 rounded-full"></span>
            <span>All features</span>
            <span className="w-1 h-1 bg-white/30 rounded-full"></span>
            <span>No card required</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
