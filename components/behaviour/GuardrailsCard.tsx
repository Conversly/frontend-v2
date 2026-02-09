"use client";

import { ShieldAlert, Lock } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function GuardrailsCard() {
    return (
        <Card className="opacity-70 bg-muted/30">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-500/10 text-gray-600">
                            <ShieldAlert className="h-4 w-4" />
                        </div>
                        <div>
                            <CardTitle className="text-base">Guardrails</CardTitle>
                            <CardDescription>Safety and compliance rules.</CardDescription>
                        </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                        🚧 Coming soon
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-3 pointer-events-none">
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="g1" disabled />
                        <Label htmlFor="g1" className="font-normal text-sm text-muted-foreground">Avoid competitors</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="g2" disabled />
                        <Label htmlFor="g2" className="font-normal text-sm text-muted-foreground">No pricing commitments</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="g3" disabled />
                        <Label htmlFor="g3" className="font-normal text-sm text-muted-foreground">No legal advice</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="g4" disabled />
                        <Label htmlFor="g4" className="font-normal text-sm text-muted-foreground">Sensitive topic handling</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="g5" disabled />
                        <Label htmlFor="g5" className="font-normal text-sm text-muted-foreground">Hallucination control</Label>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
