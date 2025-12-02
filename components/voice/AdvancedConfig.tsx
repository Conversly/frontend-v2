import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CollapsibleSection } from "./CollapsibleSection";
import { SectionDivider } from "./SectionDivider";
import { Switch } from "./Switch";

interface AdvancedConfigProps {
    config: any;
    onChange: (field: string, value: any) => void;
}

export function AdvancedConfig({ config, onChange }: AdvancedConfigProps) {
    return (
        <div className="space-y-4">


            <CollapsibleSection
                id="metadata"
                title="Metadata"
                description="Add custom metadata to be included with calls."
            >
                <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        No metadata configured.
                    </p>
                    <Button variant="outline" className="mt-4">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Metadata
                    </Button>
                </div>
            </CollapsibleSection>

            <CollapsibleSection
                id="secrets"
                title="Secrets"
                description="Securely store API keys and sensitive values."
            >
                <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        No secrets configured.
                    </p>
                    <Button variant="outline" className="mt-4">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Secret
                    </Button>
                </div>
            </CollapsibleSection>

            <CollapsibleSection
                id="telephony"
                title="Telephony Settings"
                description="Configure phone number and SIP settings."
            >
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                            <p className="font-medium text-sm">
                                Enable call recording
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Record all calls for review and training
                            </p>
                        </div>
                        <Switch
                            checked={config.recordCalls || false}
                            onCheckedChange={(checked) =>
                                onChange("recordCalls", checked)
                            }
                        />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                            <p className="font-medium text-sm">
                                Enable HIPAA compliance
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Additional security for healthcare data
                            </p>
                        </div>
                        <Switch
                            checked={config.hipaaCompliant || false}
                            onCheckedChange={(checked) =>
                                onChange("hipaaCompliant", checked)
                            }
                        />
                    </div>
                </div>
            </CollapsibleSection>
        </div>
    );
}
