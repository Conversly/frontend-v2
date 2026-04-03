"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { type SolutionDetail, solutions, categories } from "@/lib/solutions-data";

const CARD_ACCENTS: Record<string, { border: string; hoverBorder: string; hoverShadow: string; iconBg: string; iconText: string }> = {
  Commerce: {
    border: "border-blue-100/70",
    hoverBorder: "hover:border-blue-200",
    hoverShadow: "hover:shadow-[0_20px_50px_rgba(37,99,235,0.08)]",
    iconBg: "bg-blue-50",
    iconText: "text-blue-600",
  },
  Support: {
    border: "border-purple-100/70",
    hoverBorder: "hover:border-purple-200",
    hoverShadow: "hover:shadow-[0_20px_50px_rgba(139,92,246,0.08)]",
    iconBg: "bg-purple-50",
    iconText: "text-purple-600",
  },
  Voice: {
    border: "border-red-100/70",
    hoverBorder: "hover:border-red-200",
    hoverShadow: "hover:shadow-[0_20px_50px_rgba(239,68,68,0.06)]",
    iconBg: "bg-red-50",
    iconText: "text-red-500",
  },
  Sales: {
    border: "border-teal-100/70",
    hoverBorder: "hover:border-teal-200",
    hoverShadow: "hover:shadow-[0_20px_50px_rgba(20,184,166,0.08)]",
    iconBg: "bg-teal-50",
    iconText: "text-teal-600",
  },
  Internal: {
    border: "border-slate-200/70",
    hoverBorder: "hover:border-slate-300",
    hoverShadow: "hover:shadow-[0_20px_50px_rgba(100,116,139,0.08)]",
    iconBg: "bg-slate-100",
    iconText: "text-slate-600",
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
        className={`group flex h-full flex-col overflow-hidden rounded-[24px] border bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 md:p-7 ${accent.border} ${accent.hoverBorder} ${accent.hoverShadow}`}
      >
        <div className="flex items-center gap-3.5">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${accent.iconBg} ${accent.iconText} transition-transform duration-300 group-hover:scale-110`}
          >
            <solution.icon className="h-6 w-6" />
          </div>
          <div>
            <span className={`text-[11px] font-bold uppercase tracking-[0.14em] ${accent.iconText}`}>
              {solution.category}
            </span>
            <h3 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[18px] tracking-[-0.02em] text-[#221f1b]">
              {solution.title}
            </h3>
          </div>
        </div>

        <p className="mt-4 text-[14px] leading-7 text-[#6d665d]">
          {solution.description}
        </p>

        <ul className="mt-5 space-y-2.5">
          {solution.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-[13px] leading-6 text-[#6d665d]">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          <span className={`inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors ${accent.iconText}`}>
            Explore solution
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

const CATEGORY_COLORS: Record<string, { active: string; inactive: string }> = {
  All: { active: "bg-[#221f1b] text-white shadow-[0_4px_12px_rgba(34,31,27,0.2)]", inactive: "border border-[#ddd7ca] bg-white text-[#6d665d]" },
  Support: { active: "bg-purple-600 text-white shadow-[0_4px_12px_rgba(139,92,246,0.3)]", inactive: "border border-purple-100 bg-purple-50/50 text-purple-600" },
  Voice: { active: "bg-red-500 text-white shadow-[0_4px_12px_rgba(239,68,68,0.3)]", inactive: "border border-red-100 bg-red-50/50 text-red-500" },
  Commerce: { active: "bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)]", inactive: "border border-blue-100 bg-blue-50/50 text-blue-600" },
  Internal: { active: "bg-slate-600 text-white shadow-[0_4px_12px_rgba(100,116,139,0.3)]", inactive: "border border-slate-200 bg-slate-50/50 text-slate-600" },
  Sales: { active: "bg-teal-600 text-white shadow-[0_4px_12px_rgba(20,184,166,0.3)]", inactive: "border border-teal-100 bg-teal-50/50 text-teal-600" },
};

function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-5 pb-12 md:px-8">
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
