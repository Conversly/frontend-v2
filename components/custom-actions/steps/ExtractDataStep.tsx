import React, { useMemo, useEffect } from 'react';
import { CustomAction, ToolParameter } from '@/types/customActions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Plus, Sparkles, Info } from 'lucide-react';

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

export const ExtractDataStep: React.FC<Props> = ({
    formData,
    updateField,
    onNext,
    onBack,
}) => {
    // Detect variables from trigger examples
    const detectedVariables = useMemo(() => {
        const vars: string[] = [];
        (formData.triggerExamples || []).forEach(ex => {
            vars.push(...extractVariables(ex));
        });
        return [...new Set(vars)];
    }, [formData.triggerExamples]);

    // Find which detected variables are missing from parameters
    const existingParamNames = new Set(formData.parameters.map(p => p.name));
    const missingVariables = detectedVariables.filter(v => !existingParamNames.has(v));

    // Auto-add detected variables on mount if no parameters exist
    useEffect(() => {
        if (formData.parameters.length === 0 && detectedVariables.length > 0) {
            const newParams: ToolParameter[] = detectedVariables.map(name => ({
                name,
                type: 'string',
                description: `The ${name.replace(/_/g, ' ')} extracted from the user's message`,
                required: true,
            }));
            updateField('parameters', newParams);
        }
    }, []); // Only on mount

    const addMissingVariables = () => {
        const newParams: ToolParameter[] = missingVariables.map(name => ({
            name,
            type: 'string',
            description: `The ${name.replace(/_/g, ' ')} extracted from the user's message`,
            required: true,
        }));
        updateField('parameters', [...formData.parameters, ...newParams]);
    };

    const addParameter = () => {
        const newParam: ToolParameter = {
            name: '',
            type: 'string',
            description: '',
            required: false,
        };
        updateField('parameters', [...formData.parameters, newParam]);
    };

    const updateParameter = (index: number, field: string, value: any) => {
        const updated = [...formData.parameters];
        updated[index] = { ...updated[index], [field]: value };
        updateField('parameters', updated);
    };

    const removeParameter = (index: number) => {
        const updated = formData.parameters.filter((_, i) => i !== index);
        updateField('parameters', updated);
    };

    // Validation - parameters are optional
    const isValid = () => {
        if (formData.parameters.length === 0) return true;
        return formData.parameters.every(p => p.name && p.type);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">What info do you need?</h2>
                <p className="text-muted-foreground">
                    Configure the data your bot will extract from user messages
                </p>
            </div>

            {/* Auto-detected prompt */}
            {missingVariables.length > 0 && (
                <div className="flex items-center justify-between p-4 rounded-lg border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20 border">
                    <div className="flex items-start gap-3">
                        <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <span className="font-medium text-green-800 dark:text-green-200">
                                {missingVariables.length} variable{missingVariables.length !== 1 ? 's' : ''} detected
                            </span>
                            <span className="text-green-700 dark:text-green-300 ml-2">
                                from triggers: {missingVariables.map(v => `{{${v}}}`).join(', ')}
                            </span>
                        </div>
                    </div>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={addMissingVariables}
                        className="ml-4 border-green-300 text-green-700 hover:bg-green-100 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900"
                    >
                        <Plus className="h-4 w-4 mr-1" />
                        Add All
                    </Button>
                </div>
            )}

            {/* Parameter Cards */}
            <div className="space-y-3">
                {formData.parameters.map((param, index) => (
                    <Card key={index} className="relative">
                        <CardContent className="pt-4 pb-4">
                            <div className="flex items-start gap-4">
                                {/* Variable indicator */}
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-mono text-sm">
                                    {`{{}}`}
                                </div>

                                {/* Fields */}
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3">
                                    {/* Name */}
                                    <div className="space-y-1">
                                        <Label className="text-xs text-muted-foreground">Variable</Label>
                                        <Input
                                            value={param.name}
                                            onChange={(e) =>
                                                updateParameter(index, 'name', e.target.value.toLowerCase().replace(/\s+/g, '_'))
                                            }
                                            placeholder="product_id"
                                            className="font-mono text-sm h-9"
                                        />
                                    </div>

                                    {/* Type */}
                                    <div className="space-y-1">
                                        <Label className="text-xs text-muted-foreground">Type</Label>
                                        <Select
                                            value={param.type}
                                            onValueChange={(value) => updateParameter(index, 'type', value)}
                                        >
                                            <SelectTrigger className="h-9">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="string">String</SelectItem>
                                                <SelectItem value="number">Number</SelectItem>
                                                <SelectItem value="integer">Integer</SelectItem>
                                                <SelectItem value="boolean">Boolean</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Description */}
                                    <div className="md:col-span-2 space-y-1">
                                        <Label className="text-xs text-muted-foreground">Description (for AI)</Label>
                                        <Input
                                            value={param.description}
                                            onChange={(e) => updateParameter(index, 'description', e.target.value)}
                                            placeholder="What this variable represents..."
                                            className="h-9"
                                        />
                                    </div>
                                </div>

                                {/* Required toggle & Delete */}
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`required-${index}`}
                                            checked={param.required}
                                            onCheckedChange={(checked) =>
                                                updateParameter(index, 'required', checked as boolean)
                                            }
                                        />
                                        <Label htmlFor={`required-${index}`} className="text-xs">Required</Label>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                        onClick={() => removeParameter(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Empty state */}
            {formData.parameters.length === 0 && missingVariables.length === 0 && (
                <div className="text-center py-10 border-2 border-dashed rounded-lg bg-muted/50">
                    <Info className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground mb-2">No variables detected</p>
                    <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                        If your API needs dynamic values, add them here. Otherwise, skip to the next step.
                    </p>
                    <Button variant="outline" onClick={addParameter}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Variable Manually
                    </Button>
                </div>
            )}

            {/* Add more button */}
            {formData.parameters.length > 0 && (
                <Button variant="outline" onClick={addParameter} className="w-full border-dashed">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another Variable
                </Button>
            )}

            {/* Buttons */}
            <div className="flex justify-between">
                <Button variant="outline" onClick={onBack}>
                    ← Back
                </Button>
                <Button onClick={onNext} disabled={!isValid()}>
                    {formData.parameters.length === 0 ? 'Skip to API →' : 'Next: API Config →'}
                </Button>
            </div>
        </div>
    );
};
