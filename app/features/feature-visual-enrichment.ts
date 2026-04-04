import type { FeatureDetail } from "./constants";

const BASE = "/images/features";

/** URL-safe path for a file in public/images/features (handles & in names). */
export function featureImageUrl(filename: string): string {
  return `${BASE}/${encodeURIComponent(filename)}`;
}

const ALL_FILES: string[] = [
  "Action&Tool.png",
  "AddKnowledgeSources.png",
  "BehaviourDashboard.png",
  "BehaviourDashboard1.png",
  "ChatbotGivingResponse.png",
  "ChatbotInterface.png",
  "ConversionVolume.png",
  "DataSources.png",
  "DeployYourAgent.png",
  "GeographicDistribution&Feedback.png",
  "IncomeStatistics.png",
  "Playground.png",
  "Step1Process.png",
  "Topics&Sentiment.png",
  "TopicsDashboard.png",
  "UploadMoreTypeSources.png",
];

const CATEGORY_POOLS: Record<string, string[]> = {
  "ai-features-for-customer-support": [
    "ChatbotInterface.png",
    "Playground.png",
    "ChatbotGivingResponse.png",
    "AddKnowledgeSources.png",
    "DataSources.png",
    "DeployYourAgent.png",
    "UploadMoreTypeSources.png",
    "Step1Process.png",
    "Action&Tool.png",
  ],
  "customer-service-reports-features": [
    "TopicsDashboard.png",
    "Topics&Sentiment.png",
    "BehaviourDashboard.png",
    "BehaviourDashboard1.png",
    "ConversionVolume.png",
    "GeographicDistribution&Feedback.png",
    "IncomeStatistics.png",
    "ChatbotInterface.png",
  ],
  "gamification-features": [
    "BehaviourDashboard.png",
    "ConversionVolume.png",
    "TopicsDashboard.png",
    "IncomeStatistics.png",
    "BehaviourDashboard1.png",
    "ChatbotGivingResponse.png",
  ],
  "ticketing-system-features": [
    "Step1Process.png",
    "DataSources.png",
    "TopicsDashboard.png",
    "Action&Tool.png",
    "ChatbotInterface.png",
    "DeployYourAgent.png",
  ],
  "live-chat-features": [
    "ChatbotInterface.png",
    "ChatbotGivingResponse.png",
    "ConversionVolume.png",
    "Playground.png",
    "TopicsDashboard.png",
  ],
  "call-center-features": [
    "ChatbotGivingResponse.png",
    "ConversionVolume.png",
    "GeographicDistribution&Feedback.png",
    "ChatbotInterface.png",
  ],
  "multilingual-support-features": [
    "DataSources.png",
    "AddKnowledgeSources.png",
    "UploadMoreTypeSources.png",
    "ChatbotInterface.png",
  ],
  "customer-portal-features": [
    "Step1Process.png",
    "DataSources.png",
    "TopicsDashboard.png",
    "ChatbotInterface.png",
    "DeployYourAgent.png",
  ],
  "mobile-help-desk-apps": [
    "ChatbotInterface.png",
    "Playground.png",
    "Step1Process.png",
    "Action&Tool.png",
  ],
  "help-desk-security-features": [
    "DataSources.png",
    "Step1Process.png",
    "Action&Tool.png",
    "DeployYourAgent.png",
  ],
  "web-contact-cards-features": [
    "ChatbotInterface.png",
    "ConversionVolume.png",
    "GeographicDistribution&Feedback.png",
  ],
  "help-desk-integrations": [
    "DataSources.png",
    "DeployYourAgent.png",
    "Action&Tool.png",
    "UploadMoreTypeSources.png",
    "AddKnowledgeSources.png",
  ],
};

