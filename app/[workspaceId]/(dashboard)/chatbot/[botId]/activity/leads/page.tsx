"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Search, CalendarIcon, X, Download } from "lucide-react";
import { useGetLeadsInfinite, useExportLeads } from "@/services/leads";
import { useTopicsQuery } from "@/services/chatbot";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { ConversationViewer } from "@/components/chatbot/activity/ConversationViewer";
import { useMessagesQuery } from "@/services/activity";
import { LeadResponse } from "@/types/leads";
import type { ConversationMessageItem } from "@/types/activity";

// Source options based on types
const SOURCE_OPTIONS = [
  { value: "WIDGET", label: "Widget" },
  { value: "WHATSAPP", label: "WhatsApp" },
  { value: "VOICE", label: "Voice" },
  { value: "SMS", label: "SMS" },
];

export default function LeadsPage() {
  const params = useParams();
  const chatbotId = params.botId as string;

  // 1. Filter State
  const [search, setSearch] = useState("");
  const [topicId, setTopicId] = useState<string>("ALL");
  const [source, setSource] = useState<string>("ALL");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Debounce search
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const startDate = dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : "";
  const endDate = dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : "";

  // 2. Data Fetching
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetLeadsInfinite({
    chatbotId,
    limit: 20,
    search: debouncedSearch || undefined,
    source: source === "ALL" ? undefined : (source as any),
    topicId: topicId === "ALL" ? undefined : topicId,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  // 3. Conversation View State
  const [selectedLead, setSelectedLead] = useState<LeadResponse | null>(null);
  const { data: messages, isLoading: isLoadingMessages } = useMessagesQuery(
    chatbotId,
    selectedLead?.conversationId || ""
  );

  const renderedMessages = useMemo(() => {
    if (!messages) return [];
    return messages.map((m: ConversationMessageItem) => ({
      id: m.id,
      role: (m.type === "user" ? "user" : "assistant") as "user" | "assistant",
      content: m.content,
      createdAt: m.createdAt ? new Date(m.createdAt) : undefined,
      citations: m.citations,
    }));
  }, [messages]);

  const { data: topics } = useTopicsQuery(chatbotId);

  // Export
  const { mutate: exportLeads, isPending: isExporting } = useExportLeads();
  const handleExport = () => {
    exportLeads({
      chatbotId,
      source: source === "ALL" ? undefined : (source as any),
      topicId: topicId === "ALL" ? undefined : topicId,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      search: debouncedSearch || undefined,
    });
  };

  // Flatten pages
  const leads = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  // 3. Infinite Scroll
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Handlers
  const clearFilters = () => {
    setSearch("");
    setTopicId("ALL");
    setSource("ALL");
    setDateRange(undefined);
  };

  const hasActiveFilters =
    search !== "" ||
    topicId !== "ALL" ||
    source !== "ALL" ||
    !!dateRange?.from;

  const dateRangeLabel =
    dateRange?.from
      ? dateRange.to
        ? `${format(dateRange.from, "MMM dd, yyyy")} – ${format(dateRange.to, "MMM dd, yyyy")}`
        : format(dateRange.from, "MMM dd, yyyy")
      : "Pick a date range";

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-background px-6 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="type-section-title tracking-tight">Leads</h1>
            <p className="type-body-muted mt-0.5">
              Manage and track leads generated from conversations
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleExport}
            disabled={isExporting}
          >
            <Download className="w-4 h-4 mr-1.5" />
            {isExporting ? "Exporting..." : "Export CSV"}
          </Button>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-end gap-3">
          {/* Search */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-muted-foreground">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search name, email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-10 w-64 font-semibold placeholder:font-normal bg-card"
              />
            </div>
          </div>

          {/* Source Filter */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-muted-foreground">Source</Label>
            <Select value={source} onValueChange={setSource}>
              <SelectTrigger className="h-10 w-40 font-semibold bg-card">
                <SelectValue placeholder="All Sources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Sources</SelectItem>
                {SOURCE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Topic Filter */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-muted-foreground">Topic</Label>
            <Select value={topicId} onValueChange={setTopicId}>
              <SelectTrigger className="h-10 w-40 font-semibold bg-card">
                <SelectValue placeholder="All Topics" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Topics</SelectItem>
                {topics?.map((topic) => (
                  <SelectItem key={topic.id} value={topic.id}>
                    {topic.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range Picker */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-muted-foreground">Date Range</Label>
            <div>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "h-10 w-64 justify-start text-left font-semibold bg-card",
                    !dateRange?.from && "text-muted-foreground font-normal"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                  {dateRangeLabel}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  disabled={{ after: new Date() }}
                  defaultMonth={
                    dateRange?.from
                      ? dateRange.from
                      : new Date(new Date().getFullYear(), new Date().getMonth() - 1)
                  }
                />
              </PopoverContent>
            </Popover>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="h-10 px-3 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-1" /> Clear
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact Info</TableHead>
                <TableHead>Communication</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <TableRow key={`skeleton-${i}`}>
                    <TableCell>
                      <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="h-3 w-32 bg-muted rounded animate-pulse" />
                        <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="h-5 w-20 bg-muted rounded animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-28 bg-muted rounded animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-8 w-8 bg-muted rounded-full animate-pulse" />
                    </TableCell>
                  </TableRow>
                ))
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-destructive">
                    Failed to load leads. Please try again.
                  </TableCell>
                </TableRow>
              ) : leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No leads found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((lead) => {
                  const name = lead.displayName || lead.attributes?.find(r => r.key === 'name')?.value || "Anonymous";
                  const email = lead.email || lead.attributes?.find(r => r.key === 'email')?.value;
                  const phone = lead.phoneNumber || lead.attributes?.find(r => r.key === 'phone' || r.key === 'phoneNumber')?.value;
                  return (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col text-sm">
                          {email && <span>{email}</span>}
                          {phone && <span className="text-muted-foreground text-xs">{phone}</span>}
                          {!email && !phone && <span className="text-muted-foreground">-</span>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{lead.source}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {lead.createdAt
                          ? format(new Date(lead.createdAt), "MMM d, yyyy h:mm a")
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => setSelectedLead(lead)}
                            >
                              See conversation
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
              {isFetchingNextPage && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-12 text-center text-muted-foreground text-sm"
                  >
                    Loading more...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Infinite Scroll Sentinel */}
        <div ref={observerTarget} className="h-4 w-full" />
      </div>

      <Sheet
        open={!!selectedLead}
        onOpenChange={(open) => !open && setSelectedLead(null)}
      >
        <SheetContent className="sm:max-w-xl w-[90vw] overflow-hidden flex flex-col">
          <SheetHeader className="mb-4">
            <SheetTitle>Conversation</SheetTitle>
            {selectedLead && (
              <div className="text-sm text-muted-foreground">
                Lead: <span className="font-medium text-foreground">
                  {selectedLead.displayName || selectedLead.attributes?.find(r => r.key === 'name')?.value || "Anonymous"}
                </span>
              </div>
            )}
          </SheetHeader>
          <div className="flex-1 overflow-y-auto -mr-6 pr-6">
            <ConversationViewer
              messages={renderedMessages}
              isLoading={isLoadingMessages}
              emptyMessage="No messages found for this conversation."
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
