"use client";

import posthog from "posthog-js";

import { TimePeriodSelector } from "@/components/analytics/time-period-selector";
import { AbandonmentCard } from "@/components/escalation-analytics/abandonment-card";
import { BreakdownTabsCard } from "@/components/escalation-analytics/breakdown-tabs-card";
import { EscalationSummaryCards } from "@/components/escalation-analytics/escalation-summary-cards";
import { EscalationVolumeCard } from "@/components/escalation-analytics/escalation-volume-card";
import { TimeToHumanCard } from "@/components/escalation-analytics/time-to-human-card";
import {
  getEscalationAnalyticsDummyData,
  getEscalationAnalyticsDummyLoadDelayMs,
} from "@/lib/dummy/escalation-analytics";
import { SampleDataBanner } from "@/components/shared/sample-data-banner";
import { use, useEffect, useMemo, useState } from "react";

interface EscalationAnalyticsPageProps {
  params: Promise<{
    botId: string;
  }>;
}

export default function EscalationAnalyticsPage({
  params,
}: EscalationAnalyticsPageProps) {
  const { botId } = use(params);

  useEffect(() => {
    posthog.capture("escalation_analytics_page_viewed", {
      chatbot_id: botId
    });
  }, [botId]);

  const [selectedDays, setSelectedDays] = useState<number>(7);
  const [isLoading, setIsLoading] = useState(true);
  const [useSampleData, setUseSampleData] = useState(true);

  const sampleStorageKey = `conversly.sampleData.dismissed.escalationAnalytics.${botId}`;

  useEffect(() => {
    try {
      const dismissed = window.localStorage.getItem(sampleStorageKey) === "1";
      setUseSampleData(!dismissed);
    } catch {
      setUseSampleData(true);
    }
  }, [sampleStorageKey]);

  const data = useMemo(() => {
    if (useSampleData) return getEscalationAnalyticsDummyData(botId, selectedDays);

    const now = new Date();
    const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const start = new Date(end);
    start.setUTCDate(start.getUTCDate() - (Math.max(1, Math.floor(selectedDays)) - 1));
    const toIso = (d: Date) => d.toISOString().slice(0, 10);

    return {
      dateRange: { startDate: toIso(start), endDate: toIso(end) },
      conversationsPerDay: [],
      escalationsPerDay: [],
      escalationTopics: { totals: [], perDay: [] },
      handledBy: { totals: [], perDay: [] },
      timeToHumanPerDay: [],
      abandonmentPerDay: [],
      summary: {
        totalConversations: 0,
        totalEscalations: 0,
        escalationRatePercent: 0,
        avgTimeToHumanMin: 0,
        abandonmentRatePercent: 0,
        aiHandledPercent: 0,
      },
    };
  }, [botId, selectedDays, useSampleData]);

  useEffect(() => {
    if (!useSampleData) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const delay = getEscalationAnalyticsDummyLoadDelayMs(`${botId}:${selectedDays}`);
    const t = window.setTimeout(() => setIsLoading(false), delay);
    return () => window.clearTimeout(t);
  }, [botId, selectedDays, useSampleData]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      // Premium SaaS-y: "24 Jan" (less noisy than "Jan 24")
      return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="px-4 md:px-6 py-4 md:py-6 space-y-4">
      <div className="mb-4">
        <h1 className="type-page-title">Escalation analytics</h1>
        <p className="type-body-muted">
          Track human escalation volume, reasons, pickup time, and user abandonment.
        </p>
      </div>

      <TimePeriodSelector
        selectedDays={selectedDays}
        onDaysChange={setSelectedDays}
        startDate={data.dateRange.startDate}
        endDate={data.dateRange.endDate}
      />

      <EscalationSummaryCards summary={data.summary} isLoading={isLoading} />

      <div className="grid gap-4 md:grid-cols-2 items-stretch">
        <div className="md:col-span-2">
          <EscalationVolumeCard
            isLoading={isLoading}
            conversationsPerDay={data.conversationsPerDay}
            escalationsPerDay={data.escalationsPerDay}
            formatDate={formatDate}
          />
        </div>

        <BreakdownTabsCard
          title="Escalation reasons (topics)"
          description="What users escalated for"
          isLoading={isLoading}
          totals={data.escalationTopics.totals}
          perDay={data.escalationTopics.perDay}
          formatDate={formatDate}
          // many series: keep as lines to avoid visual chaos
          areaByCategoryId={{}}
        />

        <BreakdownTabsCard
          title="AI vs Human"
          description="Who handled conversations"
          isLoading={isLoading}
          totals={data.handledBy.totals}
          perDay={data.handledBy.perDay}
          formatDate={formatDate}
          // storytelling: AI owns the area; human is an exception line
          areaByCategoryId={{ ai: true, human: false }}
        />

        <TimeToHumanCard
          isLoading={isLoading}
          points={data.timeToHumanPerDay}
          formatDate={formatDate}
        />

        <AbandonmentCard
          isLoading={isLoading}
          points={data.abandonmentPerDay}
          formatDate={formatDate}
        />
      </div>

      <SampleDataBanner
        storageKey={sampleStorageKey}
        onDismiss={() => setUseSampleData(false)}
      />
    </div>
  );
}