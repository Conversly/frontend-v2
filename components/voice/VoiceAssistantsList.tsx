"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Plus, MoreVertical, Mic, Settings, Play } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAssistants, useCreateAssistant } from "@/services/voice-assistant-service";
import { CreateVoiceAssistantDialog } from "./CreateVoiceAssistantDialog";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface VoiceAssistantsListProps {
    botId: string;
}

export function VoiceAssistantsList({ botId }: VoiceAssistantsListProps) {
    const router = useRouter();
    const { data: assistants, isLoading } = useAssistants(botId);

    if (isLoading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Voice Assistants</CardTitle>
                    <CardDescription>
                        Manage voice identities and behaviors for this chatbot.
                    </CardDescription>
                </div>
                <CreateVoiceAssistantDialog botId={botId}>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Assistant
                    </Button>
                </CreateVoiceAssistantDialog>
            </CardHeader>
            <CardContent>
                {!assistants || assistants.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                        <Mic className="mb-4 h-12 w-12 opacity-20" />
                        <h3 className="text-lg font-medium">No assistants yet</h3>
                        <p className="mb-4 max-w-sm text-sm">
                            Create your first voice assistant to start handling calls.
                        </p>
                        <CreateVoiceAssistantDialog botId={botId}>
                            <Button variant="outline">Create One</Button>
                        </CreateVoiceAssistantDialog>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Language</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead className="w-[80px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {assistants.map((assistant) => (
                                <TableRow
                                    key={assistant.id}
                                    className="cursor-pointer hover:bg-muted/50"
                                    onClick={() => router.push(`/chatbot/${botId}/voice/assistants/${assistant.id}/configuration`)}
                                >
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <span>{assistant.name}</span>
                                            {assistant.description && (
                                                <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                                                    {assistant.description}
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={assistant.status === 'ACTIVE' ? 'default' : 'secondary'}
                                            className={assistant.status === 'ACTIVE' ? 'bg-green-500 hover:bg-green-600' : ''}
                                        >
                                            {assistant.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{assistant.defaultLanguage}</TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {format(new Date(assistant.createdAt), 'MMM d, yyyy')}
                                    </TableCell>
                                    <TableCell onClick={(e) => e.stopPropagation()}>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="h-4 w-4" />
                                                    <span className="sr-only">More</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => router.push(`/chatbot/${botId}/voice/assistants/${assistant.id}/configuration`)}>
                                                    <Settings className="mr-2 h-4 w-4" />
                                                    Configure
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Play className="mr-2 h-4 w-4" />
                                                    Test Voice
                                                </DropdownMenuItem>
                                                {/* Add Delete option later */}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}
