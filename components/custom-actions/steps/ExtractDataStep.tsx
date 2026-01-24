import React, { useMemo, useEffect, useRef } from 'react';
import { CustomAction, ToolParameter } from '@/types/customActions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Trash2, Plus, Sparkles, Database } from 'lucide-react';

interface Props {
    formData: CustomAction;
    updateField: (path: string, value: any) => void;
}

/**
 * Extract {{variable}} patterns from a string
 */
function extractVariables(str: string): string[] {
    const matches = str.match(/\{\{([^}]+)\}\}/g) || [];
    return matches.map(m => m.replace(/\{\{|\}\}/g, '').trim());
}

export const DataExtractionSection: React.FC<Props> = ({
    formData,
    updateField,
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
    const didAutoAddRef = useRef(false);
    useEffect(() => {
        if (didAutoAddRef.current) return;
        if (formData.parameters.length === 0 && detectedVariables.length > 0) {
            didAutoAddRef.current = true;
            const newParams: ToolParameter[] = detectedVariables.map(name => ({
                name,
                type: 'string',
                description: `The ${name.replace(/_/g, ' ')} extracted from the user's message`,
                required: true,
                location: 'query',
                key: name,
            }));
            updateField('parameters', newParams);
        }
    }, [detectedVariables, formData.parameters.length, updateField]);

    const addMissingVariables = () => {
        const newParams: ToolParameter[] = missingVariables.map(name => ({
            name,
            type: 'string',
            description: `The ${name.replace(/_/g, ' ')} extracted from the user's message`,
            required: true,
            location: 'query',
            key: name,
        }));
        updateField('parameters', [...formData.parameters, ...newParams]);
    };

    const addParameter = () => {
        const newParam: ToolParameter = {
            name: '',
            type: 'string',
            description: '',
            required: false,
            location: 'query',
            key: '',
        };
        updateField('parameters', [...formData.parameters, newParam]);
    };

    const updateParameter = (index: number, field: string, value: any) => {
        const updated = [...formData.parameters];
        updated[index] = { ...updated[index], [field]: value };
        // This step doesn't expose `key`, so keep query/header keys in sync with name edits.
        if (field === 'name') {
            const nextName = (value ?? '').toString();
            if (updated[index].location === 'query' || updated[index].location === 'header') {
                updated[index].key = nextName;
            }
        }
        updateField('parameters', updated);
    };

    const removeParameter = (index: number) => {
        const updated = formData.parameters.filter((_, i) => i !== index);
        updateField('parameters', updated);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Database className="h-4 w-4 text-primary" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold">Data Extraction</h3>
                    <p className="text-xs text-muted-foreground">
                        What info should be extracted from user messages?
                    </p>
                </div>
            </div>

            <div className="space-y-3 pl-10">
                {/* Auto-detected prompt */}
                {missingVariables.length > 0 && (
                    <div className="flex items-center justify-between p-2.5 rounded-md border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20 border text-xs">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-3.5 w-3.5 text-green-600 dark:text-green-400 flex-shrink-0" />
                            <span className="text-green-800 dark:text-green-200">
                                {missingVariables.length} variable{missingVariables.length !== 1 ? 's' : ''} detected: {missingVariables.map(v => `{{${v}}}`).join(', ')}
                            </span>
                        </div>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={addMissingVariables}
                            className="h-7 text-xs border-green-300 text-green-700 hover:bg-green-100 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900"
                        >
                            <Plus className="h-3 w-3 mr-1" />
                            Add
                        </Button>
                    </div>
                )}

                {/* Parameter rows */}
                <div className="space-y-2">
                    {formData.parameters.map((param, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                            {/* Name */}
                            <Input
                                value={param.name}
                                onChange={(e) =>
                                    updateParameter(index, 'name', e.target.value.toLowerCase().replace(/\s+/g, '_'))
                                }
                                placeholder="variable_name"
                                className="w-32 font-mono text-xs h-8"
                            />

                            {/* Type */}
                            <Select
                                value={param.type}
                                onValueChange={(value) => updateParameter(index, 'type', value)}
                            >
                                <SelectTrigger className="w-24 h-8 text-xs">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="string">String</SelectItem>
                                    <SelectItem value="number">Number</SelectItem>
                                    <SelectItem value="integer">Integer</SelectItem>
                                    <SelectItem value="boolean">Boolean</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Description */}
                            <Input
                                value={param.description}
                                onChange={(e) => updateParameter(index, 'description', e.target.value)}
                                placeholder="Description for AI..."
                                className="flex-1 h-8 text-xs"
                            />

                            {/* Required toggle */}
                            <div className="flex items-center gap-1.5">
                                <Checkbox
                                    id={`required-${index}`}
                                    checked={param.required}
                                    onCheckedChange={(checked) =>
                                        updateParameter(index, 'required', checked as boolean)
                                    }
                                />
                                <Label htmlFor={`required-${index}`} className="text-xs">Req</Label>
                            </div>

                            {/* Delete */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                onClick={() => removeParameter(index)}
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Add button */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={addParameter}
                    className="border-dashed text-xs h-8"
                >
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Add Variable
                </Button>

                {formData.parameters.length === 0 && missingVariables.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                        💡 Variables will be auto-detected from your API URL or you can add them manually
                    </p>
                )}
            </div>
        </div>
    );
};

// Keep backward compatibility
export const ExtractDataStep = DataExtractionSection;
