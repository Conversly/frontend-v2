"use client";

import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";
const BLOG_POSTS = [
    {
        title: "Why Decision Trees Are Dead: The Shift to Autonomous Agents",
        excerpt: "Traditional chatbots fail when users go off-script. Discover how VerlyAI's LLM-native agents understand intent and resolve complex issues without rigid decision trees.",
        date: "Jan 12, 2026",
        readTime: "5 min read",
        category: "AI Strategy",
        slug: "decision-trees-dead-autonomous-agents",
        image: "/images/blog/autonomous-agents.png",
    },
    {
        title: "Building a Voice Agent in 10 Minutes with VerlyAI",
        excerpt: "A step-by-step guide to deploying a low-latency voice AI that can handle interruptions, accents, and complex queries over the phone.",
        date: "Jan 08, 2026",
        readTime: "8 min read",
        category: "Tutorials",
        slug: "building-voice-agent-10-minutes",
        image: "/images/blog/voice-ai.png",
    },
    {
        title: "Multi-Channel Support: Integrating WhatsApp and Web Chat",
        excerpt: "Write once, deploy everywhere. Learn how to configure a single VerlyAI agent to handle support tickets seamlessly across WhatsApp, Web, and Voice channels.",
        date: "Jan 05, 2026",
        readTime: "6 min read",
        category: "Engineering",
        slug: "multi-channel-support-whatsapp-web",
        image: "/images/blog/omnichannel.png",
    }
];

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-background relative flex flex-col">
            <Navbar />

            {/* Latest Articles Grid */}
            <section className="py-24 px-6 bg-background">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <Badge variant="secondary">Latest Updates</Badge>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Fresh from the Editors</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Deep dives into AI technology, customer experience strategies, and product updates.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {BLOG_POSTS.map((post, index) => (
                            <Link key={index} href={`/blog/${post.slug}`} className="group h-full">
                                <Card className="h-full overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg bg-card/50 backdrop-blur-sm">
                                    <div className="aspect-video w-full overflow-hidden bg-muted relative">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <Badge className="absolute top-4 left-4 z-20 bg-background/80 backdrop-blur text-foreground border-transparent">
                                            {post.category}
                                        </Badge>
                                    </div>
                                    <CardHeader className="space-y-2">
                                        <div className="flex items-center text-xs text-muted-foreground gap-4">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {post.date}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {post.readTime}
                                            </div>
                                        </div>
                                        <CardTitle className="line-clamp-2 text-xl group-hover:text-primary transition-colors">
                                            {post.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <CardDescription className="line-clamp-3">
                                            {post.excerpt}
                                        </CardDescription>
                                        <div className="flex items-center text-sm font-medium text-primary pt-2">
                                            Read Article <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
