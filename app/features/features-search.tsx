"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, X, Sparkles, Layers3 } from "lucide-react";

type SearchFeature = {
  title: string;
  slug: string;
  shortDescription: string;
};

type SearchCategory = {
  name: string;
  slug: string;
  summary: string;
  features: SearchFeature[];
};

type SearchResult =
  | {
      type: "category";
      key: string;
      title: string;
      description: string;
      href: string;
      meta: string;
    }
  | {
      type: "feature";
      key: string;
      title: string;
      description: string;
      href: string;
      meta: string;
    };

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function getScore(query: string, title: string, description: string, meta: string) {
  const normalizedTitle = normalize(title);
  const normalizedDescription = normalize(description);
  const normalizedMeta = normalize(meta);

  if (normalizedTitle === query) return 100;
  if (normalizedTitle.startsWith(query)) return 90;
  if (normalizedTitle.includes(query)) return 80;
  if (normalizedMeta.includes(query)) return 60;
  if (normalizedDescription.includes(query)) return 40;
  return 0;
}

export default function FeaturesSearch({
  categories,
}: {
  categories: SearchCategory[];
}) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results = useMemo(() => {
    const trimmedQuery = normalize(query);

    if (!trimmedQuery) {
      return [];
    }

    const allResults: Array<SearchResult & { score: number }> = [];

    categories.forEach((category) => {
      const categoryScore = getScore(
        trimmedQuery,
        category.name,
        category.summary,
        `${category.features.length} features`
      );

      if (categoryScore > 0) {
        allResults.push({
          type: "category",
          key: `category-${category.slug}`,
          title: category.name,
          description: category.summary,
          href: `/features#${category.slug}`,
          meta: `${category.features.length} features`,
          score: categoryScore,
        });
      }

      category.features.forEach((feature) => {
        const featureScore = getScore(
          trimmedQuery,
          feature.title,
          feature.shortDescription,
          category.name
        );

        if (featureScore > 0) {
          allResults.push({
            type: "feature",
            key: `feature-${feature.slug}`,
            title: feature.title,
            description: feature.shortDescription,
            href: `/features/${feature.slug}`,
            meta: category.name,
            score: featureScore,
          });
        }
      });
    });

    return allResults.sort((a, b) => b.score - a.score).slice(0, 8);
  }, [categories, query]);

  const showResults = isFocused && query.trim().length > 0;

  return (
    <div ref={wrapperRef} className="relative mt-10 w-full max-w-[760px]">
      <div className="rounded-[24px] border border-[#dcdfea] bg-white/90 p-3 shadow-[0_18px_50px_rgba(42,59,81,0.08)] backdrop-blur-sm">
        <div className="flex items-center gap-3 rounded-[18px] border border-[#dcdfea] bg-white px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition-all focus-within:border-[#ffb082] focus-within:ring-4 focus-within:ring-[#ff6f3e1f]">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1972f514] text-[#1972f5]">
            <Search className="h-5 w-5" />
          </div>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search features, categories, or capabilities"
            className="h-10 flex-1 border-0 bg-transparent text-[18px] text-[#242f47] outline-none placeholder:text-[#7d89b0]"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#98a2b3] transition-colors hover:bg-[#f5f7fb] hover:text-[#404968]"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      {showResults ? (
        <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-30 overflow-hidden rounded-[24px] border border-[#dcdfea] bg-white/95 p-3 shadow-[0_24px_80px_rgba(42,59,81,0.12)] backdrop-blur-md">
          {results.length > 0 ? (
            <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
              {results.map((result) => (
                <Link
                  key={result.key}
                  href={result.href}
                  onClick={() => setIsFocused(false)}
                  className="block rounded-[18px] border border-[#eaecf5] bg-white px-4 py-4 transition-all hover:border-[#cbdbf4] hover:bg-[#fcfcfd]"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                        result.type === "category"
                          ? "bg-[#ff6f3e14] text-[#ff6f3e]"
                          : "bg-[#1972f514] text-[#1972f5]"
                      }`}
                    >
                      {result.type === "category" ? (
                        <Layers3 className="h-5 w-5" />
                      ) : (
                        <Sparkles className="h-5 w-5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-md px-2 py-0.5 text-[12px] font-semibold ${
                            result.type === "category"
                              ? "bg-[#ff6f3e14] text-[#ff6f3e]"
                              : "bg-[#1972f514] text-[#1972f5]"
                          }`}
                        >
                          {result.type === "category" ? "Category" : "Feature"}
                        </span>
                        <span className="text-[12px] font-medium text-[#7d89b0]">
                          {result.meta}
                        </span>
                      </div>
                      <h3 className="mt-2 text-[18px] font-semibold leading-6 text-[#242f47]">
                        {result.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-[14px] leading-6 text-[#667085]">
                        {result.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-[18px] border border-[#eaecf5] bg-[#fcfcfd] px-5 py-8 text-center">
              <p className="text-[16px] font-semibold text-[#242f47]">
                No matching features found
              </p>
              <p className="mt-2 text-[14px] leading-6 text-[#667085]">
                Try searching by category name, feature title, or a capability keyword.
              </p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
