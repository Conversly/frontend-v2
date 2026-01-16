import { usePermissions } from "@/hooks/use-permissions";
import { ReactNode } from "react";

interface RoleGuardProps {
    children: ReactNode;
    requireOwner?: boolean;
}

export function RoleGuard({ children, requireOwner }: RoleGuardProps) {
    const { isOwner } = usePermissions();

    if (requireOwner && !isOwner) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center h-full">
                <h3 className="text-lg font-semibold">Access Denied</h3>
                <p className="text-muted-foreground">You do not have permission to view this page.</p>
            </div>
        );
    }

    return <>{children}</>;
}
