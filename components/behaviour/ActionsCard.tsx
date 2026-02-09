"use client";

import { Zap } from "lucide-react";
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

export function ActionsCard() {
    return (
        <Card className="opacity-70 bg-muted/30">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-500/10 text-gray-600">
                            <Zap className="h-4 w-4" />
                        </div>
                        <div>
                            <CardTitle className="text-base">Actions & Automations</CardTitle>
                            <CardDescription>Connect to your tools and workflows.</CardDescription>
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
                        <Checkbox id="a1" disabled />
                        <Label htmlFor="a1" className="font-normal text-sm text-muted-foreground">Book calendar meeting</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="a2" disabled />
                        <Label htmlFor="a2" className="font-normal text-sm text-muted-foreground">Create support ticket</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="a3" disabled />
                        <Label htmlFor="a3" className="font-normal text-sm text-muted-foreground">Send pricing PDF</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="a4" disabled />
                        <Label htmlFor="a4" className="font-normal text-sm text-muted-foreground">Check order status</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="a5" disabled />
                        <Label htmlFor="a5" className="font-normal text-sm text-muted-foreground">Call webhook / API</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="a6" disabled />
                        <Label htmlFor="a6" className="font-normal text-sm text-muted-foreground">CRM integration</Label>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
