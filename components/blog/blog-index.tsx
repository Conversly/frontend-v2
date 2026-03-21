"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface BlogListItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
  category: string;
  categories: string[];
  image?: {
    src: string;
    width: number;
    height: number;
  };
}

interface BlogIndexProps {
  posts: BlogListItem[];
}

function matchesSearch(post: BlogListItem, query: string) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return true;
  }

  return [post.title, post.excerpt].some(
    (value) => typeof value === "string" && value.toLowerCase().includes(normalized),
  );
}

export function BlogIndex({ posts }: BlogIndexProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const categories = useMemo(
    () => ["All", ...new Set(posts.flatMap((post) => post.categories))],
    [posts],
  );

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const categoryMatches =
        activeCategory === "All" || post.categories.includes(activeCategory);

      return categoryMatches && matchesSearch(post, query);
    });
  }, [activeCategory, posts, query]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/40 pb-5">
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((category) => {
            const isActive = category === activeCategory;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:max-w-[260px] sm:shrink-0">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles..."
            className="h-9 w-full rounded-full border-border/40 bg-muted/30 pl-9 pr-4 text-sm shadow-none focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:border-primary/50"
          />
        </div>
      </div>

      {filteredPosts.length ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Link key={post.id} href={`/blogs/${post.slug}`} className="group flex h-full flex-col outline-none relative">
              <div className="absolute -inset-[1px] rounded-[24px] bg-gradient-to-b from-border/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-border/80" />
              <Card className="relative flex h-full flex-col overflow-hidden rounded-[23px] border-none bg-transparent shadow-none transition-all duration-500 group-hover:-translate-y-1 group-focus-visible:-translate-y-1 outline-none">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/30">
                  {post.image ? (
                    <Image
                      src={post.image.src}
                      alt={post.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-primary/10 via-background to-primary/5" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-40" />
                  
                  <div className="absolute left-4 top-4 z-10 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                    <Badge className="border-none bg-background/90 text-foreground backdrop-blur-md shadow-sm hover:bg-background/90 text-[10px] sm:text-xs">
                      {post.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="flex-none space-y-4 px-6 pt-6 pb-2">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-muted-foreground/80">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2 text-xl font-bold leading-tight tracking-tight transition-colors duration-300 group-hover:text-primary">
                    {post.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col justify-between px-6 pb-6 pt-2 h-full gap-6">
                  <CardDescription className="line-clamp-3 text-sm leading-relaxed text-muted-foreground/90">
                    {post.excerpt}
                  </CardDescription>
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <span className="relative overflow-hidden pb-1">
                      Read Article
                      <span className="absolute bottom-0 left-0 h-[2px] w-full -translate-x-full bg-primary transition-transform duration-300 ease-out group-hover:translate-x-0" />
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-border/70 bg-card/40 px-8 py-16 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            No matching articles
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Try a different category or search term to discover more blog posts.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory("All");
              setQuery("");
            }}
            className="mt-6 rounded-full border border-border/60 px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
