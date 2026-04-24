'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Info, Loader2, Star } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { fetch } from '@/lib/api/axios';
import { PRICING_PLANS } from '@/lib/constants/pricing';

const trustSignals = [
  '24/7 priority support',
  '99.9% uptime SLA',
  'Automatic product updates',
  'GDPR-compliant workflows',
];

const pricingPlans = [
  {
    key: 'FREE',
    name: 'Free',
    priceMonthly: '$0',
    description: 'Start exploring basics with no credit card required.',
    features: [
      { text: '1 chatbot', info: 'Create and deploy 1 chatbot.' },
      { text: '50 messages per month', info: 'Included messages per month.' },
      { text: '10 data sources', info: 'Maximum 10 data sources per chatbot.' },
      { text: '1 team member', info: 'Just for you.' },
    ],
    gradient: 'from-primary/10 via-accent/10 to-primary/5',
    stats: '100',
    statsLabel: 'Messages / month',
    cta: 'Start free',
    ctaLoggedIn: 'Your current plan',
  },
  {
    key: 'HOBBY',
    name: 'Hobby',
    priceMonthly: '$29.99',
    description: 'Pay yearly and save more, billed at $359.88 per year.',
    features: [
      { text: '3 chatbots', info: 'Create and deploy up to 3 chatbots.' },
      { text: '3,000 messages per month', info: 'Included messages per month.' },
      { text: '20 data sources', info: 'Maximum 20 data sources per chatbot.' },
      { text: '2 team members', info: 'Invite a teammate.' },
      { text: 'AI Actions (3 per bot)', info: 'Access to custom actions and tools.' },
    ],
    gradient: 'from-chart-2/10 via-chart-3/10 to-chart-4/10',
    stats: '3k',
    statsLabel: 'Messages / month',
    cta: 'Start free',
    ctaLoggedIn: 'Upgrade to Hobby',
  },
  {
    key: 'STANDARD',
    name: 'Standard',
    popular: true,
    priceMonthly: '$79.99',
    description: 'Pay yearly and save more, billed at $959.88 per year.',
    features: [
      { text: '10 chatbots', info: 'Create and deploy up to 10 chatbots.' },
      { text: '12,000 messages per month', info: 'Included messages per month.' },
      { text: '100 data sources', info: 'Maximum 100 data sources per chatbot.' },
      { text: '5 team members', info: 'Invite your team.' },
      { text: 'AI Actions (5 per bot)', info: 'Access to custom actions and tools.' },
      { text: 'Remove branding', info: "Ability to remove 'Powered by' branding." },
    ],
    gradient: 'from-primary/10 via-accent/10 to-primary/5',
    stats: '12k',
    statsLabel: 'Messages / month',
    cta: 'Start free',
    ctaLoggedIn: 'Upgrade to Standard',
  },
  {
    key: 'PRO',
    name: 'Pro',
    priceMonthly: '$249.99',
    description: 'Pay yearly and save more, billed at $2999.99 per year.',
    features: [
      { text: '50 chatbots', info: 'Scale your operations.' },
      { text: '60,000 messages per month', info: 'Included messages per month.' },
      { text: '200 data sources', info: 'Maximum 200 data sources per chatbot.' },
      { text: '10 team members', info: 'For larger teams.' },
      { text: 'AI Actions (10 per bot)', info: 'Access to custom actions and tools.' },
      { text: 'Remove branding', info: "Ability to remove 'Powered by' branding." },
    ],
    gradient: 'from-chart-3/10 via-chart-4/10 to-chart-5/10',
    stats: '60k',
    statsLabel: 'Messages / month',
    cta: 'Start free',
    ctaLoggedIn: 'Upgrade to Pro',
  },
];

interface PricingSectionProps {
  accountId?: string;
}

