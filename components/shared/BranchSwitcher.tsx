import { useState, useEffect } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { getDeployStatus } from "@/lib/api/deploy";
import { toast } from 'sonner';
import { useBranch, Branch } from '@/store/branch';
import { cn } from '@/lib/utils';
import { GitBranch, Circle } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface BranchSwitcherProps {
    className?: string;
}

export function BranchSwitcher({ className }: BranchSwitcherProps) {
    const params = useParams();
    const router = useRouter();
    const pathname = usePathname();
    const botId = params?.botId as string;

    const { activeBranch, switchBranch, hasUnpublishedChanges, deployState, liveVersion, setVersions } = useBranch();
    const [pendingBranch, setPendingBranch] = useState<Branch | null>(null);

    // Sync versions from backend
    useEffect(() => {
        if (botId) {
            getDeployStatus(botId).then(status => {
                setVersions(status.devVersion, status.liveVersion);
            }).catch(console.error);
        }
    }, [botId, setVersions]);

    const isDeploying = deployState === 'DEPLOYING';
    const isLocked = deployState === 'LOCKED';
    const isDisabled = isDeploying || isLocked;

    const handleSwitchAttempt = (branch: Branch) => {
        if (branch !== activeBranch) {
            setPendingBranch(branch);
        }
    };

    const confirmSwitch = () => {
        if (pendingBranch) {
            if (pendingBranch === 'LIVE' && liveVersion === 0) {
                toast.info("No live version exists", {
                    description: "You need to deploy your chatbot to live first."
                });
                router.push(`/chatbot/${botId}/deploy-live`);
                setPendingBranch(null);
                return;
            }
            switchBranch(pendingBranch);
            setPendingBranch(null);
        }
    };

    return (
        <TooltipProvider>
            <div className={cn('flex items-center gap-2', className)}>
                {/* Unpublished changes indicator */}
                {hasUnpublishedChanges && activeBranch === 'DEV' && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="flex items-center gap-1 text-xs text-amber-500">
                                <Circle className="h-2 w-2 fill-amber-500" />
                                <span className="hidden sm:inline">Unpublished</span>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>You have unpublished changes</p>
                        </TooltipContent>
                    </Tooltip>
                )}

                {/* Branch Switcher */}
                <div
                    className={cn(
                        'flex items-center rounded-lg border border-border bg-muted/50 p-0.5',
                        isDisabled && 'opacity-50 cursor-not-allowed'
                    )}
                >
                    <BranchButton
                        branch="DEV"
                        isActive={activeBranch === 'DEV'}
                        onClick={() => handleSwitchAttempt('DEV')}
                        disabled={isDisabled}
                        tooltip="Edit configuration (changes not live)"
                    />
                    <BranchButton
                        branch="LIVE"
                        isActive={activeBranch === 'LIVE'}
                        onClick={() => handleSwitchAttempt('LIVE')}
                        disabled={isDisabled}
                        tooltip="View production configuration (read-only)"
                    />
                </div>

                <AlertDialog open={!!pendingBranch} onOpenChange={(open) => !open && setPendingBranch(null)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Switch to {pendingBranch} mode?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                {pendingBranch === 'LIVE' ? (
                                    <>
                                        <strong>LIVE mode</strong> is read-only. You will see the configuration that is currently active and serving your users. To make changes, switch back to DEV mode.
                                    </>
                                ) : (
                                    <>
                                        <strong>DEV mode</strong> is your workspace for making changes. Edits made here will not affect your live chatbot until you publish them.
                                    </>
                                )}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={confirmSwitch}>
                                Switch to {pendingBranch}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {/* Deploying indicator */}
                {isDeploying && (
                    <span className="text-xs text-muted-foreground animate-pulse">
                        Deploying...
                    </span>
                )}

                {/* Locked indicator */}
                {isLocked && (
                    <span className="text-xs text-destructive">
                        Locked
                    </span>
                )}
            </div>
        </TooltipProvider>
    );
}

interface BranchButtonProps {
    branch: Branch;
    isActive: boolean;
    onClick: () => void;
    disabled?: boolean;
    tooltip: string;
}

function BranchButton({ branch, isActive, onClick, disabled, tooltip }: BranchButtonProps) {
    const isDev = branch === 'DEV';

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    onClick={onClick}
                    disabled={disabled || isActive}
                    className={cn(
                        'flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all',
                        'focus:outline-none focus:ring-2 focus:ring-primary/50',
                        isActive
                            ? isDev
                                ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                                : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                        (disabled || isActive) && 'cursor-default'
                    )}
                >
                    <GitBranch className="h-3 w-3" />
                    {branch}
                </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    );
}
