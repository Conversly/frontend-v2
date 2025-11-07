"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";
import { GoogleAuth } from "@/components/auth";
import { useAuth } from "@/store/auth";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
    <div className="flex min-h-screen w-full">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-primary/20 via-primary/10 to-background p-12">
        <div>
          <Link href="/" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-500">
              <span className="text-xl font-bold text-white">C</span>
            </div>
            <span className="text-xl font-bold">ConverslyAI</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">AI-Powered Conversations</h2>
              <p className="text-muted-foreground">Build smarter chatbots</p>
            </div>
          </div>

          <div className="space-y-4">
            <FeatureItem
              icon={<Sparkles className="w-5 h-5" />}
              title="Quick Setup"
              description="Get started in minutes"
            />
            <FeatureItem
              icon={<Sparkles className="w-5 h-5" />}
              title="Deep Insights"
              description="Understand your users better"
            />
            <FeatureItem
              icon={<Sparkles className="w-5 h-5" />}
              title="Custom Training"
              description="Train on your own data"
            />
          </div>
        </motion.div>

        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} ConverslyAI. All rights reserved.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 lg:hidden">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-500">
                <span className="text-xl font-bold text-white">C</span>
              </div>
              <span className="text-xl font-bold">ConverslyAI</span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-2 text-center lg:text-left">
              <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
              <p className="text-muted-foreground">
                Sign in to your account to continue building amazing chatbots
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex justify-center lg:justify-start">
                <GoogleAuth className="w-full" />
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Secure authentication
                  </span>
                </div>
              </div>

              <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                <p className="text-sm font-medium">Why sign in?</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Access your chatbot dashboard</li>
                  <li>Manage your AI conversations</li>
                  <li>View analytics and insights</li>
                  <li>Customize your chatbot settings</li>
                </ul>
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>
                Don't have an account?{" "}
                <Link href="/" className="font-medium text-primary hover:underline">
                  Get started
                </Link>
              </p>
            </div>

            <div className="text-center text-xs text-muted-foreground">
              <p>
                By continuing, you agree to our{" "}
                <Link href="/terms" className="underline hover:text-foreground">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline hover:text-foreground">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 text-primary">{icon}</div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
