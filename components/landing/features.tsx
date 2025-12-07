'use client';
import { motion } from 'framer-motion';
import { Code, TrendingUp, Type } from 'lucide-react';
import Image from 'next/image';

const mainFeatures = [
  {
    title: 'Sync with real-time data',
    description:
      'Connect your agent to systems like order management tools, CRMs, and more to seamlessly access data ranging from order details to active subscriptions and beyond.',
    image:
      'https://backend.chatbase.co/storage/v1/object/public/chatbase/landing/features/sync-with-realtime-data.png',
  },
  {
    title: 'Take actions on your systems',
    description:
      "Configure actions that your agent can perform within your systems or through one of our integrations, like updating a customer's subscription or changing their address.",
    image:
      'https://backend.chatbase.co/storage/v1/object/public/chatbase/landing/features/take-actions-on-your-systems.png',
  },
];

const secondaryFeatures = [
  {
    title: 'Compare AI models',
    description:
      'Experiment with various models and configurations to make sure you have the best setup for your use case.',
    image:
      'https://backend.chatbase.co/storage/v1/object/public/chatbase/landing/features/compare-ai-models.png',
  },
  {
    title: 'Smart escalation',
    description:
      'Give your agent instructions in natural language on when to escalate queries to a human agents.',
    image:
      'https://backend.chatbase.co/storage/v1/object/public/chatbase/landing/features/smart-escalation.png',
  },
  {
    title: 'Advanced reporting',
    description:
      'Gain insights and optimize agent performance with detailed analytics.',
    image:
      'https://backend.chatbase.co/storage/v1/object/public/chatbase/landing/features/advanced-reporting.png',
  },
];

const integrations = [
  {
    name: 'Make',
    logo: 'https://backend.chatbase.co/storage/v1/object/public/chatbase/landing/features/integrations/make.png',
  },
  {
    name: 'Zendesk',
    logo: 'https://backend.chatbase.co/storage/v1/object/public/chatbase/landing/features/integrations/zendesk.png',
  },
  {
    name: 'Notion',
    logo: 'https://backend.chatbase.co/storage/v1/object/public/chatbase/landing/features/integrations/notion.png',
  },
  {
    name: 'Slack',
    logo: 'https://backend.chatbase.co/storage/v1/object/public/chatbase/landing/features/integrations/slack.png',
  },
  {
    name: 'Stripe',
    logo: 'https://backend.chatbase.co/storage/v1/object/public/chatbase/landing/features/integrations/stripe.png',
  },
  {
    name: 'Salesforce',
    logo: 'https://backend.chatbase.co/storage/v1/object/public/chatbase/landing/features/integrations/salesforce.png',
  },
  {
    name: 'Cal.com',
    logo: 'https://backend.chatbase.co/storage/v1/object/public/chatbase/landing/features/integrations/cal.png',
  },
  {
    name: 'Calendly',
    logo: 'https://backend.chatbase.co/storage/v1/object/public/chatbase/landing/features/integrations/calendly.png',
  },
  {
    name: 'WhatsApp',
    logo: 'https://backend.chatbase.co/storage/v1/object/public/chatbase/landing/features/integrations/whatsapp.png',
  },
  {
    name: 'Zapier',
    logo: 'https://backend.chatbase.co/storage/v1/object/public/chatbase/landing/features/integrations/zapier.png',
  },
  {
    name: 'Messenger',
    logo: 'https://backend.chatbase.co/storage/v1/object/public/chatbase/landing/features/integrations/messenger.png',
  },
];

