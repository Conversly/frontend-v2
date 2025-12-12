'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IntegrationSidebar } from '@/components/chatbot/integration';
import { getIntegrationSidebarItems } from '@/lib/constants/integrations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Search, Plus, MoreVertical, Filter } from 'lucide-react';
import { useEffect } from 'react';
import { getWhatsAppTemplates, syncWhatsAppTemplates } from '@/lib/api/whatsapp';

export default function WhatsAppTemplatesPage() {
    const params = useParams();
    const router = useRouter();
    const botId = params.botId as string;
    const integrationId = params.id as string;

    const sidebarItems = getIntegrationSidebarItems('whatsapp');
    const basePath = `/chatbot/${botId}/integration/whatsapp/${integrationId}`;

    const [templates, setTemplates] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);

    const loadTemplates = async () => {
        setIsLoading(true);
        try {
            const data = await getWhatsAppTemplates(botId);
            setTemplates(data);
        } catch (error) {
            console.error("Failed to load templates", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadTemplates();
    }, [botId]);

    const handleSync = async () => {
        setIsSyncing(true);
        try {
            await syncWhatsAppTemplates(botId);
            await loadTemplates();
        } catch (error) {
            console.error("Sync failed", error);
        } finally {
            setIsSyncing(false);
        }
    };

    return (
        <div className="flex h-full">
            <IntegrationSidebar
                platform="whatsapp"
                items={sidebarItems}
                basePath={basePath}
                onClose={() => router.push(`/chatbot/${botId}/integration`)}
            />

            <div className="flex-1 overflow-y-auto bg-background">
                {/* Header */}
                <div className="border-b p-6 flex items-center justify-between bg-card/30">
                    <div>
                        <h1 className="text-2xl font-semibold">Message Templates</h1>
                        <p className="text-sm text-muted-foreground mt-1">Manage, create and edit your WhatsApp message templates.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleSync} disabled={isSyncing} className="gap-2">
                            <Plus className="w-4 h-4" />
                            {isSyncing ? 'Syncing...' : 'Sync from Meta'}
                        </Button>
                        <Button onClick={() => router.push(`${basePath}/templates/new`)} className="gap-2">
                            <Plus className="w-4 h-4" />
                            Create Template
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <div className="p-4 border-b flex items-center gap-4 bg-card/10">
                    <div className="relative w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search templates..." className="pl-9 bg-background" />
                    </div>

                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px] bg-background">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="utility">Utility</SelectItem>
                            <SelectItem value="auth">Authentication</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px] bg-background">
                            <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Languages</SelectItem>
                            <SelectItem value="en">English (US)</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button variant="outline" className="ml-auto gap-2">
                        <Filter className="w-4 h-4" />
                        More Filters
                    </Button>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-auto p-6">
                    <div className="rounded-md border bg-card">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead className="w-[300px]">Template name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Language</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Messages sent</TableHead>
                                    <TableHead className="text-right">Messages opened</TableHead>
                                    <TableHead className="text-right">Last edited</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">Loading templates...</TableCell>
                                    </TableRow>
                                ) : templates.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No templates found. Sync from Meta to get started.</TableCell>
                                    </TableRow>
                                ) : (
                                    templates.map((template) => (
                                        <TableRow key={template.id} className="hover:bg-muted/50 cursor-pointer">
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-3">
                                                    {/* <FileText className="w-4 h-4 text-muted-foreground" /> */}
                                                    {template.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>{template.category}</TableCell>
                                            <TableCell>{template.language}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200 font-normal">
                                                    {template.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">-</TableCell>
                                            <TableCell className="text-right">-</TableCell>
                                            <TableCell className="text-right">{new Date(template.updatedAt || template.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}

