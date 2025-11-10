'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Zap,
  Brain,
  BarChart3,
  Phone,
  Users,
  Shield,
} from "lucide-react";
import Navbar from "@/components/landing/navbar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    try {
      const isLoggedIn = localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN);
      if (isLoggedIn === "true") {
        router.replace("/chatbot");
      }
    } catch {}
  }, [router]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card">
              <span className="text-sm font-medium">
                Trusted by 9000+ businesses worldwide
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
              AI Agents for Customer Service
            </h1>

            <p className="text-xl text-muted-foreground text-balance">
              Build and deploy AI support agents that solve customer problems
              instantly. No coding required. Works with your existing tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 gap-2"
                >
                  Build Your Agent <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                View Demo
              </Button>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            <div className="p-6 rounded-xl border border-border bg-card hover:border-blue-500/50 transition-all hover:shadow-lg">
              <Zap className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Deploy in Minutes</h3>
              <p className="text-sm text-muted-foreground">
                Train your agent on business data and deploy instantly without
                technical expertise
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card hover:border-blue-500/50 transition-all hover:shadow-lg">
              <Brain className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">AI Powered</h3>
              <p className="text-sm text-muted-foreground">
                Advanced language models with reasoning for complex customer
                queries
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card hover:border-blue-500/50 transition-all hover:shadow-lg">
              <BarChart3 className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">
                Advanced Analytics
              </h3>
              <p className="text-sm text-muted-foreground">
                Track performance, sentiment analysis, and customer insights in
                real-time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              An end-to-end solution for conversational AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                num: "01",
                title: "Build & Deploy",
                desc: "Train your agent on business data",
              },
              {
                num: "02",
                title: "Solve Problems",
                desc: "Agent answers customer questions",
              },
              {
                num: "03",
                title: "Refine & Optimize",
                desc: "Improve performance over time",
              },
              {
                num: "04",
                title: "Smart Escalation",
                desc: "Route complex issues to humans",
              },
              {
                num: "05",
                title: "Analyze & Improve",
                desc: "Review insights and analytics",
              },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {step.num}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to build the perfect AI agent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Users,
                title: "Real-time Data Sync",
                desc: "Connect to CRMs, order systems, and more",
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                desc: "Encryption and compliance standards",
              },
              {
                icon: Phone,
                title: "Voice Support",
                desc: "AI voice agents for customer calls",
              },
              {
                icon: BarChart3,
                title: "Smart Analytics",
                desc: "Detailed insights and performance metrics",
              },
            ].map((feature, i) => (
              <div key={i} className="flex gap-4">
                <feature.icon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl font-bold">
            Ready to transform customer service?
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of businesses using VerlyAi to deliver exceptional
            customer experiences
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Building Free - No Credit Card Required
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card/50">
        <div className="max-w-7xl mx-auto px-6 text-center text-muted-foreground">
          <p>© 2025 VerlyAi. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
