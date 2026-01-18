import React, { useMemo, useState } from 'react';
import { CustomAction, CustomActionConfig } from '@/types/customActions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Plus, X, Sparkles, Terminal } from 'lucide-react';
import { CurlImportDialog } from '../CurlImportDialog';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';

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
    const queryParamCount = Object.keys(config.queryParams || {}).length;

    const handleCurlImport = (imported: Partial<CustomActionConfig>) => {
        updateField('apiConfig', {
            ...config,
            ...imported,
            // Ensure nested objects stay objects after merge
            headers: imported.headers ?? config.headers ?? {},
            queryParams: imported.queryParams ?? config.queryParams ?? {},
        });
    };

    const handleAddVariable = () => {
        const raw = window.prompt('Variable name (example: user_id)');
        const name = (raw || '').trim().replace(/\s+/g, '_');
        if (!name) return;

        const token = `{{${name}}}`;
        const cur = fullUrl || '';
        const qIndex = cur.indexOf('?');
        const before = qIndex === -1 ? cur : cur.slice(0, qIndex);
        const after = qIndex === -1 ? '' : cur.slice(qIndex);

        const prefix = before.length === 0 || before.endsWith('/') ? before : `${before}/`;
        const nextUrl = `${prefix}${token}${after}`;
        handleFullUrlChange(nextUrl);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                    <h2 className="text-2xl font-bold tracking-tight">API request</h2>
                    <p className="text-muted-foreground">
                        The API endpoint that should be called by the AI Agent to retrieve data or to send updates.
                    </p>
                </div>
                <CurlImportDialog
                    onImport={(imported) => handleCurlImport(imported)}
                    trigger={
                        <Button type="button" variant="outline" className="h-10 gap-2 shrink-0">
                            <Terminal className="h-4 w-4" />
                            Import from cURL
                        </Button>
                    }
                />
            </div>

            {/* Method + URL */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">HTTPS URL</Label>
                    {detectedVariables.length > 0 && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>Detected: {detectedVariables.map(v => `{{${v}}}`).join(', ')}</span>
                        </div>
                    )}
                </div>

                <div className="flex gap-2 items-end">
                    <div className="w-28">
                        <Label className="text-xs text-muted-foreground">Method</Label>
                        <Select
                            value={config.method}
                            onValueChange={(value) => updateField('apiConfig.method', value)}
                        >
                            <SelectTrigger className="h-10">
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

                    <div className="flex-1">
                        <Label className="text-xs text-muted-foreground">HTTPS URL</Label>
                        <Input
                            value={fullUrl}
                            onChange={(e) => handleFullUrlChange(e.target.value)}
                            placeholder="https://api.example.com/v1/resource/{{id}}"
                            className="h-10 font-mono text-sm"
                        />
                    </div>

                    <Button type="button" variant="outline" className="h-10 shrink-0" onClick={handleAddVariable}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add variable
                    </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                    Use <code className="px-1 py-0.5 rounded bg-muted">{'{{variable}}'}</code> for dynamic values in the URL or body.
                </p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="parameters">
                <TabsList className="w-full justify-start">
                    <TabsTrigger value="parameters" className="gap-2">
                        Parameters
                        <Badge variant="secondary" className="h-5 px-2 text-xs">
                            {queryParamCount}
                        </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="headers" className="gap-2">
                        Headers
                        <Badge variant="secondary" className="h-5 px-2 text-xs">
                            {headerCount}
                        </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="body">Body</TabsTrigger>
                </TabsList>

                <TabsContent value="parameters" className="mt-4">
                    <div className="space-y-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full justify-start h-10"
                            onClick={() =>
                                updateField('apiConfig.queryParams', { ...(config.queryParams || {}), '': '' })
                            }
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add key value pair
                        </Button>
                        <KeyValueEditor
                            value={config.queryParams || {}}
                            onChange={(params) => updateField('apiConfig.queryParams', params)}
                            placeholder={{ key: 'key', value: 'value' }}
                            addLabel="Add key value pair"
                        />
                    </div>
                </TabsContent>

                <TabsContent value="headers" className="mt-4">
                    <div className="space-y-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full justify-start h-10"
                            onClick={() =>
                                updateField('apiConfig.headers', { ...(config.headers || {}), '': '' })
                            }
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add key value pair
                        </Button>
                        <HeaderEditor
                            value={config.headers || {}}
                            onChange={(headers) => updateField('apiConfig.headers', headers)}
                            addLabel="Add key value pair"
                        />
                    </div>
                </TabsContent>

                <TabsContent value="body" className="mt-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label>Body</Label>
                            {['POST', 'PUT', 'PATCH'].includes(config.method) && config.bodyTemplate && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 text-xs"
                                    onClick={() => {
                                        try {
                                            const parsed = JSON.parse(config.bodyTemplate);
                                            const formatted = JSON.stringify(parsed, null, 2);
                                            updateField('apiConfig.bodyTemplate', formatted);
                                        } catch (e) {
                                            // Not valid JSON, ignore
                                        }
                                    }}
                                >
                                    Format JSON
                                </Button>
                            )}
                        </div>
                        {['POST', 'PUT', 'PATCH'].includes(config.method) ? (
                            <div className="border rounded-lg overflow-hidden">
                                <CodeMirror
                                    value={config.bodyTemplate || ''}
                                    onChange={(value) => updateField('apiConfig.bodyTemplate', value)}
                                    extensions={[
                                        json(),
                                        EditorView.lineWrapping
                                    ]}
                                    placeholder='{\n  "key": "value",\n  "user_id": "{{user_id}}"\n}'
                                    minHeight="300px"
                                    maxHeight="500px"
                                    theme="light"
                                    basicSetup={{
                                        lineNumbers: true,
                                        foldGutter: true,
                                        highlightActiveLineGutter: true,
                                        highlightActiveLine: true,
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="text-sm text-muted-foreground">
                                Body is only sent for POST/PUT/PATCH requests.
                            </div>
                        )}
                    </div>
                </TabsContent>
            </Tabs>

            {/* Advanced Options */}
            <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                <CollapsibleTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-muted-foreground hover:text-foreground h-7 px-2"
                    >
                        {showAdvanced ? (
                            <ChevronDown className="h-3 w-3 mr-1" />
                        ) : (
                            <ChevronRight className="h-3 w-3 mr-1" />
                        )}
                        Advanced Options
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 pt-4">
                    {/* Authentication */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-2">
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
                            <div className="col-span-2 space-y-2">
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

                    <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-2">
                            <Label className="text-xs">Success Codes</Label>
                            <Input
                                value={(config.successCodes || []).join(', ')}
                                onChange={(e) =>
                                    updateField(
                                        'apiConfig.successCodes',
                                        e.target.value
                                            .split(',')
                                            .map((s) => parseInt(s.trim()) || 0)
                                            .filter((n) => n > 0)
                                    )
                                }
                                placeholder="200, 201"
                                className="h-8 text-xs"
                            />
                        </div>
                        <div className="space-y-2">
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
                        <div className="space-y-2">
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
                            onCheckedChange={(checked) => updateField('apiConfig.verifySsl', checked as boolean)}
                        />
                        <Label htmlFor="verify_ssl" className="text-xs">
                            Verify SSL Certificate
                        </Label>
                    </div>
                </CollapsibleContent>
            </Collapsible>

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
    addLabel?: string;
}> = ({ value, onChange, addLabel = 'Add Header' }) => {
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
                {addLabel}
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
                {addLabel}
            </Button>
        </div>
    );
};

// Key-Value Editor (for query params)
const KeyValueEditor: React.FC<{
    value: Record<string, string>;
    onChange: (value: Record<string, string>) => void;
    placeholder: { key: string; value: string };
    addLabel?: string;
}> = ({ value, onChange, placeholder, addLabel = 'Add key value pair' }) => {
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
                {addLabel}
            </Button>
        </div>
    );
};

// Keep backward compatibility
export const APIConfigStep = APIConfigSection;
