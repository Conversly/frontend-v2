import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogPostSidebar } from "@/components/blog/blog-post-sidebar";
import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";
import { Badge } from "@/components/ui/badge";
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

  return {
    title: `${post.title} | VerlyAI Blog`,
    description,
    openGraph: {
      title: `${post.title} | VerlyAI Blog`,
      description,
      url: `https://verlyai.xyz/blogs/${slug}`,
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

  return (
    <main className="relative flex min-h-screen flex-col bg-background">
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
