'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import {
  DollarSign, Clock, Users, Zap, ArrowRight, Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openCalendlyPopup } from '@/lib/calendly';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell,
} from 'recharts';

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
    <div className="space-y-2">
      <label className="text-sm font-semibold text-foreground">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">{prefix}</span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className={`w-full rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm px-4 py-3.5 text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all ${prefix ? 'pl-8' : ''} ${suffix ? 'pr-12' : ''}`}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">{suffix}</span>
        )}
      </div>
      <p className="text-xs text-muted-foreground">{hint}</p>
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
      className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl p-5 flex flex-col gap-2 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>
      <p className="text-xs text-muted-foreground">{subtext}</p>
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
    const newResolutionTime = resolutionTime * (1 - automationRate / 100) + (resolutionTime * 0.15 * (automationRate / 100));
    const resolutionImprovement = resolutionTime > 0
      ? ((resolutionTime - newResolutionTime) / resolutionTime) * 100
      : 0;
    const hoursSavedMonthly = hoursSavedPerYear / 12;

    const yearlyData = [];
    let cumulativeSavings = 0;
    for (let y = 1; y <= 5; y++) {
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
    <div className="w-full">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/8 via-background to-transparent" />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[120px]"
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase border border-primary/20">
              ROI Calculator
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-4"
          >
            See How Much You Can{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-chart-2 to-accent">
              Save with Verly AI
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Companies using AI automation save an average of $500K+ annually while improving customer satisfaction by 40%.{' '}
            <span className="text-foreground font-medium">See your potential in under 60 seconds.</span>
          </motion.p>
        </div>
      </section>

      {/* Calculator */}
      <section className="relative pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-border/40 bg-card/40 backdrop-blur-xl p-6 md:p-10 shadow-xl"
          >
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Left: Inputs */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">Your Current Operations</h2>
                  <p className="text-sm text-muted-foreground">Enter your metrics below to unlock your savings potential</p>
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

                  {/* Automation Rate Slider */}
                  <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">Target Automation Rate:</span>
                      <span className="text-lg font-bold text-primary">{automationRate}%</span>
                    </div>
                    <Slider
                      value={[automationRate]}
                      onValueChange={(v) => setAutomationRate(v[0])}
                      min={10}
                      max={95}
                      step={5}
                    />
                    <p className="text-xs text-muted-foreground">% of conversations you want AI agents to handle on their own</p>
                  </div>
                </div>
              </div>

              {/* Right: Results */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">Your Savings Potential</h2>
                  <p className="text-sm text-muted-foreground">Based on industry benchmarks and your inputs</p>
                </div>

                {/* Total 5-Year Savings highlight */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="rounded-2xl bg-gradient-to-br from-primary via-chart-2 to-accent p-6 text-primary-foreground text-center shadow-lg shadow-primary/25"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2 text-primary-foreground/80">Total 5-Year Savings</p>
                  <p className="text-4xl md:text-5xl font-bold tracking-tight mb-1">
                    {fmt(results.total5Year)}
                  </p>
                  <p className="text-sm text-primary-foreground/80">
                    That&apos;s <span className="font-semibold text-primary-foreground">{fmt(results.monthlyAvg)}</span> saved every month!
                  </p>
                </motion.div>

                {/* Stat cards grid */}
                <div className="grid grid-cols-2 gap-3">
                  <StatCard
                    label="Year 1 Savings"
                    value={fmt(results.year1Savings)}
                    subtext={`${results.payrollPercent.toFixed(0)}% of payroll`}
                    icon={<DollarSign className="w-4 h-4" />}
                    delay={0.1}
                  />
                  <StatCard
                    label="Hours Saved/Year"
                    value={fmtNum(Math.round(results.hoursSavedPerYear))}
                    subtext={`${results.timeReductionPercent.toFixed(0)}% time reduction`}
                    icon={<Clock className="w-4 h-4" />}
                    delay={0.15}
                  />
                  <StatCard
                    label="Automated Tickets"
                    value={fmtNum(Math.round(results.automatedConversations))}
                    subtext={`${automationRate}% automation rate`}
                    icon={<Zap className="w-4 h-4" />}
                    delay={0.2}
                  />
                  <StatCard
                    label="Agents Reassigned"
                    value={fmtNum(results.agentsFreed)}
                    subtext="To higher-value work"
                    icon={<Users className="w-4 h-4" />}
                    delay={0.25}
                  />
                </div>

                {/* Efficiency Improvements */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-foreground">Efficiency Improvements</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Resolution Time Improvement</span>
                      <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg">
                        {results.resolutionImprovement.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">New Average Resolution Time</span>
                      <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg">
                        {results.newResolutionTime.toFixed(1)} minutes
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Hours Saved Monthly</span>
                      <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg">
                        {fmtNum(Math.round(results.hoursSavedMonthly))} hours
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              {/* 5-Year Compound Savings Chart */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">5-Year Compound Savings</h3>
                  <p className="text-xs text-muted-foreground">Your savings grow year over year with business growth</p>
                </div>
                <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm p-4 h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results.yearlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.9} />
                          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.4} />
                      <XAxis
                        dataKey="year"
                        tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                        axisLine={{ stroke: 'var(--color-border)' }}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v: number) => fmt(v)}
                      />
                      <Tooltip
                        formatter={(value) => [fmt(Number(value ?? 0)), 'Savings']}
                        contentStyle={{
                          backgroundColor: 'var(--color-card)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '12px',
                          fontSize: '12px',
                        }}
                      />
                      <Bar dataKey="savings" radius={[8, 8, 0, 0]} maxBarSize={50}>
                        {results.yearlyData.map((_, i) => (
                          <Cell key={i} fill="url(#savingsGradient)" />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Year-by-Year Breakdown */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Year-by-Year Breakdown</h3>
                  <p className="text-xs text-muted-foreground">Cumulative savings over 5 years</p>
                </div>
                <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm p-4 space-y-3">
                  {results.yearlyData.map((d, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs font-medium text-muted-foreground w-12 shrink-0">{d.year}</span>
                      <div className="flex-1 h-8 rounded-lg bg-muted/40 overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(d.cumulative / results.yearlyData[4].cumulative) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                          className="h-full rounded-lg bg-gradient-to-r from-primary/80 to-primary flex items-center justify-end px-3"
                        >
                          <span className="text-[10px] font-bold text-primary-foreground whitespace-nowrap">{fmt(d.cumulative)}</span>
                        </motion.div>
                      </div>
                      <div className="text-right w-20 shrink-0">
                        <p className="text-xs font-semibold text-foreground">{fmt(d.savings)}</p>
                        <p className="text-[10px] text-muted-foreground">per year</p>
                      </div>
                    </div>
                  ))}
                  <div className="pt-3 mt-3 border-t border-border/40 flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Total 5-Year Savings</span>
                    <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                      {fmt(results.total5Year)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 text-center space-y-4"
            >
              <Button
                size="lg"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary via-chart-2 to-primary bg-[length:200%_100%] animate-[shimmer_2.5s_linear_infinite] px-8 py-6 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-primary/40 hover:-translate-y-0.5 hover:scale-[1.02]"
                onClick={() => void openCalendlyPopup()}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Book a Custom Demo
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
              <p className="text-sm text-muted-foreground">
                Get a personalized savings report for your business
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
