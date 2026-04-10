import React from "react";
import { Badge } from "@/components/ui/badge";

interface Props {
  schema?: Record<string, any>;
}

function inferType(value: any) {
  if (!value || typeof value !== "object") return "any";
  if (typeof value.type === "string") return value.type;
  if (Array.isArray(value.type)) return value.type.join(" | ");
  return "any";
}

export function McpSchemaPreview({ schema }: Props) {
  const normalizedSchema =
    schema && typeof schema === "object"
      ? schema
      : { type: "object", properties: {}, required: [] };
  const properties = normalizedSchema.properties || {};
  const required = new Set<string>(normalizedSchema.required || []);
  const propertyEntries = Object.entries(properties);

  if (propertyEntries.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border/70 bg-muted/30 px-3 py-4 text-sm text-muted-foreground">
        This tool does not declare any input parameters.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline">{propertyEntries.length} parameter{propertyEntries.length === 1 ? "" : "s"}</Badge>
        <Badge variant="outline">{required.size} required</Badge>
      </div>

      <div className="space-y-2">
        {propertyEntries.map(([name, config]) => {
          const fieldConfig = config as Record<string, any> | undefined;

          return (
          <div
            key={name}
            className="rounded-lg border border-border/70 bg-background/80 px-3 py-2"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-sm font-medium">{name}</span>
              <Badge variant="secondary" className="font-mono text-[11px]">
                {inferType(fieldConfig)}
              </Badge>
              {required.has(name) ? <Badge>Required</Badge> : null}
            </div>
            {fieldConfig?.description ? (
              <p className="mt-1 text-sm text-muted-foreground">{fieldConfig.description}</p>
            ) : null}
          </div>
          );
        })}
      </div>

      <pre className="overflow-x-auto rounded-lg bg-slate-950 p-3 text-xs leading-5 text-slate-100">
        {JSON.stringify(normalizedSchema, null, 2)}
      </pre>
    </div>
  );
}
