'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

const COMPETITORS = [
  { id: 'intercom',  name: 'Intercom',   tagline: 'AI-first customer service platform',   initial: 'I',  accent: '#286efa' },
  { id: 'zendesk',   name: 'Zendesk',    tagline: 'Enterprise support software',           initial: 'Z',  accent: '#03363d' },
  { id: 'tidio',     name: 'Tidio',      tagline: 'AI chatbot for small businesses',       initial: 'T',  accent: '#0066ff' },
  { id: 'chatbase',  name: 'Chatbase',   tagline: 'Custom GPT chatbot builder',            initial: 'C',  accent: '#18181b' },
  { id: 'crisp',     name: 'Crisp',      tagline: 'Business messaging platform',           initial: 'Cr', accent: '#5c5cff' },
  { id: 'drift',     name: 'Drift',      tagline: 'Conversational marketing (Salesloft)',  initial: 'D',  accent: '#4a5cf7' },
  { id: 'freshdesk', name: 'Freshdesk',  tagline: 'Support software by Freshworks',        initial: 'F',  accent: '#049b5c' },
];

interface CompetitorGridProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export default function CompetitorGrid({ selected, onSelect }: CompetitorGridProps) {
  const isNoneSelected = selected === 'none';

  return (
    <div className="space-y-4">
      {/* "No competitor" — standalone featured card */}
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => onSelect('none')}
        className={`group relative w-full rounded-2xl border p-5 text-left transition-all duration-300 flex items-center gap-4 ${
          isNoneSelected
            ? 'border-primary bg-primary/[0.04] shadow-[0_0_0_1px_var(--primary),0_4px_20px_rgba(79,70,229,0.1)]'
            : 'border-dashed border-border/60 bg-gradient-to-r from-primary/[0.02] to-transparent hover:border-primary/30 hover:shadow-sm'
        }`}
      >
        {isNoneSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-sm shadow-primary/30"
          >
            <Check className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={3} />
          </motion.div>
        )}
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
          isNoneSelected ? 'bg-primary/15 text-primary' : 'bg-primary/8 text-primary group-hover:bg-primary/12'
        }`}>
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className={`text-sm font-semibold transition-colors ${isNoneSelected ? 'text-primary' : 'text-primary/80 group-hover:text-primary'}`}>
            Skip competitor — just analyze my business
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Get a benefits-only report showing how Verly fits your use case</p>
        </div>
        <ArrowRight className={`w-4 h-4 shrink-0 transition-all duration-200 ${isNoneSelected ? 'text-primary' : 'text-muted-foreground/30 group-hover:text-primary/50 group-hover:translate-x-0.5'}`} />
      </motion.button>

      {/* Divider with label */}
      <div className="flex items-center gap-3 px-1">
        <div className="flex-1 border-t border-border/30" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/50">or compare against</span>
        <div className="flex-1 border-t border-border/30" />
      </div>

      {/* Competitor chips — compact 2-column layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {COMPETITORS.map((c, i) => {
          const isSelected = selected === c.id;
          return (
            <motion.button
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.03, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -2, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(c.id)}
              className={`group relative rounded-xl border px-4 py-3.5 text-left transition-all duration-250 ${
                isSelected
                  ? 'border-primary bg-primary/[0.04] shadow-[0_0_0_1px_var(--primary),0_4px_16px_rgba(79,70,229,0.1)]'
                  : 'border-border/40 bg-card/60 hover:border-border/80 hover:bg-card hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)]'
              }`}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
                </motion.div>
              )}

              <div className="flex items-center gap-3">
                {/* Color-branded initial */}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 text-white text-xs font-bold"
                  style={{
                    backgroundColor: isSelected ? c.accent : undefined,
                    background: isSelected ? undefined : `color-mix(in oklch, ${c.accent} 12%, transparent)`,
                    color: isSelected ? 'white' : c.accent,
                  }}
                >
                  {c.initial}
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-semibold truncate transition-colors ${isSelected ? 'text-foreground' : 'text-foreground/80 group-hover:text-foreground'}`}>
                    {c.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate mt-0.5 leading-tight">{c.tagline}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
