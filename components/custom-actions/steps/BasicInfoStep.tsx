import React, { useState } from 'react';
import { CustomAction } from '@/types/customActions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ActionFormErrors } from '@/utils/customActionValidation';

interface Props {
    formData: CustomAction;
    updateField: (path: string, value: any) => void;
    onNext: () => void;
    onCancel: () => void;
    errors?: ActionFormErrors;
}

export const BasicInfoStep: React.FC<Props> = ({
    formData,
    updateField,
    onNext,
    onCancel,
    errors,
}) => {
    const [newExample, setNewExample] = useState('');
    const triggerExamples = formData.triggerExamples || [];

    const toDisplayName = (raw: string) =>
        raw
            .trim()
            .replace(/[_-]+/g, ' ')
            .replace(/\s+/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase());

    const isValid = () => {
        return (
            formData.name.length >= 3 &&
            formData.description.length >= 20
        );
    };

    const addExample = () => {
        const trimmed = newExample.trim();
        if (!trimmed) return;
        if (triggerExamples.includes(trimmed)) return;
        updateField('triggerExamples', [...triggerExamples, trimmed]);
        setNewExample('');
    };

    const removeExample = (index: number) => {
        updateField(
            'triggerExamples',
            triggerExamples.filter((_, i) => i !== index)
        );
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addExample();
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="type-section-title">General</h2>
                <p className="type-body-muted">
                    Define the action and when the AI should use it.
                </p>
            </div>

            <Card className="shadow-none border-border bg-[--surface-secondary]">
                <CardHeader>
                    <CardTitle className="type-h3">Action details</CardTitle>
                    <CardDescription className="type-body-muted">
                        Define the core identity of your action.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Action Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name" className="type-label">
                            Action Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => {
                                const nextName = e.target.value.toLowerCase();
                                updateField('name', nextName);
                                // Keep `displayName` populated without exposing it in the UI.
                                updateField('displayName', toDisplayName(nextName));
                            }}
                            placeholder="e.g., get_product_price"
                            pattern="^[a-z0-9_]+$"
                            required
                            className={cn(
                                "bg-background h-11",
                                errors?.name ? 'border-destructive focus-visible:ring-destructive' : "border-border"
                            )}
                        />
                        {errors?.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                        <p className="type-caption text-muted-foreground">
                            Lowercase letters, numbers, and underscores only. This is the internal identifier.
                        </p>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description" className="type-label">
                            Description <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => updateField('description', e.target.value)}
                            placeholder="Describe when and how this action should be used. The AI will use this to decide when to call this action."
                            rows={4}
                            required
                            minLength={20}
                            className={cn(
                                "bg-background resize-none",
                                errors?.description ? 'border-destructive focus-visible:ring-destructive' : "border-border"
                            )}
                        />
                        {errors?.description && <p className="text-xs text-destructive mt-1">{errors.description}</p>}
                        <div className="flex justify-between text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                            <span>The AI uses this to understand when to use this action.</span>
                            <span>{formData.description.length} / 1000</span>
                        </div>
                    </div>

                    {/* Example Good Description */}
                    <div className="rounded-lg bg-muted/50 p-4 border border-border/50">
                        <div className="flex items-center gap-2 font-semibold text-foreground mb-1.5 text-sm">
                            <Sparkles className="h-4 w-4 text-primary" />
                            Example of a good description
                        </div>
                        <p className="type-body-muted italic leading-relaxed">
                            "Use this action when the user asks about product prices, availability,
                            or inventory. It fetches real-time pricing data from our e-commerce API.
                            Requires a product ID or product name."
                        </p>
                    </div>

                    {/* Trigger Examples */}
                    <div className="space-y-3 pt-2">
                        <Label className="type-label">
                            Example user queries <span className="text-muted-foreground normal-case font-normal">(optional)</span>
                        </Label>

                        {triggerExamples.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {triggerExamples.map((example, index) => (
                                    <div
                                        key={index}
                                        className="group flex items-center gap-2 bg-muted rounded-full pl-3 pr-2 py-1.5 text-xs font-medium border border-border"
                                    >
                                        <span>{example}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeExample(index)}
                                            className="h-4 w-4 rounded-full hover:bg-destructive hover:text-white flex items-center justify-center transition-colors"
                                        >
                                            <X className="h-2.5 w-2.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex gap-2">
                            <Input
                                value={newExample}
                                onChange={(e) => setNewExample(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="e.g., Upgrade my subscription to premium"
                                className="flex-1 h-10 bg-background"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={addExample}
                                disabled={!newExample.trim()}
                                className="h-10"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add
                            </Button>
                        </div>

                        <p className="type-caption">
                            These help you and the AI validate when the action should trigger.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-border mt-8">
                <Button variant="ghost" onClick={onCancel} className="px-6">
                    Cancel
                </Button>
                <Button onClick={onNext} disabled={!isValid()} className="px-8 shadow-card">
                    Next: API Configuration
                </Button>
            </div>
        </div>
    );
};
