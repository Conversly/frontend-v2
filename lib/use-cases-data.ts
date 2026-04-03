export interface UseCaseStep {
  title: string;
  description: string;
}

export interface UseCaseCard {
  title: string;
  description: string;
}

export interface UseCaseTestimonial {
  quote: string;
  name: string;
  role: string;
}

export interface UseCasePageData {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroHighlights: string[];
  trustedLabel: string;
  problemTitle: string;
  problemIntro: string;
  problems: UseCaseCard[];
  solutionTitle: string;
  solutionIntro: string;
  solutions: UseCaseCard[];
  stepsTitle: string;
  stepsIntro: string;
  steps: UseCaseStep[];
  examplesTitle: string;
  examplesIntro: string;
  examples: UseCaseCard[];
  testimonial: UseCaseTestimonial;
  finalTitle: string;
  finalSubtitle: string;
}

export const salesAgentUseCase: UseCasePageData = {
  slug: "sales-agent",
  title: "AI Sales Agent That Qualifies & Converts Visitors | Verly",
  description:
    "Turn high-intent website traffic into pipeline with an AI sales agent that answers product questions, qualifies buyer intent, and routes real opportunities to your team.",
  eyebrow: "Use Case",
  heroTitle: "AI sales agent that qualifies and converts website visitors",
  heroSubtitle:
    "Verly turns high-intent traffic into live sales conversations. It answers product, pricing, and fit questions instantly, qualifies buyer intent, and routes serious prospects to your team before they leave your site.",
  heroHighlights: [
    "Answer pricing, feature, and integration questions in real time",
    "Qualify buyer intent before a rep ever joins the conversation",
    "Route ready prospects to demo booking or the right sales owner",
  ],
  trustedLabel: "Built for teams turning evaluation traffic into pipeline",
  problemTitle: "Most sales teams lose leads before a rep responds",
  problemIntro:
    "When a buyer lands on pricing, product, or integration pages, speed matters. Without a system answering immediately, the best opportunities leave quietly while reps spend time on repetitive or low-fit conversations.",
  problems: [
    {
      title: "Slow sales response",
      description:
        "A prospect asks a buying question, waits, and starts evaluating another vendor before your team ever replies.",
    },
    {
      title: "Repetitive pre-sales questions",
      description:
        "Reps answer the same feature, pricing, security, and integration questions repeatedly instead of focusing on late-stage opportunities.",
    },
    {
      title: "Weak qualification",
      description:
        "Calendars fill with low-intent meetings because nobody collected timeline, use case, or fit before routing the conversation.",
    },
    {
      title: "Pipeline leakage",
      description:
        "Anonymous visitors with real intent leave without becoming known contacts because nothing captured the conversation at the moment they were evaluating.",
    },
  ],
  solutionTitle: "Your AI sales agent is always working",
  solutionIntro:
    "Verly handles the first layer of inbound sales conversation on your website. It gives buyers instant answers, captures contact details naturally, qualifies intent, and hands your reps better opportunities instead of more noise.",
  solutions: [
    {
      title: "Instant sales answers",
      description:
        "Respond to pricing, feature, integration, and implementation questions the moment a visitor asks, using approved sales content.",
    },
    {
      title: "Lead capture inside the conversation",
      description:
        "Convert anonymous visitors into known prospects by collecting contact details naturally once intent is clear.",
    },
    {
      title: "Qualification before routing",
      description:
        "Ask about use case, company size, timeline, and budget so your team receives context before a meeting is ever booked.",
    },
    {
      title: "Smart lead routing",
      description:
        "Send prospects to the right rep, region, or motion based on fit, urgency, and deal potential.",
    },
    {
      title: "Automated demo booking",
      description:
        "Guide qualified buyers directly to the next step, whether that is a demo calendar, enterprise conversation, or follow-up path.",
    },
    {
      title: "Higher website conversion",
      description:
        "Reduce evaluation friction so more buying traffic turns into pipeline without adding headcount to respond faster.",
    },
  ],
  stepsTitle: "Launch your AI sales agent in hours",
  stepsIntro:
    "The workflow is simple: teach Verly how your team sells, define what a qualified conversation looks like, and deploy it where buying intent is highest.",
  steps: [
    {
      title: "Train on your sales content",
      description:
        "Upload product pages, pricing docs, implementation notes, FAQs, and competitor comparisons so answers stay aligned with how your best rep sells.",
    },
    {
      title: "Define qualification logic",
      description:
        "Set the questions that matter to your pipeline: company size, use case, timeline, budget, current stack, and urgency.",
    },
    {
      title: "Deploy on high-intent pages",
      description:
        "Place the agent on pricing, product, comparison, or integration pages where prospects are actively evaluating whether to buy.",
    },
    {
      title: "Review and improve conversion",
      description:
        "Use real conversation data to see common objections, drop-off points, and high-converting paths, then sharpen the agent weekly.",
    },
  ],
  examplesTitle: "What the workflow looks like in practice",
  examplesIntro:
    "The goal is not generic chat. It is a buyer conversation that resolves questions quickly, qualifies intent, and moves serious prospects toward the right next step.",
  examples: [
    {
      title: "Pricing-page visitor asks for fit",
      description:
        "Verly answers plan differences, asks about team size and timeline, then routes a qualified prospect to the right demo path.",
    },
    {
      title: "Technical evaluator checks integrations",
      description:
        "The agent explains integration support, captures the current stack, and flags the conversation for the correct sales or solutions owner.",
    },
    {
      title: "Enterprise buyer asks for custom workflow",
      description:
        "Verly handles the initial questions, captures context, and routes the lead toward an enterprise conversation without losing the details.",
    },
  ],
  testimonial: {
    quote:
      "The fastest way to grow pipeline is to stop letting high-intent visitors leave without an answer. Verly gives sales teams a live qualification layer right where buying decisions happen.",
    name: "Verly growth team",
    role: "Revenue workflow perspective",
  },
  finalTitle: "Turn evaluation traffic into qualified pipeline",
  finalSubtitle:
    "Use Verly to answer buying questions instantly, qualify prospects before your team gets involved, and convert more high-intent visitors from the pages that matter most.",
};
