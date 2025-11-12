"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Zap, Shield, Sparkles, Star, ArrowRight, Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";
import { GoogleAuth } from "@/components/auth";
import { useAuth } from "@/store/auth";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";

const testimonials = [
  {
    id: 1,
    author: "Sarah Chen",
    role: "Product Manager at TechCorp",
    avatar: "SC",
    content:
      "Verly transformed how we handle customer support. The AI chatbot reduced our response time by 70% and our customers love the instant responses.",
    rating: 5,
  },
  {
    id: 2,
    author: "Michael Rodriguez",
    role: "CEO at StartupXYZ",
    avatar: "MR",
    content:
      "Building a chatbot has never been easier. We went from idea to deployment in just 2 hours. The customization options are incredible!",
    rating: 5,
  },
  {
    id: 3,
    author: "Emily Watson",
    role: "Marketing Director",
    avatar: "EW",
    content:
      "The lead generation features are game-changing. We've seen a 3x increase in qualified leads since implementing Verly on our website.",
    rating: 5,
  },
];

const features = [
  { icon: Zap, text: "Deploy in minutes, not weeks", color: "text-purple-500" },
  { icon: Shield, text: "Enterprise-grade security", color: "text-blue-500" },
  { icon: Sparkles, text: "AI-powered conversations", color: "text-pink-500" },
];

const benefits = ["No credit card required", "14-day free trial", "Cancel anytime"];

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Testimonial carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (mounted) {
      const isLoggedIn = localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN) === "true";
      if (isLoggedIn && user) {
        router.push("/chatbot");
      }
    }
  }, [mounted, user, router]);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // Don't render login form if already authenticated
  const isLoggedIn = localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN) === "true";
  if (isLoggedIn && user) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Left Side (Branding + Testimonials) */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden border-r border-border/50">
        {/* Enhanced Animated Background with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/8 via-blue-500/6 to-pink-500/8 animate-gradient" />
        
        {/* Animated Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-primary/30 to-purple-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/25 to-pink-500/20 rounded-full blur-3xl animate-float-delay" />
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-purple-500/15 to-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-pink-500/20 to-blue-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-32 right-20 w-2 h-2 bg-primary rounded-full animate-ping" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-40 left-32 w-3 h-3 bg-purple-500 rounded-full animate-ping" style={{ animationDelay: '2.5s' }} />
          <div className="absolute top-1/2 right-40 w-2 h-2 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: '4s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full max-w-2xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-purple-500 to-pink-500 shadow-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ring-2 ring-primary/20">
                <span className="text-2xl font-bold text-primary-foreground drop-shadow-lg">V</span>
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-foreground via-primary to-purple-500 bg-clip-text text-transparent tracking-tight group-hover:scale-105 transition-transform duration-300">VerlyAI</span>
          </Link>

          {/* Testimonial Carousel */}
          <div className="flex-1 flex flex-col justify-center py-16">
            <div key={currentTestimonial} className="space-y-8 animate-fade-in">
              <div className="space-y-6 relative">
                {/* Decorative Quote Mark */}
                <div className="absolute -top-4 -left-4 text-6xl font-serif text-primary/10 select-none">"</div>
                
                <div className="flex gap-1.5">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-6 h-6 fill-primary text-primary drop-shadow-sm animate-pulse" 
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                <blockquote className="text-2xl md:text-3xl font-semibold text-foreground leading-relaxed tracking-tight relative z-10 pl-4">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
              </div>

              <div className="flex items-center gap-4 pt-4 group/author">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-500 to-pink-500 rounded-full blur-lg opacity-50 group-hover/author:opacity-75 transition-opacity" />
                  <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary via-purple-500 to-purple-600 flex items-center justify-center shadow-xl ring-4 ring-primary/20 group-hover/author:ring-primary/40 group-hover/author:scale-110 transition-all duration-300">
                    <span className="text-xl font-bold text-primary-foreground drop-shadow-md">
                      {testimonials[currentTestimonial].avatar}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-foreground text-lg group-hover/author:text-primary transition-colors">
                    {testimonials[currentTestimonial].author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-6">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300 relative overflow-hidden",
                      idx === currentTestimonial
                        ? "w-8 bg-gradient-to-r from-primary to-purple-500 shadow-lg shadow-primary/50"
                        : "w-2 bg-primary/20 hover:bg-primary/40 hover:w-4"
                    )}
                    aria-label={`View testimonial ${idx + 1}`}
                  >
                    {idx === currentTestimonial && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-3 text-sm group cursor-default"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:shadow-primary/20">
                    <feature.icon className={cn("w-5 h-5 drop-shadow-sm", feature.color)} />
                  </div>
                </div>
                <span className="text-muted-foreground group-hover:text-foreground group-hover:font-medium transition-all duration-300">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side (Login Form) */}
      <div className="flex w-full md:w-1/2 flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 bg-background overflow-y-auto relative">
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />
        
        {/* Mobile Logo */}
        <div className="md:hidden mb-12 flex justify-center relative z-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-primary via-purple-500 to-pink-500 shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ring-2 ring-primary/20">
                <span className="text-xl font-bold text-primary-foreground drop-shadow-lg">V</span>
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-foreground via-primary to-purple-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">VerlyAI</span>
          </Link>
        </div>

        {/* Login Form Content */}
        <div className="w-full max-w-md mx-auto space-y-8 animate-fade-in relative z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-2">
              <Sparkle className="w-3 h-3 animate-pulse" />
              <span>Trusted by 10,000+ companies</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-purple-500 bg-clip-text text-transparent tracking-tight leading-tight">
              Welcome back
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              Sign in to your account to continue building amazing chatbots
            </p>
          </div>

          <div className="flex flex-col gap-3 py-2 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-xl p-4 border border-primary/10 backdrop-blur-sm">
            {benefits.map((benefit, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-3 text-sm text-muted-foreground group/benefit hover:text-foreground transition-colors duration-200"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm opacity-0 group-hover/benefit:opacity-100 transition-opacity" />
                  <CheckCircle2 className="relative w-5 h-5 text-primary flex-shrink-0 drop-shadow-sm group-hover/benefit:scale-110 transition-transform duration-200" />
                </div>
                <span className="group-hover/benefit:font-medium transition-all">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Google Sign In - Only Option */}
          <div className="pt-4 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-lg opacity-20 group-hover:opacity-30 blur transition-opacity duration-300" />
            <div className="relative">
              <GoogleAuth className="w-full" />
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground pt-2">
            Don't have an account?{" "}
            <Link 
              href="/" 
              className="font-semibold text-primary hover:text-purple-500 inline-flex items-center gap-1 group transition-all duration-200"
            >
              Sign up for free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          <div className="text-center text-xs text-muted-foreground leading-relaxed pt-4 space-y-1">
            <p>
              By signing in, you agree to our{" "}
              <Link 
                href="/terms" 
                className="underline hover:text-primary transition-colors duration-200 font-medium"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link 
                href="/privacy" 
                className="underline hover:text-primary transition-colors duration-200 font-medium"
              >
                Privacy Policy
              </Link>
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Shield key={i} className="w-3 h-3 text-primary/60" />
                ))}
              </div>
              <span className="text-[10px]">Enterprise-grade security</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
