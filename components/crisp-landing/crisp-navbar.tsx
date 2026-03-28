"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CrispNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Features", hasDropdown: true },
    { label: "AI Agent", href: "#ai-showcase" },
    { label: "Apps", href: "#apps" },
    { label: "Pricing", href: "/pricing" },
    { label: "Integrations", href: "#integrations" },
    { label: "Help", hasDropdown: true },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <a href="#" className="block w-full bg-[#0B1536] text-white text-center py-2 px-4 z-50 relative hover:bg-[#131E46] transition-colors">
        <span className="inline-flex items-center justify-center gap-2.5 text-[14px] font-medium tracking-wide">
          <span className="bg-[#3E80F1] text-white text-[11px] font-bold px-2 py-0.5 rounded-[6px] tracking-wider">NEW</span>
          <span>
            Discover <span className="font-bold">hugo</span> - the brand new AI-powered support agent
          </span>
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
      </a>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-40 transition-all duration-200 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.04)] py-3" : "bg-transparent py-4"}`}>
        <div className="max-w-[1280px] mx-auto flex items-center justify-between px-6">
          {/* Left: Logo & Links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <svg className="w-7 h-7 text-[#3E80F1]" viewBox="0 0 32 32" fill="currentColor">
                <path d="M26.2 3.8C24.4 2.1 21.8 1 18.9 1c-4.6 0-8.8 2.5-11 6.3C5.5 8.7 3 11.8 3 15.6c0 1.9.6 3.8 1.6 5.3L2 28l7.6-2c1.7 1.1 3.7 1.7 5.9 1.7 2.1 0 4.1-.6 5.8-1.5 2.5-1.5 4.5-3.8 5.6-6.6a11.97 11.97 0 0 0 3.1-8 c0-3.1-1.3-5.9-3.8-7.8z"/>
              </svg>
              <span className="text-[22px] font-bold text-[#111827] tracking-tight">crisp</span>
            </Link>

            <div className="hidden lg:flex items-center gap-1.5">
              {navLinks.map((link) => (
                <div key={link.label} className="relative group">
                  {link.hasDropdown ? (
                    <button className="flex items-center gap-1.5 px-3 py-2 text-[15px] text-[#374151] hover:text-[#111827] font-semibold transition-colors rounded-lg hover:bg-black/5">
                      {link.label}
                      <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-900 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href={link.href!}
                      className="flex items-center px-3 py-2 text-[15px] text-[#374151] hover:text-[#111827] font-semibold transition-colors rounded-lg hover:bg-black/5"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Search, Login, CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search Box */}
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-[10px] text-gray-400 text-sm w-48 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search our website</span>
              <span className="ml-auto text-[10px] bg-white border border-gray-200 px-1.5 py-0.5 rounded shadow-sm text-gray-500 font-medium">⌘K</span>
            </button>

            <Link href="/login" className="px-4 py-2.5 text-[15px] text-[#111827] font-bold hover:bg-black/5 rounded-xl transition-colors">
              Log In
            </Link>
            
            <Link
              href="/signup"
              className="px-5 py-2.5 bg-[#3E80F1] text-white text-[15px] font-bold rounded-full hover:bg-[#2B6CE0] transition-all flex items-center gap-2 shadow-[0_2px_10px_rgba(62,128,241,0.3)]"
            >
              <span className="font-bold">Start Free Trial</span>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="px-6 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link key={link.label} href={link.href || "#"} className="block px-4 py-3 text-[#374151] font-semibold rounded-lg hover:bg-gray-50">
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Bottom Floating Menu (Center) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:block">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.5 }}
          className="bg-white/90 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-200/50 p-1.5 flex items-center gap-1"
        >
          <div className="pl-4 pr-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 70 56" className="text-gray-900" height="20px" width="20px">
              <path fill="currentColor" d="m27.377 44.368 11.027 11.53 8.597-13.663 22.813-2.48L66.132.284.214 7.447 3.895 46.92l23.482-2.552Z"></path>
            </svg>
          </div>
          <Link href="/signup" className="px-5 py-2 bg-[#3E80F1] hover:bg-[#2B6CE0] text-white text-[15px] font-medium rounded-full transition-colors flex items-center justify-center">
            <span className="font-medium">Get started for free</span>
          </Link>
          <Link href="/demo" className="px-5 py-2 bg-white hover:bg-gray-50 text-[#111827] text-[15px] font-medium rounded-full transition-colors mr-0.5 border border-white hover:border-gray-200 flex items-center justify-center">
            <span className="font-medium">Book a demo</span>
          </Link>
        </motion.div>
      </div>

      {/* Bottom Right Chat Widget Popup Placeholder */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
          className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-gray-100 p-5 w-[#320px] pointer-events-auto origin-bottom-right"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="font-bold text-[#111827] text-[15px] mb-1">Questions? Chat with us.</div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
                We are online
              </div>
            </div>
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden"><img src="https://i.pravatar.cc/100?img=1" alt="agent" /></div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden"><img src="https://i.pravatar.cc/100?img=2" alt="agent" /></div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-[#3E80F1] flex items-center justify-center text-white"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 32 32"><path d="M26.2 3.8C24.4 2.1 21.8 1 18.9 1c-4.6 0-8.8 2.5-11 6.3C5.5 8.7 3 11.8 3 15.6c0 1.9.6 3.8 1.6 5.3L2 28l7.6-2c1.7 1.1 3.7 1.7 5.9 1.7 2.1 0 4.1-.6 5.8-1.5 2.5-1.5 4.5-3.8 5.6-6.6a11.97 11.97 0 0 0 3.1-8 c0-3.1-1.3-5.9-3.8-7.8z"/></svg></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex-1 bg-[#3E80F1] hover:bg-[#2B6CE0] text-white px-4 py-2.5 rounded-full text-[14px] font-bold flex items-center justify-center gap-2 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 32 32"><path d="M26.2 3.8C24.4 2.1 21.8 1 18.9 1c-4.6 0-8.8 2.5-11 6.3C5.5 8.7 3 11.8 3 15.6c0 1.9.6 3.8 1.6 5.3L2 28l7.6-2c1.7 1.1 3.7 1.7 5.9 1.7 2.1 0 4.1-.6 5.8-1.5 2.5-1.5 4.5-3.8 5.6-6.6a11.97 11.97 0 0 0 3.1-8 c0-3.1-1.3-5.9-3.8-7.8z"/></svg>
              Chat with Crisp
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-[#111827] px-4 py-2.5 rounded-full text-[14px] font-bold flex items-center gap-2 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Search
            </button>
          </div>
        </motion.div>
        
        <button className="w-14 h-14 bg-[#3E80F1] hover:bg-[#2B6CE0] rounded-full shadow-lg flex items-center justify-center text-white pointer-events-auto transform hover:scale-105 transition-all">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      </div>
    </>
  );
}
