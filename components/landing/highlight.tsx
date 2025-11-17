// components/landing/highlights-illustrated.tsx
"use client";
import { motion } from "framer-motion";
import {
  Brain,
  Sparkles,
  Shield,
  Zap,
  Code,
  Users,
  Globe,
  Lock,
  MessageSquare,
  Blocks,
} from "lucide-react";

interface HighlightCard {
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  decorativeIcons?: React.ElementType[];
  span?: string;
}

const highlights: HighlightCard[] = [
  {
    title: "Purpose-built for LLMs",
    description:
      "Language models with reasoning capabilities for effective responses to complex queries.",
    icon: Brain,
    gradient: "from-blue-500/20 via-purple-500/20 to-pink-500/20",
    decorativeIcons: [Code, Zap, MessageSquare],
  },
  {
    title: "Designed for simplicity",
    description:
      "Create, manage, and deploy AI Agents easily, even without technical skills.",
    icon: Sparkles,
    gradient: "from-orange-500/20 via-pink-500/20 to-purple-500/20",
    decorativeIcons: [Blocks, Users, Globe],
  },
  {
    title: "Engineered for security",
    description:
      "Enjoy peace of mind with robust encryption and strict compliance standards.",
    icon: Shield,
    gradient: "from-green-500/20 via-blue-500/20 to-purple-500/20",
    decorativeIcons: [Lock, Shield, Globe],
    span: "lg:col-span-1 md:col-span-2",
  },
];

function IllustrationCard({ highlight }: { highlight: HighlightCard }) {
  const Icon = highlight.icon;
  const DecorativeIcons = highlight.decorativeIcons || [];

  return (
    <div className="relative h-[400px] bg-gradient-to-br overflow-hidden">
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${highlight.gradient}`} />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--primary)_0%,_transparent_70%)] opacity-10" />

      {/* Main icon container */}
      <div className="relative h-full flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotateY: -30 }}
          whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full scale-150" />
          
          {/* Main icon card */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-40 h-40 rounded-3xl bg-card/80 backdrop-blur-sm border-2 border-border flex items-center justify-center shadow-2xl"
          >
            <Icon className="w-20 h-20 text-primary" strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        {/* Decorative floating icons */}
        {DecorativeIcons.map((DecorIcon, index) => {
          const positions = [
            { top: "15%", left: "15%" },
            { top: "20%", right: "20%" },
            { bottom: "20%", left: "20%" },
          ];
          const position = positions[index] || positions[0];

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 5 + index,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5,
              }}
              className="absolute"
              style={position}
            >
              <div className="w-16 h-16 rounded-2xl bg-card/60 backdrop-blur-sm border border-border flex items-center justify-center shadow-lg">
                <DecorIcon className="w-8 h-8 text-primary/70" strokeWidth={1.5} />
              </div>
            </motion.div>
          );
        })}

        {/* Animated dots/particles */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-24 h-24 rounded-full bg-primary/10 blur-xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/3 left-1/3 w-32 h-32 rounded-full bg-primary/10 blur-xl"
        />
      </div>
    </div>
  );
}

function HighlightCard({
  highlight,
  index,
}: {
  highlight: HighlightCard;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 group ${
        highlight.span || ""
      }`}
    >
      {/* Illustration */}
      <div className="relative overflow-hidden">
        <IllustrationCard highlight={highlight} />
        
        {/* Gradient overlay for smooth transition to content */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="space-y-2 px-6 pb-6 pt-2 relative -mt-8">
        <h3 className="font-semibold text-xl text-foreground group-hover:text-primary transition-colors">
          {highlight.title}
        </h3>
        <p className="text-base text-muted-foreground leading-relaxed">
          {highlight.description}
        </p>
      </div>

      {/* Hover accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  );
}

export default function HighlightsSection() {
  return (
    <section className="mx-auto flex w-full max-w-7xl px-6 py-24 lg:py-32 bg-background">
      <div className="flex flex-col gap-4 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-start gap-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center rounded-full px-4 py-1.5 font-medium text-sm border border-border bg-card text-foreground shadow-sm hover:shadow-md transition-shadow">
            <div className="mr-2 size-2 rounded-full bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 animate-pulse" />
            Highlights
          </div>

          {/* Title and Description */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10 w-full">
            <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight max-w-2xl leading-[1.1]">
              The complete platform for{" "}
              <span className="text-primary">AI support agents</span>
            </h2>
            <p className="max-w-[600px] text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Build AI support agents that solve your customers' hardest
              problems while improving business outcomes.
            </p>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid gap-6 pt-8 lg:grid-cols-3 md:grid-cols-2">
          {highlights.map((highlight, index) => (
            <HighlightCard key={index} highlight={highlight} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}