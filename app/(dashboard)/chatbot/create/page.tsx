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
    <div className="container max-w-3xl py-6">
      <div className="mb-6">
        <Link href="/chatbot">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Chatbots
          </Button>
        </Link>
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
                disabled={isCreating}
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
                disabled={isCreating}
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
                disabled={isCreating}
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
                disabled={isCreating}
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
              <Button type="submit" disabled={isCreating}>
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
  );
}
