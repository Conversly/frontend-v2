import React, { useEffect, useMemo, useState } from "react";
import { ToolParameter } from "@/types/customActions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Trash2,
  Plus,
  ChevronDown,
  Sparkles,
  Settings2,
  ShieldCheck,
  Info,
} from "lucide-react";
import type { ParamSource } from "@/types/customActions";
import {
  useEditorFormData,
  useEditorReplaceParameters,
  useEditorUpdateField,
} from "@/store/custom-action-editor";
import {
  collectBodyTemplateBindings,
  CONTACT_FIELD_OPTIONS,
  extractExactTemplateVar,
  extractLegacyVariables,
  extractPathParams,
  formatBindingSummary,
  listDotPaths,
} from "../parameter-utils";

function formatEditableValue(value: any): string {
  if (value === undefined || value === null) return "";
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

function parseDefaultValue(paramType: ToolParameter["type"], raw: string): any {
  if (!raw.trim().length) return undefined;
  if (paramType === "object" || paramType === "array") {
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  }
  if (paramType === "number") {
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : raw;
  }
  if (paramType === "integer") {
    const parsed = Number.parseInt(raw, 10);
    return Number.isFinite(parsed) ? parsed : raw;
  }
  if (paramType === "boolean") {
    if (raw === "true") return true;
    if (raw === "false") return false;
  }
  return raw;
}

function canAddTopLevelContactField(
  contactField?: string,
): contactField is "externalId" | "email" | "name" | "phone" {
  return ["externalId", "email", "name", "phone"].includes(contactField || "");
}

export const ParametersStep: React.FC = () => {
  const [advancedOpen, setAdvancedOpen] = useState<Record<number, boolean>>({});
  const formData = useEditorFormData();
  const updateField = useEditorUpdateField();
  const replaceParameters = useEditorReplaceParameters();
  const endpoint = formData.apiConfig.endpoint || "";
  const staticBody = formData.apiConfig.staticBody;
  const staticHeaders = formData.apiConfig.staticHeaders ?? {};

  const detectedPathParams = useMemo(
    () => extractPathParams(endpoint),
    [endpoint],
  );
  const detectedLegacyVariables = useMemo(
    () => extractLegacyVariables(endpoint),
    [endpoint],
  );
  const bodyPathSuggestions = useMemo(
    () => listDotPaths(staticBody),
    [staticBody],
  );
  const detectedBodyBindings = useMemo(() => {
    if (
      !staticBody ||
      typeof staticBody !== "object" ||
      Array.isArray(staticBody)
    )
      return [];
    return collectBodyTemplateBindings(staticBody);
  }, [staticBody]);

  const hasLegacyTemplates = useMemo(() => {
    if (detectedLegacyVariables.length > 0) return true;
    if (
      Object.values(staticHeaders).some(
        (value) => typeof value === "string" && value.includes("{{"),
      )
    )
      return true;
    return false;
  }, [detectedLegacyVariables.length, staticHeaders]);

  const existingParamNames = new Set(
    formData.parameters.map((param) => param.name),
  );
  const missingPathParams = detectedPathParams.filter(
    (value) => !existingParamNames.has(value),
  );
  const missingLegacyVariables = detectedLegacyVariables.filter(
    (value) => !existingParamNames.has(value),
  );
  const missingBodyBindings = detectedBodyBindings.filter(
    (binding) => !existingParamNames.has(binding.name),
  );

  useEffect(() => {
    if (detectedBodyBindings.length === 0) return;

    const nextParams: ToolParameter[] = [...formData.parameters];
    const byName = new Map(
      nextParams.map((param, index) => [param.name, index] as const),
    );
    let changed = false;

    for (const binding of detectedBodyBindings) {
      const name = (binding.name || "").trim();
      const bodyPath = (binding.bodyPath || "").trim();
      if (!name || !bodyPath) continue;

      const index = byName.get(name);
      if (index === undefined) {
        nextParams.push({
          name,
          type: "string",
          description: `Value for the ${bodyPath.replace(/\./g, " ")} field in the request body.`,
          required: true,
          location: "body",
          bodyPath,
          source: "user",
        });
        byName.set(name, nextParams.length - 1);
        changed = true;
        continue;
      }

      const current = nextParams[index];
      if (!current.location) {
        nextParams[index] = { ...current, location: "body", bodyPath };
        changed = true;
        continue;
      }
      if (
        current.location === "body" &&
        !(current.bodyPath || "").trim().length
      ) {
        nextParams[index] = { ...current, bodyPath };
        changed = true;
      }
    }

    if (changed) replaceParameters(nextParams);
  }, [detectedBodyBindings, formData.parameters, replaceParameters]);

  const addDetectedParameters = () => {
    const newParams: ToolParameter[] = [
      ...missingPathParams.map((name) => ({
        name,
        type: "string" as const,
        description: `Value for the ${name.replace(/_/g, " ")} path segment.`,
        required: true,
        location: "path" as const,
        source: "user" as const,
      })),
      ...missingLegacyVariables.map((name) => ({
        name,
        type: "string" as const,
        description: `Value for the ${name.replace(/_/g, " ")} field.`,
        required: true,
        location: "path" as const,
        source: "user" as const,
      })),
      ...missingBodyBindings.map(({ name, bodyPath }) => ({
        name,
        type: "string" as const,
        description: `Value for the ${bodyPath.replace(/\./g, " ")} field in the request body.`,
        required: true,
        location: "body" as const,
        bodyPath,
        source: "user" as const,
      })),
    ];
    replaceParameters([...formData.parameters, ...newParams]);
  };

  const convertLegacyTemplatesToBindings = () => {
    const nextEndpoint = endpoint.replace(
      /\{\{([^}]+)\}\}/g,
      (_match, name) => `{${String(name).trim()}}`,
    );
    if (nextEndpoint !== endpoint) {
      updateField("apiConfig.endpoint", nextEndpoint);
    }

    const nextParams: ToolParameter[] = [...formData.parameters];
    const byName = new Map(
      nextParams.map((param, index) => [param.name, index] as const),
    );

    for (const [key, value] of Object.entries(staticHeaders)) {
      const name = extractExactTemplateVar(value);
      if (!name) continue;
      const index = byName.get(name);
      if (index === undefined) {
        nextParams.push({
          name,
          type: "string",
          description: `Value for the ${key} header.`,
          required: true,
          location: "header",
          key,
          source: "user",
        });
        byName.set(name, nextParams.length - 1);
        continue;
      }
      nextParams[index] = {
        ...nextParams[index],
        location: "header",
        key: nextParams[index].key || key,
        source: nextParams[index].source ?? "user",
      };
    }

    for (const binding of detectedBodyBindings) {
      const index = byName.get(binding.name);
      if (index === undefined) {
        nextParams.push({
          name: binding.name,
          type: "string",
          description: `Value for the ${binding.bodyPath.replace(/\./g, " ")} field in the request body.`,
          required: true,
          location: "body",
          bodyPath: binding.bodyPath,
          source: "user",
        });
        byName.set(binding.name, nextParams.length - 1);
        continue;
      }
      nextParams[index] = {
        ...nextParams[index],
        location: "body",
        bodyPath: nextParams[index].bodyPath || binding.bodyPath,
        source: nextParams[index].source ?? "user",
      };
    }

    replaceParameters(nextParams);
  };

  const addParameter = () => {
    const newParam: ToolParameter = {
      name: "",
      type: "string",
      description: "",
      required: false,
      location: "query",
      key: "",
      source: "user",
    };
    replaceParameters([...formData.parameters, newParam]);
  };

  const updateParameters = (nextParameters: ToolParameter[]) => {
    replaceParameters(nextParameters);
  };

  const updateParameter = (
    index: number,
    field: keyof ToolParameter,
    value: any,
  ) => {
    const next = [...formData.parameters];
    const current = next[index];
    const updated = { ...current, [field]: value };

    if (field === "name") {
      const nextName = (value ?? "").toString();
      if (updated.location === "query" || updated.location === "header") {
        if (!updated.key || updated.key === current.name)
          updated.key = nextName;
      }
      if (
        updated.location === "body" &&
        (!updated.bodyPath || updated.bodyPath === current.name)
      ) {
        updated.bodyPath = nextName;
      }
    }

    next[index] = updated;
    updateParameters(next);
  };

  const patchParameter = (index: number, patch: Partial<ToolParameter>) => {
    const next = [...formData.parameters];
    next[index] = { ...next[index], ...patch };
    updateParameters(next);
  };

  const removeParameter = (index: number) => {
    updateParameters(
      formData.parameters.filter((_, currentIndex) => currentIndex !== index),
    );
  };

  const ensureContactAccess = (contactField?: string) => {
    const nextAccess =
      (formData.accessLevel || "anonymous") === "anonymous"
        ? "user"
        : formData.accessLevel || "user";
    if (nextAccess !== formData.accessLevel) {
      updateField("accessLevel", nextAccess);
    }
    if (!canAddTopLevelContactField(contactField)) return;

    const currentFields = formData.requiredContactFields || [];
    if (!currentFields.includes(contactField)) {
      updateField("requiredContactFields", [...currentFields, contactField]);
    }
  };

  const handleSourceChange = (index: number, nextSource: ParamSource) => {
    const current = formData.parameters[index];
    const next = [...formData.parameters];

    if (nextSource === "contact") {
      next[index] = {
        ...current,
        source: "contact",
        type: "string",
        required: false,
        default: undefined,
      };
      updateParameters(next);
      ensureContactAccess(current.contactField);
      return;
    }

    if (nextSource === "fixed") {
      next[index] = {
        ...current,
        source: "fixed",
        required: false,
        contactField: undefined,
        default: current.default !== undefined ? current.default : "",
      };
      updateParameters(next);
      return;
    }

    next[index] = {
      ...current,
      source: "user",
      contactField: undefined,
    };
    updateParameters(next);
  };

  const handleContactFieldChange = (index: number, value: string) => {
    patchParameter(index, { contactField: value });
    ensureContactAccess(value);
  };

  const aiVisibleParams = formData.parameters.filter(
    (param) =>
      param.source !== "contact" &&
      param.source !== "fixed" &&
      param.name.trim().length > 0,
  );
  const contactParams = formData.parameters.filter(
    (param) => param.source === "contact" && param.name.trim().length > 0,
  );
  const fixedParams = formData.parameters.filter(
    (param) => param.source === "fixed" && param.name.trim().length > 0,
  );

  return (
    <div className="space-y-6">
      {hasLegacyTemplates && (
        <div className="rounded-lg border border-[var(--status-warning-border)] bg-[var(--status-warning-bg)] px-4 py-3 text-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[var(--status-warning-fg)]">
              Legacy template markers were detected in this request. Convert
              them into explicit input bindings for a cleaner setup.
            </p>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="h-8 text-xs"
              onClick={convertLegacyTemplatesToBindings}
            >
              Convert templates
            </Button>
          </div>
        </div>
      )}

      {(missingPathParams.length > 0 ||
        missingLegacyVariables.length > 0 ||
        missingBodyBindings.length > 0) && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 flex items-center justify-between gap-4">
          <div className="flex gap-3">
            <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-primary">
                {missingPathParams.length +
                  missingLegacyVariables.length +
                  missingBodyBindings.length}{" "}
                input
                {missingPathParams.length +
                  missingLegacyVariables.length +
                  missingBodyBindings.length !==
                1
                  ? "s"
                  : ""}{" "}
                detected
              </p>
              <p className="text-sm text-primary/80 mt-0.5">
                Import them now to avoid re-entering request fields by hand.
              </p>
            </div>
          </div>
          <Button size="sm" onClick={addDetectedParameters}>
            <Plus className="h-4 w-4 mr-2" />
            Add all
          </Button>
        </div>
      )}

      {formData.parameters.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/40">
          <p className="text-muted-foreground mb-2">No dynamic inputs yet</p>
          <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
            Import from cURL to prefill request inputs automatically, or add one
            manually if only a few values need to change per request.
          </p>
          <Button variant="outline" onClick={addParameter}>
            <Plus className="h-4 w-4 mr-2" />
            Add input manually
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {formData.parameters.map((param, index) => {
          const source = param.source || "user";
          const open = !!advancedOpen[index];

          return (
            <Card
              key={index}
              className="shadow-card border-border bg-[--surface-secondary]"
            >
              <CardContent className="p-4 space-y-4">
                <div className="grid gap-3 xl:grid-cols-[minmax(0,1.2fr)_140px_180px_auto_auto] items-start">
                  <div className="space-y-1.5">
                    <Label className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      Input name
                    </Label>
                    <Input
                      value={param.name}
                      onChange={(e) =>
                        updateParameter(
                          index,
                          "name",
                          e.target.value.toLowerCase().replace(/\s+/g, "_"),
                        )
                      }
                      placeholder="product_id"
                      className="font-mono bg-background h-10"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      Type
                    </Label>
                    <Select
                      value={param.type}
                      onValueChange={(value) =>
                        updateParameter(index, "type", value)
                      }
                    >
                      <SelectTrigger className="bg-background h-10">
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

                  <div className="space-y-1.5">
                    <Label className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      Value source
                    </Label>
                    <Select
                      value={source}
                      onValueChange={(value) =>
                        handleSourceChange(index, value as ParamSource)
                      }
                    >
                      <SelectTrigger className="bg-background h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">Customer input</SelectItem>
                        <SelectItem value="contact">
                          Use contact field
                        </SelectItem>
                        <SelectItem value="fixed">Fixed value</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    className="mt-6 h-10 w-10 shrink-0"
                    onClick={() =>
                      setAdvancedOpen((current) => ({
                        ...current,
                        [index]: !current[index],
                      }))
                    }
                  >
                    {open ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <Settings2 className="h-4 w-4" />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="mt-6 h-10 w-10 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => removeParameter(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(260px,420px)] lg:items-start">
                  <div className="flex justify-end lg:col-span-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full text-muted-foreground"
                        >
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="left"
                        align="start"
                        className="max-w-xs"
                      >
                        <p className="font-semibold">Value source options</p>
                        <p className="mt-1">
                          <span className="font-medium">Customer input:</span>{" "}
                          AI reads the conversation and fills this value.
                        </p>
                        <p className="mt-1">
                          <span className="font-medium">
                            Use contact field:
                          </span>{" "}
                          This value comes from the contact record and is not
                          shown to the AI.
                        </p>
                        <p className="mt-1">
                          <span className="font-medium">Fixed value:</span>{" "}
                          This value is always the saved value and is not shown
                          to the AI.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  {source === "contact" ? (
                    <div className="rounded-lg border border-blue-200 bg-blue-50/70 px-3 py-3 space-y-3">
                      <div className="flex items-center gap-2 text-sm font-medium text-blue-900">
                        <ShieldCheck className="h-4 w-4" />
                        Contact field
                      </div>
                      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                        <Select
                          value={param.contactField || ""}
                          onValueChange={(value) =>
                            handleContactFieldChange(index, value)
                          }
                        >
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Choose a contact field" />
                          </SelectTrigger>
                          <SelectContent>
                            {CONTACT_FIELD_OPTIONS.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {param.contactField === "metadata." && (
                          <Input
                            value={(param.contactField || "").replace(
                              "metadata.",
                              "",
                            )}
                            onChange={(e) =>
                              handleContactFieldChange(
                                index,
                                `metadata.${e.target.value.trim()}`,
                              )
                            }
                            placeholder="metadata key"
                            className="bg-background font-mono"
                          />
                        )}
                      </div>
                    </div>
                  ) : source === "fixed" ? (
                    <div className="rounded-lg border border-border bg-muted/20 px-3 py-3 space-y-2">
                      <Label className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        Fixed value
                      </Label>
                      <Input
                        value={formatEditableValue(param.default)}
                        onChange={(e) =>
                          patchParameter(index, {
                            default: parseDefaultValue(
                              param.type,
                              e.target.value,
                            ),
                          })
                        }
                        placeholder="Always send this value"
                        className="bg-background"
                      />
                    </div>
                  ) : null}
                </div>

                <Collapsible
                  open={open}
                  onOpenChange={(nextOpen) =>
                    setAdvancedOpen((current) => ({
                      ...current,
                      [index]: nextOpen,
                    }))
                  }
                >
                  <CollapsibleContent className="space-y-4 pt-1">
                    {source === "user" && (
                      <div className="space-y-2 border-t border-border/60 pt-4">
                        <Label>Description</Label>
                        <Textarea
                          value={param.description}
                          onChange={(e) =>
                            updateParameter(index, "description", e.target.value)
                          }
                          placeholder="Explain what this value means and how the AI should recognize it."
                          rows={2}
                        />
                      </div>
                    )}

                    <div className="grid gap-4 border-t border-border/60 pt-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label>Send to</Label>
                        <Select
                          value={param.location}
                          onValueChange={(value) => {
                            if (value === "query" || value === "header") {
                              patchParameter(index, {
                                location: value,
                                key:
                                  (param.key ?? param.name ?? "").trim() ||
                                  param.name ||
                                  "",
                                bodyPath: undefined,
                              });
                              return;
                            }
                            if (value === "body") {
                              patchParameter(index, {
                                location: "body",
                                bodyPath:
                                  (param.bodyPath ?? param.name ?? "").trim() ||
                                  param.name ||
                                  "",
                                key: undefined,
                              });
                              return;
                            }
                            patchParameter(index, {
                              location: value as ToolParameter["location"],
                              key: undefined,
                              bodyPath: undefined,
                            });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="path">Path</SelectItem>
                            <SelectItem value="query">Query</SelectItem>
                            <SelectItem value="header">Header</SelectItem>
                            <SelectItem value="body">Body</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {(param.location === "query" ||
                        param.location === "header") && (
                        <div className="space-y-2 md:col-span-2">
                          <Label>
                            {param.location === "query"
                              ? "Query parameter name"
                              : "Header name"}
                          </Label>
                          <Input
                            value={param.key ?? param.name ?? ""}
                            onChange={(e) =>
                              patchParameter(index, { key: e.target.value })
                            }
                            placeholder={param.name || "key"}
                            className="font-mono"
                          />
                        </div>
                      )}

                      {param.location === "body" && (
                        <div className="space-y-2 md:col-span-2">
                          <Label>Body field path</Label>
                          <Input
                            value={param.bodyPath ?? ""}
                            onChange={(e) =>
                              patchParameter(index, {
                                bodyPath: e.target.value,
                              })
                            }
                            placeholder="customer.email"
                            className="font-mono"
                          />
                          {bodyPathSuggestions.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {bodyPathSuggestions
                                .filter((path) =>
                                  (param.name || "").trim().length
                                    ? path
                                        .toLowerCase()
                                        .includes(
                                          (param.name || "").toLowerCase(),
                                        )
                                    : true,
                                )
                                .slice(0, 8)
                                .map((path) => (
                                  <Badge
                                    key={path}
                                    variant="secondary"
                                    className="cursor-pointer font-mono"
                                    onClick={() =>
                                      patchParameter(index, {
                                        bodyPath: path,
                                      })
                                    }
                                  >
                                    {path}
                                  </Badge>
                                ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {source === "user" && (
                      <div className="grid gap-4 border-t border-border/60 pt-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Fallback value</Label>
                          <Input
                            value={formatEditableValue(param.default)}
                            onChange={(e) =>
                              patchParameter(index, {
                                default: parseDefaultValue(
                                  param.type,
                                  e.target.value,
                                ),
                              })
                            }
                            placeholder="Optional fallback"
                          />
                        </div>
                        <div className="flex items-end pb-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`required-${index}`}
                              checked={!!param.required}
                              onCheckedChange={(checked) =>
                                updateParameter(
                                  index,
                                  "required",
                                  checked as boolean,
                                )
                              }
                            />
                            <Label htmlFor={`required-${index}`}>
                              Required
                            </Label>
                          </div>
                        </div>
                      </div>
                    )}

                    {source === "user" && (
                      <div className="grid gap-4 border-t border-border/60 pt-4 md:grid-cols-2">
                        {param.type === "string" && (
                          <>
                            <div className="space-y-2">
                              <Label>Allowed values</Label>
                              <Input
                                value={param.enum?.join(", ") || ""}
                                onChange={(e) =>
                                  updateParameter(
                                    index,
                                    "enum",
                                    e.target.value
                                      .split(",")
                                      .map((item) => item.trim())
                                      .filter(Boolean),
                                  )
                                }
                                placeholder="USD, EUR, GBP"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Pattern (regex)</Label>
                              <Input
                                value={param.pattern || ""}
                                onChange={(e) =>
                                  updateParameter(
                                    index,
                                    "pattern",
                                    e.target.value,
                                  )
                                }
                                placeholder="^[A-Z0-9-]+$"
                                className="font-mono"
                              />
                            </div>
                          </>
                        )}

                        {(param.type === "number" ||
                          param.type === "integer") && (
                          <>
                            <div className="space-y-2">
                              <Label>Minimum</Label>
                              <Input
                                type="number"
                                value={param.minimum ?? ""}
                                onChange={(e) =>
                                  updateParameter(
                                    index,
                                    "minimum",
                                    e.target.value
                                      ? parseFloat(e.target.value)
                                      : undefined,
                                  )
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Maximum</Label>
                              <Input
                                type="number"
                                value={param.maximum ?? ""}
                                onChange={(e) =>
                                  updateParameter(
                                    index,
                                    "maximum",
                                    e.target.value
                                      ? parseFloat(e.target.value)
                                      : undefined,
                                  )
                                }
                              />
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {formData.parameters.length > 0 && (
        <Button
          variant="outline"
          onClick={addParameter}
          className="w-full border-dashed"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add another input
        </Button>
      )}

      {formData.parameters.length > 0 && (
        <Card className="bg-muted/40 border-border">
          <CardContent className="pt-6 space-y-4">
            {aiVisibleParams.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">AI will extract</h4>
                <pre className="text-xs bg-background p-4 rounded-md overflow-auto">
                  {JSON.stringify(
                    aiVisibleParams.reduce<Record<string, any>>(
                      (acc, param) => {
                        acc[param.name] =
                          param.default !== undefined
                            ? param.default
                            : `<${param.type}>`;
                        return acc;
                      },
                      {},
                    ),
                    null,
                    2,
                  )}
                </pre>
              </div>
            )}

            {contactParams.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-2">
                  Hidden from AI · Contact fields
                </p>
                <div className="flex flex-wrap gap-2">
                  {contactParams.map((param) => (
                    <Badge
                      key={param.name}
                      variant="secondary"
                      className="font-mono"
                    >
                      {param.name} ← {param.contactField}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {fixedParams.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-2">
                  Hidden from AI · Fixed values
                </p>
                <div className="flex flex-wrap gap-2">
                  {fixedParams.map((param) => (
                    <Badge
                      key={param.name}
                      variant="secondary"
                      className="font-mono"
                    >
                      {param.name} = {formatEditableValue(param.default) || "—"}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
