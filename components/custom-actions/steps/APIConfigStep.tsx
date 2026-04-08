import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Plus, X, Terminal } from "lucide-react";
import { CurlImportDialog } from "../CurlImportDialog";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { EditorView } from "@codemirror/view";
import type { CustomAction, CustomActionConfig } from "@/types/customActions";
import type { ActionFormErrors } from "@/utils/customActionValidation";
import {
  extractPathParams,
  extractLegacyVariables,
  synthesizeParametersFromImportedConfig,
} from "../parameter-utils";
import {
  useEditorErrors,
  useEditorFormData,
  useEditorReplaceParameters,
  useEditorUpdateField,
} from "@/store/custom-action-editor";

interface Props {
  formData?: CustomAction;
  updateField?: (path: string, value: any) => void;
  errors?: ActionFormErrors;
}

function splitEndpoint(endpoint: string): {
  pathname: string;
  query: Record<string, string>;
} {
  const raw = (endpoint || "").trim();
  const qIndex = raw.indexOf("?");
  const pathname = (qIndex === -1 ? raw : raw.slice(0, qIndex)) || "";
  const search = qIndex === -1 ? "" : raw.slice(qIndex + 1);
  const query: Record<string, string> = {};
  if (search.trim().length) {
    const sp = new URLSearchParams(search);
    sp.forEach((v, k) => {
      if (!k.trim()) return;
      query[k] = v;
    });
  }
  return {
    pathname:
      pathname.startsWith("/") || pathname.length === 0
        ? pathname
        : `/${pathname}`,
    query,
  };
}

function buildEndpoint(
  pathname: string,
  query: Record<string, string>,
): string {
  const p = (pathname || "").trim();
  const path = p.length ? (p.startsWith("/") ? p : `/${p}`) : "";
  const search = new URLSearchParams(
    Object.entries(query).filter(([k]) => (k || "").trim().length > 0),
  ).toString();
  return `${path}${search ? `?${search}` : ""}`;
}

