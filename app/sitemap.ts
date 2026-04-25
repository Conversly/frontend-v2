import { MetadataRoute } from "next";

import { siteConfig } from "@/lib/metadata";
import { getAllPosts } from "@/lib/sanity/client";
import { getAllSolutionSlugs } from "@/lib/solutions-data";
import { ALL_FEATURES } from "@/app/features/constants";
import { getAllCompetitorSlugs } from "@/lib/compare-data";

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: siteConfig.url,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: `${siteConfig.url}/about`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${siteConfig.url}/solutions`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${siteConfig.url}/solutions/enterprise`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${siteConfig.url}/lead-agent`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${siteConfig.url}/features`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${siteConfig.url}/pricing`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${siteConfig.url}/voice`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${siteConfig.url}/whatsapp`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${siteConfig.url}/web-chat`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${siteConfig.url}/why-verly`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${siteConfig.url}/compare`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${siteConfig.url}/integrations`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  },
  {
    url: `${siteConfig.url}/changelog`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    url: `${siteConfig.url}/blogs`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${siteConfig.url}/docs`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${siteConfig.url}/faq`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${siteConfig.url}/help`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${siteConfig.url}/privacy`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.4,
  },
  {
    url: `${siteConfig.url}/terms`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.4,
  },
  {
    url: `${siteConfig.url}/deletion`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const blogRoutes: MetadataRoute.Sitemap = posts
    .filter((post) => post.slug?.current)
    .map((post) => ({
      url: `${siteConfig.url}/blogs/${post.slug.current}`,
      lastModified: new Date(post.publishedAt ?? post.date ?? post._createdAt),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const solutionRoutes: MetadataRoute.Sitemap = getAllSolutionSlugs().map(
    (slug) => ({
      url: `${siteConfig.url}/solutions/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  const featureRoutes: MetadataRoute.Sitemap = ALL_FEATURES.map((feature) => ({
    url: `${siteConfig.url}/features/${feature.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const compareRoutes: MetadataRoute.Sitemap = getAllCompetitorSlugs().map(
    (slug) => ({
      url: `${siteConfig.url}/compare/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })
  );

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...solutionRoutes,
    ...featureRoutes,
    ...compareRoutes,
  ];
}
