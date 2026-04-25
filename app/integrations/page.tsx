import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import StickyMobileCta from "@/components/landing/sticky-mobile-cta";
import { buildBreadcrumbSchema } from "@/lib/seo-schema";
import { siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Integrations — Slack, HubSpot, Shopify, Zendesk & more",
  description:
    "Verly plugs into the tools your team already uses — Slack, HubSpot, Salesforce, Shopify, Zendesk, Stripe, Notion, and 30+ more. Every conversation stays in sync.",
  alternates: { canonical: "/integrations" },
  openGraph: {
    title: "Integrations — Slack, HubSpot, Shopify, Zendesk & more",
    description:
      "Verly connects to the tools your team already opens every morning. Browse every integration.",
    url: `${siteConfig.url}/integrations`,
    type: "website",
  },
  twitter: {
    title: "Integrations — Slack, HubSpot, Shopify, Zendesk & more",
    description:
      "Verly plugs into the tools your team already uses. Slack, HubSpot, Salesforce, Shopify, and more.",
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Integrations", path: "/integrations" },
]);

type Integration = {
  name: string;
  category: string;
  blurb: string;
  comingSoon?: boolean;
};

const categories: { heading: string; description: string; items: Integration[] }[] = [
  {
    heading: "CRM & Sales",
    description: "Keep every conversation synced with the systems your sales team runs.",
    items: [
      { name: "HubSpot", category: "CRM & Sales", blurb: "Auto-create contacts and log conversations to timelines." },
      { name: "Salesforce", category: "CRM & Sales", blurb: "Two-way sync for Leads, Contacts, and Cases." },
      { name: "Pipedrive", category: "CRM & Sales", blurb: "Push qualified leads straight to your pipeline." },
      { name: "Attio", category: "CRM & Sales", blurb: "Modern CRM sync for product-led teams." },
    ],
  },
  {
    heading: "Team collaboration",
    description: "Your agents already live here. Verly shows up where the work is.",
    items: [
      { name: "Slack", category: "Team", blurb: "Handoff notifications, mentions, and message replies from threads." },
      { name: "Microsoft Teams", category: "Team", blurb: "Channel-based handoffs and escalation alerts." },
      { name: "Linear", category: "Team", blurb: "Turn a ticket into an engineering issue in one click." },
      { name: "Jira", category: "Team", blurb: "Create and link issues from any conversation." },
    ],
  },
  {
    heading: "E-commerce",
    description: "Order lookups, returns, and fraud escalation — automated.",
    items: [
      { name: "Shopify", category: "E-commerce", blurb: "Order status, tracking, and returns inside every conversation." },
      { name: "WooCommerce", category: "E-commerce", blurb: "Native order sync and refund workflows." },
      { name: "Magento", category: "E-commerce", blurb: "Enterprise commerce support with product-aware replies." },
      { name: "Stripe", category: "E-commerce", blurb: "Subscription status, invoices, and refund actions." },
    ],
  },
  {
    heading: "Knowledge & docs",
    description: "Verly learns from your content without anyone re-keying it.",
    items: [
      { name: "Notion", category: "Knowledge", blurb: "Live-sync databases, docs, and wiki pages." },
      { name: "Confluence", category: "Knowledge", blurb: "Enterprise wiki ingestion with access controls." },
      { name: "Google Docs", category: "Knowledge", blurb: "Pull in public docs and keep them in sync." },
      { name: "GitBook", category: "Knowledge", blurb: "Product docs as a live training source." },
    ],
  },
  {
    heading: "Ticketing & support",
    description: "Migrate from or co-exist with your current helpdesk.",
    items: [
      { name: "Zendesk", category: "Ticketing", blurb: "Import macros and triggers. Run side-by-side for a week." },
      { name: "Intercom", category: "Ticketing", blurb: "Import conversations, tags, and user properties." },
      { name: "Freshdesk", category: "Ticketing", blurb: "Two-way ticket sync during migration." },
      { name: "Help Scout", category: "Ticketing", blurb: "Conversation + mailbox import with a one-click tool." },
    ],
  },
  {
    heading: "Channels",
    description: "One agent. Every surface where your customers already are.",
    items: [
      { name: "WhatsApp Business", category: "Channels", blurb: "Native Business API integration — templates and media." },
      { name: "Twilio", category: "Channels", blurb: "BYOC voice numbers and SMS channels." },
      { name: "Plivo", category: "Channels", blurb: "Alternative telephony for global voice coverage." },
      { name: "Instagram DM", category: "Channels", blurb: "Respond to DMs from the same shared inbox.", comingSoon: true },
    ],
  },
];

