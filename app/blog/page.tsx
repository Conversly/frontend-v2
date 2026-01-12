import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog - AI & Customer Support Insights | VerlyAI",
    description: "Expert insights on Agentic AI, LLM orchestration, and Customer Experience. Read deep dives from our engineering team on reducing latency and optimizing accuracy.",
};

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-background relative flex flex-col">
            <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

            <div className="relative z-10 flex flex-col flex-1">
                <Navbar />

                <div className="flex-1 flex flex-col items-center justify-center py-20 px-6 text-center">
                    <Badge variant="secondary" className="mb-6">Blog</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Latest Updates</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        Our engineering team is busy writing about the latest in AI and Customer Experience.
                        Stay tuned for technical deep dives and industry insights.
                    </p>
                </div>

                <Footer />
            </div>
        </main>
    );
}