const bottomFeatures = [
  {
    icon: Code,
    title: 'API',
    description:
      'APIs, client libraries, and components to deeply integrate support into your product.',
  },
  {
    icon: Type,
    title: 'Whitelabel',
    description: 'Remove any VerlyAI branding from the chat widget.',
  },
  {
    icon: TrendingUp,
    title: 'Always improving',
    description:
      'Syncs with your systems and learns from previous interactions.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="mx-auto flex w-full max-w-7xl py-12" id="features">
      <div className="flex flex-col gap-4 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start gap-4"
        >
          <div className="inline-flex items-center rounded-full px-4 py-1.5 font-medium text-sm border border-border bg-background text-foreground">
            <div className="mr-2 size-2 rounded-full bg-gradient-to-r from-[#FB923C] via-[#F472B6] to-[#E879F9]"></div>
            Features
          </div>
          <h2 className="font-medium text-4xl text-foreground tracking-tight lg:text-5xl">
            Build the perfect customer-facing AI agent
          </h2>
          <p className="max-w-[800px] text-lg text-muted-foreground">
            VerlyAI gives you all the tools you need to train your perfect AI
            agent and connect it to your systems.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid gap-8 py-12">
          {/* Two Column Grid - Main Features */}
          <div className="grid gap-8 md:grid-cols-2">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border transition-all duration-300 bg-card hover:border-primary/30"
              >
                <div className="w-full">
                  <div className="w-full rounded-2xl px-4 pt-4">
                    <Image
                      alt={feature.title}
                      loading="lazy"
                      width={1216}
                      height={696}
                      decoding="async"
                      src={feature.image}
                      className="rounded-lg"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 px-5 pb-5">
                  <h3 className="font-medium text-lg text-foreground leading-[21.78px] tracking-[-0.02em]">
                    {feature.title}
                  </h3>
                  <p className="text-[14px] text-muted-foreground leading-[22px] tracking-[-0.02em]">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Three Column Grid - Secondary Features */}
          <div className="grid gap-8 md:grid-cols-3">
            {secondaryFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border transition-all duration-300 bg-card hover:border-primary/30"
              >
                <div className="w-full">
                  <div className="w-full rounded-2xl px-4 pt-4">
                    <Image
                      alt={feature.title}
                      loading="lazy"
                      width={794}
                      height={696}
                      decoding="async"
                      src={feature.image}
                      className="rounded-lg"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 px-5 pb-5">
                  <h3 className="font-medium text-lg text-foreground leading-[21.78px] tracking-[-0.02em]">
                    {feature.title}
                  </h3>
                  <p className="text-[14px] text-muted-foreground leading-[22px] tracking-[-0.02em]">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Works with your tools - Integrations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl border border-border bg-card"
          >
            {/* Desktop Layout */}
            <div className="hidden md:flex md:items-start md:justify-between md:p-8 md:pr-0">
              <div className="flex flex-col gap-2">
                <h3 className="font-medium text-lg text-foreground leading-[21.78px] tracking-[-0.02em]">
                  Works with your tools
                </h3>
                <p className="max-w-[400px] text-[14px] text-muted-foreground leading-[22px] tracking-[-0.02em]">
                  Integrate diverse data sources to enrich your agent&apos;s
                  knowledge and capabilities.
                </p>
              </div>
              <div
                className="relative flex max-h-[180px] max-w-[60%] flex-col gap-3 overflow-x-auto lg:overflow-hidden"
                style={{ scrollbarWidth: 'none' }}
              >
                {/* First Row */}
                <motion.div
                  className="flex gap-3"
                  animate={{ x: [0, -20, 0] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  {integrations.slice(0, 6).map((integration, index) => (
                    <div
                      key={index}
                      className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-muted p-1"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-primary/30">
                        <Image
                          loading="lazy"
                          alt={integration.name}
                          className="h-8 w-8 rounded-full"
                          src={integration.logo}
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="pr-2 font-medium text-sm text-foreground">
                        {integration.name}
                      </div>
                    </div>
                  ))}
                  <div className="w-[100px] shrink-0">
                    <Image
                      loading="lazy"
                      alt=""
                      className="h-10 w-[100px] rounded-full object-cover"
                      src="https://backend.chatbase.co/storage/v1/object/public/chatbase/landing/features/integrations/yellow-cloud.png"
                      width={100}
                      height={40}
                    />
                  </div>
                </motion.div>
                {/* Second Row */}
                <motion.div
                  className="ml-8 flex gap-3"
                  animate={{ x: [0, 20, 0] }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <div className="w-[100px] shrink-0">
                    <Image
                      loading="lazy"
                      alt=""
                      className="h-10 w-[100px] rounded-full object-cover"
                      src="https://backend.chatbase.co/storage/v1/object/public/chatbase/landing/features/integrations/green-cloud.png"
                      width={100}
                      height={40}
                    />
                  </div>
                  {integrations.slice(6).map((integration, index) => (
                    <div
                      key={index}
                      className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-muted p-1"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-primary/30">
                        <Image
                          loading="lazy"
                          alt={integration.name}
                          className="h-8 w-8 rounded-full"
                          src={integration.logo}
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="pr-2 font-medium text-sm text-foreground">
                        {integration.name}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden">
              <div
                className="relative mt-4 flex max-h-[180px] flex-col gap-3 overflow-x-auto px-4 lg:overflow-hidden"
                style={{ scrollbarWidth: 'none' }}
              >
                {/* First Row */}
                <div className="flex gap-3">
                  {integrations.slice(0, 6).map((integration, index) => (
                    <div
                      key={index}
                      className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-muted p-1"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-primary/30">
                        <Image
                          loading="lazy"
                          alt={integration.name}
                          className="h-8 w-8 rounded-full"
                          src={integration.logo}
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="pr-2 font-medium text-sm text-foreground">
                        {integration.name}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Second Row */}
                <div className="ml-8 flex gap-3">
                  {integrations.slice(6).map((integration, index) => (
                    <div
                      key={index}
                      className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-muted p-1"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-primary/30">
                        <Image
                          loading="lazy"
                          alt={integration.name}
                          className="h-8 w-8 rounded-full"
                          src={integration.logo}
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="pr-2 font-medium text-sm text-foreground">
                        {integration.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 p-6 pt-10">
                <h3 className="font-medium text-lg text-foreground leading-[21.78px] tracking-[-0.02em]">
                  Works with your tools
                </h3>
                <p className="max-w-[400px] text-[14px] text-muted-foreground leading-[22px] tracking-[-0.02em]">
                  Integrate diverse data sources to enrich your agent&apos;s
                  knowledge and capabilities.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bottom Features - 3 columns */}
          <div className="hidden md:block">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid w-full grid-cols-3 items-center gap-16"
            >
              {bottomFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <feature.icon
                    className="h-5 w-5 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-medium text-sm text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Features - Mobile */}
          <div className="md:hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 flex flex-col gap-8"
            >
              {bottomFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <feature.icon
                    className="h-5 w-5 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-medium text-sm text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
