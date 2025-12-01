"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, Twitter, Github, Linkedin, Globe, MessageCircle, Youtube } from "lucide-react";
import { ProductLaunchData } from "@/types/promote";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { upvoteProduct } from "@/lib/api/promote";
import { toast } from "sonner";

interface ProductLaunchCardProps {
    product: ProductLaunchData;
}

export function ProductLaunchCard({ product }: ProductLaunchCardProps) {
    const [liked, setLiked] = React.useState(false);
    const [likesCount, setLikesCount] = React.useState(product.likesCount);

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

    const { socialLinks } = product;

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
        <div className="bg-card border rounded-xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Launching Today</span>
                <Badge variant="outline" className="font-mono">#1</Badge>
            </div>

            <Button
                size="lg"
                className={cn(
                    "w-full h-14 text-lg font-bold shadow-md transition-all hover:scale-[1.02]",
                    liked
                        ? "bg-white border-2 border-red-500 text-red-500 hover:bg-red-50"
                        : "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-transparent"
                )}
                onClick={handleLike}
            >
                <Heart className={cn("mr-2 w-6 h-6", liked && "fill-current text-red-500")} strokeWidth={3} />
                {liked ? "Loved by" : "Love this"}
                <span className="ml-2 opacity-90">{likesCount}</span>
            </Button>

            <div className="pt-2 border-t">
                <h4 className="text-sm font-semibold mb-3">Social</h4>
                <SocialIcons />
            </div>
        </div>
    );
}
