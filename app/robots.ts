import { MetadataRoute } from "next";

import { siteConfig } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/chatbot/",
        "/workspace/",
        "/profile/",
        "/promote-manager/",
        "/auth/",
        "/login",
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
