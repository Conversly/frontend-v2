"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { MessageCircle, Phone, MessageSquare, Sparkles, ArrowRight } from "lucide-react"
import { GoogleAuth } from "@/components/auth"
import { useAuth } from "@/store/auth"
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key"

export default function LoginPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      const isLoggedIn = localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN) === "true"
      if (isLoggedIn && user) {
        router.push("/chatbot")
      }
    }
  }, [mounted, user, router])

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  const isLoggedIn = localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN) === "true"
  if (isLoggedIn && user) {
    return null
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[2000px] mx-auto min-h-screen">
        {/* Left Side - Login Form */}
        <div className="flex relative justify-center items-center p-4 md:p-8">
          <div className="flex relative justify-center flex-col max-w-md items-center gap-8 w-full max-h-[90vh] overflow-auto">
            {/* Logo and Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6 w-full"
            >
              <Link href="/" className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-accent shadow-lg shadow-primary/30">
                  <Sparkles className="text-primary-foreground" size={24} />
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    ContactAI
                  </span>
                  <div className="text-xs text-muted-foreground">Customer Support Platform</div>
                </div>
              </Link>

              <div className="space-y-3">
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-3xl font-bold leading-tight text-pretty"
                >
                  AI-Powered Customer Support
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-muted-foreground leading-relaxed text-sm"
                >
                  Connect with customers across WhatsApp, chatbots, and phone calls. All powered by intelligent AI.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/40 text-sm flex items-center gap-2 rounded-lg px-4 py-3 w-fit hover:from-primary/30 hover:to-accent/30 transition-all duration-300"
              >
                <Sparkles className="size-4 text-primary" />
                <span className="font-semibold text-foreground">No credit card required</span>
              </motion.div>
            </motion.div>

            {/* Sign In Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="w-full space-y-4"
            >
              <GoogleAuth className="w-full" />

              <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group">
                Continue with Email
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Divider */}
            <div className="flex items-center w-full">
              <div className="flex-1 border-t border-border/50" />
              <span className="mx-3 text-xs text-muted-foreground tracking-wider uppercase font-medium">Features</span>
              <div className="flex-1 border-t border-border/50" />
            </div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="w-full space-y-3"
            >
              <div className="grid grid-cols-1 gap-3">
                <FeatureItem icon={<MessageCircle size={18} />} text="WhatsApp Integration" />
                <FeatureItem icon={<MessageSquare size={18} />} text="AI Chatbot Widget" />
                <FeatureItem icon={<Phone size={18} />} text="Phone Call Support" />
              </div>
            </motion.div>

            {/* Footer Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-col gap-3 w-full pt-4 border-t border-border/30"
            >
              <div className="flex text-sm justify-center">
                <div className="flex items-center gap-2 w-fit justify-center flex-wrap">
                  <span className="text-muted-foreground">Don't have an account?</span>
                  <Link
                    href="/"
                    className="hover:underline text-primary transition-colors font-medium hover:text-primary/80"
                  >
                    Sign up for free
                  </Link>
                </div>
              </div>

              <div className="text-xs text-center text-muted-foreground max-w-xs mx-auto">
                By signing in, you accept our{" "}
                <Link href="/terms" className="underline hover:text-foreground transition-colors">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Tech Visualization */}
        <div className="hidden md:flex items-center justify-center p-8 bg-gradient-to-br from-card via-background to-card relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
            <div
              className="absolute bottom-20 left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float"
              style={{ animationDelay: "1s" }}
            />
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-rotate-slow" />
          </div>

          {/* Main Content */}
          <div className="relative z-10 w-full max-w-lg space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center space-y-2"
            >
              <h2 className="text-4xl font-bold text-pretty">Omnichannel Support</h2>
              <p className="text-muted-foreground">Connect with customers where they are</p>
            </motion.div>

            {/* Communication Nodes */}
            <div className="grid grid-cols-1 gap-6 relative">
              {/* WhatsApp Node */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                whileHover={{ scale: 1.05, translateY: -5 }}
                className="group"
              >
                <div className="bg-card border border-border/50 hover:border-primary/50 rounded-xl p-6 space-y-3 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/30 group-hover:border-primary/60 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                      <MessageCircle className="text-primary size-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">WhatsApp Messages</h3>
                      <p className="text-xs text-muted-foreground">Instant customer conversations</p>
                    </div>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-primary/50 to-transparent rounded-full" />
                </div>
              </motion.div>

              {/* Chatbot Node */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                whileHover={{ scale: 1.05, translateY: -5 }}
                className="group md:ml-8"
              >
                <div className="bg-card border border-border/50 hover:border-accent/50 rounded-xl p-6 space-y-3 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center border border-accent/30 group-hover:border-accent/60 group-hover:shadow-lg group-hover:shadow-accent/20 transition-all duration-300">
                      <MessageSquare className="text-accent size-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">AI Chatbots</h3>
                      <p className="text-xs text-muted-foreground">24/7 automated responses</p>
                    </div>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-accent/50 to-transparent rounded-full" />
                </div>
              </motion.div>

              {/* Phone Node */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.7 }}
                whileHover={{ scale: 1.05, translateY: -5 }}
                className="group"
              >
                <div className="bg-card border border-border/50 hover:border-secondary/50 rounded-xl p-6 space-y-3 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center border border-secondary/30 group-hover:border-secondary/60 group-hover:shadow-lg group-hover:shadow-secondary/20 transition-all duration-300">
                      <Phone className="text-secondary size-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone Calls</h3>
                      <p className="text-xs text-muted-foreground">Voice support with AI</p>
                    </div>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-secondary/50 to-transparent rounded-full" />
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-border/30"
            >
              <StatBox number="10M+" label="Conversations" />
              <StatBox number="99.9%" label="Uptime" />
              <StatBox number="40ms" label="Response Time" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm hover:translate-x-1 transition-transform duration-300 group cursor-pointer">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
        {icon}
      </div>
      <span className="text-foreground font-medium">{text}</span>
    </div>
  )
}

function StatBox({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center space-y-2 group">
      <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
        {number}
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  )
}
