"use client";

import React from "react";
import Link from "next/link";
import { Heart, MessageSquare } from "lucide-react";
import { ProductLaunchData } from "@/types/promote";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
    product: ProductLaunchData;
}

export function ProductCard({ product }: ProductCardProps) {
    const [liked, setLiked] = React.useState(false);
    const [likesCount, setLikesCount] = React.useState(product.likesCount || 0);

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (liked) {
            setLikesCount((prev) => prev - 1);
        } else {
            setLikesCount((prev) => prev + 1);
        }
        setLiked(!liked);
    };

    return (
        <Link href={`/promote/${product.id}`} className="block group">
            <div className="bg-card hover:bg-accent/50 border rounded-xl p-4 transition-all duration-200 flex items-start gap-4 h-full">
                {/* Logo */}
                <div className="shrink-0">
                    <div className="w-16 h-16 rounded-lg overflow-hidden border bg-background flex items-center justify-center">
                        <img
                            src={product.logoUrl}
                            alt={`${product.name} logo`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                        <div>
                            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors truncate">
                                {product.name}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                                {product.tagline}
                            </p>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                        {(product.tags || []).slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                    <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                            "flex flex-col items-center justify-center h-auto py-2 px-3 gap-1 min-w-[60px]",
                            liked && "border-primary text-primary bg-primary/5"
                        )}
                        onClick={handleLike}
                    >
                        <Heart className={cn("w-4 h-4", liked && "fill-current")} />
                        <span className="text-xs font-medium">{likesCount}</span>
                    </Button>

                    <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
                        <MessageSquare className="w-3 h-3" />
                        <span>{(product.comments || []).length}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
