"use client";

import { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type ChatLogsFilters = {
  fromDate?: string | null;
  toDate?: string | null;
  confidence?: string | null;
  source?: string | null;
  feedback?: string | null;
};

interface ChatLogsFilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: ChatLogsFilters;
  onChange: (value: ChatLogsFilters) => void;
  onClear?: () => void;
}

export function ChatLogsFilterDialog({
  open,
  onOpenChange,
  value,
  onChange,
  onClear,
}: ChatLogsFilterDialogProps) {
  const dateLabel = useMemo(() => {
    if (value.fromDate && value.toDate) return `${value.fromDate} ~ ${value.toDate}`;
    if (value.fromDate) return `${value.fromDate} ~`;
    if (value.toDate) return `~ ${value.toDate}`;
    return "Select date range";
  }, [value.fromDate, value.toDate]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-fit min-w-sm sm:max-w-xl md:min-w-xl md:max-w-2xl lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Filter by</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="date-range-filter">Date range</Label>
            <div className="grid gap-2 w-full sm:grid-cols-[1fr_auto_1fr] items-center">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    id="fromDate"
                    type="date"
                    value={value.fromDate ?? ""}
                    onChange={(e) => onChange({ ...value, fromDate: e.target.value || null })}
                    className={cn(
                      "h-9 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-inner-sm",
                    )}
                  />
                </div>
              </div>
              <div className="hidden sm:block text-xs text-muted-foreground text-center">to</div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    id="toDate"
                    type="date"
                    value={value.toDate ?? ""}
                    onChange={(e) => onChange({ ...value, toDate: e.target.value || null })}
                    className={cn(
                      "h-9 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-inner-sm",
                    )}
                  />
                </div>
              </div>
              <div className="sm:col-span-3 text-xs text-muted-foreground flex items-center gap-2">
                <CalendarIcon className="h-3.5 w-3.5" />
                <span className="truncate">{dateLabel}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="confidence-score-filter">Confidence score</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {value.confidence ? value.confidence : "Select score"}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {["Any", "≥ 0.25", "≥ 0.50", "≥ 0.75", "≥ 0.90"].map((opt) => (
                  <DropdownMenuItem
                    key={opt}
                    onClick={() => onChange({ ...value, confidence: opt === "Any" ? null : opt })}
                  >
                    {opt}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="source-filter">Source</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {value.source ? value.source : "Select source"}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {["Any", "Website", "Files", "Notion", "Web"].map((opt) => (
                  <DropdownMenuItem
                    key={opt}
                    onClick={() => onChange({ ...value, source: opt === "Any" ? null : opt })}
                  >
                    {opt}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="feedback-filter">Feedback</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {value.feedback ? value.feedback : "Select feedback"}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {["Any", "Like", "Dislike", "Neutral"].map((opt) => (
                  <DropdownMenuItem
                    key={opt}
                    onClick={() => onChange({ ...value, feedback: opt === "Any" ? null : opt })}
                  >
                    {opt}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button
            variant="link"
            className="text-destructive hover:text-destructive/80"
            onClick={() => {
              onClear?.();
              onChange({
                fromDate: null,
                toDate: null,
                confidence: null,
                source: null,
                feedback: null,
              });
            }}
          >
            Clear all
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button onClick={() => onOpenChange(false)}>Apply</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


