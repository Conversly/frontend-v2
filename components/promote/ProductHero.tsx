"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, ExternalLink, ArrowUp, Github, Twitter, Globe, Youtube, MessageCircle, ChevronUp } from "lucide-react";
import { ProductLaunchData } from "@/types/promote";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { upvoteProduct } from "@/lib/api/promote";
import { toast } from "sonner";

interface ProductHeroProps {
    product: ProductLaunchData;
}

export function ProductHero({ product }: ProductHeroProps) {
    const [liked, setLiked] = React.useState(false);
    const [likesCount, setLikesCount] = React.useState(product.likesCount);

    // ... inside component
    const handleLike = async () => {
        try {
            const { likesCount: newCount } = await upvoteProduct(product.id);
            setLikesCount(newCount);
            setLiked(true);
        } catch (error) {
            console.error(error);
            toast.error("Failed to upvote");
        }
    };

    const { name, tagline, logoUrl, tags, websiteUrl, theme, socialLinks } = product;
    const { primaryColor } = theme || {};

    const SocialIcons = () => (
        <div className="flex items-center gap-3">
            {socialLinks?.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Twitter className="w-5 h-5" />
                </a>
            )}
            {socialLinks?.github && (
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Github className="w-5 h-5" />
                </a>
            )}
            {socialLinks?.discord && (
                <a href={socialLinks.discord} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <MessageCircle className="w-5 h-5" />
                </a>
            )}
            {socialLinks?.youtube && (
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Youtube className="w-5 h-5" />
                </a>
            )}
            {socialLinks?.website && (
                <a href={socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Globe className="w-5 h-5" />
                </a>
            )}
        </div>
    );

    return (
        <div className="flex flex-col gap-6 mb-8">
            <div className="flex items-start gap-6">
                <img
                    src={logoUrl}
                    alt={`${name} logo`}
                    className="w-24 h-24 rounded-2xl shadow-lg border border-border/50"
                />
                <div className="flex-1 space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">{name}</h1>
                    <p className="text-xl text-muted-foreground font-light leading-relaxed">
                        {tagline}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                        {(tags || []).map((tag) => (
                            <Badge key={tag} variant="secondary" className="px-2.5 py-0.5 text-xs font-medium bg-secondary/50 hover:bg-secondary transition-colors">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button
                    size="lg"
                    className="font-semibold text-base h-12 px-8 shadow-sm hover:shadow-md transition-all"
                    style={{ backgroundColor: primaryColor }}
                    onClick={() => window.open(websiteUrl, '_blank')}
                >
                    Visit Website <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
