'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sun, Moon } from "lucide-react";
import { useCustomizationStore } from "@/store/chatbot/customization";

interface Step4UIConfigProps {
  onSubmit: () => void;
}

export function Step4UIConfig({ onSubmit }: Step4UIConfigProps) {
  const draftConfig = useCustomizationStore((s) => s.draftConfig);
  const setDraftConfig = useCustomizationStore((s) => s.setDraftConfig);

  if (!draftConfig) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Agent&apos;s UI</h1>
        <p className="text-sm text-muted-foreground">
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
          <Button type="button" variant="outline" size="sm" className="w-fit">
            + Upload
          </Button>
          <p className="text-xs text-muted-foreground">Supports JPG, PNG, and SVG up to 1MB</p>
        </div>
      </div>

      <Button className="w-full" onClick={onSubmit}>
        Looks good
      </Button>
    </div>
  );
}


