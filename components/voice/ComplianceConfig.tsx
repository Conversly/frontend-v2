import * as React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/voice/Switch";
import { CollapsibleSection } from "./CollapsibleSection";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


interface ComplianceConfigProps {
    config: any;
    onChange: (field: string, value: any) => void;
}

export function ComplianceConfig({ config, onChange }: ComplianceConfigProps) {
    return (
        <CollapsibleSection
            id="compliance"
            title="Compliance"
            description="Manage legal compliance and operational constraints."
        >
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>AI Disclosure Message</Label>
                    <Textarea
                        placeholder="I am an AI assistant deployed by..."
                        value={config.aiDisclosureMessage || ""}
                        onChange={(e) => onChange("aiDisclosureMessage", e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label>Recording Consent Message</Label>
                    <Textarea
                        placeholder="This call may be recorded for quality assurance."
                        value={config.recordingConsentMessage || ""}
                        onChange={(e) => onChange("recordingConsentMessage", e.target.value)}
                    />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                    <div>
                        <Label className="text-base">DND Safe Mode</Label>
                        <p className="text-sm text-muted-foreground">Prevent calls during prohibited hours.</p>
                    </div>
                    <Switch
                        checked={config.dndSafeMode || false}
                        onCheckedChange={(checked) => onChange("dndSafeMode", checked)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Business Hours</Label>
                    <Select
                        value={config.businessHours || "9-5"}
                        onValueChange={(value) => onChange("businessHours", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select business hours" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="9-5">9:00 AM - 5:00 PM (Local)</SelectItem>
                            <SelectItem value="24-7">24/7 (Always Open)</SelectItem>
                            <SelectItem value="custom">Custom (Configured in Settings)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CollapsibleSection>
    );
}
