import type { Metadata } from 'next';
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';
import CompareForm from '@/components/compare/compare-form';
import { siteConfig } from '@/lib/metadata';
import { buildBreadcrumbSchema } from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: 'Compare Verly vs Competitors',
  description: 'See how Verly compares to Intercom, Zendesk, Tidio, Chatbase, and more. Get a personalized comparison report for your business.',
  alternates: { canonical: '/compare' },
  openGraph: {
    title: 'Compare Verly vs Competitors',
    description: 'Get a personalized AI-powered comparison report in 30 seconds.',
    url: `${siteConfig.url}/compare`,
    type: 'website',
  },
  twitter: {
    title: 'Compare Verly vs Competitors',
    description: 'Get a personalized AI-powered comparison report in 30 seconds.',
  },
};

const CONTENT_WIDTH = 'w-[95%] md:w-[85%] lg:w-[80%] max-w-[1200px] mx-auto';

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Compare', path: '/compare' },
]);

export default function ComparePage() {
  return (
    <main className="bg-background relative w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Subtle dot grid background */}
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

      {/* Floating gradient orbs */}
      <div className="absolute top-20 -left-32 w-[500px] h-[500px] transform-gpu rounded-full bg-primary/[0.06] blur-[70px] pointer-events-none" />
      <div className="absolute top-60 -right-40 w-[600px] h-[600px] transform-gpu rounded-full bg-chart-2/[0.05] blur-[80px] pointer-events-none" />
      <div className="absolute top-[600px] left-1/2 -translate-x-1/2 w-[400px] h-[400px] transform-gpu rounded-full bg-primary/[0.04] blur-[80px] pointer-events-none" />

      <div className="relative z-10">
        <Navbar />
        <div className={CONTENT_WIDTH}>
          <section className="relative pt-32 pb-24 px-4">
            {/* Hero text */}
            <div className="max-w-3xl mx-auto text-center mb-14 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-chart-2/10 text-primary text-xs font-bold tracking-[0.08em] uppercase border border-primary/15 shadow-[0_0_20px_rgba(79,70,229,0.08)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                AI-Powered Comparison
              </div>

              {/* Title with gradient */}
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1]">
                <span className="text-foreground">Honest comparisons.</span>{' '}
                <span className="bg-gradient-to-r from-primary via-chart-2 to-primary bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
                  Not marketing ones.
                </span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                A side-by-side report on where Verly wins, where it loses, and whether switching actually pays off for your team. Generated in under 60 seconds.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {[
                  { label: '10 dimensions scored', icon: '◆' },
                  { label: '54+ feature comparisons', icon: '◆' },
                  { label: 'Personalized insights', icon: '◆' },
                ].map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-2 px-4 py-2 transform-gpu rounded-full bg-card/80 border border-border/50 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-sm hover:border-primary/20 hover:text-foreground transition-all duration-300"
                  >
                    <span className="text-primary text-[8px]">{item.icon}</span>
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Form card with gradient border effect */}
            <div className="max-w-3xl mx-auto relative group">
              {/* Glow behind card */}
              <div className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-b from-primary/20 via-transparent to-chart-2/10 opacity-60 group-hover:opacity-80 transition-opacity duration-500 blur-sm" />
              <div className="relative rounded-[2rem] border border-border/30 bg-card/80 backdrop-blur-xl p-6 md:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)]">
                <CompareForm />
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </div>
    </main>
  );
}
