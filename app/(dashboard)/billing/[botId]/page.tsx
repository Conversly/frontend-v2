"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ChatbotAnalyticsView } from "@/components/billing/chatbot-analytics-view";
import { RoleGuard } from "@/components/auth/role-guard";
import { useWorkspaces } from "@/hooks/use-workspaces";
import { useGetChatbots } from "@/services/chatbot";

export default function ChatbotBillingPage() {
    const params = useParams();
    const router = useRouter();
    const botId = params.botId as string;
    const { activeWorkspaceId } = useWorkspaces();
    const { data: chatbots } = useGetChatbots(activeWorkspaceId || undefined);

    // Validate chatbot belongs to current workspace
    useEffect(() => {
        if (activeWorkspaceId && chatbots) {
            const chatbotExists = chatbots.some(cb => cb.id === botId);
            if (!chatbotExists) {
                // Chatbot doesn't belong to current workspace, redirect to billing dashboard
                router.replace("/billing");
            }
        }
    }, [activeWorkspaceId, chatbots, botId, router]);

    const handleBack = () => {
        router.push("/billing");
    };

    // Show loading while validating
    if (!activeWorkspaceId || !chatbots) {
        return (
            <RoleGuard requireBillingAdmin>
                <div className="container mx-auto py-6 max-w-7xl">
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <p className="text-muted-foreground">Loading workspace...</p>
                        </div>
                    </div>
                </div>
            </RoleGuard>
        );
    }

    // Check if chatbot exists in current workspace
    const chatbotExists = chatbots.some(cb => cb.id === botId);
    if (!chatbotExists) {
        return (
            <RoleGuard requireBillingAdmin>
                <div className="container mx-auto py-6 max-w-7xl">
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <p className="text-muted-foreground">Chatbot not found in current workspace.</p>
                            <button
                                onClick={handleBack}
                                className="mt-4 text-sm text-primary hover:underline"
                            >
                                Return to Billing Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </RoleGuard>
        );
    }

    return (
        <RoleGuard requireBillingAdmin>
            <div className="container mx-auto py-6 max-w-7xl">
                <ChatbotAnalyticsView chatbotId={botId} onBack={handleBack} />
            </div>
        </RoleGuard>
    );
}
