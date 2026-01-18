import React, { useEffect, useMemo } from 'react';
import { CustomAction, ToolParameter } from '@/types/customActions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Trash2, Plus, ChevronRight, Sparkles, Info } from 'lucide-react';

interface Props {
    formData: CustomAction;
    updateField: (path: string, value: any) => void;
    onNext: () => void;
    onBack: () => void;
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

// Legacy extraction for `{{var}}` templates (backwards compatibility).
function extractLegacyVariables(str: string): string[] {
    const matches = str.match(/\{\{([^}]+)\}\}/g) || [];
    return [...new Set(matches.map(m => m.replace(/\{\{|\}\}/g, '').trim()).filter(Boolean))];
}

function listDotPaths(value: any, prefix = '', out: string[] = [], depth = 0): string[] {
    if (depth > 6) return out;
    if (!value || typeof value !== 'object') return out;
    if (Array.isArray(value)) return out;

    for (const key of Object.keys(value)) {
        const next = prefix ? `${prefix}.${key}` : key;
        out.push(next);
        listDotPaths((value as any)[key], next, out, depth + 1);
        if (out.length > 250) return out;
    }
    return out;
}

function extractExactTemplateVar(v: any): string | null {
    if (typeof v !== 'string') return null;
    const m = v.trim().match(/^\{\{([^}]+)\}\}$/);
    if (!m) return null;
    const name = (m[1] || '').trim();
    return name.length ? name : null;
}

function collectBodyTemplateBindings(value: any, prefix = '', out: Array<{ name: string; bodyPath: string }> = []): Array<{ name: string; bodyPath: string }> {
    if (!value || typeof value !== 'object') return out;
    if (Array.isArray(value)) return out; // keep simple: no array index paths for now

    for (const key of Object.keys(value)) {
        const nextPath = prefix ? `${prefix}.${key}` : key;
        const child = (value as any)[key];
        const exact = extractExactTemplateVar(child);
        if (exact) {
            out.push({ name: exact, bodyPath: nextPath });
        } else if (child && typeof child === 'object' && !Array.isArray(child)) {
            collectBodyTemplateBindings(child, nextPath, out);
        }
        if (out.length > 250) return out;
    }
    return out;
}

