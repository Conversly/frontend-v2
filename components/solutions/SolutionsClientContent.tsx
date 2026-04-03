"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { type SolutionDetail, categories, solutions } from "@/lib/solutions-data";

const CARD_ACCENTS: Record<
  string,
  {
    border: string;
    hoverBorder: string;
    hoverShadow: string;
    iconBg: string;
    iconText: string;
  }
> = {
  Commerce: {
    border: "border-[#dce6ff]",
    hoverBorder: "hover:border-[#bdd1ff]",
    hoverShadow: "hover:shadow-[0_24px_56px_rgba(49,94,234,0.10)]",
    iconBg: "bg-[#eaf0ff]",
    iconText: "text-[#315EEA]",
  },
  Support: {
    border: "border-[#e5e1ff]",
    hoverBorder: "hover:border-[#cdc7ff]",
    hoverShadow: "hover:shadow-[0_24px_56px_rgba(91,91,214,0.10)]",
    iconBg: "bg-[#f2efff]",
    iconText: "text-[#5b5bd6]",
  },
  Voice: {
    border: "border-[#f4dfdb]",
    hoverBorder: "hover:border-[#efcbc4]",
    hoverShadow: "hover:shadow-[0_24px_56px_rgba(220,91,91,0.10)]",
    iconBg: "bg-[#fdeeed]",
    iconText: "text-[#d55d55]",
  },
  Sales: {
    border: "border-[#d8f0ee]",
    hoverBorder: "hover:border-[#b8e2de]",
    hoverShadow: "hover:shadow-[0_24px_56px_rgba(15,139,141,0.10)]",
    iconBg: "bg-[#e7fbfa]",
    iconText: "text-[#0f8b8d]",
  },
  Internal: {
    border: "border-[#dde4ec]",
    hoverBorder: "hover:border-[#c9d4df]",
    hoverShadow: "hover:shadow-[0_24px_56px_rgba(100,116,139,0.10)]",
    iconBg: "bg-[#edf1f6]",
    iconText: "text-[#64748b]",
  },
};

function SolutionCard({ solution }: { solution: SolutionDetail }) {
  const accent = CARD_ACCENTS[solution.category] ?? CARD_ACCENTS.Support;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
    >
      <Link
        href={`/solutions/${solution.slug}`}
        className={`group flex h-full flex-col overflow-hidden rounded-[28px] border bg-white shadow-[0_12px_30px_rgba(40,34,26,0.05)] transition-all duration-300 ${accent.border} ${accent.hoverBorder} ${accent.hoverShadow}`}
      >
        <div className="relative aspect-[1.72/1] overflow-hidden border-b border-[#ece6dc] bg-[linear-gradient(180deg,#fffdfa_0%,#f7f4ee_100%)]">
          <Image
            src={solution.heroImage}
            alt={solution.heroImageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_25%,rgba(18,24,39,0.08)_100%)]" />
          <div className="absolute left-5 top-5 inline-flex rounded-full border border-white/80 bg-white/92 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#766f62] shadow-sm">
            {solution.heroPanelLabel}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 md:p-6">
          <div className="flex items-center gap-3.5">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accent.iconBg} ${accent.iconText} transition-transform duration-300 group-hover:scale-110`}
            >
              <solution.icon className="h-5 w-5" />
            </div>
            <div>
              <span className={`text-[11px] font-bold uppercase tracking-[0.14em] ${accent.iconText}`}>
                {solution.category}
              </span>
              <h3 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[17px] tracking-[-0.02em] text-[#221f1b]">
                {solution.title}
              </h3>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {solution.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#e7e0d5] bg-[#fbf8f3] px-3 py-1 text-[11px] font-medium text-[#6b6358]"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-3 text-[13px] leading-6 text-[#6d665d]">{solution.description}</p>

          <ul className="mt-4 space-y-2">
            {solution.heroSummary.slice(0, 1).map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[12px] leading-5 text-[#6d665d]">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-5">
            <span className={`inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors ${accent.iconText}`}>
              Explore solution
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

const CATEGORY_COLORS: Record<string, { active: string; inactive: string }> = {
  All: {
    active: "bg-[#221f1b] text-white shadow-[0_6px_16px_rgba(34,31,27,0.18)]",
    inactive: "border border-[#ddd7ca] bg-white text-[#6d665d]",
  },
  Support: {
    active: "bg-[#5b5bd6] text-white shadow-[0_6px_16px_rgba(91,91,214,0.24)]",
    inactive: "border border-[#e5e1ff] bg-[#f7f6ff] text-[#5b5bd6]",
  },
  Voice: {
    active: "bg-[#d55d55] text-white shadow-[0_6px_16px_rgba(213,93,85,0.24)]",
    inactive: "border border-[#f4dfdb] bg-[#fff6f5] text-[#d55d55]",
  },
  Commerce: {
    active: "bg-[#315EEA] text-white shadow-[0_6px_16px_rgba(49,94,234,0.24)]",
    inactive: "border border-[#dce6ff] bg-[#f5f8ff] text-[#315EEA]",
  },
  Internal: {
    active: "bg-[#64748b] text-white shadow-[0_6px_16px_rgba(100,116,139,0.24)]",
    inactive: "border border-[#dde4ec] bg-[#f7f9fb] text-[#64748b]",
  },
  Sales: {
    active: "bg-[#0f8b8d] text-white shadow-[0_6px_16px_rgba(15,139,141,0.24)]",
    inactive: "border border-[#d8f0ee] bg-[#f2fcfb] text-[#0f8b8d]",
  },
};

function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}) {
  return (
    <div className="mx-auto flex max-w-[1360px] flex-wrap justify-center gap-2 px-5 pb-12 md:px-8">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        const colors = CATEGORY_COLORS[cat] ?? CATEGORY_COLORS.All;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onCategoryChange(cat)}
            className={`rounded-full px-5 py-2 text-[13px] font-semibold transition-all duration-200 ${
              isActive ? colors.active : `${colors.inactive} hover:border-opacity-100`
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

export function SolutionsClientContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const filterParam = searchParams.get("filter")?.toLowerCase();
    const industryParam = searchParams.get("industry")?.toLowerCase();

    if (filterParam) {
      const match = categories.find((c) => c.toLowerCase() === filterParam);
      if (match) setActiveCategory(match);
    } else if (industryParam) {
      if (industryParam === "healthcare") setActiveCategory("Voice");
      else if (industryParam === "retail") setActiveCategory("Commerce");
      else if (industryParam === "bfsi") setActiveCategory("Sales");
    }
  }, [searchParams]);

  const filteredSolutions = solutions.filter(
    (s) => activeCategory === "All" || s.category === activeCategory,
  );

  return (
    <>
      <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <section className="px-5 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto max-w-[1360px]">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredSolutions.map((solution) => (
                <SolutionCard key={solution.slug} solution={solution} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}
