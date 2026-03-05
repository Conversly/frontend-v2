import { Metadata } from 'next';
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import SmartToy from "@mui/icons-material/SmartToy";
import Memory from "@mui/icons-material/Memory";
import Public from "@mui/icons-material/Public";
import Bolt from "@mui/icons-material/Bolt";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LeadGeneration from "./lead-generation";
import CustomerSupport from "./customer-support";
import {
    AnimatedHero,
    AnimatedFeatureCards,
    AnimatedMissionSection,
    AnimatedValueCards
} from "@/components/about/AboutClientAnimations";

export const metadata: Metadata = {
    title: 'About Us - AI Customer Support Platform | VerlyAI',
    description: 'Learn about VerlyAI, the leading AI customer support platform. Build voice AI agents, WhatsApp chatbots, and omnichannel support solutions that scale without headcount.',
    openGraph: {
        title: 'About Us - AI Customer Support Platform | VerlyAI',
        description: 'Discover how VerlyAI helps businesses deploy AI agents across voice, chat & WhatsApp to handle 10X more conversations at a fraction of the cost.',
        url: 'https://verlyai.xyz/about',
    },
};

const CONTENT_WIDTH = "w-[95%] md:w-[85%] lg:w-[80%] max-w-[1200px] mx-auto";

const valueCardsData = [
    {
        title: "2-Minute Setup",
        desc: "No complex integrations. Copy one line of code and your AI agent is live. Works with your existing tools.",
        icon: <Bolt sx={{ fontSize: 24 }} />
    },
    {
        title: "Bank-Level Security",
        desc: "SOC 2 certified, GDPR compliant, data encryption at rest and in transit. Your customer data is fortress-protected.",
        icon: <Public sx={{ fontSize: 24 }} />
    },
    {
        title: "Scale Infinitely",
        desc: "Handle 10 conversations or 10,000 simultaneously. 99.9% uptime SLA. Black Friday traffic? No problem.",
        icon: <Memory sx={{ fontSize: 24 }} />
    }
];

export default function AboutPage() {
    return (
        <main className="bg-background relative min-h-screen font-sans selection:bg-primary/20">
            {/* Global Grid Background */}
            <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

            <div className="relative z-10">
                <Navbar />

                {/* Hero Section */}
                <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
                    <div className={CONTENT_WIDTH}>
                        <AnimatedHero />
                    </div>
                </section>

                {/* Story/Mission Section */}
                <section className="py-20 lg:py-32 relative overflow-hidden">
                    <div className={CONTENT_WIDTH}>
                        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                            <AnimatedMissionSection>
                                <div className="inline-flex items-center rounded-lg bg-orange-50 dark:bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-600 dark:text-orange-400">
                                    <Bolt sx={{ fontSize: 16 }} className="mr-2" />
                                    Why we exist
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                                    Why Companies Choose <span className="text-primary">VerlyAI</span>
                                </h2>
                                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                                    <p>
                                        <span className="font-semibold text-foreground">Traditional chatbots frustrate customers.</span> They force people through rigid menus and fail the moment someone asks a real question.
                                    </p>
                                    <p>
                                        <span className="font-semibold text-foreground">VerlyAI is different.</span> Our AI agents understand natural language, learn from your knowledge base, and handle complex conversations — just like your best support agent would.
                                    </p>
                                    <p className="font-medium text-foreground">
                                        The result? <span className="text-primary">80% cost reduction</span>, instant responses 24/7, and happier customers who get real answers — not scripted responses.
                                    </p>
                                </div>
                                <div className="pt-4">
                                    <Link href="/solutions">
                                        <Button size="lg" className="group text-base px-8 h-14 rounded-full shadow-lg hover:shadow-primary/25 transition-all duration-300">
                                            Explore our solutions
                                            <ArrowForward sx={{ fontSize: 16 }} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            </AnimatedMissionSection>

                            <AnimatedFeatureCards />
                        </div>
                    </div>
                </section>

                {/* Integrated Features - Client Components with animations */}
                <LeadGeneration />
                <CustomerSupport />

                {/* Team/Mission Values */}
                <section className="py-20 lg:py-32">
                    <div className={CONTENT_WIDTH}>
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Enterprise-Grade. Developer-Friendly.</h2>
                            <p className="text-xl text-muted-foreground">
                                Build production-ready AI agents in minutes with APIs your team will love. Bank-level security. 99.9% uptime. Zero compromises.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {valueCardsData.map((item, i) => (
                                <AnimatedValueCards key={i} item={item} index={i} />
                            ))}
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </main>
    );
}
