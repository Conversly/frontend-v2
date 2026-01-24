import React, { useState } from 'react';
import { CustomAction } from '@/types/customActions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';
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
                <h2 className="text-xl font-bold tracking-tight">General</h2>
                <p className="text-sm text-muted-foreground">
                    Define the action and when the AI should use it.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Action details</CardTitle>
                    <CardDescription>
                        Define the core identity of your action.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Action Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">
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
                            className={errors?.name ? 'border-destructive focus-visible:ring-destructive' : undefined}
                        />
                        {errors?.name && <p className="text-xs text-destructive">{errors.name}</p>}
                        <p className="text-xs text-muted-foreground">
                            Lowercase letters, numbers, and underscores only. This is the internal identifier.
                        </p>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">
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
                            className={errors?.description ? 'border-destructive focus-visible:ring-destructive' : undefined}
                        />
                        {errors?.description && <p className="text-xs text-destructive">{errors.description}</p>}
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>The AI uses this to understand when to use this action.</span>
                            <span>{formData.description.length} / 1000</span>
                        </div>
                    </div>

                    {/* Example Good Description */}
                    <div className="rounded-md bg-muted p-4 text-sm">
                        <div className="flex items-center gap-2 font-medium mb-1">
                            <span>💡</span> Example of a good description:
                        </div>
                        <p className="text-muted-foreground">
                            "Use this action when the user asks about product prices, availability,
                            or inventory. It fetches real-time pricing data from our e-commerce API.
                            Requires a product ID or product name."
                        </p>
                    </div>

                    {/* Trigger Examples */}
                    <div className="space-y-2 pt-2">
                        <Label>
                            Example user queries <span className="text-muted-foreground">(optional)</span>
                        </Label>

                        {triggerExamples.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {triggerExamples.map((example, index) => (
                                    <div
                                        key={index}
                                        className="group flex items-center gap-1.5 bg-muted rounded-full pl-3 pr-1.5 py-1.5 text-xs"
                                    >
                                        <span>{example}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeExample(index)}
                                            className="h-4 w-4 rounded-full hover:bg-destructive/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
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
                                className="flex-1 h-9 text-sm"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addExample}
                                disabled={!newExample.trim()}
                            >
                                <Plus className="h-3.5 w-3.5 mr-1" />
                                Add
                            </Button>
                        </div>

                        <p className="text-xs text-muted-foreground">
                            These help you and the AI validate when the action should trigger.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button onClick={onNext} disabled={!isValid()}>
                    Next: API →
                </Button>
            </div>
        </div>
    );
};
