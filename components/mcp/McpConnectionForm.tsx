import React, { useEffect, useMemo, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useCreateMcpConnection, useUpdateMcpConnection, useVerifyMcpConnection } from "@/services/mcp";
import {
  CreateMcpConnectionInput,
  McpConnectionFormValues,
  McpConnectionResponse,
  McpToolSnapshot,
  UpdateMcpConnectionInput,
} from "@/types/mcp";
import { AlertCircle, CheckCircle2, Loader2, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import { McpToolTable } from "./McpToolTable";

interface Props {
  chatbotId: string;
  existingConnection?: McpConnectionResponse | null;
  onCancel: () => void;
  onSaved: () => void;
}

function createClientToolId(originalName: string) {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${originalName}-${Math.random().toString(36).slice(2, 10)}`;
}

function buildInitialValues(connection?: McpConnectionResponse | null): McpConnectionFormValues {
  return {
    name: connection?.name || "",
    serverUrl: connection?.serverUrl || "",
    authType: connection?.authType || "none",
    authValue: "",
    authHeader: connection?.authHeader || "X-API-Key",
    isEnabled: connection?.isEnabled ?? true,
    tools: connection?.tools || [],
  };
}

function buildVerifyFingerprint(values: McpConnectionFormValues) {
  return JSON.stringify({
    serverUrl: values.serverUrl.trim(),
    authType: values.authType,
    authValue: values.authValue,
    authHeader: values.authType === "api_key" ? values.authHeader.trim() : "",
  });
}

function verifyResponseToTools(
  tools: Array<{
    originalName: string;
    description: string;
    inputSchema: Record<string, any>;
    suggestedBindings: McpToolSnapshot["suggestedBindings"];
  }>
): McpToolSnapshot[] {
  return tools.map((tool) => ({
    id: createClientToolId(tool.originalName),
    logicalId: "",
    mcpConnectionId: "",
    originalName: tool.originalName,
    llmToolName: "",
    description: tool.description || "",
    inputSchema: tool.inputSchema || { type: "object", properties: {}, required: [] },
    isEnabled: false,
    accessLevel: "anonymous",
    requiredContactFields: [],
    inputBindings: [],
    suggestedBindings: tool.suggestedBindings || [],
    createdAt: null,
    updatedAt: null,
  }));
}

export function McpConnectionForm({
  chatbotId,
  existingConnection,
  onCancel,
  onSaved,
}: Props) {
  const [values, setValues] = useState<McpConnectionFormValues>(() => buildInitialValues(existingConnection));
  const [lastVerifiedFingerprint, setLastVerifiedFingerprint] = useState<string | null>(
    existingConnection ? buildVerifyFingerprint(buildInitialValues(existingConnection)) : null
  );

  const verifyMutation = useVerifyMcpConnection();
  const createMutation = useCreateMcpConnection();
  const updateMutation = useUpdateMcpConnection();

  useEffect(() => {
    const nextValues = buildInitialValues(existingConnection);
    setValues(nextValues);
    setLastVerifiedFingerprint(
      existingConnection ? buildVerifyFingerprint(nextValues) : null
    );
  }, [existingConnection]);

  const currentFingerprint = useMemo(() => buildVerifyFingerprint(values), [values]);
  const needsReverify =
    values.tools.length > 0 &&
    lastVerifiedFingerprint !== null &&
    lastVerifiedFingerprint !== currentFingerprint;
  const isEditing = !!existingConnection?.id;
  const hasStoredSecret = !!existingConnection?.hasAuthValue;
  const hasVerifiedTools = values.tools.length > 0;
  const canSave =
    values.name.trim().length >= 3 &&
    values.serverUrl.trim().length > 0 &&
    hasVerifiedTools &&
    !needsReverify;
  const authValueForSave =
    values.authType === "none"
      ? undefined
      : values.authValue.trim() || (isEditing && hasStoredSecret ? undefined : values.authValue);

  const setField = <K extends keyof McpConnectionFormValues>(
    key: K,
    nextValue: McpConnectionFormValues[K]
  ) => {
    setValues((previous) => ({ ...previous, [key]: nextValue }));
  };

  const handleVerify = async () => {
    const result = await verifyMutation.mutateAsync({
      chatbotId,
      name: values.name.trim() || undefined,
      serverUrl: values.serverUrl.trim(),
      authType: values.authType,
      authValue: values.authType === "none" ? undefined : values.authValue,
      authHeader: values.authType === "api_key" ? values.authHeader.trim() : undefined,
    });

    setValues((previous) => ({
      ...previous,
      name: previous.name.trim() || result.connection.name,
      authHeader:
        previous.authType === "api_key"
          ? previous.authHeader || result.connection.authHeader || "X-API-Key"
          : previous.authHeader,
      tools: verifyResponseToTools(result.tools).map((verifiedTool) => {
        const existingTool = previous.tools.find(
          (tool) => tool.originalName === verifiedTool.originalName
        );

        return existingTool
          ? {
              ...verifiedTool,
              id: existingTool.id,
              logicalId: existingTool.logicalId,
              mcpConnectionId: existingTool.mcpConnectionId,
              llmToolName: existingTool.llmToolName,
              isEnabled: existingTool.isEnabled,
              accessLevel: existingTool.accessLevel,
              requiredContactFields: existingTool.requiredContactFields,
              inputBindings: existingTool.inputBindings,
              createdAt: existingTool.createdAt,
              updatedAt: existingTool.updatedAt,
            }
          : verifiedTool;
      }),
    }));
    setLastVerifiedFingerprint(currentFingerprint);
  };

  const handleSave = async () => {
    if (!canSave) return;

    const tools = values.tools.map((tool) => ({
      originalName: tool.originalName,
      isEnabled: tool.isEnabled,
      accessLevel: tool.accessLevel,
      requiredContactFields: tool.requiredContactFields,
      inputBindings: tool.inputBindings,
    }));

    if (isEditing && existingConnection?.id) {
      const payload: UpdateMcpConnectionInput = {
        chatbotId,
        connectionId: existingConnection.id,
        name: values.name.trim(),
        serverUrl: values.serverUrl.trim(),
        authType: values.authType,
        authValue: authValueForSave,
        authHeader: values.authType === "api_key" ? values.authHeader.trim() : undefined,
        isEnabled: values.isEnabled,
        tools,
      };

      await updateMutation.mutateAsync(payload);
      onSaved();
      return;
    }

    const payload: CreateMcpConnectionInput = {
      chatbotId,
      name: values.name.trim(),
      serverUrl: values.serverUrl.trim(),
      authType: values.authType,
      authValue: authValueForSave,
      authHeader: values.authType === "api_key" ? values.authHeader.trim() : undefined,
      isEnabled: values.isEnabled,
      tools,
    };

    await createMutation.mutateAsync(payload);
    onSaved();
  };

  const enabledToolsCount = values.tools.filter((tool) => tool.isEnabled).length;
  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">
            {isEditing ? "Manage MCP Server" : "Integrate MCP Server"}
          </h2>
          <p className="text-sm text-muted-foreground">
            Verify the server in DEV, choose which tools the chatbot can use, and deploy when you're ready to expose them in LIVE.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{values.tools.length} discovered</Badge>
          <Badge variant="outline">{enabledToolsCount} enabled</Badge>
          <Badge variant="outline">{values.isEnabled ? "Connection enabled" : "Connection disabled"}</Badge>
        </div>
      </div>

      <Card className="border-border/70">
        <CardHeader>
          <CardTitle>Connection details</CardTitle>
          <CardDescription>
            This setup is stored in DEV immediately. The live chatbot only sees it after Push to Live.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="mcp-name">Name</Label>
              <Input
                id="mcp-name"
                value={values.name}
                onChange={(event) => setField("name", event.target.value)}
                placeholder="Mintlify Docs"
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/20 px-4 py-3">
              <div className="space-y-1">
                <Label htmlFor="mcp-enabled">Enable this MCP server</Label>
                <p className="text-sm text-muted-foreground">
                  If disabled, its tools stay configured but won&apos;t be exposed at runtime.
                </p>
              </div>
              <Switch
                id="mcp-enabled"
                checked={values.isEnabled}
                onCheckedChange={(checked) => setField("isEnabled", checked)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mcp-url">MCP server URL</Label>
            <Input
              id="mcp-url"
              value={values.serverUrl}
              onChange={(event) => setField("serverUrl", event.target.value)}
              placeholder="https://example.com/mcp"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Authentication method</Label>
              <Select
                value={values.authType}
                onValueChange={(value) => {
                  setField("authType", value as McpConnectionFormValues["authType"]);
                  if (value === "api_key" && !values.authHeader) {
                    setField("authHeader", "X-API-Key");
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="bearer">Bearer token</SelectItem>
                  <SelectItem value="api_key">API key header</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {values.authType === "api_key" ? (
              <div className="space-y-2">
                <Label htmlFor="mcp-auth-header">Header name</Label>
                <Input
                  id="mcp-auth-header"
                  value={values.authHeader}
                  onChange={(event) => setField("authHeader", event.target.value)}
                  placeholder="X-API-Key"
                />
              </div>
            ) : null}

            {values.authType !== "none" ? (
              <div className="space-y-2">
                <Label htmlFor="mcp-auth-value">
                  {values.authType === "bearer" ? "Bearer token" : "Secret value"}
                </Label>
                <Input
                  id="mcp-auth-value"
                  type="password"
                  value={values.authValue}
                  onChange={(event) => setField("authValue", event.target.value)}
                  placeholder={
                    hasStoredSecret
                      ? existingConnection?.authValueMasked || "Leave blank to keep stored secret"
                      : values.authType === "bearer"
                        ? "Paste token"
                        : "Paste secret"
                  }
                />
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border/70 bg-muted/20 p-4">
            <Button
              type="button"
              onClick={handleVerify}
              disabled={
                verifyMutation.isPending ||
                values.serverUrl.trim().length === 0 ||
                (values.authType !== "none" && !values.authValue.trim()) ||
                (values.authType === "api_key" && !values.authHeader.trim())
              }
            >
              {verifyMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Verify connection
                </>
              )}
            </Button>

            <div className="text-sm text-muted-foreground">
              {hasVerifiedTools
                ? `${values.tools.length} tools discovered in DEV.`
                : "Run verification to discover tools from this server."}
            </div>
          </div>

          {verifyMutation.isSuccess && !needsReverify ? (
            <Alert variant="success">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Connection verified</AlertTitle>
              <AlertDescription>
                The current DEV configuration was successfully verified and the tool snapshot is ready to save.
              </AlertDescription>
            </Alert>
          ) : null}

          {needsReverify ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Verification required again</AlertTitle>
              <AlertDescription>
                Server URL or authentication changed after the last verification. Re-run verification before saving so the tool snapshot stays accurate.
              </AlertDescription>
            </Alert>
          ) : null}

          {existingConnection?.authValueMasked ? (
            <Alert>
              <ShieldCheck className="h-4 w-4" />
              <AlertTitle>Stored secret</AlertTitle>
              <AlertDescription>
                A secret is already stored for this connection. Leave the field blank to keep it, or enter a new value to rotate it.
              </AlertDescription>
            </Alert>
          ) : null}
        </CardContent>
      </Card>

      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            MCP tools
          </CardTitle>
          <CardDescription>
            Only enabled tools count toward the shared actions quota. Contact bindings are saved only for the parameters you explicitly keep.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <McpToolTable tools={values.tools} onChange={(tools) => setField("tools", tools)} />
        </CardContent>
      </Card>

      <Separator />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-muted-foreground">
          {hasVerifiedTools
            ? `${enabledToolsCount} tool${enabledToolsCount === 1 ? "" : "s"} enabled for this connection.`
            : "Verify first to load and configure MCP tools."}
        </div>

        <div className="flex gap-3">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!canSave || isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving
              </>
            ) : isEditing ? (
              "Save changes"
            ) : (
              "Save MCP server"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
