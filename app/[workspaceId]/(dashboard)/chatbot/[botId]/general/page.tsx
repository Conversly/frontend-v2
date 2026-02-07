"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useChatbotInWorkspace, useUpdateChatbotMutation } from "@/services/chatbot";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { UpdateChatbotInput } from "@/types/chatbot";

// Recreating the schema from the user request since we can't import it from backend
// @[/Users/macbookpro/Documents/Conversly/UI/client_v2/lib/api/config.ts:L74-L75]
const chatbotStatusValues = ['ACTIVE', 'INACTIVE', 'MAINTENANCE'] as const;

const updateChatbotBodySchema = z.object({
    logoUrl: z.string().optional(),
    primaryColor: z
        .string()
        .regex(/^#[0-9a-fA-F]{6}$/, { message: 'primaryColor must be a hex color like #007bff' })
        .optional()
        .or(z.literal("")),
    status: z.enum(chatbotStatusValues).optional(),
    leadGenerationEnabled: z.boolean().optional(),
    escalationEnabled: z.boolean().optional(),
});

type FormData = z.infer<typeof updateChatbotBodySchema>;

export default function GeneralSettingsPage() {
    const routeParams = useParams<{ workspaceId: string; botId: string }>();
    const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;
    const workspaceId = Array.isArray(routeParams.workspaceId) ? routeParams.workspaceId[0] : routeParams.workspaceId;
    const router = useRouter();

    const { data: chatbot, isLoading } = useChatbotInWorkspace(workspaceId, botId);
    const { mutate: updateChatbot, isPending: isUpdating } = useUpdateChatbotMutation();

    const form = useForm<FormData>({
        resolver: zodResolver(updateChatbotBodySchema),
        defaultValues: {
            logoUrl: "",
            primaryColor: "",
            status: "ACTIVE",
            leadGenerationEnabled: false,
            escalationEnabled: false,
        },
    });

    useEffect(() => {
        if (chatbot) {
            form.reset({
                logoUrl: chatbot.logoUrl || "",
                primaryColor: chatbot.primaryColor || "",
                status: (chatbot.status as any) || "ACTIVE",
                leadGenerationEnabled: chatbot.leadGenerationEnabled || false,
                escalationEnabled: chatbot.escalationEnabled || false,
            });
        }
    }, [chatbot, form]);

    const onSubmit = (data: FormData) => {
        updateChatbot(
            {
                id: botId,
                workspaceId,
                ...data,
            } as UpdateChatbotInput,
            {
                onSuccess: () => {
                    toast.success("Chatbot updated successfully");
                },
                onError: (error) => {
                    toast.error(error.message || "Failed to update chatbot");
                },
            }
        );
    };

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!chatbot) {
        return <div>Chatbot not found</div>;
    }

    return (
        <div className="h-full w-full overflow-y-auto">
            <div className="container mx-auto max-w-3xl py-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">General Settings</h1>
                    <p className="text-muted-foreground">
                        Manage your chatbot's general configuration and feature flags.
                    </p>
                </div>

                <Separator className="my-6" />

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Branding</h3>

                            <FormField
                                control={form.control}
                                name="logoUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Logo URL</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                {field.value && (
                                                    <div className="relative h-40 w-40 overflow-hidden rounded-lg border bg-background p-2 shadow-sm">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img
                                                            src={field.value}
                                                            alt="Logo Preview"
                                                            className="h-full w-full object-contain"
                                                        />
                                                    </div>
                                                )}
                                                <Input placeholder="https://example.com/logo.png" {...field} value={field.value || ''} />
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            The URL of the chatbot's logo image.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="primaryColor"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Primary Color</FormLabel>
                                        <FormControl>
                                            <div className="flex gap-4">
                                                <Input
                                                    type="color"
                                                    {...field}
                                                    value={field.value || '#000000'}
                                                    className="h-10 w-20 cursor-pointer rounded-lg border-border/50 bg-muted/50 p-1"
                                                />
                                                <div className="flex-1">
                                                    <Input
                                                        placeholder="#000000 (Black)"
                                                        {...field}
                                                        value={field.value || ''}
                                                        className="bg-muted/50 border-border/50"
                                                    />
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            The primary brand color for the chatbot widget (Hex code).
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Status</h3>
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Chatbot Status</FormLabel>
                                        <FormControl>
                                            <select
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                {...field}
                                                value={field.value || 'ACTIVE'}
                                            >
                                                {chatbotStatusValues.map((status) => (
                                                    <option key={status} value={status}>
                                                        {status}
                                                    </option>
                                                ))}
                                            </select>
                                        </FormControl>
                                        <FormDescription>
                                            Set the operational status of your chatbot.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Features</h3>

                            <FormField
                                control={form.control}
                                name="leadGenerationEnabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">Lead Generation</FormLabel>
                                            <FormDescription>
                                                Enable lead generation forms to collect user contact information before or during the conversation.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="escalationEnabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">Human Escalation</FormLabel>
                                            <FormDescription>
                                                Allow users to request to speak with a human agent, or automatically escalate based on sentiment/intent.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={isUpdating || !form.formState.isDirty}>
                                {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
