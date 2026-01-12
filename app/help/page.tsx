import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Book, Mail, MessageCircle, FileText } from 'lucide-react';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';

export const metadata: Metadata = {
    title: 'Help Center - VerlyAI',
    description: 'Get support and documentation for VerlyAI.',
};

export default function HelpPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-16 px-4">
                <div className="max-w-4xl mx-auto space-y-12">

                    {/* Header */}
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight">How can we help?</h1>
                        <p className="text-lg text-muted-foreground">
                            Documentation, support, and community for building with VerlyAI.
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <Link href="/docs" className="group">
                            <div className="h-full p-8 border rounded-2xl bg-card hover:border-primary/50 transition-colors shadow-sm">
                                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                                    <Book className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Documentation</h2>
                                <p className="text-muted-foreground">
                                    Detailed guides, API references, and code examples to help you build.
                                </p>
                            </div>
                        </Link>

                        <a href="mailto:team@verlyai.xyz" className="group">
                            <div className="h-full p-8 border rounded-2xl bg-card hover:border-blue-500/50 transition-colors shadow-sm">
                                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">Email Support</h2>
                                <p className="text-muted-foreground">
                                    Direct line to our engineering team for account or technical issues.
                                </p>
                            </div>
                        </a>

                        <Link href="/blog" className="group">
                            <div className="h-full p-8 border rounded-2xl bg-card hover:border-purple-500/50 transition-colors shadow-sm">
                                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-semibold mb-2 group-hover:text-purple-500 transition-colors">Blog & Tutorials</h2>
                                <p className="text-muted-foreground">
                                    Read about the latest updates, tutorials, and best practices.
                                </p>
                            </div>
                        </Link>

                        <div className="h-full p-8 border rounded-2xl bg-card/50 border-dashed">
                            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted text-muted-foreground">
                                <MessageCircle className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-semibold mb-2 text-muted-foreground">Community</h2>
                            <p className="text-muted-foreground/80">
                                Join our Discord community coming soon.
                            </p>
                        </div>
                    </div>

                    <div className="text-center pt-8">
                        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
