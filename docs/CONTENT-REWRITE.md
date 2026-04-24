# Verly — Content, UX Copy & SEO Rewrite Plan

A complete content overhaul for **verlyai.xyz**. This doc is the single source of truth for how Verly writes — from the H1 on the landing page to the error toast when someone fat-fingers an OTP.

Every page is written for two readers at once:

1. **The customer** — a support leader, ops manager, or founder who wants to cut ticket volume without losing CSAT.
2. **The founder** — a builder shipping a product, choosing a support stack that scales *with* them, not against them.

> **Naming rule (critical):** Use **Verly** everywhere — in H1s, body copy, meta titles, OG tags, JSON-LD, emails, toasts, everything. Retire "VerlyAI" from user-facing surfaces. The legal/company entity can still be "Verly AI Inc." in the footer legal line, but never in marketing copy.

---

## Table of contents

1. [Brand voice & writing rules](#1-brand-voice--writing-rules)
2. [Site-wide SEO strategy](#2-site-wide-seo-strategy)
3. [Page-by-page rewrites](#3-page-by-page-rewrites)
4. [Global microcopy library](#4-global-microcopy-library)
5. [Error states & edge cases](#5-error-states--edge-cases)
6. [Loading & empty states](#6-loading--empty-states)
7. [Form copy & placeholders](#7-form-copy--placeholders)
8. [Toast & notification copy](#8-toast--notification-copy)
9. [Email & transactional copy](#9-email--transactional-copy)
10. [Auth, onboarding & 404](#10-auth-onboarding--404)
11. [JSON-LD schema templates](#11-json-ld-schema-templates)
12. [Internal linking matrix](#12-internal-linking-matrix)
13. [Implementation roadmap](#13-implementation-roadmap)
14. [Measurement](#14-measurement)

---

## 1. Brand voice & writing rules

### Voice — in one line
> Verly sounds like a founder writing to another founder at 9pm — smart, specific, and a little tired of bullshit.

### Tone matrix

| Situation | Tone | Example |
|---|---|---|
| Marketing hero | Confident, specific, a little contrarian | "The AI support platform that actually reduces your ticket queue." |
| Feature description | Outcome-led, technical credibility | "Resolve 7 in 10 tickets before anyone on your team opens them." |
| Success toast | Warm, quick, no exclamation overload | "Saved. Your widget is live." |
| Error toast | Empathetic, tells what + why + how | "Couldn't connect. Check your internet and retry." |
| Empty state | Encouraging, shows the next step | "No conversations yet. Paste your site URL and we'll do the rest." |
| Legal / policy | Plain English, no lawyer voice | "We don't train on your data. Ever." |
| Founder letter | First person, honest, signed | "I started Verly because…" |

### Do / Don't

| Do | Don't |
|---|---|
| Lead with a measurable outcome | Lead with adjectives ("powerful", "cutting-edge") |
| Use active verbs — "Verly answers", "Verly routes" | Use passive nouns — "enablement of resolution" |
| Name the channel — Voice, WhatsApp, Web | Say "omnichannel" without naming channels |
| Put human handoff in the first fold | Bury handoff three sections down |
| Founder-language — "ship", "deploy", "live in a day" | Corporate-speak — "synergize", "leverage", "operationalize" |
| One idea per sentence | Comma-spliced run-ons |
| Specific numbers — "under 500ms", "in under an hour" | Vague hedges — "as low as", "up to", "often" |
| Own the downside — "If it doesn't save you money, cancel" | Overclaim — "Save 100% of support costs!" |

### House style

- **Sentence case** for all headings. Proper nouns and the brand name only.
- Never capitalise mid-sentence for emphasis. Use *italics* or a span.
- Numerals for any number over 9.
- Em dash with no spaces — like this.
- Serial comma on.
- "Verly" (product and brand). "Verly AI Inc." only in legal copy.
- Avoid: "cutting-edge", "revolutionary", "game-changing", "best-in-class", "next-gen", "world-class", "seamless", "robust".
- Ban the word "simply" unless it genuinely adds meaning. If you can delete it, delete it.

### Words we standardise on

| Use | Don't use |
|---|---|
| Verly | VerlyAI, Verly.ai, the platform |
| support agent / AI agent | chatbot (only OK when the reader expects that word, e.g. `/compare/chatbase`) |
| web chat | website chat, site chat, web messenger |
| voice | voice bot, phone bot |
| WhatsApp | Whatsapp, WA, whats app |
| human handoff | live handover, agent takeover |
| knowledge base | KB, knowledgebase |
| shared inbox | unified inbox, team inbox |
| start free | sign up, get started, register |
| book a demo | schedule a call, request a demo |

---

## 2. Site-wide SEO strategy

### Primary keyword clusters

| Cluster | Target keywords | Pages that should rank |
|---|---|---|
| AI customer support platform | "ai customer support platform", "customer support automation", "ai helpdesk", "ai support software" | Home, /features |
| Voice AI | "voice ai agent", "ai phone agent", "inbound call automation", "ai voice assistant business" | /voice |
| WhatsApp automation | "whatsapp ai chatbot", "whatsapp business automation", "whatsapp customer support ai" | /solutions, /features |
| Web chat AI | "ai chat widget", "website chatbot", "live chat ai" | Home, /features |
| Human handoff | "ai with human handoff", "ai escalation to agent", "ai chatbot human takeover" | Home, /why-verly |
| Industry | "ai support for saas", "ai support for ecommerce", "healthcare ai chatbot", "real estate ai phone agent" | /solutions/*, /use-cases |
| Comparisons | "intercom alternative", "zendesk alternative", "chatbase alternative", "ada alternative", "front alternative" | /compare/* |
| Pricing | "ai chatbot pricing", "ai support pricing", "ai agent cost" | /pricing |
| Long-tail | "how to reduce support tickets", "ai vs human customer service", "cheap zendesk alternative" | /blogs/* |

### URL structure rules

- Lowercase kebab-case everywhere: `/solutions/ecommerce-ai-support` ✅ not `/solutions/E-Commerce` ❌.
- Keep depth ≤ 3 segments.
- Never use query strings for content pages.
- Redirect trailing slashes consistently (pick one, 301 the other).

### Rules for every page

1. **One H1 per page** — must contain the primary keyword for that page.
2. **Meta title** — ≤ 60 chars, ends with `| Verly`.
3. **Meta description** — 140–160 chars, primary keyword once, ends with a verb CTA ("Start free", "Book a demo").
4. **First paragraph** — primary keyword in the first 100 words, naturally.
5. **Internal links** — every page links to at least 3 others (usually Home, Pricing, one contextual page).
6. **Alt text** — describe the *screen*, not the product. "Verly shared inbox showing WhatsApp and voice conversations in one queue" ✅, not "Verly dashboard" ❌.
7. **Schema** — JSON-LD FAQPage on Home, /faq, /voice, /pricing, each /solutions/* page, each /compare/* page.
8. **Canonical** — set on every page. Never self-canonical-loop.
9. **OG image** — 1200×630 unique per page. Fall back to a 1200×630 hero image, not the 560×374 logo.

### Site-wide issues to fix immediately

1. Title tags mix "Verly" and "VerlyAI" — standardise on **Verly**. Update `lib/metadata.ts` — `defaultMetadata.title.default` currently says "VerlyAI - AI Agent for Customer Support", change to "Verly — AI Customer Support for Voice, WhatsApp & Chat".
2. Most pages inherit the same `description` from `defaultMetadata`. Write a unique meta description for every page listed in section 3.
3. The `keywords` meta tag is ignored by Google — leave it (costs nothing), but it's not doing SEO work.
4. `app/sitemap.ts` — audit and add newer pages (`/lead-agent`, `/promote`, `/why-verly`, every `/solutions/*`, every `/compare/*`).
5. `twitter.card` is set to `summary` — produce a 1200×630 OG image and switch to `summary_large_image`.
6. Set `alternates.canonical` on every page explicitly.
7. `organizationSchema.name` = "VerlyAI" — change to "Verly".
8. `softwareApplicationSchema.name` = "VerlyAI" — change to "Verly".
9. Update ld+json `description` fields to drop "VerlyAI" and use "Verly".
10. Contact email in schema is `support@verlyai.xyz` — consider whether the domain should stay `verlyai.xyz` (it can — the brand is Verly, the domain stays).

---

## 3. Page-by-page rewrites

Format for each page: **current issues → new meta → hero (with A/B/C variants) → section-by-section copy → CTA variants**.

---

### 3.1 Home — `app/page.tsx`

**Current issues**
- Hero subheading is a run-on with a mid-sentence capital "I" in "Instantly".
- Hero doesn't mention human handoff — the biggest differentiator.
- PlatformModules headline reads broken: *"Here's why teams love / One connected platform."*
- SupportLifecycle and ProofCards overlap on "every conversation, one place".

**New meta**
```
Title:        Verly — AI Customer Support for Voice, WhatsApp & Chat
Description:  Deploy an AI support agent across voice, WhatsApp, and web chat in
              under a day. Verly answers 80% of tickets and hands the rest to
              your team with full context. Start free.
Canonical:    https://verlyai.xyz/
OG image:     /og/home-1200x630.png
```

#### Hero — H1 variants

| Variant | H1 | When to use |
|---|---|---|
| **A — Founder-honest (recommended)** | The AI support platform that *actually* reduces your ticket queue. | Default. Matches the "smart but tired of bullshit" voice. |
| B — Outcome-led | Cut your ticket queue by 80%. Keep your customers happier. | Good for paid ad landing pages where you need a specific promise. |
| C — Category-led | One platform for voice, WhatsApp, and web chat — with human handoff built in. | Good if the reader is shopping for a category and wants to know what Verly *is* first. |
| D — Contrarian | Your chatbot is embarrassing you. Verly is the fix. | High-risk, high-reward. Use on a secondary landing page, not the main home. |

**Hero sub (accompanies any H1 above)**

> Verly answers customer questions on your website, WhatsApp, and phone line — trained on your docs, connected to your tools, and handing off to your team only when it matters. Go live in a day, not a quarter.

**Alternative sub (shorter)**

> One AI agent across web, WhatsApp, and voice. Answers 80% of tickets, escalates the rest with full context. Live in a day.

#### Hero CTA variants

| Slot | Variant A (recommended) | Variant B | Variant C |
|---|---|---|---|
| Primary | `Start free — no card` | `Start free` | `Try Verly free` |
| Secondary | `Book a 20-min demo` | `See it in action` | `Talk to a human` |

**Microcopy under the CTAs (trust line)**
- Option A: "Free forever plan. No credit card. Cancel in one click."
- Option B: "50 free messages per month. Upgrade only when you need to."
- Option C: "Trusted by 200+ support teams from SaaS, e-commerce, and healthcare."

#### SupportLifecycle section — `components/landing/home/support-lifecycle.tsx:18-24`

> **Eyebrow:** One platform, full lifecycle
> **H2:** From first message to resolved ticket — handled.
>
> **Body:** Verly captures every conversation across voice, WhatsApp, and chat, learns from your knowledge base as it runs, and escalates to a human the moment it hits a policy edge. No separate bot, no stitched-together tools, no context lost in the handoff.

#### PlatformModules — `components/landing/home/platform-modules.tsx:421-425`

Replace the broken split headline.

> **H2:** Five products. One workflow. Zero integrations to babysit.
>
> **Sub:** Helpdesk, chat widget, shared inbox, knowledge base, analytics. All built to talk to each other by default — because you shouldn't have to glue them together yourself.

**Module titles + descriptions + summaries (replace everywhere in `modules` array)**

| Module | Description (short) | Summary (long) |
|---|---|---|
| AI Helpdesk | Resolve 7 in 10 tickets before anyone on your team opens them. | The AI triages, drafts a contextual reply, checks policy, and pings a human only when judgment is needed. Every escalation arrives with a summary, detected intent, and suggested reply — so agents spend minutes, not hours, per ticket. |
| Chat Widget | Turn your pricing page into your best support channel. | A lightweight widget that captures the visitor's question, identifies their account, and routes the conversation straight into the shared inbox. One line of JavaScript. No SDK, no tag manager gymnastics. |
| Shared Inbox | One queue for voice, WhatsApp, email, and chat. | Every channel lands in the same inbox. Assignments, priorities, and SLAs work the way your team already does — no retraining, no context-switching. |
| Knowledge Base | Your docs become the answer engine. | Import articles, SOPs, and policies from Notion, Confluence, or a live URL. Verly keeps them in sync, cites them in replies, and flags gaps when a question can't be answered. |
| Analytics | See what your customers are really asking. | Track CSAT, deflection, first-reply time, and the intents your AI can't handle yet. Every dashboard comes with a recommended action — not just a chart. |

#### Human escalation section

> **Eyebrow:** Where AI ends, humans begin
> **H2:** AI where it helps. Humans where they matter.
>
> **Body:** Verly doesn't pretend it can answer everything. When a question is out of scope, sensitive, or high-value, it hands off cleanly — with the full transcript, detected intent, account context, and a suggested reply your agent can send in one click. Nothing gets dropped. Nothing gets escalated twice.

**Alternate copy for this section (shorter)**

> **H2:** The best AI knows when to step aside.
>
> Verly hands off to your team the moment a conversation needs human judgment — refund over the auto-approve limit, angry customer, VIP account, anything flagged by your rules. With full context attached.

#### Proof cards — `components/landing/home/proof-cards.tsx`

Replace "Enterprise-ready AI agents your customers can trust" (which overuses "enterprise" across the page).

> **H2:** Built to be trusted — by your customers, your team, and your CISO.

| Card | Title | Body |
|---|---|---|
| 1 | Works with your stack | Slack, HubSpot, Salesforce, Zendesk, Shopify, and 30+ more. Verly lives inside the tools your team already opens every morning. |
| 2 | Secure by default | SOC 2 Type II, GDPR, EU and US data residency, and no training on your customer data. Ever. |
| 3 | Guardrails that hold | Policy-aware replies, tone controls, and an escalation path for every edge case. You stay in charge of what the AI is allowed to say. |
| 4 (if you add a fourth) | Owned by you | Every conversation, transcript, and document is yours — exportable in one click, auditable in one place. |

#### Footer CTA — `components/landing/footer.tsx:61-67`

> **H2:** Stop triaging. Start resolving.
>
> **Sub:** See Verly handle your real tickets in a 20-minute demo — or start free and deploy a working agent before lunch.

**Alternate (more urgency)**

> **H2:** Your ticket queue won't shrink itself.
>
> See Verly in action, or start free right now. Takes less time than a Zendesk demo call.

---

### 3.2 Features — `app/features/page.tsx`

**New meta**
```
Title:        Features — AI Support Agent Capabilities | Verly
Description:  Explore every Verly feature: voice AI, WhatsApp automation,
              shared inbox, knowledge base, integrations, analytics, and
              enterprise-grade security. Built for support teams.
Canonical:    https://verlyai.xyz/features
```

**Hero**

> **Eyebrow:** The full product
> **H1:** Everything your support AI needs — without the vendor sprawl.
> **Sub:** One platform for the agent, the inbox, the knowledge base, the analytics, and the escalation path. No stitching four tools together. No data silos between them.

**Category intros (add short outcome lines above each group)**

| Category | Intro line |
|---|---|
| AI & Automation | The bot that doesn't embarrass your brand. |
| Channels | Meet customers where they already are — not where your CRM wishes they were. |
| Shared Inbox | The workflow your team already runs, just faster. |
| Knowledge & Training | Your docs are the product. Make them work like it. |
| Integrations | If it's in your stack, Verly's already talking to it. |
| Analytics | Stop guessing what your customers want. Start knowing. |
| Security & Compliance | SOC 2, GDPR, audit logs, and data residency — without a 12-week procurement cycle. |
| Developer | An API that does what it says on the tin. |

**Feature row pattern (3 lines each — replace current long descriptions)**
```
<Feature name>
<One-sentence outcome for the customer>
<One-line technical credibility line>
```

Example:
> **Smart escalation**
> Hand a conversation to a human in one click with full context attached.
> Trigger rules, manual escalation, or AI-detected sentiment — all supported.

> **AI model routing**
> Use the cheapest model that'll answer correctly — not the most expensive by default.
> GPT, Claude, Gemini, and open-source models behind a single API.

> **Multilingual by default**
> Your customers get support in their language. You write docs in one.
> 95+ languages, auto-detected per conversation.

---

### 3.3 Solutions — `app/solutions/page.tsx`

**Current issues**
- "Design direction: Warm + operational" — internal design-team jargon. Delete.
- Intro uses "operating model", "friction" without naming concrete outcomes.
- Hero H1 "Solution pages built around real support operations." — meta, not product-led.

**New meta**
```
Title:        Solutions — AI Support for SaaS, E-commerce, Healthcare | Verly
Description:  Industry-specific AI support playbooks for SaaS, e-commerce,
              healthcare, real estate, education, and travel. See the workflows
              Verly automates for your vertical.
Canonical:    https://verlyai.xyz/solutions
```

**Hero**

> **H1:** Support playbooks built for *your* industry — not a generic bot.
>
> **Sub:** A SaaS onboarding question is not a healthcare appointment reschedule. Verly ships with industry-specific intents, tone, compliance defaults, and escalation rules — so you're not starting from scratch.

**Stat strip (replace current)**

| Old | New |
|---|---|
| Coverage: 6 industry playbooks | 6 industries, 40+ pre-built intents |
| Channel model: Voice + chat + WhatsApp | Voice, WhatsApp, and web — live on day one |
| Design direction: Warm + operational | **DELETE.** Replace with: "Avg. time to first automated resolution: 2 weeks" |

**Industry card copy (one-liner each, outcome-led)**

| Industry | Headline | Supporting line |
|---|---|---|
| SaaS | Resolve 80% of support tickets before a human logs in. | Onboarding, billing, feature questions — handled 24/7. |
| E-commerce | Track orders, handle returns, escalate fraud — at 2am. | Integrates with Shopify, WooCommerce, and Magento. |
| Healthcare | Reschedule appointments and answer policy questions — without PHI leaks. | HIPAA-ready, auto-redacts sensitive fields. |
| Real estate | Qualify leads on voice in under 90 seconds. | Books viewings, answers listing questions, hands hot leads to agents. |
| Education | Handle admissions questions in 95+ languages. | From enrollment to fee queries, across time zones. |
| Travel | Rebook, refund, and update itineraries while your team sleeps. | GDS integrations, policy-aware refund logic, voice on the first ring. |

---

### 3.4 Solution sub-pages — `app/solutions/[slug]` and `app/solutions/enterprise`

Each sub-page follows the same template.

**Meta template**
```
Title:        {Industry} AI Customer Support — Verly
Description:  {One-sentence outcome}. Verly's AI support agent for {industry}
              handles {top 3 workflows}. {Deploy time}. Start free.
```

**Page template**

```
[Eyebrow]   Solution · {Industry}
[H1]        {Industry}: support that scales without hiring.
[Sub]       One sentence. Names the 2-3 hardest problems in this industry.

[Section 1 — What Verly handles today]
Bullet list of 5-8 intents, each a one-liner.

[Section 2 — How it connects to your stack]
Logos + 2-3 lines on the key integration for this vertical.

[Section 3 — Compliance / trust block]
Industry-specific (HIPAA for healthcare, PCI for e-com, FERPA for education).

[Section 4 — A real conversation]
Show a mocked chat/voice transcript. Best conversion driver.

[Section 5 — Stats]
3 numbers. Specific, not rounded marketing numbers.

[CTA]       Start free · Book a demo
```

---

### 3.5 Pricing — `app/pricing/page.tsx`

**New meta**
```
Title:        Pricing — AI Customer Support Plans from $0 | Verly
Description:  Transparent pricing for every stage: free for builders, $29.99
              for startups, custom for enterprise. No per-seat fees. No
              surprise overage bills.
```

**Hero — variants**

| Variant | H1 |
|---|---|
| **A (recommended)** | Pricing that scales with your tickets — not your headcount. |
| B | Pay for conversations, not seats. |
| C | Free until you're winning. |

**Hero sub**

> Pay for the conversations Verly resolves, not the agents you hire. Start free with 50 messages, upgrade when you're ready, and never get surprised by a per-seat invoice.

**Plan card labels (standardise)**

| Plan | Label | Tagline | CTA |
|---|---|---|---|
| Free | Free | Ship your first agent this weekend. | Start free |
| Hobby | Starter — $29.99/mo | For founders handling support themselves. | Start free trial |
| Standard | Growth — $79.99/mo | For teams starting to scale support. | Start free trial |
| Enterprise | Enterprise | Custom volume, SSO, SLA, DPA, dedicated CSM. | Talk to sales |

**Founder note (add below the plan cards)**

> **Why we price this way**
> Most support tools charge per agent seat, which punishes you for hiring. We don't. You pay for usage — every resolved conversation — and invite your whole team for free. If Verly isn't saving you money by month two, cancel. We'll delete your data within 30 days.
>
> — *Raghvendra Dhakar, founder*

**Pricing FAQ (also earns FAQ rich snippets)**

> **What counts as a message?**
> One customer message + one Verly reply = one message. Internal notes and agent replies don't count.

> **What happens if I exceed my monthly quota?**
> We'll email you at 80% and 100%. No surprise bills — if you hit the cap, overage is paused until you upgrade or next cycle starts.

> **Can I switch plans mid-month?**
> Yes, any time, prorated to the day.

> **Is there a free trial for paid plans?**
> 14 days on Starter and Growth. No card required to start.

> **Do you offer annual discounts?**
> Yes — 2 months free on annual billing. Applies to all plans except Free.

> **Does Enterprise include SOC 2 reports?**
> Yes — Type II report, DPA, sub-processor list, and a named CSM. Request during your trial.

---

### 3.6 About — `app/about/page.tsx`

**New meta**
```
Title:        About Verly — Why We're Building This | Verly
Description:  Verly is the AI customer support platform built for teams that
              ship fast. Read the founder's note on why we started Verly and
              where we're going.
```

**Hero**

> **H1:** We're building Verly because support shouldn't be the reason you can't scale.
>
> **Sub:** A short note from the founder on why this product exists.

**Founder letter (first person, signed)**

> Every founder I've talked to has had the same month: 50 new customers, one support inbox on fire, and a choice between hiring three agents they can't afford or letting CSAT fall off a cliff.
>
> Existing tools aren't built for that moment. They're built for the company you'll be in three years, not the one you are today. They charge per seat. They take weeks to configure. They lock your customer data inside their bot and never give it back.
>
> Verly is the opposite. Live in a day. One line of JavaScript for web chat. One number for voice. One WhatsApp integration. Every conversation is yours — exportable, auditable, owned by you. The AI answers what it can, and hands the rest to your team with the full context attached.
>
> We built Verly because we've lived that month. We know how much it costs — in money, in sleep, in churned customers who never got a reply. We're not here to replace your team. We're here so the team you have can keep up with the team you're becoming.
>
> If that sounds like what you've been looking for, we'd love to show you what we've built.
>
> — *Raghvendra Dhakar, Founder*

**What we believe (short credo)**
- Support is a product surface, not a cost centre.
- AI without human handoff is a liability, not a feature.
- Your customer data is yours. Full stop.
- You should be able to cancel in one click.
- A 20-minute demo should never be a sales cycle.

**Team section (if applicable)** — photo + one-line role + one-line personal ("previously built X", "likes Y"). Keeps it human.

---

### 3.7 Why Verly — `app/why-verly/page.tsx`

**New meta**
```
Title:        Why Verly — The Honest Comparison | Verly
Description:  Built for founders who've outgrown their chatbot and can't afford
              a full Zendesk rollout. See how Verly compares on price, setup
              time, and human handoff.
```

**Hero**

> **H1:** You don't need another chatbot. You need a support layer that ships.
>
> **Sub:** A side-by-side look at how Verly compares to the tools most teams try first — and why teams switch.

**Sections**

1. *Compared to Intercom / Zendesk* — Enterprise-grade support without the enterprise procurement cycle.
2. *Compared to Chatbase / GPT wrappers* — Answers your docs *and* handles the handoff, the voice line, and the WhatsApp queue.
3. *Compared to hiring* — The cost of one mid-level agent buys you Verly + unlimited automation across every channel.

Each section: 3 short bullets + a screenshot. No walls of text. Link out to `/compare/{competitor}` for the full breakdown.

---

### 3.8 Voice — `app/voice/page.tsx`

**New meta**
```
Title:        Voice AI Agent for Inbound & Outbound Calls | Verly
Description:  Deploy a voice AI that answers your phone line 24/7 in 95+
              languages. Under 500ms latency, call recording, CRM sync, and
              one-click human transfer.
Canonical:    https://verlyai.xyz/voice
```

**Hero variants**

| Variant | H1 |
|---|---|
| **A (recommended)** | Your phone line, answered in under a second — by an AI that actually sounds human. |
| B | The voice agent that picks up on the first ring — in 95+ languages. |
| C | Stop missing calls. Start closing them. |

**Hero sub**

> Verly Voice picks up on the first ring, answers in your customer's language, pulls account context from your CRM, and transfers to a live agent the moment the conversation needs one.

**Must-have sections**
1. **How it sounds** — embed a real call recording (biggest conversion driver on voice AI pages).
2. **Technical spec table** — below.
3. **Use cases** — inbound support, outbound reminders, lead qualification, appointment booking.
4. **One-click human transfer** — warm transfer with context, cold transfer, voicemail-to-ticket.

**Technical spec table (copy this layout)**

| Spec | Verly Voice |
|---|---|
| Typical response latency | Under 500ms |
| Supported languages | 95+, auto-detected |
| Telephony providers | Twilio, Plivo, Retell (BYOC supported) |
| Call recording | Yes, configurable retention |
| Transcripts | Real-time + post-call |
| CRM sync | HubSpot, Salesforce, Pipedrive, custom via API |
| Transfer | Warm transfer with context, cold transfer, voicemail |
| Compliance | HIPAA-ready, PCI-aware redaction, GDPR |
| Concurrent calls | Unlimited |
| Setup time | Same day for a US number |

**Fix the FAQ latency line (currently "varying latencies as low as 500ms")**

> "Typical response latency is under 500ms — fast enough for a natural back-and-forth."

---

### 3.9 Use Cases — `app/use-cases/page.tsx` + `components/landing/UseCases.tsx`

**New meta**
```
Title:        Use Cases — AI Support for SaaS, E-commerce & More | Verly
Description:  Real support workflows Verly automates for SaaS, e-commerce,
              healthcare, real estate, education, and travel teams. See the
              playbooks and the measurable outcomes.
```

**Section header**

> **Eyebrow:** Real teams. Real outcomes.
> **H2:** Support teams are shipping 10x more with the same headcount.
> **Sub:** Here's what Verly does for teams in 6 industries — with the numbers to back it up.

Swap the generic "every team" one-liner and use the industry card copy from section 3.3.

---

### 3.10 FAQ — `app/faq/page.tsx`

**Current issues**
- Line 133: "simply define your API schema" → capitalise *Simply* (or better, delete "simply").
- Line 143: "varying latencies as low as 500ms" → reword.
- Answers over 200 words — cap at 120.
- Mix of "Verly", "VerlyAI", "our platform" — standardise to Verly.

**New meta**
```
Title:        FAQ — Questions About Verly Answered | Verly
Description:  Everything you wanted to know about Verly — pricing, security,
              integrations, human handoff, voice AI, and more. Read the FAQ or
              ask the AI.
```

**Hero**

> **H1:** The questions teams ask before they switch to Verly.
>
> **Sub:** Still not sure? Ask our AI directly — or book a 20-minute call with a human.

**Priority rewrites (shortened, verified against product truth)**

> **How long does setup take?**
> A basic web chat agent is live in under an hour. Voice and WhatsApp usually take a day, depending on how much you want to sync from your CRM. We've never seen a setup take longer than a week.

> **Does Verly train on my data?**
> No. Your conversations, documents, and customer data are never used to train any model — ours or a provider's. We use retrieval at runtime, not training.

> **What happens when the AI can't answer?**
> It hands off to a human on your team with the full transcript, detected intent, and a suggested reply. Nothing gets dropped.

> **Can I cancel any time?**
> Yes. One click, no retention calls. We delete your data within 30 days of cancellation.

> **Which LLMs do you use?**
> Whichever answers best for the question. Verly routes between GPT, Claude, Gemini, and open-source models behind the scenes. You don't pick one; you get the right one.

> **Do you support self-hosted?**
> For Enterprise, yes — single-tenant and VPC deployment available. For everyone else, we run a SOC 2 multi-tenant cloud.

**Add FAQ JSON-LD schema** (see section 11).

---

### 3.11 Enterprise — `app/enterprise/page.tsx`

**New meta**
```
Title:        Enterprise AI Support — SOC 2, SSO, Data Residency | Verly
Description:  Verly for enterprise: SOC 2 Type II, SSO, EU & US data residency,
              custom SLAs, dedicated CSM, and audit logs. Built to pass your
              security review.
```

**Hero**

> **H1:** Built to pass your security review on the first try.
>
> **Sub:** SOC 2 Type II, SSO/SAML, regional data residency, audit logs, custom DPAs, and a named contact for every incident. If you have a procurement checklist, we've probably already seen it.

**Sections**
1. **Security** — certifications, pen-test reports on request, vulnerability disclosure program.
2. **Privacy & data** — residency options (US, EU), sub-processor list, DPA, never-train guarantee.
3. **Access & governance** — SSO, SCIM, role-based access, audit logs.
4. **Operational** — uptime SLA (99.95%), support response SLA (1 business hour), named CSM, migration support.
5. **Pricing** — "Custom pricing based on volume and support requirements. [Talk to sales.]"

---

### 3.12 Compare — `app/compare/*`

**Per-page meta pattern**
```
Title:        Verly vs {Competitor} — Honest Comparison | Verly
Description:  How Verly compares to {Competitor} on pricing, setup time,
              human handoff, voice support, and data ownership. See where each
              tool wins.
```

**Page shape (every compare page)**
1. **TL;DR table** — 6–10 rows, 2 columns. Checkmarks and specifics. No marketing words.
2. **Where {Competitor} wins** — 2–3 honest points. Credibility move.
3. **Where Verly wins** — 3–5 points with concrete numbers.
4. **Which should you choose?** — plain-English recommendation by use case.
5. **Migration guide** — link to a one-page migration doc.

**Example — Verly vs Intercom TL;DR**

| | Verly | Intercom |
|---|---|---|
| Starting price | $0 | $39/seat/mo |
| Seat fees | None | Yes |
| Voice AI | Native | Fin voice add-on |
| WhatsApp | Native | Native |
| Time to live | < 1 day | 1–4 weeks |
| Data export | Full, one-click | Full, slow |
| Open API | Yes | Yes |
| Data residency | US + EU | US (EU on enterprise) |
| Human handoff | 1-click, full context | Yes, clunky on voice |

**Where Intercom wins**
- Brand recognition. Your CFO has heard of it.
- Deeper product analytics for in-app surveys.
- Bigger marketplace of third-party apps.

**Where Verly wins**
- Pricing that doesn't scale with headcount.
- Voice AI native, not bolted on.
- Ships in a day, not a quarter.

**Which should you choose?**
- Choose **Intercom** if you're already standardised on it and have budget for seats.
- Choose **Verly** if you're a fast-growing team, want voice + WhatsApp day one, and refuse per-seat pricing.

---

### 3.13 Blog / Blogs — `app/blogs/page.tsx` and `app/blogs/[slug]`

**Current issues**
- Blog indexes usually lack copy and rank for nothing.
- Founder-voice posts rank well for long-tail and build authority.

**New meta (index)**
```
Title:        The Verly Blog — Support, AI, and Scaling Teams | Verly
Description:  Long-form writing on customer support, AI agents, and scaling a
              team without burning out. From the Verly founders and team.
```

**Index hero**

> **H1:** How we think about support, AI, and the teams that ship both.
> **Sub:** Essays, teardowns, and honest guides from the Verly team.

**Article template (every post)**
```
[H1]              {60 chars max, keyword-led}
[Byline]          By {author} · {date} · {read time}
[TL;DR box]       3 bullets, what you'll learn
[Body]            {1200-2000 words, H2s every 200-300 words}
[CTA block]       "Want to see this in action? Start free."
[Related posts]   3 cards
[JSON-LD]         Article schema
```

**3 launch posts to write (SEO-targeted, founder-voice)**
1. "How we cut our own support ticket volume by 72% with our own product" — long tail, credibility, product-led.
2. "Intercom vs Zendesk vs Verly: what your support stack actually costs in year 2" — comparison traffic.
3. "When AI support should hand off to a human — a field guide" — earned authority on the handoff theme.

---

### 3.14 Docs — `app/docs/*`

**Meta**
```
Title:        Docs — Verly Developer Documentation | Verly
Description:  API reference, integration guides, and SDKs for the Verly AI
              support platform. Ship a working agent in an afternoon.
```

**Hero**

> **H1:** Build with Verly.
> **Sub:** API reference, integration guides, and SDKs. The docs are written like we wish vendors wrote them for us.

**Docs tone**
- Second person ("You'll need…"), present tense.
- Every code snippet runs as written.
- Every endpoint shows request + response + common errors.
- Include a "works on the first try" example at the top of every guide.

---

### 3.15 Help Center — `app/help/*`

**Meta**
```
Title:        Help Center — Verly
Description:  How to set up Verly, connect channels, train your AI agent, and
              escalate to humans. Plus troubleshooting and billing help.
```

**Hero**

> **H1:** Need a hand? We've got you.
> **Sub:** Guides, troubleshooting, and billing help. Or start a chat with the AI support agent we built with our own product.

---

### 3.16 Lead Agent — `app/lead-agent/page.tsx`

Assumed use case: a focused landing page for the "AI lead qualification" use case (sales + support blend).

**Meta**
```
Title:        AI Lead Qualification Agent on Voice & WhatsApp | Verly
Description:  Verly's AI lead agent qualifies inbound leads on voice and
              WhatsApp in under 90 seconds — then books the meeting or hands
              off to a human.
```

**Hero**

> **H1:** Qualify every inbound lead in under 90 seconds — without picking up the phone.
> **Sub:** Verly's AI lead agent answers, qualifies, and books — so your sales team only talks to leads worth their time.

---

### 3.17 Promote — `app/promote/page.tsx`

Assumed use case: outbound / marketing campaigns via voice + WhatsApp.

**Meta**
```
Title:        AI Outbound Campaigns on Voice & WhatsApp | Verly
Description:  Run compliant outbound support and sales campaigns on voice and
              WhatsApp. Personalised, consent-aware, and connected to your CRM.
```

**Hero**

> **H1:** Outbound that doesn't feel outbound.
> **Sub:** Verly runs personalised voice and WhatsApp campaigns with consent, opt-out, and CRM sync built in — so your team only joins when a customer wants to talk.

---

### 3.18 Legal — Privacy, Terms, DPA, Deletion

**Privacy** — `app/privacy/page.tsx`
```
Title:        Privacy Policy | Verly
Description:  How Verly collects, uses, stores, and protects your data — in
              plain English. Updated {date}.
```

**Opening line (replaces legal boilerplate H1)**
> **H1:** Our privacy policy — in plain English.
> **Sub:** The short version: we don't train on your data, we delete it when you ask, and you own every conversation Verly handles.

**Terms** — `app/terms/page.tsx`
```
Title:        Terms of Service | Verly
Description:  The terms that govern your use of Verly. Written to be readable.
```

**Deletion** — `app/deletion/page.tsx`
```
Title:        Data Deletion — How to Delete Your Verly Account | Verly
Description:  How to delete your Verly account and all associated data. One
              click, no retention calls.
```

**Hero**

> **H1:** Deleting your Verly account is one click.
> **Sub:** You should never have to email us to leave. Here's exactly how to delete your data, and what we do on our end.

---

### 3.19 404 — `app/not-found.tsx` (create if missing)

**Copy**

> **H1:** This page ghosted us.
> **Sub:** The link you followed is broken, or the page has moved. Either way — here's where to go next.
>
> [Go home] [See pricing] [Talk to us]
>
> *If you got here from a link on verlyai.xyz, [tell us](mailto:support@verlyai.xyz) and we'll fix it.*

**Alternates**
- B: "404 — this page isn't answering. Verly's AI would have."
- C: "Page not found. Let's get you somewhere useful."

---

### 3.20 Footer — `components/landing/footer.tsx`

**Brand description (replace line 117-119)**

> Verly is the AI support layer for teams that ship. Voice, WhatsApp, and web chat — with human handoff built in, not bolted on.

**Column structure**

| Column | Links |
|---|---|
| Product | Features · Voice · WhatsApp · Web Chat · Pricing · Integrations · Changelog |
| Solutions | SaaS · E-commerce · Healthcare · Real Estate · Education · Travel · Enterprise |
| Compare | vs Intercom · vs Zendesk · vs Chatbase · vs Ada · vs Front |
| Company | About · Why Verly · Blog · Careers · Contact |
| Resources | Docs · Help · FAQ · Status · Security |
| Legal | Privacy · Terms · DPA · Cookie preferences · Data deletion |

**Footer bottom line**
> © {year} Verly AI Inc. All rights reserved. Made with coffee in {city}.

---

## 4. Global microcopy library

These are the small bits of text that appear everywhere and set the product's personality.

### Primary buttons (app-wide)

| Action | Copy |
|---|---|
| Sign up | Start free |
| Log in | Log in |
| Save | Save changes |
| Delete | Delete forever |
| Cancel | Cancel |
| Confirm destructive | Yes, delete it |
| Publish | Go live |
| Send | Send |
| Invite | Send invite |
| Connect channel | Connect {channel} |
| Train | Train agent |
| Test | Test conversation |
| Export | Download CSV |

### Secondary buttons

| Action | Copy |
|---|---|
| Read more | Read more |
| Learn more | How it works |
| See pricing | See pricing |
| Book demo | Book a 20-min demo |
| Go back | Back |
| Skip | Skip for now |

### Links (nav / inline)

| Link | Copy |
|---|---|
| Home | Verly |
| Product | Product |
| Solutions | Solutions |
| Pricing | Pricing |
| Docs | Docs |
| Log in | Log in |
| Start free | Start free |
| Contact | Talk to us |

### Status labels

| Status | Copy | Tone |
|---|---|---|
| Live | Live | green |
| Draft | Draft | neutral |
| Paused | Paused | amber |
| Failed | Failed | red |
| Syncing | Syncing… | blue |
| Ready | Ready | green |

### Tooltips (examples)

- "Shows the percentage of tickets Verly resolved without a human."
- "Messages left in your plan this month. Resets on the 1st."
- "Escalation rules run before the AI tries to answer."

---

## 5. Error states & edge cases

### Error message structure

> **What happened** + **why** + **how to fix**.

Examples:

| Context | Copy |
|---|---|
| Invalid email at signup | That email doesn't look right. Mind double-checking? |
| Weak password | Passwords need at least 8 characters. Try adding a number or symbol. |
| Wrong password | That password didn't match. [Reset it] or try again. |
| OTP expired | This code expired. We'll send a new one — hang tight. |
| OTP wrong | That code didn't match. You have 2 tries left. |
| Email already in use | You already have a Verly account. [Log in instead.] |
| Network fail | Couldn't reach Verly. Check your internet and retry. |
| 500 error | Something broke on our end. We've been notified — refresh to retry. |
| File too large | That file is too big. Max is 20MB. |
| Unsupported file type | We can ingest PDFs, Markdown, and web URLs. This one's not supported yet. |
| Widget script failed | The widget script couldn't load. Check that you pasted it before `</body>`. |
| Channel not connected | Connect WhatsApp before publishing. [Set it up →] |
| Insufficient quota | You've used all 50 messages this month. [Upgrade] to keep going. |
| Rate limited | Slow down a little — you're hitting the rate limit. Try in 30 seconds. |
| Permission denied | You don't have access to this. Ask your admin to grant permission. |
| Session expired | You've been logged out for security. [Log in again.] |
| Billing failed | Your card was declined. [Update payment method] to keep access. |

### Error patterns to avoid

- ❌ "Oops! Something went wrong."
- ❌ "An error occurred."
- ❌ "Invalid input."
- ❌ "Please try again."

These don't tell the user what happened, why, or how to fix it.

---

## 6. Loading & empty states

### Loading states

| Context | Copy |
|---|---|
| Generic | Loading… |
| Training agent | Training your agent — this usually takes 30 seconds. |
| Importing docs | Reading your docs. Crawling {site} — {n} pages so far. |
| Generating reply | Verly is thinking… |
| Sending message | Sending… |
| Making call | Dialing… |
| Connecting channel | Talking to {channel}… |
| Saving | Saving… |
| Publishing | Going live… |
| Exporting | Preparing your export — we'll email you when it's ready. |

### Empty states

| Context | Headline | Body | CTA |
|---|---|---|---|
| No conversations yet | No conversations yet. | Paste your site URL and we'll train your first agent in under 5 minutes. | Start setup |
| No team members | You're the whole team — for now. | Invite your team. Everyone's free on Verly. | Invite teammate |
| No knowledge base | Your knowledge base is empty. | Drop a URL, upload a PDF, or paste a Notion link to get started. | Add source |
| No integrations | Nothing connected yet. | Connect Slack, HubSpot, Shopify, or 30+ more. | Browse integrations |
| No escalation rules | No rules yet. | Set a rule so Verly knows when to hand off to a human. | Add rule |
| No analytics data | We need a few more conversations to show you anything. | Come back after 10 conversations — the charts light up then. | — |
| No search results | Nothing matches "{query}". | Try a different search, or [ask the AI](link) directly. | — |
| No voice calls yet | No calls yet. | Connect a phone number and send your first test call. | Connect number |
| No WhatsApp chats | No WhatsApp conversations. | Connect your WhatsApp Business number to start. | Connect WhatsApp |

### Skeleton / placeholder principles
- Don't use lorem ipsum. Use light grey shapes.
- If you must use text, make it real ("Loading conversations…", not "Lorem ipsum…").

---

## 7. Form copy & placeholders

### Labels

| Field | Label |
|---|---|
| Email | Work email |
| Password | Password |
| Full name | Your name |
| Company | Company name |
| Role | Your role |
| Website | Company website |
| Phone | Phone number |
| Team size | How big is your team? |

### Placeholders (examples, not instructions)

| Field | Placeholder |
|---|---|
| Email | you@yourcompany.com |
| Company | Acme, Inc. |
| Website | yourcompany.com |
| Phone | +1 555 123 4567 |
| Role | Head of Support |
| Agent name | Avery |
| Welcome message | Hi! I'm Avery from Acme. How can I help? |
| Knowledge URL | https://docs.yourcompany.com |

### Helper text (under fields)

| Context | Copy |
|---|---|
| Under email field | We'll only email you about your account. No newsletters unless you ask. |
| Under password | 8+ characters. A symbol or number helps. |
| Under website | We'll use this to crawl your public docs. You can add more later. |
| Under agent name | This is the name your customers see. |
| Under welcome message | Shown when a visitor opens the widget. |

### Inline validation

| Case | Copy |
|---|---|
| Valid | ✓ Looks good. |
| Invalid email | That email doesn't look right. |
| Too short | {n} more characters. |
| Mismatch | Passwords don't match. |
| Taken | {x} is already taken. Try another? |

---

## 8. Toast & notification copy

### Success toasts

| Event | Copy |
|---|---|
| Saved | Saved. |
| Published | Your widget is live. |
| Invite sent | Invite sent to {email}. |
| Number connected | {number} is connected. |
| WhatsApp linked | WhatsApp is connected. |
| Password updated | Password updated. |
| Billing updated | Payment method updated. |
| Data exported | Export ready. [Download CSV]. |
| Escalation sent | Handed off to {agent}. |

### Warning toasts

| Event | Copy |
|---|---|
| Quota 80% | You've used 80% of this month's messages. [Upgrade] to avoid interruption. |
| Sync slow | Knowledge sync is taking longer than usual. We'll email you when done. |
| Trial ending | Your trial ends in 3 days. [Pick a plan] to keep going. |

### Error toasts

| Event | Copy |
|---|---|
| Save failed | Couldn't save. Check your internet and retry. |
| Invite failed | Couldn't send invite. Double-check the email. |
| Publish failed | Widget didn't go live. Check the install guide and try again. |
| Call failed | Call couldn't connect. [See call log]. |

### Info toasts

| Event | Copy |
|---|---|
| Agent trained | Your agent is trained on {n} sources. |
| New feature | Voice is now live for all accounts. [See what's new]. |

---

## 9. Email & transactional copy

### Subject lines

| Email | Subject |
|---|---|
| Welcome | Welcome to Verly. Here's how to go live. |
| Verify email | Your Verly verification code |
| Password reset | Reset your Verly password |
| Invite | {inviter} invited you to their Verly workspace |
| Trial ending | Your Verly trial ends in 3 days |
| Quota 80% | You've used 80% of this month's Verly messages |
| Quota 100% | You're out of messages — upgrade to keep Verly live |
| Export ready | Your Verly export is ready to download |
| Weekly digest | Your Verly week: {n} tickets resolved, {m} escalated |
| Incident | Verly status update: {incident title} |

### Welcome email body (short version)

> Hey {first_name},
>
> Welcome to Verly. You can have a working agent live before your next coffee:
>
> 1. Paste your site URL → we'll train the AI on your docs.
> 2. Drop the widget script on your site.
> 3. Send yourself a test message.
>
> If you get stuck, hit reply — a human will answer. I read everything.
>
> — Raghvendra, founder

---

## 10. Auth, onboarding & 404

### Login — `app/(auth)/login`

**H1:** Welcome back.
**Sub:** Log in to your Verly workspace.

**Field labels:** Work email · Password
**Primary CTA:** Log in
**Secondary:** Forgot password? · Don't have an account? Start free.

**Error copy:**
- Wrong credentials: "Those credentials don't match. [Reset password] or try again."
- Email not verified: "Check your inbox for the verification email. [Resend]."

### Verify — `app/(auth)/verify`

**H1:** Check your inbox.
**Sub:** We sent a 6-digit code to {email}. Paste it below.

**Helper:** "Didn't get it? [Resend] or [use a different email]."

**Success:** "Verified. Taking you in…"

### Signup / Deploy — `app/(auth)/deploy`

**H1:** Let's ship your first agent.
**Sub:** This takes about 5 minutes. We'll walk you through it.

**Step labels**
1. Train on your docs
2. Pick a channel
3. Go live

**Per-step microcopy**
- Step 1 sub: "Paste a URL, upload a PDF, or connect Notion. Verly will read and index."
- Step 2 sub: "Web chat, WhatsApp, or voice — pick one to start. You can add the others later."
- Step 3 sub: "Test it yourself, then flip the switch."

### Invite — `app/(auth)/invite`

**H1:** {inviter_name} invited you to {workspace}.
**Sub:** Create your account to join the team.

---

### Onboarding microcopy (in-app)

| Moment | Copy |
|---|---|
| First login | Welcome to Verly. Ready to train your first agent? |
| First training success | Nice. Your agent knows {n} things now. Try asking it something. |
| First escalation | You just escalated your first conversation. That's the whole point. |
| First 10 resolved | 10 resolutions. Save a support agent dinner tonight. |
| First paid upgrade | Thanks for upgrading. You now have {quota} messages and priority support. |

---

## 11. JSON-LD schema templates

### FAQPage (example for /faq)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does setup take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A basic web chat agent is live in under an hour. Voice and WhatsApp usually take a day, depending on how much you want to sync from your CRM."
      }
    },
    {
      "@type": "Question",
      "name": "Does Verly train on my data?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Your conversations, documents, and customer data are never used to train any model. We use retrieval at runtime, not training."
      }
    }
  ]
}
```

### Organization (update `lib/metadata.ts:102-128`)

Swap `"name": "VerlyAI"` → `"name": "Verly"` and update every description field to drop "VerlyAI" and use "Verly".

### SoftwareApplication (update `lib/metadata.ts:131-166`)

Same swap. Update `name`, `description`, and `featureList` to use "Verly".

### Product (for /pricing)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Verly AI Support Agent",
  "description": "AI customer support agent for voice, WhatsApp, and web chat with human handoff built in.",
  "offers": [
    { "@type": "Offer", "name": "Free", "price": "0", "priceCurrency": "USD" },
    { "@type": "Offer", "name": "Starter", "price": "29.99", "priceCurrency": "USD" },
    { "@type": "Offer", "name": "Growth", "price": "79.99", "priceCurrency": "USD" }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "42"
  }
}
```

### Article (for every /blogs/[slug])

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{post title}",
  "author": { "@type": "Person", "name": "{author}" },
  "datePublished": "{iso date}",
  "image": "{1200x630 og image url}",
  "publisher": { "@id": "https://verlyai.xyz/#organization" }
}
```

### BreadcrumbList (for every non-home page)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://verlyai.xyz/" },
    { "@type": "ListItem", "position": 2, "name": "{section}", "item": "{section url}" },
    { "@type": "ListItem", "position": 3, "name": "{page}", "item": "{page url}" }
  ]
}
```

---

## 12. Internal linking matrix

Every page should link to at least 3 others. This table is the source of truth.

| Page | Must link to | Should link to |
|---|---|---|
| Home | Pricing, Features, Voice | About, Why Verly, FAQ |
| Features | Pricing, Solutions | Voice, Integrations, Docs |
| Solutions | Features, Pricing, Enterprise | each `/solutions/[slug]` |
| Solutions/[slug] | Features, Pricing, FAQ | Home, Voice |
| Pricing | Features, Enterprise, FAQ | About, Compare pages |
| Voice | Pricing, Features, FAQ | Solutions, Compare/{voice competitor} |
| Use Cases | Solutions, Features | Home, Pricing |
| FAQ | Pricing, Docs, Contact | Home, Why Verly |
| Enterprise | Pricing, Security (if exists) | About, FAQ |
| About | Why Verly, Blog | Home, Careers |
| Why Verly | Compare pages, Pricing | Home, Features |
| Compare/{competitor} | Pricing, Features | Why Verly, Migration guide |
| Blog index | Featured posts, About | Home, Pricing |
| Blog post | 3 related posts, Home, Pricing | Author page |
| Docs | Home, Pricing | API reference |
| Help | Docs, FAQ, Contact | Home |
| 404 | Home, Pricing, Contact | Sitemap |
| Privacy | Terms, DPA, Deletion | Home |
| Terms | Privacy, DPA | Home |

---

## 13. Implementation roadmap

### Week 1 — quick wins (1–2 days)
1. Fix hero subheading + "Instantly" typo.
2. Delete "Design direction: Warm + operational" from Solutions.
3. Fix FAQ typo ("simply" → delete or capitalise).
4. Rewrite PlatformModules broken header.
5. Find/replace all "VerlyAI" → "Verly" in copy (not domain/email).
6. Update `lib/metadata.ts` schemas: `name: "Verly"`.

### Week 2 — high-impact rewrites
7. Rewrite Home hero + CTAs (A/B test A vs B).
8. Rewrite Pricing copy + founder note + add pricing FAQ.
9. Rewrite About page with founder letter.
10. Add FAQ JSON-LD schema on Home, /faq, /pricing, /voice.
11. Write unique meta descriptions for every page in section 3.

### Week 3 — SEO payoff
12. Rewrite Voice page with spec table + call recording embed.
13. Build out Compare pages with the TL;DR template.
14. Ship 1200×630 OG image; switch `twitter.card` to `summary_large_image`.
15. Add BreadcrumbList schema site-wide.
16. Audit and update `app/sitemap.ts`.

### Week 4 — microcopy pass
17. Replace every generic error ("Oops", "Something went wrong") using section 5.
18. Replace every generic empty state using section 6.
19. Standardise toast copy using section 8.
20. Rewrite every email subject + welcome body using section 9.

### Week 5 — growth content
21. Publish 3 launch blog posts (section 3.13).
22. Ship migration guides for Intercom, Zendesk, Chatbase.
23. Fill `/solutions/[slug]` pages using the template.
24. Run final pass for brand-name consistency ("Verly" everywhere in user-facing copy).

---

## 14. Measurement

Track these weekly for 8 weeks after shipping:

| Metric | Baseline | Target (week 8) |
|---|---|---|
| Landing → Start free conversion | — | +25% |
| Landing → Book demo conversion | — | +40% |
| Time on /voice, /pricing, /enterprise | — | +30% |
| Google Search Console impressions (brand + category) | — | +50% |
| FAQ rich result impressions | 0 | >0 |
| Compare pages: clicks from "vs" queries | — | +100% |
| Support deflection (tickets answered by AI) | — | +15% |
| Blog organic sessions | — | +3x (from low base) |

If week-4 numbers are flat, the copy isn't the bottleneck — it's the offer, the channel, or the product surface. We'll revisit then.

---

## 15. Design critique — layout, hierarchy & scannability

The copy above is the *what*. This section is the *how it lands on the page*. A great hero with bad layout converts worse than mediocre copy with a tight visual hierarchy.

### 15.1 Overall impression

**What works**
- Every page now has a clear job, a founder-honest voice, and a CTA that matches the reader's state.
- Microcopy, error states, and form labels are covered — most marketing plans skip this entirely.
- The 3-line feature pattern (name / outcome / tech credibility) is scannable.

**Biggest opportunity**
- Verly's pages still read like *documents* in places (long paragraphs, no breaks, similar-weight sections). A reader scrolling at 700ms per fold needs rhythm: hero, proof, demo, objection, CTA. The doc should specify *where the eye rests* at each fold, not just the words.

---

### 15.2 Visual hierarchy per page (what the eye sees first)

| Page | First element eye should hit | Second | Third |
|---|---|---|---|
| Home | H1 (Georgia serif, ~56px, left-aligned) | Sub (~19px, max 620px) | Primary CTA button (filled, roundish) |
| Pricing | H1 | Plan cards (3 across, Growth highlighted) | "Why we price this way" founder note |
| Voice | H1 | A 60-second call recording with play button | Spec table |
| Solutions | H1 | 6 industry cards grid (3×2) | Outcome stat strip |
| Features | H1 | Category nav pills (sticky) | First category's feature list |
| About | Founder photo (if we can use one) | H1 | Letter body |
| FAQ | H1 | Search bar (yes, add one) | Top 3 categories as tabs |
| Compare/{x} | TL;DR table | "Where {x} wins" honest block | "Where Verly wins" |
| 404 | H1 | Three big-button CTAs | Contact link (small) |

If two elements compete for first attention (as often happens with a big hero image next to H1), the page fails silently. Rule: size, colour, or contrast — one must clearly win.

---

### 15.3 Hero pattern — make it consistent across every page

Every marketing page should use this vertical rhythm. It's predictable for the reader and cheap to build.

```
[Eyebrow]           12px · uppercase · tracking 0.18em · muted
[H1]                44–56px · serif · tight tracking · 2 lines max
[Sub]               17–19px · sans · 1.7 line-height · 2 sentences max
[CTA row]           Primary + secondary, 48px tall, 16px gap
[Trust line]        13px · muted · one sentence · optional
[Hero visual]       below the fold on mobile; right or below on desktop
```

**Rules**
- H1 is **2 lines max** on desktop. If a variant hits 3, it's too long — trim or move to sub.
- Sub is **2 sentences max**. Third idea? That's a proof section, not a sub.
- Primary CTA is always on the left, secondary on the right. Never both filled.
- Trust line is optional but high-ROI. Add to Home, Pricing, Voice.

**Current state to fix**
- Hero sub in `components/landing/home/hero.tsx:44` is three ideas jammed into one paragraph. After rewrite, enforce the 2-sentence rule.
- Solutions hero has no secondary CTA — add "See a sample playbook".
- About page hero lacks a photo anchor — founder letters without a face convert worse.

---

### 15.4 Scannability — where the walls of text are

Readers scroll. They don't read. Every section over 60 words without a break loses them.

**Currently too dense**
- Pricing founder note (85 words as drafted) — break into 3 short paragraphs with a visible signature block.
- About founder letter (250 words) — insert one visual break at the halfway mark (a pull quote or a photo).
- FAQ answers — cap at 3 sentences or 2 paragraphs. Anything longer goes in Docs.
- Voice spec table — great for scan, but add one-line intro above it so it doesn't feel dropped in.

**Currently too sparse**
- Enterprise page sections are one-line descriptions. Add 2-3 bullets per section with specifics (cert numbers, SLA numbers, data-centre regions) — enterprise buyers *want* density here.
- Why Verly page is a list of 3 comparisons with "3 short bullets each" — that's ~60 words total. Should be 300-400 with a side-by-side visual per comparison.

**Visual break techniques to use**
1. Pull quotes — one sentence at 24px serif, centred, muted quote mark.
2. Stat strip — 3 large numbers in a row.
3. Inline illustrations / product screenshots every 2-3 sections.
4. Founder signature block — name + role + handwriting-style signature image.
5. Dividing eyebrow labels (e.g. "— The quick version" / "— The detailed version").

---

### 15.5 Consistency audit — pattern violations

The plan mixes a few inconsistent patterns. Lock these down:

| Area | Inconsistency | Fix |
|---|---|---|
| Eyebrow usage | Home has "Lifecycle Solution" eyebrow; Solutions hero has no eyebrow | Add eyebrow to every page hero. Formula: `{Type} · {Topic}` — e.g. "Product · Voice AI", "Company · About Verly" |
| CTA labels | "Start free", "Try Verly free", "Sign up" used interchangeably | Lock to **"Start free"** as the only top-of-funnel primary CTA |
| Secondary CTA | "Book a demo", "Book a 20-min demo", "Talk to a human", "See it in action" | Lock to **"Book a 20-min demo"** for sales-intent pages; **"See it in action"** for product pages |
| Section H2 length | Some are 4 words ("Pricing that scales"), some are 12 ("Here's why teams love / One connected platform") | Rule: H2 ≤ 10 words. If it needs more, split into H2 + sub. |
| Proof number formatting | "80%", "72%", "4.8m", "387 hrs", "<2hrs" — mixed cases | Lock to: `<integer>% · <integer>x · <integer>{unit}` with no leading "<". So "under 2 hrs" not "<2hrs". |
| Em-dash spacing | Some copy uses ` — `, some `—` | Lock to ` — ` (spaces around) in body copy, `—` tight in tables/chips |
| Eyebrow case | Some Title Case, some lowercase | Lock to **UPPERCASE with tracking** for eyebrows; sentence case for H1/H2 |

---

### 15.6 Conversion structure — does the page earn the click?

Every page has a conversion goal. The sections must *build* to it.

**Ideal page rhythm** (applies to Home, Voice, Solutions, any feature page)

```
1. Hero             — state the promise
2. Proof strip      — 3-5 logos OR one social-proof stat
3. Primary demo     — one product moment, shown visually (screenshot or video)
4. Objection #1     — "but will my data be safe?" → answer it
5. Objection #2     — "but what if the AI can't answer?" → show handoff
6. Objection #3     — "but how long is setup?" → show the 5-step onboarding
7. Secondary proof  — testimonial OR numbers
8. FAQ (2-3)        — inline, not linking away
9. Final CTA        — the *same* primary CTA as the hero, not a new one
```

**What's currently missing in the plan**
- **Home has no "objection" sections** called out. The plan mentions security, handoff, etc. but they're scattered. Reorganise so each is a named "objection kill" section with a clear question as the H2.
- **Pricing doesn't have objection kills.** The pricing FAQ is there but unnamed. Rename the section **"The questions you're about to ask"** — it's warmer and more founder-voice.
- **Voice page has no social proof.** Add a "Companies answering calls with Verly" strip below the hero.
- **Final CTA on every page is different.** Lock it to: `Start free — no card required` · `Book a 20-min demo`. Same on every page.

---

### 15.7 Content density map

Use this as a reference for every page. "Density" = words per 100vh of scroll.

| Page | Target density | Notes |
|---|---|---|
| Home | Low-medium | Heavy on visuals, light on text. Max 80 words per fold. |
| Features | Medium-high | Spec-dense by nature. Use 3-col grids to compress. |
| Solutions (index) | Medium | Mostly cards. Short text per card. |
| Solutions (sub) | High | This is where buyers go for detail. 600-900 words OK. |
| Pricing | Medium | Plan cards + founder note + FAQ. No wall of text. |
| Voice | Medium-high | Spec table earns density. |
| About | Low | Founder letter + credo. Breathing room. |
| Enterprise | High | Procurement buyers want details. Bulleted density. |
| Compare | High | Tables + prose. This is a research page. |
| FAQ | Medium | Tight answers. Long answers go to Docs. |
| Docs | N/A | Different beast. Optimise for task completion, not scroll. |
| 404 | Low | Big headline, 3 buttons, done. |

---

### 15.8 Accessibility of copy (non-obvious but important)

| Finding | Severity | Fix |
|---|---|---|
| Serif H1 at large sizes is beautiful but can be hard to read for dyslexic users | 🟡 Moderate | Keep serif for H1, but set `letter-spacing: -0.02em` and ensure contrast ratio ≥ 4.5:1 against background. |
| Eyebrow text at 12px with tracking 0.18em can fall below readable size on mobile | 🟡 Moderate | Minimum 13px on mobile; reduce tracking to 0.12em at small sizes. |
| Body copy uses `text-slate-600` on white — this is ~7.5:1, fine. On wallpaper backgrounds (hero), verify. | 🟢 Minor | Audit hero sub on the `/wallpaper.jpg` background — may fall below 4.5:1. |
| CTA button with icon-only on mobile loses screen-reader meaning | 🟡 Moderate | Every icon-only button needs `aria-label`. Add to spec. |
| "Ask our AI directly →" in FAQ is an arrow-link without visited/hover state call-out | 🟢 Minor | Ensure hover state is visible (underline appears, colour shifts). |
| Alt text policy is in section 2 but not reinforced per page | 🟡 Moderate | Add "Alt text for hero image:" field to each page section in this doc. |

---

### 15.9 Mobile-specific notes

90%+ of first-time visitors on a marketing site are on mobile. The plan is desktop-centric. Specifics:

- **Hero** — H1 drops to ~36px, sub to 16px. Keep 2-sentence rule *strictly*. Primary + secondary CTAs stack vertically, full-width.
- **PlatformModules pills** — horizontal scroll on mobile with visible scroll affordance (fade on right edge).
- **Solutions grid** — 2×3 on mobile, not 3×2.
- **Compare tables** — force horizontal scroll, lock the first column. Never let table text wrap on mobile.
- **FAQ** — accordion only on mobile; open-by-default on desktop for the top 3.
- **Footer** — columns collapse to accordions on mobile, or wrap 2-wide.
- **Sticky CTA bar** — add a bottom-fixed CTA bar on mobile (`Start free` + `Book demo`) that appears after the first scroll. Huge mobile conversion lift.

---

### 15.10 Priority recommendations

1. **Lock the hero pattern across every page** — eyebrow, H1, sub, CTA row, trust line. Same vertical rhythm. Same CTA labels. This alone makes the site feel 2x more polished. Impact: high · effort: low.

2. **Add a sticky mobile CTA bar** — one component, appears after first scroll on marketing pages. Impact: high (mobile conversion) · effort: medium.

3. **Name the objection sections explicitly** — rewrite H2s on Home to be questions the reader is actually asking ("But what happens when the AI can't answer?" not "Human escalation"). Impact: high · effort: low (copy change).

4. **Density balance** — break up About founder letter with a pull quote; add detail to Enterprise sections; shrink overlong FAQ answers. Impact: medium · effort: low.

5. **Consistency lock-down** — one primary CTA label, one secondary CTA label, one eyebrow style, one em-dash convention. Build a Storybook page to enforce. Impact: medium · effort: low.

6. **Add 60-second call recording to /voice above the fold** — biggest conversion lever on voice AI category pages. Impact: very high · effort: medium (needs a recording).

7. **Founder photo on /about** — a face increases time-on-page and trust. Same goes for pricing founder note. Impact: medium · effort: low.

8. **Compare pages as research destinations** — currently planned as 3-bullet summaries. They should be 800-1200 word pages with real tables, honest losses, and a migration guide link. Highest-intent SEO traffic on the site. Impact: high · effort: high.

---

## 16. What goes live when

A small checklist for the engineer shipping this:

- [ ] `lib/metadata.ts` — rename to Verly in schemas, title template `%s | Verly`.
- [ ] Hero H1 + sub + CTAs in `components/landing/home/hero.tsx`.
- [ ] PlatformModules header + module copy in `components/landing/home/platform-modules.tsx`.
- [ ] SupportLifecycle H2 + body in `components/landing/home/support-lifecycle.tsx`.
- [ ] ProofCards H2 + card copy in `components/landing/home/proof-cards.tsx`.
- [ ] Footer brand line + columns in `components/landing/footer.tsx`.
- [ ] Solutions hero + stat strip + industry cards in `app/solutions/page.tsx`.
- [ ] Pricing hero + founder note + pricing FAQ in `app/pricing/page.tsx`.
- [ ] About page founder letter in `app/about/page.tsx`.
- [ ] Voice page hero + spec table in `app/voice/page.tsx`.
- [ ] FAQ typos + latency line + shortened answers in `app/faq/page.tsx`.
- [ ] Enterprise hero + sections in `app/enterprise/page.tsx`.
- [ ] Compare page template in `app/compare/page.tsx` + per-competitor pages.
- [ ] Every meta description unique (no `defaultMetadata` inherit).
- [ ] FAQ JSON-LD + BreadcrumbList schema site-wide.
- [ ] 1200×630 OG images per page.
- [ ] 404 page copy in `app/not-found.tsx`.
- [ ] Global microcopy pass: buttons, toasts, empty states, forms.
- [ ] Email subjects + welcome email body.
