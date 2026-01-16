"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import {
    getDeployStatus,
    pushToLive,
    rollbackDev,
    DeployStatus
} from "@/lib/api/deploy";
import { useBranch } from "@/store/branch";
import { DeployVisual } from "@/components/deploy/DeployVisual";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Rocket,
    RotateCcw,
    AlertTriangle,
    CheckCircle2,
    Clock,
    ShieldAlert,
    Info,
    ArrowLeft
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function DeployLivePage() {
    const { botId, workspaceId } = useParams() as { botId: string; workspaceId: string };
    const {
        activeBranch,
        switchBranch,
        setDeployState,
        syncVersions,
        devVersion: storeDevVersion,
        liveVersion: storeLiveVersion
    } = useBranch();

    const [status, setStatus] = useState<DeployStatus | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isActionInProgress, setIsActionInProgress] = useState(false);

    const fetchStatus = useCallback(async (showError = true) => {
        try {
            const data = await getDeployStatus(botId);
            if (data) {
                setStatus(data);

                // Sync store with backend status
                if (data.deployStatusField) {
                    setDeployState(data.deployStatusField);
                }
            }

            return data;
        } catch (error: any) {
            if (showError) {
                toast.error("Failed to fetch deployment status", {
                    description: error.message
                });
            }
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [botId, setDeployState]);

    // Initial fetch
    useEffect(() => {
        fetchStatus();
    }, [fetchStatus]);

    // Polling while deploying
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (status?.deployStatusField === 'DEPLOYING') {
            interval = setInterval(() => {
                fetchStatus(false);
            }, 5000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [status?.deployStatusField, fetchStatus]);

    const handlePushToLive = async () => {
        if (activeBranch !== 'DEV') {
            toast.warning("Switch to DEV mode to deploy", {
                description: "You can only push changes from the development environment."
            });
            return;
        }

        try {
            setIsActionInProgress(true);
            const promise = pushToLive(botId);
            toast.promise(promise, {
                loading: 'Initiating deployment...',
                success: 'Deployment started! Updating systems...',
                error: (err) => `Deployment failed: ${err.message}`
            });

            await promise;
            // Immediate fetch to set state to DEPLOYING
            await fetchStatus(false);
        } catch (error: any) {
            console.error(error);
        } finally {
            setIsActionInProgress(false);
        }
    };

    const handleRollback = async () => {
        if (activeBranch !== 'DEV') {
            toast.warning("Switch to DEV mode to rollback", {
                description: "You can only rollback changes in the development environment."
            });
            return;
        }

        try {
            setIsActionInProgress(true);
            const promise = rollbackDev(botId);
            toast.promise(promise, {
                loading: 'Rolling back changes...',
                success: 'Successfully rolled back to live version!',
                error: (err) => `Rollback failed: ${err.message}`
            });

            await promise;
            await fetchStatus(false);
            // If rollback is successful, versions are synced
            syncVersions();
        } catch (error: any) {
            console.error(error);
        } finally {
            setIsActionInProgress(false);
        }
    };

    const isDeploying = status?.deployStatusField === 'DEPLOYING';
    const isDirty = status?.deployStatusField === 'DEV_DIRTY' || (status && status.devVersion > status.liveVersion);
    const isLocked = status?.deployStatusField === 'LOCKED';

    if (isLoading && !status) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-4">
                    <Clock className="w-8 h-8 animate-spin text-blue-500" />
                    <p className="text-slate-500 font-medium">Loading deployment status...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href={`/${workspaceId}/chatbot/${botId}/deploy`}>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Deploy to Live</h1>
                        <p className="text-muted-foreground mt-1">
                            Move your draft changes from the development environment to your public live chatbot.
                        </p>
                    </div>
                </div>

                {activeBranch === 'LIVE' && (
                    <Button variant="outline" onClick={() => switchBranch('DEV')} className="border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100">
                        Switch to DEV to Deploy
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Visualization Column */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="overflow-hidden border-slate-200/60 shadow-md">
                        <DeployVisual isDeploying={isDeploying} />
                    </Card>

                    {isLocked && (
                        <Alert variant="destructive" className="bg-red-50 border-red-200">
                            <ShieldAlert className="h-5 w-5" />
                            <AlertTitle>Deployment Locked</AlertTitle>
                            <AlertDescription>
                                Your chatbot configuration is currently locked due to a previous deployment failure.
                                Please contact support or try to recover from a previous state.
                            </AlertDescription>
                        </Alert>
                    )}

                    {!isDirty && !isDeploying && !isLocked && (
                        <Alert className="bg-emerald-50 border-emerald-200 text-emerald-800">
                            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                            <AlertTitle>All changes synced</AlertTitle>
                            <AlertDescription>
                                Your LIVE chatbot is currently running the latest version of your configuration.
                            </AlertDescription>
                        </Alert>
                    )}
                </div>

                {/* Actions Column */}
                <div className="space-y-6">
                    {/* Status Card */}
                    <Card className="bg-slate-50 border-slate-200 shadow-sm">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm uppercase tracking-wider text-slate-500">Current Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-2xl font-bold text-slate-900">v{status?.liveVersion || 0}</p>
                                    <p className="text-xs text-slate-500">Live Version</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-blue-600">v{status?.devVersion || 0}</p>
                                    <p className="text-xs text-slate-500">Draft Version</p>
                                </div>
                            </div>
                            <div className="pt-2 border-t border-slate-200">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-500">State:</span>
                                    <span className={`font-semibold ${status?.deployStatusField === 'SYNCED' ? 'text-emerald-600' :
                                        status?.deployStatusField === 'DEPLOYING' ? 'text-blue-600' :
                                            'text-orange-600'
                                        }`}>
                                        {status?.deployStatusField?.replace('_', ' ') || 'Unknown'}
                                    </span>
                                </div>
                                {status?.lastDeployedAt && (
                                    <div className="flex items-center justify-between text-xs mt-1">
                                        <span className="text-slate-500">Last Deployed:</span>
                                        <span className="text-slate-700">
                                            {new Date(status.lastDeployedAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Push Card */}
                    <Card className={`relative overflow-hidden transition-all duration-300 ${isDirty && !isDeploying ? 'border-blue-500 shadow-blue-100 shadow-lg' : 'opacity-70'}`}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Rocket className="w-5 h-5 text-blue-500" />
                                Push to Live
                            </CardTitle>
                            <CardDescription>
                                Publish your draft changes to production.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-4">
                            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 text-xs text-blue-700 flex gap-3">
                                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                <p>This will deploy all the changes which you have done on your live chatbot. User will be affected.</p>
                            </div>
                            <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-100 text-xs text-orange-700 flex gap-3">
                                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                <p>Your chatbot will be inactive for a short duration (1-2 minutes) during deployment.</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200"
                                disabled={!isDirty || isDeploying || isActionInProgress || activeBranch !== 'DEV'}
                                onClick={handlePushToLive}
                            >
                                {isDeploying ? "Deploying..." : "Publish to Production"}
                            </Button>
                        </CardFooter>

                        {/* Progress Overlay if deploying */}
                        <AnimatePresence>
                            {isDeploying && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-white/80 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-6 text-center"
                                >
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Rocket className="w-10 h-10 text-blue-500" />
                                    </motion.div>
                                    <h4 className="mt-4 font-bold text-slate-900">Pushing Changes</h4>
                                    <p className="text-xs text-slate-500 mt-1">Please wait until the sync is complete. This usually takes less than a minute.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>

                    {/* Rollback Card */}
                    <Card className={status?.liveVersion === 0 ? 'opacity-50 cursor-not-allowed' : ''}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <RotateCcw className="w-5 h-5 text-slate-500" />
                                Rollback Changes
                            </CardTitle>
                            <CardDescription>
                                Discard your draft and restore from Live.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-4">
                            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex gap-3">
                                <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                <p>This will remove all your changes to the current live stage. Your draft will be replaced by the current production configuration.</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                variant="outline"
                                className="w-full border-slate-200 hover:bg-slate-50"
                                disabled={status?.liveVersion === 0 || isDeploying || isActionInProgress || activeBranch !== 'DEV'}
                                onClick={handleRollback}
                            >
                                Discard Draft & Sync
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
