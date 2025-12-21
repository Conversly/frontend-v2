'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IntegrationSidebar } from '@/components/chatbot/integration';
import { getIntegrationSidebarItems } from '@/lib/constants/integrations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Calendar, BarChart3, MoreVertical, Filter } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { getWhatsAppCampaigns, getWhatsAppTemplates } from '@/lib/api/whatsapp';
import { useEffect } from 'react';

export default function CampaignsPage() {
    const router = useRouter();
    const params = useParams();
    const botId = params.botId as string;
    const integrationId = params.id as string;

    const sidebarItems = getIntegrationSidebarItems('whatsapp');
    const basePath = `/chatbot/${botId}/whatsapp/${integrationId}`;

    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [templates, setTemplates] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const [campaignsData, templatesData] = await Promise.all([
                    getWhatsAppCampaigns(botId),
                    getWhatsAppTemplates(botId)
                ]);
                setCampaigns(campaignsData);
                setTemplates(templatesData);
            } catch (error) {
                console.error("Failed to load campaigns", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [botId]);


    const getTemplateName = (id: string) => {
        const t = templates.find(t => t.id === id);
        return t ? t.name : id;
    };

    return (
        <div className="flex h-full">
            <IntegrationSidebar
                platform="whatsapp"
                items={sidebarItems}
                basePath={basePath}
            />

            <div className="flex-1 overflow-y-auto bg-background">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-semibold">Campaigns</h1>
                            <p className="text-sm text-muted-foreground mt-1">Manage and track your WhatsApp marketing campaigns.</p>
                        </div>
                        <Button onClick={() => router.push(`${basePath}/campaigns/new`)} className="gap-2">
                            <Plus className="w-4 h-4" />
                            New Campaign
                        </Button>
                    </div>

                    {/* Filters */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative w-72">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search campaigns..." className="pl-9" />
                        </div>
                        <Button variant="outline" className="gap-2">
                            <Filter className="w-4 h-4" /> Filter
                        </Button>
                        <Button variant="outline" className="ml-auto gap-2">
                            <Calendar className="w-4 h-4" /> This Month
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="rounded-md border bg-card">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead>Campaign Name</TableHead>
                                    <TableHead>Template</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Audience</TableHead>
                                    <TableHead className="text-right">Sent</TableHead>
                                    <TableHead className="text-right">Read</TableHead>
                                    <TableHead className="text-right">Replied</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">Loading campaigns...</TableCell>
                                    </TableRow>
                                ) : campaigns.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No campaigns found.</TableCell>
                                    </TableRow>
                                ) : (
                                    campaigns.map((campaign) => (
                                        <TableRow key={campaign.id} className="hover:bg-muted/50 cursor-pointer">
                                            <TableCell className="font-medium">
                                                <div>{campaign.name}</div>
                                                <div className="text-xs text-muted-foreground">{campaign.scheduledAt ? new Date(campaign.scheduledAt).toLocaleDateString() : 'Draft'}</div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">{getTemplateName(campaign.templateId)}</TableCell>
                                            <TableCell>
                                                <Badge variant={campaign.status === 'COMPLETED' ? 'secondary' : 'default'} className="font-normal">
                                                    {campaign.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">{campaign.audienceSize}</TableCell>
                                            <TableCell className="text-right">{campaign.sentCount}</TableCell>
                                            <TableCell className="text-right text-green-600">{campaign.readCount}</TableCell>
                                            <TableCell className="text-right text-blue-600">{campaign.repliedCount}</TableCell>
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

