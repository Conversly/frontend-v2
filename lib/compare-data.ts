export type CompareRow = {
  label: string;
  verly: string;
  them: string;
  hint?: "verly" | "them" | "tie";
};

export type Competitor = {
  slug: string;
  name: string;
  oneLiner: string;
  metaTitle: string;
  metaDescription: string;
  tlDr: string;
  rows: CompareRow[];
  theyWin: string[];
  verlyWins: string[];
  recommendation: {
    theirs: string;
    ours: string;
  };
  migrationTeaser: string;
};

export const competitors: Competitor[] = [
  {
    slug: "intercom",
    name: "Intercom",
    oneLiner: "Established, feature-rich, expensive per seat.",
    metaTitle: "Verly vs Intercom — Honest Comparison",
    metaDescription:
      "How Verly compares to Intercom on pricing, setup time, human handoff, voice support, and data ownership. An honest side-by-side for fast-growing support teams.",
    tlDr:
      "Intercom is the category leader and the safe buy for a CFO. Verly is the faster-to-ship, no-per-seat alternative for teams outgrowing a chatbot but not ready to budget $50k/yr for a rollout.",
    rows: [
      { label: "Starting price", verly: "$0", them: "$39/seat/mo", hint: "verly" },
      { label: "Per-seat fees", verly: "None", them: "Yes", hint: "verly" },
      { label: "Voice AI", verly: "Native", them: "Fin voice add-on", hint: "verly" },
      { label: "WhatsApp", verly: "Native", them: "Native", hint: "tie" },
      { label: "Time to live", verly: "Under 1 day", them: "1–4 weeks", hint: "verly" },
      { label: "Data export", verly: "Full, one-click", them: "Full, slow", hint: "verly" },
      { label: "Data residency", verly: "US + EU", them: "US (EU on enterprise)", hint: "verly" },
      { label: "Human handoff", verly: "One-click, full context", them: "Yes, clunky on voice", hint: "verly" },
      { label: "Marketplace apps", verly: "30+ integrations", them: "400+ integrations", hint: "them" },
      { label: "Product analytics", verly: "Support-focused", them: "Deeper (Pulse, surveys)", hint: "them" },
    ],
    theyWin: [
      "Brand recognition — your CFO has heard of it.",
      "Deeper product analytics for in-app surveys and NPS.",
      "Bigger marketplace of third-party apps.",
    ],
    verlyWins: [
      "Pricing that doesn't scale with headcount. Pay for resolution, not seats.",
      "Voice AI native on day one — not a paid Fin add-on.",
      "Live in a day, not a quarter. One line of JS for web chat.",
      "Human handoff built in, not bolted on — full context attached automatically.",
      "Data ownership by default. Export in one click, delete in 30 days.",
    ],
    recommendation: {
      theirs:
        "Choose Intercom if you're already standardised on it, have the budget for per-seat pricing, and you need deep in-app marketing workflows.",
      ours:
        "Choose Verly if you're a fast-growing team, want voice + WhatsApp on day one, and refuse to pay a tax every time you hire a support agent.",
    },
    migrationTeaser:
      "We'll import your Intercom macros, tags, and conversation history. Most teams are fully migrated in a week.",
  },
  {
    slug: "zendesk",
    name: "Zendesk",
    oneLiner: "Enterprise support suite. Powerful, heavy, slow to roll out.",
    metaTitle: "Verly vs Zendesk — Honest Comparison",
    metaDescription:
      "How Verly compares to Zendesk on pricing, setup time, AI, voice, and data ownership. An honest breakdown for support leaders outgrowing ticketing.",
    tlDr:
      "Zendesk is built for contact centres with rigid SLAs and 50+ agent teams. Verly is built for the 20-person support team shipping fast, where AI handles the volume and humans handle the hard stuff.",
    rows: [
      { label: "Starting price", verly: "$0", them: "$19/seat/mo (Suite Team)", hint: "verly" },
      { label: "AI agent included", verly: "Yes, all plans", them: "Advanced AI is a paid add-on", hint: "verly" },
      { label: "Voice AI", verly: "Native, sub-500ms", them: "Zendesk Talk + paid AI add-on", hint: "verly" },
      { label: "WhatsApp", verly: "Native", them: "Native", hint: "tie" },
      { label: "Time to live", verly: "Under 1 day", them: "2–8 weeks typical", hint: "verly" },
      { label: "Implementation cost", verly: "$0", them: "Often $5k–$25k", hint: "verly" },
      { label: "Ticket routing", verly: "AI-driven + rules", them: "Rules-heavy", hint: "verly" },
      { label: "Reporting depth", verly: "Support-focused", them: "Very deep (Explore)", hint: "them" },
      { label: "Enterprise features", verly: "SOC 2, SSO, DPA", them: "SOC 2, HIPAA, FedRAMP", hint: "them" },
      { label: "Data export", verly: "Full, one-click", them: "Full, scheduled", hint: "verly" },
    ],
    theyWin: [
      "Deeper historical reporting via Zendesk Explore.",
      "Broader enterprise compliance certifications (HIPAA, FedRAMP).",
      "Proven at 500+ agent scale with rigid SLAs.",
    ],
    verlyWins: [
      "AI is included on every plan, not a $35/seat add-on.",
      "Sub-500ms voice latency on every call, no add-on.",
      "Deploys in a day — no implementation partner required.",
      "No per-seat pricing. Invite the whole team free.",
      "A pricing model that doesn't surprise you at month 13.",
    ],
    recommendation: {
      theirs:
        "Choose Zendesk if you run a large contact centre, have dedicated admins, and need Explore-level reporting or FedRAMP compliance.",
      ours:
        "Choose Verly if you're a product-led team that wants AI-first support, live by the end of the week, with no implementation consultants.",
    },
    migrationTeaser:
      "We'll migrate your Zendesk macros, tags, and triggers. Most teams run both side-by-side for a week, then switch.",
  },
  {
    slug: "chatbase",
    name: "Chatbase",
    oneLiner: "GPT wrapper for website chat. Fast to start, shallow in production.",
    metaTitle: "Verly vs Chatbase — Honest Comparison",
    metaDescription:
      "How Verly compares to Chatbase on voice support, WhatsApp, human handoff, and data ownership. A breakdown for teams outgrowing a single chat widget.",
    tlDr:
      "Chatbase is the fastest way to put a chatbot on your site. Verly is what you need when the bot has to answer on voice, on WhatsApp, and actually hand off to humans — not just say 'I don't know.'",
    rows: [
      { label: "Starting price", verly: "$0", them: "$40/mo (Hobby)", hint: "verly" },
      { label: "Web chat widget", verly: "Native", them: "Native", hint: "tie" },
      { label: "Voice AI", verly: "Native, sub-500ms", them: "Not supported", hint: "verly" },
      { label: "WhatsApp", verly: "Native", them: "Via third-party", hint: "verly" },
      { label: "Human handoff", verly: "One-click, full context", them: "Basic, via email", hint: "verly" },
      { label: "Shared inbox", verly: "Native", them: "Not available", hint: "verly" },
      { label: "Actions / tool calling", verly: "Full function calling", them: "Supported", hint: "tie" },
      { label: "Multi-agent teams", verly: "Full RBAC, unlimited seats", them: "Limited", hint: "verly" },
      { label: "Training speed", verly: "Minutes", them: "Minutes", hint: "tie" },
      { label: "Data residency", verly: "US + EU", them: "US only", hint: "verly" },
    ],
    theyWin: [
      "Marginally faster initial setup for a single website bot.",
      "Slightly lower starting price if you only need web chat.",
      "Simple UI if all you want is a Q&A widget.",
    ],
    verlyWins: [
      "A real platform, not a widget — voice, WhatsApp, and web in one.",
      "Shared inbox for your team — not just a chat log dump.",
      "Proper human handoff with transcript, intent, and suggested reply.",
      "RBAC, audit logs, and data residency for when you scale past one person.",
      "Pricing stays sane as you grow — no per-seat tax.",
    ],
    recommendation: {
      theirs:
        "Choose Chatbase if you want a single website chatbot, don't need voice or WhatsApp, and your team is 1–3 people.",
      ours:
        "Choose Verly if you're building a real support operation — multiple channels, a team that collaborates, and customers who need human help when AI can't deliver.",
    },
    migrationTeaser:
      "We'll import your Chatbase sources and prompts in under an hour. Your bot talks again by lunch.",
  },
];

export function getCompetitor(slug: string) {
  return competitors.find((c) => c.slug === slug);
}

export function getAllCompetitorSlugs() {
  return competitors.map((c) => c.slug);
}
