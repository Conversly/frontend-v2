import type { Metadata } from "next";
import { getProducts } from "@/lib/api/promote";
import { siteConfig } from "@/lib/metadata";
import PromotePageClient from "@/components/promote/PromotePageClient";

export const metadata: Metadata = {
  title: "Launch Directory | VerlyAI",
  description:
    "Discover the best new products in tech, every day. Browse the latest product launches and upvote your favorites.",
  alternates: { canonical: "/promote" },
  openGraph: {
    title: "Launch Directory | VerlyAI",
    description: "Discover the best new products in tech, every day.",
    url: `${siteConfig.url}/promote`,
    type: "website",
  },
  twitter: {
    title: "Launch Directory | VerlyAI",
    description: "Discover the best new products in tech, every day.",
  },
};

export default async function PromotePage() {
  let products: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    products = await getProducts();
  } catch (error) {
    console.error("Failed to fetch products", error);
  }

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          Launch Directory
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Discover the best new products in tech, every day.
        </p>
      </div>

      <PromotePageClient products={products} />
    </div>
  );
}
