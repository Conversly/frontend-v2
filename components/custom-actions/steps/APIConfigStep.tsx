import React, { useEffect, useMemo, useState } from 'react';
import { CustomAction, CustomActionConfig } from '@/types/customActions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
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

function extractPathParams(endpoint: string): string[] {
    const found: string[] = [];
    const curly = endpoint.match(/\{([^}]+)\}/g) || [];
    for (const m of curly) {
        const name = m.replace(/[{}]/g, '').trim();
        if (name) found.push(name);
    }
    const colon = endpoint.match(/:([A-Za-z0-9_]+)/g) || [];
    for (const m of colon) {
        const name = m.slice(1).trim();
        if (name) found.push(name);
    }
    return [...new Set(found)];
}

function extractLegacyVariables(str: string): string[] {
    const matches = str.match(/\{\{([^}]+)\}\}/g) || [];
    return [...new Set(matches.map((m) => m.replace(/\{\{|\}\}/g, '').trim()).filter(Boolean))];
}

export const APIConfigSection: React.FC<Props> = ({
    formData,
    updateField,
    onNext,
    onBack,
}) => {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [staticBodyDraft, setStaticBodyDraft] = useState('');
    const [staticBodyError, setStaticBodyError] = useState<string | null>(null);
    const [isBodyDirty, setIsBodyDirty] = useState(false);
    const config = formData.apiConfig;

    // Combine baseUrl + endpoint + static query for the unified URL input
    const fullUrl = useMemo(() => {
        const qp = config.staticQueryParams ?? config.queryParams ?? {};
        const search = new URLSearchParams(
            Object.entries(qp).filter(([k]) => (k || '').trim().length > 0)
        ).toString();
        return `${config.baseUrl}${config.endpoint}${search ? `?${search}` : ''}`;
    }, [config.baseUrl, config.endpoint, config.queryParams, config.staticQueryParams]);

    // Parse full URL back into base and endpoint
    const handleFullUrlChange = (value: string) => {
        try {
            const urlObj = new URL(value);
            const qp: Record<string, string> = {};
            urlObj.searchParams.forEach((v, k) => {
                qp[k] = v;
            });
            updateField('apiConfig', {
                ...config,
                baseUrl: urlObj.origin,
                endpoint: urlObj.pathname,
                staticQueryParams: qp,
                // legacy mirror for backend compatibility
                queryParams: qp,
            });
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

    const staticHeaders = config.staticHeaders ?? config.headers ?? {};
    const staticQueryParams = config.staticQueryParams ?? config.queryParams ?? {};
    const headerCount = Object.keys(staticHeaders).length;
    const queryParamCount = Object.keys(staticQueryParams).length;

    const detectedPathParams = useMemo(() => extractPathParams(config.endpoint || ''), [config.endpoint]);
    const legacyEndpointVars = useMemo(() => extractLegacyVariables(config.endpoint || ''), [config.endpoint]);

    // Keep the static body editor in sync with config changes.
    useEffect(() => {
        // While the user is typing, don't clobber their draft (especially mid-edit when JSON is invalid).
        if (isBodyDirty) return;

        // If we have a bodyTemplate but it isn't valid JSON, prefer showing that draft (so we don't "revert").
        const bodyTemplate = config.bodyTemplate || '';
        if (bodyTemplate.trim().length > 0) {
            try {
                JSON.parse(bodyTemplate);
            } catch {
                setStaticBodyDraft(bodyTemplate);
                setStaticBodyError('Invalid JSON');
                return;
            }
        }

        const next =
            config.staticBody !== undefined
                ? JSON.stringify(config.staticBody, null, 2)
                : bodyTemplate;
        setStaticBodyDraft(next);
        setStaticBodyError(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.id, config.staticBody, config.bodyTemplate, config.method, isBodyDirty]);

    const handleCurlImport = (imported: Partial<CustomActionConfig>) => {
        const nextStaticHeaders = imported.staticHeaders ?? imported.headers ?? staticHeaders;
        const nextStaticQueryParams = imported.staticQueryParams ?? imported.queryParams ?? staticQueryParams;

        let nextStaticBody: any = imported.staticBody ?? config.staticBody;
        const legacyBodyTemplate = imported.bodyTemplate ?? config.bodyTemplate;
        if (nextStaticBody === undefined && legacyBodyTemplate) {
            try {
                nextStaticBody = JSON.parse(legacyBodyTemplate);
            } catch {
                // keep undefined; legacy template can still be used in expert mode
            }
        }

        updateField('apiConfig', {
            ...config,
            ...imported,
            staticHeaders: nextStaticHeaders,
            staticQueryParams: nextStaticQueryParams,
            staticBody: nextStaticBody,
            // legacy mirrors for backend compatibility
            headers: nextStaticHeaders,
            queryParams: nextStaticQueryParams,
            bodyTemplate: nextStaticBody !== undefined ? JSON.stringify(nextStaticBody, null, 2) : legacyBodyTemplate,
        });
    };

    const handleAddPathParam = () => {
        const raw = window.prompt('Path param name (example: userId)');
        const name = (raw || '').trim().replace(/\s+/g, '_');
        if (!name) return;

        const token = `{${name}}`;
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
                    {detectedPathParams.length > 0 && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>Path params: {detectedPathParams.map((v) => `{${v}}`).join(', ')}</span>
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
                            placeholder="https://api.example.com/v1/resource/{id}"
                            className="h-10 font-mono text-sm"
                        />
                    </div>

                    <Button type="button" variant="outline" className="h-10 shrink-0" onClick={handleAddPathParam}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add path param
                    </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                    Put dynamic values in the request via the <strong>Inputs</strong> step (destination = Path / Query / Header / Body).
                </p>
                {legacyEndpointVars.length > 0 && (
                    <div className="flex items-center justify-between gap-3 rounded-md border border-yellow-200 bg-yellow-50 px-3 py-2 text-xs dark:border-yellow-800 dark:bg-yellow-900/20">
                        <div className="text-yellow-900 dark:text-yellow-200">
                            Legacy endpoint templates detected: {legacyEndpointVars.map((v) => `{{${v}}}`).join(', ')}. Prefer <code className="px-1 py-0.5 rounded bg-muted">{'{var}'}</code>.
                        </div>
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs"
                            onClick={() => {
                                const next = (config.endpoint || '').replace(/\{\{([^}]+)\}\}/g, (_m, name) => `{${String(name).trim()}}`);
                                updateField('apiConfig.endpoint', next);
                            }}
                        >
                            Convert
                        </Button>
                    </div>
                )}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="auth">
                <TabsList className="w-full justify-start">
                    <TabsTrigger value="auth">Auth</TabsTrigger>
                    <TabsTrigger value="query" className="gap-2">
                        Query (static)
                        <Badge variant="secondary" className="h-5 px-2 text-xs">
                            {queryParamCount}
                        </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="headers" className="gap-2">
                        Headers (static)
                        <Badge variant="secondary" className="h-5 px-2 text-xs">
                            {headerCount}
                        </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="body">Body</TabsTrigger>
                </TabsList>

                <TabsContent value="auth" className="mt-4">
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                            <div className="space-y-2">
                                <Label className="text-xs">Auth Type</Label>
                                <Select
                                    value={config.authType || 'none'}
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

                            {(config.authType || 'none') !== 'none' && (
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
                                        placeholder="Enter token/key (or secret ref)"
                                        className="h-9 text-xs font-mono"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Tip: store a secret reference like <code className="px-1 py-0.5 rounded bg-muted">secrets.MY_API_KEY</code> and resolve it server-side.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="query" className="mt-4">
                    <div className="space-y-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full justify-start h-10"
                            onClick={() =>
                                updateField('apiConfig', {
                                    ...config,
                                    staticQueryParams: { ...staticQueryParams, '': '' },
                                    // legacy mirror for backend compatibility
                                    queryParams: { ...staticQueryParams, '': '' },
                                })
                            }
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add key value pair
                        </Button>
                        <KeyValueEditor
                            value={staticQueryParams}
                            onChange={(params) =>
                                updateField('apiConfig', {
                                    ...config,
                                    staticQueryParams: params,
                                    // legacy mirror for backend compatibility
                                    queryParams: params,
                                })
                            }
                            placeholder={{ key: 'key', value: 'value' }}
                            addLabel="Add key value pair"
                        />
                        <p className="text-xs text-muted-foreground">
                            Dynamic query params belong in <strong>Inputs</strong> (destination = Query).
                        </p>
                    </div>
                </TabsContent>

                <TabsContent value="headers" className="mt-4">
                    <div className="space-y-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full justify-start h-10"
                            onClick={() =>
                                updateField('apiConfig', {
                                    ...config,
                                    staticHeaders: { ...staticHeaders, '': '' },
                                    // legacy mirror for backend compatibility
                                    headers: { ...staticHeaders, '': '' },
                                })
                            }
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add key value pair
                        </Button>
                        <HeaderEditor
                            value={staticHeaders}
                            onChange={(headers) =>
                                updateField('apiConfig', {
                                    ...config,
                                    staticHeaders: headers,
                                    // legacy mirror for backend compatibility
                                    headers,
                                })
                            }
                            addLabel="Add key value pair"
                        />
                        <p className="text-xs text-muted-foreground">
                            Dynamic headers belong in <strong>Inputs</strong> (destination = Header).
                        </p>
                    </div>
                </TabsContent>

                <TabsContent value="body" className="mt-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label>Body</Label>
                            {['POST', 'PUT', 'PATCH'].includes(config.method) && staticBodyDraft && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 text-xs"
                                    onClick={() => {
                                        try {
                                            const parsed = JSON.parse(staticBodyDraft);
                                            const formatted = JSON.stringify(parsed, null, 2);
                                            setStaticBodyDraft(formatted);
                                            setStaticBodyError(null);
                                            updateField('apiConfig', {
                                                ...config,
                                                staticBody: parsed,
                                                // legacy mirror for backend compatibility
                                                bodyTemplate: formatted,
                                            });
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
                                    value={staticBodyDraft}
                                    onChange={(value) => {
                                        setIsBodyDirty(true);
                                        setStaticBodyDraft(value);
                                        try {
                                            const parsed = value.trim().length ? JSON.parse(value) : undefined;
                                            setStaticBodyError(null);
                                            setIsBodyDirty(false);
                                            updateField('apiConfig', {
                                                ...config,
                                                staticBody: parsed,
                                                // legacy mirror for backend compatibility
                                                bodyTemplate: value,
                                            });
                                        } catch (e: any) {
                                            setStaticBodyError('Invalid JSON');
                                            // keep draft; don't clobber staticBody with invalid data
                                            updateField('apiConfig.bodyTemplate', value);
                                        }
                                    }}
                                    extensions={[
                                        json(),
                                        EditorView.lineWrapping
                                    ]}
                                    placeholder='{\n  "mode": "dev",\n  "partial": { "styles": { "appearance": "light" } }\n}'
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
                        {staticBodyError && (
                            <p className="text-xs text-destructive">{staticBodyError}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                            This is the <strong>static JSON body</strong>. To mark a field as dynamic, set its value to an <strong>exact placeholder string</strong> like{' '}
                            <code className="px-1 py-0.5 rounded bg-muted">{"\"{{appearance}}\""}</code> (must be valid JSON). In the next step we’ll detect these placeholders and pre-create Inputs with the correct{' '}
                            <code className="px-1 py-0.5 rounded bg-muted">bodyPath</code>.
                        </p>
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
