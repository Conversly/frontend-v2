import { Metadata } from 'next';
import { Suspense } from "react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { SolutionsClientContent } from "@/components/solutions/SolutionsClientContent";
import { solutions } from "@/lib/solutions-data";

export const metadata: Metadata = {
    title: 'Solutions - AI Customer Support for Every Industry | VerlyAI',
    description: 'Discover AI customer support solutions for E-commerce, Healthcare, SaaS, Real Estate, Travel & more. Deploy voice AI agents, WhatsApp chatbots, and omnichannel support tailored to your industry.',
    openGraph: {
        title: 'Solutions - AI Customer Support for Every Industry | VerlyAI',
        description: 'See how businesses across E-commerce, Healthcare, SaaS, Real Estate, and more use VerlyAI to automate support and save thousands monthly.',
        url: 'https://verlyai.xyz/solutions',
    },
};

// Build keywords from solution titles and categories for search engines
const industryKeywords = solutions.map(s => s.title).join(', ');

export default function SolutionsPage() {
    return (
        <main className="bg-background relative min-h-screen font-sans">
            {/* Global Grid Background */}
            <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

            <div className="relative z-10">
                <Navbar />

                <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="text-center space-y-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                            <p className="text-muted-foreground">Loading solutions...</p>
                        </div>
                    </div>
                }>
                    <SolutionsClientContent />
                </Suspense>

                {/* SEO Content - Hidden visually but available for crawlers */}
                <section className="sr-only" aria-hidden="true">
                    <h1>AI Customer Support Solutions for Every Industry</h1>
                    <p>
                        VerlyAI provides tailored AI customer support solutions for {industryKeywords}.
                        Our platform helps businesses automate support across voice, WhatsApp, and web chat channels.
                    </p>
                    <h2>Industries We Serve</h2>
                    <ul>
                        {solutions.map(solution => (
                            <li key={solution.title}>
                                <strong>{solution.title}</strong>: {solution.description}
                            </li>
                        ))}
                    </ul>
                    <p>
                        Deploy AI agents that handle thousands of conversations simultaneously.
                        Reduce support costs by 80% while improving customer satisfaction scores.
                        HIPAA compliant for healthcare. GDPR compliant for European customers.
                        SOC 2 certified for enterprise security.
                    </p>
                </section>

                <Footer />
            </div>
        </main>
    );
}
