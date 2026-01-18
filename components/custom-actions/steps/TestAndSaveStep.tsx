import React from 'react';
import { CustomAction, TestResult, ToolParameter } from '@/types/customActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, Play } from 'lucide-react';
import type { ActionFormErrors } from '@/utils/customActionValidation';

function coerceValue(param: ToolParameter, raw: any): any {
    if (raw === undefined || raw === null) return raw;
    if (typeof raw !== 'string') return raw;

    const s = raw.trim();
    if (!s.length) return raw;

    if (param.type === 'number') {
        const n = Number(s);
        return Number.isFinite(n) ? n : raw;
    }
    if (param.type === 'integer') {
        const n = Number.parseInt(s, 10);
        return Number.isFinite(n) ? n : raw;
    }
    if (param.type === 'boolean') {
        if (s === 'true') return true;
        if (s === 'false') return false;
        return raw;
    }
    if (param.type === 'object' || param.type === 'array') {
        try {
            return JSON.parse(s);
        } catch {
            return raw;
        }
    }
    return raw;
}

function setNestedValue(obj: any, path: string, value: any) {
    const p = (path || '').trim();
    if (!p.length) return;

    const parts = p.split('.').map((x) => x.trim()).filter(Boolean);
    if (!parts.length) return;

    let cur = obj;
    for (let i = 0; i < parts.length; i++) {
        const key = parts[i];
        const last = i === parts.length - 1;
        if (last) {
            cur[key] = value;
            return;
        }
        if (!cur[key] || typeof cur[key] !== 'object' || Array.isArray(cur[key])) {
            cur[key] = {};
        }
        cur = cur[key];
    }
}

function buildRequestPreview(
    action: CustomAction,
    testValues?: Record<string, string>
): { url: string; headers: Record<string, string>; body?: any } {
    const cfg = action.apiConfig;
    const baseUrl = cfg.baseUrl || '';
    const rawEndpoint = cfg.endpoint || '';
    let endpointPath = rawEndpoint;
    let endpointQuery: Record<string, string> = {};

    const qIndex = rawEndpoint.indexOf('?');
    if (qIndex !== -1) {
        endpointPath = rawEndpoint.slice(0, qIndex);
        const search = rawEndpoint.slice(qIndex + 1);
        const sp = new URLSearchParams(search);
        sp.forEach((v, k) => {
            if (!k.trim()) return;
            endpointQuery[k] = v;
        });
    }

    const paramsByName = new Map<string, ToolParameter>();
    for (const p of action.parameters) paramsByName.set(p.name, p);

    const resolvedArgs: Record<string, any> = {};
    for (const p of action.parameters) {
        const raw =
            testValues && Object.prototype.hasOwnProperty.call(testValues, p.name)
                ? testValues[p.name]
                : undefined;
        const withDefault =
            raw !== undefined && raw !== ''
                ? raw
                : (p.default ?? 'test_value');
        resolvedArgs[p.name] = coerceValue(p, withDefault);
    }

    // Path params
    for (const p of action.parameters) {
        if (p.location !== 'path') continue;
        const v = resolvedArgs[p.name];
        if (v === undefined) continue;
        endpointPath = endpointPath
            .replaceAll(`{${p.name}}`, encodeURIComponent(String(v)))
            .replaceAll(`:${p.name}`, encodeURIComponent(String(v)));
    }

    // Query
    const qp: Record<string, string> = { ...endpointQuery };
    for (const p of action.parameters) {
        if (p.location !== 'query') continue;
        const key = (p.key ?? p.name ?? '').trim();
        if (!key) continue;
        const v = resolvedArgs[p.name];
        if (v === undefined) continue;
        qp[key] = String(v);
    }
    const search = new URLSearchParams(
        Object.entries(qp).filter(([k]) => (k || '').trim().length > 0)
    ).toString();

    const url = `${baseUrl}${endpointPath}${search ? `?${search}` : ''}`;

    // Headers
    const headers: Record<string, string> = {
        ...(cfg.staticHeaders ?? {}),
    };
    for (const p of action.parameters) {
        if (p.location !== 'header') continue;
        const key = (p.key ?? p.name ?? '').trim();
        if (!key) continue;
        const v = resolvedArgs[p.name];
        if (v === undefined) continue;
        headers[key] = String(v);
    }

    const authType = cfg.authType || 'none';
    if (authType === 'bearer' && cfg.authValue) {
        headers['Authorization'] = `Bearer ${cfg.authValue}`;
    }
    if (authType === 'basic' && cfg.authValue) {
        headers['Authorization'] = `Basic ${cfg.authValue}`;
    }
    if (authType === 'api_key' && cfg.authValue) {
        headers['X-API-Key'] = cfg.authValue;
    }

    // Body (static + dynamic via bodyPath)
    let body: any = undefined;
    const hasAnyBodyBindings = action.parameters.some((p) => p.location === 'body');

    if (cfg.staticBody !== undefined) {
        try {
            body = JSON.parse(JSON.stringify(cfg.staticBody));
        } catch {
            body = cfg.staticBody;
        }
    } else if (hasAnyBodyBindings) {
        body = {};
    }

    if (body && typeof body === 'object' && !Array.isArray(body)) {
        for (const p of action.parameters) {
            if (p.location !== 'body') continue;
            const path = (p.bodyPath ?? '').trim();
            if (!path) continue;
            setNestedValue(body, path, resolvedArgs[p.name]);
        }
    }

    return { url, headers, body };
}

