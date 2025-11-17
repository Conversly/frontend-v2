"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ChevronDown } from "lucide-react";
import { GoogleAuth } from "@/components/auth";
import { useAuth } from "@/store/auth";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav className="flex h-[74px] w-full items-center justify-between px-4">
        <Link href="/" className="z-10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-md">
            <span className="text-lg font-bold text-white">V</span>
          </div>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="flex-1 mx-auto max-w-screen-lg w-full px-4 pb-24 sm:mt-12 md:px-8">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-24 lg:max-w-full lg:flex-row lg:items-start lg:space-x-24 lg:space-y-0">
          
          {/* Left Side - Login Form */}
          <div className="mx-auto mt-6 w-full sm:w-96">
            <div className="flex-1">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 md:text-4xl text-center">
                  Login
                </h1>
                <p className="mt-4 text-base text-gray-500 text-center">
                  Hey, welcome back! 👋
                </p>
              </div>

              {/* Login Form */}
              <div className="mx-auto w-full sm:w-96">
                {/* Google Sign In */}
                <div className="mb-6">
                  <GoogleAuth className="w-full" />
                </div>

                {/* Register Link */}
                <div className="mt-12 text-center text-sm text-gray-500">
                  Don't have an account yet?
                  <Link href="/">
                    <span className="inline cursor-pointer transition-colors hover:text-blue-500">
                      &nbsp;<span className="underline">Register</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Banner */}
          <div className="hidden lg:flex relative flex-1 flex-col overflow-hidden rounded-3xl text-center text-gray-700" style={{ backgroundColor: '#F2F2F2' }}>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-200/30 pointer-events-none" />
            
            <div className="relative z-10 px-16 pb-4 pt-16">
              <h3 className="text-3xl font-bold">
                Build the perfect customer-facing AI agent
              </h3>
              <p className="mt-4 text-base text-gray-600">
                Conversly gives you all the tools you need to train your perfect AI agent and connect it to your systems.
              </p>
              <a
                href="https://docs.verlyai.com"
                className="inline-flex items-center justify-center pt-4 hover:text-blue-500 transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                Explore how it works
                <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            <div className="relative h-[280px] w-full bg-cover bg-center bg-no-repeat z-10">
              <Image
                src="https://backend.chatbase.co/storage/v1/object/public/chatbase/landing/features/smart-escalation.png"
                alt="AI Agent Dashboard"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 w-full items-center justify-center text-center text-sm text-gray-400 sm:flex sm:px-6 sm:text-left">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span>© VerlyAI</span>
            <span>·</span>
            <Link
              href="/terms"
              className="hover:text-blue-500 transition-colors"
            >
              TOS
            </Link>
            <span>·</span>
            <Link
              href="/privacy"
              className="hover:text-blue-500 transition-colors"
            >
              Privacy Policies
            </Link>
            <span>·</span>
            <Link
              href="/imprint"
              className="hover:text-blue-500 transition-colors"
            >
              Imprint
            </Link>
          </div>
          
          {/* Language Selector */}
          <div className="relative mt-6 flex h-[46px] w-full justify-center sm:mt-0 sm:block sm:w-[140px] sm:pl-6">
            <div className="group relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex cursor-pointer items-center rounded-lg border border-gray-100 bg-white p-1 px-4 py-2 hover:shadow transition-shadow"
              >
                <span className="ml-2">🇺🇸 English</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {showLangDropdown && (
                <div className="absolute bottom-full mb-1 left-0 min-w-full rounded-lg border border-gray-100 bg-white shadow-lg">
                  <button className="flex w-full cursor-pointer items-center rounded px-4 py-2 hover:bg-gray-100">
                    <span className="ml-2">🇩🇪 German</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