export default function IntegrationsPage() {
  const totalCount = categories.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <main className="relative min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_36%,#ffffff_100%)] text-[#0f172a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />

      <div className="relative mx-auto w-[95%] max-w-[1200px] pb-24 pt-32 md:pt-40">
        {/* Hero */}
        <header className="max-w-[720px]">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dbe5f7] bg-white/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#5872a8] shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            {totalCount}+ integrations
          </div>
          <h1 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[40px] leading-[1.05] tracking-[-0.04em] text-[#0f172a] md:text-[64px]">
            If it&rsquo;s in your stack,{" "}
            <span className="bg-[linear-gradient(180deg,#4f7dff_0%,#315EEA_100%)] bg-clip-text text-transparent">
              Verly already talks to it.
            </span>
          </h1>
          <p className="mt-5 text-[17px] leading-[1.7] text-[#5d6b8b] md:text-[19px]">
            Every support conversation touches five other systems — the CRM, the
            inbox, the order database, the ticket queue. Verly plugs into them by
            default so your team never has to alt-tab mid-conversation.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#141923] px-7 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1d2432]"
            >
              Start free — agent live in 10 min
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#d6d9e2] bg-white px-7 text-[14px] font-semibold text-[#0f172a] transition-all hover:-translate-y-0.5 hover:bg-[#f8fafc]"
            >
              Read integration docs
            </Link>
          </div>
        </header>

        {/* Categories */}
        <div className="mt-16 space-y-14">
          {categories.map((cat) => (
            <section key={cat.heading} aria-labelledby={`cat-${cat.heading}`}>
              <div className="mb-6 max-w-[640px]">
                <h2
                  id={`cat-${cat.heading}`}
                  className="font-[Georgia,Times,'Times_New_Roman',serif] text-[26px] leading-[1.15] tracking-[-0.025em] text-[#0f172a] md:text-[32px]"
                >
                  {cat.heading}
                </h2>
                <p className="mt-2 text-[15px] leading-[1.65] text-[#5d6b8b] md:text-[16px]">
                  {cat.description}
                </p>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {cat.items.map((item) => (
                  <li key={item.name}>
                    <article className="flex h-full flex-col rounded-[22px] border border-[#e4e9f4] bg-white/95 p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)]">
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f1e1] font-[Georgia,Times,'Times_New_Roman',serif] text-[17px] font-bold text-[#7a6432]">
                          {item.name.charAt(0)}
                        </span>
                        {item.comingSoon && (
                          <span className="rounded-full border border-[#d6d9e2] bg-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#60708d]">
                            Soon
                          </span>
                        )}
                      </div>
                      <h3 className="mt-4 font-sans text-[16px] font-semibold text-[#0f172a]">
                        {item.name}
                      </h3>
                      <p className="mt-2 flex-1 text-[13.5px] leading-[1.55] text-[#5d6b8b]">
                        {item.blurb}
                      </p>
                    </article>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Final note */}
        <aside className="mt-16 rounded-[26px] border border-[#e4e9f4] bg-[#f8fafc] p-8 text-[#334155] md:p-10">
          <div className="max-w-[620px]">
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#60708d]">
              Don&rsquo;t see yours?
            </div>
            <h2 className="mt-2 font-[Georgia,Times,'Times_New_Roman',serif] text-[26px] leading-[1.15] tracking-[-0.025em] text-[#0f172a] md:text-[30px]">
              We&rsquo;ll build the integration for you.
            </h2>
            <p className="mt-3 text-[15px] leading-[1.7] md:text-[16px]">
              Every Verly plan includes a public REST API and webhooks. If you
              need a native integration that&rsquo;s not listed, email{" "}
              <a
                href="mailto:team@verlyai.xyz"
                className="font-semibold text-[#315EEA] underline underline-offset-4"
              >
                team@verlyai.xyz
              </a>{" "}
              — we ship integrations in a week for paying customers.
            </p>
          </div>
        </aside>
      </div>

      <Footer />
      <StickyMobileCta />
    </main>
  );
}
