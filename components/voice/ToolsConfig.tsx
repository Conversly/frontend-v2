import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CollapsibleSection } from "./CollapsibleSection";
import { SectionDivider } from "./SectionDivider";
import { Switch } from "./Switch";

interface ToolsConfigProps {
    config: any;
    onChange: (field: string, value: any) => void;
}

export function ToolsConfig({ config, onChange }: ToolsConfigProps) {
    return (
        <div className="space-y-4">
            <SectionDivider label="Tools" icon={<span>🔧</span>} />

            <CollapsibleSection
                id="tools-config"
                title="Tools"
                description="Tools enable voicebots to perform actions during calls. Add tools from the Tools Library to connect with Make.com or GHL workflows, or create custom tools with your backend."
                defaultOpen={true}
            >
                <div className="rounded-lg border border-teal-500/30 bg-teal-500/10 p-3 mb-4">
                    <p className="text-sm text-teal-200">
                        <strong>Note:</strong> Tools have different Request and
                        Response format as compared to Functions. Check our{" "}
                        <a
                            href="#"
                            className="underline hover:text-teal-100"
                        >
                            tools guide
                        </a>{" "}
                        for more details
                    </p>
                </div>

                <CollapsibleSection
                    id="select-tools"
                    title="Select Tools"
                    description="Choose from available tools library"
                >
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <p className="text-sm text-muted-foreground">
                            No tools selected. Click to browse the tools library.
                        </p>
                        <Button variant="outline" className="mt-4">
                            <Plus className="mr-2 h-4 w-4" />
                            Browse Tools
                        </Button>
                    </div>
                </CollapsibleSection>
            </CollapsibleSection>

            <CollapsibleSection
                id="predefined-functions"
                title="Predefined Functions"
                description="We've pre-built functions for common use cases. You can enable them and configure them below."
            >
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                📅
                            </div>
                            <div>
                                <p className="font-medium text-sm">
                                    Book Appointment
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Schedule meetings via Cal.com
                                </p>
                            </div>
                        </div>
                        <Switch checked={false} onCheckedChange={() => { }} />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                                📞
                            </div>
                            <div>
                                <p className="font-medium text-sm">Transfer Call</p>
                                <p className="text-xs text-muted-foreground">
                                    Transfer to human agent
                                </p>
                            </div>
                        </div>
                        <Switch checked={false} onCheckedChange={() => { }} />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                🔚
                            </div>
                            <div>
                                <p className="font-medium text-sm">End Call</p>
                                <p className="text-xs text-muted-foreground">
                                    Gracefully end the conversation
                                </p>
                            </div>
                        </div>
                        <Switch checked={true} onCheckedChange={() => { }} />
                    </div>
                </div>
            </CollapsibleSection>

            <CollapsibleSection
                id="custom-functions"
                title="Custom Functions"
                description="Define your custom functions here to enhance your assistant's capabilities. You can use your own code or tools like Pipedream or Make for the setup."
            >
                <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        No custom functions defined yet.
                    </p>
                    <Button variant="outline" className="mt-4">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Function
                    </Button>
                </div>
            </CollapsibleSection>
        </div>
    );
}
