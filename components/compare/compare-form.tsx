'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Globe, Loader2, Sparkles, Zap, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import CompetitorGrid from './competitor-grid';
import { startComparison } from '@/lib/api/compare';

export default function CompareForm() {
  const router = useRouter();
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const isValid = selectedCompetitor && websiteUrl.trim().length > 0;
  const isBenefitsOnly = selectedCompetitor === 'none';

  const handleSubmit = async () => {
    if (!isValid) return;

    let url = websiteUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }

    try {
      new URL(url);
    } catch {
      toast.error('Please enter a valid website URL');
      return;
    }

    setLoading(true);
    try {
      const res = await startComparison({
        competitorId: selectedCompetitor!,
        websiteUrl: url,
      });

      if (res.success && res.data.jobId) {
        router.push(`/compare/report/${res.data.jobId}`);
      } else {
        toast.error('Failed to start analysis');
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Step 1 */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-5">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-chart-2 text-primary-foreground text-sm font-bold flex items-center justify-center shadow-md shadow-primary/20">
              1
            </span>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground tracking-tight">
              {isBenefitsOnly ? 'Analyze my business' : 'Pick your current tool'}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">Select a competitor to compare, or choose &quot;No competitor&quot; for a benefits-only report</p>
          </div>
        </div>
        <CompetitorGrid selected={selectedCompetitor} onSelect={setSelectedCompetitor} />
      </motion.div>

      {/* Divider with icon */}
      <div className="relative">
        <div className="border-t border-border/30" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3">
          <BarChart3 className="w-4 h-4 text-muted-foreground/40" />
        </div>
      </div>

      {/* Step 2 */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="space-y-5">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <span className={`w-9 h-9 rounded-xl text-sm font-bold flex items-center justify-center shadow-md transition-all duration-300 ${
              selectedCompetitor
                ? 'bg-gradient-to-br from-primary to-chart-2 text-primary-foreground shadow-primary/20'
                : 'bg-muted text-muted-foreground shadow-none'
            }`}>
              2
            </span>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground tracking-tight">Enter your website</h3>
            <p className="text-xs text-muted-foreground mt-0.5">We&apos;ll crawl it to personalize the {isBenefitsOnly ? 'analysis' : 'comparison'}</p>
          </div>
        </div>
        <div className="relative group">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/40 group-focus-within:text-primary transition-colors duration-200" />
          <input
            type="url"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="yourcompany.com"
            className="w-full rounded-2xl border border-border/60 bg-background/60 pl-12 pr-4 py-4 text-foreground text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 focus:bg-background transition-all duration-200 placeholder:text-muted-foreground/35 shadow-sm"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </div>
      </motion.div>

      {/* Submit */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="pt-2">
        <Button
          size="lg"
          disabled={!isValid || loading}
          onClick={handleSubmit}
          className="group relative w-full sm:w-auto rounded-2xl bg-gradient-to-r from-primary via-chart-2 to-primary bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] px-10 py-6 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 disabled:opacity-40 disabled:pointer-events-none disabled:animate-none overflow-hidden"
        >
          {/* Shine sweep effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

          {loading ? (
            <span className="relative z-10 flex items-center gap-2.5">
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </span>
          ) : (
            <span className="relative z-10 flex items-center gap-2.5">
              <Zap className="w-4 h-4" />
              {isBenefitsOnly ? 'Analyze My Business' : 'Generate Comparison Report'}
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          )}
        </Button>

        {/* Trust note */}
        <AnimatePresence>
          {isValid && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="text-[11px] text-muted-foreground/60 mt-4 flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3" />
              Takes ~30 seconds. Your data stays private.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
