"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Bot, MoreVertical, Settings, Trash2, Copy, Loader2 } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetChatbots, useDeleteChatbot } from "@/services/chatbot";
import { useRouter } from "next/navigation";
import { LOCAL_STORAGE_KEY } from "@/utils/local-storage-key";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ChatbotsPage() {
  const router = useRouter();
  const { data: chatbots, isLoading, error } = useGetChatbots();
  const { mutate: deleteChatbot } = useDeleteChatbot();

  // Check if user is authenticated
  useEffect(() => {
    const isLoggedIn = localStorage.getItem(LOCAL_STORAGE_KEY.IS_LOGGED_IN) === "true";
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [router]);

  const handleDelete = (chatbotId: number) => {
    if (confirm("Are you sure you want to delete this chatbot? This action cannot be undone.")) {
      deleteChatbot(
        { id: chatbotId },
        {
          onSuccess: () => {
            toast.success("Chatbot deleted successfully");
          },
          onError: (error: any) => {
            toast.error(error.message || "Failed to delete chatbot");
          },
        }
      );
    }
  };

  const handleCreateChatbot = () => {
    router.push("/chatbot/create/setup");
  };

  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-6">
        <Card className="p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <Bot className="mb-4 h-12 w-12 text-destructive" />
            <h3 className="mb-2 text-lg font-semibold">Error loading chatbots</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              {error instanceof Error ? error.message : "Failed to load chatbots"}
            </p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chatbots</h1>
          <p className="text-muted-foreground">
            Manage and monitor all your chatbots
          </p>
        </div>
        <Button onClick={handleCreateChatbot}>
          <Plus className="mr-2 h-4 w-4" />
          Create Chatbot
        </Button>
      </div>

      {chatbots && chatbots.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {chatbots.map((chatbot) => (
            <Card key={chatbot.id} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{chatbot.name}</CardTitle>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-xs capitalize text-muted-foreground">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/chatbot/${chatbot.id}/settings`}>
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDelete(chatbot.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 line-clamp-2">
                  {chatbot.description || "No description"}
                </CardDescription>
                {chatbot.createdAt && (
                  <div className="mb-4 text-sm text-muted-foreground">
                    Created {new Date(chatbot.createdAt).toLocaleDateString()}
                  </div>
                )}
                <Link href={`/chatbot/${chatbot.id}`}>
                  <Button className="w-full" variant="outline">
                    Open Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <Bot className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">No chatbots yet</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Get started by creating your first chatbot
            </p>
            <Button onClick={handleCreateChatbot}>
              <Plus className="mr-2 h-4 w-4" />
              Create Chatbot
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
