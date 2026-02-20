"use client";

import { useEffect, useState, useMemo } from "react";
import { getDeploymentDiff, DeploymentDiffResult, ResourceChange } from "@/lib/api/deploy";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, Clock, CheckCircle2, Rocket, Plus, Pencil, Trash2, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

// ============================================================================
// DISPLAY CONFIG
// ============================================================================

const HIDDEN_FIELDS = new Set([
    "id", "chatbotId", "branch", "logicalId", "createdAt", "updatedAt",
    "createdBy", "apiKey", "version",
]);

const FIELD_LABELS: Record<string, string> = {
    "styles.displayName": "Display Name",
    "styles.primaryColor": "Primary Color",
    "styles.widgetBubbleColour": "Bubble Color",
    "styles.PrimaryIcon": "Icon URL",
    "styles.widgeticon": "Widget Icon",
    "styles.alignChatButton": "Button Alignment",
    "styles.showButtonText": "Show Button Text",
    "styles.buttonText": "Button Text",
    "styles.widgetButtonText": "Widget Button Text",
    "styles.messagePlaceholder": "Placeholder Text",
    "styles.footerText": "Footer Text",
    "styles.chatWidth": "Chat Width",
    "styles.chatHeight": "Chat Height",
    "styles.appearance": "Theme",
    "styles.displayStyle": "Display Style",
    "styles.autoShowInitial": "Auto-Show on Load",
    "styles.autoShowDelaySec": "Auto-Show Delay (s)",
    "styles.collectUserFeedback": "Collect Feedback",
    "styles.regenerateMessages": "Regenerate Messages",
    "styles.continueShowingSuggestedMessages": "Keep Suggested Messages",
    "styles.dismissableNoticeText": "Notice Text",
    initialMessage: "Welcome Message",
    suggestedMessages: "Suggested Messages",
    allowedDomains: "Allowed Domains",
    onlyAllowOnAddedDomains: "Restrict to Added Domains",
    callEnabled: "Calls Enabled",
    "attention.messagePopupEnabled": "Message Popup",
    "attention.popupSoundEnabled": "Popup Sound",
    promptType: "Channel",
    systemPrompt: "System Prompt",
    name: "Name",
    type: "Type",
    citation: "URL / Citation",
    IngestionStatus: "Ingestion Status",
    status: "Status",
    sourceDetails: "Source Details",
    domain: "Domain",
    title: "Title",
    description: "Description",
    label: "Label",
    fieldType: "Field Type",
    required: "Required",
    placeholder: "Placeholder",
    phoneNumber: "Phone Number",
    provider: "Provider",
};

const RESOURCE_LABELS: Record<string, string> = {
    widget_config: "Widget Configuration",
    custom_action: "Custom Actions",
    channel_prompt: "Channel Prompts",
    data_source: "Data Sources",
    origin_domain: "Allowed Domains",
    lead_form: "Lead Form",
    lead_form_field: "Lead Form Fields",
    whatsapp_account: "WhatsApp Account",
    voice_assistant: "Voice Assistant",
    voice_phone_number: "Voice Phone Numbers",
    voice_assistant_behavior: "Voice Behavior",
    voice_assistant_provider: "Voice Provider",
    voice_assistant_widget: "Voice Widget",
    voice_campaign: "Voice Campaign",
};

// ============================================================================
// HELPERS
// ============================================================================

function getFieldLabel(path: string): string {
    return FIELD_LABELS[path] || path.split(".").pop()?.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase()) || path;
}

