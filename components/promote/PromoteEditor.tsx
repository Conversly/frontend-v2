"use client";

import React from "react";
import { ProductLaunchData, TeamMember, MediaItem, CreateProductLaunchInput } from "@/types/promote";
import { toast } from "sonner";
import { getProduct, createProduct, updateProduct } from "@/lib/api/promote";
import { ProductHero } from "@/components/promote/ProductHero";
import { ProductMediaCarousel } from "@/components/promote/ProductMediaCarousel";
import { ProductTeamSection } from "@/components/promote/ProductTeamSection";
import { ProductComments } from "@/components/promote/ProductComments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Plus, Trash2, Video, Image as ImageIcon, Wand2, Twitter, Linkedin, Github, Globe, Megaphone, Timer, Share2 } from 'lucide-react';
import { FileUpload } from '@/components/ui/file-upload';
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MediaUpload } from '@/components/promote/MediaUpload';
import { AnnouncementBanner } from "@/components/promote/AnnouncementBanner";
import { Switch } from "@/components/ui/switch";
import { useGetChatbots } from "@/services/chatbot";
import { ProductLaunchCard } from "@/components/promote/ProductLaunchCard";
import { useRouter } from "next/navigation";

interface PromoteEditorProps {
    productId?: string;
}

export function PromoteEditor({ productId }: PromoteEditorProps) {
    const router = useRouter();
    const [product, setProduct] = React.useState<ProductLaunchData | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const { data: chatbots } = useGetChatbots();

    React.useEffect(() => {
        const initProduct = async () => {
            try {
                if (productId) {
                    const data = await getProduct(productId);
                    if (data) {
                        setProduct(data);
                    } else {
                        toast.error("Product not found");
                    }
                } else {
                    // Initialize with default data for creation
                    setProduct({
                        id: "", // Temp ID
                        userId: "", // Will be set by backend
                        name: "My New Product",
                        tagline: "Describe your product in one sentence",
                        description: "A detailed description of what your product does.",
                        logoUrl: "https://github.com/shadcn.png",
                        websiteUrl: "https://example.com",
                        tags: [],
                        keyFeatures: [],
                        theme: {
                            primaryColor: "#FF6154",
                            backgroundColor: "#ffffff",
                            textColor: "#000000",
                            fontFamily: "Roboto",
                            layout: "modern",
                            cardStyle: "rounded"
                        },
                        media: [],
                        team: [],
                        comments: [],
                        announcement: { enabled: false, text: "" },
                        countdown: { enabled: false, targetDate: new Date().toISOString() },
                        socialLinks: {},
                        likesCount: 0,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        launchDate: new Date().toISOString(),
                        isPublished: false,
                    });
                }
            } catch (error) {
                console.error("Failed to load product", error);
                toast.error("Failed to load product");
            } finally {
                setIsLoading(false);
            }
        };

        initProduct();
    }, [productId]);

    const handleSave = async () => {
        if (!product) return;
        try {
            if (productId) {
                // Remove read-only fields
                const { id, userId, createdAt, updatedAt, likesCount, comments, ...updateData } = product;
                await updateProduct(product.id, updateData);
                toast.success("Changes saved successfully");
            } else {
                // Create new product
                // Remove read-only fields
                const { id, userId, createdAt, updatedAt, likesCount, comments, ...createData } = product;
                const newProduct = await createProduct(createData);
                toast.success("Product created successfully");
                router.push(`/promote-manager/${newProduct.id}`);
            }
        } catch (error) {
            console.error("Failed to save", error);
            toast.error("Failed to save changes");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!product) return;
        const { name, value } = e.target;
        setProduct((prev) => prev ? ({ ...prev, [name]: value }) : null);
    };

    const handleThemeChange = (key: keyof NonNullable<ProductLaunchData['theme']>, value: string) => {
        if (!product) return;
        setProduct((prev) => {
            if (!prev) return null;
            return {
                ...prev,
                theme: { ...prev.theme, [key]: value },
            };
        });
    };

    const handleAddTeamMember = () => {
        const newMember: TeamMember = {
            id: Math.random().toString(36).substr(2, 9),
            name: "New Member",
            role: "Role",
            avatarUrl: "",
            socials: {},
        };
        setProduct((prev) => {
            if (!prev) return null;
            return {
                ...prev,
                team: [...(prev.team || []), newMember],
            };
        });
    };

    const handleRemoveTeamMember = (id: string) => {
        setProduct((prev) => {
            if (!prev) return null;
            return {
                ...prev,
                team: (prev.team || []).filter((m) => m.id !== id),
            };
        });
    };

    const handleUpdateTeamMember = (id: string, field: keyof TeamMember | 'socials', value: any) => {
        setProduct((prev) => {
            if (!prev) return null;
            return {
                ...prev,
                team: (prev.team || []).map((m) => {
                    if (m.id !== id) return m;
                    if (field === 'socials') {
                        return { ...m, socials: { ...m.socials, ...value } };
                    }
                    return { ...m, [field]: value };
                }),
            };
        });
    };

    const fetchAvatar = (memberId: string, socialUrl: string) => {
        if (!socialUrl) return;
        try {
            const url = new URL(socialUrl);
            const pathParts = url.pathname.split('/').filter(Boolean);
            let username = pathParts[pathParts.length - 1];

            if (url.hostname.includes('linkedin.com') && pathParts.includes('in')) {
                username = pathParts[pathParts.indexOf('in') + 1];
            }

            if (username) {
                let unavatarUrl = `https://unavatar.io/${username}`;

                if (url.hostname.includes('linkedin.com')) {
                    unavatarUrl = `https://unavatar.io/linkedin/${username}`;
                } else if (url.hostname.includes('github.com')) {
                    unavatarUrl = `https://unavatar.io/github/${username}`;
                } else if (url.hostname.includes('twitter.com') || url.hostname.includes('x.com')) {
                    unavatarUrl = `https://unavatar.io/twitter/${username}`;
                }

                handleUpdateTeamMember(memberId, 'avatarUrl', unavatarUrl);
            }
        } catch (e) {
            console.error("Invalid URL", e);
        }
    };

    const handleKeyFeatureChange = (index: number, value: string) => {
        if (!product) return;
        const newFeatures = [...(product.keyFeatures || [])];
        newFeatures[index] = value;
        setProduct((prev) => {
            if (!prev) return null;
            return { ...prev, keyFeatures: newFeatures };
        });
    };

    const handleAddKeyFeature = () => {
        setProduct((prev) => {
            if (!prev) return null;
            return {
                ...prev,
                keyFeatures: [...(prev.keyFeatures || []), ""],
            };
        });
    };

    const handleRemoveKeyFeature = (index: number) => {
        if (!product) return;
        const newFeatures = [...(product.keyFeatures || [])];
        newFeatures.splice(index, 1);
        setProduct((prev) => {
            if (!prev) return null;
            return { ...prev, keyFeatures: newFeatures };
        });
    };

    const handleAddMedia = (type: 'image' | 'video', url: string) => {
        if (!url) return;
        const newItem: MediaItem = {
            id: Date.now().toString(),
            type,
            url,
            thumbnailUrl: type === 'video' ? '' : undefined,
        };
        setProduct((prev) => {
            if (!prev) return null;
            return {
                ...prev,
                media: [...(prev.media || []), newItem],
            };
        });
    };

    const handleRemoveMedia = (id: string) => {
        setProduct((prev) => {
            if (!prev) return null;
            return {
                ...prev,
                media: (prev.media || []).filter((m) => m.id !== id),
            };
        });
    };

    const handleUpdateMedia = (id: string, field: keyof MediaItem, value: any) => {
        setProduct((prev) => {
            if (!prev) return null;
            return {
                ...prev,
                media: (prev.media || []).map((m) => {
                    if (m.id !== id) return m;
                    return { ...m, [field]: value };
                }),
            };
        });
    };

    const handleAddTag = (tag: string) => {
        if (!tag || (product?.tags || []).includes(tag)) return;
        setProduct((prev) => {
            if (!prev) return null;
            return { ...prev, tags: [...(prev.tags || []), tag] };
        });
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setProduct((prev) => {
            if (!prev) return null;
            return { ...prev, tags: (prev.tags || []).filter((tag) => tag !== tagToRemove) };
        });
    };

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (!product) {
        return <div className="flex items-center justify-center min-h-screen">Failed to load product.</div>;
    }

    return (
        <div className="w-full h-full overflow-y-auto">
            <div className="container mx-auto px-6 py-6 max-w-[1920px]">
                <div className="space-y-8 pb-8">
                    <div className="bg-card/60 backdrop-blur-sm border border-border/60 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="font-heading text-2xl text-foreground mb-1">
                                {productId ? 'Edit Product' : 'Create New Product'}
                            </h2>
                            <p className="font-sans text-base text-muted-foreground">
                                Customize your product launch page.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 mr-2">
                                <Label htmlFor="published-mode" className="text-sm font-medium cursor-pointer">
                                    {product.isPublished ? "Published" : "Draft"}
                                </Label>
                                <Switch
                                    id="published-mode"
                                    checked={product.isPublished}
                                    onCheckedChange={(checked) => setProduct(prev => prev ? ({ ...prev, isPublished: checked }) : null)}
                                />
                            </div>
                            <Button onClick={handleSave}>Save Changes</Button>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-[1fr_580px] gap-6 items-start">
                        <div className="space-y-6 min-w-0">
                            <Tabs defaultValue="details" className="space-y-6">
                                <TabsList className="bg-card/60 p-1 rounded-xl flex flex-wrap">
                                    <TabsTrigger value="details" className="font-sans text-base">Details</TabsTrigger>
                                    <TabsTrigger value="media" className="font-sans text-base">Media</TabsTrigger>
                                    <TabsTrigger value="marketing" className="font-sans text-base">Marketing</TabsTrigger>
                                    <TabsTrigger value="team" className="font-sans text-base">Team</TabsTrigger>
                                    <TabsTrigger value="theme" className="font-sans text-base">Theme</TabsTrigger>
                                </TabsList>

                                <TabsContent value="details">
                                    <Card>
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <CardTitle>Product Details</CardTitle>
                                                    <CardDescription>Basic information about your product.</CardDescription>
                                                </div>
                                                <Button onClick={handleSave}>Save Changes</Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="name">Product Name</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    value={product.name}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="tagline">Tagline</Label>
                                                <Input
                                                    id="tagline"
                                                    name="tagline"
                                                    value={product.tagline}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="description">Description</Label>
                                                <Textarea
                                                    id="description"
                                                    name="description"
                                                    value={product.description}
                                                    onChange={handleInputChange}
                                                    rows={5}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="websiteUrl">Website URL</Label>
                                                <Input
                                                    id="websiteUrl"
                                                    name="websiteUrl"
                                                    value={product.websiteUrl}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label>Tags</Label>
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    {(product.tags || []).map((tag) => (
                                                        <Badge key={tag} variant="secondary" className="px-2 py-1 text-sm flex items-center gap-1">
                                                            {tag}
                                                            <button onClick={() => handleRemoveTag(tag)} className="hover:text-destructive">
                                                                <X className="w-3 h-3" />
                                                            </button>
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <div className="flex gap-2 mb-2">
                                                    <Input
                                                        placeholder="Add a tag (e.g. SaaS, AI)"
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                e.preventDefault();
                                                                handleAddTag(e.currentTarget.value);
                                                                e.currentTarget.value = '';
                                                            }
                                                        }}
                                                    />
                                                    <Button
                                                        variant="outline"
                                                        onClick={(e) => {
                                                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                                            handleAddTag(input.value);
                                                            input.value = '';
                                                        }}
                                                    >
                                                        Add
                                                    </Button>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="text-xs text-muted-foreground mr-1 self-center">Suggested:</span>
                                                    {['Productivity', 'SaaS', 'Artificial Intelligence'].map(tag => (
                                                        <Badge
                                                            key={tag}
                                                            variant="outline"
                                                            className="cursor-pointer hover:bg-secondary/50 transition-colors"
                                                            onClick={() => handleAddTag(tag)}
                                                        >
                                                            + {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-2 pt-4 border-t mt-4">
                                                <Label className="text-base font-semibold">Chatbot Integration</Label>
                                                <p className="text-sm text-muted-foreground mb-4">
                                                    Link a chatbot to your product page to answer visitor questions.
                                                </p>
                                                <div className="grid grid-cols-1 gap-4">
                                                    <div className="space-y-2">
                                                        <Label className="text-xs">Select Chatbot</Label>
                                                        <Select
                                                            value={product.chatbotId || 'none'}
                                                            onValueChange={(value) => setProduct(prev => {
                                                                if (!prev) return null;
                                                                return { ...prev, chatbotId: value === 'none' ? undefined : value };
                                                            })}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select chatbot" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="none">None</SelectItem>
                                                                {chatbots?.map((bot) => (
                                                                    <SelectItem key={bot.id} value={bot.id}>
                                                                        {bot.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid gap-2 pt-4">
                                                <Label>Key Features</Label>
                                                <div className="space-y-2">
                                                    {(product.keyFeatures || []).map((feature, index) => (
                                                        <div key={index} className="flex gap-2">
                                                            <Input
                                                                value={feature}
                                                                onChange={(e) => handleKeyFeatureChange(index, e.target.value)}
                                                                placeholder="e.g. AI-powered automation"
                                                            />
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleRemoveKeyFeature(index)}
                                                            >
                                                                <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                                                            </Button>
                                                        </div>
                                                    ))}
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={handleAddKeyFeature}
                                                        className="w-full border-dashed"
                                                    >
                                                        <Plus className="w-4 h-4 mr-2" /> Add Feature
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="media">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Media Assets</CardTitle>
                                            <CardDescription>Manage your product images and videos.</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            {(product.media || []).map((item, index) => (
                                                <div key={item.id} className="p-4 border rounded-lg space-y-4 bg-card/50">
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex items-center gap-2">
                                                            <div className="p-2 bg-background rounded-md border">
                                                                {item.type === 'video' ? <Video className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                                                            </div>
                                                            <h4 className="font-medium">Media Item {index + 1}</h4>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleRemoveMedia(item.id)}
                                                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>

                                                    <div className="grid gap-4">
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="space-y-2">
                                                                <Label>Type</Label>
                                                                <Select
                                                                    value={item.type}
                                                                    onValueChange={(value: 'image' | 'video') => handleUpdateMedia(item.id, 'type', value)}
                                                                >
                                                                    <SelectTrigger>
                                                                        <SelectValue />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="image">Image</SelectItem>
                                                                        <SelectItem value="video">Video</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label>Alt Text</Label>
                                                                <Input
                                                                    value={item.alt || ''}
                                                                    onChange={(e) => handleUpdateMedia(item.id, 'alt', e.target.value)}
                                                                    placeholder="Description"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label>URL</Label>
                                                            <Input
                                                                value={item.url}
                                                                onChange={(e) => handleUpdateMedia(item.id, 'url', e.target.value)}
                                                                placeholder={item.type === 'video' ? "Video URL (YouTube/Vimeo/mp4)" : "Image URL"}
                                                            />
                                                        </div>

                                                        {item.type === 'video' && (
                                                            <div className="space-y-2">
                                                                <Label>Thumbnail URL</Label>
                                                                <FileUpload
                                                                    value={item.thumbnailUrl || ''}
                                                                    onChange={(url) => handleUpdateMedia(item.id, 'thumbnailUrl', url)}
                                                                    label="Upload Thumbnail or paste URL"
                                                                    accept="image/*"
                                                                    className="h-24"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="grid gap-6">
                                                <MediaUpload
                                                    onUpload={(url, type) => handleAddMedia(type, url)}
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="team">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Team Members</CardTitle>
                                            <CardDescription>Add the makers behind the product.</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            {(product.team || []).map((member) => (
                                                <div key={member.id} className="p-4 border rounded-lg space-y-4 bg-card/50">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-medium">Team Member</h4>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleRemoveTeamMember(member.id)}
                                                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label>Name</Label>
                                                            <Input
                                                                value={member.name}
                                                                onChange={(e) => handleUpdateTeamMember(member.id, 'name', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>Role</Label>
                                                            <Input
                                                                value={member.role}
                                                                onChange={(e) => handleUpdateTeamMember(member.id, 'role', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label>Avatar</Label>
                                                        <div className="flex gap-2 items-start">
                                                            <div className="flex-1">
                                                                <FileUpload
                                                                    value={member.avatarUrl}
                                                                    onChange={(url) => handleUpdateTeamMember(member.id, 'avatarUrl', url)}
                                                                    label="Upload Avatar"
                                                                    className="h-24"
                                                                />
                                                            </div>
                                                            <div className="flex flex-col gap-2">
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    title="Auto-fetch from social link"
                                                                    onClick={() => {
                                                                        const socialUrl = member.socials?.twitter || member.socials?.github || member.socials?.linkedin;
                                                                        if (socialUrl) fetchAvatar(member.id, socialUrl);
                                                                        else alert("Add a social link (Twitter/GitHub) first!");
                                                                    }}
                                                                >
                                                                    <Wand2 className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label>Social Links</Label>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div className="flex items-center gap-2">
                                                                <Twitter className="w-4 h-4 text-muted-foreground" />
                                                                <Input
                                                                    value={member.socials?.twitter || ''}
                                                                    onChange={(e) => handleUpdateTeamMember(member.id, 'socials', { twitter: e.target.value })}
                                                                    placeholder="Twitter URL"
                                                                    className="h-8 text-sm"
                                                                />
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Linkedin className="w-4 h-4 text-muted-foreground" />
                                                                <Input
                                                                    value={member.socials?.linkedin || ''}
                                                                    onChange={(e) => handleUpdateTeamMember(member.id, 'socials', { linkedin: e.target.value })}
                                                                    placeholder="LinkedIn URL"
                                                                    className="h-8 text-sm"
                                                                />
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Github className="w-4 h-4 text-muted-foreground" />
                                                                <Input
                                                                    value={member.socials?.github || ''}
                                                                    onChange={(e) => handleUpdateTeamMember(member.id, 'socials', { github: e.target.value })}
                                                                    placeholder="GitHub URL"
                                                                    className="h-8 text-sm"
                                                                />
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Globe className="w-4 h-4 text-muted-foreground" />
                                                                <Input
                                                                    value={member.socials?.website || ''}
                                                                    onChange={(e) => handleUpdateTeamMember(member.id, 'socials', { website: e.target.value })}
                                                                    placeholder="Website URL"
                                                                    className="h-8 text-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            <Button onClick={handleAddTeamMember} className="w-full" variant="outline">
                                                <Plus className="w-4 h-4 mr-2" /> Add Team Member
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="marketing">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Marketing Tools</CardTitle>
                                            <CardDescription>Boost your launch with announcements and countdowns.</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-8">
                                            {/* Announcement Banner */}
                                            <div className="space-y-4 border p-4 rounded-xl">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Megaphone className="w-5 h-5 text-primary" />
                                                        <Label className="text-base">Announcement Banner</Label>
                                                    </div>
                                                    <Switch
                                                        checked={product.announcement?.enabled}
                                                        onCheckedChange={(checked) => setProduct(prev => {
                                                            if (!prev) return null;
                                                            const current = prev.announcement || { text: '', enabled: false };
                                                            return {
                                                                ...prev,
                                                                announcement: { ...current, enabled: checked }
                                                            };
                                                        })}
                                                    />
                                                </div>

                                                {product.announcement?.enabled && (
                                                    <div className="grid gap-4 pt-2">
                                                        <div className="grid grid-cols-[auto_1fr] gap-4">
                                                            <div className="space-y-2">
                                                                <Label>Emoji</Label>
                                                                <Input
                                                                    value={product.announcement.emoji || ''}
                                                                    onChange={(e) => setProduct(prev => {
                                                                        if (!prev) return null;
                                                                        const current = prev.announcement || { text: '', enabled: false };
                                                                        return {
                                                                            ...prev,
                                                                            announcement: { ...current, emoji: e.target.value }
                                                                        };
                                                                    })}
                                                                    className="w-16 text-center text-lg"
                                                                    placeholder="🎉"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label>Banner Text</Label>
                                                                <Input
                                                                    value={product.announcement.text || ''}
                                                                    onChange={(e) => setProduct(prev => {
                                                                        if (!prev) return null;
                                                                        const current = prev.announcement || { text: '', enabled: false };
                                                                        return {
                                                                            ...prev,
                                                                            announcement: { ...current, text: e.target.value }
                                                                        };
                                                                    })}
                                                                    placeholder="Special launch offer: Get 50% off!"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>Link URL (Optional)</Label>
                                                            <Input
                                                                value={product.announcement.link || ''}
                                                                onChange={(e) => setProduct(prev => {
                                                                    if (!prev) return null;
                                                                    const current = prev.announcement || { text: '', enabled: false };
                                                                    return {
                                                                        ...prev,
                                                                        announcement: { ...current, link: e.target.value }
                                                                    };
                                                                })}
                                                                placeholder="https://..."
                                                            />
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="space-y-2">
                                                                <Label>Background Color</Label>
                                                                <div className="flex gap-2">
                                                                    <Input
                                                                        type="color"
                                                                        value={product.announcement.backgroundColor || '#000000'}
                                                                        onChange={(e) => setProduct(prev => {
                                                                            if (!prev) return null;
                                                                            const current = prev.announcement || { text: '', enabled: false };
                                                                            return {
                                                                                ...prev,
                                                                                announcement: { ...current, backgroundColor: e.target.value }
                                                                            };
                                                                        })}
                                                                        className="w-12 h-10 p-1 cursor-pointer"
                                                                    />
                                                                    <Input
                                                                        value={product.announcement.backgroundColor || '#000000'}
                                                                        onChange={(e) => setProduct(prev => {
                                                                            if (!prev) return null;
                                                                            const current = prev.announcement || { text: '', enabled: false };
                                                                            return {
                                                                                ...prev,
                                                                                announcement: { ...current, backgroundColor: e.target.value }
                                                                            };
                                                                        })}
                                                                        placeholder="#000000"
                                                                        className="flex-1"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label>Text Color</Label>
                                                                <div className="flex gap-2">
                                                                    <Input
                                                                        type="color"
                                                                        value={product.announcement.textColor || '#ffffff'}
                                                                        onChange={(e) => setProduct(prev => {
                                                                            if (!prev) return null;
                                                                            const current = prev.announcement || { text: '', enabled: false };
                                                                            return {
                                                                                ...prev,
                                                                                announcement: { ...current, textColor: e.target.value }
                                                                            };
                                                                        })}
                                                                        className="w-12 h-10 p-1 cursor-pointer"
                                                                    />
                                                                    <Input
                                                                        value={product.announcement.textColor || '#ffffff'}
                                                                        onChange={(e) => setProduct(prev => {
                                                                            if (!prev) return null;
                                                                            const current = prev.announcement || { text: '', enabled: false };
                                                                            return {
                                                                                ...prev,
                                                                                announcement: { ...current, textColor: e.target.value }
                                                                            };
                                                                        })}
                                                                        placeholder="#ffffff"
                                                                        className="flex-1"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                )}
                                            </div>

                                            {/* Countdown Timer */}
                                            <div className="space-y-4 border p-4 rounded-xl">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Timer className="w-5 h-5 text-primary" />
                                                        <Label className="text-base">Countdown Timer</Label>
                                                    </div>
                                                    <Switch
                                                        checked={product.countdown?.enabled}
                                                        onCheckedChange={(checked) => setProduct(prev => {
                                                            if (!prev) return null;
                                                            const current = prev.countdown || { targetDate: '', enabled: false };
                                                            return {
                                                                ...prev,
                                                                countdown: { ...current, enabled: checked }
                                                            };
                                                        })}
                                                    />
                                                </div>

                                                {product.countdown?.enabled && (
                                                    <div className="grid gap-4 pt-2">
                                                        <div className="space-y-2">
                                                            <Label>Title</Label>
                                                            <Input
                                                                value={product.countdown.title || ''}
                                                                onChange={(e) => setProduct(prev => {
                                                                    if (!prev) return null;
                                                                    const current = prev.countdown || { targetDate: '', enabled: false };
                                                                    return {
                                                                        ...prev,
                                                                        countdown: { ...current, title: e.target.value }
                                                                    };
                                                                })}
                                                                placeholder="Launch ends in..."
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>Target Date & Time</Label>
                                                            <Input
                                                                type="datetime-local"
                                                                value={product.countdown.targetDate || ''}
                                                                onChange={(e) => setProduct(prev => {
                                                                    if (!prev) return null;
                                                                    const current = prev.countdown || { targetDate: '', enabled: false };
                                                                    return {
                                                                        ...prev,
                                                                        countdown: { ...current, targetDate: e.target.value }
                                                                    };
                                                                })}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Social Links */}
                                            <div className="space-y-4 border p-4 rounded-xl">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Share2 className="w-5 h-5 text-primary" />
                                                    <Label className="text-base">Social Links</Label>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label>Twitter / X</Label>
                                                        <Input
                                                            value={product.socialLinks?.twitter || ''}
                                                            onChange={(e) => setProduct(prev => {
                                                                if (!prev) return null;
                                                                return {
                                                                    ...prev,
                                                                    socialLinks: { ...prev.socialLinks, twitter: e.target.value }
                                                                };
                                                            })}
                                                            placeholder="https://x.com/..."
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>GitHub</Label>
                                                        <Input
                                                            value={product.socialLinks?.github || ''}
                                                            onChange={(e) => setProduct(prev => {
                                                                if (!prev) return null;
                                                                return {
                                                                    ...prev,
                                                                    socialLinks: { ...prev.socialLinks, github: e.target.value }
                                                                };
                                                            })}
                                                            placeholder="https://github.com/..."
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Discord</Label>
                                                        <Input
                                                            value={product.socialLinks?.discord || ''}
                                                            onChange={(e) => setProduct(prev => {
                                                                if (!prev) return null;
                                                                return {
                                                                    ...prev,
                                                                    socialLinks: { ...prev.socialLinks, discord: e.target.value }
                                                                };
                                                            })}
                                                            placeholder="https://discord.gg/..."
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>YouTube</Label>
                                                        <Input
                                                            value={product.socialLinks?.youtube || ''}
                                                            onChange={(e) => setProduct(prev => {
                                                                if (!prev) return null;
                                                                return {
                                                                    ...prev,
                                                                    socialLinks: { ...prev.socialLinks, youtube: e.target.value }
                                                                };
                                                            })}
                                                            placeholder="https://youtube.com/..."
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="theme">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Theme Customization</CardTitle>
                                            <CardDescription>Choose your brand colors.</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="grid gap-2">
                                                <Label>Primary Color</Label>
                                                <div className="flex gap-2 flex-wrap">
                                                    {["#FF6154", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#000000"].map((color) => (
                                                        <button
                                                            key={color}
                                                            className={`w-8 h-8 rounded-full border-2 ${product.theme?.primaryColor === color ? "border-foreground" : "border-transparent"
                                                                }`}
                                                            style={{ backgroundColor: color }}
                                                            onClick={() => handleThemeChange('primaryColor', color)}
                                                        />
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <Input
                                                        type="color"
                                                        value={product.theme?.primaryColor || '#FF6154'}
                                                        onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                                                        className="w-12 h-12 p-1 cursor-pointer"
                                                    />
                                                    <span className="text-sm text-muted-foreground">{product.theme?.primaryColor || '#FF6154'}</span>
                                                </div>
                                            </div>

                                            <div className="grid gap-2 pt-4">
                                                <Label>Background Color</Label>
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        type="color"
                                                        value={product.theme?.backgroundColor || '#ffffff'}
                                                        onChange={(e) => handleThemeChange('backgroundColor', e.target.value)}
                                                        className="w-12 h-12 p-1 cursor-pointer"
                                                    />
                                                    <Input
                                                        value={product.theme?.backgroundColor || '#ffffff'}
                                                        onChange={(e) => handleThemeChange('backgroundColor', e.target.value)}
                                                        className="max-w-[120px]"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid gap-2 pt-4">
                                                <Label>Text Color</Label>
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        type="color"
                                                        value={product.theme?.textColor || '#000000'}
                                                        onChange={(e) => handleThemeChange('textColor', e.target.value)}
                                                        className="w-12 h-12 p-1 cursor-pointer"
                                                    />
                                                    <Input
                                                        value={product.theme?.textColor || '#000000'}
                                                        onChange={(e) => handleThemeChange('textColor', e.target.value)}
                                                        className="max-w-[120px]"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid gap-2 pt-4">
                                                <Label>Font Family</Label>
                                                <Select
                                                    value={product.theme?.fontFamily || 'Roboto'}
                                                    onValueChange={(value) => handleThemeChange('fontFamily', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select font" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Roboto">Roboto (Default)</SelectItem>
                                                        <SelectItem value="Inter">Inter</SelectItem>
                                                        <SelectItem value="Open Sans">Open Sans</SelectItem>
                                                        <SelectItem value="Lato">Lato</SelectItem>
                                                        <SelectItem value="Montserrat">Montserrat</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 pt-4">
                                                <div className="space-y-2">
                                                    <Label>Layout Style</Label>
                                                    <Select
                                                        value={product.theme?.layout || 'modern'}
                                                        onValueChange={(value) => handleThemeChange('layout', value)}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select layout" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="classic">Classic</SelectItem>
                                                            <SelectItem value="modern">Modern</SelectItem>
                                                            <SelectItem value="minimal">Minimal</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Card Style</Label>
                                                    <Select
                                                        value={product.theme?.cardStyle || 'rounded'}
                                                        onValueChange={(value) => handleThemeChange('cardStyle', value)}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select style" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="square">Square</SelectItem>
                                                            <SelectItem value="rounded">Rounded</SelectItem>
                                                            <SelectItem value="glass">Glassmorphism</SelectItem>
                                                            <SelectItem value="elevated">Elevated</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>


                                            <div className="grid gap-2 pt-4">
                                                <Label>Accent Color</Label>
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        type="color"
                                                        value={product.theme?.accentColor || '#3B82F6'}
                                                        onChange={(e) => handleThemeChange('accentColor', e.target.value)}
                                                        className="w-12 h-12 p-1 cursor-pointer"
                                                    />
                                                    <Input
                                                        value={product.theme?.accentColor || '#3B82F6'}
                                                        onChange={(e) => handleThemeChange('accentColor', e.target.value)}
                                                        className="max-w-[120px]"
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>

                        <div className="sticky top-6 self-start max-h-[calc(100vh-3rem)] overflow-y-auto">
                            <div className="bg-card/60 backdrop-blur-sm border border-border/60 rounded-2xl p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <h3 className="font-semibold text-lg">Live Preview</h3>
                                </div>
                                <div className="border rounded-xl overflow-x-auto bg-background shadow-sm">
                                    <div className="min-h-screen bg-background pb-20 min-w-[1024px]"
                                        style={{
                                            backgroundColor: product.theme?.backgroundColor || 'var(--background)',
                                            color: product.theme?.textColor || 'var(--foreground)',
                                            fontFamily: product.theme?.fontFamily
                                        }}
                                    >
                                        <AnnouncementBanner
                                            text={product.announcement?.text || ''}
                                            link={product.announcement?.link}
                                            emoji={product.announcement?.emoji}
                                            backgroundColor={product.announcement?.backgroundColor}
                                            textColor={product.announcement?.textColor}
                                            enabled={product.announcement?.enabled}
                                            countdownTarget={product.countdown?.enabled ? product.countdown?.targetDate : undefined}
                                        />

                                        <div className="container max-w-6xl mx-auto py-8 px-4">
                                            <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
                                                {/* Main Content */}
                                                <div className="space-y-10">
                                                    <ProductHero product={product} />
                                                    <ProductMediaCarousel media={product.media || []} />

                                                    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                                                        <p>{product.description}</p>

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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
