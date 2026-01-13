'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  useDataSources, 
  useDataSourcesStore, 
  useSelectedSourceIds,
  type DataSource 
} from "@/store/chatbot/data-sources";
import { useSetupStore } from "@/store/chatbot/setup";
import { processDataSource } from "@/lib/api/datasource";
import { FileText, MessageSquare, Globe, HelpCircle, ExternalLink, File, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

type SourceType = "url" | "file" | "text" | "qa";

interface Step3DataSourcesProps {
  onContinue: () => void;
}

const SOURCE_CONFIG: Record<SourceType, { icon: React.ReactNode; label: string; plural: string }> = {
  url: { icon: <Globe className="h-5 w-5" />, label: "Website", plural: "Websites" },
  file: { icon: <FileText className="h-5 w-5" />, label: "File", plural: "Files" },
  text: { icon: <MessageSquare className="h-5 w-5" />, label: "Text", plural: "Text snippets" },
  qa: { icon: <HelpCircle className="h-5 w-5" />, label: "Q&A", plural: "Q&A pairs" },
};

export function Step3DataSources({ onContinue }: Step3DataSourcesProps) {
  const sources = useDataSources();
  const selectedSourceIds = useSelectedSourceIds();
  const toggleSourceSelection = useDataSourcesStore((s) => s.toggleSourceSelection);
  const chatbotId = useSetupStore((s) => s.chatbotId);
  const [openType, setOpenType] = useState<SourceType | null>(null);
  const [isTraining, setIsTraining] = useState(false);

  const getSourcesByType = (type: SourceType) => sources.filter((s) => s.type === type);
  const getSelectedByType = (type: SourceType) => 
    sources.filter((s) => s.type === type && selectedSourceIds.has(s.id));

  const websiteSources = getSourcesByType("url");
  const fileSources = getSourcesByType("file");
  const textSources = getSourcesByType("text");

  const selectedWebsites = getSelectedByType("url");
  const selectedFiles = getSelectedByType("file");
  const selectedTexts = getSelectedByType("text");

  const totalSelected = selectedWebsites.length + selectedFiles.length + selectedTexts.length;

  const currentSources = openType ? getSourcesByType(openType) : [];
  const currentConfig = openType ? SOURCE_CONFIG[openType] : null;

  const handleTrainAndContinue = async () => {
    if (!chatbotId || totalSelected === 0) {
      onContinue();
      return;
    }

    setIsTraining(true);
    try {
      await processDataSource({
        chatbotId,
        websiteUrls: selectedWebsites.map((s) => s.name),
        // Files and text would need additional handling based on your data structure
      });
      onContinue();
    } catch (error) {
      console.error("Failed to start training:", error);
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-[28px] font-semibold leading-[130%] tracking-[-1.12px]">
            Add training sources
          </h1>
          <p className="text-sm leading-[140%] tracking-[-0.28px] text-muted-foreground">
            We found {sources.length} sources from your website. {totalSelected} selected for training.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <SourceRow
            icon={<Globe className="h-5 w-5" />}
            label="Website"
            count={websiteSources.length}
            selectedCount={selectedWebsites.length}
            variant={selectedWebsites.length > 0 ? "success" : "default"}
            onClick={() => setOpenType("url")}
          />
          <SourceRow
            icon={<FileText className="h-5 w-5" />}
            label="File"
            count={fileSources.length}
            selectedCount={selectedFiles.length}
            variant={selectedFiles.length > 0 ? "success" : "default"}
            onClick={() => setOpenType("file")}
          />
          <SourceRow
            icon={<MessageSquare className="h-5 w-5" />}
            label="Text"
            count={textSources.length}
            selectedCount={selectedTexts.length}
            variant={selectedTexts.length > 0 ? "success" : "default"}
            onClick={() => setOpenType("text")}
          />
          <SourceRow
            icon={<HelpCircle className="h-5 w-5" />}
            label="Q&A"
            count={0}
            onClick={() => setOpenType("qa")}
          />
        </div>

        <Button 
          className="w-full" 
          onClick={handleTrainAndContinue}
          disabled={isTraining}
        >
          {isTraining ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Training...
            </>
          ) : (
            `Train & continue${totalSelected > 0 ? ` (${totalSelected})` : ''}`
          )}
        </Button>
      </div>

      {/* Source List Sheet */}
      <Sheet open={!!openType} onOpenChange={(open) => !open && setOpenType(null)}>
        <SheetContent side="right" className="w-[400px] sm:max-w-[400px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              {currentConfig?.icon}
              {currentConfig?.plural}
            </SheetTitle>
            <SheetDescription>
              {currentSources.length > 0
                ? `${currentSources.filter(s => selectedSourceIds.has(s.id)).length}/${currentSources.length} sources selected`
                : `No ${currentConfig?.label.toLowerCase()}s added yet`}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-4">
            {currentSources.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {currentSources.map((source) => (
                  <SourceListItem 
                    key={source.id} 
                    source={source} 
                    type={openType!}
                    isSelected={selectedSourceIds.has(source.id)}
                    onToggle={() => toggleSourceSelection(source.id)}
                  />
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 py-12 text-center text-muted-foreground">
                <div className="rounded-full bg-muted p-3">
                  {currentConfig?.icon}
                </div>
                <p className="text-sm">No {currentConfig?.label.toLowerCase()}s found</p>
                <p className="text-xs">Add sources manually after setup</p>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

interface SourceRowProps {
  icon: React.ReactNode;
  label: string;
  count: number;
  selectedCount?: number;
  variant?: "default" | "success";
  onClick: () => void;
}

function SourceRow({ icon, label, count, selectedCount, variant = "default", onClick }: SourceRowProps) {
  const displayCount = selectedCount !== undefined ? selectedCount : count;
  const showPartial = selectedCount !== undefined && selectedCount < count && selectedCount > 0;
  
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-lg border bg-muted/40 px-4 py-3 text-left transition-colors hover:bg-muted/60"
    >
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
          {count > 0 
            ? showPartial 
              ? `${selectedCount}/${count} ${label}${count > 1 ? "s" : ""}`
              : `${displayCount} ${label}${displayCount > 1 ? "s" : ""}` 
            : label}
        </span>
      </div>
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md border text-muted-foreground transition-colors",
          variant === "success" && "text-foreground"
        )}
      >
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
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </button>
  );
}

interface SourceListItemProps {
  source: DataSource;
  type: SourceType;
  isSelected: boolean;
  onToggle: () => void;
}

function SourceListItem({ source, type, isSelected, onToggle }: SourceListItemProps) {
  const isUrl = type === "url";

  const handleExternalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isUrl && source.name) {
      const url = source.name.startsWith("http") ? source.name : `https://${source.name}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <li
      className={cn(
        "group flex items-center gap-3 rounded-lg border bg-background p-3 transition-colors cursor-pointer hover:bg-muted/50",
        !isSelected && "opacity-60"
      )}
      onClick={onToggle}
    >
      <Checkbox 
        checked={isSelected} 
        onCheckedChange={onToggle}
        onClick={(e) => e.stopPropagation()}
        className="shrink-0"
      />
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
        {isUrl ? (
          <Globe className="h-4 w-4 text-muted-foreground" />
        ) : (
          <File className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{source.name}</p>
        {source.createdAt && (
          <p className="text-xs text-muted-foreground">
            {new Date(source.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>
      {isUrl && (
        <ExternalLink 
          className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer" 
          onClick={handleExternalClick}
        />
      )}
    </li>
  );
}
