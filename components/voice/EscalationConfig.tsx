import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/voice/Switch"; // Assuming this custom switch is used in other configs
import { CollapsibleSection } from "./CollapsibleSection";

interface EscalationConfigProps {
    config: any;
    onChange: (field: string, value: any) => void;
}

export function EscalationConfig({ config, onChange }: EscalationConfigProps) {
    return (
        <CollapsibleSection
            id="escalation"
            title="Escalation Rules"
            description="Configure when and how to hand off calls to human agents."
        >
            <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                    <div>
                        <Label className="text-base">Escalate to Human</Label>
                        <p className="text-sm text-muted-foreground">Allow the agent to transfer calls to a human operator.</p>
                    </div>
                    <Switch
                        checked={config.escalationEnabled || false}
                        onCheckedChange={(checked) => onChange("escalationEnabled", checked)}
                    />
                </div>

                {config.escalationEnabled && (
                    <>
                        <div className="space-y-2">
                            <Label>Escalation Webhook URL</Label>
                            <Input
                                placeholder="https://api.example.com/webhook/escalate"
                                value={config.escalationWebhookUrl || ""}
                                onChange={(e) => onChange("escalationWebhookUrl", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Escalation Message</Label>
                            <Textarea
                                placeholder="I will transfer you to a human agent now. Please hold."
                                value={config.escalationMessage || ""}
                                onChange={(e) => onChange("escalationMessage", e.target.value)}
                            />
                        </div>
                    </>
                )}
            </div>
        </CollapsibleSection>
    );
}
