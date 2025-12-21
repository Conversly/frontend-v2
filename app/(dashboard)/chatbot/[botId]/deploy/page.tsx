"use client";

import { useState } from "react";
import { DeploySidebar } from "@/components/deploy/DeploySidebar";
import { DeployPreview } from "@/components/deploy/DeployPreview";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useParams } from "next/navigation";

export default function DeployPage() {
  const params = useParams();
  const botId = params.botId as string;
  const [isSaving, setIsSaving] = useState(false);

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
      <div className="w-[400px] flex-none overflow-y-auto">
        <DeploySidebar
          config={config}
          setConfig={setConfig}
          onSave={handleSave}
          isSaving={isSaving}
        />
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-secondary/20 relative">
        <div className="absolute top-4 right-4 z-20">
          <Link href={`/help/${botId}`} target="_blank">
            <Button variant="outline" className="shadow-sm bg-background">
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Public Page
            </Button>
          </Link>
        </div>
        <DeployPreview config={config} />
      </div>
    </div>
  );
}
