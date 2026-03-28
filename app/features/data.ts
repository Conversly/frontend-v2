export const FEATURES_PAGE_CONTENT = {
  title: "Features | VerlyAI",
  intro:
    "Explore every VerlyAI feature in one place. Browse by category, compare capabilities, and open any feature to see how it helps your support team automate faster and serve customers better.",
};

type RawCategory = {
  name: string;
  summary: string;
  features: string[];
};

const RAW_CATEGORIES: RawCategory[] = [
  {
    name: "AI Features for Customer Support",
    summary: "Automate support with AI Chatbot and Answer Assistant.",
    features: ["AI Answer Improver", "AI Chatbot", "AI Answer Composer"],
  },
  {
    name: "Ticketing system features",
    summary:
      "Ticketing system features that bring together the essential building blocks of a modern support workflow.",
    features: [
      "Agent Collision Detection",
      "Agents",
      "Audit Log",
      "Automated Ticket Distribution",
      "Rules",
      "Business hours",
      "Canned Messages (Macros)",
      "Contact Fields",
      "Contact Form Gallery",
      "Contact Forms",
      "Contacts",
      "Custom roles",
      "Departments",
      "Email forwarding",
      "Email Notifications",
      "Email templates",
      "Hybrid ticket stream",
      "Mass actions",
      "Merge Tickets",
      "Multiple ticket tabs",
      "Notes",
      "Online ticket history (URL)",
      "Pause",
      "Predefined answers",
      "Responsibility",
      "Search & Replace",
      "Service Level Agreement (SLA)",
      "Sounds",
      "SPAM filters",
      "Split Tickets",
      "Tags",
      "Ticket Export",
      "Ticket fields",
      "Ticket/Customer insights (CRM)",
      "Filters",
      "Time rules",
      "Time tracking",
      "To Solve Button",
      "Universal inbox",
      "WYSIWYG editor",
      "Companies",
      "Agent Ranking",
      "Contact Groups",
      "Attachments",
      "Copy & Paste Images",
      "GIFs in Tickets",
    ],
  },
  {
    name: "Live Chat Features",
    summary:
      "Real-time communication, customizable chat widgets, and visitor tracking for modern support teams.",
    features: [
      "Chat Button Animations",
      "Chat Button",
      "Chat Button Gallery",
      "Chat Distribution",
      "Chat Embedded Tracking",
      "Chat History",
      "Chat Invitation Gallery",
      "Chat window docking",
      "Chats Overview",
      "Internal Chat",
      "Max queue length",
      "Online Visitors",
      "Proactive Chat Invitations",
      "Real-time Chat",
      "Real-time typing view",
      "Website Visitor Tracking",
    ],
  },
  {
    name: "Call center features",
    summary:
      "Call center operations with routing, recordings, IVR, and device support for voice-first support.",
    features: [
      "Automatic Callback",
      "Call Button",
      "Call Detail Records",
      "Call device scheduling",
      "Call routing",
      "Call transfers",
      "Internal calls",
      "IVR (Interactive Voice Response)",
      "Softphones",
      "Supported call devices",
      "Unlimited call recordings",
      "Video call",
    ],
  },
  {
    name: "Customer service reports features",
    summary:
      "Reporting tools for performance, SLA compliance, and channel insights across support operations.",
    features: [
      "Agent availability",
      "Agent ranking overview",
      "Agent Report",
      "Channel report",
      "Department Report",
      "Performance report",
      "SLA compliance report",
      "SLA Log Report",
      "Tag Reports",
      "Time Report",
    ],
  },
  {
    name: "Gamification features",
    summary:
      "Boost agent engagement, productivity, and collaboration through rewards and performance visibility.",
    features: ["Benchmarks and leaderboards", "Levels", "Rewards & Badges"],
  },
  {
    name: "Multilingual support features",
    summary:
      "Multilingual support capabilities that help your team adapt conversations and widgets for global audiences.",
    features: ["Language adaptable widgets"],
  },
  {
    name: "Customer portal features",
    summary:
      "Customer portal tools for self-service, knowledge sharing, feedback collection, and ticket submission.",
    features: [
      "Customer Forum",
      "Feedback & Suggestions",
      "Internal Knowledge Base",
      "Multi Knowledge Base",
      "WYSIWYG editor for articles",
    ],
  },
  {
    name: "Mobile help desk apps",
    summary: "Mobile apps that keep support teams productive on Android and iOS.",
    features: ["Android", "iOS"],
  },
  {
    name: "Help Desk Security features",
    summary:
      "Security capabilities including access control, encryption, verification, and enterprise sign-on.",
    features: [
      "2-Step Verification",
      "Ban IPs",
      "GDPR",
      "HTTPS Encryption",
      "Multiple data centers",
      "Password Validator and Audit Log",
      "Single Sign-On (SSO)",
    ],
  },
  {
    name: "Web Contact Cards Features",
    summary:
      "Browser-based contact cards for displaying contact and business information inside the support workflow.",
    features: ["Click to Email", "Click-to-call and click-to-dial buttons"],
  },
  {
    name: "Help Desk Integrations",
    summary:
      "Integrations such as Slack, Zapier, API, CMS, and migration tooling that extend your support stack.",
    features: [
      "API",
      "CMS",
      "Computer Telephony Integration",
      "Email marketing",
      "Migration plugins",
      "Project management",
      "Slack",
      "Zapier",
    ],
  },
];

