import { MetadataRoute } from "next";

import { siteConfig } from "@/lib/metadata";
import { getAllPosts } from "@/lib/sanity/client";

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
    url: `${siteConfig.url}/blogs`,
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

  return [...staticRoutes, ...blogRoutes];
}
