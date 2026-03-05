"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";
import { useSuspenseGetChatbots, useDeleteChatbot } from "@/services/chatbot";
import { useSetupStore } from "@/store/chatbot/setup";
import { useBranchStore } from "@/store/branch";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SmartToy, Lock, Add } from "@mui/icons-material";
import { ChatbotPreviewCard } from "@/components/chatbot/ChatbotPreviewCard";
import { ResumeActivateCard } from "@/components/chatbot/ResumeActivateCard";
import { EmptyState } from "@/components/shared";
import { Separator } from "@/components/ui/separator";
import { FeatureGuard } from "@/components/shared/FeatureGuard";
import { useAccessControl } from "@/hooks/useAccessControl";
import { AsyncBoundary } from "@/components/shared/AsyncBoundary";
import { ChatbotListSkeleton, ChatbotCardSkeleton } from "@/components/skeletons";
import type { ChatbotResponse } from "@/types/chatbot";
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

// =============================================================================
// Dynamic Content Component - Uses Suspense
// =============================================================================

interface ChatbotListContentProps {
  workspaceId: string;
  onDelete: (id: string) => void;
  onCreateChatbot: () => void;
}

function ChatbotListContent({ workspaceId, onDelete, onCreateChatbot }: ChatbotListContentProps) {
  const { data: chatbots } = useSuspenseGetChatbots(workspaceId);
  const chatbotsUsed = chatbots?.length ?? 0;

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

  if (list.length === 0) {
    return (
      <FeatureGuard feature="chatbots" currentUsage={chatbotsUsed}>
        {({ isLocked }) => (
          <EmptyState
            title="No chatbots yet"
            description="Create your first chatbot in this workspace."
            primaryAction={{
              label: "Create chatbot",
              onClick: onCreateChatbot,
              icon: <Add />,
            }}
          />
        )}
      </FeatureGuard>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Resume & Activate card — shown first for the most-recently-created incomplete bot */}
      {resumeBot && (
        <ResumeActivateCard
          key={`resume-${resumeBot.id}`}
          chatbot={resumeBot}
          onDelete={() => onDelete(resumeBot.id)}
        />
      )}
      {activeBots.map((bot) => (
        <ChatbotPreviewCard
          key={bot.id}
          chatbot={bot}
          onDelete={() => onDelete(bot.id)}
        />
      ))}
    </div>
  );
}

// =============================================================================
// Error Fallback Component
// =============================================================================

function ChatbotListError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="w-full flex justify-center">
      <div className="container max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <Card className="mx-auto max-w-md p-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="rounded-full bg-destructive/10 p-4">
              <SmartToy sx={{ fontSize: 48, color: "var(--destructive)" }} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Error loading chatbots</h3>
              <p className="text-sm text-muted-foreground">
                {error.message || "Failed to load chatbots"}
              </p>
            </div>
            <Button onClick={reset} size="lg" className="mt-4">
              Try Again
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// =============================================================================
// Skeleton Grid for Loading State
// =============================================================================

function ChatbotGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ChatbotCardSkeleton key={i} />
      ))}
    </div>
  );
}

// =============================================================================
// Main Page Component
// =============================================================================

export default function WorkspaceChatbotsPage() {
  const router = useRouter();
  const params = useParams<{ workspaceId: string }>();
  const workspaceId = params.workspaceId;

  const setWorkspaceId = useSetupStore((s) => s.setWorkspaceId);
  const resetSetup = useSetupStore((s) => s.reset);
  const switchBranch = useBranchStore((s) => s.switchBranch);
  const { mutate: deleteChatbot, isPending: isDeleting } = useDeleteChatbot();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const accessControl = useAccessControl(workspaceId);

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

  // Count chatbots for feature guard (optimistically shows 0 while loading)
  const chatbotsUsed = 0;

  return (
    <>
      <div className="w-full justify-center p-6">
        <div className="container max-w-7xl px-0 md:px-0 lg:px-0">
          {/* Static Header - Renders Immediately */}
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
                      className={
                        isLocked
                          ? "border border-sky-300/70 dark:border-sky-700/50 text-sky-600 dark:text-sky-400 bg-sky-50/50 dark:bg-sky-950/20 hover:bg-sky-100 dark:hover:bg-sky-900/30 hover:border-sky-400/80 dark:hover:border-sky-600/60 transition-all"
                          : ""
                      }
                    >
                      {isLocked ? <Lock sx={{ fontSize: 16, mr: 1 }} /> : <Add sx={{ fontSize: 16, mr: 1 }} />}
                      Create chatbot
                      {isLocked && (
                        <span className="ml-2 text-[10px] font-medium bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 px-2 py-0.5 rounded-full">
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

          {/* Dynamic Content - Streams in with Suspense */}
          <AsyncBoundary
            loadingFallback={<ChatbotGridSkeleton count={6} />}
            errorFallback={ChatbotListError}
          >
            <ChatbotListContent
              workspaceId={workspaceId}
              onDelete={setDeleteId}
              onCreateChatbot={handleCreateChatbot}
            />
          </AsyncBoundary>
        </div>
      </div>

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

