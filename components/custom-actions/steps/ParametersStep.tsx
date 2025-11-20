import React from 'react';
import { CustomAction, ToolParameter } from '@/types/customActions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Trash2, Plus, ChevronDown, ChevronRight } from 'lucide-react';

interface Props {
    formData: CustomAction;
    updateField: (path: string, value: any) => void;
    onNext: () => void;
    onBack: () => void;
}

export const ParametersStep: React.FC<Props> = ({
    formData,
    updateField,
    onNext,
    onBack,
}) => {
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

    const isValid = () => {
        return (
            formData.parameters.length > 0 &&
            formData.parameters.every(
                (p) => p.name && p.type && p.description.length >= 10
            )
        );
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Parameters</h2>
                <p className="text-muted-foreground">
                    Define what information the AI needs to provide when calling this action.
                </p>
            </div>

            {formData.parameters.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/50">
                    <p className="text-muted-foreground mb-4">No parameters defined yet.</p>
                    <Button onClick={addParameter}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add First Parameter
                    </Button>
                </div>
            )}

            <div className="space-y-4">
                {formData.parameters.map((param, index) => (
                    <Card key={index} className="relative">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-2 text-muted-foreground hover:text-destructive"
                            onClick={() => removeParameter(index)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>

                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg">Parameter {index + 1}</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Name */}
                                <div className="space-y-2">
                                    <Label>Name <span className="text-destructive">*</span></Label>
                                    <Input
                                        value={param.name}
                                        onChange={(e) =>
                                            updateParameter(index, 'name', e.target.value.toLowerCase())
                                        }
                                        placeholder="product_id"
                                        pattern="^[a-z0-9_]+$"
                                        required
                                    />
                                </div>

                                {/* Type */}
                                <div className="space-y-2">
                                    <Label>Type <span className="text-destructive">*</span></Label>
                                    <Select
                                        value={param.type}
                                        onValueChange={(value) => updateParameter(index, 'type', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="string">String</SelectItem>
                                            <SelectItem value="number">Number</SelectItem>
                                            <SelectItem value="integer">Integer</SelectItem>
                                            <SelectItem value="boolean">Boolean</SelectItem>
                                            <SelectItem value="array">Array</SelectItem>
                                            <SelectItem value="object">Object</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label>Description <span className="text-destructive">*</span></Label>
                                <Textarea
                                    value={param.description}
                                    onChange={(e) =>
                                        updateParameter(index, 'description', e.target.value)
                                    }
                                    placeholder="Describe what this parameter is for. The AI uses this to understand what value to provide."
                                    rows={2}
                                    required
                                    minLength={10}
                                />
                                <p className="text-xs text-muted-foreground text-right">
                                    {param.description.length} / 500
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-6">
                                {/* Required */}
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`required-${index}`}
                                        checked={param.required}
                                        onCheckedChange={(checked) =>
                                            updateParameter(index, 'required', checked as boolean)
                                        }
                                    />
                                    <Label htmlFor={`required-${index}`}>Required</Label>
                                </div>

                                {/* Default Value */}
                                <div className="flex-1 min-w-[200px]">
                                    <Input
                                        value={param.default || ''}
                                        onChange={(e) =>
                                            updateParameter(index, 'default', e.target.value)
                                        }
                                        placeholder="Default Value (Optional)"
                                    />
                                </div>
                            </div>

                            {/* Advanced Validation */}
                            <Collapsible>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm" className="p-0 h-auto font-normal text-muted-foreground hover:text-foreground">
                                        <ChevronRight className="h-4 w-4 mr-1" />
                                        Advanced Validation
                                    </Button>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="pt-4 space-y-4">
                                    {/* Enum */}
                                    {param.type === 'string' && (
                                        <div className="space-y-2">
                                            <Label>Allowed Values (comma-separated)</Label>
                                            <Input
                                                value={param.enum?.join(', ') || ''}
                                                onChange={(e) =>
                                                    updateParameter(
                                                        index,
                                                        'enum',
                                                        e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                                                    )
                                                }
                                                placeholder="USD, EUR, GBP"
                                            />
                                        </div>
                                    )}

                                    {/* Pattern */}
                                    {param.type === 'string' && (
                                        <div className="space-y-2">
                                            <Label>Pattern (Regex)</Label>
                                            <Input
                                                value={param.pattern || ''}
                                                onChange={(e) => updateParameter(index, 'pattern', e.target.value)}
                                                placeholder="^[A-Z0-9-]+$"
                                            />
                                        </div>
                                    )}

                                    {/* Min/Max */}
                                    {(param.type === 'number' || param.type === 'integer') && (
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Minimum</Label>
                                                <Input
                                                    type="number"
                                                    value={param.minimum ?? ''}
                                                    onChange={(e) =>
                                                        updateParameter(index, 'minimum', parseFloat(e.target.value))
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Maximum</Label>
                                                <Input
                                                    type="number"
                                                    value={param.maximum ?? ''}
                                                    onChange={(e) =>
                                                        updateParameter(index, 'maximum', parseFloat(e.target.value))
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )}
                                </CollapsibleContent>
                            </Collapsible>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {formData.parameters.length > 0 && (
                <Button variant="outline" onClick={addParameter} className="w-full border-dashed">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another Parameter
                </Button>
            )}

            {/* Usage Preview */}
            {formData.parameters.length > 0 && (
                <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                        <h4 className="text-sm font-medium mb-2">📝 AI Usage Preview</h4>
                        <pre className="text-xs bg-background p-4 rounded-md overflow-auto">
                            {JSON.stringify(
                                formData.parameters.reduce(
                                    (acc, p) => ({
                                        ...acc,
                                        [p.name]: p.default || `<${p.type}>`,
                                    }),
                                    {}
                                ),
                                null,
                                2
                            )}
                        </pre>
                    </CardContent>
                </Card>
            )}

            <div className="flex justify-between">
                <Button variant="outline" onClick={onBack}>
                    ← Back
                </Button>
                <Button onClick={onNext} disabled={!isValid()}>
                    Next: Test & Save →
                </Button>
            </div>
        </div>
    );
};
