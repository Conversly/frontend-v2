"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ChevronDown, Mail, ArrowLeft, Sparkles, CheckCircle2, Loader2, ArrowRight, KeyRound, Users } from "lucide-react";
import { GoogleAuth } from "@/components/auth";
import { useAuth } from "@/store/auth";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";
import Image from "next/image";
import { emailLogin, emailRegister } from "@/lib/api/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getUserWorkspaces } from "@/lib/api/workspaces";
import posthog from "posthog-js";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
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



  const validateAuthEmail = (value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return "Invalid email format";
    return "";
  };

  const getPasswordValidationErrors = (value: string): string[] => {
    const errors: string[] = [];
    if (!value) {
      errors.push("Password is required");
      return errors;
    }
    if (value.length < 8) errors.push("Password must be at least 8 characters");
    if (!/[a-z]/.test(value)) errors.push("Password must contain at least one lowercase letter");
    if (!/[A-Z]/.test(value)) errors.push("Password must contain at least one uppercase letter");
    if (!/[0-9]/.test(value)) errors.push("Password must contain at least one number");
    if (!/[@$!%*?&#]/.test(value)) errors.push("Password must contain at least one special character");
    return errors;
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegistering) {
        const emailError = validateAuthEmail(email);
        if (emailError) {
          setError(emailError);
          setLoading(false);
          return;
        }

        const passwordErrors = getPasswordValidationErrors(password);
        if (passwordErrors.length > 0) {
          setError(passwordErrors.join(", "));
          setLoading(false);
          return;
        }

        if (password !== confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }

        const response = await emailRegister(email.trim(), password, undefined);
        if (response.success) {
          posthog.capture("user_signed_up", {
            method: "email",
            email: email.trim(),
          });
          setVerificationSent(true);
        }
      } else {
        const response = await emailLogin(email, password);
        if (response.success) {
          posthog.capture("user_logged_in", {
            method: "email",
            email: email.trim(),
          });
          localStorage.setItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN, "true");

          const workspaces = await getUserWorkspaces();
          const first = workspaces[0]?.workspaceId;
          if (first) router.push(`/${first}/chatbot`);
          else router.push("/");
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
        getUserWorkspaces()
          .then((ws) => {
            const first = ws[0]?.workspaceId;
            if (first) router.push(`/${first}/chatbot`);
          })
          .catch(() => { });
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
    <div className="min-h-screen bg-background flex flex-col isolate">


      {/* Navigation */}
      <nav className="flex h-[74px] w-full items-center justify-between px-4 relative z-0">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/verly_logo.png"
            alt="VerlyAI Logo"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
          <span className="font-bold text-lg text-foreground">VerlyAI</span>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="flex-1 mx-auto max-w-screen-lg w-full px-4 pb-24 sm:mt-12 md:px-8 relative z-0">
        <div className="mx-auto flex w-full max-w-md flex-col gap-24 lg:max-w-full lg:flex-row lg:items-center">

          {/* Left Side - Login Form */}
          <div className="mx-auto mt-6 w-full sm:w-96 lg:shrink-0">
            <div className="flex-1">
              {/* Header */}
              <div className="mb-8">
                {verificationSent ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Mail className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                      Check your email
                    </h1>
                    <p className="mt-4 text-base text-muted-foreground">
                      We've sent a verification link to <span className="font-medium text-foreground">{email}</span>. Please check your inbox to verify your account.
                    </p>
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold text-foreground md:text-4xl text-center">
                      {isRegistering ? "Register" : "Login"}
                    </h1>
                    <p className="mt-4 text-base text-muted-foreground text-center">
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
                    className="w-full py-2 px-4 bg-background border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium flex items-center justify-center"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Login
                  </button>
                  <p className="text-center text-sm text-muted-foreground">
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
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground"
                        placeholder="Enter your password"
                      />
                    </div>

                    {isRegistering && (
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-1">
                          Confirm Password
                        </label>
                        <input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground"
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
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
                      </button>
                    </div>
                  </form>

                  {/* Divider */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  {/* Google Sign In */}
                  <div className="mb-6">
                    <div>
                      <GoogleAuth className="w-full" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Banner */}
          <div className="hidden lg:flex relative flex-1 flex-col overflow-hidden rounded-3xl text-center text-foreground bg-muted dark:bg-muted/30">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-200/30 pointer-events-none" />

            <div className="relative z-10 px-16 pb-4 pt-16">
              <h3 className="text-3xl font-bold">
                Build the perfect customer-facing AI agent
              </h3>
              <p className="mt-4 text-base text-muted-foreground">
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
                src="/login_page.png"
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
      </div >
    </div >
  );
}
