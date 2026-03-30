export const WHY_VERLY_PAGE = {
  eyebrow: "Why Verly",
  title: "6 reasons fast-growing teams choose Verly for AI customer support",
  description:
    "Deliver faster replies, lower support costs, and cover voice, WhatsApp, and web chat from one AI-native support system.",
  primaryCta: {
    label: "Book demo",
    href: "https://calendly.com/rdhakad2002/30min",
  },
  secondaryCta: {
    label: "Start free trial",
    href: "https://app.verly.ai/signup",
  },
  heroStats: [
    { value: "80%", label: "lower support cost potential" },
    { value: "<2 sec", label: "response speed goal" },
    { value: "3 channels", label: "voice, WhatsApp, and web" },
  ],
  showcase: {
    title: "As your support volume grows, your team faces more channels, more edge cases, and more pressure.",
    accent: "Verly keeps them all moving.",
    cards: [
      {
        id: "omnichannel-loop",
        eyebrow: "Omnichannel support",
        title: "Run voice, WhatsApp, and web chat from one AI support loop",
        description:
          "Deploy the same support logic everywhere your customers reach out, then keep routing, escalations, and context unified behind the scenes.",
        cta: "Explore the workflow",
        image: "/why-verly/featured-omnichannel.png",
        imageAlt: "Verly omnichannel support dashboard",
        featured: true,
      },
      {
        id: "shared-inbox",
        eyebrow: "Shared inbox",
        title: "Keep escalations, ownership, and customer state in one place",
        description:
          "Let AI resolve the repetitive work, then route exceptions into a shared workspace your team can actually operate from.",
        cta: "See handoff flows",
        image: "/why-verly/shared-inbox.png",
        imageAlt: "Shared inbox support workspace preview",
        featured: false,
      },
      {
        id: "ai-resolution",
        eyebrow: "AI resolution layer",
        title: "Give teams and customers a faster path to resolution",
        description:
          "Use knowledge sync, actions, and model control to move beyond scripted bots and into real resolution workflows.",
        cta: "See AI controls",
        image: "/why-verly/ai-resolution.png",
        imageAlt: "Verly AI agent configuration view",
        featured: false,
      },
    ],
    workspaceTitle: "Built for teams that need coverage, context, and control.",
    workspaceAccent: "All together.",
    workspaceTabs: [
      {
        id: "customer-support",
        title: "Customer Support",
        summary: "Cross-channel support experiences with AI resolution and context-rich handoff.",
        image: "/why-verly/customer-support-workspace.png",
        imageAlt: "Customer support inbox preview",
      },
      {
        id: "always-on-voice",
        title: "Always-On Voice",
        summary: "Answer urgent calls instantly, capture intent fast, and hand off only when nuance matters.",
        image: "/why-verly/always-on-voice.png",
        imageAlt: "Voice AI support preview",
      },
      {
        id: "knowledge-control",
        title: "Knowledge Control",
        summary: "Keep your docs, policies, and data sources synced so every reply gets sharper over time.",
        image: "/why-verly/knowledge-control.png",
        imageAlt: "Knowledge and data source preview",
      },
    ],
  },
  reasons: [
    {
      id: "ai-native",
      number: "01",
      title: "AI-native from day one",
      eyebrow: "Architecture",
      description:
        "Verly is built around autonomous resolution, not a human inbox with AI layered on later. That changes how fast it responds, what it can automate, and how much work your team avoids.",
      bullets: [
        "LLM-native agents reason through multi-step support issues instead of following rigid decision trees.",
        "Support automation starts with resolution goals, not agent assist alone.",
        "Legacy workflows stay optional, not the center of the product.",
      ],
      highlight: "Built for autonomous resolution, not just reply suggestions.",
      image: "/images/blog/autonomous-agents.png",
      imageAlt: "Autonomous AI support concept illustration",
      metric: "Zero flowchart maintenance",
    },
    {
      id: "omnichannel",
      number: "02",
      title: "One agent across Voice, WhatsApp, and Web",
      eyebrow: "Omnichannel",
      description:
        "Configure behavior once, then deploy the same support logic anywhere your customers reach out. Verly keeps the product brain centralized while each channel feels native.",
      bullets: [
        "Use the same knowledge, prompts, and actions across channels.",
        "Support users where urgency and context differ, without rebuilding flows from scratch.",
        "Keep one support system instead of separate tools for chat, voice, and messaging.",
      ],
      highlight: "Write once. Run across every high-intent support channel.",
      image: "/images/blog/omnichannel.png",
      imageAlt: "Omnichannel support illustration",
      metric: "One support brain, multiple channels",
    },
    {
      id: "handoff",
      number: "03",
      title: "Human handoff without losing context",
      eyebrow: "Escalation",
      description:
        "When AI should step back, Verly hands off the conversation with the full thread, intent, and next-step summary already attached so your team starts informed.",
      bullets: [
        "Escalate based on confidence, policy rules, or customer signals.",
        "Preserve transcripts, customer state, and detected intent for the agent.",
        "Turn escalation into a better workflow, not a broken customer experience.",
      ],
      highlight: "Humans stay in control without starting from scratch.",
      image: "/escalation.png",
      imageAlt: "Verly human handoff workflow screenshot",
      metric: "100% context preserved on handoff",
    },
    {
      id: "launch-fast",
      number: "04",
      title: "Launch fast, customize deeply",
      eyebrow: "Deployment",
      description:
        "Verly is easy enough to launch quickly and flexible enough for teams that need APIs, actions, knowledge control, and channel-specific tuning.",
      bullets: [
        "Get started with docs, uploads, prompts, and out-of-the-box channel support.",
        "Connect actions and backend systems when you need real workflow automation.",
        "Keep operator-friendly controls without losing developer depth.",
      ],
      highlight: "Minutes to first launch, plenty of room to grow.",
      image: "/create_chatbot.png",
      imageAlt: "Verly chatbot creation screen",
      metric: "Under 10 minutes to first live agent",
    },
    {
      id: "roi",
      number: "05",
      title: "Lower cost, faster ROI",
      eyebrow: "Business impact",
      description:
        "The value story is simple: answer more conversations instantly, keep humans focused on exceptions, and reduce the cost of every support interaction.",
      bullets: [
        "Automate repetitive questions that normally drain agent time.",
        "Capture more leads and more support volume outside business hours.",
        "Show ROI through cost savings, faster replies, and higher coverage.",
      ],
      highlight: "Better coverage and faster payback without adding headcount.",
      image: "/reporting.png",
      imageAlt: "Verly analytics reporting screen",
      metric: "ROI stories measured in days, not quarters",
    },
    {
      id: "serious-teams",
      number: "06",
      title: "Built for serious support teams",
      eyebrow: "Control layer",
      description:
        "Behind the AI layer, Verly gives teams the operational control they need: analytics, observability, synced knowledge, integrations, and security-minded deployment options.",
      bullets: [
        "Track conversations, outcomes, trends, and operational performance.",
        "Sync knowledge from docs, websites, and internal sources.",
        "Support security-sensitive teams with stricter data handling and enterprise deployment paths.",
      ],
      highlight: "A production support platform, not a thin chatbot wrapper.",
      image: "/data_sources.png",
      imageAlt: "Verly data sources and knowledge sync screen",
      metric: "Observability, knowledge, and control in one place",
    },
  ],
  productBlueprint: [
    {
      eyebrow: "Behavior layer",
      title: "Prompt, escalation, and support mode controls",
      description: "Define how the agent responds, when it escalates, what fallback path it uses, and how support-specific instructions change behavior.",
    },
    {
      eyebrow: "Knowledge layer",
      title: "Docs, websites, and grounded answer control",
      description: "Connect source material, keep knowledge updated, and shape how the system uses support context instead of relying on a static FAQ bot.",
    },
    {
      eyebrow: "Channel layer",
      title: "Web chat, voice, and WhatsApp from one product",
      description: "Start with one channel or expand across surfaces while keeping the same support logic, routing model, and operating context behind the scenes.",
    },
    {
      eyebrow: "Execution layer",
      title: "Actions, workflows, and support-side automation",
      description: "Move past simple replies with actions, API connections, routing rules, and workflows that help the agent complete real support tasks.",
    },
    {
      eyebrow: "Deployment layer",
      title: "Live deploy controls instead of a black-box launch",
      description: "Configure channels, review deployment changes, and push updates with a clearer path from setup to production support.",
    },
    {
      eyebrow: "Feedback layer",
      title: "Topics, logs, and operational visibility",
      description: "See conversation patterns, track support outcomes, inspect logs, and improve the system from real usage instead of guesses.",
    },
  ],
  earlyStageFit: [
    {
      eyebrow: "Early-stage advantage",
      title: "You can shape the workflow with us",
      body: "Early teams are not buying a fixed template. They get a tighter feedback loop with the product team and more influence over how support flows, channels, and controls evolve.",
    },
    {
      eyebrow: "What success looks like first",
      title: "Start with one support motion and make it work well",
      body: "The best early rollout is usually one high-volume flow, one strong handoff path, and one channel expansion plan, then deeper automation once the operating model is working.",
    },
  ],
  miniStory: {
    title: "What changes operationally",
    before:
      "A growing support team juggles separate tools for chat, voice, and escalation while customers wait for handoffs and after-hours coverage disappears.",
    after:
      "With Verly, the same support logic covers web, voice, and WhatsApp, resolves common requests automatically, and routes edge cases into one context-rich workflow.",
  },
  stackItems: ["Website", "Docs", "Policies", "Shared inbox", "WhatsApp", "Voice", "APIs", "Routing rules"],
  comparisonRows: [
    {
      label: "Architecture",
      legacy: "Human-first support stack with AI added into the workflow later.",
      verly: "AI-native platform designed around autonomous resolution from the start.",
    },
    {
      label: "Channels",
      legacy: "Often split across separate tools, teams, or disconnected add-ons.",
      verly: "One agent system for voice, WhatsApp, and web chat.",
    },
    {
      label: "Handoff",
      legacy: "Escalation often drops context or forces teams to re-ask questions.",
      verly: "Preserves transcript, intent, and summary when humans step in.",
    },
    {
      label: "Setup speed",
      legacy: "Longer onboarding because workflows and integrations are fragmented.",
      verly: "Launch quickly, then deepen with actions, APIs, and synced knowledge.",
    },
    {
      label: "Automation depth",
      legacy: "Best at triage, macros, and agent assist.",
      verly: "Designed to resolve repetitive customer requests end to end.",
    },
    {
      label: "Total cost",
      legacy: "Higher operational cost because more conversations reach human teams.",
      verly: "Lower servicing cost by pushing routine support into automated resolution.",
    },
  ],
  useCases: [
    {
      title: "SaaS support",
      description:
        "Deflect repetitive product questions, billing requests, and account issues while keeping enterprise escalations clean.",
    },
    {
      title: "Ecommerce operations",
      description:
        "Handle order status, returns, shipping questions, and after-hours sales intent across voice and chat.",
    },
    {
      title: "Healthcare access",
      description:
        "Guide appointment and intake flows with a tighter handoff path for sensitive or high-stakes conversations.",
    },
    {
      title: "Real estate intake",
      description:
        "Capture every inbound lead, answer common buying questions, and route qualified prospects instantly.",
    },
  ],
  faqs: [
    {
      question: "How quickly can we launch Verly?",
      answer:
        "Most teams can get a first agent live in minutes using docs, prompts, and channel setup. More advanced deployments add actions, custom routing, and deeper knowledge sync over time.",
    },
    {
      question: "Which models does Verly support?",
      answer:
        "Verly is model-agnostic. Teams can use supported hosted models or bring their own keys depending on how much control and cost optimization they want.",
    },
    {
      question: "What happens when the AI should not answer?",
      answer:
        "Verly can escalate to a human based on confidence, policy, or customer intent while preserving the full conversation context for a smoother agent takeover.",
    },
    {
      question: "How does pricing work?",
      answer:
        "Verly uses usage-based pricing so you pay for the support activity you actually automate, rather than overbuying seats for capacity you only need during spikes.",
    },
    {
      question: "Can Verly work with our existing systems?",
      answer:
        "Yes. Verly is built to connect with APIs, webhooks, CRMs, and internal tools so the agent can read data or trigger actions inside your workflow.",
    },
    {
      question: "How do you handle security and deployment needs?",
      answer:
        "Verly supports strict data handling, enterprise controls, and dedicated deployment paths for teams that need stronger security and compliance posture.",
    },
  ],
  finalCta: {
    eyebrow: "See the difference live",
    title: "See how Verly fits your support workflow before you commit",
    description:
      "We’ll walk through your channels, your support volume, and the best starting use case so you can evaluate Verly against your current stack with clarity.",
  },
} as const;

export type WhyVerlyPageContent = typeof WHY_VERLY_PAGE;
