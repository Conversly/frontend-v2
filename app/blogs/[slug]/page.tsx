import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogPostSidebar } from "@/components/blog/blog-post-sidebar";
import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/metadata";
import { getAllPostsSlugs, getPostBySlug } from "@/lib/sanity/client";
import {
  extractBlogTocFromBody,
  type BlogBodyHeadingTocItem,
  type BlogTocItem,
} from "@/lib/sanity/extract-blog-toc";
import { urlForImage } from "@/lib/sanity/image";
import { SanityPortableText } from "@/lib/sanity/portable-text";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { format, parseISO } from "date-fns";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post | VerlyAI",
    };
  }

  const description =
    post.excerpt || "Read the latest blog post from the VerlyAI team.";
  const canonical = `${siteConfig.url}/blogs/${slug}`;
  const image = urlForImage(post.mainImage);
  const imageAlt = post.mainImage?.alt || post.title;

  return {
    title: `${post.title} | VerlyAI Blog`,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      title: `${post.title} | VerlyAI Blog`,
      description,
      url: canonical,
      publishedTime: post.publishedAt ?? post.date,
      authors: [post.author?.name || "VerlyAI"],
      section: post.categories?.[0]?.title || "Blog",
      images: image
        ? [
            {
              url: image.src,
              width: image.width,
              height: image.height,
              alt: imageAlt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: `${post.title} | VerlyAI Blog`,
      description,
      images: image ? [image.src] : undefined,
    },
  };
}

export async function generateStaticParams() {
  return await getAllPostsSlugs();
}

export const revalidate = 60;

function formatBlogDate(value: string) {
  try {
    return format(parseISO(value), "MMMM dd, yyyy");
  } catch {
    return value;
  }
}

function buildTocItems(
  title: string,
  bodyToc: BlogBodyHeadingTocItem[],
): BlogTocItem[] {
  return [
    { id: "article-top", text: title, level: 1 },
    ...bodyToc,
  ];
}

function buildBlogPostingStructuredData({
  slug,
  post,
  image,
}: {
  slug: string;
  post: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>;
  image?: ReturnType<typeof urlForImage>;
}) {
  const canonical = `${siteConfig.url}/blogs/${slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": canonical,
    headline: post.title,
    description:
      post.excerpt || "Read the latest blog post from the VerlyAI team.",
    datePublished: post.publishedAt ?? post.date,
    dateModified: (post as unknown as { _updatedAt?: string })._updatedAt ?? post.publishedAt ?? post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    url: canonical,
    articleSection: post.categories?.[0]?.title || "Blog",
    keywords: post.categories?.map((c) => c.title ?? '').filter(Boolean).join(", "),
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: post.author?.name || "VerlyAI",
    },
    publisher: {
      "@id": "https://verlyai.xyz/#organization",
    },
    image: image
      ? {
          "@type": "ImageObject",
          url: image.src,
          width: image.width,
          height: image.height,
        }
      : undefined,
  };
}

function buildBreadcrumbSchema(slug: string, title: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://verlyai.xyz" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://verlyai.xyz/blogs" },
      { "@type": "ListItem", position: 3, name: title, item: `https://verlyai.xyz/blogs/${slug}` },
    ],
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const image = urlForImage(post?.mainImage);

  if (!post) {
    notFound();
  }

  const bodyToc = extractBlogTocFromBody(post.body);
  const tocItems = buildTocItems(post.title, bodyToc);
  const tocAnchors = bodyToc.map(({ id, level }) => ({ id, level }));
  const blogPostingStructuredData = buildBlogPostingStructuredData({ slug, post, image });
  const breadcrumbStructuredData = buildBreadcrumbSchema(slug, post.title);

  return (
    <main className="relative flex min-h-screen flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <Navbar />

      <article className="flex-1 pb-20 pt-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all posts
            </Link>
          </div>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(260px,310px)] lg:gap-14 xl:gap-16">
            <div className="min-w-0">
              <header
                id="article-top"
                className="scroll-mt-28 space-y-6 md:text-left"
              >
                <Badge
                  variant="outline"
                  className="border-primary/20 bg-primary/5 text-primary"
                >
                  {post.categories?.[0]?.title || "Blog"}
                </Badge>
                <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-[3.25rem]">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 shrink-0" />
                    <span className="font-medium text-foreground">
                      {post.author?.name || "VerlyAI"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 shrink-0" />
                    <span className="font-medium text-foreground">
                      {formatBlogDate(post.date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 shrink-0" />
                    <span>{post.estReadingTime ?? 5} min read</span>
                  </div>
                </div>
              </header>

              <div className="relative mb-14 mt-10 aspect-video overflow-hidden rounded-2xl border border-border/50 bg-muted shadow-[0_20px_50px_-20px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]">
                {image ? (
                  <Image
                    src={image.src}
                    alt={post.mainImage?.alt || post.title}
                    fill
                    priority
                    sizes="(max-width: 1280px) 100vw, 900px"
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-pink-500/15 via-background to-orange-500/15" />
                )}
              </div>

              <div className="prose prose-neutral max-w-2xl dark:prose-invert prose-lg prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground">
                <SanityPortableText
                  value={post.body as Array<Record<string, unknown>> | undefined}
                  tocAnchors={tocAnchors}
                />
              </div>
            </div>

            <BlogPostSidebar tocItems={tocItems} />
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
