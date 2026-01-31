'use client';
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles, ArrowRight,
  Headphones, Briefcase, Users, Building2, HeartPulse, ShoppingBag,
  Book, HelpCircle, Newspaper, ChevronDown
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
        border border-border/40 shadow-lg bg-background/60 backdrop-blur-md text-foreground 
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
            <span className="font-bold text-xl">VerlyAI</span>
          </Link>

          {/* Navigation Links */}
          {/* Mega Menu Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/about" className="h-auto py-2 px-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="h-auto py-2 px-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-transparent data-[state=open]:text-primary data-[state=open]:bg-transparent group">
                  Solutions
                  <ChevronDown className="ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-transparent border-0 shadow-none" align="start" sideOffset={10}>
                <div className="grid grid-cols-[1fr_1fr_350px] gap-6 p-8 w-[1100px] bg-white dark:bg-slate-950 rounded-[20px] border border-border shadow-lg">

                  {/* Column 1: Use Cases */}
                  <div className="space-y-6">
                    <h4 className="font-bold text-base leading-none mb-4 text-foreground flex items-center gap-2">
                      By Use Cases
                      <Badge variant="secondary" className="text-2xs h-5 px-1.5 rounded-md font-normal">Popular</Badge>
                    </h4>
                    <ul className="space-y-4">
                      <li>
                        <Link href="/solutions?filter=support" className="block group p-2 -ml-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                          <div className="flex items-start gap-4">
                            <div className="mt-1 p-2.5 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/20 group-hover:bg-blue-100 transition-colors shadow-sm selection:bg-blue-100">
                              <Headphones className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-base font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                                Customer Service
                                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">Automate & personalize customer support with 24/7 AI agents.</p>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/solutions?filter=internal" className="block group p-2 -ml-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                          <div className="flex items-start gap-4">
                            <div className="mt-1 p-2.5 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-900/20 group-hover:bg-purple-100 transition-colors shadow-sm">
                              <Briefcase className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-base font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                                Employee Experience
                                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">Enrich & elevate employee experience with internal helpdesk bots.</p>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/solutions?filter=commerce" className="block group p-2 -ml-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                          <div className="flex items-start gap-4">
                            <div className="mt-1 p-2.5 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 group-hover:bg-indigo-100 transition-colors shadow-sm">
                              <Users className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-base font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                                Marketing Automation
                                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">Engage customers with personalized campaigns and proactive outreach.</p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Column 2: Industry */}
                  <div className="space-y-6 h-full border-l border-border/50 pl-6">
                    <h4 className="font-bold text-base leading-none mb-4 text-foreground">By Industry</h4>
                    <ul className="space-y-4">
                      <li>
                        <Link href="/solutions?industry=bfsi" className="block group p-2 -ml-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                          <div className="flex items-start gap-4">
                            <div className="mt-1 p-2.5 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 group-hover:bg-emerald-100 transition-colors shadow-sm">
                              <Building2 className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-base font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                                BFSI
                                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">Banking, Financial Services & Insurance automation solutions.</p>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/solutions?industry=healthcare" className="block group p-2 -ml-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                          <div className="flex items-start gap-4">
                            <div className="mt-1 p-2.5 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-900/20 group-hover:bg-rose-100 transition-colors shadow-sm">
                              <HeartPulse className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-base font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                                Healthcare
                                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">Patient engagement, appointment scheduling & support.</p>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/solutions?industry=retail" className="block group p-2 -ml-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                          <div className="flex items-start gap-4">
                            <div className="mt-1 p-2.5 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-900/20 group-hover:bg-amber-100 transition-colors shadow-sm">
                              <ShoppingBag className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-base font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                                Retail & E-commerce
                                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">Drive sales, recovery carts & support shoppers instantly.</p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Column 3: Spotlight */}
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-1 flex flex-col h-full border border-border/50">
                    <div className="flex-1 relative overflow-hidden rounded-xl group cursor-pointer">
                      <Link href="/solutions" className="absolute inset-0 z-20"></Link>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-300" />
                      <Image
                        src="/create_chatbot_voice.png"
                        alt="Feature Spotlight"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute bottom-0 left-0 w-full p-6 z-20 text-white transform transition-transform duration-300 group-hover:-translate-y-1">
                        <div className="bg-blue-600/90 backdrop-blur-sm text-2xs font-bold px-2.5 py-1 rounded-full w-fit mb-3 border border-blue-400/30 shadow-lg">NEW FEATURE</div>
                        <h4 className="font-bold text-xl mb-2 leading-tight">Voice AI Agents</h4>
                        <p className="text-sm text-gray-200 mb-4 line-clamp-3">Deploy human-like voice assistants that can handle complex calls in minutes.</p>
                        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-lg transition-colors border border-white/10">
                          Watch Demo <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="h-auto py-2 px-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-transparent data-[state=open]:text-primary data-[state=open]:bg-transparent group">
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
                              Help Center
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
                      <Link href="/blog" className="block group p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
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
                  <Button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_100%] animate-[shimmer_2.5s_linear_infinite] px-6 font-semibold text-primary-foreground shadow-[0_4px_14px_0_rgba(0,118,255,0.39)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(0,118,255,0.23)] hover:-translate-y-0.5 hover:scale-[1.02]">
                    <span className="relative z-10 flex items-center gap-2">
                      Get started
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>

              </>
            )}
          </div>
        </div>
      </nav>
    )
  );
}
