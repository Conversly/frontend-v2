import type { Metadata } from 'next';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';
import CompareForm from '@/components/compare/compare-form';
import { siteConfig } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Compare VerlyAI vs Competitors | VerlyAI',
  description: 'See how VerlyAI compares to Intercom, Zendesk, Tidio, Chatbase, and more. Get a personalized comparison report for your business.',
  alternates: { canonical: '/compare' },
  openGraph: {
    title: 'Compare VerlyAI vs Competitors | VerlyAI',
    description: 'Get a personalized AI-powered comparison report in 30 seconds.',
    url: `${siteConfig.url}/compare`,
    type: 'website',
  },
};

const CONTENT_WIDTH = 'w-[95%] md:w-[85%] lg:w-[80%] max-w-[1200px] mx-auto';

export default function ComparePage() {
  return (
    <main className="bg-background relative w-full">
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <div className="relative z-10">
        <Navbar />
        <div className={CONTENT_WIDTH}>
          <section className="relative pt-32 pb-20 px-4">
            {/* Hero text */}
            <div className="max-w-3xl mx-auto text-center mb-12 space-y-5">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase border border-primary/20">
                AI-Powered Comparison
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight">
                VerlyAI vs Your Current Tool
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Get a personalized, data-driven comparison report for your business in under 60 seconds.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  10 dimensions scored
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  54+ feature comparisons
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Personalized insights
                </span>
              </div>
            </div>

            {/* Form card */}
            <div className="max-w-3xl mx-auto rounded-[2rem] border border-border/40 bg-card/50 backdrop-blur-xl p-6 md:p-10 shadow-xl">
              <CompareForm />
            </div>
          </section>
          <Footer />
        </div>
      </div>
    </main>
  );
}
