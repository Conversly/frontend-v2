"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDataSourcesStore } from "@/store/chatbot/data-sources";
import { useSystemPromptStore } from "@/store/chatbot/system-prompt";
import { useCustomizationStore } from "@/store/chatbot/customization";
import { RightPanel } from "@/components/chatbot/setup/RightPanel";
import { SourcesSummary } from "@/components/chatbot/setup/SourcesSummary";
import { PreviewChatWidget } from "@/components/chatbot/preview/PreviewChatWidget";
import { Step1UrlAndUsecase } from "@/components/chatbot/setup/Step1UrlAndUsecase";
import { Step2Processing } from "@/components/chatbot/setup/Step2Processing";
import { Step3DataSources } from "@/components/chatbot/setup/Step3DataSources";
import { Step4UIConfig } from "@/components/chatbot/setup/Step4UIConfig";
import { Step5Topics } from "@/components/chatbot/setup/Step5Topics";
import { Step6PromptTuning } from "@/components/chatbot/setup/Step6PromptTuning";
import { useSetupStore } from "@/store/chatbot/setup";
import { LeftCanvas } from "@/components/chatbot/setup/LeftCanvas";

type Stage = "idle" | "crawl" | "logo" | "topics" | "tuning";

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
  const step = useSetupStore((s) => s.step);
  const setStep = useSetupStore((s) => s.setStep);
  const chatbotId = useSetupStore((s) => s.chatbotId);
  const protocol = useSetupStore((s) => s.protocol);
  const setProtocol = useSetupStore((s) => s.setProtocol);
  const host = useSetupStore((s) => s.host);
  const setHost = useSetupStore((s) => s.setHost);
  const useCase = useSetupStore((s) => s.useCase);
  const setUseCase = useSetupStore((s) => s.setUseCase);
  const isSubmitting = useSetupStore((s) => s.isSubmitting);
  const startProcessing = useSetupStore((s) => s.startProcessing);
  const stage = useStagedProgress(isSubmitting && step === 2);

  // Step 3 state (UI customization)
  const draftConfig = useCustomizationStore((s) => s.draftConfig);
  const setDraftConfig = useCustomizationStore((s) => s.setDraftConfig);
  const saveCustomization = useCustomizationStore((s) => s.saveCustomization);
  const loadCustomization = useCustomizationStore((s) => s.loadCustomization);

  // Step 4 state (personality)
  const draftPrompt = useSystemPromptStore((s) => s.draftPrompt);
  const setDraftPrompt = useSystemPromptStore((s) => s.setDraftPrompt);
  const savePrompt = useSystemPromptStore((s) => s.savePrompt);

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
    const trimmedHost = host.trim();
    if (!trimmedHost) {
      toast.error("Please enter a website URL");
      return;
    }
    if (!isValidHost(trimmedHost)) {
      toast.error("Enter a valid domain (e.g., portfolio.shashankkk.site)");
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
      loadCustomization(chatbotId).catch(() => {});
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
    try {
      await savePrompt(chatbotId);
      toast.success("Agent ready!");
      router.push(`/chatbot/${chatbotId}`);
    } catch (err: any) {
      toast.error(err?.message || "Failed to save prompt");
    }
  };

  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-4 px-2 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center justify-center justify-items-center overflow-hidden rounded-3xl border bg-background lg:max-h-[716px] lg:grid-cols-2">
        {/* LEFT PANEL (fixed canvas/loading) */}
        <section className="flex h-full w-full flex-col justify-center gap-8 p-6 lg:border-r lg:p-20">
          <div className="hidden h-full w-full overflow-hidden lg:block">
            <LeftCanvas />
          </div>
        </section>

        {/* RIGHT PANEL (all steps & interactions) */}
        <div className="flex h-full w-full overflow-hidden bg-dot-wide px-4 py-10 lg:flex lg:flex-col lg:items-center lg:justify-center lg:px-10 lg:pt-20">
          {step === 1 && (
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
              onManualSetup={() => router.push("/chatbot/create")}
            />
          )}
          {step === 2 && <RightPanel url={composedUrl} stage={stage} />}
          {step === 3 && <Step3DataSources onContinue={onStep3Continue} />}
          {step === 4 && <Step4UIConfig onSubmit={onStep3Submit} />}
          {step === 5 && <Step5Topics chatbotId={chatbotId} onContinue={() => setStep(6)} />}
          {step === 6 && <Step6PromptTuning onConfirm={onStep4Submit} />}
        </div>
      </div>
    </div>
  );
}