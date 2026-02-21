"use client";

import { useState } from "react";
import { DeploySidebar } from "@/components/deploy/DeploySidebar";
import { DeployPreview } from "@/components/deploy/DeployPreview";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import posthog from "posthog-js";

export default function DeployPage() {
  const params = useParams();
  const botId = params.botId as string;
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    posthog.capture("deploy_page_viewed", {
      chatbot_id: botId
    });
  }, [botId]);

  // Initial state (Mock data for now, normally fetched from DB)
  const [config, setConfig] = useState({
    title: "Help Center",
    description: "How can we help you today?",
    logoUrl: "",
    supportEmail: "",
    channels: {
      chatbot: true,
      email: true,
      voice: false,
    },
    theme: {
      primaryColor: "#000000",
      backgroundColor: "#ffffff",
    },
    isLive: false,
    socials: {
      twitter: "",
      linkedin: "",
      website: "",
      instagram: ""
    },
    announcement: {
      enabled: false,
      text: "",
      link: ""
    }
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success("Deployment settings saved successfully");
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden">
      {/* Sidebar Configuration */}
      <div className="w-[400px] flex-none overflow-y-auto border-r">
        <DeploySidebar
          config={config}
          setConfig={setConfig}
          onSave={handleSave}
          isSaving={isSaving}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-secondary/10 overflow-y-auto">
        <div className="p-8 max-w-5xl mx-auto w-full space-y-8">

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Deployment</h1>
              <p className="text-muted-foreground mt-2">
                Choose how you want to share your agent with the world.
              </p>
            </div>
            <Link href={`/deploy/${botId}`} target="_blank">
              <Button variant="outline" className="shadow-sm bg-background">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Public Page
              </Button>
            </Link>
          </div>

          <div className="pt-4">
            <div className="border rounded-xl overflow-hidden shadow-sm bg-background h-[600px] relative">
              <DeployPreview config={config} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
