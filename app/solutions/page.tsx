import { Metadata } from 'next';
import { Suspense } from "react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { SolutionsClientContent } from "@/components/solutions/SolutionsClientContent";

export const metadata: Metadata = {
    title: 'Solutions - AI Customer Support for Every Industry | VerlyAI',
    description: 'Discover AI customer support solutions for E-commerce, Healthcare, SaaS, Real Estate, Travel & more. Deploy voice AI agents, WhatsApp chatbots, and omnichannel support tailored to your industry.',
    alternates: {
        canonical: '/solutions',
    },
    openGraph: {
        title: 'Solutions - AI Customer Support for Every Industry | VerlyAI',
        description: 'See how businesses across E-commerce, Healthcare, SaaS, Real Estate, and more use VerlyAI to automate support and save thousands monthly.',
        url: 'https://verlyai.xyz/solutions',
    },
    twitter: {
        title: 'Solutions - AI Customer Support for Every Industry | VerlyAI',
        description: 'See how businesses across E-commerce, Healthcare, SaaS, Real Estate, and more use VerlyAI to automate support and save thousands monthly.',
    },
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://verlyai.xyz' },
        { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://verlyai.xyz/solutions' },
    ],
};

export default function SolutionsPage() {
    return (
        <main className="bg-background relative min-h-screen font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Global Grid Background */}
            <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

            <div className="relative z-10">
                <Navbar />

                {/* Static hero section — server-rendered for crawlers */}
                <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 text-center px-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                        <span>Infinite Possibilities</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-foreground">
                        AI That Works for{' '}
                        <span className="text-primary">Your Industry</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        From e-commerce stores handling 1,000+ daily inquiries to healthcare providers scheduling appointments — see how businesses like yours automate support and save thousands monthly.
                    </p>
                </section>

                <Suspense fallback={
                    <div className="min-h-[60vh] flex items-center justify-center">
                        <div className="text-center space-y-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
                            <p className="text-muted-foreground">Loading solutions...</p>
                        </div>
                    </div>
                }>
                    <SolutionsClientContent />
                </Suspense>

                <Footer />
            </div>
        </main>
    );
}
