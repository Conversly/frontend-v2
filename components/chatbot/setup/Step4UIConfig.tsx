'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sun, Moon, Upload as UploadIcon, X } from "lucide-react";
import { useCustomizationStore } from "@/store/chatbot/customization";
import { toast } from "sonner";
import { useRef } from "react";

interface Step4UIConfigProps {
  onSubmit: () => void;
}

export function Step4UIConfig({ onSubmit }: Step4UIConfigProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const draftConfig = useCustomizationStore((s) => s.draftConfig);
  const setDraftConfig = useCustomizationStore((s) => s.setDraftConfig);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      toast.error("File size must be less than 1MB");
      return;
    }

    try {
      const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        body: file,
      });

      if (!res.ok) throw new Error('Upload failed');

      const blob = await res.json();
      setDraftConfig({
        ...draftConfig!,
        PrimaryIcon: blob.url as string,
        widgeticon: '' // Clear preset icon if custom one is uploaded
      });
      toast.success('Profile picture uploaded');
    } catch (e: any) {
      toast.error(e?.message || 'Upload failed');
    } finally {
      // Reset input so the same file can be uploaded again if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (!draftConfig) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="type-section-title">Agent&apos;s UI</h1>
        <p className="type-body-muted">
          Style your agent to match your brand. You can customize it further in the settings later.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label className="pl-0.5 text-sm font-medium">Agent name</Label>
          <Input
            value={draftConfig.DisplayName}
            onChange={(e) => setDraftConfig({ ...draftConfig, DisplayName: e.target.value })}
            placeholder="Shashank Tyagi"
          />
        </div>

        {/* <div className="flex flex-col gap-2">
          <Label className="pl-0.5 text-sm font-medium">Appearance</Label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={draftConfig.appearance === "light" ? "default" : "outline"}
              size="sm"
              onClick={() => setDraftConfig({ ...draftConfig, appearance: "light" })}
            >
              <Sun className="mr-2 h-4 w-4" />
              Light
            </Button>
            <Button
              type="button"
              variant={draftConfig.appearance === "dark" ? "default" : "outline"}
              size="sm"
              onClick={() => setDraftConfig({ ...draftConfig, appearance: "dark" })}
            >
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </Button>
          </div>
        </div> */}

        <div className="flex flex-col gap-1">
          <Label className="pl-0.5 text-sm font-medium">Primary color</Label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={draftConfig.primaryColor}
              onChange={(e) => setDraftConfig({ ...draftConfig, primaryColor: e.target.value })}
              className="h-10 w-16 cursor-pointer rounded border"
            />
            <Input
              value={draftConfig.primaryColor}
              onChange={(e) => setDraftConfig({ ...draftConfig, primaryColor: e.target.value })}
              placeholder="#0FFFFF"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="pl-0.5 text-sm font-medium">Profile picture</Label>
          <div className="flex items-center gap-4">
            {draftConfig.PrimaryIcon ? (
              <div className="relative h-16 w-16 group">
                <img
                  src={draftConfig.PrimaryIcon}
                  alt="Profile Preview"
                  className="h-full w-full rounded-lg object-cover border border-border"
                />
                <button
                  type="button"
                  onClick={() => setDraftConfig({ ...draftConfig, PrimaryIcon: '' })}
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <div className="h-16 w-16 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/30">
                <UploadIcon className="h-6 w-6 text-muted-foreground/50" />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleUpload}
                accept="image/jpeg,image/png,image/svg+xml"
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-fit"
                onClick={() => fileInputRef.current?.click()}
              >
                {draftConfig.PrimaryIcon ? "Change" : "+ Upload"}
              </Button>
              <p className="text-xs text-muted-foreground">Supports JPG, PNG, and SVG up to 1MB</p>
            </div>
          </div>
        </div>
      </div>

      <Button className="w-full shadow-card" onClick={onSubmit}>
        Looks good
      </Button>
    </div>
  );
}


