import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Documentation - SDKs & API Reference | VerlyAI",
    description: "Complete developer guides for VerlyAI. Access Python & Node.js SDKs, REST API references, Webhook events, and tutorials for building custom RAG pipelines and Voice agents.",
};

export default function DocsPage() {
    return (
        <main className="min-h-screen bg-background relative flex flex-col">
            <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

            <div className="relative z-10 flex flex-col flex-1">
                <Navbar />

                <div className="flex-1 flex flex-col items-center justify-center py-20 px-6 text-center">
                    <Badge variant="secondary" className="mb-6">Documentation</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Documentation Coming Soon</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        We are currently building our comprehensive developer guides and API references.
                        Please check back shortly or contact support for assistance.
                    </p>
                </div>

                <Footer />
            </div>
        </main>
    );
}
