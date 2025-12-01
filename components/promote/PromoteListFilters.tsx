"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PromoteListFiltersProps {
    activeTimeFilter: string;
    onTimeFilterChange: (filter: string) => void;
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

const TIME_FILTERS = ["Daily", "Weekly", "Monthly", "Yearly"];
const CATEGORIES = ["All", "SaaS", "AI", "Productivity", "DevTools", "Design", "Marketing"];

export function PromoteListFilters({
    activeTimeFilter,
    onTimeFilterChange,
    activeCategory,
    onCategoryChange,
}: PromoteListFiltersProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            {/* Time Filters */}
            <div className="flex items-center p-1 bg-muted/50 rounded-lg w-fit">
                {TIME_FILTERS.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => onTimeFilterChange(filter)}
                        className={cn(
                            "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                            activeTimeFilter === filter
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                        )}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                {CATEGORIES.map((category) => (
                    <Button
                        key={category}
                        variant={activeCategory === category ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => onCategoryChange(category)}
                        className={cn(
                            "whitespace-nowrap",
                            activeCategory === category && "bg-primary/10 text-primary hover:bg-primary/20"
                        )}
                    >
                        {category}
                    </Button>
                ))}
            </div>
        </div>
    );
}
