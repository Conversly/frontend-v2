'use client';

import { motion } from 'framer-motion';
import { Globe, Brain, FileText, Check } from 'lucide-react';

const stages = [
  { id: 'pending',   label: 'Queuing your analysis',               sublabel: 'Preparing the pipeline',               icon: FileText },
  { id: 'crawling',  label: 'Scanning your website',               sublabel: 'Reading pages, extracting content',     icon: Globe },
  { id: 'analyzing', label: 'Running AI comparison',               sublabel: 'Analyzing features, scoring dimensions', icon: Brain },
];

interface LoadingReportProps {
  currentStage: string;
}

export default function LoadingReport({ currentStage }: LoadingReportProps) {
  const currentIdx = stages.findIndex((s) => s.id === currentStage);
  const activeIdx = currentIdx === -1 ? 0 : currentIdx;

  return (
    <div className="max-w-xl mx-auto py-16 md:py-24 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-10"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
          >
            <Brain className="w-8 h-8 text-primary" />
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Generating Your Report
          </h2>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            We&apos;re crawling your website and running a deep AI analysis. This usually takes 30-60 seconds.
          </p>
        </div>

        {/* Progress bar */}
        <div className="relative">
          <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: '5%' }}
              animate={{
                width: activeIdx === 0 ? '15%' : activeIdx === 1 ? '50%' : '85%',
              }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Stage cards */}
        <div className="space-y-3">
          {stages.map((stage, i) => {
            const isActive = i === activeIdx;
            const isDone = i < activeIdx;
            const isPending = i > activeIdx;
            const Icon = stage.icon;

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12 }}
                className={`flex items-center gap-4 rounded-2xl border p-5 transition-all duration-500 ${
                  isActive
                    ? 'border-primary/30 bg-primary/5 shadow-md shadow-primary/5'
                    : isDone
                    ? 'border-border/20 bg-card/50'
                    : 'border-border/10 bg-card/20'
                }`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${
                  isActive
                    ? 'bg-primary/15 text-primary'
                    : isDone
                    ? 'bg-primary/10 text-primary'
                    : 'bg-muted/30 text-muted-foreground/30'
                }`}>
                  {isDone ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <Check className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold transition-colors ${
                    isPending ? 'text-muted-foreground/40' : 'text-foreground'
                  }`}>
                    {stage.label}
                  </p>
                  <p className={`text-xs mt-0.5 transition-colors ${
                    isPending ? 'text-muted-foreground/25' : 'text-muted-foreground'
                  }`}>
                    {stage.sublabel}
                  </p>
                </div>

                {/* Status */}
                <div className="shrink-0">
                  {isActive && (
                    <div className="flex items-center gap-1.5">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-primary"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 rounded-full bg-primary/60"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 rounded-full bg-primary/30"
                      />
                    </div>
                  )}
                  {isDone && (
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      Done
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tip */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-xs text-muted-foreground/60"
        >
          Your report will include a radar chart, performance metrics, and personalized recommendations.
        </motion.p>
      </motion.div>
    </div>
  );
}
