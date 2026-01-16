"use client";

import { useParams } from "next/navigation";
import { usePhoneNumbers, useDeletePhoneNumber, useUpdatePhoneNumber } from "@/services/phone-number-service";
import { ImportNumberDialog } from "@/components/voice/ImportNumberDialog";
import { useAssistants as useVoiceAssistants } from "@/services/voice-assistant-service";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Trash2, Edit } from "lucide-react";
import { format } from "date-fns";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";

export default function PhoneNumbersPage() {
    const params = useParams();
    const botId = params.botId as string;
    const { data: phoneNumbers, isLoading } = usePhoneNumbers(botId);
    const { data: assistants } = useVoiceAssistants(botId);
    const deleteNumber = useDeletePhoneNumber();
    const updateNumber = useUpdatePhoneNumber();

    const handleAssignAssistant = async (numberId: string, assistantId: string) => {
        try {
            await updateNumber.mutateAsync({
                botId,
                numberId,
                data: { assistantId: assistantId === 'unassigned' ? null : assistantId }
            });
            toast.success("Updated assistant assignment");
        } catch (error) {
            toast.error("Failed to update assignment");
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container py-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Phone Numbers</h2>
                    <p className="text-muted-foreground">
                        Manage phone numbers for your voice assistants.
                    </p>
                </div>
                <ImportNumberDialog botId={botId} />
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Number</TableHead>
                            <TableHead>Label</TableHead>
                            <TableHead>Provider</TableHead>
                            <TableHead>Assigned Assistant</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {phoneNumbers?.map((number: any) => (
                            <TableRow key={number.id}>
                                <TableCell className="font-medium flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    {number.phoneNumber}
                                </TableCell>
                                <TableCell>{number.label || '-'}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{number.provider}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={number.assistantId || "unassigned"}
                                        onValueChange={(val) => handleAssignAssistant(number.id, val)}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select Assistant" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="unassigned">Unassigned</SelectItem>
                                            {assistants?.map((assistant: any) => (
                                                <SelectItem key={assistant.id} value={assistant.id}>
                                                    {assistant.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    {format(new Date(number.createdAt), 'MMM d, yyyy')}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                            if (confirm('Are you sure you want to delete this number?')) {
                                                deleteNumber.mutate({ botId, numberId: number.id });
                                            }
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {!phoneNumbers?.length && (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                    No phone numbers found. Import one to get started.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
