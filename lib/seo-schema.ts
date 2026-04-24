/**
 * JSON-LD schema helpers for marketing SEO.
 *
 * Emit these in a page by stringifying and passing to a
 * `<script type="application/ld+json" dangerouslySetInnerHTML={...} />`.
 */

import { siteConfig } from "@/lib/metadata";

type Crumb = { name: string; path: string };

/** Build a BreadcrumbList JSON-LD object from an ordered path. */
export function buildBreadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteConfig.url}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };
}

type FaqEntry = { q: string; a: string };

/** Build a FAQPage JSON-LD object from a Q/A list. */
export function buildFaqSchema(entries: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.a,
      },
    })),
  };
}
