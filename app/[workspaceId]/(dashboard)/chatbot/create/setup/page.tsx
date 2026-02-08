"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useCustomizationStore } from "@/store/chatbot/customization";
import { useBranchStore } from "@/store/branch";
import { useChannelPrompt, useUpsertChannelPrompt } from "@/services/prompt";
import { QUERY_KEY } from "@/utils/query-key";
import { Step1UrlAndUsecase } from "@/components/chatbot/setup/Step1UrlAndUsecase";
import { Step3DataSources } from "@/components/chatbot/setup/Step3DataSources";
import { Step4UIConfig } from "@/components/chatbot/setup/Step4UIConfig";
import { Step5Topics } from "@/components/chatbot/setup/Step5Topics";
import { TopicsVisualization } from "@/components/chatbot/setup/TopicsVisualization";
import { Step6PromptTuning } from "@/components/chatbot/setup/Step6PromptTuning";
import { Step7Completion } from "@/components/chatbot/setup/Step7Completion";
import { useSetupStore } from "@/store/chatbot/setup";
import { SetupVisualization } from "@/components/chatbot/setup/SetupVisualization";
import { LivePreviewWidget } from "@/components/chatbot/customization/LivePreviewWidget";

type Stage = "idle" | "crawl" | "logo" | "topics" | "tuning" | "completed";

