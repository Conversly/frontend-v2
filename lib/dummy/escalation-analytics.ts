export type DayCount = { date: string; count: number };

export type BreakdownCategory = {
  id: string;
  label: string;
  color: string;
};

export type BreakdownTotals = {
  id: string;
  label: string;
  color: string;
  value: number;
};

export type BreakdownSeries = {
  categoryId: string;
  categoryLabel: string;
  color: string;
  points: Array<{ date: string; value: number }>;
};

export type TimeToHumanPoint = {
  date: string;
  p50Min: number;
  p95Min: number;
  avgMin: number;
};

export type AbandonmentPoint = {
  date: string;
  abandonedCount: number;
  abandonmentRatePercent: number;
};

export type EscalationAnalyticsDummyData = {
  dateRange: { startDate: string; endDate: string };

  conversationsPerDay: DayCount[];
  escalationsPerDay: DayCount[];

  escalationTopics: {
    totals: BreakdownTotals[];
    perDay: BreakdownSeries[];
  };

  handledBy: {
    totals: BreakdownTotals[];
    perDay: BreakdownSeries[];
  };

  timeToHumanPerDay: TimeToHumanPoint[];
  abandonmentPerDay: AbandonmentPoint[];

  summary: {
    totalConversations: number;
    totalEscalations: number;
    escalationRatePercent: number;
    avgTimeToHumanMin: number;
    abandonmentRatePercent: number;
    aiHandledPercent: number;
  };
};

const DEFAULT_TOPIC_CATEGORIES: BreakdownCategory[] = [
  { id: "billing", label: "Billing", color: "#0ea5e9" }, // sky-500
  { id: "technical", label: "Technical", color: "#8b5cf6" }, // violet-500
  { id: "accountAccess", label: "Account access", color: "#22c55e" }, // green-500
  { id: "pricing", label: "Pricing", color: "#f97316" }, // orange-500
  { id: "refund", label: "Refund", color: "#ef4444" }, // red-500
  { id: "other", label: "Other", color: "#94a3b8" }, // slate-400
];

const DEFAULT_HANDLED_BY: BreakdownCategory[] = [
  { id: "ai", label: "AI", color: "#22c55e" }, // green-500
  { id: "human", label: "Human", color: "#0ea5e9" }, // sky-500
];

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function roundTo(n: number, digits: number) {
  const p = Math.pow(10, digits);
  return Math.round(n * p) / p;
}

function sum(nums: number[]) {
  return nums.reduce((a, b) => a + b, 0);
}

function ema(prev: number | undefined, next: number, alpha: number) {
  const a = clamp(alpha, 0, 1);
  if (prev === undefined) return next;
  return prev * (1 - a) + next * a;
}

