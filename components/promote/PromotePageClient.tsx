"use client";

import React, { useState, useMemo } from "react";
import { PromoteListFilters } from "@/components/promote/PromoteListFilters";
import { ProductCard } from "@/components/promote/ProductCard";
import { ProductLaunchData } from "@/types/promote";

interface PromotePageClientProps {
  products: ProductLaunchData[];
}

export default function PromotePageClient({ products }: PromotePageClientProps) {
  const [activeTimeFilter, setActiveTimeFilter] = useState("Daily");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (activeCategory !== "All") {
      filtered = filtered.filter((p) => (p.tags || []).includes(activeCategory));
    }

    // Filter out drafts (isPublished === false)
    // If isPublished is undefined, we assume it's published (legacy data)
    filtered = filtered.filter((p) => p.isPublished !== false);

    return filtered;
  }, [activeCategory, activeTimeFilter, products]);

  return (
    <>
      <PromoteListFilters
        activeTimeFilter={activeTimeFilter}
        onTimeFilterChange={setActiveTimeFilter}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            Best of Today
            <span className="text-sm font-normal text-muted-foreground ml-auto">
              {new Date().toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </h2>

          <div className="grid gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No products found for this category.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
