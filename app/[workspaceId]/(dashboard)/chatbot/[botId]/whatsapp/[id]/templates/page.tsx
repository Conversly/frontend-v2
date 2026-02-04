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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { PhonePreview } from '@/components/whatsapp/phone-preview';
import { useDeleteTemplate, useGetDefaultTemplates, useGetTemplates, useSyncTemplates } from '@/services/template';

export default function WhatsAppTemplatesPage() {
    const params = useParams<{ workspaceId: string; botId: string; id: string }>();
    const router = useRouter();
    const workspaceId = Array.isArray(params.workspaceId) ? params.workspaceId[0] : params.workspaceId;
    const botId = Array.isArray(params.botId) ? params.botId[0] : params.botId;
    const integrationId = Array.isArray(params.id) ? params.id[0] : params.id;

    const sidebarItems = getIntegrationSidebarItems('whatsapp');
    const basePath = `/${workspaceId}/chatbot/${botId}/whatsapp/${integrationId}`;

    const [activeTab, setActiveTab] = useState("saved");
    const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null);

    // Queries
    const { data: templates = [], isLoading: isLoadingSaved } = useGetTemplates({ chatbotId: botId });
    const { data: defaultsData, isLoading: isLoadingdefaults } = useGetDefaultTemplates(botId);
    const defaultTemplates = defaultsData?.defaults || [];

    const isLoading = isLoadingSaved || isLoadingdefaults;

    // Mutations
    const { mutateAsync: syncTemplates, isPending: isSyncing } = useSyncTemplates();
    const { mutateAsync: deleteTemplate } = useDeleteTemplate();

    const handleSync = async () => {
        try {
            await syncTemplates({ chatbotId: botId });
        } catch (error) {
            console.error("Sync failed", error);
        }
    };

    const handleDeleteTemplate = async (templateId: string) => {
        if (!confirm('Are you sure you want to delete this template?')) return;
        try {
            await deleteTemplate({ id: templateId, chatbotId: botId });
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    return (
        <div className="flex h-full">
            <IntegrationSidebar
                platform="whatsapp"
                items={sidebarItems}
                basePath={basePath}
            />

            <div className="flex-1 overflow-y-auto bg-background">
                {/* Header */}
                <div className="border-b p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card/30">
                    <div>
                        <h1 className="text-2xl font-semibold">Message Templates</h1>
                        <p className="text-sm text-muted-foreground mt-1">Manage, create and edit your WhatsApp message templates.</p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outline" onClick={handleSync} disabled={isSyncing} className="gap-2 flex-1 sm:flex-none">
                            <Plus className="w-4 h-4" />
                            {isSyncing ? 'Syncing...' : 'Sync from Meta'}
                        </Button>
                        <Button onClick={() => router.push(`${basePath}/templates/new`)} className="gap-2 flex-1 sm:flex-none">
                            <Plus className="w-4 h-4" />
                            Create Template
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <div className="p-4 border-b flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-card/10">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search templates..." className="pl-9 bg-background" />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 flex-1 md:flex-initial">
                        <Select defaultValue="all">
                            <SelectTrigger className="w-full sm:w-[180px] bg-background">
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
                            <SelectTrigger className="w-full sm:w-[180px] bg-background">
                                <SelectValue placeholder="Language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Languages</SelectItem>
                                <SelectItem value="en">English (US)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button variant="outline" className="md:ml-auto gap-2">
                        <Filter className="w-4 h-4" />
                        More Filters
                    </Button>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-auto p-6">
                    <Sheet open={!!selectedTemplate} onOpenChange={(open) => !open && setSelectedTemplate(null)}>
                        <Tabs defaultValue="saved" className="w-full" onValueChange={setActiveTab}>
                            <TabsList className="mb-4">
                                <TabsTrigger value="saved">Saved Templates ({templates.length})</TabsTrigger>
                                <TabsTrigger value="meta">Meta Templates ({defaultTemplates.length})</TabsTrigger>
                            </TabsList>

                            <TabsContent value="saved">
                                <div className="rounded-md border bg-card">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-muted/50">
                                                <TableHead className="w-[300px]">Template name</TableHead>
                                                <TableHead>Category</TableHead>
                                                <TableHead>Language</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Last edited</TableHead>
                                                <TableHead className="w-[50px]"></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {isLoading ? (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Loading templates...</TableCell>
                                                </TableRow>
                                            ) : templates.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No templates found. Sync from Meta to get started.</TableCell>
                                                </TableRow>
                                            ) : (
                                                templates.map((template) => (
                                                    <TableRow
                                                        key={template.id}
                                                        className="hover:bg-muted/50 cursor-pointer"
                                                        onClick={() => setSelectedTemplate(template)}
                                                    >
                                                        <TableCell className="font-medium">
                                                            <div className="flex items-center gap-3">
                                                                {template.name}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>{template.category}</TableCell>
                                                        <TableCell>{template.language}</TableCell>
                                                        <TableCell>
                                                            <Badge variant="outline" className={`font-normal ${template.status === 'APPROVED' ? 'bg-green-500/10 text-green-600 border-green-200' :
                                                                template.status === 'REJECTED' ? 'bg-red-500/10 text-red-600 border-red-200' :
                                                                    template.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-200' :
                                                                        'bg-gray-500/10 text-gray-600 border-gray-200'
                                                                }`}>
                                                                {template.status}
                                                            </Badge>
                                                            {!template.metaTemplateId && <Badge variant="secondary" className="ml-2 text-xs">DRAFT</Badge>}
                                                        </TableCell>
                                                        <TableCell className="text-right">{new Date(template.updatedAt || template.createdAt || Date.now()).toLocaleDateString()}</TableCell>
                                                        <TableCell onClick={(e) => e.stopPropagation()}>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="icon">
                                                                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuItem
                                                                        className="text-red-600"
                                                                        onClick={() => handleDeleteTemplate(template.id)}
                                                                    >
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </TabsContent>

                            <TabsContent value="meta">
                                <div className="rounded-md border bg-card">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-muted/50">
                                                <TableHead className="w-[300px]">Template name</TableHead>
                                                <TableHead>Category</TableHead>
                                                <TableHead>Language</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="w-[50px]"></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {isLoading ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Loading templates...</TableCell>
                                                </TableRow>
                                            ) : defaultTemplates.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No default templates found.</TableCell>
                                                </TableRow>
                                            ) : (
                                                defaultTemplates.map((template) => (
                                                    <TableRow
                                                        key={template.id}
                                                        className="hover:bg-muted/50 cursor-pointer"
                                                        onClick={() => setSelectedTemplate(template)}
                                                    >
                                                        <TableCell className="font-medium">
                                                            <div className="flex items-center gap-3">
                                                                {template.name}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>{template.category}</TableCell>
                                                        <TableCell>{template.language}</TableCell>
                                                        <TableCell>
                                                            <Badge variant="outline" className={`font-normal ${template.status === 'APPROVED' ? 'bg-green-500/10 text-green-600 border-green-200' :
                                                                'bg-gray-500/10 text-gray-600 border-gray-200'
                                                                }`}>
                                                                {template.status}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    const params = new URLSearchParams();
                                                                    params.set('source_template_name', template.name);
                                                                    params.set('source_template_category', template.category);
                                                                    params.set('source_template_language', template.language);
                                                                    params.set('source_template_components', JSON.stringify(template.components));
                                                                    router.push(`${basePath}/templates/new?${params.toString()}`);
                                                                }}
                                                            >
                                                                Use Template
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </TabsContent>
                        </Tabs>

                        {/* Preview Sheet */}
                        {selectedTemplate && (
                            <SheetContent className="sm:max-w-md overflow-scroll">
                                <SheetHeader className="mb-6">
                                    <SheetTitle>Template Preview</SheetTitle>
                                    <SheetDescription>
                                        Previewing {selectedTemplate.name} • {selectedTemplate.language}
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="flex justify-center">
                                    {(() => {
                                        // Simple parser to extract parts from components
                                        const components = selectedTemplate.components || [];
                                        const header = components.find((c: any) => c.type === 'HEADER');
                                        const body = components.find((c: any) => c.type === 'BODY');
                                        const footer = components.find((c: any) => c.type === 'FOOTER');
                                        const buttons = components.find((c: any) => c.type === 'BUTTONS')?.buttons || [];

                                        return (
                                            <PhonePreview
                                                headerText={header?.text || ''}
                                                bodyText={body?.text || ''}
                                                footerText={footer?.text || ''}
                                                buttons={buttons}
                                                templateType={header?.format === 'IMAGE' ? 'IMAGE' : 'TEXT'}
                                                cachedParams={{}}
                                            />
                                        );
                                    })()}
                                </div>
                            </SheetContent>
                        )}
                    </Sheet>
                </div>
            </div>
        </div>
    );
}

