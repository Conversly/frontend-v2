// app/hero.tsx
"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import {
  Code,
  Zap,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Bot,
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    label: "Natural Conversations",
    gradient: "from-pink-500/10 via-purple-500/10 to-blue-500/10",
    iconColor: "text-pink-500",
  },
  {
    icon: Code,
    label: "Simple Integration",
    gradient: "from-blue-500/10 via-purple-500/10 to-pink-500/10",
    iconColor: "text-blue-500",
  },
  {
    icon: Zap,
    label: "Instant Responses",
    gradient: "from-purple-500/10 via-pink-500/10 to-blue-500/10",
    iconColor: "text-purple-500",
  },
];

// A modern chatbot UI component
function ChatUI() {
  return (
    <div className="w-full max-w-md bg-card/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-border font-sans">
      {/* Chat header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <span className="font-semibold text-foreground">Knowledge Assistant</span>
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Chat body */}
      <div className="p-4 space-y-4 min-h-[300px]">
        {/* Bot message */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div className="bg-muted text-foreground rounded-2xl rounded-tl-none p-4 max-w-[80%]">
            <p>How can I help you with our API documentation?</p>
          </div>
        </div>

        {/* User message */}
        <div className="flex items-start justify-end gap-3">
          <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-none p-4 max-w-[80%]">
            <p>What's the rate limit for the search endpoint?</p>
          </div>
        </div>

        {/* Bot reply */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div className="bg-muted text-foreground rounded-2xl rounded-tl-none p-4 max-w-[80%]">
            <p>
              The search endpoint has a rate limit of 100 requests per minute
              per API key. You can monitor your usage in the dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Chat input */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask about your documentation..."
            className="flex-1 bg-muted text-foreground rounded-xl px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button className="bg-primary text-primary-foreground rounded-xl p-2 hover:opacity-90 transition-opacity">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="bg-background pt-32 pb-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-transparent opacity-30" />
        <div className="absolute inset-0 bg-grid-foreground/5 [mask-image:radial-gradient(background,transparent_70%)]" />
      </div>

      <div className="container mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-sans"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary font-heading">
                AI-Powered Knowledge Base
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight font-display">
              Transform Your{" "}
              <span className="text-primary">
                Documentation
              </span>{" "}
              Into Intelligence
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground mb-8 max-w-xl font-sans">
              Create custom AI chatbots trained on your knowledge base.
              Deploy anywhere or integrate via API for seamless knowledge sharing.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card/60 backdrop-blur-sm border border-border"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10"
                  >
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground font-sans">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 font-heading">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:opacity-90 rounded-xl group"
                onClick={() => redirect("/chatbot/create/setup")}
              >
                Start Building Free
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl"
              >
                View Documentation
              </Button>
            </div>
          </motion.div>

          {/* Chat UI Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/10 blur-3xl" />
            <div className="relative">
              <ChatUI />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
