import React, { useState, useMemo } from 'react';
import { CustomAction } from '@/types/customActions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Plus, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
    formData: CustomAction;
    updateField: (path: string, value: any) => void;
    onNext: () => void;
    onBack: () => void;
}

/**
 * Extract {{variable}} patterns from a string
 */
function extractVariables(str: string): string[] {
    const matches = str.match(/\{\{([^}]+)\}\}/g) || [];
    return matches.map(m => m.replace(/\{\{|\}\}/g, '').trim());
}

/**
 * Highlight {{variables}} in text
 */
function highlightVariables(text: string): React.ReactNode {
    const parts = text.split(/(\{\{[^}]+\}\})/g);
    return parts.map((part, i) => {
        if (part.match(/^\{\{[^}]+\}\}$/)) {
            return (
                <span key={i} className="bg-primary/20 text-primary rounded px-1 font-mono text-sm">
                    {part}
                </span>
            );
        }
        return part;
    });
}

export const TriggerStep: React.FC<Props> = ({
    formData,
    updateField,
    onNext,
    onBack,
}) => {
    const [newExample, setNewExample] = useState('');
    const triggerExamples = formData.triggerExamples || [];

    // Extract all unique variables from trigger examples
    const detectedVariables = useMemo(() => {
        const allVars = triggerExamples.flatMap(ex => extractVariables(ex));
        return [...new Set(allVars)];
    }, [triggerExamples]);

    const addExample = () => {
        if (newExample.trim() && !triggerExamples.includes(newExample.trim())) {
            updateField('triggerExamples', [...triggerExamples, newExample.trim()]);
            setNewExample('');
        }
    };

    const removeExample = (index: number) => {
        const updated = triggerExamples.filter((_, i) => i !== index);
        updateField('triggerExamples', updated);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addExample();
        }
    };

    // Auto-generate name and description from examples
    const generateMetadata = () => {
        if (triggerExamples.length === 0) return;

        // Generate name: take first example, replace {{vars}} with underscores, lowercase, replace spaces
        const firstName = triggerExamples[0]
            .replace(/\{\{[^}]+\}\}/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/^_|_$/g, '')
            .substring(0, 30);

        if (!formData.name) {
            updateField('name', firstName || 'custom_skill');
        }

        // Generate display name from first example
        if (!formData.displayName) {
            const displayName = triggerExamples[0]
                .replace(/\{\{([^}]+)\}\}/g, '$1')
                .split(' ')
                .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ');
            updateField('displayName', displayName);
        }

        // Generate description from all examples
        if (!formData.description || formData.description.length < 20) {
            const desc = `Trigger this skill when the user says things like: ${triggerExamples.slice(0, 3).map(e => `"${e}"`).join(', ')}. ${detectedVariables.length > 0 ? `Extracts: ${detectedVariables.join(', ')}.` : ''}`;
            updateField('description', desc);
        }
    };

    const isValid = () => {
        return triggerExamples.length >= 1;
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">When should this run?</h2>
                <p className="text-muted-foreground">
                    Add example phrases that should trigger this skill. Use <code className="px-1 py-0.5 rounded bg-muted">{'{{variable}}'}</code> for values to extract.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Trigger Examples</CardTitle>
                    <CardDescription>
                        The AI learns from these examples to detect when the user wants this skill
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Existing examples as pills */}
                    {triggerExamples.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {triggerExamples.map((example, index) => (
                                <div
                                    key={index}
                                    className="group flex items-center gap-2 bg-muted rounded-full pl-4 pr-2 py-2 text-sm"
                                >
                                    <span>{highlightVariables(example)}</span>
                                    <button
                                        onClick={() => removeExample(index)}
                                        className="h-5 w-5 rounded-full hover:bg-destructive/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Add new example */}
                    <div className="flex gap-2">
                        <Input
                            value={newExample}
                            onChange={(e) => setNewExample(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="e.g., get price of {{product}} or check order {{order_id}}"
                            className="flex-1"
                        />
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addExample}
                            disabled={!newExample.trim()}
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                        </Button>
                    </div>

                    {/* Hint */}
                    <p className="text-xs text-muted-foreground">
                        💡 Tip: Add 2-3 examples with different phrasings. Use <code className="bg-muted px-1 rounded">{'{{variable_name}}'}</code> for dynamic values.
                    </p>
                </CardContent>
            </Card>

            {/* Detected Variables Preview */}
            {detectedVariables.length > 0 && (
                <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
                    <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                            <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                            <div>
                                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                                    Detected Variables
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {detectedVariables.map(v => (
                                        <Badge key={v} variant="secondary" className="font-mono text-xs">
                                            {`{{${v}}}`}
                                        </Badge>
                                    ))}
                                </div>
                                <p className="text-xs text-green-700 dark:text-green-300 mt-2">
                                    These will be configured in the next step
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Empty state */}
            {triggerExamples.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed rounded-lg bg-muted/50">
                    <p className="text-muted-foreground mb-2">No trigger examples yet</p>
                    <p className="text-sm text-muted-foreground">
                        Add at least one example of what users might say
                    </p>
                </div>
            )}

            {/* Buttons */}
            <div className="flex justify-between">
                <Button variant="outline" onClick={onBack}>
                    ← Back
                </Button>
                <Button
                    onClick={() => {
                        generateMetadata();
                        onNext();
                    }}
                    disabled={!isValid()}
                >
                    Next: Extract Data →
                </Button>
            </div>
        </div>
    );
};
