import { toast } from "sonner";

export const handleEntitlementError = (error: any) => {
    // Check for 403 Forbidden which we now throw from backend for entitlement issues
    if (error?.response?.status === 403 || error?.status === 403) {
        const message = error?.response?.data?.message || error?.message || "Plan limit reached";

        // Check if it's an entitlement error based on message content or just assume 403 is entitlement for now
        if (message.includes("Quota exceeded") || message.includes("Feature not allowed")) {
            toast.error(message, {
                description: "Upgrade your plan to unlock higher limits.",
                action: {
                    label: "Upgrade",
                    onClick: () => {
                        window.location.href = "/billing";
                    },
                },
                duration: 5000,
            });
            return true; // Handled
        }
    }
    return false; // Not handled
};
