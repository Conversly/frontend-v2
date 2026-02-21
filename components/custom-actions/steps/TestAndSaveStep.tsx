import React from 'react';
import { CustomAction, TestResult, ToolParameter } from '@/types/customActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
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
            <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Play className="h-4 w-4 text-primary" />
                </div>
                <div>
                    <h3 className="type-section-title">Test Action</h3>
                    <p className="type-body-muted">
                        Verify your action configuration by running a real request.
                    </p>
                </div>
            </div>

            <div className="space-y-4 pl-10">
                {/* Configuration Summary */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs p-4 rounded-lg bg-muted/30 border border-border/50">
                    <span className="text-muted-foreground">Action:</span>
                    <span className="font-semibold text-foreground">{formData.displayName || formData.name || '—'}</span>

                    <span className="text-muted-foreground">Method:</span>
                    <Badge variant="outline" className="w-fit text-[10px] font-bold uppercase tracking-wider h-5 bg-background">{formData.apiConfig.method}</Badge>

                    <span className="text-muted-foreground">Auth:</span>
                    <span className="capitalize font-medium text-foreground">{formData.apiConfig.authType || 'None'}</span>
                </div>

                {/* Full URL Preview */}
                {formData.apiConfig.baseUrl && (
                    <div className="rounded-lg bg-[--surface-secondary] p-3 font-mono text-xs break-all max-w-full border border-border shadow-sm flex gap-2">
                        <span className="text-primary font-bold uppercase shrink-0">{formData.apiConfig.method}</span>
                        <div className="flex-1 opacity-80">
                            <span className="text-muted-foreground">{formData.apiConfig.baseUrl}</span>
                            <span className="text-foreground">{formData.apiConfig.endpoint}</span>
                        </div>
                    </div>
                )}

                {/* Test Parameters */}
                {formData.parameters.length > 0 && (
                    <div className="space-y-3">
                        <Label className="type-label">Test Input Values</Label>
                        <div className="grid grid-cols-2 gap-4">
                            {formData.parameters.map((param) => (
                                <div key={param.name} className="space-y-1.5">
                                    <Label className="type-caption font-mono text-[10px] text-muted-foreground uppercase">{param.name}</Label>
                                    <div className="flex-1">
                                        <Input
                                            value={
                                                testValues && Object.prototype.hasOwnProperty.call(testValues, param.name)
                                                    ? testValues[param.name] ?? ''
                                                    : ''
                                            }
                                            onChange={(e) => onChangeTestValue?.(param.name, e.target.value)}
                                            placeholder={param.default !== undefined ? String(param.default) : 'Enter value...'}
                                            className={cn(
                                                "h-10 text-sm bg-background",
                                                errors?.[`testArgs.${param.name}`] ? "border-destructive focus-visible:ring-destructive" : ""
                                            )}
                                        />
                                        {errors?.[`testArgs.${param.name}`] && (
                                            <p className="text-[10px] font-medium text-destructive mt-1">
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
                    <div className="space-y-4 pt-2">
                        <Label className="type-label">Request Preview</Label>
                        <div className="space-y-3">
                            <div className="rounded-lg bg-muted/40 p-3 font-mono text-xs break-all max-w-full border border-border">
                                <span className="text-primary font-bold uppercase mr-2">{formData.apiConfig.method}</span>
                                <span className="text-foreground/80">{preview.url}</span>
                            </div>

                            <div className="space-y-1.5 text-left">
                                <Label className="type-caption uppercase tracking-wider font-semibold opacity-70">Headers</Label>
                                <div className="rounded-lg bg-card p-3 font-mono text-xs overflow-auto max-h-40 whitespace-pre-wrap break-all max-w-full border border-border shadow-sm">
                                    {JSON.stringify(preview.headers, null, 2)}
                                </div>
                            </div>

                            {['POST', 'PUT', 'PATCH'].includes(formData.apiConfig.method) && (
                                <div className="space-y-1.5 text-left">
                                    <Label className="type-caption uppercase tracking-wider font-semibold opacity-70">JSON Body</Label>
                                    <div className="rounded-lg bg-card p-3 font-mono text-xs overflow-auto max-h-48 whitespace-pre-wrap break-all max-w-full border border-border shadow-sm">
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
                    size="lg"
                    className="w-full shadow-card mt-2"
                >
                    {testing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Running test...
                        </>
                    ) : (
                        <>
                            <Play className="mr-2 h-4 w-4 fill-current" />
                            Run Action Test
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

            <div className="flex justify-between pt-8 border-t border-border mt-8">
                <Button variant="ghost" onClick={props.onBack} className="px-8">
                    ← Back
                </Button>

                {props.onSave ? (
                    <Button
                        onClick={props.onSave}
                        disabled={props.saving || (props.testResult !== null && !props.testResult.success)}
                        className="px-8 shadow-card"
                        size="lg"
                    >
                        {props.saving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving Action...
                            </>
                        ) : (
                            'Save Action'
                        )}
                    </Button>
                ) : (
                    <Button
                        onClick={props.onNext}
                        disabled={!props.onNext || props.testing || !props.formData.apiConfig.baseUrl}
                        className="px-8 shadow-card"
                    >
                        Next: Data Access
                    </Button>
                )}
            </div>
        </div>
    );
};
