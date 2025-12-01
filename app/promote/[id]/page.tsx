import React from "react";
import { notFound } from "next/navigation";
import { ProductHero } from "@/components/promote/ProductHero";
import { ProductMediaCarousel } from "@/components/promote/ProductMediaCarousel";
import { ProductTeamSection } from "@/components/promote/ProductTeamSection";
import { ProductComments } from "@/components/promote/ProductComments";
import { ProductChatbot } from "@/components/promote/ProductChatbot";
import { ProductLaunchCard } from "@/components/promote/ProductLaunchCard";
import { ProductLaunchData } from "@/types/promote";
import { getProduct } from "@/lib/api/promote";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { id } = await params;

    let product: ProductLaunchData | null = null;
    try {
        product = await getProduct(id);
    } catch (error) {
        console.error(error);
        notFound();
    }

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="container max-w-6xl mx-auto py-8 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
                    {/* Main Content */}
                    <div className="space-y-10">
                        <ProductHero product={product} />
                        <ProductMediaCarousel media={product.media || []} />

                        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                            <p>{product.description}</p>

                            {/* Display Key Features if they exist */}
                            {product.keyFeatures && product.keyFeatures.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {product.keyFeatures.map((feature, idx) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <ProductComments comments={product.comments || []} productId={product.id} />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <ProductLaunchCard product={product} />
                        <ProductTeamSection team={product.team || []} />
                    </div>
                </div>
            </div>
            {product.chatbotId && <ProductChatbot chatbotId={product.chatbotId} />}
        </div>
    );
}
