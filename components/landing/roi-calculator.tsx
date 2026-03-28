'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Clock,
  DollarSign,
  Users,
  Zap,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { openCalendlyPopup } from '@/lib/calendly';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const heroBenefits = [
  {
    icon: DollarSign,
    label: 'Lower support costs',
    description: 'Model savings in under a minute',
    tone: 'green',
  },
  {
    icon: Zap,
    label: 'Faster resolutions',
    description: 'Estimate automation impact instantly',
    tone: 'blue',
  },
  {
    icon: Users,
    label: 'Lean team planning',
    description: 'See capacity you can reassign',
    tone: 'purple',
  },
] as const;

function fmt(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

function fmtNum(n: number): string {
  return n.toLocaleString('en-US');
}

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  hint: string;
  prefix?: string;
  suffix?: string;
}

function InputField({ label, value, onChange, hint, prefix, suffix }: InputFieldProps) {
  return (
    <div className="space-y-2.5">
      <label className="text-sm font-semibold text-[#0f172a]">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#64748b]">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className={`w-full rounded-2xl border border-[#dbe5f1] bg-white/95 px-4 py-3.5 text-sm font-medium text-[#0f172a] shadow-[0_10px_30px_rgba(15,23,42,0.04)] outline-none transition-all focus:border-[#1976d2] focus:ring-4 focus:ring-[#bfdbfe] ${prefix ? 'pl-8' : ''} ${suffix ? 'pr-12' : ''}`}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#64748b]">
            {suffix}
          </span>
        )}
      </div>
      <p className="text-xs text-[#64748b]">{hint}</p>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
  delay?: number;
}

function StatCard({ label, value, subtext, icon, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex flex-col gap-2 rounded-[1.5rem] border border-white/70 bg-white/85 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#bfdbfe]"
    >
      <div className="flex items-center gap-2 text-[#64748b]">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-[0.18em]">{label}</span>
      </div>
      <p className="text-2xl font-bold tracking-tight text-[#0f172a]">{value}</p>
      <p className="text-xs text-[#64748b]">{subtext}</p>
    </motion.div>
  );
}

