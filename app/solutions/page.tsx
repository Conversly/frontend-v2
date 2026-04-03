import { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { SolutionsClientContent } from "@/components/solutions/SolutionsClientContent";

export const metadata: Metadata = {
  title: "Solutions - AI Customer Support for Every Industry | Verly",
  description:
    "Discover AI customer support solutions for E-commerce, Healthcare, SaaS, Real Estate, Travel & more. Deploy voice AI agents, WhatsApp chatbots, and omnichannel support tailored to your industry.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: "Solutions - AI Customer Support for Every Industry | Verly",
    description:
      "See how businesses across E-commerce, Healthcare, SaaS, Real Estate, and more use Verly to automate support and save thousands monthly.",
    url: "https://verlyai.xyz/solutions",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://verlyai.xyz" },
    { "@type": "ListItem", position: 2, name: "Solutions", item: "https://verlyai.xyz/solutions" },
  ],
};

export default function SolutionsPage() {
  return (
    <main className="relative min-h-screen bg-[linear-gradient(180deg,#f7f4ee_0%,#f2eee8_60%,#fff_100%)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />

      {/* Hero */}
      <section className="px-5 pb-10 pt-28 text-center md:px-8 md:pb-14 md:pt-36">
        <div className="mx-auto max-w-[760px]">
          <div className="mb-5 inline-flex rounded-full border border-[#d9d2c5] bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7a7468]">
            Industry Solutions
          </div>
          <h1 className="font-[Georgia,Times,'Times_New_Roman',serif] text-[36px] leading-[1.05] tracking-[-0.04em] text-[#221f1b] md:text-[56px]">
            AI support built for
            <span className="block text-[#8a7d6b]">your industry.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[580px] text-[15px] leading-7 text-[#6d665d] md:text-[17px]">
            From e-commerce stores handling thousands of daily inquiries to healthcare providers
            scheduling appointments — see how teams like yours automate support with Verly.
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="flex min-h-[40vh] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#ddd7ca] border-t-[#221f1b]" />
          </div>
        }
      >
        <SolutionsClientContent />
      </Suspense>

      <Footer />
    </main>
  );
}
