'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Mail, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { openCalendlyPopup } from "@/lib/calendly";

const exploreLinks = [
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Solutions", href: "/solutions" },
];

const companyLinks = [
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blogs" },
  { name: "Help", href: "/help" },
  { name: "Documentation", href: "/docs" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Data Deletion Policy", href: "/deletion" },
];

const socialLinks = [
  { name: "X", icon: XIcon, href: "https://x.com/VerlyAI" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/verlyai/" },
];

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
      <div
        className="relative"
        style={{
          background:
            "linear-gradient(to bottom, #ffffff 0%, #f7fbff 12.5%, #edf5ff 25%, #d6eaff 37.5%, #b3d7ff 50%, #80bfff 62.5%, #4d94ff 75%, #0056b3 87.5%, #000000 100%)",
        }}
      >
        <div className="relative pb-14 pt-24 md:pb-16 md:pt-24">
          <motion.div
            className="mx-auto max-w-4xl px-4 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mx-auto max-w-[780px] text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-foreground md:text-5xl lg:text-6xl">
              If you&apos;ve come this far,
              <span className="block">let&apos;s talk.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[440px] text-lg font-medium leading-8 text-foreground/80 md:text-xl">
              Schedule a quick call and see how Verly fits your support workflow.
            </p>
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                asChild
                size="lg"
                className="group h-12 gap-2 bg-foreground px-6 text-base text-background transition-all duration-300 hover:bg-foreground/90 hover:shadow-md"
              >
                <button
                  className="flex items-center gap-2"
                  onClick={() => {
                    void openCalendlyPopup();
                  }}
                >
                  <Calendar className="h-5 w-5" />
                  Book a demo
                </button>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-[#010309]">
        <div className="mx-auto w-[95%] max-w-[1200px] px-4 py-12 md:w-[85%] lg:w-[80%]">
          <motion.div
            className="mb-9 grid grid-cols-1 gap-10 md:grid-cols-[1.35fr_0.72fr_0.72fr_0.95fr] md:gap-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src="/verly_logo.png"
                  alt="VerlyAI Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
                <div>
                  <p className="text-[15px] font-semibold text-white">VerlyAI</p>
                  <p className="text-[13px] text-white/40">AI customer support platform</p>
                </div>
              </div>

              <p className="mt-8 max-w-[440px] text-[15px] leading-8 text-white/58 md:text-[16px]">
                Verly helps support teams automate repetitive support, keep human context in the
                loop, and manage voice, WhatsApp, and web chat from one place.
              </p>

              <a
                href="mailto:team@verlyai.xyz"
                className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[15px] text-white/68 transition-colors hover:text-white"
              >
                <Mail className="h-5 w-5" />
                team@verlyai.xyz
              </a>
            </div>

            <FooterColumn title="Explore" links={exploreLinks} />
            <FooterColumn title="Company" links={companyLinks} />

            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-white">
                Legal & social
              </h3>
              <ul className="space-y-4">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm leading-6 text-white/50 transition-colors duration-200 hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-all duration-300 hover:bg-white/20 hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="border-t border-white/10 pt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="text-sm leading-6 text-white/50">
                © {new Date().getFullYear()} VerlyAI. All rights reserved.
              </p>
              <p className="max-w-[560px] text-sm leading-6 text-white/35 md:text-right">
                Built for support teams managing voice, WhatsApp, and web chat in one place.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ name: string; href: string }>;
}) {
  return (
    <div>
      <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-white">{title}</h3>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-sm leading-6 text-white/50 transition-colors duration-200 hover:text-white"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
