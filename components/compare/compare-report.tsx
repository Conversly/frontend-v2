'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, Check, X, Minus, ArrowRight, Calendar, Zap, AlertTriangle, Target,
  Building2, Users, TrendingUp, Shield, Download, Link2, Info, Rocket, ListChecks,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { openCalendlyPopup } from '@/lib/calendly';
import Link from 'next/link';
import ScoreRadarChart from './score-radar-chart';
import MetricsBarChart from './metrics-bar-chart';
import FitScoreGauge from './fit-score-gauge';
import { downloadReport } from './download-report';

interface Report {
  mode: 'comparison' | 'benefits';
  crawlQuality: 'full' | 'partial' | 'minimal';
  businessSummary: string;
  businessType: string;
  industry: string;
  teamSizeEstimate: string;
  painPoints: string[];
  fitScore: number;
  executiveSummary: { dimension: string; competitor: string; verly: string; winner: string }[];
  dimensionScores: Record<string, { verly: number; competitor: number }>;
  sections: {
    id: string;
    title: string;
    personalizedInsight: string;
    keyDifference: string;
    features: { feature: string; competitor: string; verly: string; verlyWins: boolean; relevanceToUser: string }[];
  }[];
  performanceMetrics: { metric: string; competitor: number | null; verly: number; unit: string }[];
  personalizedBenefits: string[];
  whenToChooseVerly: string[];
  recommendation: string;
  suggestedUseCases: { title: string; description: string; impact: string }[];
  implementationSteps: { step: number; title: string; description: string; timeEstimate: string }[];
  competitorName: string;
  competitorTagline: string;
  prospectDomain: string;
  generatedAt: string;
}

function WinnerBadge({ winner, competitorName }: { winner: string; competitorName: string }) {
  if (winner === 'verly') return (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
      <Check className="w-3 h-3" /> Verly
    </span>
  );
  if (winner === 'competitor') return (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
      <X className="w-3 h-3" /> {competitorName}
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border/30">
      <Minus className="w-3 h-3" /> Tie
    </span>
  );
}

