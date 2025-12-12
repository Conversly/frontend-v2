"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Zap, Users, Globe, Cpu } from "lucide-react";

const stats = [
  {
    value: "99.9%",
    label: "Uptime SLA",
    icon: Zap,
    gradient: "from-pink-500/10 via-purple-500/10 to-blue-500/10",
    iconColor: "text-pink-500",
  },
  {
    value: "150K+",
    label: "Active Users",
    icon: Users,
    gradient: "from-blue-500/10 via-purple-500/10 to-pink-500/10",
    iconColor: "text-blue-500",
  },
  {
    value: "50ms",
    label: "Response Time",
    icon: Globe,
    gradient: "from-purple-500/10 via-pink-500/10 to-blue-500/10",
    iconColor: "text-purple-500",
  },
  {
    value: "1B+",
    label: "API Requests",
    icon: Cpu,
    gradient: "from-pink-500/10 via-blue-500/10 to-purple-500/10",
    iconColor: "text-pink-500",
  },
];

export default function ScalabilitySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  return (
    <section
      className="bg-background py-24 relative overflow-hidden font-sans"
      ref={containerRef}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/30 via-background to-transparent"
        style={{ y, opacity }}
      />
      <div className="absolute inset-0 bg-grid-foreground/5 [mask-image:radial-gradient(background,transparent_70%)]" />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-foreground rounded-full"
            animate={{
              x: ["0vw", "100vw"],
              y: [Math.random() * 100 + "vh", Math.random() * 100 + "vh"],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              ease: "linear",
              delay: -Math.random() * 20,
            }}
            style={{ opacity: Math.random() * 0.5 + 0.2 }}
          />
        ))}
      </div>

      <div className="relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary font-heading">
              Enterprise Ready
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-display">
            Built for
            <span className="text-primary ml-3">
              Scale
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-sans">
            Handle millions of requests with ease. Our infrastructure is built
            to scale with your needs.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10 rounded-2xl" />
              <motion.div
                className="relative bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6 text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 mx-auto mb-4"
                >
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <motion.span
                  className="text-3xl font-bold text-foreground block mb-2 font-heading"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.3, type: "spring" }}
                >
                  {stat.value}
                </motion.span>
                <span className="text-muted-foreground font-sans">{stat.label}</span>

                {/* Hover Effect */}
                <div
                  className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Graph Visualization */}
        <motion.div
          className="mt-16 h-64 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-xl" />
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          {/* Additional graph elements can be added here */}
        </motion.div>
      </div>
    </section>
  );
}
