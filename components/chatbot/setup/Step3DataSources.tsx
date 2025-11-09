'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { useDataSources } from "@/store/chatbot/data-sources";
import { FileText, MessageSquare, Globe, HelpCircle, Notebook } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step3DataSourcesProps {
  onContinue: () => void;
}

export function Step3DataSources({ onContinue }: Step3DataSourcesProps) {
  const sources = useDataSources();
  const websiteCount = sources.filter((s) => s.type === "url").length;
  const fileCount = sources.filter((s) => s.type === "file").length;
  const textCount = sources.filter((s) => s.type === "text").length;
  const recentWebsites = sources.filter((s) => s.type === "url").slice(0, 5);
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-[28px] font-semibold leading-[130%] tracking-[-1.12px]">Add training sources</h1>
        <p className="text-sm leading-[140%] tracking-[-0.28px] text-muted-foreground">
          You can add multiple sources to train your Agent, let&apos;s start with a file or a link to your site.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <SourceRow icon={<FileText className="h-5 w-5" />} label="File" count={fileCount} />
        <SourceRow icon={<MessageSquare className="h-5 w-5" />} label="Text" count={textCount} />
        <SourceRow
          icon={<Globe className="h-5 w-5" />}
          label="Website"
          count={websiteCount}
          variant="success"
        />
        <SourceRow icon={<HelpCircle className="h-5 w-5" />} label="Q&A" count={0} />
        <SourceRow icon={<Notebook className="h-5 w-5" />} label="Notion" count={0} />
      </div>

      {websiteCount > 0 && (
        <div className="rounded-lg border bg-muted/40 p-3">
          <div className="mb-2 text-xs font-medium text-muted-foreground">Recently added websites</div>
          <ul className="flex flex-col gap-2">
            {recentWebsites.map((s) => (
              <li key={s.id} className="flex items-center justify-between text-sm">
                <span className="truncate">{s.name}</span>
                {s.createdAt && (
                  <span className="text-xs text-muted-foreground">{new Date(s.createdAt).toLocaleDateString()}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button className="w-full" onClick={onContinue}>
        Train & continue
      </Button>
    </div>
  );
}

interface SourceRowProps {
  icon: React.ReactNode;
  label: string;
  count: number;
  variant?: "default" | "success";
}

function SourceRow({ icon, label, count, variant = "default" }: SourceRowProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-muted/40 px-4 py-3">
      <div className="flex items-center gap-3">
        {variant === "success" ? (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        ) : (
          <div className="text-muted-foreground">{icon}</div>
        )}
        <span className="text-sm font-medium">
          {count > 0 ? `${count} ${label}${count > 1 ? "s" : ""}` : label}
        </span>
      </div>
      <button
        type="button"
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-accent",
          variant === "success" && "text-foreground"
        )}
      >
        {variant === "success" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        )}
      </button>
    </div>
  );
}