function RelevanceBadge({ level }: { level: string }) {
  const cls = level === 'High'
    ? 'bg-primary/10 text-primary border-primary/20'
    : level === 'Medium'
    ? 'bg-chart-3/10 text-chart-3 border-chart-3/20'
    : 'bg-muted text-muted-foreground border-border/20';
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cls}`}>{level}</span>;
}

function SectionNumber({ index }: { index: number }) {
  return (
    <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
      {index + 1}
    </span>
  );
}

export default function CompareReport({ report }: { report: Report }) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => {
    return new Set(report.sections.slice(0, 2).map(s => s.id));
  });

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isComparison = report.mode === 'comparison';
  const verlyWinCount = report.executiveSummary.filter(r => r.winner === 'verly').length;

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Report link copied to clipboard');
  };

  const utmParams = `?utm_source=compare&utm_medium=report${isComparison ? `&utm_competitor=${report.competitorName.toLowerCase()}` : '&utm_competitor=none'}`;

  return (
    <div className="w-full space-y-8 pb-20">
      {/* ─── Hero Header ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-[2rem] overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/5" />
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[80px]"
          />
        </div>
        <div className="relative px-8 py-12 md:py-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20 mb-2">
            <Shield className="w-3.5 h-3.5" />
            Personalized Report
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
            {isComparison ? `Verly vs ${report.competitorName}` : `How Verly Helps ${report.prospectDomain}`}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {isComparison
              ? <>The Complete Comparison for AI-Powered Support — personalized for <span className="text-foreground font-semibold">{report.prospectDomain}</span></>
              : <>Personalized benefits analysis for <span className="text-foreground font-semibold">{report.prospectDomain}</span> — powered by AI</>
            }
          </p>
          <div className="flex items-center justify-center gap-4 md:gap-6 pt-4 text-sm flex-wrap">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <TrendingUp className="w-4 h-4" />
              Fit Score: {report.fitScore}/100
            </div>
            {isComparison && (
              <>
                <div className="w-px h-5 bg-border" />
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  Verly wins {verlyWinCount}/{report.executiveSummary.length}
                </div>
              </>
            )}
            <div className="w-px h-5 bg-border" />
            <button onClick={copyShareLink} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors font-medium">
              <Link2 className="w-4 h-4" /> Share
            </button>
            <button onClick={() => downloadReport(report)} className="flex items-center gap-1.5 text-primary font-semibold hover:text-primary/80 transition-colors">
              <Download className="w-4 h-4" /> Download
            </button>
          </div>
        </div>
      </motion.div>

      {/* ─── Crawl Quality Banner ────────────────────────────────────────── */}
      {report.crawlQuality !== 'full' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="rounded-xl border border-chart-3/30 bg-chart-3/5 p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-chart-3 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">
              {report.crawlQuality === 'partial' ? 'Limited website data available' : 'Minimal website data available'}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {report.crawlQuality === 'partial'
                ? 'We could only access some pages on your site. The analysis is based on partial content.'
                : 'We had difficulty accessing your website. The analysis is based on minimal content and may be less personalized.'}
            </p>
          </div>
        </motion.div>
      )}

      {/* ─── Business Snapshot ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl p-6 md:p-8"
      >
        <div className="flex items-start gap-4 mb-5">
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Your Business at a Glance</h2>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{report.businessSummary}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20">{report.businessType}</span>
          <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-muted text-muted-foreground border border-border/30">{report.industry}</span>
          <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-muted text-muted-foreground border border-border/30 flex items-center gap-1.5">
            <Users className="w-3 h-3" /> {report.teamSizeEstimate}
          </span>
        </div>

        {report.painPoints.length > 0 && (
          <div className="rounded-xl bg-destructive/5 border border-destructive/10 p-4 space-y-3">
            <p className="text-xs font-bold text-destructive uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> Pain Points We Identified
            </p>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {report.painPoints.map((p, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-destructive/50 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>

      {/* ─── Executive Summary Table (comparison only) ────────────────────── */}
      {isComparison && <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl overflow-hidden"
      >
        <div className="p-6 md:p-8 pb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Executive Summary</h2>
          <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
            {verlyWinCount} of {report.executiveSummary.length} dimensions won by Verly
          </span>
        </div>
        <div className="overflow-x-auto px-2 pb-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-t border-border/30">
                <th className="text-left px-6 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider w-[20%]">Dimension</th>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider w-[30%]">{report.competitorName}</th>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-primary uppercase tracking-wider w-[30%]">Verly</th>
                <th className="text-center px-6 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider w-[20%]">Winner</th>
              </tr>
            </thead>
            <tbody>
              {report.executiveSummary.map((row, i) => (
                <tr
                  key={i}
                  className={`border-t border-border/15 transition-colors ${
                    row.winner === 'verly' ? 'bg-primary/[0.02] hover:bg-primary/[0.05]' : 'hover:bg-muted/20'
                  }`}
                >
                  <td className="px-6 py-4 font-semibold text-foreground">{row.dimension}</td>
                  <td className="px-6 py-4 text-muted-foreground">{row.competitor}</td>
                  <td className="px-6 py-4 text-foreground font-medium">{row.verly}</td>
                  <td className="px-6 py-4 text-center"><WinnerBadge winner={row.winner} competitorName={report.competitorName} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>}

      {/* ─── Fit Score + Radar Chart ─────────────────────────────────────── */}
      <div className={`grid ${isComparison ? 'md:grid-cols-2' : 'md:grid-cols-1 max-w-md mx-auto'} gap-6`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl p-8 flex flex-col items-center justify-center"
        >
          <FitScoreGauge score={report.fitScore} />
        </motion.div>
        {isComparison && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl p-6"
          >
            <h3 className="text-base font-bold text-foreground mb-1">Score Comparison</h3>
            <p className="text-xs text-muted-foreground mb-4">Verly vs {report.competitorName} across 10 dimensions (0-10 scale)</p>
            <ScoreRadarChart scores={report.dimensionScores} competitorName={report.competitorName} />
          </motion.div>
        )}
      </div>

      {/* ─── Suggested Use Cases (benefits only) ───────────────────────────── */}
      {!isComparison && report.suggestedUseCases?.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="space-y-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Rocket className="w-5 h-5 text-primary" /> Suggested AI Agent Use Cases
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {report.suggestedUseCases.map((uc, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
                className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl p-5 space-y-3 hover:border-primary/30 hover:shadow-md transition-all">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Rocket className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-foreground">{uc.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{uc.description}</p>
                <p className="text-xs font-semibold text-primary bg-primary/5 border border-primary/15 rounded-lg px-3 py-1.5">{uc.impact}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ─── Implementation Steps (benefits only) ─────────────────────────── */}
      {!isComparison && report.implementationSteps?.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl p-6 md:p-8 space-y-5">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-primary" /> Implementation Plan
          </h2>
          <div className="space-y-4">
            {report.implementationSteps.map((step) => (
              <div key={step.step} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {step.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                    <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{step.timeEstimate}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ─── Performance Metrics ─────────────────────────────────────────── */}
      {isComparison && <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl p-6 md:p-8"
      >
        <div className="mb-6">
          <h2 className="text-lg font-bold text-foreground">Documented Performance Metrics</h2>
          <p className="text-xs text-muted-foreground mt-1">Verly&apos;s published metrics vs {report.competitorName}&apos;s (gray = not publicly documented)</p>
        </div>
        <MetricsBarChart metrics={report.performanceMetrics} competitorName={report.competitorName} />
      </motion.div>}

      {/* ─── Detailed Comparison Sections (comparison only) ───────────────── */}
      {isComparison && report.sections.length > 0 && <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Detailed Comparison</h2>
          <button
            onClick={() => {
              const allIds = report.sections.map(s => s.id);
              const allOpen = allIds.every(id => expandedSections.has(id));
              setExpandedSections(allOpen ? new Set() : new Set(allIds));
            }}
            className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {report.sections.every(s => expandedSections.has(s.id)) ? 'Collapse All' : 'Expand All'}
          </button>
        </div>

        {report.sections.map((section, i) => {
          const isOpen = expandedSections.has(section.id);
          const scores = report.dimensionScores[section.id as keyof typeof report.dimensionScores];
          const verlyLeads = scores && scores.verly > scores.competitor;

          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.03 * i }}
              className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
                isOpen ? 'border-primary/20 bg-card/80 shadow-md shadow-primary/5' : 'border-border/40 bg-card/60'
              }`}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center gap-3 p-5 text-left hover:bg-muted/10 transition-colors"
              >
                <SectionNumber index={i} />
                <div className="flex-1 flex items-center gap-3 flex-wrap">
                  <span className="text-base font-semibold text-foreground">{section.title}</span>
                  {scores && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                        verlyLeads ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                      }`}>
                        Verly {scores.verly}/10
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full font-medium ${
                        !verlyLeads ? 'bg-muted text-foreground' : 'bg-muted/60 text-muted-foreground'
                      }`}>
                        {report.competitorName} {scores.competitor}/10
                      </span>
                    </div>
                  )}
                </div>
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6 space-y-5 border-t border-border/20 pt-5">
                      {/* Personalized Insight */}
                      <div className="rounded-xl bg-primary/5 border border-primary/15 p-4">
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                          <Target className="w-3 h-3" /> Personalized for {report.prospectDomain}
                        </p>
                        <p className="text-sm text-foreground leading-relaxed">{section.personalizedInsight}</p>
                      </div>

                      {/* Feature Table */}
                      <div className="overflow-x-auto rounded-xl border border-border/30">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-muted/30">
                              <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Feature</th>
                              <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">{report.competitorName}</th>
                              <th className="text-left px-4 py-3 text-xs font-bold text-primary uppercase tracking-wider">Verly</th>
                              <th className="text-center px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Relevance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {section.features.map((f, fi) => (
                              <tr key={fi} className={`border-t border-border/15 ${f.verlyWins ? 'bg-primary/[0.02]' : ''}`}>
                                <td className="px-4 py-3 font-medium text-foreground">
                                  <div className="flex items-center gap-2">
                                    {f.verlyWins
                                      ? <Check className="w-4 h-4 text-primary shrink-0" />
                                      : <Minus className="w-4 h-4 text-muted-foreground/40 shrink-0" />
                                    }
                                    {f.feature}
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">{f.competitor}</td>
                                <td className="px-4 py-3 text-foreground font-medium">{f.verly}</td>
                                <td className="px-4 py-3 text-center"><RelevanceBadge level={f.relevanceToUser} /></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Key Difference */}
                      <div className="rounded-xl bg-muted/20 border border-border/20 p-4">
                        <p className="text-[10px] font-bold text-foreground uppercase tracking-widest mb-2">Key Difference</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{section.keyDifference}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>}

      {/* ─── Personalized Benefits ────────────────────────────────────────── */}
      {report.personalizedBenefits.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6 md:p-8 space-y-5"
        >
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
              <Zap className="w-4.5 h-4.5 text-primary" />
            </div>
            How Verly Benefits {report.prospectDomain}
          </h2>
          <ul className="space-y-3">
            {report.personalizedBenefits.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-sm rounded-xl bg-card/50 border border-border/20 p-3.5">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-foreground leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* ─── Why Choose Verly (comparison only) ─────────────────────────── */}
      {isComparison && report.whenToChooseVerly.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl p-6 md:p-8 space-y-5"
        >
          <h2 className="text-lg font-bold text-foreground">Why Choose Verly</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {report.whenToChooseVerly.map((r, i) => (
              <li key={i} className="flex items-start gap-3 text-sm rounded-xl bg-primary/[0.03] border border-primary/10 p-3.5">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-foreground/80 leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* ─── Recommendation ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl bg-gradient-to-br from-primary via-chart-2 to-accent p-8 md:p-10 text-primary-foreground"
      >
        <h2 className="text-xl font-bold mb-3">Our Recommendation</h2>
        <p className="text-base text-primary-foreground/90 leading-relaxed max-w-3xl">{report.recommendation}</p>
      </motion.div>

      {/* ─── CTA ─────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-5 pt-6"
      >
        <h3 className="text-xl font-bold text-foreground">
          {isComparison ? 'Ready to see the difference?' : `Ready to deploy AI support for ${report.prospectDomain}?`}
        </h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={`/login${utmParams}`}>
            <Button size="lg" className="group rounded-full bg-gradient-to-r from-primary via-chart-2 to-primary bg-[length:200%_100%] animate-[shimmer_2.5s_linear_infinite] px-8 py-6 font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 hover:scale-[1.02] transition-all">
              <span className="relative z-10 flex items-center gap-2">
                Deploy an AI Agent for {report.industry || report.businessType}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 py-6 font-semibold border-border hover:bg-secondary"
            onClick={() => void openCalendlyPopup()}
          >
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Book a Demo
            </span>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Report generated on {new Date(report.generatedAt).toLocaleDateString()} based on publicly available data.
          This report link expires in 2 hours — download a copy to keep it.
        </p>
      </motion.div>
    </div>
  );
}
