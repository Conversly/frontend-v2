"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ChevronDown, Mail, ArrowLeft } from "lucide-react";
import { GoogleAuth } from "@/components/auth";
import { useAuth } from "@/store/auth";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";
import Image from "next/image";
import { emailLogin, emailRegister } from "@/lib/api/auth";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/chatbot";
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegistering) {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError("Password must be at least 6 characters");
          setLoading(false);
          return;
        }
        const response = await emailRegister(email, password);
        if (response.success) {
          setVerificationSent(true);
        }
      } else {
        const response = await emailLogin(email, password);
        if (response.success) {
          localStorage.setItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN, "true");
          // Small delay to allow backend to process auto-accepted invites
          setTimeout(() => {
            router.push(redirectTo);
          }, 500);
        }
      }
    } catch (err: any) {
      if (err.message && (err.message.includes("verify") || err.message.includes("verified"))) {
        setError("Please verify your email address before logging in.");
      } else {
        setError(err.message || "Authentication failed");
      }
    } finally {
      setLoading(false);
    }
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (mounted) {
      const isLoggedIn = localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN) === "true";
      if (isLoggedIn && user) {
        router.push(redirectTo);
      }
    }
  }, [mounted, user, router, redirectTo]);

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
                {verificationSent ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Mail className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                      Check your email
                    </h1>
                    <p className="mt-4 text-base text-gray-500">
                      We've sent a verification link to <span className="font-medium text-gray-900">{email}</span>. Please check your inbox to verify your account.
                    </p>
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold text-gray-800 md:text-4xl text-center">
                      {isRegistering ? "Register" : "Login"}
                    </h1>
                    <p className="mt-4 text-base text-gray-500 text-center">
                      {isRegistering ? "Create your account 🚀" : "Hey, welcome back! 👋"}
                    </p>
                  </>
                )}
              </div>

              {/* Login Form */}
              {verificationSent ? (
                <div className="mx-auto w-full sm:w-96 space-y-4">
                  <button
                    onClick={() => {
                      setVerificationSent(false);
                      setIsRegistering(false);
                      setError("");
                      setPassword("");
                      setConfirmPassword("");
                    }}
                    className="w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Login
                  </button>
                  <p className="text-center text-sm text-gray-500">
                    Didn't receive the email? <button className="text-primary hover:underline font-medium" onClick={() => {
                      // Logic to resend email could go here
                      alert("Resend functionality to be implemented");
                    }}>Click to resend</button>
                  </p>
                </div>
              ) : (
                <div className="mx-auto w-full sm:w-96">
                  {/* Email/Password Form */}
                  <form onSubmit={handleEmailAuth} className="mb-6 space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter your password"
                      />
                    </div>

                    {isRegistering && (
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm Password
                        </label>
                        <input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Confirm your password"
                        />
                      </div>
                    )}

                    {error && (
                      <div className="text-sm text-red-500 text-center">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      {loading ? "Loading..." : isRegistering ? "Register" : "Login"}
                    </button>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setIsRegistering(!isRegistering);
                          setError("");
                          setEmail("");
                          setPassword("");
                          setConfirmPassword("");
                        }}
                        className="text-sm text-gray-600 hover:text-primary transition-colors"
                      >
                        {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
                      </button>
                    </div>
                  </form>

                  {/* Divider */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

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
              )}
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
                 VerlyAI gives you all the tools you need to train your perfect AI agent and connect it to your systems.
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
