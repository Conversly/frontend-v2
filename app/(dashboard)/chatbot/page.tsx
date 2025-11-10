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
      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading your chatbots...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <Card className="mx-auto max-w-md p-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="rounded-full bg-destructive/10 p-4">
              <Bot className="h-12 w-12 text-destructive" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Error loading chatbots</h3>
              <p className="text-sm text-muted-foreground">
                {error instanceof Error ? error.message : "Failed to load chatbots"}
              </p>
            </div>
            <Button onClick={() => window.location.reload()} size="lg" className="mt-4">
              Try Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container px-4 py-6 md:px-6">
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
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {chatbots.map((chatbot) => (
            <Card key={chatbot.id} className="group relative flex h-full flex-col overflow-hidden transition-all duration-200 hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <Bot className="h-6 w-6 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-xl font-semibold leading-tight">
                        {chatbot.name}
                      </CardTitle>
                      <div className="mt-1.5 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-sm font-medium text-muted-foreground">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
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
              <CardContent className="flex flex-1 flex-col pt-0">
                <div className="flex flex-1 flex-col">
                  <CardDescription className="line-clamp-2 text-sm leading-relaxed min-h-10">
                    {chatbot.description || "No description provided"}
                  </CardDescription>
                  <div className="mt-4 text-sm text-muted-foreground">
                    {chatbot.createdAt 
                      ? `Created ${new Date(chatbot.createdAt).toLocaleDateString()}`
                      : "Created recently"
                    }
                  </div>
                </div>
                <div className="mt-6">
                  <Link href={`/chatbot/${chatbot.id}`}>
                    <Button className="w-full" variant="outline" size="lg">
                      Open Dashboard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="mx-auto max-w-md p-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="rounded-full bg-muted/50 p-4">
              <Bot className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">No chatbots yet</h3>
              <p className="text-sm text-muted-foreground">
                Get started by creating your first chatbot to begin engaging with your customers
              </p>
            </div>
            <Button onClick={handleCreateChatbot} size="lg" className="mt-4">
              <Plus className="mr-2 h-5 w-5" />
              Create Chatbot
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
