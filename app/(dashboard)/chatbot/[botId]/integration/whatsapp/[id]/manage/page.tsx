'use client';

import { useParams, useRouter } from 'next/navigation';
import { IntegrationSidebar } from '@/components/chatbot/integration';
import { getIntegrationSidebarItems } from '@/lib/constants/integrations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

export default function WhatsAppManagePage() {
    const routeParams = useParams<{ botId: string; id: string }>();
    const router = useRouter();
    const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;
    const integrationId = Array.isArray(routeParams.id) ? routeParams.id[0] : routeParams.id;

    const sidebarItems = getIntegrationSidebarItems('whatsapp');
    const basePath = `/chatbot/${botId}/integration/whatsapp/${integrationId}`;

    return (
        <div className="flex h-full">
            <IntegrationSidebar
                platform="whatsapp"
                items={sidebarItems}
                basePath={basePath}
                onClose={() => router.push(`/chatbot/${botId}/integration`)}
            />

            <div className="flex-1 overflow-y-auto bg-background">
                <div className="p-8 max-w-4xl mx-auto w-full space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Manage Integration</h1>
                            <p className="text-muted-foreground">Configure your WhatsApp Business API settings.</p>
                        </div>
                        <Button>Save Changes</Button>
                    </div>

                    <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Business Profile</CardTitle>
                                <CardDescription>Update your WhatsApp business profile information.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label>Display Name</Label>
                                    <Input defaultValue="Verly AI Assistant" />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Description</Label>
                                    <Input defaultValue="AI-powered customer support for your business." />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Address</Label>
                                    <Input placeholder="Enter business address" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Webhook Configuration</CardTitle>
                                <CardDescription>Manage webhook events and security.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label>Webhook URL</Label>
                                    <div className="flex gap-2">
                                        <Input readOnly value="https://api.verly.ai/webhooks/whatsapp/..." className="bg-muted font-mono text-sm" />
                                        <Button variant="outline">Copy</Button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Verify Token</Label>
                                        <p className="text-sm text-muted-foreground">Token used to verify webhook requests.</p>
                                    </div>
                                    <Button variant="outline" size="sm">Rotate Token</Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Automation Settings</CardTitle>
                                <CardDescription>Control how the AI interacts with users.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between space-x-2">
                                    <Label htmlFor="auto-reply">Auto-reply to new messages</Label>
                                    <Switch id="auto-reply" defaultChecked />
                                </div>
                                <div className="flex items-center justify-between space-x-2">
                                    <Label htmlFor="human-handoff">Allow human handoff keyword</Label>
                                    <Switch id="human-handoff" defaultChecked />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
