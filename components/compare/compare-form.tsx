'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Loader2, Sparkles } from 'lucide-react';
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">1</span>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              {isBenefitsOnly ? 'Analyze my business' : 'Pick your current tool'}
            </h3>
            <p className="text-xs text-muted-foreground">Select a competitor to compare, or choose &quot;No competitor&quot; for a benefits-only report</p>
          </div>
        </div>
        <CompetitorGrid selected={selectedCompetitor} onSelect={setSelectedCompetitor} />
      </motion.div>

      <div className="border-t border-border/30" />

      {/* Step 2 */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-5">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">2</span>
          <div>
            <h3 className="text-base font-semibold text-foreground">Enter your website</h3>
            <p className="text-xs text-muted-foreground">We&apos;ll crawl it to personalize the {isBenefitsOnly ? 'analysis' : 'comparison'}</p>
          </div>
        </div>
        <div className="relative">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
          <input
            type="url"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="yourcompany.com"
            className="w-full rounded-2xl border border-border/60 bg-background/80 pl-12 pr-4 py-4 text-foreground text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-muted-foreground/40"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </div>
      </motion.div>

      {/* Submit */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="pt-2">
        <Button
          size="lg"
          disabled={!isValid || loading}
          onClick={handleSubmit}
          className="group w-full sm:w-auto rounded-2xl bg-gradient-to-r from-primary via-chart-2 to-primary bg-[length:200%_100%] animate-[shimmer_2.5s_linear_infinite] px-10 py-6 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-primary/40 hover:-translate-y-0.5 hover:scale-[1.01] disabled:opacity-40 disabled:pointer-events-none disabled:animate-none"
        >
          {loading ? (
            <span className="flex items-center gap-2.5">
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </span>
          ) : (
            <span className="relative z-10 flex items-center gap-2.5">
              <Sparkles className="w-5 h-5" />
              {isBenefitsOnly ? 'Analyze My Business' : 'Generate Comparison Report'}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          )}
        </Button>
      </motion.div>
    </div>
  );
}
