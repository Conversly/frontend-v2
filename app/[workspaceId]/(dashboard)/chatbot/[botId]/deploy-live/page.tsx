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
import { DeploymentDiffView } from "@/components/deploy/DeploymentDiffModal";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Rocket,
    RotateCcw,
    AlertTriangle,
    CheckCircle2,
    ShieldAlert,
    Info,
    GitBranch,
    Globe2,
    Globe,
    ArrowRight,
    Loader2,
    Clock
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

    useEffect(() => {
        fetchStatus();
    }, [fetchStatus]);

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

    const draftPanelStyle = isDirty
        ? { bg: 'bg-[var(--status-warning-bg)]', border: 'border-[var(--status-warning-border)]', text: 'text-[var(--status-warning-fg)]' }
        : { bg: 'bg-[var(--surface-secondary)]', border: 'border-[var(--border-secondary)]', text: 'text-muted-foreground' };

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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Column */}
                <div className="lg:col-span-2 space-y-4">
                    <AnimatePresence mode="wait">
                        {pageView === "reviewing" ? (
                            <motion.div
                                key="diff-view"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
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
                                key="overview"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-4"
                            >
                                {/* Environment Comparison Card */}
                                <Card className="border-border/60 shadow-[var(--shadow-1)]">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="type-card-title">Environments</CardTitle>
                                        <CardDescription className="type-body-muted">
                                            Current state of your live and draft environments.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                                            {/* LIVE panel */}
                                            <div className="rounded-[var(--panel-radius-sm)] border border-[var(--status-success-border)] bg-[var(--status-success-bg)] p-4 space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <Globe className="w-4 h-4 text-[var(--status-success-fg)]" />
                                                    <span className="type-caption text-[var(--status-success-fg)]">Live</span>
                                                </div>
                                                <p className="text-3xl font-bold text-foreground">
                                                    v{isLoading ? '—' : (status?.liveVersion ?? 0)}
                                                </p>
                                                <p className="type-body-muted text-xs">
                                                    {status?.lastDeployedAt
                                                        ? <>Last deployed {new Date(status.lastDeployedAt).toLocaleDateString()}</>
                                                        : status?.liveVersion === 0
                                                        ? 'Never deployed'
                                                        : 'No date recorded'}
                                                </p>
                                            </div>

                                            {/* Arrow */}
                                            <div className="flex flex-col items-center gap-1 text-muted-foreground">
                                                <ArrowRight className="w-5 h-5" />
                                            </div>

                                            {/* DRAFT panel */}
                                            <div className={`rounded-[var(--panel-radius-sm)] border ${draftPanelStyle.border} ${draftPanelStyle.bg} p-4 space-y-3`}>
                                                <div className="flex items-center gap-2">
                                                    <GitBranch className={`w-4 h-4 ${draftPanelStyle.text}`} />
                                                    <span className={`type-caption ${draftPanelStyle.text}`}>Draft (DEV)</span>
                                                </div>
                                                <p className="text-3xl font-bold text-foreground">
                                                    v{isLoading ? '—' : (status?.devVersion ?? 0)}
                                                </p>
                                                <p className={`text-xs ${draftPanelStyle.text}`}>
                                                    {isDirty ? 'Unpublished changes' : 'In sync with live'}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Status Banner */}
                                {isLocked && (
                                    <div className="rounded-[var(--panel-radius-sm)] border border-[var(--status-danger-border)] bg-[var(--status-danger-bg)] px-4 py-3 flex items-start gap-3">
                                        <ShieldAlert className="w-4 h-4 mt-0.5 text-[var(--status-danger-fg)] flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-medium text-[var(--status-danger-fg)]">Deployment Locked</p>
                                            <p className="text-xs text-[var(--status-danger-fg)] opacity-80 mt-0.5">
                                                Your chatbot configuration is currently locked due to a previous deployment failure. Please contact support.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {isDeploying && (
                                    <div className="rounded-[var(--panel-radius-sm)] border border-[var(--status-info-border)] bg-[var(--status-info-bg)] px-4 py-3 flex items-center gap-3">
                                        <Loader2 className="w-4 h-4 animate-spin text-[var(--status-info-fg)] flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-medium text-[var(--status-info-fg)]">Publishing to production…</p>
                                            <p className="text-xs text-[var(--status-info-fg)] opacity-80 mt-0.5">
                                                This usually takes under a minute. The page will update automatically.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {!isDeploying && !isLocked && isDirty && (
                                    <div className="rounded-[var(--panel-radius-sm)] border border-[var(--status-warning-border)] bg-[var(--status-warning-bg)] px-4 py-3 flex items-center gap-3">
                                        <Info className="w-4 h-4 text-[var(--status-warning-fg)] flex-shrink-0" />
                                        <p className="text-sm text-[var(--status-warning-fg)]">
                                            You have unpublished changes. Review and publish when ready.
                                        </p>
                                    </div>
                                )}

                                {!isDeploying && !isLocked && !isDirty && status?.deployStatusField !== 'NOT_DEPLOYED' && (
                                    <div className="rounded-[var(--panel-radius-sm)] border border-[var(--status-success-border)] bg-[var(--status-success-bg)] px-4 py-3 flex items-center gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-[var(--status-success-fg)] flex-shrink-0" />
                                        <p className="text-sm text-[var(--status-success-fg)]">
                                            All changes synced. Your live chatbot is up to date.
                                        </p>
                                    </div>
                                )}

                                {!isDeploying && !isLocked && status?.deployStatusField === 'NOT_DEPLOYED' && (
                                    <div className="rounded-[var(--panel-radius-sm)] border border-[var(--status-neutral-border)] bg-[var(--status-neutral-bg)] px-4 py-3 flex items-center gap-3">
                                        <Clock className="w-4 h-4 text-[var(--status-neutral-fg)] flex-shrink-0" />
                                        <p className="text-sm text-[var(--status-neutral-fg)]">
                                            No live version yet. Push your first deployment to go live.
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Actions Column */}
                <div className="space-y-4">
                    {/* Release Status Card */}
                    <Card className="bg-card border-border/60 shadow-[var(--shadow-1)]">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Release Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">State</span>
                                    <span className={deployStateUi.chipClass}>{deployStateUi.label}</span>
                                </div>
                                {status?.lastDeployedAt && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Last Deployed</span>
                                        <span className="text-foreground text-xs">
                                            {new Date(status.lastDeployedAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                )}
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Live version</span>
                                    <span className="text-foreground font-medium">v{status?.liveVersion ?? 0}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Draft version</span>
                                    <span className="text-primary font-medium">v{status?.devVersion ?? 0}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Push to Live Card */}
                    <Card className={`relative overflow-hidden transition-all duration-300 border-border/60 shadow-[var(--shadow-1)] ${isDirty && !isDeploying && pageView === "default" ? 'border-primary/40' : ''}`}>
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 type-card-title">
                                <Rocket className="w-4 h-4 text-primary" />
                                Push to Live
                            </CardTitle>
                            <CardDescription className="type-body-muted">
                                Publish your draft changes to production.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-3 space-y-2">
                            <div className="flex items-start gap-2 text-xs text-[var(--status-info-fg)]">
                                <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                                <p>Deploys all changes to your live chatbot. Users will be affected.</p>
                            </div>
                            <div className="flex items-start gap-2 text-xs text-[var(--status-warning-fg)]">
                                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                                <p>Chatbot will be inactive for 1–2 minutes during deployment.</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full gap-2"
                                disabled={!isDirty || isDeploying || isActionInProgress || activeBranch !== 'DEV' || pageView === "reviewing"}
                                onClick={handleReviewChanges}
                            >
                                <Rocket className="w-4 h-4" />
                                {isDeploying ? "Deploying..." : pageView === "reviewing" ? "Reviewing Changes…" : "Review & Publish"}
                            </Button>
                        </CardFooter>

                        <AnimatePresence>
                            {isDeploying && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-background/85 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-6 text-center"
                                >
                                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                    <h4 className="mt-3 font-semibold text-sm text-foreground">Publishing Changes</h4>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Please wait while the sync completes.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>

                    {/* Reset Changes Card */}
                    <Card className={`border-border/60 shadow-[var(--shadow-1)] ${status?.liveVersion === 0 ? 'opacity-50 pointer-events-none' : ''}`}>
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 type-card-title text-muted-foreground">
                                <RotateCcw className="w-4 h-4" />
                                Reset Changes
                            </CardTitle>
                            <CardDescription className="type-body-muted">
                                Reset your draft and restore from Live.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-3">
                            <div className="flex items-start gap-2 text-xs text-muted-foreground">
                                <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                                <p>Removes all draft changes. Your draft will match the current live configuration.</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                variant="ghost"
                                className="w-full text-destructive hover:bg-destructive/5 hover:text-destructive"
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
