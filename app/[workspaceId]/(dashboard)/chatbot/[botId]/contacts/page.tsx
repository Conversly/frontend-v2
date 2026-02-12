"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { format } from "date-fns";
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
import { Separator } from "@/components/ui/separator";
import { Search, Filter, X, MoreHorizontal, MessageSquare, Download } from "lucide-react";
import { useGetLeadsInfinite } from "@/services/leads";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ConversationViewer } from "@/components/chatbot/activity/ConversationViewer";
import { useMessagesQuery } from "@/services/activity";
import type { LeadResponse } from "@/types/leads";
import type { ConversationMessageItem } from "@/types/activity";

// Source options based on types
const SOURCE_OPTIONS = [
  { value: "WIDGET", label: "Widget" },
  { value: "WHATSAPP", label: "WhatsApp" },
  { value: "VOICE", label: "Voice" },
  { value: "SMS", label: "SMS" },
];

export default function ContactsPage() {
  const params = useParams();
  const chatbotId = params.botId as string;

  // 1. Filter State
  const [search, setSearch] = useState("");
  const [source, setSource] = useState<string>("ALL");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Debounce search
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  // 2. Data Fetching
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetLeadsInfinite({
    chatbotId,
    limit: 20,
    search: debouncedSearch || undefined,
    source: source === "ALL" ? undefined : (source as any),
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  // Flatten pages
  const leads = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

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

  // Infinite Scroll
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
    setSource("ALL");
    setStartDate("");
    setEndDate("");
  };

  const hasActiveFilters =
    search !== "" ||
    source !== "ALL" ||
    startDate !== "" ||
    endDate !== "";

  // Helper to extract system fields or fallback
  const getFieldValue = (lead: LeadResponse, systemField: string, fallbackKey?: string) => {
    const field = lead.responses?.find(r => r.systemField === systemField);
    if (field) return field.value;

    // Fallback for legacy data if keys are at root (casting as any since type definition might be strict)
    if (fallbackKey && (lead as any)[fallbackKey]) return (lead as any)[fallbackKey];

    return null;
  };

  const getOtherFields = (lead: LeadResponse) => {
    return lead.responses?.filter(r => !r.systemField || r.systemField === 'none') || [];
  };

  const getName = (lead: LeadResponse) => getFieldValue(lead, 'name', 'name') || "Anonymous";
  const getEmail = (lead: LeadResponse) => getFieldValue(lead, 'email', 'email');
  const getPhone = (lead: LeadResponse) => getFieldValue(lead, 'phone', 'phoneNumber');

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-background px-6 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Contacts</h1>
            <p className="text-sm text-muted-foreground mt-1">
              View and manage leads captured by your chatbot
            </p>
          </div>
          {/* Export button placeholder */}
          <Button variant="outline" size="sm" className="hidden sm:flex" disabled>
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          {/* Search */}
          <div className="w-full md:w-64 space-y-1.5">
            <Label className="text-xs text-muted-foreground">Search</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search name, email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
          </div>

          <Separator orientation="vertical" className="hidden md:block h-8 mx-2" />

          {/* Source Filter */}
          <div className="w-full md:w-40 space-y-1.5">
            <Label className="text-xs text-muted-foreground">Source</Label>
            <Select value={source} onValueChange={setSource}>
              <SelectTrigger className="h-9">
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

          <Separator orientation="vertical" className="hidden md:block h-8 mx-2" />

          {/* Date Range */}
          <div className="flex items-center gap-2">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">From</Label>
              <Input
                type="date"
                className="h-9 w-36 px-2 text-sm"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">To</Label>
              <Input
                type="date"
                className="h-9 w-36 px-2 text-sm"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-9 px-2 text-muted-foreground hover:text-foreground ml-auto md:ml-0"
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
                <TableHead>Name</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Other Details</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Captured At</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    Loading contacts...
                  </TableCell>
                </TableRow>
              ) : leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    No contacts found.
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((lead) => {
                  const otherFields = getOtherFields(lead);
                  return (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">
                        <span className={!getName(lead) || getName(lead) === "Anonymous" ? "text-muted-foreground italic" : ""}>
                          {getName(lead)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col text-sm">
                          {getEmail(lead) && <span>{getEmail(lead)}</span>}
                          {getPhone(lead) && <span className="text-muted-foreground text-xs">{getPhone(lead)}</span>}
                          {!getEmail(lead) && !getPhone(lead) && <span className="text-muted-foreground">-</span>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {otherFields.length > 0 ? (
                            otherFields.slice(0, 3).map((field, idx) => (
                              <Badge key={idx} variant="secondary" className="font-normal text-xs">
                                {field.label}: {field.value}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-muted-foreground text-xs">-</span>
                          )}
                          {otherFields.length > 3 && (
                            <Badge variant="outline" className="text-xs">+{otherFields.length - 3}</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs uppercase px-2 py-0.5">{lead.source}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {format(new Date(lead.createdAt), "MMM d, h:mm a")}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="flex h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => setSelectedLead(lead)}
                              disabled={!lead.conversationId}
                            >
                              <MessageSquare className="mr-2 h-4 w-4" />
                              View conversation
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
                    colSpan={6}
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
                Lead: <span className="font-medium text-foreground">{getName(selectedLead)}</span>
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
