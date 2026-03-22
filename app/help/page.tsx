import { Metadata } from 'next';
import { HelpChat } from "@/components/help/HelpChat";
import { Mail, MessageCircle, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

export const metadata: Metadata = {
  title: 'Help & Support | VerlyAI',
  description: 'Get help with VerlyAI through our support assistant, FAQ, blog resources, and email support for AI customer support agents.',
  alternates: {
    canonical: '/help',
  },
  openGraph: {
    title: 'Help & Support | VerlyAI',
    description: 'Get support for VerlyAI through our support assistant, FAQ, blog resources, and email support.',
    url: 'https://verlyai.xyz/help',
  },
};

export default function HelpPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 animate-in fade-in duration-500">
            <Navbar />
            <div className="container max-w-6xl mx-auto px-4 py-24 space-y-16">

                {/* Hero / Chat Section */}
                <section className="space-y-6 text-center">
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                            How can we help?
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Ask our AI assistant below or browse the FAQ, blog, and support channels for fast answers.
                        </p>
                    </div>

                    <div className="mt-8">
                        <HelpChat />
                    </div>
                </section>

                {/* Support Channels Section */}
                <section className="space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-semibold tracking-tight">Still need help?</h2>
                        <p className="text-muted-foreground">
                            Reach the right resource for setup questions, product guidance, and support
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Email Channel */}
                        <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <CardHeader>
                                <div className="mb-4 w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <CardTitle>Email Support</CardTitle>
                                <CardDescription>Get a response within 24 hours</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full" variant="outline" asChild>
                                    <Link href="mailto:team@verlyai.xyz">
                                        Send an Email
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Help Center */}
                        <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <CardHeader>
                                <div className="mb-4 w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                                    <MessageCircle className="w-6 h-6" />
                                </div>
                                <CardTitle>Help Center</CardTitle>
                                <CardDescription>Browse frequently asked questions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full" variant="outline" asChild>
                                    <Link href="/faq">
                                        View FAQs
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Blog Channel */}
                        <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <CardHeader>
                                <div className="mb-4 w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
                                    <Newspaper className="w-6 h-6" />
                                </div>
                                <CardTitle>Latest Guides</CardTitle>
                                <CardDescription>Read product updates and implementation guides</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full" variant="outline" asChild>
                                    <Link href="/blogs">
                                        Visit the Blog
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </section>

            </div>
            <Footer />
        </main>
    );
}