function getResourceLabel(type: string): string {
    return RESOURCE_LABELS[type] || type.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function flattenForDisplay(obj: Record<string, any>, prefix = ""): Array<{ key: string; value: any }> {
    const result: Array<{ key: string; value: any }> = [];
    for (const [k, v] of Object.entries(obj)) {
        if (HIDDEN_FIELDS.has(k)) continue;
        const fullKey = prefix ? `${prefix}.${k}` : k;
        if (v !== null && typeof v === "object" && !Array.isArray(v) && !(v instanceof Date)) {
            result.push(...flattenForDisplay(v, fullKey));
        } else {
            result.push({ key: fullKey, value: v });
        }
    }
    return result;
}

function formatDisplayValue(val: any): string {
    if (val === null || val === undefined) return "—";
    if (typeof val === "boolean") return val ? "Yes" : "No";
    if (Array.isArray(val)) return val.length === 0 ? "—" : val.join(", ");
    if (typeof val === "object") return JSON.stringify(val);
    const str = String(val);
    return str.length > 120 ? str.slice(0, 117) + "…" : str;
}

function changeBadge(type: string) {
    switch (type) {
        case "CREATED": return <Badge className="bg-emerald-500 hover:bg-emerald-600 gap-1 text-xs"><Plus className="w-3 h-3" />New</Badge>;
        case "DELETED": return <Badge variant="destructive" className="gap-1 text-xs"><Trash2 className="w-3 h-3" />Removed</Badge>;
        case "UPDATED": return <Badge className="bg-amber-500 hover:bg-amber-600 gap-1 text-xs"><Pencil className="w-3 h-3" />Modified</Badge>;
        default: return null;
    }
}

function getDisplayName(change: ResourceChange): string {
    const src = change.newValue || change.oldValue;
    if (change.resourceType === "widget_config") {
        return src?.styles?.displayName || "Widget Settings";
    }
    if (change.resourceType === "channel_prompt") {
        const type = src?.promptType || change.name;
        const labels: Record<string, string> = {
            WIDGET: "Website Chat",
            WHATSAPP: "WhatsApp",
            VOICE: "Voice",
            ESCALATION: "Escalation Rules",
            LEAD_GENERATION: "Lead Generation",
        };
        return labels[type || ""] || type || "Channel Prompt";
    }
    if (change.resourceType === "data_source") {
        return src?.citation || src?.name || change.name || "Data Source";
    }
    if (change.resourceType === "origin_domain") {
        return src?.domain || change.name || "Domain";
    }
    if (change.resourceType === "voice_assistant") {
        return src?.name || change.name || "Voice Assistant";
    }
    if (change.resourceType === "voice_assistant_behavior") {
        return "Behavior Settings";
    }
    if (change.resourceType === "voice_assistant_provider") {
        return src?.provider || "Provider";
    }
    if (change.resourceType === "voice_assistant_widget") {
        return "Voice Widget";
    }
    if (change.resourceType === "voice_campaign") {
        return src?.name || change.name || "Campaign";
    }
    if (change.resourceType === "lead_form") {
        return src?.title || change.name || "Lead Form";
    }
    if (change.resourceType === "lead_form_field") {
        return src?.label || change.name || "Form Field";
    }
    if (change.resourceType === "custom_action") {
        return src?.name || change.name || "Action";
    }
    if (change.resourceType === "whatsapp_account") {
        return src?.phoneNumber || change.name || "WhatsApp";
    }
    if (change.resourceType === "voice_phone_number") {
        return src?.phoneNumber || change.name || "Phone Number";
    }
    // Fallback: use name, then a friendly resource label, never raw logicalId
    return change.name || getResourceLabel(change.resourceType);
}

// ============================================================================
// COMPONENT — renders inline (no Dialog), replaces the DeployVisual area
// ============================================================================

interface DeploymentDiffViewProps {
    botId: string;
    onConfirm: () => void;
    onBack: () => void;
    isDeploying: boolean;
}

export function DeploymentDiffView({ botId, onConfirm, onBack, isDeploying }: DeploymentDiffViewProps) {
    const [diffResult, setDiffResult] = useState<DeploymentDiffResult | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchDiff();
    }, [botId]);

    const fetchDiff = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getDeploymentDiff(botId);
            setDiffResult(data);
        } catch (err: any) {
            setError(err.message || "Failed to load deployment differences.");
            toast.error("Failed to load differences");
        } finally {
            setIsLoading(false);
        }
    };

    const isFirstDeploy = useMemo(() => {
        if (!diffResult) return false;
        return diffResult.lastDeployedAt === null && diffResult.changes.every(c => c.changeType === "CREATED");
    }, [diffResult]);

    const grouped = useMemo(() => {
        if (!diffResult) return {};
        return diffResult.changes.reduce((acc, change) => {
            const type = change.resourceType;
            if (!acc[type]) acc[type] = [];
            acc[type].push(change);
            return acc;
        }, {} as Record<string, ResourceChange[]>);
    }, [diffResult]);

    const totalChanges = diffResult?.changes.length || 0;
    const created = diffResult?.changes.filter(c => c.changeType === "CREATED").length || 0;
    const updated = diffResult?.changes.filter(c => c.changeType === "UPDATED").length || 0;
    const deleted = diffResult?.changes.filter(c => c.changeType === "DELETED").length || 0;
    const hasChanges = totalChanges > 0;

    return (
        <Card className="overflow-hidden border-border/60 shadow-md flex flex-col h-full">
            {/* Header */}
            <CardHeader className="pb-3 border-b bg-muted/20">
                <div>
                    <CardTitle className="text-lg">
                        {isFirstDeploy ? "First Deployment" : "Review Changes"}
                    </CardTitle>
                    <CardDescription className="text-xs mt-0.5">
                        {isFirstDeploy
                            ? "All configuration will go live for the first time."
                            : "Changes between Draft (DEV) and Live (PRODUCTION)."
                        }
                    </CardDescription>
                </div>

                {/* Summary counts */}
                {hasChanges && !isLoading && (
                    <div className="flex items-center gap-4 mt-3">
                        {created > 0 && (
                            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                                <Plus className="w-3 h-3" /> {created} new
                            </span>
                        )}
                        {updated > 0 && (
                            <span className="flex items-center gap-1.5 text-xs font-medium text-amber-600">
                                <Pencil className="w-3 h-3" /> {updated} modified
                            </span>
                        )}
                        {deleted > 0 && (
                            <span className="flex items-center gap-1.5 text-xs font-medium text-red-600">
                                <Trash2 className="w-3 h-3" /> {deleted} removed
                            </span>
                        )}
                    </div>
                )}
            </CardHeader>

            {/* Scrollable content */}
            <CardContent className="flex-1 overflow-y-auto p-4 min-h-0">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-4">
                        <Clock className="w-8 h-8 animate-spin text-blue-500" />
                        <p className="text-muted-foreground text-sm">Calculating differences…</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-3 text-red-500">
                        <AlertCircle className="w-8 h-8" />
                        <p className="text-sm">{error}</p>
                        <Button variant="outline" onClick={fetchDiff} size="sm">Retry</Button>
                    </div>
                ) : !hasChanges && diffResult ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-3 text-emerald-600">
                        <CheckCircle2 className="w-10 h-10" />
                        <p className="font-medium text-lg">Everything is up to date</p>
                        <p className="text-sm opacity-80 text-center max-w-sm">
                            No differences found between DEV and LIVE.
                        </p>
                    </div>
                ) : (
                    <Accordion type="multiple" defaultValue={Object.keys(grouped)} className="w-full space-y-3">
                        {Object.entries(grouped).map(([resourceKey, changes]) => (
                            <AccordionItem
                                key={resourceKey}
                                value={resourceKey}
                                className="border rounded-lg overflow-hidden bg-background"
                            >
                                <AccordionTrigger className="px-4 py-2.5 hover:bg-muted/50 text-sm">
                                    <div className="flex items-center gap-3">
                                        <span className="font-semibold">{getResourceLabel(resourceKey)}</span>
                                        <Badge variant="secondary" className="text-xs">{changes.length}</Badge>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="p-0">
                                    {changes.map((change, idx) => (
                                        <div key={`${change.logicalId}-${idx}`} className={idx > 0 ? "border-t" : ""}>
                                            {/* Item header */}
                                            <div className="flex items-center gap-3 px-4 py-2 bg-muted/20">
                                                {changeBadge(change.changeType)}
                                                <span className="text-xs font-medium truncate max-w-[400px]" title={getDisplayName(change)}>
                                                    {getDisplayName(change)}
                                                </span>
                                            </div>

                                            {/* UPDATED: only changed fields */}
                                            {change.changeType === "UPDATED" && change.diffs && change.diffs.length > 0 && (
                                                <div className="px-4 pb-3 pt-1">
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow className="text-xs">
                                                                <TableHead className="w-[30%]">Field</TableHead>
                                                                <TableHead className="w-[35%]">Current (Live)</TableHead>
                                                                <TableHead className="w-[35%]">New (Draft)</TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {change.diffs
                                                                .filter(d => !HIDDEN_FIELDS.has(d.path) && !HIDDEN_FIELDS.has(d.path.split(".").pop() || ""))
                                                                .map((diff, j) => (
                                                                    <TableRow key={j} className="text-xs">
                                                                        <TableCell className="font-medium text-muted-foreground">
                                                                            {getFieldLabel(diff.path)}
                                                                        </TableCell>
                                                                        <TableCell className="bg-red-500/5 text-red-700 dark:text-red-400 break-all max-w-[200px]">
                                                                            {formatDisplayValue(diff.oldValue)}
                                                                        </TableCell>
                                                                        <TableCell className="bg-emerald-500/5 text-emerald-700 dark:text-emerald-400 break-all max-w-[200px]">
                                                                            {formatDisplayValue(diff.newValue)}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            )}

                                            {/* CREATED: key fields */}
                                            {change.changeType === "CREATED" && change.newValue && (
                                                <div className="px-4 pb-3 pt-1">
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow className="text-xs">
                                                                <TableHead className="w-[35%]">Field</TableHead>
                                                                <TableHead>Value</TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {flattenForDisplay(change.newValue).map(({ key, value }, j) => (
                                                                <TableRow key={j} className="text-xs">
                                                                    <TableCell className="font-medium text-muted-foreground">
                                                                        {getFieldLabel(key)}
                                                                    </TableCell>
                                                                    <TableCell className="break-all max-w-[300px]">
                                                                        {formatDisplayValue(value)}
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            )}

                                            {/* DELETED */}
                                            {change.changeType === "DELETED" && change.oldValue && (
                                                <div className="px-4 pb-3 pt-1">
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow className="text-xs">
                                                                <TableHead className="w-[35%]">Field</TableHead>
                                                                <TableHead>Value (being removed)</TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {flattenForDisplay(change.oldValue).map(({ key, value }, j) => (
                                                                <TableRow key={j} className="text-xs text-red-600/80 dark:text-red-400/80">
                                                                    <TableCell className="font-medium">{getFieldLabel(key)}</TableCell>
                                                                    <TableCell className="break-all max-w-[300px] line-through opacity-70">
                                                                        {formatDisplayValue(value)}
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </CardContent>

            {/* Footer with actions */}
            <CardFooter className="border-t bg-muted/10 px-4 py-3 flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={onBack} disabled={isDeploying}>
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    Back
                </Button>
                <Button
                    onClick={onConfirm}
                    disabled={isLoading || isDeploying || !hasChanges}
                    className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                    size="sm"
                >
                    <Rocket className="w-4 h-4" />
                    {isDeploying ? "Deploying…" : isFirstDeploy ? "Deploy Now" : "Confirm & Deploy"}
                </Button>
            </CardFooter>
        </Card>
    );
}
