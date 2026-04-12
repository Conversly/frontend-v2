import React from "react";
import { Badge } from "@/components/ui/badge";

export const URLPatternGuide: React.FC = () => {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold mb-0.5">URL & Input Patterns</h3>
        <p className="text-xs text-muted-foreground">
          Common patterns for structuring your action URL and inputs.
        </p>
      </div>

      {/* Pattern 1 — Static URL */}
      <div className="space-y-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Pattern 1 — Static URL
        </p>
        <code className="text-xs bg-muted px-2 py-1.5 rounded font-mono block">
          GET https://api.example.com/v1/status
        </code>
        <p className="text-xs text-muted-foreground">
          Paste the full URL and leave the Inputs tab empty. Nothing changes
          between requests.
        </p>
      </div>

      {/* Pattern 2 — Fixed query param */}
      <div className="space-y-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Pattern 2 — Fixed query param
        </p>
        <code className="text-xs bg-muted px-2 py-1.5 rounded font-mono block">
          GET https://api.example.com/context?mode=dev
        </code>
        <p className="text-xs text-muted-foreground">
          Add the query param directly in the URL (it appears in Advanced →
          Static Query Parameters), or add a parameter with source ={" "}
          <strong>Fixed value</strong> and Send to = <strong>Query</strong>.
          Both work identically.
        </p>
      </div>

      {/* Pattern 3 — Hardcoded resource ID */}
      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Pattern 3 — Hardcoded resource ID
        </p>
        <div className="rounded-md border border-border p-2.5 space-y-1.5">
          <Badge variant="secondary" className="text-[10px] h-4 px-1.5">
            Simpler
          </Badge>
          <code className="text-xs bg-muted px-2 py-1.5 rounded font-mono block break-all">
            GET /workspaces/abvdxqfpdqoktdkunixglzkw/context
          </code>
          <p className="text-xs text-muted-foreground">
            Leave the ID in the URL as-is. Best when the ID never changes and
            you don&apos;t need to audit which ID is used.
          </p>
        </div>
        <div className="rounded-md border border-border p-2.5 space-y-1.5">
          <Badge variant="secondary" className="text-[10px] h-4 px-1.5">
            Auditable
          </Badge>
          <code className="text-xs bg-muted px-2 py-1.5 rounded font-mono block">
            GET /workspaces/{"{workspaceId}"}/context
          </code>
          <p className="text-xs text-muted-foreground">
            Extract it as a <strong>fixed-value parameter</strong>. The ID is
            visible and editable in the Inputs tab without touching the URL.
            Preferred when you may rotate IDs across environments.
          </p>
        </div>
      </div>

      {/* Pattern 4 — AI-filled path param */}
      <div className="space-y-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Pattern 4 — AI-filled path param
        </p>
        <code className="text-xs bg-muted px-2 py-1.5 rounded font-mono block">
          GET /products/{"{productId}"}/details
        </code>
        <p className="text-xs text-muted-foreground">
          Wrap the name in curly braces. Add a parameter with the same name and
          source = <strong>Customer input</strong>. The AI reads the value from
          the conversation.
        </p>
      </div>

      {/* Pattern 5 — Contact field path param */}
      <div className="space-y-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Pattern 5 — Contact field path param
        </p>
        <code className="text-xs bg-muted px-2 py-1.5 rounded font-mono block">
          GET /accounts/{"{externalId}"}/profile
        </code>
        <p className="text-xs text-muted-foreground">
          Use source = <strong>Contact field</strong> and select the matching
          field (e.g. User ID). The value is injected server-side and is never
          visible to the AI or the end user.
        </p>
      </div>
    </div>
  );
};
