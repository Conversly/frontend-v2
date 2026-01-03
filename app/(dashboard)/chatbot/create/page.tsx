"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Bot, Loader2, AlertCircle, Rocket } from "lucide-react";
import Link from "next/link";
import { useCreateChatbot } from "@/services/chatbot";
import { useUpsertChannelPrompt } from "@/services/prompt";
import { PromptAIHelper } from "@/components/shared/PromptAIHelper";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { checkEntitlements, getCurrentSubscription } from "@/lib/api/subscription";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { QUERY_KEY } from "@/utils/query-key";
import { PlanRestrictionModal } from "@/components/subscription/plan-restriction-modal";

export default function CreateChatbotPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [showRestrictionModal, setShowRestrictionModal] = useState(false);
  const [restrictionMessage, setRestrictionMessage] = useState<string>("");

  const { mutate: createChatbot, isPending: isCreating } = useCreateChatbot();
  const { mutate: upsertPrompt } = useUpsertChannelPrompt();

  // Check entitlements before allowing creation
  const { data: entitlementCheck, isLoading: checkingEntitlements, refetch: refetchEntitlement } = useQuery({
    queryKey: ["entitlements", "create_chatbot"],
    queryFn: () => checkEntitlements("create_chatbot"),
    retry: false,
  });

  // Also get current subscription to show usage
  const { data: currentSubscription } = useQuery({
    queryKey: [QUERY_KEY.CURRENT_SUBSCRIPTION],
    queryFn: getCurrentSubscription,
    retry: false,
  });

  // Determine if user has reached limit
  const hasReachedLimit = currentSubscription
    ? currentSubscription.entitlements?.maxChatbots !== undefined &&
    currentSubscription.entitlements.maxChatbots !== -1 &&
    currentSubscription.usage.chatbots >= currentSubscription.entitlements.maxChatbots
    : currentSubscription === null && entitlementCheck && !entitlementCheck.allowed;

  // Debug: Log when modal state changes
  useEffect(() => {
    if (showRestrictionModal) {
      console.log("Plan restriction modal should be visible now");
      console.log("Restriction message:", restrictionMessage);
    }
  }, [showRestrictionModal, restrictionMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Re-check entitlements before submitting
    const { data: latestCheck } = await refetchEntitlement();

    // Check entitlements first
    if (latestCheck && !latestCheck.allowed) {
      toast.error(latestCheck.reason || "You've reached your plan limit. Please upgrade to create more chatbots.");
      router.push("/plans");
      return;
    }

    if (!name.trim()) {
      toast.error("Please enter a chatbot name");
      return;
    }

    if (!description.trim()) {
      toast.error("Please enter a description");
      return;
    }

    if (!systemPrompt.trim()) {
      toast.error("Please enter system instructions or generate them");
      return;
    }

    createChatbot(
      {
        name: name.trim(),
        description: description.trim(),
      },
      {
        onSuccess: (data) => {
          // Create WIDGET prompt after chatbot is created
          upsertPrompt(
            {
              chatbotId: data.id,
              channel: "WIDGET",
              systemPrompt: systemPrompt.trim(),
            },
            {
              onSuccess: () => {
                toast.success("Chatbot created successfully!");
                // Invalidate entitlements to refresh the check
                queryClient.invalidateQueries({ queryKey: ["entitlements"] });
                queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CURRENT_SUBSCRIPTION] });
                // Invalidate permissions and chatbot list to ensure sidebar/header updates
                queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PERMISSIONS] });
                queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_CHATBOTS] });

                router.push(`/chatbot/${data.id}`);
              },
              onError: (error: any) => {
                // Chatbot created but prompt failed - still redirect
                toast.warning("Chatbot created but prompt setup failed. You can configure it later.");
                queryClient.invalidateQueries({ queryKey: ["entitlements"] });
                queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CURRENT_SUBSCRIPTION] });
                // Invalidate permissions and chatbot list to ensure sidebar/header updates
                queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PERMISSIONS] });
                queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_CHATBOTS] });

                router.push(`/chatbot/${data.id}`);
              },
            }
          );
        },
        onError: (error: any) => {
          // Check if it's a plan restriction error (403 status or PLAN_RESTRICTION code)
          const status = error?.response?.status || error?.status;
          const code = error?.response?.data?.code || error?.code;
          const requiresUpgrade = error?.response?.data?.requiresUpgrade || error?.requiresUpgrade;

          const isPlanRestriction =
            status === 403 ||
            code === 'PLAN_RESTRICTION' ||
            requiresUpgrade === true;

          if (isPlanRestriction) {
            const errorMessage =
              error?.response?.data?.message ||
              error?.message ||
              "You've reached your plan limit. Please upgrade to create more chatbots.";

            setRestrictionMessage(errorMessage);
            setShowRestrictionModal(true);
            // Refresh entitlement check
            queryClient.invalidateQueries({ queryKey: ["entitlements"] });
            refetchEntitlement();
          } else {
            toast.error(error?.response?.data?.message || error?.message || "Failed to create chatbot");
          }
        },
      }
    );
  };

  return (
    <div className="flex flex-1 flex-col h-full w-full items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl space-y-6">


        <Card className="border-border/60 shadow-xl bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Create New Chatbot</CardTitle>
            </div>
            <CardDescription className="text-base">
              Configure your chatbot with a name, description, and system instructions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Chatbot Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Chatbot Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., Customer Support Bot"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isCreating}
                  className="bg-background/50"
                />
                <p className="text-[13px] text-muted-foreground">
                  Choose a descriptive name for your chatbot
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="e.g., A helpful assistant for customer inquiries"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isCreating}
                  rows={3}
                  className="bg-background/50 resize-none"
                />
                <p className="text-[13px] text-muted-foreground">
                  Briefly describe what this chatbot does
                </p>
              </div>

              {/* System Instructions */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="systemPrompt" className="text-sm font-medium">
                    System Instructions <span className="text-destructive">*</span>
                  </Label>
                </div>

                <Textarea
                  id="systemPrompt"
                  placeholder="Enter detailed instructions for how the chatbot should behave..."
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  disabled={isCreating}
                  rows={8}
                  className="font-mono text-sm bg-background/50"
                />

                <div className="flex items-center justify-between">
                  <p className="text-[13px] text-muted-foreground">
                    Define how your chatbot should respond and behave
                  </p>
                </div>

                {/* AI Prompt Helper - Generate only mode (no chatbotId yet) */}
                <div className="pt-1">
                  <PromptAIHelper
                    channel="WIDGET"
                    onPromptGenerated={(prompt) => {
                      setSystemPrompt(prompt);
                      // Toast is already shown in helper, but this ensures parent state update logic is explicit
                    }}
                    disabled={isCreating}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isCreating}
                  className="w-24"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating} className="min-w-32">
                  {isCreating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Bot className="mr-2 h-4 w-4" />
                      Create Chatbot
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6" />
            Create New Chatbot
          </CardTitle>
          <CardDescription>
            Configure your chatbot with a name, description, and system instructions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {checkingEntitlements ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="ml-3 text-muted-foreground">Checking permissions...</p>
            </div>
          ) : (entitlementCheck && !entitlementCheck.allowed) || hasReachedLimit ? (
            <Alert className="mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950/20">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-900 dark:text-amber-200">Plan Limit Reached</AlertTitle>
              <AlertDescription className="text-amber-800 dark:text-amber-300 mt-2">
                {entitlementCheck?.reason ||
                  (currentSubscription
                    ? `You've reached your plan limit of ${currentSubscription.entitlements?.maxChatbots || 1} chatbot${(currentSubscription.entitlements?.maxChatbots || 1) > 1 ? 's' : ''}. Upgrade to create more.`
                    : "You've reached your plan limit for chatbots. Upgrade to create more.")}
              </AlertDescription>
              {currentSubscription && (
                <AlertDescription className="text-amber-800 dark:text-amber-300 mt-1 text-sm">
                  Current usage: {currentSubscription.usage.chatbots} / {currentSubscription.entitlements?.maxChatbots === -1 ? '∞' : currentSubscription.entitlements?.maxChatbots || 1} chatbots
                </AlertDescription>
              )}
              <div className="mt-4">
                <Button onClick={() => router.push("/plans")} className="bg-amber-600 hover:bg-amber-700">
                  <Rocket className="mr-2 h-4 w-4" />
                  Upgrade Plan
                </Button>
              </div>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Chatbot Name */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Chatbot Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., Customer Support Bot"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isCreating || hasReachedLimit || (entitlementCheck && !entitlementCheck.allowed)}
                />
                <p className="text-sm text-muted-foreground">
                  Choose a descriptive name for your chatbot
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="e.g., A helpful assistant for customer inquiries"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isCreating || hasReachedLimit || (entitlementCheck && !entitlementCheck.allowed)}
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">
                  Briefly describe what this chatbot does
                </p>
              </div>

              {/* System Instructions */}
              <div className="space-y-3">
                <Label htmlFor="systemPrompt">
                  System Instructions <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="systemPrompt"
                  placeholder="Enter detailed instructions for how the chatbot should behave..."
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  disabled={isCreating || hasReachedLimit || (entitlementCheck && !entitlementCheck.allowed)}
                  rows={10}
                  className="font-mono text-sm"
                />
                <p className="text-sm text-muted-foreground">
                  Define how your chatbot should respond and behave
                </p>

                {/* AI Prompt Helper - Generate only mode (no chatbotId yet) */}
                <PromptAIHelper
                  channel="WIDGET"
                  onPromptGenerated={setSystemPrompt}
                  disabled={isCreating || hasReachedLimit || (entitlementCheck && !entitlementCheck.allowed)}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isCreating}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isCreating || hasReachedLimit || (entitlementCheck && !entitlementCheck.allowed)}
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Bot className="mr-2 h-4 w-4" />
                      Create Chatbot
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Plan Restriction Modal */}
      {showRestrictionModal && (
        <PlanRestrictionModal
          open={showRestrictionModal}
          onOpenChange={setShowRestrictionModal}
          message={restrictionMessage || "You've reached your plan limit. Please upgrade to create more chatbots."}
          code="PLAN_RESTRICTION"
          planName={currentSubscription?.planName}
        />
      )}
    </div>
  );
}
