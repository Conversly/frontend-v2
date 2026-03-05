import * as React from "react";
import { Add } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CollapsibleSection } from "./CollapsibleSection";
import { SectionDivider } from "./SectionDivider";

interface AnalysisConfigProps {
    config: any;
    onChange: (field: string, value: any) => void;
}

export function AnalysisConfig({ config, onChange }: AnalysisConfigProps) {
    return (
        <div className="space-y-4">


            <CollapsibleSection
                id="summary-config"
                title="Summary"
                description="This is the prompt that's used to summarize the call. The output is stored in call.analysis.summary."
                defaultOpen={true}
            >
                <Textarea
                    value={
                        config.summaryPrompt ||
                        "Summarize the key points of this conversation..."
                    }
                    onChange={(e) =>
                        onChange("summaryPrompt", e.target.value)
                    }
                    className="min-h-[150px] font-mono text-sm"
                />
            </CollapsibleSection>

            <CollapsibleSection
                id="structured-data"
                title="Structured Data Extraction"
                description="Extract specific data points from conversations."
            >
                <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        Define schemas to extract structured data from calls.
                    </p>
                    <Button variant="outline" className="mt-4">
                        <Add sx={{ fontSize: 16, mr: 1 }} />
                        Add Schema
                    </Button>
                </div>
            </CollapsibleSection>
        </div>
    );
}