interface Props {
    formData: CustomAction;
    testResult: TestResult | null;
    testing: boolean;
    onTest: () => void;
    testValues?: Record<string, string>;
    onChangeTestValue?: (name: string, value: string) => void;
    errors?: ActionFormErrors;
}

export const TestSection: React.FC<Props> = ({
    formData,
    testResult,
    testing,
    onTest,
    testValues,
    onChangeTestValue,
    errors,
}) => {
    const preview = buildRequestPreview(formData, testValues);

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Play className="h-4 w-4 text-primary" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold">Test</h3>
                    <p className="text-xs text-muted-foreground">
                        Verify your action works correctly
                    </p>
                </div>
            </div>

            <div className="space-y-4 pl-10">
                {/* Configuration Summary */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs p-3 rounded-md bg-muted/50">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{formData.displayName || formData.name || '—'}</span>

                    <span className="text-muted-foreground">Method:</span>
                    <Badge variant="outline" className="w-fit text-2xs h-5">{formData.apiConfig.method}</Badge>

                    <span className="text-muted-foreground">Auth:</span>
                    <span className="capitalize">{formData.apiConfig.authType}</span>
                </div>

                {/* Full URL Preview */}
                {formData.apiConfig.baseUrl && (
                    <div className="rounded-md bg-muted p-2 font-mono text-xs break-all max-w-full">
                        <span className="text-primary font-semibold">{formData.apiConfig.method}</span>{' '}
                        <span className="text-muted-foreground">{formData.apiConfig.baseUrl}</span>
                        <span>{formData.apiConfig.endpoint}</span>
                    </div>
                )}

                {/* Test Parameters */}
                {formData.parameters.length > 0 && (
                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Test Values</Label>
                        <div className="grid grid-cols-2 gap-2">
                            {formData.parameters.map((param) => (
                                <div key={param.name} className="flex items-start gap-2">
                                    <Label className="text-xs font-mono w-24 truncate">{param.name}</Label>
                                    <div className="flex-1">
                                        <Input
                                            value={
                                                testValues && Object.prototype.hasOwnProperty.call(testValues, param.name)
                                                    ? testValues[param.name] ?? ''
                                                    : ''
                                            }
                                            onChange={(e) => onChangeTestValue?.(param.name, e.target.value)}
                                            placeholder={param.default !== undefined ? String(param.default) : 'test_value'}
                                            className={
                                                errors?.[`testArgs.${param.name}`]
                                                    ? "h-8 text-xs border-destructive focus-visible:ring-destructive"
                                                    : "h-8 text-xs"
                                            }
                                        />
                                        {errors?.[`testArgs.${param.name}`] && (
                                            <p className="text-[11px] text-destructive mt-1">
                                                {errors[`testArgs.${param.name}`]}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Request Preview */}
                {formData.apiConfig.baseUrl && (
                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Request Preview (computed from bindings)</Label>
                        <div className="space-y-2">
                            <div className="rounded-md bg-muted p-2 font-mono text-xs break-all max-w-full">
                                <span className="text-primary font-semibold">{formData.apiConfig.method}</span>{' '}
                                {preview.url}
                            </div>

                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Headers</Label>
                                <div className="rounded-md bg-muted p-2 font-mono text-xs overflow-auto max-h-40 whitespace-pre-wrap break-all max-w-full">
                                    {JSON.stringify(preview.headers, null, 2)}
                                </div>
                            </div>

                            {['POST', 'PUT', 'PATCH'].includes(formData.apiConfig.method) && (
                                <div className="space-y-1">
                                    <Label className="text-xs text-muted-foreground">Body</Label>
                                    <div className="rounded-md bg-muted p-2 font-mono text-xs overflow-auto max-h-48 whitespace-pre-wrap break-all max-w-full">
                                        {preview.body !== undefined ? JSON.stringify(preview.body, null, 2) : '—'}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Test Button */}
                <Button
                    onClick={onTest}
                    disabled={testing || !formData.apiConfig.baseUrl || !(formData.apiConfig.endpoint || '').trim()}
                    size="sm"
                    variant="outline"
                    className="w-full"
                >
                    {testing ? (
                        <>
                            <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                            Testing...
                        </>
                    ) : (
                        <>
                            <Play className="mr-2 h-3.5 w-3.5" />
                            Run Test
                        </>
                    )}
                </Button>

                {/* Test Results */}
                {testResult && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Badge
                                variant={testResult.success ? 'default' : 'destructive'}
                                className="text-xs"
                            >
                                {testResult.success ? 'Success' : 'Failed'}
                            </Badge>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                                {testResult.statusCode && <span>Status: {testResult.statusCode}</span>}
                                {testResult.responseTime && <span>{testResult.responseTime}ms</span>}
                            </div>
                        </div>

                        {testResult.error && (
                            <div className="rounded-md bg-destructive/10 p-2 text-xs text-destructive">
                                <strong>Error:</strong> {testResult.error}
                            </div>
                        )}

                        <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Response</Label>
                            <div className="rounded-md bg-muted p-2 font-mono text-xs overflow-auto max-h-48 whitespace-pre-wrap break-all max-w-full">
                                {typeof testResult.responseBody === 'string'
                                    ? testResult.responseBody
                                    : JSON.stringify(testResult.responseBody, null, 2)}
                            </div>
                        </div>

                        {testResult.extractedData && (
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Extracted Data</Label>
                                <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-2 font-mono text-xs overflow-auto max-h-48 whitespace-pre-wrap break-all max-w-full">
                                    {JSON.stringify(testResult.extractedData, null, 2)}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

// Keep backward compatibility with old interface
interface OldProps {
    formData: CustomAction;
    testResult: TestResult | null;
    testing: boolean;
    saving: boolean;
    onTest: () => void;
    onBack: () => void;
    onNext?: () => void;
    onSave?: () => void;
    testValues?: Record<string, string>;
    onChangeTestValue?: (name: string, value: string) => void;
    errors?: ActionFormErrors;
}

export const TestAndSaveStep: React.FC<OldProps> = (props) => {
    return (
        <div className="space-y-6">
            <TestSection
                formData={props.formData}
                testResult={props.testResult}
                testing={props.testing}
                onTest={props.onTest}
                testValues={props.testValues}
                onChangeTestValue={props.onChangeTestValue}
                errors={props.errors}
            />

            <div className="flex justify-between">
                <Button variant="outline" onClick={props.onBack}>
                    ← Back
                </Button>

                {props.onSave ? (
                    <Button
                        onClick={props.onSave}
                        disabled={props.saving || (props.testResult !== null && !props.testResult.success)}
                    >
                        {props.saving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            'Save Action'
                        )}
                    </Button>
                ) : (
                    <Button
                        onClick={props.onNext}
                        disabled={!props.onNext || props.testing || !props.formData.apiConfig.baseUrl}
                    >
                        Next: Data access →
                    </Button>
                )}
            </div>
        </div>
    );
};
