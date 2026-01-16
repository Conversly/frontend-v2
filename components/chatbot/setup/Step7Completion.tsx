'use client';

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Globe, MessageSquare, Settings, BarChart3, Zap } from "lucide-react";
import { useParams } from "next/navigation";

interface Step7CompletionProps {
  chatbotId: string;
  chatbotName?: string;
}

export function Step7Completion({ chatbotId, chatbotName }: Step7CompletionProps) {
  const confettiTriggered = useRef(false);
  const params = useParams<{ workspaceId?: string }>();
  const workspaceId = (params as any)?.workspaceId as string | undefined;
  const base = workspaceId ? `/${workspaceId}/chatbot/${chatbotId}` : `#`;

  useEffect(() => {
    if (confettiTriggered.current) return;
    confettiTriggered.current = true;

    // Dynamic import for canvas-confetti
    import('canvas-confetti').then((confettiModule) => {
      const confetti = confettiModule.default;

      // Initial burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'],
      });

      // Side cannons
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#10b981', '#3b82f6', '#8b5cf6'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#f59e0b', '#ef4444', '#ec4899'],
        });
      }, 250);
    });
  }, []);

  const quickLinks = [
    {
      href: `${base}/customize`,
      icon: Globe,
      title: "Deploy to Website",
      description: "Get embed code for your site",
      primary: true,
    },
    {
      href: `${base}/whatsapp`,
      icon: MessageSquare,
      title: "Connect WhatsApp",
      description: "Deploy on WhatsApp Business",
    },
    {
      href: `${base}/playground`,
      icon: Zap,
      title: "Test Your Bot",
      description: "Try it in the playground",
    },
    {
      href: `${base}/analytics`,
      icon: BarChart3,
      title: "View Analytics",
      description: "Monitor conversations",
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Success Header */}
      <motion.div
        className="flex flex-col items-center gap-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
          </div>
        </motion.div>

        <div className="flex flex-col gap-1">
          <motion.h1
            className="text-[28px] font-semibold leading-[130%] tracking-[-1.12px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            🎉 Your chatbot is ready!
          </motion.h1>
          <motion.p
            className="text-sm leading-[140%] tracking-[-0.28px] text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {chatbotName ? `"${chatbotName}" is all set up and ready to help your visitors.` : "Your AI agent is all set up and ready to deploy."}
          </motion.p>
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        className="flex flex-col gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          What's next?
        </p>

        <div className="grid gap-2">
          {quickLinks.map((link, index) => (
            <motion.div
              key={link.href + link.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Link href={link.href}>
                <div className={`group flex items-center gap-3 rounded-lg border p-3 transition-all hover:border-primary/50 hover:bg-accent/50 ${link.primary ? 'border-primary/30 bg-primary/5' : ''}`}>
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${link.primary ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <link.icon className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{link.title}</span>
                    <span className="text-xs text-muted-foreground">{link.description}</span>
                  </div>
                  {link.primary && (
                    <span className="ml-auto text-xs font-medium text-primary">Recommended</span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Go to Dashboard */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Link href={workspaceId ? `/${workspaceId}/chatbot/${chatbotId}` : "#"}>
          <Button className="w-full" size="lg">
            Go to Dashboard
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

