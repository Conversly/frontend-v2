import type { Metadata } from "next";
import Link from "next/link";

import { BlogIndex } from "@/components/blog/blog-index";
import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";
import { siteConfig } from "@/lib/metadata";
import { getAllPosts } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import { format, parseISO } from "date-fns";

const blogsCanonical = `${siteConfig.url}/blogs`;

export const metadata: Metadata = {
  title: "Blog — AI agents, voice & WhatsApp support",
  description:
    "Articles from Verly on deploying AI customer support agents: voice AI, WhatsApp automation, web chat, RAG, tools, and scaling support without extra headcount.",
  keywords: [
    "Verly blog",
    "AI customer support",
    "voice AI agents",
    "WhatsApp business automation",
    "AI support platform",
  ],
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Verly Blog — insights for AI support teams",
    description:
      "Practical guides and product updates for building omnichannel AI agents on Voice, WhatsApp, and the web — from the team behind verlyai.xyz.",
    url: `${siteConfig.url}/blogs`,
    type: "website",
  },
  twitter: {
    title: "Blog — AI agents, voice & WhatsApp support",
    description:
      "Articles on deploying AI customer support agents: voice AI, WhatsApp automation, web chat, and scaling support.",
  },
};

export const revalidate = 60;

function formatBlogDate(value: string) {
  try {
    return format(parseISO(value), "MMM dd, yyyy");
  } catch {
    return value;
  }
}

export default async function BlogPage() {
  const posts = (await getAllPosts())
    .filter((post) => post.slug?.current)
    .map((post) => ({
      id: post._id,
      title: post.title,
      excerpt:
        post.excerpt ||
        "Ideas on AI agents, voice and messaging automation, and customer experience from Verly.",
      date: formatBlogDate(post.date),
      readTime: `${post.estReadingTime ?? 5} min read`,
      slug: post.slug.current,
      category: post.categories?.[0]?.title || "Blog",
      categories:
        post.categories?.map((category) => category.title || "Blog") || ["Blog"],
      image: urlForImage(post.mainImage),
    }));

  return (
    <main className="relative flex min-h-screen flex-col bg-background">
      <Navbar />

      <section className="relative overflow-hidden bg-background px-6 pb-24 pt-[100px] lg:pt-[120px]">
        <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.15),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="mx-auto max-w-7xl relative space-y-12">
          <div className="space-y-6 text-center">
            <div className="mx-auto inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
              <span className="mr-2 flex h-2 w-2 rounded-full bg-primary" />
              Verly · {siteConfig.url.replace(/^https?:\/\//, "")}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Smarter support with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                AI agents
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground/80 leading-relaxed">
              How to ship and scale autonomous support on voice, WhatsApp, and web
              chat — playbooks, architecture notes, and what we are building at
              Verly. Explore{" "}
              <Link
                href="/solutions"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                solutions by industry
              </Link>{" "}
              or{" "}
              <Link
                href="/docs"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                developer docs
              </Link>
              .
            </p>
          </div>

          {posts.length ? (
            <BlogIndex posts={posts} />
          ) : (
            <div className="rounded-3xl border border-border/60 bg-card/40 px-8 py-16 text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                New articles are on the way
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                We publish guides on voice AI, WhatsApp automation, and omnichannel
                support as soon as they are ready. In the meantime, explore how teams
                use Verly to handle more conversations without hiring.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/solutions"
                  className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/15"
                >
                  View solutions
                </Link>
                <Link
                  href="/about"
                  className="inline-flex rounded-full border border-border/60 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  About Verly
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
