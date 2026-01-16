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
import { joinWaitlist } from "@/lib/api/waitlist";
import { getUserWorkspaces } from "@/lib/api/workspaces";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type DialogStep = "initial" | "invite-code" | "waitlist" | "waitlist-success" | null;

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
  const [inviteCode, setInviteCode] = useState("");
  const googleAuthButtonRef = useRef<HTMLDivElement>(null);

  // Dialog state
  const [dialogStep, setDialogStep] = useState<DialogStep>("initial");
  const [hasConfirmedInvite, setHasConfirmedInvite] = useState(false);
  const [pendingGoogleAuth, setPendingGoogleAuth] = useState(false);
  const [bypassedForLogin, setBypassedForLogin] = useState(false); // Track if user bypassed for login

  // Waitlist form state
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistComments, setWaitlistComments] = useState("");
  const [waitlistLoading, setWaitlistLoading] = useState(false);
  const [waitlistEmailError, setWaitlistEmailError] = useState("");
  const [touchedWaitlistEmail, setTouchedWaitlistEmail] = useState(false);

  // Invite code input state
  const [inviteCodeInput, setInviteCodeInput] = useState("");
  const [inviteCodeError, setInviteCodeError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Read invite code from URL params - if present, skip dialog
  useEffect(() => {
    const code = searchParams.get("invite_code");
    if (code) {
      setInviteCode(code);
      setHasConfirmedInvite(true);
      setDialogStep(null);
    }
  }, [searchParams]);

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
        const response = await emailRegister(email, password, undefined, inviteCode || undefined);
        if (response.success) {
          setVerificationSent(true);
        }
      } else {
        const response = await emailLogin(email, password);
        if (response.success) {
          localStorage.setItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN, "true");
          
          // Check for pending invite token
          const pendingInviteToken = localStorage.getItem("pending_invite_token");
          if (pendingInviteToken) {
            localStorage.removeItem("pending_invite_token");
            router.push(`/invite/${pendingInviteToken}`);
            return;
          }
          
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
          .catch(() => {});
      }
    }
  }, [mounted, user, router]);

  // Waitlist validation
  const validateEmail = (email: string): string => {
    if (!email.trim()) {
      return "Email address is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const handleWaitlistEmailChange = (value: string) => {
    setWaitlistEmail(value);
    if (touchedWaitlistEmail) {
      setWaitlistEmailError(validateEmail(value));
    }
  };

  const handleWaitlistEmailBlur = () => {
    setTouchedWaitlistEmail(true);
    setWaitlistEmailError(validateEmail(waitlistEmail));
  };

  const handleWaitlistSubmit = async () => {
    const emailValidationError = validateEmail(waitlistEmail);
    if (emailValidationError) {
      setTouchedWaitlistEmail(true);
      setWaitlistEmailError(emailValidationError);
      toast.error(emailValidationError);
      return;
    }

    setWaitlistLoading(true);

    try {
      await joinWaitlist({
        email: waitlistEmail.trim(),
        comments: waitlistComments.trim() || undefined,
      });

      setDialogStep("waitlist-success");
      setWaitlistEmail("");
      setWaitlistComments("");
      setWaitlistEmailError("");
      setTouchedWaitlistEmail(false);
      toast.success("Successfully joined the waitlist! Check your email for confirmation.");
    } catch (error: any) {
      console.error("Waitlist submission error:", error);
      toast.error(error.message || "Failed to join waitlist. Please try again.");
    } finally {
      setWaitlistLoading(false);
    }
  };

  const handleInviteCodeSubmit = () => {
    if (!inviteCodeInput.trim()) {
      setInviteCodeError("Please enter your invite code");
      return;
    }
    setInviteCode(inviteCodeInput.trim());
    setHasConfirmedInvite(true);
    setDialogStep(null);
    
    // If user was trying to use Google Auth, trigger it now
    if (pendingGoogleAuth) {
      setPendingGoogleAuth(false);
      setTimeout(() => {
        googleAuthButtonRef.current?.querySelector('button')?.click();
      }, 100);
    }
  };

  const resetDialog = () => {
    setDialogStep("initial");
    setInviteCodeInput("");
    setInviteCodeError("");
    setWaitlistEmail("");
    setWaitlistComments("");
    setWaitlistEmailError("");
    setTouchedWaitlistEmail(false);
    setPendingGoogleAuth(false);
    setBypassedForLogin(false);
  };

  const handleGoogleAuthClick = () => {
    // If user hasn't confirmed invite yet AND not just logging in, show dialog
    if (!hasConfirmedInvite && !bypassedForLogin) {
      setDialogStep("initial");
      setPendingGoogleAuth(true);
      return true; // Prevent default behavior
    }
    return false; // Allow normal behavior
  };

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
    <div className="min-h-screen bg-white flex flex-col isolate">
      {/* Initial Dialog */}
      <Dialog 
        open={dialogStep !== null && !hasConfirmedInvite} 
        onOpenChange={(open) => {
          if (!open) {
            if (dialogStep === "waitlist-success") {
              resetDialog();
            } else {
              // User closed dialog without completing
              setPendingGoogleAuth(false);
              setDialogStep(null);
            }
          }
        }}
      >
        <DialogContent className="sm:max-w-[500px] p-0 border-none shadow-2xl bg-white dark:bg-zinc-950 max-h-[90vh] overflow-y-auto">
            {dialogStep === "initial" && (
              <div className="p-8">
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-3xl font-bold text-center mb-3">
                    Welcome to VerlyAI
                  </DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground text-center">
                    Do you have an invite code to access the platform?
                  </DialogDescription>
                </DialogHeader>

                {/* Image */}
                <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden">
                  <Image
                    src="/customise_apperances.png"
                    alt="VerlyAI Platform"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="grid gap-3 py-2">
                  <Button
                    onClick={() => setDialogStep("invite-code")}
                    className="w-full h-11 text-base bg-primary hover:bg-primary/90 group"
                  >
                    <KeyRound className="w-4 h-4 mr-2" />
                    Yes, I have an invite code
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <Button
                    onClick={() => setDialogStep("waitlist")}
                    variant="outline"
                    className="w-full h-11 text-base border-2 group"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    No, join the waitlist
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <Button
                    onClick={() => {
                      setDialogStep(null);
                      setBypassedForLogin(true); // Track that they bypassed
                      setIsRegistering(false);
                      setPendingGoogleAuth(false);
                    }}
                    variant="ghost"
                    className="w-full h-11 text-base group"
                  >
                    Already a user? Login
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            )}

            {dialogStep === "invite-code" && (
              <div className="p-8">
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-3xl font-bold flex items-center gap-3 mb-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-lg blur-md"></div>
                      <div className="relative w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                        <KeyRound className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <span>Enter Invite Code</span>
                  </DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground">
                    Enter your invite code to access VerlyAI
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-2">
                  <div className="grid gap-2">
                    <Label htmlFor="inviteCodeDialog" className="text-sm font-semibold">
                      Invite Code
                    </Label>
                    <Input
                      id="inviteCodeDialog"
                      type="text"
                      value={inviteCodeInput}
                      onChange={(e) => {
                        setInviteCodeInput(e.target.value);
                        setInviteCodeError("");
                      }}
                      placeholder="Enter your invite code"
                      className={`h-12 text-base transition-all focus:ring-2 focus:ring-primary/30 ${
                        inviteCodeError
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                          : "focus:border-primary"
                      }`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleInviteCodeSubmit();
                        }
                      }}
                    />
                    {inviteCodeError && (
                      <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                        <span>•</span>
                        {inviteCodeError}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <Button
                    onClick={handleInviteCodeSubmit}
                    className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setDialogStep("initial")}
                    className="w-full"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </div>
              </div>
            )}

            {dialogStep === "waitlist" && (
              <div className="p-8">
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-3xl font-bold flex items-center gap-3 mb-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-lg blur-md"></div>
                      <div className="relative w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-600 to-primary">
                      Join the Waitlist
                    </span>
                  </DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground max-w-sm">
                    Be among the first to experience the future of AI-powered customer support. Get exclusive early access and special perks!
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-2">
                  <div className="grid gap-2">
                    <Label htmlFor="waitlistEmail" className="text-sm font-semibold flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </Label>
                    <Input
                      id="waitlistEmail"
                      type="email"
                      value={waitlistEmail}
                      onChange={(e) => handleWaitlistEmailChange(e.target.value)}
                      onBlur={handleWaitlistEmailBlur}
                      placeholder="your.email@company.com"
                      disabled={waitlistLoading}
                      className={`h-12 text-base transition-all focus:ring-2 focus:ring-primary/30 ${
                        waitlistEmailError && touchedWaitlistEmail
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                          : "focus:border-primary"
                      }`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !waitlistLoading) {
                          handleWaitlistSubmit();
                        }
                      }}
                    />
                    {waitlistEmailError && touchedWaitlistEmail && (
                      <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                        <span>•</span>
                        {waitlistEmailError}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="waitlistComments" className="text-sm font-semibold">
                      How do you plan to use VerlyAI?
                      <span className="text-muted-foreground font-normal ml-1">(Optional)</span>
                    </Label>
                    <Textarea
                      id="waitlistComments"
                      value={waitlistComments}
                      onChange={(e) => setWaitlistComments(e.target.value)}
                      placeholder="Tell us about your use case, industry, or any specific features you're excited about..."
                      disabled={waitlistLoading}
                      className="resize-none h-28 text-base transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="my-6 p-4 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/10">
                  <p className="text-sm font-semibold text-foreground mb-2">What you'll get:</p>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      Early access to new features
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      Priority support and onboarding
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      Exclusive updates and insights
                    </li>
                  </ul>
                </div>

                <div className="mt-2 flex flex-col gap-3">
                  <Button
                    type="submit"
                    onClick={handleWaitlistSubmit}
                    disabled={waitlistLoading}
                    className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-lg py-7 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {waitlistLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Get Notified
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setDialogStep("initial")}
                    className="w-full"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </div>
              </div>
            )}

            {dialogStep === "waitlist-success" && (
              <div className="flex flex-col items-center justify-center py-12 px-8">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl animate-pulse"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                    <CheckCircle2 className="w-12 h-12 text-white" />
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <DialogTitle className="text-3xl font-bold text-foreground">
                    You're on the waitlist!
                  </DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground max-w-sm mx-auto leading-relaxed">
                    Thanks for registering! We've received your information and will notify you via email as soon as a spot becomes available.
                  </DialogDescription>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    Questions?{" "}
                    <a
                      href="mailto:support@verlyai.com"
                      className="text-primary hover:text-primary/80 font-semibold underline underline-offset-4 transition-colors"
                    >
                      Contact Support
                    </a>
                  </p>
                </div>
              </div>
            )}
        </DialogContent>
      </Dialog>

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
          <span className="font-bold text-lg text-gray-900">VerlyAI</span>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="flex-1 mx-auto max-w-screen-lg w-full px-4 pb-24 sm:mt-12 md:px-8 relative z-0">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-24 lg:max-w-full lg:flex-row lg:items-center lg:space-x-24 lg:space-y-0">

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
                          const switchingToRegister = !isRegistering;
                          setIsRegistering(switchingToRegister);
                          setError("");
                          setEmail("");
                          setPassword("");
                          setConfirmPassword("");
                          
                          // If switching to register and no invite code confirmed, show dialog
                          if (switchingToRegister && !hasConfirmedInvite) {
                            setBypassedForLogin(false); // Reset bypass flag
                            setDialogStep("initial");
                          }
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
                  <div className="mb-6" ref={googleAuthButtonRef}>
                    <div 
                      onClick={(e) => {
                        if (handleGoogleAuthClick()) {
                          e.preventDefault();
                          e.stopPropagation();
                        }
                      }}
                    >
                      <GoogleAuth 
                        className="w-full" 
                        inviteCode={inviteCode}
                      />
                    </div>
                  </div>

                  {/* Register Link */}
                  <div className="mt-12 text-center text-sm text-gray-500">
                    Don't have an invite code?
                    <button
                      onClick={() => setDialogStep("waitlist")}
                      className="inline cursor-pointer transition-colors hover:text-blue-500"
                    >
                      &nbsp;<span className="underline">Join the waitlist</span>
                    </button>
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
      </div>
    </div>
  );
}
