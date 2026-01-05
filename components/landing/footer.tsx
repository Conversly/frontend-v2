'use client';
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Linkedin, Mail, Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

const teamContacts = [
  {
    name: "Shashank Tyagi",
    title: "Co-founder & CTO",
    email: "tyagishashank118@gmail.com",
    phone: "+91 9528921966",
  },
  {
    name: "Raghvendra Singh Dhakad",
    title: "Co-founder & CEO",
    email: "raghvendra.dhakad@verlyai.com",
    phone: "+91 9876543210",
  },
]

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Data Deletion Policy", href: "/deletion" },
]

const socialLinks = [
  { name: "X", icon: XIcon, href: "https://x.com/VerlyAI" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/verlyai/" },
]

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}


export default function Footer() {
  return (
    <footer className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden">
      {/* Gradient transition section - White to Black */}
      <div className="relative bg-gradient-to-b from-white via-blue-50 via-30% via-blue-200 via-50% via-blue-400 via-70% to-black">
        <div className="relative pt-20 pb-16">
          <motion.div 
            className="text-center max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
              if you have come this far : let&apos;s talk!
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
              schedule a call with us!
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                asChild
                size="lg"
                className="group gap-2 h-12 px-6 text-base bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 hover:shadow-md"
              >
                <a
                  href="https://calendly.com/verlyai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="w-5 h-5" />
                  Schedule a call
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer Links Section */}
      <div className="relative bg-black border-t border-white/10">
        <div className="w-[95%] md:w-[85%] lg:w-[80%] max-w-[1200px] mx-auto py-16 px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Contact Us */}
            <div>
              <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Contact Us</h3>
              <div className="space-y-4">
                {teamContacts.map((contact) => (
                  <div key={contact.name} className="space-y-1">
                    <p className="text-white/80 font-medium">{contact.name}</p>
                    <p className="text-white/40 text-xs">{contact.title}</p>
                    <a 
                      href={`mailto:${contact.email}`}
                      className="text-white/50 hover:text-white text-sm flex items-center gap-2 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      {contact.email}
                    </a>
                    <a 
                      href={`tel:${contact.phone.replace(/\s/g, '')}`}
                      className="text-white/50 hover:text-white text-sm flex items-center gap-2 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      {contact.phone}
                    </a>
                  </div>
                ))}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-white/80 font-medium mb-1">Official Email</p>
                  <a 
                    href="mailto:verlyai.workspace@gmail.com"
                    className="text-white/50 hover:text-white text-sm flex items-center gap-2 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    verlyai.workspace@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Legal</h3>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Connect</h3>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
              <p className="text-white/40 text-sm mt-4">
                Follow us for updates and news
              </p>
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/verly_logo.png"
                  alt="VerlyAI Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
                <span className="text-white/50 text-sm">
                  © {new Date().getFullYear()} VerlyAI. All rights reserved.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