export default function PricingSection({ accountId }: PricingSectionProps) {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = async (planKey: string) => {
    if (!accountId) return;

    const planConfig = PRICING_PLANS[planKey as keyof typeof PRICING_PLANS];
    if (!planConfig) return;

    setLoadingPlan(planKey);
    try {
      const response = await fetch('/api/dodo/checkout', {
        method: 'POST',
        data: {
          planId: planConfig.id,
          interval: 'month',
          accountId,
        },
      });

      const data = response.data as { url?: string };

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error('Failed to start checkout');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-12 lg:pb-32 lg:pt-28" id="pricing">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(191,219,254,0.45),transparent_48%)]" />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#bfdbfe] blur-[110px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.16, 0.24, 0.16] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#dbeafe] blur-[110px]"
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mb-6 inline-block"
          >
            <span className="common-pill-link">
              <span className="common-pill-link__badge font-sans-bold border-blue-200">Plans</span>
              <span className="common-pill-link__label">
                Straightforward pricing for every stage
              </span>
            </span>
          </motion.div>

          <div className="page-main-title mx-auto max-w-4xl">
            <h2 className="page-main-title__title font-title-bold">
              Pricing that scales with your tickets <span className="emphasis">not your headcount.</span>
            </h2>
          </div>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[#5f6f8d] md:text-xl">
            Pay for the conversations Verly resolves, not the agents you hire. Start free with 50 messages — upgrade when you&rsquo;re ready, never when you&rsquo;re forced to.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {['No per-seat fees', 'Cancel in one click', 'Pay only for what Verly resolves'].map((item) => (
              <div
                key={item}
                className="rounded-full border border-white/70 bg-white/85 px-4 py-2 text-sm font-semibold text-[#0f172a] shadow-[0_12px_30px_rgba(15,23,42,0.05)]"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid w-full items-stretch gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group relative h-full"
            >
              <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${plan.gradient} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`} />

              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                className={`
                  relative flex h-full flex-col rounded-[2rem] border p-8 transition-all duration-300
                  ${plan.popular
                    ? 'border-[#93c5fd] bg-[linear-gradient(180deg,#ffffff_0%,#eff6ff_100%)] shadow-[0_24px_60px_rgba(25,118,210,0.14)]'
                    : 'border-white/70 bg-white/90 shadow-[0_18px_50px_rgba(15,23,42,0.07)] hover:border-[#dbeafe]'
                  }
                `}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-0 right-0 flex justify-center">
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="flex items-center gap-1.5 rounded-full bg-[#1976d2] px-5 py-1.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(25,118,210,0.28)]"
                    >
                      <Star className="h-3.5 w-3.5 fill-current" />
                      Most Popular
                    </motion.div>
                  </div>
                )}

                <div className="mb-6 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-title-bold text-2xl text-[#0f172a]">{plan.name}</h3>
                    <span className="rounded-full border border-[#dbeafe] bg-[#eff6ff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#1976d2]">
                      {plan.stats}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold tracking-tight text-[#0f172a]">
                      {plan.priceMonthly}
                    </span>
                    {plan.priceMonthly !== 'Custom' && (
                      <span className="font-medium text-[#64748b]">/month</span>
                    )}
                  </div>
                  <p className="min-h-[48px] text-sm leading-relaxed text-[#5f6f8d]">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8 rounded-[1.5rem] border border-[#e2e8f0] bg-[#f8fbff] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748b]">
                    Capacity
                  </p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="bg-gradient-to-r from-[#0f172a] to-[#1976d2] bg-clip-text text-3xl font-bold text-transparent">
                      {plan.stats}
                    </span>
                    <span className="text-sm font-medium text-[#64748b]">
                      {plan.statsLabel}
                    </span>
                  </div>
                </div>

                <div className="mb-8 flex-grow">
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature.text} className="flex items-start gap-3 text-sm">
                        <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#eff6ff]">
                          <Check className="h-3.5 w-3.5 text-[#1976d2]" />
                        </div>
                        <div className="flex min-w-0 items-start gap-2">
                          <span className="leading-relaxed text-[#334155] transition-colors group-hover:text-[#0f172a]">
                            {feature.text}
                          </span>
                          {feature.info ? (
                            <span className="relative mt-0.5 inline-flex">
                              <button
                                type="button"
                                aria-label={`More info about: ${feature.text}`}
                                className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[#94a3b8] transition-colors hover:text-[#0f172a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1976d2]"
                              >
                                <Info className="h-4 w-4" />
                              </button>
                              <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-max max-w-[240px] -translate-x-1/2 rounded-xl border border-[#dbe5f1] bg-white px-3 py-2 text-xs leading-snug text-[#0f172a] opacity-0 shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition-opacity duration-150 [span:has(button:hover)_&]:opacity-100 [span:has(button:focus-visible)_&]:opacity-100">
                                {feature.info}
                              </span>
                            </span>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {accountId ? (
                  <button
                    type="button"
                    onClick={() => handleCheckout(plan.key)}
                    disabled={loadingPlan === plan.key}
                    className={`
                      flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold tracking-wide transition-all duration-300
                      ${plan.popular
                        ? 'bg-[#1976d2] text-white shadow-[0_18px_40px_rgba(25,118,210,0.28)] hover:-translate-y-0.5 hover:bg-[#1565c0]'
                        : 'border border-[#dbe5f1] bg-white text-[#0f172a] shadow-sm hover:-translate-y-0.5 hover:border-[#93c5fd] hover:bg-[#f8fbff]'
                      }
                    `}
                  >
                    {loadingPlan === plan.key ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        {plan.ctaLoggedIn || plan.cta}
                        <motion.span className="inline-block" initial={{ x: 0 }} whileHover={{ x: 3 }}>
                          →
                        </motion.span>
                      </>
                    )}
                  </button>
                ) : (
                  <Link
                    href={`/register?plan=${plan.key.toLowerCase()}`}
                    className={`
                      flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold tracking-wide transition-all duration-300
                      ${plan.popular
                        ? 'bg-[#1976d2] text-white shadow-[0_18px_40px_rgba(25,118,210,0.28)] hover:-translate-y-0.5 hover:bg-[#1565c0]'
                        : 'border border-[#dbe5f1] bg-white text-[#0f172a] shadow-sm hover:-translate-y-0.5 hover:border-[#93c5fd] hover:bg-[#f8fbff]'
                      }
                    `}
                  >
                    {plan.cta}
                    <motion.span className="inline-block" initial={{ x: 0 }} whileHover={{ x: 3 }}>
                      →
                    </motion.span>
                  </Link>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Custom Plan — Talk to Sales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="group relative mt-6"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-[#1976d2]/8 via-[#1565c0]/8 to-[#0d47a1]/8 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative flex flex-col items-center justify-between gap-6 rounded-[2rem] border border-[#93c5fd]/40 bg-[linear-gradient(135deg,#ffffff_0%,#eff6ff_50%,#dbeafe_100%)] px-8 py-8 shadow-[0_18px_50px_rgba(15,23,42,0.07)] md:flex-row md:px-12 md:py-10">
            <div className="flex-1 text-center md:text-left">
              <div className="mb-1 inline-flex items-center gap-2">
                <span className="rounded-full bg-[#1976d2]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#1976d2]">
                  Enterprise
                </span>
              </div>
              <h3 className="font-title-bold text-2xl text-[#0f172a] md:text-3xl">
                Need a custom plan?
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#5f6f8d] md:text-base">
                Unlimited chatbots, dedicated support, custom integrations, and SLAs tailored to your team.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://calendly.com/rdhakad2002/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-[#1976d2] px-8 py-4 text-sm font-semibold tracking-wide text-white shadow-[0_18px_40px_rgba(25,118,210,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1565c0]"
              >
                Talk to Sales
                <motion.span className="inline-block" initial={{ x: 0 }} whileHover={{ x: 3 }}>
                  →
                </motion.span>
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-14 flex flex-wrap justify-center gap-3 md:gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {trustSignals.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2.5 rounded-full border border-white/70 bg-white/85 px-5 py-2.5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]"
            >
              <div className="h-2 w-2 rounded-full bg-[#1976d2]" />
              <span className="text-sm font-medium text-[#475569]">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
