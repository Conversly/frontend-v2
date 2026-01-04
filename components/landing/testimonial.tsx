"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Testimonial() {
  return (
    <section className="py-12 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-br from-slate-50 to-slate-100/80 dark:from-slate-900/50 dark:to-slate-800/30 rounded-3xl p-6 md:p-8 lg:p-10 border border-slate-200/60 dark:border-slate-700/40 overflow-hidden"
      >
        {/* Subtle background accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex-shrink-0"
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-white dark:ring-slate-800 shadow-xl">
              {/* Replace with your own image at /public/testimonial.jpg */}
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=400&fit=crop"
                alt="Customer support professional"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            {/* Company logos / context */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex items-center justify-center md:justify-start gap-3 mb-4"
            >
              <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                Customer Story
              </span>
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg md:text-xl lg:text-2xl text-foreground font-medium leading-relaxed mb-4"
            >
              &ldquo;When people reach out, they need answers fast. We want our team focused on complex issues, not routine questions.{" "}
              <span className="text-primary">Verly handles the repetitive inquiries</span> so our staff can focus on what truly matters.&rdquo;
            </motion.blockquote>

            {/* Attribution */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex flex-col"
            >
              <span className="font-semibold text-foreground">Sarah Mitchell</span>
              <span className="text-sm text-muted-foreground">Head of Customer Success, TechCorp</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

