/**
 * Changelog entries. Each entry is a week-batched release note.
 *
 * When editing: add new entries at the top of `changelog`. Keep
 * each summary under two sentences. Group related shipments.
 */

export type ChangelogTag = "feature" | "improvement" | "fix" | "security";

export type ChangelogEntry = {
  date: string; // ISO yyyy-mm-dd
  version?: string;
  title: string;
  summary: string;
  bullets: { tag: ChangelogTag; text: string }[];
};

export const changelog: ChangelogEntry[] = [
  {
    date: "2026-04-22",
    version: "v1.14",
    title: "Voice latency under 500ms across every region.",
    summary:
      "We cut median first-response time on voice calls by 38% this week. New edge caching on our transcription pipeline, plus a faster model router.",
    bullets: [
      { tag: "improvement", text: "Median voice latency now sits at 420ms (was 680ms)." },
      { tag: "feature", text: "New voicemail-to-ticket flow — missed calls generate a full-context ticket with audio attached." },
      { tag: "fix", text: "Fixed a rare race on warm transfers where agent context arrived empty." },
    ],
  },
  {
    date: "2026-04-15",
    version: "v1.13",
    title: "Pricing FAQ schema, editorial founder note, and a new 404.",
    summary:
      "Marketing site got a pass. The pricing page now leads with the founder note, and we emit FAQ schema so pricing answers can show in Google rich results.",
    bullets: [
      { tag: "feature", text: "New /compare/intercom, /compare/zendesk, /compare/chatbase pages with honest TL;DR tables." },
      { tag: "feature", text: "Integrations page at /integrations — 24 native integrations across CRM, commerce, and knowledge." },
      { tag: "improvement", text: "Sticky mobile CTA bar across marketing pages — conversion lift expected on mobile." },
    ],
  },
  {
    date: "2026-04-08",
    version: "v1.12",
    title: "Shared inbox ships with SLA tracking and auto-assignment.",
    summary:
      "Every channel lands in one queue. SLAs track time-to-first-response per customer tier, and Verly auto-assigns by round-robin or skill.",
    bullets: [
      { tag: "feature", text: "SLA tracking on shared inbox — alerts before you breach, not after." },
      { tag: "feature", text: "Round-robin and skill-based auto-assignment rules." },
      { tag: "improvement", text: "Inbox loads 2.4x faster for workspaces with >10k conversations." },
    ],
  },
  {
    date: "2026-04-01",
    version: "v1.11",
    title: "SOC 2 Type II report available on request.",
    summary:
      "Our second audit window closed. Enterprise customers can request the full report during a trial.",
    bullets: [
      { tag: "security", text: "SOC 2 Type II report available to Enterprise customers." },
      { tag: "security", text: "EU data residency now generally available for all plans." },
      { tag: "improvement", text: "Audit logs now export to CSV, JSON, or streamed to Datadog/Splunk." },
    ],
  },
  {
    date: "2026-03-25",
    version: "v1.10",
    title: "Knowledge base auto-sync for Notion, Confluence, and live URLs.",
    summary:
      "Point Verly at your docs once. It keeps them in sync automatically — no more stale answers when your product changes.",
    bullets: [
      { tag: "feature", text: "Auto-sync for Notion databases, Confluence spaces, and sitemap-indexed URLs." },
      { tag: "feature", text: "Coverage report flags intents your knowledge base can't answer yet." },
      { tag: "fix", text: "Fixed a bug where deleted articles stayed cached for up to 24h." },
    ],
  },
];
