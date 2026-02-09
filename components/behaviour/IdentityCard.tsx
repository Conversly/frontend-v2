"use client";

import { User } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IdentityState, RoleType } from "./BehaviourState";


import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, RefreshCw } from "lucide-react";

interface IdentityCardProps {
    state: IdentityState;
    onChange: (newState: IdentityState) => void;
    // New props for system prompt
    systemPrompt: string;
    onSystemPromptChange: (newPrompt: string) => void;
    onGenerate: () => void;
    isGenerating: boolean;
}

export function IdentityCard({ state, onChange, systemPrompt, onSystemPromptChange, onGenerate, isGenerating }: IdentityCardProps) {
    const handleChange = (field: keyof IdentityState, value: string) => {
        onChange({
            ...state,
            [field]: value,
        });
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <User className="h-4 w-4" />
                    </div>
                    <div>
                        <CardTitle className="text-base">Who is your AI?</CardTitle>
                        <CardDescription>This helps the AI understand its job.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="ai-name">AI Name</Label>
                    <Input
                        id="ai-name"
                        placeholder="e.g. Alice"
                        value={state.aiName}
                        onChange={(e) => handleChange("aiName", e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                        value={state.role}
                        onValueChange={(value) => handleChange("role", value as RoleType)}
                    >
                        <SelectTrigger id="role">
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Customer Support Agent">Customer Support Agent</SelectItem>
                            <SelectItem value="Sales Assistant">Sales Assistant</SelectItem>
                            <SelectItem value="Product Expert">Product Expert</SelectItem>
                            <SelectItem value="Consultant">Consultant</SelectItem>
                            <SelectItem value="Custom">Custom</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="purpose">What should it help visitors with?</Label>
                    <Textarea
                        id="purpose"
                        placeholder="e.g. Answering questions about our pricing and features..."
                        className="min-h-[80px]"
                        value={state.purpose}
                        onChange={(e) => handleChange("purpose", e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="constraints">Things it must never do</Label>
                    <Textarea
                        id="constraints"
                        placeholder="e.g. Never promise a specific delivery date..."
                        className="min-h-[80px]"
                        value={state.constraints}
                        onChange={(e) => handleChange("constraints", e.target.value)}
                    />
                </div>

                <div className="rounded-lg border bg-slate-50 p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-purple-500" />
                            <Label className="text-purple-700 font-medium">Magic Prompt</Label>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onGenerate}
                            disabled={isGenerating}
                            className="h-8 border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800"
                        >
                            {isGenerating ? <Loader2 className="mr-2 h-3 w-3 animate-spin" /> : <RefreshCw className="mr-2 h-3 w-3" />}
                            Generate from Settings
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Generated System Prompt</Label>
                        <Textarea
                            value={systemPrompt}
                            onChange={(e) => onSystemPromptChange(e.target.value)}
                            className="min-h-[120px] font-mono text-sm bg-white"
                            placeholder="Click generate to create a prompt from your settings..."
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
