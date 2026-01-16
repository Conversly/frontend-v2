'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IntegrationSidebar } from '@/components/chatbot/integration';
import { getIntegrationSidebarItems } from '@/lib/constants/integrations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Loader2, Trash2, AlertTriangle, Eye, EyeOff, Copy, Check } from 'lucide-react';
import { getWhatsAppIntegration, deleteWhatsAppIntegration, updateWhatsAppIntegration } from '@/lib/api/whatsapp';
import { WhatsAppIntegrationResponse } from '@/types/integration';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

export default function WhatsAppManagePage() {
    const routeParams = useParams<{ workspaceId: string; botId: string; id: string }>();
    const router = useRouter();
    const workspaceId = Array.isArray(routeParams.workspaceId) ? routeParams.workspaceId[0] : routeParams.workspaceId;
    const botId = Array.isArray(routeParams.botId) ? routeParams.botId[0] : routeParams.botId;
    const integrationId = Array.isArray(routeParams.id) ? routeParams.id[0] : routeParams.id;

    const sidebarItems = getIntegrationSidebarItems('whatsapp');
    const basePath = `/${workspaceId}/chatbot/${botId}/whatsapp/${integrationId}`;

    const [integration, setIntegration] = useState<WhatsAppIntegrationResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [showToken, setShowToken] = useState(false);
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({
        phoneNumberId: '',
        businessAccountId: '',
        accessToken: '',
        phoneNumber: '',
    });

    useEffect(() => {
        const fetchIntegration = async () => {
            if (!botId) return;

            setIsLoading(true);
            try {
                const data = await getWhatsAppIntegration(botId);
                setIntegration(data);
                if (data) {
                    setEditForm({
                        phoneNumberId: data.phoneNumberId,
                        businessAccountId: data.whatsappBusinessId || data.businessAccountId || '',
                        accessToken: data.accessToken,
                        phoneNumber: data.phoneNumber || '',
                    });
                }
            } catch (error: any) {
                toast.error('Failed to load integration: ' + (error.message || 'Unknown error'));
                console.error('Error fetching integration:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchIntegration();
    }, [botId]);

    const handleUpdateIntegration = async () => {
        if (!botId || !integration) return;

        setIsSubmitting(true);
        setShowUpdateDialog(false);
        try {
            const updated = await updateWhatsAppIntegration(botId, {
                phoneNumberId: editForm.phoneNumberId,
                businessAccountId: editForm.businessAccountId,
                accessToken: editForm.accessToken,
                phoneNumber: editForm.phoneNumber,
            });
            setIntegration(updated);
            setIsEditing(false);
            toast.success('Integration updated successfully');
        } catch (error: any) {
            toast.error('Failed to update integration: ' + (error.message || 'Unknown error'));
            console.error('Error updating integration:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSaveClick = () => {
        // Validate required fields
        if (!editForm.phoneNumberId || !editForm.accessToken) {
            toast.error('Please fill in all required fields (Phone Number ID and Access Token)');
            return;
        }
        // Validate phone number format if provided
        if (editForm.phoneNumber && !/^\+?[1-9]\d{1,14}$/.test(editForm.phoneNumber.replace(/[\s\-\(\)]/g, ''))) {
            toast.error('Phone number must be in E.164 format (e.g., +1234567890)');
            return;
        }
        setShowUpdateDialog(true);
    };

    const handleDeleteIntegration = async () => {
        if (!botId) return;

        setIsDeleting(true);
        try {
            await deleteWhatsAppIntegration(botId);
            toast.success('WhatsApp integration removed successfully');
            router.push(`/${workspaceId}/chatbot/${botId}/whatsapp`);
        } catch (error: any) {
            toast.error('Failed to remove integration: ' + (error.message || 'Unknown error'));
            console.error('Error deleting integration:', error);
        } finally {
            setIsDeleting(false);
            setShowDeleteDialog(false);
        }
    };

    const handleCopy = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        toast.success(`${field} copied to clipboard`);
        setTimeout(() => setCopiedField(null), 2000);
    };

    if (isLoading) {
        return (
            <div className="flex h-full">
                <IntegrationSidebar
                    platform="whatsapp"
                    items={sidebarItems}
                    basePath={basePath}
                />
                <div className="flex-1 flex items-center justify-center bg-background">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full">
            <IntegrationSidebar
                platform="whatsapp"
                items={sidebarItems}
                basePath={basePath}
            />

            <div className="flex-1 overflow-y-auto bg-background">
                <div className="p-8 max-w-4xl mx-auto w-full space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Manage Integration</h1>
                            <p className="text-muted-foreground">Configure your WhatsApp Business API and integration settings.</p>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        {/* Integration Details */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                                <div className="space-y-1">
                                    <CardTitle>Integration Details</CardTitle>
                                    <CardDescription>Key identifiers for your WhatsApp Business connection.</CardDescription>
                                </div>
                                {!isEditing ? (
                                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                                        Edit Details
                                    </Button>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="sm" onClick={() => {
                                            setIsEditing(false);
                                            setEditForm({
                                                phoneNumberId: integration?.phoneNumberId || '',
                                                businessAccountId: integration?.whatsappBusinessId || integration?.businessAccountId || '',
                                                accessToken: integration?.accessToken || '',
                                                phoneNumber: integration?.phoneNumber || '',
                                            });
                                        }} disabled={isSubmitting}>
                                            Cancel
                                        </Button>
                                        <Button size="sm" onClick={handleSaveClick} disabled={isSubmitting}>
                                            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                            Save Changes
                                        </Button>
                                    </div>
                                )}
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Phone Number ID</Label>
                                        {isEditing ? (
                                            <Input
                                                value={editForm.phoneNumberId}
                                                onChange={(e) => setEditForm({ ...editForm, phoneNumberId: e.target.value })}
                                                placeholder="Enter Phone Number ID"
                                            />
                                        ) : (
                                            <div className="flex gap-2">
                                                <Input readOnly value={integration?.phoneNumberId || ''} className="font-mono bg-muted/50" />
                                                <Button variant="outline" size="icon" onClick={() => handleCopy(integration?.phoneNumberId || '', 'Phone Number ID')}>
                                                    {copiedField === 'Phone Number ID' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label>WhatsApp Business Account ID</Label>
                                        {isEditing ? (
                                            <Input
                                                value={editForm.businessAccountId}
                                                onChange={(e) => setEditForm({ ...editForm, businessAccountId: e.target.value })}
                                                placeholder="Enter WABA ID"
                                            />
                                        ) : (
                                            <div className="flex gap-2">
                                                <Input readOnly value={integration?.whatsappBusinessId || integration?.businessAccountId || 'Not set'} className="font-mono bg-muted/50" />
                                                <Button variant="outline" size="icon" onClick={() => handleCopy(integration?.whatsappBusinessId || integration?.businessAccountId || '', 'WABA ID')}>
                                                    {copiedField === 'WABA ID' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                                </Button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <Label>Access Token</Label>
                                        {isEditing ? (
                                            <Input
                                                type="password"
                                                value={editForm.accessToken}
                                                onChange={(e) => setEditForm({ ...editForm, accessToken: e.target.value })}
                                                placeholder="Enter Access Token"
                                            />
                                        ) : (
                                            <>
                                                <div className="flex gap-2">
                                                    <div className="relative flex-1">
                                                        <Input
                                                            type={showToken ? "text" : "password"}
                                                            readOnly
                                                            value={integration?.accessToken || ''}
                                                            className="font-mono bg-muted/50 pr-10"
                                                        />
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                                            onClick={() => setShowToken(!showToken)}
                                                        >
                                                            {showToken ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                                                        </Button>
                                                    </div>
                                                    <Button variant="outline" size="icon" onClick={() => handleCopy(integration?.accessToken || '', 'Access Token')}>
                                                        {copiedField === 'Access Token' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                                    </Button>
                                                </div>
                                                <p className="text-xs text-muted-foreground">This token is used to authenticate requests to the WhatsApp Cloud API.</p>
                                            </>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Phone Number</Label>
                                        {isEditing ? (
                                            <div>
                                                <Input
                                                    value={editForm.phoneNumber}
                                                    onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })}
                                                    placeholder="e.g. +1234567890"
                                                    required
                                                />
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    Enter phone number in E.164 format (e.g., +1234567890)
                                                </p>
                                            </div>
                                        ) : (
                                            <Input readOnly value={integration?.phoneNumber || 'Not set'} className="font-mono bg-muted/50" />
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Verified Name</Label>
                                        <Input readOnly value={integration?.verifiedName || 'Not set'} className="bg-muted/50 cursor-not-allowed" disabled title="Cannot be edited here, update in Meta Business Manager" />
                                        <p className="text-xs text-muted-foreground">Managed in Meta Business Manager</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Webhook Configuration */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Webhook Configuration</CardTitle>
                                <CardDescription>Manage webhook events and security for receiving messages.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Webhook URL</Label>
                                    <div className="flex gap-2">
                                        <Input readOnly value={integration?.webhookUrl || 'Not set'} className="bg-muted/50 font-mono text-sm" />
                                        <Button variant="outline" size="icon" onClick={() => handleCopy(integration?.webhookUrl || '', 'Webhook URL')}>
                                            {copiedField === 'Webhook URL' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Verify Token</Label>
                                    <div className="flex gap-2">
                                        <Input readOnly value={integration?.verifyToken || 'Not set'} className="bg-muted/50 font-mono text-sm" />
                                        <Button variant="outline" size="icon" onClick={() => handleCopy(integration?.verifyToken || '', 'Verify Token')}>
                                            {copiedField === 'Verify Token' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Use this token when configuring the webhook in your Meta App settings.</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Update Confirmation Dialog */}
                        <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                                        Confirm Update
                                    </DialogTitle>
                                    <DialogDescription className="pt-2">
                                        Are you sure you want to update the integration details? This will:
                                        <ul className="list-disc list-inside mt-2 space-y-1">
                                            <li>Update your WhatsApp Business API credentials</li>
                                            <li>May temporarily interrupt messaging if credentials are invalid</li>
                                            <li>Require re-verification of webhook settings if changed</li>
                                        </ul>
                                        <strong className="block mt-3">Please ensure all credentials are correct before proceeding.</strong>
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowUpdateDialog(false)}
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleUpdateIntegration}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Updating...
                                            </>
                                        ) : (
                                            'Confirm Update'
                                        )}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        {/* Danger Zone */}
                        <Card className="border-destructive/50">
                            <CardHeader>
                                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                                <CardDescription>Irreversible actions for this integration.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                                    <div className="space-y-1">
                                        <h4 className="font-medium text-destructive">Remove Integration</h4>
                                        <p className="text-sm text-muted-foreground max-w-md">
                                            Disconnects your WhatsApp Business API account and stops all messaging functionality. This action cannot be undone.
                                        </p>
                                    </div>
                                    <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                                        <DialogTrigger asChild>
                                            <Button variant="destructive">
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Remove Integration
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="flex items-center gap-2">
                                                    <AlertTriangle className="w-5 h-5 text-destructive" />
                                                    Remove WhatsApp Integration?
                                                </DialogTitle>
                                                <DialogDescription className="pt-2">
                                                    Are you sure you want to remove this WhatsApp integration? This will:
                                                    <ul className="list-disc list-inside mt-2 space-y-1">
                                                        <li>Disconnect your WhatsApp Business API account</li>
                                                        <li>Stop all incoming and outgoing messages</li>
                                                        <li>Delete all integration settings and credentials</li>
                                                    </ul>
                                                    <strong className="block mt-3 text-destructive">This action cannot be undone.</strong>
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setShowDeleteDialog(false)}
                                                    disabled={isDeleting}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    onClick={handleDeleteIntegration}
                                                    disabled={isDeleting}
                                                    variant="destructive"
                                                >
                                                    {isDeleting ? (
                                                        <>
                                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                            Removing...
                                                        </>
                                                    ) : (
                                                        'Remove Integration'
                                                    )}
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
