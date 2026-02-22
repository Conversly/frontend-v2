'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bot, Headset, BookOpen, TrendingUp, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const USE_CASES = [
  {
    id: "General AI Agent",
    title: "General AI Agent",
    description: "Versatile assistant for any inquiry",
    icon: Bot,
    gradient: "from-violet-500/20 to-purple-500/20",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-600",
    borderColor: "border-violet-500",
    checkBg: "bg-violet-500",
  },
  {
    id: "Customer Support",
    title: "Customer Support",
    description: "Empathetic help for support teams",
    icon: Headset,
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
    borderColor: "border-emerald-500",
    checkBg: "bg-emerald-500",
  },
  {
    id: "Documentation Assistant",
    title: "Docs Assistant",
    description: "Finds answers from your knowledge base",
    icon: BookOpen,
    gradient: "from-sky-500/20 to-blue-500/20",
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-600",
    borderColor: "border-sky-500",
    checkBg: "bg-sky-500",
  },
  {
    id: "Sales",
    title: "Sales Agent",
    description: "Persuasive assistance for conversions",
    icon: TrendingUp,
    gradient: "from-amber-500/20 to-orange-500/20",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
    borderColor: "border-amber-500",
    checkBg: "bg-amber-500",
  },
] as const;

interface Step1UrlAndUsecaseProps {
  protocol: "https://" | "http://";
  setProtocol: (p: "https://" | "http://") => void;
  host: string;
  setHost: (h: string) => void;
  useCase: string;
  setUseCase: (u: string) => void;
  isSubmitting: boolean;
  isValidHost: (value: string) => boolean;
  onSubmit: (e: React.FormEvent) => void;
  onManualSetup: () => void;
}

export function Step1UrlAndUsecase({
  protocol,
  setProtocol,
  host,
  setHost,
  useCase,
  setUseCase,
  isSubmitting,
  isValidHost,
  onSubmit,
  onManualSetup,
}: Step1UrlAndUsecaseProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col items-center justify-center gap-2 lg:items-start lg:justify-start">
        <h1 className="type-page-title text-pretty text-center lg:text-left">
          Let&apos;s start with a link
        </h1>
        <p className="type-body-muted text-center lg:text-left">
          Share your website link, and we&apos;ll automatically build an AI agent trained on your content.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="url" className="pl-0.5 type-label">
            Your website URL
          </Label>
          <div className="flex h-11 w-full items-center rounded-lg border border-input bg-background text-foreground shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary">
            <button
              type="button"
              onClick={() => setProtocol(protocol === "https://" ? "http://" : "https://")}
              className="flex w-fit items-center gap-2 rounded-l-lg border-none bg-muted/50 px-3 py-2 text-sm text-muted-foreground outline-hidden transition-colors hover:bg-muted"
              disabled={isSubmitting}
            >
              {protocol}
            </button>
            <div className="h-full w-px shrink-0 bg-border" />
            <Input
              id="url"
              placeholder="verly.ai"
              className="h-11 w-full rounded-l-none border-none shadow-none focus-visible:ring-0"
              value={host}
              onChange={(e) => {
                let value = e.target.value;
                value = value.replace(/^https?:\/\//i, '');
                value = value.replace(/^www\./i, '');
                value = value.split('/')[0].split('?')[0].split('#')[0];
                value = value.trim();
                value = value.replace(/\/$/, '');
                setHost(value);
              }}
              disabled={isSubmitting}
              autoComplete="url"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="pl-0.5 type-label">Select a use-case</Label>
          <div className="grid grid-cols-2 gap-2">
            {USE_CASES.map((item) => {
              const isSelected = useCase === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setUseCase(item.id)}
                  disabled={isSubmitting}
                  className={cn(
                    "relative flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left transition-all duration-200",
                    "hover:shadow-card-hover hover:-translate-y-0.5",
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none",
                    isSelected
                      ? `${item.borderColor} bg-gradient-to-br ${item.gradient} border-2`
                      : "border-border bg-card hover:border-muted-foreground/30 shadow-card"
                  )}
                >
                  {isSelected && (
                    <div className={cn(
                      "absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full",
                      item.checkBg
                    )}>
                      <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                    </div>
                  )}
                  <div className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
                    item.iconBg
                  )}>
                    <Icon className={cn("h-4 w-4", item.iconColor)} />
                  </div>
                  <div className="flex flex-col gap-0 min-w-0">
                    <span className="text-xs font-semibold text-foreground truncate">{item.title}</span>
                    <span className="text-2xs text-muted-foreground leading-tight truncate">{item.description}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-5">
        <Button
          className="w-full h-11 text-base font-medium shadow-card"
          type="submit"
          disabled={!isValidHost(host) || isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Continue"}
        </Button>
        <div className="flex w-full items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="type-caption font-medium uppercase tracking-wider text-muted-foreground">OR</span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full h-11"
          onClick={onManualSetup}
          disabled={isSubmitting}
        >
          Set up manually with other sources
        </Button>
      </div>
    </form>
  );
}

