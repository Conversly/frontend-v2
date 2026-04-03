'use client';
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles, ArrowRight,
  Headphones, Briefcase, Users, Building2, HeartPulse, ShoppingBag,
  Book, HelpCircle, Newspaper, ChevronDown, Mic
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getLoggedInUser } from "@/lib/api/user";
import { getUserWorkspaces } from "@/lib/api/workspaces";
import { QUERY_KEY } from "@/utils/query-key";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";


export default function Navbar() {
  const { user, logout, setUser } = useAuth();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const queryClient = useQueryClient();


  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: fetchedUser } = useQuery({
    queryKey: [QUERY_KEY.LOGGED_IN_USER],
    queryFn: async () => {
      return await getLoggedInUser();
    },
    enabled: mounted,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (fetchedUser) {
      setUser({
        ...fetchedUser,
        name: fetchedUser.displayName || "",
        username: fetchedUser.username || "",
        avatarUrl: fetchedUser.avatarUrl || null,
      });
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN, "true");
      } catch { }
    }
  }, [fetchedUser, setUser]);

  const { data: workspaces } = useQuery({
    queryKey: [QUERY_KEY.GET_WORKSPACES],
    queryFn: async () => await getUserWorkspaces(),
    enabled: mounted && !!user,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const dashboardHref = workspaces?.[0]?.workspaceId
    ? `/${workspaces[0].workspaceId}/chatbot`
    : "/";


  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const scrollContainer = document.getElementById('main-scroll-container') || window;

    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = scrollContainer === window
          ? window.scrollY
          : (scrollContainer as HTMLElement).scrollTop;

        if (currentScrollY < 10) {
          setIsVisible(true);
        } else {
          // Check if scrolling down
          if (currentScrollY > lastScrollY.current) {
            setIsVisible(false);
          } else {
            // Check if scrolling up
            setIsVisible(true);
          }
        }

        lastScrollY.current = currentScrollY;
      }
    };

    scrollContainer.addEventListener('scroll', controlNavbar);

    return () => {
      scrollContainer.removeEventListener('scroll', controlNavbar);
    };
  }, []);

  return (
    mounted && (
      <nav
        className={`fixed left-0 right-0 mx-auto z-50 transition-transform duration-300
        h-[74px] flex items-center
        top-0 w-full rounded-none
        lg:top-6 lg:max-w-7xl lg:rounded-[47px]
        border border-slate-200 shadow-[0_18px_48px_rgba(15,23,42,0.12)] bg-white text-slate-900
        ${isVisible ? 'translate-y-0' : '-translate-y-[150%]'
          }`}
      >
        <div className="mx-auto flex w-full h-full items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/verly_logo.png"
              alt="VerlyAI Logo"
              width={139}
              height={33}
              className="h-10 w-auto object-contain"
            />
            <span className="text-xl font-bold text-slate-900">Verly</span>
          </Link>

          {/* Navigation Links */}
          {/* Mega Menu Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/about" className="h-auto rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900">
              About
            </Link>

            <Link href="/features" className="h-auto rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900">
              Features
            </Link>

            <Link href="/pricing" className="h-auto rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900">
              Pricing
            </Link>

            <Link href="/compare" className="h-auto rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900">
              Compare
            </Link>

            <Link
              href="/why-verly"
              className={`h-auto rounded-xl px-3 py-2 text-sm font-semibold transition-colors hover:bg-slate-100 hover:text-slate-900 ${
                pathname === "/why-verly"
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600"
              }`}
            >
              Why Verly
            </Link>

            <Link
              href="/voice"
              className={`relative h-auto rounded-xl px-3 py-2 text-sm font-semibold transition-colors hover:bg-slate-100 hover:text-slate-900 flex items-center gap-1.5 ${
                pathname === "/voice"
                  ? "bg-[#8af0be]/10 text-[#059669]"
                  : "text-slate-600"
              }`}
            >
              <Mic className="h-3.5 w-3.5" />
              Voice
              <span className="inline-flex items-center rounded-full bg-[#8af0be]/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#059669]">
                New
              </span>
            </Link>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="group h-auto rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 data-[state=open]:bg-slate-100 data-[state=open]:text-blue-600">
                  Solutions
                  <ChevronDown className="ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-transparent border-0 shadow-none" align="start" sideOffset={10}>
                <div className="flex w-[1100px] rounded-[20px] border border-slate-200 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.14)]">
                  {/* Left side — links */}
                  <div className="flex-1">
                    {/* Top bar — Enterprise + Sales Agent + All Solutions */}
                    <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
                      <Link href="/solutions/enterprise" className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#0B1536] to-[#1a2a5e] px-4 py-2.5 transition-all hover:shadow-lg hover:shadow-blue-900/20">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15">
                          <Building2 className="h-3.5 w-3.5 text-white" />
                        </div>
                        <div>
                          <div className="text-[12px] font-bold text-white">Enterprise</div>
                          <div className="text-[10px] text-white/60">Custom deployment & security</div>
                        </div>
                      </Link>
                      <Link href="/lead-agent" className="group flex items-center gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 transition-all hover:border-amber-300 hover:bg-amber-100/70">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-200 text-amber-700">
                          <Users className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <div className="text-[12px] font-bold text-amber-900 group-hover:text-amber-800">Lead Agent</div>
                          <div className="text-[10px] text-amber-600">AI-powered lead conversion</div>
                        </div>
                      </Link>
                      <Link href="/solutions" className="group flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 transition-all hover:border-blue-200 hover:bg-blue-50">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                          <Sparkles className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <div className="text-[12px] font-bold text-slate-800 group-hover:text-blue-700">All Solutions</div>
                          <div className="text-[10px] text-slate-500">Browse every industry</div>
                        </div>
                        <ArrowRight className="ml-auto h-3 w-3 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-600" />
                      </Link>
                    </div>

                    {/* Solutions grid */}
                    <div className="grid grid-cols-2 gap-x-0 gap-y-0 px-2 py-2">
                      {[
                        { href: "/solutions/e-commerce-retail", icon: ShoppingBag, label: "E-commerce & Retail", desc: "Order tracking, returns & product support", iconBg: "bg-blue-50 text-blue-600", hoverBg: "hover:bg-blue-50/60" },
                        { href: "/solutions/saas-platforms", icon: Briefcase, label: "SaaS Platforms", desc: "Tier 1 tickets, onboarding & billing", iconBg: "bg-purple-50 text-purple-600", hoverBg: "hover:bg-purple-50/60" },
                        { href: "/solutions/healthcare", icon: HeartPulse, label: "Healthcare", desc: "Scheduling, insurance & HIPAA compliance", iconBg: "bg-rose-50 text-rose-500", hoverBg: "hover:bg-rose-50/60" },
                        { href: "/solutions/restaurants-hospitality", icon: Headphones, label: "Restaurants & Hospitality", desc: "Reservations, menus & catering inquiries", iconBg: "bg-orange-50 text-orange-500", hoverBg: "hover:bg-orange-50/60" },
                        { href: "/solutions/real-estate", icon: Building2, label: "Real Estate", desc: "Lead qualification & tour scheduling", iconBg: "bg-teal-50 text-teal-600", hoverBg: "hover:bg-teal-50/60" },
                        { href: "/solutions/education", icon: Book, label: "Education", desc: "Admissions, aid & campus services", iconBg: "bg-indigo-50 text-indigo-600", hoverBg: "hover:bg-indigo-50/60" },
                        { href: "/solutions/travel-tourism", icon: Sparkles, label: "Travel & Tourism", desc: "Bookings, itineraries & travel updates", iconBg: "bg-sky-50 text-sky-600", hoverBg: "hover:bg-sky-50/60" },
                        { href: "/solutions/professional-services", icon: Users, label: "Professional Services", desc: "Client intake, scheduling & documents", iconBg: "bg-slate-100 text-slate-600", hoverBg: "hover:bg-slate-100/60" },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`group flex items-center gap-3.5 rounded-xl px-4 py-3 transition-colors ${item.hoverBg}`}
                        >
                          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.iconBg} transition-transform group-hover:scale-110`}>
                            <item.icon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1 text-[13px] font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                              {item.label}
                              <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600" />
                            </div>
                            <p className="text-[11px] text-slate-500 truncate">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>

                  </div>

                  {/* Right side — Spotlight image */}
                  <div className="w-[300px] shrink-0 border-l border-slate-100 p-2">
                    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl group cursor-pointer">
                      <Link href="/voice" className="absolute inset-0 z-20" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                      <Image
                        src="/create_chatbot_voice.png"
                        alt="Voice AI Agents — deploy human-like voice assistants"
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="relative z-20 mt-auto p-5 text-white">
                        <div className="mb-2 inline-flex rounded-full bg-blue-600/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm border border-blue-400/30">
                          New Feature
                        </div>
                        <h4 className="text-lg font-bold leading-tight">Voice AI Agents</h4>
                        <p className="mt-1.5 text-[12px] leading-relaxed text-white/80">
                          Deploy human-like voice assistants that handle complex calls in minutes.
                        </p>
                        <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/15 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md transition-colors hover:bg-white/25">
                          Learn more <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="group h-auto rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 data-[state=open]:bg-slate-100/90 data-[state=open]:text-blue-600">
                  Resources
                  <ChevronDown className="ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-transparent border-0 shadow-none" align="start" sideOffset={10}>
                <div className="bg-white dark:bg-slate-950 rounded-[20px] border border-border shadow-lg overflow-hidden">
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md relative overflow-hidden group border border-primary/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                        href="/about"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium text-white relative z-10">
                          About VerlyAI
                        </div>
                        <p className="text-sm leading-tight text-white/90 relative z-10">
                          Building the intelligence layer for global customer support.
                        </p>
                        <div className="absolute right-[-20px] top-[-20px] opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                          <Sparkles className="w-32 h-32 text-white" />
                        </div>
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                      </Link>
                    </li>
                    <li>
                      <Link href="/docs" className="block group p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="mt-1 p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20 group-hover:bg-blue-100 transition-colors shadow-sm">
                            <Book className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                              Documentation
                              <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                              Guides, API Reference, and SDKs.
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq" className="block group p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="mt-1 p-2 rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-900/20 group-hover:bg-purple-100 transition-colors shadow-sm">
                            <HelpCircle className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                              FAQ Center
                              <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                              FAQs and support for common issues.
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/blogs" className="block group p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="mt-1 p-2 rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-900/20 group-hover:bg-orange-100 transition-colors shadow-sm">
                            <Newspaper className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                              Blog
                              <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                              Latest updates and industry insights.
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </PopoverContent>
            </Popover>

            {/* <Link href="/help" className="h-auto py-2 px-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Help
            </Link> */}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link href={dashboardHref}>
                  <Button variant="outline" className="rounded-full">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="rounded-full"
                  onClick={() => logout(queryClient)}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button className="group relative overflow-hidden rounded-full border border-blue-600/70 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-6 font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.34)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:from-[#1d4ed8] hover:to-[#1e40af] hover:shadow-[0_16px_34px_rgba(37,99,235,0.42)]">
                    <span className="relative z-10 flex items-center gap-2">
                      Get started
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>

              </>
            )}
          </div>
        </div >
      </nav >
    )
  );
}
