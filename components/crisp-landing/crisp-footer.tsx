'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Mail, Calendar, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { openCalendlyPopup } from "@/lib/calendly";

const exploreLinks = [
  { name: "Why Verly", href: "/why-verly" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Solutions", href: "/solutions" },
];

const companyLinks = [
  { name: "About", href: "/about" },
  { name: "Help", href: "/help" },
];

const webLinks = [
  { name: "Docs", href: "https://docs.verlyai.xyz" },
  { name: "Blogs", href: "https://verlyai.xyz/blogs" },
  { name: "Voice", href: "https://verlyai.xyz/voice" },
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

export function FooterCta() {
  return (
    <div
      className="relative"
      style={{
        background:
          "linear-gradient(to bottom, #ffffff 0%, #f7fbff 12.5%, #edf5ff 25%, #d6eaff 37.5%, #b3d7ff 50%, #80bfff 62.5%, #4d94ff 75%, #0056b3 87.5%, #000000 100%)",
      }}
    >
      <div className="relative pb-14 pt-24 md:pb-16 md:pt-28">
        <motion.div
          className="mx-auto max-w-5xl px-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex rounded-full border border-black/10 bg-white/55 px-4 py-1 text-sm font-medium text-foreground/70 backdrop-blur-sm">
            Ready to see Verly live?
          </span>
          <h2 className="mx-auto mt-6 max-w-[860px] text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-foreground md:text-5xl lg:text-6xl">
            Turn support conversations into
            <span className="block">faster resolutions.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-base font-medium leading-7 text-foreground/75 md:text-xl md:leading-8">
            Book a quick walkthrough to see how Verly helps teams handle voice, WhatsApp,
            and web chat from one streamlined support workflow.
          </p>
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mx-auto flex max-w-max flex-col items-center gap-4 sm:flex-row">
              <Button
                size="lg"
                onClick={() => void openCalendlyPopup()}
                className="h-12 min-w-[190px] rounded-full bg-[#111111] px-7 text-base text-white shadow-[0_12px_30px_rgba(17,17,17,0.18)] transition-all duration-300 hover:bg-[#222222]"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book a demo
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 min-w-[190px] rounded-full border-black/10 bg-white/14 px-7 text-base text-foreground backdrop-blur-sm transition-all duration-300 hover:bg-white/24"
              >
                <Link href="/login">
                  Start building
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-sm font-medium text-foreground/55">
              Quick walkthrough. Clear use cases. No pressure.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function FooterBase() {
  return (
    <div className="relative border-t border-white/10 bg-[#010309]">
      <div className="mx-auto w-[95%] max-w-[1120px] px-4 py-12 md:w-[85%] lg:w-[80%]">
        <motion.div
          className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-[1.45fr_0.8fr_0.95fr_1fr] md:gap-12"
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

            <p className="mt-6 max-w-[410px] text-[15px] leading-8 text-white/58 md:text-[16px]">
              Unified AI support for voice, WhatsApp, and web chat with human handoff built in.
            </p>

            <a
              href="mailto:team@verlyai.xyz"
              className="mt-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-[15px] text-white/68 transition-colors hover:text-white"
            >
              <Mail className="h-5 w-5" />
              team@verlyai.xyz
            </a>
          </div>

          <FooterColumn title="Explore" links={exploreLinks} />

          <div>
            <FooterColumn title="Company" links={companyLinks} />

            <div className="mt-9">
              <FooterColumn title="Web" links={webLinks} compact horizontal />
            </div>
          </div>

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

            <div className="mt-7 flex items-center gap-3">
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

            <p className="mt-5 max-w-[220px] text-sm leading-7 text-white/38">
              Follow Verly for product updates and support workflow insights.
            </p>
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
            <p className="max-w-[520px] text-sm leading-6 text-white/35 md:text-right">
              Built for support teams managing voice, WhatsApp, and web chat in one place.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Footer({ hideCta = false }: { hideCta?: boolean }) {
  return (
    <footer className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
      {!hideCta && <FooterCta />}
      <FooterBase />
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  compact = false,
  horizontal = false,
}: {
  title: string;
  links: Array<{ name: string; href: string }>;
  compact?: boolean;
  horizontal?: boolean;
}) {
  return (
    <div>
      <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-white">{title}</h3>
      <ul
        className={
          horizontal
            ? "flex flex-wrap gap-x-5 gap-y-3"
            : compact
              ? "space-y-3.5"
              : "space-y-4"
        }
      >
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-sm leading-6 text-white/50 transition-colors duration-200 hover:text-white"
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
