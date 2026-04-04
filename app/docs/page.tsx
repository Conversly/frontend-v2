import type { Metadata } from "next";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import DocsContent from "@/components/docs/docs-content";

export const metadata: Metadata = {
  title: "Documentation | VerlyAI",
  description:
    "Explore VerlyAI documentation — setup guides, AI chatbot management, knowledge training, analytics, human escalations, channels, and voice agents.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "Documentation | VerlyAI",
    description:
      "Explore VerlyAI documentation — setup guides, AI chatbot management, knowledge training, analytics, channels, and more.",
    url: "https://verlyai.xyz/docs",
    type: "website",
  },
  twitter: {
    title: "Documentation | VerlyAI",
    description:
      "Explore VerlyAI documentation — setup guides, AI chatbot management, knowledge training, analytics, and more.",
  },
};

const WRAP = "mx-auto w-full max-w-[1200px] px-5 md:px-8";

export default function DocsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(62,128,241,0.10),transparent_20%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.07),transparent_18%),radial-gradient(circle_at_70%_40%,rgba(139,92,246,0.06),transparent_16%),linear-gradient(180deg,#fdfbf6_0%,#f7f9ff_30%,#f8fcf7_60%,#f7f8ff_100%)] text-[#221f1b] selection:bg-blue-100">
      {/* Decorative blurred orbs */}
      <div className="pointer-events-none absolute left-[-8rem] top-20 h-[22rem] w-[22rem] rounded-full bg-blue-300/10 blur-[110px]" />
      <div className="pointer-events-none absolute right-[-6rem] top-[32rem] h-[20rem] w-[20rem] rounded-full bg-emerald-300/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[20rem] left-[18%] h-[18rem] w-[18rem] rounded-full bg-violet-300/10 blur-[110px]" />
      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-[linear-gradient(to_right,rgba(120,145,201,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,145,201,0.05)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="relative z-10">
        <Navbar />
        <DocsContent />
        <div className={WRAP}>
          <Footer />
        </div>
      </div>
    </main>
  );
}