function stableHash(input: string) {
  // Small, deterministic 32-bit hash from a string (FNV-1a-ish)
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return function rand() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function isoDateUTC(d: Date) {
  const year = d.getUTCFullYear();
  const month = `${d.getUTCMonth() + 1}`.padStart(2, "0");
  const day = `${d.getUTCDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDaysUTC(date: Date, days: number) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function generateDateRange(days: number, now: Date) {
  const safeDays = clamp(Math.floor(days), 1, 365);
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const start = addDaysUTC(end, -(safeDays - 1));

  const dates: string[] = [];
  for (let i = 0; i < safeDays; i += 1) {
    dates.push(isoDateUTC(addDaysUTC(start, i)));
  }
  return { startDate: isoDateUTC(start), endDate: isoDateUTC(end), dates };
}

export function getEscalationAnalyticsDummyData(
  botId: string,
  days: number,
  opts?: {
    now?: Date;
    topicCategories?: BreakdownCategory[];
  }
): EscalationAnalyticsDummyData {
  const seed = stableHash(`escalation-analytics:${botId}`);
  const rand = mulberry32(seed);
  const now = opts?.now ?? new Date();

  const topics = opts?.topicCategories ?? DEFAULT_TOPIC_CATEGORIES;
  const handledBy = DEFAULT_HANDLED_BY;

  const { startDate, endDate, dates } = generateDateRange(days, now);

  // Conversations baseline: keep it plausible and stable.
  const baseConversations = 80 + Math.floor(rand() * 120); // 80..199
  const weeklySwing = 0.15 + rand() * 0.2; // 0.15..0.35
  const noise = 0.1 + rand() * 0.15; // 0.10..0.25

  const conversationsPerDay: DayCount[] = [];
  const escalationsPerDay: DayCount[] = [];

  // Escalation rate baseline (storytelling): keep it low so it visually reads
  // as "AI handles most conversations; humans are the safety net".
  // 0.8% .. 5%
  const baseEscalationRate = 0.008 + rand() * 0.042;

  // Abandonment baseline: 4%..22% of escalations
  const baseAbandonRate = 0.04 + rand() * 0.18;

  const timeToHumanPerDay: TimeToHumanPoint[] = [];
  const abandonmentPerDay: AbandonmentPoint[] = [];

  // Topic weights (stable, normalized)
  const rawTopicWeights = topics.map(() => 0.2 + rand());
  const topicWeightSum = sum(rawTopicWeights);
  const topicWeights = rawTopicWeights.map((w) => w / topicWeightSum);

  // Handled-by (storytelling): AI share baseline 78%..95%
  const aiShareBase = 0.78 + rand() * 0.17;

  // Accumulators for totals
  const topicTotals: Record<string, number> = Object.fromEntries(
    topics.map((t) => [t.id, 0])
  );
  const handledTotals: Record<string, number> = Object.fromEntries(
    handledBy.map((c) => [c.id, 0])
  );

  // Per-day breakdown points
  const topicPointsById: Record<string, Array<{ date: string; value: number }>> =
    Object.fromEntries(topics.map((t) => [t.id, []]));
  const handledPointsById: Record<string, Array<{ date: string; value: number }>> =
    Object.fromEntries(handledBy.map((c) => [c.id, []]));

  // Smoothing state (EMA) to reduce sharp spikes while keeping trends.
  let convEma: number | undefined;
  let escRateEma: number | undefined;
  let abRateEma: number | undefined;
  let aiShareEma: number | undefined;
  let p50Ema: number | undefined;
  let p95Ema: number | undefined;
  let avgEma: number | undefined;

  dates.forEach((dateStr, idx) => {
    // Weekly seasonality: sin wave
    const season = Math.sin((idx / 6.5) * Math.PI) * weeklySwing;
    const dayNoise = (rand() * 2 - 1) * noise;
    const convRaw = Math.max(
      0,
      Math.round(baseConversations * (1 + season + dayNoise))
    );

    // Escalations derived from conversations and escalation rate.
    // Make escalation rate gently trend down across the range (subtle).
    const progress = dates.length > 1 ? idx / (dates.length - 1) : 0;
    const trendDown = 1 - progress * (0.12 + rand() * 0.08); // ~12–20% down over window

    const dayEscRateRaw = clamp(
      baseEscalationRate * trendDown * (1 + (rand() * 2 - 1) * 0.25),
      0.003,
      0.12
    );
    convEma = ema(convEma, convRaw, 0.35);
    const conv = Math.max(0, Math.round(convEma));

    escRateEma = ema(escRateEma, dayEscRateRaw, 0.25);
    const dayEscRate = clamp(escRateEma ?? dayEscRateRaw, 0.01, 0.35);

    const escalations = Math.max(0, Math.min(conv, Math.round(conv * dayEscRate)));

    conversationsPerDay.push({ date: dateStr, count: conv });
    escalationsPerDay.push({ date: dateStr, count: escalations });

    // Time-to-human (minutes): p50 0.8..6, p95 3..18
    const p50Raw = clamp(0.8 + rand() * 5.2 + dayEscRate * 4, 0.5, 12);
    const p95Raw = clamp(p50Raw + 2.5 + rand() * 9.5 + dayEscRate * 6, 2, 30);
    const avgRaw = clamp(
      p50Raw + (p95Raw - p50Raw) * (0.35 + rand() * 0.25),
      0.5,
      20
    );

    p50Ema = ema(p50Ema, p50Raw, 0.3);
    p95Ema = ema(p95Ema, p95Raw, 0.3);
    avgEma = ema(avgEma, avgRaw, 0.3);

    const p50 = clamp(p50Ema ?? p50Raw, 0.5, 12);
    const p95 = clamp(p95Ema ?? p95Raw, 2, 30);
    const avg = clamp(avgEma ?? avgRaw, 0.5, 20);

    timeToHumanPerDay.push({
      date: dateStr,
      p50Min: roundTo(p50, 1),
      p95Min: roundTo(p95, 1),
      avgMin: roundTo(avg, 1),
    });

    // Abandonment (count and rate)
    const dayAbRateRaw = clamp(
      baseAbandonRate * (1 + (rand() * 2 - 1) * 0.4),
      0,
      0.6
    );
    abRateEma = ema(abRateEma, dayAbRateRaw, 0.25);
    const dayAbRate = clamp(abRateEma ?? dayAbRateRaw, 0, 0.6);
    const abandonedCount = escalations
      ? Math.max(0, Math.round(escalations * dayAbRate))
      : 0;
    const abandonmentRatePercent = escalations
      ? roundTo((abandonedCount / escalations) * 100, 1)
      : 0;
    abandonmentPerDay.push({ date: dateStr, abandonedCount, abandonmentRatePercent });

    // Topic breakdown of escalations (multinomial-ish via weights + small noise)
    let remaining = escalations;
    topics.forEach((t, tIdx) => {
      const isLast = tIdx === topics.length - 1;
      const noisyWeight = clamp(topicWeights[tIdx]! * (0.75 + rand() * 0.5), 0, 1);
      const v = isLast
        ? remaining
        : Math.max(0, Math.round(escalations * noisyWeight * (0.85 + rand() * 0.3)));
      const value = isLast ? remaining : Math.min(remaining, v);
      remaining -= value;
      topicTotals[t.id] = (topicTotals[t.id] ?? 0) + value;
      topicPointsById[t.id]!.push({ date: dateStr, value });
    });

    // Handled-by breakdown (for all conversations): AI vs Human
    // Human handled ≈ escalations + a small extra; AI handled = rest
    // Make AI share gently trend up (subtle) to sell improvement over time.
    const aiTrendUp = aiShareBase + progress * (0.04 + rand() * 0.03);
    const aiShareRaw = clamp(aiTrendUp + (rand() * 2 - 1) * 0.08, 0.6, 0.99);
    aiShareEma = ema(aiShareEma, aiShareRaw, 0.25);
    const aiShare = clamp(aiShareEma ?? aiShareRaw, 0.2, 0.98);
    const human = Math.min(conv, Math.max(escalations, Math.round(conv * (1 - aiShare))));
    const ai = Math.max(0, conv - human);
    handledTotals.ai = (handledTotals.ai ?? 0) + ai;
    handledTotals.human = (handledTotals.human ?? 0) + human;
    handledPointsById.ai!.push({ date: dateStr, value: ai });
    handledPointsById.human!.push({ date: dateStr, value: human });
  });

  const totalConversations = sum(conversationsPerDay.map((d) => d.count));
  const totalEscalations = sum(escalationsPerDay.map((d) => d.count));

  const escalationRatePercent = totalConversations
    ? roundTo((totalEscalations / totalConversations) * 100, 1)
    : 0;

  const avgTimeToHumanMin = timeToHumanPerDay.length
    ? roundTo(sum(timeToHumanPerDay.map((p) => p.avgMin)) / timeToHumanPerDay.length, 1)
    : 0;

  const abandonmentRatePercent =
    totalEscalations > 0
      ? roundTo(
          (sum(abandonmentPerDay.map((p) => p.abandonedCount)) / totalEscalations) *
            100,
          1
        )
      : 0;

  const aiHandledPercent =
    totalConversations > 0
      ? roundTo((handledTotals.ai / totalConversations) * 100, 1)
      : 0;

  const escalationTopics = {
    totals: topics.map((t) => ({
      id: t.id,
      label: t.label,
      color: t.color,
      value: topicTotals[t.id] ?? 0,
    })),
    perDay: topics.map((t) => ({
      categoryId: t.id,
      categoryLabel: t.label,
      color: t.color,
      points: topicPointsById[t.id] ?? [],
    })),
  };

  const handledByBreakdown = {
    totals: handledBy.map((c) => ({
      id: c.id,
      label: c.label,
      color: c.color,
      value: handledTotals[c.id] ?? 0,
    })),
    perDay: handledBy.map((c) => ({
      categoryId: c.id,
      categoryLabel: c.label,
      color: c.color,
      points: handledPointsById[c.id] ?? [],
    })),
  };

  return {
    dateRange: { startDate, endDate },
    conversationsPerDay,
    escalationsPerDay,
    escalationTopics,
    handledBy: handledByBreakdown,
    timeToHumanPerDay,
    abandonmentPerDay,
    summary: {
      totalConversations,
      totalEscalations,
      escalationRatePercent,
      avgTimeToHumanMin,
      abandonmentRatePercent,
      aiHandledPercent,
    },
  };
}

export function getEscalationAnalyticsDummyLoadDelayMs(botId: string) {
  const seed = stableHash(`escalation-analytics-delay:${botId}`);
  const rand = mulberry32(seed);
  return 200 + Math.floor(rand() * 250); // 200..449ms
}
