"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FeatureGuard } from "@/components/shared/FeatureGuard";
import { cn } from "@/lib/utils";
import type { IntegrationConfig } from "@/types/integration";

const LOGO_MAP: Record<string, string> = {
  stripe: "/integrations/stripe.svg",
  shopify: "/integrations/shopify.svg",
  zendesk: "/integrations/zendesk.png",
  slack: "/integrations/slack.png",
  notion: "/integrations/notion.png",
};

interface Props {
  integration: IntegrationConfig;
  onConnect: (id: string) => void;
}

export function OneClickIntegrationCard({ integration, onConnect }: Props) {
  const logo = LOGO_MAP[integration.id];
  const isConnected = integration.status === "connected";

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md",
        isConnected && "border-green-500/30 bg-green-50/30 dark:bg-green-950/10",
      )}
    >
      {/* Header row: logo + name + status */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {logo ? (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-white p-1.5">
              <Image
                src={logo}
                alt={integration.name}
                width={28}
                height={28}
                className="h-full w-full object-contain"
              />
            </div>
          ) : (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted text-sm font-bold text-muted-foreground">
              {integration.name[0]}
            </div>
          )}
          <span className="font-semibold text-sm leading-none">{integration.name}</span>
        </div>
        <Badge
          variant={isConnected ? "default" : "outline"}
          className={cn(
            "shrink-0 text-[11px]",
            isConnected
              ? "border-green-500/30 bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
              : "text-muted-foreground",
          )}
        >
          {isConnected ? "Connected" : "Disconnected"}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
        {integration.description}
      </p>

      {/* Action button — guarded by integrations entitlement */}
      {isConnected ? (
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => onConnect(integration.id)}
        >
          Manage
        </Button>
      ) : (
        <FeatureGuard feature="integrations">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onConnect(integration.id)}
          >
            Connect
          </Button>
        </FeatureGuard>
      )}
    </div>
  );
}
