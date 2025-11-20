import React, { useState } from 'react';
import { CustomAction } from '@/types/customActions';
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Plus, X } from 'lucide-react';

interface Props {
    formData: CustomAction;
    updateField: (path: string, value: any) => void;
    onNext: () => void;
    onBack: () => void;
}

export const APIConfigStep: React.FC<Props> = ({
    formData,
    updateField,
    onNext,
    onBack,
}) => {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const config = formData.apiConfig;

    const isValid = () => {
        try {
            if (!config.baseUrl || !config.endpoint || !config.method) return false;
            new URL(config.baseUrl);
            return true;
        } catch {
            return false;
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">API Configuration</h2>
                <p className="text-muted-foreground">Configure how to call your external API.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Endpoint Details</CardTitle>
                    <CardDescription>
                        Define the HTTP method and URL for your action.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Method & Base URL */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label>HTTP Method <span className="text-destructive">*</span></Label>
                            <Select
                                value={config.method}
                                onValueChange={(value) => updateField('apiConfig.method', value)}
                            >
                                <SelectTrigger>
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
                        </div>

                        <div className="md:col-span-3 space-y-2">
                            <Label htmlFor="base_url">
                                Base URL <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="base_url"
                                type="url"
                                value={config.baseUrl}
                                onChange={(e) => updateField('apiConfig.baseUrl', e.target.value)}
                                placeholder="https://api.example.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Endpoint */}
                    <div className="space-y-2">
                        <Label htmlFor="endpoint">
                            Endpoint Path <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="endpoint"
                            value={config.endpoint}
                            onChange={(e) => updateField('apiConfig.endpoint', e.target.value)}
                            placeholder="/v1/products/{{product_id}}"
                            required
                        />
                        <p className="text-xs text-muted-foreground">
                            Use <code>{`{{variable_name}}`}</code> for dynamic values that will come from parameters.
                        </p>
                    </div>

                    {/* Full URL Preview */}
                    <div className="rounded-md bg-muted p-3 text-sm font-mono break-all">
                        <span className="font-semibold text-primary">{config.method}</span>{' '}
                        {config.baseUrl}{config.endpoint}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Authentication & Headers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Authentication */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="auth_type">Auth Type</Label>
                            <Select
                                value={config.authType}
                                onValueChange={(value) => updateField('apiConfig.authType', value)}
                            >
                                <SelectTrigger>
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
                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="auth_value">
                                    {config.authType === 'bearer' && 'Bearer Token'}
                                    {config.authType === 'api_key' && 'API Key'}
                                    {config.authType === 'basic' && 'Base64 Encoded Credentials'}
                                </Label>
                                <Input
                                    id="auth_value"
                                    type="password"
                                    value={config.authValue || ''}
                                    onChange={(e) => updateField('apiConfig.authValue', e.target.value)}
                                    placeholder="Enter your token/key"
                                />
                            </div>
                        )}
                    </div>

                    {/* Headers */}
                    <div className="space-y-2">
                        <Label>Custom Headers</Label>
                        <KeyValueEditor
                            value={config.headers || {}}
                            onChange={(headers) => updateField('apiConfig.headers', headers)}
                            placeholder={{ key: 'Header-Name', value: 'Header-Value' }}
                        />
                    </div>

                    {/* Request Body */}
                    {['POST', 'PUT', 'PATCH'].includes(config.method) && (
                        <div className="space-y-2">
                            <Label htmlFor="body_template">Request Body Template</Label>
                            <Textarea
                                id="body_template"
                                value={config.bodyTemplate || ''}
                                onChange={(e) => updateField('apiConfig.bodyTemplate', e.target.value)}
                                placeholder='{"product_id": "{{product_id}}", "quantity": {{quantity}}}'
                                rows={4}
                                className="font-mono"
                            />
                            <p className="text-xs text-muted-foreground">
                                JSON body template. Use <code>{`{{variable}}`}</code> for dynamic values.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Advanced Options */}
            <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 w-full justify-start">
                        {showAdvanced ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        Advanced Options
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 pt-4">
                    <Card>
                        <CardContent className="space-y-6 pt-6">
                            {/* Query Params */}
                            <div className="space-y-2">
                                <Label>Query Parameters</Label>
                                <KeyValueEditor
                                    value={config.queryParams || {}}
                                    onChange={(params) => updateField('apiConfig.queryParams', params)}
                                    placeholder={{ key: 'param_name', value: 'param_value' }}
                                />
                            </div>

                            {/* Response Mapping */}
                            <div className="space-y-2">
                                <Label htmlFor="response_mapping">Response Mapping (JSONPath)</Label>
                                <Input
                                    id="response_mapping"
                                    value={config.responseMapping || ''}
                                    onChange={(e) => updateField('apiConfig.responseMapping', e.target.value)}
                                    placeholder="$.data.products[0].price"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Extract specific data from response. Leave empty to return full response.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Success Codes */}
                                <div className="space-y-2">
                                    <Label htmlFor="success_codes">Success HTTP Codes</Label>
                                    <Input
                                        id="success_codes"
                                        value={(config.successCodes || []).join(', ')}
                                        onChange={(e) =>
                                            updateField(
                                                'apiConfig.successCodes',
                                                e.target.value.split(',').map((s) => parseInt(s.trim()) || 0).filter(n => n > 0)
                                            )
                                        }
                                        placeholder="200, 201"
                                    />
                                </div>

                                {/* Timeout */}
                                <div className="space-y-2">
                                    <Label htmlFor="timeout">Timeout (seconds)</Label>
                                    <Input
                                        id="timeout"
                                        type="number"
                                        value={config.timeoutSeconds}
                                        onChange={(e) =>
                                            updateField('apiConfig.timeoutSeconds', parseInt(e.target.value))
                                        }
                                        min="1"
                                        max="300"
                                    />
                                </div>

                                {/* Retry Count */}
                                <div className="space-y-2">
                                    <Label htmlFor="retry_count">Retry Count</Label>
                                    <Input
                                        id="retry_count"
                                        type="number"
                                        value={config.retryCount}
                                        onChange={(e) =>
                                            updateField('apiConfig.retryCount', parseInt(e.target.value))
                                        }
                                        min="0"
                                        max="5"
                                    />
                                </div>
                            </div>

                            {/* SSL Verification */}
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="verify_ssl"
                                    checked={config.verifySsl}
                                    onCheckedChange={(checked) =>
                                        updateField('apiConfig.verifySsl', checked as boolean)
                                    }
                                />
                                <Label htmlFor="verify_ssl">Verify SSL Certificate</Label>
                            </div>
                        </CardContent>
                    </Card>
                </CollapsibleContent>
            </Collapsible>

            {/* Buttons */}
            <div className="flex justify-between">
                <Button variant="outline" onClick={onBack}>
                    ← Back
                </Button>
                <Button onClick={onNext} disabled={!isValid()}>
                    Next: Parameters →
                </Button>
            </div>
        </div>
    );
};

// Key-Value Editor Component
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
                        className="flex-1"
                    />
                    <Input
                        value={val}
                        onChange={(e) => updatePair(index, key, e.target.value)}
                        placeholder={placeholder.value}
                        className="flex-1"
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removePair(index)}
                        className="h-10 w-10"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addPair} className="mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Add {pairs.length === 0 ? 'Header' : 'Another'}
            </Button>
        </div>
    );
};
