import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, X, Shield } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { AccessLevel } from "@/types/customActions";
import { cn } from "@/lib/utils";
import {
  useEditorErrors,
  useEditorFormData,
  useEditorUpdateField,
} from "@/store/custom-action-editor";

const DESCRIPTION_PLACEHOLDER = `Example: Use this action when the user asks about product prices, availability, or inventory. Fetches real-time pricing from our e-commerce API. Requires a product ID or product name.`;

export const BasicInfoStep: React.FC = () => {
  const [newExample, setNewExample] = useState("");
  const formData = useEditorFormData();
  const errors = useEditorErrors();
  const updateField = useEditorUpdateField();
  const triggerExamples = formData.triggerExamples || [];

  const toDisplayName = (raw: string) =>
    raw
      .trim()
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  const toInternalName = (raw: string) =>
    raw
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s_-]+/g, "")
      .replace(/[\s-]+/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_+|_+$/g, "");
  const displayName = formData.displayName || toDisplayName(formData.name || "");

  const addExample = () => {
    const trimmed = newExample.trim();
    if (!trimmed) return;
    if (triggerExamples.includes(trimmed)) return;
    updateField("triggerExamples", [...triggerExamples, trimmed]);
    setNewExample("");
  };

  const removeExample = (index: number) => {
    updateField(
      "triggerExamples",
      triggerExamples.filter((_, i) => i !== index),
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addExample();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card border-border bg-[--surface-secondary]">
        <CardHeader>
          <CardTitle className="type-h3">What does this action do?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="displayName" className="type-label">
              Action Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => {
                const nextDisplayName = e.target.value;
                updateField("displayName", nextDisplayName);
                updateField("name", toInternalName(nextDisplayName));
              }}
              placeholder="e.g., Get Product Price"
              required
              className={cn(
                "bg-background h-11",
                errors?.name
                  ? "border-destructive focus-visible:ring-destructive"
                  : "border-border",
              )}
            />
            {errors?.name && (
              <p className="text-xs text-destructive mt-1">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <Label htmlFor="description" className="type-label">
                When should AI use this?{" "}
                <span className="text-destructive">*</span>
              </Label>
              <span className="text-[11px] text-muted-foreground tabular-nums">
                {formData.description.length} / 1000
              </span>
            </div>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder={DESCRIPTION_PLACEHOLDER}
              rows={5}
              required
              minLength={20}
              className={cn(
                "bg-background resize-none",
                errors?.description
                  ? "border-destructive focus-visible:ring-destructive"
                  : "border-border",
              )}
            />
            {errors?.description && (
              <p className="text-xs text-destructive mt-1">
                {errors.description}
              </p>
            )}
          </div>

          <div className="space-y-3 pt-2">
            <Label className="type-label">
              Example user messages{" "}
              <span className="text-muted-foreground normal-case font-normal">
                (optional)
              </span>
            </Label>

            {triggerExamples.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {triggerExamples.map((example, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-2 bg-muted rounded-full pl-3 pr-2 py-1.5 text-xs font-medium border border-border"
                  >
                    <span>{example}</span>
                    <button
                      type="button"
                      onClick={() => removeExample(index)}
                      className="h-4 w-4 rounded-full hover:bg-destructive hover:text-white flex items-center justify-center transition-colors"
                    >
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Input
                value={newExample}
                onChange={(e) => setNewExample(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g., How much is the iPhone 15?"
                className="flex-1 h-10 bg-background"
              />
              <Button
                type="button"
                variant="outline"
                onClick={addExample}
                disabled={!newExample.trim()}
                className="h-10"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card border-border bg-[--surface-secondary]">
        <CardHeader>
          <CardTitle className="type-h3 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Who can trigger this action?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={formData.accessLevel || "anonymous"}
            onValueChange={(v) => {
              updateField("accessLevel", v as AccessLevel);
              if (v === "anonymous") {
                updateField("requiredContactFields", []);
              }
            }}
            className="space-y-2"
          >
            <div
              className={cn(
                "flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors",
                (formData.accessLevel || "anonymous") === "anonymous"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-border/80",
              )}
              onClick={() => {
                updateField("accessLevel", "anonymous");
                updateField("requiredContactFields", []);
              }}
            >
              <RadioGroupItem
                value="anonymous"
                id="access_anonymous"
                className="mt-0.5"
              />
              <div>
                <Label
                  htmlFor="access_anonymous"
                  className="type-label block"
                >
                  Everyone
                </Label>
                <p className="text-xs text-muted-foreground">
                  Any visitor, including anonymous.
                </p>
              </div>
            </div>
            <div
              className={cn(
                "flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors",
                (formData.accessLevel || "anonymous") === "visitor"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-border/80",
              )}
              onClick={() => updateField("accessLevel", "visitor")}
            >
              <RadioGroupItem
                value="visitor"
                id="access_visitor"
                className="mt-0.5"
              />
              <div>
                <Label htmlFor="access_visitor" className="type-label block">
                  Returning visitors
                </Label>
                <p className="text-xs text-muted-foreground">
                  Users with an existing contact record.
                </p>
              </div>
            </div>
            <div
              className={cn(
                "flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors",
                (formData.accessLevel || "anonymous") === "user"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-border/80",
              )}
              onClick={() => updateField("accessLevel", "user")}
            >
              <RadioGroupItem
                value="user"
                id="access_user"
                className="mt-0.5"
              />
              <div>
                <Label htmlFor="access_user" className="type-label block">
                  Verified users only
                </Label>
                <p className="text-xs text-muted-foreground">
                  JWT-verified users. Recommended for actions using contact data.
                </p>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
};
