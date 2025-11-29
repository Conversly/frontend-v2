"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { verifyEmail } from "@/lib/api/auth";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export default function VerifyEmailPage() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState("");
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage("Invalid verification link.");
            return;
        }

        verifyEmail(token)
            .then(() => {
                setStatus('success');
            })
            .catch((err) => {
                setStatus('error');
                setMessage(err.message || "Verification failed. Invalid or expired token.");
            });
    }, [token]);

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md text-center space-y-6">
                {/* Logo */}
                <Link href="/" className="inline-block mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg mx-auto">
                        <span className="text-2xl font-bold text-white">V</span>
                    </div>
                </Link>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
                    {status === 'loading' && (
                        <div className="flex flex-col items-center space-y-4">
                            <Loader2 className="w-12 h-12 text-primary animate-spin" />
                            <h1 className="text-2xl font-bold text-gray-800">Verifying your email...</h1>
                            <p className="text-gray-500">Please wait while we verify your email address.</p>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800">Email Verified!</h1>
                            <p className="text-gray-500">Your email has been successfully verified. You can now log in to your account.</p>
                            <Link
                                href="/login"
                                className="w-full py-3 px-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium shadow-lg shadow-primary/20"
                            >
                                Continue to Login
                            </Link>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                <XCircle className="w-8 h-8 text-red-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800">Verification Failed</h1>
                            <p className="text-gray-500">{message}</p>
                            <Link
                                href="/login"
                                className="text-primary hover:underline font-medium"
                            >
                                Back to Login
                            </Link>
                        </div>
                    )}
                </div>

                <div className="text-sm text-gray-400">
                    © VerlyAI · <Link href="/terms" className="hover:text-gray-600">Terms</Link> · <Link href="/privacy" className="hover:text-gray-600">Privacy</Link>
                </div>
            </div>
        </div>
    );
}
