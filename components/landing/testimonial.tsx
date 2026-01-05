"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Testimonial() {
  return (
    <section className="py-10 lg:py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-slate-100 dark:border-slate-800"
      >
        <div className="flex flex-col lg:flex-row">
          {/* Image - Left side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative w-full lg:w-[40%] aspect-[4/3] lg:aspect-auto lg:min-h-[360px]"
          >
            <Image
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop"
              alt="Customer support professional"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </motion.div>

          {/* Content - Right side */}
          <div className="flex-1 p-6 md:p-10 lg:p-12 flex flex-col justify-center">
            {/* Company logos */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                Verly
              </span>
              <span className="text-muted-foreground/60 text-xl font-light">×</span>
              <span className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                TechCorp
              </span>
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-base md:text-lg text-foreground font-medium leading-relaxed mb-6"
            >
              &ldquo;When people reach out, they need answers fast. We want our team focused on complex issues, not routine questions. Verly handles the repetitive inquiries so our staff can focus on what truly matters.&rdquo;
            </motion.blockquote>

            {/* Attribution */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <p className="text-base md:text-lg">
                <span className="font-semibold text-foreground">Sarah Mitchell</span>
                <br />
                <span className="text-muted-foreground">Head of Customer Success, TechCorp</span>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

