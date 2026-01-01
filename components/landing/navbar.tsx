'use client';
import { useState, useEffect } from "react";
import { useAuth } from "@/store/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Mail, Sparkles, Loader2, ArrowRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getLoggedInUser } from "@/lib/api/user";
import { QUERY_KEY } from "@/utils/query-key";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { joinWaitlist } from "@/lib/api/waitlist";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user, logout, setUser } = useAuth();
  const [mounted, setMounted] = useState(false);
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [touchedEmail, setTouchedEmail] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: fetchedUser } = useQuery({
    queryKey: [QUERY_KEY.LOGGED_IN_USER],
    queryFn: async () => {
      return await getLoggedInUser();
    },
    enabled: mounted,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUser);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN, "true");
      } catch { }
    }
  }, [fetchedUser, setUser]);

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

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (touchedEmail) {
      setEmailError(validateEmail(value));
    }
  };

  const handleEmailBlur = () => {
    setTouchedEmail(true);
    setEmailError(validateEmail(email));
  };

  const handleWaitlistSubmit = async () => {
    // Validate email
    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setTouchedEmail(true);
      setEmailError(emailValidationError);
      toast.error(emailValidationError);
      return;
    }

    setIsLoading(true);

    try {
      await joinWaitlist({
        email: email.trim(),
        comments: comments.trim() || undefined,
      });

      setIsSubmitted(true);
      setEmail("");
      setComments("");
      setEmailError("");
      setTouchedEmail(false);
      toast.success("Successfully joined the waitlist! Check your email for confirmation.");
    } catch (error: any) {
      console.error("Waitlist submission error:", error);
      toast.error(error.message || "Failed to join waitlist. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    mounted && (
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 text-gray-900">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/verly_logo.png"
              alt="VerlyAI Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
            <span className="font-bold text-xl">VerlyAI</span>
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="w-10 h-10 rounded-full border border-border overflow-hidden">
                    <Image
                      src={user.avatarUrl || "/default-avatar.png"}
                      alt="User avatar"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="w-full cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => logout(queryClient)}
                    className="w-full cursor-pointer"
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                {/* 
                <Link href="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button>
                    Get Started Free
                  </Button>
                </Link> 
                */}
                <Dialog open={isWaitlistOpen} onOpenChange={(open) => {
                  setIsWaitlistOpen(open);
                  if (!open) {
                    setIsSubmitted(false);
                    setEmail("");
                    setComments("");
                    setEmailError("");
                    setTouchedEmail(false);
                  }
                }}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-all shadow-md hover:shadow-lg hover:scale-105">
                      Join Waitlist
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl bg-white dark:bg-zinc-950">
                    <AnimatePresence mode="wait">
                      {!isSubmitted ? (
                        <motion.div
                          key="form"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="p-8"
                        >
                          {/* Header with icon */}
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

                          {/* Form */}
                          <div className="grid gap-6 py-2">
                            <div className="grid gap-2">
                              <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email Address
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => handleEmailChange(e.target.value)}
                                onBlur={handleEmailBlur}
                                placeholder="your.email@company.com"
                                disabled={isLoading}
                                className={`h-12 text-base transition-all focus:ring-2 focus:ring-primary/30 ${emailError && touchedEmail
                                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                                  : "focus:border-primary"
                                  }`}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && !isLoading) {
                                    handleWaitlistSubmit();
                                  }
                                }}
                              />
                              {emailError && touchedEmail && (
                                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                  <span>•</span>
                                  {emailError}
                                </p>
                              )}
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="comments" className="text-sm font-semibold">
                                How do you plan to use VerlyAI?
                                <span className="text-muted-foreground font-normal ml-1">(Optional)</span>
                              </Label>
                              <Textarea
                                id="comments"
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                placeholder="Tell us about your use case, industry, or any specific features you're excited about..."
                                disabled={isLoading}
                                className="resize-none h-28 text-base transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary"
                              />
                            </div>
                          </div>

                          {/* Benefits */}
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

                          {/* Submit Button */}
                          <DialogFooter className="mt-2">
                            <Button
                              type="submit"
                              onClick={handleWaitlistSubmit}
                              disabled={isLoading}
                              className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-lg py-7 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                              {isLoading ? (
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
                          </DialogFooter>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.4 }}
                          className="flex flex-col items-center justify-center py-12 px-8"
                        >
                          {/* Success Icon with Animation */}
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", duration: 0.6 }}
                            className="relative mb-6"
                          >
                            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl animate-pulse"></div>
                            <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                              <CheckCircle2 className="w-12 h-12 text-white" />
                            </div>
                          </motion.div>

                          {/* Success Message */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-center space-y-3"
                          >
                            <DialogTitle className="text-3xl font-bold text-foreground">
                              You're on the waitlist!
                            </DialogTitle>
                            <DialogDescription className="text-base text-muted-foreground max-w-sm mx-auto leading-relaxed">
                              Thanks for registering! We've received your information and will notify you via email as soon as a spot becomes available.
                            </DialogDescription>
                          </motion.div>

                          {/* Support Link */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-8 text-center"
                          >
                            <p className="text-sm text-muted-foreground">
                              Questions?{" "}
                              <a
                                href="mailto:support@verlyai.com"
                                className="text-primary hover:text-primary/80 font-semibold underline underline-offset-4 transition-colors"
                              >
                                Contact Support
                              </a>
                            </p>
                          </motion.div>

                        </motion.div>
                      )}
                    </AnimatePresence>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>
      </nav>
    )
  );
}