const CATEGORY_THEMES = [
  "purple",
  "blue",
  "teal",
  "orange",
  "green",
  "violet",
  "indigo",
  "sky",
  "slate",
  "rose",
  "amber",
  "cyan",
] as const;

export type ThemeKey = (typeof CATEGORY_THEMES)[number];

export type FeatureItem = {
  title: string;
  slug: string;
  shortDescription: string;
};

export type FeatureCategory = {
  name: string;
  slug: string;
  summary: string;
  theme: ThemeKey;
  features: FeatureItem[];
};

export type FeatureDetail = {
  title: string;
  slug: string;
  shortDescription: string;
  categoryName: string;
  categorySlug: string;
  categorySummary: string;
  theme: ThemeKey;
  subtitle: string;
  tags: string[];
  overview: string;
  introParagraphs: string[];
  definitionPoints: string[];
  usageList: string[];
  workflowHint: string;
  howItWorksIntro: string[];
  functionBlocks: {
    name: string;
    description: string;
    imageAlt: string;
    notes?: string[];
  }[];
  setupSteps: {
    title: string;
    items: string[];
  }[];
  valuePoints: string[];
  useCases: string[];
  faqItems: {
    question: string;
    answer: string;
  }[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\//g, " ")
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function sentenceCaseSummary(summary: string) {
  return summary.charAt(0).toLowerCase() + summary.slice(1).replace(/\.$/, "");
}

function buildShortDescription(feature: string, category: RawCategory) {
  return `${feature} helps support teams ${sentenceCaseSummary(category.summary)} while keeping the customer journey clear, fast, and consistent.`;
}

function buildOverview(feature: string, category: RawCategory) {
  return `${feature} is part of VerlyAI's ${category.name.toLowerCase()} toolkit. It helps teams ${sentenceCaseSummary(
    category.summary
  )} so agents can move faster, customers get clearer outcomes, and operations stay easier to manage at scale.`;
}

function buildSubtitle(feature: string) {
  return `Bring more consistency, speed, and confidence to your team with ${feature}.`;
}

function buildTags(category: RawCategory) {
  const tags = [category.name.replace(/ features$/i, ""), "Customer support", "VerlyAI"];
  return Array.from(new Set(tags)).slice(0, 3);
}

function buildIntroParagraphs(feature: string, category: RawCategory) {
  return [
    `${feature} helps modern support teams ${sentenceCaseSummary(
      category.summary
    )}. It gives agents clearer workflows, stronger consistency, and a faster path to high-quality customer outcomes.`,
    `Inside VerlyAI, ${feature.toLowerCase()} fits naturally into the broader ${category.name.toLowerCase()} experience. That means your team can use it without adding unnecessary operational overhead or disconnected tools.`,
  ];
}

function buildDefinitionPoints(feature: string, category: RawCategory) {
  return [
    `${feature} is designed to support teams working across ${category.name.toLowerCase()}.`,
    `It helps standardize execution so agents can move faster while customers receive a more predictable experience.`,
    `The capability works best when paired with clear workflows, ownership, and the rest of your VerlyAI setup.`,
    `This page gives you a structured overview, usage guidance, and implementation ideas for ${feature.toLowerCase()}.`,
  ];
}

function buildUsageList(feature: string, category: RawCategory) {
  return [
    `Use ${feature.toLowerCase()} to streamline everyday tasks inside your ${category.name.toLowerCase()} workflow.`,
    `Apply it when your team needs clearer execution, faster turnaround, or more consistent customer communication.`,
    `Combine it with your other VerlyAI processes so agents can work with less friction and fewer manual gaps.`,
  ];
}

function buildWorkflowHint(feature: string) {
  return `Open the relevant support workflow in VerlyAI, choose ${feature}, review the suggested action or configuration, and apply it where your team needs more speed or consistency.`;
}

function buildHowItWorksIntro(feature: string, category: RawCategory) {
  return [
    `${feature} works inside the broader VerlyAI product flow for ${category.name.toLowerCase()}.`,
    `Teams can use it to improve execution quality, reduce repetitive work, and create a smoother customer support experience.`,
  ];
}

function buildFunctionBlocks(feature: string, category: RawCategory) {
  return [
    {
      name: "Operational clarity",
      description: `${feature} helps your team create a clearer and more repeatable process inside ${category.name.toLowerCase()}.`,
      imageAlt: `${feature} operational clarity illustration placeholder`,
    },
    {
      name: "Faster execution",
      description: `Use ${feature.toLowerCase()} to reduce friction, move work forward faster, and keep support quality high during busy periods.`,
      imageAlt: `${feature} faster execution illustration placeholder`,
    },
    {
      name: "Better customer experience",
      description: `${feature} helps customers receive more timely, consistent, and confidence-building support interactions.`,
      imageAlt: `${feature} customer experience illustration placeholder`,
      notes: [
        "Works well with structured workflows.",
        "Supports consistent execution across teams.",
        "Pairs naturally with other VerlyAI support features.",
      ],
    },
  ];
}

function buildSetupSteps(feature: string, category: RawCategory) {
  return [
    {
      title: `Step 1 - Define how ${feature} should be used`,
      items: [
        `Review where ${feature.toLowerCase()} fits in your ${category.name.toLowerCase()} process.`,
        "Decide which teams, inboxes, or workflows should rely on it first.",
        "Set a clear success goal such as faster handling, better quality, or fewer manual steps.",
      ],
    },
    {
      title: `Step 2 - Connect ${feature} to your workflow`,
      items: [
        `Enable ${feature.toLowerCase()} in the part of VerlyAI where your agents already work.`,
        "Align ownership, routing, and internal process expectations.",
        "Prepare any supporting knowledge, instructions, or operational rules needed for rollout.",
      ],
    },
    {
      title: `Step 3 - Roll out and refine`,
      items: [
        "Start with a focused use case or team.",
        "Review performance and agent feedback regularly.",
        `Refine how ${feature.toLowerCase()} is used until it fits naturally into day-to-day support work.`,
      ],
    },
  ];
}

function buildValuePoints(feature: string, category: RawCategory) {
  return [
    `Use ${feature} to make the ${category.name.toLowerCase()} workflow easier for agents and more predictable for customers.`,
    `Reduce manual effort by standardizing how your team handles ${feature.toLowerCase()} across chat, voice, WhatsApp, and ticket queues.`,
    `Create a cleaner support operation with better visibility, smoother handoffs, and stronger service consistency.`,
  ];
}

function buildUseCases(feature: string, category: RawCategory) {
  return [
    `Support teams that want clearer processes around ${feature.toLowerCase()}.`,
    `Growing businesses that need ${category.name.toLowerCase()} to scale without adding operational friction.`,
    `Ops and CX leaders who want better quality control, reporting, and customer experience consistency.`,
  ];
}

function buildFaqItems(feature: string, category: RawCategory) {
  return [
    {
      question: `What is ${feature}?`,
      answer: `${feature} is a VerlyAI capability built for ${category.name.toLowerCase()}. It helps teams ${sentenceCaseSummary(
        category.summary
      )} with more consistency and less manual friction.`,
    },
    {
      question: `How does ${feature} work?`,
      answer: `${feature} works inside your VerlyAI workflow so agents can use it in context, apply it to real support activity, and improve speed, quality, and operational clarity.`,
    },
    {
      question: `When should teams use ${feature}?`,
      answer: `Teams should use ${feature.toLowerCase()} when they want to improve support execution, reduce repetitive effort, and make the customer experience more reliable at scale.`,
    },
  ];
}

export const FEATURE_CATEGORIES: FeatureCategory[] = RAW_CATEGORIES.map(
  (category, index) => ({
    name: category.name,
    slug: slugify(category.name),
    summary: category.summary,
    theme: CATEGORY_THEMES[index % CATEGORY_THEMES.length],
    features: category.features.map((feature) => ({
      title: feature,
      slug: slugify(feature),
      shortDescription: buildShortDescription(feature, category),
    })),
  })
);

export const ALL_FEATURES: FeatureDetail[] = FEATURE_CATEGORIES.flatMap((category) =>
  category.features.map((feature) => ({
    ...feature,
    categoryName: category.name,
    categorySlug: category.slug,
    categorySummary: category.summary,
    theme: category.theme,
    subtitle: buildSubtitle(feature.title),
    tags: buildTags({
      name: category.name,
      summary: category.summary,
      features: [],
    }),
    overview: buildOverview(feature.title, {
      name: category.name,
      summary: category.summary,
      features: [],
    }),
    introParagraphs: buildIntroParagraphs(feature.title, {
      name: category.name,
      summary: category.summary,
      features: [],
    }),
    definitionPoints: buildDefinitionPoints(feature.title, {
      name: category.name,
      summary: category.summary,
      features: [],
    }),
    usageList: buildUsageList(feature.title, {
      name: category.name,
      summary: category.summary,
      features: [],
    }),
    workflowHint: buildWorkflowHint(feature.title),
    howItWorksIntro: buildHowItWorksIntro(feature.title, {
      name: category.name,
      summary: category.summary,
      features: [],
    }),
    functionBlocks: buildFunctionBlocks(feature.title, {
      name: category.name,
      summary: category.summary,
      features: [],
    }),
    setupSteps: buildSetupSteps(feature.title, {
      name: category.name,
      summary: category.summary,
      features: [],
    }),
    valuePoints: buildValuePoints(feature.title, {
      name: category.name,
      summary: category.summary,
      features: [],
    }),
    useCases: buildUseCases(feature.title, {
      name: category.name,
      summary: category.summary,
      features: [],
    }),
    faqItems: buildFaqItems(feature.title, {
      name: category.name,
      summary: category.summary,
      features: [],
    }),
  }))
);

export function getFeatureBySlug(slug: string) {
  return ALL_FEATURES.find((feature) => feature.slug === slug);
}

export function getCategoryBySlug(slug: string) {
  return FEATURE_CATEGORIES.find((category) => category.slug === slug);
}
