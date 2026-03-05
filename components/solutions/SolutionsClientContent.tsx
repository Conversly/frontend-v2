'use client';

import { motion, AnimatePresence } from "framer-motion";
import AutoAwesome from "@mui/icons-material/AutoAwesome";
import CheckCircle from "@mui/icons-material/CheckCircle";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Testimonial from "@/components/landing/testimonial";
import { Solution, solutions, categories } from "@/lib/solutions-data";

const CONTENT_WIDTH = "w-[95%] md:w-[85%] lg:w-[80%] max-w-[1200px] mx-auto";

function SolutionCard({ solution }: { solution: Solution }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-border p-8 rounded-3xl hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
                <solution.icon sx={{ fontSize: 128 }} className="-mr-16 -mt-16 rotate-12" />
            </div>

            <div className={`w-14 h-14 rounded-2xl ${solution.bg} flex items-center justify-center ${solution.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <solution.icon sx={{ fontSize: 28 }} />
            </div>

            <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-muted-foreground uppercase tracking-wide border border-border/50">
                    {solution.category}
                </span>
            </div>

            <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                {solution.title}
            </h3>

            <p className="type-body-muted leading-relaxed mb-8">
                {solution.description}
            </p>

            <div className="mt-auto space-y-6">
                <ul className="space-y-3">
                    {solution.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 type-body-muted">
                            <div className={`mt-1 rounded-full p-0.5 ${solution.bg}`}>
                                <CheckCircle sx={{ fontSize: 12 }} className={solution.color} />
                            </div>
                            {feature}
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-3 pt-2">
                    <Link href="/login" className="flex-1">
                        <Button className="w-full rounded-xl bg-white dark:bg-slate-800 text-foreground border border-border hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm font-semibold group/btn">
                            Get Started
                            <ArrowForward sx={{ fontSize: 16 }} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                    <Link href="/docs">
                        <Button variant="ghost" size="icon" className="rounded-xl border border-transparent hover:border-border hover:bg-white/50 dark:hover:bg-slate-800/50">
                            <AutoAwesome sx={{ fontSize: 16 }} className="text-muted-foreground" />
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

export function SolutionsHero() {
    return (
        <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 text-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
                <AutoAwesome sx={{ fontSize: 16 }} />
                <span>Infinite Possibilities</span>
            </motion.div>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-foreground"
            >
                AI That Works for <br />
                <span className="text-primary">Your Industry</span>
            </motion.h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                From e-commerce stores handling 1,000+ daily inquiries to healthcare providers scheduling appointments — see how businesses like yours automate support and save thousands monthly.
            </p>
        </section>
    );
}

export function SolutionsGrid({ activeCategory }: { activeCategory: string }) {
    const filteredSolutions = solutions.filter(solution =>
        activeCategory === "All" || solution.category === activeCategory
    );

    return (
        <section className="pb-20 lg:pb-32 px-4">
            <div className={CONTENT_WIDTH}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredSolutions.map((solution) => (
                            <SolutionCard key={solution.title} solution={solution} />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

interface CategoryFilterProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
    return (
        <section className="pb-12">
            <div className="flex flex-wrap justify-center gap-2 px-4">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => onCategoryChange(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                            ? "bg-primary text-white shadow-lg shadow-primary/25 scale-105"
                            : "bg-white/50 dark:bg-slate-800/50 border border-border text-muted-foreground hover:bg-white hover:border-primary/30"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </section>
    );
}

export function TestimonialSection() {
    return (
        <section className="pb-20 lg:pb-32 px-4">
            <div className={CONTENT_WIDTH}>
                <Testimonial />
            </div>
        </section>
    );
}

export function SolutionsClientContent() {
    const searchParams = useSearchParams();
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        const filterParam = searchParams.get('filter')?.toLowerCase();
        const industryParam = searchParams.get('industry')?.toLowerCase();

        if (filterParam) {
            if (filterParam === 'support') setActiveCategory('Support');
            else if (filterParam === 'internal') setActiveCategory('Internal');
            else if (filterParam === 'commerce') setActiveCategory('Commerce');
        } else if (industryParam) {
            if (industryParam === 'healthcare') setActiveCategory('Voice');
            else if (industryParam === 'retail') setActiveCategory('Commerce');
            else if (industryParam === 'bfsi') setActiveCategory('Sales');
        }
    }, [searchParams]);

    return (
        <>
            <SolutionsHero />
            <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
            <SolutionsGrid activeCategory={activeCategory} />
            <TestimonialSection />
        </>
    );
}
