"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Bot, Loader2, AlertTriangle } from "lucide-react";
import { ChatbotPreviewCard } from "@/components/chatbot/ChatbotPreviewCard";
import { useGetChatbots, useDeleteChatbot } from "@/services/chatbot";
import { useRouter } from "next/navigation";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSetupStore } from "@/store/chatbot/setup";
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

export default function ChatbotsPage() {
  const router = useRouter();
  const { data: chatbots, isLoading, error } = useGetChatbots();
  const { mutate: deleteChatbot, isPending: isDeleting } = useDeleteChatbot();
  const resetSetup = useSetupStore((s) => s.reset);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Check if user is authenticated
  useEffect(() => {
    const isLoggedIn = localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN) === "true";
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [router]);

  const handleDeleteClick = (chatbotId: string) => {
    setDeleteId(chatbotId);
  };

  const confirmDelete = () => {
    if (!deleteId) return;

    deleteChatbot(
      { id: deleteId },
      {
        onSuccess: () => {
          toast.success("Chatbot deleted successfully");
          setDeleteId(null);
        },
        onError: (error: any) => {
          toast.error(error.message || "Failed to delete chatbot");
          setDeleteId(null);
        },
      }
    );
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

  if (error) {
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
                <p className="text-sm text-muted-foreground">
                  {error instanceof Error ? error.message : "Failed to load chatbots"}
                </p>
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
    <>
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
                  onDelete={handleDeleteClick}
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

      <AlertDialog open={!!deleteId} onOpenChange={(open: boolean) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Delete Chatbot
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this chatbot? This action cannot be undone and will permanently remove all data associated with this bot.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                confirmDelete();
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
