"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Bot, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCreateChatbot } from "@/services/chatbot";
import { useUpsertChannelPrompt } from "@/services/prompt";
import { PromptAIHelper } from "@/components/shared/PromptAIHelper";
import { toast } from "sonner";

export default function CreateChatbotPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");

  const { mutate: createChatbot, isPending: isCreating } = useCreateChatbot();
  const { mutate: upsertPrompt } = useUpsertChannelPrompt();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
                router.push(`/chatbot/${data.id}`);
              },
              onError: (error: any) => {
                // Chatbot created but prompt failed - still redirect
                toast.warning("Chatbot created but prompt setup failed. You can configure it later.");
                router.push(`/chatbot/${data.id}`);
              },
            }
          );
        },
        onError: (error: any) => {
          toast.error(error.message || "Failed to create chatbot");
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
    </div>
  );
}
