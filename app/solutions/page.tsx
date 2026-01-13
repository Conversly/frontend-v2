'use client';
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Laptop,
  Heart,
  Utensils,
  Building,
  GraduationCap,
  Plane,
  Briefcase,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Testimonial from "@/components/landing/testimonial";

const CONTENT_WIDTH = "w-[95%] md:w-[85%] lg:w-[80%] max-w-[1200px] mx-auto";

const solutions = [
  {
    icon: ShoppingCart,
    title: "E-commerce & Retail",
    category: "Commerce",
    description: "Automate order tracking, product inquiries, returns, and customer support for online stores.",
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    features: [
      "Real-time order status via WhatsApp",
      "Product recommendations using RAG",
      "Automated return processing",
      "Multi-language support for global customers",
      "Integration with Shopify, WooCommerce"
    ]
  },
  {
    icon: Laptop,
    title: "SaaS Platforms",
    category: "Support",
    description: "Provide instant product support, onboarding assistance, and technical troubleshooting.",
    color: "text-purple-600",
    bg: "bg-purple-100 dark:bg-purple-900/30",
    features: [
      "Technical documentation Q&A",
      "Feature explanation with context",
      "API troubleshooting assistance",
      "Billing and subscription management",
      "Intelligent escalation to support engineers"
    ]
  },
  {
    icon: Heart,
    title: "Healthcare",
    category: "Voice",
    description: "Schedule appointments, answer patient questions, and manage healthcare communications compliantly.",
    color: "text-red-600",
    bg: "bg-red-100 dark:bg-red-900/30",
    features: [
      "HIPAA-compliant data handling",
      "Appointment booking and reminders",
      "Insurance verification",
      "Prescription refill automation",
      "Multi-lingual patient support"
    ]
  },
  {
    icon: Utensils,
    title: "Restaurants & Hospitality",
    category: "Voice",
    description: "Handle reservations, menu inquiries, and customer feedback for restaurants and hotels.",
    color: "text-orange-600",
    bg: "bg-orange-100 dark:bg-orange-900/30",
    features: [
      "Table reservation via voice/WhatsApp",
      "Menu and allergen information",
      "Catering inquiry handling",
      "Real-time availability checking",
      "Integration with OpenTable, Resy"
    ]
  },
  {
    icon: Building,
    title: "Real Estate",
    category: "Sales",
    description: "Qualify leads, schedule property viewings, and answer property questions 24/7.",
    color: "text-teal-600",
    bg: "bg-teal-100 dark:bg-teal-900/30",
    features: [
      "Lead qualification and scoring",
      "Property information retrieval",
      "Virtual tour scheduling",
      "Mortgage calculator integration",
      "CRM synchronization"
    ]
  },
  {
    icon: GraduationCap,
    title: "Education",
    category: "Support",
    description: "Support students and parents with course information, admissions, and campus services.",
    color: "text-indigo-600",
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
    features: [
      "Course catalog information",
      "Admissions process guidance",
      "Financial aid inquiries",
      "Campus tour scheduling",
      "Student portal integration"
    ]
  },
  {
    icon: Plane,
    title: "Travel & Tourism",
    category: "Voice",
    description: "Assist travelers with bookings, itinerary changes, and destination information.",
    color: "text-sky-600",
    bg: "bg-sky-100 dark:bg-sky-900/30",
    features: [
      "Booking modifications via chat",
      "Flight status notifications",
      "Destination recommendations",
      "Travel documentation assistance",
      "Integration with Amadeus, Sabre"
    ]
  },
  {
    icon: Briefcase,
    title: "Professional Services",
    category: "Internal",
    description: "Schedule consultations, answer service inquiries, and manage client communications.",
    color: "text-slate-600",
    bg: "bg-slate-100 dark:bg-slate-900/30",
    features: [
      "Consultation booking with calendar sync",
      "Service package information",
      "Quote generation",
      "Client onboarding automation",
      "Document collection workflows"
    ]
  }
];

function SolutionsContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const filterParam = searchParams.get('filter')?.toLowerCase();
    const industryParam = searchParams.get('industry')?.toLowerCase();

    if (filterParam) {
      if (filterParam === 'support') setActiveCategory('Support');
      else if (filterParam === 'internal') setActiveCategory('Internal');
      else if (filterParam === 'commerce') setActiveCategory('Commerce');
    } else if (industryParam) {
      if (industryParam === 'healthcare') setActiveCategory('Voice');
      else if (industryParam === 'retail') setActiveCategory('Commerce');
      else if (industryParam === 'bfsi') setActiveCategory('Sales');
    }
  }, [searchParams]);

  const categories = ["All", "Support", "Voice", "Commerce", "Internal", "Sales"];

  const filteredSolutions = solutions.filter(solution =>
    activeCategory === "All" || solution.category === activeCategory
  );

  return (
    <main className="bg-background relative min-h-screen font-sans">
      {/* Global Grid Background */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>Infinite Possibilities</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-foreground"
          >
            Solutions for every <br />
            <span className="text-primary">Business Challenge</span>
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            From automating customer support to streamlining sales operations, discover how VerlyAI adapts to your specific needs.
          </p>
        </section>

        {/* Filter Section */}
        <section className="pb-12">
          <div className="flex flex-wrap justify-center gap-2 px-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/25 scale-105"
                    : "bg-white/50 dark:bg-slate-800/50 border border-border text-muted-foreground hover:bg-white hover:border-primary/30"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="pb-20 lg:pb-32 px-4">
          <div className={CONTENT_WIDTH}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredSolutions.map((solution, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    key={solution.title}
                    className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-border p-8 rounded-3xl hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
                      <solution.icon className="w-32 h-32 -mr-16 -mt-16 rotate-12" />
                    </div>

                    <div className={`w-14 h-14 rounded-2xl ${solution.bg} flex items-center justify-center ${solution.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <solution.icon className="w-7 h-7" />
                    </div>

                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-muted-foreground uppercase tracking-wide border border-border/50">
                        {solution.category}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {solution.title}
                    </h3>

                    <p className="type-body-muted leading-relaxed mb-8">
                      {solution.description}
                    </p>

                    <div className="mt-auto space-y-6">
                      <ul className="space-y-3">
                        {solution.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-start gap-2.5 type-body-muted">
                            <div className={`mt-1 rounded-full p-0.5 ${solution.bg}`}>
                              <CheckCircle2 className={`w-3 h-3 ${solution.color}`} />
                            </div>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center gap-3 pt-2">
                        <Link href="/login" className="flex-1">
                          <Button className="w-full rounded-xl bg-white dark:bg-slate-800 text-foreground border border-border hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm font-semibold group/btn">
                            Get Started
                            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                        <Link href="/docs">
                          <Button variant="ghost" size="icon" className="rounded-xl border border-transparent hover:border-border hover:bg-white/50 dark:hover:bg-slate-800/50">
                            <Sparkles className="w-4 h-4 text-muted-foreground" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section className="pb-20 lg:pb-32 px-4">
          <div className={CONTENT_WIDTH}>
            <Testimonial />
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}

export default function SolutionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SolutionsContent />
    </Suspense>
  );
}
