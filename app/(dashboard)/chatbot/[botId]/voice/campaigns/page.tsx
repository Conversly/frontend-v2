"use client";

import { useState } from "react";
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
import { Plus, Play, Pause, Eye, Upload, CheckCircle2, ArrowRight, ArrowLeft, Rocket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockCampaigns = [
    {
        id: "1",
        name: "Q1 Lead Qualification",
        agent: "Sales Agent Pro",
        callerId: "+91 98765 43210",
        status: "active",
        successRate: 78,
        startedAt: "2024-01-15 09:00",
        totalCalls: 1250,
        completedCalls: 876,
        answered: 750,
        failed: 126,
        cost: "$45.20",
    },
    {
        id: "2",
        name: "Appointment Reminders",
        agent: "Reminder Bot",
        callerId: "+91 98765 43211",
        status: "paused",
        successRate: 92,
        startedAt: "2024-01-14 10:30",
        totalCalls: 500,
        completedCalls: 500,
        answered: 460,
        failed: 40,
        cost: "$12.50",
    },
    {
        id: "3",
        name: "Payment Collection",
        agent: "Collection Agent",
        callerId: "+91 98765 43212",
        status: "completed",
        successRate: 65,
        startedAt: "2024-01-10 08:00",
        totalCalls: 2000,
        completedCalls: 2000,
        answered: 1300,
        failed: 700,
        cost: "$85.00",
    },
    {
        id: "4",
        name: "Customer Feedback Survey",
        agent: "Survey Agent",
        callerId: "+91 98765 43213",
        status: "draft",
        successRate: 0,
        startedAt: "-",
        totalCalls: 350,
        completedCalls: 0,
        answered: 0,
        failed: 0,
        cost: "$0.00",
    },
];

const statusStyles: Record<string, string> = {
    active: "bg-green-500/10 text-green-600 border-green-500/20",
    paused: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    completed: "bg-muted text-muted-foreground border-border",
    draft: "bg-primary/10 text-primary border-primary/20",
};

const callGoals = [
    { value: "appointment", label: "Appointment Confirmation", description: "Confirm or reschedule appointments" },
    { value: "feedback", label: "Feedback Collection", description: "Gather customer feedback and satisfaction" },
    { value: "payment", label: "Payment Reminder", description: "Remind customers about pending payments" },
    { value: "qualification", label: "Lead Qualification", description: "Qualify and score potential leads" },
    { value: "custom", label: "Custom Goal", description: "Define your own call objective" },
];

export default function VoiceCampaigns() {
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [campaignData, setCampaignData] = useState({
        agent: "",
        callerId: "",
        contactsMethod: "csv", // csv | paste
        contacts: null as File | null,
        pastedNumbers: "",
        goal: "",
        customGoal: "",
        startDate: "",
        endDate: "",
        callWindowStart: "09:00",
        callWindowEnd: "18:00",
        maxRetries: "2",
        retryGap: "30",
    });

    const totalSteps = 5;

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleLaunch = () => {
        setIsDialogOpen(false);
        setCurrentStep(1);
        toast({
            title: "Campaign launched!",
            description: "Your campaign is now running.",
        });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCampaignData({ ...campaignData, contacts: file });
        }
    };

    const StepIndicator = () => (
        <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((step) => (
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
                    {step < 5 && (
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
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
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

                        {/* Step 1 - Select Agent */}
                        {currentStep === 1 && (
                            <div className="space-y-4">
                                <h3 className="font-medium">Select Agent</h3>
                                <p className="text-sm text-muted-foreground">Choose the AI agent for this campaign</p>
                                <Select
                                    value={campaignData.agent}
                                    onValueChange={(v) => setCampaignData({ ...campaignData, agent: v })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an agent" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sales-pro">Sales Agent Pro</SelectItem>
                                        <SelectItem value="reminder-bot">Reminder Bot</SelectItem>
                                        <SelectItem value="collection">Collection Agent</SelectItem>
                                        <SelectItem value="survey">Survey Agent</SelectItem>
                                    </SelectContent>
                                </Select>
                                {campaignData.agent && (
                                    <Card className="bg-muted/50">
                                        <CardContent className="pt-4">
                                            <p className="text-sm text-muted-foreground">
                                                This agent is optimized for professional sales conversations with lead qualification capabilities.
                                            </p>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        )}

                        {/* Step 2 - Caller ID */}
                        {currentStep === 2 && (
                            <div className="space-y-4">
                                <h3 className="font-medium">Caller ID</h3>
                                <p className="text-sm text-muted-foreground">Select the phone number to call from</p>
                                <Select
                                    value={campaignData.callerId}
                                    onValueChange={(v) => setCampaignData({ ...campaignData, callerId: v })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select phone number" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="+91-9876543210">+91 98765 43210</SelectItem>
                                        <SelectItem value="+91-9876543211">+91 98765 43211</SelectItem>
                                        <SelectItem value="+91-9876543212">+91 98765 43212</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                                    Country: India (auto-locked for TRAI compliance)
                                </div>
                            </div>
                        )}

                        {/* Step 3 - Upload Contacts */}
                        {currentStep === 3 && (
                            <div className="space-y-4">
                                <h3 className="font-medium">Add Contacts</h3>
                                <p className="text-sm text-muted-foreground">Choose how you want to add contacts to this campaign</p>

                                <Tabs defaultValue="csv" className="w-full" onValueChange={(v) => setCampaignData({ ...campaignData, contactsMethod: v })}>
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
                                                    {campaignData.contacts ? campaignData.contacts.name : "Click to upload CSV"}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Required columns: name, phone_number
                                                </p>
                                            </label>
                                        </div>
                                        {campaignData.contacts && (
                                            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                                                <div className="flex items-center gap-2 text-green-600">
                                                    <CheckCircle2 className="h-4 w-4" />
                                                    <span className="text-sm font-medium">File validated successfully</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-1">250 contacts ready to import</p>
                                            </div>
                                        )}
                                    </TabsContent>

                                    <TabsContent value="paste" className="space-y-4 mt-4">
                                        <div className="space-y-2">
                                            <Label>Paste Phone Numbers</Label>
                                            <Textarea
                                                placeholder={`+1234567890\n+9876543210\n...`}
                                                className="min-h-[200px] font-mono"
                                                value={campaignData.pastedNumbers}
                                                onChange={(e) => setCampaignData({ ...campaignData, pastedNumbers: e.target.value })}
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Enter one phone number per line. Include country code (e.g., +1).
                                            </p>
                                        </div>
                                        {campaignData.pastedNumbers && (
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">
                                                    {campaignData.pastedNumbers.split('\n').filter(line => line.trim().length > 0).length} numbers detected
                                                </span>
                                                <Button variant="ghost" size="sm" onClick={() => setCampaignData({ ...campaignData, pastedNumbers: "" })}>
                                                    Clear
                                                </Button>
                                            </div>
                                        )}
                                    </TabsContent>
                                </Tabs>
                            </div>
                        )}

                        {/* Step 4 - Call Goal */}
                        {currentStep === 4 && (
                            <div className="space-y-4">
                                <h3 className="font-medium">Call Goal</h3>
                                <p className="text-sm text-muted-foreground">What is the objective of this campaign?</p>
                                <RadioGroup
                                    value={campaignData.goal}
                                    onValueChange={(v) => setCampaignData({ ...campaignData, goal: v })}
                                    className="space-y-3"
                                >
                                    {callGoals.map((goal) => (
                                        <label
                                            key={goal.value}
                                            className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${campaignData.goal === goal.value
                                                ? "border-primary bg-primary/5"
                                                : "border-border hover:border-primary/50"
                                                }`}
                                        >
                                            <RadioGroupItem value={goal.value} className="mt-0.5" />
                                            <div>
                                                <p className="font-medium">{goal.label}</p>
                                                <p className="text-sm text-muted-foreground">{goal.description}</p>
                                            </div>
                                        </label>
                                    ))}
                                </RadioGroup>
                                {campaignData.goal === "custom" && (
                                    <Textarea
                                        placeholder="Describe your custom call goal..."
                                        value={campaignData.customGoal}
                                        onChange={(e) => setCampaignData({ ...campaignData, customGoal: e.target.value })}
                                        className="min-h-[100px]"
                                    />
                                )}
                            </div>
                        )}

                        {/* Step 5 - Schedule & Limits */}
                        {currentStep === 5 && (
                            <div className="space-y-6">
                                <h3 className="font-medium">Schedule & Limits</h3>
                                <p className="text-sm text-muted-foreground">Configure when and how calls are made</p>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Start Date & Time</Label>
                                        <Input
                                            type="datetime-local"
                                            value={campaignData.startDate}
                                            onChange={(e) => setCampaignData({ ...campaignData, startDate: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>End Date</Label>
                                        <Input
                                            type="date"
                                            value={campaignData.endDate}
                                            onChange={(e) => setCampaignData({ ...campaignData, endDate: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Call Window (TRAI Safe Hours)</Label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type="time"
                                                value={campaignData.callWindowStart}
                                                onChange={(e) => setCampaignData({ ...campaignData, callWindowStart: e.target.value })}
                                            />
                                            <span className="text-muted-foreground">to</span>
                                        </div>
                                        <Input
                                            type="time"
                                            value={campaignData.callWindowEnd}
                                            onChange={(e) => setCampaignData({ ...campaignData, callWindowEnd: e.target.value })}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">TRAI requires calls between 9 AM - 9 PM only</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Max Retries</Label>
                                        <Select
                                            value={campaignData.maxRetries}
                                            onValueChange={(v) => setCampaignData({ ...campaignData, maxRetries: v })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0">No retries</SelectItem>
                                                <SelectItem value="1">1 retry</SelectItem>
                                                <SelectItem value="2">2 retries</SelectItem>
                                                <SelectItem value="3">3 retries</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Retry Gap (minutes)</Label>
                                        <Select
                                            value={campaignData.retryGap}
                                            onValueChange={(v) => setCampaignData({ ...campaignData, retryGap: v })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="15">15 minutes</SelectItem>
                                                <SelectItem value="30">30 minutes</SelectItem>
                                                <SelectItem value="60">1 hour</SelectItem>
                                                <SelectItem value="120">2 hours</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
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
                                <Button onClick={handleLaunch} className="gap-2">
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
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Campaign Name</TableHead>
                            <TableHead>Agent</TableHead>
                            <TableHead>Caller ID</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Progress</TableHead>
                            <TableHead>Answered</TableHead>
                            <TableHead>Failed</TableHead>
                            <TableHead>Cost</TableHead>
                            <TableHead>Success Rate</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockCampaigns.map((campaign) => (
                            <TableRow key={campaign.id}>
                                <TableCell className="font-medium">{campaign.name}</TableCell>
                                <TableCell>{campaign.agent}</TableCell>
                                <TableCell className="font-mono text-sm">{campaign.callerId}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={statusStyles[campaign.status]}>
                                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full"
                                                style={{ width: `${(campaign.completedCalls / campaign.totalCalls) * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-sm text-muted-foreground">
                                            {campaign.completedCalls}/{campaign.totalCalls}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="text-muted-foreground">{campaign.answered}</span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-red-500/80">{campaign.failed}</span>
                                </TableCell>
                                <TableCell>
                                    <span className="font-mono text-sm">{campaign.cost}</span>
                                </TableCell>
                                <TableCell>
                                    <span className={campaign.successRate >= 70 ? "text-green-600" : campaign.successRate >= 50 ? "text-yellow-600" : "text-red-600"}>
                                        {campaign.successRate}%
                                    </span>
                                </TableCell>
                                <TableCell className="text-muted-foreground">{campaign.startedAt}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="ghost" size="icon">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        {campaign.status === "active" ? (
                                            <Button variant="ghost" size="icon">
                                                <Pause className="h-4 w-4" />
                                            </Button>
                                        ) : campaign.status === "paused" || campaign.status === "draft" ? (
                                            <Button variant="ghost" size="icon">
                                                <Play className="h-4 w-4" />
                                            </Button>
                                        ) : null}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
