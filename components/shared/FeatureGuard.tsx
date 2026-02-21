"use client";

import React, { useState } from "react";
import { useAccessControl, Features } from "@/hooks/useAccessControl";
import { UpgradeDialog } from "@/components/billingsdk/UpgradeDialog";
import { useWorkspace } from "@/contexts/workspace-context";

interface FeatureGuardProps {
    feature: Features;
    currentUsage?: number;
    children: React.ReactNode | ((props: { isLocked: boolean }) => React.ReactNode);
    fallback?: React.ReactNode;
}

export function FeatureGuard({
    feature,
    currentUsage,
    children,
    fallback = null,
}: FeatureGuardProps) {
    const { workspaceId } = useWorkspace();
    const accessControl = useAccessControl(workspaceId);
    const featureAccess = accessControl[feature];

    const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState({ title: "", description: "" });

    if (accessControl.isLoading) {
        // Return children. If it's a function, call it with a loading/locked state (true for locked to be safe)
        if (typeof children === "function") {
            return <>{children({ isLocked: true })}</>;
        }
        return <>{children}</>;
    }

    // 1. RBAC Check (e.g. Members cannot see these management buttons)
    if (!featureAccess.canManage) {
        return <>{fallback}</>;
    }

    // Helper to intercept clicks
    const handleClickInterceptor = (e: React.MouseEvent) => {
        // 2. Entitlement / Active Account Check
        if (!featureAccess.isEnabledOnPlan) {
            e.preventDefault();
            e.stopPropagation();
            setDialogContent({
                title: `Upgrade to use ${feature}`,
                description: "Your current plan does not support this feature, or your account is inactive. Please upgrade to unlock.",
            });
            setIsUpgradeDialogOpen(true);
            return;
        }

        // 3. Limit Check
        if (
            typeof featureAccess.limit === 'number' &&
            featureAccess.limit !== -1 &&
            currentUsage !== undefined &&
            currentUsage >= featureAccess.limit
        ) {
            e.preventDefault();
            e.stopPropagation();
            setDialogContent({
                title: `Upgrade to add more ${feature}`,
                description: `Your current plan allows up to ${featureAccess.limit}. Upgrade your plan to increase this limit.`,
            });
            setIsUpgradeDialogOpen(true);
            return;
        }
    };

    const isLocked = !featureAccess.isEnabledOnPlan || (
        typeof featureAccess.limit === 'number' &&
        featureAccess.limit !== -1 &&
        currentUsage !== undefined &&
        currentUsage >= featureAccess.limit
    );

    // Render children depending on whether it's a function or standard node
    const childrenToRender = typeof children === "function" ? children({ isLocked }) : children;

    // Clone the child element to attach our onClick interceptor
    // Note: This assumes a single actionable child. For complex structures, use a wrapper div.
    let wrappedChild = childrenToRender;

    if (React.isValidElement<{ onClick?: (e: React.MouseEvent) => void }>(childrenToRender)) {
        wrappedChild = React.cloneElement(childrenToRender, {
            onClick: (e: React.MouseEvent) => {
                handleClickInterceptor(e);
                // If not blocked, call the original onClick
                if (!e.defaultPrevented && childrenToRender.props.onClick) {
                    childrenToRender.props.onClick(e);
                }
            },
        });
    }

    return (
        <>
            {wrappedChild}
            <UpgradeDialog
                open={isUpgradeDialogOpen}
                onOpenChange={setIsUpgradeDialogOpen}
                title={dialogContent.title}
                description={dialogContent.description}
            />
        </>
    );
}
