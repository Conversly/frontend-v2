import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  Headphones,
  Briefcase,
  Users,
  Building2,
  HeartPulse,
  ShoppingBag,
  Book,
  HelpCircle,
  Newspaper,
  ChevronDown,
  Mic,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NavbarAuthActions from "@/components/landing/navbar-auth-actions";
import NavbarScrollBehavior from "@/components/landing/navbar-scroll-behavior";

export default function Navbar() {
  return (
    <>
      <nav
        id="marketing-navbar"
        className="fixed left-0 right-0 top-0 z-50 mx-auto flex h-[74px] w-full -translate-y-[150%] items-center rounded-none border border-slate-200 bg-white text-slate-900 shadow-[0_18px_48px_rgba(15,23,42,0.12)] transition-transform duration-300 lg:top-6 lg:max-w-7xl lg:rounded-[47px]"
      >
        <div className="mx-auto flex h-full w-full items-center justify-between px-6">
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

          <div className="hidden items-center gap-6 md:flex">
            <Link className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900" href="/about">
              About
            </Link>
            <Link className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900" href="/features">
              Features
            </Link>
            <Link className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900" href="/pricing">
              Pricing
            </Link>
            <Link className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900" href="/compare">
              Compare
            </Link>
            <Link className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900" href="/why-verly">
              Why Verly
            </Link>
            <Link className="relative flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900" href="/voice">
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
              <PopoverContent className="w-auto border-0 bg-transparent p-0 shadow-none" align="start" sideOffset={10}>
                <div className="flex w-[1100px] rounded-[20px] border border-slate-200 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.14)]">
                  <div className="flex-1">
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
                            <div className="flex items-center gap-1 text-[13px] font-semibold text-slate-800 transition-colors group-hover:text-blue-700">
                              {item.label}
                              <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 text-blue-600 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                            </div>
                            <p className="truncate text-[11px] text-slate-500">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="w-[300px] shrink-0 border-l border-slate-100 p-2">
                    <div className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl">
                      <Link href="/voice" className="absolute inset-0 z-20" />
                      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <Image
                        src="/create_chatbot_voice.png"
                        alt="Voice AI Agents — deploy human-like voice assistants"
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="relative z-20 mt-auto p-5 text-white">
                        <div className="mb-2 inline-flex rounded-full border border-blue-400/30 bg-blue-600/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm">
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
              <PopoverContent className="w-auto border-0 bg-transparent p-0 shadow-none" align="start" sideOffset={10}>
                <div className="overflow-hidden rounded-[20px] border border-border bg-white shadow-lg dark:bg-slate-950">
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <Link
                        className="group relative flex h-full w-full select-none flex-col justify-end overflow-hidden rounded-lg border border-primary/20 bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus:shadow-md"
                        href="/about"
                      >
                        <div className="relative z-10 mb-2 mt-4 text-lg font-medium text-white">
                          About VerlyAI
                        </div>
                        <p className="relative z-10 text-sm leading-tight text-white/90">
                          Building the intelligence layer for global customer support.
                        </p>
                        <div className="absolute right-[-20px] top-[-20px] opacity-20 transition-opacity duration-300 group-hover:opacity-40">
                          <Sparkles className="h-32 w-32 text-white" />
                        </div>
                        <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-transparent" />
                      </Link>
                    </li>
                    {[
                      {
                        href: "/docs",
                        icon: Book,
                        title: "Documentation",
                        description: "Guides, API Reference, and SDKs.",
                        iconClassName: "bg-blue-50 text-blue-600 dark:bg-blue-900/20",
                      },
                      {
                        href: "/faq",
                        icon: HelpCircle,
                        title: "FAQ Center",
                        description: "FAQs and support for common issues.",
                        iconClassName: "bg-purple-50 text-purple-600 dark:bg-purple-900/20",
                      },
                      {
                        href: "/blogs",
                        icon: Newspaper,
                        title: "Blog",
                        description: "Latest updates and industry insights.",
                        iconClassName: "bg-orange-50 text-orange-600 dark:bg-orange-900/20",
                      },
                    ].map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="group block rounded-lg p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900">
                          <div className="flex items-start gap-4">
                            <div className={`mt-1 rounded-lg p-2 shadow-sm transition-colors group-hover:bg-opacity-80 ${item.iconClassName}`}>
                              <item.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-1 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                                {item.title}
                                <ArrowRight className="h-3 w-3 -translate-x-2 opacity-0 text-primary transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                              </div>
                              <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center gap-4">
            <NavbarAuthActions />
          </div>
        </div>
      </nav>
      <NavbarScrollBehavior targetId="marketing-navbar" />
    </>
  );
}
