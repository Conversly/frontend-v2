"use client";

import React from "react";
import { getMyProducts } from "@/lib/api/promote";
import { ProductLaunchData } from "@/types/promote";
import { Button } from "@/components/ui/button";
import { Plus, ExternalLink, Edit } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared";

export default function PromoteManagerPage() {
    const params = useParams();
    const workspaceId = params.workspaceId as string;
    const [products, setProducts] = React.useState<ProductLaunchData[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getMyProducts();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-6 py-8 max-w-[1200px]">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Promote Manager</h1>
                    <p className="text-muted-foreground mt-1">Manage your product launch pages.</p>
                </div>
                {products.length > 0 && (
                    <Link href={`/${workspaceId}/promote-manager/create`}>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" /> Create New
                        </Button>
                    </Link>
                )}
            </div>

            {products.length === 0 ? (
                <EmptyState
                    title="No products yet"
                    description="Create your first product launch page to showcase your AI agent to the world."
                    icon={<Plus />}
                    primaryAction={{
                        label: "Create your first launch page",
                        href: `/${workspaceId}/promote-manager/create`,
                        icon: <Plus />,
                    }}
                    className="min-h-[400px] border-dashed"
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="aspect-video bg-muted relative">
                                {product.media && product.media.length > 0 ? (
                                    <img
                                        src={product.media[0].url}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-secondary/50">
                                        <span className="text-muted-foreground">No image</span>
                                    </div>
                                )}
                                <div className="absolute top-2 right-2">
                                    <Badge variant={product.announcement?.enabled ? "default" : "secondary"}>
                                        {product.announcement?.enabled ? "Active" : "Draft"}
                                    </Badge>
                                </div>
                            </div>
                            <CardHeader>
                                <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                                <CardDescription className="line-clamp-2">{product.tagline}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-2">
                                    <Link href={`/${workspaceId}/promote-manager/${product.id}`} className="flex-1">
                                        <Button variant="outline" className="w-full">
                                            <Edit className="w-4 h-4 mr-2" /> Edit
                                        </Button>
                                    </Link>
                                    <Link href={`/${workspaceId}/promote/${product.id}`} className="flex-1">
                                        <Button variant="secondary" className="w-full">
                                            <ExternalLink className="w-4 h-4 mr-2" /> View
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
