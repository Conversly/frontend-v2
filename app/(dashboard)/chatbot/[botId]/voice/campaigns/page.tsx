"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Play, Pause, Eye, Upload, CheckCircle2, ArrowRight, ArrowLeft, Rocket, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Papa from "papaparse";
import { format } from "date-fns";

import { useCampaigns, useCreateCampaign, useLaunchCampaign } from "@/services/campaign-service";
import { useAssistants } from "@/services/voice-assistant-service";
import { usePhoneNumbers } from "@/services/phone-number-service";
import { CreateCampaignInput } from "@/types/campaign";

const statusStyles: Record<string, string> = {
    RUNNING: "bg-green-500/10 text-green-600 border-green-500/20",
    PAUSED: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    COMPLETED: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    DRAFT: "bg-muted text-muted-foreground border-border",
    FAILED: "bg-red-500/10 text-red-600 border-red-500/20",
};

export default function VoiceCampaigns() {
    const params = useParams();
    const botId = params.botId as string;

    const { data: campaigns, isLoading: isLoadingCampaigns } = useCampaigns(botId);
    const { data: assistants } = useAssistants(botId);
    const { data: phoneNumbers } = usePhoneNumbers(botId);


    const createCampaign = useCreateCampaign();
    const launchCampaign = useLaunchCampaign();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    // Form State
    const [campaignData, setCampaignData] = useState<{
        name: string;
        voiceAssistantId: string;
        callerId: string;
        contactsMethod: "csv" | "paste";
        contactsFile: File | null;
        pastedNumbers: string;
        parsedContacts: { phoneNumber: string; name?: string; email?: string }[];
        scheduledAt: string;
    }>({
        name: "",
        voiceAssistantId: "",
        callerId: "",
        contactsMethod: "csv",
        contactsFile: null,
        pastedNumbers: "",
        parsedContacts: [],
        scheduledAt: "",
    });

    const totalSteps = 4;

    const handleNext = async () => {
        if (currentStep === 3) {
            // Validate contacts
            if (campaignData.contactsMethod === "paste") {
                const numbers = campaignData.pastedNumbers.split('\n').map(n => n.trim()).filter(n => n.length > 0);
                if (numbers.length === 0) {
                    toast.error("Please enter at least one phone number");
                    return;
                }
                setCampaignData(prev => ({ ...prev, parsedContacts: numbers.map(n => ({ phoneNumber: n })) }));
            }
            // If CSV, it should already be parsed
            if (campaignData.contactsMethod === "csv" && campaignData.parsedContacts.length === 0) {
                toast.error("Please upload a valid CSV with contacts");
                return;
            }
        }

        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleCreateAndLaunch = async () => {
        try {
            if (!campaignData.name || !campaignData.voiceAssistantId) {
                toast.error("Missing required fields");
                return;
            }

            const input: CreateCampaignInput = {
                chatbotId: botId,
                name: campaignData.name,
                channel: 'VOICE',
                voiceAssistantId: campaignData.voiceAssistantId,
                audienceList: campaignData.parsedContacts,
                scheduledAt: campaignData.scheduledAt || undefined,
            };

            const newCampaign = await createCampaign.mutateAsync(input);
            toast.success("Campaign created!");

            // If scheduledAt is not set, launch immediately? 
            // The UI button says "Launch Campaign", implying immediate start.
            // If scheduled, backend handles it (future scheduler service).

            if (!input.scheduledAt) {
                await launchCampaign.mutateAsync(newCampaign.id);
                toast.success("Campaign launched successfully!");
            }

            setIsDialogOpen(false);
            setCurrentStep(1);
            setCampaignData({
                name: "",
                voiceAssistantId: "",
                callerId: "",
                contactsMethod: "csv",
                contactsFile: null,
                pastedNumbers: "",
                parsedContacts: [],
                scheduledAt: "",
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to create/launch campaign");
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const contacts = results.data.map((row: any) => ({
                        phoneNumber: row.phone_number || row.phone || row.mobile, // try common headers
                        name: row.name || row.first_name,
                        email: row.email
                    })).filter((c: any) => c.phoneNumber);

                    if (contacts.length === 0) {
                        toast.error("No valid contacts found. headers should include 'phone_number', 'name', 'email'");
                    } else {
                        toast.success(`${contacts.length} contacts parsed`);
                        setCampaignData(prev => ({ ...prev, contactsFile: file, parsedContacts: contacts }));
                    }
                },
                error: (error) => {
                    toast.error("Failed to parse CSV");
                    console.error(error);
                }
            });
        }
    };

    const StepIndicator = () => (
        <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${step === currentStep
                            ? "bg-primary text-primary-foreground"
                            : step < currentStep
                                ? "bg-primary/20 text-primary"
                                : "bg-muted text-muted-foreground"
                            }`}
                    >
                        {step < currentStep ? <CheckCircle2 className="h-4 w-4" /> : step}
                    </div>
                    {step < 4 && (
                        <div
                            className={`w-8 h-0.5 mx-1 ${step < currentStep ? "bg-primary" : "bg-border"
                                }`}
                        />
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Voice Campaigns</h1>
                    <p className="text-muted-foreground mt-1">Manage outbound bulk calling campaigns</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Create Campaign
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Create New Campaign</DialogTitle>
                        </DialogHeader>

                        <StepIndicator />

                        {/* Step 1 - Campaign Details */}
                        {currentStep === 1 && (
                            <div className="space-y-4">
                                <h3 className="font-medium">Campaign Details</h3>
                                <div className="grid gap-2">
                                    <Label>Campaign Name</Label>
                                    <Input
                                        value={campaignData.name}
                                        onChange={(e) => setCampaignData({ ...campaignData, name: e.target.value })}
                                        placeholder="e.g. Q1 Sales Outreach"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Select Agent</Label>
                                    <Select
                                        value={campaignData.voiceAssistantId}
                                        onValueChange={(v) => setCampaignData({ ...campaignData, voiceAssistantId: v })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an agent" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {assistants?.map((a: any) => (
                                                <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}

                        {/* Step 2 - Validation/Config (Skipped, can add later) -> Step 2 is now Contacts */}
                        {/* Reordered: 1: Details, 2: Caller ID (Optional), 3: Contacts, 4: Review */}

                        {/* Step 2 - Caller ID (Placeholder for now) */}
                        {currentStep === 2 && (
                            <div className="space-y-4">
                                <h3 className="font-medium">Caller ID</h3>
                                <p className="text-sm text-muted-foreground">Select the phone number to call from (Simulated for now)</p>
                                <Select
                                    value={campaignData.callerId}
                                    onValueChange={(v) => setCampaignData({ ...campaignData, callerId: v })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select phone number" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {phoneNumbers && phoneNumbers.length > 0 ? (
                                            phoneNumbers.map((p: any) => (
                                                <SelectItem key={p.id} value={p.phoneNumber}>
                                                    {p.phoneNumber} {p.name ? `(${p.name})` : ''}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <div className="p-2 text-sm text-muted-foreground text-center">
                                                No phone numbers found. Purchase one in Phone Numbers tab.
                                            </div>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}


                        {/* Step 3 - Upload Contacts */}
                        {currentStep === 3 && (
                            <div className="space-y-4">
                                <h3 className="font-medium">Add Contacts</h3>
                                <Tabs defaultValue="csv" className="w-full" onValueChange={(v: any) => setCampaignData({ ...campaignData, contactsMethod: v })}>
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="csv">Upload CSV</TabsTrigger>
                                        <TabsTrigger value="paste">Paste Numbers</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="csv" className="space-y-4 mt-4">
                                        <div className="border-2 border-dashed border-border rounded-xl p-8 text-center transition-colors hover:border-primary/50">
                                            <Input
                                                type="file"
                                                accept=".csv"
                                                onChange={handleFileUpload}
                                                className="hidden"
                                                id="csv-upload"
                                            />
                                            <label htmlFor="csv-upload" className="cursor-pointer block">
                                                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                                                <p className="text-sm font-medium mb-1">
                                                    {campaignData.contactsFile ? campaignData.contactsFile.name : "Click to upload CSV"}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Required header: phone_number
                                                </p>
                                            </label>
                                        </div>
                                        {campaignData.parsedContacts.length > 0 && campaignData.contactsMethod === 'csv' && (
                                            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                                                <div className="flex items-center gap-2 text-green-600">
                                                    <CheckCircle2 className="h-4 w-4" />
                                                    <span className="text-sm font-medium">Verified {campaignData.parsedContacts.length} contacts</span>
                                                </div>
                                            </div>
                                        )}
                                    </TabsContent>

                                    <TabsContent value="paste" className="space-y-4 mt-4">
                                        <div className="space-y-2">
                                            <Label>Paste Phone Numbers</Label>
                                            <Textarea
                                                placeholder={`+1234567890\n+9876543210`}
                                                className="min-h-[200px] font-mono"
                                                value={campaignData.pastedNumbers}
                                                onChange={(e) => setCampaignData({ ...campaignData, pastedNumbers: e.target.value })}
                                            />
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        )}

                        {/* Step 4 - Review & Launch */}
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <h3 className="font-medium">Review & Launch</h3>
                                <div className="space-y-2 rounded-lg border p-4 bg-muted/50">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Name:</span>
                                        <span className="font-medium">{campaignData.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Agent:</span>
                                        <span className="font-medium">{assistants?.find((a: any) => a.id === campaignData.voiceAssistantId)?.name || 'Unknown'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Contacts:</span>
                                        <span className="font-medium">{campaignData.parsedContacts.length} targets</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Schedule (Optional)</Label>
                                    <Input
                                        type="datetime-local"
                                        value={campaignData.scheduledAt}
                                        onChange={(e) => setCampaignData({ ...campaignData, scheduledAt: e.target.value })}
                                    />
                                    <p className="text-xs text-muted-foreground">Leave empty to launch immediately.</p>
                                </div>
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="flex justify-between pt-4 border-t border-border">
                            <Button
                                variant="outline"
                                onClick={handleBack}
                                disabled={currentStep === 1}
                                className="gap-2"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </Button>
                            {currentStep < totalSteps ? (
                                <Button onClick={handleNext} className="gap-2">
                                    Next
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            ) : (
                                <Button onClick={handleCreateAndLaunch} disabled={createCampaign.isPending || launchCampaign.isPending} className="gap-2">
                                    {(createCampaign.isPending || launchCampaign.isPending) && <Loader2 className="h-4 w-4 animate-spin" />}
                                    <Rocket className="h-4 w-4" />
                                    Launch Campaign
                                </Button>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Campaign Table */}
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Campaign Name</TableHead>
                                <TableHead>Assistant</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Progress</TableHead>
                                <TableHead>Stats</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoadingCampaigns ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8">
                                        <Loader2 className="h-6 w-6 animate-spin mx-auto opacity-50" />
                                    </TableCell>
                                </TableRow>
                            ) : campaigns && campaigns.length > 0 ? (
                                campaigns.map((campaign: any) => (
                                    <TableRow key={campaign.id}>
                                        <TableCell className="font-medium">{campaign.name}</TableCell>
                                        <TableCell>
                                            {assistants?.find((a: any) => a.id === campaign.voiceAssistantId)?.name || '-'}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={statusStyles[campaign.status] || ''}>
                                                {campaign.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary rounded-full"
                                                        style={{ width: `${campaign.stats ? (campaign.stats.processedCount / campaign.stats.totalTargets) * 100 : 0}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm text-muted-foreground">
                                                    {campaign.stats?.processedCount || 0}/{campaign.stats?.totalTargets || 0}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="grid grid-cols-3 gap-2 text-xs">
                                                <div className="text-green-600">
                                                    <span className="font-bold">{campaign.stats?.successCount || 0}</span> OK
                                                </div>
                                                <div className="text-red-600">
                                                    <span className="font-bold">{campaign.stats?.failedCount || 0}</span> Fail
                                                </div>
                                                <div className="text-blue-600">
                                                    <span className="font-bold">{campaign.stats?.processedCount || 0}</span> Sent
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {format(new Date(campaign.createdAt), 'MMM d, yyyy')}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="icon">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                {campaign.status === "DRAFT" && (
                                                    <Button variant="ghost" size="icon" onClick={() => launchCampaign.mutate(campaign.id)}>
                                                        <Play className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                        No campaigns found. Create one to get started.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
