'use client';
import Link from "next/link"
import { motion } from "framer-motion"
import { Linkedin } from "lucide-react"

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Integrations", href: "#" },
    { name: "API", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#" },
  ],
  resources: [
    { name: "Documentation", href: "#" },
    { name: "Help Center", href: "#" },
    { name: "Tutorials", href: "#" },
    { name: "Status", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ],
}

const socialLinks = [
  { name: "X", icon: XIcon, href: "https://x.com/VerlyAI" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/verlyai/" },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-background text-foreground relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/20 via-background to-transparent opacity-30" />
        <div className="absolute inset-0 bg-grid-foreground/5 [mask-image:radial-gradient(black,transparent_70%)]" />
      </div>

      {/* Main Footer */}
      <div className="relative mx-auto w-full py-16">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <FooterSection title="Product" links={footerLinks.product} />
          <FooterSection title="Company" links={footerLinks.company} />
          <FooterSection title="Resources" links={footerLinks.resources} />
          <FooterSection title="Legal" links={footerLinks.legal} />
        </motion.div>

        {/* Social Links & Copyright */}
        <motion.div
          className="pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              {socialLinks.map((social, index) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-muted-foreground">All systems operational</span>
            </div>
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} VerlyAI. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
    </footer>
  )
}

function FooterSection({ title, links }: { title: string; links: { name: string; href: string }[] }) {
  return (
    <motion.div variants={item}>
      <h3 className="text-foreground font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

