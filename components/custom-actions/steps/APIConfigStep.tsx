import React, { useState, useMemo } from 'react';
import { CustomAction } from '@/types/customActions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Plus, X, Sparkles, Globe } from 'lucide-react';

interface Props {
    formData: CustomAction;
    updateField: (path: string, value: any) => void;
    onNext?: () => void;
    onBack?: () => void;
}

/**
 * Extract {{variable}} patterns from a string
 */
function extractVariables(str: string): string[] {
    const matches = str.match(/\{\{([^}]+)\}\}/g) || [];
    return matches.map(m => m.replace(/\{\{|\}\}/g, '').trim());
}

export const APIConfigSection: React.FC<Props> = ({
    formData,
    updateField,
    onNext,
    onBack,
}) => {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const config = formData.apiConfig;

    // Combine baseUrl and endpoint for the unified URL input
    const fullUrl = `${config.baseUrl}${config.endpoint}`;

    // Parse full URL back into base and endpoint
    const handleFullUrlChange = (value: string) => {
        try {
            const urlObj = new URL(value);
            updateField('apiConfig.baseUrl', urlObj.origin);
            updateField('apiConfig.endpoint', urlObj.pathname + urlObj.search);
        } catch {
            // If not a valid URL, just update the endpoint
            if (value.startsWith('/')) {
                updateField('apiConfig.endpoint', value);
            } else if (value.includes('://')) {
                // Partial URL, try to extract what we can
                const match = value.match(/^(https?:\/\/[^\/]+)(.*)/);
                if (match) {
                    updateField('apiConfig.baseUrl', match[1]);
                    updateField('apiConfig.endpoint', match[2] || '/');
                }
            }
        }
    };

    // Detect variables from URL and body
    const detectedVariables = useMemo(() => {
        const vars: string[] = [];
        if (config.endpoint) {
            vars.push(...extractVariables(config.endpoint));
        }
        if (config.bodyTemplate) {
            vars.push(...extractVariables(config.bodyTemplate));
        }
        return [...new Set(vars)];
    }, [config.endpoint, config.bodyTemplate]);

    const headerCount = Object.keys(config.headers || {}).length;

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Globe className="h-4 w-4 text-primary" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold">API Configuration</h3>
                    <p className="text-xs text-muted-foreground">
                        How should we call your external API?
                    </p>
                </div>
            </div>

            <div className="space-y-4 pl-10">
                {/* Endpoint */}
                <div className="space-y-2">
                    <Label className="text-xs">Endpoint</Label>
                    <div className="flex gap-2">
                        <Select
                            value={config.method}
                            onValueChange={(value) => updateField('apiConfig.method', value)}
                        >
                            <SelectTrigger className="w-24 h-9 text-xs">
                                <SelectValue placeholder="Method" />
                            </SelectTrigger>
                            <SelectContent>
                                {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map((method) => (
                                    <SelectItem key={method} value={method}>
                                        {method}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Input
                            value={fullUrl}
                            onChange={(e) => handleFullUrlChange(e.target.value)}
                            placeholder="https://api.example.com/v1/products/{{product_id}}"
                            className="flex-1 font-mono text-xs h-9"
                        />
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Use <code className="px-1 py-0.5 rounded bg-muted text-2xs">{'{{variable}}'}</code> for dynamic values
                    </p>
                </div>

                {/* Detected Variables */}
                {detectedVariables.length > 0 && (
                    <div className="flex items-center gap-2 p-2 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-xs">
                        <Sparkles className="h-3.5 w-3.5 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <span className="text-green-800 dark:text-green-200">
                            Detected: {detectedVariables.map(v => `{{${v}}}`).join(', ')}
                        </span>
                    </div>
                )}

                {/* Authentication */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1.5">
                        <Label className="text-xs">Auth Type</Label>
                        <Select
                            value={config.authType}
                            onValueChange={(value) => updateField('apiConfig.authType', value)}
                        >
                            <SelectTrigger className="h-9 text-xs">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="bearer">Bearer Token</SelectItem>
                                <SelectItem value="api_key">API Key</SelectItem>
                                <SelectItem value="basic">Basic Auth</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {config.authType !== 'none' && (
                        <div className="col-span-2 space-y-1.5">
                            <Label className="text-xs">
                                {config.authType === 'bearer' && 'Bearer Token'}
                                {config.authType === 'api_key' && 'API Key'}
                                {config.authType === 'basic' && 'Base64 Credentials'}
                            </Label>
                            <Input
                                type="password"
                                value={config.authValue || ''}
                                onChange={(e) => updateField('apiConfig.authValue', e.target.value)}
                                placeholder="Enter your token/key"
                                className="h-9 text-xs"
                            />
                        </div>
                    )}
                </div>

                {/* Headers */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label className="text-xs">Custom Headers</Label>
                        {headerCount > 0 && (
                            <Badge variant="secondary" className="text-2xs h-5">
                                {headerCount}
                            </Badge>
                        )}
                    </div>
                    <HeaderEditor
                        value={config.headers || {}}
                        onChange={(headers) => updateField('apiConfig.headers', headers)}
                    />
                </div>

                {/* Request Body */}
                {['POST', 'PUT', 'PATCH'].includes(config.method) && (
                    <div className="space-y-1.5">
                        <Label className="text-xs">Request Body (JSON)</Label>
                        <Textarea
                            value={config.bodyTemplate || ''}
                            onChange={(e) => updateField('apiConfig.bodyTemplate', e.target.value)}
                            placeholder='{"product_id": "{{product_id}}", "quantity": {{quantity}}}'
                            rows={3}
                            className="font-mono text-xs"
                        />
                    </div>
                )}

                {/* Advanced Options */}
                <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground h-7 px-2">
                            {showAdvanced ? <ChevronDown className="h-3 w-3 mr-1" /> : <ChevronRight className="h-3 w-3 mr-1" />}
                            Advanced Options
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-3 pt-3">
                        {/* Query Params */}
                        <div className="space-y-1.5">
                            <Label className="text-xs">Query Parameters</Label>
                            <KeyValueEditor
                                value={config.queryParams || {}}
                                onChange={(params) => updateField('apiConfig.queryParams', params)}
                                placeholder={{ key: 'param', value: 'value' }}
                            />
                        </div>

                        {/* Response Mapping */}
                        <div className="space-y-1.5">
                            <Label className="text-xs">Response Mapping (JSONPath)</Label>
                            <Input
                                value={config.responseMapping || ''}
                                onChange={(e) => updateField('apiConfig.responseMapping', e.target.value)}
                                placeholder="$.data.products[0].price"
                                className="h-8 text-xs font-mono"
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <div className="space-y-1.5">
                                <Label className="text-xs">Success Codes</Label>
                                <Input
                                    value={(config.successCodes || []).join(', ')}
                                    onChange={(e) =>
                                        updateField(
                                            'apiConfig.successCodes',
                                            e.target.value.split(',').map((s) => parseInt(s.trim()) || 0).filter(n => n > 0)
                                        )
                                    }
                                    placeholder="200, 201"
                                    className="h-8 text-xs"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs">Timeout (sec)</Label>
                                <Input
                                    type="number"
                                    value={config.timeoutSeconds}
                                    onChange={(e) => updateField('apiConfig.timeoutSeconds', parseInt(e.target.value))}
                                    min="1"
                                    max="300"
                                    className="h-8 text-xs"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs">Retry Count</Label>
                                <Input
                                    type="number"
                                    value={config.retryCount}
                                    onChange={(e) => updateField('apiConfig.retryCount', parseInt(e.target.value))}
                                    min="0"
                                    max="5"
                                    className="h-8 text-xs"
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="verify_ssl"
                                checked={config.verifySsl}
                                onCheckedChange={(checked) =>
                                    updateField('apiConfig.verifySsl', checked as boolean)
                                }
                            />
                            <Label htmlFor="verify_ssl" className="text-xs">Verify SSL Certificate</Label>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>

            {/* Navigation Buttons - only show if onNext/onBack provided */}
            {(onNext || onBack) && (
                <div className="flex justify-between pt-6">
                    {onBack ? (
                        <Button variant="outline" onClick={onBack}>
                            ← Back
                        </Button>
                    ) : <div />}

                    {onNext && (
                        <Button onClick={onNext} disabled={!config.baseUrl}>
                            Next: Inputs →
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};

// Header Editor Component
const HeaderEditor: React.FC<{
    value: Record<string, string>;
    onChange: (value: Record<string, string>) => void;
}> = ({ value, onChange }) => {
    const pairs = Object.entries(value);

    const addPair = () => {
        onChange({ ...value, '': '' });
    };

    const updatePair = (index: number, key: string, val: string) => {
        const newPairs = [...pairs];
        newPairs[index] = [key, val];
        onChange(Object.fromEntries(newPairs));
    };

    const removePair = (index: number) => {
        const newPairs = pairs.filter((_, i) => i !== index);
        onChange(Object.fromEntries(newPairs));
    };

    if (pairs.length === 0) {
        return (
            <Button type="button" variant="outline" size="sm" onClick={addPair} className="border-dashed text-xs h-8">
                <Plus className="h-3 w-3 mr-1" />
                Add Header
            </Button>
        );
    }

    return (
        <div className="space-y-2">
            {pairs.map(([key, val], index) => (
                <div key={index} className="flex gap-2 items-center">
                    <Input
                        value={key}
                        onChange={(e) => updatePair(index, e.target.value, val)}
                        placeholder="Header-Name"
                        className="w-36 font-mono text-xs h-8"
                    />
                    <Input
                        value={val}
                        onChange={(e) => updatePair(index, key, e.target.value)}
                        placeholder="Header-Value"
                        className="flex-1 font-mono text-xs h-8"
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removePair(index)}
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addPair} className="border-dashed text-xs h-7">
                <Plus className="h-3 w-3 mr-1" />
                Add
            </Button>
        </div>
    );
};

// Key-Value Editor (for query params)
const KeyValueEditor: React.FC<{
    value: Record<string, string>;
    onChange: (value: Record<string, string>) => void;
    placeholder: { key: string; value: string };
}> = ({ value, onChange, placeholder }) => {
    const pairs = Object.entries(value);

    const addPair = () => {
        onChange({ ...value, '': '' });
    };

    const updatePair = (index: number, key: string, val: string) => {
        const newPairs = [...pairs];
        newPairs[index] = [key, val];
        onChange(Object.fromEntries(newPairs));
    };

    const removePair = (index: number) => {
        const newPairs = pairs.filter((_, i) => i !== index);
        onChange(Object.fromEntries(newPairs));
    };

    return (
        <div className="space-y-2">
            {pairs.map(([key, val], index) => (
                <div key={index} className="flex gap-2">
                    <Input
                        value={key}
                        onChange={(e) => updatePair(index, e.target.value, val)}
                        placeholder={placeholder.key}
                        className="flex-1 text-xs h-8"
                    />
                    <Input
                        value={val}
                        onChange={(e) => updatePair(index, key, e.target.value)}
                        placeholder={placeholder.value}
                        className="flex-1 text-xs h-8"
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removePair(index)}
                        className="h-7 w-7"
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addPair} className="border-dashed text-xs h-7">
                <Plus className="h-3 w-3 mr-1" />
                Add {pairs.length === 0 ? 'Parameter' : ''}
            </Button>
        </div>
    );
};

// Keep backward compatibility
export const APIConfigStep = APIConfigSection;
