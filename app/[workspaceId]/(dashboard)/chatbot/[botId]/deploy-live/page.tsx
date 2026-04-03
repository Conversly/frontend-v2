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
import { DeploymentDiffView } from "@/components/deploy/DeploymentDiffModal";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Rocket,
    RotateCcw,
    AlertTriangle,
    CheckCircle2,
    ShieldAlert,
    Info,
    GitBranch,
    Globe2
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

type PageView = "default" | "reviewing";

export default function DeployLivePage() {
    const { botId } = useParams() as { botId: string; workspaceId: string };
    const {
        activeBranch,
        switchBranch,
        setDeployState,
        syncVersions,
    } = useBranch();

    const [status, setStatus] = useState<DeployStatus | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isActionInProgress, setIsActionInProgress] = useState(false);
    const [pageView, setPageView] = useState<PageView>("default");
    const [isDeployingLocal, setIsDeployingLocal] = useState(false);

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

    const handleReviewChanges = () => {
        if (activeBranch !== 'DEV') {
            toast.warning("Switch to DEV mode to deploy", {
                description: "You can only push changes from the development environment."
            });
            return;
        }
        setPageView("reviewing");
    };

    const handleConfirmDeploy = async () => {
        // Switch back to default view and immediately start animation
        setPageView("default");
        setIsDeployingLocal(true);
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
            setIsDeployingLocal(false);
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
            syncVersions();
        } catch (error: any) {
            console.error(error);
        } finally {
            setIsActionInProgress(false);
        }
    };

    const isDeploying = status?.deployStatusField === 'DEPLOYING' || isDeployingLocal;
    const isDirty =
        status?.deployStatusField === 'DEV_DIRTY' ||
        status?.hasUnpublishedChanges === true ||
        (status && status.devVersion > status.liveVersion);
    const isLocked = status?.deployStatusField === 'LOCKED';

    // Clear local deploying flag when backend confirms completion
    useEffect(() => {
        if (status?.deployStatusField !== 'DEPLOYING' && status?.deployStatusField !== 'DEV_DIRTY' && isDeployingLocal) {
            setIsDeployingLocal(false);
        }
    }, [status?.deployStatusField, isDeployingLocal]);

    const deployStateUi = (() => {
        const state = status?.deployStatusField;
        switch (state) {
            case 'NOT_DEPLOYED':
                return { label: 'Not deployed yet', chipClass: 'dashboard-status-chip dashboard-status-chip--neutral' };
            case 'SYNCED':
                return { label: 'Up to date', chipClass: 'dashboard-status-chip dashboard-status-chip--success' };
            case 'DEV_DIRTY':
                return { label: 'Unpublished changes', chipClass: 'dashboard-status-chip dashboard-status-chip--warning' };
            case 'DEPLOYING':
                return { label: 'Publishing…', chipClass: 'dashboard-status-chip dashboard-status-chip--info' };
            case 'LOCKED':
                return { label: 'Deployment locked', chipClass: 'dashboard-status-chip dashboard-status-chip--danger' };
            default:
                return { label: 'Unknown', chipClass: 'dashboard-status-chip dashboard-status-chip--neutral' };
        }
    })();

    return (
        <div className="dashboard-page px-4 py-4 md:px-6 md:py-6">
            {/* Header */}
            <div className="page-header md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className={deployStateUi.chipClass}>{deployStateUi.label}</span>
                        <span className="dashboard-status-chip dashboard-status-chip--neutral">
                            {activeBranch === "DEV" ? <GitBranch className="size-3" /> : <Globe2 className="size-3" />}
                            {activeBranch} mode
                        </span>
                    </div>
                    <h1 className="type-page-title">Deploy to Live</h1>
                    <p className="type-body-muted">
                        Move your draft changes from the development environment to your public live chatbot.
                    </p>
                </div>

                {activeBranch === 'LIVE' && (
                    <Button variant="outline" onClick={() => switchBranch('DEV')} className="self-start">
                        Switch to DEV to Deploy
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Column — swaps between DeployVisual and DiffView */}
                <div className="lg:col-span-2 space-y-6">
                    {pageView === "default" && isLocked && (
                        <Alert variant="destructive" className="border-[var(--status-danger-border)] bg-[var(--status-danger-bg)]">
                            <ShieldAlert className="h-5 w-5" />
                            <AlertTitle>Deployment Locked</AlertTitle>
                            <AlertDescription>
                                Your chatbot configuration is currently locked due to a previous deployment failure.
                                Please contact support.
                            </AlertDescription>
                        </Alert>
                    )}

                    {pageView === "default" && !isDirty && !isDeploying && !isLocked && (
                        <Alert className="border-[var(--status-success-border)] bg-[var(--status-success-bg)] text-[var(--status-success-fg)]">
                            <CheckCircle2 className="h-5 w-5 text-[var(--status-success-fg)]" />
                            <AlertTitle>All changes synced</AlertTitle>
                            <AlertDescription>
                                Your LIVE chatbot is currently running the latest version of your configuration.
                            </AlertDescription>
                        </Alert>
                    )}

                    <AnimatePresence mode="wait">
                        {pageView === "reviewing" ? (
                            <motion.div
                                key="diff-view"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.25 }}
                            >
                                <DeploymentDiffView
                                    botId={botId}
                                    onConfirm={handleConfirmDeploy}
                                    onBack={() => setPageView("default")}
                                    isDeploying={isDeploying}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="deploy-visual"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.25 }}
                            >
                                <Card className="overflow-hidden border-border/60 shadow-md h-[calc(100vh-220px)] min-h-[560px]">
                                    <DeployVisual isDeploying={isDeploying} />
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Actions Column */}
                <div className="space-y-6">
                    {/* Status Card */}
                    <Card className="bg-card">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Release Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="dashboard-panel-muted rounded-[var(--panel-radius-sm)] p-3">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Live</p>
                                    <p className="mt-1 text-2xl font-bold text-foreground">v{status?.liveVersion || 0}</p>
                                </div>
                                <div className="dashboard-panel-muted rounded-[var(--panel-radius-sm)] p-3">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Draft</p>
                                    <p className="mt-1 text-2xl font-bold text-primary">v{status?.devVersion || 0}</p>
                                </div>
                            </div>
                            <div className="pt-2 border-t border-border">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">State</span>
                                    <span className={deployStateUi.chipClass}>{deployStateUi.label}</span>
                                </div>
                                {status?.lastDeployedAt && (
                                    <div className="flex items-center justify-between text-xs mt-1">
                                        <span className="text-muted-foreground">Last Deployed</span>
                                        <span className="text-foreground">
                                            {new Date(status.lastDeployedAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Push Card */}
                    <Card className={`relative overflow-hidden transition-all duration-300 ${isDirty && !isDeploying && pageView === "default" ? 'border-primary/30 shadow-lg' : 'opacity-80'}`}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Rocket className="w-5 h-5 text-primary" />
                                Push to Live
                            </CardTitle>
                            <CardDescription>
                                Publish your draft changes to production.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-4">
                            <div className="rounded-[var(--panel-radius-sm)] border border-[var(--status-info-border)] bg-[var(--status-info-bg)] p-3 text-xs text-[var(--status-info-fg)] flex gap-3">
                                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                <p>This will deploy all the changes which you have done on your live chatbot. User will be affected.</p>
                            </div>
                            <div className="mt-3 rounded-[var(--panel-radius-sm)] border border-[var(--status-warning-border)] bg-[var(--status-warning-bg)] p-3 text-xs text-[var(--status-warning-fg)] flex gap-3">
                                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                <p>Your chatbot will be inactive for a short duration (1-2 minutes) during deployment.</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full"
                                disabled={!isDirty || isDeploying || isActionInProgress || activeBranch !== 'DEV' || pageView === "reviewing"}
                                onClick={handleReviewChanges}
                            >
                                {isDeploying ? "Deploying..." : pageView === "reviewing" ? "Reviewing Changes…" : "Review & Publish"}
                            </Button>
                        </CardFooter>

                        {/* Progress Overlay if deploying */}
                        <AnimatePresence>
                            {isDeploying && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-background/80 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-6 text-center"
                                >
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Rocket className="w-10 h-10 text-primary" />
                                    </motion.div>
                                    <h4 className="mt-4 font-bold text-foreground">Pushing Changes</h4>
                                    <p className="text-xs text-muted-foreground mt-1">Please wait until the sync is complete. This usually takes less than a minute.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>

                    {/* Rollback Card */}
                    <Card className={status?.liveVersion === 0 ? 'opacity-50 cursor-not-allowed' : ''}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <RotateCcw className="w-5 h-5 text-muted-foreground" />
                                Reset Changes
                            </CardTitle>
                            <CardDescription>
                                Reset your draft and restore from Live.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-4">
                            <div className="rounded-[var(--panel-radius-sm)] border border-border bg-[var(--surface-secondary)] p-3 text-xs text-muted-foreground flex gap-3">
                                <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                <p>This will remove all your changes to the current live stage. Your draft will be replaced by the current production configuration.</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                variant="outline"
                                className="w-full border-border hover:bg-muted"
                                disabled={status?.liveVersion === 0 || isDeploying || isActionInProgress || activeBranch !== 'DEV'}
                                onClick={handleRollback}
                            >
                                Reset Draft & Sync
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
