"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Bot, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useCreateChatbot, useGetInstructions } from "@/services/chatbot";
import { toast } from "sonner";

export default function CreateChatbotPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const { mutate: createChatbot, isPending: isCreating } = useCreateChatbot();
  const { mutate: getInstructions, isPending: isLoadingInstructions } = useGetInstructions();

  const handleGenerateInstructions = () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic first");
      return;
    }

    setIsGenerating(true);
    getInstructions(topic, {
      onSuccess: (data) => {
        setSystemPrompt(data.systemPrompt);
        toast.success("Instructions generated successfully!");
        setIsGenerating(false);
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to generate instructions");
        setIsGenerating(false);
      },
    });
  };

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
        systemPrompt: systemPrompt.trim(),
      },
      {
        onSuccess: (data) => {
          toast.success("Chatbot created successfully!");
          router.push(`/chatbot/${data.id}`);
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

            {/* AI Instructions Generator */}
            <div className="space-y-2">
              <Label>AI Instructions Generator (Optional)</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., customer support, sales, FAQ"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled={isGenerating || isCreating}
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleGenerateInstructions}
                  disabled={isGenerating || isCreating || !topic.trim()}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate
                    </>
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Enter a topic and we'll generate system instructions for you
              </p>
            </div>

            {/* System Instructions */}
            <div className="space-y-2">
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
