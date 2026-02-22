"use client";

import { useState } from "react";
import dynamic from 'next/dynamic';
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import { joinWaitlist } from "@/lib/api/waitlist";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
    Loader2,
    Sparkles,
    Headset,
    CheckCircle2,
    Phone,
    BarChart3,
    Megaphone,
    Zap,
} from "lucide-react";

// Dynamic import for visual component
const VoiceVisual = dynamic(() => import('@/components/voice/VoiceVisual'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-slate-50 animate-pulse" />
});

export default function VoicePage() {
    const params = useParams();

    // Request Modal State
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [requestEmail, setRequestEmail] = useState("");
    const [useCase, setUseCase] = useState("");
    const [isRequestSubmitting, setIsRequestSubmitting] = useState(false);
    const [isRequestSuccess, setIsRequestSuccess] = useState(false);
    const [requestError, setRequestError] = useState("");

    const handleRequestSubmit = async () => {
        if (!useCase.trim()) {
            setRequestError("Please describe your use case");
            return;
        }

        if (!requestEmail.trim()) {
            setRequestError("Please enter your email address");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(requestEmail)) {
            setRequestError("Please enter a valid email address");
            return;
        }

        setIsRequestSubmitting(true);
        setRequestError("");

        try {
            await joinWaitlist({
                email: requestEmail,
                comments: `Integration Request: Voice Agents - ${useCase}`,
            });
            setIsRequestSuccess(true);
            toast.success("Request submitted successfully!");
        } catch (error: any) {
            console.error("Voice request error:", error);
            setRequestError(error.message || "Failed to submit request");
            toast.error("Failed to submit request. Please try again.");
        } finally {
            setIsRequestSubmitting(false);
        }
    };

    const resetRequestForm = () => {
        setIsRequestSuccess(false);
        setUseCase("");
        setRequestEmail("");
        setRequestError("");
    };

    return (
        <div className="w-full h-full bg-background overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto">
                <div className="container mx-auto px-6 py-6 max-w-[1920px] h-full flex flex-col justify-center">

                    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 border-2 border-dashed rounded-xl bg-white dark:bg-slate-950 overflow-hidden min-h-[600px] shadow-sm dark:border-slate-800">

                        {/* Left side - Content */}
                        <div className="flex flex-col items-center justify-center p-8 lg:p-12 text-center relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                                <Headset className="h-8 w-8 text-white" />
                            </div>

                            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-4">
                                Voice AI Agents
                            </h1>

                            <p className="text-muted-foreground mb-8 max-w-md leading-relaxed text-lg">
                                Deploy intelligent voice assistants that can handle inbound calls, run outbound campaigns, and engage customers with human-like personality.
                            </p>

                            {/* Feature highlights */}
                            <div className="flex flex-wrap justify-center gap-3 mb-10">
                                {[
                                    { icon: Phone, label: "Inbound & Outbound" },
                                    { icon: BarChart3, label: "Real-time Analytics" },
                                    { icon: Megaphone, label: "Campaigns" },
                                ].map((feature, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 text-sm font-medium border border-transparent dark:border-slate-800"
                                    >
                                        <feature.icon className="h-4 w-4 text-primary/70" />
                                        {feature.label}
                                    </div>
                                ))}
                            </div>

                            <Button
                                size="lg"
                                className="h-12 px-8 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-0.5"
                                onClick={() => setIsRequestModalOpen(true)}
                            >
                                <Sparkles className="w-5 h-5 mr-2" />
                                Request Access
                            </Button>
                        </div>

                        {/* Right side - Visual */}
                        <div className="hidden lg:block border-l border-slate-100 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 relative overflow-hidden">
                            <VoiceVisual />
                        </div>

                    </div>

                </div>
            </div>

            {/* Request Modal */}
            <Dialog open={isRequestModalOpen} onOpenChange={(open) => {
                setIsRequestModalOpen(open);
                if (!open) setTimeout(resetRequestForm, 300);
            }}>
                <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-border bg-background shadow-2xl gap-0">
                    <AnimatePresence mode="wait">
                        {!isRequestSuccess ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col"
                            >
                                <div className="p-6 pb-0">
                                    <DialogHeader className="mb-6 space-y-3">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                                            <Sparkles className="w-6 h-6 text-primary" />
                                        </div>
                                        <DialogTitle className="text-2xl font-bold">
                                            Request Early Access
                                        </DialogTitle>
                                        <DialogDescription className="text-base leading-relaxed text-muted-foreground/80">
                                            Voice Agents are currently in private beta. Tell us a bit about what you're building to get priority access.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <Label htmlFor="use-case" className="text-sm font-semibold flex items-center gap-1">
                                                Use Case <span className="text-destructive">*</span>
                                            </Label>
                                            <Input
                                                id="use-case"
                                                placeholder="e.g. I need an agent to handle qualification calls for my real estate leads..."
                                                value={useCase}
                                                onChange={(e) => setUseCase(e.target.value)}
                                                disabled={isRequestSubmitting}
                                                className="h-11 bg-muted/30 focus:bg-background transition-colors"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="req-email" className="text-sm font-semibold flex items-center gap-1">
                                                Email Address <span className="text-destructive">*</span>
                                            </Label>
                                            <Input
                                                id="req-email"
                                                type="email"
                                                placeholder="you@company.com"
                                                value={requestEmail}
                                                onChange={(e) => setRequestEmail(e.target.value)}
                                                disabled={isRequestSubmitting}
                                                className={`h-11 bg-muted/30 focus:bg-background transition-colors ${requestError && (!requestEmail || (requestEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(requestEmail))) ? "border-destructive focus-visible:ring-destructive" : ""}`}
                                            />
                                        </div>

                                        {requestError && (
                                            <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
                                                {requestError}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <DialogFooter className="p-6 pt-8 bg-muted/20 mt-6 border-t border-border/50">
                                    <Button variant="ghost" onClick={() => setIsRequestModalOpen(false)} disabled={isRequestSubmitting} className="mr-auto hover:bg-background">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleRequestSubmit} disabled={isRequestSubmitting} size="lg" className="min-w-[140px] shadow-lg shadow-primary/20">
                                        {isRequestSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            "Submit Request"
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
                                transition={{ duration: 0.3 }}
                                className="flex flex-col items-center justify-center py-8 text-center"
                            >
                                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6 shadow-sm">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">Request Received!</h3>
                                <p className="text-muted-foreground max-w-[300px] mb-8">
                                    We've received your request for Voice Agents access. We'll be in touch with you shortly at <strong>{requestEmail}</strong>.
                                </p>
                                <Button onClick={() => setIsRequestModalOpen(false)} size="lg" className="w-full sm:w-auto min-w-[140px]">
                                    Done
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </DialogContent>
            </Dialog>
        </div>
    );
}


// "use client";

// import { useParams } from "next/navigation";
// import { VoiceAssistantsList } from "@/components/voice/VoiceAssistantsList";

// export default function VoicePage() {
//     const params = useParams();
//     const botId = params.botId as string;

//     return (
//         <div className="container max-w-7xl px-4 py-8 md:px-6 lg:px-8">
//             <div className="mb-8">
//                 <h1 className="type-page-title">Voice Configuration</h1>
//                 <p className="type-body-muted mt-1">
//                     Create and manage voice assistants for your chatbot.
//                     Each assistant can have its own personality, voice, and behavior.
//                 </p>
//             </div>

//             <VoiceAssistantsList botId={botId} />
//         </div>
//     );
// }