'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        <h1 className="text-pretty text-center text-[28px] font-semibold leading-[130%] tracking-[-1.12px] lg:text-left">
          Let&apos;s start with a link
        </h1>
        <p className="text-center text-sm leading-[140%] tracking-[-0.28px] text-muted-foreground lg:text-left">
          Share your website link, and we&apos;ll automatically build an AI agent trained on your content.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="url" className="pl-0.5 text-sm font-medium">
            Your website URL
          </Label>
          <div className="flex h-10 w-full items-center rounded-md border border-input bg-background text-foreground">
            <button
              type="button"
              onClick={() => setProtocol(protocol === "https://" ? "http://" : "https://")}
              className="flex w-fit items-center gap-2 rounded-md border-none bg-transparent px-3 py-2 text-sm outline-hidden transition-colors"
              disabled={isSubmitting}
            >
              {protocol}
            </button>
            <div className="h-1/2 w-px shrink-0 bg-border" />
            <Input
              id="url"
              placeholder="portfolio.shashankkk.site"
              className="h-10 w-full rounded-s-none border-none"
              value={host}
              onChange={(e) => {
                let value = e.target.value;
                // Remove protocol if user pastes full URL
                value = value.replace(/^https?:\/\//i, '');
                // Remove www. prefix (optional, but common)
                value = value.replace(/^www\./i, '');
                // Remove path, query params, and hash
                value = value.split('/')[0].split('?')[0].split('#')[0];
                // Trim all whitespace
                value = value.trim();
                // Remove trailing slash
                value = value.replace(/\/$/, '');
                setHost(value);
              }}
              disabled={isSubmitting}
              autoComplete="url"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Label className="pl-0.5 text-sm font-medium">Use-case</Label>
          <select
            className="h-10 w-full rounded-md border bg-transparent px-3 py-1 text-sm"
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
            disabled={isSubmitting}
          >
            <option>General AI Agent</option>
            <option>Customer Support</option>
            <option>Documentation Assistant</option>
            <option>Sales</option>
          </select>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-6">
        <Button className="w-full" type="submit" disabled={!isValidHost(host) || isSubmitting}>
          {isSubmitting ? "Processing..." : "Continue"}
        </Button>
        <div className="flex w-full items-center gap-3">
          <div className="flex-1 bg-border" data-orientation="horizontal" role="none" />
          <span className="text-xs text-muted-foreground">OR</span>
          <div className="flex-1 bg-border" data-orientation="horizontal" role="none" />
        </div>
        <Button type="button" variant="outline" className="w-full" onClick={onManualSetup} disabled={isSubmitting}>
          Set up manually with other sources
        </Button>
      </div>
    </form>
  );
}