export const APIConfigSection: React.FC<Props> = ({
  formData: providedFormData,
  updateField: providedUpdateField,
  errors: providedErrors,
}) => {
  const [staticBodyDraft, setStaticBodyDraft] = useState("");
  const [staticBodyError, setStaticBodyError] = useState<string | null>(null);
  const [isBodyDirty, setIsBodyDirty] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const storeFormData = useEditorFormData();
  const storeErrors = useEditorErrors();
  const storeUpdateField = useEditorUpdateField();
  const replaceParameters = useEditorReplaceParameters();
  const formData = providedFormData ?? storeFormData;
  const errors = providedErrors ?? storeErrors;
  const updateField = providedUpdateField ?? storeUpdateField;
  const config = formData.apiConfig;

  const endpointParts = useMemo(
    () => splitEndpoint(config.endpoint || ""),
    [config.endpoint],
  );

  // Combine baseUrl + endpoint (endpoint includes querystring)
  const fullUrl = useMemo(() => {
    return `${config.baseUrl}${config.endpoint || ""}`;
  }, [config.baseUrl, config.endpoint]);

  // Parse full URL back into base and endpoint
  const handleFullUrlChange = (value: string) => {
    try {
      const urlObj = new URL(value);
      updateField("apiConfig", {
        ...config,
        baseUrl: urlObj.origin,
        endpoint: `${urlObj.pathname}${urlObj.search || ""}`,
      });
    } catch {
      // If not a valid URL, just update the endpoint
      if (value.startsWith("/")) {
        updateField("apiConfig.endpoint", value);
      } else if (value.includes("://")) {
        // Partial URL, try to extract what we can
        const match = value.match(/^(https?:\/\/[^\/]+)(.*)/);
        if (match) {
          updateField("apiConfig.baseUrl", match[1]);
          updateField("apiConfig.endpoint", match[2] || "/");
        }
      }
    }
  };

  const staticHeaders = config.staticHeaders ?? {};
  const staticQueryParams = endpointParts.query;
  const headerCount = Object.keys(staticHeaders).length;
  const queryParamCount = Object.keys(staticQueryParams).length;
  const advancedCount = headerCount + queryParamCount;

  const detectedPathParams = useMemo(
    () => extractPathParams(config.endpoint || ""),
    [config.endpoint],
  );
  const legacyEndpointVars = useMemo(
    () => extractLegacyVariables(config.endpoint || ""),
    [config.endpoint],
  );

  // Keep the static body editor in sync with config changes.
  useEffect(() => {
    // While the user is typing, don't clobber their draft (especially mid-edit when JSON is invalid).
    if (isBodyDirty) return;

    const next =
      config.staticBody !== undefined
        ? JSON.stringify(config.staticBody, null, 2)
        : "";
    setStaticBodyDraft(next);
    setStaticBodyError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.id, config.staticBody, config.method, isBodyDirty]);

  useEffect(() => {
    if (
      headerCount > 0 ||
      queryParamCount > 0 ||
      detectedPathParams.length > 0 ||
      (config.successCodes || []).join(",") !== "200" ||
      (config.timeoutSeconds ?? 30) !== 30 ||
      (config.retryCount ?? 0) !== 0 ||
      config.verifySsl === false
    ) {
      setShowAdvanced(true);
    }
  }, [
    config.retryCount,
    config.successCodes,
    config.timeoutSeconds,
    config.verifySsl,
    detectedPathParams.length,
    headerCount,
    queryParamCount,
  ]);

  const handleCurlImport = (imported: Partial<CustomActionConfig>) => {
    const nextStaticHeaders = imported.staticHeaders ?? staticHeaders;
    const nextStaticBody: any = imported.staticBody ?? config.staticBody;
    const importedConfig = {
      ...config,
      ...imported,
      staticHeaders: nextStaticHeaders,
      staticBody: nextStaticBody,
    };
    const synthesized = synthesizeParametersFromImportedConfig(
      importedConfig,
      formData.parameters,
    );

    updateField("apiConfig", {
      ...importedConfig,
      ...synthesized.apiConfig,
    });
    replaceParameters(synthesized.parameters);
  };

  const handleAddPathParam = () => {
    const raw = window.prompt("Path param name (example: userId)");
    const name = (raw || "").trim().replace(/\s+/g, "_");
    if (!name) return;

    const token = `{${name}}`;
    const cur = fullUrl || "";
    const qIndex = cur.indexOf("?");
    const before = qIndex === -1 ? cur : cur.slice(0, qIndex);
    const after = qIndex === -1 ? "" : cur.slice(qIndex);

    const prefix =
      before.length === 0 || before.endsWith("/") ? before : `${before}/`;
    const nextUrl = `${prefix}${token}${after}`;
    handleFullUrlChange(nextUrl);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <CurlImportDialog
          onImport={(imported) => handleCurlImport(imported)}
          trigger={
            <Button
              type="button"
              variant="outline"
              className="h-10 gap-2 shrink-0"
            >
              <Terminal className="h-4 w-4" />
              Import from cURL
            </Button>
          }
        />
      </div>

      <Card className="shadow-card border-border bg-[--surface-secondary]">
        <CardHeader>
          <CardTitle className="type-h3">
            How should we call this service?
          </CardTitle>
          <CardDescription className="type-body-muted">
            Set the method and URL. Dynamic values from the Inputs tab will be
            filled into path, query, header, or body bindings later.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-[120px_minmax(0,1fr)_auto]">
            <div className="form-field">
              <Label className="form-field-label">Method</Label>
              <Select
                value={config.method}
                onValueChange={(value) =>
                  updateField("apiConfig.method", value)
                }
              >
                <SelectTrigger className="h-11 bg-background border-border">
                  <SelectValue placeholder="Method" />
                </SelectTrigger>
                <SelectContent>
                  {["GET", "POST", "PUT", "DELETE", "PATCH"].map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="form-field">
              <Label className="form-field-label">
                Full URL or endpoint path
              </Label>
              <Input
                value={fullUrl}
                onChange={(e) => handleFullUrlChange(e.target.value)}
                placeholder="https://api.example.com/v1/resource/{id}"
                className="h-11 font-mono text-sm bg-background border-border"
              />
            </div>

            <div className="hidden lg:block" />
          </div>

          <p className="type-caption">
            Keep the connection simple here. You can define dynamic inputs in
            the <strong>Inputs</strong> tab, then fine-tune request details in
            Advanced request options.
          </p>
          {(errors?.["apiConfig.baseUrl"] ||
            errors?.["apiConfig.endpoint"]) && (
            <p className="text-xs text-destructive">
              {errors?.["apiConfig.baseUrl"] ?? errors?.["apiConfig.endpoint"]}
            </p>
          )}

          {legacyEndpointVars.length > 0 && (
            <div className="flex flex-col gap-3 rounded-lg border border-[var(--status-warning-border)] bg-[var(--status-warning-bg)] px-4 py-3 text-xs sm:flex-row sm:items-center sm:justify-between">
              <div className="text-[var(--status-warning-fg)]">
                Legacy endpoint templates detected:{" "}
                {legacyEndpointVars.map((v) => `{{${v}}}`).join(", ")}. Prefer{" "}
                <code className="px-1 py-0.5 rounded bg-background">
                  {"{var}"}
                </code>
                .
              </div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-8 text-xs"
                onClick={() => {
                  const next = (config.endpoint || "").replace(
                    /\{\{([^}]+)\}\}/g,
                    (_m, name) => `{${String(name).trim()}}`,
                  );
                  updateField("apiConfig.endpoint", next);
                }}
              >
                Convert
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-card border-border bg-[--surface-secondary]">
        <CardHeader>
          <CardTitle className="type-h3">Authentication</CardTitle>
          <CardDescription className="type-body-muted">
            Add any fixed credentials this request always needs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="form-field">
              <Label className="form-field-label">Auth type</Label>
              <Select
                value={config.authType || "none"}
                onValueChange={(value) =>
                  updateField("apiConfig.authType", value)
                }
              >
                <SelectTrigger className="h-10 bg-background">
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

            {(config.authType || "none") !== "none" ? (
              <div className="form-field md:col-span-2">
                <Label className="form-field-label">
                  {config.authType === "bearer" && "Bearer token"}
                  {config.authType === "api_key" && "API key"}
                  {config.authType === "basic" && "Base64 credentials"}
                </Label>
                <Input
                  type="password"
                  value={config.authValue || ""}
                  onChange={(e) =>
                    updateField("apiConfig.authValue", e.target.value)
                  }
                  placeholder="Enter token, key, or secret reference"
                  className="h-10 font-mono bg-background"
                />
                {errors?.["apiConfig.authValue"] ? (
                  <p className="form-field-error">
                    {errors["apiConfig.authValue"]}
                  </p>
                ) : null}
                <p className="form-field-note">
                  Tip: use a secret reference such as{" "}
                  <code className="px-1.5 py-0.5 rounded bg-background font-mono text-foreground">
                    secrets.MY_API_KEY
                  </code>{" "}
                  and resolve it server-side.
                </p>
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card border-border bg-[--surface-secondary]">
        <CardHeader>
          <CardTitle className="type-h3">Request Body</CardTitle>
          <CardDescription className="type-body-muted">
            Define the static JSON body. Exact placeholder values such as{" "}
            <code className="px-1 py-0.5 rounded bg-background font-mono">
              {'"{{appearance}}"'}
            </code>{" "}
            become body inputs later.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="type-label">Body JSON</Label>
            {["POST", "PUT", "PATCH"].includes(config.method) &&
            staticBodyDraft ? (
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
                    updateField("apiConfig", {
                      ...config,
                      staticBody: parsed,
                    });
                  } catch {
                    // Ignore formatting when JSON is invalid.
                  }
                }}
              >
                Format JSON
              </Button>
            ) : null}
          </div>

          {["POST", "PUT", "PATCH"].includes(config.method) ? (
            <div className="overflow-hidden rounded-lg border border-border bg-background">
              <CodeMirror
                value={staticBodyDraft}
                onChange={(value) => {
                  setIsBodyDirty(true);
                  setStaticBodyDraft(value);
                  try {
                    const parsed = value.trim().length
                      ? JSON.parse(value)
                      : undefined;
                    setStaticBodyError(null);
                    setIsBodyDirty(false);
                    updateField("apiConfig", {
                      ...config,
                      staticBody: parsed,
                    });
                  } catch {
                    setStaticBodyError("Invalid JSON");
                  }
                }}
                extensions={[json(), EditorView.lineWrapping]}
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
            <div className="rounded-lg border border-dashed border-border bg-background px-4 py-6 text-sm text-muted-foreground">
              Body is only sent for POST, PUT, and PATCH requests.
            </div>
          )}

          {staticBodyError ? (
            <p className="form-field-error">{staticBodyError}</p>
          ) : null}
          <p className="form-field-note">
            Keep the JSON valid. The next tab detects exact placeholder strings
            and maps them to body input paths automatically.
          </p>
        </CardContent>
      </Card>

      <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
        <Card className="shadow-card border-border bg-[--surface-secondary]">
          <CardHeader>
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 text-left"
              >
                <div>
                  <CardTitle className="type-h3">
                    Advanced Request Options
                  </CardTitle>
                  <CardDescription className="type-body-muted mt-1">
                    Optional request shaping for static headers, query params,
                    path helpers, and transport controls.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="h-6 px-2 text-xs">
                    {advancedCount} configured
                  </Badge>
                  {showAdvanced ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </button>
            </CollapsibleTrigger>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="space-y-6">
              {detectedPathParams.length > 0 ? (
                <div className="space-y-3 rounded-lg border border-border bg-background p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="h-6 px-2 text-xs uppercase tracking-wider"
                    >
                      Detected path params
                    </Badge>
                    {detectedPathParams.map((value) => (
                      <Badge
                        key={value}
                        variant="outline"
                        className="font-mono"
                      >
                        {`{${value}}`}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-start">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-9 px-4 border-dashed hover:bg-muted"
                      onClick={handleAddPathParam}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add path param
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-start">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-9 px-4 border-dashed hover:bg-muted"
                    onClick={handleAddPathParam}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add path param helper
                  </Button>
                </div>
              )}

              <div className="grid gap-6 xl:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="type-h3">Static Query Parameters</h3>
                      <p className="type-body-muted">
                        Values that never change between requests.
                      </p>
                    </div>
                    <Badge variant="secondary" className="h-6 px-2 text-xs">
                      {queryParamCount}
                    </Badge>
                  </div>
                  <KeyValueEditor
                    value={staticQueryParams}
                    onChange={(params) =>
                      updateField(
                        "apiConfig.endpoint",
                        buildEndpoint(endpointParts.pathname, params),
                      )
                    }
                    placeholder={{ key: "key", value: "value" }}
                    addLabel="Add query param"
                  />
                  <p className="form-field-note">
                    Dynamic query values belong in <strong>Inputs</strong> with{" "}
                    <strong>Send to → Query</strong>.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="type-h3">Static Headers</h3>
                      <p className="type-body-muted">
                        Fixed headers sent on every request.
                      </p>
                    </div>
                    <Badge variant="secondary" className="h-6 px-2 text-xs">
                      {headerCount}
                    </Badge>
                  </div>
                  <HeaderEditor
                    value={staticHeaders}
                    onChange={(headers) =>
                      updateField("apiConfig", {
                        ...config,
                        staticHeaders: headers,
                      })
                    }
                    addLabel="Add header"
                  />
                  <p className="form-field-note">
                    Dynamic headers belong in <strong>Inputs</strong> with{" "}
                    <strong>Send to → Header</strong>.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="type-h3">Transport Controls</h3>
                  <p className="type-body-muted">
                    Fine-tune success criteria, timeout behavior, and SSL
                    verification.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="form-field">
                    <Label className="form-field-label">Success codes</Label>
                    <Input
                      value={(config.successCodes || []).join(", ")}
                      onChange={(e) =>
                        updateField(
                          "apiConfig.successCodes",
                          e.target.value
                            .split(",")
                            .map((s) => parseInt(s.trim()) || 0)
                            .filter((n) => n > 0),
                        )
                      }
                      placeholder="200, 201"
                      className="h-10 bg-background"
                    />
                  </div>
                  <div className="form-field">
                    <Label className="form-field-label">Timeout (sec)</Label>
                    <Input
                      type="number"
                      value={config.timeoutSeconds}
                      onChange={(e) =>
                        updateField(
                          "apiConfig.timeoutSeconds",
                          parseInt(e.target.value),
                        )
                      }
                      min="1"
                      max="300"
                      className="h-10 bg-background"
                    />
                  </div>
                  <div className="form-field">
                    <Label className="form-field-label">Retry count</Label>
                    <Input
                      type="number"
                      value={config.retryCount}
                      onChange={(e) =>
                        updateField(
                          "apiConfig.retryCount",
                          parseInt(e.target.value),
                        )
                      }
                      min="0"
                      max="5"
                      className="h-10 bg-background"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-3">
                  <Checkbox
                    id="verify_ssl"
                    checked={config.verifySsl}
                    onCheckedChange={(checked) =>
                      updateField("apiConfig.verifySsl", checked as boolean)
                    }
                  />
                  <Label htmlFor="verify_ssl" className="type-label">
                    Verify SSL certificate
                  </Label>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
};

// Header Editor Component
const HeaderEditor: React.FC<{
  value: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
  addLabel?: string;
}> = ({ value, onChange, addLabel = "Add Header" }) => {
  const pairs = Object.entries(value);

  const addPair = () => {
    onChange({ ...value, "": "" });
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
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addPair}
        className="border-dashed text-xs h-8"
      >
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
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addPair}
        className="border-dashed text-xs h-7"
      >
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
}> = ({ value, onChange, placeholder, addLabel = "Add key value pair" }) => {
  const pairs = Object.entries(value);

  const addPair = () => {
    onChange({ ...value, "": "" });
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
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addPair}
        className="border-dashed text-xs h-7"
      >
        <Plus className="h-3 w-3 mr-1" />
        {addLabel}
      </Button>
    </div>
  );
};

// Keep backward compatibility
export const APIConfigStep = APIConfigSection;