/** Suggested workflow screenshots per category (tried before generic pool fill). */
const CATEGORY_WORKFLOW_HINTS: Record<string, string[]> = {
  "ai-features-for-customer-support": [
    "Playground.png",
    "ChatbotGivingResponse.png",
    "ChatbotInterface.png",
    "AddKnowledgeSources.png",
  ],
  "customer-service-reports-features": [
    "TopicsDashboard.png",
    "Topics&Sentiment.png",
    "ConversionVolume.png",
    "BehaviourDashboard.png",
  ],
  "gamification-features": [
    "BehaviourDashboard.png",
    "ConversionVolume.png",
    "TopicsDashboard.png",
    "IncomeStatistics.png",
  ],
  "ticketing-system-features": [
    "Step1Process.png",
    "DataSources.png",
    "Action&Tool.png",
    "TopicsDashboard.png",
  ],
  "live-chat-features": [
    "ChatbotInterface.png",
    "ChatbotGivingResponse.png",
    "Playground.png",
    "ConversionVolume.png",
  ],
  "call-center-features": [
    "ChatbotGivingResponse.png",
    "GeographicDistribution&Feedback.png",
    "ConversionVolume.png",
    "ChatbotInterface.png",
  ],
  "multilingual-support-features": [
    "UploadMoreTypeSources.png",
    "AddKnowledgeSources.png",
    "DataSources.png",
    "ChatbotInterface.png",
  ],
  "customer-portal-features": [
    "Step1Process.png",
    "DeployYourAgent.png",
    "DataSources.png",
    "ChatbotInterface.png",
  ],
  "mobile-help-desk-apps": [
    "Playground.png",
    "ChatbotInterface.png",
    "Step1Process.png",
    "Action&Tool.png",
  ],
  "help-desk-security-features": [
    "DataSources.png",
    "Step1Process.png",
    "DeployYourAgent.png",
    "Action&Tool.png",
  ],
  "web-contact-cards-features": [
    "ChatbotInterface.png",
    "GeographicDistribution&Feedback.png",
    "ConversionVolume.png",
  ],
  "help-desk-integrations": [
    "DataSources.png",
    "DeployYourAgent.png",
    "UploadMoreTypeSources.png",
    "AddKnowledgeSources.png",
  ],
};

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (Math.imul(31, h) + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function rotate<T>(arr: T[], offset: number): T[] {
  if (!arr.length) return arr;
  const k = ((offset % arr.length) + arr.length) % arr.length;
  return [...arr.slice(k), ...arr.slice(0, k)];
}

/**
 * Ordered keyword matches (most specific first). Used to pick hero / fill slots with meaning.
 */
function keywordMatches(slug: string, title: string, seed: number): string[] {
  const s = `${slug} ${title}`.toLowerCase();
  const out: string[] = [];
  const push = (f: string) => {
    if (!out.includes(f)) out.push(f);
  };

  if (s.includes("chatbot")) {
    push("ChatbotInterface.png");
    push("Playground.png");
  }
  if (/answer|improver|composer/.test(s)) push("ChatbotGivingResponse.png");
  if (s.includes("playground")) push("Playground.png");
  if (/knowledge|kb\b/.test(s)) {
    push("AddKnowledgeSources.png");
    push("DataSources.png");
  }
  if (
    /data.source|datasource/.test(s) ||
    (/\bsource\b/.test(s) && !/knowledge/.test(s))
  ) {
    push("DataSources.png");
    push("UploadMoreTypeSources.png");
  }
  if (/upload|multiformat|file type|mime|attachment/.test(s))
    push("UploadMoreTypeSources.png");
  if (/deploy|\bagent\b/.test(s)) push("DeployYourAgent.png");
  if (/topic/.test(s) && /sentiment/.test(s)) push("Topics&Sentiment.png");
  else if (/\btopic/.test(s)) push("TopicsDashboard.png");
  if (/sentiment/.test(s) && !out.some((p) => p.includes("Topic")))
    push("Topics&Sentiment.png");
  if (/conversion|funnel/.test(s)) push("ConversionVolume.png");
  if (
    /geographic|geo\b|region|map\b|locale/.test(s) ||
    (s.includes("feedback") && /survey|nps|csat/.test(s))
  ) {
    push("GeographicDistribution&Feedback.png");
  }
  if (/income|revenue|earning|profit/.test(s)) push("IncomeStatistics.png");
  if (/behavio/.test(s)) {
    push(seed % 2 === 0 ? "BehaviourDashboard.png" : "BehaviourDashboard1.png");
  }
  if (/macro|shortcut|tool\b|action\b|trigger/.test(s)) push("Action&Tool.png");
  if (/step|setup|onboard|wizard|pipeline/.test(s)) push("Step1Process.png");
  if (/sla|metric|kpi|performance score|leaderboard/.test(s)) {
    push("TopicsDashboard.png");
    push("ConversionVolume.png");
  }

  return out;
}

function pickFirstUnused(
  preferred: string[],
  pool: string[],
  used: Set<string>,
  walkStart: number
): string {
  for (const p of preferred) {
    if (!used.has(p)) {
      used.add(p);
      return p;
    }
  }
  for (let i = 0; i < pool.length; i++) {
    const f = pool[(walkStart + i) % pool.length];
    if (!used.has(f)) {
      used.add(f);
      return f;
    }
  }
  for (const f of ALL_FILES) {
    if (!used.has(f)) {
      used.add(f);
      return f;
    }
  }
  const fallback = pool[walkStart % pool.length] ?? ALL_FILES[0];
  used.add(fallback);
  return fallback;
}

function blockVisualHints(name: string, description: string): string[] {
  const t = `${name} ${description}`.toLowerCase();
  const h: string[] = [];
  const push = (f: string) => {
    if (!h.includes(f)) h.push(f);
  };

  if (/clarity|process|operational|structure|organize/.test(t)) {
    push("Step1Process.png");
    push("DataSources.png");
  }
  if (/execution|faster|speed|autom|efficien/.test(t)) {
    push("ChatbotGivingResponse.png");
    push("Action&Tool.png");
  }
  if (/customer|experience|satisf|engagement/.test(t)) {
    push("ChatbotInterface.png");
    push("GeographicDistribution&Feedback.png");
  }
  if (/report|insight|dashboard|analytic|metric/.test(t)) {
    push("TopicsDashboard.png");
    push("BehaviourDashboard.png");
  }

  return h;
}

const enrichCache = new Map<string, FeatureDetail>();

export function enrichFeatureVisuals(feature: FeatureDetail): FeatureDetail {
  const cached = enrichCache.get(feature.slug);
  if (cached) return cached;

  const seed = hashSlug(feature.slug);
  const categoryPool =
    CATEGORY_POOLS[feature.categorySlug] ?? [...ALL_FILES];
  const pool = rotate(categoryPool, seed);
  const keywords = keywordMatches(feature.slug, feature.title, seed);
  const workflowHints =
    CATEGORY_WORKFLOW_HINTS[feature.categorySlug] ?? [
      "Step1Process.png",
      "DataSources.png",
      "ChatbotInterface.png",
    ];

  const used = new Set<string>();

  const heroFile = pickFirstUnused(keywords, pool, used, seed);
  const overviewFile = pickFirstUnused(
    keywords.filter((k) => k !== heroFile),
    pool,
    used,
    seed + 1
  );

  const wf1 = pickFirstUnused(
    [...workflowHints, ...keywords],
    pool,
    used,
    seed + 2
  );
  const wf2 = pickFirstUnused(
    [...workflowHints, ...keywords],
    pool,
    used,
    seed + 3
  );

  const functionBlocks = feature.functionBlocks.map((block, i) => {
    const hints = blockVisualHints(block.name, block.description);
    const blockFile = pickFirstUnused(
      [...hints, ...keywords],
      pool,
      used,
      seed + 4 + i
    );
    return {
      ...block,
      imagePath: featureImageUrl(blockFile),
    };
  });

  const next: FeatureDetail = {
    ...feature,
    heroImagePath: featureImageUrl(heroFile),
    heroImageAlt: feature.heroImageAlt?.includes("placeholder")
      ? `${feature.title} — product screenshot`
      : feature.heroImageAlt,
    overviewImagePath: featureImageUrl(overviewFile),
    workflowImagePaths: [
      featureImageUrl(wf1),
      featureImageUrl(wf2),
    ],
    functionBlocks,
  };
  enrichCache.set(feature.slug, next);
  return next;
}