function useStagedProgress(active: boolean) {
  const [stage, setStage] = useState<Stage>("idle");
  useEffect(() => {
    if (!active) return;
    setStage("crawl");
    const t1 = setTimeout(() => setStage("logo"), 2000);
    const t2 = setTimeout(() => setStage("topics"), 4000);
    const t3 = setTimeout(() => setStage("tuning"), 6000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [active]);
  return stage;
}

export default function SetupWizardPage() {
  const router = useRouter();
  const params = useParams<{ workspaceId: string }>();
  const workspaceId = Array.isArray(params.workspaceId)
    ? params.workspaceId[0]
    : params.workspaceId;
  const queryClient = useQueryClient();
  const step = useSetupStore((s) => s.step);
  const setStep = useSetupStore((s) => s.setStep);
  const chatbotId = useSetupStore((s) => s.chatbotId);
  const setWorkspaceId = useSetupStore((s) => s.setWorkspaceId);
  const protocol = useSetupStore((s) => s.protocol);
  const setProtocol = useSetupStore((s) => s.setProtocol);
  const host = useSetupStore((s) => s.host);
  const setHost = useSetupStore((s) => s.setHost);
  const useCase = useSetupStore((s) => s.useCase);
  const setUseCase = useSetupStore((s) => s.setUseCase);
  const isSubmitting = useSetupStore((s) => s.isSubmitting);
  const startProcessing = useSetupStore((s) => s.startProcessing);
  const reset = useSetupStore((s) => s.reset);
  const switchBranch = useBranchStore((s) => s.switchBranch);

  // Ensure we are in DEV mode when entering setup
  useEffect(() => {
    switchBranch('DEV');
  }, [switchBranch]);

  // Ensure workspaceId is always present for createChatBot()
  useEffect(() => {
    if (!workspaceId) return;
    setWorkspaceId(workspaceId);
  }, [setWorkspaceId, workspaceId]);

  const progressStage = useStagedProgress(isSubmitting && step === 2);
  const stage = step >= 3 ? "completed" : progressStage;

  // Only redirect on browser refresh (F5 or Ctrl+R)
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Set a flag that will be checked on next page load
      sessionStorage.setItem('was-refreshed', 'true');
    };

    // Check if we arrived here via refresh
    const wasRefreshed = sessionStorage.getItem('was-refreshed');
    if (wasRefreshed) {
      sessionStorage.removeItem('was-refreshed');
      console.warn("Page refresh detected. Redirecting to chatbots list.");
      reset();
      router.replace(`/${workspaceId}/chatbot`);
      return;
    }

    // Listen for page unload to detect refresh
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [reset, router, workspaceId]);



  // Additional runtime safety check
  useEffect(() => {
    if (step > 2 && !chatbotId) {
      console.warn("Runtime check: Invalid state detected. Redirecting to chatbots list.");
      reset();
      router.replace(`/${workspaceId}/chatbot`);
    }
  }, [step, chatbotId, reset, router, workspaceId]);

  // Step 3 state (UI customization)
  const draftConfig = useCustomizationStore((s) => s.draftConfig);
  const setDraftConfig = useCustomizationStore((s) => s.setDraftConfig);
  const saveCustomization = useCustomizationStore((s) => s.saveCustomization);
  const loadCustomization = useCustomizationStore((s) => s.loadCustomization);

  // Step 4 state (personality) - using prompt API
  const { data: widgetPrompt, isLoading: isPromptLoading } = useChannelPrompt(chatbotId || "", "WIDGET");
  const { mutateAsync: savePrompt } = useUpsertChannelPrompt();
  const [draftPrompt, setDraftPrompt] = useState("");

  // Polling for prompt if it's empty (async generation)
  useEffect(() => {
    if (step === 6 && (!widgetPrompt?.systemPrompt || widgetPrompt.systemPrompt.trim() === '')) {
      const interval = setInterval(() => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROMPTS, chatbotId, "WIDGET"] });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, widgetPrompt, chatbotId, queryClient]);

  // Sync draft prompt with fetched widget prompt
  useEffect(() => {
    if (widgetPrompt?.systemPrompt) {
      setDraftPrompt(widgetPrompt.systemPrompt);
    }
  }, [widgetPrompt]);

  const composedUrl = `${protocol}${host}`.trim();

  const isValidHost = (value: string) => {
    if (!value) return false;
    const v = value.trim().toLowerCase();
    if (!v) return false;
    // Reject if it still has protocol (should be cleaned by input handler, but double-check)
    if (v.startsWith("http://") || v.startsWith("https://")) return false;
    // Must contain a dot (for domain) or be localhost
    if (!v.includes(".") && v !== "localhost") return false;
    // No spaces allowed
    if (/\s/.test(v)) return false;
    // More lenient domain validation
    // Basic check: must have at least one dot, valid characters only (letters, numbers, dots, hyphens)
    // Must start and end with alphanumeric
    // This is more permissive than strict RFC validation but catches obvious errors
    const basicDomainCheck = /^[a-z0-9][a-z0-9.-]*[a-z0-9]$/i;
    const hasValidTld = /\.([a-z]{2,}|[a-z]{2,}\.[a-z]{2,})$/i; // At least 2 chars for TLD, or multi-part TLD like .co.uk

    // Allow localhost or domains that pass basic checks
    if (v === "localhost") return true;
    if (!basicDomainCheck.test(v)) return false;
    if (!hasValidTld.test(v) && v !== "localhost") return false;

    // Additional check: no consecutive dots or dots at start/end (already handled by basicDomainCheck)
    if (v.includes("..")) return false;

    return true;
  };

  // Step 1 submit
  const onStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceId) {
      toast.error("Missing workspace ID");
      return;
    }
    setWorkspaceId(workspaceId);
    const trimmedHost = host.trim();
    if (!trimmedHost) {
      toast.error("Please enter a website URL");
      return;
    }
    if (!isValidHost(trimmedHost)) {
      toast.error("Enter a valid domain (e.g., verly.ai)");
      return;
    }
    // Prevent double submission
    if (isSubmitting) {
      return;
    }
    // Move heavy work to Step 2 (Processing)
    setStep(2);
  };

  // Step 2: processing effect (create chatbot + initial setup), then advance to Step 3
  useEffect(() => {
    if (step !== 2) return;

    const trimmedHost = host.trim();
    const trimmedUrl = `${protocol}${trimmedHost}`.trim();

    // Validate URL before processing
    if (!trimmedHost || !isValidHost(trimmedHost)) {
      toast.error("Invalid URL. Please go back and enter a valid domain.");
      setStep(1);
      return;
    }

    let cancelled = false;
    const run = async () => {
      try {
        const result = await startProcessing({
          websiteUrl: trimmedUrl,
          useCase,
          host: trimmedHost
        });
        if (cancelled) return;
        Object.entries(result.errors).forEach(([k, v]) => {
          if (v) toast.error(`${k}: ${v}`);
        });
        // Invalidate chatbots cache since a new chatbot was created
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_CHATBOTS] });
        toast.success("Initial setup complete");
        setStep(3);
      } catch (err: any) {
        if (!cancelled) {
          toast.error(err?.message || "Setup failed");
          setStep(1);
        }
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [step, protocol, host, useCase, startProcessing, setStep, queryClient]);

  // Ensure UI config is fetched from API when entering Step 4 (safety net)
  useEffect(() => {
    if (step === 4 && chatbotId && !draftConfig) {
      loadCustomization(chatbotId).catch(() => { });
    }
  }, [step, chatbotId, draftConfig, loadCustomization]);

  // Step 3 continue (goes to Step 4 - UI Config)
  const onStep3Continue = () => {
    setStep(4);
  };

  // Step 3 submit (UI)
  const onStep3Submit = async () => {
    if (!chatbotId || !draftConfig) {
      toast.error("Missing configuration");
      return;
    }
    try {
      await saveCustomization(chatbotId);
      toast.success("UI saved");
      setStep(5);
    } catch (err: any) {
      toast.error(err?.message || "Failed to save UI");
    }
  };

  // Step 4 submit (personality)
  const onStep4Submit = async () => {
    if (!chatbotId) {
      toast.error("Missing chatbot ID");
      return;
    }

    // Validate prompt before submitting
    if (!draftPrompt || !draftPrompt.trim()) {
      toast.error("System prompt is required. Please describe your agent's personality.");
      return;
    }

    try {
      await savePrompt({
        chatbotId,
        channel: "WIDGET",
        systemPrompt: draftPrompt.trim(),
      });
      // Invalidate chatbots cache so the new chatbot appears in the list
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_CHATBOTS] });

      // Go to completion step instead of redirecting
      setStep(7);
    } catch (err: any) {
      // Handle API validation errors
      const errorMsg = err?.message || err?.error || "Failed to save prompt";
      if (errorMsg.includes("System prompt")) {
        toast.error("Please provide a valid system prompt for your agent");
      } else {
        toast.error(errorMsg);
      }
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-2 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center justify-center justify-items-center overflow-hidden rounded-3xl border bg-background lg:max-h-[716px] lg:grid-cols-2">

          {/* LEFT PANEL (Inputs & Steps) */}
          <div className={`flex h-full w-full flex-col bg-background px-4 py-10 lg:px-20 lg:py-20 ${step >= 6 ? 'overflow-y-auto justify-start' : 'overflow-y-auto justify-center'}`}>
            {(step === 1 || step === 2) && (
              <Step1UrlAndUsecase
                protocol={protocol}
                setProtocol={setProtocol}
                host={host}
                setHost={setHost}
                useCase={useCase}
                setUseCase={setUseCase}
                isSubmitting={isSubmitting}
                isValidHost={isValidHost}
                onSubmit={onStep1Submit}
                onManualSetup={() => router.push(`/${workspaceId}/chatbot/create`)}
              />
            )}
            {step === 3 && <Step3DataSources onContinue={onStep3Continue} />}
            {step === 4 && <Step4UIConfig onSubmit={onStep3Submit} />}
            {step === 5 && <Step5Topics chatbotId={chatbotId} onContinue={() => setStep(6)} />}
            {step === 6 && (
              <Step6PromptTuning
                onConfirm={onStep4Submit}
                draftPrompt={draftPrompt}
                setDraftPrompt={setDraftPrompt}
                isLoading={isPromptLoading || !widgetPrompt?.systemPrompt || widgetPrompt.systemPrompt.trim() === ''}
              />
            )}
            {step === 7 && chatbotId && (
              <Step7Completion chatbotId={chatbotId} />
            )}
          </div>

          {/* RIGHT PANEL (Visualization) */}
          <section className="hidden h-full w-full flex-col justify-center overflow-hidden border-l bg-slate-50/50 lg:flex">
            <SetupVisualization url={composedUrl} stage={stage}>
              {step === 4 && draftConfig && (
                <div className="w-[380px] h-[500px] rounded-lg overflow-hidden shadow-lg">
                  <LivePreviewWidget
                    chatbotId={chatbotId || ""}
                    config={draftConfig}
                    className="w-full h-full"
                  />
                </div>
              )}
              {step === 5 && (
                <div className="w-full h-full">
                  <TopicsVisualization />
                </div>
              )}
              {step === 7 && (
                <div className="flex flex-col items-center gap-6 text-center">
                  <div className="text-8xl animate-bounce">🚀</div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-slate-800">Ready to Launch!</h2>
                    <p className="text-sm text-slate-600 max-w-xs">
                      Your AI chatbot is configured and waiting to help your visitors
                    </p>
                  </div>
                </div>
              )}
            </SetupVisualization>
          </section>

        </div>
      </div>
    </div>
  );
}