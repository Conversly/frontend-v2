import React, { useContext } from "react";
import { Loader2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type {
  CustomAction,
  TestResult,
  ToolParameter,
} from "@/types/customActions";
import type { ActionFormErrors } from "@/utils/customActionValidation";
import {
  CustomActionEditorActionsContext,
  useCustomActionEditorActions,
} from "@/components/custom-actions/custom-action-editor-context";
import {
  useEditorErrors,
  useEditorFormData,
  useEditorSaving,
  useEditorTestResult,
  useEditorTestValues,
  useEditorTesting,
  useEditorSetTestValue,
} from "@/store/custom-action-editor";

function coerceValue(param: ToolParameter, raw: any): any {
  if (raw === undefined || raw === null) return raw;
  if (typeof raw !== "string") return raw;

  const s = raw.trim();
  if (!s.length) return raw;

  if (param.type === "number") {
    const n = Number(s);
    return Number.isFinite(n) ? n : raw;
  }
  if (param.type === "integer") {
    const n = Number.parseInt(s, 10);
    return Number.isFinite(n) ? n : raw;
  }
  if (param.type === "boolean") {
    if (s === "true") return true;
    if (s === "false") return false;
    return raw;
  }
  if (param.type === "object" || param.type === "array") {
    try {
      return JSON.parse(s);
    } catch {
      return raw;
    }
  }
  return raw;
}

function setNestedValue(obj: any, path: string, value: any) {
  const p = (path || "").trim();
  if (!p.length) return;

  const parts = p
    .split(".")
    .map((x) => x.trim())
    .filter(Boolean);
  if (!parts.length) return;

  let cur = obj;
  for (let i = 0; i < parts.length; i += 1) {
    const key = parts[i];
    const last = i === parts.length - 1;
    if (last) {
      cur[key] = value;
      return;
    }
    if (!cur[key] || typeof cur[key] !== "object" || Array.isArray(cur[key])) {
      cur[key] = {};
    }
    cur = cur[key];
  }
}

function formatPreviewValue(value: any): string {
  if (value === undefined) return "—";
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

function buildRequestPreview(
  action: CustomAction,
  testValues?: Record<string, string>,
): { url: string; headers: Record<string, string>; body?: any } {
  const cfg = action.apiConfig;
  const baseUrl = cfg.baseUrl || "";
  const rawEndpoint = cfg.endpoint || "";
  let endpointPath = rawEndpoint;
  let endpointQuery: Record<string, string> = {};

  const qIndex = rawEndpoint.indexOf("?");
  if (qIndex !== -1) {
    endpointPath = rawEndpoint.slice(0, qIndex);
    const search = rawEndpoint.slice(qIndex + 1);
    const sp = new URLSearchParams(search);
    sp.forEach((v, k) => {
      if (!k.trim()) return;
      endpointQuery[k] = v;
    });
  }

  const resolvedArgs: Record<string, any> = {};
  for (const p of action.parameters) {
    const raw =
      testValues && Object.prototype.hasOwnProperty.call(testValues, p.name)
        ? testValues[p.name]
        : undefined;
    const hasRaw = raw !== undefined && raw !== "";

    if (p.source === "fixed") {
      if (p.default !== undefined) {
        resolvedArgs[p.name] = coerceValue(p, p.default);
      }
      continue;
    }

    if (hasRaw) {
      resolvedArgs[p.name] = coerceValue(p, raw);
      continue;
    }

    if (p.default !== undefined) {
      resolvedArgs[p.name] = coerceValue(p, p.default);
      continue;
    }

    if (p.source === "user") {
      resolvedArgs[p.name] = coerceValue(p, "test_value");
    }
  }

  for (const p of action.parameters) {
    if (p.location !== "path") continue;
    const v = resolvedArgs[p.name];
    if (v === undefined) continue;
    endpointPath = endpointPath
      .replaceAll(`{${p.name}}`, encodeURIComponent(String(v)))
      .replaceAll(`:${p.name}`, encodeURIComponent(String(v)));
  }

  const qp: Record<string, string> = { ...endpointQuery };
  for (const p of action.parameters) {
    if (p.location !== "query") continue;
    const key = (p.key ?? p.name ?? "").trim();
    if (!key) continue;
    const v = resolvedArgs[p.name];
    if (v === undefined) continue;
    qp[key] = String(v);
  }

  const search = new URLSearchParams(
    Object.entries(qp).filter(([k]) => (k || "").trim().length > 0),
  ).toString();

  const url = `${baseUrl}${endpointPath}${search ? `?${search}` : ""}`;

  const headers: Record<string, string> = {
    ...(cfg.staticHeaders ?? {}),
  };
  for (const p of action.parameters) {
    if (p.location !== "header") continue;
    const key = (p.key ?? p.name ?? "").trim();
    if (!key) continue;
    const v = resolvedArgs[p.name];
    if (v === undefined) continue;
    headers[key] = String(v);
  }

  const authType = cfg.authType || "none";
  if (authType === "bearer" && cfg.authValue) {
    headers.Authorization = `Bearer ${cfg.authValue}`;
  }
  if (authType === "basic" && cfg.authValue) {
    headers.Authorization = `Basic ${cfg.authValue}`;
  }
  if (authType === "api_key" && cfg.authValue) {
    headers["X-API-Key"] = cfg.authValue;
  }

  let body: any = undefined;
  const hasAnyBodyBindings = action.parameters.some(
    (p) => p.location === "body",
  );

  if (cfg.staticBody !== undefined) {
    try {
      body = JSON.parse(JSON.stringify(cfg.staticBody));
    } catch {
      body = cfg.staticBody;
    }
  } else if (hasAnyBodyBindings) {
    body = {};
  }

  if (body && typeof body === "object" && !Array.isArray(body)) {
    for (const p of action.parameters) {
      if (p.location !== "body") continue;
      const path = (p.bodyPath ?? "").trim();
      if (!path) continue;
      setNestedValue(body, path, resolvedArgs[p.name]);
    }
  }

  return { url, headers, body };
}

interface TestSectionProps {
  formData?: CustomAction;
  testResult?: TestResult | null;
  testing?: boolean;
  onTest?: () => void | Promise<void>;
  testValues?: Record<string, string>;
  onChangeTestValue?: (name: string, value: string) => void;
  errors?: ActionFormErrors;
}

export const TestSection: React.FC<TestSectionProps> = ({
  formData: providedFormData,
  testResult: providedTestResult,
  testing: providedTesting,
  onTest,
  testValues: providedTestValues,
  onChangeTestValue,
  errors: providedErrors,
}) => {
  const storeFormData = useEditorFormData();
  const storeTestResult = useEditorTestResult();
  const storeTesting = useEditorTesting();
  const storeErrors = useEditorErrors();
  const storeTestValues = useEditorTestValues();
  const setTestValue = useEditorSetTestValue();
  const editorActions = useContext(CustomActionEditorActionsContext);
  const formData = providedFormData ?? storeFormData;
  const testResult = providedTestResult ?? storeTestResult;
  const testing = providedTesting ?? storeTesting;
  const errors = providedErrors ?? storeErrors;
  const testValues = providedTestValues ?? storeTestValues;
  const handleTest = onTest ?? editorActions?.handleTest;
  const preview = buildRequestPreview(formData, testValues);

  return (
    <Card className="shadow-card border-border bg-[--surface-secondary]">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Play className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle className="type-section-title">Request Test</CardTitle>
            <CardDescription className="type-body-muted">
              Validate request assembly, authentication, parameter binding, and
              the raw API response before you save.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
          This test verifies the tool request itself. Use the playground panel
          on the right to check whether the saved chatbot actually chooses and
          uses this action in conversation.
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs p-4 rounded-lg bg-muted/30 border border-border/50">
          <span className="text-muted-foreground">Action:</span>
          <span className="font-semibold text-foreground">
            {formData.displayName || formData.name || "—"}
          </span>

          <span className="text-muted-foreground">Method:</span>
          <Badge
            variant="outline"
            className="w-fit text-[10px] font-bold uppercase tracking-wider h-5 bg-background"
          >
            {formData.apiConfig.method}
          </Badge>

          <span className="text-muted-foreground">Auth:</span>
          <span className="capitalize font-medium text-foreground">
            {formData.apiConfig.authType || "None"}
          </span>
        </div>

        {formData.apiConfig.baseUrl && (
          <div className="rounded-lg bg-[--surface-secondary] p-3 font-mono text-xs break-all max-w-full border border-border shadow-sm flex gap-2">
            <span className="text-primary font-bold uppercase shrink-0">
              {formData.apiConfig.method}
            </span>
            <div className="flex-1 opacity-80">
              <span className="text-muted-foreground">
                {formData.apiConfig.baseUrl}
              </span>
              <span className="text-foreground">
                {formData.apiConfig.endpoint}
              </span>
            </div>
          </div>
        )}

        {formData.parameters.filter(
          (param) => param.source !== "contact" && param.source !== "fixed",
        ).length > 0 && (
          <div className="space-y-3 rounded-lg border border-border bg-background/60 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Test Inputs
                </h3>
                <p className="text-xs text-muted-foreground">
                  Provide values for required AI-supplied inputs before sending
                  the request.
                </p>
              </div>
              <Badge variant="secondary">
                {
                  formData.parameters.filter(
                    (param) =>
                      param.source !== "contact" && param.source !== "fixed",
                  ).length
                }{" "}
                editable
              </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {formData.parameters
                .filter(
                  (param) =>
                    param.source !== "contact" && param.source !== "fixed",
                )
                .map((param) => {
                  const fieldError = errors[`testArgs.${param.name}`];
                  return (
                    <div key={param.name} className="space-y-1.5">
                      <Label className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        {param.name}
                        {param.required ? " *" : ""}
                      </Label>
                      <Input
                        value={testValues[param.name] ?? ""}
                        onChange={(e) => {
                          if (onChangeTestValue) {
                            onChangeTestValue(param.name, e.target.value);
                            return;
                          }

                          setTestValue(param.name, e.target.value);
                        }}
                        placeholder={
                          param.default !== undefined
                            ? String(param.default)
                            : `Enter ${param.type}`
                        }
                        className={cn(
                          "bg-background",
                          fieldError
                            ? "border-destructive focus-visible:ring-destructive"
                            : "border-border",
                        )}
                      />
                      {param.description ? (
                        <p className="text-xs text-muted-foreground">
                          {param.description}
                        </p>
                      ) : null}
                      {fieldError ? (
                        <p className="text-xs text-destructive">{fieldError}</p>
                      ) : null}
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        <div className="rounded-lg border border-border bg-background/60 p-4 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Request Preview
              </h3>
              <p className="text-xs text-muted-foreground">
                Preview of the request assembled from your saved configuration
                and test values.
              </p>
            </div>
            <Button
              onClick={() => void handleTest?.()}
              disabled={testing || !handleTest}
            >
              {testing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Run test
                </>
              )}
            </Button>
          </div>

          <div className="grid gap-3">
            <div className="rounded-md border border-border bg-muted/30 p-3">
              <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-1">
                URL
              </div>
              <div className="font-mono text-xs break-all">
                {preview.url || "—"}
              </div>
            </div>

            <div className="rounded-md border border-border bg-muted/30 p-3">
              <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-1">
                Headers
              </div>
              <pre className="font-mono text-xs whitespace-pre-wrap break-all">
                {JSON.stringify(preview.headers, null, 2)}
              </pre>
            </div>

            <div className="rounded-md border border-border bg-muted/30 p-3">
              <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-1">
                Body
              </div>
              <pre className="font-mono text-xs whitespace-pre-wrap break-all">
                {preview.body !== undefined
                  ? JSON.stringify(preview.body, null, 2)
                  : "—"}
              </pre>
            </div>
          </div>
        </div>

        {testResult && (
          <div
            className={cn(
              "rounded-lg border p-4 space-y-4",
              testResult.success
                ? "border-green-200 bg-green-50/70"
                : "border-destructive/20 bg-destructive/5",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold">
                  {testResult.success ? "Test passed" : "Test failed"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {testResult.requestUrl || preview.url}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {testResult.statusCode ? (
                  <Badge
                    variant={testResult.success ? "success" : "destructive"}
                  >
                    HTTP {testResult.statusCode}
                  </Badge>
                ) : null}
                {testResult.responseTime ? (
                  <Badge variant="outline">{testResult.responseTime} ms</Badge>
                ) : null}
              </div>
            </div>

            {testResult.error ? (
              <div className="text-sm text-destructive">{testResult.error}</div>
            ) : null}

            {testResult.responseBody ? (
              <div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-2">
                  Raw response
                </div>
                <div className="rounded-md bg-background/80 p-3 font-mono text-xs overflow-auto max-h-64 whitespace-pre-wrap break-all max-w-full">
                  {typeof testResult.responseBody === "string"
                    ? testResult.responseBody
                    : JSON.stringify(testResult.responseBody, null, 2)}
                </div>
              </div>
            ) : null}

            {testResult.extractedData !== undefined &&
              testResult.extractedData !== null && (
                <div>
                  <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-2">
                    Extracted data
                  </div>
                  <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-2 font-mono text-xs overflow-auto max-h-48 whitespace-pre-wrap break-all max-w-full">
                    {JSON.stringify(testResult.extractedData, null, 2)}
                  </div>
                </div>
              )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const TestAndSaveStep: React.FC = () => {
  const { handleSave } = useCustomActionEditorActions();
  const formData = useEditorFormData();
  const testResult = useEditorTestResult();
  const testing = useEditorTesting();
  const saving = useEditorSaving();

  return (
    <div className="space-y-6">
      <TestSection />

      <div className="flex justify-between pt-8 border-t border-border mt-8">
        <div />
        <Button
          onClick={() => void handleSave("publish")}
          disabled={
            saving ||
            (testResult !== null && !testResult.success) ||
            testing ||
            !formData.apiConfig.baseUrl
          }
          className="px-8 shadow-card"
          size="lg"
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving Action...
            </>
          ) : (
            "Save Action"
          )}
        </Button>
      </div>
    </div>
  );
};
