'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const COMPETITORS = [
  { id: 'none',      name: 'No competitor',  tagline: 'Just analyze my business and show how VerlyAI helps', initial: null,  highlight: true },
  { id: 'intercom',  name: 'Intercom',       tagline: 'AI-first customer service platform',                  initial: 'I',   highlight: false },
  { id: 'zendesk',   name: 'Zendesk',        tagline: 'Enterprise support software',                         initial: 'Z',   highlight: false },
  { id: 'tidio',     name: 'Tidio',          tagline: 'AI chatbot for small businesses',                     initial: 'T',   highlight: false },
  { id: 'chatbase',  name: 'Chatbase',       tagline: 'Custom GPT chatbot builder',                          initial: 'C',   highlight: false },
  { id: 'crisp',     name: 'Crisp',          tagline: 'Business messaging platform',                         initial: 'Cr',  highlight: false },
  { id: 'drift',     name: 'Drift',          tagline: 'Conversational marketing (Salesloft)',                initial: 'D',   highlight: false },
  { id: 'freshdesk', name: 'Freshdesk',      tagline: 'Support software by Freshworks',                      initial: 'F',   highlight: false },
];

interface CompetitorGridProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export default function CompetitorGrid({ selected, onSelect }: CompetitorGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {COMPETITORS.map((c, i) => {
        const isSelected = selected === c.id;
        return (
          <motion.button
            key={c.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(c.id)}
            className={`group relative rounded-2xl border p-5 text-left transition-all duration-200 ${
              c.highlight && !isSelected
                ? 'border-primary/30 bg-primary/[0.03] hover:border-primary/50 hover:shadow-md hover:shadow-primary/5'
                : isSelected
                ? 'border-primary bg-primary/5 ring-2 ring-primary/30 shadow-lg shadow-primary/10'
                : 'border-border/50 bg-card/70 hover:border-primary/30 hover:shadow-md'
            } ${c.highlight ? 'sm:col-span-2 lg:col-span-1' : ''}`}
          >
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-sm shadow-primary/30"
              >
                <Check className="w-3.5 h-3.5 text-primary-foreground" />
              </motion.div>
            )}
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-colors duration-200 ${
              isSelected
                ? 'bg-primary/15 text-primary'
                : c.highlight
                ? 'bg-primary/10 text-primary'
                : 'bg-muted/60 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
            }`}>
              {c.initial ? (
                <span className="text-sm font-bold">{c.initial}</span>
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
            </div>
            <p className={`text-sm font-semibold transition-colors ${isSelected || c.highlight ? 'text-primary' : 'text-foreground'}`}>{c.name}</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{c.tagline}</p>
          </motion.button>
        );
      })}
    </div>
  );
}
