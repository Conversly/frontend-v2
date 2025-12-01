"use client";

import React, { useEffect, useState } from "react";
import { PromoteListFilters } from "@/components/promote/PromoteListFilters";
import { ProductCard } from "@/components/promote/ProductCard";
import { ProductLaunchData } from "@/types/promote";
import { getProducts } from "@/lib/api/promote";

export default function PromotePage() {
    const [activeTimeFilter, setActiveTimeFilter] = React.useState("Daily");
    const [activeCategory, setActiveCategory] = React.useState("All");
    const [products, setProducts] = useState<ProductLaunchData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = React.useMemo(() => {
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
        <div className="container max-w-5xl mx-auto py-8 px-4">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold tracking-tight mb-3">
                    Launch Directory
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Discover the best new products in tech, every day.
                </p>
            </div>

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

                    {isLoading ? (
                        <div className="text-center py-12 text-muted-foreground">Loading...</div>
                    ) : (
                        <div className="grid gap-4">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}

                    {!isLoading && filteredProducts.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            No products found for this category.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
