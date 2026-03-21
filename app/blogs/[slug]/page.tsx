import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";
import { Badge } from "@/components/ui/badge";
import { getAllPostsSlugs, getPostBySlug } from "@/lib/sanity/client";
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const image = urlForImage(post?.mainImage);

  if (!post) {
    notFound();
  }

  return (
    <main className="relative flex min-h-screen flex-col bg-background">
      <Navbar />

      <article className="flex-1 pb-16 pt-20">
        <div className="mx-auto mb-12 max-w-4xl px-6">
          <div className="mb-8">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all posts
            </Link>
          </div>

          <div className="space-y-6 text-center md:text-left">
            <Badge
              variant="outline"
              className="border-primary/20 bg-primary/5 text-primary"
            >
              {post.categories?.[0]?.title || "Blog"}
            </Badge>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 border-t border-border pt-4 text-sm text-muted-foreground md:justify-start">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="font-medium text-foreground">
                  {post.author?.name || "VerlyAI"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="font-medium text-foreground">
                  {formatBlogDate(post.date)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.estReadingTime ?? 5} min read</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mb-16 max-w-5xl px-6">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-border/50 bg-muted shadow-xl">
            {image ? (
              <Image
                src={image.src}
                alt={post.mainImage?.alt || post.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 960px"
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-primary/20 via-background to-primary/10" />
            )}
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-6">
          <div className="prose prose-neutral max-w-none dark:prose-invert prose-lg prose-a:text-primary">
            <SanityPortableText
              value={post.body as Array<Record<string, unknown>> | undefined}
            />
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