export const ParametersStep: React.FC<Props> = ({
    formData,
    updateField,
    onNext,
    onBack,
}) => {
    const endpoint = formData.apiConfig.endpoint || '';
    const legacyBodyTemplate = formData.apiConfig.bodyTemplate || '';

    const detectedPathParams = useMemo(() => extractPathParams(endpoint), [endpoint]);
    const detectedLegacyVariables = useMemo(() => {
        const vars = [
            ...extractLegacyVariables(endpoint),
            ...extractLegacyVariables(legacyBodyTemplate),
        ];
        return [...new Set(vars)];
    }, [endpoint, legacyBodyTemplate]);

    const staticBody = formData.apiConfig.staticBody;
    const bodyPathSuggestions = useMemo(() => listDotPaths(staticBody), [staticBody]);
    const detectedBodyBindings = useMemo(() => {
        // Prefer structured staticBody; fallback to parsing legacy bodyTemplate.
        let bodyObj: any = staticBody;
        if (bodyObj === undefined && legacyBodyTemplate) {
            try {
                bodyObj = JSON.parse(legacyBodyTemplate);
            } catch {
                bodyObj = undefined;
            }
        }
        if (!bodyObj || typeof bodyObj !== 'object' || Array.isArray(bodyObj)) return [];
        return collectBodyTemplateBindings(bodyObj);
    }, [staticBody, legacyBodyTemplate]);
    const staticHeaders = formData.apiConfig.staticHeaders ?? formData.apiConfig.headers ?? {};
    const staticQueryParams = formData.apiConfig.staticQueryParams ?? formData.apiConfig.queryParams ?? {};

    const hasLegacyTemplates = useMemo(() => {
        if (detectedLegacyVariables.length > 0) return true;
        if (Object.values(staticHeaders).some((v) => typeof v === 'string' && v.includes('{{'))) return true;
        if (Object.values(staticQueryParams).some((v) => typeof v === 'string' && v.includes('{{'))) return true;
        return false;
    }, [detectedLegacyVariables.length, staticHeaders, staticQueryParams]);

    const existingParamNames = new Set(formData.parameters.map(p => p.name));
    const missingPathParams = detectedPathParams.filter(v => !existingParamNames.has(v));
    const missingLegacyVariables = detectedLegacyVariables.filter(v => !existingParamNames.has(v));
    const missingBodyBindings = detectedBodyBindings.filter((b) => !existingParamNames.has(b.name));

    // Auto-create body-bound parameters from exact "{{name}}" placeholders in JSON body.
    // Runs when entering this step (component mounts) and when body changes.
    useEffect(() => {
        if (detectedBodyBindings.length === 0) return;

        const nextParams: ToolParameter[] = [...formData.parameters];
        const byName = new Map(nextParams.map((p, idx) => [p.name, idx] as const));
        let changed = false;

        for (const b of detectedBodyBindings) {
            const name = (b.name || '').trim();
            const bodyPath = (b.bodyPath || '').trim();
            if (!name || !bodyPath) continue;

            const idx = byName.get(name);
            if (idx === undefined) {
                nextParams.push({
                    name,
                    type: 'string' as const,
                    description: `Auto-detected body placeholder for ${bodyPath}`,
                    required: true,
                    location: 'body',
                    bodyPath,
                });
                byName.set(name, nextParams.length - 1);
                changed = true;
                continue;
            }

            const cur = nextParams[idx];
            // Only patch if user hasn't explicitly bound it yet.
            if (!cur.location) {
                nextParams[idx] = { ...cur, location: 'body', bodyPath };
                changed = true;
                continue;
            }
            if (cur.location === 'body' && !(cur.bodyPath || '').trim().length) {
                nextParams[idx] = { ...cur, bodyPath };
                changed = true;
                continue;
            }
        }

        if (changed) updateField('parameters', nextParams);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detectedBodyBindings]);

    const addDetectedParameters = () => {
        const newParams: ToolParameter[] = [
            ...missingPathParams.map((name) => ({
                name,
                type: 'string' as const,
                description: `Path parameter for {${name}} in the endpoint`,
                required: true,
                location: 'path',
            })),
            ...missingLegacyVariables.map((name) => ({
                name,
                type: 'string' as const,
                description: `Legacy template variable {{${name}}} detected in endpoint/body template`,
                required: true,
            })),
            ...missingBodyBindings.map(({ name, bodyPath }) => ({
                name,
                type: 'string' as const,
                description: `Body placeholder "{{${name}}}" detected at ${bodyPath}`,
                required: true,
                location: 'body' as const,
                bodyPath,
            })),
        ];
        updateField('parameters', [...formData.parameters, ...newParams]);
    };

    const convertLegacyTemplatesToBindings = () => {
        // 1) Convert legacy endpoint placeholders {{x}} -> {x}
        const nextEndpoint = endpoint.replace(/\{\{([^}]+)\}\}/g, (_m, name) => `{${String(name).trim()}}`);
        if (nextEndpoint !== endpoint) {
            updateField('apiConfig.endpoint', nextEndpoint);
        }

        // 2) Build desired parameter patches from static headers/query and body template markers
        const patchesByName = new Map<string, Partial<ToolParameter>>();

        for (const [key, value] of Object.entries(staticQueryParams)) {
            const name = extractExactTemplateVar(value);
            if (!name) continue;
            patchesByName.set(name, { location: 'query', key });
        }

        for (const [key, value] of Object.entries(staticHeaders)) {
            const name = extractExactTemplateVar(value);
            if (!name) continue;
            patchesByName.set(name, { location: 'header', key });
        }

        // Body: use staticBody if present, otherwise try parsing legacy bodyTemplate JSON
        let bodyObj: any = staticBody;
        if (bodyObj === undefined && legacyBodyTemplate) {
            try {
                bodyObj = JSON.parse(legacyBodyTemplate);
            } catch {
                bodyObj = undefined;
            }
        }

        if (bodyObj && typeof bodyObj === 'object' && !Array.isArray(bodyObj)) {
            const bindings = collectBodyTemplateBindings(bodyObj);
            for (const b of bindings) {
                const existing = patchesByName.get(b.name) || {};
                // Prefer body binding if we found an exact marker in body
                patchesByName.set(b.name, { ...existing, location: 'body', bodyPath: b.bodyPath });
            }
        }

        // 3) Apply patches (create missing params, update existing)
        const nextParams: ToolParameter[] = [...formData.parameters];
        const byName = new Map(nextParams.map((p, idx) => [p.name, idx] as const));

        for (const [name, patch] of patchesByName.entries()) {
            const idx = byName.get(name);
            if (idx === undefined) {
                nextParams.push({
                    name,
                    type: 'string' as const,
                    description: `Auto-generated from legacy template marker for ${name}`,
                    required: true,
                    ...patch,
                });
            } else {
                nextParams[idx] = {
                    ...nextParams[idx],
                    ...patch,
                };
                // if we set query/header and key is empty, default it
                if ((nextParams[idx].location === 'query' || nextParams[idx].location === 'header') && !nextParams[idx].key) {
                    nextParams[idx].key = nextParams[idx].name;
                }
            }
        }

        updateField('parameters', nextParams);
    };

    const addParameter = () => {
        const newParam: ToolParameter = {
            name: '',
            type: 'string' as const,
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

    const patchParameter = (index: number, patch: Partial<ToolParameter>) => {
        const updated = [...formData.parameters];
        updated[index] = { ...updated[index], ...patch };
        updateField('parameters', updated);
    };

    const removeParameter = (index: number) => {
        const updated = formData.parameters.filter((_, i) => i !== index);
        updateField('parameters', updated);
    };

    // Parameters are now OPTIONAL - you can skip this step
    const isValid = () => {
        // If there are no parameters, that's fine
        if (formData.parameters.length === 0) return true;

        // If there are parameters, each must have name, type, and description
        return formData.parameters.every(
            (p) => {
                const baseOk = p.name && p.type && p.description.length >= 5;
                if (!baseOk) return false;

                if (p.location === 'body') {
                    return !!(p.bodyPath && p.bodyPath.trim().length > 0);
                }
                if (p.location === 'query' || p.location === 'header') {
                    const key = (p.key ?? p.name ?? '').trim();
                    return key.length > 0;
                }
                return true;
            }
        );
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Parameters</h2>
                <p className="text-muted-foreground">
                    Define what information the AI needs to extract from the conversation.
                </p>
            </div>

            {hasLegacyTemplates && (
                <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
                    <AlertDescription className="flex items-center justify-between">
                        <div>
                            <span className="font-medium text-yellow-900 dark:text-yellow-200">
                                Legacy templates detected
                            </span>
                            <span className="text-yellow-800 dark:text-yellow-300 ml-2">
                                We found <code className="px-1 py-0.5 rounded bg-muted">{'{{var}}'}</code> markers. You can convert them into explicit bindings (Path/Query/Header/Body).
                            </span>
                        </div>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={convertLegacyTemplatesToBindings}
                            className="ml-4 border-yellow-300 text-yellow-900 hover:bg-yellow-100 dark:border-yellow-700 dark:text-yellow-200 dark:hover:bg-yellow-900"
                        >
                            Convert templates → bindings
                        </Button>
                    </AlertDescription>
                </Alert>
            )}

            {/* Auto-detected variables prompt */}
            {(missingPathParams.length > 0 || missingLegacyVariables.length > 0) && (
                <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
                    <Sparkles className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertDescription className="flex items-center justify-between">
                        <div>
                            <span className="font-medium text-green-800 dark:text-green-200">
                                {missingPathParams.length + missingLegacyVariables.length} variable
                                {(missingPathParams.length + missingLegacyVariables.length) !== 1 ? 's' : ''} detected
                            </span>
                            <span className="text-green-700 dark:text-green-300 ml-2">
                                from your API configuration:{' '}
                                {[
                                    ...missingPathParams.map((v) => `{${v}}`),
                                    ...missingLegacyVariables.map((v) => `{{${v}}}`),
                                ].join(', ')}
                            </span>
                        </div>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={addDetectedParameters}
                            className="ml-4 border-green-300 text-green-700 hover:bg-green-100 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900"
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            Add All
                        </Button>
                    </AlertDescription>
                </Alert>
            )}

            {formData.parameters.length === 0 &&
                missingPathParams.length === 0 &&
                missingLegacyVariables.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/50">
                    <Info className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground mb-2">No parameters needed?</p>
                    <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                        If your API doesn't require any dynamic values, you can skip this step.
                        Otherwise, add parameters that the AI will extract from conversations.
                    </p>
                    <Button variant="outline" onClick={addParameter}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Parameter Manually
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
                            <CardTitle className="text-lg flex items-center gap-2">
                                <span>Parameter {index + 1}</span>
                                {param.required && (
                                    <Badge variant="secondary" className="text-xs">Required</Badge>
                                )}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Name */}
                                <div className="space-y-2">
                                    <Label>Name <span className="text-destructive">*</span></Label>
                                    <Input
                                        value={param.name}
                                        onChange={(e) =>
                                            updateParameter(index, 'name', e.target.value.toLowerCase().replace(/\s+/g, '_'))
                                        }
                                        placeholder="product_id"
                                        className="font-mono"
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
                                    placeholder="The unique identifier for the product. The AI will extract this from phrases like 'product ABC123' or 'item #12345'."
                                    rows={2}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Help the AI understand what this parameter represents and how to find it.
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
                                    <Label htmlFor={`required-${index}`} className="text-sm">Required</Label>
                                </div>

                                {/* Default Value */}
                                <div className="flex-1 min-w-[200px]">
                                    <Input
                                        value={
                                            typeof param.default === 'string'
                                                ? param.default
                                                : param.default !== undefined
                                                    ? JSON.stringify(param.default)
                                                    : ''
                                        }
                                        onChange={(e) => {
                                            const raw = e.target.value;
                                            if (param.type === 'object' || param.type === 'array') {
                                                try {
                                                    patchParameter(index, { default: raw.trim().length ? JSON.parse(raw) : undefined });
                                                } catch {
                                                    patchParameter(index, { default: raw });
                                                }
                                                return;
                                            }
                                            patchParameter(index, { default: raw });
                                        }}
                                        placeholder="Default value (optional)"
                                        className="h-9"
                                    />
                                </div>
                            </div>

                            {/* Destination / Binding */}
                            <div className="rounded-md border bg-muted/20 p-3 space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label>Destination</Label>
                                        <Select
                                            value={param.location ?? 'unbound'}
                                            onValueChange={(value) => {
                                                if (value === 'unbound') {
                                                    patchParameter(index, { location: undefined, key: undefined, bodyPath: undefined });
                                                    return;
                                                }
                                                if (value === 'query' || value === 'header') {
                                                    patchParameter(index, {
                                                        location: value as any,
                                                        key: (param.key ?? param.name ?? '').trim() || (param.name || ''),
                                                        bodyPath: undefined,
                                                    });
                                                    return;
                                                }
                                                if (value === 'body') {
                                                    patchParameter(index, {
                                                        location: 'body',
                                                        bodyPath: (param.bodyPath ?? param.name ?? '').trim() || (param.name || ''),
                                                        key: undefined,
                                                    });
                                                    return;
                                                }
                                                patchParameter(index, { location: value as any, key: undefined, bodyPath: undefined });
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="unbound">Unbound (no request mapping)</SelectItem>
                                                <SelectItem value="path">Path</SelectItem>
                                                <SelectItem value="query">Query</SelectItem>
                                                <SelectItem value="header">Header</SelectItem>
                                                <SelectItem value="body">Body</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <p className="text-xs text-muted-foreground">
                                            Controls where the backend places this value.
                                        </p>
                                    </div>

                                    {(param.location === 'query' || param.location === 'header') && (
                                        <div className="md:col-span-2 space-y-2">
                                            <Label>{param.location === 'query' ? 'Query key' : 'Header key'}</Label>
                                            <Input
                                                value={param.key ?? param.name ?? ''}
                                                onChange={(e) => patchParameter(index, { key: e.target.value })}
                                                placeholder={param.name || 'key'}
                                                className="font-mono"
                                            />
                                        </div>
                                    )}

                                    {param.location === 'body' && (
                                        <div className="md:col-span-2 space-y-2">
                                            <Label>Body path (dot notation)</Label>
                                            <Input
                                                value={param.bodyPath ?? ''}
                                                onChange={(e) => patchParameter(index, { bodyPath: e.target.value })}
                                                placeholder="partial.styles.primaryColor"
                                                className="font-mono"
                                            />
                                            {bodyPathSuggestions.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {bodyPathSuggestions
                                                        .filter((p) =>
                                                            (param.name || '').trim().length
                                                                ? p.toLowerCase().includes((param.name || '').toLowerCase())
                                                                : true
                                                        )
                                                        .slice(0, 8)
                                                        .map((p) => (
                                                            <Badge
                                                                key={p}
                                                                variant="secondary"
                                                                className="cursor-pointer font-mono"
                                                                onClick={() => patchParameter(index, { bodyPath: p })}
                                                            >
                                                                {p}
                                                            </Badge>
                                                        ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
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
                                                className="font-mono"
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
                                        [p.name]:
                                            p.default !== undefined
                                                ? p.default
                                                : `<${p.type}>`,
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
                    {formData.parameters.length === 0 ? 'Skip to Test →' : 'Next: Test & Save →'}
                </Button>
            </div>
        </div>
    );
};
