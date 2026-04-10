import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { McpSchemaPreview } from "./McpSchemaPreview";
import { McpAccessLevel, McpInputBinding, McpToolSnapshot } from "@/types/mcp";

interface Props {
  tools: McpToolSnapshot[];
  onChange: (tools: McpToolSnapshot[]) => void;
  disabled?: boolean;
}

const CONTACT_FIELDS = ["externalId", "email", "name", "phone"];

function getSchemaProperties(tool: McpToolSnapshot): string[] {
  const properties = tool.inputSchema?.properties;
  if (!properties || typeof properties !== "object") {
    return [];
  }

  return Object.keys(properties);
}

function upsertBinding(
  bindings: McpInputBinding[],
  parameterName: string,
  contactField: string | null
) {
  const next = bindings.filter((binding) => binding.parameterName !== parameterName);
  if (!contactField) {
    return next;
  }

  return [
    ...next,
    {
      parameterName,
      source: "contact" as const,
      contactField,
    },
  ];
}

function getBindingContactField(tool: McpToolSnapshot, parameterName: string) {
  return tool.inputBindings.find((binding) => binding.parameterName === parameterName)?.contactField ?? "none";
}

export function McpToolTable({ tools, onChange, disabled = false }: Props) {
  const patchTool = (toolId: string, update: Partial<McpToolSnapshot>) => {
    onChange(
      tools.map((tool) => (tool.id === toolId ? { ...tool, ...update } : tool))
    );
  };

  if (tools.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/20 p-6 text-center text-sm text-muted-foreground">
        Verify a server connection to discover tools and configure which ones should be exposed to the chatbot.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tools.map((tool) => {
        const schemaProperties = getSchemaProperties(tool);

        return (
          <Card key={tool.id} className="border-border/70 shadow-none">
            <CardHeader className="gap-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-base">{tool.originalName}</CardTitle>
                    <Badge variant={tool.isEnabled ? "default" : "outline"}>
                      {tool.isEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                    <Badge variant="secondary" className="font-mono text-[11px]">
                      {tool.llmToolName || "Generated on save"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {tool.description || "No description returned by the MCP server."}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Label htmlFor={`tool-enabled-${tool.id}`} className="text-sm">
                    Enable tool
                  </Label>
                  <Switch
                    id={`tool-enabled-${tool.id}`}
                    checked={tool.isEnabled}
                    disabled={disabled}
                    onCheckedChange={(checked) => patchTool(tool.id, { isEnabled: checked })}
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-2">
                  <Label>Access level</Label>
                  <Select
                    value={tool.accessLevel}
                    disabled={disabled}
                    onValueChange={(value) =>
                      patchTool(tool.id, {
                        accessLevel: value as McpAccessLevel,
                        requiredContactFields:
                          value === "anonymous" ? [] : tool.requiredContactFields,
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select who can use this tool" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="anonymous">Everyone</SelectItem>
                      <SelectItem value="visitor">Returning visitors</SelectItem>
                      <SelectItem value="user">Verified users only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Required contact fields</Label>
                  <div className="flex min-h-10 flex-wrap gap-2 rounded-lg border border-border/70 bg-muted/20 p-2">
                    {CONTACT_FIELDS.map((field) => {
                      const selected = tool.requiredContactFields.includes(field);
                      const accessLocked = tool.accessLevel === "anonymous";

                      return (
                        <Badge
                          key={field}
                          variant={selected ? "default" : "outline"}
                          className={cn(
                            "cursor-pointer font-mono text-[11px]",
                            accessLocked || disabled ? "cursor-not-allowed opacity-50" : "hover:bg-muted"
                          )}
                          onClick={() => {
                            if (accessLocked || disabled) return;
                            const next = selected
                              ? tool.requiredContactFields.filter((value) => value !== field)
                              : [...tool.requiredContactFields, field];
                            patchTool(tool.id, { requiredContactFields: next });
                          }}
                        >
                          {field}
                        </Badge>
                      );
                    })}
                    {tool.accessLevel === "anonymous" ? (
                      <span className="text-xs text-muted-foreground">
                        Not needed for anonymous access.
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <Label>Contact-backed parameter bindings</Label>
                  <p className="text-sm text-muted-foreground">
                    Bind sensitive parameters to verified contact fields. Bound params are injected server-side and override model-supplied values.
                  </p>
                </div>

                {schemaProperties.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-border/70 bg-muted/20 px-3 py-4 text-sm text-muted-foreground">
                    No schema properties available for binding on this tool.
                  </div>
                ) : (
                  <div className="grid gap-3 md:grid-cols-2">
                    {schemaProperties.map((parameterName) => (
                      <div
                        key={parameterName}
                        className="rounded-lg border border-border/70 bg-background/80 p-3"
                      >
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <span className="font-mono text-sm">{parameterName}</span>
                          {tool.suggestedBindings.some(
                            (binding) => binding.parameterName === parameterName
                          ) ? (
                            <Badge variant="secondary">Suggested</Badge>
                          ) : null}
                        </div>

                        <Select
                          value={getBindingContactField(tool, parameterName)}
                          disabled={disabled}
                          onValueChange={(value) =>
                            patchTool(tool.id, {
                              inputBindings: upsertBinding(
                                tool.inputBindings,
                                parameterName,
                                value === "none" ? null : value
                              ),
                            })
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Let the model decide" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Let the model decide</SelectItem>
                            {CONTACT_FIELDS.map((field) => (
                              <SelectItem key={field} value={field}>
                                Use contact.{field}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Accordion type="single" collapsible className="rounded-lg border border-border/70 px-4">
                <AccordionItem value={`schema-${tool.id}`} className="border-none">
                  <AccordionTrigger className="py-3 text-sm">
                    Inspect schema
                  </AccordionTrigger>
                  <AccordionContent>
                    <McpSchemaPreview schema={tool.inputSchema} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
