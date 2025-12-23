"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Bot, Loader2 } from "lucide-react";
import { ChatbotPreviewCard } from "@/components/chatbot/ChatbotPreviewCard";
import { useGetChatbots, useDeleteChatbot } from "@/services/chatbot";
import { useRouter } from "next/navigation";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSetupStore } from "@/store/chatbot/setup";
import { useWorkspaces } from "@/hooks/use-workspaces";

export default function ChatbotsPage() {
  const router = useRouter();
  const { activeWorkspaceId, workspaces, isLoading: workspacesLoading } = useWorkspaces();
  const { data: chatbots, isLoading: chatbotsLoading, error } = useGetChatbots(activeWorkspaceId || undefined);
  const { mutate: deleteChatbot } = useDeleteChatbot();
  const resetSetup = useSetupStore((s) => s.reset);
  
  const isLoading = workspacesLoading || chatbotsLoading;

  // Check if user is authenticated and has a workspace
  useEffect(() => {
    const isLoggedIn = localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN) === "true";
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    
    // If no workspace is selected and workspaces are loaded, redirect to manage page
    if (!workspacesLoading && workspaces && workspaces.length > 0 && !activeWorkspaceId) {
      router.push("/manage");
    }
    
    // If no workspaces exist, redirect to manage page to create one
    if (!workspacesLoading && workspaces && workspaces.length === 0) {
      router.push("/manage");
    }
  }, [router, activeWorkspaceId, workspaces, workspacesLoading]);

  const handleDelete = (chatbotId: string) => {
    if (confirm("Are you sure you want to delete this chatbot? This action cannot be undone.")) {
      deleteChatbot(
        { id: chatbotId },
        {
          onSuccess: () => {
            toast.success("Chatbot deleted successfully");
          },
          onError: (error: any) => {
            toast.error(error.message || "Failed to delete chatbot");
          },
        }
      );
    }
  };

  const handleCreateChatbot = () => {
    // Reset any existing setup state to start fresh
    resetSetup();
    // Navigate to setup page
    router.push("/chatbot/create/setup");
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center">
        <div className="container max-w-7xl px-4 py-8 md:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading your chatbots...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state while checking workspace
  if (workspacesLoading || !activeWorkspaceId) {
    return (
      <div className="w-full flex justify-center">
        <div className="container max-w-7xl px-4 py-8 md:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                {workspacesLoading ? "Loading workspaces..." : "Selecting workspace..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    // Only show error if it's not a workspace-related error (403)
    const errorMessage = error instanceof Error ? error.message : "Failed to load chatbots";
    const isWorkspaceError = errorMessage.includes("workspace") || errorMessage.includes("403");
    
    if (isWorkspaceError) {
      // Redirect to manage page if workspace error
      router.push("/manage");
      return null;
    }
    
    return (
      <div className="w-full flex justify-center">
        <div className="container max-w-7xl px-4 py-8 md:px-6 lg:px-8">
          <Card className="mx-auto max-w-md p-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="rounded-full bg-destructive/10 p-4">
                <Bot className="h-12 w-12 text-destructive" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Error loading chatbots</h3>
                <p className="text-sm text-muted-foreground">{errorMessage}</p>
              </div>
              <Button onClick={() => window.location.reload()} size="lg" className="mt-4">
                Try Again
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <div className="container max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-muted-foreground">
              Manage and monitor all your chatbots
            </p>
          </div>
          <Button onClick={handleCreateChatbot}>
            <Plus className="mr-2 h-4 w-4" />
            Create Chatbot
          </Button>
        </div>

        {chatbots && chatbots.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {chatbots.map((chatbot) => (
              <ChatbotPreviewCard 
                key={chatbot.id} 
                chatbot={chatbot} 
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <Card className="mx-auto max-w-md p-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="rounded-full bg-muted/50 p-4">
                <Bot className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">No chatbots yet</h3>
                <p className="text-sm text-muted-foreground">
                  Get started by creating your first chatbot to begin engaging with your customers
                </p>
              </div>
              <Button onClick={handleCreateChatbot} size="lg" className="mt-4">
                <Plus className="mr-2 h-5 w-5" />
                Create Chatbot
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
