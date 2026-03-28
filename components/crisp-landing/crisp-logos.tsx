"use client";
import { motion } from "framer-motion";

export default function CrispLogos() {
  return (
    <section className="bg-white py-16 border-b border-gray-100/50">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="text-[14px] font-extrabold text-gray-400 mb-8 uppercase tracking-widest">
            Trusted by 500k+ brands of all sizes
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-x-12 md:gap-x-20 gap-y-10 w-full opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* SVG Logos matching Crisp style companies */}
            
            {/* Brand 1 */}
            <svg className="w-auto h-7 text-[#111827] hover:text-[#3E80F1] transition-colors" viewBox="0 0 100 30" fill="currentColor">
               <path d="M10 5h20v5H10zm0 10h15v5H10zm0 10h20v5H10zM40 5h5v25h-5zm15 0h5l10 15V5h5v25h-5L60 15v15h-5z"/>
            </svg>

            {/* Brand 2 */}
            <svg className="w-auto h-6 text-[#111827] hover:text-[#10B981] transition-colors" viewBox="0 0 120 30" fill="currentColor">
              <path d="M15 5A10 10 0 005 15a10 10 0 0010 10h5V5h-5zm15 0a10 10 0 00-10 10 10 10 0 0010 10h5V5h-5zm15 0v20h5V5h-5zm15 0v20h15v-5H65v-2.5h10v-5H65V10h15V5H60z"/>
            </svg>

            {/* Brand 3 */}
            <svg className="w-auto h-8 text-[#111827] hover:text-[#EF4444] transition-colors" viewBox="0 0 90 30" fill="currentColor">
               <path d="M0 15l15-15v10h15v10H15v10zm40 10V5h15v5H45v2.5h10v5H45V25h-5zm25-15h15v10H65v-10zm5-5h5v5h-5V5z"/>
            </svg>

            {/* Brand 4 */}
            <svg className="w-auto h-6 text-[#111827] hover:text-[#8B5CF6] transition-colors" viewBox="0 0 110 30" fill="currentColor">
               <circle cx="15" cy="15" r="10" />
               <path d="M35 5h5v20h-5zm15 0a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10 10 10 0 00-10-10zm25 0V25h-5V5h5zm10 0h15v5h-10v5h10v5h-10v5h15v5H85V5z"/>
            </svg>

            {/* Brand 5 */}
            <svg className="w-auto h-7 text-[#111827] hover:text-[#F59E0B] transition-colors" viewBox="0 0 80 30" fill="currentColor">
               <path d="M10 5L0 25h5l2.5-5h10l2.5 5h5L15 5h-5zm-1.5 10L12.5 7.5 16.5 15H8.5zm25-10v20h5V5h-5zm15 0h10a5 5 0 015 5v2.5A5 5 0 0153.5 15H48.5v10h-5V5z"/>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