export default function ROICalculator() {
  const [conversations, setConversations] = useState(120000);
  const [avgSalary, setAvgSalary] = useState(50000);
  const [numAgents, setNumAgents] = useState(60);
  const [resolutionTime, setResolutionTime] = useState(8);
  const [growthRate, setGrowthRate] = useState(10);
  const [automationRate, setAutomationRate] = useState(90);

  const results = useMemo(() => {
    const costPerConversation = numAgents > 0 && conversations > 0
      ? (numAgents * avgSalary) / conversations
      : 0;
    const automatedConversations = conversations * (automationRate / 100);
    const year1Savings = automatedConversations * costPerConversation;
    const totalPayroll = numAgents * avgSalary;
    const payrollPercent = totalPayroll > 0 ? (year1Savings / totalPayroll) * 100 : 0;
    const agentsFreed = conversations > 0
      ? Math.floor(automatedConversations / (conversations / Math.max(numAgents, 1)))
      : 0;
    const hoursSavedPerYear = (automatedConversations * resolutionTime) / 60;
    const totalHoursPerYear = (conversations * resolutionTime) / 60;
    const timeReductionPercent = totalHoursPerYear > 0
      ? (hoursSavedPerYear / totalHoursPerYear) * 100
      : 0;
    const newResolutionTime = resolutionTime * (1 - automationRate / 100)
      + (resolutionTime * 0.15 * (automationRate / 100));
    const resolutionImprovement = resolutionTime > 0
      ? ((resolutionTime - newResolutionTime) / resolutionTime) * 100
      : 0;
    const hoursSavedMonthly = hoursSavedPerYear / 12;

    const yearlyData = [];
    let cumulativeSavings = 0;
    for (let y = 1; y <= 5; y += 1) {
      const factor = Math.pow(1 + growthRate / 100, y - 1);
      const yearlySavings = year1Savings * factor;
      cumulativeSavings += yearlySavings;
      yearlyData.push({
        year: `Year ${y}`,
        savings: Math.round(yearlySavings),
        cumulative: Math.round(cumulativeSavings),
      });
    }

    const total5Year = cumulativeSavings;
    const monthlyAvg = total5Year / 60;

    return {
      year1Savings,
      payrollPercent,
      hoursSavedPerYear,
      timeReductionPercent,
      automatedConversations,
      agentsFreed,
      total5Year,
      monthlyAvg,
      resolutionImprovement,
      newResolutionTime,
      hoursSavedMonthly,
      yearlyData,
    };
  }, [conversations, avgSalary, numAgents, resolutionTime, growthRate, automationRate]);

  return (
    <div className="w-full text-[#111827]">
      <section className="home-hero relative overflow-hidden pb-10 pt-32 md:pt-40">
        <div className="common-hero">
          <div className="common-hero__wrapper px-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 inline-block"
            >
              <span className="common-pill-link">
                <span className="common-pill-link__badge font-sans-bold border-blue-200">Pricing</span>
                <span className="common-pill-link__label">
                  ROI calculator for AI-powered support teams
                </span>
              </span>
            </motion.div>

            <div className="page-main-title mb-0">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="page-main-title__title font-title-bold"
              >
                See how much you can <span className="emphasis">save with Verly AI</span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-3xl text-lg leading-relaxed text-[#5f6f8d] md:text-xl"
            >
              Plug in your support metrics and model how automation changes payroll
              efficiency, resolution speed, and long-term operating leverage.
            </motion.p>

            <div className="page-main-title__benefits">
              <div className="common-benefit-pills">
                {heroBenefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={benefit.label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + index * 0.08 }}
                      className={`common-benefit-pill common-benefit-pill--${benefit.tone}`}
                    >
                      <div className="common-benefit-pill__icon">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="common-benefit-pill__text">
                        <span className="common-benefit-pill__label font-sans-bold">
                          {benefit.label}
                        </span>
                        <span className="common-benefit-pill__description">
                          {benefit.description}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(247,251,255,0.98)_100%)] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:p-10"
          >
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-8">
                <div>
                  <h2 className="font-title-bold text-2xl text-[#0f172a] md:text-3xl">
                    Your current support operation
                  </h2>
                  <p className="mt-2 text-sm text-[#5f6f8d]">
                    Enter your current metrics to estimate the revenue and time impact
                    of AI automation.
                  </p>
                </div>

                <div className="space-y-6">
                  <InputField
                    label="Customer Conversations (Annual)"
                    value={conversations}
                    onChange={setConversations}
                    hint="Total tickets handled per year"
                  />
                  <InputField
                    label="Average Annual Agent Salary ($)"
                    value={avgSalary}
                    onChange={setAvgSalary}
                    hint="Annual salary per customer service agent"
                    prefix="$"
                  />
                  <InputField
                    label="Number of Agents"
                    value={numAgents}
                    onChange={setNumAgents}
                    hint="Current customer service team size"
                  />
                  <InputField
                    label="Average Resolution Time (Minutes)"
                    value={resolutionTime}
                    onChange={setResolutionTime}
                    hint="Average time per ticket resolution"
                  />
                  <InputField
                    label="Expected Growth Rate (%)"
                    value={growthRate}
                    onChange={setGrowthRate}
                    hint="Yearly increase in ticket volume"
                    suffix="%"
                  />

                  <div className="space-y-4 rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#0f172a]">
                        Target automation rate
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-lg font-bold text-[#1976d2] shadow-sm">
                        {automationRate}%
                      </span>
                    </div>
                    <Slider
                      value={[automationRate]}
                      onValueChange={(value) => setAutomationRate(value[0])}
                      min={10}
                      max={95}
                      step={5}
                    />
                    <p className="text-xs text-[#5f6f8d]">
                      % of conversations you want AI agents to fully handle on
                      their own.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="font-title-bold text-2xl text-[#0f172a] md:text-3xl">
                    Your projected impact
                  </h2>
                  <p className="mt-2 text-sm text-[#5f6f8d]">
                    Modeled from your inputs and benchmarked support automation
                    assumptions.
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="rounded-[1.75rem] border border-[#dbeafe] bg-[linear-gradient(135deg,#1976d2_0%,#3b82f6_52%,#60a5fa_100%)] p-6 text-center text-white shadow-[0_24px_60px_rgba(25,118,210,0.35)]"
                >
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
                    Total 5-year savings
                  </p>
                  <p className="mb-1 text-4xl font-bold tracking-tight md:text-5xl">
                    {fmt(results.total5Year)}
                  </p>
                  <p className="text-sm text-white/80">
                    That&apos;s <span className="font-semibold text-white">{fmt(results.monthlyAvg)}</span>{' '}
                    in average monthly savings over five years.
                  </p>
                </motion.div>

                <div className="grid grid-cols-2 gap-3">
                  <StatCard
                    label="Year 1 Savings"
                    value={fmt(results.year1Savings)}
                    subtext={`${results.payrollPercent.toFixed(0)}% of payroll`}
                    icon={<DollarSign className="h-4 w-4" />}
                    delay={0.1}
                  />
                  <StatCard
                    label="Hours Saved/Year"
                    value={fmtNum(Math.round(results.hoursSavedPerYear))}
                    subtext={`${results.timeReductionPercent.toFixed(0)}% time reduction`}
                    icon={<Clock className="h-4 w-4" />}
                    delay={0.15}
                  />
                  <StatCard
                    label="Automated Tickets"
                    value={fmtNum(Math.round(results.automatedConversations))}
                    subtext={`${automationRate}% automation rate`}
                    icon={<Zap className="h-4 w-4" />}
                    delay={0.2}
                  />
                  <StatCard
                    label="Agents Reassigned"
                    value={fmtNum(results.agentsFreed)}
                    subtext="To higher-value work"
                    icon={<Users className="h-4 w-4" />}
                    delay={0.25}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#0f172a]">
                    Efficiency improvements
                  </h3>
                  <div className="space-y-3 rounded-[1.5rem] border border-[#e2e8f0] bg-[#f8fbff] p-5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-[#5f6f8d]">
                        Resolution time improvement
                      </span>
                      <span className="rounded-full bg-[#dbeafe] px-3 py-1 text-sm font-bold text-[#1976d2]">
                        {results.resolutionImprovement.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-[#5f6f8d]">
                        New average resolution time
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-[#0f172a] shadow-sm">
                        {results.newResolutionTime.toFixed(1)} minutes
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-[#5f6f8d]">
                        Hours saved monthly
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-[#0f172a] shadow-sm">
                        {fmtNum(Math.round(results.hoursSavedMonthly))} hours
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#0f172a]">
                    5-year compound savings
                  </h3>
                  <p className="text-xs text-[#5f6f8d]">
                    Your modeled savings as support volume grows over time.
                  </p>
                </div>
                <div className="h-[280px] rounded-[1.5rem] border border-[#e2e8f0] bg-white/90 p-4 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results.yearlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#1976d2" stopOpacity={0.95} />
                          <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.45} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#dbe5f1" opacity={0.8} />
                      <XAxis
                        dataKey="year"
                        tick={{ fontSize: 12, fill: '#64748b' }}
                        axisLine={{ stroke: '#dbe5f1' }}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: '#64748b' }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value: number) => fmt(value)}
                      />
                      <Tooltip
                        formatter={(value) => [fmt(Number(value ?? 0)), 'Savings']}
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #dbe5f1',
                          borderRadius: '12px',
                          fontSize: '12px',
                          boxShadow: '0 16px 40px rgba(15, 23, 42, 0.08)',
                        }}
                      />
                      <Bar dataKey="savings" radius={[8, 8, 0, 0]} maxBarSize={50}>
                        {results.yearlyData.map((_, index) => (
                          <Cell key={index} fill="url(#savingsGradient)" />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#0f172a]">
                    Year-by-year breakdown
                  </h3>
                  <p className="text-xs text-[#5f6f8d]">
                    Track annual and cumulative savings side by side.
                  </p>
                </div>
                <div className="space-y-3 rounded-[1.5rem] border border-[#e2e8f0] bg-white/90 p-4 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
                  {results.yearlyData.map((data, index) => (
                    <div key={data.year} className="flex items-center gap-3">
                      <span className="w-12 shrink-0 text-xs font-medium text-[#64748b]">
                        {data.year}
                      </span>
                      <div className="relative h-8 flex-1 overflow-hidden rounded-lg bg-[#eff6ff]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(data.cumulative / results.yearlyData[4].cumulative) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className="flex h-full items-center justify-end rounded-lg bg-gradient-to-r from-[#60a5fa] to-[#1976d2] px-3"
                        >
                          <span className="whitespace-nowrap text-[10px] font-bold text-white">
                            {fmt(data.cumulative)}
                          </span>
                        </motion.div>
                      </div>
                      <div className="w-20 shrink-0 text-right">
                        <p className="text-xs font-semibold text-[#0f172a]">
                          {fmt(data.savings)}
                        </p>
                        <p className="text-[10px] text-[#64748b]">per year</p>
                      </div>
                    </div>
                  ))}
                  <div className="mt-3 flex items-center justify-between border-t border-[#e2e8f0] pt-3">
                    <span className="text-sm font-medium text-[#5f6f8d]">
                      Total 5-year savings
                    </span>
                    <span className="bg-gradient-to-r from-[#1976d2] to-[#60a5fa] bg-clip-text text-lg font-bold text-transparent">
                      {fmt(results.total5Year)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 space-y-4 text-center"
            >
              <button
                type="button"
                className="common-button font-sans-bold text-base shadow-[0_16px_40px_rgba(25,118,210,0.3)]"
                onClick={() => void openCalendlyPopup()}
              >
                <Calendar className="h-5 w-5" />
                Book a Custom Demo
                <span className="common-button__icon">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
              <p className="text-sm text-[#5f6f8d]">
                Get a personalized savings report tailored to your support workload.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
