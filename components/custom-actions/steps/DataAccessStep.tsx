import React, { useMemo } from "react";
import { CustomAction, TestResult } from "@/types/customActions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Loader2, Shield, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type DataAccess = "full" | "limited";

function safeJsonParse(value: unknown): { ok: true; json: any } | { ok: false } {
  if (typeof value !== "string") return { ok: false };
  try {
    return { ok: true, json: JSON.parse(value) };
  } catch {
    return { ok: false };
  }
}

function normalizeJsonPath(path: string): string {
  return path.trim().replace(/^\$\./, "");
}

// Minimal JSONPath-ish getter supporting:
// - $.a.b
// - $.a[0].b
// - a.b[0]
function getByPath(obj: any, rawPath: string): any {
  const path = normalizeJsonPath(rawPath);
  if (!path) return obj;

  const parts: Array<string | number> = [];
  const re = /([^.[\]]+)|\[(\d+)\]/g;
  let match: RegExpExecArray | null = null;
  while ((match = re.exec(path))) {
    if (match[1]) parts.push(match[1]);
    if (match[2]) parts.push(Number(match[2]));
  }

  let cur: any = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = cur[p as any];
  }
  return cur;
}

function formatPreview(value: any): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

interface Props {
  formData: CustomAction;
  updateField: (path: string, value: any) => void;
  testResult: TestResult | null;
  saving: boolean;
  onBack: () => void;
  onSave: () => void;
}

export const DataAccessStep: React.FC<Props> = ({
  formData,
  updateField,
  testResult,
  saving,
  onBack,
  onSave,
}) => {
  const dataAccess: DataAccess = (formData.apiConfig.responseMapping ? "limited" : "full") as DataAccess;

  const rawResponse = useMemo(() => {
    if (!testResult?.responseBody) return null;
    if (typeof testResult.responseBody === "string") return testResult.responseBody;
    return JSON.stringify(testResult.responseBody, null, 2);
  }, [testResult?.responseBody]);

  const parsed = useMemo(() => safeJsonParse(rawResponse), [rawResponse]);

  const preview = useMemo(() => {
    if (!rawResponse) return null;

    // Not JSON: just return raw response as preview (both modes)
    if (!parsed.ok) return { mode: dataAccess, text: rawResponse, mappedEmpty: false };

    if (dataAccess === "full") {
      return { mode: dataAccess, text: formatPreview(parsed.json), mappedEmpty: false };
    }

    const mapping = formData.apiConfig.responseMapping || "";
    if (!mapping.trim()) {
      return {
        mode: dataAccess,
        text: formatPreview(parsed.json),
        mappedEmpty: false,
      };
    }

    const extracted = getByPath(parsed.json, mapping);
    const extractedText = formatPreview(extracted);

    // Your choice: fallback to full response if mapping is empty.
    if (!extractedText) {
      return { mode: dataAccess, text: formatPreview(parsed.json), mappedEmpty: true };
    }

    return { mode: dataAccess, text: extractedText, mappedEmpty: false };
  }, [dataAccess, formData.apiConfig.responseMapping, parsed, rawResponse]);

  const setDataAccess = (value: DataAccess) => {
    if (value === "full") {
      // Reduce surprises: full access ignores mapping; clear it.
      updateField("apiConfig.responseMapping", "");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="type-section-title">Data Access</h2>
        <p className="type-body-muted">
          Control how much of the API response your AI agent can use. Maximum response size is 20KB.
        </p>
      </div>

      <Card className="shadow-none border-border bg-[--surface-secondary]">
        <CardHeader>
          <CardTitle className="type-h3 flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Security & Access Level
          </CardTitle>
          <CardDescription className="type-body-muted italic leading-relaxed">Choose whether the agent sees the full result or just a specific part.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={dataAccess} onValueChange={(v) => setDataAccess(v as DataAccess)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={cn(
              "flex items-start gap-3 rounded-lg border p-4 transition-all duration-200 cursor-pointer",
              dataAccess === "full" ? "bg-primary/5 border-primary shadow-sm ring-1 ring-primary/20" : "bg-background border-border hover:border-border/80"
            )} onClick={() => setDataAccess("full")}>
              <RadioGroupItem value="full" id="data_access_full" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="data_access_full" className="type-label block mb-1">
                  Full data access
                </Label>
                <p className="type-caption leading-relaxed">
                  The agent can access the full API response to produce comprehensive answers.
                </p>
              </div>
            </div>

            <div className={cn(
              "flex items-start gap-3 rounded-lg border p-4 transition-all duration-200 cursor-pointer",
              dataAccess === "limited" ? "bg-primary/5 border-primary shadow-sm ring-1 ring-primary/20" : "bg-background border-border hover:border-border/80"
            )} onClick={() => setDataAccess("limited")}>
              <RadioGroupItem value="limited" id="data_access_limited" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="data_access_limited" className="type-label block mb-1">
                  Limited data access
                </Label>
                <p className="type-caption leading-relaxed">
                  The agent only uses the extracted value from your mapping.
                </p>
              </div>
            </div>
          </RadioGroup>

          {dataAccess === "limited" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Response mapping (JSONPath)</Label>
                <Badge variant="secondary" className="font-mono">
                  e.g. $.data.price
                </Badge>
              </div>
              <Input
                value={formData.apiConfig.responseMapping || ""}
                onChange={(e) => updateField("apiConfig.responseMapping", e.target.value)}
                placeholder="$.data.price"
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                This is applied server-side during execution; we preview using a minimal JSON path reader.
              </p>
            </div>
          )}

          <div className="rounded-md bg-muted p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Shield className="h-3.5 w-3.5" />
              Preview (from last test)
            </div>

            {!testResult ? (
              <div className="text-xs text-muted-foreground">Run a test to preview the response here.</div>
            ) : preview ? (
              <div className="space-y-2">
                {preview.mappedEmpty && (
                  <div className="text-xs text-muted-foreground">
                    Mapping returned empty; falling back to full response.
                  </div>
                )}
                <pre className="font-mono text-xs whitespace-pre-wrap break-words max-h-64 overflow-auto">
                  {preview.text}
                </pre>
              </div>
            ) : (
              <div className="text-xs text-muted-foreground">No response body available.</div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-8 border-t border-border mt-8">
        <Button variant="ghost" onClick={onBack} className="px-8">
          ← Back
        </Button>

        <Button
          onClick={onSave}
          disabled={saving}
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

