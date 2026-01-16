"use client";

import { useState } from "react";
import { useCreateAssistant } from "@/services/voice-assistant-service"; // Assuming this hook exists
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

interface CreateVoiceAssistantDialogProps {
    botId: string;
    children?: React.ReactNode;
    onSuccess?: (assistantId: string) => void;
}

export function CreateVoiceAssistantDialog({ botId, children, onSuccess }: CreateVoiceAssistantDialogProps) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [firstMessage, setFirstMessage] = useState("Hello! How can I help you?");
    const [provider, setProvider] = useState("elevenlabs"); // Default to elevenlabs or similar
    const createAssistant = useCreateAssistant();
    const router = useRouter();
    const params = useParams<{ workspaceId?: string }>();
    const workspaceId = (params as any)?.workspaceId as string | undefined;

    const handleCreate = async () => {
        if (!name) {
            toast.error("Please enter a name for the assistant");
            return;
        }

        try {
            const newAssistant = await createAssistant.mutateAsync({
                chatbotId: botId,
                name: name,
                // We'll let the backend or service handle defaults for other fields based on provider choice if needed,
                // or pass basic defaults here.
                description: description || `Voice assistant using ${provider}`,
                defaultLanguage: "en-US",
                systemPrompt: "You are a helpful assistant.",
                firstMessage: firstMessage,
                // In a real scenario, we might pass the provider config here if the API allows it on creation.
                // For now, assuming standard creation and then user configures provider specifics.
            });

            toast.success("Assistant created successfully");
            setOpen(false);
            setName("");
            setDescription("");
            setFirstMessage("Hello! How can I help you?");

            if (onSuccess) {
                onSuccess(newAssistant.id);
            } else {
                if (!workspaceId) return;
                router.push(`/${workspaceId}/chatbot/${botId}/voice/assistants/${newAssistant.id}/configuration`);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to create assistant");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Assistant
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Voice Assistant</DialogTitle>
                    <DialogDescription>
                        Add a new voice assistant to your chatbot. You can configure its voice and behavior later.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Sales Rep, Support Agent"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="e.g. Handles inbound sales inquiries"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="firstMessage">First Message</Label>
                        <Input
                            id="firstMessage"
                            value={firstMessage}
                            onChange={(e) => setFirstMessage(e.target.value)}
                            placeholder="e.g. Hello, thanks for calling!"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={createAssistant.isPending}>
                        Cancel
                    </Button>
                    <Button onClick={handleCreate} disabled={createAssistant.isPending}>
                        {createAssistant.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create Assistant
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
