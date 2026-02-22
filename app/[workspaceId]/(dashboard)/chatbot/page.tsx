"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";
import { useGetChatbots, useDeleteChatbot } from "@/services/chatbot";
import { useSetupStore } from "@/store/chatbot/setup";
import { useBranchStore } from "@/store/branch";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Loader2, Lock, Plus } from "lucide-react";
import { ChatbotPreviewCard } from "@/components/chatbot/ChatbotPreviewCard";
import { ResumeActivateCard } from "@/components/chatbot/ResumeActivateCard";
import { EmptyState } from "@/components/shared";
import { Separator } from "@/components/ui/separator";
import { FeatureGuard } from "@/components/shared/FeatureGuard";
import { useAccessControl } from "@/hooks/useAccessControl";
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

export default function WorkspaceChatbotsPage() {
  const router = useRouter();
  const params = useParams<{ workspaceId: string }>();
  const workspaceId = params.workspaceId;

  const setWorkspaceId = useSetupStore((s) => s.setWorkspaceId);
  const resetSetup = useSetupStore((s) => s.reset);
  const switchBranch = useBranchStore((s) => s.switchBranch);
  const { data: chatbots, isLoading, error } = useGetChatbots(workspaceId);
  const { mutate: deleteChatbot, isPending: isDeleting } = useDeleteChatbot();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const accessControl = useAccessControl(workspaceId);
  const chatbotsUsed = chatbots?.length ?? 0;

  useEffect(() => {
    setWorkspaceId(workspaceId);
  }, [setWorkspaceId, workspaceId]);

  useEffect(() => {
    const isLoggedIn =
      typeof window !== "undefined" &&
      localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN) === "true";
    if (!isLoggedIn) router.push("/");
  }, [router]);

  const handleCreateChatbot = () => {
    resetSetup();
    setWorkspaceId(workspaceId);
    switchBranch("DEV");
    router.push(`/${workspaceId}/chatbot/create/setup`);
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    deleteChatbot(
      { id: deleteId, workspaceId },
      {
        onSuccess: () => {
          toast.success("Chatbot deleted successfully");
          setDeleteId(null);
        },
        onError: (e: any) => {
          toast.error(e?.message || "Failed to delete chatbot");
          setDeleteId(null);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center">
        <div className="container max-w-7xl px-4 py-8 md:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Loading your chatbots...
              </p>
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

  const list = chatbots ?? [];

  // Pick the single most-recently-created DRAFT bot for the Resume card
  const incompleteBots = list.filter((b) => b.status === "DRAFT");
  const resumeBot = incompleteBots.sort((a, b) => {
    const tA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const tB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return tB - tA; // newest first
  })[0] ?? null;

  // Active-only bots rendered via the normal card
  const activeBots = list.filter((b) => b.status !== "DRAFT");

  return (
    <>
      <div className="w-full justify-center p-6">
        <div className="container max-w-7xl px-0 md:px-0 lg:px-0">
          <div className="page-header">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Chatbots</h1>
                <p className="text-sm text-muted-foreground">
                  Manage chatbots in this workspace.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FeatureGuard feature="chatbots" currentUsage={chatbotsUsed}>
                  {({ isLocked }) => (
                    <Button
                      onClick={handleCreateChatbot}
                      variant={!isLocked ? "default" : "outline"}
                      className={isLocked ? "border-amber-400 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20" : ""}
                    >
                      {isLocked ? <Lock className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                      Create chatbot
                      {isLocked && (
                        <span className="ml-2 text-[10px] font-medium bg-amber-100 dark:bg-amber-900/30 px-1.5 py-0.5 rounded-full">
                          Upgrade
                        </span>
                      )}
                    </Button>
                  )}
                </FeatureGuard>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {list.length === 0 ? (
            <FeatureGuard feature="chatbots" currentUsage={chatbotsUsed}>
              {({ isLocked }) => (
                <EmptyState
                  title="No chatbots yet"
                  description="Create your first chatbot in this workspace."
                  primaryAction={{
                    label: "Create chatbot",
                    onClick: handleCreateChatbot,
                    icon: <Plus />,
                  }}
                />
              )}
            </FeatureGuard>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Resume & Activate card — shown first for the most-recently-created incomplete bot */}
              {resumeBot && (
                <ResumeActivateCard
                  key={`resume-${resumeBot.id}`}
                  chatbot={resumeBot}
                  onDelete={() => setDeleteId(resumeBot.id)}
                />
              )}
              {activeBots.map((bot) => (
                <ChatbotPreviewCard
                  key={bot.id}
                  chatbot={bot}
                  onDelete={() => setDeleteId(bot.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div >

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete chatbot?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={isDeleting}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </>
  );
}

